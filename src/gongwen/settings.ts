/**
 * settings_util.ts —— 插件设置结构 + 清洗（v0.8.0 抽离为纯模块）
 *
 * 纯函数、无 Obsidian 依赖（可被 node/校验脚本直接跑）。
 * sanitizeSettings 是「加载 data.json」与「从备份导入」共用的同一清洗管线：
 * 数值钳制 / 三态合法化 / 预设 normalize / 旧字段迁移，非法项回默认（国标）。
 */

import { BUILTIN_PRESETS, normalizePreset, type Preset } from './format.js';

export interface RedHeadSettings {
  activePresetId: string;
  firstSentenceBold: boolean;
  customPresets: Preset[];
  /** 内置预设的用户修改覆盖层（按 id 覆盖 BUILTIN_PRESETS 出厂值，可一键重置） */
  builtinOverrides: Preset[];
  /** 预览打开方式：split = 左右分屏（默认）；tab = 新标签页 */
  previewOpenMode: 'split' | 'tab';
  /** 公文模板批量安装的勾选清单（模板 key） */
  templateSelection: string[];
  /** 版记分页模式：off=随正文不拆节 / auto=一页不拆、多页拆到偶数页 / force=恒拆偶数页（GB/T 9704 双面印制，仅影响 docx 导出） */
  colophonMode: 'off' | 'auto' | 'force';
  /** 落款右空字数（国标 GB/T 9704 规定 4 字；可按单位习惯下调到 2/0；范围 0-12） */
  signatureRightChars: number;
  /** 落款对齐方式：right=右对齐(GB/T 默认) / center=水平居中 / left=左对齐 */
  signatureAlign: 'right' | 'center' | 'left';
  /** 落款左对齐时的左空字数（0=顶格左对齐） */
  signatureLeftChars: number;
  /** 附件说明左空字数（GB/T 2） */
  attachIndentChars: number;
  /** 附注左空字数（GB/T 2） */
  notesIndentChars: number;
  /** 版记：抄送/印发机关左空字数（GB/T 1） */
  colophonLeftChars: number;
  /** 版记：印发日期右空字数（GB/T 1） */
  printRightChars: number;
  /** 版记：印发份数右空字数（GB/T 3） */
  copiesRightChars: number;
  /** 默认发文机关标志（v0.11.0 写作提效）：新建公文向导预填 frontmatter rh-agency；留空 = 不预填 */
  defaultAgency: string;
}

export const DEFAULT_SETTINGS: RedHeadSettings = {
  activePresetId: 'gongwen-standard',
  firstSentenceBold: false,
  customPresets: [],
  builtinOverrides: [],
  previewOpenMode: 'split',
  templateSelection: [],
  colophonMode: 'off',
  signatureRightChars: 4,
  signatureAlign: 'right',
  signatureLeftChars: 0,
  attachIndentChars: 2,
  notesIndentChars: 2,
  colophonLeftChars: 1,
  printRightChars: 1,
  copiesRightChars: 3,
  defaultAgency: '',
};

const CHARS_KEYS: (keyof RedHeadSettings)[] = [
  'signatureRightChars',
  'signatureLeftChars',
  'attachIndentChars',
  'notesIndentChars',
  'colophonLeftChars',
  'printRightChars',
  'copiesRightChars',
];

const clampChars = (v: unknown, def: number): number =>
  typeof v === 'number' && isFinite(v) && v >= 0 && v <= 12 ? Math.floor(v) : def;

const alignOk = (v: unknown): v is RedHeadSettings['signatureAlign'] =>
  v === 'right' || v === 'center' || v === 'left';

/**
 * settings 清洗：加载与导入共用。
 * @param raw        待清洗对象（data.json / 备份 JSON 的 settings / 裸 settings 均可）
 * @param templateOk 模板 key 白名单谓词（main.ts 注入 GONGWEN_TEMPLATES 表）
 */
export function sanitizeSettings(
  raw: any,
  templateOk: (key: string) => boolean = () => true,
): RedHeadSettings {
  const merged = {
    ...DEFAULT_SETTINGS,
    ...raw,
    customPresets: Array.isArray(raw?.customPresets)
      ? raw.customPresets.map(normalizePreset).filter((p: any): p is Preset => !!p)
      : [],
    builtinOverrides: Array.isArray(raw?.builtinOverrides)
      ? raw.builtinOverrides
          .map((o: any) => {
            const base = BUILTIN_PRESETS.find((b) => b.id === o?.id);
            if (!base) return null;
            // 出厂值打底 + 用户修改覆盖，缺字段不丢
            const n = normalizePreset({ ...structuredClone(base), ...o });
            return n ? { ...n, builtin: true } : null;
          })
          .filter((p: any): p is Preset => !!p)
      : [],
    templateSelection: Array.isArray(raw?.templateSelection)
      ? raw.templateSelection.filter((k: any) => typeof k === 'string' && templateOk(k))
      : [],
    // 旧版 colophonEvenPage 布尔迁移：true → force（旧「开」），false/无 → off
    colophonMode:
      raw?.colophonMode === 'auto' || raw?.colophonMode === 'force' || raw?.colophonMode === 'off'
        ? raw.colophonMode
        : raw?.colophonEvenPage === true
          ? 'force'
          : 'off',
    signatureAlign: alignOk(raw?.signatureAlign) ? raw.signatureAlign : DEFAULT_SETTINGS.signatureAlign,
  } as RedHeadSettings;
  // 结构层字数：数值钳制 0-12，非法回默认
  const m = merged as unknown as Record<string, unknown>;
  for (const k of CHARS_KEYS) {
    m[k] = clampChars((raw ?? {})[k], DEFAULT_SETTINGS[k] as number);
  }
  // 默认发文机关：仅接受字符串；去首尾空白、压缩行内空白，超长截断（中文红头一般 ≤30 字）
  merged.defaultAgency =
    typeof raw?.defaultAgency === 'string'
      ? raw.defaultAgency.trim().replace(/\s+/g, ' ').slice(0, 80)
      : '';
  return merged;
}
