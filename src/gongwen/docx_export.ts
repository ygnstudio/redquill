/**
 * docx_export.ts —— 解析结构 → docx
 * 所有格式参数取自 format.ts 预设（Preset），此处禁止硬编码格式。
 */

import {
  AlignmentType,
  BorderStyle,
  Bookmark,
  Document,
  Footer,
  ImageRun,
  ImportedXmlComponent,
  LineRuleType,
  PageNumber,
  Packer,
  Paragraph,
  SectionType,
  Tab,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TabStopType,
  TextRun,
  TextWrappingType,
  VerticalAlign,
  WidthType,
} from 'docx';
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
  type PageNumberStyle,
  type Preset,
  type RoleStyle,
  type StructLayout,
  roleFontChain,
  textWidthChars,
} from './format.js';
import { splitAgencies, splitAttachTitle, type GongwenBlock, type RedHeadMeta, type TableData } from './mdast.js';

const MM = 56.693; // twips per mm

/** docx 字体声明：中文走 eastAsia（链首），西文走 Times New Roman */
function font(chain: string[]) {
  return { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: chain[0] };
}

/** 首句标粗：第一句（截至第一个句号，含句号）加粗，其余正常 */
function bodyRuns(text: string, preset: Preset, boldFirst: boolean): TextRun[] {
  const st = preset.roles.body;
  const size = st.sizePt * 2;
  const chain = roleFontChain(st, 'body');
  const m = text.match(/^([^。]+。)?([\s\S]*)$/);
  const first = m?.[1] ?? '';
  const rest = m?.[2] ?? '';
  if (boldFirst && first) {
    return [
      new TextRun({ text: first, size, bold: true, font: font(chain) }),
      ...(rest ? [new TextRun({ text: rest, size, font: font(chain) })] : []),
    ];
  }
  return [new TextRun({ text, size, font: font(chain) })];
}

function bodyPara(text: string, preset: Preset, boldFirst: boolean, keepNext = false): Paragraph {
  const st = preset.roles.body;
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT },
    indent: st.indentChars ? { firstLine: st.indentChars * st.sizePt * 20 } : undefined,
    ...(keepNext ? { keepNext: true } : {}),
    children: bodyRuns(text, preset, boldFirst),
  });
}

function headingPara(text: string, st: RoleStyle, fallbackKey: 'h1' | 'h2' | 'h3', preset: Preset, keepNext = false): Paragraph {
  const indent = st.indentChars ? { firstLine: st.indentChars * st.sizePt * 20 } : undefined;
  return new Paragraph({
    alignment: st.align === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT },
    ...(keepNext ? { keepNext: true } : {}),
    indent,
    children: [
      new TextRun({
        text,
        size: st.sizePt * 2,
        bold: st.bold,
        font: font(roleFontChain(st, fallbackKey)),
      }),
    ],
  });
}

/** 块 → docx 段落；keepNext=true 时末段与下一段同页（v0.10.0 正文末段防落款孤行） */
function blockToPara(b: GongwenBlock, preset: Preset, boldFirst: boolean, keepNext = false): Paragraph[] {
  switch (b.kind) {
    case 'docTitle': {
      const st = preset.roles.docTitle;
      // 标题支持宝塔形回行：md 内硬换行 → 多个居中段落（设计文档 §2.6）
      const lines = b.text.split('\n');
      return lines.map(
        (line, i) =>
          new Paragraph({
            alignment: st.align === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT,
            spacing: { line: preset.titleLinePt * 20, lineRule: LineRuleType.EXACT, after: 240 },
            ...(keepNext && i === lines.length - 1 ? { keepNext: true } : {}),
            children: [new TextRun({ text: line, size: st.sizePt * 2, bold: st.bold, font: font(roleFontChain(st, 'docTitle')) })],
          }),
      );
    }
    case 'h1':
      return [headingPara(b.text, preset.roles.h1, 'h1', preset, keepNext)];
    case 'h2':
      return [headingPara(b.text, preset.roles.h2, 'h2', preset, keepNext)];
    case 'h3':
      return [headingPara(b.text, preset.roles.h3, 'h3', preset, keepNext)];
    default:
      return [bodyPara(b.text, preset, boldFirst, keepNext)];
  }
}

/* ---------------- md 表格 → docx <w:tbl>（v0.6.0） ---------------- */

const CELL_MARGINS = { top: 40, bottom: 40, left: 80, right: 80 };

/** 0.5pt 单实线全框（公文附表惯例：单实线等框） */
function tableBorders() {
  const b = { style: BorderStyle.SINGLE, size: 4, color: 'auto' };
  return {
    top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b,
  };
}

/** 单元格文字段落：表头恒加粗居中；数据格取 role 样式 + 列对齐（缺省居中） */
function cellPara(text: string, preset: Preset, opts: { header: boolean; align: 'left' | 'center' | 'right' }): Paragraph {
  const st = preset.roles.table;
  const bold = opts.header || st.bold;
  const align = opts.align === 'left' ? AlignmentType.LEFT : opts.align === 'right' ? AlignmentType.RIGHT : AlignmentType.CENTER;
  return new Paragraph({
    alignment: align,
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        text,
        size: st.sizePt * 2,
        bold,
        font: font(roleFontChain(st, 'table')),
      }),
    ],
  });
}

