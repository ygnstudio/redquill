# RedQuill

在 Obsidian 里舒服地写 md：粘贴即纯净、写完一键中文排版体检、右侧栏写作仪表盘——把「打字之外的杂事」交给插件，中文写作不别扭。

🔗 BRAT 安装：`ygnstudio/redquill`　⬇️ [手动下载](../../releases)　📖 [使用指南](docs/user_guide_2026-09-03_v0.1_active.md)　🐛 [问题反馈](../../issues)

与 [RedHead](https://github.com/ygnstudio/obsidian-redhead)（公文排版）同源：**合一开发中**——RedQuill = 通用 md 写作体验 + 内置红头公文引擎（GB/T 9704），RedHead 仓库将归档留档；本 README 将于合一完成（v1.0.0）后重写。

## 功能特性

- **粘贴即纯净**：命令「粘贴并净化」把剪贴板内容（网页/Word/WPS/公众号编辑器复制）清洗后插入——剥 HTML 标签/脚本/样式、去行首尾空格（含全角/NBSP）、空行压成一段一空行、连续空白折一；「清洗选区」不依赖剪贴板，选中即洗
- **自动净化粘贴**（可选开关）：设置开启后，编辑器内粘贴带格式的 HTML 内容自动清洗插入（纯文本直通不误伤），默认关、用命令为主
- **中文排版体检**（命令「排版体检」）：写完一键自查——八条规则分级报告，行号可点击跳转源码定位；只查不改不阻塞
- **一键修复**（命令「一键修复排版问题」）：只自动修无歧义项（重复标点/半角标点/中英空格/控制字符/全角空格），逐行替换保留 Ctrl+Z 撤销；有歧义项（括号引号配对/直引号/叠字）只报不修
- **代码与链接不误伤**：代码围栏、行内 code、URL、md 链接整段跳过——「`a,b`」里的逗号、「https://…」里的标点都不算问题
- **写作面板五卡**（右侧栏）：字数（中文/非空白/总字符/段数/光标行）、标点体检速览（实时 error/warn 计数 + 看报告）、标题树（h1-h3 点击跳转、当前小节高亮）、快捷插入（表格 3×3/引用/代码块/折叠块/待办/分隔线/图片占位）、空文档引导
- **数字不误伤**：2026 年、3.5、v1.2.3、「1..5」范围、英文缩写——这些都不算半角标点混用；中文与**字母**之间缺空格才提醒（年份数量不加）
- **纯函数内核可机器校验**：净化/体检/标题树全部无 Obsidian 依赖，`verify_v010.py` 60+ 断言跑在 CI——规则改动可回归，不会拍脑袋改坏
- **移动端可用**：`isDesktopOnly: false`，命令在移动端同样生效
- **免费 MIT**：个人项目免费开源，BRAT 直接安装

## 目录结构

```
redquill/
├── src/
│   ├── paste_clean.ts     # 粘贴净化纯函数（剥 HTML/空行规整/连续空白折一）
│   ├── checker.ts         # 中文排版体检八规则引擎 + fixAll 一键修复（纯函数）
│   ├── mdast.ts           # 标题树 outlineOf / 字数统计 charStats（纯函数）
│   ├── settings_util.ts   # 设置模型与清洗管线
│   └── main.ts            # 插件壳（命令/写作面板/报告弹窗/自动净化拦截/设置页）
├── tests/               # 校验脚本（Python + esbuild 临时入口，纯函数直测）
├── docs/                # 使用指南与设计文档
├── main.js              # 构建产物（BRAT 直接拉取）
├── manifest.json
└── styles.css
```

## 使用

> 完整说明见 **[使用指南](docs/user_guide_2026-09-03_v0.1_active.md)**（体检八规则明细表、粘贴净化与剪贴板权限、写作面板五卡、FAQ）。快速上手：

1. **安装**：BRAT 添加 `ygnstudio/redquill`（或从 Release 下载 `main.js`/`manifest.json`/`styles.css` 放入 `.obsidian/plugins/redquill/`）
2. **日常写**：正常打字；从网页/Word 复制内容过来时，先运行「**RedQuill：粘贴并净化**」再粘贴（或直接粘贴后选中运行「清洗选区」）
3. **写完自查**：命令「**RedQuill：排版体检**」——看报告点行号跳转；点「一键修复」只改无歧义项（可 Ctrl+Z 逐行撤销）
4. **长文写作**：侧栏羽毛笔图标开「**写作面板**」——字数/标题树点跳/实时体检计数/快捷插入表格引用代码块

命令一览：`打开写作面板` / `排版体检（当前笔记）` / `一键修复排版问题` / `粘贴并净化` / `清洗选区 / 当前段`。

## 开发

```bash
npm install
npm run build                  # tsc 类型检查 + esbuild 打包 main.js
python3 tests/verify_v010.py   # v0.1.0 校验（60+ 纯函数断言：净化/八规则/修复/标题树/设置）
# 真实感文档冒烟（人工看修复效果）：见 tests/smoke_v010.ts，
#   npx esbuild tests/smoke_v010.ts --bundle --format=cjs --platform=node --outfile=tests/.tmp.cjs && node tests/.tmp.cjs
```

> 校验脚本需 Python ≥ 3.10（可用 WorkBuddy 受管 3.13 或 brew python3.13）。

## 联系

- 问题反馈：[GitHub Issues](../../issues)（优先）
- 邮箱：markwalsh6809@gmail.com
- GitHub 主页：https://github.com/ygnstudio
- 小红书：https://www.xiaohongshu.com/user/profile/66a7e7ae000000001d023641

## License

[MIT](LICENSE) © 雁归南（ygnstudio）
