// entry_v0110.ts —— verify_v0110.py 的 esbuild 临时入口（纯函数层）
// v0.11.0 写作提效五件中可机器校验的部分：
//  ①「一、」裸序号识别（detectOutlineHeading + parse 集成）
//  ② 粘贴清洗（cleanPaste / htmlToLines / tidyLines）
//  ③ 写作辅助行角色诊断（lineRole / cnNum / nextH1 / nextH2）
//  ④ 新建向导纯函数（buildNewGongwen / sanitizeFileName）
//  ⑤ 设置 defaultAgency 清洗
import { detectOutlineHeading, parseDocument, parseGongwenFull } from '../src/gongwen/mdast';
import { cleanPaste, htmlToLines, decodeEntities } from '../src/paste_clean';
import { cnNum, lineRole, nextH1, nextH2 } from '../src/gongwen/writeassist';
import { buildNewGongwen, sanitizeFileName, NEW_DOC_ITEMS, GONGWEN_TEMPLATES } from '../src/gongwen/templates';
import { sanitizeSettings, DEFAULT_SETTINGS } from '../src/gongwen/settings';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);

// A. 「一、」裸序号识别（v0.11.0）
const d = detectOutlineHeading;
c('A.一、无句号→h1', d('一、健全保洁队伍') === 'h1');
c('A.十二、支持两字', d('十二、附则') === 'h1');
c('A.段首序数含句号→null', d('一、加强领导。各村要成立领导小组，明确专人负责。') === null);
c('A.非汉字序数→null', d('第一、总体要求') === null);
c('A.阿拉伯数字→null', d('1. 主要任务') === null);
c('A.（一）不识别→null', d('（一）健全保洁队伍') === null);
c('A.是字句式→null', d('一是压实责任，二是明确时限。') === null);
c('A.空/undefined→null', d('') === null && d('   ') === null);
// parse 集成：裸写一、段落 → h1；带句号段首序数 → para
{
  const { blocks } = parseGongwenFull('# 关于开展村庄清洁行动的通知\n\n各村（社区）：\n\n一、总体目标\n\n通过集中整治实现村容整洁。\n\n一、加强组织领导。各村要成立领导小组，明确专人负责。');
  const kinds = blocks.map((b) => `${b.kind}:${b.text.slice(0, 8)}`);
  // blocks 实际构成：docTitle(# 通知) / para(各村（社区）：) / h1(一、总体目标) / para / para
  c('A.parse裸一、成h1', blocks[2]?.kind === 'h1' && blocks[2].text === '一、总体目标', JSON.stringify(kinds));
  c('A.parse含句号仍是para', blocks[4]?.kind === 'para' && blocks[4].text.startsWith('一、加强组织领导'), JSON.stringify(kinds));
  const { meta, blocks: b2 } = parseDocument('---\nrh-agency: 云溪镇人民政府文件\n---\n\n# 标题\n\n一、重点任务\n');
  c('A.parseDocument贯通', b2[1]?.kind === 'h1' && !!meta.agency);
}

// B. 粘贴清洗（v0.11.0）
c('B.行首尾空格剥除', cleanPaste({ text: '  首行缩进两空格\n　全角空格开头\n行尾有空格  \n\t制表符开头' }) === '首行缩进两空格\n\n全角空格开头\n\n行尾有空格\n\n制表符开头');
c('B.连续空行压缩', cleanPaste({ text: '第一段。\n\n\n\n第二段。\n\n\n\n\n第三段。' }) === '第一段。\n\n第二段。\n\n第三段。');
c('B.首尾空行剔除', cleanPaste({ text: '\n\n\n开头空行\n结尾空行\n\n\n' }) === '开头空行\n\n结尾空行');
c('B.CRLF统一', cleanPaste({ text: '甲\r\n乙\r\n丙' }) === '甲\n\n乙\n\n丙');
c('B.纯文本空输入', cleanPaste({ text: '  \n\n  ' }) === '');
// html → 行
c('B.html块级换行', htmlToLines('<p>第一段</p><p>第二段</p><div>第三</div><br>第四').join('|') === '第一段|第二段|第三|第四');
c('B.html剥内联与样式', cleanPaste({ html: '<p style="color:red">这是<span class="x">正文</span>内容</p><script>alert(1)</script>正文后' }) === '这是正文内容\n\n正文后');
c('B.html注释/样式块剔除', !cleanPaste({ html: '前<!-- 注释 -->中<style>p{color:red}</style>后' }).includes('注释') && !cleanPaste({ html: '前<!-- 注释 -->中<style>p{color:red}</style>后' }).includes('color'));
c('B.实体解码', decodeEntities('a&amp;b &lt;x&gt; &nbsp; &#233; &#x4E2D;') === 'a&b <x> \u00A0 \u00E9 \u4E2D');
c('B.Word式表格html', cleanPaste({ html: '<table><tr><td>姓名</td><td>职务</td></tr><tr><td>张三</td><td>组长</td></tr></table>' }) === '姓名\n\n职务\n\n张三\n\n组长');
c('B.html空', cleanPaste({ html: '<style>x</style>' }) === '');

