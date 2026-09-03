# RedQuill ⇄ RedHead 合一迁移蓝图（v1 active）

> 裁定日期：2026-09-03 ｜ 决策人：雁归南（拍板）｜ 参谋：AI
> 上游文档：`docs/design_doc_2026-09-03_v1_active.md`（原「MDQuill 立项蓝图」，历史文档，将被合一蓝图取代）、RedHead `docs/design_doc_2026-09-02_v1_active.md`

## 0. 一句话

**redquill 仓库成为唯一主线**：一个插件（id `redquill`、显示名 RedQuill）承载通用 md 写作层（净化/八条体检/五卡面板）+ 公文层（红头/文号/结构层/公文体检/docx 导出/预览/16 文种/写作辅助），公文能力按上下文自动浮现；RedHead 仓库归档留档。

## 1. 四项裁定（2026-09-03 用户拍板）

| # | 裁定项 | 结论 |
|---|--------|------|
| 1 | 合/分 | **彻底合一**，一个插件全包（否决双插件协作、否决独立并存） |
| 2 | RedHead 仓库 | **归档留档**（gh repo archive，README 顶注「已并入 RedQuill」），历史/Release/兼容矩阵可查 |
| 3 | 版本号 | 合一版从 **1.0.0** 起（通用 0.1 + 公文 1.0 均已各自验证，合一后全套回归绿即达门槛） |
| 4 | 公文触发 | **frontmatter 自动判定 + 手动切换命令兜底**（frontmatter 含公文标记→公文上下文；无标记→通用） |
| 5 | 移动端 | `isDesktopOnly: false` **双端可用**；docx 导出/预览/打开本地文件等桌面能力运行时降级隐藏（CLI 属仓库工具与插件无关） |
| 6 | 命名 | **合成新名 RedQuill**（red 红头 × quill 写作；拍板于 MDQuill 0.1 发布同日）：仓库/目录/id/显示名统一 `redquill`/RedQuill；RedHead 与 MDQuill 两名字均退役（仓库 rename 保史，obsidian-redhead 归档） |

## 2. 目标形态

```
Obsidian 单插件 RedQuill v1.0.0
├── 通用上下文（默认）          公文上下文（frontmatter 命中或手动切）
│   ├ 净化（选中/剪贴板）        ├ 净化（同引擎，公文粘贴语义对账）
│   ├ 八条字面体检+一键修复      ├ 通用八条 + 公文结构体检（文号/结构层/红头）
│   ├ 五卡面板（字数/速览/树/     ├ 公文面板卡组（行角色/序号建议/向导直达/
│   │   快捷插入/空引导）         │   导出/预览按钮）
│   └ 快捷插入=md 通用片段       └ 快捷插入=公文元素（红头/文号/主送…）
└── 命令统一前缀「RedQuill」，分组名含 [通用]/[公文] 便于面板检索
```

判定器规则：frontmatter 含任一公文字段（RedHead 表单写的 `发文机关`/`发文字号`/`docType` 等 RED_HEAD_KEYS）→ 公文上下文；否则通用。手动命令 `RedQuill: 切换公文模式` 覆盖（会话级，改文件后重判）。

## 3. 模块迁移映射（探明 RedHead src 13 文件后的定案）

**同名但互补，全部保留**；真正重复仅 paste_clean（用 RedQuill 泛化版）。

### 3.1 通用层（RedQuill 原样，基座不动）
| 文件 | 内容 |
|---|---|
| `src/paste_clean.ts` | 净化引擎（RedQuill 泛化版为准） |
| `src/checker.ts` | 通用八条字面体检 + fixAll |
| `src/mdast.ts` | 大纲 outlineOf / 字数 charStats |
| `src/settings_util.ts` | 通用设置 MdquillSettings{autoClean} |

### 3.2 公文层（RedHead 迁入，归 `src/gongwen/` 防撞名）
| RedHead 源文件 | 去向 | 职责 |
|---|---|---|
| `src/main.ts`（68k） | 拆分融入合一 `src/main.ts` | 公文命令/面板公文卡/向导/表单注册，不整体拷贝 |
| `src/checker.ts` | `src/gongwen/checker.ts` | 公文体检（validateDocNumber/checkDocument 公文规则） |
| `src/mdast.ts` | `src/gongwen/parse.ts` | parseDocument/parseGongwenFull/RedHeadMeta/结构层块 |
| `src/format.ts` | `src/gongwen/format.ts` | 版式常量/预设/角色字链/印章尺寸/红头机关适配 |
| `src/docx_export.ts`（44k） | `src/gongwen/docx_export.ts` | docx 生成核心（正文/红头/印章/表格/属性/页码） |
| `src/preview.ts` | `src/gongwen/preview.ts` | M3 PDF 预览打印管线（桌面能力，运行时降级） |
| `src/templates.ts` | `src/gongwen/templates.ts` | 16 文种骨架/新建向导/模板元数据 |
| `src/writeassist.ts` | `src/gongwen/writeassist.ts` | lineRole/序号建议（面板公文卡数据源） |
| `src/paste_clean.ts` | **弃用** | 与 RedQuill 版同源，合一唯一引擎，v04 断言适配新路径对账 |
| `src/settings_util.ts` | `src/gongwen/settings.ts` | 公文设置（默认发文机关/预设/模板目录…） |
| `src/cli.ts` `file_scan.ts` `ledger.ts` | **不进插件**，迁 `tools/cli/` | 批量导出/文号台账命令行工具，仓库级保留 |
| `src/mdast.ts`、`checker.ts`、`writeassist.ts`、`settings_util.ts` 同名 | 见上 | 两边分工互补，无功能丢弃 |

