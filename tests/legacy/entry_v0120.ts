// entry_v0120.ts —— verify_v0120.py 的 esbuild 临时入口（纯函数层）
// v0.12.0 多文档归档中可机器校验的部分：
//  ① 输入展开：globToRegExp / splitGlobRoot / hasMagic / isSkippableDir / expandInputs（真 fs）
//  ② 文号台账：buildLedger 状态判定（ok/dup 重号/unnumbered 漏号）/ docNumberFormatIssue / 统计
//  ③ 登记表格式：ledgerToCSV（转义）/ ledgerToMD / ledgerToText
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { globToRegExp, splitGlobRoot, hasMagic, isSkippableDir, expandInputs, outRelPath, relativeToInput } from '../src/file_scan';
import {
  buildLedger,
  docNumberFormatIssue,
  ledgerToCSV,
  ledgerToMD,
  ledgerToText,
  ledgerSummary,
  type LedgerInput,
} from '../src/ledger';

const checks: [string, boolean, string][] = [];
const c = (name: string, cond: boolean, detail = '') => checks.push([name, cond, detail]);

// A. glob 翻译（v0.12.0）
const rx = (g: string) => globToRegExp(g);
c('A.*.md 根文件', rx('*.md').test('a.md') && !rx('*.md').test('sub/b.md'));
c('A.**\/*.md 任意层含根', rx('**/*.md').test('a.md') && rx('**/*.md').test('x/y/b.md'));
c('A.docs/** 限目录', rx('docs/**/*.md').test('docs/a.md') && rx('docs/**/*.md').test('docs/x/y/b.md') && !rx('docs/**/*.md').test('other/a.md'));
c('A.? 单字符', rx('a?.md').test('a1.md') && !rx('a?.md').test('a12.md') && !rx('a?.md').test('a/b.md'));
c('A.锚定不半截', rx('x.md').test('x.md') && !rx('x.md').test('xx.md') && !rx('x.md').test('x.mdx'));
c('A.正则元字符字面', rx('a+b.md').test('a+b.md') && !rx('a+b.md').test('aaab.md') && rx('a.b.md').test('a.b.md'));
c('A.反斜杠归一', rx('docs\\a.md').test('docs/a.md'));
c('A.段尾 ** 任意', rx('ab**').test('ab') && rx('ab**').test('abc/def'));
c('A.hasMagic', hasMagic('*.md') && hasMagic('a?') && !hasMagic('plain.md'));
c('A.isSkippableDir', isSkippableDir('.obsidian') && isSkippableDir('.git') && isSkippableDir('node_modules') && !isSkippableDir('docs'));
c('A.splitGlobRoot', splitGlobRoot('docs/**/*.md').root === 'docs' && splitGlobRoot('docs/**/*.md').pattern === '**/*.md');
c('A.splitGlobRoot 绝对', splitGlobRoot('/tmp/x/a*.md').root === '/tmp/x' && splitGlobRoot('/tmp/x/a*.md').pattern === 'a*.md');
c('A.splitGlobRoot 首段魔法', splitGlobRoot('*.md').root === '/' && splitGlobRoot('*.md').pattern === '*.md');

