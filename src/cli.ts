#!/usr/bin/env node
/**
 * cli.ts —— RedHead 调试壳：md → docx / 批量归档 / 体检 / 台账（v0.12.0 多文档）
 * 用法：node dist/cli.js <输入…> [-o output.docx] [--out-dir <dir>] [--preset <内置预设id>] [--bold]
 *   输入支持：单个 .md 文件 / 目录（递归收 *.md）/ 最小 glob（**、*、?，如 'docs/**\/*.md'）
 *   [--check]   公文排版体检（v0.7.0）：单文件输出 JSON 问题清单；多文件输出汇总
 *               { summary, files[] }（--table 加可读汇总表）；有 error 级 exit 2
 *   [--ledger]  文号台账（v0.12.0）：扫描各笔记 rh-docNumber，报告重号/漏号/格式问题；
 *               stdout 文本表 + 统计；-o ledger.csv / ledger.md / ledger.txt 写登记表
 *   [--colophon-mode off|auto|force] [--even-colophon(旧，=force)]
 *   [--signature-align right|center|left] [--signature-right <0-12>] [--signature-left <0-12>]
 *   [--attach-left <0-12>] [--notes-left <0-12>] [--colophon-left <0-12>]
 *   [--print-right <0-12>] [--copies-right <0-12>]
 *   [--data <vault>/.obsidian/plugins/redhead/data.json]
 * --data：读取 Obsidian 插件 data.json，--preset 命中的内置预设优先应用用户修改覆盖层
 *         （含自定义预设），与插件内导出一致。仅用于格式验证，不随插件发布。
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import { parseDocument } from './gongwen/mdast.js';
import { exportDocx, type LogoImage } from './gongwen/docx_export.js';
import { BUILTIN_PRESETS, STRUCT_DEFAULTS, type Preset, type StructLayout } from './gongwen/format.js';
import { expandInputs, outRelPath } from './file_scan.js';
import {
  buildLedger,
  ledgerSummary,
  ledgerToCSV,
  ledgerToMD,
  ledgerToText,
  type LedgerInput,
} from './ledger.js';

const args = process.argv.slice(2);
// 位置参数 = 不带 - 的项，且排除已知开关的取值（各带值 flag 后面的那个）
const VALUE_FLAGS = [
  '-o',
  '--out-dir',
  '--preset',
  '--data',
  '--colophon-mode',
  '--signature-align',
  '--signature-right',
  '--signature-left',
  '--attach-left',
  '--notes-left',
  '--colophon-left',
  '--print-right',
  '--copies-right',
];
const flagValueIdx = new Set<number>();
args.forEach((a, i) => {
  if (VALUE_FLAGS.includes(a)) flagValueIdx.add(i + 1);
});
const inputs = args.filter((a, i) => !a.startsWith('-') && !flagValueIdx.has(i));
const outIdx = args.indexOf('-o');
const outDirIdx = args.indexOf('--out-dir');
const presetIdx = args.indexOf('--preset');
const presetId = presetIdx !== -1 ? args[presetIdx + 1] : undefined;
const dataIdx = args.indexOf('--data');
const dataPath = dataIdx !== -1 ? args[dataIdx + 1] : undefined;
const bold = args.includes('--bold');
// 版记分页模式：--colophon-mode 显式指定优先；旧 --even-colophon 等价 force；
// 否则读 --data 的 data.json（新字段 colophonMode，兼容旧布尔 colophonEvenPage）
let colophonMode: 'off' | 'auto' | 'force' = 'off';
{
  const modeIdx = args.indexOf('--colophon-mode');
  const modeVal = modeIdx !== -1 ? args[modeIdx + 1] : undefined;
  if (modeVal === 'off' || modeVal === 'auto' || modeVal === 'force') colophonMode = modeVal;
  else if (args.includes('--even-colophon')) colophonMode = 'force';
  else if (dataPath) {
    try {
      const d = JSON.parse(readFileSync(resolve(dataPath), 'utf-8'));
      if (d.colophonMode === 'off' || d.colophonMode === 'auto' || d.colophonMode === 'force') colophonMode = d.colophonMode;
      else if (d.colophonEvenPage === true) colophonMode = 'force';
    } catch {
      /* data.json 读取失败已在上面报过，这里静默 */
    }
  }
}
// 结构层位置参数（v0.5.6）：--flag 显式优先；否则读 data.json 对应字段；
// 兜底 STRUCT_DEFAULTS（GB/T：落款右空4、附注/附件左空2、版记抄送左空1、印发右空1、印数右空3）
let struct: StructLayout = { ...STRUCT_DEFAULTS };
{
  const readData = (): Record<string, unknown> | null => {
    if (!dataPath) return null;
    try {
      return JSON.parse(readFileSync(resolve(dataPath), 'utf-8')) as Record<string, unknown>;
    } catch {
      return null; /* data.json 读取失败已在别处报过，这里静默 */
    }
  };
  const data = readData();
  const numOf = (v: unknown): number | null =>
    typeof v === 'number' && isFinite(v) && v >= 0 && v <= 12 ? Math.floor(v) : null;
  const pick = (key: keyof StructLayout, flag: string): void => {
    const idx = args.indexOf(flag);
    const cliN = idx !== -1 ? parseFloat(args[idx + 1]) : NaN;
    const n = Number.isFinite(cliN) ? numOf(cliN) : data ? numOf(data[key]) : null;
    if (n !== null) struct[key] = n as never;
  };
  pick('signatureRightChars', '--signature-right');
  pick('signatureLeftChars', '--signature-left');
  pick('attachIndentChars', '--attach-left');
  pick('notesIndentChars', '--notes-left');
  pick('colophonLeftChars', '--colophon-left');
  pick('printRightChars', '--print-right');
  pick('copiesRightChars', '--copies-right');
  // 落款对齐：--signature-align 显式优先；否则 data.json signatureAlign
  const alignIdx = args.indexOf('--signature-align');
  const av = alignIdx !== -1 ? args[alignIdx + 1] : undefined;
  if (av === 'left' || av === 'center' || av === 'right') struct.signatureAlign = av;
  else if (data?.signatureAlign === 'left' || data?.signatureAlign === 'center') {
    struct.signatureAlign = data.signatureAlign;
  }
}

