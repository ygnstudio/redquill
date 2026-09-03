"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  VIEW_TYPE_PANEL: () => VIEW_TYPE_PANEL,
  default: () => MdquillPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/paste_clean.ts
function decodeEntities(s) {
  return s.replace(/&nbsp;/gi, "\xA0").replace(/&ensp;/gi, "\u2002").replace(/&emsp;/gi, "\u2003").replace(/&thinsp;/gi, "\u2009").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&apos;/gi, "'").replace(/&amp;/gi, "&").replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)));
}
function htmlToLines(html) {
  let s = String(html ?? "");
  s = s.replace(/<!--[\s\S]*?-->/g, "").replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<(?:head|title|meta|link|noscript|template)[^>]*>[\s\S]*?<\/(?:head|title|meta|link|noscript|template)>/gi, "");
  s = s.replace(
    /<\s*\/?\s*(?:p|div|li|tr|td|th|h[1-6]|table|tbody|thead|tfoot|ul|ol|dl|dt|dd|blockquote|section|article|aside|header|footer|figure|figcaption|pre|br|hr|form|fieldset)[^>]*>/gi,
    "\n"
  );
  s = s.replace(/<[^>]+>/g, "");
  return decodeEntities(s).replace(/[ \t\u00A0\u3000]{2,}/g, " ").split(/\r?\n/).map((l) => trimLine(l)).filter((l) => l.length > 0);
}
function trimLine(line) {
  return (line ?? "").replace(/^[\s\u3000\u00A0]+/, "").replace(/[\s\u3000\u00A0]+$/, "");
}
function tidyLines(lines) {
  const out = [];
  for (const raw of lines) {
    const line = trimLine(raw);
    if (!line) continue;
    if (out.length) out.push("");
    out.push(line);
  }
  return out.join("\n");
}
function cleanPaste(input) {
  const html = (input.html ?? "").trim();
  const text = (input.text ?? "").replace(/\r\n|\r/g, "\n");
  const lines = html ? htmlToLines(html) : text.split("\n");
  return tidyLines(lines);
}

