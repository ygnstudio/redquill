/**
 * writeassist.ts —— 写作辅助（v0.11.0）：编辑器内实时角色诊断 + 标题序号建议
 *
 * 纯函数、无 Obsidian 依赖。写作辅助面板对「光标所在行」做即时诊断：
 *  这一行在公文里是什么角色？md 该怎么写？下一步标题序号该接几？
 * 判定口径与 mdast 渲染同源（detectOutlineHeading 同一规则），避免「面板说有、预览没排」。
 */

import { detectOutlineHeading } from './mdast.js';

export type LineRole =
  | 'empty'
  | 'fm' // frontmatter 栏线 / rh-* 属性 / 普通 yaml 键
  | 'docTitle' // # 文件标题（小标宋二号居中）
  | 'h1' // ## 一、 → 一级标题（黑体三号顶格）
  | 'h2' // ### （一） → 二级标题（楷体三号顶格）
  | 'h3' // #### 1. → 三级标题（仿宋三号加粗、首行缩进 2 字）
  | 'bare-h1' // 裸写「一、xxx」（无 ##，无句号）→ 预览自动按一级标题排（v0.11.0）
  | 'bare-h1-body' // 裸写「一、xxx。……」含句号 → 段首序数正文（不会当标题）
  | 'suggest-h2' // 裸写「（一）xxx」无句号 → 疑似二级标题，建议 ### 前缀或接正文
  | 'suggest-h3' // 裸写「1. xxx」无句号 → 疑似三级标题，建议 #### 前缀
  | 'body' // 正文段（首行自动缩进 2 字）
  | 'body-indent' // 正文段但行首手敲了空格/全角空格（应删，缩进由排版生成）
  | 'table'
  | 'quote' // > 引用（元信息，不进正文）
  | 'list' // 列表（渲染时拍平成段落）
  | 'code'
  | 'hr' // --- 单独行：frontmatter 栏线或附件区起点
  | 'plain';

export interface LineInfo {
  role: LineRole;
  /** 面板主标签（中文） */
  label: string;
  /** 写作提示（可选） */
  tip?: string;
}

const CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

