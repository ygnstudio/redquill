import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import type RedQuillPlugin from './main';
import type { RedQuillSettings } from './main';
import { BUILTIN_PRESETS, PAGE_NUMBER_OPTIONS, clonePreset, normalizePreset, type PageNumberStyle, type Preset, type StructLayout } from './gongwen/format';
import { GONGWEN_TEMPLATES, TEMPLATE_GROUPS, TEMPLATE_META, toTemplaterSkeleton } from './gongwen/templates';
import { DEFAULT_SETTINGS, sanitizeSettings, type RedHeadSettings } from './gongwen/settings';
import { checkDocument, validateDocNumber } from './gongwen/checker';
import { renderPreview } from './gongwen/preview';
import { buildDocxBlob, type ColophonMode, type LogoImage } from './gongwen/docx_export';
import { VIEW_TYPE_PREVIEW, VIEW_TYPE_WRITEASSIST, VIEW_TYPE_PANEL } from './main';
import { ROLE_LABELS, installResultText } from './views/write_assist_view';
import { SettingsBackupModal } from './modals';
import { ContextGate } from './context';
import { cleanPaste } from './paste_clean';
export class RedQuillSettingTab extends PluginSettingTab {
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
    containerEl.createEl('h2', { text: 'RedQuill 设置' });

    /* ---- 通用区（v1.0.0 合一注入） ---- */
    containerEl.createEl('h3', { text: '通用' });
    new Setting(containerEl)
      .setName('自动净化粘贴')
      .setDesc('开启后，在笔记编辑器里粘贴来自网页/Word/WPS 的内容会自动清洗格式（仅当剪贴板带 HTML 样式时才处理，纯文本直通）。默认关闭，也可随时用命令「粘贴并净化」。')
      .addToggle((t) => {
        t.setValue(this.plugin.settings.autoClean).onChange(async (v) => {
          this.plugin.settings.autoClean = v;
          await this.plugin.saveSettings();
        });
      });
    containerEl.createEl('h3', { text: '公文' });

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

