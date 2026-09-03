/**
 * ledger.ts —— 文号台账（v0.12.0）：多笔记扫描后的登记/判定/格式化为纯函数。
 * 职责：状态判定（ok / unnumbered 漏号 / dup 重号 + 文号格式问题）→ 排序 →
 * 输出 CSV / Markdown / 文本三种登记表。输入层（读文件、parseDocument）在 CLI。
 */

/** 台账一行输入（已由 parseDocument 抽取） */
export interface LedgerInput {
  /** 文件绝对路径 */
  file: string;
  /** 正文标题（首 docTitle 块文本首行，无则空） */
  title?: string;
  /** 发文机关 rh-agency */
  agency?: string;
  /** 发文字号 rh-docNumber */
  docNumber?: string;
  /** 署名 rh-signature */
  signature?: string;
  /** 主送机关 rh-recipients */
  recipients?: string;
}

export type LedgerStatus = 'ok' | 'unnumbered' | 'dup';

export interface LedgerRow extends LedgerInput {
  /** 相对展示名（basename） */
  name: string;
  status: LedgerStatus;
  /** 同号的其他文件名（dup 时非空） */
  dupWith: string[];
  /** 文号格式问题：''=无/合规，否则为说明文案 */
  formatIssue: string;
}

export interface LedgerStats {
  total: number;
  /** 已编号（docNumber 非空） */
  numbered: number;
  /** 漏号（像公文但没文号） */
  unnumbered: number;
  /** 重号组数 */
  dupGroups: number;
  /** 文号格式问题条数 */
  formatIssues: number;
}

export interface LedgerReport {
  rows: LedgerRow[];
  stats: LedgerStats;
}

/** 是否「像正式公文」：设了发文机关/署名/主送或已编号，即应分配文号的对象 */
export function isDocLike(r: LedgerInput): boolean {
  return !!(r.agency || r.docNumber || r.signature || r.recipients);
}

/**
 * 文号格式体检（沿用 CLI 既有提醒口径）：
 * - 空号 → ''（是否漏号由状态判定，不重复报）
 * - 含半角方/圆括号 → 「年份括号应使用全角六角括号〔〕」
 * - 无 〔YYYY〕 → 「应采用「机关代字〔年份〕序号号」格式」
 */
export function docNumberFormatIssue(num: string): string {
  if (!num) return '';
  if (/[()[\]]/.test(num)) return '年份括号应使用全角六角括号〔〕';
  if (!/〔\d{4}〕/.test(num)) return '应采用「机关代字〔年份〕序号号」格式';
  return '';
}

/** 归一化文号（去首尾空白与全角空格），供重号比较 */
function normNum(s?: string): string {
  return (s ?? '').replace(/[\s\u3000]/g, '');
}

/**
 * 汇总台账：状态判定 + 重号分组 + 排序。
 * 排序：有号按文号字典序在前（重号相邻），无号（漏号/非公文）按文件名排后。
 */
export function buildLedger(inputs: LedgerInput[]): LedgerReport {
  // 预判状态（dup 需全局计数）
  const counts = new Map<string, string[]>();
  for (const r of inputs) {
    const n = normNum(r.docNumber);
    if (!n) continue;
    const list = counts.get(n) ?? [];
    list.push(r.file);
    counts.set(n, list);
  }
  const dupNums = new Set([...counts.entries()].filter(([, v]) => v.length > 1).map(([k]) => k));

  const rows: LedgerRow[] = inputs.map((r) => {
    const n = normNum(r.docNumber);
    const dup = n && dupNums.has(n) ? (counts.get(n) ?? []) : [];
    const status: LedgerStatus = n ? (dup.length > 1 ? 'dup' : 'ok') : isDocLike(r) ? 'unnumbered' : 'ok';
    return {
      ...r,
      name: r.file.split(/[\\/]/).pop() ?? r.file,
      status,
      dupWith: status === 'dup' ? dup.filter((f) => f !== r.file) : [],
      formatIssue: docNumberFormatIssue(n),
    };
  });

  // 排序：ok/dup（有号）在前按文号；unnumbered（无号公文）与无号非公文按文件名
  rows.sort((a, b) => {
    const na = normNum(a.docNumber);
    const nb = normNum(b.docNumber);
    if (na && nb) return na.localeCompare(nb, 'zh') || a.file.localeCompare(b.file);
    if (na) return -1;
    if (nb) return 1;
    return a.file.localeCompare(b.file);
  });

  const stats: LedgerStats = {
    total: rows.length,
    numbered: rows.filter((r) => normNum(r.docNumber)).length,
    unnumbered: rows.filter((r) => r.status === 'unnumbered').length,
    dupGroups: [...dupNums].length,
    formatIssues: rows.filter((r) => r.formatIssue).length,
  };
  return { rows, stats };
}

