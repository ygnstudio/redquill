// smoke_v010.ts —— 真实感文档冒烟（不参与正式校验，人工查看修复效果）
import { checkDocument, fixAll } from '../src/checker';

const doc = `# 周报,2026-09-03

本周用Obsidian做了RedHead插件,发布了v1.0.0版本,核心功能是md转公文docx。

遇到的问题：
1. 表格插件和Advanced Tables不兼容;
2. 需要手动清理从Word粘贴的内容（含样式标签）;
3. 中英文混排需要手动加空格,很麻烦。

下周计划:研究CM6编辑器底层,把光标选中与输入体验做顺。
参见 https://docs.obsidian.md 与[示例笔记](https://x.cn/a)的写法。

代码里不用管：\`let a=1,b=2;\` 这种。\u200B

\`\`\`
const x = "你好,世界"; // 代码块内不检查
\`\`\`
`;

const issues = checkDocument(doc);
const byCode: Record<string, number> = {};
for (const i of issues) byCode[i.code] = (byCode[i.code] ?? 0) + 1;
console.log('issues:', JSON.stringify(byCode));
for (const i of issues) console.log(`  L${i.line} [${i.level}] ${i.code}: ${i.message}`);

console.log('\n--- fixAll 后 ---\n');
console.log(fixAll(doc));
