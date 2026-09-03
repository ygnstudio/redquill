/**
 * preview.ts —— 预览渲染
 * 与 docx 共用 format.ts 预设（Preset）：同一份规范，一份渲染 CSS，一份翻译 docx。
 * 纯函数，无 Obsidian 依赖（CLI 也能用它出 HTML 校对）。
 */

import {
  LATIN_FONT,
  PAGE_NUMBER_FONT,
  RED_COLOR,
  RED_HEAD_STYLE,
  SEAL_STYLE,
  STRUCT_DEFAULTS,
  STRUCT_STYLE,
  fitAgencySizePt,
  type PageNumberConfig,
  type Preset,
  type RoleStyle,
  type StructLayout,
  roleFontChain,
  textWidthChars,
} from './format.js';
import { splitAgencies, splitAttachTitle, type GongwenBlock, type RedHeadMeta, type TableData } from './mdast.js';

const MM2PT = 2.834645;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** CSS 字族：Times New Roman（西文数字）置顶 + 中文链 */
function cssFont(st: RoleStyle, fallbackKey: keyof Preset['roles']): string {
  const chain = roleFontChain(st, fallbackKey).map((f) => `"${f}"`);
  return `"${LATIN_FONT}", ${chain.join(', ')}`;
}

/** 角色通用 CSS */
function roleCss(cls: string, st: RoleStyle, key: keyof Preset['roles'], linePt: number, extra = ''): string {
  return `.${cls} { font-family: ${cssFont(st, key)}; font-size: ${st.sizePt}pt; font-weight: ${st.bold ? 700 : 400}; text-align: ${st.align === 'center' ? 'center' : 'left'}; line-height: ${linePt}pt;${st.indentChars ? ` text-indent: ${st.indentChars}em;` : ''}${extra} }`;
}

/** 首句标粗：与 docx_export.bodyRuns 同一规则，两端一致 */
function bodyHtml(text: string, boldFirst: boolean): string {
  const m = text.match(/^([^。]+。)?([\s\S]*)$/);
  const first = m?.[1] ?? '';
  const rest = m?.[2] ?? '';
  if (boldFirst && first) return `<b>${esc(first)}</b>${esc(rest)}`;
  return esc(text);
}

/** 页码样例（预览取第 1 页的样子；gongwen 固定右对齐） */
function pageNumberHtml(cfg: PageNumberConfig): string {
  if (!cfg || cfg.style === 'none') return '';
  const sample =
    cfg.style === 'gongwen'
      ? '— 1 —'
      : cfg.style === 'dash'
        ? '- 1 -'
        : cfg.style === 'plain'
          ? '1'
          : cfg.style === 'cnPage'
            ? '第 1 页'
            : '第 1 页 / 共 3 页';
  const align = cfg.style === 'gongwen' ? 'right' : cfg.align;
  const family = `"${LATIN_FONT}", ${PAGE_NUMBER_FONT.map((f) => `"${f}"`).join(', ')}`;
  return `<div class="rg-pagenum" style="text-align:${align}; font-size:${cfg.sizePt}pt; font-family:${family};">${esc(sample)}</div>`;
}

