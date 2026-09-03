/**
 * templates.ts —— 公文文种骨架 + 新建向导（v0.11.0 从 main.ts 抽出）
 *
 * 纯模块、无 Obsidian 依赖（entry/verify 可直接 bundle 校验）。
 * 文种骨架两个用法：
 *  1. 安装到 Obsidian 模板文件夹（设置页勾选批量/单个安装）→ 官方「插入模板」使用
 *  2. 新建公文向导（命令「新建公文」）→ buildNewGongwen 直接落新文件
 */

/* ------------------------------------------------------------------ */
/* 公文文种骨架（安装到 Obsidian 模板文件夹，用官方模板功能插入）        */
/* 红头要素写在 frontmatter 的 redhead 块，填了才渲染；不需要红头删掉即可 */
/* ------------------------------------------------------------------ */

const RED_HEAD_FM = `---
rh-agency: XX镇人民政府文件
rh-logo:
rh-docNumber: X政发〔2026〕X号
rh-signer:
rh-copyNumber:
rh-secretLevel:
rh-urgency:
---`;

/** Templater 弹窗版 frontmatter：插入时弹窗输入机关标志与发文字号，其余要素手动补 */
const RED_HEAD_FM_TP = `---
rh-agency: <% tp.system.prompt("发文机关标志（如：XX镇人民政府文件）", "XX镇人民政府文件") %>
rh-docNumber: <% tp.system.prompt("发文字号（如：X政发〔2026〕X号）", "X政发〔2026〕X号") %>
rh-signer:
rh-copyNumber:
rh-secretLevel:
rh-urgency:
---`;

