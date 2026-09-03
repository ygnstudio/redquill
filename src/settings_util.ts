/**
 * settings_util.ts —— 设置模型与清洗（MDQuill v0.1.0）
 *
 * 加载与保存共用 sanitizeSettings 管线（沿用 RedHead 惯例）：外来数据一律过清洗，
 * 未知/非法字段丢弃，保证 data.json 手工改坏也能回落默认。
 * 字段尽量少：v0.1 只有「自动净化粘贴」一个行为开关（默认关，命令手动触发为主）。
 */

export interface MdquillSettings {
  /** 自动净化粘贴：开启后编辑器内粘贴（html 带样式/块级痕迹）自动清洗插入；默认关（保守，用命令） */
  autoClean: boolean;
}

export const DEFAULT_SETTINGS: MdquillSettings = {
  autoClean: false,
};

/** 清洗管线：非对象 → 默认；逐字段白名单校验 */
export function sanitizeSettings(raw: unknown): MdquillSettings {
  if (typeof raw !== 'object' || raw === null) return { ...DEFAULT_SETTINGS };
  const o = raw as Record<string, unknown>;
  return {
    autoClean: typeof o.autoClean === 'boolean' ? o.autoClean : DEFAULT_SETTINGS.autoClean,
  };
}
