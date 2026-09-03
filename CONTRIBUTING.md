# 贡献指南

感谢你对 **redquill** 的兴趣！这是一个 Obsidian 写作体验增强插件，提供粘贴净化、中文排版体检和写作面板。这份指南告诉你如何参与贡献。

## 行为准则

参与本项目即表示你同意遵守 [Code of Conduct](./CODE_OF_CONDUCT.md)。请在所有交流中保持尊重。

## 我能贡献什么

- 报 Bug / 提功能建议 → 直接开 [Issue](../../issues)
- 修 Bug / 加功能 → 提 Pull Request
- 改文档 / 改示例 → 同样欢迎提 PR
- 帮忙回答其他用户的 Issue → 任何用户都能参与

## 提 Issue 前

1. 先在 [Issues](../../issues) 搜索关键词，避免重复。
2. 选对应的 Issue 模板（Bug 报告 / 功能建议 / 提问）。
3. Bug 报告请尽量给出：Obsidian 版本、插件版本、复现步骤、期望效果与实际效果（截图最佳）、原始 markdown 片段（去敏）。

## 本地开发

### 环境要求

- Node.js 18+
- npm 9+（或 pnpm / yarn 兼容）
- Obsidian 1.4+（用于手动验证）

### 克隆与构建

```bash
git clone https://github.com/ygnstudio/redquill.git
cd redquill
npm install
npm run dev      # 监听模式，自动重建 main.js
```

把 `main.js` / `manifest.json` / `styles.css` 软链或复制到你 Obsidian vault 的 `.obsidian/plugins/redquill/`，启动 Obsidian 即可加载。

Release 构建：

```bash
npm run build
```

### 测试

```bash
npm test
```

测试目录 `tests/`。

## 提 Pull Request

1. Fork 本仓库
2. 从 `main` 创建分支：`git checkout -b feat/my-feature`
3. 本地提交前请运行：
   ```bash
   npm run lint   # 如已配置 ESLint
   npm test
   ```
4. commit message 遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)：
   - `feat: 新增 X` / `fix: 修复 Y` / `docs: 改文档` / `refactor: 重构`
5. 如果改了用户可见行为（命令、设置项、面板行为），更新 [`CHANGELOG.md`](./CHANGELOG.md) 的 `[Unreleased]` 部分
6. 推到自己的 fork：`git push origin feat/my-feature`
7. 在 GitHub 上发起 PR 到 `main`，按 PR 模板勾选自检清单

## 代码风格

- TypeScript strict 模式
- 提交前请 `npm run lint`（如已配置 ESLint + Prettier）
- 中文排版相关常量集中在 `src/` 配置文件中
- 新依赖请在 PR 描述里说明理由，避免引入体积过大的库（Obsidian 插件体积敏感）

## 版本与发布

- 版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)，并同步更新 `manifest.json` 的 `version`
- 变更记录见 [`CHANGELOG.md`](./CHANGELOG.md)
- 发布由维护者统一进行，贡献者只需保证 PR 干净、CHANGELOG 已更新

## 联系

- Issue 优先：[GitHub Issues](../../issues)
- 邮箱：[markwalsh6809@gmail.com](mailto:markwalsh6809@gmail.com)
- GitHub 主页：<https://github.com/ygnstudio>
