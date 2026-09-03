/**
 * format.ts —— RedHead 排版格式系统 v2（预设制）
 * 产品定位（2026-09-02 裁定）：轻量排版工具，公文只是内置预设之一；
 * 用户可复制/新建自定义预设，页面设置 + 逐角色（大标题/一二三级标题/正文）排版参数。
 * 预览 CSS 与 docx 参数都从这里取值，禁止在别处硬编码格式。
 */

/** 单个「角色」的排版参数（如：一级标题、正文） */
export interface RoleStyle {
  /** 中文字体名。空串 = 使用该角色默认字链 */
  font: string;
  /** 字号（pt）。docx 半磅 = ×2 */
  sizePt: number;
  bold: boolean;
  align: 'left' | 'center';
  /** 首行缩进（字符数，随字号联动换算 twips）；0 = 不缩进 */
  indentChars: number;
}

/** 页码样式 */
export type PageNumberStyle = 'none' | 'gongwen' | 'dash' | 'plain' | 'cnPage' | 'total';

export interface PageNumberConfig {
  style: PageNumberStyle;
  /** 页码对齐。gongwen 样式忽略此项（国标固定：单页右/双页左） */
  align: 'left' | 'center' | 'right';
  /** 页码字号（pt），默认 14 = 四号 */
  sizePt: number;
}

export const DEFAULT_PAGE_NUMBER: PageNumberConfig = { style: 'none', align: 'center', sizePt: 14 };

/** 页码样式清单（设置页下拉直接用） */
export const PAGE_NUMBER_OPTIONS: readonly { id: PageNumberStyle; label: string }[] = [
  { id: 'none', label: '无页码' },
  { id: 'gongwen', label: '公文式：— 1 —（单页右 / 双页左）' },
  { id: 'dash', label: '短横线：- 1 -' },
  { id: 'plain', label: '纯数字：1' },
  { id: 'cnPage', label: '中文式：第 1 页' },
  { id: 'total', label: '带总数：第 1 页 / 共 3 页' },
];

export interface Preset {
  id: string;
  name: string;
  builtin: boolean;
  /** 页面：页边距（mm），A4 纵向固定 */
  page: { top: number; bottom: number; left: number; right: number };
  /** 正文行距（磅，固定值） */
  linePt: number;
  /** 大标题行距（磅，固定值） */
  titleLinePt: number;
  roles: {
    docTitle: RoleStyle;
    h1: RoleStyle;
    h2: RoleStyle;
    h3: RoleStyle;
    body: RoleStyle;
    /** 表格单元格文字（md 表格；首行表头恒加粗居中，单元格数据默认居中，可用 md 对齐标记覆盖） */
    table: RoleStyle;
  };
  /** 页码 */
  pageNumber: PageNumberConfig;
}

/** 各角色默认字链（用户自定义字体置顶，其后依次回退；机关机命中前者，个人机落到华文系列） */
export const ROLE_FONT_FALLBACK: Record<keyof Preset['roles'], string[]> = {
  docTitle: ['方正小标宋简体', '方正小标宋_GBK', '华文中宋', 'STZhongsong'],
  h1: ['黑体', 'SimHei', 'STHeiti'],
  h2: ['楷体_GB2312', '楷体', 'STKaiti'],
  h3: ['仿宋_GB2312', '仿宋', 'STFangsong'],
  body: ['仿宋_GB2312', '仿宋', 'STFangsong'],
  table: ['仿宋_GB2312', '仿宋', 'STFangsong'],
};

/** 西文与数字统一 Times New Roman（docx ascii/hAnsi 槽 + CSS 字族首位） */
export const LATIN_FONT = 'Times New Roman';

/** 页码字体链（国标：四号宋体，国标固定项不进预设） */
export const PAGE_NUMBER_FONT = ['宋体', 'SimSun', 'STSong'];

/* ------------------------------------------------------------------ */
/* 红头（版头）国标固定样式 —— GB/T 9704-2012，内容由 frontmatter 驱动  */
/* ------------------------------------------------------------------ */

/** 红色（docx 颜色值 / CSS 十六进制同用） */
export const RED_COLOR = 'FF0000';

/** 版头各要素样式（国标固定项，不进预设） */
export const RED_HEAD_STYLE = {
  /** 发文机关标志：红色小标宋，推荐醒目字号（国标未定字号，取常见红头大小） */
  agency: { font: ['方正小标宋简体', '方正小标宋_GBK', '华文中宋', 'STZhongsong'], sizePt: 33 },
  /** 份号 / 密级和保密期限 / 紧急程度：三号黑体，版心左上角顶格 */
  notice: { font: ['黑体', 'SimHei', 'STHeiti'], sizePt: 16 },
  /** 发文字号 / 签发人：三号仿宋 */
  number: { font: ['仿宋_GB2312', '仿宋', 'STFangsong'], sizePt: 16 },
  /** 红色分隔线：与版心等宽，高度约 0.35mm */
  lineWidthMm: 0.35,
} as const;