/** md 表格 → docx Table：列宽按列数均分版心宽，固定布局，表头行跨页重复 */
function tableBlock(t: TableData, preset: Preset): Table {
  const colW = Math.floor(contentWidthTwips(preset) / Math.max(1, t.header.length));
  const alignOf = (i: number, header: boolean): 'left' | 'center' | 'right' => {
    if (header) return 'center';
    return t.align?.[i] ?? 'center';
  };
  const rows: TableRow[] = [];
  const cell = (text: string, header: boolean, i: number): TableCell =>
    new TableCell({
      verticalAlign: VerticalAlign.CENTER,
      margins: CELL_MARGINS,
      width: { size: colW, type: WidthType.DXA },
      children: [cellPara(text, preset, { header, align: alignOf(i, header) })],
    });
  rows.push(
    new TableRow({
      tableHeader: true,
      children: t.header.map((h, i) => cell(h, true, i)),
    }),
  );
  for (const r of t.rows) rows.push(new TableRow({ children: r.map((c, i) => cell(c, false, i)) }));
  return new Table({
    width: { size: colW * t.header.length, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    alignment: AlignmentType.CENTER,
    borders: tableBorders(),
    rows,
  });
}

/** 估算表格占高（pt）：表头 1 行 + 数据行行数，行高取字号 ×1.6，另加 8pt 余量 */
function tableHeightPt(t: TableData, preset: Preset): number {
  const st = preset.roles.table;
  const n = 1 + t.rows.length;
  return n * st.sizePt * 1.6 + 8;
}

/** 页码 runs：按样式拼字段（PageNumber.CURRENT / TOTAL_PAGES 由 Word 渲染） */
function footerRuns(cfg: PageNumberConfig): TextRun[] {
  const size = cfg.sizePt * 2;
  const f = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: PAGE_NUMBER_FONT[0] };
  switch (cfg.style) {
    case 'gongwen':
      return [new TextRun({ children: ['— ', PageNumber.CURRENT, ' —'], size, font: f })];
    case 'dash':
      return [new TextRun({ children: ['- ', PageNumber.CURRENT, ' -'], size, font: f })];
    case 'plain':
      return [new TextRun({ children: [PageNumber.CURRENT], size, font: f })];
    case 'cnPage':
      return [new TextRun({ children: ['第 ', PageNumber.CURRENT, ' 页'], size, font: f })];
    case 'total':
      return [new TextRun({ children: ['第 ', PageNumber.CURRENT, ' 页 / 共 ', PageNumber.TOTAL_PAGES, ' 页'], size, font: f })];
    default:
      return [];
  }
}

/** 页码「空一字」（GB/T 9704 §7.5）：公文页码单页居右空一字、双页居左空一字（相对版心边缘）。
 * 空字量 = 页码字号整字宽（sizePt pt × 20 twips）。仅 gongwen 样式生效，其余样式不缩进。 */
function pageIndent(
  align: (typeof AlignmentType)[keyof typeof AlignmentType],
  cfg: PageNumberConfig,
): { left?: number; right?: number } | undefined {
  if (cfg.style !== 'gongwen') return undefined;
  const w = Math.round(cfg.sizePt * 20);
  if (align === AlignmentType.LEFT) return { left: w };
  if (align === AlignmentType.RIGHT) return { right: w };
  return undefined;
}

function pageFooter(align: (typeof AlignmentType)[keyof typeof AlignmentType], cfg: PageNumberConfig): Footer {
  const indent = pageIndent(align, cfg);
  return new Footer({
    children: [
      new Paragraph({
        alignment: align,
        ...(indent ? { indent } : {}),
        children: footerRuns(cfg),
      }),
    ],
  });
}

function alignOf(a: 'left' | 'center' | 'right') {
  return a === 'left' ? AlignmentType.LEFT : a === 'right' ? AlignmentType.RIGHT : AlignmentType.CENTER;
}

/* ---------------- v0.5.2 条件页码域（版记偶数页的 GB/T 页码两分法） ----------------
 * 原理：docx 生成时不知道分页，但 Word/WPS 渲染页脚时按页实时求值域。
 * 正文末段打书签 rhLastBody，页码包进 IF 条件域：
 *  - 节1（正文）hideOverflow：IF { PAGE } > { PAGEREF rhLastBody } 则隐藏 ——
 *    只有 Word 为偶数页版记自动补的空白奇数页满足「当前页 > 正文末页」；
 *  - 节2（版记）showIfAdjacent：IF { PAGEREF rhLastBody } = { = { PAGE } - 1 } 则显示 ——
 *    版记页紧邻正文末页（差 1）= 无空白页 → 正常编页码；差 2 = 有空白页 → 空白页与版记页均不编。
 * settings.xml 加 updateFields，打开文档自动刷新。域求值失败时退化为普通页码显示（v0.5.1 行为）。
 * docx 库未导出复杂域原语（fldChar begin/separate/end），用 ImportedXmlComponent 注入原始 OOXML run；
 * fromXmlString 会包一层 <undefined> 文档根，真实组件在其 root 数组中（docx 9.7.1 实测）。 */

const COND_BOOKMARK = 'rhLastBody';
const COND_XMLNS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';