/** 红头（版头）HTML：frontmatter 有任一要素才渲染，样式取 RED_HEAD_STYLE 国标固定项；logoUrl 为机关标志图（rh-logo） */
function redHeadHtml(meta: RedHeadMeta, logoUrl?: string): string {
  const hasAny = Object.values(meta).some((v) => !!v) || !!logoUrl;
  if (!hasAny) return '';
  const chain = (fonts: readonly string[]) => fonts.map((f) => `"${f}"`).join(', ');
  const out: string[] = ['<div class="rg-redhead">'];
  const notice = (t: string) =>
    `<div style="font-family:&quot;${LATIN_FONT}&quot;, ${chain(RED_HEAD_STYLE.notice.font)}; font-size:${RED_HEAD_STYLE.notice.sizePt}pt; line-height:28pt;">${esc(t)}</div>`;
  // 机关标志图片：版心上边缘居中，宽 40mm（与 docx logoPara 同规格），高按比例
  if (logoUrl)
    out.push(
      `<div style="text-align:center; margin-bottom:6pt;"><img src="${esc(logoUrl)}" style="width:40mm; height:auto;" alt="机关标志"></div>`,
    );
  // 版心左上角：份号 → 密级和保密期限 → 紧急程度（三号黑体顶格）
  if (meta.copyNumber) out.push(notice(meta.copyNumber));
  if (meta.secretLevel) out.push(notice(meta.secretLevel));
  if (meta.urgency) out.push(notice(meta.urgency));
  // 发文机关标志：红色小标宋居中；联合行文（/ 或 ／ 分隔）多行上下并列，字号按最长机关名自适应
  if (meta.agency) {
    const agencies = splitAgencies(meta.agency);
    const sizePt = fitAgencySizePt(agencies);
    agencies.forEach((ag, i) => {
      out.push(
        `<div style="font-family:&quot;${LATIN_FONT}&quot;, ${chain(RED_HEAD_STYLE.agency.font)}; font-size:${sizePt}pt; line-height:44pt; color:#${RED_COLOR}; text-align:center;${i === 0 ? ' margin-top:6pt;' : ''}">${esc(ag)}</div>`,
      );
    });
  }
  // 发文字号：机关标志下空二行；上行文（有签发人）时左空一字排字号、右空一字排签发人
  if (meta.docNumber || meta.signer) {
    const numFont = `font-family:&quot;${LATIN_FONT}&quot;, ${chain(RED_HEAD_STYLE.number.font)}; font-size:${RED_HEAD_STYLE.number.sizePt}pt; line-height:28pt;`;
    if (meta.signer) {
      out.push(
        `<div style="${numFont} display:flex; justify-content:space-between; margin-top:28pt;"><span style="margin-left:1em;">${esc(meta.docNumber ?? '')}</span><span style="margin-right:1em;">签发人：${esc(meta.signer)}</span></div>`,
      );
    } else {
      out.push(`<div style="${numFont} text-align:center; margin-top:28pt;">${esc(meta.docNumber ?? '')}</div>`);
    }
  }
  // 红色分隔线：发文字号下 4mm，与版心等宽
  out.push(
    `<div style="border-bottom:${(RED_HEAD_STYLE.lineWidthMm * 3).toFixed(1)}pt solid #${RED_COLOR}; margin-top:4mm; margin-bottom:16pt;"></div>`,
  );
  out.push('</div>');
  return out.join('\n');
}

/* ---------------- 结构层尾部要素（§2.6 规格，frontmatter 驱动） ---------------- */

/** 主送机关：标题下空 1 行、顶格、末尾补全角冒号 */
function recipientsHtml(text: string): string {
  const t = /[：:]$/.test(text.trim()) ? text.trim() : `${text.trim()}：`;
  return `<div class="rg-recipients">${esc(t)}</div>`;
}

/** 附件说明：正文下空 1 行、左空 N 字（默认 2，GB/T）「附件：名称」（多附件按 / 拆行，序号已写自带） */
function attachmentsHtml(text: string, attachIndentChars: number = STRUCT_DEFAULTS.attachIndentChars): string {
  const lines = text.split('/').map((s) => s.trim()).filter(Boolean);
  return lines
    .map((l, i) => {
      const label = lines.length > 1 && !/^[\d１-９]/.test(l) ? `附件${i + 1}：${l}` : `附件：${l}`;
      return `<div class="rg-attach" style="margin-left:${attachIndentChars}em;">${esc(label)}</div>`;
    })
    .join('\n');
}

/** 印章（rh-seal）浮章 HTML（v0.10.0）：absolute 压盖成文日期上方——右缘对齐日期行右缘、底缘压住日期下部 */
function sealHtml(sealUrl: string, dateText: string, preset: Preset, struct: StructLayout): string {
  const bodyEm = preset.roles.body.sizePt; // 正文字号 pt（em 基准）
  const sealWEm = (SEAL_STYLE.sizeMm / 25.4) * 72 / bodyEm; // 42mm → em
  const dateWEm = textWidthChars(dateText); // 1 字 = 1em
  const right = Math.max(0, (sealWEm - dateWEm) / 2);
  const bottom = (preset.linePt * 0.3).toFixed(2); // 章底压至日期行 ~30% 高（近似 docx 的 35%）
  return `<img class="rg-seal" src="${esc(sealUrl)}" alt="印章" style="position:absolute; width:${sealWEm.toFixed(2)}em; height:auto; right:${right.toFixed(2)}em; bottom:${bottom}pt; z-index:10;">`;
}

