/**
 * context.ts —— RedQuill 上下文判定器（v1.0.0 合一新增，P3.2）
 *
 * 合一后同一批命令（体检/面板/净化）按「文档上下文」切换体验：
 *  - generic（通用，默认）：无公文 frontmatter 的普通 md → 通用八条体检 / 五卡写作面板
 *  - gongwen（公文）：frontmatter 命中 RedHead 要素（`rh-` 平铺键或 `redhead:` 嵌套块，
 *    值去引号后非空）→ 公文结构体检 / 公文面板卡组 / 预览导出
 *
 * 纯逻辑、零 Obsidian 依赖（tests/entry_merge 可 esbuild → node 机器校验）。
 * 判定语义与 gongwen/mdast.extractRedHead 严格对齐：值「去引号后非空」才算命中，
 * 避免「判定器说公文、解析器却解析不出 meta」的错位。
 */

import { RED_HEAD_KEYS } from './gongwen/mdast';

export type DocContext = 'generic' | 'gongwen';
/** 手动覆盖三态：auto=交给 frontmatter 判定；gongwen/generic=会话级强制（不入 data.json） */
export type ContextMode = 'auto' | 'gongwen' | 'generic';

/** 平铺键：`rh-agency: XX镇人民政府`（Obsidian 属性面板逐条独立编辑，推荐写法） */
const FLAT_RE = /^rh-([A-Za-z]+)\s*:\s*(.*)$/;
/** 嵌套块头：`redhead:`（老笔记兼容写法） */
const NEST_HEAD_RE = /^redhead\s*:/;
/** 嵌套块内缩进键：`  agency: XX`（顶层红头键可能是 redhead，也可能是同层其他键） */
const NEST_KEY_RE = /^\s+([A-Za-z_]+)\s*:\s*(.*)$/;

/** 去首尾引号（与 extractRedHead 取值口径一致：`"xx"`/`'xx'` 剥壳） */
const unquote = (s: string): string => s.trim().replace(/^["']|["']$/g, '');

const isRedKey = (k: string): boolean => (RED_HEAD_KEYS as readonly string[]).includes(k);

/**
 * frontmatter 原文是否命中公文标记。
 * 只认顶层行（平铺 rh- 键）或 `redhead:` 块内的缩进键；值空（含 `''`/`""`）不算命中
 * —— 空模板、表单未填字段不触发公文上下文。
 */
export function frontmatterIsGongwen(fmText: string): boolean {
  let inNested = false;
  for (const raw of fmText.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) {
      // 顶层行：先重置嵌套标志，再试平铺键（与 extractRedHead 逐行口径一致）
      inNested = NEST_HEAD_RE.test(line);
      const flat = line.match(FLAT_RE);
      if (flat && isRedKey(flat[1]) && unquote(flat[2])) return true;
      continue;
    }
    // 缩进行：仅 redhead 块内参与判定；tags 列表等无关缩进跳过
    if (!inNested) continue;
    const kv = line.match(NEST_KEY_RE);
    if (kv && isRedKey(kv[1]) && unquote(kv[2])) return true;
  }
  return false;
}

/** 整篇 md 判定：剥 frontmatter 块 → 命中即公文，否则通用 */
export function detectContext(md: string): DocContext {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return 'generic';
  return frontmatterIsGongwen(m[1]) ? 'gongwen' : 'generic';
}

/** 手动覆盖闸门（会话级状态，插件持有单例）。mode=auto 时交给 frontmatter 判定 */
export class ContextGate {
  mode: ContextMode = 'auto';

  setMode(m: ContextMode): void {
    this.mode = m;
  }

  /** 生效上下文：手动强制 > frontmatter 自动判定 */
  resolve(md: string): DocContext {
    if (this.mode === 'gongwen') return 'gongwen';
    if (this.mode === 'generic') return 'generic';
    return detectContext(md);
  }
}
