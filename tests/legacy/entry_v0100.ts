// entry_v0100.ts —— verify_v0100.py 的 esbuild 临时入口（纯函数层）
// splitAttachTitle / parseGongwenFull hr 附件切分 / rh-seal frontmatter / preview 印章+附件区渲染
import { parseDocument, parseGongwenFull, splitAttachTitle } from '../src/gongwen/mdast';
import { renderPreview } from '../src/gongwen/preview';
import { BUILTIN_PRESETS } from '../src/gongwen/format';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);
const preset = BUILTIN_PRESETS[0];

// A. splitAttachTitle
const st = (t: string) => {
  const { mark, title } = splitAttachTitle(t);
  return `${mark}｜${title}`;
};
c('A.附件1拆', st('附件1：云溪镇村庄清洁行动长效管护实施方案') === '附件1｜云溪镇村庄清洁行动长效管护实施方案');
c('A.空格编号拆', st('附件 2：考核评分细则') === '附件2｜考核评分细则');
c('A.无编号冒号', st('附件：统计表') === '附件｜统计表');
c('A.中文数字顿号', st('附件三、考核表') === '附件三｜考核表');
c('A.句点分隔', st('附件1.清单') === '附件1｜清单');
c('A.无前缀原样', st('云溪镇实施方案') === '附件｜云溪镇实施方案');
c('A.仅附件字', st('附件') === '附件｜');

// B. parseGongwenFull：`---` → attach 区（内联样本，parseGongwenFull 不剥 frontmatter）
const md1 = [
  '# 关于XX的通知',
  '',
  '正文第一段。',
  '',
  '---',
  '',
  '# 附件1：统计表',
  '',
  '表内说明。',
].join('\n');
const { blocks, attach } = parseGongwenFull(md1);
c('B.正文止于hr', blocks.length === 2 && !blocks.some((b) => b.text.includes('附件1')), JSON.stringify(blocks.map((b) => b.text)));
c('B.attach存在2块', !!attach && attach.length === 2, JSON.stringify(attach?.map((b) => b.text)));
c('B.附件首块docTitle', attach?.[0]?.kind === 'docTitle' && attach[0].text.startsWith('附件1'), attach?.[0]?.text);
c('B.无hr无attach', parseGongwenFull('# 标题\n\n正文。\n').attach === undefined);

// C. rh-seal frontmatter → meta.seal
const m3 = parseDocument('---\nrh-agency: 甲\nrh-seal: _assets/seal.png\nrh-date: 2026年9月8日\n---\n\n# 标题\n').meta;
c('C.rh-seal读取', m3.seal === '_assets/seal.png', String(m3.seal));

// D. preview：印章浮层 + 附件区另面渲染（与 docx 同源）
const blocksD: any[] = [{ kind: 'docTitle', text: '关于XX的通知' }, { kind: 'para', text: '正文内容。' }];
const attachD: any[] = [{ kind: 'docTitle', text: '附件1：XX实施方案' }, { kind: 'para', text: '附件正文段。' }];
const metaD = { agency: '云溪镇人民政府文件', attachments: 'XX实施方案', signature: '云溪镇人民政府', date: '2026年9月8日' };
const html = renderPreview(blocksD, preset, { meta: metaD, sealUrl: 'app://local/seal.png', attach: attachD });
c('D.印章img浮层', html.includes('rg-seal') && html.includes('position:absolute') && html.includes('z-index:10'), html.slice(0, 200));
c('D.附件虚线提示', html.includes('rg-attach-break') && html.includes('另面 · 附件'));
c('D.附件mark行', html.includes('>附件1<'), html.slice(html.indexOf('rg-attach-section'), html.indexOf('rg-attach-section') + 260));
c('D.附件标题拆分', html.includes('<div class="rg-title">XX实施方案</div>'), '标题未拆前缀');
c('D.章压落款内', html.indexOf('rg-closing') < html.indexOf('rg-seal'), `closing=${html.indexOf('rg-closing')} seal=${html.indexOf('rg-seal')}`);
c('D.附件区在落款后', html.indexOf('rg-seal') < html.indexOf('<div class="rg-attach-section">'), `seal=${html.indexOf('rg-seal')} attach=${html.indexOf('<div class="rg-attach-section">')}`);
c('D.无附件不渲染', !renderPreview(blocksD, preset, { meta: metaD }).includes('<div class="rg-attach-section">'));
c('D.无章无img', !renderPreview(blocksD, preset, { meta: metaD }).includes('rg-seal'));

for (const [name, okc, detail] of checks) console.log((okc ? 'PB-OK: ' : 'PB-FAIL: ') + name + (okc ? '' : '  ' + detail));
console.log(`SUMMARY: ${checks.filter((x) => x[1]).length}/${checks.length}`);
process.exit(checks.every((x) => x[1]) ? 0 : 1);
