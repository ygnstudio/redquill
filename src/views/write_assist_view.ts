import { ItemView, MarkdownView, Notice, TFile, WorkspaceLeaf } from 'obsidian';
import type RedQuillPlugin from '../main';
import { renderPreview } from '../gongwen/preview';
import { cleanPaste } from '../paste_clean';
import { lineRole, nextH1, nextH2 } from '../gongwen/writeassist';
import { outlineOf, charStats } from '../mdast';
import { checkDocument as checkTypo, fixAll as fixAllTypo } from '../checker';
import { VIEW_TYPE_PREVIEW, VIEW_TYPE_WRITEASSIST } from '../main';
import { checkDocument, type CheckIssue } from '../gongwen/checker';
import { parseDocument } from '../gongwen/mdast';
import { GongwenFormModal } from '../modals';
export const ROLE_LABELS: Record<string, string> = {
  docTitle: '大标题',
  h1: '一级标题',
  h2: '二级标题',
  h3: '三级标题',
  body: '正文',
  table: '表格（表内文字）',
};



/** 安装结果通知文案（普通版 + 弹窗版计数） */
export function installResultText(r: { created: number; skipped: number; tpCreated: number; tpSkipped: number; folder: string }): string {
  const base = `RedQuill：新建 ${r.created} 个${r.skipped ? `、跳过已存在 ${r.skipped} 个` : ''}`;
  const tp = r.tpCreated || r.tpSkipped ? `；弹窗版 ${r.tpCreated} 个${r.tpSkipped ? `、跳过 ${r.tpSkipped} 个` : ''}` : '';
  return `${base}${tp}（${r.folder}）。`;
}

/* ------------------------------------------------------------------ */
/* 写作辅助面板（v0.11.0）：右侧栏实时诊断光标所在段的公文角色            */
/* ------------------------------------------------------------------ */

export class WriteAssistView extends ItemView {
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

/* ------------------------------------------------------------------ */
/* 通用写作面板（v1.0.0 合一注入，原 MDQuill 五卡）                      */
/* ------------------------------------------------------------------ */


