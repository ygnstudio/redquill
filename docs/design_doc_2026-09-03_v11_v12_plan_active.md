# RedQuill v1.1 / v1.2 开发蓝图（plan active）

- 版本：design_doc_2026-09-03_v11_v12_plan_active（立项蓝图，落地后升 _active）
- 日期：2026-09-03
- 前身：MDQuill design_doc §1 需求全集（8 块）§2 版本线 —— 合一 v1.0.0 只落地前 3 块，本蓝图承接剩余 5 块

## 0. 一句话

v1.0.0 是「两线合拢」（已验证能力搬家），v1.1/v1.2 才是增强 md 写作体验主线上**真正要现研**的硬骨头——啃 Obsidian CM6 编辑器层，与公文线完全正交。

## 1. 用户裁定（2026-09-03）

- 方向问询「还有什么要开发的」→ 参谋列 v0.2/v0.3 规划 → 用户拍板「**都做完**」
- 范围：④光标与选区 ⑤输入辅助 ⑦列表续排（原 v0.2）＋ ⑥长文导航 ⑧md 语法工坊（原 v0.3），五块全做
- 版号：合一后主版本已 1.0.0，原 v0.2/v0.3 顺延为 **v1.1 / v1.2** 两个发布档

## 2. 地基探明（CM6 扩展可行性，2026-09-03 查 obsidian.d.ts@1.13.1）

| 结论 | 依据 |
|---|---|
| **CM6 真扩展可行**：插件可 import `@codemirror/state` / `@codemirror/view` 类型与类，Obsidian 运行时以内置副本 resolve（不可 bundle 双份） | obsidian.d.ts 头部自身 `import { Extension, StateField } from '@codemirror/state'`、`import { EditorView, ViewPlugin } from '@codemirror/view'` |
| **官方注册口**：`Plugin.registerEditorExtension(extension: Extension)` | obsidian.d.ts:5019 |
| **可拿真实 view**：`editorEditorField: StateField<EditorView>`（经 EditorView.editorViewField 互取），可 dispatch/scrollIntoView | obsidian.d.ts:2597 |
| **minAppVersion 达标**：Editor Extensions API 需 1.4.0+，manifest 现为 1.4.0 | — |
| **esbuild 需补 external**：`--external:@codemirror/state --external:@codemirror/view`，否则双实例（editorEditorField 拿到的 view 与插件 import 的类不同源，StateField/ViewPlugin 注册错位） | 现状 build:main 仅 `--external:obsidian` |

**基建动作（v1.1 开工前）**：devDeps 加 `@codemirror/state`、`@codemirror/view`（版本对齐 Obsidian 内置 CM6 线）；build:main 补 external；tsconfig moduleResolution 支持。

## 3. 覆盖对账（哪些其实已做，防重复立项）

| 原需求 | 现状（v1.0.0 已含） | 真实空白 |
|---|---|---|
| ⑧块插入（表格骨架/引用/代码块/折叠块/待办/hr/图片占位 8 按钮） | ✅ 通用面板「插入」卡 | 只剩**语法速查**（轻量） |
| ⑥大纲跟手（标题树点击跳转+当前小节高亮） | ✅ 通用面板「标题树」卡（main.ts:429） | 只剩**回跳上次位置**（编辑会话内跳转历史） |
| ③长文面板 | ✅ 五卡齐 | — |
| ④双击中文词组/整段选中 | ❌ CM6 默认双击按字符簇连选**整句**（中文无空格分词） | **全块现研**（核心） |
| ⑤引号配对/行内格式/标题快捷 | ❌ 面板有插入按钮，但**编辑器内自动配对与快捷键**空白 | **全块现研** |
| ⑦列表续排 | Obsidian 原生 Enter 续排已满足大半 | 剩「打断/降级」等轻量增强，**待对答案** |

## 4. 版本拆分与需求切法

### v1.1 编辑器手感（④ ⑤ ⑦）

#### ④ 光标与选区（核心现研，CM6 view 层）
- **双击中文词段**：覆盖默认 dblclick 词选——中文连续串按「词段」粒度切（标点/空白/英文/数字为边界，长句可再按长度阈值折半，v1 不做分词器）；命中中文则 setSelection 到词段边界，非中文走默认。
  - 技术：`EditorView.domEventHandlers({ dblclick })` 内自定义 range → `view.dispatch({ selection, scrollIntoView })`；或 ViewPlugin + `EditorView.mouseSelectionStyle`（CM6 有 selectionStyle 机制，研究先行）。
  - 纯函数抽 `wordSegmentAt(text, offset)`：输入全文+光标 offset，输出 [start,end) 词段——可机器校验。
