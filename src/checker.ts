/**
 * checker.ts —— 中文排版体检（MDQuill v0.1.0）
 *
 * 纯函数、无 Obsidian 依赖：输入整篇 md，输出结构化问题清单（含行号，可跳转定位）。
 * 只自查、可一键修复（fixAll 仅处理无歧义项）、不阻塞写作。三处共用同一内核：
 *  - 命令「MDQuill：排版体检」→ 报告弹窗
 *  - 写作面板「体检速览」卡（实时 error/warn 计数）
 *  - entry 纯函数校验（node 直测）
 *
 * 保护机制（扫描与修复共用）：
 *  - 代码围栏区（```…```）整行跳过
 *  - 行内 code（`…`）、裸 URL（https://…）、md 链接（[文](url)）整段占位，不参与标点/空格规则
 *  - frontmatter 区整段跳过
 *
 * 规则分级：error=明显错误（建议修）；warn=规范建议/疑似（可忽略）。
 * 修复策略：只自动修「无歧义」类（R1 重复标点 / R2 半角标点 / R3 中英空格 / R7 控制字符 / R8 全角空格）；
 * 有歧义类只报不修（R4 括号引号 / R5 直引号 / R6 叠字）。
 */

export type CheckLevel = 'error' | 'warn';

export interface CheckIssue {
  /** 规则机器码（校验脚本按码断言，勿随意改名） */
  code: string;
  level: CheckLevel;
  /** 中文说明（含修复建议） */
  message: string;
  /** 问题所在 md 行号（1-based） */
  line: number;
}

/* ------------------------------------------------------------------ */
/* 常量与字符集                                                         */
/* ------------------------------------------------------------------ */

/** CJK 基本区 + 扩展 A（中文正文判定用） */
const CJK = '\\u3400-\\u4DBF\\u4E00-\\u9FFF';
/** 中文全角标点簇：作为「中文语境侧」参与 R2 判定（如「）;」中的半角分号也属混用） */
const CJK_PUNCT = '，。、；：？！（）【】《》“”‘’·…—';
const CJK_RE = new RegExp(`[${CJK}]`);
/** R2 中文语境侧 = 汉字 ∪ 中文标点 */
const CJK_CTX = `[${CJK}${CJK_PUNCT}]`;
const PUNCT_DUP = /([。，、；：？！])\1+/g; // 重复标点
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029]/; // 控制/零宽
/** 半角标点 → 全角（R2 修复映射；'.' 与 '...' 单列处理） */
const HALF2FULL: Record<string, string> = {
  ',': '，',
  ';': '；',
  ':': '：',
  '!': '！',
  '?': '？',
  '(': '（',
  ')': '）',
};
const FIXABLE = new Set(['repeated-punct', 'punct-mix', 'cjk-latin-space', 'control-char', 'fullwidth-space']);

/* ------------------------------------------------------------------ */
/* 保护：行内 code / 裸 URL / md 链接 段占位（哨兵 \uFFFF+idx+\uFFFF）      */
/* ------------------------------------------------------------------ */

interface Protected {
  masked: string;
  spans: string[];
}