function importedRun(inner: string): any[] {
  const wrapper = ImportedXmlComponent.fromXmlString(`<w:r ${COND_XMLNS}>${inner}</w:r>`);
  return (wrapper as unknown as { root: any[] }).root;
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** 页码 run 属性：西文 Times New Roman + 中文宋体（与 footerRuns 同款字体链） */
function pnRpr(sizePt: number): string {
  return `<w:rPr><w:rFonts w:ascii="${LATIN_FONT}" w:hAnsi="${LATIN_FONT}" w:eastAsia="${PAGE_NUMBER_FONT[0]}"/><w:sz w:val="${sizePt * 2}"/></w:rPr>`;
}

function fldRuns(type: string): any[] {
  return importedRun(`<w:fldChar w:fldCharType="${type}"/>`);
}

function instrRuns(text: string): any[] {
  return importedRun(`<w:instrText xml:space="preserve">${xmlEscape(text)}</w:instrText>`);
}

function cachedRuns(text: string, rpr: string): any[] {
  return importedRun(`${rpr}<w:t xml:space="preserve">${xmlEscape(text)}</w:t>`);
}

/** 单层域：begin + instr + separate + 缓存结果 + end（缓存值 = 普通显示，退化时即 v0.5.1 外观） */
function fieldRuns(instrText: string, cachedText: string, rpr: string): any[] {
  return [...fldRuns('begin'), ...instrRuns(instrText), ...fldRuns('separate'), ...cachedRuns(cachedText, rpr), ...fldRuns('end')];
}

/** 页码显示拆段：字面量与页码数字分开（IF 域结果只能是单值，装饰符要各自成域） */
type NumSegment = { kind: 'lit'; text: string } | { kind: 'page' } | { kind: 'total' };

function pageNumberSegments(style: PageNumberStyle): NumSegment[] {
  switch (style) {
    case 'gongwen':
      return [{ kind: 'lit', text: '— ' }, { kind: 'page' }, { kind: 'lit', text: ' —' }];
    case 'dash':
      return [{ kind: 'lit', text: '- ' }, { kind: 'page' }, { kind: 'lit', text: ' -' }];
    case 'plain':
      return [{ kind: 'page' }];
    case 'cnPage':
      return [{ kind: 'lit', text: '第 ' }, { kind: 'page' }, { kind: 'lit', text: ' 页' }];
    case 'total':
      return [{ kind: 'lit', text: '第 ' }, { kind: 'page' }, { kind: 'lit', text: ' 页 / 共 ' }, { kind: 'total' }, { kind: 'lit', text: ' 页' }];
    default:
      return [];
  }
}

/** 条件一（节1）：IF { PAGE } > { PAGEREF rhLastBody } —— 当前页越过正文末页 */
function condOverflowRuns(rpr: string): any[] {
  return [
    ...fieldRuns(' PAGE ', '1', rpr),
    ...instrRuns(' > '),
    ...fieldRuns(` PAGEREF ${COND_BOOKMARK} `, '1', rpr),
  ];
}

/** 条件二（节2）：IF { PAGEREF rhLastBody } = { = { PAGE } - 1 } —— 版记页紧邻正文末页（无空白页） */
function condAdjacentRuns(rpr: string): any[] {
  const formula = [
    ...fldRuns('begin'),
    ...instrRuns(' = '),
    ...fieldRuns(' PAGE ', '1', rpr),
    ...instrRuns(' - 1 '),
    ...fldRuns('separate'),
    ...cachedRuns('1', rpr),
    ...fldRuns('end'),
  ];
  return [...fieldRuns(` PAGEREF ${COND_BOOKMARK} `, '1', rpr), ...instrRuns(' = '), ...formula];
}

/** 单段 = 一个完整 IF 复杂域（指令含嵌套域，缓存结果为普通显示值） */
function segmentField(seg: NumSegment, sizePt: number, mode: 'hideOverflow' | 'showIfAdjacent'): any[] {
  const rpr = pnRpr(sizePt);
  let showInstrText = '';
  let showCached = '';
  const showRuns: any[] = [];
  if (seg.kind === 'lit') {
    showInstrText = `"${seg.text}"`;
    showCached = seg.text;
  } else {
    showRuns.push(...fieldRuns(seg.kind === 'page' ? ' PAGE ' : ' NUMPAGES ', '1', rpr));
    showCached = '1';
  }
  const head = [...fldRuns('begin'), ...instrRuns(' IF '), ...(mode === 'hideOverflow' ? condOverflowRuns(rpr) : condAdjacentRuns(rpr))];
  const tail = [...fldRuns('separate'), ...cachedRuns(showCached, rpr), ...fldRuns('end')];
  if (mode === 'hideOverflow') {
    // 真（越过正文末页）= 隐藏("")；假 = 显示
    return [...head, ...instrRuns(' "" '), ...(showInstrText ? instrRuns(showInstrText) : []), ...showRuns, ...tail];
  }
  // 真 = 显示；假 = 隐藏("")
  return [...head, ...(showInstrText ? instrRuns(showInstrText) : []), ...showRuns, ...instrRuns(' "" '), ...tail];
}

/** 条件页码页脚（仅版记偶数页模式使用） */
function conditionalFooter(align: (typeof AlignmentType)[keyof typeof AlignmentType], cfg: PageNumberConfig, mode: 'hideOverflow' | 'showIfAdjacent'): Footer {
  const children: any[] = pageNumberSegments(cfg.style).flatMap((seg) => segmentField(seg, cfg.sizePt, mode));
  const indent = pageIndent(align, cfg);
  return new Footer({
    children: [new Paragraph({ alignment: align, ...(indent ? { indent } : {}), children })],
  });
}

/** 版心宽（twips）：210mm - 左右页边距，供签发人右制表位定位 */
function contentWidthTwips(preset: Preset): number {
  return Math.round((210 - preset.page.left - preset.page.right) * MM);
}

/* ---------------- 机关标志图片（rh-logo） ---------------- */

export interface LogoImage {
  data: ArrayBuffer;
  ext: 'png' | 'jpg';
}

/** 从 PNG/JPEG 二进制头读原始像素尺寸（png: IHDR；jpg: 扫 SOFn 段） */
function imageDims(buf: Uint8Array, ext: 'png' | 'jpg'): { w: number; h: number } {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  if (ext === 'png') return { w: dv.getUint32(16), h: dv.getUint32(20) };
  // JPEG：跳过 SOI(FFD8)，逐段扫 SOF0~SOF15（排除 DHT/DAC/RST 无尺寸段）
  let i = 2;
  while (i + 9 < buf.byteLength) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { w: dv.getUint16(i + 7), h: dv.getUint16(i + 5) };
    }
    const len = dv.getUint16(i + 2);
    i += 2 + len;
  }
  return { w: 0, h: 0 };
}

/**
 * 机关标志 docx 段：居中，宽固定 40mm（机关标志规范宽约 22~40mm，取上限），
 * 高按原始宽高比缩放。图片二进制由调用方（插件读 vault / CLI 读磁盘）提供。
 */
function logoPara(logo: LogoImage): Paragraph {
  const buf = new Uint8Array(logo.data);
  const { w, h } = imageDims(buf, logo.ext);
  const targetWPx = Math.round((40 / 25.4) * 96); // 40mm @96dpi
  const hp = w > 0 && h > 0 ? Math.round((targetWPx * h) / w) : targetWPx;
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new ImageRun({
        type: logo.ext,
        data: logo.data,
        transformation: { width: targetWPx, height: hp },
      }),
    ],
  });
}

