/**
 * checker.ts —— 公文排版体检（v0.7.0）
 *
 * 纯函数、无 Obsidian 依赖：输入整篇 md，输出结构化问题清单（可点击行号定位）。
 * 只自查、不修改、不阻塞导出。三端共用：
 *  - 插件命令「公文排版体检」/ 预览面板「体检」按钮 → ReportModal
 *  - CLI：node dist/cli.js input.md --check → JSON（error 时 exit 2）
 *
 * 规则分级：
 *  - error：内容会丢 / 明显格式错误 / 要素成对缺失（应修再发文）
 *  - warn ：规范建议 / 疑似（可按需忽略）
 */

import { parseDocument, RED_HEAD_KEYS } from './mdast.js';

export type CheckLevel = 'error' | 'warn';

export interface CheckIssue {
  /** 规则机器码（校验脚本按码断言，勿随意改名） */
  code: string;
  level: CheckLevel;
  /** 中文说明（含修复建议） */
  message: string;
  /** 问题所在 md 行号（1-based；frontmatter/正文均可定位；定位不到省略） */
  line?: number;
}

const FLAT = 'rh-';
const KNOWN_KEYS: string[] = RED_HEAD_KEYS as string[];

/* ------------------------------------------------------------------ */
/* 行号工具                                                            */
/* ------------------------------------------------------------------ */

interface Fm {
  /** frontmatter 内容（开栏 --- 与闭栏 --- 之间的原文，不含栏线） */
  lines: string[];
}

/** 提取 frontmatter 内容（剥 BOM；无 frontmatter → null） */
function fmOf(md: string): Fm | null {
  const m = md.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  return { lines: m[1].split(/\r?\n/) };
}

/** fm 内第 i 行（0-based）在全文 md 的行号（1-based）：第 1 行是开栏 ---，内容从第 2 行起 */
function fmAbsLine(fm: Fm, i: number): number {
  return 2 + i;
}

/** 在全文 md 中定位某文本首次出现的行号（1-based；找不到 → undefined） */
function lineOf(md: string, needle: string): number | undefined {
  const idx = md.indexOf(needle);
  if (idx < 0) return undefined;
  return md.slice(0, idx).split('\n').length;
}