/** 印章（rh-seal）规格（v0.10.0）：党政机关单位公章直径 42mm，方形画布按源图比例缩放 */
export const SEAL_STYLE = { sizeMm: 42 } as const;

/**
 * 机关标志字号自适应（v0.9.0 联合行文共用，预览/docx/估高同源）：
 * 以最长机关名估宽（中文≈1em、西文≈0.52em），超过版心宽（156mm ≈442pt，留 1.5% 冗余）
 * 逐步降号（下限 22pt 小标宋小一号），保证红头不溢出、两机关分行都放得下。
 */
export function fitAgencySizePt(agencies: string[], maxSizePt: number = RED_HEAD_STYLE.agency.sizePt): number {
  if (!agencies.length) return maxSizePt;
  const contentPt = Math.floor(156 * 2.8346 * 0.985); // ≈ 435
  const widthAt = (name: string, size: number): number =>
    [...name].reduce((w, ch) => w + (/[\x00-\xff]/.test(ch) ? size * 0.52 : size), 0);
  const maxName = agencies.reduce((a, b) => (a.length >= b.length ? a : b));
  let size = Math.max(22, Math.floor(maxSizePt));
  while (size > 22 && widthAt(maxName, size) > contentPt) size -= 1;
  return size;
}

/* ------------------------------------------------------------------ */
/* 结构层尾部要素（GB/T 9704-2012 §2.6 规格）—— 内容由 frontmatter 驱动 */
/* 字体走预设的 body 角色（国标：三号仿宋）；版记为四号仿宋国标固定项    */
/* ------------------------------------------------------------------ */

/** 版记（抄送/印发/份数）字号：四号仿宋（国标固定项） */
export const STRUCT_STYLE = {
  colophonSizePt: 14,
} as const;

/** 结构层位置参数（v0.5.6 起为设置项）：落款对齐 + 各要素相对版心左空/右空字数 */
export interface StructLayout {
  /** 落款（署名+成文日期）对齐：right=右对齐(GB/T) / center=水平居中 / left=左对齐起排 */
  signatureAlign: 'right' | 'center' | 'left';
  /** right 模式：成文日期右空字数（GB/T 4；署名以日期为轴居中，右缩进含半字差） */
  signatureRightChars: number;
  /** left 模式：署名/日期左空字数（0=顶格左对齐） */
  signatureLeftChars: number;
  /** 附件说明左空字数（GB/T 2） */
  attachIndentChars: number;
  /** 附注左空字数（GB/T 2） */
  notesIndentChars: number;
  /** 版记：抄送/印发机关左空字数（GB/T 1，渲染用全角空格起排，不缩分隔线） */
  colophonLeftChars: number;
  /** 版记：印发日期右空字数（GB/T 1，制表位右缘） */
  printRightChars: number;
  /** 版记：印发份数右空字数（GB/T 3） */
  copiesRightChars: number;
}

/** 结构层默认值 = GB/T 9704-2012。渲染/导出函数收 struct 参数、缺省用此常量 */
export const STRUCT_DEFAULTS: StructLayout = {
  signatureAlign: 'right',
  signatureRightChars: 4,
  signatureLeftChars: 0,
  attachIndentChars: 2,
  notesIndentChars: 2,
  colophonLeftChars: 1,
  printRightChars: 1,
  copiesRightChars: 3,
};

/** 全角/半角混排估宽：CJK=1 字、ASCII=0.5 字（署名相对成文日期居中用） */
export function textWidthChars(s: string): number {
  let w = 0;
  for (const ch of s) w += /[\x00-\xff]/.test(ch) ? 0.5 : 1;
  return w;
}

/** 角色构造便捷函数 */const role = (
  font: string,
  sizePt: number,
  bold = false,
  align: 'left' | 'center' = 'left',
  indentChars = 0,
): RoleStyle => ({ font, sizePt, bold, align, indentChars });

/** 出厂内置预设：公文标准 + 日常简洁（2026-09-02 用户裁定砍到两个） */
export const BUILTIN_PRESETS: Preset[] = [
  {
    id: 'gongwen-standard',
    name: '公文 · 标准（GB/T 9704）',
    builtin: true,
    page: { top: 37, bottom: 35, left: 28, right: 26 },
    linePt: 28,
    titleLinePt: 35,
    roles: {
      docTitle: role('方正小标宋简体', 22, false, 'center'),
      h1: role('黑体', 16),
      h2: role('楷体_GB2312', 16),
      h3: role('仿宋_GB2312', 16, true, 'left', 2),
      body: role('仿宋_GB2312', 16, false, 'left', 2),
      table: role('仿宋_GB2312', 14, false, 'left', 0),
    },
    pageNumber: { style: 'gongwen', align: 'right', sizePt: 14 },
  },
  {
    id: 'generic-simple',
    name: '日常 · 简洁',
    builtin: true,
    page: { top: 25.4, bottom: 25.4, left: 31.8, right: 31.8 },
    linePt: 22,
    titleLinePt: 30,
    roles: {
      docTitle: role('', 16, true, 'center'),
      h1: role('', 14, true),
      h2: role('', 12, true),
      h3: role('', 12, true, 'left', 2),
      body: role('', 12, false, 'left', 2),
      table: role('', 11, false, 'left', 0),
    },
    pageNumber: { style: 'plain', align: 'center', sizePt: 12 },
  },
];

