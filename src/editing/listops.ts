// listops.ts —— RedQuill v1.1 ⑦列表续排增强 纯函数引擎（零 obsidian 依赖）
// 设计见 design_doc_2026-09-03_v11_v12_plan_active.md §4 v1.1 ⑦（用户裁定候选：打断列表 + 列表转纯文本）
// Obsidian 原生已满足 Enter 续排；本模块补两个轻量命令：
//  - breakList：列表项内打断——在光标处插空行跳出列表回正文（新行打字无列表前缀）
//  - listToPlain：整块列表转纯文本（去标记前缀，保留缩进/续行）

/** 所在行行首是否为 md 列表标记（- * + 或 1. 1) 等） */
const LIST_RE = /^\s*(?:[-*+]|\d{1,3}[.)])\s+/;

/** 打断列表（delta 版）：光标在列表行尾时，返回在行尾插入空行的事务参数（一次 undo）。
 *  非列表行 / 光标后还有非空白内容 → null（调用方提示）。 */
export function breakList(
  text: string,
  offset: number,
): { from: number; to: number; insert: string; cursor: number } | null {
  const len = text.length;
  const cur = Math.max(0, Math.min(offset, len));
  const lineStart = text.lastIndexOf('\n', cur - 1) + 1;
  let lineEnd = text.indexOf('\n', cur);
  if (lineEnd === -1) lineEnd = len;
  if (lineEnd > lineStart && text[lineEnd - 1] === '\r') lineEnd--;
  const line = text.slice(lineStart, lineEnd);
  if (!LIST_RE.test(line)) return null;
  // 光标后还有非空白内容 → 打断会把后半句甩成新段落（语义怪），拒绝
  if (cur < lineEnd && text.slice(cur, lineEnd).trim() !== '') return null;
  const hasNl = lineEnd < len && text[lineEnd] === '\n';
  return {
    from: lineEnd,
    to: lineEnd,
    insert: hasNl ? '\n' : '\n\n',
    cursor: lineEnd + 1,
  };
}

/** 逐行去列表标记：^(\s*)([-*+]|\d[.)])\s+ → $1（保留缩进）；无标记行原样 */
export function listToPlain(text: string): string {
  return text.replace(/^(\s*)(?:[-*+]|\d{1,3}[.)])\s+/gm, '$1');
}
