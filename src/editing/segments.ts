// segments.ts —— RedQuill v1.1 ④光标与选区 纯函数引擎（零 obsidian 依赖，可机器校验）
// 设计见 docs/design_doc_2026-09-03_v11_v12_plan_active.md §4 v1.1 ④
//  - wordSegmentAt: 双击中文词段粒度——中/英/数按类别分流成段，标点/空白不并入
//    （v1 不做分词器：中文连续串=一段，但中英混排不再互并，标点不再粘连）
//  - blockRangeAt: 整段选中——空行界定的文本块范围（md 块语义）
//  - titleLineRangeAt: 标题行窄化（选中「段」命令在标题行只选标题本身，不吞后续正文）

export type SegCls = 'cjk' | 'alnum' | 'other';

/** 汉字（基本 + 扩展A + 兼容 + 扩展B-F，codePointAt 已解代理对） */
function isCjk(cp: number): boolean {
  return (
    (cp >= 0x3400 && cp <= 0x4dbf) || // CJK 扩展 A
    (cp >= 0x4e00 && cp <= 0x9fff) || // CJK 基本
    (cp >= 0xf900 && cp <= 0xfaff) || // CJK 兼容
    (cp >= 0x20000 && cp <= 0x2fa1f)  // CJK 扩展 B-F
  );
}

export function segClsOf(ch: string): SegCls {
  if (!ch) return 'other';
  const cp = ch.codePointAt(0)!;
  if (isCjk(cp)) return 'cjk';
  // ASCII 字母/数字/下划线 → alnum（代码标识、英文词、版本号）
  if (
    (cp >= 0x30 && cp <= 0x39) ||
    (cp >= 0x41 && cp <= 0x5a) ||
    (cp >= 0x61 && cp <= 0x7a) ||
    cp === 0x5f
  )
    return 'alnum';
  return 'other';
}

const isBlank = (ch: string): boolean => ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';

/**
 * 双击词段：以 offset 为中心向两侧扩展同类字符。
 *  - cjk/alnum：向两侧吸收同类（中英/数字互不并入，标点天然成界）
 *  - 标点连串（。。。/！！！/……）吸收同字符
 *  - 落在空白上：返回 null（调用方交还默认行为，双击空白无意义）
 * 返回 [start, end) 或 null。
 */
export function wordSegmentAt(text: string, offset: number): [number, number] | null {
  const len = text.length;
  if (!len) return null;
  const pos = Math.max(0, Math.min(offset, len - 1));
  const ch = text[pos];
  if (isBlank(ch)) return null;
  const cls = segClsOf(ch);
  if (cls === 'other') {
    // 标点/符号：只吸收「同字符连串」（…、。。），异字符不并
    let s = pos, e = pos;
    while (s > 0 && text[s - 1] === ch) s--;
    while (e + 1 < len && text[e + 1] === ch) e++;
    return [s, e + 1];
  }
  let s = pos, e = pos;
  while (s > 0 && segClsOf(text[s - 1]) === cls) s--;
  while (e + 1 < len && segClsOf(text[e + 1]) === cls) e++;
  return [s, e + 1];
}

/** offset 所在行 [lineStart, lineEnd)（不含换行符与行尾 \r）；空文本返回 [0,0] */
export function lineRangeAt(text: string, offset: number): [number, number] {
  const len = text.length;
  const cur = Math.max(0, Math.min(offset, len));
  const lineStart = text.lastIndexOf('\n', cur - 1) + 1;
  let lineEnd = text.indexOf('\n', cur);
  if (lineEnd === -1) lineEnd = len;
  if (lineEnd > lineStart && text[lineEnd - 1] === '\r') lineEnd--; // CRLF 行尾 \r 不属行内容
  return [lineStart, lineEnd];
}

const isBlankLine = (text: string, s: number, e: number): boolean =>
  text.slice(s, e).trim() === '';

/**
 * 整段选中：空行界定的文本块（md 块语义——段/列表连续行/引用块无空行即同块）。
 * offset 落在空行上时返回该空行范围（宽度≈0，调用方可忽略）。
 * 返回 [start, end)。
 */
export function blockRangeAt(text: string, offset: number): [number, number] {
  const len = text.length;
  if (!len) return [0, 0];
  const [lineStart, lineEnd] = lineRangeAt(text, offset);
  if (isBlankLine(text, lineStart, lineEnd)) return [lineStart, lineEnd];
  // 段首：向上跨空行
  let start = lineStart;
  while (start > 0) {
    const prevEnd = start - 1; // 上一行行尾（\n 位置）
    const prevStart = text.lastIndexOf('\n', prevEnd - 1) + 1;
    if (isBlankLine(text, prevStart, prevEnd)) break;
    start = prevStart;
  }
  // 段尾：向下跨空行
  let end = lineEnd;
  while (end < len) {
    const nextStart = end + 1;
    const raw = text.indexOf('\n', nextStart);
    const nextEnd = raw === -1 ? len : raw;
    if (isBlankLine(text, nextStart, nextEnd)) break;
    end = nextEnd;
  }
  return [start, end];
}

/**
 * 标题行窄化（命令「选中当前段」用）：光标所在行若是 md 标题（#~###### + 空格）
 * 且正是块首行 → 收窄到该标题行本身（不吞后续正文）；否则返回原块。
 */
export function titleLineRangeAt(text: string, block: [number, number], offset: number): [number, number] {
  const [s, e] = block;
  if (e <= s) return [s, e];
  const [lineStart, lineEnd] = lineRangeAt(text, s);
  if (lineStart === s) {
    const line = text.slice(lineStart, lineEnd);
    if (/^#{1,6}\s+/.test(line)) {
      const curLine = lineRangeAt(text, Math.max(0, Math.min(offset, text.length)))[0];
      return curLine === s ? [lineStart, lineEnd] : [s, e];
    }
  }
  return [s, e];
}
