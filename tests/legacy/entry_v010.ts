// entry_v010.ts —— verify_v010.py 的 esbuild 临时入口（纯函数层，零 obsidian 依赖）
// v0.1.0 可机器校验部分：
//  ① 粘贴净化（cleanPaste / htmlToLines：剥标签样式、空行压缩、html 连续空白折一）
//  ② 中文排版体检（checkDocument 八规则：命中/行号/保护机制）+ fixAll 一键修复
//  ③ 标题树与字数（outlineOf / charStats）
//  ④ 设置清洗（sanitizeSettings）
import { cleanPaste, htmlToLines, decodeEntities } from '../src/paste_clean';
import { checkDocument, fixAll, isFixable, CHECK_RULES } from '../src/checker';
import { outlineOf, charStats } from '../src/mdast';
import { sanitizeSettings, DEFAULT_SETTINGS } from '../src/settings_util';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);
const codes = (md: string): string[] => checkDocument(md).map((i) => i.code);

// ================= A. 粘贴净化 =================
c('A.行首尾空格剥除', cleanPaste({ text: '  首行空格\n　全角空格开头\n行尾空格  \n\t制表符开头' }) === '首行空格\n\n全角空格开头\n\n行尾空格\n\n制表符开头');
c('A.连续空行压缩', cleanPaste({ text: '第一段。\n\n\n\n第二段。\n\n\n第三段。' }) === '第一段。\n\n第二段。\n\n第三段。');
c('A.首尾空行剔除', cleanPaste({ text: '\n\n开头空行\n结尾空行\n\n' }) === '开头空行\n\n结尾空行');
c('A.CRLF统一', cleanPaste({ text: '甲\r\n乙\r\n丙' }) === '甲\n\n乙\n\n丙');
c('A.纯文本路径行内双空格保留', cleanPaste({ text: 'a  b' }) === 'a  b');
c('A.html块级换行', htmlToLines('<p>第一段</p><p>第二段</p><div>第三</div><br>第四').join('|') === '第一段|第二段|第三|第四');
c('A.html剥内联与脚本', cleanPaste({ html: '<p style="color:red">这是<span class="x">正文</span>内容</p><script>alert(1)</script>正文后' }) === '这是正文内容\n\n正文后');
c('A.实体解码', decodeEntities('a&amp;b &lt;x&gt; &#233; &#x4E2D;') === 'a&b <x> \u00E9 \u4E2D');
c('A.html连续nbsp折一', htmlToLines('<p>a&nbsp;&nbsp;&nbsp;b</p>').join('|') === 'a b');
c('A.html空span串折一', cleanPaste({ html: '<p>你好<span> </span><span> </span>世界</p>' }) === '你好 世界');
c('A.Word式表格html', cleanPaste({ html: '<table><tr><td>姓名</td><td>职务</td></tr></table>' }) === '姓名\n\n职务');
c('A.html空', cleanPaste({ html: '<style>x</style>' }) === '');

// ================= B. 排版体检：八规则 =================
// R1 重复标点（error 可修）
c('R1.报重复标点', codes('你好。。。\n')[0] === 'repeated-punct' && checkDocument('你好。。。').some((i) => i.line === 1));
c('R1.修复折叠', fixAll('你好。。。\n') === '你好。\n');
c('R1.修复幂等', fixAll(fixAll('好好。。！')) === fixAll('好好。。！'));
// R2 半角标点混用（error 可修）
c('R2.报半角逗号', codes('你好,世界\n').includes('punct-mix'));
c('R2.逗号修复', fixAll('你好,世界\n') === '你好，世界\n');
c('R2.分号冒号问号修复', fixAll('中文;测试\n他说:好的\n行吗?\n') === '中文；测试\n他说：好的\n行吗？\n');
c('R2.半角括号修复', fixAll('请问(可以吗)\n') === '请问（可以吗）\n');
c('R2.中文标点后接半角也报', codes('列表（含标签）; 结束\n').includes('punct-mix'));
c('R2.中文标点后接半角修复', fixAll('列表（含标签）; 结束\n') === '列表（含标签）； 结束\n');
c('R2.小数与版本不误报', !codes('版本 3.5 说明\n详见 v1.2.3\n').includes('punct-mix'));
c('R2.省略号与范围不误报', !codes('好...继续\n范围 1..5 内\n').includes('punct-mix'));
c('R2.英文缩写点不误报', !codes('他说 ok. 然后\n').includes('punct-mix'));
// R3 中英空格（warn 可修）
c('R3.报中英相邻', codes('用Obsidian写作\n').includes('cjk-latin-space'));
c('R3.修复补空格', fixAll('用Obsidian写作真方便\n') === '用 Obsidian 写作真方便\n');
c('R3.数字年份不误报', !codes('2026年计划\n第3章\n').includes('cjk-latin-space'));
// R4 括号引号配对（error/warn 只报）
c('R4.中文括号不配对', codes('他说（注意这很重要\n').includes('bracket-mismatch'));
c('R4.配平不报', !codes('他说（注意）这个。\n').includes('bracket-mismatch'));
c('R4.双引号疑似未闭合', checkDocument('他说“你好\n').some((i) => i.level === 'warn' && i.code === 'bracket-mismatch'));
// R5 直引号（warn 只报）
c('R5.报中文语境直引号', codes('他问"你是谁"\n').includes('straight-quote'));
c('R5.整句英文不误报', !codes('The "AI" model is great.\n').includes('straight-quote'));
// R6 叠字（warn 只报）
c('R6.报叠字', codes('这个的的问题很严重\n').includes('dup-word'));
c('R6.正常不报', !codes('这个问题很严重\n').includes('dup-word'));
// R7 控制字符（error 可修）
c('R7.报零宽字符', codes('正常\u200B零宽\n').includes('control-char'));
c('R7.修复删除', fixAll('正常\u200B零宽\u200B字符\n') === '正常零宽字符\n');
// R8 全角空格（warn 可修）
c('R8.报全角空格', codes('前\u3000后\n').includes('fullwidth-space'));
c('R8.行内转普通空格', fixAll('前\u3000后\n') === '前 后\n');
c('R8.行首删除', fixAll('\u3000行首全角\n') === '行首全角\n');

