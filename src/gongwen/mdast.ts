/**
 * mdast.ts —— md → 公文结构映射
 * v1 范围：h1 标题 / h2 一级（黑体）/ h3 二级（楷体）/ h4 三级（仿宋加粗）/ 段落 / 列表转段落
 * 红头（版头）：frontmatter 平铺属性 rh-* 驱动（兼容旧 redhead: 嵌套块），见 RedHeadMeta。
 */

import { marked } from 'marked';

export type BlockKind = 'docTitle' | 'h1' | 'h2' | 'h3' | 'para' | 'table';

/** md 表格：header 为表头行单元格文本，rows 为数据行；align 为列对齐（null=未标注，默认居中） */
export interface TableData {
  header: string[];
  rows: string[][];
  align: (('left' | 'center' | 'right') | null)[];
}

export interface GongwenBlock {
  kind: BlockKind;
  text: string;
  /** kind === 'table' 时的结构化内容 */
  table?: TableData;
}

/** 红头（版头）+ 结构层要素 —— 全部可省略；红头有任一项即渲染红头 */
export interface RedHeadMeta {
  /** 发文机关标志（红头大字，如「××镇人民政府文件」） */
  agency?: string;
  /** 机关标志图片（vault 内路径，如 `_assets/agency_logo.png`；有图时嵌图居中于红字上方） */
  logo?: string;
  /** 印章图片（vault 内路径，如 `_assets/seal.png`；有图时浮盖在成文日期上方骑年盖月，v0.10.0） */
  seal?: string;
  /** 发文字号（如「×政发〔2026〕12号」） */
  docNumber?: string;
  /** 签发人（上行文时填写，与发文字号同行左右对排） */
  signer?: string;
  /** 份号（顶格 6 位数字，如 000001） */
  copyNumber?: string;
  /** 密级和保密期限（如「机密★1年」） */
  secretLevel?: string;
  /** 紧急程度（如「特急」「加急」） */
  urgency?: string;

  /* ---- 结构层尾部要素（GB/T 9704-2012 §2.6 规格） ---- */
  /** 主送机关（标题下空 1 行、顶格、末尾补全角冒号） */
  recipients?: string;
  /** 附件说明（正文下空 1 行、左空 2 字「附件：名称」，多附件用 / 分隔或写多条） */
  attachments?: string;
  /** 附注（成文日期下一行、左空 2 字圆括号，如「联系人：张三」自动包（）） */
  notes?: string;
  /** 成文日期（右空 4 字，如「2026年9月2日」） */
  date?: string;
  /** 署名（发文机关名，以成文日期为准居中编排于其上方） */
  signature?: string;
  /* ---- 版记（分隔线与版心等宽：首末粗线、中间细线，置于文末） ---- */
  /** 抄送机关（左空 1 字，末尾自动补句号） */
  cc?: string;
  /** 印发机关（左空 1 字，与印发时间同行左右对排） */
  printOrg?: string;
  /** 印发时间（右空 1 字，如「2026年9月2日印发」，无「印发」自动补） */
  printDate?: string;
  /** 印发份数（右空 3 字，如「20」渲染成「印20份」） */
  printCopies?: string;
}

export const RED_HEAD_KEYS: (keyof RedHeadMeta)[] = [
  'agency',
  'logo',
  'seal',
  'docNumber',
  'signer',
  'copyNumber',
  'secretLevel',
  'urgency',
  'recipients',
  'attachments',
  'notes',
  'date',
  'signature',
  'cc',
  'printOrg',
  'printDate',
  'printCopies',
];

/** 平铺属性前缀：rh-agency / rh-docNumber …（Obsidian 属性面板逐条独立可编辑） */
const FLAT_PREFIX = 'rh-';

/**
 * 从 frontmatter 提取红头要素并剥掉 frontmatter（否则 marked 会把 yaml 当正文段落混入）。
 * 两种写法：
 * 1. 平铺属性（推荐）：`rh-agency: xxx` —— Obsidian 属性面板逐条独立编辑
 * 2. 旧版嵌套块（兼容）：`redhead:` 下的缩进键 —— 老笔记无需迁移
 */