function protectLine(line: string): Protected {
  const spans: string[] = [];
  let s = line;
  const stash = (m: string): string => {
    const i = spans.length;
    spans.push(m);
    return `\uFFFF${i}\uFFFF`;
  };
  // 行内 code（1-2 个反引号包裹，跨反引号对非贪婪）
  s = s.replace(/(`{1,2})[^`\n]*?\1/g, stash);
  // md 链接 [文](url)（含语法括号，整段保护；文本不参与标点规则）
  s = s.replace(/\[[^\]\n]*\]\([^)\n]*\)/g, stash);
  // 裸 URL（终止于空白/引号/中文字符与中文标点；不含 CJK，防吞后接中文）
  s = s.replace(/https?:\/\/[^\s\u3400-\u4DBF\u4E00-\u9FFF\u3000，。；：！？（）【】“”‘’<>"')\]]+/gi, stash);
  return { masked: s, spans };
}

/** 还原哨兵占位 */
function restore(masked: string, spans: string[]): string {
  return masked.replace(/\uFFFF(\d+)\uFFFF/g, (_m, d: string) => spans[Number(d)] ?? '');
}

/** 该行是否代码围栏行 / 栏内行 */
function fenceState(line: string, inCode: boolean): boolean {
  const t = line.trim();
  if (/^(`{3,}|~{3,})/.test(t)) return !inCode; // 围栏切换
  return inCode;
}

/* ------------------------------------------------------------------ */
/* 行级体检                                                             */
/* ------------------------------------------------------------------ */

function auditLine(lineNo: number, raw: string): CheckIssue[] {
  const out: CheckIssue[] = [];
  const { masked } = protectLine(raw);
  const push = (code: string, level: CheckLevel, message: string, line = lineNo) =>
    out.push({ code, level, message, line });

  // R1 重复标点（error，可修）
  PUNCT_DUP.lastIndex = 0;
  const dup = masked.match(PUNCT_DUP);
  if (dup) push('repeated-punct', 'error', `重复标点「${dup[0]}」：连发标点只需一个（「${dup[0][0]}」）`);

  // R2 半角标点混在中文句内（error，可修）
  // '.' 特例：两侧（任一）是字母/数字/点（英文缩写、小数、版本号、省略号/范围）不算混用 —— 与修复同口径
  const dotSkip = (prev: string | undefined, next: string | undefined): boolean =>
    /[A-Za-z0-9.]/.test((prev ?? '') + (next ?? ''));
  const cjkHits = new Set<string>();
  const re1 = new RegExp(`(${CJK_CTX})([,.;:!?()])`, 'g');
  for (const m of masked.matchAll(re1)) {
    if (m[2] === '.' && dotSkip(undefined, masked[m.index + 2])) continue;
    cjkHits.add(m[2]);
  }
  const re2 = new RegExp(`([,.;:!?()])(${CJK_CTX})`, 'g');
  for (const m of masked.matchAll(re2)) {
    if (m[1] === '.' && dotSkip(masked[m.index - 1], undefined)) continue;
    cjkHits.add(m[1]);
  }
  if (cjkHits.size) {
    const chars = [...cjkHits];
    const sug = chars.map((p) => (p === '.' ? '。' : HALF2FULL[p] ?? p)).join(' ');
    push('punct-mix', 'error', `中文句内混用半角标点（${chars.join(' ')}）：建议改全角（${sug}）`);
  }

  // R3 中英混排缺空格（warn，可修）：中文与拉丁字母相邻（数字除外——年份/数量一体）
  const latinTouch = new RegExp(`([${CJK}])([A-Za-z])|([A-Za-z])([${CJK}])`);
  if (latinTouch.test(masked))
    push('cjk-latin-space', 'warn', '中英混排建议加空格：中文与英文/拼音之间空一格（如「用 Obsidian 写作」）；数字除外');

  // R4 括号 / 引号配对（error/warn，只报不修）
  const cnt = (re: RegExp): number => (masked.match(re) ?? []).length;
  const cnOpen = cnt(/（/g);
  const cnClose = cnt(/）/g);
  if (cnOpen !== cnClose)
    push('bracket-mismatch', 'error', `中文括号不配对：本行（ 有 ${cnOpen} 个、） 有 ${cnClose} 个`);
  const sqOpen = cnt(/【/g);
  const sqClose = cnt(/】/g);
  if (sqOpen !== sqClose)
    push('bracket-mismatch', 'error', `方头括号不配对：本行【 有 ${sqOpen} 个、】 有 ${sqClose} 个`);
  const dq = cnt(/“/g) - cnt(/”/g);
  if (dq % 2 !== 0)
    push('bracket-mismatch', 'warn', '中文双引号疑似未闭合（“ 与 ” 数量不等；若引文跨行可忽略）');
  const sq = cnt(/‘/g) - cnt(/’/g);
  if (sq % 2 !== 0)
    push('bracket-mismatch', 'warn', '中文单引号疑似未闭合（‘ 与 ’ 数量不等；若引文跨行可忽略）');
  const hOpen = cnt(/\(/g);
  const hClose = cnt(/\)/g);
  if (hOpen !== hClose)
    push('bracket-mismatch', 'warn', `半角括号不配对：本行 ( 有 ${hOpen} 个、) 有 ${hClose} 个（中文语境建议改用（ ））`);

  // R5 中文语境直引号（warn，只报不修）
  if (CJK_RE.test(masked) && /["']/.test(masked) && /(["'])[\u3400-\u4DBF\u4E00-\u9FFF]|[\u3400-\u4DBF\u4E00-\u9FFF](["'])/.test(masked))
    push('straight-quote', 'warn', '中文语境出现直引号 " \' ：建议用中文弯引号“ ” ‘ ’');

  // R6 叠字疑似笔误（warn，只报不修）
  const dupWord = masked.match(
    /(的的|了了|是是|在在|和和|与与|就就|都都|也也|很很|将将|对对|不不|把把|被被|又又|再再|我们们|你们们|他们们|自己己)/,
  );
  if (dupWord) push('dup-word', 'warn', `疑似叠字笔误「${dupWord[1]}」：核对是否重复输入`);

  // R7 控制字符 / 零宽字符（error，可修）
  if (CONTROL.test(masked)) {
    const found = [...new Set(masked.match(new RegExp(CONTROL.source, 'g')) ?? [])]
      .map((c) => `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`)
      .join('、');
    push('control-char', 'error', `行内混入不可见字符（${found}）：通常来自网页/文档复制，可一键清除`);
  }

  // R8 全角空格（warn，可修：行首删，行内转普通空格）
  if (masked.includes('\u3000')) push('fullwidth-space', 'warn', '行内出现全角空格（U+3000）：md 正文无需全角空格，一键修复会转为普通空格（行首的删除）');

  return out;
}

/* ------------------------------------------------------------------ */
/* 修复（行级）：只处理 FIXABLE 集合；保护段不参与、原样还原               */
/* ------------------------------------------------------------------ */

function fixLine(raw: string): string {
  const { masked, spans } = protectLine(raw);
  let s = masked;
  // R7 控制字符删除
  s = s.replace(new RegExp(CONTROL.source, 'g'), '');
  // R1 重复标点折叠
  s = s.replace(PUNCT_DUP, (_m, p: string) => p);
  // R2 半角标点 → 全角（仅当紧邻中文语境=汉字或中文标点；'.' 另一侧是字母/数字/点不动）
  const re1 = new RegExp(`(${CJK_CTX})([,.;:!?()])`, 'g');
  s = s.replace(re1, (m: string, c: string, p: string, off: number) => {
    if (p === '.' && /[A-Za-z0-9.]/.test(s[off + 2] ?? '')) return m;
    return c + (HALF2FULL[p] ?? '。');
  });
  const re2 = new RegExp(`([,.;:!?()])(${CJK_CTX})`, 'g');
  s = s.replace(re2, (m: string, p: string, c: string, off: number) => {
    if (p === '.' && /[A-Za-z0-9.]/.test(s[off - 1] ?? '')) return m;
    return (HALF2FULL[p] ?? '。') + c;
  });
  // R3 中英之间补空格
  s = s.replace(new RegExp(`([${CJK}])([A-Za-z])`, 'g'), '$1 $2');
  s = s.replace(new RegExp(`([A-Za-z])([${CJK}])`, 'g'), '$1 $2');
  // R8 行首全角空格删除、行内转普通空格（最后做，避免制造新相邻）
  s = s.replace(/^\u3000+/, '').replace(/\u3000/g, ' ');
  return restore(s, spans);
}

/* ------------------------------------------------------------------ */
/* 对外入口                                                             */
/* ------------------------------------------------------------------ */

/**
 * 全文排版体检。
 * 逐行扫描：frontmatter 区与代码围栏内整行跳过；其余行跑 auditLine。
 */
export function checkDocument(md0: string): CheckIssue[] {
  const md = md0.replace(/^\uFEFF/, '');
  const lines = md.split('\n');
  const issues: CheckIssue[] = [];
  let inFm = false;
  let inCode = false;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();
    // frontmatter：首行 --- 进入，遇下一 --- 退出（仅文件头）
    if (i === 0 && /^-{3,}\s*$/.test(t)) {
      inFm = true;
      continue;
    }
    if (inFm) {
      if (/^-{3,}\s*$/.test(t)) inFm = false;
      continue;
    }
    // 代码围栏切换
    const nextCode = fenceState(raw, inCode);
    if (nextCode !== inCode) {
      inCode = nextCode;
      continue;
    }
    if (inCode) continue;
    issues.push(...auditLine(i + 1, raw));
  }
  return issues;
}

/** 一键修复（仅无歧义项：重复标点 / 半角标点 / 中英空格 / 控制字符 / 全角空格）；返回修复后全文 */
export function fixAll(md0: string): string {
  const md = md0.replace(/^\uFEFF/, '');
  const lines = md.split('\n');
  const out: string[] = [];
  let inFm = false;
  let inCode = false;
  for (const raw of lines) {
    const t = raw.trim();
    if (out.length === 0 && /^-{3,}\s*$/.test(t)) {
      inFm = true;
      out.push(raw);
      continue;
    }
    if (inFm) {
      out.push(raw);
      if (/^-{3,}\s*$/.test(t)) inFm = false;
      continue;
    }
    const nextCode = fenceState(raw, inCode);
    if (nextCode !== inCode) {
      inCode = nextCode;
      out.push(raw);
      continue;
    }
    out.push(inCode ? raw : fixLine(raw));
  }
  return out.join('\n');
}

/** 规则速查（写作面板「标点体检速览」与文档共用；code 为机器码勿改名） */
export const CHECK_RULES: { code: string; label: string; fixable: boolean }[] = [
  { code: 'repeated-punct', label: '重复标点', fixable: true },
  { code: 'punct-mix', label: '半角标点混用', fixable: true },
  { code: 'cjk-latin-space', label: '中英空格', fixable: true },
  { code: 'bracket-mismatch', label: '括号引号配对', fixable: false },
  { code: 'straight-quote', label: '直引号', fixable: false },
  { code: 'dup-word', label: '叠字', fixable: false },
  { code: 'control-char', label: '控制字符', fixable: true },
  { code: 'fullwidth-space', label: '全角空格', fixable: true },
];

/** 给定 issues，判定某 code 是否可一键修复（fixAll 与速览卡共用口径） */
export function isFixable(code: string): boolean {
  return FIXABLE.has(code);
}