const modeLedger = args.includes('--ledger');
const modeCheck = args.includes('--check');

if (!inputs.length) {
  console.error(
    `用法：node dist/cli.js <文件|目录|glob…> [-o output.docx] [--out-dir <dir>] [--preset ${BUILTIN_PRESETS.map((p) => p.id).join('|')}] [--bold] [--colophon-mode off|auto|force] [--even-colophon] [--signature-right <0-12>] [--data <data.json>] [--check] [--ledger]`,
  );
  process.exit(1);
}
if (outIdx !== -1 && inputs.length > 1) {
  console.error('❌ -o 只对单输入有效；批量导出请用 --out-dir <dir>。');
  process.exit(1);
}

/** 展开输入（文件/目录/glob → 绝对路径 md 列表） */
const files = expandInputs(inputs, process.cwd());
if (!files.length) {
  console.error(`⚠️ 未找到任何 .md 输入：${inputs.join(' ')}`);
  process.exit(1);
}
const single = files.length === 1;

/** 从 Obsidian data.json 解析预设：内置预设应用覆盖层 + 自定义预设一并可选 */
function resolvePresetFromData(rawData: string, id?: string): Preset | null {
  // 延迟导入，避免不带 --data 时也无谓加载
  const { normalizePreset } = require('./gongwen/format.js') as typeof import('./gongwen/format.js');
  const data = JSON.parse(rawData);
  const all: Preset[] = [
    ...BUILTIN_PRESETS.map((b) => {
      const o = (data.builtinOverrides ?? []).find((x: any) => x?.id === b.id);
      return o ? ({ ...normalizePreset({ ...structuredClone(b), ...o }), builtin: true } as Preset) : b;
    }),
    ...((data.customPresets ?? []).map(normalizePreset).filter(Boolean) as Preset[]),
  ];
  return all.find((p) => p.id === id) ?? null;
}

