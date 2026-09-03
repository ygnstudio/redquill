import { FuzzySuggestModal, MarkdownView, Modal, Notice, Setting, TFile } from 'obsidian';
import type RedQuillPlugin from './main';
import type { RedQuillSettings } from './main';
import { GONGWEN_TEMPLATES, TEMPLATE_GROUPS, TEMPLATE_META, toTemplaterSkeleton, NEW_DOC_ITEMS, buildNewGongwen, type NewDocItem } from './gongwen/templates';
import { normalizePreset } from './gongwen/format';
import { applyFrontmatter, FM_FORM_FIELDS } from './frontmatter';
import { checkDocument, validateDocNumber, type CheckIssue } from './gongwen/checker';
import { parseDocument, type RedHeadMeta } from './gongwen/mdast';
import { sanitizeSettings } from './gongwen/settings';
import { VIEW_TYPE_PREVIEW } from './main';
export class NewGongwenWizard extends FuzzySuggestModal<NewDocItem> {
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
export class NewGongwenDraftModal extends Modal {
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
export class GongwenFormModal extends Modal {
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

export class CheckReportModal extends Modal {
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

export class SettingsBackupModal extends Modal {
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

/** 合一设置 = 公文 RedHeadSettings + 通用 autoClean（data.json 合并存储；公文段沿用红 sanitize，通用段单字段布尔校验） */

