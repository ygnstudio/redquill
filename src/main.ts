/**
 * main.ts —— MDQuill 插件入口（v0.1.0）
 *
 * 三处共用同一内核（checker/paste_clean/mdast 均为纯函数，node 可机器校验）：
 *  - 命令面板：排版体检 / 一键修复 / 粘贴并净化 / 清洗选区 / 打开写作面板
 *  - 右侧栏写作面板：字数 / 标点体检速览 / 标题树（点击跳转）/ 快捷插入 / 空文档引导
 *  - 报告弹窗：分级列出问题，点「第 N 行」跳源码定位
 *
 * v0.1 行为裁定（用户拍板）：自动净化粘贴默认关（命令手动触发为主）；体检八条规则全做；
 * 面板五卡；显示名 MDQuill。
 */

import {
  Modal,
  Notice,
  MarkdownView,
  Plugin,
  PluginSettingTab,
  Setting,
  ItemView,
  WorkspaceLeaf,
  type App,
  type TFile,
  type Editor,
} from 'obsidian';
import { cleanPaste } from './paste_clean';
import { checkDocument, fixAll, isFixable, type CheckIssue } from './checker';
import { outlineOf, charStats } from './mdast';
import { sanitizeSettings, DEFAULT_SETTINGS, type MdquillSettings } from './settings_util';

export const VIEW_TYPE_PANEL = 'mdquill-panel';

/* ------------------------------------------------------------------ */
/* 体检报告弹窗（照 RedHead CheckReportModal 泛化）                      */
/* ------------------------------------------------------------------ */

class CheckReportModal extends Modal {
  private plugin: MdquillPlugin;
  private editor: Editor;
  private file: TFile;
  private issues: CheckIssue[];

  constructor(plugin: MdquillPlugin, file: TFile, editor: Editor, issues: CheckIssue[]) {
    super(plugin.app);
    this.plugin = plugin;
    this.file = file;
    this.editor = editor;
    this.issues = issues;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    const errs = this.issues.filter((i) => i.level === 'error').length;
    const warns = this.issues.length - errs;
    contentEl.createEl('h3', {
      text: this.issues.length ? `中文排版体检：${errs} 处需处理，${warns} 处建议` : '排版体检：通过',
    });
    contentEl.createEl('p', {
      text: '机器自查只提示、不修改。error=明显错误，warn=规范建议。点「第 N 行」跳到源码对应位置；可一键修复的项会标注。',
      cls: 'setting-item-description',
    });
    if (!this.issues.length) {
      contentEl.createEl('p', { text: '未发现问题。', cls: 'setting-item-description' });
      return;
    }
    const list = contentEl.createEl('div', { cls: 'mdquill-check-list' });
    for (const it of this.issues) {
      const row = list.createEl('div', { cls: `mdquill-check-item ${it.level}` });
      row.createEl('span', { cls: 'mdquill-check-badge', text: it.level === 'error' ? '需处理' : '建议' });
      row.createEl('span', { cls: 'mdquill-check-msg', text: it.message });
      if (isFixable(it.code)) row.createEl('span', { cls: 'mdquill-check-fix', text: '可一键修复' });
      if (it.line !== undefined) {
        const ln = row.createEl('span', { cls: 'mdquill-check-line', text: `第 ${it.line} 行 ↗` });
        ln.addEventListener('click', () => {
          this.jumpTo(it.line);
          this.close();
        });
      }
    }
  }