/* ---- 三种登记表格式 ---- */

const STATUS_TEXT: Record<LedgerStatus, string> = {
  ok: '正常',
  unnumbered: '漏号',
  dup: '重号',
};

function rowNotes(r: LedgerRow): string {
  const parts: string[] = [];
  if (r.status === 'dup') parts.push(`与 ${r.dupWith.map((f) => f.split(/[\\/]/).pop() ?? f).join('、')} 同号`);
  if (r.status === 'unnumbered') parts.push('疑似公文未编号');
  if (r.formatIssue) parts.push(r.formatIssue);
  return parts.join('；');
}

function csvCell(s: string): string {
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** CSV 登记表（含表头） */
export function ledgerToCSV(rows: LedgerRow[]): string {
  const head = ['序号', '发文字号', '标题', '发文机关', '文件名', '状态', '说明'];
  const lines = [head.join(',')];
  rows.forEach((r, i) => {
    lines.push(
      [
        String(i + 1),
        csvCell(r.docNumber ?? ''),
        csvCell(r.title ?? ''),
        csvCell(r.agency ?? ''),
        csvCell(r.name),
        csvCell(STATUS_TEXT[r.status]),
        csvCell(rowNotes(r)),
      ].join(','),
    );
  });
  return lines.join('\r\n') + '\r\n';
}

/** Markdown 登记表 */
export function ledgerToMD(rows: LedgerRow[]): string {
  const head = ['序号', '发文字号', '标题', '发文机关', '文件名', '状态', '说明'];
  const esc = (s: string) => s.replace(/\|/g, '\\|');
  const lines = [
    '| 序号 | 发文字号 | 标题 | 发文机关 | 文件名 | 状态 | 说明 |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  ];
  rows.forEach((r, i) => {
    lines.push(
      `| ${i + 1} | ${esc(r.docNumber ?? '')} | ${esc(r.title ?? '')} | ${esc(r.agency ?? '')} | ${esc(r.name)} | ${STATUS_TEXT[r.status]} | ${esc(rowNotes(r))} |`,
    );
  });
  return lines.join('\n') + '\n';
}

/** 控制台等宽文本表 */
export function ledgerToText(rows: LedgerRow[]): string {
  const head = ['序号', '发文字号', '标题', '发文机关', '文件名', '状态', '说明'];
  const cols = rows.map((r) => [
    '',
    r.docNumber ?? '',
    r.title ?? '',
    r.agency ?? '',
    r.name,
    STATUS_TEXT[r.status],
    rowNotes(r),
  ]);
  const all = [head, ...cols];
  const widths = head.map((_, ci) => Math.max(...all.map((row) => [...row[ci]].length)));
  const pad = (s: string, w: number) => s + ' '.repeat(Math.max(0, w - [...s].length));
  const line = (row: string[]) => '| ' + row.map((s, i) => pad(s, widths[i])).join(' | ') + ' |';
  const sep = '| ' + widths.map((w) => '-'.repeat(w)).join(' | ') + ' |';
  return [line(head), sep, ...cols.map(line)].join('\n') + '\n';
}

/** 台账汇总说明（stats → 一行概要） */
export function ledgerSummary(stats: LedgerStats): string {
  const parts = [`共 ${stats.total} 篇`, `已编号 ${stats.numbered}`, `漏号 ${stats.unnumbered}`];
  if (stats.dupGroups) parts.push(`重号 ${stats.dupGroups} 组`);
  if (stats.formatIssues) parts.push(`格式问题 ${stats.formatIssues} 条`);
  return parts.join('，');
}