// C. 写作辅助行角色（v0.11.0）
const L = (s: string) => lineRole(s).role;
c('C.docTitle', L('# 关于XX的通知') === 'docTitle');
c('C.h1', L('## 一、会议时间') === 'h1');
c('C.h2', L('### （一）健全保洁队伍') === 'h2');
c('C.h3', L('#### 1. 人员分组') === 'h3');
c('C.裸一、→bare-h1', L('一、总体目标') === 'bare-h1');
c('C.含句号裸一、→正文', L('一、加强领导。各村成立领导小组。') === 'bare-h1-body');
c('C.（一）裸写→suggest', L('（一）健全保洁队伍') === 'suggest-h2');
c('C.1.裸写→suggest', L('1. 加强领导') === 'suggest-h3');
c('C.正文', L('为持续改善人居环境，现将有关事项通知如下：') === 'body');
c('C.行首缩进提醒', L('  手敲缩进正文') === 'body-indent');
c('C.全角空格提醒', L('　全角开头') === 'body-indent');
c('C.表格', L('| 姓名 | 职务 |') === 'table');
c('C.引用', L('> 联系人：张三') === 'quote');
c('C.列表', L('- 条目一') === 'list');
c('C.fm属性', L('rh-date: 2026年9月3日') === 'fm');
c('C.fm栏线', L('---') === 'fm');
c('C.空行', L('   ') === 'empty');
c('C.过深标题', L('##### 五级') === 'plain');
c('C.数字', cnNum(1) === '一' && cnNum(10) === '十' && cnNum(11) === '十一' && cnNum(20) === '二十' && cnNum(21) === '二十一');
c('C.nextH1', nextH1(['---', 'rh-agency: x', '---', '# 标题', '## 一、A', '一、B', '', '正文']) === '三、');
c('C.nextH1含句号不计数', nextH1(['一、加强领导。正文正文正文']) === '一、');
c('C.nextH2', nextH2(['# 标题', '## 一、A', '### （一）a', '### （二）b', '正文']) === '（三）');

// D. 新建向导（v0.11.0）
c('D.16文种齐', NEW_DOC_ITEMS.length === 16 && Object.keys(GONGWEN_TEMPLATES).length === 16);
{
  const r = buildNewGongwen({ templateKey: '公文模板-通知', title: '关于开展秋季人居环境整治的通知', agency: '云溪镇人民政府文件', year: 2027 });
  c('D.默认机关替换', r.content.includes('rh-agency: 云溪镇人民政府文件'));
  c('D.标题替换', r.content.startsWith('---') && r.content.includes('# 关于开展秋季人居环境整治的通知'));
  c('D.年份全部替换', !r.content.includes('2026') && r.content.includes('〔2027〕') && r.content.includes('2027年'));
  c('D.正文骨架保留', r.content.includes('## 一、会议时间') || r.content.includes('## 一、'));
  c('D.文件名用标题', r.fileName === '关于开展秋季人居环境整治的通知.md');
}
{
  const r = buildNewGongwen({ templateKey: '公文模板-请示', year: 2026 });
  c('D.无标题保留占位', r.content.includes('# 关于XXXX的请示'));
  c('D.无标题文件名文种', r.fileName === '公文-请示-2026.md');
}
c('D.非法字符清洗', sanitizeFileName('关于开展:清理*行动?的通知') === '关于开展清理行动的通知');
c('D.空格压缩', sanitizeFileName(' 关于   XX   的通知  ') === '关于 XX 的通知');
c('D.文种不存在回落通知', buildNewGongwen({ templateKey: '不存在', year: 2026 }).content.includes('关于XXXX的会议通知'));

// E. 设置 defaultAgency（v0.11.0）
c('E.默认空', sanitizeSettings(undefined).defaultAgency === '' && DEFAULT_SETTINGS.defaultAgency === '');
c('E.清洗空白', sanitizeSettings({ defaultAgency: '  云溪镇  人民政府\t文件  ' }).defaultAgency === '云溪镇 人民政府 文件');
c('E.超长截断', sanitizeSettings({ defaultAgency: '长'.repeat(120) }).defaultAgency.length === 80);
c('E.非法回落', sanitizeSettings({ defaultAgency: 42 }).defaultAgency === '');

// ---- 汇总 ----
const failed = checks.filter(([, ok]) => !ok);
console.log(`SUMMARY ${checks.length - failed.length}/${checks.length} passed`);
for (const [name, ok, detail] of checks) {
  if (!ok) console.log(`FAIL ${name} ${detail ? '→ ' + detail : ''}`);
}
if (failed.length) process.exit(1);