- **整段选中**：命令「选中当前段/块」——按 md 块（空行界定的段落）扩展选区；兼容表格行/引用块。
  - 纯函数 `blockRangeAt(text, offset)`。
- 交互默认：双击中文=词段；Alt+双击=整段？或命令+快捷键——**待对答案**。

#### ⑤ 输入辅助（CM6 inputHandler / 命令）
- **引号配对**：输入 `"` 在中文语境自动成对 `“光标”`（光标入中）；已有选中文本时包裹；英文语境/代码块内直通；成对后再次输入右引号跳越不重复。退格时若成对空引号一次删对。
  - 技术：`EditorView.inputHandler` 返回 true 拦截；语境判定纯函数 `quotePairAt(text, offset, char)`——可机器校验。
  - 范围收敛：v1 只做中文弯引号 `“ ” ‘ ’`，不做半角自动补全（误伤代码）。
- **行内格式快捷**：选中文本后快捷键/命令加 `**` / `*` / `` ` `` / `==` / `~~`（无选中则插入空对）；已有同标记则剥离（toggle）。
  - 纯函数 `toggleInline(text, selStart, selEnd, mark)`——可机器校验。
- **标题快捷**：光标所在行行首 `# ` 递增/递减（循环 1-6），不打断文字流；或行首输入 `#` + 空格自动成标题（Obsidian 部分原生）——**待对答案**。

#### ⑦ 列表续排（轻量增强）
- 已原生满足大半；候选增强：命令「打断列表」（在列表项内回车后按快捷键跳出列表回正文）、「列表转纯文本」（去 `- ` / `1. ` 前缀）、「升/降缩进」快捷键——**待对答案**（选 1-2 个，防蔓延）。

### v1.2 导航与语法（⑥ ⑧）

#### ⑥ 长文导航
- **回跳上次位置**：会话内维护「编辑跳转栈」（editor-change 光标位移超过阈值或经标题树/查找跳转后记录前位），命令「跳回上次编辑位置」（Alt+← 风格，可连跳多层）；栈上限 50，超限弃最旧。
  - 技术：ViewPlugin + `EditorView.updateListener` 收集光标移动事件；栈逻辑纯函数 `pushCursor/peekBack`——可机器校验。
- 大纲滚动定位增强：现有标题树点击已 scrollIntoView，补「跟随滚动时点击侧栏条目实时定位」已在写辅/面板覆盖，本期不加。

#### ⑧ md 语法工坊（收口）
- 插入部分已全覆盖（见 §3）；本期补**语法速查**：面板内「速查」卡（折叠式：md 常用语法一行一例 + 点示例即插入/替换选区），或独立 Modal——**待对答案**。
- 不重造 Advanced Tables（表格增强明确不做）。

## 5. 校验策略

- **纯函数优先**：wordSegmentAt / blockRangeAt / quotePairAt / toggleInline / cursorStack 全部抽纯函数，仿照现有 verify_*.py + node entry 机器断言（各边界样例 + 精确输出对比）。
- **UI 层**（双击/输入拦截/快捷键）：交互难机器校验 → 逻辑走纯函数断言，注册层走 tsc + build + Obsidian 实机冒烟清单（记入用户指南）。
- **回归红线**：每版改动后 15 套既有回归全绿 + 本版新套件绿 = 门槛。

## 6. 待用户对答案点（落地 v1.1 前）

1. ④ 双击中文词段粒度：按「标点/空白边界切段」够不够，还是要「Alt+双击=整段」也做？
2. ⑤ 行内格式 toggle 的标记集：`** * ` == ~~` 四样够吗（不加下标/上标/高亮颜色）？
3. ⑤ 引号配对只做中文弯引号自动成对（不做半角自动补全）——认同？
4. ⑦ 列表续排增强选哪 1-2 个：打断列表 / 列表转纯文本 / 升降缩进？
5. ⑧ 语法速查形态：面板「速查」卡 vs 独立速查窗口？

## 7. 不做的事（防蔓延）

- 不做中文分词器（词段=标点/空白边界，够用即可）
- 不做半角引号/括号自动补全（误伤代码与英文）
- 不重造 Advanced Tables；不做 Markdown 所见即所得级渲染
- 不做移动端深度打磨（跟随 v1.0.0 裁定：桌面优先，移动端保可用+降级——CM6 extension 双端同源注册）
- 不引入付费/外部服务；保持零负重（无强制配置项，全部默认开但可关或极简）

## 8. 交付链（沿用既有惯例，每版一轮）

校验套件全绿 → tsc + build（external 补全后 main.js 体积应回落）→ manifest 升版 → README/用户指南同步（§5 冒烟清单并入指南）→ commit + push（CI 15 套+N 新套）→ tag 触发 Release → vault 部署 → 用户实机冒烟。
