// quotes.ts —— RedQuill v1.1 ⑤输入辅助·中文引号配对 纯函数引擎（零 obsidian 依赖）
// 设计见 design_doc_2026-09-03_v11_v12_plan_active.md §4 v1.1 ⑤
// 触发场景：用户在编辑器光标 offset 处敲下 "（半角双引号键）时判定行为。
// v1 范围收敛：只做中文弯引号 “ ” 的自动成对 / 跳越 / 闭合，不做半角自动补全
// （避免误伤代码与英文），代码围栏内直通。

import { segClsOf } from './segments';

export type QuoteResult =
  | { type: 'open'; replacement: string; from: number; to: number } // 插 “” 光标居中
  | { type: 'close'; replacement: string; from: number; to: number } // 补右引号 ”
  | { type: 'jump'; replacement: string; from: number; to: number } // 越过已存在的 ”
  | null; // 直通半角（英文/代码/围栏内）

/** 最近 window 字符内是否含汉字（中文语境判定，全角标点不算但常见于中文行故只看汉字） */
function hasCjkNear(text: string, offset: number, win = 40): boolean {
  const from = Math.max(0, offset - win);
  const to = Math.min(text.length, offset + win);
  for (let i = from; i < to; i++) {
    if (segClsOf(text[i]) === 'cjk') return true;
  }
  return false;
}

/** offset 是否处于代码围栏（``` 开合计数，行首 ``` 或 ```lang）内 */
export function inFence(text: string, offset: number): boolean {
  const cur = Math.max(0, Math.min(offset, text.length));
  const upTo = text.slice(0, cur);
  const lines = upTo.split('\n');
  // 光标所在行本身以 ``` 开头时不视为围栏内（在开栏/闭栏行上直接输）
  const curLine = lines.length - 1;
  if (/^\s*```/.test(lines[curLine] ?? '')) return false;
  let fence = 0;
  for (let i = 0; i < curLine; i++) {
    if (/^\s*```/.test(lines[i])) fence++;
  }
  return fence % 2 === 1;
}

export function quotePairAt(text: string, offset: number): QuoteResult {
  const len = text.length;
  if (!len) return null;
  const pos = Math.max(0, Math.min(offset, len));
  if (inFence(text, pos)) return null;
  const before = pos > 0 ? text[pos - 1] : '';
  const after = pos < len ? text[pos] : '';
  // 1) 光标紧贴右引号前（内容末尾，如 “你好|”）→ 跳越到 ” 后
  if (after === '\u201d') return { type: 'jump', replacement: '', from: pos + 1, to: pos + 1 };
  // 2) 前方最近弯引号是未闭合的左引号（内容尾部想收口，如 “你好，|）→ 补右引号
  //    （扫描近窗找最近的 “ 或 ”；最近是 ” 则已闭合走 open 新开一对）
  const winStart = Math.max(0, pos - 40);
  for (let i = pos - 1; i >= winStart; i--) {
    const ch = text[i];
    if (ch === '\u201c') {
      if (after !== '\u201d')
        return { type: 'close', replacement: '\u201d', from: pos + 1, to: pos + 1 };
      break;
    }
    if (ch === '\u201d') break; // 已闭合，不再补
  }
  // 3) 两侧夹字母数字（英文词/代码标识中）→ 直通半角
  const prevIsAlnum = !!before && segClsOf(before) === 'alnum';
  const nextIsAlnum = !!after && segClsOf(after) === 'alnum';
  if (prevIsAlnum || nextIsAlnum) return null;
  // 4) 中文语境 → 成对弯引号
  if (!hasCjkNear(text, pos)) return null;
  return { type: 'open', replacement: '\u201c\u201d', from: pos + 1, to: pos + 1 };
}

export interface CurlyWrapDelta {
  from: number; // 待替换区间 [from, to)
  to: number;
  insert: string; // 替换文本
  anchor: number; // 新光标选区
  head: number;
}

/** 选区包裹中文弯引号（delta 最小事务版，UI 用，一次 undo）：
 *  有选区 → “选区”；无选区 → 插 “” 光标居中 */
export function curlyWrapDelta(text: string, a: number, b: number): CurlyWrapDelta {
  const s = Math.max(0, Math.min(a, text.length));
  const e = Math.max(s, Math.min(b, text.length));
  if (e <= s) {
    return { from: s, to: s, insert: '\u201c\u201d', anchor: s + 1, head: s + 1 };
  }
  return {
    from: s,
    to: e,
    insert: '\u201c' + text.slice(s, e) + '\u201d',
    anchor: s + 1,
    head: e + 1,
  };
}

/** 选区包裹（完整文本版，校验/参考用）：返回替换后的全文与光标 */
export function curlyWrap(text: string, a: number, b: number): { text: string; from: number; to: number } {
  const r = curlyWrapDelta(text, a, b);
  return { text: text.slice(0, r.from) + r.insert + text.slice(r.to), from: r.anchor, to: r.head };
}
