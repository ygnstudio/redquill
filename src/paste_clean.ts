/**
 * paste_clean.ts —— 粘贴净化（MDQuill v0.1.0）
 *
 * 纯函数、无 Obsidian 依赖。网页 / Word / WPS / 公众号编辑器复制的内容常有：
 *  - 行首行尾多余空格（含全角空格、NBSP）、制表符
 *  - 连续多个空行、\r\n 混排
 *  - HTML 标签与样式残留（Word mso-* 属性粘贴尤甚）
 *
 * 目标是「干净的 md 行」：剥行首尾空白 + 空行压成一段一空行 + 剥全部标签与样式。
 * 清洗规则克制：不合并行、不改行内文字（专名/数字空格保留），只做排版脏数据规整。
 * 迁移自 RedHead（v0.11.0 粘贴清洗），泛化：去公文措辞；html 路径补「连续空白折一」
 * （Word 空 span 串 / &nbsp; 连发留下的行内多空格是排版垃圾，正文 md 无保留意义）。
 */

/** 基础 HTML 实体解码（Word/网页常见集 + 数字实体，够用不追求全 HTML5） */
export function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, '\u00A0')
    .replace(/&ensp;/gi, '\u2002')
    .replace(/&emsp;/gi, '\u2003')
    .replace(/&thinsp;/gi, '\u2009')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&#x([0-9a-f]+);/gi, (_m, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d: string) => String.fromCodePoint(parseInt(d, 10)));
}

/** HTML → 行数组：剥样式/脚本/注释，块级标签与 br 转换行，其余标签剥除，实体解码 */
export function htmlToLines(html: string): string[] {
  let s = String(html ?? '');
  // 噪声块整体剔除（内容不进正文）
  s = s
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<(?:head|title|meta|link|noscript|template)[^>]*>[\s\S]*?<\/(?:head|title|meta|link|noscript|template)>/gi, '');
  // 块级/换行标签 → \n（开头与闭合标签都转：<p>甲</p><p>乙</p> 两段；含自闭合 br/hr）
  s = s.replace(
    /<\s*\/?\s*(?:p|div|li|tr|td|th|h[1-6]|table|tbody|thead|tfoot|ul|ol|dl|dt|dd|blockquote|section|article|aside|header|footer|figure|figcaption|pre|br|hr|form|fieldset)[^>]*>/gi,
    '\n',
  );
  // 其余标签剥除
  s = s.replace(/<[^>]+>/g, '');
  // 行内连续空白（Word 空 span 串 / &nbsp; 连发 / 源码缩进残留）折一空格；
  // 单空格保留（HTML 源码里词间/段间本来就可能有单空格），行首尾交给 split 后 trim。
  // 先解码实体再折（&nbsp; 需先还原成 NBSP 才能被折叠识别）
  return decodeEntities(s)
    .replace(/[ \t\u00A0\u3000]{2,}/g, ' ')
    .split(/\r?\n/)
    .map((l) => trimLine(l))
    .filter((l) => l.length > 0);
}

/** 单行清洗：剥行首/行尾空白（普通空格、tab、全角空格 U+3000、NBSP、其它 Unicode 空白） */
export function trimLine(line: string): string {
  return (line ?? '').replace(/^[\s\u3000\u00A0]+/, '').replace(/[\s\u3000\u00A0]+$/, '');
}

/**
 * 行规整：每个非空行视为一段（段间空一行），空行全部忽略，首尾无空行。
 * 粘贴内容（网页/Word/纯文本）里的一行即源文档的一段——正文 md 约定段间空一行。
 * @param lines 已切好的行（含空行）
 */
export function tidyLines(lines: string[]): string {
  const out: string[] = [];
  for (const raw of lines) {
    const line = trimLine(raw);
    if (!line) continue;
    if (out.length) out.push('');
    out.push(line);
  }
  return out.join('\n');
}

/**
 * 粘贴净化主入口：
 * @param input.html 剪贴板 text/html（优先，Word/网页结构完整）
 * @param input.text 剪贴板纯文本（html 不可得时回落）
 * @returns 清洗后的 md 正文（段落间空一行，无行首尾空白，无标签残留）
 */
export function cleanPaste(input: { html?: string; text?: string }): string {
  const html = (input.html ?? '').trim();
  const text = (input.text ?? '').replace(/\r\n|\r/g, '\n');
  const lines = html ? htmlToLines(html) : text.split('\n');
  return tidyLines(lines);
}