/**
 * 红头（版头）段落：frontmatter 有任一要素才渲染。
 * 份号/密级/紧急程度三号黑体顶格；机关标志红色小标宋居中；
 * 发文字号下空二行（有签发人时左空一字+右制表位排签发人）；红色分隔线与版心等宽。
 */
function redHeadParas(meta: RedHeadMeta, preset: Preset, logo?: LogoImage): Paragraph[] {
  const hasAny = Object.values(meta).some((v) => !!v) || !!logo;
  if (!hasAny) return [];
  const ps: Paragraph[] = [];
  const line28 = { line: 28 * 20, lineRule: LineRuleType.EXACT };
  const noticeFont = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.notice.font[0] };
  const numFont = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.number.font[0] };

  // 机关标志图片：版心上边缘居中（有图时置于红字之上）
  if (logo) ps.push(logoPara(logo));

  const notice = (t: string) =>
    new Paragraph({ spacing: line28, children: [new TextRun({ text: t, size: RED_HEAD_STYLE.notice.sizePt * 2, font: noticeFont })] });
  if (meta.copyNumber) ps.push(notice(meta.copyNumber));
  if (meta.secretLevel) ps.push(notice(meta.secretLevel));
  if (meta.urgency) ps.push(notice(meta.urgency));

  if (meta.agency) {
    // 联合行文（v0.9.0）：/ 或 ／ 分隔多机关 → 红头多行上下并列；字号按最长机关名自适应
    const agencies = splitAgencies(meta.agency);
    const agencySizePt = fitAgencySizePt(agencies);
    agencies.forEach((ag, i) => {
      ps.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 44 * 20, lineRule: LineRuleType.EXACT, before: i === 0 ? 120 : 0 },
          children: [
            new TextRun({
              text: ag,
              size: agencySizePt * 2,
              color: RED_COLOR,
              font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.agency.font[0] },
            }),
          ],
        }),
      );
    });
  }

  if (meta.docNumber || meta.signer) {
    if (meta.signer) {
      // 上行文：发文字号左空一字，签发人右空一字（右制表位收进一个三号字宽）
      const oneChar = Math.round(RED_HEAD_STYLE.number.sizePt * 20);
      ps.push(
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: contentWidthTwips(preset) - oneChar }],
          indent: { firstLine: oneChar },
          spacing: { ...line28, before: 28 * 20 },
          children: [
            new TextRun({ text: meta.docNumber ?? '', size: RED_HEAD_STYLE.number.sizePt * 2, font: numFont }),
            new TextRun({ children: [new Tab(), `签发人：${meta.signer}`], size: RED_HEAD_STYLE.number.sizePt * 2, font: numFont }),
          ],
        }),
      );
    } else {
      ps.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { ...line28, before: 28 * 20 },
          children: [new TextRun({ text: meta.docNumber ?? '', size: RED_HEAD_STYLE.number.sizePt * 2, font: numFont })],
        }),
      );
    }
  }

  // 红色分隔线：发文字号下 4mm，底边框模拟 0.35mm 红线（size 单位 1/8 磅）
  ps.push(
    new Paragraph({
      spacing: { before: Math.round(4 * MM / 20), after: 240 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: RED_COLOR } },
      children: [],
    }),
  );
  return ps;
}

/**
 * 印章（rh-seal）浮章（v0.10.0）——骑年盖月：
 * 作为成文日期段内的浮于文字上的图片（wp:anchor + behindDoc=0），
 * 水平以「版心右缘 - 右空 N 字」为日期行右缘推算其中心（再右移半字压向「年」），
 * 垂直锚定日期段、章底压到日期行约 35% 高度。
 * docx 库 offset 单位 EMU（1 twip = 635 EMU）；视觉需 Word/WPS 实测微调。
 */
function sealFloatingRun(seal: LogoImage, preset: Preset, struct: StructLayout, dateText: string): ImageRun {
  const buf = new Uint8Array(seal.data);
  const { w, h } = imageDims(buf, seal.ext);
  const targetWPx = Math.round((SEAL_STYLE.sizeMm / 25.4) * 96); // 42mm @96dpi
  const hpPx = w > 0 && h > 0 ? Math.round((targetWPx * h) / w) : targetWPx;
  const charW = preset.roles.body.sizePt * 20;
  const sealWTw = SEAL_STYLE.sizeMm * MM;
  const sealHTw = (hpPx / targetWPx) * sealWTw;
  const dateWTw = textWidthChars(dateText) * charW;
  const rightGap = struct.signatureAlign === 'left' ? 0 : struct.signatureRightChars * charW;
  const centerX = contentWidthTwips(preset) - rightGap - dateWTw / 2 + charW * 0.5; // 章中轴比日期中心右移半字
  const offX = Math.round((centerX - sealWTw / 2) * 635); // twips → EMU
  const lineTw = preset.linePt * 20;
  const offY = Math.round((lineTw * 0.35 - sealHTw) * 635); // 负值=相对锚定段上移，章底压至日期行 35% 高
  return new ImageRun({
    type: seal.ext,
    data: seal.data,
    transformation: { width: targetWPx, height: hpPx },
    floating: {
      horizontalPosition: { relative: 'margin', offset: offX },
      verticalPosition: { relative: 'paragraph', offset: offY },
      allowOverlap: true,
      behindDocument: false, // 章压在文字上方
      wrap: { type: TextWrappingType.NONE },
      zIndex: 10,
    },
  });
}

/* ---------------- 结构层尾部要素（§2.6 规格，字体走 body 角色） ---------------- */

const bodyFontOf = (preset: Preset) => font(roleFontChain(preset.roles.body, 'body'));

/** 主送机关：标题下空 1 行、顶格、末尾补全角冒号 */
function recipientsPara(text: string, preset: Preset): Paragraph {
  const t = /[：:]$/.test(text.trim()) ? text.trim() : `${text.trim()}：`;
  return new Paragraph({
    spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT, before: preset.linePt * 20 },
    children: [new TextRun({ text: t, size: preset.roles.body.sizePt * 2, font: bodyFontOf(preset) })],
  });
}

