/**
 * mdast.ts —— md 结构轻解析（MDQuill v0.1.0）
 *
 * 纯函数、无 Obsidian 依赖。只做写作面板与导航需要的三件事：
 *  - 标题树 outlineOf：h1-h3 大纲（含行号，点击跳转）
 *  - 行号即源码行号（1-based），frontmatter 与代码围栏内不产生条目
 *  - 中文字符/段统计（面板「字数」卡）
 */

export interface OutlineItem {
  /** md 标题级：1 = #，2 = ##，3 = ### */
  level: 1 | 2 | 3;
  /** 标题文本（剥 # 前缀与首尾空白） */
  text: string;
  /** 源码行号（1-based） */
  line: number;
}

/** 代码围栏状态切换：围栏行翻转状态（与 checker 同口径，保持两端一致） */
function fenceState(line: string, inCode: boolean): boolean {
  const t = line.trim();
  if (/^(`{3,}|~{3,})/.test(t)) return !inCode;
  return inCode;
}

/** 标题树：全文 h1-h3，跳过 frontmatter 区与代码围栏；h4+ 不收 */
export function outlineOf(md0: string): OutlineItem[] {
  const md = md0.replace(/^\uFEFF/, '');
  const lines = md.split('\n');
  const out: OutlineItem[] = [];
  let inFm = false;
  let inCode = false;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();
    if (i === 0 && /^-{3,}\s*$/.test(t)) {
      inFm = true;
      continue;
    }
    if (inFm) {
      if (/^-{3,}\s*$/.test(t)) inFm = false;
      continue;
    }
    const nextCode = fenceState(raw, inCode);
    if (nextCode !== inCode) {
      inCode = nextCode;
      continue;
    }
    if (inCode) continue;
    const m = raw.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);
    if (m) {
      const text = m[2].replace(/\s+#+\s*$/, '').trim();
      if (text) out.push({ level: m[1].length as 1 | 2 | 3, text, line: i + 1 });
    }
  }
  return out;
}

/** 字符统计：中文数 / 非空白字符数 / 总字符数（面板与文档共用口径；按码点计） */
export function charStats(text: string): { chinese: number; nonspace: number; total: number } {
  let chinese = 0;
  let nonspace = 0;
  let total = 0;
  for (const ch of text.replace(/^\uFEFF/, '')) {
    total += 1;
    if (/[\u3400-\u4DBF\u4E00-\u9FFF]/.test(ch)) chinese += 1;
    if (!/\s/.test(ch)) nonspace += 1;
  }
  return { chinese, nonspace, total };
}
