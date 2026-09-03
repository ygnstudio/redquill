/**
 * paste_clean.ts 真源码单元测试（vitest）。
 * 此前 tests/ 下的 verify_v*.py 校验的是构建产物快照；本套件直接测 src/ 当前源码，
 * 源码改动会立即反映到测试结果。
 */
import { describe, expect, it } from 'vitest';
import { cleanPaste, decodeEntities, htmlToLines, tidyLines, trimLine } from '../../src/paste_clean';

describe('decodeEntities', () => {
  it('解码常见命名实体', () => {
    expect(decodeEntities('a&nbsp;b&lt;c&gt;')).toBe('a\u00A0b<c>');
  });

  it('解码数字实体', () => {
    expect(decodeEntities('&#20013;&#25991;')).toBe('中文');
  });

  it('无实体时原样返回', () => {
    expect(decodeEntities('纯文本')).toBe('纯文本');
  });
});

describe('trimLine', () => {
  it('剥行首尾空白（含全角空格与 NBSP）', () => {
    expect(trimLine('\u3000\u00A0 hello \u3000')).toBe('hello');
  });

  it('剥制表符', () => {
    expect(trimLine('\t\t正文')).toBe('正文');
  });
});

describe('tidyLines', () => {
  it('连续空行压缩为单个空行', () => {
    expect(tidyLines('a\n\n\n\nb')).toBe('a\n\nb');
  });

  it('首尾空行去除', () => {
    expect(tidyLines('\n\na\n\n\n')).toBe('a');
  });
});

describe('htmlToLines + cleanPaste', () => {
  it('剥 HTML 标签与样式残留', () => {
    const out = cleanPaste({ html: '<p style="mso-prop:x">第一段</p><p>第二段</p>' });
    expect(out).not.toContain('<');
    expect(out).not.toContain('mso');
    expect(out).toContain('第一段');
    expect(out).toContain('第二段');
  });

  it('纯文本段落间规整为单空行（tidyLines 规则）', () => {
    expect(cleanPaste({ text: '第一行\n第二行' })).toBe('第一行\n\n第二行');
  });

  it('空输入返回空串', () => {
    expect(cleanPaste({})).toBe('');
  });
});

describe('htmlToLines', () => {
  it('块级标签转为换行', () => {
    const lines = htmlToLines('<div>a</div><div>b</div>');
    expect(lines.length).toBeGreaterThanOrEqual(2);
  });
});
