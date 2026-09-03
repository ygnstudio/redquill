/**
 * main.ts —— RedQuill 插件壳（预设制 v2）
 * 定位：轻量排版工具。内置公文等预设；用户可复制/新建/编辑自定义预设；
 * 文种骨架走 Obsidian 模板系统（安装模板文件，用 Obsidian 自带的模板插入功能使用）。
 */
import {
  App,
  Editor,
  FuzzySuggestModal,
  ItemView,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  WorkspaceLeaf,
} from 'obsidian';
import { parseDocument, type RedHeadMeta } from './gongwen/mdast';
import { checkDocument, validateDocNumber, type CheckIssue } from './gongwen/checker';
import { buildDocxBlob, type ColophonMode, type LogoImage } from './gongwen/docx_export';
import { renderPreview } from './gongwen/preview';
import {
  BUILTIN_PRESETS,
  PAGE_NUMBER_OPTIONS,
  clonePreset,
  normalizePreset,
  type PageNumberStyle,
  type Preset,
  type StructLayout,
} from './gongwen/format';
import { DEFAULT_SETTINGS, sanitizeSettings, type RedHeadSettings } from './gongwen/settings';
import { GONGWEN_TEMPLATES, TEMPLATE_GROUPS, TEMPLATE_META, toTemplaterSkeleton } from './gongwen/templates';
import { NEW_DOC_ITEMS, buildNewGongwen, type NewDocItem } from './gongwen/templates';
import { cleanPaste } from './paste_clean';
import { lineRole, nextH1, nextH2 } from './gongwen/writeassist';
/* ---- 通用写作层（v1.0.0 合一注入）：八条体检 / 大纲字数 ---- */
/* checkDocument 与 gongwen/checker 同名不同职责：本文件内公文体检用 gongwen 版（默认名），通用八条用别名 checkTypo */
import { checkDocument as checkTypo, fixAll as fixAllTypo } from './checker';
import { outlineOf, charStats } from './mdast';
import { ContextGate } from './context';
import { PreviewView } from './views/preview_view';
import { WriteAssistView } from './views/write_assist_view';
import { RedQuillPanelView } from './views/panel_view';
import { RedQuillSettingTab } from './settings_tab';
import { NewGongwenWizard, CheckReportModal, GongwenFormModal } from './modals';
/* ---- v1.1 编辑器手感：CM6 扩展 + 选区/输入/列表纯函数（editing/ 组） ---- */
import { buildEditingExtensions } from './editing/plugin';
import { blockRangeAt, titleLineRangeAt, wordSegmentAt } from './editing/segments';
import { inlineReplace, type InlineReplace } from './editing/inline';
import { curlyWrapDelta } from './editing/quotes';
import { breakList, listToPlain } from './editing/listops';
/* CM6 类型：Obsidian 运行时以内置副本 resolve（esbuild 已 external，勿在 main.js 重复打包） */
import type { EditorView } from '@codemirror/view';
import { EditorSelection } from '@codemirror/state';

/* 16 文种模板常量与新建向导纯函数在 templates.ts（v0.11.0 抽出）；re-export 保持既有入口兼容 */
export { GONGWEN_TEMPLATES, toTemplaterSkeleton } from './gongwen/templates';

export const VIEW_TYPE_PREVIEW = 'redquill-preview';
/** 写作辅助面板（v0.11.0）：右侧栏，跟随光标做角色诊断与快捷插入 */
export const VIEW_TYPE_WRITEASSIST = 'redquill-write';
/** 通用写作面板（v1.0.0 合一注入，原 MDQuill 五卡）：字数/体检速览/标题树/快捷插入/空引导 */
export const VIEW_TYPE_PANEL = 'redquill-panel';

/* RedHeadSettings 结构 / DEFAULT_SETTINGS / sanitizeSettings 见 settings_util.ts（v0.8.0 抽离，可测） */

/* ------------------------------------------------------------------ */
/* 预览视图                                                             */
/* ------------------------------------------------------------------ */

export { applyFrontmatter } from './frontmatter';

export interface RedQuillSettings extends RedHeadSettings {
  autoClean: boolean;
}


export class RedQuillPlugin extends Plugin {
  settings: RedQuillSettings = { ...DEFAULT_SETTINGS, autoClean: false };
  /** 公文上下文手动覆盖闸门（会话级，不入 data.json） */
  contextGate = new ContextGate();

