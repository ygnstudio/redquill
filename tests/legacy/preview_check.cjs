/** preview_check.cjs —— 用打包好的 preview_entry 产出两个样例的预览 HTML，JSON 输出 */
const { renderPreview, parseDocument, BUILTIN_PRESETS } = require('./.tmp_preview.cjs');
const fs = require('fs');
const path = require('path');

const read = (p) => fs.readFileSync(path.join(__dirname, p), 'utf-8');
const preset = BUILTIN_PRESETS[0];
const d1 = parseDocument(read('samples/sample_notice.md'));
const d2 = parseDocument(read('samples/sample_updoc.md'));
const html1 = renderPreview(d1.blocks, preset, { meta: d1.meta });
const html2 = renderPreview(d2.blocks, preset, { meta: d2.meta });
process.stdout.write(JSON.stringify({ html1, html2 }));
