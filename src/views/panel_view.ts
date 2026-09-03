import { ItemView, MarkdownView, Notice, WorkspaceLeaf } from 'obsidian';
import type RedQuillPlugin from '../main';
import { VIEW_TYPE_PANEL } from '../main';
import { outlineOf, charStats } from '../mdast';
import { checkDocument as checkTypo } from '../checker';
import { lineRole } from '../gongwen/writeassist';
import { parseDocument } from '../gongwen/mdast';
import { CheckReportModal } from '../modals';
export class RedQuillPanelView extends ItemView {
  private plugin: RedQuillPlugin;
  private pending: number | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: RedQuillPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_PANEL;
  }
  getDisplayText(): string {
    return '写作面板';
  }
  getIcon(): string {
    return 'gauge';
  }

  async onOpen(): Promise<void> {
    this.registerEvent(this.plugin.app.workspace.on('active-leaf-change', () => this.schedule()));
    this.registerEvent(this.plugin.app.workspace.on('editor-change', () => this.schedule()));
    this.renderPanel();
  }

  /** 合并触发：200ms 内多次事件只渲一次 */
  private schedule(): void {
    if (this.pending !== null) window.clearTimeout(this.pending);
    this.pending = window.setTimeout(() => {
      this.pending = null;
      this.renderPanel();
    }, 200);
  }

  renderPanel(): void {
    const el = this.contentEl;
    el.empty();
    el.createEl('h4', { text: 'RedQuill 写作面板' });
    const mv = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      el.createEl('p', {
        text: '打开一个 md 笔记后，这里显示字数、排版体检速览与标题树。',
        cls: 'setting-item-description',
      });
      return;
    }
    const editor = mv.editor;
    const text = editor.getValue();
    const cursor = editor.getCursor();
    const st = charStats(text);

    /* 卡 1：字数 */
    const card1 = el.createEl('div', { cls: 'mdquill-card' });
    card1.createEl('div', { cls: 'mdquill-card-title', text: '字数' });
    const stat = card1.createEl('div', { cls: 'mdquill-stats' });
    stat.createSpan({ text: `中文 ${st.chinese}` });
    stat.createSpan({ text: `非空白 ${st.nonspace}` });
    stat.createSpan({ text: `总字符 ${st.total}` });
    const paragraphs = text.split('\n').filter((l) => l.trim().length > 0).length;
    stat.createSpan({ text: `段 ${paragraphs}` });
    stat.createSpan({ text: `光标第 ${cursor.line + 1} 行` });

    /* 卡 2：八条体检速览（通用八条规则；报告弹窗与公文体检共用 CheckReportModal） */
    const issues = checkTypo(text);
    const errs = issues.filter((i) => i.level === 'error').length;
    const warns = issues.length - errs;
    const card2 = el.createEl('div', { cls: 'mdquill-card' });
    const head2 = card2.createEl('div', { cls: 'mdquill-card-head' });
    head2.createEl('div', {
      cls: 'mdquill-card-title',
      text: `八条体检${issues.length ? `：${errs} 处需处理 / ${warns} 处建议` : '：通过'}`,
    });
    const btn2 = head2.createEl('button', { text: issues.length ? '看报告' : '再体检', cls: 'mdquill-btn' });
    btn2.addEventListener('click', () => {
      if (mv.file) new CheckReportModal(this.plugin, mv.file, issues).open();
    });

    /* 卡 3：标题树（点击跳转，当前小节高亮） */
    const items = outlineOf(text);
    const card3 = el.createEl('div', { cls: 'mdquill-card' });
    card3.createEl('div', { cls: 'mdquill-card-title', text: `标题树${items.length ? `（${items.length}）` : ''}` });
    if (!items.length) {
      card3.createEl('div', { cls: 'setting-item-description', text: '还没有 # 一级标题。点下方「插入」里的 # 开始。' });
    } else {
      const tree = card3.createEl('div', { cls: 'mdquill-tree' });
      // 当前小节 = 行号 ≤ 光标行号的最后一个标题
      let activeIdx = -1;
      for (let i = 0; i < items.length; i++) if (items[i].line <= cursor.line + 1) activeIdx = i;
      items.forEach((it, i) => {
        const row = tree.createEl('div', {
          cls: `mdquill-tree-item mdquill-h${it.level}${i === activeIdx ? ' active' : ''}`,
          text: it.text,
        });
        row.title = `第 ${it.line} 行 · 点击跳转`;
        row.addEventListener('click', () => {
          editor.setCursor({ line: it.line - 1, ch: 0 });
          editor.scrollIntoView({ from: { line: it.line - 1, ch: 0 }, to: { line: it.line - 1, ch: 0 } }, true);
          editor.focus();
        });
      });
    }

    /* 卡 4：快捷插入（光标处） */
    const card4 = el.createEl('div', { cls: 'mdquill-card' });
    card4.createEl('div', { cls: 'mdquill-card-title', text: '插入（光标处）' });
    const grid = card4.createEl('div', { cls: 'mdquill-btns' });
    const mk = (label: string, snippet: string, tip = ''): void => {
      const b = grid.createEl('button', { text: label, cls: 'mdquill-btn' });
      b.title = tip || snippet;
      b.addEventListener('click', () => {
        editor.replaceSelection(snippet);
        editor.focus();
        this.schedule();
      });
    };
    mk('# 标题', '# ');
    mk('表格 3×3', '| 项目 | 说明 |\n| :--- | :--- |\n|  |  |\n|  |  |', 'md 表格：首行表头，:--- 左对齐 / :---: 居中 / ---: 右对齐');
    mk('引用', '> ');
    mk('代码块', '```\n\n```');
    mk('折叠块', '> [!note] 标题\n> 内容', 'Obsidian 提示块：note/tip/warning 等类型可换');
    mk('待办项', '- [ ] ');
    mk('分隔线', '\n---\n');
    mk('图片占位', '![说明](https://)', '写笔记时留位，导出前替换为真实链接');

    /* 卡 5：空文档引导 */
    if (!st.nonspace) {
      const card5 = el.createEl('div', { cls: 'mdquill-card mdquill-empty-hint' });
      card5.createEl('div', {
        text: '空笔记。直接开始写：标题用 # 开头，段落间空一行。写完后运行「排版体检」，粘贴外来内容前运行「粘贴并净化」。',
      });
    }
  }
}