function extractRedHead(md: string): { meta: RedHeadMeta; body: string } {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: md };
  const meta: RedHeadMeta = {};
  let inRedHead = false;
  for (const line of m[1].split(/\r?\n/)) {
    // 平铺属性：顶层 rh-xxx: value
    if (/^\S/.test(line)) {
      inRedHead = /^redhead\s*:/.test(line);
      const flat = line.match(new RegExp(`^${FLAT_PREFIX}([A-Za-z]+)\\s*:\\s*(.*)$`));
      if (flat) {
        const key = flat[1] as keyof RedHeadMeta;
        const value = flat[2].trim().replace(/^["']|["']$/g, '');
        if (RED_HEAD_KEYS.includes(key) && value) (meta as Record<string, string>)[key] = value;
      }
      continue;
    }
    // 旧版嵌套：redhead: 块下的缩进键
    if (!inRedHead) continue;
    const kv = line.match(/^\s+([A-Za-z_]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1] as keyof RedHeadMeta;
    const value = kv[2].trim().replace(/^["']|["']$/g, '');
    if (RED_HEAD_KEYS.includes(key) && value && !(meta as Record<string, string>)[key])
      (meta as Record<string, string>)[key] = value;
  }
  return { meta, body: md.slice(m[0].length) };
}

/** 解析整篇笔记：红头要素 + 正文结构 + 附件区（v0.10.0：单独一行 `---` 分隔，其后为附件正文） */
export function parseDocument(md: string): { meta: RedHeadMeta; blocks: GongwenBlock[]; attach?: GongwenBlock[] } {
  const { meta, body } = extractRedHead(md);
  return { meta, ...parseGongwenFull(body) };
}

/**
 * 解析规则（md 层级 → 公文层级，标题占掉 h1 后整体下移一级）：
 * - 第一个 h1 = 文件标题（小标宋二号居中），整篇只取一次
 * - h2 = 一级标题（黑体，如「一、」）
 * - h3 = 二级标题（楷体，如「（一）」）
 * - h4 = 三级标题（仿宋加粗，如「1.」）
 * - 后续 h1（罕见）= 一级标题
 * - 有序列表/无序列表：v1 直接把条目文本拍平成段落（公文序号建议写在原文里）
 * - 行内标记（**加粗**、*斜体*、`代码`）v1 剥掉符号只留文本
 * - 引用块（>）= 元信息（落款等），v1 不进正文
 * - 表格（| a | b |…）：v0.6.0 支持 → table 块；表头首行恒加粗居中，列对齐认 md 标记（:-- 左 / :--: 中 / --: 右，缺省居中）
 * - 单独一行 `---`（hr，v0.10.0）：正文到此为止，其后全部归附件区（另面起排）——
 *   附件区标题建议 `# 附件N：标题`，渲染时拆「附件N」标记行（黑体顶格）+ 居中标题。
 */
export function parseGongwen(md: string): GongwenBlock[] {
  return parseGongwenFull(md).blocks;
}

/** 完整解析：blocks=正文（hr 前），attach=附件区（hr 后，无分隔则缺省） */
export function parseGongwenFull(md: string): { blocks: GongwenBlock[]; attach?: GongwenBlock[] } {
  const tokens = marked.lexer(md);
  const blocks: GongwenBlock[] = [];
  let attach: GongwenBlock[] | undefined;
  let target = blocks;
  let titleTaken = false;
  let insideQuote = false;

  // keepBr=true 时保留 md 硬换行为 \n（标题宝塔形回行用，设计文档 §2.6）
  const inline = (tokens: any[] | undefined, keepBr = false): string => {
    if (!tokens) return '';
    return tokens
      .map((t) => {
        if (t.type === 'text' || t.type === 'escape') return t.text ?? '';
        if (t.type === 'br') return keepBr ? '\n' : '';
        if (t.type === 'strong' || t.type === 'em' || t.type === 'codespan' || t.type === 'del')
          return inline(t.tokens ?? [{ type: 'text', text: t.text }], keepBr);
        if (t.type === 'link') return inline(t.tokens ?? [], keepBr) || t.href;
        return '';
      })
      .join('');
  };

  for (const tk of tokens) {
    // 附件区起点：单独一行 `---`（前面需空行，否则 marked 会当 setext 标题）
    if (tk.type === 'hr') {
      attach = attach ?? [];
      target = attach;
      titleTaken = false;
      insideQuote = false;
      continue;
    }
    const push = (b: GongwenBlock) => target.push(b);
    switch (tk.type) {
      case 'heading': {
        if (tk.depth === 1 && !titleTaken) {
          push({ kind: 'docTitle', text: inline(tk.tokens, true).trim() });
          titleTaken = true;
        } else if (tk.depth <= 2) {
          push({ kind: 'h1', text: inline(tk.tokens).trim() });
        } else if (tk.depth === 3) {
          push({ kind: 'h2', text: inline(tk.tokens).trim() });
        } else if (tk.depth === 4 || tk.depth === 5) {
          push({ kind: 'h3', text: inline(tk.tokens).trim() });
        } else if (tk.depth === 6) {
          push({ kind: 'para', text: inline(tk.tokens).trim() });
        }
        break;
      }
      case 'paragraph': {
        if (insideQuote) break; // 引用块（元信息）不进正文
        const text = inline(tk.tokens).trim();
        if (text) {
          // v0.11.0「一、」识别：裸写公文一级标题（无 ## 前缀）自动按黑体一级标题渲染
          push(detectOutlineHeading(text) === 'h1' ? { kind: 'h1', text } : { kind: 'para', text });
        }
        break;
      }
      case 'blockquote': {
        insideQuote = true;
        break;
      }
      case 'space':
        insideQuote = false;
        break;
      case 'list': {
        for (const item of tk.items ?? []) {
          const text = inline(item.tokens?.[0]?.tokens ?? item.tokens).trim();
          if (text) push({ kind: 'para', text });
        }
        break;
      }
      case 'table': {
        const cellText = (c: any) => inline(c?.tokens ?? []).trim();
        const header = (tk.header ?? []).map(cellText);
        const rows = (tk.rows ?? []).map((r: any[]) => r.map(cellText));
        const align = (tk.align ?? []).map((a: any) => (a === 'left' || a === 'center' || a === 'right' ? a : null));
        if (rows.length) push({ kind: 'table', text: '', table: { header, rows, align } });
        break;
      }
      default:
        break; // 代码块等忽略
    }
  }
  return { blocks, attach: attach && attach.length ? attach : undefined };
}

/** 附件标题拆分（v0.10.0）：「附件1：统计表」→ {mark:'附件1', title:'统计表'}；无附件前缀 → {mark:'附件', title:原文} */
export function splitAttachTitle(text: string): { mark: string; title: string } {
  const t = (text ?? '').trim();
  const m = t.match(/^(附件\s*(?:[0-9]+|[一二三四五六七八九十]+)?)\s*[：:、.．-]?\s*(.*)$/);
  if (m && m[1]) return { mark: m[1].replace(/\s+/g, ''), title: (m[2] ?? '').trim() };
  return { mark: '附件', title: t };
}

/**
 * 联合行文（v0.9.0）：rh-agency 用 / 或 ／ 分隔多机关 →
 * 红头多行上下并列（如「中共云溪镇委员会／云溪镇人民政府」）。
 * 单机关 / 空值原样返回；空白段丢弃。
 */
export function splitAgencies(v?: string): string[] {
  const t = (v ?? '').trim();
  if (!t) return [];
  return t
    .split(/[／/]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * 裸写公文一级标题识别（v0.11.0）：
 * 段落以汉字序数 + 顿号开头（如「一、健全保洁队伍」）且全段无句号 → 一级标题（黑体三号顶格）。
 * 防误伤：段首序数式正文（如「一、加强领导。各村要成立领导小组……」）含句号，仍按正文段落。
 * 返回 null = 普通正文。纯函数（预览/docx/CLI/写作辅助同源）。
 */
export function detectOutlineHeading(text: string): 'h1' | null {
  const t = (text ?? '').trim();
  if (!t) return null;
  if (!/^[一二三四五六七八九十]{1,3}、\S/.test(t)) return null;
  if (t.includes('。')) return null; // 含句号 = 段首序数式正文，不当标题
  return 'h1';
}