  async onload(): Promise<void> {
    await this.loadSettings();

    this.registerView(VIEW_TYPE_PREVIEW, (leaf) => new PreviewView(leaf, this));
    this.registerView(VIEW_TYPE_WRITEASSIST, (leaf) => new WriteAssistView(leaf, this));
    this.registerView(VIEW_TYPE_PANEL, (leaf) => new RedQuillPanelView(leaf, this));
    /* v1.1 CM6 真扩展（④双击中文词段 / ⑤中文语境引号自动成对跳越）：每个 md 编辑器生效，纯逻辑在 editing/ 可校验 */
    this.registerEditorExtension(buildEditingExtensions());
    this.addSettingTab(new RedQuillSettingTab(this.app, this));
    this.addRibbonIcon('file-text', '排版预览', () => this.openPreview());
    this.addRibbonIcon('pen-tool', '写作辅助（跟随光标诊断标题层级）', () => this.openWriteAssistBtn());

    this.addCommand({ id: 'open-preview', name: '打开排版预览', callback: () => this.openPreview() });
    this.addCommand({
      id: 'open-writeassist',
      name: '打开写作辅助面板（标题层级诊断与快捷插入）',
      callback: () => this.openWriteAssistBtn(),
    });
    this.addCommand({
      id: 'open-panel',
      name: '打开通用写作面板（字数/八条体检速览/标题树/快捷插入）',
      callback: () => this.openPanel(),
    });
    this.addCommand({
      id: 'new-gongwen-doc',
      name: '新建公文（选文种 → 输标题，默认发文机关自动预填）',
      callback: () => new NewGongwenWizard(this).open(),
    });
    this.addCommand({
      id: 'paste-clean',
      name: '粘贴并净化（清洗剪贴板格式后插入光标处，公文/通用同引擎）',
      editorCallback: (editor) => void this.pasteClean(editor),
    });
    this.addCommand({
      id: 'clean-selection',
      name: '清洗选区 / 当前段（去行首尾空格与多余空行）',
      editorCallback: (editor) => this.cleanSelection(editor),
    });
    this.addCommand({
      id: 'gongwen-check',
      name: '公文排版体检（当前笔记）',
      callback: () => this.runCheckOnActive(),
    });
    this.addCommand({
      id: 'export-docx',
      name: '导出当前笔记为 docx',
      callback: () => this.exportActiveDocx(),
    });
    this.addCommand({
      id: 'install-gongwen-templates',
      name: '安装公文模板到模板文件夹（16 文种，已装 Templater 时附带弹窗版）',
      callback: () => this.installGongwenTemplates(),
    });
    /* ---- 通用写作层命令（v1.0.0 合一注入） ---- */
    this.addCommand({
      id: 'check-typo',
      name: '排版体检·通用八条（当前笔记：重复标点/半角混用/中英空格/括号引号/直引号/叠字/控制字符/全角空格）',
      callback: () => this.runCheckTypoOnActive(),
    });
    this.addCommand({
      id: 'fix-typo',
      name: '一键修复排版·通用八条（当前笔记，仅无歧义项，逐行可撤销）',
      editorCallback: (editor) => this.runFixTypo(editor),
    });
    this.addCommand({
      id: 'cycle-context',
      name: '切换公文模式（自动判定 → 强制公文 → 强制通用，循环；会话级，切回自动后按 frontmatter 重判）',
      callback: () => this.cycleContext(),
    });
    /* ---- v1.1 编辑器手感命令（④光标与选区 / ⑤行内格式与引号 / ⑦列表增强）---- */
    this.addCommand({
      id: 'select-block',
      name: '选中当前段 / 标题行（md 块语义：连续列表/引用不拆，标题行只选标题本身）',
      editorCallback: (editor) => this.selectBlock(editor),
    });
    this.addCommand({
      id: 'select-word-segment',
      name: '选中光标处词段（中文按语义边界：中/英/数分流，标点不粘连）',
      editorCallback: (editor) => this.selectWordSegment(editor),
    });
    this.addCommand({
      id: 'quote-wrap',
      name: '中文弯引号包裹选区（无选区则插入一对，光标居中）',
      editorCallback: (editor) => this.quoteWrap(editor),
    });
    for (const [id, mark, label] of [
      ['bold', '**', '加粗'],
      ['italic', '*', '斜体'],
      ['strike', '~~', '删除线'],
      ['highlight', '==', '高亮'],
      ['code', '`', '行内代码'],
    ] as const) {
      this.addCommand({
        id: `toggle-inline-${id}`,
        name: `行内格式：${label}（已有同标记则剥离，无选区插入空对）`,
        editorCallback: (editor) => this.toggleInlineMark(editor, mark),
      });
    }
    this.addCommand({
      id: 'break-list',
      name: '打断列表（光标在列表项行尾时跳出回正文段落）',
      editorCallback: (editor) => this.breakListAt(editor),
    });
    this.addCommand({
      id: 'list-to-plain',
      name: '列表转纯文本（选区或当前段逐行去列表前缀，保留缩进）',
      editorCallback: (editor) => this.listToPlainAt(editor),
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
        new Notice('RedQuill：已自动净化粘贴（去格式、压空行）。', 4000);
      },
      { capture: true },
    );
  }