/**
 * 署名 + 成文日期 + 附注（v0.5.6 起对齐三档 + 缩进可调，与 docx closingParas 同源）：
 *  right（GB/T）—— 外层右收 N 字，内层列以宽行（日期轴）居中窄行；
 *  center —— 外层居中，无收边；left —— 外层左收 M 字，内层行左对齐（不居中）。
 * 附注：左空 notesIndentChars 字，自动补圆括号。
 */
function closingHtml(meta: RedHeadMeta, preset: Preset, struct: StructLayout = STRUCT_DEFAULTS, sealUrl?: string): string {
  const hasSignBlock = !!(meta.signature || meta.date);
  if (!hasSignBlock && !meta.notes) return '';
  const gap = `${preset.linePt}pt`;
  const out: string[] = ['<div class="rg-closing" style="position:relative;">'];
  if (hasSignBlock) {
    const align = struct.signatureAlign;
    const justify = align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end';
    const side =
      align === 'left'
        ? ` margin-left:${struct.signatureLeftChars}em;`
        : align === 'right'
          ? ` margin-right:${struct.signatureRightChars}em;`
          : '';
    const innerAlign = align === 'left' ? 'flex-start' : 'center';
    out.push(`<div style="display:flex; justify-content:${justify}; margin-top:${gap};${side}">`);
    out.push(`<div style="display:inline-flex; flex-direction:column; align-items:${innerAlign};">`);
    if (meta.signature) out.push(`<div>${esc(meta.signature)}</div>`);
    if (meta.date) out.push(`<div>${esc(meta.date)}</div>`);
    out.push('</div></div>');
  }
  if (meta.notes) {
    const n = meta.notes.trim();
    const wrapped = /^[（(]/.test(n) ? n : `（${n}）`;
    out.push(
      `<div style="margin-left:${struct.notesIndentChars}em; margin-top:${gap};">${esc(wrapped)}</div>`,
    );
  }
  if (sealUrl && meta.date) out.push(sealHtml(sealUrl, meta.date, preset, struct));
  out.push('</div>');
  return out.join('\n');
}

/** 版记（GB/T 9704）：分隔线与版心等宽——首末粗线、中间细线，首线在首要素之上、末线在末要素之下；文字缩进不缩线 */
function colophonHtml(meta: RedHeadMeta, preset: Preset, struct: StructLayout = STRUCT_DEFAULTS): string {
  if (!meta.cc && !meta.printOrg && !meta.printDate && !meta.printCopies) return '';
  const sizePt = STRUCT_STYLE.colophonSizePt;
  const base = `padding:2pt 0; font-size:${sizePt}pt;`;
  const flexGap = `${preset.linePt}pt`;
  const rows: string[] = [];
  let idx = 0;
  const total = (meta.cc ? 1 : 0) + (meta.printOrg || meta.printDate ? 1 : 0) + (meta.printCopies ? 1 : 0);
  const topBorder = () => {
    const b = idx === 0 ? 'border-top:1.5pt solid #000;' : 'border-top:0.75pt solid #000;';
    const last = idx === total - 1 ? 'border-bottom:1.5pt solid #000;' : '';
    idx++;
    return b + last;
  };
  if (meta.cc) {
    const t = /[。！？]$/.test(meta.cc.trim()) ? meta.cc.trim() : `${meta.cc.trim()}。`;
    rows.push(`<div style="${topBorder()}${base} padding-left:${struct.colophonLeftChars}em;">抄送：${esc(t)}</div>`);
  }
  if (meta.printOrg || meta.printDate) {
    const pd = /印发$/.test(meta.printDate?.trim() ?? '') ? meta.printDate!.trim() : `${meta.printDate?.trim() ?? ''}印发`;
    rows.push(
      `<div style="${topBorder()}${base} display:flex; justify-content:space-between;"><span style="margin-left:${struct.colophonLeftChars}em;">${esc(meta.printOrg ?? '')}</span><span style="margin-right:${struct.printRightChars}em;">${esc(pd)}</span></div>`,
    );
  }
  if (meta.printCopies) {
    const c = meta.printCopies.trim();
    const label = /印/.test(c) ? c : `印${c}份`;
    rows.push(`<div style="${topBorder()}${base} text-align:right; padding-right:${struct.copiesRightChars}em;">${esc(label)}</div>`);
  }
  return [`<div class="rg-colophon" style="margin-top:${flexGap};">`, ...rows, '</div>'].join('\n');
}

/* ---------------- md 表格（v0.6.0） ---------------- */

/** 表格 HTML：单实线等框、列宽均分（table-layout:fixed）、表头加粗居中；单元格对齐=列标记或居中 */
function tableHtml(t: TableData, preset: Preset): string {
  const st = preset.roles.table;
  const family = cssFont(st, 'table').replace(/"/g, '&quot;');
  const base = `font-family:${family}; font-size:${st.sizePt}pt; font-weight:${st.bold ? 700 : 400}; padding:3pt 4pt; border:0.5pt solid #000; word-break:break-all;`;
  const al = (a: 'left' | 'center' | 'right' | null | undefined): string =>
    a === 'left' ? 'left' : a === 'right' ? 'right' : 'center';
  const trs: string[] = [];
  const ths = t.header.map((h, i) => `<th style="${base}font-weight:700; text-align:center;">${esc(h)}</th>`).join('');
  trs.push(`<tr>${ths}</tr>`);
  for (const r of t.rows)
    trs.push(
      `<tr>${r
        .map((c, i) => {
          // 行内格式（加粗等）在表格单元格内剥掉：与 docx 一致只留纯文本
          const txt = c.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/[*_`]/g, '');
          return `<td style="${base} text-align:${al(t.align?.[i])};">${esc(txt)}</td>`;
        })
        .join('')}</tr>`,
    );
  return `<table class="rg-table" style="border-collapse:collapse; width:100%; table-layout:fixed; margin:${preset.linePt}pt 0;">${trs.join('')}</table>`;
}

/** 单块 HTML（正文与附件区共用；docTitle 的 recipients 由调用方按 meta 处理） */
function blockHtml(b: GongwenBlock, preset: Preset, boldFirst: boolean): string {
  switch (b.kind) {
    case 'docTitle':
      return `<div class="rg-title">${b.text
        .split('\n')
        .map((l) => `<div>${esc(l)}</div>`)
        .join('')}</div>`;
    case 'h1':
      return `<div class="rg-h1">${esc(b.text)}</div>`;
    case 'h2':
      return `<div class="rg-h2">${esc(b.text)}</div>`;
    case 'h3':
      return `<div class="rg-h3">${esc(b.text)}</div>`;
    case 'table':
      return b.table && b.table.rows.length ? tableHtml(b.table, preset) : '';
    default:
      return `<div class="rg-para">${bodyHtml(b.text, boldFirst)}</div>`;
  }
}

/** 附件区 HTML（v0.10.0）：虚线分页提示 → 「附件N」标记（黑体顶格）→ 居中标题（若有）→ 其余块正文规则 */
function renderAttach(attach: GongwenBlock[], preset: Preset, boldFirst: boolean): string {
  const out: string[] = ['<div class="rg-attach-break">另面 · 附件</div>', '<div class="rg-attach-section">'];
  let firstHeadingIdx = -1;
  for (let i = 0; i < attach.length; i++) {
    if (attach[i].kind === 'docTitle' || attach[i].kind === 'h1' || attach[i].kind === 'h2') {
      firstHeadingIdx = i;
      break;
    }
  }
  if (firstHeadingIdx >= 0) {
    const { mark, title } = splitAttachTitle(attach[firstHeadingIdx].text);
    out.push(`<div class="rg-attach-mark">${esc(mark)}</div>`);
    if (title) out.push(`<div class="rg-title">${esc(title)}</div>`);
  } else {
    out.push('<div class="rg-attach-mark">附件</div>');
  }
  for (let i = 0; i < attach.length; i++) {
    if (i === firstHeadingIdx) continue;
    out.push(blockHtml(attach[i], preset, boldFirst));
  }
  out.push('</div>');
  return out.join('\n');
}

export function renderPreview(
  blocks: GongwenBlock[],
  preset: Preset,
  opts?: {
    firstSentenceBold?: boolean;
    meta?: RedHeadMeta;
    logoUrl?: string;
    sealUrl?: string;
    attach?: GongwenBlock[];
    struct?: Partial<StructLayout>;
  },
): string {
  const boldFirst = !!opts?.firstSentenceBold;
  // 结构层位置参数：调用方可覆盖部分字段，未覆盖的取 GB/T 默认
  const struct: StructLayout = { ...STRUCT_DEFAULTS, ...opts?.struct };
  const meta = opts?.meta;
  const body: string[] = [];
  if (meta || opts?.logoUrl) body.push(redHeadHtml(meta ?? {}, opts?.logoUrl));
  for (const b of blocks) {
    body.push(blockHtml(b, preset, boldFirst));
    // 主送机关紧跟标题（标题下空 1 行、顶格）
    if (b.kind === 'docTitle' && meta?.recipients) body.push(recipientsHtml(meta.recipients));
  }
  // 文末结构层：附件说明 → 署名/成文日期/附注（章盖其上）→ 附件区（另面）→ 版记（与 docx 节序一致）
  if (meta) {
    if (meta.attachments) body.push(attachmentsHtml(meta.attachments, struct.attachIndentChars));
    const closing = closingHtml(meta, preset, struct, opts?.sealUrl);
    if (closing) body.push(closing);
  }
  if (opts?.attach && opts.attach.length) body.push(renderAttach(opts.attach, preset, boldFirst));
  if (meta) {
    const colophon = colophonHtml(meta, preset, struct);
    if (colophon) body.push(colophon);
  }

  const css = `