/** 附件说明：正文下空 1 行、左空 N 字（默认 2，GB/T）整段左缩进，多附件按 / 拆行 */
function attachmentParas(text: string, preset: Preset, attachIndentChars: number = STRUCT_DEFAULTS.attachIndentChars, keepLast = false): Paragraph[] {
  const lines = text.split('/').map((s) => s.trim()).filter(Boolean);
  const indent = { left: attachIndentChars * preset.roles.body.sizePt * 20 };
  return lines.map((l, i) => {
    const label = lines.length > 1 && !/^[\d１-９]/.test(l) ? `附件${i + 1}：${l}` : `附件：${l}`;
    return new Paragraph({
      indent,
      spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT, before: i === 0 ? preset.linePt * 20 : 0 },
      keepNext: keepLast && i === lines.length - 1,
      children: [new TextRun({ text: label, size: preset.roles.body.sizePt * 2, font: bodyFontOf(preset) })],
    });
  });
}

/**
 * 署名 + 成文日期 + 附注（v0.5.6 起对齐三档 + 左空/右空/缩进可调）：
 *  right（GB/T）—— 行右对齐：日期右空 signatureRightChars 字；署名以日期为轴居中
 *                    （右缩进 N + (日期宽-署名宽)/2 字，估宽用 textWidthChars）
 *  center —— 署名/日期各自相对版心水平居中（中心同轴）
 *  left —— 行左对齐：左空 signatureLeftChars 字起排（0=顶格）
 * 附注：左空 notesIndentChars 字，自动补圆括号。
 */
function closingParas(meta: RedHeadMeta, preset: Preset, struct: StructLayout = STRUCT_DEFAULTS, sealImg?: LogoImage): Paragraph[] {
  const hasSignBlock = !!(meta.signature || meta.date);
  if (!hasSignBlock && !meta.notes) return [];
  const ps: Paragraph[] = [];
  const size = preset.roles.body.sizePt * 2;
  const line = { line: preset.linePt * 20, lineRule: LineRuleType.EXACT };
  if (hasSignBlock) {
    const align = struct.signatureAlign;
    const charW = preset.roles.body.sizePt * 20; // 整字缩进单位（twips）
    const alignment =
      align === 'center' ? AlignmentType.CENTER : align === 'left' ? AlignmentType.LEFT : AlignmentType.RIGHT;
    // 各行的水平缩进：center 无（整行居中）；left 两行同左空；right 按各段右空算
    const indentFor = (rightChars: number): { left?: number; right?: number } =>
      align === 'center'
        ? {}
        : align === 'left'
          ? { left: Math.round(struct.signatureLeftChars * charW) }
          : { right: Math.max(0, Math.round(rightChars)) };
    const dw = textWidthChars(meta.date ?? '');
    const sw = textWidthChars(meta.signature ?? '');
    const dateRightTw = struct.signatureRightChars * charW;
    // 仅署名无日期时按日期位（右空 N 字）对齐
    const sigRightTw = meta.date ? (struct.signatureRightChars + (dw - sw) / 2) * charW : dateRightTw;
    if (meta.signature) {
      ps.push(
        new Paragraph({
          alignment,
          indent: indentFor(sigRightTw),
          spacing: { ...line, before: preset.linePt * 20 },
          keepNext: !!meta.date, // 防成文日期孤行跑下一页（v0.10.0）
          children: [new TextRun({ text: meta.signature, size, font: bodyFontOf(preset) })],
        }),
      );
    }
    if (meta.date) {
      const runs: any[] = [new TextRun({ text: meta.date, size, font: bodyFontOf(preset) })];
      // 骑年盖月（rh-seal）：红章浮于成文日期上方（仅日期存在时）
      if (sealImg) runs.push(sealFloatingRun(sealImg, preset, struct, meta.date));
      ps.push(
        new Paragraph({
          alignment,
          indent: indentFor(dateRightTw),
          spacing: line,
          children: runs,
        }),
      );
    }
  }
  if (meta.notes) {
    const n = meta.notes.trim();
    const wrapped = /^[（(]/.test(n) ? n : `（${n}）`;
    ps.push(
      new Paragraph({
        indent: { left: Math.round(struct.notesIndentChars * preset.roles.body.sizePt * 20) },
        spacing: { ...line, before: preset.linePt * 20 },
        children: [new TextRun({ text: wrapped, size, font: bodyFontOf(preset) })],
      }),
    );
  }
  return ps;
}

/* ---------------- v0.10.0 附件正文区（`---` 分隔，另面起排） ----------------
 * md 正文结束后空行 + `---` + 空行，其后为附件正文；附件首标题写 `# 附件N：标题`。
 * 渲染：拆「附件N」标记行（黑体 3 号顶格）→ 标题居中（docTitle 角色）→ 其余块按正文规则；
 * 版记段落并入本节末尾（附件模式不启用偶页拆节与条件页码）。
 */
function attachBlocksToParas(attach: GongwenBlock[], preset: Preset): (Paragraph | Table)[] {
  const ps: (Paragraph | Table)[] = [];
  const markFont = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.notice.font[0] };
  const line = { line: preset.linePt * 20, lineRule: LineRuleType.EXACT };
  let firstHeading: GongwenBlock | undefined;
  const rest: GongwenBlock[] = [];
  for (const b of attach) {
    if (!firstHeading && (b.kind === 'docTitle' || b.kind === 'h1' || b.kind === 'h2')) firstHeading = b;
    else rest.push(b);
  }
  const markRow = (mark: string) =>
    new Paragraph({
      spacing: { ...line, before: preset.linePt * 20 },
      children: [new TextRun({ text: mark, size: RED_HEAD_STYLE.notice.sizePt * 2, font: markFont })],
    });
  if (firstHeading) {
    const { mark, title } = splitAttachTitle(firstHeading.text);
    ps.push(markRow(mark));
    if (title) {
      const st = preset.roles.docTitle;
      ps.push(
        new Paragraph({
          alignment: st.align === 'center' ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { line: preset.titleLinePt * 20, lineRule: LineRuleType.EXACT, after: 240 },
          children: [new TextRun({ text: title, size: st.sizePt * 2, bold: st.bold, font: font(roleFontChain(st, 'docTitle')) })],
        }),
      );
    }
  } else {
    ps.push(markRow('附件'));
  }
  for (const b of rest) {
    if (b.kind === 'table' && b.table && b.table.rows.length) ps.push(tableBlock(b.table, preset));
    else ps.push(...blockToPara(b, preset, false));
  }
  return ps;
}