// ================= C. 保护机制 =================
c('P.fence内不检', checkDocument('```\n你好,世界\n```\n正文,好').length === 1 && checkDocument('```\n你好,世界\n```\n正文,好')[0].line === 4);
c('P.行内code不检', codes('看`a,b`继续,写\n').filter((x) => x === 'punct-mix').length === 1);
c('P.行内code修复不伤', fixAll('看`a,b`继续,写\n') === '看`a,b`继续，写\n');
c('P.裸URL不检', !codes('参见https://a.b/c,更多。\n').includes('punct-mix'));
c('P.md链接整段保护', !codes('见[示例](https://x.cn/a,b)一下。\n').includes('punct-mix'));
c('P.frontmatter不检', codes('---\ntitle: 你好,世界\n---\n正文,好\n').filter((x) => x === 'punct-mix').length === 1);
c('P.fix保fence原样', fixAll('```\n你好,世界\n```\n') === '```\n你好,世界\n```\n');

// ================= D. 一键修复整体样例 =================
{
  const doc = '# 标题,测试\n\n用Obsidian写。\n\n他说好的.\n';
  const want = '# 标题，测试\n\n用 Obsidian 写。\n\n他说好的。\n';
  c('D.多规则联动修复', fixAll(doc) === want);
  c('D.修复可重复', fixAll(fixAll(doc)) === want);
  c('D.无可修时不改', fixAll('# 标题\n\n正文正常。\n') === '# 标题\n\n正文正常。\n');
}

// ================= E. 标题树与字数 =================
{
  const md = '# 总标题\n\n正文\n## 一、小节\n### （一）点\n#### 四级不收\n```\n# 代码里的\n```\n- 列表 # 不认\n';
  const items = outlineOf(md);
  c('E.标题树三级齐', items.length === 3 && items[0].level === 1 && items[1].level === 2 && items[2].level === 3);
  c('E.行号正确', items[0].line === 1 && items[1].line === 4 && items[2].line === 5);
  c('E.fence内不收', !items.some((i) => i.text.includes('代码里')));
}
c('E.frontmatter后标题', outlineOf('---\nkey: v\n---\n# 标题\n')[0]?.line === 4);
c('E.字数统计', JSON.stringify(charStats('你好 abc')) === JSON.stringify({ chinese: 2, nonspace: 5, total: 6 }));
c('E.空串字数', JSON.stringify(charStats('')) === JSON.stringify({ chinese: 0, nonspace: 0, total: 0 }));

// ================= F. 设置 =================
c('F.默认autoClean关', DEFAULT_SETTINGS.autoClean === false && sanitizeSettings(undefined).autoClean === false);
c('F.布尔透传', sanitizeSettings({ autoClean: true }).autoClean === true);
c('F.非法回落', sanitizeSettings({ autoClean: 'yes' }).autoClean === false && sanitizeSettings(42).autoClean === false);

// ================= G. 规则表与可修口径 =================
c('G.八条规则齐', CHECK_RULES.length === 8);
c('G.可修口径一致', isFixable('repeated-punct') && isFixable('punct-mix') && isFixable('cjk-latin-space') && isFixable('control-char') && isFixable('fullwidth-space') && !isFixable('bracket-mismatch') && !isFixable('dup-word'));

// ---- 汇总 ----
const failed = checks.filter(([, ok]) => !ok);
console.log(`SUMMARY ${checks.length - failed.length}/${checks.length} passed`);
for (const [name, ok, detail] of checks) {
  if (!ok) console.log(`FAIL ${name} ${detail ? '→ ' + detail : ''}`);
}
if (failed.length) process.exit(1);