/** 在 frontmatter 中找 `key:` 行号（平铺 rh-key 或旧嵌套 key 均可） */
function fmKeyLine(fm: Fm, key: string): number | undefined {
  for (let i = 0; i < fm.lines.length; i++) {
    if (new RegExp(`^\\s*(?:${FLAT})?${key}\\s*:`).test(fm.lines[i])) return fmAbsLine(fm, i);
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* 文本小工具                                                          */
/* ------------------------------------------------------------------ */

/** 最小编辑距离（≤3 内即够用，用于拼写近似提示） */
function editDist(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return 4;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[m][n];
}

/** 与已知 rh-* 键最接近的拼写建议（编辑距离 ≤3；无则 null） */
function closestKey(raw: string): string | null {
  let best: string | null = null;
  let bestD = 4;
  for (const k of KNOWN_KEYS) {
    const d = editDist(raw.toLowerCase(), k.toLowerCase());
    if (d < bestD) {
      bestD = d;
      best = k;
    }
  }
  return bestD <= 3 ? best : null;
}

/** 发文字号格式校验：返回警告文案（null=通过）。国标要求年份用全角六角括号〔〕 */
export function validateDocNumber(n?: string): string | null {
  const t = (n ?? '').trim();
  if (!t) return null;
  if (/[[\]()]/.test(t)) return '发文字号的年份括号应使用全角六角括号〔〕，如 X政发〔2026〕12号';
  if (!/〔\d{4}〕/.test(t)) return '发文字号建议采用「机关代字〔年份〕序号号」格式，如 X政发〔2026〕12号';
  return null;
}

/* ------------------------------------------------------------------ */
/* 体检主入口                                                          */
/* ------------------------------------------------------------------ */

export function checkDocument(md0: string): CheckIssue[] {
  const md = md0.replace(/^\uFEFF/, '');
  const issues: CheckIssue[] = [];
  const { meta, blocks } = parseDocument(md);
  const fm = fmOf(md);

  const push = (code: string, level: CheckLevel, message: string, line?: number) => {
    issues.push({ code, level, message, ...(line !== undefined ? { line } : {}) });
  };
  const rhLine = (key: keyof typeof meta): number | undefined => (fm ? fmKeyLine(fm, key) : undefined);

  /* ---- ① frontmatter：rh-* 键拼写 / 发文字号 ---- */

  // rh-xxx: 键拼写（不在已知表 → error，带最近键建议）
  if (fm) {
    for (let i = 0; i < fm.lines.length; i++) {
      const m = fm.lines[i].match(new RegExp(`^${FLAT}([A-Za-z][A-Za-z0-9]*)\\s*:`));
      if (m && !KNOWN_KEYS.includes(m[1])) {
        const near = closestKey(m[1]);
        push(
          'unknown-rh-key',
          'error',
          `rh-${m[1]} 不是有效的公文属性（拼写错误或不存在）${near ? `，是否想写 rh-${near}？` : '。参考：rh-agency / rh-docNumber / rh-date / rh-signature / rh-printOrg / rh-printDate / rh-printCopies 等'}`,
          fmAbsLine(fm, i),
        );
      }
    }
  }

  // 发文字号：有 agency（红头）而缺 → warn；格式错 → error
  const docNumber = (meta.docNumber ?? '').trim();
  if (!docNumber) {
    if (meta.agency?.trim() && meta.date) {
      push('no-doc-number', 'warn', '红头文件通常需要发文字号：补 rh-docNumber（如 X政发〔2026〕12号）', rhLine('date'));
    }
  } else {
    const msg = validateDocNumber(docNumber);
    if (msg) push('doc-number-format', 'error', `rh-docNumber：${msg}`, rhLine('docNumber'));
  }

  /* ---- ② 成文日期 / 署名 ---- */

  const date = (meta.date ?? '').trim();
  const signature = (meta.signature ?? '').trim();

  // 成文日期格式：GB/T 要求阿拉伯数字年月日（2026年9月3日）
  if (date && !/^\d{4}\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日/.test(date)) {
    if (/^\d{4}[-/.]/.test(date)) push('date-format', 'warn', '成文日期建议用国标格式「XXXX年X月X日」（如 2026年9月3日），当前为 ' + date, rhLine('date'));
  }
  if (signature && !date) {
    push('date-missing', 'error', '有署名机关（rh-signature）但缺成文日期：补 rh-date（右空 4 字，如 2026年9月3日）', rhLine('signature'));
  } else if (date && !signature && (meta.agency || meta.cc)) {
    push('signature-missing', 'warn', '有成文日期但缺署名机关（rh-signature）：正式发文通常需署名', rhLine('date'));
  }
  // 时序：成文日期早于发文字号年份 → 矛盾
  if (date && docNumber) {
    const dYear = Number(date.match(/(\d{4})\s*年/)?.[1] ?? NaN);
    const nYear = Number(docNumber.match(/〔(\d{4})〕/)?.[1] ?? NaN);
    if (Number.isFinite(dYear) && Number.isFinite(nYear) && dYear < nYear) {
      push('date-before-doc-year', 'error', `成文日期（${date}）早于发文字号年份（${nYear}），时序矛盾，请核对`, rhLine('date'));
    }
  }

  /* ---- ③ 附件说明 ---- */

  const attachments = (meta.attachments ?? '').trim();
  if (attachments && /[、，,]/.test(attachments)) {
    push('attachment-format', 'warn', 'rh-attachments 多附件请用 / 分隔（如「附件A / 附件B」），正文渲染为逐条「附件：」', rhLine('attachments'));
  }

  /* ---- ④ 版记要素缺漏 ---- */

  const hasCc = (meta.cc ?? '').trim().length > 0;
  const hasOrg = (meta.printOrg ?? '').trim().length > 0;
  const hasPDate = (meta.printDate ?? '').trim().length > 0;
  const hasCopies = (meta.printCopies ?? '').trim().length > 0;
  if (hasCc || hasOrg || hasPDate || hasCopies) {
    const missing: string[] = [];
    if (!hasOrg) missing.push('印发机关（rh-printOrg）');
    if (!hasPDate) missing.push('印发时间（rh-printDate）');
    if (missing.length) {
      push(
        'colophon-incomplete',
        'error',
        `版记要素缺漏：${missing.join('、')}。版记须有「印发机关 印发日期」成对（左空 1 字对排，日期自动补「印发」）`,
        rhLine('printOrg') ?? rhLine('printDate') ?? rhLine('printCopies') ?? rhLine('cc'),
      );
    }
    if (!hasCopies) {
      push('colophon-copies-missing', 'warn', '版记建议补印发份数（rh-printCopies，右空 3 字渲染为「印N份」）', rhLine('printDate') ?? rhLine('printOrg'));
    }
    // 抄送与印发机关不应同机关重复（县级常见笔误：抄送含印发机关名）——不做，易误报
  }

  /* ---- ⑤ 正文结构 ---- */

  // 标题层级：首个深层标题缺上层 → 跳级 warn（md 层映射：# 文件标题 / ## 一、/ ### （一）/ #### 1.）
  const kinds = blocks.filter((b) => b.kind === 'h1' || b.kind === 'h2' || b.kind === 'h3');
  {
    const seen = { h1: false, h2: false, h3: false };
    for (const b of kinds) {
      if (b.kind === 'h2' && !seen.h1) {
        push(
          'heading-skip',
          'warn',
          `正文出现二级标题「${b.text.slice(0, 24)}」而此前没有一级标题（## 一、）：标题层级疑似跳级，检查该处 md 标题级别`,
          lineOf(md, b.text),
        );
      } else if (b.kind === 'h3' && !seen.h2) {
        push(
          'heading-skip',
          'warn',
          `正文出现三级标题「${b.text.slice(0, 24)}」而此前没有二级标题（### （一））：标题层级疑似跳级，检查该处 md 标题级别`,
          lineOf(md, b.text),
        );
      }
      if (b.kind === 'h1') seen.h1 = true;
      else if (b.kind === 'h2') seen.h2 = true;
      else seen.h3 = true;
    }
  }

  // 全文结构：无红头无标题无正文 → 空文档
  const hasAny = Object.values(meta).some((v) => typeof v === 'string' && (v as string).trim());
  if (!hasAny && !blocks.some((b) => b.kind === 'docTitle' || (b.kind === 'para' && b.text.trim()))) {
    push('empty-document', 'warn', '全文为空：既无公文属性（rh-*）也无标题/正文。若非空文件，检查 frontmatter 是否完整（开栏 --- 与闭栏 ---）');
  }

  return issues;
}
