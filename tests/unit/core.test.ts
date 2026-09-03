/**
 * mdast.ts / frontmatter.ts / settings_util.ts 真源码单元测试（vitest）。
 */
import { describe, expect, it } from 'vitest';
import { charStats, outlineOf } from '../../src/mdast';
import { applyFrontmatter, fmQuote } from '../../src/frontmatter';
import { sanitizeSettings } from '../../src/settings_util';

describe('outlineOf', () => {
  it('提取标题树并忽略代码块内的 #', () => {
    const md = '# 一级\n\n正文\n\n## 二级 A\n\n### 三级\n\n## 二级 B\n';
    const outline = outlineOf(md);
    const texts = outline.map((o) => o.text);
    expect(texts).toContain('一级');
    expect(texts).toContain('二级 A');
    expect(texts).toContain('二级 B');
  });

  it('空文档返回空数组', () => {
    expect(outlineOf('')).toEqual([]);
  });
});

describe('charStats', () => {
  it('分别统计中文字符与非空白字符', () => {
    const s = charStats('中文abc\n中文');
    expect(s.chinese).toBe(4);
    expect(s.nonspace).toBe(7); // 4 中文 + abc(3)
    expect(s.total).toBeGreaterThanOrEqual(s.nonspace);
  });

  it('空文本全为 0', () => {
    const s = charStats('');
    expect(s.chinese).toBe(0);
    expect(s.nonspace).toBe(0);
  });
});

describe('fmQuote', () => {
  it('含特殊字符时加引号', () => {
    expect(fmQuote('含: 冒号')).toMatch(/^".*"$/);
  });

  it('普通词不加引号', () => {
    expect(fmQuote('普通词')).toBe('普通词');
  });
});

describe('applyFrontmatter', () => {
  it('无 frontmatter 时新建并写入字段', () => {
    const out = applyFrontmatter('正文', [['title', '标题']]);
    expect(out).toContain('title');
    expect(out).toContain('正文');
  });

  it('已有 frontmatter 时更新字段', () => {
    const out = applyFrontmatter('---\ntitle: 旧\n---\n\n正文', [['title', '新']]);
    expect(out).toContain('新');
  });
});

describe('sanitizeSettings', () => {
  it('非法输入回落默认值', () => {
    expect(sanitizeSettings(null)).toEqual({ autoClean: false });
    expect(sanitizeSettings('garbage')).toEqual({ autoClean: false });
  });

  it('合法字段保留', () => {
    expect(sanitizeSettings({ autoClean: true })).toEqual({ autoClean: true });
  });

  it('未知字段丢弃', () => {
    const out = sanitizeSettings({ autoClean: true, hack: 'x' });
    expect(out).toEqual({ autoClean: true });
  });
});
