// entry_editing.ts —— verify_editing.py 的 esbuild 临时入口（v1.1 编辑器手感纯函数）
// 校验对象：src/editing/*（④光标与选区 / ⑤输入辅助 / ⑦列表续排，纯逻辑零 obsidian）
//  A. segClsOf 字符类别
//  B. wordSegmentAt 双击词段（中英分流 / 标点连串 / 边界）
//  C. blockRangeAt 整段选中（空行块语义 / 空行 / CRLF）
//  D. titleLineRangeAt 标题行窄化
//  E. quotePairAt / curlyWrap 引号配对
//  F. toggleInline 行内格式 toggle
//  F2. inlineReplace（UI 最小事务直用）
//  G. breakList / listToPlain 列表增强
//  H. curlyWrapDelta 引号包裹 delta 版
import { segClsOf, wordSegmentAt, blockRangeAt, titleLineRangeAt } from '../src/editing/segments';
import { quotePairAt, curlyWrap, curlyWrapDelta } from '../src/editing/quotes';
import { toggleInline, inlineReplace } from '../src/editing/inline';
import { breakList, listToPlain } from '../src/editing/listops';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);
const L = (s: string): string => s.replace(/\n/g, '\\n').replace(/\r/g, '\\r');

// ================= A. segClsOf =================
c('A.汉字→cjk', segClsOf('写') === 'cjk');
c('A.扩展区汉字→cjk', segClsOf('\u{20000}') === 'cjk');
c('A.英文→alnum', segClsOf('R') === 'alnum');
c('A.数字→alnum', segClsOf('9') === 'alnum');
c('A.下划线→alnum', segClsOf('_') === 'alnum');
c('A.中文标点→other', segClsOf('，') === 'other');
c('A.半角标点→other', segClsOf('.') === 'other');
c('A.空白→other', segClsOf(' ') === 'other');
c('A.emoji→other', segClsOf('😀') === 'other');

// ================= B. wordSegmentAt =================
const w = (text: string, offset: number): string => {
  const r = wordSegmentAt(text, offset);
  return r === null ? '<null>' : `[${r[0]},${r[1]},${text.slice(r[0], r[1])}]`;
};
c('B.纯中文光标中→整句段', w('写作体验插件', 2) === '[0,6,写作体验插件]');
c('B.纯中文光标首字→整段', w('写作体验插件', 0) === '[0,6,写作体验插件]');
c('B.中英紧邻不互并·光标中文', w('RedQuill写作', 9) === '[8,10,写作]');
c('B.中英紧邻不互并·光标英文', w('RedQuill写作', 3) === '[0,8,RedQuill]');
c('B.空格分隔英文词', w('hello world', 2) === '[0,5,hello]');
c('B.版本号点不并入数字', w('v1.1版', 3) === '[3,4,1]');
c('B.中文逗号断句·光标首段', w('第一段，第二段', 1) === '[0,3,第一段]');
c('B.中文逗号断句·光标次段', w('第一段，第二段', 5) === '[4,7,第二段]');
c('B.光标在逗号→单逗号', w('第一段，第二段', 3) === '[3,4,，]');
c('B.逗号连发同字吸收', w('第一段，，第二段', 4) === '[3,5,，，]');
c('B.句号连发吸收', w('行文结束。。正文', 5) === '[4,6,。。]');
c('B.省略号同字吸收', w('第一……第二', 3) === '[2,4,……]');
c('B.中文引号内文字成段', w('他说“你好”世界', 4) === '[3,5,你好]');
c('B.文首边界', w('插件测试', 0) === '[0,4,插件测试]');
c('B.行尾边界夹取', w('这是结尾', 4) === '[0,4,这是结尾]');
c('B.光标在空白→null', w('你好 世界', 2) === '<null>');
c('B.空串→null', w('', 0) === '<null>');
c('B.英文标识含下划线成段', w('foo_bar文本', 3) === '[0,7,foo_bar]');
c('B.单标点不吸收异字符', w('a!b', 1) === '[1,2,!]');
c('B.数字后中文不并', w('2026年计划', 2) === '[0,4,2026]');