let preset = BUILTIN_PRESETS.find((p) => p.id === presetId) ?? BUILTIN_PRESETS[0];
if (dataPath) {
  try {
    const fromData = resolvePresetFromData(readFileSync(resolve(dataPath), 'utf-8'), presetId);
    if (fromData) preset = fromData;
    else console.error(`⚠️ data.json 中找不到预设「${presetId ?? ''}」，回落出厂内置。`);
  } catch (e) {
    console.error(`⚠️ 读取 data.json 失败（${(e as Error).message}），回落出厂内置。`);
  }
}

/** 发文字号格式提醒（不阻断） */
function warnDocNumber(meta: { docNumber?: string }): void {
  const t = (meta.docNumber ?? '').trim();
  if (t && /[[\]()]/.test(t)) console.error(`⚠️ 发文字号「${t}」的年份括号应使用全角六角括号〔〕`);
  else if (t && !/〔\d{4}〕/.test(t)) console.error(`⚠️ 发文字号「${t}」建议采用「机关代字〔年份〕序号号」格式`);
}

/**
 * 相对 md 所在目录解析图片并嵌入（rh-logo / rh-seal）。
 * readFileSync 返回 Buffer，其 .buffer 是底层池 ArrayBuffer（可能不从文件首字节起）——
 * 必须 slice 出精确字节段，否则 docx/图片尺寸解析会读错（v0.10.0 实测章图 cy 天文数）
 */
function resolveImage(ref: string, mdPath: string): LogoImage | undefined {
  const p = resolve(dirname(mdPath), ref.trim());
  try {
    const b = readFileSync(p);
    return {
      data: b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer,
      ext: /\.(jpe?g)$/i.test(p) ? 'jpg' : 'png',
    };
  } catch {
    console.error(`⚠️ 图片文件不存在：${p}，按无图处理`);
    return undefined;
  }
}

async function runExport(): Promise<void> {
  const outDir = outDirIdx !== -1 ? resolve(args[outDirIdx + 1]) : undefined;
  let fail = 0;
  for (let n = 0; n < files.length; n++) {
    const mdPath = files[n];
    const md = readFileSync(mdPath, 'utf-8');
    const { meta, blocks, attach } = parseDocument(md);
    warnDocNumber(meta);
    const out =
      single && outIdx !== -1 && args[outIdx + 1]
        ? resolve(args[outIdx + 1])
        : outDir
          ? // 保留输入相对子路径（目录/glob 输入镜像目录树，同名不互盖）
            resolve(outDir, outRelPath(mdPath, inputs, process.cwd()).replace(/\.md$/i, '') + '.docx')
          : resolve(mdPath.replace(/\.md$/i, '') + '.docx');
    const logo = meta.logo?.trim() ? resolveImage(meta.logo, mdPath) : undefined;
    const seal = meta.seal?.trim() ? resolveImage(meta.seal, mdPath) : undefined;
    try {
      if (outDir) mkdirSync(dirname(out), { recursive: true });
      await exportDocx(blocks, out, preset, {
        firstSentenceBold: bold,
        meta,
        logo,
        seal,
        attach,
        colophonMode,
        struct,
      });
      const prog = single ? '' : `[${n + 1}/${files.length}] `;
      console.log(`✅ ${prog}[${preset.name}] ${basename(mdPath)} → ${out}`);
    } catch (e) {
      fail++;
      console.error(`❌ [${n + 1}/${files.length}] ${basename(mdPath)} 导出失败：${(e as Error).message}`);
    }
  }
  if (fail) {
    console.error(`❌ 批量导出完成，${fail}/${files.length} 失败`);
    process.exit(1);
  }
}