/** 普通骨架 → Templater 弹窗版：frontmatter 弹窗 + 标题弹窗 + 落款日期自动 */
export function toTemplaterSkeleton(skeleton: string): string {
  return skeleton
    .replace(RED_HEAD_FM, RED_HEAD_FM_TP)
    .replace(/^# (.*)$/m, (_m, t: string) => `# <% tp.system.prompt("公文标题", "${t}") %>`)
    .replace(/2026年X月X日/g, '<% tp.date.now("YYYY年M月D日") %>');
}

export const GONGWEN_TEMPLATES: Record<string, string> = {
  '公文模板-通知': `${RED_HEAD_FM}

# 关于XXXX的会议通知

各部门：

根据上级工作要求，为进一步推进XX工作开展，决定召开XX工作推进会。现将有关事项通知如下：

## 一、会议时间

2026年X月X日 上午9:00。

## 二、会议地点

XX路XX号 XX会议室。

## 三、参会人员

XX、XX、各科室负责人。

## 四、有关要求

参会人员着正装，提前10分钟入场，会议期间手机静音。

联系人：XXX　电话：XXX-XXXXXXXX

XX单位

2026年X月X日
`,
  '公文模板-请示': `${RED_HEAD_FM}

# 关于XXXX的请示

XX（上级机关）：

根据XX要求（缘由），我单位拟XXXX（事项）。现将有关情况报告如下：

## 一、基本情况

## 二、主要事项

## 三、有关建议

妥否，请批示。

XX单位

2026年X月X日
`,
  '公文模板-答复': `${RED_HEAD_FM}

# 关于XXXX的复函

XX单位：

你单位《关于XXXX的函》收悉。经研究，现答复如下：

## 一、关于XXXX问题

## 二、关于XXXX问题

以上意见供参考。

XX单位

2026年X月X日
`,
  '公文模板-报告': `${RED_HEAD_FM}

# 关于XXXX的报告

XX（上级机关）：

根据XX要求，现将XXXX情况报告如下：

## 一、基本情况

## 二、存在问题

## 三、下一步工作打算

特此报告。

XX单位

2026年X月X日
`,
  '公文模板-批复': `${RED_HEAD_FM}

# 关于XXXX的批复

XX单位：

你单位《关于XXXX的请示》（X字〔2026〕X号）收悉。经研究，现批复如下：

## 一、同意XXXX

## 二、XXXX

此复。

XX单位

2026年X月X日
`,
  '公文模板-函': `${RED_HEAD_FM}

# 关于XXXX的函

XX单位：

为了XXXX，现商请贵单位协助做好以下工作：

## 一、XXXX

## 二、XXXX

妥否，盼函复。

XX单位

2026年X月X日
`,
  '公文模板-纪要': `${RED_HEAD_FM}

# XXXX会议纪要

2026年X月X日，XXX在XX主持召开XXXX会议，听取XXXX情况汇报，研究部署XXXX工作。现将会议议定事项纪要如下：

## 一、会议听取了XXXX

## 二、会议指出XXXX

## 三、会议决定XXXX

参会人员：XXX、XXX。
`,
  '公文模板-决定': `${RED_HEAD_FM}

# 关于XXXX的决定

各部门（单位）：

为了XXXX，根据XXXX，经研究，决定：

## 一、XXXX

## 二、XXXX

## 三、XXXX

本决定自2026年X月X日起施行。

XX单位

2026年X月X日
`,
  '公文模板-决议': `${RED_HEAD_FM}

# 关于XXXX的决议

XXXX会议于2026年X月X日审议通过，现予公布。

## 一、会议认为XXXX

## 二、会议决定XXXX

## 三、会议要求XXXX

本决议自公布之日起施行。
`,
  '公文模板-命令': `${RED_HEAD_FM}

# XXXX令

（第 X 号）

《XXXX》已经XXXX会议通过，现予公布，自2026年X月X日起施行。

签发人：XXX

2026年X月X日
`,
  '公文模板-公报': `${RED_HEAD_FM}

# XXXX公报

XXXX会议于2026年X月X日至X日举行。会议主要情况如下：

## 一、会议概况

## 二、主要成果

## 三、其他事项
`,
  '公文模板-公告': `${RED_HEAD_FM}

# 关于XXXX的公告

根据XXXX，现将XXXX有关事项公告如下：

## 一、XXXX

## 二、XXXX

本公告自发布之日起施行。

特此公告。

XX单位

2026年X月X日
`,
  '公文模板-通告': `${RED_HEAD_FM}

# 关于XXXX的通告

为XXXX，经研究决定，现就有关事项通告如下：

## 一、XXXX

## 二、XXXX

违反本通告规定的，由XXXX依法处理。

特此通告。

XX单位

2026年X月X日
`,
  '公文模板-意见': `${RED_HEAD_FM}

# 关于XXXX的意见

各部门（单位）：

为XXXX，现提出如下意见：

## 一、总体要求

## 二、主要任务

## 三、保障措施

以上意见，请结合实际认真贯彻执行。

XX单位

2026年X月X日
`,
  '公文模板-通报': `${RED_HEAD_FM}

# 关于XXXX的通报

各部门（单位）：

XXXX。现将有关情况通报如下：

## 一、基本情况

## 二、处理意见

## 三、工作要求

XX单位

2026年X月X日
`,
  '公文模板-议案': `${RED_HEAD_FM}

# 关于提请审议XXXX的议案

XX人民代表大会：

为了XXXX，依据XXXX，拟提请审议《XXXX（草案）》。请予审议。

XX单位

2026年X月X日
`,
};

/** 公文文种说明（设置页模板清单用） */
export const TEMPLATE_META: Record<string, { label: string; desc: string }> = {
  '公文模板-通知': { label: '通知', desc: '发布要求、传达事项、转发文件（下行文，最常用）' },
  '公文模板-请示': { label: '请示', desc: '向上级请求指示、批准（上行文，带签发人）' },
  '公文模板-报告': { label: '报告', desc: '向上级汇报工作、反映情况、答复询问（上行文）' },
  '公文模板-批复': { label: '批复', desc: '答复下级机关请示事项（下行文）' },
  '公文模板-答复': { label: '复函', desc: '答复来函询问事项（平行文）' },
  '公文模板-函': { label: '函', desc: '不相隶属机关间商洽工作、询问答复（平行文）' },
  '公文模板-纪要': { label: '纪要', desc: '记载会议主要情况和议定事项' },
  '公文模板-通报': { label: '通报', desc: '表彰先进、批评错误、传达重要精神' },
  '公文模板-意见': { label: '意见', desc: '对重要问题提出见解和处理办法' },
  '公文模板-决定': { label: '决定', desc: '对重要事项作出决策部署' },
  '公文模板-决议': { label: '决议', desc: '会议讨论通过的重大决策事项' },
  '公文模板-命令': { label: '命令（令）', desc: '公布行政法规、宣布重大强制性行政措施' },
  '公文模板-公报': { label: '公报', desc: '公布重要决定或重大事项' },
  '公文模板-公告': { label: '公告', desc: '向国内外宣布重要事项' },
  '公文模板-通告': { label: '通告', desc: '一定范围内公布应当遵守或周知的事项' },
  '公文模板-议案': { label: '议案', desc: '按法律程序向同级人大提请审议事项' },
};

/** 公文模板分组：按行文方向折叠展示（设置页） */
export const TEMPLATE_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: '对上 · 上行文',
    keys: ['公文模板-请示', '公文模板-报告', '公文模板-议案'],
  },
  {
    label: '平级 · 平行文',
    keys: ['公文模板-答复', '公文模板-函'],
  },
  {
    label: '对下 · 下行文',
    keys: [
      '公文模板-通知',
      '公文模板-批复',
      '公文模板-通报',
      '公文模板-意见',
      '公文模板-决定',
      '公文模板-决议',
      '公文模板-命令',
      '公文模板-公报',
      '公文模板-公告',
      '公文模板-通告',
      '公文模板-纪要',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 新建公文向导（v0.11.0）—— 纯函数：模板 → 新文件内容                    */
/* ------------------------------------------------------------------ */

/** 向导参数 */
export interface NewGongwenOpts {
  /** GONGWEN_TEMPLATES 的键（16 文种） */
  templateKey: string;
  /** 公文标题：替换模板首个 # 标题行（空 = 保留模板占位） */
  title?: string;
  /** 默认发文机关（设置项 defaultAgency）：替换 frontmatter rh-agency（空 = 保留模板占位） */
  agency?: string;
  /** 年份（默认当前年）：模板内写死的 2026 全部换为该年 */
  year?: number;
  /** 文件名（可含子路径、不带 .md；空 = 按标题/文种自动生成） */
  fileName?: string;
}

/** 文件名清洗：去掉 md 文件名非法字符 / 控制符，压缩空白 */
export function sanitizeFileName(name: string): string {
  return (name ?? '')
    .replace(/[\\/:*?"<>|#^\[\]\u0000-\u001f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 新建公文：文种骨架 + 默认机关/标题/年份替换 → 待落盘内容与文件名 */
export function buildNewGongwen(o: NewGongwenOpts): { fileName: string; content: string } {
  const skeleton = GONGWEN_TEMPLATES[o.templateKey] ?? GONGWEN_TEMPLATES['公文模板-通知'];
  const year = o.year ?? new Date().getFullYear();
  let content = skeleton.replace(/\b2026\b/g, String(year));
  const agency = (o.agency ?? '').trim();
  if (agency) content = content.replace(/^rh-agency: .*$/m, `rh-agency: ${agency}`);
  const title = (o.title ?? '').trim();
  if (title) content = content.replace(/^# .*$/m, `# ${title}`);
  const docLabel = TEMPLATE_META[o.templateKey]?.label ?? o.templateKey.replace('公文模板-', '');
  let fileName = sanitizeFileName(o.fileName ?? '');
  if (!fileName) fileName = sanitizeFileName(title) || `公文-${docLabel}-${year}`;
  return { fileName: fileName.replace(/\.md$/i, '') + '.md', content };
}

/** 向导条目（FuzzySuggest 按 label/desc/group 搜索） */
export interface NewDocItem {
  key: string;
  label: string;
  desc: string;
  group: string;
}

export const NEW_DOC_ITEMS: NewDocItem[] = TEMPLATE_GROUPS.flatMap((g) =>
  g.keys.map((k) => ({
    key: k,
    label: TEMPLATE_META[k]?.label ?? k.replace('公文模板-', ''),
    desc: TEMPLATE_META[k]?.desc ?? '',
    group: g.label,
  })),
);
