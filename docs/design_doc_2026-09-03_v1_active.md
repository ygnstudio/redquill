# MDQuill（md 写作体验插件）设计文档

> ⚠️ **历史文档（已被取代）**：MDQuill 已于 2026-09-03 与 RedHead 合一为 **RedQuill**，本设计文档仅留档。合一蓝图见 **[design_doc_merge_2026-09-03_v1_active.md](design_doc_merge_2026-09-03_v1_active.md)**。

- 版本：design_doc_2026-09-03_v1_active
- 状态：蓝图阶段，待用户对答案
- 缘起：2026-09-03 RedHead v1.0.0 收官（21/21）后，用户问「还有什么要做的？尤其是加强 md 的写作体验。公文的事情先结束」→ 裁定独立新插件 MDQuill。RedHead 中已验证的通用写作模块（粘贴清洗 / 体检引擎 / 写作辅助面板）泛化迁移，不另起炉灶。

## 一句话定位

MDQuill —— 在 Obsidian 里舒服地写 md：粘贴即纯净、写完一键体检、长文有仪表盘，中文写作不别扭。

## 0. 已裁定的方案（2026-09-03 用户拍板）

| 裁定点 | 结论 |
|---|---|
| 与 RedHead 关系 | **独立插件**（仓库 mdquill，id 独立）。用户原倾向并入，参谋摆账后拍独立：名字意象锁死公文、v1.0.0 定位刚收口不稀释、版本线互不牵制 |
| 通用模块血缘 | paste_clean.ts / checker.ts 引擎 / writeassist.ts 面板均源自 RedHead（已验证），迁移后泛化（去公文假设）。**泛化实现以 MDQuill 为准；RedHead 锁 1.x 维护线不动** |
| 表格增强 | **借力不重造**（用户认可）：表格编辑用社区 Advanced Tables；自研只做语法快捷插入 + 表格骨架 + 语法速查 |
| todo | 勾选操作借力官方 Tasks / 现有方案，不自研 |
| 代码风格 | 纯函数引擎可机器校验（node 直测，零 obsidian 依赖），三端同源（编辑命令 / 面板 / 校验同一内核） |
| 发布 | GitHub + BRAT，免费 MIT；中文 UI；obsidian_stub 测试惯例照 RedHead |

## 1. 需求全集（2026-09-03 与用户对齐，8 块）

用户全选「光标与选区 / 输入辅助 / 长文导航 / 列表与待办」并补充「表格和 md 各种语法」，加此前候选三件：

| # | 需求 | 切法 | 技术底子 | 档位 |
|---|---|---|---|---|
| 1 | 粘贴净化（网页/Word/公众号 → 纯净 md） | 自研 | RedHead paste_clean 已验证 | S |
| 2 | 中文排版体检（标点/空格/错别字/括号，写完一键检+跳行修） | 自研 | RedHead checker 引擎已验证 | M |
| 3 | 长文写作面板（字数/进度/标题导航/快捷插入） | 自研 | RedHead writeassist 面板已验证 | M |
| 4 | 光标与选区（双击中文词组、整段选中） | 自研，CM6 编辑器层 | 需现研 | M |
| 5 | 输入辅助（行内格式/标题快捷/引号配对） | 自研，同上 | 需现研 | M |
| 6 | 长文导航（大纲跟手/回跳上次位置） | 自研 | 需现研 | M |
| 7 | 列表续排 | 轻量增强 | 现研 | S |
| 8 | md 语法工坊（常用块/表格骨架快捷插入 + 语法速查） | 自研（不重造 Advanced Tables） | 现研 | M |

## 2. 版本线

```
v0.1  已验三件（粘贴净化 + 中文排版体检 + 写作面板）—— 新项目基建一次跑通，最先上手用
v0.2  编辑器手感（4 光标选区 / 5 输入辅助 / 7 列表续排）—— CM6 层，先啃硬骨头
v0.3  导航与语法工坊（6 长文导航 / 8 md 语法）
```

每版沿用 RedHead 交付链：校验套件全绿 → 版本升档 → 文档 → commit(push GitHub) → 部署 dojo vault。

## 3. v0.1 范围与交互默认（照 RedHead 已验证形态泛化）

### 3.1 粘贴净化

- **触发**：默认「自动净化粘贴」（编辑器 paste 事件拦截，仅当剪贴板含 html 且带 style/class/块级痕迹才处理，纯文本直通），设置可关；命令 `mdquill: 净化剪贴板并粘贴` / `mdquill: 净化当前选区` 兜底。
- 内核：迁移 RedHead paste_clean.ts 的 htmlToLines/tidyLines（剥 script/style/注释/块级开闭标签转\n/剥内联/实体解码，每非空行=一段段间空一行），去公文假设，补 Word 特有残留（mso- 属性、&nbsp; 连发、空 span 串）。
- 校验：纯函数 + html 样例集机器断言（cleanHtml 输出与期望逐条相等）。