// ================= C. blockRangeAt =================
const blk = (text: string, offset: number): string => {
  const r = blockRangeAt(text, offset);
  return `[${r[0]},${r[1]},${L(text.slice(r[0], r[1]))}]`;
};
c('C.单段多行整段', blk('第一行内容\n第二行内容\n', 6) === '[0,11,第一行内容\\n第二行内容]');
c('C.多段选光标所在段', blk('段A开头。\n\n段B开头。\n段B二行。\n', 9) === '[7,18,段B开头。\\n段B二行。]');
c('C.段内任意位置同结果', blk('段A开头。\n\n段B开头。\n段B二行。\n', 15) === '[7,18,段B开头。\\n段B二行。]');
c('C.单行段', blk('只有一行', 2) === '[0,4,只有一行]');
c('C.列表连续行同块', blk('- 甲\n- 乙\n- 丙\n', 4) === '[0,11,- 甲\\n- 乙\\n- 丙]');
c('C.引用块同块', blk('> 引用一\n> 引用二\n', 7) === '[0,11,> 引用一\\n> 引用二]');
c('C.文首段前无空行', blk('首段\n\n次段\n', 0) === '[0,2,首段]');
c('C.文末段尾无换行', blk('首段\n\n末段', 4) === '[4,6,末段]');
c('C.光标在空行→空行自身', (() => { const r = blockRangeAt('甲\n\n乙\n', 2); return r[0] === 2 && r[1] === 2; })());
c('C.空文本', (() => { const r = blockRangeAt('', 0); return r[0] === 0 && r[1] === 0; })());
c('C.CRLF 段落剥行尾\\r', blk('甲\r\n\r\n乙\r\n', 5) === '[5,6,乙]');

// ================= D. titleLineRangeAt =================
const tt = '# 标题\n\n正文独立。\n\n# 乙标题\n正文贴乙。\n';
const ttRange = (offset: number): string => {
  const block = blockRangeAt(tt, offset);
  const r = titleLineRangeAt(tt, block, offset);
  return L(tt.slice(r[0], r[1]));
};
c('D.独立标题行收窄到自身', ttRange(1) === '# 标题');
c('D.正文独立段不窄化', ttRange(8) === '正文独立。');
c('D.标题紧贴正文→光标在标题只选标题行', ttRange(14) === '# 乙标题');
c('D.标题紧贴正文→光标在正文选整块', ttRange(21) === '# 乙标题\\n正文贴乙。');

// ================= E. quotePairAt / curlyWrap =================
const q = (text: string, offset: number): string => {
  const r = quotePairAt(text, offset);
  return r === null ? '<null>' : `${r.type}:${JSON.stringify(r.replacement)}:[${r.from},${r.to}]`;
};
c('E.中文语境行尾输"→成对弯引号', q('他说：', 3) === 'open:"“”":[4,4]');
c('E.光标在空对内再输"→跳越', q('“”', 1) === 'jump:"":[2,2]');
c('E.右引号前(内容尾)输"→跳越', q('他说“你好”', 5) === 'jump:"":[6,6]');
c('E.左引号后无右引号→补右引号', q('他说“你好，', 6) === 'close:"”":[7,7]');
c('E.纯英文行直通半角', q('hello ', 6) === '<null>');
c('E.光标紧贴字母后不弯引', q('变量x=', 3) === '<null>');
c('E.全角空格行尾也算中文语境', q('你好\u3000', 3) === 'open:"“”":[4,4]');
c('E.代码围栏内直通', q('```\ncode = "\n```', 12) === '<null>');
c('E.引号包裹选区', curlyWrap('他说你好', 2, 4).text === '他说“你好”' && curlyWrap('他说你好', 2, 4).from === 3 && curlyWrap('他说你好', 2, 4).to === 5);
c('E.引号无选区插空对', curlyWrap('他说', 2, 2).text === '他说“”' && curlyWrap('他说', 2, 2).from === 3);

// ================= F. toggleInline =================
const t = (text: string, a: number, b: number, mark: string): string => {
  const r = toggleInline(text, a, b, mark);
  return L(r.text) + ':' + JSON.stringify([r.from, r.to]);
};
c('F.无选区插空对·光标居中', t('abc', 1, 1, '**') === 'a****bc:[3,3]');
c('F.包裹选中', t('选中文字', 0, 4, '**') === '**选中文字**:[2,6]');
c('F.已包裹整体→剥离', t('**选中文字**', 2, 6, '**') === '选中文字:[0,4]');
c('F.代码标记包裹', t('变量', 0, 2, '`') === '`变量`:[1,3]');
c('F.等号高亮包裹', t('重点', 0, 2, '==') === '==重点==:[2,4]');
c('F.空串输入', t('', 0, 0, '**') === '****:[2,2]');
c('F.选区中部包裹', t('这是长文本', 1, 3, '**') === '这**是长**文本:[3,5]');