async function runCheck(): Promise<void> {
  const { checkDocument } = require('./gongwen/checker.js') as typeof import('./gongwen/checker.js');
  const wantTable = args.includes('--table');
  if (single) {
    // 单文件：保持 v0.7.0 输出形态（JSON 问题清单数组），exit 语义不变
    const issues = checkDocument(readFileSync(files[0], 'utf-8'));
    if (wantTable) {
      const errs = issues.filter((i) => i.level === 'error').length;
      console.log(`${basename(files[0])}：error ${errs}，warn ${issues.length - errs}`);
      for (const i of issues) console.log(`  [${i.level}] L${i.line ?? '?'} ${i.code} ${i.message ?? ''}`);
    } else {
      console.log(JSON.stringify(issues, null, 2));
    }
    process.exit(issues.some((i) => i.level === 'error') ? 2 : 0);
  }
  // 多文件：汇总 { summary, files[] }，任一 error → exit 2
  const { checkDocument: cd } = require('./gongwen/checker.js') as typeof import('./gongwen/checker.js');
  const per = files.map((f) => ({ file: f, issues: cd(readFileSync(f, 'utf-8')) }));
  const errors = per.reduce((s, x) => s + x.issues.filter((i) => i.level === 'error').length, 0);
  const warns = per.reduce((s, x) => s + x.issues.filter((i) => i.level === 'warn').length, 0);
  const summary = {
    files: files.length,
    errors,
    warns,
    dirties: per.filter((x) => x.issues.some((i) => i.level === 'error')).length,
  };
  if (wantTable) {
    console.log(`共 ${summary.files} 篇：error ${summary.errors}（${summary.dirties} 篇不合规），warn ${summary.warns}`);
    for (const x of per) {
      const e = x.issues.filter((i) => i.level === 'error').length;
      const w = x.issues.length - e;
      const mark = e ? '✗' : w ? '△' : '✓';
      console.log(`  ${mark} ${basename(x.file)}：error ${e}，warn ${w}${e || w ? `（${x.issues.map((i) => i.code).join('、')}）` : ''}`);
    }
  } else {
    console.log(JSON.stringify({ summary, files: per }, null, 2));
  }
  process.exit(errors ? 2 : 0);
}

async function runLedger(): Promise<void> {
  const rows: LedgerInput[] = [];
  for (const f of files) {
    const md = readFileSync(f, 'utf-8');
    const { meta, blocks } = parseDocument(md);
    rows.push({
      file: f,
      title: (blocks.find((b) => b.kind === 'docTitle')?.text ?? '').split('\n')[0].trim(),
      agency: meta.agency,
      docNumber: meta.docNumber,
      signature: meta.signature,
      recipients: meta.recipients,
    });
  }
  const { rows: ledgerRows, stats } = buildLedger(rows);
  console.log(`📋 文号台账：${ledgerSummary(stats)}`);
  for (const r of ledgerRows.filter((x) => x.status === 'unnumbered'))
    console.error(`⚠️ 漏号：${r.name}${r.title ? `《${r.title}》` : ''}`);
  for (const r of ledgerRows.filter((x) => x.status === 'dup'))
    console.error(`⚠️ 重号：${r.docNumber} ← ${[r.name, ...r.dupWith.map((d) => d.split(/[\\/]/).pop() ?? d)].join('、')}`);
  for (const r of ledgerRows.filter((x) => x.formatIssue)) console.error(`⚠️ 格式：${r.docNumber}（${r.name}）${r.formatIssue}`);
  if (outIdx !== -1 && args[outIdx + 1]) {
    const out = resolve(args[outIdx + 1]);
    const ext = extname(out).toLowerCase();
    const body =
      ext === '.csv' ? ledgerToCSV(ledgerRows) : ext === '.md' ? ledgerToMD(ledgerRows) : ledgerToText(ledgerRows);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, body);
    console.log(`✅ 登记表已写：${out}（${ledgerRows.length} 行）`);
  } else {
    console.log(ledgerToText(ledgerRows));
  }
}

if (modeLedger) void runLedger();
else if (modeCheck) void runCheck();
else void runExport();
