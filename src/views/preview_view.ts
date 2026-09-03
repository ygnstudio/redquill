import { ItemView, MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';
import type RedQuillPlugin from '../main';
import { renderPreview } from '../gongwen/preview';
import { buildDocxBlob, type ColophonMode, type LogoImage } from '../gongwen/docx_export';
import { checkDocument, validateDocNumber, type CheckIssue } from '../gongwen/checker';
import { parseDocument, type RedHeadMeta } from '../gongwen/mdast';
import { VIEW_TYPE_PREVIEW } from '../main';
export class PreviewView extends ItemView {
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