/** 数字 → 汉字序号（1-99：一、二、…十、十一、二十、二十一…） */
export function cnNum(n: number): string {
  if (n <= 0) return '';
  if (n <= 10) return CN[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return (tens === 1 ? '十' : CN[tens] + '十') + (ones ? CN[ones] : '');
}

/** 行角色诊断（单行、无文档上下文；frontmatter 区由 View 侧先剥出正文行再调用） */
export function lineRole(line: string): LineInfo {
  const raw = line ?? '';
  const t = raw.trim();
  if (!t) return { role: 'empty', label: '空行（段落分隔）' };

  // frontmatter 栏线与属性（放在标题判断前：--- 优先级最高）
  if (/^-{3,}\s*$/.test(t)) return { role: 'fm', label: 'frontmatter 栏线（---）', tip: '开栏后写 rh-* 公文属性；正文中单独一行 --- 会开启附件区（另面起排）' };
  if (/^rh-[A-Za-z][A-Za-z0-9]*\s*:/.test(t) || /^[A-Za-z_][A-Za-z0-9_]*\s*:/.test(t))
    return { role: 'fm', label: 'frontmatter 属性行', tip: 'rh- 前缀为公文属性；普通 yaml 键不影响排版' };

  // md 标题（映射：## → 黑体一、层；### → 楷体（一）层；#### → 仿宋加粗 1. 层）
  if (/^#\s+\S/.test(t)) return { role: 'docTitle', label: '文件标题（#）', tip: '小标宋二号居中；整篇只取第一个 #，正文里的级次请用 ## 起' };
  if (/^##\s+\S/.test(t)) return { role: 'h1', label: '一级标题（## 一、）', tip: '黑体三号顶格；建议序号「一、二、三…」' };
  if (/^###\s+\S/.test(t)) return { role: 'h2', label: '二级标题（### （一））', tip: '楷体三号顶格；建议序号「（一）（二）…」' };
  if (/^####\s+\S/.test(t)) return { role: 'h3', label: '三级标题（#### 1.）', tip: '仿宋三号加粗、首行缩进 2 字；建议序号「1. 2. …」' };
  if (/^#{5,}\s+\S/.test(t))
    return { role: 'plain', label: '过深标题（#####+）', tip: '公文级次只到三级（# 标题 / ## 一、/ ### （一）/ #### 1.），更深的行按正文处理' };

  // 裸写序号（v0.11.0：一、 识别；后续两级给写法引导）
  const out = detectOutlineHeading(t);
  if (out === 'h1') return { role: 'bare-h1', label: '一级标题（裸写「一、」识别）', tip: '已自动按黑体三号一级标题排版；也可写成 ## 前缀更显式' };
  if (/^[一二三四五六七八九十]{1,3}、/.test(t))
    return { role: 'bare-h1-body', label: '正文段（段首序数「一、…」）', tip: '行内含句号 → 按正文渲染（首行缩进 2 字）。标题行建议不写句号' };
  if (/^（[一二三四五六七八九十]{1,3}）/.test(t) && !t.includes('。'))
    return { role: 'suggest-h2', label: '疑似二级标题（（一）…）', tip: '裸写（一）不识别层级，请加 ### 前缀（楷体三号）或直接接正文' };
  if (/^\d{1,2}[.、]/.test(t) && !t.includes('。'))
    return { role: 'suggest-h3', label: '疑似三级标题（1. …）', tip: '裸写 1. 不识别层级，请加 #### 前缀（仿宋加粗、缩进 2 字）或直接接正文' };

  // 块语法
  if (/^\s*\|/.test(t)) return { role: 'table', label: 'md 表格', tip: '表头首行加粗居中，列对齐认 :-- 左 / :--: 中 / --: 右' };
  if (/^>\s?/.test(t)) return { role: 'quote', label: '引用行（> 元信息）', tip: '引用块不进正文（作元信息/备注用）' };
  if (/^[-*+]\s/.test(t)) return { role: 'list', label: '列表项', tip: '渲染时条目拍平成正文段落；公文序号请直接写在原文（一、/（一）/1.）' };
  if (/^```/.test(t)) return { role: 'code', label: '代码块', tip: '代码块不进正文' };

  // 正文：行首手敲空白提醒
  if (/^[\s\u3000\u00A0]/.test(raw) && !/^\s*\|/.test(raw))
    return { role: 'body-indent', label: '正文段（行首有手敲空格）', tip: '首行缩进由排版自动生成（2 字），行首空格请删除，避免导出 docx 出现多余空白' };
  return { role: 'body', label: '正文段', tip: '首行自动缩进 2 字、两端对齐；段与段之间留一个空行' };
}

/* ------------------------------------------------------------------ */
/* 序号建议：统计已出现的一/二级标题，给出下一个该写的序号                 */
/* ------------------------------------------------------------------ */

/** 行是否一级标题（## 开头或裸写一、识别；供计数） */
export function isH1Line(line: string): boolean {
  const t = line.trim();
  return /^##\s+\S/.test(t) || detectOutlineHeading(t) === 'h1';
}

/** 行是否二级标题（### （一）…） */
export function isH2Line(line: string): boolean {
  return /^###\s+\S/.test(line.trim());
}

/** 正文区（fm 之后）里数出一级标题数 → 建议下一个「一、二、…」 */
export function nextH1(lines: string[]): string {
  let n = 0;
  let inFm = false;
  for (const ln of lines) {
    const t = ln.trim();
    if (/^-{3,}\s*$/.test(t)) {
      inFm = !inFm;
      continue;
    }
    if (!inFm && isH1Line(ln)) n += 1;
  }
  return cnNum(n + 1) + '、';
}

/** 二级标题计数 → 建议下一个「（一）（二）…」 */
export function nextH2(lines: string[]): string {
  let n = 0;
  let inFm = false;
  for (const ln of lines) {
    const t = ln.trim();
    if (/^-{3,}\s*$/.test(t)) {
      inFm = !inFm;
      continue;
    }
    if (!inFm && isH2Line(ln)) n += 1;
  }
  return `（${CN[n + 1]}）`;
}