.rg-page {
  width: 210mm;
  min-height: 297mm;
  padding: ${preset.page.top}mm ${preset.page.right}mm ${preset.page.bottom}mm ${preset.page.left}mm;
  background: #fff; color: #000; box-sizing: border-box;
  font-family: ${cssFont(preset.roles.body, 'body')};
  font-size: ${preset.roles.body.sizePt}pt;
  line-height: ${preset.linePt}pt;
}
${roleCss('rg-title', preset.roles.docTitle, 'docTitle', preset.titleLinePt, ' margin: 0 0 14pt;')}
${roleCss('rg-h1', preset.roles.h1, 'h1', preset.linePt)}
${roleCss('rg-h2', preset.roles.h2, 'h2', preset.linePt)}
${roleCss('rg-h3', preset.roles.h3, 'h3', preset.linePt)}
.rg-para { text-align: justify;${preset.roles.body.indentChars ? ` text-indent: ${preset.roles.body.indentChars}em;` : ''} }
.rg-recipients { margin-top: ${preset.linePt}pt; }
.rg-attach { margin-top: ${preset.linePt}pt; }
.rg-pagenum { margin-top: 12pt; }
.rg-attach-mark { font-family: ${cssFont(preset.roles.h1, 'h1').replace(/"/g, '&quot;')}; font-size: ${preset.roles.body.sizePt}pt; font-weight: 400; margin-top: ${preset.linePt}pt; }
.rg-attach-break { margin-top: ${Math.round(preset.linePt * 3)}pt; padding: 3pt 0; border-top: 1px dashed #99a; text-align: center; color: #99a; font-size: 10.5pt; letter-spacing: 0.4em; }
.rg-attach-section .rg-title { margin-top: ${preset.linePt}pt; }
`;

  return `<style>${css}</style><div class="rg-page">${body.join('\n')}${pageNumberHtml(preset.pageNumber)}</div>`;
}
