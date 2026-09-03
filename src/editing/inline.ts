// inline.ts —— RedQuill v1.1 ⑤输入辅助·行内格式 toggle 纯函数引擎（零 obsidian 依赖）
// 设计见 design_doc_2026-09-03_v11_v12_plan_active.md §4 v1.1 ⑤
// 语义（mark 为对称闭合符，如 ** == ~~ `）：
//  - 有选区：选区两端已被同 mark 包裹 → 剥离；否则包裹
//  - 无选区：在光标处插入 mark+mark，光标居中（等用户打字后输 mark 闭合）
// UI 接线用 inlineReplace 的最小单段替换（一次 undo）；toggleInline 是其完整文本包装（供校验）。

export interface InlineReplace {
  from: number; // 待替换区间 [from, to)
  to: number;
  insert: string; // 替换文本
  anchor: number; // 新光标选区
  head: number;
}

export function inlineReplace(
  text: string,
  a: number,
  b: number,
  mark: string,
): InlineReplace {
  const len = text.length;
  const s = Math.max(0, Math.min(a, len));
  const e = Math.max(s, Math.min(b, len));
  const ml = mark.length;
  if (ml === 0) return { from: s, to: e, insert: text.slice(s, e), anchor: s, head: e };
  // 剥离：选区前紧贴 mark 且选区后紧贴 mark
  if (e > s && s >= ml && text.slice(s - ml, s) === mark && text.slice(e, e + ml) === mark) {
    return { from: s - ml, to: e + ml, insert: text.slice(s, e), anchor: s - ml, head: e - ml };
  }
  if (e <= s) {
    // 无选区：插 mark+mark，光标居中
    return { from: s, to: s, insert: mark + mark, anchor: s + ml, head: s + ml };
  }
  // 包裹
  return {
    from: s,
    to: e,
    insert: mark + text.slice(s, e) + mark,
    anchor: s + ml,
    head: e + ml,
  };
}

/** 完整文本版（校验/参考用）：返回替换后的全文与光标 */
export function toggleInline(
  text: string,
  a: number,
  b: number,
  mark: string,
): { text: string; from: number; to: number } {
  const r = inlineReplace(text, a, b, mark);
  return {
    text: text.slice(0, r.from) + r.insert + text.slice(r.to),
    from: r.anchor,
    to: r.head,
  };
}
