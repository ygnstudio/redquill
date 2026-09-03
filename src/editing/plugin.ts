// plugin.ts —— RedQuill v1.1 CM6 真扩展接线（④双击词段 / ⑤引号输入自动配对）
// 经 Plugin.registerEditorExtension 注册（minAppVersion 1.4.0+ 支持 Editor Extensions）。
// 依赖 @codemirror/state|view 由 Obsidian 运行时内置副本 resolve，esbuild 已 external（防双实例）。
// 纯逻辑在 segments.ts / quotes.ts（可机器校验），本文件只做事件→纯函数→dispatch 的薄接线。

import { EditorView, ViewPlugin } from '@codemirror/view';
import { EditorSelection, Extension } from '@codemirror/state';
import { wordSegmentAt } from './segments';
import { quotePairAt } from './quotes';

/** 双击词段：落在非空白词段上时按自定义粒度选中（中英分流/标点不粘连），返回 true 阻止默认 */
const dblclickSegment = ViewPlugin.fromClass(
  class {
    constructor(readonly view: EditorView) {}
  },
  {
    eventHandlers: {
      dblclick(event: MouseEvent, view: EditorView): boolean {
        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
        if (pos === null || pos === undefined) return false;
        const seg = wordSegmentAt(view.state.doc.toString(), pos);
        if (!seg) return false; // 空白/异常：交还默认行为
        const [s, e] = seg;
        const sel = view.state.selection.main;
        // 与当前选区一致则不动（避免无谓事务干扰其他选区）
        if (sel.from === s && sel.to === e) return true;
        view.dispatch({
          selection: EditorSelection.single(s, e),
          scrollIntoView: true,
          userEvent: 'select.pointer',
        });
        return true;
      },
    },
  },
);

/** 引号输入：光标处敲 " 时按中文语境成对/补右/跳越；代码围栏与英文语境直通半角 */
const quoteInput = EditorView.inputHandler.of(
  (view: EditorView, from: number, to: number, text: string): boolean => {
    if (text !== '"' || from !== to) return false; // 只拦单个 " 的无选区输入
    const r = quotePairAt(view.state.doc.toString(), from);
    if (!r) return false;
    if (r.type === 'jump' && r.replacement === '') {
      view.dispatch({ selection: EditorSelection.single(r.from, r.to), scrollIntoView: true });
    } else {
      view.dispatch({
        changes: { from, to, insert: r.replacement },
        selection: EditorSelection.single(r.from, r.to),
        scrollIntoView: true,
      });
    }
    return true;
  },
);

/** v1.1 CM6 扩展组：双击词段 + 引号配对（合并为单 Extension 供 registerEditorExtension 注册） */
export function buildEditingExtensions(): Extension {
  return [dblclickSegment, quoteInput];
}