// B. 输入展开（真 fs：临时目录树）
{
  const tmp = mkdtempSync(join(tmpdir(), 'rh-v0120-'));
  mkdirSync(join(tmp, 'sub', '.hidden'), { recursive: true });
  mkdirSync(join(tmp, '.git'), { recursive: true });
  for (const f of ['a.md', 'sub/b.md', 'sub/.hidden/c.md', '.git/d.md', 'e.txt']) {
    const p = join(tmp, f);
    mkdirSync(p.slice(0, p.lastIndexOf('/')), { recursive: true });
    writeFileSync(p, 'x');
  }
  try {
    c('B.目录递归收 md 跳隐藏', expandInputs([tmp], process.cwd()).sort().join('|') === [join(tmp, 'a.md'), join(tmp, 'sub/b.md')].sort().join('|'));
    c('B.glob 单层', expandInputs([join(tmp, '*.md')], process.cwd()).length === 1 && expandInputs([join(tmp, '*.md')], process.cwd())[0].endsWith('a.md'));
    c('B.glob ** 任意层', expandInputs([join(tmp, '**/*.md')], process.cwd()).length === 2);
    c('B.文件直接入', expandInputs([join(tmp, 'sub/b.md')], process.cwd())[0] === join(tmp, 'sub/b.md'));
    c('B.不存在返回空', expandInputs([join(tmp, 'nope.md')], process.cwd()).length === 0);
    c('B.相对 cwd glob', expandInputs(['*.md'], tmp).length === 1);
    c('B.多输入去重', expandInputs([join(tmp, '**/*.md'), join(tmp, 'a.md')], process.cwd()).length === 2);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

// C. 文号台账判定（v0.12.0）
{
  const rows: LedgerInput[] = [
    { file: '/x/002.md', title: '防汛通知', agency: '云溪镇人民政府', docNumber: '云政发〔2026〕21号' },
    { file: '/x/003.md', title: '巡河通知', agency: '云溪镇人民政府', docNumber: '云政发〔2026〕21号' },
    { file: '/x/004.md', title: '调整领导小组', agency: '云溪镇人民政府', docNumber: '', signature: '云溪镇人民政府' },
    { file: '/x/001.md', title: '秸秆禁烧', agency: '云溪镇人民政府', docNumber: '云政发〔2026〕20号', recipients: '各村' },
    { file: '/x/riji.md', title: '巡查记录', docNumber: '' },
  ];
  const { rows: out, stats } = buildLedger(rows);
  const st = (f: string) => out.find((r) => r.file === f)?.status;
  c('C.正常号 ok', st('/x/001.md') === 'ok');
  c('C.同号双方 dup', st('/x/002.md') === 'dup' && st('/x/003.md') === 'dup');
  c('C.dupWith 指向同号他篇', out.find((r) => r.file === '/x/002.md')?.dupWith.join('') === '/x/003.md');
  c('C.有机关无号=漏号', st('/x/004.md') === 'unnumbered');
  c('C.非公文无号不误报', st('/x/riji.md') === 'ok');
  c('C.统计', stats.total === 5 && stats.numbered === 3 && stats.unnumbered === 1 && stats.dupGroups === 1 && stats.formatIssues === 0);
  c('C.排序有号前无号后', out.map((r) => r.file.replace('/x/', '')).join(',') === '001.md,002.md,003.md,004.md,riji.md');
  c('C.重号相邻', out.findIndex((r) => r.file === '/x/002.md') + 1 === out.findIndex((r) => r.file === '/x/003.md'));
  c('C.摘要文案', ledgerSummary(stats).includes('共 5 篇') && ledgerSummary(stats).includes('重号 1 组'));
}

// C2. 文号格式
c('C2.合规空串', docNumberFormatIssue('云政发〔2026〕20号') === '');
c('C2.半角括号', docNumberFormatIssue('云政发(2026)20号').includes('六角括号'));
c('C2.无〔年〕', docNumberFormatIssue('云政发2026-20号').includes('机关代字'));
c('C2.空号不报', docNumberFormatIssue('') === '');

// D. 登记表格式
{
  const rows: LedgerInput[] = [
    { file: '/x/1.md', title: '含"引号"、逗号,标题', agency: '云镇人民政府', docNumber: '云政发〔2026〕1号' },
    { file: '/x/2.md', title: '竖线|标题', agency: '云镇人民政府', docNumber: '云政发〔2026〕2号' },
  ];
  const { rows: out, stats } = buildLedger(rows);
  const csv = ledgerToCSV(out);
  c('D.csv 表头', csv.startsWith('序号,发文字号,标题,发文机关,文件名,状态,说明'));
  c('D.csv 逗号引号转义', csv.includes('"含""引号""、逗号,标题"'));
  c('D.csv 行数与 CRLF 收尾', csv.split('\r\n').length === 4 && csv.endsWith('\r\n'));
  const md = ledgerToMD(out);
  c('D.md 表头分隔', md.includes('| 序号 | 发文字号 | 标题 | 发文机关 | 文件名 | 状态 | 说明 |') && md.includes('| --- |'));
  c('D.md 竖线转义', md.includes('竖线\\|标题'));
  const txt = ledgerToText(out);
  c('D.txt 含状态与号', txt.includes('云政发〔2026〕1号') && txt.includes('正常'));
  c('D.stats 复用', stats.numbered === 2);
}

// ---- 汇总 ----
const failed = checks.filter(([, ok]) => !ok);
console.log(`SUMMARY ${checks.length - failed.length}/${checks.length} passed`);
for (const [name, ok, detail] of checks) {
  if (!ok) console.log(`FAIL ${name} ${detail ? '→ ' + detail : ''}`);
}
if (failed.length) process.exit(1);