/** 版记（GB/T 9704）：分隔线与版心等宽——首末粗线（1.5pt）、中间细线（0.75pt），首线在首要素之上、末线在末要素之下；文字缩进用全角空格/制表位，不缩线 */
function colophonParas(meta: RedHeadMeta, preset: Preset, struct: StructLayout = STRUCT_DEFAULTS): Paragraph[] {
  if (!meta.cc && !meta.printOrg && !meta.printDate && !meta.printCopies) return [];
  const ps: Paragraph[] = [];
  const sizePt = STRUCT_STYLE.colophonSizePt;
  const size = sizePt * 2;
  const f = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: roleFontChain(preset.roles.body, 'body')[0] };
  const line = { line: sizePt * 20, lineRule: LineRuleType.EXACT };
  const thick = { style: BorderStyle.SINGLE, size: 12, color: '000000' };
  const thin = { style: BorderStyle.SINGLE, size: 6, color: '000000' };
  const oneColophonChar = sizePt * 20;
  const leftPad = '　'.repeat(struct.colophonLeftChars);
  const total = (meta.cc ? 1 : 0) + (meta.printOrg || meta.printDate ? 1 : 0) + (meta.printCopies ? 1 : 0);
  let idx = 0;
  const borders = () => {
    const top = idx === 0 ? thick : thin;
    const isLast = idx === total - 1;
    idx++;
    return isLast ? { top, bottom: thick } : { top };
  };

  if (meta.cc) {
    const t = /[。！？]$/.test(meta.cc.trim()) ? meta.cc.trim() : `${meta.cc.trim()}。`;
    ps.push(
      new Paragraph({
        spacing: { ...line, before: preset.linePt * 20 },
        border: borders(),
        children: [new TextRun({ text: `${leftPad}抄送：${t}`, size, font: f })],
      }),
    );
  }
  if (meta.printOrg || meta.printDate) {
    const pd = /印发$/.test(meta.printDate?.trim() ?? '') ? meta.printDate!.trim() : `${meta.printDate?.trim() ?? ''}印发`;
    ps.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: contentWidthTwips(preset) - struct.printRightChars * oneColophonChar }],
        spacing: line,
        border: borders(),
        children: [
          new TextRun({ text: `${leftPad}${meta.printOrg ?? ''}`, size, font: f }),
          new TextRun({ children: [new Tab(), pd], size, font: f }),
        ],
      }),
    );
  }
  if (meta.printCopies) {
    const c = meta.printCopies.trim();
    const label = /印/.test(c) ? c : `印${c}份`;
    ps.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: contentWidthTwips(preset) - struct.copiesRightChars * oneColophonChar }],
        spacing: line,
        border: borders(),
        children: [new TextRun({ children: [new Tab(), label], size, font: f })],
      }),
    );
  }
  return ps;
}

/* ---------------- v0.5.3 版记分页三态模式 ----------------
 * off   —— 版记跟在正文后不拆节（默认，单面打印/短文）
 * auto  —— 估算正文能否装进一页：能 → 不拆（版记留第 1 页）；
 *          不能 → 拆到偶数页（多页公文的 GB/T 双面规范）
 * force —— 恒拆到偶数页（v0.5.1/0.5.2 的「开」）
 * 估算基于 GB/T 固定版式（A4、正文 3 号、每行字数=版心宽/字号），
 * 供 auto 判定一页；极端临界处与 Word 实际分页可能差一行。
 */
export type ColophonMode = 'off' | 'auto' | 'force';

const PT_PER_MM = 72 / 25.4;

/** 一段文字在给定字号下的折行数（版心宽 / 字号 = 每行字数；首行缩进占行内宽） */
function wrapLines(text: string, sizePt: number, indentChars: number, preset: Preset): number {
  const contentWmm = 210 - preset.page.left - preset.page.right;
  const perLine = Math.max(1, Math.floor((contentWmm * PT_PER_MM) / sizePt));
  const units = textWidthChars(text); // CJK=1 字、ASCII=0.5 字
  const firstAvail = Math.max(0, perLine - indentChars);
  if (units <= firstAvail) return 1;
  return 1 + Math.ceil((units - firstAvail) / perLine);
}

/**
 * 估算正文（红头+标题+正文+主送/附件/落款，不含版记）占用的版心高度（pt）。
 * 镜像 buildDoc 的真实段落构造顺序与行距，供 auto 模式判断「能否装进一页」。
 */