### 3.3 新件
| 文件 | 职责 |
|---|---|
| `src/context.ts` | 公文上下文判定器（RED_HEAD_KEYS 命中）+ 手动覆盖状态 |
| `src/main.ts`（重写） | 入口融合：命令归组注册 / 面板上下文切换 / 双设置区加载 |

## 4. 校验策略（合一红线）

- 目录迁动后：13 套 RedHead entry（v04→v0120）import 路径批量适配（`../src/checker`→`../src/gongwen/checker` 等），**断言数一行不减**，逐一跑绿
- RedQuill 套件 v010（60 断言）原样保留
- 合计 = **14 套回归全绿** = 合一完成的技术门槛；CI verify.yml 循环扩到 14 套
- 新增 entry_merge：判定器（frontmatter 命中/未命中/手动覆盖）+ 命令归组冒烟

## 5. 设置分区（合一 settings）

```
设置页 RedQuill
├── 通用区：自动净化开关（原 RedQuill autoClean）
└── 公文区：默认发文机关 / 公文预设 / 模板目录…（原 RedHead settings 迁移，data.json 无缝沿用）
```
sanitizeSettings 白名单扩为两段合并；vault 侧旧 `redhead/data.json` 在部署时做一次性迁移（读旧 key → 写新 key），或由用户设置页重填（二选一，部署时定）。

## 6. 命令归组草案（前缀 RedQuill）

| 分组 | 命令（示例，完整清单迁移时对 main.ts 逐条收编） |
|---|---|
| 通用-净化 | 净化剪贴板 / 净化选中文本 |
| 通用-体检 | 排版体检（八条）/ 一键修复 |
| 通用-面板 | 打开写作面板 / 切换公文模式 |
| 公文-向导 | 新建公文向导（16 文种）/ frontmatter 表单填写 |
| 公文-体检 | 公文排版体检 / 一键修复（含公文规则） |
| 公文-导出 | 导出 docx / 预览打印 PDF / 印章 |
| 公文-归档 | 批量导出 CLI / 文号台账（仓库工具，README 指引） |

## 7. 仓库 / 发布 / 部署

1. redquill 仓库承接全部代码与文档；README 改为合一版（定位=通用写作+公文模式）
2. obsidian-redhead：`gh repo archive` + README 顶部迁移说明（历史 Release/兼容矩阵留档可查）
3. Release 流程沿用 RedHead 验证过的 release.yml（tag v1.0.0：14 套回归 → build → 打包裸三件 + redquill-1.0.0.zip）
4. dojo vault：`.obsidian/plugins/redquill/` 升级覆盖 1.0.0；旧 `.obsidian/plugins/redhead/` 退役（先禁用观察，确认无引用后删除——未确认不动）

## 8. 迁移顺序（任务拆分依据）

| 阶段 | 内容 | 完成标志 |
|---|---|---|
| P1 | 公文层纯函数模块迁目录（format/templates/parse/checker_gongwen/writeassist/paste_clean 对账） | 13 套 entry 适配后逐套绿 |
| P2 | docx_export/preview 迁入 + 桌面能力降级封装 | 迁移套件（docx 断言）+ 降级分支绿 |
| P3 | 合一 main.ts：命令归组 + context.ts 判定器 + 面板公文卡 + 双设置区 | entry_merge 绿 + tsc/esbuild 过 |
| P4 | 14 套总回归 + CI 扩 14 套 + 冒烟（公文/通用双上下文） | 全绿 |
| P5 | docs 合一（README/指南 v1.0.0）+ 仓库归档 + Release 1.0.0 + vault 部署迁移 | 交付 |

## 9. 风险与迁移时对账点

- [ ] RedHead main.ts 68k 里的命令/视图清单需逐条收编，防漏（以 README/指南功能表为 checklist）
- [ ] paste_clean 两版差异：RedQuill 版泛化改动是否破坏 RedHead 公文粘贴断言（v04/v052 等）——先跑旧套件锁定差异再裁
- [ ] docx_export/preview 是否引 window/electron API（桌面降级切点）——esbuild platform=node 已 external obsidian，运行时 guard `platform === 'desktop'`
- [ ] RedHead settings key 与 redquill settings key 命名冲突检查（redhead 前缀沿用防撞）
- [ ] 模板/向导生成的公文 md 其 frontmatter 字段与 RED_HEAD_KEYS 一致性（判定器命中率）
- [ ] manifest description 合一版文案；minAppVersion 取两者 max

## 10. 不做的事（防蔓延）

- 不改公文版式规则（GB/T 9704 逻辑原样）；不动 RedHead 已发布的 1.0.0 Release 资产
- 不新增需求全集外功能；移动端本期只保「可用+降级」，不做移动端深度打磨
- 不合并两仓库历史（redquill 全新承接，redhead 归档保史）