### 3.2 中文排版体检

- **触发**：命令 `mdquill: 排版体检（当前笔记）` + 状态栏错误计数徽章（点击弹报告）+ 可接快捷键。只查不改不阻塞；无错 Notice「排版体检通过」。
- **报告**：一次性弹窗 Modal（照 RedHead checker Modal）：error/warn 分级徽章、顶部计数、每行「第 N 行」可点击跳源码定位。
- **规则集 v1**（内置中文写作通用规则，行内 code 与代码块内不检）：

| 规则 | 级别 | 说明 | 一键修复 |
|---|---|---|---|
| repeated-punct | error | 重复标点（。。/，，/！！/？？/、、 连发） | ✅ 无歧义 |
| punct-mix | error | 中文句内半角标点（句内 , . ? ! ; : ( ) 混在中文间） | ✅ 无歧义（URL/数字/英文串内除外） |
| cjk-latin-space | warn | 中英混排缺空格（中文与 ASCII 相邻无空格） | ✅ 无歧义 |
| bracket-mismatch | error | 括号/引号不配对（（）「」『』【】与半角） | ❌ 只报 |
| straight-quote | warn | 中文语境用了直引号 " '（应“ ” ‘ ’） | ❌ 只报（歧义） |
| dup-word | warn | 叠字疑似笔误（的的/了了/是是/在在） | ❌ 只报 |
| control-char | error | 不可见控制字符/零宽字符混入 | ✅ 清除 |
| fullwidth-space | warn | 中文间全角空格 U+3000 | ✅ 无歧义 |

- 错别字词典 v1 缓做（歧义大，等规则集 v1 跑稳再加确定性词对）。
- 校验：verify_*.py 断言样例（各规则 error/warn 命中行号 + 一键修复后文本精确）。

### 3.3 写作面板

- 右侧栏 ItemView（照 RedHeadWriteView，图标羽毛笔 lucide 'pen-tool'），active-leaf-change + editor-change 200ms 防抖刷新，中文 UI。
- 卡片（首版五卡，不做配置蔓延）：
  1. **字数**：字符数（含/不含空格）/ 段落数 / 当前光标在全文第几行；
  2. **标题树**：h1-h3 大纲，点击跳转对应行；当前所在小节高亮；
  3. **标点体检速览**：复用 3.2 引擎的实时 error 计数（点击进完整报告）；
  4. **快捷插入**：常用块按钮组（表格骨架 3×3 / 引用 / 代码块 / 折叠块 / hr / 待办项），插入处即光标处；
  5. **写作提示**：空文档时给一句引导（不给模板，保持零负重）。

## 4. 架构与迁移清单（v0.1）

```
src/
  paste_clean.ts     ← RedHead 迁移，去公文假设 + Word 残留补强（纯函数）
  checker.ts         ← RedHead 迁移重写：规则引擎保留，规则集换通用中文规则（纯函数）
  mdast.ts           ← RedHead 迁移裁剪：只要 toc/标题树/行号定位（纯函数）
  panel.ts           ← RedHeadWriteView 泛化：字数/标题树/体检速览/快捷插入（ItemView）
  report_modal.ts    ← RedHead 体检 Modal 泛化（跳行定位）
  settings.ts        ← 设置（自动净化开关/体检规则开关/面板开关），最少字段
  main.ts            ← 插件入口：命令注册 + 事件（paste 拦截/editor-change/active-leaf-change）
  settings_util.ts   ← RedHead 同款 sanitize 管线（复用惯例）
```

- 工程基建整体复制 RedHead：esbuild 单文件、tsconfig、package.json、verify 体系（verify_*.py + node entry 直测纯函数）、.github/workflows verify.yml + release.yml、obsidian_stub。
- 无 docx/CLI/预览三端（那是公文线产物）；MDQuill 端=命令/面板/纯函数校验三端同源。

## 5. 待用户对答案点（v0.1）

1. 粘贴净化**默认自动拦截**是否接受（怕误伤可先默认关，用命令）？
2. 体检规则集 v1 九条是否合适（多了砍、少了加）？
3. 写作面板五卡是否够用（字数/标题树/体检速览/快捷插入/引导）？
4. 显示名用「MDQuill」还是起中文名（如「墨笔」）？——仓库名不变 mdquill。

## 6. 后续版本占位（v0.2/v0.3 详情待各版立项时再写）

- v0.2 编辑器手感：CM6 插件研究先行（EditorView.dispatch 选区操作、双击分词覆盖 setState、引号配对输入处理器）。
- v0.3：大纲跟手（跟随滚动高亮）、上次编辑位置记忆（vault 级 Map<path,line>）、语法速查弹窗。