function estimateBodyHeightPt(blocks: GongwenBlock[], meta: RedHeadMeta, preset: Preset, logo?: LogoImage): number {
  let pt = 0;
  const linePt = preset.linePt;
  const B = 16; // 正文/标题级别字号固定取预设 body 的 16pt？——不，标题按 roles 取
  void B;
  const roleSize = (k: keyof Preset['roles']) => preset.roles[k].sizePt;
  const roleIndent = (k: keyof Preset['roles']) => preset.roles[k].indentChars ?? 0;
  const addPara = (text: string, sizePt: number, h: number, indentChars = 0, beforePt = 0, afterPt = 0) => {
    pt += wrapLines(text, sizePt, indentChars, preset) * h + beforePt + afterPt;
  };

  // 红头（meta 有任一项或 logo 才渲染，镜像 redHeadParas）
  const hasRedHead = Object.values(meta).some((v) => !!v) || !!logo;
  if (hasRedHead) {
    if (logo) {
      // logo 高：40mm 宽按原始宽高比 → px → pt（镜像 logoPara）
      const buf = new Uint8Array(logo.data);
      const { w, h } = imageDims(buf, logo.ext);
      const targetWPx = Math.round((40 / 25.4) * 96);
      const hp = w > 0 && h > 0 ? Math.round((targetWPx * h) / w) : targetWPx;
      pt += (hp * 72) / 96 + 6; // after 120twips
    }
    for (const k of ['copyNumber', 'secretLevel', 'urgency'] as const) {
      if (meta[k]) pt += 28; // notice 行高 28pt 固定
    }
    // 联合行文多行红头：每机关一行（镜像 redHeadParas）
    for (const ag of splitAgencies(meta.agency)) addPara(ag, RED_HEAD_STYLE.agency.sizePt, 44, 0, 6);
    if (meta.docNumber || meta.signer) {
      const t = meta.signer ? `${meta.docNumber ?? ''}签发人：${meta.signer}` : meta.docNumber ?? '';
      addPara(t, RED_HEAD_STYLE.number.sizePt, 28, 0, 28);
    }
    pt += 24; // 红线分隔段（before 4mm/20 + after 240twips + 空行最小高，近似）
  }

  for (const b of blocks) {
    if (b.kind === 'table') {
      if (b.table && b.table.rows.length) pt += tableHeightPt(b.table, preset);
      continue;
    }
    if (b.kind === 'docTitle') {
      for (const line of b.text.split('\n')) addPara(line, roleSize('docTitle'), preset.titleLinePt, 0, 0, 12);
      if (meta.recipients) addPara(meta.recipients, roleSize('body'), linePt, 0, linePt);
      continue;
    }
    const k = b.kind === 'h1' ? 'h1' : b.kind === 'h2' ? 'h2' : b.kind === 'h3' ? 'h3' : 'body';
    addPara(b.text, roleSize(k), linePt, roleIndent(k));
  }

  if (meta.attachments) {
    const lines = meta.attachments.split('/').map((s) => s.trim()).filter(Boolean);
    lines.forEach((l, i) => addPara(l, roleSize('body'), linePt, 2, i === 0 ? linePt : 0));
  }
  if (meta.signature || meta.date) {
    if (meta.signature) addPara(meta.signature, roleSize('body'), linePt, 0, linePt);
    if (meta.date) addPara(meta.date, roleSize('body'), linePt, 0, 0);
  }
  if (meta.notes) addPara(meta.notes, roleSize('body'), linePt, 2, linePt);
  return pt;
}

/** auto 模式判定：正文（不含版记）估算能装进一页 → 不拆节 */
function colophonFitsOnePage(blocks: GongwenBlock[], meta: RedHeadMeta, preset: Preset, logo?: LogoImage): boolean {
  const contentHmm = 297 - preset.page.top - preset.page.bottom;
  const bodyPt = estimateBodyHeightPt(blocks, meta, preset, logo);
  // 留 ~1.5% 余量偏向「不拆」，避免临界处把一页公文拆出近空页
  return bodyPt <= contentHmm * PT_PER_MM * 0.985;
}

