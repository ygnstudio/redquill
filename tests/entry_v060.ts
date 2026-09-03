/**
 * entry_v060.ts —— v0.6.0 md 表格：mdast 解析 + preview 渲染断言（verify_v060.py 调用）。
 * 输出逐行：OK 行以「PB-OK:」开头，失败「PB-FAIL:」，末行「PB-TOTAL:n pass / m fail」。
 */
import { parseDocument } from '../src/gongwen/mdast';
import { renderPreview } from '../src/gongwen/preview';
import { BUILTIN_PRESETS } from '../src/gongwen/format';
import { readFileSync } from 'node:fs';

const md = readFileSync(process.argv[2], 'utf-8');
const { blocks } = parseDocument(md);
let pass = 0;
let fail = 0;
const ok = (cond: boolean, name: string, detail = '') => {
  if (cond) { pass++; console.log(`PB-OK: ${name}`); }
  else { fail++; console.log(`PB-FAIL: ${name}${detail ? ' — ' + detail : ''}`); }
};

const tables = blocks.filter((b) => b.kind === 'table');
ok(tables.length === 2, '两个数据表解析为 table 块（仅表头的跳过）', `got ${tables.length}`);
const t1 = tables[0]?.table;
ok(
  JSON.stringify(t1?.header) === JSON.stringify(['村（社区）', '责任人', '完成时限']) &&
    t1?.rows.length === 2 &&
    t1.rows[0][0] === '云溪村',
  '表1 表头/行内容正确',
  JSON.stringify(t1),
);
ok(t1?.align.every((a) => a === null), '表1 未标注对齐 → 全 null（默认居中）');
const t2 = tables[1]?.table;
ok(
  JSON.stringify(t2?.align) === JSON.stringify(['left', 'center', 'right']),
  '表2 对齐标记解析为 left/center/right',
  JSON.stringify(t2?.align),
);
ok(!blocks.some((b) => b.text.includes('仅表头')), '仅表头表格不进正文块');

// preview 渲染
const html = renderPreview(blocks, BUILTIN_PRESETS[0], {});
const tableCount = (html.match(/<table/g) || []).length;
ok(tableCount === 2, 'preview 输出 2 个 <table>', `got ${tableCount}`);
ok((html.match(/<th/g) || []).length === 6, 'preview 表头 6 个 <th>');
ok(html.includes('text-align:center'), 'preview 默认数据格居中');
ok(html.includes('text-align:right'), 'preview 表2 右对齐列生效');
ok(html.includes('text-align:left'), 'preview 表2 左对齐列生效');
ok(html.includes('仅表头') === false, 'preview 不含仅表头表格文字');
const fontOk = html.includes('font-size:14pt') && html.includes('仿宋');
ok(fontOk, 'preview 表格 14pt 仿宋（取 table 角色）');

console.log(`PB-TOTAL: ${pass} pass / ${fail} fail`);
process.exit(fail ? 1 : 0);