/** 角色的完整字体链：用户自定义置顶 + 默认回退（去重） */
export function roleFontChain(presetRole: RoleStyle, fallbackKey: keyof Preset['roles']): string[] {
  const base = ROLE_FONT_FALLBACK[fallbackKey];
  if (!presetRole.font) return base;
  return [presetRole.font, ...base.filter((f) => f !== presetRole.font)];
}

/** 每页 22 行 × 每行 28 字（GB/T 9704 网格，供验收用） */
export const GRID = { linesPerPage: 22, charsPerLine: 28 } as const;

/** 深拷贝预设（复制/新建用） */
export function clonePreset(p: Preset, patch: Partial<Preset> & { id: string; name: string }): Preset {
  return {
    ...structuredClone(p),
    ...patch,
    page: { ...p.page, ...(patch.page ?? {}) },
    roles: {
      docTitle: { ...p.roles.docTitle, ...(patch.roles?.docTitle ?? {}) },
      h1: { ...p.roles.h1, ...(patch.roles?.h1 ?? {}) },
      h2: { ...p.roles.h2, ...(patch.roles?.h2 ?? {}) },
      h3: { ...p.roles.h3, ...(patch.roles?.h3 ?? {}) },
      body: { ...p.roles.body, ...(patch.roles?.body ?? {}) },
      table: { ...p.roles.table, ...(patch.roles?.table ?? {}) },
    },
  };
}

/** 页码健壮化：兼容 v0.3.0 的字符串写法（'gongwen' / 'none'） */
function normalizePageNumber(raw: any): PageNumberConfig {
  const STYLES: PageNumberStyle[] = ['none', 'gongwen', 'dash', 'plain', 'cnPage', 'total'];
  const old = raw as any;
  let style: PageNumberStyle = 'none';
  if (typeof old === 'string') style = STYLES.includes(old as PageNumberStyle) ? (old as PageNumberStyle) : 'none';
  else if (old && typeof old === 'object' && STYLES.includes(old.style)) style = old.style;
  const align = raw?.align === 'left' || raw?.align === 'right' ? raw.align : raw?.align === 'center' ? 'center' : 'center';
  const sizePt = typeof raw?.sizePt === 'number' && raw.sizePt > 0 && raw.sizePt < 72 ? raw.sizePt : 14;
  return { style, align, sizePt };
}

/** 自定义预设健壮化：字段缺失/非法时回落默认（data.json 手改保险） */
export function normalizePreset(raw: any): Preset | null {
  if (!raw || typeof raw !== 'object' || !raw.id || !raw.name) return null;
  const base = BUILTIN_PRESETS[0];
  const num = (v: any, d: number) => (typeof v === 'number' && isFinite(v) && v > 0 ? v : d);
  const rs = (v: any, d: RoleStyle): RoleStyle => ({
    font: typeof v?.font === 'string' ? v.font : d.font,
    sizePt: num(v?.sizePt, d.sizePt),
    bold: !!v?.bold,
    align: v?.align === 'center' ? 'center' : 'left',
    indentChars: typeof v?.indentChars === 'number' && v.indentChars >= 0 ? v.indentChars : d.indentChars,
  });
  return {
    id: String(raw.id),
    name: String(raw.name),
    builtin: false,
    page: {
      top: num(raw.page?.top, base.page.top),
      bottom: num(raw.page?.bottom, base.page.bottom),
      left: num(raw.page?.left, base.page.left),
      right: num(raw.page?.right, base.page.right),
    },
    linePt: num(raw.linePt, base.linePt),
    titleLinePt: num(raw.titleLinePt, base.titleLinePt),
    roles: {
      docTitle: rs(raw.roles?.docTitle, base.roles.docTitle),
      h1: rs(raw.roles?.h1, base.roles.h1),
      h2: rs(raw.roles?.h2, base.roles.h2),
      h3: rs(raw.roles?.h3, base.roles.h3),
      body: rs(raw.roles?.body, base.roles.body),
      table: rs(raw.roles?.table, base.roles.table),
    },
    pageNumber: normalizePageNumber(raw.pageNumber),
  };
}
