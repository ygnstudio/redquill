// entry_v080.ts —— verify_v080.py 的 esbuild 临时入口：跑 sanitizeSettings 管线断言
import { DEFAULT_SETTINGS, sanitizeSettings } from '../src/gongwen/settings';

const tplOk = (k: string) => k === '公文模板-通知' || k === '公文模板-请示';
const checks: [string, boolean, string][] = [];

const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);

// A. 空 → 全默认
const a = sanitizeSettings(undefined, tplOk);
c('A.空默认', a.signatureRightChars === 4 && a.signatureAlign === 'right' && a.colophonMode === 'off' && a.customPresets.length === 0);

// B. 数值钳制：越界回默认、小数取整、合法保留
const b = sanitizeSettings(
  { signatureRightChars: 99, attachIndentChars: -2, notesIndentChars: 3.7, copiesRightChars: 3 },
  tplOk,
);
c('B.越界回默认', b.signatureRightChars === 4 && b.attachIndentChars === 2, JSON.stringify([b.signatureRightChars, b.attachIndentChars]));
c('B.小数取整', b.notesIndentChars === 3, String(b.notesIndentChars));
c('B.合法保留', b.copiesRightChars === 3, String(b.copiesRightChars));

// C. 对齐三态合法化
c('C.非法align→right', sanitizeSettings({ signatureAlign: 'middle' }, tplOk).signatureAlign === 'right');
c('C.center保留', sanitizeSettings({ signatureAlign: 'center' }, tplOk).signatureAlign === 'center');

// D. 旧 colophonEvenPage 迁移 + colophonMode 优先
c('D.布尔迁移force', sanitizeSettings({ colophonEvenPage: true }, tplOk).colophonMode === 'force');
c('D.mode优先', sanitizeSettings({ colophonEvenPage: true, colophonMode: 'auto' }, tplOk).colophonMode === 'auto');
c('D.非法mode→布尔', sanitizeSettings({ colophonMode: 'bogus', colophonEvenPage: false }, tplOk).colophonMode === 'off');

// E. customPresets normalize：合法半残缺补全、垃圾条目过滤
const e = sanitizeSettings(
  {
    customPresets: [
      { id: 'custom-a', name: '甲', roles: { body: { sizePt: 15 } } },
      '垃圾',
      null,
      { id: 42 },
    ],
  },
  tplOk,
);
c('E.合法补全', e.customPresets.length === 1 && e.customPresets[0].id === 'custom-a' && !!e.customPresets[0].name,
  JSON.stringify(e.customPresets.map((p) => p.id)));
c('E.垃圾过滤', !e.customPresets.some((p) => p.id === 42));

// F. builtinOverrides：合法打 builtin、未知 id 过滤
const f = sanitizeSettings(
  { builtinOverrides: [{ id: 'gongwen-standard', roles: { body: { sizePt: 17 } } }, { id: 'nope' }, null] },
  tplOk,
);
c('F.覆盖保留', f.builtinOverrides.length === 1 && f.builtinOverrides[0].builtin === true && f.builtinOverrides[0].roles.body.sizePt === 17,
  JSON.stringify(f.builtinOverrides.map((p) => p.id)));
c('F.未知id过滤', !f.builtinOverrides.some((p) => p.id === 'nope'));

// G. templateSelection 白名单
const g = sanitizeSettings({ templateSelection: ['公文模板-通知', '公文模板-不存在', 123] }, tplOk);
c('G.白名单', g.templateSelection.length === 1 && g.templateSelection[0] === '公文模板-通知', JSON.stringify(g.templateSelection));

// H. 全量结构字段回填默认（保证导出/导入不丢字段）
const h = sanitizeSettings({ activePresetId: 'custom-a' }, tplOk);
const hKeys = ['signatureRightChars', 'signatureLeftChars', 'attachIndentChars', 'notesIndentChars', 'colophonLeftChars', 'printRightChars', 'copiesRightChars'];
c('H.结构层齐全', hKeys.every((k) => typeof (h as Record<string, unknown>)[k] === 'number' && (h as Record<string, unknown>)[k] === DEFAULT_SETTINGS[k as keyof typeof DEFAULT_SETTINGS]));
c('H.非数值不残留', typeof (h as any).colophonMode === 'string' && (h as any).firstSentenceBold === false);

for (const [name, okc, detail] of checks) console.log((okc ? 'PB-OK: ' : 'PB-FAIL: ') + name + (okc ? '' : '  ' + detail));
console.log(`SUMMARY: ${checks.filter((x) => x[1]).length}/${checks.length}`);
process.exit(checks.every((x) => x[1]) ? 0 : 1);