// ================= F2. inlineReplace（UI 最小事务直用） =================
const ir = (text: string, a: number, b: number, mark: string): string => {
  const r = inlineReplace(text, a, b, mark);
  return `${r.from},${r.to},${L(r.insert)}→[${r.anchor},${r.head}]`;
};
c('F2.包裹选区为单段替换', ir('选中文字', 0, 4, '**') === '0,4,**选中文字**→[2,6]');
c('F2.剥离为单段替换', ir('**选中文字**', 2, 6, '**') === '0,8,选中文字→[0,4]');
c('F2.无选区插空对', ir('abc', 1, 1, '**') === '1,1,****→[3,3]');

// ================= G. breakList / listToPlain =================
const br = (text: string, offset: number): string => {
  const r = breakList(text, offset);
  return r === null ? '<null>' : `${r.from},${r.to},${L(r.insert)}→cur${r.cursor}`;
};
c('G.无序项行尾打断', br('- 项目内容\n', 6) === '6,6,\\n→cur7');
c('G.有序项打断保留后续行', br('1. 甲\n2. 乙\n', 4) === '4,4,\\n→cur5');
c('G.空列表项打断', br('- \n', 2) === '2,2,\\n→cur3');
c('G.文末无换行打断', br('- 项目内容', 6) === '6,6,\\n\\n→cur7');
c('G.非列表行→null', br('普通文本\n', 4) === '<null>');
c('G.引用块→null', br('> 引用文字\n', 2) === '<null>');
c('G.行中光标后残留→null', br('- 甲乙\n', 3) === '<null>');
c('G.列表转纯文本·无序', listToPlain('- 甲\n- 乙\n') === '甲\n乙\n');
c('G.列表转纯文本·有序', listToPlain('1. 甲\n2. 乙\n') === '甲\n乙\n');
c('G.列表转纯文本·非列表行原样', listToPlain('普通文本\n') === '普通文本\n');
c('G.列表转纯文本·混合行', listToPlain('- 甲\n普通\n2. 乙\n') === '甲\n普通\n乙\n');
c('G.列表转纯文本·嵌套保留缩进', listToPlain('  - 子项\n- 甲\n') === '  子项\n甲\n');

// ================= H. curlyWrapDelta（引号包裹 UI 最小事务） =================
const qd = (text: string, a: number, b: number): string => {
  const r = curlyWrapDelta(text, a, b);
  return `${r.from},${r.to},${L(r.insert)}→[${r.anchor},${r.head}]`;
};
c('H.包裹选区为单段替换', qd('他说你好', 2, 4) === '2,4,“你好”→[3,5]');
c('H.选区整段包裹', qd('他说你好', 0, 4) === '0,4,“他说你好”→[1,5]');
c('H.无选区插空对·光标居中', qd('他说', 2, 2) === '2,2,“”→[3,3]');
c('H.空文档插空对', qd('', 0, 0) === '0,0,“”→[1,1]');
c('H.文首插入', qd('abc', 0, 0) === '0,0,“”→[1,1]');
c('H.半角字符包裹', qd('hello', 1, 3) === '1,3,“el”→[2,4]');
c('H.delta 与全文版一致·包裹', curlyWrapDelta('他说你好', 2, 4).insert === '“你好”' && curlyWrap('他说你好', 2, 4).text === '他说“你好”');
c('H.delta 与全文版一致·空对', curlyWrapDelta('他说', 2, 2).insert === '“”' && curlyWrap('他说', 2, 2).text === '他说“”');

// ================= 汇总 =================
const failed = checks.filter(([, ok]) => !ok);
console.log(`entry_editing: ${checks.length} 断言, ${failed.length} 失败`);
failed.forEach(([n]) => console.log(`  ❌ ${n}`));
if (failed.length) {
  console.log('提示：对照 entry 内相邻用例核对坐标/格式约定');
  process.exit(1);
}
console.log('ALL GREEN');