function buildDoc(
  blocks: GongwenBlock[],
  preset: Preset,
  boldFirst: boolean,
  meta: RedHeadMeta = {},
  logo?: LogoImage,
  colophonMode: ColophonMode = 'off',
  struct: StructLayout = STRUCT_DEFAULTS,
  sealImg?: LogoImage,
  attach?: GongwenBlock[],
): Document {
  // docx 文件属性（core.xml，v0.12.0）：标题=正文首标题、作者/单位=发文机关、描述=发文字号
  const metaTitle = (blocks.find((b) => b.kind === 'docTitle')?.text ?? '').split('\n')[0].trim() || undefined;
  const metaAgency = meta.agency?.trim() || meta.signature?.trim() || undefined;
  const pn = preset.pageNumber;
  const isGongwen = pn.style === 'gongwen';
  const hasPageNumber = pn.style !== 'none';
  const hasColophon = !!(meta.cc || meta.printOrg || meta.printDate || meta.printCopies);
  const hasAttach = !!attach && attach.length > 0;
  const closingNeeded = !!(meta.signature || meta.date || meta.notes);
  // 版记分页（GB/T 9704 双面印制规范）：拆节从下一个偶数页开始；
  // off 不拆；auto 一页装得下不拆、装不下拆；force 恒拆。
  // 附件区（v0.10.0）模式下关闭偶页拆节——附件已另面起排，版记并入附件节末尾，条件页码域不适用。
  // 拆节时正文止于偶数页，Word 自动补空白奇数页，页码两分法由条件域动态实现（见 COND_BOOKMARK 段注释）。
  const splitColophon =
    hasColophon && !hasAttach && (colophonMode === 'force' || (colophonMode === 'auto' && !colophonFitsOnePage(blocks, meta, preset, logo)));
  // 条件页码域模式：仅在拆节且有页码时启用（书签 + IF 域由 Word 渲染时求值）
  const conditionalPn = splitColophon && hasPageNumber;
  // 普通页脚（非条件）：公文式 default=奇数页（右）+ even=偶数页（左）；其余样式单页脚按对齐
  const plainFooters = () => ({
    footers: {
      default: pageFooter(isGongwen ? AlignmentType.RIGHT : alignOf(pn.align), pn),
      ...(isGongwen ? { even: pageFooter(AlignmentType.LEFT, pn) } : {}),
    },
  });
  const condFooters = {
    // 节1：default（奇数页/单页脚）带 hideOverflow 条件——Word 自动补的空白页必为奇数页，
    // gongwen 偶数页脚保持普通（正文偶数页全部正常显示，无空白页落偶数页脚）
    footers: {
      default: conditionalFooter(isGongwen ? AlignmentType.RIGHT : alignOf(pn.align), pn, 'hideOverflow'),
      ...(isGongwen ? { even: pageFooter(AlignmentType.LEFT, pn) } : {}),
    },
  };
  const sectionProps = {
    page: {
      size: { width: Math.round(210 * MM), height: Math.round(297 * MM) },
      margin: {
        top: Math.round(preset.page.top * MM),
        bottom: Math.round(preset.page.bottom * MM),
        left: Math.round(preset.page.left * MM),
        right: Math.round(preset.page.right * MM),
      },
    },
  };
  // 节内子元素：正文段落 + 表格（md 表格 → <w:tbl>）
  const mainChildren: (Paragraph | Table)[] = [];
  const colophonChildren: Paragraph[] = [];
  {
    mainChildren.push(...redHeadParas(meta, preset, logo));
    // 正文末段（最后一个非表格块）与落款同页：keepNext（v0.10.0 防孤行）
    let lastBodyIdx = -1;
    blocks.forEach((b, i) => {
      if (b.kind !== 'table') lastBodyIdx = i;
    });
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.kind === 'table') {
        if (b.table && b.table.rows.length) mainChildren.push(tableBlock(b.table, preset));
        continue;
      }
      mainChildren.push(...blockToPara(b, preset, boldFirst, closingNeeded && i === lastBodyIdx));
      // 主送机关紧跟标题（标题下空 1 行、顶格）
      if (b.kind === 'docTitle' && meta.recipients) mainChildren.push(recipientsPara(meta.recipients, preset));
    }
    if (meta.attachments)
      mainChildren.push(...attachmentParas(meta.attachments, preset, struct.attachIndentChars, closingNeeded && blocks.length === 0));
    mainChildren.push(...closingParas(meta, preset, struct, sealImg));
    if (!hasAttach && !splitColophon) mainChildren.push(...colophonParas(meta, preset, struct));
  }
  if (splitColophon) colophonChildren.push(...colophonParas(meta, preset, struct));
  if (conditionalPn) {
    // 正文末段书签（1pt 高空段，视觉不可见）：条件页码域的锚点，书签所在页即正文最后一页
    mainChildren.push(
      new Paragraph({
        spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
        children: [new Bookmark({ id: COND_BOOKMARK, children: [] })],
      }),
    );
  }
  // 附件节：另面起排（NEXT_PAGE），含附件正文与（如有）版记
  const attachChildren: (Paragraph | Table)[] = hasAttach
    ? [...attachBlocksToParas(attach!, preset), ...(hasColophon ? colophonParas(meta, preset, struct) : [])]
    : [];

  return new Document({
    // docx 文件属性（core.xml）：标题/作者（发文机关）/描述（发文字号）——批量归档时
    // 文件管理器可按属性检索、台账可与 docx 一一对应（v0.12.0）。
    // 恒传空串：docx 库对空值整标签省略，且盖掉其默认「Un-named」作者
    title: metaTitle ?? '',
    creator: metaAgency ?? '',
    description: meta.docNumber?.trim() ?? '',
    lastModifiedBy: metaAgency ?? '', // 盖掉 docx 库默认「Un-named」
    // 仅公文式需要奇偶页分离页脚（单右双左）；其余样式单页脚即可
    ...(isGongwen ? { evenAndOddHeaderAndFooters: true } : {}),
    // 条件页码域：打开文档时自动刷新域（Word/WPS 支持刷新；不刷新则退化为普通页码显示）
    ...(conditionalPn ? { features: { updateFields: true } } : {}),
    sections: [
      { properties: sectionProps, ...(conditionalPn ? condFooters : hasPageNumber ? plainFooters() : {}), children: mainChildren },
      ...(hasAttach
        ? [
            {
              properties: { ...sectionProps, type: SectionType.NEXT_PAGE },
              ...(hasPageNumber ? plainFooters() : {}),
              children: attachChildren,
            },
          ]
        : []),
      ...(splitColophon
        ? [
            {
              properties: { ...sectionProps, type: SectionType.EVEN_PAGE },
              // 节2：版记页恒为偶数页——gongwen 用 even 页脚承载 showIfAdjacent，default（奇）仅兜底
              footers: {
                default: conditionalFooter(alignOf(pn.align), pn, 'showIfAdjacent'),
                ...(isGongwen ? { even: conditionalFooter(AlignmentType.LEFT, pn, 'showIfAdjacent') } : {}),
              },
              children: colophonChildren,
            },
          ]
        : []),
    ],
  });
}

/** 组装 docx 并输出 Blob（浏览器/Node 通用，Node 22+ 有全局 Blob） */
export async function buildDocxBlob(
  blocks: GongwenBlock[],
  preset: Preset,
  opts?: {
    firstSentenceBold?: boolean;
    meta?: RedHeadMeta;
    logo?: LogoImage;
    seal?: LogoImage;
    attach?: GongwenBlock[];
    colophonMode?: ColophonMode;
    struct?: Partial<StructLayout>;
  },
): Promise<Blob> {
  return Packer.toBlob(
    buildDoc(blocks, preset, !!opts?.firstSentenceBold, opts?.meta, opts?.logo, opts?.colophonMode ?? 'off', {
      ...STRUCT_DEFAULTS,
      ...opts?.struct,
    }, opts?.seal, opts?.attach),
  );
}

/** CLI 用：写 docx 到本地路径 */
export async function exportDocx(
  blocks: GongwenBlock[],
  outPath: string,
  preset: Preset,
  opts?: {
    firstSentenceBold?: boolean;
    meta?: RedHeadMeta;
    logo?: LogoImage;
    seal?: LogoImage;
    attach?: GongwenBlock[];
    colophonMode?: ColophonMode;
    struct?: Partial<StructLayout>;
  },
): Promise<void> {
  const blob = await buildDocxBlob(blocks, preset, opts);
  const { writeFileSync } = await import('node:fs');
  writeFileSync(outPath, Buffer.from(await blob.arrayBuffer()));
}