  private jumpTo(line: number): void {
    const ed = this.editor;
    const l = Math.max(0, line - 1);
    ed.setCursor({ line: l, ch: 0 });
    ed.scrollIntoView({ from: { line: l, ch: 0 }, to: { line: l, ch: 0 } }, true);
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/* ------------------------------------------------------------------ */
/* 写作面板（五卡：字数 / 体检速览 / 标题树 / 快捷插入 / 空文档引导）        */
/* ------------------------------------------------------------------ */

class MdquillPanelView extends ItemView {
  private plugin: MdquillPlugin;
  private pending: number | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: MdquillPlugin) {
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
    return 'pen-tool';
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
    el.createEl('h4', { text: 'MDQuill 写作面板' });
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

    /* 卡 2：标点体检速览 */
    const issues = checkDocument(text);
    const errs = issues.filter((i) => i.level === 'error').length;
    const warns = issues.length - errs;
    const card2 = el.createEl('div', { cls: 'mdquill-card' });
    const head2 = card2.createEl('div', { cls: 'mdquill-card-head' });
    head2.createEl('div', { cls: 'mdquill-card-title', text: `标点体检${issues.length ? `：${errs} 处需处理 / ${warns} 处建议` : '：通过'}` });
    const btn2 = head2.createEl('button', { text: issues.length ? '看报告' : '再体检', cls: 'mdquill-btn' });
    btn2.addEventListener('click', () => {
      if (mv.file) new CheckReportModal(this.plugin, mv.file, editor, issues).open();
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
      card5.createEl('div', { text: '空笔记。直接开始写：标题用 # 开头，段落间空一行。写完后运行「排版体检」，粘贴外来内容前运行「粘贴并净化」。' });
    }
  }
}

/* ------------------------------------------------------------------ */
/* 设置页                                                              */
/* ------------------------------------------------------------------ */

class MdquillSettingTab extends PluginSettingTab {
  private plugin: MdquillPlugin;

  constructor(app: App, plugin: MdquillPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h3', { text: 'MDQuill 设置' });
    new Setting(containerEl)
      .setName('自动净化粘贴')
      .setDesc('开启后，在笔记编辑器里粘贴来自网页/Word/WPS 的内容会自动清洗格式（仅当剪贴板带 HTML 样式时才处理，纯文本直通）。默认关闭，也可随时用命令「粘贴并净化」。')
      .addToggle((t) => {
        t.setValue(this.plugin.settings.autoClean).onChange(async (v) => {
          this.plugin.settings.autoClean = v;
          await this.plugin.saveSettings();
        });
      });
    containerEl.createEl('p', {
      text: '命令速查：排版体检 / 一键修复排版问题 / 粘贴并净化 / 清洗选区 / 打开写作面板。',
      cls: 'setting-item-description',
    });
  }
}

/* ------------------------------------------------------------------ */
/* 插件主体                                                             */
/* ------------------------------------------------------------------ */

export default class MdquillPlugin extends Plugin {
  settings: MdquillSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.registerView(VIEW_TYPE_PANEL, (leaf) => new MdquillPanelView(leaf, this));
    this.addSettingTab(new MdquillSettingTab(this.app, this));
    this.addRibbonIcon('pen-tool', 'MDQuill：打开写作面板', () => this.openPanel());

    this.addCommand({
      id: 'open-panel',
      name: '打开写作面板（字数/体检速览/标题树/快捷插入）',
      callback: () => this.openPanel(),
    });
    this.addCommand({
      id: 'check',
      name: '排版体检（当前笔记）',
      callback: () => this.runCheck(),
    });
    this.addCommand({
      id: 'fix-all',
      name: '一键修复排版问题（当前笔记，仅无歧义项，逐行可撤销）',
      editorCallback: (editor) => this.runFix(editor),
    });
    this.addCommand({
      id: 'paste-clean',
      name: '粘贴并净化（清洗剪贴板格式后插入光标处）',
      editorCallback: (editor) => void this.pasteClean(editor),
    });
    this.addCommand({
      id: 'clean-selection',
      name: '清洗选区 / 当前段（去行首尾空格与多余空行）',
      editorCallback: (editor) => this.cleanSelection(editor),
    });

    // 自动净化粘贴（默认关；捕获阶段拦截，仅编辑器内、且剪贴板带 html 痕迹才处理）
    this.registerDomEvent(
      document,
      'paste',
      (evt: ClipboardEvent) => {
        if (!this.settings.autoClean) return;
        const target = evt.target as HTMLElement | null;
        if (!target || !target.closest('.cm-content')) return;
        // 找到实际发生粘贴的 md 视图（多窗格时不一定是最新激活的）
        const hit =
          this.app.workspace
            .getLeavesOfType('markdown')
            .map((leaf) => leaf.view as MarkdownView)
            .find((v) => v.contentEl.contains(target)) ?? null;
        if (!hit) return;
        const html = evt.clipboardData?.getData('text/html') ?? '';
        const text = evt.clipboardData?.getData('text/plain') ?? '';
        const cleaned = cleanPaste({ html, text });
        // 无 html（纯文本粘贴）或清洗无变化 → 不拦截
        if (!html || !cleaned || cleaned === (text || '').trim()) return;
        evt.preventDefault();
        hit.editor.replaceSelection(cleaned);
        new Notice('MDQuill：已自动净化粘贴（去格式、压空行）。', 4000);
      },
      { capture: true },
    );
  }

  async loadSettings(): Promise<void> {
    const raw = await this.loadData();
    this.settings = sanitizeSettings(raw);
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /* ---- 面板 ---- */

  openPanel(): void {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_PANEL)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      (existing.view as MdquillPanelView).renderPanel();
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    void leaf.setViewState({ type: VIEW_TYPE_PANEL, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  /* ---- 体检 ---- */

  runCheck(): void {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      new Notice('MDQuill：请先打开一个 md 笔记。', 4000);
      return;
    }
    const issues = checkDocument(mv.editor.getValue());
    new CheckReportModal(this, mv.file, mv.editor, issues).open();
  }

  /** 一键修复：只改有变动的行（replaceRange 逐行，保留 Ctrl+Z 撤销） */
  runFix(editor: Editor): void {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv) return;
    const text = editor.getValue();
    const fixed = fixAll(text);
    if (fixed === text) {
      new Notice('MDQuill：没有可自动修复的问题（只修无歧义项）。', 4000);
      return;
    }
    const oldLines = text.split('\n');
    const newLines = fixed.split('\n');
    let changed = 0;
    const n = Math.min(oldLines.length, newLines.length);
    for (let i = 0; i < n; i++) {
      if (oldLines[i] !== newLines[i]) {
        editor.replaceRange(newLines[i], { line: i, ch: 0 }, { line: i, ch: oldLines[i].length });
        changed++;
      }
    }
    // 行数不变（fix 只动行内），尾部不处理
    new Notice(`MDQuill：已修复 ${changed} 行（Ctrl+Z 可逐行撤销）。`, 5000);
  }

  /* ---- 粘贴清洗 ---- */

  /** 粘贴并净化：读剪贴板（html 优先）→ 清洗 → 替换光标选区 */
  async pasteClean(editor: Editor): Promise<void> {
    let html = '';
    let text = '';
    try {
      const cb = navigator.clipboard;
      if (cb?.read) {
        for (const item of await cb.read()) {
          const t = await item
            .getType('text/html')
            .then((b) => b.text())
            .catch(() => null);
          if (t) html = t;
          const tx = await item
            .getType('text/plain')
            .then((b) => b.text())
            .catch(() => null);
          if (tx) text = tx;
        }
      } else if (cb?.readText) {
        text = await cb.readText();
      }
    } catch {
      /* 读剪贴板被拒（权限/非激活），提示走本地清洗 */
    }
    if (!html && !text) {
      new Notice('MDQuill：读不到剪贴板。请先复制内容，或粘贴后运行「清洗选区 / 当前段」。', 6000);
      return;
    }
    const cleaned = cleanPaste({ html, text });
    if (!cleaned) {
      new Notice('MDQuill：剪贴板中没有可粘贴的文字内容。', 4000);
      return;
    }
    editor.replaceSelection(cleaned);
    new Notice('MDQuill：已清洗插入（去标签样式、行首尾空白、压缩空行）。', 5000);
  }

  /** 清洗选区 / 当前段（不依赖剪贴板） */
  cleanSelection(editor: Editor): void {
    const sel = editor.getSelection();
    if (sel.trim()) {
      editor.replaceSelection(cleanPaste({ text: sel }));
      new Notice('MDQuill：选区已清洗。', 4000);
      return;
    }
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    const cleaned = cleanPaste({ text: line });
    if (cleaned === line) {
      new Notice('MDQuill：当前行本就干净（无行首尾空格/多余空行）。', 4000);
      return;
    }
    editor.replaceRange(cleaned, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
    new Notice('MDQuill：当前行已清洗。', 4000);
  }
}