  async loadSettings(): Promise<void> {
    const raw = (await this.loadData()) as Record<string, unknown> | null;
    const s = sanitizeSettings(raw, (k) => !!GONGWEN_TEMPLATES[k]);
    this.settings = { ...s, autoClean: raw?.autoClean === true };
    if (!this.allPresets().some((p) => p.id === this.settings.activePresetId)) {
      this.settings.activePresetId = BUILTIN_PRESETS[0].id;
    }
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  /** 全部预设：内置（含用户修改覆盖）+ 自定义 */
  allPresets(): Preset[] {
    const merged = BUILTIN_PRESETS.map((b) => this.settings.builtinOverrides.find((o) => o.id === b.id) ?? b);
    return [...merged, ...this.settings.customPresets];
  }

  /** 当前活动预设（缺失时回落第一个内置） */
  activePreset(): Preset {
    return this.allPresets().find((p) => p.id === this.settings.activePresetId) ?? BUILTIN_PRESETS[0];
  }

  /** 结构层位置参数包（落款对齐 + 各要素左空/右空 → 预览与 docx 导出共用） */
  structLayout(): StructLayout {
    const s = this.settings;
    return {
      signatureAlign: s.signatureAlign,
      signatureRightChars: s.signatureRightChars,
      signatureLeftChars: s.signatureLeftChars,
      attachIndentChars: s.attachIndentChars,
      notesIndentChars: s.notesIndentChars,
      colophonLeftChars: s.colophonLeftChars,
      printRightChars: s.printRightChars,
      copiesRightChars: s.copiesRightChars,
    };
  }

  /** 内置预设的修改覆盖项（无则未修改过） */
  builtinOverrideFor(id: string): Preset | undefined {
    return this.settings.builtinOverrides.find((o) => o.id === id);
  }

  /** 保存内置预设的修改（写入覆盖层）并刷新预览 */
  async saveBuiltinOverride(p: Preset): Promise<void> {
    const i = this.settings.builtinOverrides.findIndex((x) => x.id === p.id);
    if (i !== -1) this.settings.builtinOverrides[i] = p;
    else this.settings.builtinOverrides.push(p);
    await this.saveSettings();
    this.refreshPreviewViews();
  }

  /** 内置预设重置为出厂默认（删除覆盖层） */
  async resetBuiltinPreset(id: string): Promise<void> {
    this.settings.builtinOverrides = this.settings.builtinOverrides.filter((o) => o.id !== id);
    await this.saveSettings();
    this.refreshPreviewViews();
  }

  /** 保存自定义预设并刷新预览 */
  async saveCustomPreset(p: Preset): Promise<void> {
    const i = this.settings.customPresets.findIndex((x) => x.id === p.id);
    if (i !== -1) this.settings.customPresets[i] = p;
    await this.saveSettings();
    this.refreshPreviewViews();
  }

  /** 设置变更后刷新已打开的预览面板 */
  refreshPreviewViews(): void {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_PREVIEW)) {
      (leaf.view as PreviewView).render();
    }
  }

  /* ------------------------------------------------------------------ */
  /* v0.11.0 写作提效：向导 / 粘贴清洗 / 写作辅助面板                        */
  /* ------------------------------------------------------------------ */

  /** 新建公文向导落盘（见 NewGongwenDraftModal）：默认机关/标题/当年替换 → 当前文件夹建文件 → 打开 */
  async createGongwenDoc(item: NewDocItem, title: string): Promise<void> {
    const { fileName, content } = buildNewGongwen({
      templateKey: item.key,
      title: title.trim() || undefined,
      agency: this.settings.defaultAgency,
    });
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    const dir = mv?.file?.parent?.path ?? '';
    const exists = async (pp: string): Promise<boolean> => {
      try {
        return await this.app.vault.adapter.exists(pp);
      } catch {
        return false;
      }
    };
    let p = dir ? `${dir}/${fileName}` : fileName;
    const base = fileName.replace(/\.md$/i, '');
    for (let i = 2; await exists(p); i++) p = dir ? `${dir}/${base} ${i}.md` : `${base} ${i}.md`;
    const f = await this.app.vault.create(p, content);
    const leaf = this.app.workspace.getLeaf('tab');
    await leaf.openFile(f);
  }

  /** 粘贴为公文正文：读剪贴板（html 优先）→ 清洗 → 替换光标选区 */
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
      new Notice('RedQuill：读不到剪贴板。请先复制内容，或粘贴后运行「清洗选区 / 当前段」。', 6000);
      return;
    }
    const cleaned = cleanPaste({ html, text });
    if (!cleaned) {
      new Notice('RedQuill：剪贴板中没有可粘贴的文字内容。', 4000);
      return;
    }
    editor.replaceSelection(cleaned);
    new Notice('RedQuill：已清洗插入（去行首尾空格、压缩多余空行）。', 5000);
  }

  /** 清洗选区 / 当前段（不依赖剪贴板：把选中文本或光标所在行按公文规则规整） */
  cleanSelection(editor: Editor): void {
    const sel = editor.getSelection();
    if (sel.trim()) {
      editor.replaceSelection(cleanPaste({ text: sel }));
      new Notice('RedQuill：选区已清洗。', 4000);
      return;
    }
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    const cleaned = cleanPaste({ text: line });
    if (cleaned === line) {
      new Notice('RedQuill：当前行本就干净（无行首尾空格/多余空行）。', 4000);
      return;
    }
    editor.replaceRange(cleaned, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
    new Notice('RedQuill：当前行已清洗。', 4000);
  }

  /* ------------------------------------------------------------------ */
  /* v1.1 编辑器手感命令实现（④⑤⑦）：纯函数 delta → CM6 dispatch 单事务      */
  /* ------------------------------------------------------------------ */

  /** 取 CM6 EditorView：Obsidian 1.4+ 编辑器内核即 CM6（registerEditorExtension 生效的前提），Editor 实例上带非官方 cm 桥 */
  private cmOf(editor: Editor): EditorView | null {
    const cm = (editor as unknown as { cm?: EditorView }).cm;
    return cm && typeof cm.dispatch === 'function' ? cm : null;
  }

  /** ④ 选中当前段 / 标题行：空行界定 md 块，标题行只选标题本身（纯选择事务，不改内容） */
  private selectBlock(editor: Editor): void {
    const cm = this.cmOf(editor);
    if (!cm) {
      new Notice('RedQuill：请在 Markdown 编辑器中使用。', 4000);
      return;
    }
    const text = cm.state.doc.toString();
    const cur = cm.state.selection.main.head;
    const [s, e] = titleLineRangeAt(text, blockRangeAt(text, cur), cur);
    if (s >= e) {
      new Notice('RedQuill：光标在空行上，无可选中内容。', 3000);
      return;
    }
    cm.dispatch({ selection: EditorSelection.single(s, e), scrollIntoView: true });
  }

  /** ④ 选中光标处词段（命令版；双击自动版走 buildEditingExtensions）：中/英/数分流、标点不粘连 */
  private selectWordSegment(editor: Editor): void {
    const cm = this.cmOf(editor);
    if (!cm) {
      new Notice('RedQuill：请在 Markdown 编辑器中使用。', 4000);
      return;
    }
    const text = cm.state.doc.toString();
    const seg = wordSegmentAt(text, cm.state.selection.main.head);
    if (!seg) {
      new Notice('RedQuill：光标不在词段上（空白/标点区）。', 3000);
      return;
    }
    cm.dispatch({ selection: EditorSelection.single(seg[0], seg[1]), scrollIntoView: true });
  }

  /** ⑤ 中文弯引号包裹选区（无选区 → 插 “” 光标居中）；自动成对走扩展，本命令供手动兜底/快捷键 */
  private quoteWrap(editor: Editor): void {
    const cm = this.cmOf(editor);
    if (!cm) {
      new Notice('RedQuill：请在 Markdown 编辑器中使用。', 4000);
      return;
    }
    const text = cm.state.doc.toString();
    const { from, to } = cm.state.selection.main;
    const d = curlyWrapDelta(text, from, to);
    cm.dispatch({
      changes: { from: d.from, to: d.to, insert: d.insert },
      selection: EditorSelection.single(d.anchor, d.head),
      scrollIntoView: true,
    });
  }

  /** ⑤ 行内格式 toggle（mark 由调用方指定：** * ~~ == `）：有同标记剥离、无选区插空对、否则包裹——单事务一次 undo */
  private toggleInlineMark(editor: Editor, mark: string): void {
    const cm = this.cmOf(editor);
    if (!cm) {
      new Notice('RedQuill：请在 Markdown 编辑器中使用。', 4000);
      return;
    }
    const text = cm.state.doc.toString();
    const { from, to } = cm.state.selection.main;
    const d = inlineReplace(text, from, to, mark);
    cm.dispatch({
      changes: { from: d.from, to: d.to, insert: d.insert },
      selection: EditorSelection.single(d.anchor, d.head),
      scrollIntoView: true,
    });
  }

  /** ⑦ 打断列表：光标在列表项行尾 → 行尾插空行跳出列表（单事务一次 undo）；不满足条件提示 */
  private breakListAt(editor: Editor): void {
    const cm = this.cmOf(editor);
    if (!cm) {
      new Notice('RedQuill：请在 Markdown 编辑器中使用。', 4000);
      return;
    }
    const text = cm.state.doc.toString();
    const cur = cm.state.selection.main.head;
    const d = breakList(text, cur);
    if (!d) {
      new Notice('RedQuill：光标需在列表项行尾（且行内无待续内容）才能打断。', 4000);
      return;
    }
    cm.dispatch({
      changes: { from: d.from, to: d.to, insert: d.insert },
      selection: EditorSelection.single(d.cursor),
      scrollIntoView: true,
    });
  }

  /** ⑦ 列表转纯文本：选区存在则作用于选区；否则作用于光标所在 md 块（空行界定） */
  private listToPlainAt(editor: Editor): void {
    const cm = this.cmOf(editor);
    if (!cm) {
      new Notice('RedQuill：请在 Markdown 编辑器中使用。', 4000);
      return;
    }
    const text = cm.state.doc.toString();
    const { from, to } = cm.state.selection.main;
    const s = from === to ? blockRangeAt(text, to)[0] : from;
    const e = from === to ? blockRangeAt(text, to)[1] : to;
    if (s >= e) {
      new Notice('RedQuill：没有可处理的列表内容。', 3000);
      return;
    }
    const out = listToPlain(text.slice(s, e));
    if (out === text.slice(s, e)) {
      new Notice('RedQuill：选区/当前段不含列表标记，无需转换。', 3000);
      return;
    }
    cm.dispatch({
      changes: { from: s, to: e, insert: out },
      selection: EditorSelection.single(s),
      scrollIntoView: true,
    });
  }

  /** 打开写作辅助面板：已有则复用并显示，否则在右侧栏新建（ribbon/命令/设置页共用） */
  openWriteAssistBtn(): void {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_WRITEASSIST)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      (existing.view as WriteAssistView).renderPanel();
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    void leaf.setViewState({ type: VIEW_TYPE_WRITEASSIST, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  /** 打开通用写作面板（五卡）：已有则复用并显示，否则在右侧栏新建 */
  openPanel(): void {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_PANEL)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      (existing.view as RedQuillPanelView).renderPanel();
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    void leaf.setViewState({ type: VIEW_TYPE_PANEL, active: true });
    this.app.workspace.revealLeaf(leaf);
  }

  /**
   * 打开预览面板（0.3.3：不再走侧边栏）。
   * - split（默认）：与当前 md 笔记左右分屏；找不到 md 笔记时回落新标签页
   * - tab：主工作区新标签页
   */
  private async openPreview(): Promise<void> {
    const { workspace } = this.app;
    // 先记住当前编辑的笔记：预览 leaf 激活后 getActiveViewOfType 会取不到
    const mv = workspace.getActiveViewOfType(MarkdownView);
    const currentFile = mv?.file ?? null;

    // 已有预览面板：直接复用，不重复开
    const existing = workspace.getLeavesOfType(VIEW_TYPE_PREVIEW)[0];
    if (existing) {
      workspace.revealLeaf(existing);
      const view = existing.view as PreviewView;
      if (currentFile && view.file !== currentFile) {
        view.file = currentFile;
        await view.render();
      }
      return;
    }

    let leaf: WorkspaceLeaf;
    if (this.settings.previewOpenMode === 'split') {
      // getLeaf('split', 'vertical')：在当前 leaf 右侧新建分屏（无 md 时回落新标签页）
      const hasMd = mv || workspace.getLeavesOfType('markdown').length > 0;
      leaf = hasMd ? workspace.getLeaf('split', 'vertical') : workspace.getLeaf(true);
    } else {
      leaf = workspace.getLeaf(true);
    }
    await leaf.setViewState({ type: VIEW_TYPE_PREVIEW, active: true });
    workspace.revealLeaf(leaf);

    if (currentFile) {
      const view = leaf.view as PreviewView;
      if (view.file !== currentFile) {
        view.file = currentFile;
        await view.render();
      }
    }
  }

  async exportActiveDocx(): Promise<void> {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      new Notice('RedQuill：当前没有打开的 md 笔记。');
      return;
    }
    const md = await this.app.vault.cachedRead(mv.file);
    const { meta, blocks, attach } = parseDocument(md);
    const warn = validateDocNumber(meta.docNumber);
    if (warn) new Notice(`RedQuill：${warn}`, 8000);
    const { logo, seal } = await this.resolveLogo(meta);
    const blob = await buildDocxBlob(blocks, this.activePreset(), {
      firstSentenceBold: this.settings.firstSentenceBold,
      meta,
      logo,
      seal,
      attach,
      colophonMode: this.settings.colophonMode,
      struct: this.structLayout(),
    });
    const path = mv.file.path.replace(/\.md$/i, '.docx');
    await this.app.vault.adapter.writeBinary(path, await blob.arrayBuffer());
    new Notice(`RedQuill：已导出 ${path}`);
  }

  /** 公文排版体检：读当前笔记 → 有错开报告弹窗，无错 Notice 通过（命令与预览按钮共用） */
  async openCheck(file: TFile): Promise<void> {
    const md = await this.app.vault.cachedRead(file);
    const issues = checkDocument(md);
    if (!issues.length) {
      new Notice('RedQuill：排版体检通过，未发现问题。', 4000);
      return;
    }
    new CheckReportModal(this, file, issues).open();
  }

  /** 命令入口：体检当前打开的 md 笔记 */
  private async runCheckOnActive(): Promise<void> {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      new Notice('RedQuill：当前没有打开的 md 笔记。');
      return;
    }
    await this.openCheck(mv.file);
  }

  /* ---- 通用八条体检 / 修复 / 上下文切换（v1.0.0 合一注入） ---- */

  /** 通用八条体检：读当前笔记 → issues 弹 CheckReportModal（与公文体检共用弹窗） */
  private runCheckTypoOnActive(): void {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      new Notice('RedQuill：当前没有打开的 md 笔记。');
      return;
    }
    const issues = checkTypo(mv.editor.getValue());
    if (!issues.length) {
      new Notice('RedQuill：通用八条体检通过，未发现问题。', 4000);
      return;
    }
    new CheckReportModal(this, mv.file, issues).open();
  }

  /** 一键修复通用八条：只改有变动的行（replaceRange 逐行，保留 Ctrl+Z 撤销） */
  private runFixTypo(editor: Editor): void {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv) return;
    const text = editor.getValue();
    const fixed = fixAllTypo(text);
    if (fixed === text) {
      new Notice('RedQuill：没有可自动修复的问题（只修无歧义项）。', 4000);
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
    new Notice(`RedQuill：已修复 ${changed} 行（Ctrl+Z 可逐行撤销）。`, 5000);
  }

  /** 上下文三态循环：auto（frontmatter 自动判定）→ 强制公文 → 强制通用 → auto */
  private cycleContext(): void {
    const next: 'auto' | 'gongwen' | 'generic' =
      this.contextGate.mode === 'auto' ? 'gongwen' : this.contextGate.mode === 'gongwen' ? 'generic' : 'auto';
    this.contextGate.setMode(next);
    const label = next === 'auto' ? '自动判定（按 frontmatter 是否含公文标记）' : next === 'gongwen' ? '强制公文' : '强制通用';
    new Notice(
      `RedQuill：上下文 → ${label}${next === 'auto' ? '' : '。再次运行本命令可切回自动'}`,
      5000,
    );
  }

  /* ---- v0.8.0 设置导出 / 导入（随库同步，多机换机同版式） ---- */

  /** 导出全部设置到 vault 根 JSON：{app, kind, version, exportedAt, settings} */
  async exportSettingsJson(): Promise<void> {
    const d = new Date();
    const p2 = (n: number) => String(n).padStart(2, '0');
    const name = `redquill-settings-${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}-${p2(d.getHours())}${p2(d.getMinutes())}${p2(d.getSeconds())}.json`;
    const payload = {
      app: 'redquill',
      kind: 'redquill-settings',
      version: 1,
      exportedAt: d.toISOString(),
      settings: this.settings,
    };
    try {
      await this.app.vault.create(name, JSON.stringify(payload, null, 2));
      new Notice(`RedQuill：已导出 ${name}（vault 根目录，随库同步可换机导入）`, 6000);
    } catch (e) {
      new Notice(`RedQuill：导出失败：${e instanceof Error ? e.message : String(e)}`, 6000);
    }
  }

  /** vault 内 redquill-settings-*.json 备份文件（按修改时间倒序） */
  backupFiles(): TFile[] {
    return this.app.vault
      .getFiles()
      .filter((f) => /^redquill-settings-.*\.json$/i.test(f.name))
      .sort((a, b) => b.stat.mtime - a.stat.mtime);
  }

  /** 从 JSON 文本导入并清洗（兼容整包 / 裸 settings / data.json 三种形状）；返回导入的自定义预设数 */
  async importSettingsText(json: string, fromName: string): Promise<number> {
    const raw = JSON.parse(json) as any;
    if (!raw || typeof raw !== 'object') throw new Error('JSON 顶层不是对象');
    const s = (raw.settings && typeof raw.settings === 'object' && raw.kind === 'redquill-settings' ? raw.settings : raw) as Record<string, unknown> | null;
    const merged = sanitizeSettings(
      { ...s, activePresetId: s?.activePresetId ?? this.settings.activePresetId },
      (k) => !!GONGWEN_TEMPLATES[k],
    );
    this.settings = { ...merged, autoClean: s?.autoClean === true };
    if (!this.allPresets().some((p) => p.id === this.settings.activePresetId)) {
      this.settings.activePresetId = BUILTIN_PRESETS[0].id;
    }
    await this.saveSettings();
    this.refreshPreviewViews();
    new Notice(`RedQuill：已从 ${fromName} 导入设置（${merged.customPresets.length} 个自定义预设）`, 6000);
    return merged.customPresets.length;
  }

  /** 公文属性中文表单入口：预填当前笔记已有 rh-* 值 */
  private async openFormModal(): Promise<void> {
    const mv = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      new Notice('RedQuill：当前没有打开的 md 笔记。');
      return;
    }
    const md = await this.app.vault.cachedRead(mv.file);
    const { meta } = parseDocument(md);
    new GongwenFormModal(this, meta).open();
  }

  /**
   * 解析图片类要素：rh-logo（机关标志，红头）、rh-seal（印章，落款，v0.10.0）。
   * vault 路径 → 预览 URL（getResourcePath）+ docx 二进制；文件缺失/读取失败 Notice 提示按无图处理（不阻断）。
   */
  async resolveLogo(meta: RedHeadMeta): Promise<{ logoUrl?: string; logo?: LogoImage; sealUrl?: string; seal?: LogoImage }> {
    const out: { logoUrl?: string; logo?: LogoImage; sealUrl?: string; seal?: LogoImage } = {};
    const readImg = async (path: string, key: 'logo' | 'seal'): Promise<boolean> => {
      const p = path?.trim();
      if (!p) return false;
      try {
        if (!(await this.app.vault.adapter.exists(p))) {
          new Notice(`RedQuill：rh-${key} 指向的文件不存在：${p}`);
          return false;
        }
        const ext = /\.(jpe?g)$/i.test(p) ? 'jpg' : 'png';
        const data = await this.app.vault.adapter.readBinary(p);
        if (key === 'logo') {
          out.logoUrl = this.app.vault.adapter.getResourcePath(p);
          out.logo = { data, ext };
        } else {
          out.sealUrl = this.app.vault.adapter.getResourcePath(p);
          out.seal = { data, ext };
        }
        return true;
      } catch (e) {
        new Notice(`RedQuill：rh-${key} 读取失败：${e instanceof Error ? e.message : String(e)}`);
        return false;
      }
    };
    await readImg(meta.logo ?? '', 'logo');
    await readImg(meta.seal ?? '', 'seal');
    return out;
  }

  /** 检测模板文件夹：核心模板插件 → Templater → 默认 templates */
  async templateFolder(): Promise<string> {
    const anyApp = this.app as any;
    const core = anyApp.internalPlugins?.getEnabledPluginById?.('templates')?.options?.folder
      ?? anyApp.internalPlugins?.getPluginById?.('templates')?.instance?.options?.folder;
    if (core) return core;
    try {
      const data = JSON.parse(await this.app.vault.adapter.read('.obsidian/plugins/templater-obsidian/data.json'));
      if (data?.templates_folder) return data.templates_folder;
    } catch {
      /* 未装 Templater，忽略 */
    }
    return 'templates';
  }

  /** 检测 Templater 是否已启用（决定是否附带写入弹窗版模板） */
  isTemplaterInstalled(): boolean {
    const anyApp = this.app as any;
    return !!anyApp.plugins?.plugins?.['templater-obsidian'];
  }

  /**
   * 把公文骨架 md 写进模板文件夹（已存在的不覆盖），返回安装结果。
   * 已启用 Templater 时，同名「(弹窗)」版同时写入：插入时弹窗输入标题/机关/字号，落款日期自动。
   */
  async installTemplates(keys: string[]): Promise<{
    created: number;
    skipped: number;
    tpCreated: number;
    tpSkipped: number;
    folder: string;
  }> {
    const folder = await this.templateFolder();
    const adapter = this.app.vault.adapter;
    if (!(await adapter.exists(folder))) await adapter.mkdir(folder);
    const withTp = this.isTemplaterInstalled();
    let created = 0;
    let skipped = 0;
    let tpCreated = 0;
    let tpSkipped = 0;
    for (const key of keys) {
      const skeleton = GONGWEN_TEMPLATES[key];
      if (!skeleton) continue;
      const path = `${folder}/${key}.md`;
      if (await adapter.exists(path)) {
        skipped++;
      } else {
        await this.app.vault.create(path, skeleton);
        created++;
      }
      if (withTp) {
        const tpPath = `${folder}/${key}(弹窗).md`;
        if (await adapter.exists(tpPath)) {
          tpSkipped++;
        } else {
          await this.app.vault.create(tpPath, toTemplaterSkeleton(skeleton));
          tpCreated++;
        }
      }
    }
    return { created, skipped, tpCreated, tpSkipped, folder };
  }

  /** 命令入口：安装全部公文模板 */
  private async installGongwenTemplates(): Promise<void> {
    const r = await this.installTemplates(Object.keys(GONGWEN_TEMPLATES));
    const tpPart = r.tpCreated ? `；弹窗版 ${r.tpCreated} 个${r.tpSkipped ? `、跳过 ${r.tpSkipped} 个` : ''}` : '';
    new Notice(
      `RedQuill：模板文件夹「${r.folder}」新建 ${r.created} 个${r.skipped ? `、跳过已存在 ${r.skipped} 个` : ''}${tpPart}。` +
        '使用：命令面板搜「插入模板」（或 Templater）选择公文模板。',
      8000,
    );
  }
}

export default RedQuillPlugin;