// src/checker.ts
var CJK = "\\u3400-\\u4DBF\\u4E00-\\u9FFF";
var CJK_PUNCT = "\uFF0C\u3002\u3001\uFF1B\uFF1A\uFF1F\uFF01\uFF08\uFF09\u3010\u3011\u300A\u300B\u201C\u201D\u2018\u2019\xB7\u2026\u2014";
var CJK_RE = new RegExp(`[${CJK}]`);
var CJK_CTX = `[${CJK}${CJK_PUNCT}]`;
var PUNCT_DUP = /([。，、；：？！])\1+/g;
var CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028\u2029]/;
var HALF2FULL = {
  ",": "\uFF0C",
  ";": "\uFF1B",
  ":": "\uFF1A",
  "!": "\uFF01",
  "?": "\uFF1F",
  "(": "\uFF08",
  ")": "\uFF09"
};
var FIXABLE = /* @__PURE__ */ new Set(["repeated-punct", "punct-mix", "cjk-latin-space", "control-char", "fullwidth-space"]);
function protectLine(line) {
  const spans = [];
  let s = line;
  const stash = (m) => {
    const i = spans.length;
    spans.push(m);
    return `\uFFFF${i}\uFFFF`;
  };
  s = s.replace(/(`{1,2})[^`\n]*?\1/g, stash);
  s = s.replace(/\[[^\]\n]*\]\([^)\n]*\)/g, stash);
  s = s.replace(/https?:\/\/[^\s\u3400-\u4DBF\u4E00-\u9FFF\u3000，。；：！？（）【】“”‘’<>"')\]]+/gi, stash);
  return { masked: s, spans };
}
function restore(masked, spans) {
  return masked.replace(/\uFFFF(\d+)\uFFFF/g, (_m, d) => spans[Number(d)] ?? "");
}
function fenceState(line, inCode) {
  const t = line.trim();
  if (/^(`{3,}|~{3,})/.test(t)) return !inCode;
  return inCode;
}
function auditLine(lineNo, raw) {
  const out = [];
  const { masked } = protectLine(raw);
  const push = (code, level, message, line = lineNo) => out.push({ code, level, message, line });
  PUNCT_DUP.lastIndex = 0;
  const dup = masked.match(PUNCT_DUP);
  if (dup) push("repeated-punct", "error", `\u91CD\u590D\u6807\u70B9\u300C${dup[0]}\u300D\uFF1A\u8FDE\u53D1\u6807\u70B9\u53EA\u9700\u4E00\u4E2A\uFF08\u300C${dup[0][0]}\u300D\uFF09`);
  const dotSkip = (prev, next) => /[A-Za-z0-9.]/.test((prev ?? "") + (next ?? ""));
  const cjkHits = /* @__PURE__ */ new Set();
  const re1 = new RegExp(`(${CJK_CTX})([,.;:!?()])`, "g");
  for (const m of masked.matchAll(re1)) {
    if (m[2] === "." && dotSkip(void 0, masked[m.index + 2])) continue;
    cjkHits.add(m[2]);
  }
  const re2 = new RegExp(`([,.;:!?()])(${CJK_CTX})`, "g");
  for (const m of masked.matchAll(re2)) {
    if (m[1] === "." && dotSkip(masked[m.index - 1], void 0)) continue;
    cjkHits.add(m[1]);
  }
  if (cjkHits.size) {
    const chars = [...cjkHits];
    const sug = chars.map((p) => p === "." ? "\u3002" : HALF2FULL[p] ?? p).join(" ");
    push("punct-mix", "error", `\u4E2D\u6587\u53E5\u5185\u6DF7\u7528\u534A\u89D2\u6807\u70B9\uFF08${chars.join(" ")}\uFF09\uFF1A\u5EFA\u8BAE\u6539\u5168\u89D2\uFF08${sug}\uFF09`);
  }
  const latinTouch = new RegExp(`([${CJK}])([A-Za-z])|([A-Za-z])([${CJK}])`);
  if (latinTouch.test(masked))
    push("cjk-latin-space", "warn", "\u4E2D\u82F1\u6DF7\u6392\u5EFA\u8BAE\u52A0\u7A7A\u683C\uFF1A\u4E2D\u6587\u4E0E\u82F1\u6587/\u62FC\u97F3\u4E4B\u95F4\u7A7A\u4E00\u683C\uFF08\u5982\u300C\u7528 Obsidian \u5199\u4F5C\u300D\uFF09\uFF1B\u6570\u5B57\u9664\u5916");
  const cnt = (re) => (masked.match(re) ?? []).length;
  const cnOpen = cnt(/（/g);
  const cnClose = cnt(/）/g);
  if (cnOpen !== cnClose)
    push("bracket-mismatch", "error", `\u4E2D\u6587\u62EC\u53F7\u4E0D\u914D\u5BF9\uFF1A\u672C\u884C\uFF08 \u6709 ${cnOpen} \u4E2A\u3001\uFF09 \u6709 ${cnClose} \u4E2A`);
  const sqOpen = cnt(/【/g);
  const sqClose = cnt(/】/g);
  if (sqOpen !== sqClose)
    push("bracket-mismatch", "error", `\u65B9\u5934\u62EC\u53F7\u4E0D\u914D\u5BF9\uFF1A\u672C\u884C\u3010 \u6709 ${sqOpen} \u4E2A\u3001\u3011 \u6709 ${sqClose} \u4E2A`);
  const dq = cnt(/“/g) - cnt(/”/g);
  if (dq % 2 !== 0)
    push("bracket-mismatch", "warn", "\u4E2D\u6587\u53CC\u5F15\u53F7\u7591\u4F3C\u672A\u95ED\u5408\uFF08\u201C \u4E0E \u201D \u6570\u91CF\u4E0D\u7B49\uFF1B\u82E5\u5F15\u6587\u8DE8\u884C\u53EF\u5FFD\u7565\uFF09");
  const sq = cnt(/‘/g) - cnt(/’/g);
  if (sq % 2 !== 0)
    push("bracket-mismatch", "warn", "\u4E2D\u6587\u5355\u5F15\u53F7\u7591\u4F3C\u672A\u95ED\u5408\uFF08\u2018 \u4E0E \u2019 \u6570\u91CF\u4E0D\u7B49\uFF1B\u82E5\u5F15\u6587\u8DE8\u884C\u53EF\u5FFD\u7565\uFF09");
  const hOpen = cnt(/\(/g);
  const hClose = cnt(/\)/g);
  if (hOpen !== hClose)
    push("bracket-mismatch", "warn", `\u534A\u89D2\u62EC\u53F7\u4E0D\u914D\u5BF9\uFF1A\u672C\u884C ( \u6709 ${hOpen} \u4E2A\u3001) \u6709 ${hClose} \u4E2A\uFF08\u4E2D\u6587\u8BED\u5883\u5EFA\u8BAE\u6539\u7528\uFF08 \uFF09\uFF09`);
  if (CJK_RE.test(masked) && /["']/.test(masked) && /(["'])[\u3400-\u4DBF\u4E00-\u9FFF]|[\u3400-\u4DBF\u4E00-\u9FFF](["'])/.test(masked))
    push("straight-quote", "warn", `\u4E2D\u6587\u8BED\u5883\u51FA\u73B0\u76F4\u5F15\u53F7 " ' \uFF1A\u5EFA\u8BAE\u7528\u4E2D\u6587\u5F2F\u5F15\u53F7\u201C \u201D \u2018 \u2019`);
  const dupWord = masked.match(
    /(的的|了了|是是|在在|和和|与与|就就|都都|也也|很很|将将|对对|不不|把把|被被|又又|再再|我们们|你们们|他们们|自己己)/
  );
  if (dupWord) push("dup-word", "warn", `\u7591\u4F3C\u53E0\u5B57\u7B14\u8BEF\u300C${dupWord[1]}\u300D\uFF1A\u6838\u5BF9\u662F\u5426\u91CD\u590D\u8F93\u5165`);
  if (CONTROL.test(masked)) {
    const found = [...new Set(masked.match(new RegExp(CONTROL.source, "g")) ?? [])].map((c) => `U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`).join("\u3001");
    push("control-char", "error", `\u884C\u5185\u6DF7\u5165\u4E0D\u53EF\u89C1\u5B57\u7B26\uFF08${found}\uFF09\uFF1A\u901A\u5E38\u6765\u81EA\u7F51\u9875/\u6587\u6863\u590D\u5236\uFF0C\u53EF\u4E00\u952E\u6E05\u9664`);
  }
  if (masked.includes("\u3000")) push("fullwidth-space", "warn", "\u884C\u5185\u51FA\u73B0\u5168\u89D2\u7A7A\u683C\uFF08U+3000\uFF09\uFF1Amd \u6B63\u6587\u65E0\u9700\u5168\u89D2\u7A7A\u683C\uFF0C\u4E00\u952E\u4FEE\u590D\u4F1A\u8F6C\u4E3A\u666E\u901A\u7A7A\u683C\uFF08\u884C\u9996\u7684\u5220\u9664\uFF09");
  return out;
}
function fixLine(raw) {
  const { masked, spans } = protectLine(raw);
  let s = masked;
  s = s.replace(new RegExp(CONTROL.source, "g"), "");
  s = s.replace(PUNCT_DUP, (_m, p) => p);
  const re1 = new RegExp(`(${CJK_CTX})([,.;:!?()])`, "g");
  s = s.replace(re1, (m, c, p, off) => {
    if (p === "." && /[A-Za-z0-9.]/.test(s[off + 2] ?? "")) return m;
    return c + (HALF2FULL[p] ?? "\u3002");
  });
  const re2 = new RegExp(`([,.;:!?()])(${CJK_CTX})`, "g");
  s = s.replace(re2, (m, p, c, off) => {
    if (p === "." && /[A-Za-z0-9.]/.test(s[off - 1] ?? "")) return m;
    return (HALF2FULL[p] ?? "\u3002") + c;
  });
  s = s.replace(new RegExp(`([${CJK}])([A-Za-z])`, "g"), "$1 $2");
  s = s.replace(new RegExp(`([A-Za-z])([${CJK}])`, "g"), "$1 $2");
  s = s.replace(/^\u3000+/, "").replace(/\u3000/g, " ");
  return restore(s, spans);
}
function checkDocument(md0) {
  const md = md0.replace(/^\uFEFF/, "");
  const lines = md.split("\n");
  const issues = [];
  let inFm = false;
  let inCode = false;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();
    if (i === 0 && /^-{3,}\s*$/.test(t)) {
      inFm = true;
      continue;
    }
    if (inFm) {
      if (/^-{3,}\s*$/.test(t)) inFm = false;
      continue;
    }
    const nextCode = fenceState(raw, inCode);
    if (nextCode !== inCode) {
      inCode = nextCode;
      continue;
    }
    if (inCode) continue;
    issues.push(...auditLine(i + 1, raw));
  }
  return issues;
}
function fixAll(md0) {
  const md = md0.replace(/^\uFEFF/, "");
  const lines = md.split("\n");
  const out = [];
  let inFm = false;
  let inCode = false;
  for (const raw of lines) {
    const t = raw.trim();
    if (out.length === 0 && /^-{3,}\s*$/.test(t)) {
      inFm = true;
      out.push(raw);
      continue;
    }
    if (inFm) {
      out.push(raw);
      if (/^-{3,}\s*$/.test(t)) inFm = false;
      continue;
    }
    const nextCode = fenceState(raw, inCode);
    if (nextCode !== inCode) {
      inCode = nextCode;
      out.push(raw);
      continue;
    }
    out.push(inCode ? raw : fixLine(raw));
  }
  return out.join("\n");
}
function isFixable(code) {
  return FIXABLE.has(code);
}

// src/mdast.ts
function fenceState2(line, inCode) {
  const t = line.trim();
  if (/^(`{3,}|~{3,})/.test(t)) return !inCode;
  return inCode;
}
function outlineOf(md0) {
  const md = md0.replace(/^\uFEFF/, "");
  const lines = md.split("\n");
  const out = [];
  let inFm = false;
  let inCode = false;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();
    if (i === 0 && /^-{3,}\s*$/.test(t)) {
      inFm = true;
      continue;
    }
    if (inFm) {
      if (/^-{3,}\s*$/.test(t)) inFm = false;
      continue;
    }
    const nextCode = fenceState2(raw, inCode);
    if (nextCode !== inCode) {
      inCode = nextCode;
      continue;
    }
    if (inCode) continue;
    const m = raw.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);
    if (m) {
      const text = m[2].replace(/\s+#+\s*$/, "").trim();
      if (text) out.push({ level: m[1].length, text, line: i + 1 });
    }
  }
  return out;
}
function charStats(text) {
  let chinese = 0;
  let nonspace = 0;
  let total = 0;
  for (const ch of text.replace(/^\uFEFF/, "")) {
    total += 1;
    if (/[\u3400-\u4DBF\u4E00-\u9FFF]/.test(ch)) chinese += 1;
    if (!/\s/.test(ch)) nonspace += 1;
  }
  return { chinese, nonspace, total };
}

// src/settings_util.ts
var DEFAULT_SETTINGS = {
  autoClean: false
};
function sanitizeSettings(raw) {
  if (typeof raw !== "object" || raw === null) return { ...DEFAULT_SETTINGS };
  const o = raw;
  return {
    autoClean: typeof o.autoClean === "boolean" ? o.autoClean : DEFAULT_SETTINGS.autoClean
  };
}

// src/main.ts
var VIEW_TYPE_PANEL = "mdquill-panel";
var CheckReportModal = class extends import_obsidian.Modal {
  constructor(plugin, file, editor, issues) {
    super(plugin.app);
    this.plugin = plugin;
    this.file = file;
    this.editor = editor;
    this.issues = issues;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const errs = this.issues.filter((i) => i.level === "error").length;
    const warns = this.issues.length - errs;
    contentEl.createEl("h3", {
      text: this.issues.length ? `\u4E2D\u6587\u6392\u7248\u4F53\u68C0\uFF1A${errs} \u5904\u9700\u5904\u7406\uFF0C${warns} \u5904\u5EFA\u8BAE` : "\u6392\u7248\u4F53\u68C0\uFF1A\u901A\u8FC7"
    });
    contentEl.createEl("p", {
      text: "\u673A\u5668\u81EA\u67E5\u53EA\u63D0\u793A\u3001\u4E0D\u4FEE\u6539\u3002error=\u660E\u663E\u9519\u8BEF\uFF0Cwarn=\u89C4\u8303\u5EFA\u8BAE\u3002\u70B9\u300C\u7B2C N \u884C\u300D\u8DF3\u5230\u6E90\u7801\u5BF9\u5E94\u4F4D\u7F6E\uFF1B\u53EF\u4E00\u952E\u4FEE\u590D\u7684\u9879\u4F1A\u6807\u6CE8\u3002",
      cls: "setting-item-description"
    });
    if (!this.issues.length) {
      contentEl.createEl("p", { text: "\u672A\u53D1\u73B0\u95EE\u9898\u3002", cls: "setting-item-description" });
      return;
    }
    const list = contentEl.createEl("div", { cls: "mdquill-check-list" });
    for (const it of this.issues) {
      const row = list.createEl("div", { cls: `mdquill-check-item ${it.level}` });
      row.createEl("span", { cls: "mdquill-check-badge", text: it.level === "error" ? "\u9700\u5904\u7406" : "\u5EFA\u8BAE" });
      row.createEl("span", { cls: "mdquill-check-msg", text: it.message });
      if (isFixable(it.code)) row.createEl("span", { cls: "mdquill-check-fix", text: "\u53EF\u4E00\u952E\u4FEE\u590D" });
      if (it.line !== void 0) {
        const ln = row.createEl("span", { cls: "mdquill-check-line", text: `\u7B2C ${it.line} \u884C \u2197` });
        ln.addEventListener("click", () => {
          this.jumpTo(it.line);
          this.close();
        });
      }
    }
  }
  jumpTo(line) {
    const ed = this.editor;
    const l = Math.max(0, line - 1);
    ed.setCursor({ line: l, ch: 0 });
    ed.scrollIntoView({ from: { line: l, ch: 0 }, to: { line: l, ch: 0 } }, true);
  }
  onClose() {
    this.contentEl.empty();
  }
};
var MdquillPanelView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.pending = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_PANEL;
  }
  getDisplayText() {
    return "\u5199\u4F5C\u9762\u677F";
  }
  getIcon() {
    return "pen-tool";
  }
  async onOpen() {
    this.registerEvent(this.plugin.app.workspace.on("active-leaf-change", () => this.schedule()));
    this.registerEvent(this.plugin.app.workspace.on("editor-change", () => this.schedule()));
    this.renderPanel();
  }
  /** 合并触发：200ms 内多次事件只渲一次 */
  schedule() {
    if (this.pending !== null) window.clearTimeout(this.pending);
    this.pending = window.setTimeout(() => {
      this.pending = null;
      this.renderPanel();
    }, 200);
  }
  renderPanel() {
    const el = this.contentEl;
    el.empty();
    el.createEl("h4", { text: "MDQuill \u5199\u4F5C\u9762\u677F" });
    const mv = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (!mv?.file) {
      el.createEl("p", {
        text: "\u6253\u5F00\u4E00\u4E2A md \u7B14\u8BB0\u540E\uFF0C\u8FD9\u91CC\u663E\u793A\u5B57\u6570\u3001\u6392\u7248\u4F53\u68C0\u901F\u89C8\u4E0E\u6807\u9898\u6811\u3002",
        cls: "setting-item-description"
      });
      return;
    }
    const editor = mv.editor;
    const text = editor.getValue();
    const cursor = editor.getCursor();
    const st = charStats(text);
    const card1 = el.createEl("div", { cls: "mdquill-card" });
    card1.createEl("div", { cls: "mdquill-card-title", text: "\u5B57\u6570" });
    const stat = card1.createEl("div", { cls: "mdquill-stats" });
    stat.createSpan({ text: `\u4E2D\u6587 ${st.chinese}` });
    stat.createSpan({ text: `\u975E\u7A7A\u767D ${st.nonspace}` });
    stat.createSpan({ text: `\u603B\u5B57\u7B26 ${st.total}` });
    const paragraphs = text.split("\n").filter((l) => l.trim().length > 0).length;
    stat.createSpan({ text: `\u6BB5 ${paragraphs}` });
    stat.createSpan({ text: `\u5149\u6807\u7B2C ${cursor.line + 1} \u884C` });
    const issues = checkDocument(text);
    const errs = issues.filter((i) => i.level === "error").length;
    const warns = issues.length - errs;
    const card2 = el.createEl("div", { cls: "mdquill-card" });
    const head2 = card2.createEl("div", { cls: "mdquill-card-head" });
    head2.createEl("div", { cls: "mdquill-card-title", text: `\u6807\u70B9\u4F53\u68C0${issues.length ? `\uFF1A${errs} \u5904\u9700\u5904\u7406 / ${warns} \u5904\u5EFA\u8BAE` : "\uFF1A\u901A\u8FC7"}` });
    const btn2 = head2.createEl("button", { text: issues.length ? "\u770B\u62A5\u544A" : "\u518D\u4F53\u68C0", cls: "mdquill-btn" });
    btn2.addEventListener("click", () => {
      if (mv.file) new CheckReportModal(this.plugin, mv.file, editor, issues).open();
    });
    const items = outlineOf(text);
    const card3 = el.createEl("div", { cls: "mdquill-card" });
    card3.createEl("div", { cls: "mdquill-card-title", text: `\u6807\u9898\u6811${items.length ? `\uFF08${items.length}\uFF09` : ""}` });
    if (!items.length) {
      card3.createEl("div", { cls: "setting-item-description", text: "\u8FD8\u6CA1\u6709 # \u4E00\u7EA7\u6807\u9898\u3002\u70B9\u4E0B\u65B9\u300C\u63D2\u5165\u300D\u91CC\u7684 # \u5F00\u59CB\u3002" });
    } else {
      const tree = card3.createEl("div", { cls: "mdquill-tree" });
      let activeIdx = -1;
      for (let i = 0; i < items.length; i++) if (items[i].line <= cursor.line + 1) activeIdx = i;
      items.forEach((it, i) => {
        const row = tree.createEl("div", {
          cls: `mdquill-tree-item mdquill-h${it.level}${i === activeIdx ? " active" : ""}`,
          text: it.text
        });
        row.title = `\u7B2C ${it.line} \u884C \xB7 \u70B9\u51FB\u8DF3\u8F6C`;
        row.addEventListener("click", () => {
          editor.setCursor({ line: it.line - 1, ch: 0 });
          editor.scrollIntoView({ from: { line: it.line - 1, ch: 0 }, to: { line: it.line - 1, ch: 0 } }, true);
          editor.focus();
        });
      });
    }
    const card4 = el.createEl("div", { cls: "mdquill-card" });
    card4.createEl("div", { cls: "mdquill-card-title", text: "\u63D2\u5165\uFF08\u5149\u6807\u5904\uFF09" });
    const grid = card4.createEl("div", { cls: "mdquill-btns" });
    const mk = (label, snippet, tip = "") => {
      const b = grid.createEl("button", { text: label, cls: "mdquill-btn" });
      b.title = tip || snippet;
      b.addEventListener("click", () => {
        editor.replaceSelection(snippet);
        editor.focus();
        this.schedule();
      });
    };
    mk("# \u6807\u9898", "# ");
    mk("\u8868\u683C 3\xD73", "| \u9879\u76EE | \u8BF4\u660E |\n| :--- | :--- |\n|  |  |\n|  |  |", "md \u8868\u683C\uFF1A\u9996\u884C\u8868\u5934\uFF0C:--- \u5DE6\u5BF9\u9F50 / :---: \u5C45\u4E2D / ---: \u53F3\u5BF9\u9F50");
    mk("\u5F15\u7528", "> ");
    mk("\u4EE3\u7801\u5757", "```\n\n```");
    mk("\u6298\u53E0\u5757", "> [!note] \u6807\u9898\n> \u5185\u5BB9", "Obsidian \u63D0\u793A\u5757\uFF1Anote/tip/warning \u7B49\u7C7B\u578B\u53EF\u6362");
    mk("\u5F85\u529E\u9879", "- [ ] ");
    mk("\u5206\u9694\u7EBF", "\n---\n");
    mk("\u56FE\u7247\u5360\u4F4D", "![\u8BF4\u660E](https://)", "\u5199\u7B14\u8BB0\u65F6\u7559\u4F4D\uFF0C\u5BFC\u51FA\u524D\u66FF\u6362\u4E3A\u771F\u5B9E\u94FE\u63A5");
    if (!st.nonspace) {
      const card5 = el.createEl("div", { cls: "mdquill-card mdquill-empty-hint" });
      card5.createEl("div", { text: "\u7A7A\u7B14\u8BB0\u3002\u76F4\u63A5\u5F00\u59CB\u5199\uFF1A\u6807\u9898\u7528 # \u5F00\u5934\uFF0C\u6BB5\u843D\u95F4\u7A7A\u4E00\u884C\u3002\u5199\u5B8C\u540E\u8FD0\u884C\u300C\u6392\u7248\u4F53\u68C0\u300D\uFF0C\u7C98\u8D34\u5916\u6765\u5185\u5BB9\u524D\u8FD0\u884C\u300C\u7C98\u8D34\u5E76\u51C0\u5316\u300D\u3002" });
    }
  }
};
var MdquillSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h3", { text: "MDQuill \u8BBE\u7F6E" });
    new import_obsidian.Setting(containerEl).setName("\u81EA\u52A8\u51C0\u5316\u7C98\u8D34").setDesc("\u5F00\u542F\u540E\uFF0C\u5728\u7B14\u8BB0\u7F16\u8F91\u5668\u91CC\u7C98\u8D34\u6765\u81EA\u7F51\u9875/Word/WPS \u7684\u5185\u5BB9\u4F1A\u81EA\u52A8\u6E05\u6D17\u683C\u5F0F\uFF08\u4EC5\u5F53\u526A\u8D34\u677F\u5E26 HTML \u6837\u5F0F\u65F6\u624D\u5904\u7406\uFF0C\u7EAF\u6587\u672C\u76F4\u901A\uFF09\u3002\u9ED8\u8BA4\u5173\u95ED\uFF0C\u4E5F\u53EF\u968F\u65F6\u7528\u547D\u4EE4\u300C\u7C98\u8D34\u5E76\u51C0\u5316\u300D\u3002").addToggle((t) => {
      t.setValue(this.plugin.settings.autoClean).onChange(async (v) => {
        this.plugin.settings.autoClean = v;
        await this.plugin.saveSettings();
      });
    });
    containerEl.createEl("p", {
      text: "\u547D\u4EE4\u901F\u67E5\uFF1A\u6392\u7248\u4F53\u68C0 / \u4E00\u952E\u4FEE\u590D\u6392\u7248\u95EE\u9898 / \u7C98\u8D34\u5E76\u51C0\u5316 / \u6E05\u6D17\u9009\u533A / \u6253\u5F00\u5199\u4F5C\u9762\u677F\u3002",
      cls: "setting-item-description"
    });
  }
};
var MdquillPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
  }
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_PANEL, (leaf) => new MdquillPanelView(leaf, this));
    this.addSettingTab(new MdquillSettingTab(this.app, this));
    this.addRibbonIcon("pen-tool", "MDQuill\uFF1A\u6253\u5F00\u5199\u4F5C\u9762\u677F", () => this.openPanel());
    this.addCommand({
      id: "open-panel",
      name: "\u6253\u5F00\u5199\u4F5C\u9762\u677F\uFF08\u5B57\u6570/\u4F53\u68C0\u901F\u89C8/\u6807\u9898\u6811/\u5FEB\u6377\u63D2\u5165\uFF09",
      callback: () => this.openPanel()
    });
    this.addCommand({
      id: "check",
      name: "\u6392\u7248\u4F53\u68C0\uFF08\u5F53\u524D\u7B14\u8BB0\uFF09",
      callback: () => this.runCheck()
    });
    this.addCommand({
      id: "fix-all",
      name: "\u4E00\u952E\u4FEE\u590D\u6392\u7248\u95EE\u9898\uFF08\u5F53\u524D\u7B14\u8BB0\uFF0C\u4EC5\u65E0\u6B67\u4E49\u9879\uFF0C\u9010\u884C\u53EF\u64A4\u9500\uFF09",
      editorCallback: (editor) => this.runFix(editor)
    });
    this.addCommand({
      id: "paste-clean",
      name: "\u7C98\u8D34\u5E76\u51C0\u5316\uFF08\u6E05\u6D17\u526A\u8D34\u677F\u683C\u5F0F\u540E\u63D2\u5165\u5149\u6807\u5904\uFF09",
      editorCallback: (editor) => void this.pasteClean(editor)
    });
    this.addCommand({
      id: "clean-selection",
      name: "\u6E05\u6D17\u9009\u533A / \u5F53\u524D\u6BB5\uFF08\u53BB\u884C\u9996\u5C3E\u7A7A\u683C\u4E0E\u591A\u4F59\u7A7A\u884C\uFF09",
      editorCallback: (editor) => this.cleanSelection(editor)
    });
    this.registerDomEvent(
      document,
      "paste",
      (evt) => {
        if (!this.settings.autoClean) return;
        const target = evt.target;
        if (!target || !target.closest(".cm-content")) return;
        const hit = this.app.workspace.getLeavesOfType("markdown").map((leaf) => leaf.view).find((v) => v.contentEl.contains(target)) ?? null;
        if (!hit) return;
        const html = evt.clipboardData?.getData("text/html") ?? "";
        const text = evt.clipboardData?.getData("text/plain") ?? "";
        const cleaned = cleanPaste({ html, text });
        if (!html || !cleaned || cleaned === (text || "").trim()) return;
        evt.preventDefault();
        hit.editor.replaceSelection(cleaned);
        new import_obsidian.Notice("MDQuill\uFF1A\u5DF2\u81EA\u52A8\u51C0\u5316\u7C98\u8D34\uFF08\u53BB\u683C\u5F0F\u3001\u538B\u7A7A\u884C\uFF09\u3002", 4e3);
      },
      { capture: true }
    );
  }
  async loadSettings() {
    const raw = await this.loadData();
    this.settings = sanitizeSettings(raw);
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  /* ---- 面板 ---- */
  openPanel() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_PANEL)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      existing.view.renderPanel();
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    void leaf.setViewState({ type: VIEW_TYPE_PANEL, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  /* ---- 体检 ---- */
  runCheck() {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (!mv?.file) {
      new import_obsidian.Notice("MDQuill\uFF1A\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A md \u7B14\u8BB0\u3002", 4e3);
      return;
    }
    const issues = checkDocument(mv.editor.getValue());
    new CheckReportModal(this, mv.file, mv.editor, issues).open();
  }
  /** 一键修复：只改有变动的行（replaceRange 逐行，保留 Ctrl+Z 撤销） */
  runFix(editor) {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (!mv) return;
    const text = editor.getValue();
    const fixed = fixAll(text);
    if (fixed === text) {
      new import_obsidian.Notice("MDQuill\uFF1A\u6CA1\u6709\u53EF\u81EA\u52A8\u4FEE\u590D\u7684\u95EE\u9898\uFF08\u53EA\u4FEE\u65E0\u6B67\u4E49\u9879\uFF09\u3002", 4e3);
      return;
    }
    const oldLines = text.split("\n");
    const newLines = fixed.split("\n");
    let changed = 0;
    const n = Math.min(oldLines.length, newLines.length);
    for (let i = 0; i < n; i++) {
      if (oldLines[i] !== newLines[i]) {
        editor.replaceRange(newLines[i], { line: i, ch: 0 }, { line: i, ch: oldLines[i].length });
        changed++;
      }
    }
    new import_obsidian.Notice(`MDQuill\uFF1A\u5DF2\u4FEE\u590D ${changed} \u884C\uFF08Ctrl+Z \u53EF\u9010\u884C\u64A4\u9500\uFF09\u3002`, 5e3);
  }
  /* ---- 粘贴清洗 ---- */
  /** 粘贴并净化：读剪贴板（html 优先）→ 清洗 → 替换光标选区 */
  async pasteClean(editor) {
    let html = "";
    let text = "";
    try {
      const cb = navigator.clipboard;
      if (cb?.read) {
        for (const item of await cb.read()) {
          const t = await item.getType("text/html").then((b) => b.text()).catch(() => null);
          if (t) html = t;
          const tx = await item.getType("text/plain").then((b) => b.text()).catch(() => null);
          if (tx) text = tx;
        }
      } else if (cb?.readText) {
        text = await cb.readText();
      }
    } catch {
    }
    if (!html && !text) {
      new import_obsidian.Notice("MDQuill\uFF1A\u8BFB\u4E0D\u5230\u526A\u8D34\u677F\u3002\u8BF7\u5148\u590D\u5236\u5185\u5BB9\uFF0C\u6216\u7C98\u8D34\u540E\u8FD0\u884C\u300C\u6E05\u6D17\u9009\u533A / \u5F53\u524D\u6BB5\u300D\u3002", 6e3);
      return;
    }
    const cleaned = cleanPaste({ html, text });
    if (!cleaned) {
      new import_obsidian.Notice("MDQuill\uFF1A\u526A\u8D34\u677F\u4E2D\u6CA1\u6709\u53EF\u7C98\u8D34\u7684\u6587\u5B57\u5185\u5BB9\u3002", 4e3);
      return;
    }
    editor.replaceSelection(cleaned);
    new import_obsidian.Notice("MDQuill\uFF1A\u5DF2\u6E05\u6D17\u63D2\u5165\uFF08\u53BB\u6807\u7B7E\u6837\u5F0F\u3001\u884C\u9996\u5C3E\u7A7A\u767D\u3001\u538B\u7F29\u7A7A\u884C\uFF09\u3002", 5e3);
  }
  /** 清洗选区 / 当前段（不依赖剪贴板） */
  cleanSelection(editor) {
    const sel = editor.getSelection();
    if (sel.trim()) {
      editor.replaceSelection(cleanPaste({ text: sel }));
      new import_obsidian.Notice("MDQuill\uFF1A\u9009\u533A\u5DF2\u6E05\u6D17\u3002", 4e3);
      return;
    }
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    const cleaned = cleanPaste({ text: line });
    if (cleaned === line) {
      new import_obsidian.Notice("MDQuill\uFF1A\u5F53\u524D\u884C\u672C\u5C31\u5E72\u51C0\uFF08\u65E0\u884C\u9996\u5C3E\u7A7A\u683C/\u591A\u4F59\u7A7A\u884C\uFF09\u3002", 4e3);
      return;
    }
    editor.replaceRange(cleaned, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
    new import_obsidian.Notice("MDQuill\uFF1A\u5F53\u524D\u884C\u5DF2\u6E05\u6D17\u3002", 4e3);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VIEW_TYPE_PANEL
});
