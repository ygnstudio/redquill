// entry_v090.ts —— verify_v090.py 的 esbuild 临时入口：
// splitAgencies / fitAgencySizePt / preview 红头多机关渲染断言（纯函数层）
import { fitAgencySizePt, RED_HEAD_STYLE } from '../src/gongwen/format';
import { splitAgencies } from '../src/gongwen/mdast';
import { renderPreview } from '../src/gongwen/preview';
import { BUILTIN_PRESETS } from '../src/gongwen/format';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);

// A. splitAgencies
c('A.斜杠拆2', splitAgencies('中共云溪镇委员会 / 云溪镇人民政府').length === 2);
c('A.全角斜杠拆2', splitAgencies('中共云溪镇委员会／云溪镇人民政府').length === 2);
c('A.单机关原样', JSON.stringify(splitAgencies('云溪镇人民政府文件')) === JSON.stringify(['云溪镇人民政府文件']));
c('A.空白段丢弃', JSON.stringify(splitAgencies(' 甲  /   /  乙 ')) === JSON.stringify(['甲', '乙']));
c('A.空值空数组', splitAgencies('').length === 0 && splitAgencies(undefined).length === 0);

// B. fitAgencySizePt
c('B.短机关不降号', fitAgencySizePt(['云溪镇人民政府']) === RED_HEAD_STYLE.agency.sizePt);
c('B.联合短机关不降', fitAgencySizePt(['中共云溪镇委员会', '云溪镇人民政府']) === RED_HEAD_STYLE.agency.sizePt);
const LONG = '中国共产党云溪镇农村人居环境整治工作领导小组办公室';
c('B.超长机关降号', fitAgencySizePt([LONG]) < RED_HEAD_STYLE.agency.sizePt, String(fitAgencySizePt([LONG])));
c('B.降号下限22', fitAgencySizePt([LONG]) >= 22, String(fitAgencySizePt([LONG])));
c('B.空数组原值', fitAgencySizePt([], 30) === 30);

// C. preview：meta 机关两行渲染 + 字号自适应一致
const preset = BUILTIN_PRESETS[0];
const html = renderPreview([], preset, {
  meta: { agency: '中共云溪镇委员会 / 云溪镇人民政府', docNumber: '云委发〔2026〕8号' },
});
const have1 = html.includes('中共云溪镇委员会');
const have2 = html.includes('云溪镇人民政府');
c('C.两机关名都渲染', have1 && have2, `p1=${have1} p2=${have2}`);
const size = fitAgencySizePt(['中共云溪镇委员会', '云溪镇人民政府']);
const sizeCount = (html.match(new RegExp(`font-size:${size}pt`, 'g')) || []).length;
c('C.字号同fit且两行', sizeCount >= 2, `size=${size} count=${sizeCount} html=${html.slice(0, 400)}`);
const longHtml = renderPreview([], preset, { meta: { agency: `${LONG} / 云溪镇人民政府` } });
c('C.超长降号同步preview', longHtml.includes(`font-size:${fitAgencySizePt([LONG, '云溪镇人民政府'])}pt`), longHtml.slice(0, 300));

for (const [name, okc, detail] of checks) console.log((okc ? 'PB-OK: ' : 'PB-FAIL: ') + name + (okc ? '' : '  ' + detail));
console.log(`SUMMARY: ${checks.filter((x) => x[1]).length}/${checks.length}`);
process.exit(checks.every((x) => x[1]) ? 0 : 1);
