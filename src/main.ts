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

/* 16 文种模板常量与新建向导纯函数在 templates.ts（v0.11.0 抽出）；re-export 保持既有入口兼容 */
export { GONGWEN_TEMPLATES, toTemplaterSkeleton } from './gongwen/templates';

export const VIEW_TYPE_PREVIEW = 'redquill-preview';
/** 写作辅助面板（v0.11.0）：右侧栏，跟随光标做角色诊断与快捷插入 */
export const VIEW_TYPE_WRITEASSIST = 'redquill-write';

/* RedHeadSettings 结构 / DEFAULT_SETTINGS / sanitizeSettings 见 settings_util.ts（v0.8.0 抽离，可测） */

/* ------------------------------------------------------------------ */
/* 预览视图                                                             */
/* ------------------------------------------------------------------ */

class PreviewView extends ItemView {
  private plugin: RedQuillPlugin;
  /** 当前预览的笔记（openPreview 在 leaf 激活前捕获后写入） */
  file: TFile | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: RedQuillPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_PREVIEW;
  }
  getDisplayText(): string {
    return '排版预览';
  }
  getIcon(): string {
    return 'file-text';
  }

  async onOpen(): Promise<void> {
    this.render();
    this.registerEvent(
      this.plugin.app.workspace.on('active-leaf-change', async () => {
        const mv = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
        if (mv?.file && mv.file !== this.file) {
          this.file = mv.file;
          await this.render();
        }
      }),
    );
  }

  async render(): Promise<void> {
    const mv = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
    if (mv?.file) this.file = mv.file;
    const content = this.contentEl;
    content.empty();

    const bar = content.createEl('div', { cls: 'redquill-bar' });
    const select = bar.createEl('select', { cls: 'dropdown' });
    for (const p of this.plugin.allPresets()) {
      select.createEl('option', { value: p.id, text: p.name }).selected = p.id === this.plugin.settings.activePresetId;
    }
    select.addEventListener('change', async () => {
      this.plugin.settings.activePresetId = select.value;
      await this.plugin.saveSettings();
      await this.render();
    });

    const boldLabel = bar.createEl('label', { cls: 'redquill-toggle' });
    const boldCheck = boldLabel.createEl('input', { type: 'checkbox' });
    boldCheck.checked = this.plugin.settings.firstSentenceBold;
    boldLabel.createEl('span', { text: '首句标粗' });
    boldCheck.addEventListener('change', async () => {
      this.plugin.settings.firstSentenceBold = boldCheck.checked;
      await this.plugin.saveSettings();
      await this.render();
    });

    const btn = bar.createEl('button', { text: '导出 docx', cls: 'mod-cta' });
    btn.addEventListener('click', () => this.exportDocx());

    const checkBtn = bar.createEl('button', { text: '体检' });
    checkBtn.addEventListener('click', () => {
      if (this.file) void this.plugin.openCheck(this.file);
    });

    const pdfBtn = bar.createEl('button', { text: '打印 / 存为 PDF' });
    pdfBtn.addEventListener('click', () => this.printPdf());

    const paper = content.createEl('div', { cls: 'redquill-paper' });

    if (!this.file) {
      paper.createEl('p', { text: '打开一个 md 笔记后自动预览。' });
      return;
    }
    const md = await this.plugin.app.vault.cachedRead(this.file);
    const { meta, blocks, attach } = parseDocument(md);
    const { logoUrl, sealUrl } = await this.plugin.resolveLogo(meta);
    paper.innerHTML = renderPreview(blocks, this.plugin.activePreset(), {
      firstSentenceBold: this.plugin.settings.firstSentenceBold,
      meta,
      logoUrl,
      sealUrl,
      attach,
      struct: this.plugin.structLayout(),
    });
  }

  private async exportDocx(): Promise<void> {
    if (!this.file) {
      new Notice('RedQuill：没有打开的笔记。');
      return;
    }
    const md = await this.plugin.app.vault.cachedRead(this.file);
    const { meta, blocks, attach } = parseDocument(md);
    const warn = validateDocNumber(meta.docNumber);
    if (warn) new Notice(`RedQuill：${warn}`, 8000);
    const { logo, seal } = await this.plugin.resolveLogo(meta);
    const blob = await buildDocxBlob(blocks, this.plugin.activePreset(), {
      firstSentenceBold: this.plugin.settings.firstSentenceBold,
      meta,
      logo,
      seal,
      attach,
      colophonMode: this.plugin.settings.colophonMode,
      struct: this.plugin.structLayout(),
    });
    const path = this.file.path.replace(/\.md$/i, '.docx');
    await this.plugin.app.vault.adapter.writeBinary(path, await blob.arrayBuffer());
    new Notice(`RedQuill：已导出 ${path}`);
  }

  /**
   * M3 PDF：预览即真相源——把预览面板同一份 renderPreview HTML 注入隐藏 iframe，
   * @page A4 零边距（.rg-page 自带页边距 padding），走 Electron 打印管线「另存为 PDF」。
   */
  private async printPdf(): Promise<void> {
    if (!this.file) {
      new Notice('RedQuill：没有打开的笔记。');
      return;
    }
    const md = await this.plugin.app.vault.cachedRead(this.file);
    const { meta, blocks, attach } = parseDocument(md);
    const { logoUrl, sealUrl } = await this.plugin.resolveLogo(meta);
    const inner = renderPreview(blocks, this.plugin.activePreset(), {
      firstSentenceBold: this.plugin.settings.firstSentenceBold,
      meta,
      logoUrl,
      sealUrl,
      attach,
      struct: this.plugin.structLayout(),
    });
    const safeName = this.file.basename.replace(/[<>&"]/g, '');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safeName}</title><style>
@page { size: A4; margin: 0; }
html, body { margin: 0; padding: 0; background: #fff; }
.rg-page { min-height: auto; }
</style></head><body>${inner}</body></html>`;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed; right:0; bottom:0; width:1px; height:1px; border:0; opacity:0;';
    iframe.srcdoc = html;
    iframe.addEventListener('load', () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        window.setTimeout(() => iframe.remove(), 60_000);
      }
    });
    document.body.appendChild(iframe);
    new Notice('RedQuill：打印对话框中选「另存为 PDF」即可（PDF 与预览零差异）。', 6000);
  }

  async onClose(): Promise<void> {}
}

/* ------------------------------------------------------------------ */
/* 设置页：活动预设 + 预设管理（复制/新建/编辑/删除）                    */
/* ------------------------------------------------------------------ */

const ROLE_LABELS: Record<string, string> = {
  docTitle: '大标题',
  h1: '一级标题',
  h2: '二级标题',
  h3: '三级标题',
  body: '正文',
  table: '表格（表内文字）',
};



/** 安装结果通知文案（普通版 + 弹窗版计数） */
function installResultText(r: { created: number; skipped: number; tpCreated: number; tpSkipped: number; folder: string }): string {
  const base = `RedQuill：新建 ${r.created} 个${r.skipped ? `、跳过已存在 ${r.skipped} 个` : ''}`;
  const tp = r.tpCreated || r.tpSkipped ? `；弹窗版 ${r.tpCreated} 个${r.tpSkipped ? `、跳过 ${r.tpSkipped} 个` : ''}` : '';
  return `${base}${tp}（${r.folder}）。`;
}

/* ------------------------------------------------------------------ */
/* 写作辅助面板（v0.11.0）：右侧栏实时诊断光标所在段的公文角色            */
/* ------------------------------------------------------------------ */

class WriteAssistView extends ItemView {
  private plugin: RedQuillPlugin;
  /** 防抖句柄：editor-change / 切文件都触发重渲，200ms 合并 */
  private pending: number | null = null;

  constructor(leaf: WorkspaceLeaf, plugin: RedQuillPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE_WRITEASSIST;
  }
  getDisplayText(): string {
    return '写作辅助';
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
    el.createEl('h4', { text: '写作辅助' });

    const mv = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
    if (!mv?.file) {
      el.createEl('p', {
        text: '打开一个 md 笔记后，这里跟随光标诊断每一行的公文角色，并给出标题序号建议。',
        cls: 'setting-item-description',
      });
      return;
    }
    const editor = mv.editor;
    const cursor = editor.getCursor();
    const lineText = editor.getLine(cursor.line);
    const info = lineRole(lineText);

    // ① 当前行角色卡
    const card = el.createEl('div', { cls: 'redquill-write-card' });
    card.createEl('div', { cls: 'redquill-write-role', text: `第 ${cursor.line + 1} 行 · ${info.label}` });
    if (info.tip) card.createEl('div', { cls: 'setting-item-description', text: info.tip });

    // ② 标题序号建议（统计正文已出现的一/二级标题）
    const all = editor.getValue().split('\n');
    const n1 = nextH1(all);
    const n2 = nextH2(all);
    const hint = el.createEl('p', { cls: 'redquill-write-hint' });
    hint.createSpan({ text: `下一个序号建议：一级 ${n1}　二级 ${n2}` });

    // ③ 快捷插入（光标处）
    el.createEl('h5', { text: '插入（光标处）' });
    const grid = el.createEl('div', { cls: 'redquill-write-btns' });
    const mk = (label: string, snippet: string, tip = ''): void => {
      const b = grid.createEl('button', { text: label, cls: 'redquill-write-btn' });
      b.title = tip || snippet;
      b.addEventListener('click', () => {
        editor.replaceSelection(snippet);
        editor.focus();
        this.schedule();
      });
    };
    mk(`一级 ${n1}`, `## ${n1}`);
    mk(`二级 ${n2}`, `### ${n2}`);
    mk('三级 1.', '#### 1.');
    mk('文件标题', '# ');
    mk('表格', '| 项目 | 说明 |\n| :--- | :--- |\n|  |  |\n|  |  |');
    mk('附件另面', '\n---\n', '正文后单独一行 ---：之后的内容另面起排为附件区（标题写 # 附件N：标题）');

    // ④ 常用操作
    el.createEl('h5', { text: '常用' });
    const ops = el.createEl('div', { cls: 'redquill-write-btns' });
    const op = (label: string, fn: () => void): void => {
      const b = ops.createEl('button', { text: label, cls: 'redquill-write-btn' });
      b.addEventListener('click', fn);
    };
    op('公文属性表单', () => {
      const meta = parseDocument(editor.getValue()).meta;
      new GongwenFormModal(this.plugin, meta).open();
    });
    op('排版体检', () => {
      if (mv.file) void this.plugin.openCheck(mv.file);
    });
    op('导出 docx', () => {
      void this.plugin.exportActiveDocx();
    });
  }
}

class RedQuillSettingTab extends PluginSettingTab {
  private plugin: RedQuillPlugin;
  /** 正在编辑的自定义预设 id */
  private editingId: string | null = null;
  /** 渲染序号：display() 重入时丢弃旧的异步模板清单渲染 */
  private renderSeq = 0;

  constructor(app: App, plugin: RedQuillPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl('h2', { text: 'RedQuill 排版预设' });

    new Setting(containerEl)
      .setName('活动预设')
      .setDesc('预览与导出使用的版式。预览面板顶部下拉切换同样会保存到这里。')
      .addDropdown((dd) => {
        for (const p of this.plugin.allPresets()) dd.addOption(p.id, p.name);
        dd.setValue(this.plugin.settings.activePresetId).onChange(async (v) => {
          this.plugin.settings.activePresetId = v;
          await this.plugin.saveSettings();
          this.plugin.refreshPreviewViews();
        });
      });

    new Setting(containerEl)
      .setName('预览打开方式')
      .setDesc('点击预览按钮/命令时面板的打开位置。左右分屏 = 与笔记并排对照；新标签页 = 主工作区标签。')
      .addDropdown((dd) =>
        dd
          .addOption('split', '左右分屏（默认）')
          .addOption('tab', '新标签页')
          .setValue(this.plugin.settings.previewOpenMode)
          .onChange(async (v) => {
            this.plugin.settings.previewOpenMode = v === 'tab' ? 'tab' : 'split';
            await this.plugin.saveSettings();
          }),
      );

    new Setting(containerEl)
      .setName('首句标粗')
      .setDesc('每个正文段落的第一句（截至第一个句号）加粗，适合请示、汇报的段旨句写法。')
      .addToggle((tg) =>
        tg.setValue(this.plugin.settings.firstSentenceBold).onChange(async (v) => {
          this.plugin.settings.firstSentenceBold = v;
          await this.plugin.saveSettings();
          this.plugin.refreshPreviewViews();
        }),
      );

    new Setting(containerEl)
      .setName('版记分页模式')
      .setDesc(
        'GB/T 9704 双面印制：版记置于公文最后一面（双面印制即偶数页）。off=版记随正文（短文/单面打印）；auto=正文一页装得下则不拆（版记留第 1 页），装不下才拆到偶数页（推荐）；force=恒拆到偶数页（正文止于偶数页时 Word 自动补空白页）。拆节时页码按国标两分法由条件域在 Word/WPS 打开时求值（仅影响 docx 导出；预览/PDF 打印不适用）。',
      )
      .addDropdown((dd) =>
        dd
          .addOption('off', '关闭（随正文）')
          .addOption('auto', '自动（推荐）')
          .addOption('force', '强制偶数页')
          .setValue(this.plugin.settings.colophonMode)
          .onChange(async (v) => {
            this.plugin.settings.colophonMode = v as ColophonMode;
            await this.plugin.saveSettings();
          }),
      );

    // —— 落款：对齐三档 + 左/右空（v0.5.6）——
    let rightInput!: HTMLInputElement;
    let leftInput!: HTMLInputElement;
    const applyDisabled = (align: string) => {
      rightInput.disabled = align !== 'right';
      leftInput.disabled = align !== 'left';
    };
    new Setting(containerEl)
      .setName('落款对齐')
      .setDesc(
        '署名与成文日期的对齐：右对齐（GB/T 9704，右空 N 字）/ 水平居中 / 左对齐（左空 N 字，0=顶格）。' +
          '落款位置 = 对齐方式 + 左/右空字数共同决定，预览与 docx 导出同步生效。',
      )
      .addDropdown((dd) =>
        dd
          .addOption('right', '右对齐（GB/T，右空N字）')
          .addOption('center', '水平居中')
          .addOption('left', '左对齐（左空N字）')
          .setValue(this.plugin.settings.signatureAlign)
          .onChange(async (v) => {
            this.plugin.settings.signatureAlign = v as RedHeadSettings['signatureAlign'];
            await this.plugin.saveSettings();
            applyDisabled(v);
            this.plugin.refreshPreviewViews();
          }),
      );

    new Setting(containerEl)
      .setName('落款右空（字）')
      .setDesc('署名与成文日期相对右版心的距离（右对齐模式生效）。GB/T 9704 规定 4 字（默认）；实务常用 2 字更贴右；0=紧贴右边距。')
      .addText((tx) => {
        tx.setValue(String(this.plugin.settings.signatureRightChars));
        tx.inputEl.type = 'number';
        tx.inputEl.min = '0';
        tx.inputEl.max = '12';
        tx.inputEl.step = '1';
        tx.inputEl.style.width = '5em';
        rightInput = tx.inputEl;
        tx.onChange(async (v) => {
          const n = parseInt(v, 10);
          if (!isFinite(n) || n < 0 || n > 12) return;
          this.plugin.settings.signatureRightChars = n;
          await this.plugin.saveSettings();
          this.plugin.refreshPreviewViews();
        });
      });

    new Setting(containerEl)
      .setName('落款左空（字）')
      .setDesc('署名与成文日期相对左版心起排的左空（左对齐模式生效；0=顶格左对齐）。')
      .addText((tx) => {
        tx.setValue(String(this.plugin.settings.signatureLeftChars));
        tx.inputEl.type = 'number';
        tx.inputEl.min = '0';
        tx.inputEl.max = '12';
        tx.inputEl.step = '1';
        tx.inputEl.style.width = '5em';
        leftInput = tx.inputEl;
        tx.onChange(async (v) => {
          const n = parseInt(v, 10);
          if (!isFinite(n) || n < 0 || n > 12) return;
          this.plugin.settings.signatureLeftChars = n;
          await this.plugin.saveSettings();
          this.plugin.refreshPreviewViews();
        });
      });
    applyDisabled(this.plugin.settings.signatureAlign);

    // —— 结构层位置：附注/附件/版记的左空与右空（v0.5.6，默认 GB/T）——
    new Setting(containerEl).setName('结构层位置').setHeading();
    const charsSetting = (
      name: string,
      desc: string,
      get: () => number,
      set: (n: number) => void,
    ): Setting =>
      new Setting(containerEl)
        .setName(name)
        .setDesc(desc)
        .addText((tx) => {
          tx.setValue(String(get()));
          tx.inputEl.type = 'number';
          tx.inputEl.min = '0';
          tx.inputEl.max = '12';
          tx.inputEl.step = '1';
          tx.inputEl.style.width = '5em';
          tx.onChange(async (v) => {
            const n = parseInt(v, 10);
            if (!isFinite(n) || n < 0 || n > 12) return;
            set(n);
            await this.plugin.saveSettings();
            this.plugin.refreshPreviewViews();
          });
        });
    const s = this.plugin.settings;
    charsSetting(
      '附注左空（字）',
      'rh-notes 附注行（联系人等圆括号注）相对左版心的左空，默认 2（GB/T 9704）。',
      () => s.notesIndentChars,
      (n) => (s.notesIndentChars = n),
    );
    charsSetting(
      '附件说明左空（字）',
      'rh-attachments 附件说明行相对左版心的左空，默认 2（GB/T 9704）。',
      () => s.attachIndentChars,
      (n) => (s.attachIndentChars = n),
    );
    charsSetting(
      '版记抄送/印发机关左空（字）',
      'rh-cc 抄送行与 rh-printOrg 印发机关行的左空，默认 1（GB/T 9704，正文四号字宽计）。',
      () => s.colophonLeftChars,
      (n) => (s.colophonLeftChars = n),
    );
    charsSetting(
      '版记印发日期右空（字）',
      'rh-printDate 印发日期相对右版心的右空，默认 1（GB/T 9704）。',
      () => s.printRightChars,
      (n) => (s.printRightChars = n),
    );
    charsSetting(
      '版记印发份数右空（字）',
      'rh-printCopies 印发份数相对右版心的右空，默认 3（GB/T 9704）。',
      () => s.copiesRightChars,
      (n) => (s.copiesRightChars = n),
    );

    new Setting(containerEl).setName('预设管理').setHeading();
    for (const p of this.plugin.allPresets()) this.presetRow(containerEl, p);

    new Setting(containerEl).addButton((btn) =>
      btn.setButtonText('＋ 新建预设（复制当前活动预设）').onClick(async () => {
        const src = this.plugin.activePreset();
        const preset = clonePreset(src, { id: `custom-${Date.now()}`, name: `${src.name} 副本`, builtin: false });
        this.plugin.settings.customPresets.push(preset);
        this.plugin.settings.activePresetId = preset.id;
        await this.plugin.saveSettings();
        this.editingId = preset.id;
        this.display();
        this.plugin.refreshPreviewViews();
      }),
    );

    this.renderWriteSection(containerEl);

    new Setting(containerEl).setName('公文模板').setHeading();
    const seq = ++this.renderSeq;
    void this.renderTemplateSection(containerEl, seq);
    this.renderBackupSection(containerEl);

    if (this.editingId) {
      // 编辑按钮对所有预设（内置 + 自定义）都可用；内置预设存于出厂定义/覆盖层，
      // 不在 customPresets，须按 allPresets() 找（2026-09-03 修复：此前只搜
      // customPresets，点内置预设的编辑按钮后 target 恒为 undefined → 编辑器不渲染）
      const target = this.plugin.allPresets().find((p) => p.id === this.editingId);
      if (target) this.presetEditor(containerEl, target);
      else this.editingId = null;
    }
  }

  /** 一行预设：名称 + 操作按钮（内置：编辑/重置/复制；自定义：编辑/删除/复制） */
  private presetRow(containerEl: HTMLElement, p: Preset): void {
    const overridden = p.builtin && !!this.plugin.builtinOverrideFor(p.id);
    const tag = p.builtin ? (overridden ? '（内置 · 已修改）' : '（内置）') : '';
    const active = p.id === this.plugin.settings.activePresetId ? ' · 当前使用' : '';
    const s = new Setting(containerEl).setName(`${p.name}${tag}${active}`);
    s.addExtraButton((b) =>
      b.setIcon('pencil').setTooltip('编辑').onClick(() => {
        this.editingId = p.id;
        this.display();
      }),
    );
    if (p.builtin) {
      s.addExtraButton((b) =>
        b.setIcon('rotate-ccw').setTooltip('重置为出厂默认').onClick(async () => {
          await this.plugin.resetBuiltinPreset(p.id);
          if (this.editingId === p.id) this.editingId = null;
          this.display();
          new Notice(`RedQuill：${p.name} 已重置为出厂默认。`);
        }),
      );
    } else {
      s.addExtraButton((b) =>
        b.setIcon('trash').setTooltip('删除').onClick(async () => {
          this.plugin.settings.customPresets = this.plugin.settings.customPresets.filter((x) => x.id !== p.id);
          if (this.plugin.settings.activePresetId === p.id) {
            this.plugin.settings.activePresetId = BUILTIN_PRESETS[0].id;
          }
          if (this.editingId === p.id) this.editingId = null;
          await this.plugin.saveSettings();
          this.display();
          this.plugin.refreshPreviewViews();
        }),
      );
    }
    s.addExtraButton((b) =>
      b.setIcon('copy').setTooltip('复制为新预设').onClick(async () => {
        const preset = clonePreset(p, { id: `custom-${Date.now()}`, name: `${p.name} 副本`, builtin: false });
        this.plugin.settings.customPresets.push(preset);
        this.plugin.settings.activePresetId = preset.id;
        await this.plugin.saveSettings();
        this.editingId = preset.id;
        this.display();
        this.plugin.refreshPreviewViews();
      }),
    );
  }

  /**
   * 预设编辑表单。内置预设编辑的是工作副本，每次改动写入覆盖层（出厂定义不动，
   * 随时可在列表行一键重置）；自定义预设直接改本体。
   */
  private presetEditor(containerEl: HTMLElement, target: Preset): void {
    const isBuiltin = target.builtin;
    const p = isBuiltin ? clonePreset(target, { id: target.id, name: target.name }) : target;
    const box = containerEl.createEl('div', { cls: 'redquill-preset-editor' });
    box.createEl('h3', { text: `编辑：${p.name}${isBuiltin ? '（内置，改动即保存，可重置为出厂）' : ''}` });
    const save = () => (isBuiltin ? this.plugin.saveBuiltinOverride(p) : this.plugin.saveCustomPreset(p));

    const num = (label: string, desc: string, get: () => number, set: (v: number) => void, unit = '') => {
      new Setting(box)
        .setName(label)
        .setDesc(desc)
        .addText((tx) => {
          tx.setValue(String(get()));
          tx.inputEl.type = 'number';
          tx.onChange((v) => {
            const n = parseFloat(v);
            if (isFinite(n) && n > 0) {
              set(n);
              save();
            }
          });
        });
      void unit;
    };

    new Setting(box)
      .setName('预设名称')
      .addText((tx) =>
        tx.setValue(p.name).onChange((v) => {
          p.name = v.trim() || p.name;
          save();
        }),
      );

    box.createEl('h4', { text: '页面' });
    num('上边距 (mm)', '', () => p.page.top, (v) => (p.page.top = v));
    num('下边距 (mm)', '', () => p.page.bottom, (v) => (p.page.bottom = v));
    num('左边距 (mm)', '', () => p.page.left, (v) => (p.page.left = v));
    num('右边距 (mm)', '', () => p.page.right, (v) => (p.page.right = v));
    num('正文行距 (磅)', '固定值行距', () => p.linePt, (v) => (p.linePt = v));
    num('大标题行距 (磅)', '固定值行距', () => p.titleLinePt, (v) => (p.titleLinePt = v));
    new Setting(box)
      .setName('页码样式')
      .setDesc('公文式为 GB/T 9704 固定排法（单页右 / 双页左），忽略下方对齐设置。')
      .addDropdown((dd) => {
        for (const o of PAGE_NUMBER_OPTIONS) dd.addOption(o.id, o.label);
        dd.setValue(p.pageNumber.style).onChange(async (v) => {
          p.pageNumber.style = v as PageNumberStyle;
          save();
        });
      });
    new Setting(box)
      .setName('页码对齐')
      .setDesc('非公文式页码的对齐位置')
      .addDropdown((dd) =>
        dd
          .addOption('left', '居左')
          .addOption('center', '居中')
          .addOption('right', '居右')
          .setValue(p.pageNumber.align)
          .onChange(async (v) => {
            p.pageNumber.align = v as 'left' | 'center' | 'right';
            save();
          }),
      );
    num('页码字号 (pt)', '国标为四号 14pt', () => p.pageNumber.sizePt, (v) => (p.pageNumber.sizePt = v));

    box.createEl('h4', { text: '角色排版' });
    for (const key of ['docTitle', 'h1', 'h2', 'h3', 'body', 'table'] as const) {
      const st = p.roles[key];
      box.createEl('h5', { text: ROLE_LABELS[key] });
      new Setting(box)
        .setName('中文字体')
        .setDesc('留空用默认字链；填本机已安装的字体名')
        .addText((tx) =>
          tx.setValue(st.font).setPlaceholder('默认').onChange((v) => {
            st.font = v.trim();
            save();
          }),
        );
      num('字号 (pt)', '', () => st.sizePt, (v) => (st.sizePt = v));
      new Setting(box).setName('加粗').addToggle((tg) =>
        tg.setValue(st.bold).onChange(async (v) => {
          st.bold = v;
          save();
        }),
      );
      if (key !== 'table') {
        new Setting(box).setName('对齐').addDropdown((dd) =>
          dd
            .addOption('left', '左对齐')
            .addOption('center', '居中')
            .setValue(st.align)
            .onChange(async (v) => {
              st.align = v as 'left' | 'center';
              save();
            }),
        );
      }
      if (key === 'h3' || key === 'body') {
        num('首行缩进 (字符)', '0 = 不缩进', () => st.indentChars, (v) => (st.indentChars = Math.max(0, Math.floor(v))));
      }
    }

    new Setting(box).addButton((btn) =>
      btn.setButtonText('收起编辑器').onClick(() => {
        this.editingId = null;
        this.display();
      }),
    );
  }

  /** v0.11.0 写作提效设置：默认发文机关（新建向导预填）+ 写作辅助面板入口 */
  private renderWriteSection(containerEl: HTMLElement): void {
    containerEl.createEl('h3', { text: '写作' });
    new Setting(containerEl)
      .setName('默认发文机关（红头）')
      .setDesc('「新建公文」向导自动把该机关预填进 frontmatter 的 rh-agency；联合行文用 / 分隔多机关。留空 = 用模板占位「XX镇人民政府文件」。')
      .addText((tx) =>
        tx
          .setPlaceholder('XX镇人民政府文件')
          .setValue(this.plugin.settings.defaultAgency)
          .onChange(async (v) => {
            this.plugin.settings.defaultAgency = v.trim().replace(/\s+/g, ' ').slice(0, 80);
            await this.plugin.saveSettings();
          }),
      );
    new Setting(containerEl)
      .setName('写作辅助面板')
      .setDesc('右侧栏跟随光标诊断当前行的公文角色（标题层级/正文/表格…），给下一级标题序号建议与快捷插入；也可用命令「打开写作辅助面板」。')
      .addButton((b) => b.setButtonText('打开').onClick(() => this.plugin.openWriteAssistBtn()));
  }

  /** v0.8.0 备份与同步：导出全部设置 / 导入（备份列表 + 粘贴 JSON） */
  private renderBackupSection(containerEl: HTMLElement): void {
    containerEl.createEl('h3', { text: '备份与同步' });
    containerEl.createEl('p', {
      text: '双机或同事间同步同一套版式：导出后在另一台导入即可（备份文件放 vault 根目录，随库同步）。',
      cls: 'setting-item-description',
    });
    new Setting(containerEl)
      .setName('导出全部设置')
      .setDesc('自定义预设 + 版式参数（落款对齐、结构层位置、版记分页、首句标粗等）打包为 JSON。')
      .addButton((b) => b.setButtonText('导出 JSON').setCta().onClick(() => void this.plugin.exportSettingsJson()));
    new Setting(containerEl)
      .setName('导入设置')
      .setDesc('从本库 redquill-settings-*.json 备份恢复，或粘贴其他机器导出的 JSON。导入自动校验，非法项回默认。')
      .addButton((b) => b.setButtonText('导入…').onClick(() => new SettingsBackupModal(this.plugin).open()));
  }

  /** 公文模板清单：按行文方向三组折叠（对上/平级/对下），勾选 + 单独安装 + 批量 */
  private async renderTemplateSection(containerEl: HTMLElement, seq: number): Promise<void> {
    const adapter = this.plugin.app.vault.adapter;
    let folder: string;
    try {
      folder = await this.plugin.templateFolder();
    } catch {
      return;
    }
    if (seq !== this.renderSeq) return; // display() 已重入，丢弃本次

    const box = containerEl.createEl('div', { cls: 'redquill-template-list' });
    const tpHint = this.plugin.isTemplaterInstalled() ? '检测到 Templater：安装时同时写入「(弹窗)」版。' : '未检测到 Templater：只安装普通版（装 Templater 后重装可补弹窗版）。';
    new Setting(box)
      .setName('批量安装')
      .setDesc(`写入「${folder}」（已存在的不覆盖）。插入用 Obsidian「插入模板」或 Templater。${tpHint}`)
      .addButton((btn) =>
        btn.setButtonText('安装所选').onClick(async () => {
          const keys = this.plugin.settings.templateSelection.filter((k) => GONGWEN_TEMPLATES[k]);
          if (!keys.length) {
            new Notice('RedQuill：先勾选要安装的文种。');
            return;
          }
          const r = await this.plugin.installTemplates(keys);
          new Notice(installResultText(r), 6000);
          this.display();
        }),
      )
      .addButton((btn) =>
        btn.setButtonText('全部安装').onClick(async () => {
          const r = await this.plugin.installTemplates(Object.keys(GONGWEN_TEMPLATES));
          new Notice(installResultText(r), 6000);
          this.display();
        }),
      );

    for (const group of TEMPLATE_GROUPS) {
      const details = box.createEl('details', { cls: 'redquill-tgroup' });
      const selCount = group.keys.filter((k) => this.plugin.settings.templateSelection.includes(k)).length;
      details.createEl('summary', {
        text: `${group.label}（${group.keys.length} 个文种，已选 ${selCount}）`,
      });
      for (const key of group.keys) {
        const meta = TEMPLATE_META[key] ?? { label: key, desc: '' };
        let installed = false;
        let installedTp = false;
        try {
          installed = await adapter.exists(`${folder}/${key}.md`);
          installedTp = await adapter.exists(`${folder}/${key}(弹窗).md`);
        } catch {
          /* 忽略探测失败，按未安装处理 */
        }
        if (seq !== this.renderSeq) return;
        const status = installed || installedTp ? ' · 已安装' : '';
        const tag = installed && installedTp ? '（含弹窗版）' : installedTp ? '（仅弹窗版）' : '';
        const selected = this.plugin.settings.templateSelection.includes(key);
        new Setting(details)
          .setName(`${meta.label}${status}${tag}`)
          .setDesc(meta.desc)
          .addToggle((tg) =>
            tg.setValue(selected).onChange(async (v) => {
              const cur = new Set(this.plugin.settings.templateSelection);
              if (v) cur.add(key);
              else cur.delete(key);
              this.plugin.settings.templateSelection = [...cur];
              await this.plugin.saveSettings();
            }),
          )
          .addExtraButton((b) =>
            b.setIcon('download').setTooltip('安装此模板').onClick(async () => {
              const r = await this.plugin.installTemplates([key]);
              new Notice(
                r.created || r.tpCreated
                  ? `RedQuill：已安装「${meta.label}」${r.tpCreated ? '（含弹窗版）' : ''}。`
                  : `RedQuill：「${meta.label}」已存在，未覆盖。`,
              );
              this.display();
            }),
          );
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* 公文属性中文表单（v0.5.0）：中文标签填写 → 以 rh-* 英文键写入 frontmatter */
/* ------------------------------------------------------------------ */

/** 表单字段定义：label=中文提示，key=rh-* 英文属性名，group=分组 */
const FM_FORM_FIELDS: { label: string; key: string; group: string; placeholder?: string; wide?: boolean }[] = [
  { label: '机关标志文字（红头大字）', key: 'rh-agency', group: '版头', placeholder: 'XX镇人民政府文件；联合行文用 / 分隔多机关' },
  { label: '机关标志图片（vault 路径，png/jpg）', key: 'rh-logo', group: '版头', placeholder: '_assets/logo.png' },
  { label: '发文字号', key: 'rh-docNumber', group: '版头', placeholder: 'X政发〔2026〕12号' },
  { label: '签发人（上行文才填）', key: 'rh-signer', group: '版头', placeholder: '张三' },
  { label: '份号（6 位数字）', key: 'rh-copyNumber', group: '版头', placeholder: '000001' },
  { label: '密级和保密期限', key: 'rh-secretLevel', group: '版头', placeholder: '机密★1年' },
  { label: '紧急程度', key: 'rh-urgency', group: '版头', placeholder: '特急' },
  { label: '主送机关（多个用顿号分隔）', key: 'rh-recipients', group: '主体', placeholder: '各部门、各科室', wide: true },
  { label: '署名（发文机关名）', key: 'rh-signature', group: '主体', placeholder: 'XX镇人民政府' },
  { label: '成文日期', key: 'rh-date', group: '主体', placeholder: '2026年9月2日' },
  { label: '印章图（vault 路径，浮盖在成文日期上）', key: 'rh-seal', group: '主体', placeholder: '_assets/seal.png' },
  { label: '附件说明（多个用 / 分隔）', key: 'rh-attachments', group: '主体', placeholder: '会议议程/参会名单', wide: true },
  { label: '附注（联系人等，自动加圆括号）', key: 'rh-notes', group: '主体', placeholder: '联系人：张三', wide: true },
  { label: '抄送机关', key: 'rh-cc', group: '版记', placeholder: '县农业农村局、县财政局' },
  { label: '印发机关', key: 'rh-printOrg', group: '版记', placeholder: 'XX镇党政办公室' },
  { label: '印发时间', key: 'rh-printDate', group: '版记', placeholder: '2026年9月2日' },
  { label: '印发份数', key: 'rh-printCopies', group: '版记', placeholder: '20' },
];

/** 发文字号格式校验（自 checker 同源；导出时提醒，不阻断） */

/** 值含 YAML 特殊字符时加双引号 */
function fmQuote(v: string): string {
  return /[:#[\]{}&*!|>'"%@`]/.test(v) || /^\s|\s$/.test(v) ? `"${v.replace(/"/g, '\\"')}"` : v;
}

/** 把 rh-* 键值对合并进 md 的 frontmatter（已有键替换，其余键保留；无 frontmatter 则新建） */
export function applyFrontmatter(src: string, entries: [string, string][]): string {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) {
    const fm = ['---', ...entries.map(([k, v]) => `${k}: ${fmQuote(v)}`), '---', ''].join('\n');
    return fm + src;
  }
  let fmText = m[1];
  for (const [k, v] of entries) {
    const re = new RegExp(`^(${k}\\s*:\\s*)(.*)$`, 'm');
    if (re.test(fmText)) fmText = fmText.replace(re, (_s, pre: string) => `${pre}${fmQuote(v)}`);
    else fmText += `\n${k}: ${fmQuote(v)}`;
  }
  const rest = src.slice(m[0].length);
  return `---\n${fmText}\n---\n${rest.startsWith('\n') || rest === '' ? rest : '\n' + rest}`;
}

/* ------------------------------------------------------------------ */
/* 新建公文向导（v0.11.0）：文种筛选 → 标题 → 当前文件夹落盘并打开          */
/* ------------------------------------------------------------------ */

/** 第一步：FuzzySuggest 选文种（16 法定文种，按 label/desc/行文方向搜索） */
class NewGongwenWizard extends FuzzySuggestModal<NewDocItem> {
  private plugin: RedQuillPlugin;

  constructor(plugin: RedQuillPlugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.setPlaceholder('输入文种名筛选：通知 / 请示 / 报告 / 纪要 …');
  }

  getItems(): NewDocItem[] {
    return NEW_DOC_ITEMS;
  }
  getItemText(it: NewDocItem): string {
    return `${it.label}（${it.group}）— ${it.desc}`;
  }
  onChooseItem(it: NewDocItem): void {
    new NewGongwenDraftModal(this.plugin, it).open();
  }
}

/** 第二步：确认标题 → 创建（默认发文机关预填 rh-agency，年份自动当年） */
class NewGongwenDraftModal extends Modal {
  private plugin: RedQuillPlugin;
  private item: NewDocItem;

  constructor(plugin: RedQuillPlugin, item: NewDocItem) {
    super(plugin.app);
    this.plugin = plugin;
    this.item = item;
    this.titleEl.setText(`新建公文 · ${item.label}`);
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h3', { text: `新建公文：${this.item.label}` });
    const agency = this.plugin.settings.defaultAgency;
    contentEl.createEl('p', {
      text: `${this.item.desc}。发文机关：${agency ? `「${agency}」` : '模板占位「XX镇人民政府文件」'}；模板中写死的年份自动替换为今年。文件建在当前笔记所在文件夹。`,
      cls: 'setting-item-description',
    });
    const input = contentEl.createEl('input', {
      type: 'text',
      cls: 'redquill-wizard-input',
      placeholder: '公文标题（可留空用模板占位，如：关于开展秋季人居环境整治的通知）',
    });
    input.style.width = '100%';
    input.focus();
    new Setting(contentEl).addButton((b) =>
      b.setButtonText('创建并打开').setCta().onClick(async () => {
        const title = input.value.trim();
        try {
          await this.plugin.createGongwenDoc(this.item, title);
        } catch (e) {
          new Notice(`RedQuill：创建失败：${e instanceof Error ? e.message : String(e)}`, 6000);
          return;
        }
        new Notice('RedQuill：公文已创建，开始写作（写辅助可提示标题层级）。');
        this.close();
      }),
    );
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        (contentEl.querySelector('button.mod-cta') as HTMLButtonElement | null)?.click();
      }
    });
  }
}

/** 公文属性中文表单：填写 → 写回当前笔记 frontmatter（rh-* 英文键） */
class GongwenFormModal extends Modal {
  private plugin: RedQuillPlugin;
  private initial: RedHeadMeta;

  constructor(plugin: RedQuillPlugin, initial: RedHeadMeta) {
    super(plugin.app);
    this.plugin = plugin;
    this.initial = initial;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h3', { text: '填写公文属性' });
    contentEl.createEl('p', {
      text: '中文填写，保存后以 rh-* 英文属性写入笔记 frontmatter。留空 = 不渲染该要素。',
      cls: 'setting-item-description',
    });

    const values: Record<string, string> = {};
    const inputs: Record<string, HTMLInputElement> = {};
    let lastGroup = '';
    for (const f of FM_FORM_FIELDS) {
      if (f.group !== lastGroup) {
        lastGroup = f.group;
        contentEl.createEl('h4', { text: f.group });
      }
      const metaKey = f.key.slice(3) as keyof RedHeadMeta;
      new Setting(contentEl)
        .setName(f.label)
        .setClass(f.wide ? 'redquill-form-wide' : 'redquill-form')
        .addText((t) => {
          t.setPlaceholder(f.placeholder ?? '').setValue((this.initial[metaKey] as string) ?? '');
          inputs[f.key] = t.inputEl;
          t.inputEl.style.width = '100%';
        });
      values[f.key] = '';
      // 读取时实时记录
      inputs[f.key].addEventListener('input', () => (values[f.key] = inputs[f.key].value));
    }

    new Setting(contentEl)
      .addButton((b) =>
        b.setButtonText('写入 frontmatter').setCta().onClick(() => {
          const entries = FM_FORM_FIELDS.map(({ key }) => [key, values[key].trim()] as [string, string]).filter(
            ([, v]) => v !== '',
          );
          const warn = validateDocNumber(values['rh-docNumber']);
          if (warn) new Notice(`RedQuill：${warn}`, 8000);
          const mv = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
          if (!mv?.file) {
            new Notice('RedQuill：当前没有打开的 md 笔记。');
            return;
          }
          mv.editor.setValue(applyFrontmatter(mv.editor.getValue(), entries));
          new Notice('RedQuill：公文属性已写入 frontmatter。');
          this.close();
        }),
      )
      .addButton((b) => b.setButtonText('取消').onClick(() => this.close()));
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/* ------------------------------------------------------------------ */
/* 公文排版体检结果弹窗（v0.7.0）                                        */
/* ------------------------------------------------------------------ */

class CheckReportModal extends Modal {
  private plugin: RedQuillPlugin;
  private file: TFile;
  private issues: CheckIssue[];

  constructor(plugin: RedQuillPlugin, file: TFile, issues: CheckIssue[]) {
    super(plugin.app);
    this.plugin = plugin;
    this.file = file;
    this.issues = issues;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    const errs = this.issues.filter((i) => i.level === 'error').length;
    const warns = this.issues.length - errs;
    contentEl.createEl('h3', {
      text: this.issues.length
        ? `排版体检：${errs} 处需处理，${warns} 处建议`
        : '排版体检：通过',
    });
    contentEl.createEl('p', {
      text: '机器自查仅提示、不修改、不阻塞导出。点击「第 N 行」跳到对应位置（会自动切到源码模式）。',
      cls: 'setting-item-description',
    });
    if (!this.issues.length) {
      contentEl.createEl('p', { text: '未发现问题，可直接导出。', cls: 'setting-item-description' });
      return;
    }
    const list = contentEl.createEl('div', { cls: 'redquill-check-list' });
    for (const it of this.issues) {
      const row = list.createEl('div', { cls: `redquill-check-item ${it.level}` });
      row.createEl('span', { cls: 'redquill-check-badge', text: it.level === 'error' ? '需处理' : '建议' });
      row.createEl('span', { cls: 'redquill-check-msg', text: it.message });
      if (it.line !== undefined) {
        const ln = row.createEl('span', { cls: 'redquill-check-line', text: `第 ${it.line} 行 ↗` });
        ln.addEventListener('click', () => void this.jumpTo(it.line as number));
      }
    }
  }

  /** 跳到该文件源码模式第 line 行（1-based），并高亮当前行 */
  private async jumpTo(line: number): Promise<void> {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType('markdown').find((l) => (l.view as MarkdownView)?.file === this.file);
    if (!leaf) leaf = workspace.getLeaf(false);
    await leaf.openFile(this.file, { active: true, state: { mode: 'source' } });
    const ed = (leaf.view as MarkdownView).editor;
    if (ed) {
      const l = Math.max(0, line - 1);
      ed.setCursor({ line: l, ch: 0 });
      ed.scrollIntoView({ from: { line: l, ch: 0 }, to: { line: l, ch: 0 } }, true);
    }
    this.close();
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/* ------------------------------------------------------------------ */
/* 设置导入弹窗（v0.8.0）：从 vault 备份恢复 / 粘贴 JSON                 */
/* ------------------------------------------------------------------ */

class SettingsBackupModal extends Modal {
  private plugin: RedQuillPlugin;
  private pasted = '';

  constructor(plugin: RedQuillPlugin) {
    super(plugin.app);
    this.plugin = plugin;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl('h3', { text: '导入 RedQuill 设置' });
    contentEl.createEl('p', {
      text: '从本 vault 的 redquill-settings-*.json 备份恢复，或粘贴其他机器导出的 JSON。导入前会做结构与取值校验，非法项自动回默认。',
      cls: 'setting-item-description',
    });

    const files = this.plugin.backupFiles();
    if (files.length) {
      contentEl.createEl('h4', { text: `本库备份（${files.length}）` });
      for (const f of files.slice(0, 8)) {
        const when = new Date(f.stat.mtime).toLocaleString();
        new Setting(contentEl)
          .setName(f.name)
          .setDesc(`${when}　自定义预设 ${(f.stat.size / 1024).toFixed(1)} KB`)
          .addButton((b) =>
            b.setButtonText('导入').onClick(async () => {
              try {
                const txt = await this.plugin.app.vault.read(f);
                await this.plugin.importSettingsText(txt, f.name);
                this.close();
              } catch (e) {
                new Notice(`RedQuill：导入失败：${e instanceof Error ? e.message : String(e)}`, 6000);
              }
            }),
          );
      }
    } else {
      contentEl.createEl('p', { text: '本库暂无 redquill-settings-*.json 备份。', cls: 'setting-item-description' });
    }

    contentEl.createEl('h4', { text: '粘贴 JSON' });
    const ta = contentEl.createEl('textarea', { cls: 'redquill-import-json' });
    ta.placeholder = '粘贴其他机器导出的 redquill-settings JSON 全文…';
    ta.addEventListener('input', () => (this.pasted = ta.value));
    new Setting(contentEl).addButton((b) =>
      b.setButtonText('从粘贴内容导入').setCta().onClick(async () => {
        if (!this.pasted.trim()) {
          new Notice('RedQuill：请先粘贴 JSON 内容。');
          return;
        }
        try {
          await this.plugin.importSettingsText(this.pasted.trim(), '粘贴内容');
          this.close();
        } catch (e) {
          new Notice(`RedQuill：导入失败：${e instanceof Error ? e.message : String(e)}`, 6000);
        }
      }),
    );
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

export default class RedQuillPlugin extends Plugin {
  settings: RedHeadSettings = DEFAULT_SETTINGS;

  async onload(): Promise<void> {
    await this.loadSettings();

    this.registerView(VIEW_TYPE_PREVIEW, (leaf) => new PreviewView(leaf, this));
    this.registerView(VIEW_TYPE_WRITEASSIST, (leaf) => new WriteAssistView(leaf, this));
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
      id: 'new-gongwen-doc',
      name: '新建公文（选文种 → 输标题，默认发文机关自动预填）',
      callback: () => new NewGongwenWizard(this).open(),
    });
    this.addCommand({
      id: 'paste-clean',
      name: '粘贴为公文正文（清洗剪贴板格式后插入光标处）',
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
  }

  async loadSettings(): Promise<void> {
    const raw = await this.loadData();
    this.settings = sanitizeSettings(raw, (k) => !!GONGWEN_TEMPLATES[k]);
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
    const s =
      raw.settings && typeof raw.settings === 'object' && raw.kind === 'redquill-settings' ? raw.settings : raw;
    const merged = sanitizeSettings(
      { ...s, activePresetId: s?.activePresetId ?? this.settings.activePresetId },
      (k) => !!GONGWEN_TEMPLATES[k],
    );
    this.settings = merged;
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
