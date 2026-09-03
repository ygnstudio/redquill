// entry_merge.ts —— verify_merge.py 的 esbuild 临时入口（P3.2 判定器，纯逻辑零 obsidian）
// 校验对象：src/context.ts（公文上下文判定器 + 手动覆盖闸门）
//  A. frontmatter 命中（平铺 rh- 键 / 嵌套 redhead 块 / 引号值）
//  B. 不命中（无 frontmatter / 无 rh 键 / 值空 / 引号空串 / 非公文缩进）
//  C. detectContext 整篇口径（CRLF / 无 fm / fm 后正文）
//  D. 与 gongwen/mdast.extractRedHead 一致性对账（判定=公文 ⇔ 解析出 meta 键）
//  E. ContextGate 手动覆盖三态
import { frontmatterIsGongwen, detectContext, ContextGate } from '../src/context';
import { parseDocument } from '../src/gongwen/mdast';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);

const FM = (body: string): string => `---\n${body}\n---\n`;

// ================= A. 命中 =================
c('A.平铺 rh-agency 命中', frontmatterIsGongwen(FM('rh-agency: XX镇人民政府文件\nrh-logo:')));
c('A.平铺 rh-docNumber 命中', frontmatterIsGongwen(FM('title: 会议纪要\nrh-docNumber: X政发〔2026〕1号')));
c('A.平铺任一红键即命中', frontmatterIsGongwen(FM('tags: [a]\nrh-urgency: 特急')));
c('A.嵌套 redhead 块命中', frontmatterIsGongwen(FM('redhead:\n  agency: 某单位文件\n  docNumber: 2026-1号\ntags: [x]')));
c('A.嵌套块命中任一键', frontmatterIsGongwen(FM('redhead:\n  copyNumber: 3')));
c('A.引号值命中', frontmatterIsGongwen(FM('rh-agency: "XX镇人民政府文件"\n')) && frontmatterIsGongwen(FM("rh-agency: 'XX镇文件'\n")));
c('A.CRLF 换行命中', frontmatterIsGongwen('---\r\nrh-agency: 甲单位\r\nrh-date: 2026年1月1日\r\n---\r\n'));
c('A.嵌套块前键值空后键命中', frontmatterIsGongwen(FM('redhead:\n  agency:\n  docNumber: 2026-1号')));
c('A.与红键同名的平铺大小写', frontmatterIsGongwen(FM('rh-DocNumber: 1号')) === false);

// ================= B. 不命中 =================
c('B.空 frontmatter 不命中', !frontmatterIsGongwen(FM('')));
c('B.纯普通键不命中', !frontmatterIsGongwen(FM('title: 笔记\ntags: [a, b]\ncreated: 2026-09-03')));
c('B.值空不命中（模板未填）', !frontmatterIsGongwen(FM('rh-agency:\nrh-logo:\nrh-docNumber:')));
c('B.引号空串不命中', !frontmatterIsGongwen(FM("rh-agency: ''\n")) && !frontmatterIsGongwen(FM('rh-agency: ""\n')));
c('B.非红键 rh- 前缀不命中', !frontmatterIsGongwen(FM('rh-note: 自己记的备注')));
c('B.仅空格值不命中', !frontmatterIsGongwen(FM('rh-agency:   \n')));
c('B.嵌套块值空不命中', !frontmatterIsGongwen(FM('redhead:\n  agency:\n  docNumber:  ')));
c('B.嵌套块无红键不命中', !frontmatterIsGongwen(FM('redhead:\n  customKey: x')));
c('B.tags 列表缩进不误伤', !frontmatterIsGongwen(FM('tags:\n  - a\n  - b\nrh-agency:\n')));

// ================= C. detectContext 整篇口径 =================
c('C.无 frontmatter → 通用', detectContext('# 标题\n\n普通正文。\n') === 'generic');
c('C.纯文本开头 → 通用', detectContext('直接写正文没有 fm。\n') === 'generic');
c('C.命中 → 公文', detectContext(FM('rh-agency: X文件') + '正文\n') === 'gongwen');
c('C.未命中 → 通用', detectContext(FM('title: 会议纪要') + '正文\n') === 'generic');
c('C.嵌套命中 → 公文', detectContext(FM('redhead:\n  date: 2026-09-03') + '正文') === 'gongwen');
c('C.fm 后无正文也判', detectContext(FM('rh-secretLevel: 秘密')) === 'gongwen');
c('C.CRLF 整篇', detectContext('---\r\nrh-agency: 丙单位\r\n---\r\n正文') === 'gongwen');

// ================= D. 与 extractRedHead 一致性对账 =================
// 判定器说公文 ⇔ parseDocument 能解析出 meta 键；判定器说通用 ⇔ meta 空（避免错位）
{
  const samples: [string, string][] = [
    ['D.平铺命中一致', FM('rh-agency: XX局\nrh-docNumber: 办〔2026〕2号') + '正文'],
    ['D.嵌套命中一致', FM('redhead:\n  agency: 某局\n  recipients: 各单位') + '正文'],
    ['D.值空未填一致', FM('rh-agency:\nrh-logo:\nrh-docNumber:') + '正文'],
    ['D.普通文档一致', FM('title: 想法\ntags: [x]') + '正文'],
    ['D.无 fm 一致', '# 纯标题\n正文'],
    ['D.引号空串一致', FM('rh-agency: ""') + '正文'],
    ['D.列表值两难一致', FM('rh-recipients:\n  - 甲单位\n  - 乙单位') + '正文'], // 已知局限：多值列表解析器亦不取 → 判定器同样不命中，口径一致
  ];
  for (const [name, md] of samples) {
    const { meta } = parseDocument(md);
    const metaNonEmpty = Object.keys(meta).length > 0;
    c(name, detectContext(md) === (metaNonEmpty ? 'gongwen' : 'generic'),
      `detect=${detectContext(md)} meta=${metaNonEmpty ? '非空' : '空'}`);
  }
}

// ================= E. ContextGate 手动覆盖 =================
{
  const plain = '# 普通笔记\n正文。\n';
  const gw = FM('rh-agency: XX文件') + '正文\n';
  const gate = new ContextGate();
  c('E.默认 auto', gate.mode === 'auto' && gate.resolve(plain) === 'generic' && gate.resolve(gw) === 'gongwen');
  gate.setMode('gongwen');
  c('E.强制公文盖过无 fm', gate.mode === 'gongwen' && gate.resolve(plain) === 'gongwen');
  gate.setMode('generic');
  c('E.强制通用盖过命中 fm', gate.resolve(gw) === 'generic');
  gate.setMode('auto');
  c('E.切回 auto 恢复判定', gate.resolve(plain) === 'generic' && gate.resolve(gw) === 'gongwen');
}

// ---- 汇总 ----
const failed = checks.filter(([, ok]) => !ok);
console.log(`SUMMARY ${checks.length - failed.length}/${checks.length} passed`);
for (const [name, ok, detail] of checks) {
  if (!ok) console.log(`FAIL ${name} ${detail ? '→ ' + detail : ''}`);
}
if (failed.length) process.exit(1);
