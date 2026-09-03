/** frontmatter 表单字段写入（纯函数，可测）。拆分自原 main.ts。 */
export const FM_FORM_FIELDS: { label: string; key: string; group: string; placeholder?: string; wide?: boolean }[] = [
  { label: '机关标志文字（红头大字）', key: 'rh-agency', group: '版头', placeholder: 'XX镇人民政府文件；联合行文用 / 分隔多机关' },
  { label: '机关标志图片（vault 路径，png/jpg）', key: 'rh-logo', group: '版头', placeholder: '_assets/logo.png' },
  { label: '发文字号', key: 'rh-docNumber', group: '版头', placeholder: 'X政发〔2026〕12号' },
  { label: '签发人（上行文才填）', key: 'rh-signer', group: '版头', placeholder: '张三' },
  { label: '份号（6 位数字）', key: 'rh-copyNumber', group: '版头', placeholder: '000001' },
  { label: '密级和保密期限', key: 'rh-secretLevel', group: '版头', placeholder: '机密★1年' },
  { label: '紧急程度', key: 'rh-urgency', group: '版头', placeholder: '特急' },
  { label: '主送机关（多个用顿号分隔）', key: 'rh-recipients', group: '主体', placeholder: '各部门、各科室', wide: true },
  { label: '署名（发文机关名）', key: 'rh-signature', group: '主体', placeholder: 'XX镇人民政府' },
  { label: '成文日期', key: 'rh-date', group: '主体', placeholder: '2026年9月2日' },
  { label: '印章图（vault 路径，浮盖在成文日期上）', key: 'rh-seal', group: '主体', placeholder: '_assets/seal.png' },
  { label: '附件说明（多个用 / 分隔）', key: 'rh-attachments', group: '主体', placeholder: '会议议程/参会名单', wide: true },
  { label: '附注（联系人等，自动加圆括号）', key: 'rh-notes', group: '主体', placeholder: '联系人：张三', wide: true },
  { label: '抄送机关', key: 'rh-cc', group: '版记', placeholder: '县农业农村局、县财政局' },
  { label: '印发机关', key: 'rh-printOrg', group: '版记', placeholder: 'XX镇党政办公室' },
  { label: '印发时间', key: 'rh-printDate', group: '版记', placeholder: '2026年9月2日' },
  { label: '印发份数', key: 'rh-printCopies', group: '版记', placeholder: '20' },
];

/** 发文字号格式校验（自 checker 同源；导出时提醒，不阻断） */

/** 值含 YAML 特殊字符时加双引号 */

export function fmQuote(v: string): string {
  return /[:#[\]{}&*!|>'"%@`]/.test(v) || /^\s|\s$/.test(v) ? `"${v.replace(/"/g, '\\"')}"` : v;
}

/** 把 rh-* 键值对合并进 md 的 frontmatter（已有键替换，其余键保留；无 frontmatter 则新建） */
export function applyFrontmatter(src: string, entries: [string, string][]): string {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) {
    const fm = ['---', ...entries.map(([k, v]) => `${k}: ${fmQuote(v)}`), '---', ''].join('\n');
    return fm + src;
  }
  let fmText = m[1];
  for (const [k, v] of entries) {
    const re = new RegExp(`^(${k}\\s*:\\s*)(.*)$`, 'm');
    if (re.test(fmText)) fmText = fmText.replace(re, (_s, pre: string) => `${pre}${fmQuote(v)}`);
    else fmText += `\n${k}: ${fmQuote(v)}`;
  }
  const rest = src.slice(m[0].length);
  return `---\n${fmText}\n---\n${rest.startsWith('\n') || rest === '' ? rest : '\n' + rest}`;
}

/* ------------------------------------------------------------------ */
/* 新建公文向导（v0.11.0）：文种筛选 → 标题 → 当前文件夹落盘并打开          */
/* ------------------------------------------------------------------ */

/** 第一步：FuzzySuggest 选文种（16 法定文种，按 label/desc/行文方向搜索） */

