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
  GONGWEN_TEMPLATES: () => GONGWEN_TEMPLATES,
  RedQuillPlugin: () => RedQuillPlugin,
  VIEW_TYPE_PANEL: () => VIEW_TYPE_PANEL,
  VIEW_TYPE_PREVIEW: () => VIEW_TYPE_PREVIEW,
  VIEW_TYPE_WRITEASSIST: () => VIEW_TYPE_WRITEASSIST,
  applyFrontmatter: () => applyFrontmatter,
  default: () => main_default,
  toTemplaterSkeleton: () => toTemplaterSkeleton
});
module.exports = __toCommonJS(main_exports);
var import_obsidian6 = require("obsidian");

// node_modules/marked/lib/marked.esm.js
function _getDefaults() {
  return {
    async: false,
    breaks: false,
    extensions: null,
    gfm: true,
    hooks: null,
    pedantic: false,
    renderer: null,
    silent: false,
    tokenizer: null,
    walkTokens: null
  };
}
var _defaults = _getDefaults();
function changeDefaults(newDefaults) {
  _defaults = newDefaults;
}
var noopTest = { exec: () => null };
function edit(regex, opt = "") {
  let source = typeof regex === "string" ? regex : regex.source;
  const obj = {
    replace: (name, val) => {
      let valSource = typeof val === "string" ? val : val.source;
      valSource = valSource.replace(other.caret, "$1");
      source = source.replace(name, valSource);
      return obj;
    },
    getRegex: () => {
      return new RegExp(source, opt);
    }
  };
  return obj;
}
var other = {
  codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
  outputLinkReplace: /\\([\[\]])/g,
  indentCodeCompensation: /^(\s+)(?:```)/,
  beginningSpace: /^\s+/,
  endingHash: /#$/,
  startingSpaceChar: /^ /,
  endingSpaceChar: / $/,
  nonSpaceChar: /[^ ]/,
  newLineCharGlobal: /\n/g,
  tabCharGlobal: /\t/g,
  multipleSpaceGlobal: /\s+/g,
  blankLine: /^[ \t]*$/,
  doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
  blockquoteStart: /^ {0,3}>/,
  blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
  blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
  listReplaceTabs: /^\t+/,
  listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
  listIsTask: /^\[[ xX]\] /,
  listReplaceTask: /^\[[ xX]\] +/,
  anyLine: /\n.*\n/,
  hrefBrackets: /^<(.*)>$/,
  tableDelimiter: /[:|]/,
  tableAlignChars: /^\||\| *$/g,
  tableRowBlankLine: /\n[ \t]*$/,
  tableAlignRight: /^ *-+: *$/,
  tableAlignCenter: /^ *:-+: *$/,
  tableAlignLeft: /^ *:-+ *$/,
  startATag: /^<a /i,
  endATag: /^<\/a>/i,
  startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
  endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
  startAngleBracket: /^</,
  endAngleBracket: />$/,
  pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
  unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
  escapeTest: /[&<>"']/,
  escapeReplace: /[&<>"']/g,
  escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
  unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
  caret: /(^|[^\[])\^/g,
  percentDecode: /%25/g,
  findPipe: /\|/g,
  splitPipe: / \|/,
  slashPipe: /\\\|/g,
  carriageReturn: /\r\n|\r/g,
  spaceLine: /^ +$/gm,
  notSpaceStart: /^\S*/,
  endingNewline: /\n$/,
  listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
  nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
  hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
  fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
  headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
  htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
};
var newline = /^(?:[ \t]*(?:\n|$))+/;
var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var bullet = /(?:[*+-]|\d{1,9}[.)])/;
var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var blockText = /^[^\n]+/;
var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var html = edit(
  "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
  "i"
).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
var blockNormal = {
  blockquote,
  code: blockCode,
  def,
  fences,
  heading,
  hr,
  html,
  lheading,
  list,
  newline,
  paragraph,
  table: noopTest,
  text: blockText
};
var gfmTable = edit(
  "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
var blockGfm = {
  ...blockNormal,
  lheading: lheadingGfm,
  table: gfmTable,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
};
var blockPedantic = {
  ...blockNormal,
  html: edit(
    `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
  ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: noopTest,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
};
var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var br = /^( {2,}|\\)\n(?!\s*$)/;
var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var _punctuation = /[\p{P}\p{S}]/u;
var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
var emStrongRDelimUnd = edit(
  "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
  "gu"
).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
var tag = edit(
  "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
var inlineNormal = {
  _backpedal: noopTest,
  // only used for GFM url
  anyPunctuation,
  autolink,
  blockSkip,
  br,
  code: inlineCode,
  del: noopTest,
  emStrongLDelim,
  emStrongRDelimAst,
  emStrongRDelimUnd,
  escape,
  link,
  nolink,
  punctuation,
  reflink,
  reflinkSearch,
  tag,
  text: inlineText,
  url: noopTest
};
var inlinePedantic = {
  ...inlineNormal,
  link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
  reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
};
var inlineGfm = {
  ...inlineNormal,
  emStrongRDelimAst: emStrongRDelimAstGfm,
  emStrongLDelim: emStrongLDelimGfm,
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
var inlineBreaks = {
  ...inlineGfm,
  br: edit(br).replace("{2,}", "*").getRegex(),
  text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
};
var block = {
  normal: blockNormal,
  gfm: blockGfm,
  pedantic: blockPedantic
};
var inline = {
  normal: inlineNormal,
  gfm: inlineGfm,
  breaks: inlineBreaks,
  pedantic: inlinePedantic
};
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape2(html2, encode) {
  if (encode) {
    if (other.escapeTest.test(html2)) {
      return html2.replace(other.escapeReplace, getEscapeReplacement);
    }
  } else {
    if (other.escapeTestNoEncode.test(html2)) {
      return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html2;
}
function cleanUrl(href) {
  try {
    href = encodeURI(href).replace(other.percentDecode, "%");
  } catch {
    return null;
  }
  return href;
}
function splitCells(tableRow, count) {
  const row = tableRow.replace(other.findPipe, (match, offset, str) => {
    let escaped = false;
    let curr = offset;
    while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
    if (escaped) {
      return "|";
    } else {
      return " |";
    }
  }), cells = row.split(other.splitPipe);
  let i = 0;
  if (!cells[0].trim()) {
    cells.shift();
  }
  if (cells.length > 0 && !cells.at(-1)?.trim()) {
    cells.pop();
  }
  if (count) {
    if (cells.length > count) {
      cells.splice(count);
    } else {
      while (cells.length < count) cells.push("");
    }
  }
  for (; i < cells.length; i++) {
    cells[i] = cells[i].trim().replace(other.slashPipe, "|");
  }
  return cells;
}
function rtrim(str, c, invert) {
  const l = str.length;
  if (l === 0) {
    return "";
  }
  let suffLen = 0;
  while (suffLen < l) {
    const currChar = str.charAt(l - suffLen - 1);
    if (currChar === c && !invert) {
      suffLen++;
    } else if (currChar !== c && invert) {
      suffLen++;
    } else {
      break;
    }
  }
  return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
  if (str.indexOf(b[1]) === -1) {
    return -1;
  }
  let level = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      i++;
    } else if (str[i] === b[0]) {
      level++;
    } else if (str[i] === b[1]) {
      level--;
      if (level < 0) {
        return i;
      }
    }
  }
  if (level > 0) {
    return -2;
  }
  return -1;
}
function outputLink(cap, link2, raw, lexer2, rules) {
  const href = link2.href;
  const title = link2.title || null;
  const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
  lexer2.state.inLink = true;
  const token = {
    type: cap[0].charAt(0) === "!" ? "image" : "link",
    raw,
    href,
    title,
    text,
    tokens: lexer2.inlineTokens(text)
  };
  lexer2.state.inLink = false;
  return token;
}
function indentCodeCompensation(raw, text, rules) {
  const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
  if (matchIndentToCode === null) {
    return text;
  }
  const indentToCode = matchIndentToCode[1];
  return text.split("\n").map((node) => {
    const matchIndentInNode = node.match(rules.other.beginningSpace);
    if (matchIndentInNode === null) {
      return node;
    }
    const [indentInNode] = matchIndentInNode;
    if (indentInNode.length >= indentToCode.length) {
      return node.slice(indentToCode.length);
    }
    return node;
  }).join("\n");
}
var _Tokenizer = class {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(src) {
    const cap = this.rules.block.newline.exec(src);
    if (cap && cap[0].length > 0) {
      return {
        type: "space",
        raw: cap[0]
      };
    }
  }
  code(src) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
      return {
        type: "code",
        raw: cap[0],
        codeBlockStyle: "indented",
        text: !this.options.pedantic ? rtrim(text, "\n") : text
      };
    }
  }
  fences(src) {
    const cap = this.rules.block.fences.exec(src);
    if (cap) {
      const raw = cap[0];
      const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
      return {
        type: "code",
        raw,
        lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
        text
      };
    }
  }
  heading(src) {
    const cap = this.rules.block.heading.exec(src);
    if (cap) {
      let text = cap[2].trim();
      if (this.rules.other.endingHash.test(text)) {
        const trimmed = rtrim(text, "#");
        if (this.options.pedantic) {
          text = trimmed.trim();
        } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
          text = trimmed.trim();
        }
      }
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[1].length,
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  hr(src) {
    const cap = this.rules.block.hr.exec(src);
    if (cap) {
      return {
        type: "hr",
        raw: rtrim(cap[0], "\n")
      };
    }
  }
  blockquote(src) {
    const cap = this.rules.block.blockquote.exec(src);
    if (cap) {
      let lines = rtrim(cap[0], "\n").split("\n");
      let raw = "";
      let text = "";
      const tokens = [];
      while (lines.length > 0) {
        let inBlockquote = false;
        const currentLines = [];
        let i;
        for (i = 0; i < lines.length; i++) {
          if (this.rules.other.blockquoteStart.test(lines[i])) {
            currentLines.push(lines[i]);
            inBlockquote = true;
          } else if (!inBlockquote) {
            currentLines.push(lines[i]);
          } else {
            break;
          }
        }
        lines = lines.slice(i);
        const currentRaw = currentLines.join("\n");
        const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
        raw = raw ? `${raw}
${currentRaw}` : currentRaw;
        text = text ? `${text}
${currentText}` : currentText;
        const top = this.lexer.state.top;
        this.lexer.state.top = true;
        this.lexer.blockTokens(currentText, tokens, true);
        this.lexer.state.top = top;
        if (lines.length === 0) {
          break;
        }
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "code") {
          break;
        } else if (lastToken?.type === "blockquote") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.blockquote(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
          break;
        } else if (lastToken?.type === "list") {
          const oldToken = lastToken;
          const newText = oldToken.raw + "\n" + lines.join("\n");
          const newToken = this.list(newText);
          tokens[tokens.length - 1] = newToken;
          raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
          text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
          lines = newText.substring(tokens.at(-1).raw.length).split("\n");
          continue;
        }
      }
      return {
        type: "blockquote",
        raw,
        tokens,
        text
      };
    }
  }
  list(src) {
    let cap = this.rules.block.list.exec(src);
    if (cap) {
      let bull = cap[1].trim();
      const isordered = bull.length > 1;
      const list2 = {
        type: "list",
        raw: "",
        ordered: isordered,
        start: isordered ? +bull.slice(0, -1) : "",
        loose: false,
        items: []
      };
      bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
      if (this.options.pedantic) {
        bull = isordered ? bull : "[*+-]";
      }
      const itemRegex = this.rules.other.listItemRegex(bull);
      let endsWithBlankLine = false;
      while (src) {
        let endEarly = false;
        let raw = "";
        let itemContents = "";
        if (!(cap = itemRegex.exec(src))) {
          break;
        }
        if (this.rules.block.hr.test(src)) {
          break;
        }
        raw = cap[0];
        src = src.substring(raw.length);
        let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
        let nextLine = src.split("\n", 1)[0];
        let blankLine = !line.trim();
        let indent = 0;
        if (this.options.pedantic) {
          indent = 2;
          itemContents = line.trimStart();
        } else if (blankLine) {
          indent = cap[1].length + 1;
        } else {
          indent = cap[2].search(this.rules.other.nonSpaceChar);
          indent = indent > 4 ? 1 : indent;
          itemContents = line.slice(indent);
          indent += cap[1].length;
        }
        if (blankLine && this.rules.other.blankLine.test(nextLine)) {
          raw += nextLine + "\n";
          src = src.substring(nextLine.length + 1);
          endEarly = true;
        }
        if (!endEarly) {
          const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
          const hrRegex = this.rules.other.hrRegex(indent);
          const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
          const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
          const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
          while (src) {
            const rawLine = src.split("\n", 1)[0];
            let nextLineWithoutTabs;
            nextLine = rawLine;
            if (this.options.pedantic) {
              nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
              nextLineWithoutTabs = nextLine;
            } else {
              nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
            }
            if (fencesBeginRegex.test(nextLine)) {
              break;
            }
            if (headingBeginRegex.test(nextLine)) {
              break;
            }
            if (htmlBeginRegex.test(nextLine)) {
              break;
            }
            if (nextBulletRegex.test(nextLine)) {
              break;
            }
            if (hrRegex.test(nextLine)) {
              break;
            }
            if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
              itemContents += "\n" + nextLineWithoutTabs.slice(indent);
            } else {
              if (blankLine) {
                break;
              }
              if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                break;
              }
              if (fencesBeginRegex.test(line)) {
                break;
              }
              if (headingBeginRegex.test(line)) {
                break;
              }
              if (hrRegex.test(line)) {
                break;
              }
              itemContents += "\n" + nextLine;
            }
            if (!blankLine && !nextLine.trim()) {
              blankLine = true;
            }
            raw += rawLine + "\n";
            src = src.substring(rawLine.length + 1);
            line = nextLineWithoutTabs.slice(indent);
          }
        }
        if (!list2.loose) {
          if (endsWithBlankLine) {
            list2.loose = true;
          } else if (this.rules.other.doubleBlankLine.test(raw)) {
            endsWithBlankLine = true;
          }
        }
        let istask = null;
        let ischecked;
        if (this.options.gfm) {
          istask = this.rules.other.listIsTask.exec(itemContents);
          if (istask) {
            ischecked = istask[0] !== "[ ] ";
            itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
          }
        }
        list2.items.push({
          type: "list_item",
          raw,
          task: !!istask,
          checked: ischecked,
          loose: false,
          text: itemContents,
          tokens: []
        });
        list2.raw += raw;
      }
      const lastItem = list2.items.at(-1);
      if (lastItem) {
        lastItem.raw = lastItem.raw.trimEnd();
        lastItem.text = lastItem.text.trimEnd();
      } else {
        return;
      }
      list2.raw = list2.raw.trimEnd();
      for (let i = 0; i < list2.items.length; i++) {
        this.lexer.state.top = false;
        list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
        if (!list2.loose) {
          const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
          const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
          list2.loose = hasMultipleLineBreaks;
        }
      }
      if (list2.loose) {
        for (let i = 0; i < list2.items.length; i++) {
          list2.items[i].loose = true;
        }
      }
      return list2;
    }
  }
  html(src) {
    const cap = this.rules.block.html.exec(src);
    if (cap) {
      const token = {
        type: "html",
        block: true,
        raw: cap[0],
        pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
        text: cap[0]
      };
      return token;
    }
  }
  def(src) {
    const cap = this.rules.block.def.exec(src);
    if (cap) {
      const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
      const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
      const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
      return {
        type: "def",
        tag: tag2,
        raw: cap[0],
        href,
        title
      };
    }
  }
  table(src) {
    const cap = this.rules.block.table.exec(src);
    if (!cap) {
      return;
    }
    if (!this.rules.other.tableDelimiter.test(cap[2])) {
      return;
    }
    const headers = splitCells(cap[1]);
    const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
    const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
    const item = {
      type: "table",
      raw: cap[0],
      header: [],
      align: [],
      rows: []
    };
    if (headers.length !== aligns.length) {
      return;
    }
    for (const align of aligns) {
      if (this.rules.other.tableAlignRight.test(align)) {
        item.align.push("right");
      } else if (this.rules.other.tableAlignCenter.test(align)) {
        item.align.push("center");
      } else if (this.rules.other.tableAlignLeft.test(align)) {
        item.align.push("left");
      } else {
        item.align.push(null);
      }
    }
    for (let i = 0; i < headers.length; i++) {
      item.header.push({
        text: headers[i],
        tokens: this.lexer.inline(headers[i]),
        header: true,
        align: item.align[i]
      });
    }
    for (const row of rows) {
      item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
        return {
          text: cell,
          tokens: this.lexer.inline(cell),
          header: false,
          align: item.align[i]
        };
      }));
    }
    return item;
  }
  lheading(src) {
    const cap = this.rules.block.lheading.exec(src);
    if (cap) {
      return {
        type: "heading",
        raw: cap[0],
        depth: cap[2].charAt(0) === "=" ? 1 : 2,
        text: cap[1],
        tokens: this.lexer.inline(cap[1])
      };
    }
  }
  paragraph(src) {
    const cap = this.rules.block.paragraph.exec(src);
    if (cap) {
      const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
      return {
        type: "paragraph",
        raw: cap[0],
        text,
        tokens: this.lexer.inline(text)
      };
    }
  }
  text(src) {
    const cap = this.rules.block.text.exec(src);
    if (cap) {
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        tokens: this.lexer.inline(cap[0])
      };
    }
  }
  escape(src) {
    const cap = this.rules.inline.escape.exec(src);
    if (cap) {
      return {
        type: "escape",
        raw: cap[0],
        text: cap[1]
      };
    }
  }
  tag(src) {
    const cap = this.rules.inline.tag.exec(src);
    if (cap) {
      if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
        this.lexer.state.inLink = true;
      } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
        this.lexer.state.inLink = false;
      }
      if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
        this.lexer.state.inRawBlock = true;
      } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
        this.lexer.state.inRawBlock = false;
      }
      return {
        type: "html",
        raw: cap[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: false,
        text: cap[0]
      };
    }
  }
  link(src) {
    const cap = this.rules.inline.link.exec(src);
    if (cap) {
      const trimmedUrl = cap[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
        if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
          return;
        }
        const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
        if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
          return;
        }
      } else {
        const lastParenIndex = findClosingBracket(cap[2], "()");
        if (lastParenIndex === -2) {
          return;
        }
        if (lastParenIndex > -1) {
          const start = cap[0].indexOf("!") === 0 ? 5 : 4;
          const linkLen = start + cap[1].length + lastParenIndex;
          cap[2] = cap[2].substring(0, lastParenIndex);
          cap[0] = cap[0].substring(0, linkLen).trim();
          cap[3] = "";
        }
      }
      let href = cap[2];
      let title = "";
      if (this.options.pedantic) {
        const link2 = this.rules.other.pedanticHrefTitle.exec(href);
        if (link2) {
          href = link2[1];
          title = link2[3];
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : "";
      }
      href = href.trim();
      if (this.rules.other.startAngleBracket.test(href)) {
        if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
          href = href.slice(1);
        } else {
          href = href.slice(1, -1);
        }
      }
      return outputLink(cap, {
        href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
        title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
      }, cap[0], this.lexer, this.rules);
    }
  }
  reflink(src, links) {
    let cap;
    if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
      const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
      const link2 = links[linkString.toLowerCase()];
      if (!link2) {
        const text = cap[0].charAt(0);
        return {
          type: "text",
          raw: text,
          text
        };
      }
      return outputLink(cap, link2, cap[0], this.lexer, this.rules);
    }
  }
  emStrong(src, maskedSrc, prevChar = "") {
    let match = this.rules.inline.emStrongLDelim.exec(src);
    if (!match) return;
    if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
    const nextChar = match[1] || match[2] || "";
    if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
      const lLength = [...match[0]].length - 1;
      let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
      const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      endReg.lastIndex = 0;
      maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
      while ((match = endReg.exec(maskedSrc)) != null) {
        rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
        if (!rDelim) continue;
        rLength = [...rDelim].length;
        if (match[3] || match[4]) {
          delimTotal += rLength;
          continue;
        } else if (match[5] || match[6]) {
          if (lLength % 3 && !((lLength + rLength) % 3)) {
            midDelimTotal += rLength;
            continue;
          }
        }
        delimTotal -= rLength;
        if (delimTotal > 0) continue;
        rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
        const lastCharLength = [...match[0]][0].length;
        const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
        if (Math.min(lLength, rLength) % 2) {
          const text2 = raw.slice(1, -1);
          return {
            type: "em",
            raw,
            text: text2,
            tokens: this.lexer.inlineTokens(text2)
          };
        }
        const text = raw.slice(2, -2);
        return {
          type: "strong",
          raw,
          text,
          tokens: this.lexer.inlineTokens(text)
        };
      }
    }
  }
  codespan(src) {
    const cap = this.rules.inline.code.exec(src);
    if (cap) {
      let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
      const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
      const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1);
      }
      return {
        type: "codespan",
        raw: cap[0],
        text
      };
    }
  }
  br(src) {
    const cap = this.rules.inline.br.exec(src);
    if (cap) {
      return {
        type: "br",
        raw: cap[0]
      };
    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: "del",
        raw: cap[0],
        text: cap[2],
        tokens: this.lexer.inlineTokens(cap[2])
      };
    }
  }
  autolink(src) {
    const cap = this.rules.inline.autolink.exec(src);
    if (cap) {
      let text, href;
      if (cap[2] === "@") {
        text = cap[1];
        href = "mailto:" + text;
      } else {
        text = cap[1];
        href = text;
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  url(src) {
    let cap;
    if (cap = this.rules.inline.url.exec(src)) {
      let text, href;
      if (cap[2] === "@") {
        text = cap[0];
        href = "mailto:" + text;
      } else {
        let prevCapZero;
        do {
          prevCapZero = cap[0];
          cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
        } while (prevCapZero !== cap[0]);
        text = cap[0];
        if (cap[1] === "www.") {
          href = "http://" + cap[0];
        } else {
          href = cap[0];
        }
      }
      return {
        type: "link",
        raw: cap[0],
        text,
        href,
        tokens: [
          {
            type: "text",
            raw: text,
            text
          }
        ]
      };
    }
  }
  inlineText(src) {
    const cap = this.rules.inline.text.exec(src);
    if (cap) {
      const escaped = this.lexer.state.inRawBlock;
      return {
        type: "text",
        raw: cap[0],
        text: cap[0],
        escaped
      };
    }
  }
};
var _Lexer = class __Lexer {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(options2) {
    this.tokens = [];
    this.tokens.links = /* @__PURE__ */ Object.create(null);
    this.options = options2 || _defaults;
    this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    this.tokenizer.lexer = this;
    this.inlineQueue = [];
    this.state = {
      inLink: false,
      inRawBlock: false,
      top: true
    };
    const rules = {
      other,
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block,
      inline
    };
  }
  /**
   * Static Lex Method
   */
  static lex(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.lex(src);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(src, options2) {
    const lexer2 = new __Lexer(options2);
    return lexer2.inlineTokens(src);
  }
  /**
   * Preprocessing
   */
  lex(src) {
    src = src.replace(other.carriageReturn, "\n");
    this.blockTokens(src, this.tokens);
    for (let i = 0; i < this.inlineQueue.length; i++) {
      const next = this.inlineQueue[i];
      this.inlineTokens(next.src, next.tokens);
    }
    this.inlineQueue = [];
    return this.tokens;
  }
  blockTokens(src, tokens = [], lastParagraphClipped = false) {
    if (this.options.pedantic) {
      src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
    }
    while (src) {
      let token;
      if (this.options.extensions?.block?.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (token.raw.length === 1 && lastToken !== void 0) {
          lastToken.raw += "\n";
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.code(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.def(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.raw;
          this.inlineQueue.at(-1).src = lastToken.text;
        } else if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
            href: token.href,
            title: token.title
          };
        }
        continue;
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      let cutSrc = src;
      if (this.options.extensions?.startBlock) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startBlock.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
        const lastToken = tokens.at(-1);
        if (lastParagraphClipped && lastToken?.type === "paragraph") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        lastParagraphClipped = cutSrc.length !== src.length;
        src = src.substring(token.raw.length);
        continue;
      }
      if (token = this.tokenizer.text(src)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "text") {
          lastToken.raw += "\n" + token.raw;
          lastToken.text += "\n" + token.text;
          this.inlineQueue.pop();
          this.inlineQueue.at(-1).src = lastToken.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    this.state.top = true;
    return tokens;
  }
  inline(src, tokens = []) {
    this.inlineQueue.push({ src, tokens });
    return tokens;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(src, tokens = []) {
    let maskedSrc = src;
    let match = null;
    if (this.tokens.links) {
      const links = Object.keys(this.tokens.links);
      if (links.length > 0) {
        while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
          if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
            maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
          }
        }
      }
    }
    while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    }
    while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
      maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    }
    let keepPrevChar = false;
    let prevChar = "";
    while (src) {
      if (!keepPrevChar) {
        prevChar = "";
      }
      keepPrevChar = false;
      let token;
      if (this.options.extensions?.inline?.some((extTokenizer) => {
        if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          return true;
        }
        return false;
      })) {
        continue;
      }
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.tag(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        const lastToken = tokens.at(-1);
        if (token.type === "text" && lastToken?.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.codespan(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.br(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.del(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (token = this.tokenizer.autolink(src)) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      if (!this.state.inLink && (token = this.tokenizer.url(src))) {
        src = src.substring(token.raw.length);
        tokens.push(token);
        continue;
      }
      let cutSrc = src;
      if (this.options.extensions?.startInline) {
        let startIndex = Infinity;
        const tempSrc = src.slice(1);
        let tempStart;
        this.options.extensions.startInline.forEach((getStartIndex) => {
          tempStart = getStartIndex.call({ lexer: this }, tempSrc);
          if (typeof tempStart === "number" && tempStart >= 0) {
            startIndex = Math.min(startIndex, tempStart);
          }
        });
        if (startIndex < Infinity && startIndex >= 0) {
          cutSrc = src.substring(0, startIndex + 1);
        }
      }
      if (token = this.tokenizer.inlineText(cutSrc)) {
        src = src.substring(token.raw.length);
        if (token.raw.slice(-1) !== "_") {
          prevChar = token.raw.slice(-1);
        }
        keepPrevChar = true;
        const lastToken = tokens.at(-1);
        if (lastToken?.type === "text") {
          lastToken.raw += token.raw;
          lastToken.text += token.text;
        } else {
          tokens.push(token);
        }
        continue;
      }
      if (src) {
        const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
        if (this.options.silent) {
          console.error(errMsg);
          break;
        } else {
          throw new Error(errMsg);
        }
      }
    }
    return tokens;
  }
};
var _Renderer = class {
  options;
  parser;
  // set by the parser
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  space(token) {
    return "";
  }
  code({ text, lang, escaped }) {
    const langString = (lang || "").match(other.notSpaceStart)?.[0];
    const code = text.replace(other.endingNewline, "") + "\n";
    if (!langString) {
      return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
  }
  blockquote({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote>
${body}</blockquote>
`;
  }
  html({ text }) {
    return text;
  }
  heading({ tokens, depth }) {
    return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
  }
  hr(token) {
    return "<hr>\n";
  }
  list(token) {
    const ordered = token.ordered;
    const start = token.start;
    let body = "";
    for (let j = 0; j < token.items.length; j++) {
      const item = token.items[j];
      body += this.listitem(item);
    }
    const type = ordered ? "ol" : "ul";
    const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
    return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
  }
  listitem(item) {
    let itemBody = "";
    if (item.task) {
      const checkbox = this.checkbox({ checked: !!item.checked });
      if (item.loose) {
        if (item.tokens[0]?.type === "paragraph") {
          item.tokens[0].text = checkbox + " " + item.tokens[0].text;
          if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
            item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
            item.tokens[0].tokens[0].escaped = true;
          }
        } else {
          item.tokens.unshift({
            type: "text",
            raw: checkbox + " ",
            text: checkbox + " ",
            escaped: true
          });
        }
      } else {
        itemBody += checkbox + " ";
      }
    }
    itemBody += this.parser.parse(item.tokens, !!item.loose);
    return `<li>${itemBody}</li>
`;
  }
  checkbox({ checked }) {
    return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens }) {
    return `<p>${this.parser.parseInline(tokens)}</p>
`;
  }
  table(token) {
    let header = "";
    let cell = "";
    for (let j = 0; j < token.header.length; j++) {
      cell += this.tablecell(token.header[j]);
    }
    header += this.tablerow({ text: cell });
    let body = "";
    for (let j = 0; j < token.rows.length; j++) {
      const row = token.rows[j];
      cell = "";
      for (let k = 0; k < row.length; k++) {
        cell += this.tablecell(row[k]);
      }
      body += this.tablerow({ text: cell });
    }
    if (body) body = `<tbody>${body}</tbody>`;
    return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
  }
  tablerow({ text }) {
    return `<tr>
${text}</tr>
`;
  }
  tablecell(token) {
    const content = this.parser.parseInline(token.tokens);
    const type = token.header ? "th" : "td";
    const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
    return tag2 + content + `</${type}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens }) {
    return `<strong>${this.parser.parseInline(tokens)}</strong>`;
  }
  em({ tokens }) {
    return `<em>${this.parser.parseInline(tokens)}</em>`;
  }
  codespan({ text }) {
    return `<code>${escape2(text, true)}</code>`;
  }
  br(token) {
    return "<br>";
  }
  del({ tokens }) {
    return `<del>${this.parser.parseInline(tokens)}</del>`;
  }
  link({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return text;
    }
    href = cleanHref;
    let out = '<a href="' + href + '"';
    if (title) {
      out += ' title="' + escape2(title) + '"';
    }
    out += ">" + text + "</a>";
    return out;
  }
  image({ href, title, text, tokens }) {
    if (tokens) {
      text = this.parser.parseInline(tokens, this.parser.textRenderer);
    }
    const cleanHref = cleanUrl(href);
    if (cleanHref === null) {
      return escape2(text);
    }
    href = cleanHref;
    let out = `<img src="${href}" alt="${text}"`;
    if (title) {
      out += ` title="${escape2(title)}"`;
    }
    out += ">";
    return out;
  }
  text(token) {
    return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
  }
};
var _TextRenderer = class {
  // no need for block level renderers
  strong({ text }) {
    return text;
  }
  em({ text }) {
    return text;
  }
  codespan({ text }) {
    return text;
  }
  del({ text }) {
    return text;
  }
  html({ text }) {
    return text;
  }
  text({ text }) {
    return text;
  }
  link({ text }) {
    return "" + text;
  }
  image({ text }) {
    return "" + text;
  }
  br() {
    return "";
  }
};
var _Parser = class __Parser {
  options;
  renderer;
  textRenderer;
  constructor(options2) {
    this.options = options2 || _defaults;
    this.options.renderer = this.options.renderer || new _Renderer();
    this.renderer = this.options.renderer;
    this.renderer.options = this.options;
    this.renderer.parser = this;
    this.textRenderer = new _TextRenderer();
  }
  /**
   * Static Parse Method
   */
  static parse(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parse(tokens);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(tokens, options2) {
    const parser2 = new __Parser(options2);
    return parser2.parseInline(tokens);
  }
  /**
   * Parse Loop
   */
  parse(tokens, top = true) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions?.renderers?.[anyToken.type]) {
        const genericToken = anyToken;
        const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
        if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token = anyToken;
      switch (token.type) {
        case "space": {
          out += this.renderer.space(token);
          continue;
        }
        case "hr": {
          out += this.renderer.hr(token);
          continue;
        }
        case "heading": {
          out += this.renderer.heading(token);
          continue;
        }
        case "code": {
          out += this.renderer.code(token);
          continue;
        }
        case "table": {
          out += this.renderer.table(token);
          continue;
        }
        case "blockquote": {
          out += this.renderer.blockquote(token);
          continue;
        }
        case "list": {
          out += this.renderer.list(token);
          continue;
        }
        case "html": {
          out += this.renderer.html(token);
          continue;
        }
        case "paragraph": {
          out += this.renderer.paragraph(token);
          continue;
        }
        case "text": {
          let textToken = token;
          let body = this.renderer.text(textToken);
          while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
            textToken = tokens[++i];
            body += "\n" + this.renderer.text(textToken);
          }
          if (top) {
            out += this.renderer.paragraph({
              type: "paragraph",
              raw: body,
              text: body,
              tokens: [{ type: "text", raw: body, text: body, escaped: true }]
            });
          } else {
            out += body;
          }
          continue;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(tokens, renderer = this.renderer) {
    let out = "";
    for (let i = 0; i < tokens.length; i++) {
      const anyToken = tokens[i];
      if (this.options.extensions?.renderers?.[anyToken.type]) {
        const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
        if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
          out += ret || "";
          continue;
        }
      }
      const token = anyToken;
      switch (token.type) {
        case "escape": {
          out += renderer.text(token);
          break;
        }
        case "html": {
          out += renderer.html(token);
          break;
        }
        case "link": {
          out += renderer.link(token);
          break;
        }
        case "image": {
          out += renderer.image(token);
          break;
        }
        case "strong": {
          out += renderer.strong(token);
          break;
        }
        case "em": {
          out += renderer.em(token);
          break;
        }
        case "codespan": {
          out += renderer.codespan(token);
          break;
        }
        case "br": {
          out += renderer.br(token);
          break;
        }
        case "del": {
          out += renderer.del(token);
          break;
        }
        case "text": {
          out += renderer.text(token);
          break;
        }
        default: {
          const errMsg = 'Token with "' + token.type + '" type was not found.';
          if (this.options.silent) {
            console.error(errMsg);
            return "";
          } else {
            throw new Error(errMsg);
          }
        }
      }
    }
    return out;
  }
};
var _Hooks = class {
  options;
  block;
  constructor(options2) {
    this.options = options2 || _defaults;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(markdown) {
    return markdown;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(html2) {
    return html2;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(tokens) {
    return tokens;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? _Lexer.lex : _Lexer.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? _Parser.parse : _Parser.parseInline;
  }
};
var Marked = class {
  defaults = _getDefaults();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = _Parser;
  Renderer = _Renderer;
  TextRenderer = _TextRenderer;
  Lexer = _Lexer;
  Tokenizer = _Tokenizer;
  Hooks = _Hooks;
  constructor(...args) {
    this.use(...args);
  }
  /**
   * Run callback for every token
   */
  walkTokens(tokens, callback) {
    let values = [];
    for (const token of tokens) {
      values = values.concat(callback.call(this, token));
      switch (token.type) {
        case "table": {
          const tableToken = token;
          for (const cell of tableToken.header) {
            values = values.concat(this.walkTokens(cell.tokens, callback));
          }
          for (const row of tableToken.rows) {
            for (const cell of row) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
          }
          break;
        }
        case "list": {
          const listToken = token;
          values = values.concat(this.walkTokens(listToken.items, callback));
          break;
        }
        default: {
          const genericToken = token;
          if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
              const tokens2 = genericToken[childTokens].flat(Infinity);
              values = values.concat(this.walkTokens(tokens2, callback));
            });
          } else if (genericToken.tokens) {
            values = values.concat(this.walkTokens(genericToken.tokens, callback));
          }
        }
      }
    }
    return values;
  }
  use(...args) {
    const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
    args.forEach((pack) => {
      const opts = { ...pack };
      opts.async = this.defaults.async || opts.async || false;
      if (pack.extensions) {
        pack.extensions.forEach((ext) => {
          if (!ext.name) {
            throw new Error("extension name required");
          }
          if ("renderer" in ext) {
            const prevRenderer = extensions.renderers[ext.name];
            if (prevRenderer) {
              extensions.renderers[ext.name] = function(...args2) {
                let ret = ext.renderer.apply(this, args2);
                if (ret === false) {
                  ret = prevRenderer.apply(this, args2);
                }
                return ret;
              };
            } else {
              extensions.renderers[ext.name] = ext.renderer;
            }
          }
          if ("tokenizer" in ext) {
            if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
              throw new Error("extension level must be 'block' or 'inline'");
            }
            const extLevel = extensions[ext.level];
            if (extLevel) {
              extLevel.unshift(ext.tokenizer);
            } else {
              extensions[ext.level] = [ext.tokenizer];
            }
            if (ext.start) {
              if (ext.level === "block") {
                if (extensions.startBlock) {
                  extensions.startBlock.push(ext.start);
                } else {
                  extensions.startBlock = [ext.start];
                }
              } else if (ext.level === "inline") {
                if (extensions.startInline) {
                  extensions.startInline.push(ext.start);
                } else {
                  extensions.startInline = [ext.start];
                }
              }
            }
          }
          if ("childTokens" in ext && ext.childTokens) {
            extensions.childTokens[ext.name] = ext.childTokens;
          }
        });
        opts.extensions = extensions;
      }
      if (pack.renderer) {
        const renderer = this.defaults.renderer || new _Renderer(this.defaults);
        for (const prop in pack.renderer) {
          if (!(prop in renderer)) {
            throw new Error(`renderer '${prop}' does not exist`);
          }
          if (["options", "parser"].includes(prop)) {
            continue;
          }
          const rendererProp = prop;
          const rendererFunc = pack.renderer[rendererProp];
          const prevRenderer = renderer[rendererProp];
          renderer[rendererProp] = (...args2) => {
            let ret = rendererFunc.apply(renderer, args2);
            if (ret === false) {
              ret = prevRenderer.apply(renderer, args2);
            }
            return ret || "";
          };
        }
        opts.renderer = renderer;
      }
      if (pack.tokenizer) {
        const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
        for (const prop in pack.tokenizer) {
          if (!(prop in tokenizer)) {
            throw new Error(`tokenizer '${prop}' does not exist`);
          }
          if (["options", "rules", "lexer"].includes(prop)) {
            continue;
          }
          const tokenizerProp = prop;
          const tokenizerFunc = pack.tokenizer[tokenizerProp];
          const prevTokenizer = tokenizer[tokenizerProp];
          tokenizer[tokenizerProp] = (...args2) => {
            let ret = tokenizerFunc.apply(tokenizer, args2);
            if (ret === false) {
              ret = prevTokenizer.apply(tokenizer, args2);
            }
            return ret;
          };
        }
        opts.tokenizer = tokenizer;
      }
      if (pack.hooks) {
        const hooks = this.defaults.hooks || new _Hooks();
        for (const prop in pack.hooks) {
          if (!(prop in hooks)) {
            throw new Error(`hook '${prop}' does not exist`);
          }
          if (["options", "block"].includes(prop)) {
            continue;
          }
          const hooksProp = prop;
          const hooksFunc = pack.hooks[hooksProp];
          const prevHook = hooks[hooksProp];
          if (_Hooks.passThroughHooks.has(prop)) {
            hooks[hooksProp] = (arg) => {
              if (this.defaults.async) {
                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                  return prevHook.call(hooks, ret2);
                });
              }
              const ret = hooksFunc.call(hooks, arg);
              return prevHook.call(hooks, ret);
            };
          } else {
            hooks[hooksProp] = (...args2) => {
              let ret = hooksFunc.apply(hooks, args2);
              if (ret === false) {
                ret = prevHook.apply(hooks, args2);
              }
              return ret;
            };
          }
        }
        opts.hooks = hooks;
      }
      if (pack.walkTokens) {
        const walkTokens2 = this.defaults.walkTokens;
        const packWalktokens = pack.walkTokens;
        opts.walkTokens = function(token) {
          let values = [];
          values.push(packWalktokens.call(this, token));
          if (walkTokens2) {
            values = values.concat(walkTokens2.call(this, token));
          }
          return values;
        };
      }
      this.defaults = { ...this.defaults, ...opts };
    });
    return this;
  }
  setOptions(opt) {
    this.defaults = { ...this.defaults, ...opt };
    return this;
  }
  lexer(src, options2) {
    return _Lexer.lex(src, options2 ?? this.defaults);
  }
  parser(tokens, options2) {
    return _Parser.parse(tokens, options2 ?? this.defaults);
  }
  parseMarkdown(blockType) {
    const parse2 = (src, options2) => {
      const origOpt = { ...options2 };
      const opt = { ...this.defaults, ...origOpt };
      const throwError = this.onError(!!opt.silent, !!opt.async);
      if (this.defaults.async === true && origOpt.async === false) {
        return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      }
      if (typeof src === "undefined" || src === null) {
        return throwError(new Error("marked(): input parameter is undefined or null"));
      }
      if (typeof src !== "string") {
        return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
      }
      if (opt.hooks) {
        opt.hooks.options = opt;
        opt.hooks.block = blockType;
      }
      const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
      const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
      if (opt.async) {
        return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
      }
      try {
        if (opt.hooks) {
          src = opt.hooks.preprocess(src);
        }
        let tokens = lexer2(src, opt);
        if (opt.hooks) {
          tokens = opt.hooks.processAllTokens(tokens);
        }
        if (opt.walkTokens) {
          this.walkTokens(tokens, opt.walkTokens);
        }
        let html2 = parser2(tokens, opt);
        if (opt.hooks) {
          html2 = opt.hooks.postprocess(html2);
        }
        return html2;
      } catch (e) {
        return throwError(e);
      }
    };
    return parse2;
  }
  onError(silent, async) {
    return (e) => {
      e.message += "\nPlease report this to https://github.com/markedjs/marked.";
      if (silent) {
        const msg = "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
        if (async) {
          return Promise.resolve(msg);
        }
        return msg;
      }
      if (async) {
        return Promise.reject(e);
      }
      throw e;
    };
  }
};
var markedInstance = new Marked();
function marked(src, opt) {
  return markedInstance.parse(src, opt);
}
marked.options = marked.setOptions = function(options2) {
  markedInstance.setOptions(options2);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
marked.use = function(...args) {
  markedInstance.use(...args);
  marked.defaults = markedInstance.defaults;
  changeDefaults(marked.defaults);
  return marked;
};
marked.walkTokens = function(tokens, callback) {
  return markedInstance.walkTokens(tokens, callback);
};
marked.parseInline = markedInstance.parseInline;
marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
var options = marked.options;
var setOptions = marked.setOptions;
var use = marked.use;
var walkTokens = marked.walkTokens;
var parseInline = marked.parseInline;
var parser = _Parser.parse;
var lexer = _Lexer.lex;

// src/gongwen/mdast.ts
var RED_HEAD_KEYS = [
  "agency",
  "logo",
  "seal",
  "docNumber",
  "signer",
  "copyNumber",
  "secretLevel",
  "urgency",
  "recipients",
  "attachments",
  "notes",
  "date",
  "signature",
  "cc",
  "printOrg",
  "printDate",
  "printCopies"
];
var FLAT_PREFIX = "rh-";
function extractRedHead(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  let inRedHead = false;
  for (const line of m[1].split(/\r?\n/)) {
    if (/^\S/.test(line)) {
      inRedHead = /^redhead\s*:/.test(line);
      const flat = line.match(new RegExp(`^${FLAT_PREFIX}([A-Za-z]+)\\s*:\\s*(.*)$`));
      if (flat) {
        const key2 = flat[1];
        const value2 = flat[2].trim().replace(/^["']|["']$/g, "");
        if (RED_HEAD_KEYS.includes(key2) && value2) meta[key2] = value2;
      }
      continue;
    }
    if (!inRedHead) continue;
    const kv = line.match(/^\s+([A-Za-z_]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const value = kv[2].trim().replace(/^["']|["']$/g, "");
    if (RED_HEAD_KEYS.includes(key) && value && !meta[key])
      meta[key] = value;
  }
  return { meta, body: md.slice(m[0].length) };
}
function parseDocument(md) {
  const { meta, body } = extractRedHead(md);
  return { meta, ...parseGongwenFull(body) };
}
function parseGongwenFull(md) {
  const tokens = marked.lexer(md);
  const blocks = [];
  let attach;
  let target = blocks;
  let titleTaken = false;
  let insideQuote = false;
  const inline2 = (tokens2, keepBr = false) => {
    if (!tokens2) return "";
    return tokens2.map((t) => {
      if (t.type === "text" || t.type === "escape") return t.text ?? "";
      if (t.type === "br") return keepBr ? "\n" : "";
      if (t.type === "strong" || t.type === "em" || t.type === "codespan" || t.type === "del")
        return inline2(t.tokens ?? [{ type: "text", text: t.text }], keepBr);
      if (t.type === "link") return inline2(t.tokens ?? [], keepBr) || t.href;
      return "";
    }).join("");
  };
  for (const tk of tokens) {
    if (tk.type === "hr") {
      attach = attach ?? [];
      target = attach;
      titleTaken = false;
      insideQuote = false;
      continue;
    }
    const push = (b) => target.push(b);
    switch (tk.type) {
      case "heading": {
        if (tk.depth === 1 && !titleTaken) {
          push({ kind: "docTitle", text: inline2(tk.tokens, true).trim() });
          titleTaken = true;
        } else if (tk.depth <= 2) {
          push({ kind: "h1", text: inline2(tk.tokens).trim() });
        } else if (tk.depth === 3) {
          push({ kind: "h2", text: inline2(tk.tokens).trim() });
        } else if (tk.depth === 4 || tk.depth === 5) {
          push({ kind: "h3", text: inline2(tk.tokens).trim() });
        } else if (tk.depth === 6) {
          push({ kind: "para", text: inline2(tk.tokens).trim() });
        }
        break;
      }
      case "paragraph": {
        if (insideQuote) break;
        const text = inline2(tk.tokens).trim();
        if (text) {
          push(detectOutlineHeading(text) === "h1" ? { kind: "h1", text } : { kind: "para", text });
        }
        break;
      }
      case "blockquote": {
        insideQuote = true;
        break;
      }
      case "space":
        insideQuote = false;
        break;
      case "list": {
        for (const item of tk.items ?? []) {
          const text = inline2(item.tokens?.[0]?.tokens ?? item.tokens).trim();
          if (text) push({ kind: "para", text });
        }
        break;
      }
      case "table": {
        const cellText = (c) => inline2(c?.tokens ?? []).trim();
        const header = (tk.header ?? []).map(cellText);
        const rows = (tk.rows ?? []).map((r) => r.map(cellText));
        const align = (tk.align ?? []).map((a) => a === "left" || a === "center" || a === "right" ? a : null);
        if (rows.length) push({ kind: "table", text: "", table: { header, rows, align } });
        break;
      }
      default:
        break;
    }
  }
  return { blocks, attach: attach && attach.length ? attach : void 0 };
}
function splitAttachTitle(text) {
  const t = (text ?? "").trim();
  const m = t.match(/^(附件\s*(?:[0-9]+|[一二三四五六七八九十]+)?)\s*[：:、.．-]?\s*(.*)$/);
  if (m && m[1]) return { mark: m[1].replace(/\s+/g, ""), title: (m[2] ?? "").trim() };
  return { mark: "\u9644\u4EF6", title: t };
}
function splitAgencies(v) {
  const t = (v ?? "").trim();
  if (!t) return [];
  return t.split(/[／/]/).map((s) => s.trim()).filter(Boolean);
}
function detectOutlineHeading(text) {
  const t = (text ?? "").trim();
  if (!t) return null;
  if (!/^[一二三四五六七八九十]{1,3}、\S/.test(t)) return null;
  if (t.includes("\u3002")) return null;
  return "h1";
}

// src/gongwen/checker.ts
var FLAT = "rh-";
var KNOWN_KEYS = RED_HEAD_KEYS;
function fmOf(md) {
  const m = md.replace(/^\uFEFF/, "").match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return null;
  return { lines: m[1].split(/\r?\n/) };
}
function fmAbsLine(fm, i) {
  return 2 + i;
}
function lineOf(md, needle) {
  const idx = md.indexOf(needle);
  if (idx < 0) return void 0;
  return md.slice(0, idx).split("\n").length;
}
function fmKeyLine(fm, key) {
  for (let i = 0; i < fm.lines.length; i++) {
    if (new RegExp(`^\\s*(?:${FLAT})?${key}\\s*:`).test(fm.lines[i])) return fmAbsLine(fm, i);
  }
  return void 0;
}
function editDist(a, b) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 3) return 4;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return dp[m][n];
}
function closestKey(raw) {
  let best = null;
  let bestD = 4;
  for (const k of KNOWN_KEYS) {
    const d = editDist(raw.toLowerCase(), k.toLowerCase());
    if (d < bestD) {
      bestD = d;
      best = k;
    }
  }
  return bestD <= 3 ? best : null;
}
function validateDocNumber(n) {
  const t = (n ?? "").trim();
  if (!t) return null;
  if (/[[\]()]/.test(t)) return "\u53D1\u6587\u5B57\u53F7\u7684\u5E74\u4EFD\u62EC\u53F7\u5E94\u4F7F\u7528\u5168\u89D2\u516D\u89D2\u62EC\u53F7\u3014\u3015\uFF0C\u5982 X\u653F\u53D1\u30142026\u301512\u53F7";
  if (!/〔\d{4}〕/.test(t)) return "\u53D1\u6587\u5B57\u53F7\u5EFA\u8BAE\u91C7\u7528\u300C\u673A\u5173\u4EE3\u5B57\u3014\u5E74\u4EFD\u3015\u5E8F\u53F7\u53F7\u300D\u683C\u5F0F\uFF0C\u5982 X\u653F\u53D1\u30142026\u301512\u53F7";
  return null;
}
function checkDocument(md0) {
  const md = md0.replace(/^\uFEFF/, "");
  const issues = [];
  const { meta, blocks } = parseDocument(md);
  const fm = fmOf(md);
  const push = (code, level, message, line) => {
    issues.push({ code, level, message, ...line !== void 0 ? { line } : {} });
  };
  const rhLine = (key) => fm ? fmKeyLine(fm, key) : void 0;
  if (fm) {
    for (let i = 0; i < fm.lines.length; i++) {
      const m = fm.lines[i].match(new RegExp(`^${FLAT}([A-Za-z][A-Za-z0-9]*)\\s*:`));
      if (m && !KNOWN_KEYS.includes(m[1])) {
        const near = closestKey(m[1]);
        push(
          "unknown-rh-key",
          "error",
          `rh-${m[1]} \u4E0D\u662F\u6709\u6548\u7684\u516C\u6587\u5C5E\u6027\uFF08\u62FC\u5199\u9519\u8BEF\u6216\u4E0D\u5B58\u5728\uFF09${near ? `\uFF0C\u662F\u5426\u60F3\u5199 rh-${near}\uFF1F` : "\u3002\u53C2\u8003\uFF1Arh-agency / rh-docNumber / rh-date / rh-signature / rh-printOrg / rh-printDate / rh-printCopies \u7B49"}`,
          fmAbsLine(fm, i)
        );
      }
    }
  }
  const docNumber = (meta.docNumber ?? "").trim();
  if (!docNumber) {
    if (meta.agency?.trim() && meta.date) {
      push("no-doc-number", "warn", "\u7EA2\u5934\u6587\u4EF6\u901A\u5E38\u9700\u8981\u53D1\u6587\u5B57\u53F7\uFF1A\u8865 rh-docNumber\uFF08\u5982 X\u653F\u53D1\u30142026\u301512\u53F7\uFF09", rhLine("date"));
    }
  } else {
    const msg = validateDocNumber(docNumber);
    if (msg) push("doc-number-format", "error", `rh-docNumber\uFF1A${msg}`, rhLine("docNumber"));
  }
  const date = (meta.date ?? "").trim();
  const signature = (meta.signature ?? "").trim();
  if (date && !/^\d{4}\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日/.test(date)) {
    if (/^\d{4}[-/.]/.test(date)) push("date-format", "warn", "\u6210\u6587\u65E5\u671F\u5EFA\u8BAE\u7528\u56FD\u6807\u683C\u5F0F\u300CXXXX\u5E74X\u6708X\u65E5\u300D\uFF08\u5982 2026\u5E749\u67083\u65E5\uFF09\uFF0C\u5F53\u524D\u4E3A " + date, rhLine("date"));
  }
  if (signature && !date) {
    push("date-missing", "error", "\u6709\u7F72\u540D\u673A\u5173\uFF08rh-signature\uFF09\u4F46\u7F3A\u6210\u6587\u65E5\u671F\uFF1A\u8865 rh-date\uFF08\u53F3\u7A7A 4 \u5B57\uFF0C\u5982 2026\u5E749\u67083\u65E5\uFF09", rhLine("signature"));
  } else if (date && !signature && (meta.agency || meta.cc)) {
    push("signature-missing", "warn", "\u6709\u6210\u6587\u65E5\u671F\u4F46\u7F3A\u7F72\u540D\u673A\u5173\uFF08rh-signature\uFF09\uFF1A\u6B63\u5F0F\u53D1\u6587\u901A\u5E38\u9700\u7F72\u540D", rhLine("date"));
  }
  if (date && docNumber) {
    const dYear = Number(date.match(/(\d{4})\s*年/)?.[1] ?? NaN);
    const nYear = Number(docNumber.match(/〔(\d{4})〕/)?.[1] ?? NaN);
    if (Number.isFinite(dYear) && Number.isFinite(nYear) && dYear < nYear) {
      push("date-before-doc-year", "error", `\u6210\u6587\u65E5\u671F\uFF08${date}\uFF09\u65E9\u4E8E\u53D1\u6587\u5B57\u53F7\u5E74\u4EFD\uFF08${nYear}\uFF09\uFF0C\u65F6\u5E8F\u77DB\u76FE\uFF0C\u8BF7\u6838\u5BF9`, rhLine("date"));
    }
  }
  const attachments = (meta.attachments ?? "").trim();
  if (attachments && /[、，,]/.test(attachments)) {
    push("attachment-format", "warn", "rh-attachments \u591A\u9644\u4EF6\u8BF7\u7528 / \u5206\u9694\uFF08\u5982\u300C\u9644\u4EF6A / \u9644\u4EF6B\u300D\uFF09\uFF0C\u6B63\u6587\u6E32\u67D3\u4E3A\u9010\u6761\u300C\u9644\u4EF6\uFF1A\u300D", rhLine("attachments"));
  }
  const hasCc = (meta.cc ?? "").trim().length > 0;
  const hasOrg = (meta.printOrg ?? "").trim().length > 0;
  const hasPDate = (meta.printDate ?? "").trim().length > 0;
  const hasCopies = (meta.printCopies ?? "").trim().length > 0;
  if (hasCc || hasOrg || hasPDate || hasCopies) {
    const missing = [];
    if (!hasOrg) missing.push("\u5370\u53D1\u673A\u5173\uFF08rh-printOrg\uFF09");
    if (!hasPDate) missing.push("\u5370\u53D1\u65F6\u95F4\uFF08rh-printDate\uFF09");
    if (missing.length) {
      push(
        "colophon-incomplete",
        "error",
        `\u7248\u8BB0\u8981\u7D20\u7F3A\u6F0F\uFF1A${missing.join("\u3001")}\u3002\u7248\u8BB0\u987B\u6709\u300C\u5370\u53D1\u673A\u5173 \u5370\u53D1\u65E5\u671F\u300D\u6210\u5BF9\uFF08\u5DE6\u7A7A 1 \u5B57\u5BF9\u6392\uFF0C\u65E5\u671F\u81EA\u52A8\u8865\u300C\u5370\u53D1\u300D\uFF09`,
        rhLine("printOrg") ?? rhLine("printDate") ?? rhLine("printCopies") ?? rhLine("cc")
      );
    }
    if (!hasCopies) {
      push("colophon-copies-missing", "warn", "\u7248\u8BB0\u5EFA\u8BAE\u8865\u5370\u53D1\u4EFD\u6570\uFF08rh-printCopies\uFF0C\u53F3\u7A7A 3 \u5B57\u6E32\u67D3\u4E3A\u300C\u5370N\u4EFD\u300D\uFF09", rhLine("printDate") ?? rhLine("printOrg"));
    }
  }
  const kinds = blocks.filter((b) => b.kind === "h1" || b.kind === "h2" || b.kind === "h3");
  {
    const seen = { h1: false, h2: false, h3: false };
    for (const b of kinds) {
      if (b.kind === "h2" && !seen.h1) {
        push(
          "heading-skip",
          "warn",
          `\u6B63\u6587\u51FA\u73B0\u4E8C\u7EA7\u6807\u9898\u300C${b.text.slice(0, 24)}\u300D\u800C\u6B64\u524D\u6CA1\u6709\u4E00\u7EA7\u6807\u9898\uFF08## \u4E00\u3001\uFF09\uFF1A\u6807\u9898\u5C42\u7EA7\u7591\u4F3C\u8DF3\u7EA7\uFF0C\u68C0\u67E5\u8BE5\u5904 md \u6807\u9898\u7EA7\u522B`,
          lineOf(md, b.text)
        );
      } else if (b.kind === "h3" && !seen.h2) {
        push(
          "heading-skip",
          "warn",
          `\u6B63\u6587\u51FA\u73B0\u4E09\u7EA7\u6807\u9898\u300C${b.text.slice(0, 24)}\u300D\u800C\u6B64\u524D\u6CA1\u6709\u4E8C\u7EA7\u6807\u9898\uFF08### \uFF08\u4E00\uFF09\uFF09\uFF1A\u6807\u9898\u5C42\u7EA7\u7591\u4F3C\u8DF3\u7EA7\uFF0C\u68C0\u67E5\u8BE5\u5904 md \u6807\u9898\u7EA7\u522B`,
          lineOf(md, b.text)
        );
      }
      if (b.kind === "h1") seen.h1 = true;
      else if (b.kind === "h2") seen.h2 = true;
      else seen.h3 = true;
    }
  }
  const hasAny = Object.values(meta).some((v) => typeof v === "string" && v.trim());
  if (!hasAny && !blocks.some((b) => b.kind === "docTitle" || b.kind === "para" && b.text.trim())) {
    push("empty-document", "warn", "\u5168\u6587\u4E3A\u7A7A\uFF1A\u65E2\u65E0\u516C\u6587\u5C5E\u6027\uFF08rh-*\uFF09\u4E5F\u65E0\u6807\u9898/\u6B63\u6587\u3002\u82E5\u975E\u7A7A\u6587\u4EF6\uFF0C\u68C0\u67E5 frontmatter \u662F\u5426\u5B8C\u6574\uFF08\u5F00\u680F --- \u4E0E\u95ED\u680F ---\uFF09");
  }
  return issues;
}

// node_modules/docx/dist/index.mjs
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __esmMin = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames2(from), i = 0, n = keys.length, key; i < n; i++) {
    key = keys[i];
    if (!__hasOwnProp2.call(to, key) && key !== except) __defProp2(to, key, {
      get: ((k) => from[k]).bind(null, key),
      enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Calling `require` for "' + x + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
var BaseXmlComponent = class {
  /**
  * Creates a new BaseXmlComponent with the specified XML element name.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(rootKey) {
    _defineProperty(
      this,
      /** The XML element name for this component (e.g., "w:p" for paragraph). */
      "rootKey",
      void 0
    );
    this.rootKey = rootKey;
  }
};
var EMPTY_OBJECT = Object.seal({});
var XmlComponent = class extends BaseXmlComponent {
  /**
  * Creates a new XmlComponent.
  *
  * @param rootKey - The XML element name (e.g., "w:p", "w:r", "w:t")
  */
  constructor(rootKey) {
    super(rootKey);
    _defineProperty(
      this,
      /**
      * Array of child components, text nodes, and attributes.
      *
      * This array forms the content of the XML element. It can contain other
      * XmlComponents, string values (text nodes), or attribute components.
      */
      "root",
      void 0
    );
    this.root = new Array();
  }
  /**
  * Prepares this component and its children for XML serialization.
  *
  * This method is called by the Formatter to convert the component tree into
  * an object structure compatible with the xml library (https://www.npmjs.com/package/xml).
  * It recursively processes all children and handles special cases like
  * attribute-only elements and empty elements.
  *
  * The method can be overridden by subclasses to customize XML representation
  * or execute side effects during serialization (e.g., creating relationships).
  *
  * @param context - The serialization context containing document state
  * @returns The XML-serializable object, or undefined to exclude from output
  *
  * @example
  * ```typescript
  * // Override to add custom serialization logic
  * prepForXml(context: IContext): IXmlableObject | undefined {
  *   // Custom logic here
  *   return super.prepForXml(context);
  * }
  * ```
  */
  prepForXml(context) {
    var _children$;
    context.stack.push(this);
    const children = this.root.map((comp) => {
      if (comp instanceof BaseXmlComponent) return comp.prepForXml(context);
      return comp;
    }).filter((comp) => comp !== void 0);
    context.stack.pop();
    return { [this.rootKey]: children.length ? children.length === 1 && ((_children$ = children[0]) === null || _children$ === void 0 ? void 0 : _children$._attr) ? children[0] : children : EMPTY_OBJECT };
  }
  /**
  * Adds a child element to this component.
  *
  * @deprecated Do not use this method. It is only used internally by the library. It will be removed in a future version.
  * @param child - The child component or text string to add
  * @returns This component (for chaining)
  */
  addChildElement(child) {
    this.root.push(child);
    return this;
  }
};
var IgnoreIfEmptyXmlComponent = class extends XmlComponent {
  constructor(rootKey, includeIfEmpty) {
    super(rootKey);
    _defineProperty(this, "includeIfEmpty", void 0);
    this.includeIfEmpty = includeIfEmpty;
  }
  /**
  * Prepares the component for XML serialization, excluding it if empty.
  *
  * @param context - The serialization context
  * @returns The XML-serializable object, or undefined if empty
  */
  prepForXml(context) {
    const result = super.prepForXml(context);
    if (this.includeIfEmpty) return result;
    if (result && (typeof result[this.rootKey] !== "object" || Object.keys(result[this.rootKey]).length)) return result;
  }
};
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
var XmlAttributeComponent = class extends BaseXmlComponent {
  /**
  * Creates a new attribute component.
  *
  * @param root - The attribute data object
  */
  constructor(root) {
    super("_attr");
    _defineProperty(this, "root", void 0);
    _defineProperty(
      this,
      /** Optional mapping from property names to XML attribute names. */
      "xmlKeys",
      void 0
    );
    this.root = root;
  }
  /**
  * Converts the attribute data to an XML-serializable object.
  *
  * This method transforms the property names using xmlKeys (if defined)
  * and filters out undefined values.
  *
  * @param _ - Context (unused for attributes)
  * @returns Object with _attr key containing the mapped attributes
  */
  prepForXml(_) {
    const attrs = {};
    Object.entries(this.root).forEach(([key, value]) => {
      if (value !== void 0) {
        const newKey = this.xmlKeys && this.xmlKeys[key] || key;
        attrs[newKey] = value;
      }
    });
    return { _attr: attrs };
  }
};
var NextAttributeComponent = class extends BaseXmlComponent {
  /**
  * Creates a new NextAttributeComponent.
  *
  * @param root - Attribute payload with explicit key-value mappings
  */
  constructor(root) {
    super("_attr");
    _defineProperty(this, "root", void 0);
    this.root = root;
  }
  /**
  * Converts the attribute payload to an XML-serializable object.
  *
  * Extracts the key and value from each property and filters out
  * undefined values.
  *
  * @param _ - Context (unused for attributes)
  * @returns Object with _attr key containing the attributes
  */
  prepForXml(_) {
    return { _attr: Object.values(this.root).filter(({ value }) => value !== void 0).reduce((acc, { key, value }) => _objectSpread2(_objectSpread2({}, acc), {}, { [key]: value }), {}) };
  }
};
var Attributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      val: "w:val",
      color: "w:color",
      fill: "w:fill",
      space: "w:space",
      sz: "w:sz",
      type: "w:type",
      rsidR: "w:rsidR",
      rsidRPr: "w:rsidRPr",
      rsidSect: "w:rsidSect",
      w: "w:w",
      h: "w:h",
      top: "w:top",
      right: "w:right",
      bottom: "w:bottom",
      left: "w:left",
      header: "w:header",
      footer: "w:footer",
      gutter: "w:gutter",
      linePitch: "w:linePitch",
      pos: "w:pos"
    });
  }
};
var require_events = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") ReflectOwnKeys = R.ownKeys;
  else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
  else ReflectOwnKeys = function ReflectOwnKeys2(target) {
    return Object.getOwnPropertyNames(target);
  };
  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
    return value !== value;
  };
  function EventEmitter() {
    EventEmitter.init.call(this);
  }
  module2.exports = EventEmitter;
  module2.exports.once = once;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = void 0;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      defaultMaxListeners = arg;
    }
  });
  EventEmitter.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = type === "error";
    var events = this._events;
    if (events !== void 0) doError = doError && events.error === void 0;
    else if (!doError) return false;
    if (doError) {
      var er;
      if (args.length > 0) er = args[0];
      if (er instanceof Error) throw er;
      var err = /* @__PURE__ */ new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err.context = er;
      throw err;
    }
    var handler = events[type];
    if (handler === void 0) return false;
    if (typeof handler === "function") ReflectApply(handler, this, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === void 0) {
      events = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events.newListener !== void 0) {
        target.emit("newListener", type, listener.listener ? listener.listener : listener);
        events = target._events;
      }
      existing = events[type];
    }
    if (existing === void 0) {
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      else if (prepend) existing.unshift(listener);
      else existing.push(listener);
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0) return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state = {
      fired: false,
      wrapFn: void 0,
      target,
      type,
      listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter.prototype.once = function once2(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list2, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === void 0) return this;
    list2 = events[type];
    if (list2 === void 0) return this;
    if (list2 === listener || list2.listener === listener) if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
    else {
      delete events[type];
      if (events.removeListener) this.emit("removeListener", type, list2.listener || listener);
    }
    else if (typeof list2 !== "function") {
      position = -1;
      for (i = list2.length - 1; i >= 0; i--) if (list2[i] === listener || list2[i].listener === listener) {
        originalListener = list2[i].listener;
        position = i;
        break;
      }
      if (position < 0) return this;
      if (position === 0) list2.shift();
      else spliceOne(list2, position);
      if (list2.length === 1) events[type] = list2[0];
      if (events.removeListener !== void 0) this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events = this._events, i;
    if (events === void 0) return this;
    if (events.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== void 0) if (--this._eventsCount === 0) this._events = /* @__PURE__ */ Object.create(null);
      else delete events[type];
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;
      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === "removeListener") continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events[type];
    if (typeof listeners === "function") this.removeListener(type, listeners);
    else if (listeners !== void 0) for (i = listeners.length - 1; i >= 0; i--) this.removeListener(type, listeners[i]);
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === void 0) return [];
    var evlistener = events[type];
    if (evlistener === void 0) return [];
    if (typeof evlistener === "function") return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
    else return listenerCount.call(emitter, type);
  };
  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;
    if (events !== void 0) {
      var evlistener = events[type];
      if (typeof evlistener === "function") return 1;
      else if (evlistener !== void 0) return evlistener.length;
    }
    return 0;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i) copy[i] = arr[i];
    return copy;
  }
  function spliceOne(list2, index) {
    for (; index + 1 < list2.length; index++) list2[index] = list2[index + 1];
    list2.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) ret[i] = arr[i].listener || arr[i];
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function(resolve, reject) {
      function errorListener(err) {
        emitter.removeListener(name, resolver);
        reject(err);
      }
      function resolver() {
        if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
        resolve([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== "error") addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") if (flags.once) emitter.once(name, listener);
    else emitter.on(name, listener);
    else if (typeof emitter.addEventListener === "function") emitter.addEventListener(name, function wrapListener(arg) {
      if (flags.once) emitter.removeEventListener(name, wrapListener);
      listener(arg);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
});
var require_inherits_browser = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  if (typeof Object.create === "function") module2.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, { constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      } });
    }
  };
  else module2.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
});
var global;
var init_dist$1 = __esmMin(() => {
  global = globalThis || self;
});
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) return;
  draining = false;
  if (currentQueue.length) queue = currentQueue.concat(queue);
  else queueIndex = -1;
  if (queue.length) drainQueue();
}
function drainQueue() {
  if (draining) return;
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) if (currentQueue) currentQueue[queueIndex].run();
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
var browser;
var process;
var cachedSetTimeout;
var cachedClearTimeout;
var queue;
var draining;
var currentQueue;
var queueIndex;
var browserExports;
var process$1;
var init_dist = __esmMin(() => {
  browser = { exports: {} };
  process = browser.exports = {};
  (function() {
    try {
      if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
      else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
      else cachedClearTimeout = defaultClearTimeout;
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  queue = [];
  draining = false;
  queueIndex = -1;
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
  };
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  process.listeners = function(name) {
    return [];
  };
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function() {
    return "/";
  };
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function() {
    return 0;
  };
  browserExports = browser.exports;
  process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
});
var require_stream_browser = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = require_events().EventEmitter;
});
var require_base64_js = /* @__PURE__ */ __commonJSMin((exports2) => {
  exports2.byteLength = byteLength;
  exports2.toByteArray = toByteArray;
  exports2.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
    }
    return parts.join("");
  }
});
var require_ieee754 = /* @__PURE__ */ __commonJSMin((exports2) => {
  exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) ;
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) ;
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) value += rt / c;
      else value += rt * Math.pow(2, 1 - eBias);
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) ;
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) ;
    buffer[offset + i - d] |= s * 128;
  };
});
var require_buffer = /* @__PURE__ */ __commonJSMin((exports2) => {
  var base64 = require_base64_js();
  var ieee754 = require_ieee754();
  var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports2.Buffer = Buffer2;
  exports2.SlowBuffer = SlowBuffer;
  exports2.INSPECT_MAX_BYTES = 50;
  var K_MAX_LENGTH = 2147483647;
  exports2.kMaxLength = K_MAX_LENGTH;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      var proto = { foo: function() {
        return 42;
      } };
      Object.setPrototypeOf(proto, Uint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    var buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") return fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return Buffer2.from(valueOf, encodingOrOffset, length);
    var b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
  Object.setPrototypeOf(Buffer2, Uint8Array);
  function assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) return createBuffer(size);
    if (fill !== void 0) return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    return createBuffer(size);
  }
  Buffer2.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer2.allocUnsafe = function(size) {
    return allocUnsafe(size);
  };
  Buffer2.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!Buffer2.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    var length = byteLength(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) buf = buf.slice(0, actual);
    return buf;
  }
  function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for (var i = 0; i < length; i += 1) buf[i] = array[i] & 255;
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
      var copy = new Uint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var buf;
    if (byteOffset === void 0 && length === void 0) buf = new Uint8Array(array);
    else if (length === void 0) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      var buf = createBuffer(len);
      if (buf.length === 0) return buf;
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) length = 0;
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
    if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list2, length) {
    if (!Array.isArray(list2)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list2.length === 0) return Buffer2.alloc(0);
    var i;
    if (length === void 0) {
      length = 0;
      for (i = 0; i < list2.length; ++i) length += list2[i].length;
    }
    var buffer = Buffer2.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list2.length; ++i) {
      var buf = list2[i];
      if (isInstance(buf, Uint8Array)) if (pos + buf.length > buffer.length) Buffer2.from(buf).copy(buffer, pos);
      else Uint8Array.prototype.set.call(buffer, buf, pos);
      else if (!Buffer2.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
      else buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer2.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    var len = string.length;
    var mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    var loweredCase = false;
    for (; ; ) switch (encoding) {
      case "ascii":
      case "latin1":
      case "binary":
        return len;
      case "utf8":
      case "utf-8":
        return utf8ToBytes(string).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return len * 2;
      case "hex":
        return len >>> 1;
      case "base64":
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length;
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  }
  Buffer2.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) start = 0;
    if (start > this.length) return "";
    if (end === void 0 || end > this.length) end = this.length;
    if (end <= 0) return "";
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while (true) switch (encoding) {
      case "hex":
        return hexSlice(this, start, end);
      case "utf8":
      case "utf-8":
        return utf8Slice(this, start, end);
      case "ascii":
        return asciiSlice(this, start, end);
      case "latin1":
      case "binary":
        return latin1Slice(this, start, end);
      case "base64":
        return base64Slice(this, start, end);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return utf16leSlice(this, start, end);
      default:
        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
        encoding = (encoding + "").toLowerCase();
        loweredCase = true;
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer2.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var i = 0; i < len; i += 2) swap(this, i, i + 1);
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b) {
    if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer2.compare(this, b) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    var str = "";
    var max = exports2.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) target = Buffer2.from(target, target.offset, target.byteLength);
    if (!Buffer2.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === void 0) start = 0;
    if (end === void 0) end = target ? target.length : 0;
    if (thisStart === void 0) thisStart = 0;
    if (thisEnd === void 0) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) byteOffset = 2147483647;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) byteOffset = dir ? 0 : buffer.length - 1;
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) if (dir) return -1;
    else byteOffset = buffer.length - 1;
    else if (byteOffset < 0) if (dir) byteOffset = 0;
    else return -1;
    if (typeof val === "string") val = Buffer2.from(val, encoding);
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) return -1;
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) return -1;
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) return buf[i2];
      else return buf.readUInt16BE(i2 * indexSize);
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
        if (found) return i;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
      length = Number(length);
      if (length > remaining) length = remaining;
    }
    var strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (numberIsNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer2.prototype.write = function write(string, offset, length, encoding) {
    if (offset === void 0) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === void 0 && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0) encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var remaining = this.length - offset;
    if (length === void 0 || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    var loweredCase = false;
    for (; ; ) switch (encoding) {
      case "hex":
        return hexWrite(this, string, offset, length);
      case "utf8":
      case "utf-8":
        return utf8Write(this, string, offset, length);
      case "ascii":
      case "latin1":
      case "binary":
        return asciiWrite(this, string, offset, length);
      case "base64":
        return base64Write(this, string, offset, length);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return ucs2Write(this, string, offset, length);
      default:
        if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
        encoding = ("" + encoding).toLowerCase();
        loweredCase = true;
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
    else return base64.fromByteArray(buf.slice(start, end));
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) codePoint = firstByte;
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) codePoint = tempCodePoint;
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) codePoint = tempCodePoint;
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) codePoint = tempCodePoint;
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints);
    var res = "";
    var i = 0;
    while (i < len) res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i] & 127);
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) ret += String.fromCharCode(buf[i]);
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    var out = "";
    for (var i = start; i < end; ++i) out += hexSliceLookupTable[buf[i]];
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length - 1; i += 2) res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === void 0 ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    var newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength2 && (mul *= 256)) val += this[offset + i] * mul;
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    var val = this[offset + --byteLength2];
    var mul = 1;
    while (byteLength2 > 0 && (mul *= 256)) val += this[offset + --byteLength2] * mul;
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength2 && (mul *= 256)) val += this[offset + i] * mul;
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) checkOffset(offset, byteLength2, this.length);
    var i = byteLength2;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 256)) val += this[offset + --i] * mul;
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) this[offset + i] = value / mul & 255;
    return offset + byteLength2;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength2 = byteLength2 >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
      checkInt(this, value, offset, byteLength2, maxBytes, 0);
    }
    var i = byteLength2 - 1;
    var mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) this[offset + i] = value / mul & 255;
    return offset + byteLength2;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength2 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength2 - 1);
      checkInt(this, value, offset, byteLength2, limit - 1, -limit);
    }
    var i = byteLength2 - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength2;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    var len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") throw new TypeError("encoding must be a string");
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (encoding === "utf8" && code < 128 || encoding === "latin1") val = code;
      }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) val = 0;
    var i;
    if (typeof val === "number") for (i = start; i < end; ++i) this[i] = val;
    else {
      var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      var len = bytes.length;
      if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      for (i = 0; i < end - start; ++i) this[i + start] = bytes[i % len];
    }
    return this;
  };
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) str = str + "=";
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else throw new Error("Invalid code point");
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) byteArray.push(str.charCodeAt(i) & 255);
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  var hexSliceLookupTable = function() {
    var alphabet = "0123456789abcdef";
    var table = new Array(256);
    for (var i = 0; i < 16; ++i) {
      var i16 = i * 16;
      for (var j = 0; j < 16; ++j) table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
  }();
});
var require_shams$1 = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = function hasSymbols() {
    if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") return false;
    if (typeof Symbol.iterator === "symbol") return true;
    var obj = {};
    var sym = Symbol("test");
    var symObj = Object(sym);
    if (typeof sym === "string") return false;
    if (Object.prototype.toString.call(sym) !== "[object Symbol]") return false;
    if (Object.prototype.toString.call(symObj) !== "[object Symbol]") return false;
    var symVal = 42;
    obj[sym] = symVal;
    for (var _ in obj) return false;
    if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) return false;
    if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) return false;
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) return false;
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) return false;
    if (typeof Object.getOwnPropertyDescriptor === "function") {
      var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
      if (descriptor.value !== symVal || descriptor.enumerable !== true) return false;
    }
    return true;
  };
});
var require_shams = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var hasSymbols = require_shams$1();
  module2.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
  };
});
var require_es_object_atoms = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Object;
});
var require_es_errors = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Error;
});
var require_eval = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = EvalError;
});
var require_range = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = RangeError;
});
var require_ref = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = ReferenceError;
});
var require_syntax = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = SyntaxError;
});
var require_type = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = TypeError;
});
var require_uri = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = URIError;
});
var require_abs = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Math.abs;
});
var require_floor = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Math.floor;
});
var require_max = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Math.max;
});
var require_min = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Math.min;
});
var require_pow = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Math.pow;
});
var require_round = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Math.round;
});
var require_isNaN = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Number.isNaN || function isNaN2(a) {
    return a !== a;
  };
});
var require_sign = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var $isNaN = require_isNaN();
  module2.exports = function sign(number) {
    if ($isNaN(number) || number === 0) return number;
    return number < 0 ? -1 : 1;
  };
});
var require_gOPD = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Object.getOwnPropertyDescriptor;
});
var require_gopd = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var $gOPD = require_gOPD();
  if ($gOPD) try {
    $gOPD([], "length");
  } catch (e) {
    $gOPD = null;
  }
  module2.exports = $gOPD;
});
var require_es_define_property = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var $defineProperty = Object.defineProperty || false;
  if ($defineProperty) try {
    $defineProperty({}, "a", { value: 1 });
  } catch (e) {
    $defineProperty = false;
  }
  module2.exports = $defineProperty;
});
var require_has_symbols = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var origSymbol = typeof Symbol !== "undefined" && Symbol;
  var hasSymbolSham = require_shams$1();
  module2.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== "function") return false;
    if (typeof Symbol !== "function") return false;
    if (typeof origSymbol("foo") !== "symbol") return false;
    if (typeof Symbol("bar") !== "symbol") return false;
    return hasSymbolSham();
  };
});
var require_Reflect_getPrototypeOf = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
});
var require_Object_getPrototypeOf = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = require_es_object_atoms().getPrototypeOf || null;
});
var require_implementation = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
  var toStr = Object.prototype.toString;
  var max = Math.max;
  var funcType = "[object Function]";
  var concatty = function concatty2(a, b) {
    var arr = [];
    for (var i = 0; i < a.length; i += 1) arr[i] = a[i];
    for (var j = 0; j < b.length; j += 1) arr[j + a.length] = b[j];
    return arr;
  };
  var slicy = function slicy2(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) arr[j] = arrLike[i];
    return arr;
  };
  var joiny = function(arr, joiner) {
    var str = "";
    for (var i = 0; i < arr.length; i += 1) {
      str += arr[i];
      if (i + 1 < arr.length) str += joiner;
    }
    return str;
  };
  module2.exports = function bind(that) {
    var target = this;
    if (typeof target !== "function" || toStr.apply(target) !== funcType) throw new TypeError(ERROR_MESSAGE + target);
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
      if (this instanceof bound) {
        var result = target.apply(this, concatty(args, arguments));
        if (Object(result) === result) return result;
        return this;
      }
      return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) boundArgs[i] = "$" + i;
    bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
    if (target.prototype) {
      var Empty = function Empty2() {
      };
      Empty.prototype = target.prototype;
      bound.prototype = new Empty();
      Empty.prototype = null;
    }
    return bound;
  };
});
var require_function_bind = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var implementation = require_implementation();
  module2.exports = Function.prototype.bind || implementation;
});
var require_functionCall = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Function.prototype.call;
});
var require_functionApply = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Function.prototype.apply;
});
var require_reflectApply = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
});
var require_actualApply = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var bind = require_function_bind();
  var $apply = require_functionApply();
  var $call = require_functionCall();
  module2.exports = require_reflectApply() || bind.call($call, $apply);
});
var require_call_bind_apply_helpers = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var bind = require_function_bind();
  var $TypeError = require_type();
  var $call = require_functionCall();
  var $actualApply = require_actualApply();
  module2.exports = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== "function") throw new $TypeError("a function is required");
    return $actualApply(bind, $call, args);
  };
});
var require_get = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var callBind = require_call_bind_apply_helpers();
  var gOPD = require_gopd();
  var hasProtoAccessor;
  try {
    hasProtoAccessor = [].__proto__ === Array.prototype;
  } catch (e) {
    if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") throw e;
  }
  var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, "__proto__");
  var $Object = Object;
  var $getPrototypeOf = $Object.getPrototypeOf;
  module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? function getDunder(value) {
    return $getPrototypeOf(value == null ? value : $Object(value));
  } : false;
});
var require_get_proto = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var reflectGetProto = require_Reflect_getPrototypeOf();
  var originalGetProto = require_Object_getPrototypeOf();
  var getDunderProto = require_get();
  module2.exports = reflectGetProto ? function getProto(O) {
    return reflectGetProto(O);
  } : originalGetProto ? function getProto(O) {
    if (!O || typeof O !== "object" && typeof O !== "function") throw new TypeError("getProto: not an object");
    return originalGetProto(O);
  } : getDunderProto ? function getProto(O) {
    return getDunderProto(O);
  } : null;
});
var require_hasown = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var call = Function.prototype.call;
  var $hasOwn = Object.prototype.hasOwnProperty;
  module2.exports = require_function_bind().call(call, $hasOwn);
});
var require_get_intrinsic = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var undefined2;
  var $Object = require_es_object_atoms();
  var $Error = require_es_errors();
  var $EvalError = require_eval();
  var $RangeError = require_range();
  var $ReferenceError = require_ref();
  var $SyntaxError = require_syntax();
  var $TypeError = require_type();
  var $URIError = require_uri();
  var abs = require_abs();
  var floor = require_floor();
  var max = require_max();
  var min = require_min();
  var pow = require_pow();
  var round = require_round();
  var sign = require_sign();
  var $Function = Function;
  var getEvalledConstructor = function(expressionSyntax) {
    try {
      return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
    } catch (e) {
    }
  };
  var $gOPD = require_gopd();
  var $defineProperty = require_es_define_property();
  var throwTypeError = function() {
    throw new $TypeError();
  };
  var ThrowTypeError = $gOPD ? function() {
    try {
      arguments.callee;
      return throwTypeError;
    } catch (calleeThrows) {
      try {
        return $gOPD(arguments, "callee").get;
      } catch (gOPDthrows) {
        return throwTypeError;
      }
    }
  }() : throwTypeError;
  var hasSymbols = require_has_symbols()();
  var getProto = require_get_proto();
  var $ObjectGPO = require_Object_getPrototypeOf();
  var $ReflectGPO = require_Reflect_getPrototypeOf();
  var $apply = require_functionApply();
  var $call = require_functionCall();
  var needsEval = {};
  var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
  var INTRINSICS = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
    "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
    "%AsyncFromSyncIteratorPrototype%": undefined2,
    "%AsyncFunction%": needsEval,
    "%AsyncGenerator%": needsEval,
    "%AsyncGeneratorFunction%": needsEval,
    "%AsyncIteratorPrototype%": needsEval,
    "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
    "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
    "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": $Error,
    "%eval%": eval,
    "%EvalError%": $EvalError,
    "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
    "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
    "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
    "%Function%": $Function,
    "%GeneratorFunction%": needsEval,
    "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
    "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
    "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
    "%JSON%": typeof JSON === "object" ? JSON : undefined2,
    "%Map%": typeof Map === "undefined" ? undefined2 : Map,
    "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": $Object,
    "%Object.getOwnPropertyDescriptor%": $gOPD,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
    "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
    "%RangeError%": $RangeError,
    "%ReferenceError%": $ReferenceError,
    "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set === "undefined" ? undefined2 : Set,
    "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
    "%Symbol%": hasSymbols ? Symbol : undefined2,
    "%SyntaxError%": $SyntaxError,
    "%ThrowTypeError%": ThrowTypeError,
    "%TypedArray%": TypedArray,
    "%TypeError%": $TypeError,
    "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
    "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
    "%URIError%": $URIError,
    "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
    "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
    "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
    "%Function.prototype.call%": $call,
    "%Function.prototype.apply%": $apply,
    "%Object.defineProperty%": $defineProperty,
    "%Object.getPrototypeOf%": $ObjectGPO,
    "%Math.abs%": abs,
    "%Math.floor%": floor,
    "%Math.max%": max,
    "%Math.min%": min,
    "%Math.pow%": pow,
    "%Math.round%": round,
    "%Math.sign%": sign,
    "%Reflect.getPrototypeOf%": $ReflectGPO
  };
  if (getProto) try {
    null.error;
  } catch (e) {
    INTRINSICS["%Error.prototype%"] = getProto(getProto(e));
  }
  var doEval = function doEval2(name) {
    var value;
    if (name === "%AsyncFunction%") value = getEvalledConstructor("async function () {}");
    else if (name === "%GeneratorFunction%") value = getEvalledConstructor("function* () {}");
    else if (name === "%AsyncGeneratorFunction%") value = getEvalledConstructor("async function* () {}");
    else if (name === "%AsyncGenerator%") {
      var fn = doEval2("%AsyncGeneratorFunction%");
      if (fn) value = fn.prototype;
    } else if (name === "%AsyncIteratorPrototype%") {
      var gen = doEval2("%AsyncGenerator%");
      if (gen && getProto) value = getProto(gen.prototype);
    }
    INTRINSICS[name] = value;
    return value;
  };
  var LEGACY_ALIASES = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": [
      "Array",
      "prototype",
      "entries"
    ],
    "%ArrayProto_forEach%": [
      "Array",
      "prototype",
      "forEach"
    ],
    "%ArrayProto_keys%": [
      "Array",
      "prototype",
      "keys"
    ],
    "%ArrayProto_values%": [
      "Array",
      "prototype",
      "values"
    ],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": [
      "AsyncGeneratorFunction",
      "prototype",
      "prototype"
    ],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": [
      "GeneratorFunction",
      "prototype",
      "prototype"
    ],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": [
      "Object",
      "prototype",
      "toString"
    ],
    "%ObjProto_valueOf%": [
      "Object",
      "prototype",
      "valueOf"
    ],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": [
      "Promise",
      "prototype",
      "then"
    ],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  };
  var bind = require_function_bind();
  var hasOwn = require_hasown();
  var $concat = bind.call($call, Array.prototype.concat);
  var $spliceApply = bind.call($apply, Array.prototype.splice);
  var $replace = bind.call($call, String.prototype.replace);
  var $strSlice = bind.call($call, String.prototype.slice);
  var $exec = bind.call($call, RegExp.prototype.exec);
  var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = function stringToPath2(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === "%" && last !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
    else if (last === "%" && first !== "%") throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
      result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
    });
    return result;
  };
  var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
      alias = LEGACY_ALIASES[intrinsicName];
      intrinsicName = "%" + alias[0] + "%";
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
      var value = INTRINSICS[intrinsicName];
      if (value === needsEval) value = doEval(intrinsicName);
      if (typeof value === "undefined" && !allowMissing) throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      return {
        alias,
        name: intrinsicName,
        value
      };
    }
    throw new $SyntaxError("intrinsic " + name + " does not exist!");
  };
  module2.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== "string" || name.length === 0) throw new $TypeError("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof allowMissing !== "boolean") throw new $TypeError('"allowMissing" argument must be a boolean');
    if ($exec(/^%?[^%]*%?$/, name) === null) throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
    var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
      intrinsicBaseName = alias[0];
      $spliceApply(parts, $concat([0, 1], alias));
    }
    for (var i = 1, isOwn = true; i < parts.length; i += 1) {
      var part = parts[i];
      var first = $strSlice(part, 0, 1);
      var last = $strSlice(part, -1);
      if ((first === '"' || first === "'" || first === "`" || last === '"' || last === "'" || last === "`") && first !== last) throw new $SyntaxError("property names with quotes must have matching quotes");
      if (part === "constructor" || !isOwn) skipFurtherCaching = true;
      intrinsicBaseName += "." + part;
      intrinsicRealName = "%" + intrinsicBaseName + "%";
      if (hasOwn(INTRINSICS, intrinsicRealName)) value = INTRINSICS[intrinsicRealName];
      else if (value != null) {
        if (!(part in value)) {
          if (!allowMissing) throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
          return;
        }
        if ($gOPD && i + 1 >= parts.length) {
          var desc = $gOPD(value, part);
          isOwn = !!desc;
          if (isOwn && "get" in desc && !("originalValue" in desc.get)) value = desc.get;
          else value = value[part];
        } else {
          isOwn = hasOwn(value, part);
          value = value[part];
        }
        if (isOwn && !skipFurtherCaching) INTRINSICS[intrinsicRealName] = value;
      }
    }
    return value;
  };
});
var require_call_bound = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var GetIntrinsic = require_get_intrinsic();
  var callBindBasic = require_call_bind_apply_helpers();
  var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
  module2.exports = function callBoundIntrinsic(name, allowMissing) {
    var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) return callBindBasic([intrinsic]);
    return intrinsic;
  };
});
var require_is_arguments = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var hasToStringTag = require_shams()();
  var $toString = require_call_bound()("Object.prototype.toString");
  var isStandardArguments = function isArguments(value) {
    if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) return false;
    return $toString(value) === "[object Arguments]";
  };
  var isLegacyArguments = function isArguments(value) {
    if (isStandardArguments(value)) return true;
    return value !== null && typeof value === "object" && "length" in value && typeof value.length === "number" && value.length >= 0 && $toString(value) !== "[object Array]" && "callee" in value && $toString(value.callee) === "[object Function]";
  };
  var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
  }();
  isStandardArguments.isLegacyArguments = isLegacyArguments;
  module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
});
var require_is_generator_function = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var toStr = Object.prototype.toString;
  var fnToStr = Function.prototype.toString;
  var isFnRegex = /^\s*(?:function)?\*/;
  var hasToStringTag = require_shams()();
  var getProto = Object.getPrototypeOf;
  var getGeneratorFunc = function() {
    if (!hasToStringTag) return false;
    try {
      return Function("return function*() {}")();
    } catch (e) {
    }
  };
  var GeneratorFunction;
  module2.exports = function isGeneratorFunction(fn) {
    if (typeof fn !== "function") return false;
    if (isFnRegex.test(fnToStr.call(fn))) return true;
    if (!hasToStringTag) return toStr.call(fn) === "[object GeneratorFunction]";
    if (!getProto) return false;
    if (typeof GeneratorFunction === "undefined") {
      var generatorFunc = getGeneratorFunc();
      GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
    }
    return getProto(fn) === GeneratorFunction;
  };
});
var require_is_callable = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var fnToStr = Function.prototype.toString;
  var reflectApply = typeof Reflect === "object" && Reflect !== null && Reflect.apply;
  var badArrayLike;
  var isCallableMarker;
  if (typeof reflectApply === "function" && typeof Object.defineProperty === "function") try {
    badArrayLike = Object.defineProperty({}, "length", { get: function() {
      throw isCallableMarker;
    } });
    isCallableMarker = {};
    reflectApply(function() {
      throw 42;
    }, null, badArrayLike);
  } catch (_) {
    if (_ !== isCallableMarker) reflectApply = null;
  }
  else reflectApply = null;
  var constructorRegex = /^\s*class\b/;
  var isES6ClassFn = function isES6ClassFunction(value) {
    try {
      var fnStr = fnToStr.call(value);
      return constructorRegex.test(fnStr);
    } catch (e) {
      return false;
    }
  };
  var tryFunctionObject = function tryFunctionToStr(value) {
    try {
      if (isES6ClassFn(value)) return false;
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  };
  var toStr = Object.prototype.toString;
  var objectClass = "[object Object]";
  var fnClass = "[object Function]";
  var genClass = "[object GeneratorFunction]";
  var ddaClass = "[object HTMLAllCollection]";
  var ddaClass2 = "[object HTML document.all class]";
  var ddaClass3 = "[object HTMLCollection]";
  var hasToStringTag = typeof Symbol === "function" && !!Symbol.toStringTag;
  var isIE68 = !(0 in [,]);
  var isDDA = function isDocumentDotAll() {
    return false;
  };
  if (typeof document === "object") {
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) isDDA = function isDocumentDotAll(value) {
      if ((isIE68 || !value) && (typeof value === "undefined" || typeof value === "object")) try {
        var str = toStr.call(value);
        return (str === ddaClass || str === ddaClass2 || str === ddaClass3 || str === objectClass) && value("") == null;
      } catch (e) {
      }
      return false;
    };
  }
  module2.exports = reflectApply ? function isCallable(value) {
    if (isDDA(value)) return true;
    if (!value) return false;
    if (typeof value !== "function" && typeof value !== "object") return false;
    try {
      reflectApply(value, null, badArrayLike);
    } catch (e) {
      if (e !== isCallableMarker) return false;
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
  } : function isCallable(value) {
    if (isDDA(value)) return true;
    if (!value) return false;
    if (typeof value !== "function" && typeof value !== "object") return false;
    if (hasToStringTag) return tryFunctionObject(value);
    if (isES6ClassFn(value)) return false;
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) return false;
    return tryFunctionObject(value);
  };
});
var require_for_each = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var isCallable = require_is_callable();
  var toStr = Object.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var forEachArray = function forEachArray2(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) if (hasOwnProperty.call(array, i)) if (receiver == null) iterator(array[i], i, array);
    else iterator.call(receiver, array[i], i, array);
  };
  var forEachString = function forEachString2(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) if (receiver == null) iterator(string.charAt(i), i, string);
    else iterator.call(receiver, string.charAt(i), i, string);
  };
  var forEachObject = function forEachObject2(object, iterator, receiver) {
    for (var k in object) if (hasOwnProperty.call(object, k)) if (receiver == null) iterator(object[k], k, object);
    else iterator.call(receiver, object[k], k, object);
  };
  function isArray(x) {
    return toStr.call(x) === "[object Array]";
  }
  module2.exports = function forEach(list2, iterator, thisArg) {
    if (!isCallable(iterator)) throw new TypeError("iterator must be a function");
    var receiver;
    if (arguments.length >= 3) receiver = thisArg;
    if (isArray(list2)) forEachArray(list2, iterator, receiver);
    else if (typeof list2 === "string") forEachString(list2, iterator, receiver);
    else forEachObject(list2, iterator, receiver);
  };
});
var require_possible_typed_array_names = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
});
var require_available_typed_arrays = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist$1();
  var possibleNames = require_possible_typed_array_names();
  var g = typeof globalThis === "undefined" ? global : globalThis;
  module2.exports = function availableTypedArrays() {
    var out = [];
    for (var i = 0; i < possibleNames.length; i++) if (typeof g[possibleNames[i]] === "function") out[out.length] = possibleNames[i];
    return out;
  };
});
var require_define_data_property = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var $defineProperty = require_es_define_property();
  var $SyntaxError = require_syntax();
  var $TypeError = require_type();
  var gopd = require_gopd();
  module2.exports = function defineDataProperty(obj, property, value) {
    if (!obj || typeof obj !== "object" && typeof obj !== "function") throw new $TypeError("`obj` must be an object or a function`");
    if (typeof property !== "string" && typeof property !== "symbol") throw new $TypeError("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] !== "boolean") throw new $TypeError("`loose`, if provided, must be a boolean");
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    var desc = !!gopd && gopd(obj, property);
    if ($defineProperty) $defineProperty(obj, property, {
      configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
      enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
      value,
      writable: nonWritable === null && desc ? desc.writable : !nonWritable
    });
    else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) obj[property] = value;
    else throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  };
});
var require_has_property_descriptors = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var $defineProperty = require_es_define_property();
  var hasPropertyDescriptors = function hasPropertyDescriptors2() {
    return !!$defineProperty;
  };
  hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    if (!$defineProperty) return null;
    try {
      return $defineProperty([], "length", { value: 1 }).length !== 1;
    } catch (e) {
      return true;
    }
  };
  module2.exports = hasPropertyDescriptors;
});
var require_set_function_length = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var GetIntrinsic = require_get_intrinsic();
  var define2 = require_define_data_property();
  var hasDescriptors = require_has_property_descriptors()();
  var gOPD = require_gopd();
  var $TypeError = require_type();
  var $floor = GetIntrinsic("%Math.floor%");
  module2.exports = function setFunctionLength(fn, length) {
    if (typeof fn !== "function") throw new $TypeError("`fn` is not a function");
    if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) throw new $TypeError("`length` must be a positive 32-bit integer");
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ("length" in fn && gOPD) {
      var desc = gOPD(fn, "length");
      if (desc && !desc.configurable) functionLengthIsConfigurable = false;
      if (desc && !desc.writable) functionLengthIsWritable = false;
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) if (hasDescriptors) define2(fn, "length", length, true, true);
    else define2(fn, "length", length);
    return fn;
  };
});
var require_applyBind = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var bind = require_function_bind();
  var $apply = require_functionApply();
  var actualApply = require_actualApply();
  module2.exports = function applyBind() {
    return actualApply(bind, $apply, arguments);
  };
});
var require_call_bind = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var setFunctionLength = require_set_function_length();
  var $defineProperty = require_es_define_property();
  var callBindBasic = require_call_bind_apply_helpers();
  var applyBind = require_applyBind();
  module2.exports = function callBind(originalFunction) {
    var func = callBindBasic(arguments);
    var adjustedLength = originalFunction.length - (arguments.length - 1);
    return setFunctionLength(func, 1 + (adjustedLength > 0 ? adjustedLength : 0), true);
  };
  if ($defineProperty) $defineProperty(module2.exports, "apply", { value: applyBind });
  else module2.exports.apply = applyBind;
});
var require_which_typed_array = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist$1();
  var forEach = require_for_each();
  var availableTypedArrays = require_available_typed_arrays();
  var callBind = require_call_bind();
  var callBound = require_call_bound();
  var gOPD = require_gopd();
  var getProto = require_get_proto();
  var $toString = callBound("Object.prototype.toString");
  var hasToStringTag = require_shams()();
  var g = typeof globalThis === "undefined" ? global : globalThis;
  var typedArrays = availableTypedArrays();
  var $slice = callBound("String.prototype.slice");
  var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
    for (var i = 0; i < array.length; i += 1) if (array[i] === value) return i;
    return -1;
  };
  var cache = { __proto__: null };
  if (hasToStringTag && gOPD && getProto) forEach(typedArrays, function(typedArray) {
    var arr = new g[typedArray]();
    if (Symbol.toStringTag in arr && getProto) {
      var proto = getProto(arr);
      var descriptor = gOPD(proto, Symbol.toStringTag);
      if (!descriptor && proto) descriptor = gOPD(getProto(proto), Symbol.toStringTag);
      cache["$" + typedArray] = callBind(descriptor.get);
    }
  });
  else forEach(typedArrays, function(typedArray) {
    var arr = new g[typedArray]();
    var fn = arr.slice || arr.set;
    if (fn) cache["$" + typedArray] = callBind(fn);
  });
  var tryTypedArrays = function tryAllTypedArrays(value) {
    var found = false;
    forEach(
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(getter, typedArray) {
        if (!found) try {
          if ("$" + getter(value) === typedArray) found = $slice(typedArray, 1);
        } catch (e) {
        }
      }
    );
    return found;
  };
  var trySlices = function tryAllSlices(value) {
    var found = false;
    forEach(
      cache,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(getter, name) {
        if (!found) try {
          getter(value);
          found = $slice(name, 1);
        } catch (e) {
        }
      }
    );
    return found;
  };
  module2.exports = function whichTypedArray(value) {
    if (!value || typeof value !== "object") return false;
    if (!hasToStringTag) {
      var tag2 = $slice($toString(value), 8, -1);
      if ($indexOf(typedArrays, tag2) > -1) return tag2;
      if (tag2 !== "Object") return false;
      return trySlices(value);
    }
    if (!gOPD) return null;
    return tryTypedArrays(value);
  };
});
var require_is_typed_array = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var whichTypedArray = require_which_typed_array();
  module2.exports = function isTypedArray(value) {
    return !!whichTypedArray(value);
  };
});
var require_types = /* @__PURE__ */ __commonJSMin((exports2) => {
  var isArgumentsObject = require_is_arguments();
  var isGeneratorFunction = require_is_generator_function();
  var whichTypedArray = require_which_typed_array();
  var isTypedArray = require_is_typed_array();
  function uncurryThis(f) {
    return f.call.bind(f);
  }
  var BigIntSupported = typeof BigInt !== "undefined";
  var SymbolSupported = typeof Symbol !== "undefined";
  var ObjectToString = uncurryThis(Object.prototype.toString);
  var numberValue = uncurryThis(Number.prototype.valueOf);
  var stringValue = uncurryThis(String.prototype.valueOf);
  var booleanValue = uncurryThis(Boolean.prototype.valueOf);
  if (BigIntSupported) var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
  if (SymbolSupported) var symbolValue = uncurryThis(Symbol.prototype.valueOf);
  function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== "object") return false;
    try {
      prototypeValueOf(value);
      return true;
    } catch (e) {
      return false;
    }
  }
  exports2.isArgumentsObject = isArgumentsObject;
  exports2.isGeneratorFunction = isGeneratorFunction;
  exports2.isTypedArray = isTypedArray;
  function isPromise(input) {
    return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
  }
  exports2.isPromise = isPromise;
  function isArrayBufferView(value) {
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) return ArrayBuffer.isView(value);
    return isTypedArray(value) || isDataView(value);
  }
  exports2.isArrayBufferView = isArrayBufferView;
  function isUint8Array(value) {
    return whichTypedArray(value) === "Uint8Array";
  }
  exports2.isUint8Array = isUint8Array;
  function isUint8ClampedArray(value) {
    return whichTypedArray(value) === "Uint8ClampedArray";
  }
  exports2.isUint8ClampedArray = isUint8ClampedArray;
  function isUint16Array(value) {
    return whichTypedArray(value) === "Uint16Array";
  }
  exports2.isUint16Array = isUint16Array;
  function isUint32Array(value) {
    return whichTypedArray(value) === "Uint32Array";
  }
  exports2.isUint32Array = isUint32Array;
  function isInt8Array(value) {
    return whichTypedArray(value) === "Int8Array";
  }
  exports2.isInt8Array = isInt8Array;
  function isInt16Array(value) {
    return whichTypedArray(value) === "Int16Array";
  }
  exports2.isInt16Array = isInt16Array;
  function isInt32Array(value) {
    return whichTypedArray(value) === "Int32Array";
  }
  exports2.isInt32Array = isInt32Array;
  function isFloat32Array(value) {
    return whichTypedArray(value) === "Float32Array";
  }
  exports2.isFloat32Array = isFloat32Array;
  function isFloat64Array(value) {
    return whichTypedArray(value) === "Float64Array";
  }
  exports2.isFloat64Array = isFloat64Array;
  function isBigInt64Array(value) {
    return whichTypedArray(value) === "BigInt64Array";
  }
  exports2.isBigInt64Array = isBigInt64Array;
  function isBigUint64Array(value) {
    return whichTypedArray(value) === "BigUint64Array";
  }
  exports2.isBigUint64Array = isBigUint64Array;
  function isMapToString(value) {
    return ObjectToString(value) === "[object Map]";
  }
  isMapToString.working = typeof Map !== "undefined" && isMapToString(/* @__PURE__ */ new Map());
  function isMap(value) {
    if (typeof Map === "undefined") return false;
    return isMapToString.working ? isMapToString(value) : value instanceof Map;
  }
  exports2.isMap = isMap;
  function isSetToString(value) {
    return ObjectToString(value) === "[object Set]";
  }
  isSetToString.working = typeof Set !== "undefined" && isSetToString(/* @__PURE__ */ new Set());
  function isSet(value) {
    if (typeof Set === "undefined") return false;
    return isSetToString.working ? isSetToString(value) : value instanceof Set;
  }
  exports2.isSet = isSet;
  function isWeakMapToString(value) {
    return ObjectToString(value) === "[object WeakMap]";
  }
  isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(/* @__PURE__ */ new WeakMap());
  function isWeakMap(value) {
    if (typeof WeakMap === "undefined") return false;
    return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
  }
  exports2.isWeakMap = isWeakMap;
  function isWeakSetToString(value) {
    return ObjectToString(value) === "[object WeakSet]";
  }
  isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(/* @__PURE__ */ new WeakSet());
  function isWeakSet(value) {
    return isWeakSetToString(value);
  }
  exports2.isWeakSet = isWeakSet;
  function isArrayBufferToString(value) {
    return ObjectToString(value) === "[object ArrayBuffer]";
  }
  isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(/* @__PURE__ */ new ArrayBuffer());
  function isArrayBuffer(value) {
    if (typeof ArrayBuffer === "undefined") return false;
    return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
  }
  exports2.isArrayBuffer = isArrayBuffer;
  function isDataViewToString(value) {
    return ObjectToString(value) === "[object DataView]";
  }
  isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(/* @__PURE__ */ new ArrayBuffer(1), 0, 1));
  function isDataView(value) {
    if (typeof DataView === "undefined") return false;
    return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
  }
  exports2.isDataView = isDataView;
  var SharedArrayBufferCopy = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : void 0;
  function isSharedArrayBufferToString(value) {
    return ObjectToString(value) === "[object SharedArrayBuffer]";
  }
  function isSharedArrayBuffer(value) {
    if (typeof SharedArrayBufferCopy === "undefined") return false;
    if (typeof isSharedArrayBufferToString.working === "undefined") isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
    return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
  }
  exports2.isSharedArrayBuffer = isSharedArrayBuffer;
  function isAsyncFunction(value) {
    return ObjectToString(value) === "[object AsyncFunction]";
  }
  exports2.isAsyncFunction = isAsyncFunction;
  function isMapIterator(value) {
    return ObjectToString(value) === "[object Map Iterator]";
  }
  exports2.isMapIterator = isMapIterator;
  function isSetIterator(value) {
    return ObjectToString(value) === "[object Set Iterator]";
  }
  exports2.isSetIterator = isSetIterator;
  function isGeneratorObject(value) {
    return ObjectToString(value) === "[object Generator]";
  }
  exports2.isGeneratorObject = isGeneratorObject;
  function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === "[object WebAssembly.Module]";
  }
  exports2.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
  function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
  }
  exports2.isNumberObject = isNumberObject;
  function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
  }
  exports2.isStringObject = isStringObject;
  function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
  }
  exports2.isBooleanObject = isBooleanObject;
  function isBigIntObject(value) {
    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
  }
  exports2.isBigIntObject = isBigIntObject;
  function isSymbolObject(value) {
    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
  }
  exports2.isSymbolObject = isSymbolObject;
  function isBoxedPrimitive(value) {
    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
  }
  exports2.isBoxedPrimitive = isBoxedPrimitive;
  function isAnyArrayBuffer(value) {
    return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
  }
  exports2.isAnyArrayBuffer = isAnyArrayBuffer;
  [
    "isProxy",
    "isExternal",
    "isModuleNamespaceObject"
  ].forEach(function(method) {
    Object.defineProperty(exports2, method, {
      enumerable: false,
      value: function() {
        throw new Error(method + " is not supported in userland");
      }
    });
  });
});
var require_isBufferBrowser = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = function isBuffer(arg) {
    return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
  };
});
var require_util = /* @__PURE__ */ __commonJSMin((exports2) => {
  init_dist();
  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    return descriptors;
  };
  var formatRegExp = /%[sdj%]/g;
  exports2.format = function(f) {
    if (!isString(f)) {
      var objects = [];
      for (var i = 0; i < arguments.length; i++) objects.push(inspect(arguments[i]));
      return objects.join(" ");
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x2) {
      if (x2 === "%%") return "%";
      if (i >= len) return x2;
      switch (x2) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
        default:
          return x2;
      }
    });
    for (var x = args[i]; i < len; x = args[++i]) if (isNull(x) || !isObject(x)) str += " " + x;
    else str += " " + inspect(x);
    return str;
  };
  exports2.deprecate = function(fn, msg) {
    if (typeof process$1 !== "undefined" && process$1.noDeprecation === true) return fn;
    if (typeof process$1 === "undefined") return function() {
      return exports2.deprecate(fn, msg).apply(this, arguments);
    };
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (process$1.throwDeprecation) throw new Error(msg);
        else if (process$1.traceDeprecation) console.trace(msg);
        else console.error(msg);
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  };
  var debugs = {};
  var debugEnvRegex = /^$/;
  if (process$1.env.NODE_DEBUG) {
    var debugEnv = process$1.env.NODE_DEBUG;
    debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
    debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
  }
  exports2.debuglog = function(set) {
    set = set.toUpperCase();
    if (!debugs[set]) if (debugEnvRegex.test(set)) {
      var pid = process$1.pid;
      debugs[set] = function() {
        var msg = exports2.format.apply(exports2, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else debugs[set] = function() {
    };
    return debugs[set];
  };
  function inspect(obj, opts) {
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) ctx.showHidden = opts;
    else if (opts) exports2._extend(ctx, opts);
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  exports2.inspect = inspect;
  inspect.colors = {
    "bold": [1, 22],
    "italic": [3, 23],
    "underline": [4, 24],
    "inverse": [7, 27],
    "white": [37, 39],
    "grey": [90, 39],
    "black": [30, 39],
    "blue": [34, 39],
    "cyan": [36, 39],
    "green": [32, 39],
    "magenta": [35, 39],
    "red": [31, 39],
    "yellow": [33, 39]
  };
  inspect.styles = {
    "special": "cyan",
    "number": "yellow",
    "boolean": "yellow",
    "undefined": "grey",
    "null": "bold",
    "string": "green",
    "date": "magenta",
    "regexp": "red"
  };
  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
    if (style) return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
    else return str;
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function arrayToHash(array) {
    var hash = {};
    array.forEach(function(val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports2.inspect && !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) ret = formatValue(ctx, ret, recurseTimes);
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) return primitive;
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) keys = Object.getOwnPropertyNames(value);
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) return formatError(value);
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      if (isDate(value)) return ctx.stylize(Date.prototype.toString.call(value), "date");
      if (isError(value)) return formatError(value);
    }
    var base = "", array = false, braces = ["{", "}"];
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) base = " [Function" + (value.name ? ": " + value.name : "") + "]";
    if (isRegExp(value)) base = " " + RegExp.prototype.toString.call(value);
    if (isDate(value)) base = " " + Date.prototype.toUTCString.call(value);
    if (isError(value)) base = " " + formatError(value);
    if (keys.length === 0 && (!array || value.length == 0)) return braces[0] + base + braces[1];
    if (recurseTimes < 0) if (isRegExp(value)) return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    else return ctx.stylize("[Object]", "special");
    ctx.seen.push(value);
    var output;
    if (array) output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    else output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value)) return ctx.stylize("" + value, "number");
    if (isBoolean(value)) return ctx.stylize("" + value, "boolean");
    if (isNull(value)) return ctx.stylize("null", "null");
  }
  function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) if (hasOwnProperty(value, String(i))) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    else output.push("");
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) if (desc.set) str = ctx.stylize("[Getter/Setter]", "special");
    else str = ctx.stylize("[Getter]", "special");
    else if (desc.set) str = ctx.stylize("[Setter]", "special");
    if (!hasOwnProperty(visibleKeys, key)) name = "[" + key + "]";
    if (!str) if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) str = formatValue(ctx, desc.value, null);
      else str = formatValue(ctx, desc.value, recurseTimes - 1);
      if (str.indexOf("\n") > -1) if (array) str = str.split("\n").map(function(line) {
        return "  " + line;
      }).join("\n").slice(2);
      else str = "\n" + str.split("\n").map(function(line) {
        return "   " + line;
      }).join("\n");
    } else str = ctx.stylize("[Circular]", "special");
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) return str;
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.slice(1, -1);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    if (output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf("\n") >= 0) numLinesEst++;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0) > 60) return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
  }
  exports2.types = require_types();
  function isArray(ar) {
    return Array.isArray(ar);
  }
  exports2.isArray = isArray;
  function isBoolean(arg) {
    return typeof arg === "boolean";
  }
  exports2.isBoolean = isBoolean;
  function isNull(arg) {
    return arg === null;
  }
  exports2.isNull = isNull;
  function isNullOrUndefined(arg) {
    return arg == null;
  }
  exports2.isNullOrUndefined = isNullOrUndefined;
  function isNumber(arg) {
    return typeof arg === "number";
  }
  exports2.isNumber = isNumber;
  function isString(arg) {
    return typeof arg === "string";
  }
  exports2.isString = isString;
  function isSymbol(arg) {
    return typeof arg === "symbol";
  }
  exports2.isSymbol = isSymbol;
  function isUndefined(arg) {
    return arg === void 0;
  }
  exports2.isUndefined = isUndefined;
  function isRegExp(re) {
    return isObject(re) && objectToString(re) === "[object RegExp]";
  }
  exports2.isRegExp = isRegExp;
  exports2.types.isRegExp = isRegExp;
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  exports2.isObject = isObject;
  function isDate(d) {
    return isObject(d) && objectToString(d) === "[object Date]";
  }
  exports2.isDate = isDate;
  exports2.types.isDate = isDate;
  function isError(e) {
    return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  exports2.isError = isError;
  exports2.types.isNativeError = isError;
  function isFunction(arg) {
    return typeof arg === "function";
  }
  exports2.isFunction = isFunction;
  function isPrimitive(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
  }
  exports2.isPrimitive = isPrimitive;
  exports2.isBuffer = require_isBufferBrowser();
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function pad(n) {
    return n < 10 ? "0" + n.toString(10) : n.toString(10);
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  function timestamp() {
    var d = /* @__PURE__ */ new Date();
    var time = [
      pad(d.getHours()),
      pad(d.getMinutes()),
      pad(d.getSeconds())
    ].join(":");
    return [
      d.getDate(),
      months[d.getMonth()],
      time
    ].join(" ");
  }
  exports2.log = function() {
    console.log("%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
  };
  exports2.inherits = require_inherits_browser();
  exports2._extend = function(origin, add) {
    if (!add || !isObject(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) origin[keys[i]] = add[keys[i]];
    return origin;
  };
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
  exports2.promisify = function promisify(original) {
    if (typeof original !== "function") throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
      var fn = original[kCustomPromisifiedSymbol];
      if (typeof fn !== "function") throw new TypeError('The "util.promisify.custom" argument must be of type Function');
      Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
      });
      return fn;
    }
    function fn() {
      var promiseResolve, promiseReject;
      var promise = new Promise(function(resolve, reject) {
        promiseResolve = resolve;
        promiseReject = reject;
      });
      var args = [];
      for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
      args.push(function(err, value) {
        if (err) promiseReject(err);
        else promiseResolve(value);
      });
      try {
        original.apply(this, args);
      } catch (err) {
        promiseReject(err);
      }
      return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
  };
  exports2.promisify.custom = kCustomPromisifiedSymbol;
  function callbackifyOnRejected(reason, cb) {
    if (!reason) {
      var newReason = /* @__PURE__ */ new Error("Promise was rejected with a falsy value");
      newReason.reason = reason;
      reason = newReason;
    }
    return cb(reason);
  }
  function callbackify(original) {
    if (typeof original !== "function") throw new TypeError('The "original" argument must be of type Function');
    function callbackified() {
      var args = [];
      for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
      var maybeCb = args.pop();
      if (typeof maybeCb !== "function") throw new TypeError("The last argument must be of type Function");
      var self2 = this;
      var cb = function() {
        return maybeCb.apply(self2, arguments);
      };
      original.apply(this, args).then(function(ret) {
        process$1.nextTick(cb.bind(null, null, ret));
      }, function(rej) {
        process$1.nextTick(callbackifyOnRejected.bind(null, rej, cb));
      });
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
  }
  exports2.callbackify = callbackify;
});
var require_buffer_list = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty2(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    else obj[key] = value;
    return obj;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var Buffer2 = require_buffer().Buffer;
  var inspect = require_util().inspect;
  var custom = inspect && inspect.custom || "inspect";
  function copyBuffer(src, target, offset) {
    Buffer2.prototype.copy.call(src, target, offset);
  }
  module2.exports = /* @__PURE__ */ function() {
    function BufferList() {
      _classCallCheck(this, BufferList);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    _createClass(BufferList, [
      {
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0) this.tail.next = entry;
          else this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      },
      {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0) this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      },
      {
        key: "shift",
        value: function shift() {
          if (this.length === 0) return;
          var ret = this.head.data;
          if (this.length === 1) this.head = this.tail = null;
          else this.head = this.head.next;
          --this.length;
          return ret;
        }
      },
      {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      },
      {
        key: "join",
        value: function join(s) {
          if (this.length === 0) return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) ret += s + p.data;
          return ret;
        }
      },
      {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0) return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
      },
      {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) ret = this.shift();
          else ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          return ret;
        }
      },
      {
        key: "first",
        value: function first() {
          return this.head.data;
        }
      },
      {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length) ret += str;
            else ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
      },
      {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next) this.head = p.next;
                else this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
      },
      {
        key: custom,
        value: function value(_, options2) {
          return inspect(this, _objectSpread(_objectSpread({}, options2), {}, {
            depth: 0,
            customInspect: false
          }));
        }
      }
    ]);
    return BufferList;
  }();
});
var require_destroy = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist();
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) cb(err);
      else if (err) {
        if (!this._writableState) process$1.nextTick(emitErrorNT, this, err);
        else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          process$1.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) this._readableState.destroyed = true;
    if (this._writableState) this._writableState.destroyed = true;
    this._destroy(err || null, function(err2) {
      if (!cb && err2) if (!_this._writableState) process$1.nextTick(emitErrorAndCloseNT, _this, err2);
      else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process$1.nextTick(emitErrorAndCloseNT, _this, err2);
      } else process$1.nextTick(emitCloseNT, _this);
      else if (cb) {
        process$1.nextTick(emitCloseNT, _this);
        cb(err2);
      } else process$1.nextTick(emitCloseNT, _this);
    });
    return this;
  }
  function emitErrorAndCloseNT(self2, err) {
    emitErrorNT(self2, err);
    emitCloseNT(self2);
  }
  function emitCloseNT(self2) {
    if (self2._writableState && !self2._writableState.emitClose) return;
    if (self2._readableState && !self2._readableState.emitClose) return;
    self2.emit("close");
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  function errorOrDestroy(stream, err) {
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
    else stream.emit("error", err);
  }
  module2.exports = {
    destroy,
    undestroy,
    errorOrDestroy
  };
});
var require_errors_browser = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  var codes = {};
  function createErrorType(code, message, Base) {
    if (!Base) Base = Error;
    function getMessage(arg1, arg2, arg3) {
      if (typeof message === "string") return message;
      else return message(arg1, arg2, arg3);
    }
    var NodeError = /* @__PURE__ */ function(_Base) {
      _inheritsLoose(NodeError2, _Base);
      function NodeError2(arg1, arg2, arg3) {
        return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
      }
      return NodeError2;
    }(Base);
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      var len = expected.length;
      expected = expected.map(function(i) {
        return String(i);
      });
      if (len > 2) return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(", "), ", or ") + expected[len - 1];
      else if (len === 2) return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
      else return "of ".concat(thing, " ").concat(expected[0]);
    } else return "of ".concat(thing, " ").concat(String(expected));
  }
  function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  }
  function endsWith(str, search, this_len) {
    if (this_len === void 0 || this_len > str.length) this_len = str.length;
    return str.substring(this_len - search.length, this_len) === search;
  }
  function includes(str, search, start) {
    if (typeof start !== "number") start = 0;
    if (start + search.length > str.length) return false;
    else return str.indexOf(search, start) !== -1;
  }
  createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
  }, TypeError);
  createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    var determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
      determiner = "must not be";
      expected = expected.replace(/^not /, "");
    } else determiner = "must be";
    var msg;
    if (endsWith(name, " argument")) msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    else {
      var type = includes(name, ".") ? "property" : "argument";
      msg = 'The "'.concat(name, '" ').concat(type, " ").concat(determiner, " ").concat(oneOf(expected, "type"));
    }
    msg += ". Received type ".concat(typeof actual);
    return msg;
  }, TypeError);
  createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
  createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
  });
  createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
  createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
  });
  createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
  createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
  }, TypeError);
  createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
  module2.exports.codes = codes;
});
var require_state = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var ERR_INVALID_OPT_VALUE = require_errors_browser().codes.ERR_INVALID_OPT_VALUE;
  function highWaterMarkFrom(options2, isDuplex, duplexKey) {
    return options2.highWaterMark != null ? options2.highWaterMark : isDuplex ? options2[duplexKey] : null;
  }
  function getHighWaterMark(state, options2, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options2, isDuplex, duplexKey);
    if (hwm != null) {
      if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) throw new ERR_INVALID_OPT_VALUE(isDuplex ? duplexKey : "highWaterMark", hwm);
      return Math.floor(hwm);
    }
    return state.objectMode ? 16 : 16 * 1024;
  }
  module2.exports = { getHighWaterMark };
});
var require_browser = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist$1();
  module2.exports = deprecate;
  function deprecate(fn, msg) {
    if (config("noDeprecation")) return fn;
    var warned = false;
    function deprecated() {
      if (!warned) {
        if (config("throwDeprecation")) throw new Error(msg);
        else if (config("traceDeprecation")) console.trace(msg);
        else console.warn(msg);
        warned = true;
      }
      return fn.apply(this, arguments);
    }
    return deprecated;
  }
  function config(name) {
    try {
      if (!global.localStorage) return false;
    } catch (_) {
      return false;
    }
    var val = global.localStorage[name];
    if (null == val) return false;
    return String(val).toLowerCase() === "true";
  }
});
var require__stream_writable = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist$1();
  init_dist();
  module2.exports = Writable;
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state);
    };
  }
  var Duplex;
  Writable.WritableState = WritableState;
  var internalUtil = { deprecate: require_browser() };
  var Stream = require_stream_browser();
  var Buffer2 = require_buffer().Buffer;
  var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = require_destroy();
  var getHighWaterMark = require_state().getHighWaterMark;
  var _require$codes = require_errors_browser().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED, ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES, ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END, ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  require_inherits_browser()(Writable, Stream);
  function nop() {
  }
  function WritableState(options2, stream, isDuplex) {
    Duplex = Duplex || require__stream_duplex();
    options2 = options2 || {};
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
    this.objectMode = !!options2.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options2.writableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options2, "writableHighWaterMark", isDuplex);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options2.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options2.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = options2.emitClose !== false;
    this.autoDestroy = !!options2.autoDestroy;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", { get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003") });
    } catch (_) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, { value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    } });
  } else realHasInstance = function realHasInstance2(object) {
    return object instanceof this;
  };
  function Writable(options2) {
    Duplex = Duplex || require__stream_duplex();
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options2);
    this._writableState = new WritableState(options2, this, isDuplex);
    this.writable = true;
    if (options2) {
      if (typeof options2.write === "function") this._write = options2.write;
      if (typeof options2.writev === "function") this._writev = options2.writev;
      if (typeof options2.destroy === "function") this._destroy = options2.destroy;
      if (typeof options2.final === "function") this._final = options2.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function writeAfterEnd(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END();
    errorOrDestroy(stream, er);
    process$1.nextTick(cb, er);
  }
  function validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) er = new ERR_STREAM_NULL_VALUES();
    else if (typeof chunk !== "string" && !state.objectMode) er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
    if (er) {
      errorOrDestroy(stream, er);
      process$1.nextTick(cb, er);
      return false;
    }
    return true;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) chunk = _uint8ArrayToBuffer(chunk);
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf) encoding = "buffer";
    else if (!encoding) encoding = state.defaultEncoding;
    if (typeof cb !== "function") cb = nop;
    if (state.ending) writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string") encoding = encoding.toLowerCase();
    if (!([
      "hex",
      "utf8",
      "utf-8",
      "ascii",
      "binary",
      "base64",
      "ucs2",
      "ucs-2",
      "utf16le",
      "utf-16le",
      "raw"
    ].indexOf((encoding + "").toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableBuffer", {
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = Buffer2.from(chunk, encoding);
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret) state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) last.next = state.lastBufferedRequest;
      else state.bufferedRequest = state.lastBufferedRequest;
      state.bufferedRequestCount += 1;
    } else doWrite(stream, state, false, len, chunk, encoding, cb);
    return ret;
  }
  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      process$1.nextTick(cb, er);
      process$1.nextTick(finishMaybe, stream, state);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
    } else {
      cb(er);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
      finishMaybe(stream, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== "function") throw new ERR_MULTIPLE_CALLBACK();
    onwriteStateUpdate(state);
    if (er) onwriteError(stream, state, sync, er, cb);
    else {
      var finished = needFinish(state) || stream.destroyed;
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(stream, state);
      if (sync) process$1.nextTick(afterWrite, stream, state, finished, cb);
      else afterWrite(stream, state, finished, cb);
    }
  }
  function afterWrite(stream, state, finished, cb) {
    if (!finished) onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer[count] = entry;
        if (!entry.isBuf) allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer.allBuffers = allBuffers;
      doWrite(stream, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else state.corkedRequestsFree = new CorkedRequest(state);
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        doWrite(stream, state, false, state.objectMode ? 1 : chunk.length, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) break;
      }
      if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending) endWritable(this, state, cb);
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableLength", {
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function callFinal(stream, state) {
    stream._final(function(err) {
      state.pendingcb--;
      if (err) errorOrDestroy(stream, err);
      state.prefinished = true;
      stream.emit("prefinish");
      finishMaybe(stream, state);
    });
  }
  function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) if (typeof stream._final === "function" && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process$1.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit("prefinish");
    }
  }
  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      prefinish(stream, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream.emit("finish");
        if (state.autoDestroy) {
          var rState = stream._readableState;
          if (!rState || rState.autoDestroy && rState.endEmitted) stream.destroy();
        }
      }
    }
    return need;
  }
  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) if (state.finished) process$1.nextTick(cb);
    else stream.once("finish", cb);
    state.ended = true;
    stream.writable = false;
  }
  function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._writableState === void 0) return false;
      return this._writableState.destroyed;
    },
    set: function set(value) {
      if (!this._writableState) return;
      this._writableState.destroyed = value;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
});
var require__stream_duplex = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist();
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj) keys2.push(key);
    return keys2;
  };
  module2.exports = Duplex;
  var Readable = require__stream_readable();
  var Writable = require__stream_writable();
  require_inherits_browser()(Duplex, Readable);
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
  function Duplex(options2) {
    if (!(this instanceof Duplex)) return new Duplex(options2);
    Readable.call(this, options2);
    Writable.call(this, options2);
    this.allowHalfOpen = true;
    if (options2) {
      if (options2.readable === false) this.readable = false;
      if (options2.writable === false) this.writable = false;
      if (options2.allowHalfOpen === false) {
        this.allowHalfOpen = false;
        this.once("end", onend);
      }
    }
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  Object.defineProperty(Duplex.prototype, "writableBuffer", {
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  Object.defineProperty(Duplex.prototype, "writableLength", {
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function onend() {
    if (this._writableState.ended) return;
    process$1.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0 || this._writableState === void 0) return false;
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
      if (this._readableState === void 0 || this._writableState === void 0) return;
      this._readableState.destroyed = value;
      this._writableState.destroyed = value;
    }
  });
});
var require_safe_buffer = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var buffer = require_buffer();
  var Buffer2 = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) dst[key] = src[key];
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) module2.exports = buffer;
  else {
    copyProps(buffer, exports2);
    exports2.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") throw new TypeError("Argument must not be a number");
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    var buf = Buffer2(size);
    if (fill !== void 0) if (typeof encoding === "string") buf.fill(fill, encoding);
    else buf.fill(fill);
    else buf.fill(0);
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return buffer.SlowBuffer(size);
  };
});
var require_string_decoder = /* @__PURE__ */ __commonJSMin((exports2) => {
  var Buffer2 = require_safe_buffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while (true) switch (enc) {
      case "utf8":
      case "utf-8":
        return "utf8";
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return "utf16le";
      case "latin1":
      case "binary":
        return "latin1";
      case "base64":
      case "ascii":
      case "hex":
        return enc;
      default:
        if (retried) return;
        enc = ("" + enc).toLowerCase();
        retried = true;
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  exports2.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0) return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else i = 0;
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127) return 0;
    else if (byte >> 5 === 6) return 2;
    else if (byte >> 4 === 14) return 3;
    else if (byte >> 3 === 30) return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) if (nb === 2) nb = 0;
      else self2.lastNeed = nb - 3;
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "\uFFFD";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "\uFFFD";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "\uFFFD";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== void 0) return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "\uFFFD";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) this.lastChar[0] = buf[buf.length - 1];
    else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
});
var require_end_of_stream = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var ERR_STREAM_PREMATURE_CLOSE = require_errors_browser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function once(callback) {
    var called = false;
    return function() {
      if (called) return;
      called = true;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      callback.apply(this, args);
    };
  }
  function noop2() {
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function eos(stream, opts, callback) {
    if (typeof opts === "function") return eos(stream, null, opts);
    if (!opts) opts = {};
    callback = once(callback || noop2);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish2() {
      if (!stream.writable) onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish2() {
      writable = false;
      writableEnded = true;
      if (!readable) callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend2() {
      readable = false;
      readableEnded = true;
      if (!writable) callback.call(stream);
    };
    var onerror = function onerror2(err) {
      callback.call(stream, err);
    };
    var onclose = function onclose2() {
      var err;
      if (readable && !readableEnded) {
        if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream, err);
      }
      if (writable && !writableEnded) {
        if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
        return callback.call(stream, err);
      }
    };
    var onrequest = function onrequest2() {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      stream.on("abort", onclose);
      if (stream.req) onrequest();
      else stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req) stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
  }
  module2.exports = eos;
});
var require_async_iterator = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist();
  var _Object$setPrototypeO;
  function _defineProperty2(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    else obj[key] = value;
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var finished = require_end_of_stream();
  var kLastResolve = Symbol("lastResolve");
  var kLastReject = Symbol("lastReject");
  var kError = Symbol("error");
  var kEnded = Symbol("ended");
  var kLastPromise = Symbol("lastPromise");
  var kHandlePromise = Symbol("handlePromise");
  var kStream = Symbol("stream");
  function createIterResult(value, done) {
    return {
      value,
      done
    };
  }
  function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
      var data = iter[kStream].read();
      if (data !== null) {
        iter[kLastPromise] = null;
        iter[kLastResolve] = null;
        iter[kLastReject] = null;
        resolve(createIterResult(data, false));
      }
    }
  }
  function onReadable(iter) {
    process$1.nextTick(readAndResolve, iter);
  }
  function wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
      lastPromise.then(function() {
        if (iter[kEnded]) {
          resolve(createIterResult(void 0, true));
          return;
        }
        iter[kHandlePromise](resolve, reject);
      }, reject);
    };
  }
  var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
  });
  var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
      return this[kStream];
    },
    next: function next() {
      var _this = this;
      var error = this[kError];
      if (error !== null) return Promise.reject(error);
      if (this[kEnded]) return Promise.resolve(createIterResult(void 0, true));
      if (this[kStream].destroyed) return new Promise(function(resolve, reject) {
        process$1.nextTick(function() {
          if (_this[kError]) reject(_this[kError]);
          else resolve(createIterResult(void 0, true));
        });
      });
      var lastPromise = this[kLastPromise];
      var promise;
      if (lastPromise) promise = new Promise(wrapForNext(lastPromise, this));
      else {
        var data = this[kStream].read();
        if (data !== null) return Promise.resolve(createIterResult(data, false));
        promise = new Promise(this[kHandlePromise]);
      }
      this[kLastPromise] = promise;
      return promise;
    }
  }, _defineProperty2(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
  }), _defineProperty2(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2[kStream].destroy(null, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(createIterResult(void 0, true));
      });
    });
  }), _Object$setPrototypeO), AsyncIteratorPrototype);
  module2.exports = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty2(_Object$create, kStream, {
      value: stream,
      writable: true
    }), _defineProperty2(_Object$create, kLastResolve, {
      value: null,
      writable: true
    }), _defineProperty2(_Object$create, kLastReject, {
      value: null,
      writable: true
    }), _defineProperty2(_Object$create, kError, {
      value: null,
      writable: true
    }), _defineProperty2(_Object$create, kEnded, {
      value: stream._readableState.endEmitted,
      writable: true
    }), _defineProperty2(_Object$create, kHandlePromise, {
      value: function value(resolve, reject) {
        var data = iterator[kStream].read();
        if (data) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(data, false));
        } else {
          iterator[kLastResolve] = resolve;
          iterator[kLastReject] = reject;
        }
      },
      writable: true
    }), _Object$create));
    iterator[kLastPromise] = null;
    finished(stream, function(err) {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var reject = iterator[kLastReject];
        if (reject !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          reject(err);
        }
        iterator[kError] = err;
        return;
      }
      var resolve = iterator[kLastResolve];
      if (resolve !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(void 0, true));
      }
      iterator[kEnded] = true;
    });
    stream.on("readable", onReadable.bind(null, iterator));
    return iterator;
  };
});
var require_from_browser = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = function() {
    throw new Error("Readable.from is not available in the browser");
  };
});
var require__stream_readable = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist$1();
  init_dist();
  module2.exports = Readable;
  var Duplex;
  Readable.ReadableState = ReadableState;
  require_events().EventEmitter;
  var EElistenerCount = function EElistenerCount2(emitter, type) {
    return emitter.listeners(type).length;
  };
  var Stream = require_stream_browser();
  var Buffer2 = require_buffer().Buffer;
  var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var debugUtil = require_util();
  var debug;
  if (debugUtil && debugUtil.debuglog) debug = debugUtil.debuglog("stream");
  else debug = function debug2() {
  };
  var BufferList = require_buffer_list();
  var destroyImpl = require_destroy();
  var getHighWaterMark = require_state().getHighWaterMark;
  var _require$codes = require_errors_browser().codes, ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE, ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
  var StringDecoder;
  var createReadableStreamAsyncIterator;
  var from;
  require_inherits_browser()(Readable, Stream);
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  var kProxyEvents = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
  ];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options2, stream, isDuplex) {
    Duplex = Duplex || require__stream_duplex();
    options2 = options2 || {};
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof Duplex;
    this.objectMode = !!options2.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options2.readableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options2, "readableHighWaterMark", isDuplex);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    this.emitClose = options2.emitClose !== false;
    this.autoDestroy = !!options2.autoDestroy;
    this.destroyed = false;
    this.defaultEncoding = options2.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options2.encoding) {
      if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
      this.decoder = new StringDecoder(options2.encoding);
      this.encoding = options2.encoding;
    }
  }
  function Readable(options2) {
    Duplex = Duplex || require__stream_duplex();
    if (!(this instanceof Readable)) return new Readable(options2);
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options2, this, isDuplex);
    this.readable = true;
    if (options2) {
      if (typeof options2.read === "function") this._read = options2.read;
      if (typeof options2.destroy === "function") this._destroy = options2.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._readableState === void 0) return false;
      return this._readableState.destroyed;
    },
    set: function set(value) {
      if (!this._readableState) return;
      this._readableState.destroyed = value;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else skipChunkCheck = true;
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug("readableAddChunk", chunk);
    var state = stream._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else {
      var er;
      if (!skipChunkCheck) er = chunkInvalid(state, chunk);
      if (er) errorOrDestroy(stream, er);
      else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) chunk = _uint8ArrayToBuffer(chunk);
        if (addToFront) if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
        else addChunk(stream, state, chunk, true);
        else if (state.ended) errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
        else if (state.destroyed) return false;
        else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
            else maybeReadMore(stream, state);
          } else addChunk(stream, state, chunk, false);
        }
      } else if (!addToFront) {
        state.reading = false;
        maybeReadMore(stream, state);
      }
    }
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
  }
  function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      state.awaitDrain = 0;
      stream.emit("data", chunk);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront) state.buffer.unshift(chunk);
      else state.buffer.push(chunk);
      if (state.needReadable) emitReadable(stream);
    }
    maybeReadMore(stream, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) er = new ERR_INVALID_ARG_TYPE("chunk", [
      "string",
      "Buffer",
      "Uint8Array"
    ], chunk);
    return er;
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
    var decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    var p = this._readableState.buffer.head;
    var content = "";
    while (p !== null) {
      content += decoder.write(p.data);
      p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "") this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) n = MAX_HWM;
    else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) if (state.flowing && state.length) return state.buffer.head.data.length;
    else return state.length;
    if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length) return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0) state.emittedReadable = false;
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended) endReadable(this);
      else emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0) endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0) state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
      if (!state.reading) n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0) ret = fromList(n, state);
    else ret = null;
    if (ret === null) {
      state.needReadable = state.length <= state.highWaterMark;
      n = 0;
    } else {
      state.length -= n;
      state.awaitDrain = 0;
    }
    if (state.length === 0) {
      if (!state.ended) state.needReadable = true;
      if (nOrig !== n && state.ended) endReadable(this);
    }
    if (ret !== null) this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream, state) {
    debug("onEofChunk");
    if (state.ended) return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    if (state.sync) emitReadable(stream);
    else {
      state.needReadable = false;
      if (!state.emittedReadable) {
        state.emittedReadable = true;
        emitReadable_(stream);
      }
    }
  }
  function emitReadable(stream) {
    var state = stream._readableState;
    debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      process$1.nextTick(emitReadable_, stream);
    }
  }
  function emitReadable_(stream) {
    var state = stream._readableState;
    debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
      stream.emit("readable");
      state.emittedReadable = false;
    }
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
  }
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      process$1.nextTick(maybeReadMore_, stream, state);
    }
  }
  function maybeReadMore_(stream, state) {
    while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
      var len = state.length;
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state.length) break;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var endFn = (!pipeOpts || pipeOpts.end !== false) && dest !== process$1.stdout && dest !== process$1.stderr ? onend : unpipe;
    if (state.endEmitted) process$1.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug("onunpipe");
      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      var ret = dest.write(chunk);
      debug("dest.write", ret);
      if (ret === false) {
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state.awaitDrain);
          state.awaitDrain++;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0) errorOrDestroy(dest, er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain) state.awaitDrain--;
      if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = { hasUnpiped: false };
    if (state.pipesCount === 0) return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes) return this;
      if (!dest) dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest) dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0; i < len; i++) dests[i].emit("unpipe", this, { hasUnpiped: false });
      return this;
    }
    var index = indexOf(state.pipes, dest);
    if (index === -1) return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === "data") {
      state.readableListening = this.listenerCount("readable") > 0;
      if (state.flowing !== false) this.resume();
    } else if (ev === "readable") {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.flowing = false;
        state.emittedReadable = false;
        debug("on readable", state.length, state.reading);
        if (state.length) emitReadable(this);
        else if (!state.reading) process$1.nextTick(nReadingNextTick, this);
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") process$1.nextTick(updateReadableListening, this);
    return res;
  };
  Readable.prototype.removeAllListeners = function(ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) process$1.nextTick(updateReadableListening, this);
    return res;
  };
  function updateReadableListening(self2) {
    var state = self2._readableState;
    state.readableListening = self2.listenerCount("readable") > 0;
    if (state.resumeScheduled && !state.paused) state.flowing = true;
    else if (self2.listenerCount("data") > 0) self2.resume();
  }
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug("resume");
      state.flowing = !state.readableListening;
      resume(this, state);
    }
    state.paused = false;
    return this;
  };
  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      process$1.nextTick(resume_, stream, state);
    }
  }
  function resume_(stream, state) {
    debug("resume", state.reading);
    if (!state.reading) stream.read(0);
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
  };
  function flow(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream.read() !== null) ;
  }
  Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) _this.push(chunk);
      }
      _this.push(null);
    });
    stream.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder) chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === void 0)) return;
      else if (!state.objectMode && (!chunk || !chunk.length)) return;
      if (!_this.push(chunk)) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) if (this[i] === void 0 && typeof stream[i] === "function") this[i] = /* @__PURE__ */ function methodWrap(method) {
      return function methodWrapReturnFunction() {
        return stream[method].apply(stream, arguments);
      };
    }(i);
    for (var n = 0; n < kProxyEvents.length; n++) stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return this;
  };
  if (typeof Symbol === "function") Readable.prototype[Symbol.asyncIterator] = function() {
    if (createReadableStreamAsyncIterator === void 0) createReadableStreamAsyncIterator = require_async_iterator();
    return createReadableStreamAsyncIterator(this);
  };
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._readableState.highWaterMark;
    }
  });
  Object.defineProperty(Readable.prototype, "readableBuffer", {
    enumerable: false,
    get: function get() {
      return this._readableState && this._readableState.buffer;
    }
  });
  Object.defineProperty(Readable.prototype, "readableFlowing", {
    enumerable: false,
    get: function get() {
      return this._readableState.flowing;
    },
    set: function set(state) {
      if (this._readableState) this._readableState.flowing = state;
    }
  });
  Readable._fromList = fromList;
  Object.defineProperty(Readable.prototype, "readableLength", {
    enumerable: false,
    get: function get() {
      return this._readableState.length;
    }
  });
  function fromList(n, state) {
    if (state.length === 0) return null;
    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder) ret = state.buffer.join("");
      else if (state.buffer.length === 1) ret = state.buffer.first();
      else ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else ret = state.buffer.consume(n, state.decoder);
    return ret;
  }
  function endReadable(stream) {
    var state = stream._readableState;
    debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
      state.ended = true;
      process$1.nextTick(endReadableNT, state, stream);
    }
  }
  function endReadableNT(state, stream) {
    debug("endReadableNT", state.endEmitted, state.length);
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
      if (state.autoDestroy) {
        var wState = stream._writableState;
        if (!wState || wState.autoDestroy && wState.finished) stream.destroy();
      }
    }
  }
  if (typeof Symbol === "function") Readable.from = function(iterable, opts) {
    if (from === void 0) from = require_from_browser();
    return from(Readable, iterable, opts);
  };
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length; i < l; i++) if (xs[i] === x) return i;
    return -1;
  }
});
var require__stream_transform = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Transform;
  var _require$codes = require_errors_browser().codes, ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED, ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK, ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
  var Duplex = require__stream_duplex();
  require_inherits_browser()(Transform, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) return this.emit("error", new ERR_MULTIPLE_CALLBACK());
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
  function Transform(options2) {
    if (!(this instanceof Transform)) return new Transform(options2);
    Duplex.call(this, options2);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options2) {
      if (typeof options2.transform === "function") this._transform = options2.transform;
      if (typeof options2.flush === "function") this._flush = options2.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) this._flush(function(er, data) {
      done(_this, er, data);
    });
    else done(this, null, null);
  }
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else ts.needTransform = true;
  };
  Transform.prototype._destroy = function(err, cb) {
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
    });
  };
  function done(stream, er, data) {
    if (er) return stream.emit("error", er);
    if (data != null) stream.push(data);
    if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
  }
});
var require__stream_passthrough = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = PassThrough;
  var Transform = require__stream_transform();
  require_inherits_browser()(PassThrough, Transform);
  function PassThrough(options2) {
    if (!(this instanceof PassThrough)) return new PassThrough(options2);
    Transform.call(this, options2);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
});
var require_pipeline = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var eos;
  function once(callback) {
    var called = false;
    return function() {
      if (called) return;
      called = true;
      callback.apply(void 0, arguments);
    };
  }
  var _require$codes = require_errors_browser().codes, ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS, ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  function noop2(err) {
    if (err) throw err;
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function destroyer(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
      closed = true;
    });
    if (eos === void 0) eos = require_end_of_stream();
    eos(stream, {
      readable: reading,
      writable: writing
    }, function(err) {
      if (err) return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed) return;
      if (destroyed) return;
      destroyed = true;
      if (isRequest(stream)) return stream.abort();
      if (typeof stream.destroy === "function") return stream.destroy();
      callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
  }
  function call(fn) {
    fn();
  }
  function pipe(from, to) {
    return from.pipe(to);
  }
  function popCallback(streams) {
    if (!streams.length) return noop2;
    if (typeof streams[streams.length - 1] !== "function") return noop2;
    return streams.pop();
  }
  function pipeline() {
    for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) streams[_key] = arguments[_key];
    var callback = popCallback(streams);
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new ERR_MISSING_ARGS("streams");
    var error;
    var destroys = streams.map(function(stream, i) {
      var reading = i < streams.length - 1;
      return destroyer(stream, reading, i > 0, function(err) {
        if (!error) error = err;
        if (err) destroys.forEach(call);
        if (reading) return;
        destroys.forEach(call);
        callback(error);
      });
    });
    return streams.reduce(pipe);
  }
  module2.exports = pipeline;
});
var require_stream_browserify = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = Stream;
  var EE = require_events().EventEmitter;
  require_inherits_browser()(Stream, EE);
  Stream.Readable = require__stream_readable();
  Stream.Writable = require__stream_writable();
  Stream.Duplex = require__stream_duplex();
  Stream.Transform = require__stream_transform();
  Stream.PassThrough = require__stream_passthrough();
  Stream.finished = require_end_of_stream();
  Stream.pipeline = require_pipeline();
  Stream.Stream = Stream;
  function Stream() {
    EE.call(this);
  }
  Stream.prototype.pipe = function(dest, options2) {
    var source = this;
    function ondata(chunk) {
      if (dest.writable) {
        if (false === dest.write(chunk) && source.pause) source.pause();
      }
    }
    source.on("data", ondata);
    function ondrain() {
      if (source.readable && source.resume) source.resume();
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options2 || options2.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    var didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === "function") dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, "error") === 0) throw er;
    }
    source.on("error", onerror);
    dest.on("error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
});
var require_sax = /* @__PURE__ */ __commonJSMin((exports2) => {
  (function(sax) {
    sax.parser = function(strict, opt) {
      return new SAXParser(strict, opt);
    };
    sax.SAXParser = SAXParser;
    sax.SAXStream = SAXStream;
    sax.createStream = createStream;
    sax.MAX_BUFFER_LENGTH = 64 * 1024;
    var buffers = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    sax.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function SAXParser(strict, opt) {
      if (!(this instanceof SAXParser)) return new SAXParser(strict, opt);
      var parser2 = this;
      clearBuffers(parser2);
      parser2.q = parser2.c = "";
      parser2.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
      parser2.opt = opt || {};
      parser2.opt.lowercase = parser2.opt.lowercase || parser2.opt.lowercasetags;
      parser2.looseCase = parser2.opt.lowercase ? "toLowerCase" : "toUpperCase";
      parser2.tags = [];
      parser2.closed = parser2.closedRoot = parser2.sawRoot = false;
      parser2.tag = parser2.error = null;
      parser2.strict = !!strict;
      parser2.noscript = !!(strict || parser2.opt.noscript);
      parser2.state = S.BEGIN;
      parser2.strictEntities = parser2.opt.strictEntities;
      parser2.ENTITIES = parser2.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
      parser2.attribList = [];
      if (parser2.opt.xmlns) parser2.ns = Object.create(rootNS);
      parser2.trackPosition = parser2.opt.position !== false;
      if (parser2.trackPosition) parser2.position = parser2.line = parser2.column = 0;
      emit(parser2, "onready");
    }
    if (!Object.create) Object.create = function(o) {
      function F() {
      }
      F.prototype = o;
      return new F();
    };
    if (!Object.keys) Object.keys = function(o) {
      var a = [];
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
      return a;
    };
    function checkBufferLength(parser2) {
      var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
      var maxActual = 0;
      for (var i = 0, l = buffers.length; i < l; i++) {
        var len = parser2[buffers[i]].length;
        if (len > maxAllowed) switch (buffers[i]) {
          case "textNode":
            closeText(parser2);
            break;
          case "cdata":
            emitNode(parser2, "oncdata", parser2.cdata);
            parser2.cdata = "";
            break;
          case "script":
            emitNode(parser2, "onscript", parser2.script);
            parser2.script = "";
            break;
          default:
            error(parser2, "Max buffer length exceeded: " + buffers[i]);
        }
        maxActual = Math.max(maxActual, len);
      }
      parser2.bufferCheckPosition = sax.MAX_BUFFER_LENGTH - maxActual + parser2.position;
    }
    function clearBuffers(parser2) {
      for (var i = 0, l = buffers.length; i < l; i++) parser2[buffers[i]] = "";
    }
    function flushBuffers(parser2) {
      closeText(parser2);
      if (parser2.cdata !== "") {
        emitNode(parser2, "oncdata", parser2.cdata);
        parser2.cdata = "";
      }
      if (parser2.script !== "") {
        emitNode(parser2, "onscript", parser2.script);
        parser2.script = "";
      }
    }
    SAXParser.prototype = {
      end: function() {
        end(this);
      },
      write,
      resume: function() {
        this.error = null;
        return this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        flushBuffers(this);
      }
    };
    var Stream;
    try {
      Stream = require_stream_browserify().Stream;
    } catch (ex) {
      Stream = function() {
      };
    }
    var streamWraps = sax.EVENTS.filter(function(ev) {
      return ev !== "error" && ev !== "end";
    });
    function createStream(strict, opt) {
      return new SAXStream(strict, opt);
    }
    function SAXStream(strict, opt) {
      if (!(this instanceof SAXStream)) return new SAXStream(strict, opt);
      Stream.apply(this);
      this._parser = new SAXParser(strict, opt);
      this.writable = true;
      this.readable = true;
      var me = this;
      this._parser.onend = function() {
        me.emit("end");
      };
      this._parser.onerror = function(er) {
        me.emit("error", er);
        me._parser.error = null;
      };
      this._decoder = null;
      streamWraps.forEach(function(ev) {
        Object.defineProperty(me, "on" + ev, {
          get: function() {
            return me._parser["on" + ev];
          },
          set: function(h) {
            if (!h) {
              me.removeAllListeners(ev);
              me._parser["on" + ev] = h;
              return h;
            }
            me.on(ev, h);
          },
          enumerable: true,
          configurable: false
        });
      });
    }
    SAXStream.prototype = Object.create(Stream.prototype, { constructor: { value: SAXStream } });
    SAXStream.prototype.write = function(data) {
      if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
        if (!this._decoder) {
          var SD = require_string_decoder().StringDecoder;
          this._decoder = new SD("utf8");
        }
        data = this._decoder.write(data);
      }
      this._parser.write(data.toString());
      this.emit("data", data);
      return true;
    };
    SAXStream.prototype.end = function(chunk) {
      if (chunk && chunk.length) this.write(chunk);
      this._parser.end();
      return true;
    };
    SAXStream.prototype.on = function(ev, handler) {
      var me = this;
      if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) me._parser["on" + ev] = function() {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        args.splice(0, 0, ev);
        me.emit.apply(me, args);
      };
      return Stream.prototype.on.call(me, ev, handler);
    };
    var CDATA = "[CDATA[";
    var DOCTYPE = "DOCTYPE";
    var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
    var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
    var rootNS = {
      xml: XML_NAMESPACE,
      xmlns: XMLNS_NAMESPACE
    };
    var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function isWhitespace(c) {
      return c === " " || c === "\n" || c === "\r" || c === "	";
    }
    function isQuote(c) {
      return c === '"' || c === "'";
    }
    function isAttribEnd(c) {
      return c === ">" || isWhitespace(c);
    }
    function isMatch(regex, c) {
      return regex.test(c);
    }
    function notMatch(regex, c) {
      return !isMatch(regex, c);
    }
    var S = 0;
    sax.STATE = {
      BEGIN: S++,
      BEGIN_WHITESPACE: S++,
      TEXT: S++,
      TEXT_ENTITY: S++,
      OPEN_WAKA: S++,
      SGML_DECL: S++,
      SGML_DECL_QUOTED: S++,
      DOCTYPE: S++,
      DOCTYPE_QUOTED: S++,
      DOCTYPE_DTD: S++,
      DOCTYPE_DTD_QUOTED: S++,
      COMMENT_STARTING: S++,
      COMMENT: S++,
      COMMENT_ENDING: S++,
      COMMENT_ENDED: S++,
      CDATA: S++,
      CDATA_ENDING: S++,
      CDATA_ENDING_2: S++,
      PROC_INST: S++,
      PROC_INST_BODY: S++,
      PROC_INST_ENDING: S++,
      OPEN_TAG: S++,
      OPEN_TAG_SLASH: S++,
      ATTRIB: S++,
      ATTRIB_NAME: S++,
      ATTRIB_NAME_SAW_WHITE: S++,
      ATTRIB_VALUE: S++,
      ATTRIB_VALUE_QUOTED: S++,
      ATTRIB_VALUE_CLOSED: S++,
      ATTRIB_VALUE_UNQUOTED: S++,
      ATTRIB_VALUE_ENTITY_Q: S++,
      ATTRIB_VALUE_ENTITY_U: S++,
      CLOSE_TAG: S++,
      CLOSE_TAG_SAW_WHITE: S++,
      SCRIPT: S++,
      SCRIPT_ENDING: S++
    };
    sax.XML_ENTITIES = {
      "amp": "&",
      "gt": ">",
      "lt": "<",
      "quot": '"',
      "apos": "'"
    };
    sax.ENTITIES = {
      "amp": "&",
      "gt": ">",
      "lt": "<",
      "quot": '"',
      "apos": "'",
      "AElig": 198,
      "Aacute": 193,
      "Acirc": 194,
      "Agrave": 192,
      "Aring": 197,
      "Atilde": 195,
      "Auml": 196,
      "Ccedil": 199,
      "ETH": 208,
      "Eacute": 201,
      "Ecirc": 202,
      "Egrave": 200,
      "Euml": 203,
      "Iacute": 205,
      "Icirc": 206,
      "Igrave": 204,
      "Iuml": 207,
      "Ntilde": 209,
      "Oacute": 211,
      "Ocirc": 212,
      "Ograve": 210,
      "Oslash": 216,
      "Otilde": 213,
      "Ouml": 214,
      "THORN": 222,
      "Uacute": 218,
      "Ucirc": 219,
      "Ugrave": 217,
      "Uuml": 220,
      "Yacute": 221,
      "aacute": 225,
      "acirc": 226,
      "aelig": 230,
      "agrave": 224,
      "aring": 229,
      "atilde": 227,
      "auml": 228,
      "ccedil": 231,
      "eacute": 233,
      "ecirc": 234,
      "egrave": 232,
      "eth": 240,
      "euml": 235,
      "iacute": 237,
      "icirc": 238,
      "igrave": 236,
      "iuml": 239,
      "ntilde": 241,
      "oacute": 243,
      "ocirc": 244,
      "ograve": 242,
      "oslash": 248,
      "otilde": 245,
      "ouml": 246,
      "szlig": 223,
      "thorn": 254,
      "uacute": 250,
      "ucirc": 251,
      "ugrave": 249,
      "uuml": 252,
      "yacute": 253,
      "yuml": 255,
      "copy": 169,
      "reg": 174,
      "nbsp": 160,
      "iexcl": 161,
      "cent": 162,
      "pound": 163,
      "curren": 164,
      "yen": 165,
      "brvbar": 166,
      "sect": 167,
      "uml": 168,
      "ordf": 170,
      "laquo": 171,
      "not": 172,
      "shy": 173,
      "macr": 175,
      "deg": 176,
      "plusmn": 177,
      "sup1": 185,
      "sup2": 178,
      "sup3": 179,
      "acute": 180,
      "micro": 181,
      "para": 182,
      "middot": 183,
      "cedil": 184,
      "ordm": 186,
      "raquo": 187,
      "frac14": 188,
      "frac12": 189,
      "frac34": 190,
      "iquest": 191,
      "times": 215,
      "divide": 247,
      "OElig": 338,
      "oelig": 339,
      "Scaron": 352,
      "scaron": 353,
      "Yuml": 376,
      "fnof": 402,
      "circ": 710,
      "tilde": 732,
      "Alpha": 913,
      "Beta": 914,
      "Gamma": 915,
      "Delta": 916,
      "Epsilon": 917,
      "Zeta": 918,
      "Eta": 919,
      "Theta": 920,
      "Iota": 921,
      "Kappa": 922,
      "Lambda": 923,
      "Mu": 924,
      "Nu": 925,
      "Xi": 926,
      "Omicron": 927,
      "Pi": 928,
      "Rho": 929,
      "Sigma": 931,
      "Tau": 932,
      "Upsilon": 933,
      "Phi": 934,
      "Chi": 935,
      "Psi": 936,
      "Omega": 937,
      "alpha": 945,
      "beta": 946,
      "gamma": 947,
      "delta": 948,
      "epsilon": 949,
      "zeta": 950,
      "eta": 951,
      "theta": 952,
      "iota": 953,
      "kappa": 954,
      "lambda": 955,
      "mu": 956,
      "nu": 957,
      "xi": 958,
      "omicron": 959,
      "pi": 960,
      "rho": 961,
      "sigmaf": 962,
      "sigma": 963,
      "tau": 964,
      "upsilon": 965,
      "phi": 966,
      "chi": 967,
      "psi": 968,
      "omega": 969,
      "thetasym": 977,
      "upsih": 978,
      "piv": 982,
      "ensp": 8194,
      "emsp": 8195,
      "thinsp": 8201,
      "zwnj": 8204,
      "zwj": 8205,
      "lrm": 8206,
      "rlm": 8207,
      "ndash": 8211,
      "mdash": 8212,
      "lsquo": 8216,
      "rsquo": 8217,
      "sbquo": 8218,
      "ldquo": 8220,
      "rdquo": 8221,
      "bdquo": 8222,
      "dagger": 8224,
      "Dagger": 8225,
      "bull": 8226,
      "hellip": 8230,
      "permil": 8240,
      "prime": 8242,
      "Prime": 8243,
      "lsaquo": 8249,
      "rsaquo": 8250,
      "oline": 8254,
      "frasl": 8260,
      "euro": 8364,
      "image": 8465,
      "weierp": 8472,
      "real": 8476,
      "trade": 8482,
      "alefsym": 8501,
      "larr": 8592,
      "uarr": 8593,
      "rarr": 8594,
      "darr": 8595,
      "harr": 8596,
      "crarr": 8629,
      "lArr": 8656,
      "uArr": 8657,
      "rArr": 8658,
      "dArr": 8659,
      "hArr": 8660,
      "forall": 8704,
      "part": 8706,
      "exist": 8707,
      "empty": 8709,
      "nabla": 8711,
      "isin": 8712,
      "notin": 8713,
      "ni": 8715,
      "prod": 8719,
      "sum": 8721,
      "minus": 8722,
      "lowast": 8727,
      "radic": 8730,
      "prop": 8733,
      "infin": 8734,
      "ang": 8736,
      "and": 8743,
      "or": 8744,
      "cap": 8745,
      "cup": 8746,
      "int": 8747,
      "there4": 8756,
      "sim": 8764,
      "cong": 8773,
      "asymp": 8776,
      "ne": 8800,
      "equiv": 8801,
      "le": 8804,
      "ge": 8805,
      "sub": 8834,
      "sup": 8835,
      "nsub": 8836,
      "sube": 8838,
      "supe": 8839,
      "oplus": 8853,
      "otimes": 8855,
      "perp": 8869,
      "sdot": 8901,
      "lceil": 8968,
      "rceil": 8969,
      "lfloor": 8970,
      "rfloor": 8971,
      "lang": 9001,
      "rang": 9002,
      "loz": 9674,
      "spades": 9824,
      "clubs": 9827,
      "hearts": 9829,
      "diams": 9830
    };
    Object.keys(sax.ENTITIES).forEach(function(key) {
      var e = sax.ENTITIES[key];
      var s2 = typeof e === "number" ? String.fromCharCode(e) : e;
      sax.ENTITIES[key] = s2;
    });
    for (var s in sax.STATE) sax.STATE[sax.STATE[s]] = s;
    S = sax.STATE;
    function emit(parser2, event, data) {
      parser2[event] && parser2[event](data);
    }
    function emitNode(parser2, nodeType, data) {
      if (parser2.textNode) closeText(parser2);
      emit(parser2, nodeType, data);
    }
    function closeText(parser2) {
      parser2.textNode = textopts(parser2.opt, parser2.textNode);
      if (parser2.textNode) emit(parser2, "ontext", parser2.textNode);
      parser2.textNode = "";
    }
    function textopts(opt, text) {
      if (opt.trim) text = text.trim();
      if (opt.normalize) text = text.replace(/\s+/g, " ");
      return text;
    }
    function error(parser2, er) {
      closeText(parser2);
      if (parser2.trackPosition) er += "\nLine: " + parser2.line + "\nColumn: " + parser2.column + "\nChar: " + parser2.c;
      er = new Error(er);
      parser2.error = er;
      emit(parser2, "onerror", er);
      return parser2;
    }
    function end(parser2) {
      if (parser2.sawRoot && !parser2.closedRoot) strictFail(parser2, "Unclosed root tag");
      if (parser2.state !== S.BEGIN && parser2.state !== S.BEGIN_WHITESPACE && parser2.state !== S.TEXT) error(parser2, "Unexpected end");
      closeText(parser2);
      parser2.c = "";
      parser2.closed = true;
      emit(parser2, "onend");
      SAXParser.call(parser2, parser2.strict, parser2.opt);
      return parser2;
    }
    function strictFail(parser2, message) {
      if (typeof parser2 !== "object" || !(parser2 instanceof SAXParser)) throw new Error("bad call to strictFail");
      if (parser2.strict) error(parser2, message);
    }
    function newTag(parser2) {
      if (!parser2.strict) parser2.tagName = parser2.tagName[parser2.looseCase]();
      var parent = parser2.tags[parser2.tags.length - 1] || parser2;
      var tag2 = parser2.tag = {
        name: parser2.tagName,
        attributes: {}
      };
      if (parser2.opt.xmlns) tag2.ns = parent.ns;
      parser2.attribList.length = 0;
      emitNode(parser2, "onopentagstart", tag2);
    }
    function qname(name, attribute) {
      var qualName = name.indexOf(":") < 0 ? ["", name] : name.split(":");
      var prefix = qualName[0];
      var local = qualName[1];
      if (attribute && name === "xmlns") {
        prefix = "xmlns";
        local = "";
      }
      return {
        prefix,
        local
      };
    }
    function attrib(parser2) {
      if (!parser2.strict) parser2.attribName = parser2.attribName[parser2.looseCase]();
      if (parser2.attribList.indexOf(parser2.attribName) !== -1 || parser2.tag.attributes.hasOwnProperty(parser2.attribName)) {
        parser2.attribName = parser2.attribValue = "";
        return;
      }
      if (parser2.opt.xmlns) {
        var qn = qname(parser2.attribName, true);
        var prefix = qn.prefix;
        var local = qn.local;
        if (prefix === "xmlns") if (local === "xml" && parser2.attribValue !== XML_NAMESPACE) strictFail(parser2, "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser2.attribValue);
        else if (local === "xmlns" && parser2.attribValue !== XMLNS_NAMESPACE) strictFail(parser2, "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser2.attribValue);
        else {
          var tag2 = parser2.tag;
          var parent = parser2.tags[parser2.tags.length - 1] || parser2;
          if (tag2.ns === parent.ns) tag2.ns = Object.create(parent.ns);
          tag2.ns[local] = parser2.attribValue;
        }
        parser2.attribList.push([parser2.attribName, parser2.attribValue]);
      } else {
        parser2.tag.attributes[parser2.attribName] = parser2.attribValue;
        emitNode(parser2, "onattribute", {
          name: parser2.attribName,
          value: parser2.attribValue
        });
      }
      parser2.attribName = parser2.attribValue = "";
    }
    function openTag(parser2, selfClosing) {
      if (parser2.opt.xmlns) {
        var tag2 = parser2.tag;
        var qn = qname(parser2.tagName);
        tag2.prefix = qn.prefix;
        tag2.local = qn.local;
        tag2.uri = tag2.ns[qn.prefix] || "";
        if (tag2.prefix && !tag2.uri) {
          strictFail(parser2, "Unbound namespace prefix: " + JSON.stringify(parser2.tagName));
          tag2.uri = qn.prefix;
        }
        var parent = parser2.tags[parser2.tags.length - 1] || parser2;
        if (tag2.ns && parent.ns !== tag2.ns) Object.keys(tag2.ns).forEach(function(p) {
          emitNode(parser2, "onopennamespace", {
            prefix: p,
            uri: tag2.ns[p]
          });
        });
        for (var i = 0, l = parser2.attribList.length; i < l; i++) {
          var nv = parser2.attribList[i];
          var name = nv[0];
          var value = nv[1];
          var qualName = qname(name, true);
          var prefix = qualName.prefix;
          var local = qualName.local;
          var uri = prefix === "" ? "" : tag2.ns[prefix] || "";
          var a = {
            name,
            value,
            prefix,
            local,
            uri
          };
          if (prefix && prefix !== "xmlns" && !uri) {
            strictFail(parser2, "Unbound namespace prefix: " + JSON.stringify(prefix));
            a.uri = prefix;
          }
          parser2.tag.attributes[name] = a;
          emitNode(parser2, "onattribute", a);
        }
        parser2.attribList.length = 0;
      }
      parser2.tag.isSelfClosing = !!selfClosing;
      parser2.sawRoot = true;
      parser2.tags.push(parser2.tag);
      emitNode(parser2, "onopentag", parser2.tag);
      if (!selfClosing) {
        if (!parser2.noscript && parser2.tagName.toLowerCase() === "script") parser2.state = S.SCRIPT;
        else parser2.state = S.TEXT;
        parser2.tag = null;
        parser2.tagName = "";
      }
      parser2.attribName = parser2.attribValue = "";
      parser2.attribList.length = 0;
    }
    function closeTag(parser2) {
      if (!parser2.tagName) {
        strictFail(parser2, "Weird empty close tag.");
        parser2.textNode += "</>";
        parser2.state = S.TEXT;
        return;
      }
      if (parser2.script) {
        if (parser2.tagName !== "script") {
          parser2.script += "</" + parser2.tagName + ">";
          parser2.tagName = "";
          parser2.state = S.SCRIPT;
          return;
        }
        emitNode(parser2, "onscript", parser2.script);
        parser2.script = "";
      }
      var t = parser2.tags.length;
      var tagName = parser2.tagName;
      if (!parser2.strict) tagName = tagName[parser2.looseCase]();
      var closeTo = tagName;
      while (t--) if (parser2.tags[t].name !== closeTo) strictFail(parser2, "Unexpected close tag");
      else break;
      if (t < 0) {
        strictFail(parser2, "Unmatched closing tag: " + parser2.tagName);
        parser2.textNode += "</" + parser2.tagName + ">";
        parser2.state = S.TEXT;
        return;
      }
      parser2.tagName = tagName;
      var s2 = parser2.tags.length;
      while (s2-- > t) {
        var tag2 = parser2.tag = parser2.tags.pop();
        parser2.tagName = parser2.tag.name;
        emitNode(parser2, "onclosetag", parser2.tagName);
        var x = {};
        for (var i in tag2.ns) x[i] = tag2.ns[i];
        var parent = parser2.tags[parser2.tags.length - 1] || parser2;
        if (parser2.opt.xmlns && tag2.ns !== parent.ns) Object.keys(tag2.ns).forEach(function(p) {
          var n = tag2.ns[p];
          emitNode(parser2, "onclosenamespace", {
            prefix: p,
            uri: n
          });
        });
      }
      if (t === 0) parser2.closedRoot = true;
      parser2.tagName = parser2.attribValue = parser2.attribName = "";
      parser2.attribList.length = 0;
      parser2.state = S.TEXT;
    }
    function parseEntity(parser2) {
      var entity = parser2.entity;
      var entityLC = entity.toLowerCase();
      var num;
      var numStr = "";
      if (parser2.ENTITIES[entity]) return parser2.ENTITIES[entity];
      if (parser2.ENTITIES[entityLC]) return parser2.ENTITIES[entityLC];
      entity = entityLC;
      if (entity.charAt(0) === "#") if (entity.charAt(1) === "x") {
        entity = entity.slice(2);
        num = parseInt(entity, 16);
        numStr = num.toString(16);
      } else {
        entity = entity.slice(1);
        num = parseInt(entity, 10);
        numStr = num.toString(10);
      }
      entity = entity.replace(/^0+/, "");
      if (isNaN(num) || numStr.toLowerCase() !== entity) {
        strictFail(parser2, "Invalid character entity");
        return "&" + parser2.entity + ";";
      }
      return String.fromCodePoint(num);
    }
    function beginWhiteSpace(parser2, c) {
      if (c === "<") {
        parser2.state = S.OPEN_WAKA;
        parser2.startTagPosition = parser2.position;
      } else if (!isWhitespace(c)) {
        strictFail(parser2, "Non-whitespace before first tag.");
        parser2.textNode = c;
        parser2.state = S.TEXT;
      }
    }
    function charAt(chunk, i) {
      var result = "";
      if (i < chunk.length) result = chunk.charAt(i);
      return result;
    }
    function write(chunk) {
      var parser2 = this;
      if (this.error) throw this.error;
      if (parser2.closed) return error(parser2, "Cannot write after close. Assign an onready handler.");
      if (chunk === null) return end(parser2);
      if (typeof chunk === "object") chunk = chunk.toString();
      var i = 0;
      var c = "";
      while (true) {
        c = charAt(chunk, i++);
        parser2.c = c;
        if (!c) break;
        if (parser2.trackPosition) {
          parser2.position++;
          if (c === "\n") {
            parser2.line++;
            parser2.column = 0;
          } else parser2.column++;
        }
        switch (parser2.state) {
          case S.BEGIN:
            parser2.state = S.BEGIN_WHITESPACE;
            if (c === "\uFEFF") continue;
            beginWhiteSpace(parser2, c);
            continue;
          case S.BEGIN_WHITESPACE:
            beginWhiteSpace(parser2, c);
            continue;
          case S.TEXT:
            if (parser2.sawRoot && !parser2.closedRoot) {
              var starti = i - 1;
              while (c && c !== "<" && c !== "&") {
                c = charAt(chunk, i++);
                if (c && parser2.trackPosition) {
                  parser2.position++;
                  if (c === "\n") {
                    parser2.line++;
                    parser2.column = 0;
                  } else parser2.column++;
                }
              }
              parser2.textNode += chunk.substring(starti, i - 1);
            }
            if (c === "<" && !(parser2.sawRoot && parser2.closedRoot && !parser2.strict)) {
              parser2.state = S.OPEN_WAKA;
              parser2.startTagPosition = parser2.position;
            } else {
              if (!isWhitespace(c) && (!parser2.sawRoot || parser2.closedRoot)) strictFail(parser2, "Text data outside of root node.");
              if (c === "&") parser2.state = S.TEXT_ENTITY;
              else parser2.textNode += c;
            }
            continue;
          case S.SCRIPT:
            if (c === "<") parser2.state = S.SCRIPT_ENDING;
            else parser2.script += c;
            continue;
          case S.SCRIPT_ENDING:
            if (c === "/") parser2.state = S.CLOSE_TAG;
            else {
              parser2.script += "<" + c;
              parser2.state = S.SCRIPT;
            }
            continue;
          case S.OPEN_WAKA:
            if (c === "!") {
              parser2.state = S.SGML_DECL;
              parser2.sgmlDecl = "";
            } else if (isWhitespace(c)) {
            } else if (isMatch(nameStart, c)) {
              parser2.state = S.OPEN_TAG;
              parser2.tagName = c;
            } else if (c === "/") {
              parser2.state = S.CLOSE_TAG;
              parser2.tagName = "";
            } else if (c === "?") {
              parser2.state = S.PROC_INST;
              parser2.procInstName = parser2.procInstBody = "";
            } else {
              strictFail(parser2, "Unencoded <");
              if (parser2.startTagPosition + 1 < parser2.position) {
                var pad = parser2.position - parser2.startTagPosition;
                c = new Array(pad).join(" ") + c;
              }
              parser2.textNode += "<" + c;
              parser2.state = S.TEXT;
            }
            continue;
          case S.SGML_DECL:
            if ((parser2.sgmlDecl + c).toUpperCase() === CDATA) {
              emitNode(parser2, "onopencdata");
              parser2.state = S.CDATA;
              parser2.sgmlDecl = "";
              parser2.cdata = "";
            } else if (parser2.sgmlDecl + c === "--") {
              parser2.state = S.COMMENT;
              parser2.comment = "";
              parser2.sgmlDecl = "";
            } else if ((parser2.sgmlDecl + c).toUpperCase() === DOCTYPE) {
              parser2.state = S.DOCTYPE;
              if (parser2.doctype || parser2.sawRoot) strictFail(parser2, "Inappropriately located doctype declaration");
              parser2.doctype = "";
              parser2.sgmlDecl = "";
            } else if (c === ">") {
              emitNode(parser2, "onsgmldeclaration", parser2.sgmlDecl);
              parser2.sgmlDecl = "";
              parser2.state = S.TEXT;
            } else if (isQuote(c)) {
              parser2.state = S.SGML_DECL_QUOTED;
              parser2.sgmlDecl += c;
            } else parser2.sgmlDecl += c;
            continue;
          case S.SGML_DECL_QUOTED:
            if (c === parser2.q) {
              parser2.state = S.SGML_DECL;
              parser2.q = "";
            }
            parser2.sgmlDecl += c;
            continue;
          case S.DOCTYPE:
            if (c === ">") {
              parser2.state = S.TEXT;
              emitNode(parser2, "ondoctype", parser2.doctype);
              parser2.doctype = true;
            } else {
              parser2.doctype += c;
              if (c === "[") parser2.state = S.DOCTYPE_DTD;
              else if (isQuote(c)) {
                parser2.state = S.DOCTYPE_QUOTED;
                parser2.q = c;
              }
            }
            continue;
          case S.DOCTYPE_QUOTED:
            parser2.doctype += c;
            if (c === parser2.q) {
              parser2.q = "";
              parser2.state = S.DOCTYPE;
            }
            continue;
          case S.DOCTYPE_DTD:
            parser2.doctype += c;
            if (c === "]") parser2.state = S.DOCTYPE;
            else if (isQuote(c)) {
              parser2.state = S.DOCTYPE_DTD_QUOTED;
              parser2.q = c;
            }
            continue;
          case S.DOCTYPE_DTD_QUOTED:
            parser2.doctype += c;
            if (c === parser2.q) {
              parser2.state = S.DOCTYPE_DTD;
              parser2.q = "";
            }
            continue;
          case S.COMMENT:
            if (c === "-") parser2.state = S.COMMENT_ENDING;
            else parser2.comment += c;
            continue;
          case S.COMMENT_ENDING:
            if (c === "-") {
              parser2.state = S.COMMENT_ENDED;
              parser2.comment = textopts(parser2.opt, parser2.comment);
              if (parser2.comment) emitNode(parser2, "oncomment", parser2.comment);
              parser2.comment = "";
            } else {
              parser2.comment += "-" + c;
              parser2.state = S.COMMENT;
            }
            continue;
          case S.COMMENT_ENDED:
            if (c !== ">") {
              strictFail(parser2, "Malformed comment");
              parser2.comment += "--" + c;
              parser2.state = S.COMMENT;
            } else parser2.state = S.TEXT;
            continue;
          case S.CDATA:
            if (c === "]") parser2.state = S.CDATA_ENDING;
            else parser2.cdata += c;
            continue;
          case S.CDATA_ENDING:
            if (c === "]") parser2.state = S.CDATA_ENDING_2;
            else {
              parser2.cdata += "]" + c;
              parser2.state = S.CDATA;
            }
            continue;
          case S.CDATA_ENDING_2:
            if (c === ">") {
              if (parser2.cdata) emitNode(parser2, "oncdata", parser2.cdata);
              emitNode(parser2, "onclosecdata");
              parser2.cdata = "";
              parser2.state = S.TEXT;
            } else if (c === "]") parser2.cdata += "]";
            else {
              parser2.cdata += "]]" + c;
              parser2.state = S.CDATA;
            }
            continue;
          case S.PROC_INST:
            if (c === "?") parser2.state = S.PROC_INST_ENDING;
            else if (isWhitespace(c)) parser2.state = S.PROC_INST_BODY;
            else parser2.procInstName += c;
            continue;
          case S.PROC_INST_BODY:
            if (!parser2.procInstBody && isWhitespace(c)) continue;
            else if (c === "?") parser2.state = S.PROC_INST_ENDING;
            else parser2.procInstBody += c;
            continue;
          case S.PROC_INST_ENDING:
            if (c === ">") {
              emitNode(parser2, "onprocessinginstruction", {
                name: parser2.procInstName,
                body: parser2.procInstBody
              });
              parser2.procInstName = parser2.procInstBody = "";
              parser2.state = S.TEXT;
            } else {
              parser2.procInstBody += "?" + c;
              parser2.state = S.PROC_INST_BODY;
            }
            continue;
          case S.OPEN_TAG:
            if (isMatch(nameBody, c)) parser2.tagName += c;
            else {
              newTag(parser2);
              if (c === ">") openTag(parser2);
              else if (c === "/") parser2.state = S.OPEN_TAG_SLASH;
              else {
                if (!isWhitespace(c)) strictFail(parser2, "Invalid character in tag name");
                parser2.state = S.ATTRIB;
              }
            }
            continue;
          case S.OPEN_TAG_SLASH:
            if (c === ">") {
              openTag(parser2, true);
              closeTag(parser2);
            } else {
              strictFail(parser2, "Forward-slash in opening tag not followed by >");
              parser2.state = S.ATTRIB;
            }
            continue;
          case S.ATTRIB:
            if (isWhitespace(c)) continue;
            else if (c === ">") openTag(parser2);
            else if (c === "/") parser2.state = S.OPEN_TAG_SLASH;
            else if (isMatch(nameStart, c)) {
              parser2.attribName = c;
              parser2.attribValue = "";
              parser2.state = S.ATTRIB_NAME;
            } else strictFail(parser2, "Invalid attribute name");
            continue;
          case S.ATTRIB_NAME:
            if (c === "=") parser2.state = S.ATTRIB_VALUE;
            else if (c === ">") {
              strictFail(parser2, "Attribute without value");
              parser2.attribValue = parser2.attribName;
              attrib(parser2);
              openTag(parser2);
            } else if (isWhitespace(c)) parser2.state = S.ATTRIB_NAME_SAW_WHITE;
            else if (isMatch(nameBody, c)) parser2.attribName += c;
            else strictFail(parser2, "Invalid attribute name");
            continue;
          case S.ATTRIB_NAME_SAW_WHITE:
            if (c === "=") parser2.state = S.ATTRIB_VALUE;
            else if (isWhitespace(c)) continue;
            else {
              strictFail(parser2, "Attribute without value");
              parser2.tag.attributes[parser2.attribName] = "";
              parser2.attribValue = "";
              emitNode(parser2, "onattribute", {
                name: parser2.attribName,
                value: ""
              });
              parser2.attribName = "";
              if (c === ">") openTag(parser2);
              else if (isMatch(nameStart, c)) {
                parser2.attribName = c;
                parser2.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser2, "Invalid attribute name");
                parser2.state = S.ATTRIB;
              }
            }
            continue;
          case S.ATTRIB_VALUE:
            if (isWhitespace(c)) continue;
            else if (isQuote(c)) {
              parser2.q = c;
              parser2.state = S.ATTRIB_VALUE_QUOTED;
            } else {
              strictFail(parser2, "Unquoted attribute value");
              parser2.state = S.ATTRIB_VALUE_UNQUOTED;
              parser2.attribValue = c;
            }
            continue;
          case S.ATTRIB_VALUE_QUOTED:
            if (c !== parser2.q) {
              if (c === "&") parser2.state = S.ATTRIB_VALUE_ENTITY_Q;
              else parser2.attribValue += c;
              continue;
            }
            attrib(parser2);
            parser2.q = "";
            parser2.state = S.ATTRIB_VALUE_CLOSED;
            continue;
          case S.ATTRIB_VALUE_CLOSED:
            if (isWhitespace(c)) parser2.state = S.ATTRIB;
            else if (c === ">") openTag(parser2);
            else if (c === "/") parser2.state = S.OPEN_TAG_SLASH;
            else if (isMatch(nameStart, c)) {
              strictFail(parser2, "No whitespace between attributes");
              parser2.attribName = c;
              parser2.attribValue = "";
              parser2.state = S.ATTRIB_NAME;
            } else strictFail(parser2, "Invalid attribute name");
            continue;
          case S.ATTRIB_VALUE_UNQUOTED:
            if (!isAttribEnd(c)) {
              if (c === "&") parser2.state = S.ATTRIB_VALUE_ENTITY_U;
              else parser2.attribValue += c;
              continue;
            }
            attrib(parser2);
            if (c === ">") openTag(parser2);
            else parser2.state = S.ATTRIB;
            continue;
          case S.CLOSE_TAG:
            if (!parser2.tagName) if (isWhitespace(c)) continue;
            else if (notMatch(nameStart, c)) if (parser2.script) {
              parser2.script += "</" + c;
              parser2.state = S.SCRIPT;
            } else strictFail(parser2, "Invalid tagname in closing tag.");
            else parser2.tagName = c;
            else if (c === ">") closeTag(parser2);
            else if (isMatch(nameBody, c)) parser2.tagName += c;
            else if (parser2.script) {
              parser2.script += "</" + parser2.tagName;
              parser2.tagName = "";
              parser2.state = S.SCRIPT;
            } else {
              if (!isWhitespace(c)) strictFail(parser2, "Invalid tagname in closing tag");
              parser2.state = S.CLOSE_TAG_SAW_WHITE;
            }
            continue;
          case S.CLOSE_TAG_SAW_WHITE:
            if (isWhitespace(c)) continue;
            if (c === ">") closeTag(parser2);
            else strictFail(parser2, "Invalid characters in closing tag");
            continue;
          case S.TEXT_ENTITY:
          case S.ATTRIB_VALUE_ENTITY_Q:
          case S.ATTRIB_VALUE_ENTITY_U:
            var returnState;
            var buffer;
            switch (parser2.state) {
              case S.TEXT_ENTITY:
                returnState = S.TEXT;
                buffer = "textNode";
                break;
              case S.ATTRIB_VALUE_ENTITY_Q:
                returnState = S.ATTRIB_VALUE_QUOTED;
                buffer = "attribValue";
                break;
              case S.ATTRIB_VALUE_ENTITY_U:
                returnState = S.ATTRIB_VALUE_UNQUOTED;
                buffer = "attribValue";
                break;
            }
            if (c === ";") {
              parser2[buffer] += parseEntity(parser2);
              parser2.entity = "";
              parser2.state = returnState;
            } else if (isMatch(parser2.entity.length ? entityBody : entityStart, c)) parser2.entity += c;
            else {
              strictFail(parser2, "Invalid character in entity name");
              parser2[buffer] += "&" + parser2.entity + c;
              parser2.entity = "";
              parser2.state = returnState;
            }
            continue;
          default:
            throw new Error(parser2, "Unknown state: " + parser2.state);
        }
      }
      if (parser2.position >= parser2.bufferCheckPosition) checkBufferLength(parser2);
      return parser2;
    }
    if (!String.fromCodePoint) (function() {
      var stringFromCharCode = String.fromCharCode;
      var floor = Math.floor;
      var fromCodePoint = function() {
        var MAX_SIZE = 16384;
        var codeUnits = [];
        var highSurrogate;
        var lowSurrogate;
        var index = -1;
        var length = arguments.length;
        if (!length) return "";
        var result = "";
        while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (!isFinite(codePoint) || codePoint < 0 || codePoint > 1114111 || floor(codePoint) !== codePoint) throw RangeError("Invalid code point: " + codePoint);
          if (codePoint <= 65535) codeUnits.push(codePoint);
          else {
            codePoint -= 65536;
            highSurrogate = (codePoint >> 10) + 55296;
            lowSurrogate = codePoint % 1024 + 56320;
            codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits);
            codeUnits.length = 0;
          }
        }
        return result;
      };
      if (Object.defineProperty) Object.defineProperty(String, "fromCodePoint", {
        value: fromCodePoint,
        configurable: true,
        writable: true
      });
      else String.fromCodePoint = fromCodePoint;
    })();
  })(typeof exports2 === "undefined" ? exports2.sax = {} : exports2);
});
var require_array_helper = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = { isArray: function(value) {
    if (Array.isArray) return Array.isArray(value);
    return Object.prototype.toString.call(value) === "[object Array]";
  } };
});
var require_options_helper = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var isArray = require_array_helper().isArray;
  module2.exports = {
    copyOptions: function(options2) {
      var key, copy = {};
      for (key in options2) if (options2.hasOwnProperty(key)) copy[key] = options2[key];
      return copy;
    },
    ensureFlagExists: function(item, options2) {
      if (!(item in options2) || typeof options2[item] !== "boolean") options2[item] = false;
    },
    ensureSpacesExists: function(options2) {
      if (!("spaces" in options2) || typeof options2.spaces !== "number" && typeof options2.spaces !== "string") options2.spaces = 0;
    },
    ensureAlwaysArrayExists: function(options2) {
      if (!("alwaysArray" in options2) || typeof options2.alwaysArray !== "boolean" && !isArray(options2.alwaysArray)) options2.alwaysArray = false;
    },
    ensureKeyExists: function(key, options2) {
      if (!(key + "Key" in options2) || typeof options2[key + "Key"] !== "string") options2[key + "Key"] = options2.compact ? "_" + key : key;
    },
    checkFnExists: function(key, options2) {
      return key + "Fn" in options2;
    }
  };
});
var require_xml2js = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var sax = require_sax();
  var expat = {
    on: function() {
    },
    parse: function() {
    }
  };
  var helper = require_options_helper();
  var isArray = require_array_helper().isArray;
  var options2;
  var pureJsParser = true;
  var currentElement;
  function validateOptions(userOptions) {
    options2 = helper.copyOptions(userOptions);
    helper.ensureFlagExists("ignoreDeclaration", options2);
    helper.ensureFlagExists("ignoreInstruction", options2);
    helper.ensureFlagExists("ignoreAttributes", options2);
    helper.ensureFlagExists("ignoreText", options2);
    helper.ensureFlagExists("ignoreComment", options2);
    helper.ensureFlagExists("ignoreCdata", options2);
    helper.ensureFlagExists("ignoreDoctype", options2);
    helper.ensureFlagExists("compact", options2);
    helper.ensureFlagExists("alwaysChildren", options2);
    helper.ensureFlagExists("addParent", options2);
    helper.ensureFlagExists("trim", options2);
    helper.ensureFlagExists("nativeType", options2);
    helper.ensureFlagExists("nativeTypeAttributes", options2);
    helper.ensureFlagExists("sanitize", options2);
    helper.ensureFlagExists("instructionHasAttributes", options2);
    helper.ensureFlagExists("captureSpacesBetweenElements", options2);
    helper.ensureAlwaysArrayExists(options2);
    helper.ensureKeyExists("declaration", options2);
    helper.ensureKeyExists("instruction", options2);
    helper.ensureKeyExists("attributes", options2);
    helper.ensureKeyExists("text", options2);
    helper.ensureKeyExists("comment", options2);
    helper.ensureKeyExists("cdata", options2);
    helper.ensureKeyExists("doctype", options2);
    helper.ensureKeyExists("type", options2);
    helper.ensureKeyExists("name", options2);
    helper.ensureKeyExists("elements", options2);
    helper.ensureKeyExists("parent", options2);
    helper.checkFnExists("doctype", options2);
    helper.checkFnExists("instruction", options2);
    helper.checkFnExists("cdata", options2);
    helper.checkFnExists("comment", options2);
    helper.checkFnExists("text", options2);
    helper.checkFnExists("instructionName", options2);
    helper.checkFnExists("elementName", options2);
    helper.checkFnExists("attributeName", options2);
    helper.checkFnExists("attributeValue", options2);
    helper.checkFnExists("attributes", options2);
    return options2;
  }
  function nativeType(value) {
    var nValue = Number(value);
    if (!isNaN(nValue)) return nValue;
    var bValue = value.toLowerCase();
    if (bValue === "true") return true;
    else if (bValue === "false") return false;
    return value;
  }
  function addField(type, value) {
    var key;
    if (options2.compact) {
      if (!currentElement[options2[type + "Key"]] && (isArray(options2.alwaysArray) ? options2.alwaysArray.indexOf(options2[type + "Key"]) !== -1 : options2.alwaysArray)) currentElement[options2[type + "Key"]] = [];
      if (currentElement[options2[type + "Key"]] && !isArray(currentElement[options2[type + "Key"]])) currentElement[options2[type + "Key"]] = [currentElement[options2[type + "Key"]]];
      if (type + "Fn" in options2 && typeof value === "string") value = options2[type + "Fn"](value, currentElement);
      if (type === "instruction" && ("instructionFn" in options2 || "instructionNameFn" in options2)) {
        for (key in value) if (value.hasOwnProperty(key)) if ("instructionFn" in options2) value[key] = options2.instructionFn(value[key], key, currentElement);
        else {
          var temp = value[key];
          delete value[key];
          value[options2.instructionNameFn(key, temp, currentElement)] = temp;
        }
      }
      if (isArray(currentElement[options2[type + "Key"]])) currentElement[options2[type + "Key"]].push(value);
      else currentElement[options2[type + "Key"]] = value;
    } else {
      if (!currentElement[options2.elementsKey]) currentElement[options2.elementsKey] = [];
      var element = {};
      element[options2.typeKey] = type;
      if (type === "instruction") {
        for (key in value) if (value.hasOwnProperty(key)) break;
        element[options2.nameKey] = "instructionNameFn" in options2 ? options2.instructionNameFn(key, value, currentElement) : key;
        if (options2.instructionHasAttributes) {
          element[options2.attributesKey] = value[key][options2.attributesKey];
          if ("instructionFn" in options2) element[options2.attributesKey] = options2.instructionFn(element[options2.attributesKey], key, currentElement);
        } else {
          if ("instructionFn" in options2) value[key] = options2.instructionFn(value[key], key, currentElement);
          element[options2.instructionKey] = value[key];
        }
      } else {
        if (type + "Fn" in options2) value = options2[type + "Fn"](value, currentElement);
        element[options2[type + "Key"]] = value;
      }
      if (options2.addParent) element[options2.parentKey] = currentElement;
      currentElement[options2.elementsKey].push(element);
    }
  }
  function manipulateAttributes(attributes) {
    if ("attributesFn" in options2 && attributes) attributes = options2.attributesFn(attributes, currentElement);
    if ((options2.trim || "attributeValueFn" in options2 || "attributeNameFn" in options2 || options2.nativeTypeAttributes) && attributes) {
      var key;
      for (key in attributes) if (attributes.hasOwnProperty(key)) {
        if (options2.trim) attributes[key] = attributes[key].trim();
        if (options2.nativeTypeAttributes) attributes[key] = nativeType(attributes[key]);
        if ("attributeValueFn" in options2) attributes[key] = options2.attributeValueFn(attributes[key], key, currentElement);
        if ("attributeNameFn" in options2) {
          var temp = attributes[key];
          delete attributes[key];
          attributes[options2.attributeNameFn(key, attributes[key], currentElement)] = temp;
        }
      }
    }
    return attributes;
  }
  function onInstruction(instruction) {
    var attributes = {};
    if (instruction.body && (instruction.name.toLowerCase() === "xml" || options2.instructionHasAttributes)) {
      var attrsRegExp = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g;
      var match;
      while ((match = attrsRegExp.exec(instruction.body)) !== null) attributes[match[1]] = match[2] || match[3] || match[4];
      attributes = manipulateAttributes(attributes);
    }
    if (instruction.name.toLowerCase() === "xml") {
      if (options2.ignoreDeclaration) return;
      currentElement[options2.declarationKey] = {};
      if (Object.keys(attributes).length) currentElement[options2.declarationKey][options2.attributesKey] = attributes;
      if (options2.addParent) currentElement[options2.declarationKey][options2.parentKey] = currentElement;
    } else {
      if (options2.ignoreInstruction) return;
      if (options2.trim) instruction.body = instruction.body.trim();
      var value = {};
      if (options2.instructionHasAttributes && Object.keys(attributes).length) {
        value[instruction.name] = {};
        value[instruction.name][options2.attributesKey] = attributes;
      } else value[instruction.name] = instruction.body;
      addField("instruction", value);
    }
  }
  function onStartElement(name, attributes) {
    var element;
    if (typeof name === "object") {
      attributes = name.attributes;
      name = name.name;
    }
    attributes = manipulateAttributes(attributes);
    if ("elementNameFn" in options2) name = options2.elementNameFn(name, currentElement);
    if (options2.compact) {
      element = {};
      if (!options2.ignoreAttributes && attributes && Object.keys(attributes).length) {
        element[options2.attributesKey] = {};
        var key;
        for (key in attributes) if (attributes.hasOwnProperty(key)) element[options2.attributesKey][key] = attributes[key];
      }
      if (!(name in currentElement) && (isArray(options2.alwaysArray) ? options2.alwaysArray.indexOf(name) !== -1 : options2.alwaysArray)) currentElement[name] = [];
      if (currentElement[name] && !isArray(currentElement[name])) currentElement[name] = [currentElement[name]];
      if (isArray(currentElement[name])) currentElement[name].push(element);
      else currentElement[name] = element;
    } else {
      if (!currentElement[options2.elementsKey]) currentElement[options2.elementsKey] = [];
      element = {};
      element[options2.typeKey] = "element";
      element[options2.nameKey] = name;
      if (!options2.ignoreAttributes && attributes && Object.keys(attributes).length) element[options2.attributesKey] = attributes;
      if (options2.alwaysChildren) element[options2.elementsKey] = [];
      currentElement[options2.elementsKey].push(element);
    }
    element[options2.parentKey] = currentElement;
    currentElement = element;
  }
  function onText(text) {
    if (options2.ignoreText) return;
    if (!text.trim() && !options2.captureSpacesBetweenElements) return;
    if (options2.trim) text = text.trim();
    if (options2.nativeType) text = nativeType(text);
    if (options2.sanitize) text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    addField("text", text);
  }
  function onComment(comment) {
    if (options2.ignoreComment) return;
    if (options2.trim) comment = comment.trim();
    addField("comment", comment);
  }
  function onEndElement(name) {
    var parentElement = currentElement[options2.parentKey];
    if (!options2.addParent) delete currentElement[options2.parentKey];
    currentElement = parentElement;
  }
  function onCdata(cdata) {
    if (options2.ignoreCdata) return;
    if (options2.trim) cdata = cdata.trim();
    addField("cdata", cdata);
  }
  function onDoctype(doctype) {
    if (options2.ignoreDoctype) return;
    doctype = doctype.replace(/^ /, "");
    if (options2.trim) doctype = doctype.trim();
    addField("doctype", doctype);
  }
  function onError(error) {
    error.note = error;
  }
  module2.exports = function(xml, userOptions) {
    var parser2 = pureJsParser ? sax.parser(true, {}) : parser2 = new expat.Parser("UTF-8");
    var result = {};
    currentElement = result;
    options2 = validateOptions(userOptions);
    if (pureJsParser) {
      parser2.opt = { strictEntities: true };
      parser2.onopentag = onStartElement;
      parser2.ontext = onText;
      parser2.oncomment = onComment;
      parser2.onclosetag = onEndElement;
      parser2.onerror = onError;
      parser2.oncdata = onCdata;
      parser2.ondoctype = onDoctype;
      parser2.onprocessinginstruction = onInstruction;
    } else {
      parser2.on("startElement", onStartElement);
      parser2.on("text", onText);
      parser2.on("comment", onComment);
      parser2.on("endElement", onEndElement);
      parser2.on("error", onError);
    }
    if (pureJsParser) parser2.write(xml).close();
    else if (!parser2.parse(xml)) throw new Error("XML parsing error: " + parser2.getError());
    if (result[options2.elementsKey]) {
      var temp = result[options2.elementsKey];
      delete result[options2.elementsKey];
      result[options2.elementsKey] = temp;
      delete result.text;
    }
    return result;
  };
});
var require_xml2json = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var helper = require_options_helper();
  var xml2js = require_xml2js();
  function validateOptions(userOptions) {
    var options2 = helper.copyOptions(userOptions);
    helper.ensureSpacesExists(options2);
    return options2;
  }
  module2.exports = function(xml, userOptions) {
    var options2 = validateOptions(userOptions), js = xml2js(xml, options2), json, parentKey = "compact" in options2 && options2.compact ? "_parent" : "parent";
    if ("addParent" in options2 && options2.addParent) json = JSON.stringify(js, function(k, v) {
      return k === parentKey ? "_" : v;
    }, options2.spaces);
    else json = JSON.stringify(js, null, options2.spaces);
    return json.replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  };
});
var require_js2xml = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var helper = require_options_helper();
  var isArray = require_array_helper().isArray;
  var currentElement, currentElementName;
  function validateOptions(userOptions) {
    var options2 = helper.copyOptions(userOptions);
    helper.ensureFlagExists("ignoreDeclaration", options2);
    helper.ensureFlagExists("ignoreInstruction", options2);
    helper.ensureFlagExists("ignoreAttributes", options2);
    helper.ensureFlagExists("ignoreText", options2);
    helper.ensureFlagExists("ignoreComment", options2);
    helper.ensureFlagExists("ignoreCdata", options2);
    helper.ensureFlagExists("ignoreDoctype", options2);
    helper.ensureFlagExists("compact", options2);
    helper.ensureFlagExists("indentText", options2);
    helper.ensureFlagExists("indentCdata", options2);
    helper.ensureFlagExists("indentAttributes", options2);
    helper.ensureFlagExists("indentInstruction", options2);
    helper.ensureFlagExists("fullTagEmptyElement", options2);
    helper.ensureFlagExists("noQuotesForNativeAttributes", options2);
    helper.ensureSpacesExists(options2);
    if (typeof options2.spaces === "number") options2.spaces = Array(options2.spaces + 1).join(" ");
    helper.ensureKeyExists("declaration", options2);
    helper.ensureKeyExists("instruction", options2);
    helper.ensureKeyExists("attributes", options2);
    helper.ensureKeyExists("text", options2);
    helper.ensureKeyExists("comment", options2);
    helper.ensureKeyExists("cdata", options2);
    helper.ensureKeyExists("doctype", options2);
    helper.ensureKeyExists("type", options2);
    helper.ensureKeyExists("name", options2);
    helper.ensureKeyExists("elements", options2);
    helper.checkFnExists("doctype", options2);
    helper.checkFnExists("instruction", options2);
    helper.checkFnExists("cdata", options2);
    helper.checkFnExists("comment", options2);
    helper.checkFnExists("text", options2);
    helper.checkFnExists("instructionName", options2);
    helper.checkFnExists("elementName", options2);
    helper.checkFnExists("attributeName", options2);
    helper.checkFnExists("attributeValue", options2);
    helper.checkFnExists("attributes", options2);
    helper.checkFnExists("fullTagEmptyElement", options2);
    return options2;
  }
  function writeIndentation(options2, depth, firstLine) {
    return (!firstLine && options2.spaces ? "\n" : "") + Array(depth + 1).join(options2.spaces);
  }
  function writeAttributes(attributes, options2, depth) {
    if (options2.ignoreAttributes) return "";
    if ("attributesFn" in options2) attributes = options2.attributesFn(attributes, currentElementName, currentElement);
    var key, attr, attrName, quote, result = [];
    for (key in attributes) if (attributes.hasOwnProperty(key) && attributes[key] !== null && attributes[key] !== void 0) {
      quote = options2.noQuotesForNativeAttributes && typeof attributes[key] !== "string" ? "" : '"';
      attr = "" + attributes[key];
      attr = attr.replace(/"/g, "&quot;");
      attrName = "attributeNameFn" in options2 ? options2.attributeNameFn(key, attr, currentElementName, currentElement) : key;
      result.push(options2.spaces && options2.indentAttributes ? writeIndentation(options2, depth + 1, false) : " ");
      result.push(attrName + "=" + quote + ("attributeValueFn" in options2 ? options2.attributeValueFn(attr, key, currentElementName, currentElement) : attr) + quote);
    }
    if (attributes && Object.keys(attributes).length && options2.spaces && options2.indentAttributes) result.push(writeIndentation(options2, depth, false));
    return result.join("");
  }
  function writeDeclaration(declaration, options2, depth) {
    currentElement = declaration;
    currentElementName = "xml";
    return options2.ignoreDeclaration ? "" : "<?xml" + writeAttributes(declaration[options2.attributesKey], options2, depth) + "?>";
  }
  function writeInstruction(instruction, options2, depth) {
    if (options2.ignoreInstruction) return "";
    var key;
    for (key in instruction) if (instruction.hasOwnProperty(key)) break;
    var instructionName = "instructionNameFn" in options2 ? options2.instructionNameFn(key, instruction[key], currentElementName, currentElement) : key;
    if (typeof instruction[key] === "object") {
      currentElement = instruction;
      currentElementName = instructionName;
      return "<?" + instructionName + writeAttributes(instruction[key][options2.attributesKey], options2, depth) + "?>";
    } else {
      var instructionValue = instruction[key] ? instruction[key] : "";
      if ("instructionFn" in options2) instructionValue = options2.instructionFn(instructionValue, key, currentElementName, currentElement);
      return "<?" + instructionName + (instructionValue ? " " + instructionValue : "") + "?>";
    }
  }
  function writeComment(comment, options2) {
    return options2.ignoreComment ? "" : "<!--" + ("commentFn" in options2 ? options2.commentFn(comment, currentElementName, currentElement) : comment) + "-->";
  }
  function writeCdata(cdata, options2) {
    return options2.ignoreCdata ? "" : "<![CDATA[" + ("cdataFn" in options2 ? options2.cdataFn(cdata, currentElementName, currentElement) : cdata.replace("]]>", "]]]]><![CDATA[>")) + "]]>";
  }
  function writeDoctype(doctype, options2) {
    return options2.ignoreDoctype ? "" : "<!DOCTYPE " + ("doctypeFn" in options2 ? options2.doctypeFn(doctype, currentElementName, currentElement) : doctype) + ">";
  }
  function writeText(text, options2) {
    if (options2.ignoreText) return "";
    text = "" + text;
    text = text.replace(/&amp;/g, "&");
    text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return "textFn" in options2 ? options2.textFn(text, currentElementName, currentElement) : text;
  }
  function hasContent(element, options2) {
    var i;
    if (element.elements && element.elements.length) for (i = 0; i < element.elements.length; ++i) switch (element.elements[i][options2.typeKey]) {
      case "text":
        if (options2.indentText) return true;
        break;
      case "cdata":
        if (options2.indentCdata) return true;
        break;
      case "instruction":
        if (options2.indentInstruction) return true;
        break;
      case "doctype":
      case "comment":
      case "element":
        return true;
      default:
        return true;
    }
    return false;
  }
  function writeElement(element, options2, depth) {
    currentElement = element;
    currentElementName = element.name;
    var xml = [], elementName = "elementNameFn" in options2 ? options2.elementNameFn(element.name, element) : element.name;
    xml.push("<" + elementName);
    if (element[options2.attributesKey]) xml.push(writeAttributes(element[options2.attributesKey], options2, depth));
    var withClosingTag = element[options2.elementsKey] && element[options2.elementsKey].length || element[options2.attributesKey] && element[options2.attributesKey]["xml:space"] === "preserve";
    if (!withClosingTag) if ("fullTagEmptyElementFn" in options2) withClosingTag = options2.fullTagEmptyElementFn(element.name, element);
    else withClosingTag = options2.fullTagEmptyElement;
    if (withClosingTag) {
      xml.push(">");
      if (element[options2.elementsKey] && element[options2.elementsKey].length) {
        xml.push(writeElements(element[options2.elementsKey], options2, depth + 1));
        currentElement = element;
        currentElementName = element.name;
      }
      xml.push(options2.spaces && hasContent(element, options2) ? "\n" + Array(depth + 1).join(options2.spaces) : "");
      xml.push("</" + elementName + ">");
    } else xml.push("/>");
    return xml.join("");
  }
  function writeElements(elements, options2, depth, firstLine) {
    return elements.reduce(function(xml, element) {
      var indent = writeIndentation(options2, depth, firstLine && !xml);
      switch (element.type) {
        case "element":
          return xml + indent + writeElement(element, options2, depth);
        case "comment":
          return xml + indent + writeComment(element[options2.commentKey], options2);
        case "doctype":
          return xml + indent + writeDoctype(element[options2.doctypeKey], options2);
        case "cdata":
          return xml + (options2.indentCdata ? indent : "") + writeCdata(element[options2.cdataKey], options2);
        case "text":
          return xml + (options2.indentText ? indent : "") + writeText(element[options2.textKey], options2);
        case "instruction":
          var instruction = {};
          instruction[element[options2.nameKey]] = element[options2.attributesKey] ? element : element[options2.instructionKey];
          return xml + (options2.indentInstruction ? indent : "") + writeInstruction(instruction, options2, depth);
      }
    }, "");
  }
  function hasContentCompact(element, options2, anyContent) {
    var key;
    for (key in element) if (element.hasOwnProperty(key)) switch (key) {
      case options2.parentKey:
      case options2.attributesKey:
        break;
      case options2.textKey:
        if (options2.indentText || anyContent) return true;
        break;
      case options2.cdataKey:
        if (options2.indentCdata || anyContent) return true;
        break;
      case options2.instructionKey:
        if (options2.indentInstruction || anyContent) return true;
        break;
      case options2.doctypeKey:
      case options2.commentKey:
        return true;
      default:
        return true;
    }
    return false;
  }
  function writeElementCompact(element, name, options2, depth, indent) {
    currentElement = element;
    currentElementName = name;
    var elementName = "elementNameFn" in options2 ? options2.elementNameFn(name, element) : name;
    if (typeof element === "undefined" || element === null || element === "") return "fullTagEmptyElementFn" in options2 && options2.fullTagEmptyElementFn(name, element) || options2.fullTagEmptyElement ? "<" + elementName + "></" + elementName + ">" : "<" + elementName + "/>";
    var xml = [];
    if (name) {
      xml.push("<" + elementName);
      if (typeof element !== "object") {
        xml.push(">" + writeText(element, options2) + "</" + elementName + ">");
        return xml.join("");
      }
      if (element[options2.attributesKey]) xml.push(writeAttributes(element[options2.attributesKey], options2, depth));
      var withClosingTag = hasContentCompact(element, options2, true) || element[options2.attributesKey] && element[options2.attributesKey]["xml:space"] === "preserve";
      if (!withClosingTag) if ("fullTagEmptyElementFn" in options2) withClosingTag = options2.fullTagEmptyElementFn(name, element);
      else withClosingTag = options2.fullTagEmptyElement;
      if (withClosingTag) xml.push(">");
      else {
        xml.push("/>");
        return xml.join("");
      }
    }
    xml.push(writeElementsCompact(element, options2, depth + 1, false));
    currentElement = element;
    currentElementName = name;
    if (name) xml.push((indent ? writeIndentation(options2, depth, false) : "") + "</" + elementName + ">");
    return xml.join("");
  }
  function writeElementsCompact(element, options2, depth, firstLine) {
    var i, key, nodes, xml = [];
    for (key in element) if (element.hasOwnProperty(key)) {
      nodes = isArray(element[key]) ? element[key] : [element[key]];
      for (i = 0; i < nodes.length; ++i) {
        switch (key) {
          case options2.declarationKey:
            xml.push(writeDeclaration(nodes[i], options2, depth));
            break;
          case options2.instructionKey:
            xml.push((options2.indentInstruction ? writeIndentation(options2, depth, firstLine) : "") + writeInstruction(nodes[i], options2, depth));
            break;
          case options2.attributesKey:
          case options2.parentKey:
            break;
          case options2.textKey:
            xml.push((options2.indentText ? writeIndentation(options2, depth, firstLine) : "") + writeText(nodes[i], options2));
            break;
          case options2.cdataKey:
            xml.push((options2.indentCdata ? writeIndentation(options2, depth, firstLine) : "") + writeCdata(nodes[i], options2));
            break;
          case options2.doctypeKey:
            xml.push(writeIndentation(options2, depth, firstLine) + writeDoctype(nodes[i], options2));
            break;
          case options2.commentKey:
            xml.push(writeIndentation(options2, depth, firstLine) + writeComment(nodes[i], options2));
            break;
          default:
            xml.push(writeIndentation(options2, depth, firstLine) + writeElementCompact(nodes[i], key, options2, depth, hasContentCompact(nodes[i], options2)));
        }
        firstLine = firstLine && !xml.length;
      }
    }
    return xml.join("");
  }
  module2.exports = function(js, options2) {
    options2 = validateOptions(options2);
    var xml = [];
    currentElement = js;
    currentElementName = "_root_";
    if (options2.compact) xml.push(writeElementsCompact(js, options2, 0, true));
    else {
      if (js[options2.declarationKey]) xml.push(writeDeclaration(js[options2.declarationKey], options2, 0));
      if (js[options2.elementsKey] && js[options2.elementsKey].length) xml.push(writeElements(js[options2.elementsKey], options2, 0, !xml.length));
    }
    return xml.join("");
  };
});
var require_json2xml = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var js2xml = require_js2xml();
  module2.exports = function(json, options2) {
    if (json instanceof Buffer) json = json.toString();
    var js = null;
    if (typeof json === "string") try {
      js = JSON.parse(json);
    } catch (e) {
      throw new Error("The JSON structure is invalid");
    }
    else js = json;
    return js2xml(js, options2);
  };
});
var import_lib = (/* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = {
    xml2js: require_xml2js(),
    xml2json: require_xml2json(),
    js2xml: require_js2xml(),
    json2xml: require_json2xml()
  };
}))();
var convertToXmlComponent = (element) => {
  switch (element.type) {
    case void 0:
    case "element":
      const xmlComponent = new ImportedXmlComponent(element.name, element.attributes);
      const childElements = element.elements || [];
      for (const childElm of childElements) {
        const child = convertToXmlComponent(childElm);
        if (child !== void 0) xmlComponent.push(child);
      }
      return xmlComponent;
    case "text":
      return element.text;
    default:
      return;
  }
};
var ImportedXmlComponentAttributes = class extends XmlAttributeComponent {
};
var ImportedXmlComponent = class extends XmlComponent {
  /**
  * Parses an XML string and converts it to an ImportedXmlComponent tree.
  *
  * This static method is the primary way to import external XML content.
  * It uses xml-js to parse the XML string into a JSON representation,
  * then converts that into a tree of XmlComponent objects.
  *
  * @param importedContent - The XML content as a string
  * @returns An ImportedXmlComponent representing the parsed XML
  *
  * @example
  * ```typescript
  * const xml = '<w:p><w:r><w:t>Hello</w:t></w:r></w:p>';
  * const component = ImportedXmlComponent.fromXmlString(xml);
  * ```
  */
  static fromXmlString(importedContent) {
    return convertToXmlComponent((0, import_lib.xml2js)(importedContent, { compact: false }));
  }
  /**
  * Creates an ImportedXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param _attr - Optional attributes for the root element
  */
  constructor(rootKey, _attr) {
    super(rootKey);
    if (_attr) this.root.push(new ImportedXmlComponentAttributes(_attr));
  }
  /**
  * Adds a child component or text to this element.
  *
  * @param xmlComponent - The child component or text string to add
  */
  push(xmlComponent) {
    this.root.push(xmlComponent);
  }
};
var ImportedRootElementAttributes = class extends XmlComponent {
  /**
  * Creates an ImportedRootElementAttributes component.
  *
  * @param _attr - The attributes object to pass through
  */
  constructor(_attr) {
    super("");
    _defineProperty(this, "_attr", void 0);
    this._attr = _attr;
  }
  /**
  * Prepares the attributes for XML serialization.
  *
  * @param _ - Context (unused)
  * @returns Object with _attr key containing the raw attributes
  */
  prepForXml(_) {
    return { _attr: this._attr };
  }
};
var InitializableXmlComponent = class extends XmlComponent {
  /**
  * Creates a new InitializableXmlComponent.
  *
  * @param rootKey - The XML element name
  * @param initComponent - Optional component to copy children from
  */
  constructor(rootKey, initComponent) {
    super(rootKey);
    if (initComponent) this.root = initComponent.root;
  }
};
var decimalNumber = (val) => {
  if (isNaN(val)) throw new Error(`Invalid value '${val}' specified. Must be an integer.`);
  return Math.floor(val);
};
var unsignedDecimalNumber = (val) => {
  const value = decimalNumber(val);
  if (value < 0) throw new Error(`Invalid value '${val}' specified. Must be a positive integer.`);
  return value;
};
var hexBinary = (val, length) => {
  const expectedLength = length * 2;
  if (val.length !== expectedLength || isNaN(Number(`0x${val}`))) throw new Error(`Invalid hex value '${val}'. Expected ${expectedLength} digit hex value`);
  return val;
};
var uCharHexNumber = (val) => hexBinary(val, 1);
var universalMeasureValue = (val) => {
  const unit = val.slice(-2);
  const amount = val.substring(0, val.length - 2);
  return `${Number(amount)}${unit}`;
};
var positiveUniversalMeasureValue = (val) => {
  const value = universalMeasureValue(val);
  if (parseFloat(value) < 0) throw new Error(`Invalid value '${value}' specified. Expected a positive number.`);
  return value;
};
var hexColorValue = (val) => {
  if (val === "auto") return val;
  return hexBinary(val.charAt(0) === "#" ? val.substring(1) : val, 3);
};
var signedTwipsMeasureValue = (val) => typeof val === "string" ? universalMeasureValue(val) : decimalNumber(val);
var hpsMeasureValue = (val) => typeof val === "string" ? positiveUniversalMeasureValue(val) : unsignedDecimalNumber(val);
var twipsMeasureValue = (val) => typeof val === "string" ? positiveUniversalMeasureValue(val) : unsignedDecimalNumber(val);
var percentageValue = (val) => {
  const percent = val.substring(0, val.length - 1);
  return `${Number(percent)}%`;
};
var measurementOrPercentValue = (val) => {
  if (typeof val === "number") return decimalNumber(val);
  if (val.slice(-1) === "%") return percentageValue(val);
  return universalMeasureValue(val);
};
var eighthPointMeasureValue = unsignedDecimalNumber;
var pointMeasureValue = unsignedDecimalNumber;
var dateTimeValue = (val) => val.toISOString();
var OnOffElement = class extends XmlComponent {
  /**
  * Creates an OnOffElement.
  *
  * @param name - The XML element name (e.g., "w:b", "w:i")
  * @param val - The boolean value (defaults to true)
  */
  constructor(name, val = true) {
    super(name);
    if (val !== true) this.root.push(new Attributes({ val }));
  }
};
var HpsMeasureElement = class extends XmlComponent {
  /**
  * Creates an HpsMeasureElement.
  *
  * @param name - The XML element name
  * @param val - The measurement value (number in half-points or string with units)
  */
  constructor(name, val) {
    super(name);
    this.root.push(new Attributes({ val: hpsMeasureValue(val) }));
  }
};
var EmptyElement = class extends XmlComponent {
};
var StringValueElement = class extends XmlComponent {
  /**
  * Creates a StringValueElement.
  *
  * @param name - The XML element name
  * @param val - The string value
  */
  constructor(name, val) {
    super(name);
    this.root.push(new Attributes({ val }));
  }
};
var createStringElement = (name, value) => new BuilderElement({
  name,
  attributes: { value: {
    key: "w:val",
    value
  } }
});
var NumberValueElement = class extends XmlComponent {
  /**
  * Creates a NumberValueElement.
  *
  * @param name - The XML element name
  * @param val - The numeric value
  */
  constructor(name, val) {
    super(name);
    this.root.push(new Attributes({ val }));
  }
};
var StringContainer = class extends XmlComponent {
  /**
  * Creates a StringContainer.
  *
  * @param name - The XML element name
  * @param val - The text content
  */
  constructor(name, val) {
    super(name);
    this.root.push(val);
  }
};
var BuilderElement = class extends XmlComponent {
  /**
  * Creates a BuilderElement with the specified configuration.
  *
  * @param config - Element configuration
  * @param config.name - The XML element name
  * @param config.attributes - Optional attributes with explicit key-value pairs
  * @param config.children - Optional child elements
  */
  constructor({ name, attributes, children }) {
    super(name);
    if (attributes) this.root.push(new NextAttributeComponent(attributes));
    if (children) this.root.push(...children);
  }
};
var AlignmentType = {
  /** Align Start */
  START: "start",
  /** Align Center */
  CENTER: "center",
  /** End */
  END: "end",
  /** Justified */
  BOTH: "both",
  /** Medium Kashida Length */
  MEDIUM_KASHIDA: "mediumKashida",
  /** Distribute All Characters Equally */
  DISTRIBUTE: "distribute",
  /** Align to List Tab */
  NUM_TAB: "numTab",
  /** Widest Kashida Length */
  HIGH_KASHIDA: "highKashida",
  /** Low Kashida Length */
  LOW_KASHIDA: "lowKashida",
  /** Thai Language Justification */
  THAI_DISTRIBUTE: "thaiDistribute",
  /** Align Left */
  LEFT: "left",
  /** Align Right */
  RIGHT: "right",
  /** Justified */
  JUSTIFIED: "both"
};
var createAlignment = (type) => new BuilderElement({
  name: "w:jc",
  attributes: { val: {
    key: "w:val",
    value: type
  } }
});
var createBorderElement = (elementName, { color, size, space, style }) => new BuilderElement({
  name: elementName,
  attributes: {
    style: {
      key: "w:val",
      value: style
    },
    color: {
      key: "w:color",
      value: color === void 0 ? void 0 : hexColorValue(color)
    },
    size: {
      key: "w:sz",
      value: size === void 0 ? void 0 : eighthPointMeasureValue(size)
    },
    space: {
      key: "w:space",
      value: space === void 0 ? void 0 : pointMeasureValue(space)
    }
  }
});
var BorderStyle = {
  /** a single line */
  SINGLE: "single",
  /** a line with a series of alternating thin and thick strokes */
  DASH_DOT_STROKED: "dashDotStroked",
  /** a dashed line */
  DASHED: "dashed",
  /** a dashed line with small gaps */
  DASH_SMALL_GAP: "dashSmallGap",
  /** a line with alternating dots and dashes */
  DOT_DASH: "dotDash",
  /** a line with a repeating dot - dot - dash sequence */
  DOT_DOT_DASH: "dotDotDash",
  /** a dotted line */
  DOTTED: "dotted",
  /** a double line */
  DOUBLE: "double",
  /** a double wavy line */
  DOUBLE_WAVE: "doubleWave",
  /** an inset set of lines */
  INSET: "inset",
  /** no border */
  NIL: "nil",
  /** no border */
  NONE: "none",
  /** an outset set of lines */
  OUTSET: "outset",
  /** a single line */
  THICK: "thick",
  /** a thick line contained within a thin line with a large-sized intermediate gap */
  THICK_THIN_LARGE_GAP: "thickThinLargeGap",
  /** a thick line contained within a thin line with a medium-sized intermediate gap */
  THICK_THIN_MEDIUM_GAP: "thickThinMediumGap",
  /** a thick line contained within a thin line with a small intermediate gap */
  THICK_THIN_SMALL_GAP: "thickThinSmallGap",
  /** a thin line contained within a thick line with a large-sized intermediate gap */
  THIN_THICK_LARGE_GAP: "thinThickLargeGap",
  /** a thick line contained within a thin line with a medium-sized intermediate gap */
  THIN_THICK_MEDIUM_GAP: "thinThickMediumGap",
  /** a thick line contained within a thin line with a small intermediate gap */
  THIN_THICK_SMALL_GAP: "thinThickSmallGap",
  /** a thin-thick-thin line with a large gap */
  THIN_THICK_THIN_LARGE_GAP: "thinThickThinLargeGap",
  /** a thin-thick-thin line with a medium gap */
  THIN_THICK_THIN_MEDIUM_GAP: "thinThickThinMediumGap",
  /** a thin-thick-thin line with a small gap */
  THIN_THICK_THIN_SMALL_GAP: "thinThickThinSmallGap",
  /** a three-staged gradient line, getting darker towards the paragraph */
  THREE_D_EMBOSS: "threeDEmboss",
  /** a three-staged gradient like, getting darker away from the paragraph */
  THREE_D_ENGRAVE: "threeDEngrave",
  /** a triple line */
  TRIPLE: "triple",
  /** a wavy line */
  WAVE: "wave"
};
var Border = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:pBdr");
    if (options2.top) this.root.push(createBorderElement("w:top", options2.top));
    if (options2.bottom) this.root.push(createBorderElement("w:bottom", options2.bottom));
    if (options2.left) this.root.push(createBorderElement("w:left", options2.left));
    if (options2.right) this.root.push(createBorderElement("w:right", options2.right));
    if (options2.between) this.root.push(createBorderElement("w:between", options2.between));
  }
};
var ThematicBreak = class extends XmlComponent {
  constructor() {
    super("w:pBdr");
    const bottom = createBorderElement("w:bottom", {
      color: "auto",
      space: 1,
      style: BorderStyle.SINGLE,
      size: 6
    });
    this.root.push(bottom);
  }
};
var createIndent = ({ start, end, left, right, hanging, firstLine, firstLineChars }) => new BuilderElement({
  name: "w:ind",
  attributes: {
    start: {
      key: "w:start",
      value: start === void 0 ? void 0 : signedTwipsMeasureValue(start)
    },
    end: {
      key: "w:end",
      value: end === void 0 ? void 0 : signedTwipsMeasureValue(end)
    },
    left: {
      key: "w:left",
      value: left === void 0 ? void 0 : signedTwipsMeasureValue(left)
    },
    right: {
      key: "w:right",
      value: right === void 0 ? void 0 : signedTwipsMeasureValue(right)
    },
    hanging: {
      key: "w:hanging",
      value: hanging === void 0 ? void 0 : twipsMeasureValue(hanging)
    },
    firstLine: {
      key: "w:firstLine",
      value: firstLine === void 0 ? void 0 : twipsMeasureValue(firstLine)
    },
    firstLineChars: {
      key: "w:firstLineChars",
      value: firstLineChars === void 0 ? void 0 : decimalNumber(firstLineChars)
    }
  }
});
var createBreak = () => new BuilderElement({ name: "w:br" });
var FieldCharacterType = {
  BEGIN: "begin",
  END: "end",
  SEPARATE: "separate"
};
var createFieldChar = (type, dirty) => new BuilderElement({
  name: "w:fldChar",
  attributes: {
    type: {
      key: "w:fldCharType",
      value: type
    },
    dirty: {
      key: "w:dirty",
      value: dirty
    }
  }
});
var createBegin = (dirty) => createFieldChar(FieldCharacterType.BEGIN, dirty);
var createSeparate = (dirty) => createFieldChar(FieldCharacterType.SEPARATE, dirty);
var createEnd = (dirty) => createFieldChar(FieldCharacterType.END, dirty);
var SpaceType = {
  DEFAULT: "default",
  PRESERVE: "preserve"
};
var TextAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { space: "xml:space" });
  }
};
var Page = class extends XmlComponent {
  constructor() {
    super("w:instrText");
    this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
    this.root.push("PAGE");
  }
};
var NumberOfPages = class extends XmlComponent {
  constructor() {
    super("w:instrText");
    this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
    this.root.push("NUMPAGES");
  }
};
var NumberOfPagesSection = class extends XmlComponent {
  constructor() {
    super("w:instrText");
    this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
    this.root.push("SECTIONPAGES");
  }
};
var CurrentSection = class extends XmlComponent {
  constructor() {
    super("w:instrText");
    this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
    this.root.push("SECTION");
  }
};
var createShading = ({ fill, color, type }) => new BuilderElement({
  name: "w:shd",
  attributes: {
    fill: {
      key: "w:fill",
      value: fill === void 0 ? void 0 : hexColorValue(fill)
    },
    color: {
      key: "w:color",
      value: color === void 0 ? void 0 : hexColorValue(color)
    },
    type: {
      key: "w:val",
      value: type
    }
  }
});
var ChangeAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date"
    });
  }
};
var DeletionTrackChange = class extends XmlComponent {
  constructor(options2) {
    super("w:del");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
  }
};
var InsertionTrackChange = class extends XmlComponent {
  constructor(options2) {
    super("w:ins");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
  }
};
var EmphasisMarkType = {
  /** Dot emphasis mark */
  DOT: "dot"
};
var createEmphasisMark = (emphasisMarkType = EmphasisMarkType.DOT) => new BuilderElement({
  name: "w:em",
  attributes: { val: {
    key: "w:val",
    value: emphasisMarkType
  } }
});
var CharacterSpacing = class extends XmlComponent {
  constructor(value) {
    super("w:spacing");
    this.root.push(new Attributes({ val: signedTwipsMeasureValue(value) }));
  }
};
var Color = class extends XmlComponent {
  constructor(color) {
    super("w:color");
    this.root.push(new Attributes({ val: hexColorValue(color) }));
  }
};
var Highlight = class extends XmlComponent {
  constructor(color) {
    super("w:highlight");
    this.root.push(new Attributes({ val: color }));
  }
};
var HighlightComplexScript = class extends XmlComponent {
  constructor(color) {
    super("w:highlightCs");
    this.root.push(new Attributes({ val: color }));
  }
};
var createLanguageComponent = (options2) => new BuilderElement({
  name: "w:lang",
  attributes: {
    value: {
      key: "w:val",
      value: options2.value
    },
    eastAsia: {
      key: "w:eastAsia",
      value: options2.eastAsia
    },
    bidirectional: {
      key: "w:bidi",
      value: options2.bidirectional
    }
  }
});
var createRunFonts = (nameOrAttrs, hint) => {
  if (typeof nameOrAttrs === "string") {
    const name = nameOrAttrs;
    return new BuilderElement({
      name: "w:rFonts",
      attributes: {
        ascii: {
          key: "w:ascii",
          value: name
        },
        cs: {
          key: "w:cs",
          value: name
        },
        eastAsia: {
          key: "w:eastAsia",
          value: name
        },
        hAnsi: {
          key: "w:hAnsi",
          value: name
        },
        hint: {
          key: "w:hint",
          value: hint
        }
      }
    });
  }
  const attrs = nameOrAttrs;
  return new BuilderElement({
    name: "w:rFonts",
    attributes: {
      ascii: {
        key: "w:ascii",
        value: attrs.ascii
      },
      cs: {
        key: "w:cs",
        value: attrs.cs
      },
      eastAsia: {
        key: "w:eastAsia",
        value: attrs.eastAsia
      },
      hAnsi: {
        key: "w:hAnsi",
        value: attrs.hAnsi
      },
      hint: {
        key: "w:hint",
        value: attrs.hint
      }
    }
  });
};
var createVerticalAlignRun = (type) => new BuilderElement({
  name: "w:vertAlign",
  attributes: { val: {
    key: "w:val",
    value: type
  } }
});
var createSuperScript = () => createVerticalAlignRun("superscript");
var createSubScript = () => createVerticalAlignRun("subscript");
var UnderlineType = {
  /** Single underline */
  SINGLE: "single",
  /** Underline words only (not spaces) */
  WORDS: "words",
  /** Double underline */
  DOUBLE: "double",
  /** Thick single underline */
  THICK: "thick",
  /** Dotted underline */
  DOTTED: "dotted",
  /** Heavy dotted underline */
  DOTTEDHEAVY: "dottedHeavy",
  /** Dashed underline */
  DASH: "dash",
  /** Heavy dashed underline */
  DASHEDHEAVY: "dashedHeavy",
  /** Long dashed underline */
  DASHLONG: "dashLong",
  /** Heavy long dashed underline */
  DASHLONGHEAVY: "dashLongHeavy",
  /** Dot-dash underline */
  DOTDASH: "dotDash",
  /** Heavy dot-dash underline */
  DASHDOTHEAVY: "dashDotHeavy",
  /** Dot-dot-dash underline */
  DOTDOTDASH: "dotDotDash",
  /** Heavy dot-dot-dash underline */
  DASHDOTDOTHEAVY: "dashDotDotHeavy",
  /** Wave underline */
  WAVE: "wave",
  /** Heavy wave underline */
  WAVYHEAVY: "wavyHeavy",
  /** Double wave underline */
  WAVYDOUBLE: "wavyDouble",
  /** No underline */
  NONE: "none"
};
var createUnderline = (underlineType = UnderlineType.SINGLE, color) => new BuilderElement({
  name: "w:u",
  attributes: {
    val: {
      key: "w:val",
      value: underlineType
    },
    color: {
      key: "w:color",
      value: color === void 0 ? void 0 : hexColorValue(color)
    }
  }
});
var RunProperties = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:rPr");
    if (!options2) return;
    if (options2.style) this.push(new StringValueElement("w:rStyle", options2.style));
    if (options2.font) if (typeof options2.font === "string") this.push(createRunFonts(options2.font));
    else if ("name" in options2.font) this.push(createRunFonts(options2.font.name, options2.font.hint));
    else this.push(createRunFonts(options2.font));
    if (options2.bold !== void 0) this.push(new OnOffElement("w:b", options2.bold));
    if (options2.boldComplexScript === void 0 && options2.bold !== void 0 || options2.boldComplexScript) {
      var _options$boldComplexS;
      this.push(new OnOffElement("w:bCs", (_options$boldComplexS = options2.boldComplexScript) !== null && _options$boldComplexS !== void 0 ? _options$boldComplexS : options2.bold));
    }
    if (options2.italics !== void 0) this.push(new OnOffElement("w:i", options2.italics));
    if (options2.italicsComplexScript === void 0 && options2.italics !== void 0 || options2.italicsComplexScript) {
      var _options$italicsCompl;
      this.push(new OnOffElement("w:iCs", (_options$italicsCompl = options2.italicsComplexScript) !== null && _options$italicsCompl !== void 0 ? _options$italicsCompl : options2.italics));
    }
    if (options2.smallCaps !== void 0) this.push(new OnOffElement("w:smallCaps", options2.smallCaps));
    else if (options2.allCaps !== void 0) this.push(new OnOffElement("w:caps", options2.allCaps));
    if (options2.strike !== void 0) this.push(new OnOffElement("w:strike", options2.strike));
    if (options2.doubleStrike !== void 0) this.push(new OnOffElement("w:dstrike", options2.doubleStrike));
    if (options2.emboss !== void 0) this.push(new OnOffElement("w:emboss", options2.emboss));
    if (options2.imprint !== void 0) this.push(new OnOffElement("w:imprint", options2.imprint));
    if (options2.noProof !== void 0) this.push(new OnOffElement("w:noProof", options2.noProof));
    if (options2.snapToGrid !== void 0) this.push(new OnOffElement("w:snapToGrid", options2.snapToGrid));
    if (options2.vanish) this.push(new OnOffElement("w:vanish", options2.vanish));
    if (options2.color) this.push(new Color(options2.color));
    if (options2.characterSpacing) this.push(new CharacterSpacing(options2.characterSpacing));
    if (options2.scale !== void 0) this.push(new NumberValueElement("w:w", options2.scale));
    if (options2.kern) this.push(new HpsMeasureElement("w:kern", options2.kern));
    if (options2.position) this.push(new StringValueElement("w:position", options2.position));
    if (options2.size !== void 0) this.push(new HpsMeasureElement("w:sz", options2.size));
    const szCs = options2.sizeComplexScript === void 0 || options2.sizeComplexScript === true ? options2.size : options2.sizeComplexScript;
    if (szCs) this.push(new HpsMeasureElement("w:szCs", szCs));
    if (options2.highlight) this.push(new Highlight(options2.highlight));
    const highlightCs = options2.highlightComplexScript === void 0 || options2.highlightComplexScript === true ? options2.highlight : options2.highlightComplexScript;
    if (highlightCs) this.push(new HighlightComplexScript(highlightCs));
    if (options2.underline) this.push(createUnderline(options2.underline.type, options2.underline.color));
    if (options2.effect) this.push(new StringValueElement("w:effect", options2.effect));
    if (options2.border) this.push(createBorderElement("w:bdr", options2.border));
    if (options2.shading) this.push(createShading(options2.shading));
    if (options2.subScript) this.push(createSubScript());
    if (options2.superScript) this.push(createSuperScript());
    if (options2.rightToLeft !== void 0) this.push(new OnOffElement("w:rtl", options2.rightToLeft));
    if (options2.emphasisMark) this.push(createEmphasisMark(options2.emphasisMark.type));
    if (options2.language) this.push(createLanguageComponent(options2.language));
    if (options2.specVanish) this.push(new OnOffElement("w:specVanish", options2.vanish));
    if (options2.math) this.push(new OnOffElement("w:oMath", options2.math));
    if (options2.revision) this.push(new RunPropertiesChange(options2.revision));
  }
  push(item) {
    this.root.push(item);
  }
};
var ParagraphRunProperties = class extends RunProperties {
  constructor(options2) {
    super(options2);
    if (options2 === null || options2 === void 0 ? void 0 : options2.insertion) this.push(new InsertionTrackChange(options2.insertion));
    if (options2 === null || options2 === void 0 ? void 0 : options2.deletion) this.push(new DeletionTrackChange(options2.deletion));
  }
};
var RunPropertiesChange = class extends XmlComponent {
  constructor(options2) {
    super("w:rPrChange");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
    this.addChildElement(new RunProperties(options2));
  }
};
var Text = class extends XmlComponent {
  constructor(options2) {
    super("w:t");
    if (typeof options2 === "string") {
      this.root.push(new TextAttributes({ space: SpaceType.PRESERVE }));
      this.root.push(options2);
    } else {
      var _options$space;
      this.root.push(new TextAttributes({ space: (_options$space = options2.space) !== null && _options$space !== void 0 ? _options$space : SpaceType.DEFAULT }));
      this.root.push(options2.text);
    }
  }
};
var PageNumber = {
  /** Inserts the current page number */
  CURRENT: "CURRENT",
  /** Inserts the total number of pages in the document */
  TOTAL_PAGES: "TOTAL_PAGES",
  /** Inserts the total number of pages in the current section */
  TOTAL_PAGES_IN_SECTION: "TOTAL_PAGES_IN_SECTION",
  /** Inserts the current section number */
  CURRENT_SECTION: "SECTION"
};
var Run = class extends XmlComponent {
  constructor(options2) {
    super("w:r");
    _defineProperty(this, "properties", void 0);
    this.properties = new RunProperties(options2);
    this.root.push(this.properties);
    if (options2.break) for (let i = 0; i < options2.break; i++) this.root.push(createBreak());
    if (options2.children) for (const child of options2.children) {
      if (typeof child === "string") {
        switch (child) {
          case PageNumber.CURRENT:
            this.root.push(createBegin());
            this.root.push(new Page());
            this.root.push(createSeparate());
            this.root.push(createEnd());
            break;
          case PageNumber.TOTAL_PAGES:
            this.root.push(createBegin());
            this.root.push(new NumberOfPages());
            this.root.push(createSeparate());
            this.root.push(createEnd());
            break;
          case PageNumber.TOTAL_PAGES_IN_SECTION:
            this.root.push(createBegin());
            this.root.push(new NumberOfPagesSection());
            this.root.push(createSeparate());
            this.root.push(createEnd());
            break;
          case PageNumber.CURRENT_SECTION:
            this.root.push(createBegin());
            this.root.push(new CurrentSection());
            this.root.push(createSeparate());
            this.root.push(createEnd());
            break;
          default:
            this.root.push(new Text(child));
            break;
        }
        continue;
      }
      this.root.push(child);
    }
    else if (options2.text !== void 0) this.root.push(new Text(options2.text));
  }
};
var TextRun = class extends Run {
  constructor(options2) {
    super(typeof options2 === "string" ? { text: options2 } : options2);
  }
};
var require_minimalistic_assert = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  module2.exports = assert;
  function assert(val, msg) {
    if (!val) throw new Error(msg || "Assertion failed");
  }
  assert.equal = function assertEqual(l, r, msg) {
    if (l != r) throw new Error(msg || "Assertion failed: " + l + " != " + r);
  };
});
var require_utils = /* @__PURE__ */ __commonJSMin((exports2) => {
  var assert = require_minimalistic_assert();
  exports2.inherits = require_inherits_browser();
  function isSurrogatePair(msg, i) {
    if ((msg.charCodeAt(i) & 64512) !== 55296) return false;
    if (i < 0 || i + 1 >= msg.length) return false;
    return (msg.charCodeAt(i + 1) & 64512) === 56320;
  }
  function toArray(msg, enc) {
    if (Array.isArray(msg)) return msg.slice();
    if (!msg) return [];
    var res = [];
    if (typeof msg === "string") {
      if (!enc) {
        var p = 0;
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          if (c < 128) res[p++] = c;
          else if (c < 2048) {
            res[p++] = c >> 6 | 192;
            res[p++] = c & 63 | 128;
          } else if (isSurrogatePair(msg, i)) {
            c = 65536 + ((c & 1023) << 10) + (msg.charCodeAt(++i) & 1023);
            res[p++] = c >> 18 | 240;
            res[p++] = c >> 12 & 63 | 128;
            res[p++] = c >> 6 & 63 | 128;
            res[p++] = c & 63 | 128;
          } else {
            res[p++] = c >> 12 | 224;
            res[p++] = c >> 6 & 63 | 128;
            res[p++] = c & 63 | 128;
          }
        }
      } else if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/gi, "");
        if (msg.length % 2 !== 0) msg = "0" + msg;
        for (i = 0; i < msg.length; i += 2) res.push(parseInt(msg[i] + msg[i + 1], 16));
      }
    } else for (i = 0; i < msg.length; i++) res[i] = msg[i] | 0;
    return res;
  }
  exports2.toArray = toArray;
  function toHex(msg) {
    var res = "";
    for (var i = 0; i < msg.length; i++) res += zero2(msg[i].toString(16));
    return res;
  }
  exports2.toHex = toHex;
  function htonl(w) {
    return (w >>> 24 | w >>> 8 & 65280 | w << 8 & 16711680 | (w & 255) << 24) >>> 0;
  }
  exports2.htonl = htonl;
  function toHex32(msg, endian) {
    var res = "";
    for (var i = 0; i < msg.length; i++) {
      var w = msg[i];
      if (endian === "little") w = htonl(w);
      res += zero8(w.toString(16));
    }
    return res;
  }
  exports2.toHex32 = toHex32;
  function zero2(word) {
    if (word.length === 1) return "0" + word;
    else return word;
  }
  exports2.zero2 = zero2;
  function zero8(word) {
    if (word.length === 7) return "0" + word;
    else if (word.length === 6) return "00" + word;
    else if (word.length === 5) return "000" + word;
    else if (word.length === 4) return "0000" + word;
    else if (word.length === 3) return "00000" + word;
    else if (word.length === 2) return "000000" + word;
    else if (word.length === 1) return "0000000" + word;
    else return word;
  }
  exports2.zero8 = zero8;
  function join32(msg, start, end, endian) {
    var len = end - start;
    assert(len % 4 === 0);
    var res = new Array(len / 4);
    for (var i = 0, k = start; i < res.length; i++, k += 4) {
      var w;
      if (endian === "big") w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];
      else w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
      res[i] = w >>> 0;
    }
    return res;
  }
  exports2.join32 = join32;
  function split32(msg, endian) {
    var res = new Array(msg.length * 4);
    for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
      var m = msg[i];
      if (endian === "big") {
        res[k] = m >>> 24;
        res[k + 1] = m >>> 16 & 255;
        res[k + 2] = m >>> 8 & 255;
        res[k + 3] = m & 255;
      } else {
        res[k + 3] = m >>> 24;
        res[k + 2] = m >>> 16 & 255;
        res[k + 1] = m >>> 8 & 255;
        res[k] = m & 255;
      }
    }
    return res;
  }
  exports2.split32 = split32;
  function rotr32(w, b) {
    return w >>> b | w << 32 - b;
  }
  exports2.rotr32 = rotr32;
  function rotl32(w, b) {
    return w << b | w >>> 32 - b;
  }
  exports2.rotl32 = rotl32;
  function sum32(a, b) {
    return a + b >>> 0;
  }
  exports2.sum32 = sum32;
  function sum32_3(a, b, c) {
    return a + b + c >>> 0;
  }
  exports2.sum32_3 = sum32_3;
  function sum32_4(a, b, c, d) {
    return a + b + c + d >>> 0;
  }
  exports2.sum32_4 = sum32_4;
  function sum32_5(a, b, c, d, e) {
    return a + b + c + d + e >>> 0;
  }
  exports2.sum32_5 = sum32_5;
  function sum64(buf, pos, ah, al) {
    var bh = buf[pos];
    var lo = al + buf[pos + 1] >>> 0;
    buf[pos] = (lo < al ? 1 : 0) + ah + bh >>> 0;
    buf[pos + 1] = lo;
  }
  exports2.sum64 = sum64;
  function sum64_hi(ah, al, bh, bl) {
    return (al + bl >>> 0 < al ? 1 : 0) + ah + bh >>> 0;
  }
  exports2.sum64_hi = sum64_hi;
  function sum64_lo(ah, al, bh, bl) {
    return al + bl >>> 0;
  }
  exports2.sum64_lo = sum64_lo;
  function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
    var carry = 0;
    var lo = al;
    lo = lo + bl >>> 0;
    carry += lo < al ? 1 : 0;
    lo = lo + cl >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = lo + dl >>> 0;
    carry += lo < dl ? 1 : 0;
    return ah + bh + ch + dh + carry >>> 0;
  }
  exports2.sum64_4_hi = sum64_4_hi;
  function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
    return al + bl + cl + dl >>> 0;
  }
  exports2.sum64_4_lo = sum64_4_lo;
  function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var carry = 0;
    var lo = al;
    lo = lo + bl >>> 0;
    carry += lo < al ? 1 : 0;
    lo = lo + cl >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = lo + dl >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = lo + el >>> 0;
    carry += lo < el ? 1 : 0;
    return ah + bh + ch + dh + eh + carry >>> 0;
  }
  exports2.sum64_5_hi = sum64_5_hi;
  function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    return al + bl + cl + dl + el >>> 0;
  }
  exports2.sum64_5_lo = sum64_5_lo;
  function rotr64_hi(ah, al, num) {
    return (al << 32 - num | ah >>> num) >>> 0;
  }
  exports2.rotr64_hi = rotr64_hi;
  function rotr64_lo(ah, al, num) {
    return (ah << 32 - num | al >>> num) >>> 0;
  }
  exports2.rotr64_lo = rotr64_lo;
  function shr64_hi(ah, al, num) {
    return ah >>> num;
  }
  exports2.shr64_hi = shr64_hi;
  function shr64_lo(ah, al, num) {
    return (ah << 32 - num | al >>> num) >>> 0;
  }
  exports2.shr64_lo = shr64_lo;
});
var require_common$1 = /* @__PURE__ */ __commonJSMin((exports2) => {
  var utils = require_utils();
  var assert = require_minimalistic_assert();
  function BlockHash() {
    this.pending = null;
    this.pendingTotal = 0;
    this.blockSize = this.constructor.blockSize;
    this.outSize = this.constructor.outSize;
    this.hmacStrength = this.constructor.hmacStrength;
    this.padLength = this.constructor.padLength / 8;
    this.endian = "big";
    this._delta8 = this.blockSize / 8;
    this._delta32 = this.blockSize / 32;
  }
  exports2.BlockHash = BlockHash;
  BlockHash.prototype.update = function update(msg, enc) {
    msg = utils.toArray(msg, enc);
    if (!this.pending) this.pending = msg;
    else this.pending = this.pending.concat(msg);
    this.pendingTotal += msg.length;
    if (this.pending.length >= this._delta8) {
      msg = this.pending;
      var r = msg.length % this._delta8;
      this.pending = msg.slice(msg.length - r, msg.length);
      if (this.pending.length === 0) this.pending = null;
      msg = utils.join32(msg, 0, msg.length - r, this.endian);
      for (var i = 0; i < msg.length; i += this._delta32) this._update(msg, i, i + this._delta32);
    }
    return this;
  };
  BlockHash.prototype.digest = function digest(enc) {
    this.update(this._pad());
    assert(this.pending === null);
    return this._digest(enc);
  };
  BlockHash.prototype._pad = function pad() {
    var len = this.pendingTotal;
    var bytes = this._delta8;
    var k = bytes - (len + this.padLength) % bytes;
    var res = new Array(k + this.padLength);
    res[0] = 128;
    for (var i = 1; i < k; i++) res[i] = 0;
    len <<= 3;
    if (this.endian === "big") {
      for (var t = 8; t < this.padLength; t++) res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = len >>> 24 & 255;
      res[i++] = len >>> 16 & 255;
      res[i++] = len >>> 8 & 255;
      res[i++] = len & 255;
    } else {
      res[i++] = len & 255;
      res[i++] = len >>> 8 & 255;
      res[i++] = len >>> 16 & 255;
      res[i++] = len >>> 24 & 255;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      for (t = 8; t < this.padLength; t++) res[i++] = 0;
    }
    return res;
  };
});
var require_common = /* @__PURE__ */ __commonJSMin((exports2) => {
  var rotr32 = require_utils().rotr32;
  function ft_1(s, x, y, z) {
    if (s === 0) return ch32(x, y, z);
    if (s === 1 || s === 3) return p32(x, y, z);
    if (s === 2) return maj32(x, y, z);
  }
  exports2.ft_1 = ft_1;
  function ch32(x, y, z) {
    return x & y ^ ~x & z;
  }
  exports2.ch32 = ch32;
  function maj32(x, y, z) {
    return x & y ^ x & z ^ y & z;
  }
  exports2.maj32 = maj32;
  function p32(x, y, z) {
    return x ^ y ^ z;
  }
  exports2.p32 = p32;
  function s0_256(x) {
    return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
  }
  exports2.s0_256 = s0_256;
  function s1_256(x) {
    return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
  }
  exports2.s1_256 = s1_256;
  function g0_256(x) {
    return rotr32(x, 7) ^ rotr32(x, 18) ^ x >>> 3;
  }
  exports2.g0_256 = g0_256;
  function g1_256(x) {
    return rotr32(x, 17) ^ rotr32(x, 19) ^ x >>> 10;
  }
  exports2.g1_256 = g1_256;
});
var require__1 = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var utils = require_utils();
  var common = require_common$1();
  var shaCommon = require_common();
  var rotl32 = utils.rotl32;
  var sum32 = utils.sum32;
  var sum32_5 = utils.sum32_5;
  var ft_1 = shaCommon.ft_1;
  var BlockHash = common.BlockHash;
  var sha1_K = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function SHA1() {
    if (!(this instanceof SHA1)) return new SHA1();
    BlockHash.call(this);
    this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ];
    this.W = new Array(80);
  }
  utils.inherits(SHA1, BlockHash);
  module2.exports = SHA1;
  SHA1.blockSize = 512;
  SHA1.outSize = 160;
  SHA1.hmacStrength = 80;
  SHA1.padLength = 64;
  SHA1.prototype._update = function _update(msg, start) {
    var W = this.W;
    for (var i = 0; i < 16; i++) W[i] = msg[start + i];
    for (; i < W.length; i++) W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    for (i = 0; i < W.length; i++) {
      var s = ~~(i / 20);
      var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
      e = d;
      d = c;
      c = rotl32(b, 30);
      b = a;
      a = t;
    }
    this.h[0] = sum32(this.h[0], a);
    this.h[1] = sum32(this.h[1], b);
    this.h[2] = sum32(this.h[2], c);
    this.h[3] = sum32(this.h[3], d);
    this.h[4] = sum32(this.h[4], e);
  };
  SHA1.prototype._digest = function digest(enc) {
    if (enc === "hex") return utils.toHex32(this.h, "big");
    else return utils.split32(this.h, "big");
  };
});
var require__256 = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var utils = require_utils();
  var common = require_common$1();
  var shaCommon = require_common();
  var assert = require_minimalistic_assert();
  var sum32 = utils.sum32;
  var sum32_4 = utils.sum32_4;
  var sum32_5 = utils.sum32_5;
  var ch32 = shaCommon.ch32;
  var maj32 = shaCommon.maj32;
  var s0_256 = shaCommon.s0_256;
  var s1_256 = shaCommon.s1_256;
  var g0_256 = shaCommon.g0_256;
  var g1_256 = shaCommon.g1_256;
  var BlockHash = common.BlockHash;
  var sha256_K = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function SHA256() {
    if (!(this instanceof SHA256)) return new SHA256();
    BlockHash.call(this);
    this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ];
    this.k = sha256_K;
    this.W = new Array(64);
  }
  utils.inherits(SHA256, BlockHash);
  module2.exports = SHA256;
  SHA256.blockSize = 512;
  SHA256.outSize = 256;
  SHA256.hmacStrength = 192;
  SHA256.padLength = 64;
  SHA256.prototype._update = function _update(msg, start) {
    var W = this.W;
    for (var i = 0; i < 16; i++) W[i] = msg[start + i];
    for (; i < W.length; i++) W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);
    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    var f = this.h[5];
    var g = this.h[6];
    var h = this.h[7];
    assert(this.k.length === W.length);
    for (i = 0; i < W.length; i++) {
      var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
      var T2 = sum32(s0_256(a), maj32(a, b, c));
      h = g;
      g = f;
      f = e;
      e = sum32(d, T1);
      d = c;
      c = b;
      b = a;
      a = sum32(T1, T2);
    }
    this.h[0] = sum32(this.h[0], a);
    this.h[1] = sum32(this.h[1], b);
    this.h[2] = sum32(this.h[2], c);
    this.h[3] = sum32(this.h[3], d);
    this.h[4] = sum32(this.h[4], e);
    this.h[5] = sum32(this.h[5], f);
    this.h[6] = sum32(this.h[6], g);
    this.h[7] = sum32(this.h[7], h);
  };
  SHA256.prototype._digest = function digest(enc) {
    if (enc === "hex") return utils.toHex32(this.h, "big");
    else return utils.split32(this.h, "big");
  };
});
var require__224 = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var utils = require_utils();
  var SHA256 = require__256();
  function SHA224() {
    if (!(this instanceof SHA224)) return new SHA224();
    SHA256.call(this);
    this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  utils.inherits(SHA224, SHA256);
  module2.exports = SHA224;
  SHA224.blockSize = 512;
  SHA224.outSize = 224;
  SHA224.hmacStrength = 192;
  SHA224.padLength = 64;
  SHA224.prototype._digest = function digest(enc) {
    if (enc === "hex") return utils.toHex32(this.h.slice(0, 7), "big");
    else return utils.split32(this.h.slice(0, 7), "big");
  };
});
var require__512 = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var utils = require_utils();
  var common = require_common$1();
  var assert = require_minimalistic_assert();
  var rotr64_hi = utils.rotr64_hi;
  var rotr64_lo = utils.rotr64_lo;
  var shr64_hi = utils.shr64_hi;
  var shr64_lo = utils.shr64_lo;
  var sum64 = utils.sum64;
  var sum64_hi = utils.sum64_hi;
  var sum64_lo = utils.sum64_lo;
  var sum64_4_hi = utils.sum64_4_hi;
  var sum64_4_lo = utils.sum64_4_lo;
  var sum64_5_hi = utils.sum64_5_hi;
  var sum64_5_lo = utils.sum64_5_lo;
  var BlockHash = common.BlockHash;
  var sha512_K = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function SHA512() {
    if (!(this instanceof SHA512)) return new SHA512();
    BlockHash.call(this);
    this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ];
    this.k = sha512_K;
    this.W = new Array(160);
  }
  utils.inherits(SHA512, BlockHash);
  module2.exports = SHA512;
  SHA512.blockSize = 1024;
  SHA512.outSize = 512;
  SHA512.hmacStrength = 192;
  SHA512.padLength = 128;
  SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
    var W = this.W;
    for (var i = 0; i < 32; i++) W[i] = msg[start + i];
    for (; i < W.length; i += 2) {
      var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
      var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
      var c1_hi = W[i - 14];
      var c1_lo = W[i - 13];
      var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
      var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
      var c3_hi = W[i - 32];
      var c3_lo = W[i - 31];
      W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
      W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
    }
  };
  SHA512.prototype._update = function _update(msg, start) {
    this._prepareBlock(msg, start);
    var W = this.W;
    var ah = this.h[0];
    var al = this.h[1];
    var bh = this.h[2];
    var bl = this.h[3];
    var ch = this.h[4];
    var cl = this.h[5];
    var dh = this.h[6];
    var dl = this.h[7];
    var eh = this.h[8];
    var el = this.h[9];
    var fh = this.h[10];
    var fl = this.h[11];
    var gh = this.h[12];
    var gl = this.h[13];
    var hh = this.h[14];
    var hl = this.h[15];
    assert(this.k.length === W.length);
    for (var i = 0; i < W.length; i += 2) {
      var c0_hi = hh;
      var c0_lo = hl;
      var c1_hi = s1_512_hi(eh, el);
      var c1_lo = s1_512_lo(eh, el);
      var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
      var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
      var c3_hi = this.k[i];
      var c3_lo = this.k[i + 1];
      var c4_hi = W[i];
      var c4_lo = W[i + 1];
      var T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
      var T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
      c0_hi = s0_512_hi(ah, al);
      c0_lo = s0_512_lo(ah, al);
      c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
      c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
      var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
      var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
      hh = gh;
      hl = gl;
      gh = fh;
      gl = fl;
      fh = eh;
      fl = el;
      eh = sum64_hi(dh, dl, T1_hi, T1_lo);
      el = sum64_lo(dl, dl, T1_hi, T1_lo);
      dh = ch;
      dl = cl;
      ch = bh;
      cl = bl;
      bh = ah;
      bl = al;
      ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
      al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
    }
    sum64(this.h, 0, ah, al);
    sum64(this.h, 2, bh, bl);
    sum64(this.h, 4, ch, cl);
    sum64(this.h, 6, dh, dl);
    sum64(this.h, 8, eh, el);
    sum64(this.h, 10, fh, fl);
    sum64(this.h, 12, gh, gl);
    sum64(this.h, 14, hh, hl);
  };
  SHA512.prototype._digest = function digest(enc) {
    if (enc === "hex") return utils.toHex32(this.h, "big");
    else return utils.split32(this.h, "big");
  };
  function ch64_hi(xh, xl, yh, yl, zh) {
    var r = xh & yh ^ ~xh & zh;
    if (r < 0) r += 4294967296;
    return r;
  }
  function ch64_lo(xh, xl, yh, yl, zh, zl) {
    var r = xl & yl ^ ~xl & zl;
    if (r < 0) r += 4294967296;
    return r;
  }
  function maj64_hi(xh, xl, yh, yl, zh) {
    var r = xh & yh ^ xh & zh ^ yh & zh;
    if (r < 0) r += 4294967296;
    return r;
  }
  function maj64_lo(xh, xl, yh, yl, zh, zl) {
    var r = xl & yl ^ xl & zl ^ yl & zl;
    if (r < 0) r += 4294967296;
    return r;
  }
  function s0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 28);
    var c1_hi = rotr64_hi(xl, xh, 2);
    var c2_hi = rotr64_hi(xl, xh, 7);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0) r += 4294967296;
    return r;
  }
  function s0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 28);
    var c1_lo = rotr64_lo(xl, xh, 2);
    var c2_lo = rotr64_lo(xl, xh, 7);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0) r += 4294967296;
    return r;
  }
  function s1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 14);
    var c1_hi = rotr64_hi(xh, xl, 18);
    var c2_hi = rotr64_hi(xl, xh, 9);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0) r += 4294967296;
    return r;
  }
  function s1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 14);
    var c1_lo = rotr64_lo(xh, xl, 18);
    var c2_lo = rotr64_lo(xl, xh, 9);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0) r += 4294967296;
    return r;
  }
  function g0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 1);
    var c1_hi = rotr64_hi(xh, xl, 8);
    var c2_hi = shr64_hi(xh, xl, 7);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0) r += 4294967296;
    return r;
  }
  function g0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 1);
    var c1_lo = rotr64_lo(xh, xl, 8);
    var c2_lo = shr64_lo(xh, xl, 7);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0) r += 4294967296;
    return r;
  }
  function g1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 19);
    var c1_hi = rotr64_hi(xl, xh, 29);
    var c2_hi = shr64_hi(xh, xl, 6);
    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0) r += 4294967296;
    return r;
  }
  function g1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 19);
    var c1_lo = rotr64_lo(xl, xh, 29);
    var c2_lo = shr64_lo(xh, xl, 6);
    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0) r += 4294967296;
    return r;
  }
});
var require__384 = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var utils = require_utils();
  var SHA512 = require__512();
  function SHA384() {
    if (!(this instanceof SHA384)) return new SHA384();
    SHA512.call(this);
    this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  utils.inherits(SHA384, SHA512);
  module2.exports = SHA384;
  SHA384.blockSize = 1024;
  SHA384.outSize = 384;
  SHA384.hmacStrength = 192;
  SHA384.padLength = 128;
  SHA384.prototype._digest = function digest(enc) {
    if (enc === "hex") return utils.toHex32(this.h.slice(0, 12), "big");
    else return utils.split32(this.h.slice(0, 12), "big");
  };
});
var require_sha = /* @__PURE__ */ __commonJSMin((exports2) => {
  exports2.sha1 = require__1();
  exports2.sha224 = require__224();
  exports2.sha256 = require__256();
  exports2.sha384 = require__384();
  exports2.sha512 = require__512();
});
var require_ripemd = /* @__PURE__ */ __commonJSMin((exports2) => {
  var utils = require_utils();
  var common = require_common$1();
  var rotl32 = utils.rotl32;
  var sum32 = utils.sum32;
  var sum32_3 = utils.sum32_3;
  var sum32_4 = utils.sum32_4;
  var BlockHash = common.BlockHash;
  function RIPEMD160() {
    if (!(this instanceof RIPEMD160)) return new RIPEMD160();
    BlockHash.call(this);
    this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ];
    this.endian = "little";
  }
  utils.inherits(RIPEMD160, BlockHash);
  exports2.ripemd160 = RIPEMD160;
  RIPEMD160.blockSize = 512;
  RIPEMD160.outSize = 160;
  RIPEMD160.hmacStrength = 192;
  RIPEMD160.padLength = 64;
  RIPEMD160.prototype._update = function update(msg, start) {
    var A = this.h[0];
    var B = this.h[1];
    var C = this.h[2];
    var D = this.h[3];
    var E = this.h[4];
    var Ah = A;
    var Bh = B;
    var Ch = C;
    var Dh = D;
    var Eh = E;
    for (var j = 0; j < 80; j++) {
      var T = sum32(rotl32(sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)), s[j]), E);
      A = E;
      E = D;
      D = rotl32(C, 10);
      C = B;
      B = T;
      T = sum32(rotl32(sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)), sh[j]), Eh);
      Ah = Eh;
      Eh = Dh;
      Dh = rotl32(Ch, 10);
      Ch = Bh;
      Bh = T;
    }
    T = sum32_3(this.h[1], C, Dh);
    this.h[1] = sum32_3(this.h[2], D, Eh);
    this.h[2] = sum32_3(this.h[3], E, Ah);
    this.h[3] = sum32_3(this.h[4], A, Bh);
    this.h[4] = sum32_3(this.h[0], B, Ch);
    this.h[0] = T;
  };
  RIPEMD160.prototype._digest = function digest(enc) {
    if (enc === "hex") return utils.toHex32(this.h, "little");
    else return utils.split32(this.h, "little");
  };
  function f(j, x, y, z) {
    if (j <= 15) return x ^ y ^ z;
    else if (j <= 31) return x & y | ~x & z;
    else if (j <= 47) return (x | ~y) ^ z;
    else if (j <= 63) return x & z | y & ~z;
    else return x ^ (y | ~z);
  }
  function K(j) {
    if (j <= 15) return 0;
    else if (j <= 31) return 1518500249;
    else if (j <= 47) return 1859775393;
    else if (j <= 63) return 2400959708;
    else return 2840853838;
  }
  function Kh(j) {
    if (j <= 15) return 1352829926;
    else if (j <= 31) return 1548603684;
    else if (j <= 47) return 1836072691;
    else if (j <= 63) return 2053994217;
    else return 0;
  }
  var r = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ];
  var rh = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ];
  var s = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ];
  var sh = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
});
var require_hmac = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var utils = require_utils();
  var assert = require_minimalistic_assert();
  function Hmac(hash, key, enc) {
    if (!(this instanceof Hmac)) return new Hmac(hash, key, enc);
    this.Hash = hash;
    this.blockSize = hash.blockSize / 8;
    this.outSize = hash.outSize / 8;
    this.inner = null;
    this.outer = null;
    this._init(utils.toArray(key, enc));
  }
  module2.exports = Hmac;
  Hmac.prototype._init = function init(key) {
    if (key.length > this.blockSize) key = new this.Hash().update(key).digest();
    assert(key.length <= this.blockSize);
    for (var i = key.length; i < this.blockSize; i++) key.push(0);
    for (i = 0; i < key.length; i++) key[i] ^= 54;
    this.inner = new this.Hash().update(key);
    for (i = 0; i < key.length; i++) key[i] ^= 106;
    this.outer = new this.Hash().update(key);
  };
  Hmac.prototype.update = function update(msg, enc) {
    this.inner.update(msg, enc);
    return this;
  };
  Hmac.prototype.digest = function digest(enc) {
    this.outer.update(this.inner.digest());
    return this.outer.digest(enc);
  };
});
var import_hash = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin((exports2) => {
  var hash = exports2;
  hash.utils = require_utils();
  hash.common = require_common$1();
  hash.sha = require_sha();
  hash.ripemd = require_ripemd();
  hash.hmac = require_hmac();
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
}))(), 1);
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = "";
    let i = size | 0;
    while (i--) id += alphabet[Math.random() * alphabet.length | 0];
    return id;
  };
};
var nanoid = (size = 21) => {
  let id = "";
  let i = size | 0;
  while (i--) id += urlAlphabet[Math.random() * 64 | 0];
  return id;
};
var convertInchesToTwip = (inches) => Math.floor(inches * 72 * 20);
var uniqueNumericIdCreator = (initial = 0) => {
  let currentCount = initial;
  return () => ++currentCount;
};
var abstractNumUniqueNumericIdGen = () => uniqueNumericIdCreator();
var concreteNumUniqueNumericIdGen = () => uniqueNumericIdCreator(1);
var docPropertiesUniqueNumericIdGen = () => uniqueNumericIdCreator();
var bookmarkUniqueNumericIdGen = () => uniqueNumericIdCreator();
var uniqueId = () => nanoid().toLowerCase();
var hashedId = (data) => import_hash.default.sha1().update(data instanceof ArrayBuffer ? new Uint8Array(data) : data).digest("hex");
var generateUuidPart = (count) => customAlphabet("1234567890abcdef", count)();
var uniqueUuid = () => `${generateUuidPart(8)}-${generateUuidPart(4)}-${generateUuidPart(4)}-${generateUuidPart(4)}-${generateUuidPart(12)}`;
var encodeUtf8 = (str) => new Uint8Array(new TextEncoder().encode(str));
var HorizontalPositionRelativeFrom = {
  /**
  * ## Character
  *
  * Specifies that the horizontal positioning shall be relative to the position of the anchor within its run content.
  */
  CHARACTER: "character",
  /**
  * ## Column
  *
  * Specifies that the horizontal positioning shall be relative to the extents of the column which contains its anchor.
  */
  COLUMN: "column",
  /**
  * ## Inside Margin
  *
  * Specifies that the horizontal positioning shall be relative to the inside margin of the current page (the left margin on odd pages, right on even pages).
  */
  INSIDE_MARGIN: "insideMargin",
  /**
  * ## Left Margin
  *
  * Specifies that the horizontal positioning shall be relative to the left margin of the page.
  */
  LEFT_MARGIN: "leftMargin",
  /**
  * ## Page Margin
  *
  * Specifies that the horizontal positioning shall be relative to the page margins.
  */
  MARGIN: "margin",
  /**
  * ## Outside Margin
  *
  * Specifies that the horizontal positioning shall be relative to the outside margin of the current page (the right margin on odd pages, left on even pages).
  */
  OUTSIDE_MARGIN: "outsideMargin",
  /**
  * ## Page Edge
  *
  * Specifies that the horizontal positioning shall be relative to the edge of the page.
  */
  PAGE: "page",
  /**
  * ## Right Margin
  *
  * Specifies that the horizontal positioning shall be relative to the right margin of the page.
  */
  RIGHT_MARGIN: "rightMargin"
};
var VerticalPositionRelativeFrom = {
  /**
  * ## Bottom Margin
  *
  * Specifies that the vertical positioning shall be relative to the bottom margin of the current page.
  */
  BOTTOM_MARGIN: "bottomMargin",
  /**
  * ## Inside Margin
  *
  * Specifies that the vertical positioning shall be relative to the inside margin of the current page.
  */
  INSIDE_MARGIN: "insideMargin",
  /**
  * ## Line
  *
  * Specifies that the vertical positioning shall be relative to the line containing the anchor character.
  */
  LINE: "line",
  /**
  * ## Page Margin
  *
  * Specifies that the vertical positioning shall be relative to the page margins.
  */
  MARGIN: "margin",
  /**
  * ## Outside Margin
  *
  * Specifies that the vertical positioning shall be relative to the outside margin of the current page.
  */
  OUTSIDE_MARGIN: "outsideMargin",
  /**
  * ## Page Edge
  *
  * Specifies that the vertical positioning shall be relative to the edge of the page.
  */
  PAGE: "page",
  /**
  * ## Paragraph
  *
  * Specifies that the vertical positioning shall be relative to the paragraph which contains the drawing anchor.
  */
  PARAGRAPH: "paragraph",
  /**
  * ## Top Margin
  *
  * Specifies that the vertical positioning shall be relative to the top margin of the current page.
  */
  TOP_MARGIN: "topMargin"
};
var createSimplePos = () => new BuilderElement({
  name: "wp:simplePos",
  attributes: {
    x: {
      key: "x",
      value: 0
    },
    y: {
      key: "y",
      value: 0
    }
  }
});
var createAlign = (value) => new BuilderElement({
  name: "wp:align",
  children: [value]
});
var createPositionOffset = (offsetValue) => new BuilderElement({
  name: "wp:posOffset",
  children: [offsetValue.toString()]
});
var createHorizontalPosition = ({ relative, align, offset }) => new BuilderElement({
  name: "wp:positionH",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: relative !== null && relative !== void 0 ? relative : HorizontalPositionRelativeFrom.PAGE
  } },
  children: [(() => {
    if (align) return createAlign(align);
    else if (offset !== void 0) return createPositionOffset(offset);
    else throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
});
var createVerticalPosition = ({ relative, align, offset }) => new BuilderElement({
  name: "wp:positionV",
  attributes: { relativeFrom: {
    key: "relativeFrom",
    value: relative !== null && relative !== void 0 ? relative : VerticalPositionRelativeFrom.PAGE
  } },
  children: [(() => {
    if (align) return createAlign(align);
    else if (offset !== void 0) return createPositionOffset(offset);
    else throw new Error("There is no configuration provided for floating position (Align or offset)");
  })()]
});
var createBodyProperties = (options2 = {}) => {
  var _options$margins, _options$margins2, _options$margins3, _options$margins4;
  return new BuilderElement({
    name: "wps:bodyPr",
    attributes: {
      lIns: {
        key: "lIns",
        value: (_options$margins = options2.margins) === null || _options$margins === void 0 ? void 0 : _options$margins.left
      },
      rIns: {
        key: "rIns",
        value: (_options$margins2 = options2.margins) === null || _options$margins2 === void 0 ? void 0 : _options$margins2.right
      },
      tIns: {
        key: "tIns",
        value: (_options$margins3 = options2.margins) === null || _options$margins3 === void 0 ? void 0 : _options$margins3.top
      },
      bIns: {
        key: "bIns",
        value: (_options$margins4 = options2.margins) === null || _options$margins4 === void 0 ? void 0 : _options$margins4.bottom
      },
      anchor: {
        key: "anchor",
        value: options2.verticalAnchor
      }
    },
    children: [...options2.noAutoFit ? [new OnOffElement("a:noAutofit", options2.noAutoFit)] : []]
  });
};
var createNonVisualShapeProperties = (options2 = { txBox: "1" }) => new BuilderElement({
  name: "wps:cNvSpPr",
  attributes: { txBox: {
    key: "txBox",
    value: options2.txBox
  } }
});
var createTextBoxContent = (children) => new BuilderElement({
  name: "w:txbxContent",
  children: [...children]
});
var createWpsTextBox = (children) => new BuilderElement({
  name: "wps:txbx",
  children: [createTextBoxContent(children)]
});
var ExtentsAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      cx: "cx",
      cy: "cy"
    });
  }
};
var Extents = class extends XmlComponent {
  constructor(x, y) {
    super("a:ext");
    _defineProperty(this, "attributes", void 0);
    this.attributes = new ExtentsAttributes({
      cx: x,
      cy: y
    });
    this.root.push(this.attributes);
  }
};
var OffsetAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      x: "x",
      y: "y"
    });
  }
};
var Offset = class extends XmlComponent {
  constructor(x, y) {
    super("a:off");
    this.root.push(new OffsetAttributes({
      x: x !== null && x !== void 0 ? x : 0,
      y: y !== null && y !== void 0 ? y : 0
    }));
  }
};
var FormAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      flipVertical: "flipV",
      flipHorizontal: "flipH",
      rotation: "rot"
    });
  }
};
var Form = class extends XmlComponent {
  constructor(options2) {
    var _options$flip, _options$flip2, _options$offset, _options$offset2;
    super("a:xfrm");
    _defineProperty(this, "extents", void 0);
    _defineProperty(this, "offset", void 0);
    this.root.push(new FormAttributes({
      flipVertical: (_options$flip = options2.flip) === null || _options$flip === void 0 ? void 0 : _options$flip.vertical,
      flipHorizontal: (_options$flip2 = options2.flip) === null || _options$flip2 === void 0 ? void 0 : _options$flip2.horizontal,
      rotation: options2.rotation
    }));
    this.offset = new Offset((_options$offset = options2.offset) === null || _options$offset === void 0 || (_options$offset = _options$offset.emus) === null || _options$offset === void 0 ? void 0 : _options$offset.x, (_options$offset2 = options2.offset) === null || _options$offset2 === void 0 || (_options$offset2 = _options$offset2.emus) === null || _options$offset2 === void 0 ? void 0 : _options$offset2.y);
    this.extents = new Extents(options2.emus.x, options2.emus.y);
    this.root.push(this.offset);
    this.root.push(this.extents);
  }
};
var createNoFill = () => new BuilderElement({ name: "a:noFill" });
var createSolidRgbColor = (options2) => new BuilderElement({
  name: "a:srgbClr",
  attributes: { value: {
    key: "val",
    value: options2.value
  } }
});
var createSchemeColor = (options2) => new BuilderElement({
  name: "a:schemeClr",
  attributes: { value: {
    key: "val",
    value: options2.value
  } }
});
var createSolidFill = (options2) => new BuilderElement({
  name: "a:solidFill",
  children: [options2.type === "rgb" ? createSolidRgbColor(options2) : createSchemeColor(options2)]
});
var createOutline = (options2) => new BuilderElement({
  name: "a:ln",
  attributes: {
    width: {
      key: "w",
      value: options2.width
    },
    cap: {
      key: "cap",
      value: options2.cap
    },
    compoundLine: {
      key: "cmpd",
      value: options2.compoundLine
    },
    align: {
      key: "algn",
      value: options2.align
    }
  },
  children: [options2.type === "noFill" ? createNoFill() : options2.solidFillType === "rgb" ? createSolidFill({
    type: "rgb",
    value: options2.value
  }) : createSolidFill({
    type: "scheme",
    value: options2.value
  })]
});
var AdjustmentValues = class extends XmlComponent {
  constructor() {
    super("a:avLst");
  }
};
var PresetGeometryAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { prst: "prst" });
  }
};
var PresetGeometry = class extends XmlComponent {
  constructor() {
    super("a:prstGeom");
    this.root.push(new PresetGeometryAttributes({ prst: "rect" }));
    this.root.push(new AdjustmentValues());
  }
};
var ShapePropertiesAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { bwMode: "bwMode" });
  }
};
var ShapeProperties = class extends XmlComponent {
  constructor({ element, outline, solidFill, transform }) {
    super(`${element}:spPr`);
    _defineProperty(this, "form", void 0);
    this.root.push(new ShapePropertiesAttributes({ bwMode: "auto" }));
    this.form = new Form(transform);
    this.root.push(this.form);
    this.root.push(new PresetGeometry());
    if (outline) {
      this.root.push(createNoFill());
      this.root.push(createOutline(outline));
    }
    if (solidFill) this.root.push(createSolidFill(solidFill));
  }
};
var createWpsShape = (options2) => new BuilderElement({
  name: "wps:wsp",
  children: [
    createNonVisualShapeProperties(options2.nonVisualProperties),
    new ShapeProperties({
      element: "wps",
      transform: options2.transformation,
      outline: options2.outline,
      solidFill: options2.solidFill
    }),
    createWpsTextBox(options2.children),
    createBodyProperties(options2.bodyProperties)
  ]
});
var GraphicDataAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { uri: "uri" });
  }
};
var createSvgBlip = (mediaData) => new BuilderElement({
  name: "asvg:svgBlip",
  attributes: {
    asvg: {
      key: "xmlns:asvg",
      value: "http://schemas.microsoft.com/office/drawing/2016/SVG/main"
    },
    embed: {
      key: "r:embed",
      value: `rId{${mediaData.fileName}}`
    }
  }
});
var createExtention = (mediaData) => new BuilderElement({
  name: "a:ext",
  attributes: { uri: {
    key: "uri",
    value: "{96DAC541-7B7A-43D3-8B79-37D633B846F1}"
  } },
  children: [createSvgBlip(mediaData)]
});
var createExtentionList = (mediaData) => new BuilderElement({
  name: "a:extLst",
  children: [createExtention(mediaData)]
});
var createBlip = (mediaData) => new BuilderElement({
  name: "a:blip",
  attributes: {
    embed: {
      key: "r:embed",
      value: `rId{${mediaData.type === "svg" ? mediaData.fallback.fileName : mediaData.fileName}}`
    },
    cstate: {
      key: "cstate",
      value: "none"
    }
  },
  children: mediaData.type === "svg" ? [createExtentionList(mediaData)] : []
});
var SourceRectangle = class extends XmlComponent {
  constructor() {
    super("a:srcRect");
  }
};
var FillRectangle = class extends XmlComponent {
  constructor() {
    super("a:fillRect");
  }
};
var Stretch = class extends XmlComponent {
  constructor() {
    super("a:stretch");
    this.root.push(new FillRectangle());
  }
};
var BlipFill = class extends XmlComponent {
  constructor(mediaData) {
    super("pic:blipFill");
    this.root.push(createBlip(mediaData));
    this.root.push(new SourceRectangle());
    this.root.push(new Stretch());
  }
};
var PicLocksAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      noChangeAspect: "noChangeAspect",
      noChangeArrowheads: "noChangeArrowheads"
    });
  }
};
var PicLocks = class extends XmlComponent {
  constructor() {
    super("a:picLocks");
    this.root.push(new PicLocksAttributes({
      noChangeAspect: 1,
      noChangeArrowheads: 1
    }));
  }
};
var ChildNonVisualProperties = class extends XmlComponent {
  constructor() {
    super("pic:cNvPicPr");
    this.root.push(new PicLocks());
  }
};
var createHyperlinkClick = (linkId, hasXmlNs) => new BuilderElement({
  name: "a:hlinkClick",
  attributes: _objectSpread2(_objectSpread2({}, hasXmlNs ? { xmlns: {
    key: "xmlns:a",
    value: "http://schemas.openxmlformats.org/drawingml/2006/main"
  } } : {}), {}, { id: {
    key: "r:id",
    value: `rId${linkId}`
  } })
});
var NonVisualPropertiesAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      id: "id",
      name: "name",
      descr: "descr"
    });
  }
};
var NonVisualProperties = class extends XmlComponent {
  constructor() {
    super("pic:cNvPr");
    this.root.push(new NonVisualPropertiesAttributes({
      id: 0,
      name: "",
      descr: ""
    }));
  }
  prepForXml(context) {
    for (let i = context.stack.length - 1; i >= 0; i--) {
      const element = context.stack[i];
      if (!(element instanceof ConcreteHyperlink)) continue;
      this.root.push(createHyperlinkClick(element.linkId, false));
      break;
    }
    return super.prepForXml(context);
  }
};
var NonVisualPicProperties = class extends XmlComponent {
  constructor() {
    super("pic:nvPicPr");
    this.root.push(new NonVisualProperties());
    this.root.push(new ChildNonVisualProperties());
  }
};
var PicAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { xmlns: "xmlns:pic" });
  }
};
var Pic = class extends XmlComponent {
  constructor({ mediaData, transform, outline }) {
    super("pic:pic");
    this.root.push(new PicAttributes({ xmlns: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
    this.root.push(new NonVisualPicProperties());
    this.root.push(new BlipFill(mediaData));
    this.root.push(new ShapeProperties({
      element: "pic",
      transform,
      outline
    }));
  }
};
var createGroupProperties = (transform) => new BuilderElement({
  name: "wpg:grpSpPr",
  children: [new Form(transform)]
});
var createNonVisualGroupProperties = () => new BuilderElement({ name: "wpg:cNvGrpSpPr" });
var createWpgGroup = (options2) => new BuilderElement({
  name: "wpg:wgp",
  children: [
    createNonVisualGroupProperties(),
    createGroupProperties(options2.transformation),
    ...options2.children
  ]
});
var GraphicData = class extends XmlComponent {
  constructor({ mediaData, transform, outline, solidFill }) {
    super("a:graphicData");
    if (mediaData.type === "wps") {
      this.root.push(new GraphicDataAttributes({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" }));
      const wps = createWpsShape(_objectSpread2(_objectSpread2({}, mediaData.data), {}, {
        transformation: transform,
        outline,
        solidFill
      }));
      this.root.push(wps);
    } else if (mediaData.type === "wpg") {
      this.root.push(new GraphicDataAttributes({ uri: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" }));
      const wpg = createWpgGroup({
        children: mediaData.children.map((child) => {
          if (child.type === "wps") return createWpsShape(_objectSpread2(_objectSpread2({}, child.data), {}, {
            transformation: child.transformation,
            outline: child.outline,
            solidFill: child.solidFill
          }));
          else return new Pic({
            mediaData: child,
            transform: child.transformation,
            outline: child.outline
          });
        }),
        transformation: transform
      });
      this.root.push(wpg);
    } else {
      this.root.push(new GraphicDataAttributes({ uri: "http://schemas.openxmlformats.org/drawingml/2006/picture" }));
      const pic = new Pic({
        mediaData,
        transform,
        outline
      });
      this.root.push(pic);
    }
  }
};
var GraphicAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { a: "xmlns:a" });
  }
};
var Graphic = class extends XmlComponent {
  constructor({ mediaData, transform, outline, solidFill }) {
    super("a:graphic");
    _defineProperty(this, "data", void 0);
    this.root.push(new GraphicAttributes({ a: "http://schemas.openxmlformats.org/drawingml/2006/main" }));
    this.data = new GraphicData({
      mediaData,
      transform,
      outline,
      solidFill
    });
    this.root.push(this.data);
  }
};
var TextWrappingType = {
  NONE: 0,
  SQUARE: 1,
  TIGHT: 2,
  TOP_AND_BOTTOM: 3
};
var TextWrappingSide = {
  /** Text wraps on both sides of the drawing */
  BOTH_SIDES: "bothSides",
  /** Text wraps only on the left side */
  LEFT: "left",
  /** Text wraps only on the right side */
  RIGHT: "right",
  /** Text wraps on the side with more space */
  LARGEST: "largest"
};
var createWrapNone = () => new BuilderElement({ name: "wp:wrapNone" });
var createWrapSquare = (textWrapping, margins = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}) => new BuilderElement({
  name: "wp:wrapSquare",
  attributes: {
    wrapText: {
      key: "wrapText",
      value: textWrapping.side || TextWrappingSide.BOTH_SIDES
    },
    distT: {
      key: "distT",
      value: margins.top
    },
    distB: {
      key: "distB",
      value: margins.bottom
    },
    distL: {
      key: "distL",
      value: margins.left
    },
    distR: {
      key: "distR",
      value: margins.right
    }
  }
});
var createWrapTight = (margins = {
  top: 0,
  bottom: 0
}) => new BuilderElement({
  name: "wp:wrapTight",
  attributes: {
    distT: {
      key: "distT",
      value: margins.top
    },
    distB: {
      key: "distB",
      value: margins.bottom
    }
  }
});
var createWrapTopAndBottom = (margins = {
  top: 0,
  bottom: 0
}) => new BuilderElement({
  name: "wp:wrapTopAndBottom",
  attributes: {
    distT: {
      key: "distT",
      value: margins.top
    },
    distB: {
      key: "distB",
      value: margins.bottom
    }
  }
});
var DocProperties = class extends XmlComponent {
  constructor({ name, description, title, id } = {
    name: "",
    description: "",
    title: ""
  }) {
    super("wp:docPr");
    _defineProperty(this, "docPropertiesUniqueNumericId", docPropertiesUniqueNumericIdGen());
    const attributes = {
      id: {
        key: "id",
        value: id !== null && id !== void 0 ? id : this.docPropertiesUniqueNumericId()
      },
      name: {
        key: "name",
        value: name
      }
    };
    if (description !== null && description !== void 0) attributes.description = {
      key: "descr",
      value: description
    };
    if (title !== null && title !== void 0) attributes.title = {
      key: "title",
      value: title
    };
    this.root.push(new NextAttributeComponent(attributes));
  }
  prepForXml(context) {
    for (let i = context.stack.length - 1; i >= 0; i--) {
      const element = context.stack[i];
      if (!(element instanceof ConcreteHyperlink)) continue;
      this.root.push(createHyperlinkClick(element.linkId, true));
      break;
    }
    return super.prepForXml(context);
  }
};
var createEffectExtent = ({ top, right, bottom, left }) => new BuilderElement({
  name: "wp:effectExtent",
  attributes: {
    top: {
      key: "t",
      value: top
    },
    right: {
      key: "r",
      value: right
    },
    bottom: {
      key: "b",
      value: bottom
    },
    left: {
      key: "l",
      value: left
    }
  }
});
var createExtent = ({ x, y }) => new BuilderElement({
  name: "wp:extent",
  attributes: {
    x: {
      key: "cx",
      value: x
    },
    y: {
      key: "cy",
      value: y
    }
  }
});
var GraphicFrameLockAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      xmlns: "xmlns:a",
      noChangeAspect: "noChangeAspect"
    });
  }
};
var GraphicFrameLocks = class extends XmlComponent {
  constructor() {
    super("a:graphicFrameLocks");
    this.root.push(new GraphicFrameLockAttributes({
      xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
      noChangeAspect: 1
    }));
  }
};
var createGraphicFrameProperties = () => new BuilderElement({
  name: "wp:cNvGraphicFramePr",
  children: [new GraphicFrameLocks()]
});
var AnchorAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      distT: "distT",
      distB: "distB",
      distL: "distL",
      distR: "distR",
      allowOverlap: "allowOverlap",
      behindDoc: "behindDoc",
      layoutInCell: "layoutInCell",
      locked: "locked",
      relativeHeight: "relativeHeight",
      simplePos: "simplePos"
    });
  }
};
var Anchor = class extends XmlComponent {
  constructor({ mediaData, transform, drawingOptions }) {
    super("wp:anchor");
    const floating = _objectSpread2({
      allowOverlap: true,
      behindDocument: false,
      lockAnchor: false,
      layoutInCell: true,
      verticalPosition: {},
      horizontalPosition: {}
    }, drawingOptions.floating);
    this.root.push(new AnchorAttributes({
      distT: floating.margins ? floating.margins.top || 0 : 0,
      distB: floating.margins ? floating.margins.bottom || 0 : 0,
      distL: floating.margins ? floating.margins.left || 0 : 0,
      distR: floating.margins ? floating.margins.right || 0 : 0,
      simplePos: "0",
      allowOverlap: floating.allowOverlap === true ? "1" : "0",
      behindDoc: floating.behindDocument === true ? "1" : "0",
      locked: floating.lockAnchor === true ? "1" : "0",
      layoutInCell: floating.layoutInCell === true ? "1" : "0",
      relativeHeight: floating.zIndex ? floating.zIndex : transform.emus.y
    }));
    this.root.push(createSimplePos());
    this.root.push(createHorizontalPosition(floating.horizontalPosition));
    this.root.push(createVerticalPosition(floating.verticalPosition));
    this.root.push(createExtent({
      x: transform.emus.x,
      y: transform.emus.y
    }));
    this.root.push(createEffectExtent({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }));
    if (drawingOptions.floating !== void 0 && drawingOptions.floating.wrap !== void 0) switch (drawingOptions.floating.wrap.type) {
      case TextWrappingType.SQUARE:
        this.root.push(createWrapSquare(drawingOptions.floating.wrap, drawingOptions.floating.margins));
        break;
      case TextWrappingType.TIGHT:
        this.root.push(createWrapTight(drawingOptions.floating.margins));
        break;
      case TextWrappingType.TOP_AND_BOTTOM:
        this.root.push(createWrapTopAndBottom(drawingOptions.floating.margins));
        break;
      case TextWrappingType.NONE:
      default:
        this.root.push(createWrapNone());
    }
    else this.root.push(createWrapNone());
    this.root.push(new DocProperties(drawingOptions.docProperties));
    this.root.push(createGraphicFrameProperties());
    this.root.push(new Graphic({
      mediaData,
      transform,
      outline: drawingOptions.outline,
      solidFill: drawingOptions.solidFill
    }));
  }
};
var createInline = ({ mediaData, transform, docProperties, outline, solidFill }) => {
  var _outline$width, _outline$width2, _outline$width3, _outline$width4;
  return new BuilderElement({
    name: "wp:inline",
    attributes: {
      distanceTop: {
        key: "distT",
        value: 0
      },
      distanceBottom: {
        key: "distB",
        value: 0
      },
      distanceLeft: {
        key: "distL",
        value: 0
      },
      distanceRight: {
        key: "distR",
        value: 0
      }
    },
    children: [
      createExtent({
        x: transform.emus.x,
        y: transform.emus.y
      }),
      createEffectExtent(outline ? {
        top: ((_outline$width = outline.width) !== null && _outline$width !== void 0 ? _outline$width : 9525) * 2,
        right: ((_outline$width2 = outline.width) !== null && _outline$width2 !== void 0 ? _outline$width2 : 9525) * 2,
        bottom: ((_outline$width3 = outline.width) !== null && _outline$width3 !== void 0 ? _outline$width3 : 9525) * 2,
        left: ((_outline$width4 = outline.width) !== null && _outline$width4 !== void 0 ? _outline$width4 : 9525) * 2
      } : {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }),
      new DocProperties(docProperties),
      createGraphicFrameProperties(),
      new Graphic({
        mediaData,
        transform,
        outline,
        solidFill
      })
    ]
  });
};
var Drawing = class extends XmlComponent {
  constructor(imageData, drawingOptions = {}) {
    super("w:drawing");
    if (!drawingOptions.floating) this.root.push(createInline({
      mediaData: imageData,
      transform: imageData.transformation,
      docProperties: drawingOptions.docProperties,
      outline: drawingOptions.outline,
      solidFill: drawingOptions.solidFill
    }));
    else this.root.push(new Anchor({
      mediaData: imageData,
      transform: imageData.transformation,
      drawingOptions
    }));
  }
};
var convertDataURIToBinary = (dataURI) => {
  const base64Index = dataURI.indexOf(";base64,");
  const base64IndexWithOffset = base64Index === -1 ? 0 : base64Index + 8;
  return new Uint8Array(atob(dataURI.substring(base64IndexWithOffset)).split("").map((c) => c.charCodeAt(0)));
};
var standardizeData = (data) => typeof data === "string" ? convertDataURIToBinary(data) : data;
var createImageData = (options2, key) => ({
  data: standardizeData(options2.data),
  fileName: key,
  transformation: {
    pixels: {
      x: Math.round(options2.transformation.width),
      y: Math.round(options2.transformation.height)
    },
    emus: {
      x: Math.round(options2.transformation.width * 9525),
      y: Math.round(options2.transformation.height * 9525)
    },
    flip: options2.transformation.flip,
    rotation: options2.transformation.rotation ? options2.transformation.rotation * 6e4 : void 0
  }
});
var ImageRun = class extends XmlComponent {
  constructor(options2) {
    var _super = (..._args) => (super(..._args), _defineProperty(this, "imageData", void 0), this);
    const key = `${hashedId(options2.data)}.${options2.type}`;
    const imageData = options2.type === "svg" ? _objectSpread2(_objectSpread2({ type: options2.type }, createImageData(options2, key)), {}, { fallback: _objectSpread2({ type: options2.fallback.type }, createImageData(_objectSpread2(_objectSpread2({}, options2.fallback), {}, { transformation: options2.transformation }), `${hashedId(options2.fallback.data)}.${options2.fallback.type}`)) }) : _objectSpread2({ type: options2.type }, createImageData(options2, key));
    const drawing = new Drawing(imageData, {
      floating: options2.floating,
      docProperties: options2.altText,
      outline: options2.outline
    });
    const run = new Run({ children: [drawing] });
    if (options2.insertion) {
      _super("w:ins");
      this.root.push(new ChangeAttributes({
        id: options2.insertion.id,
        author: options2.insertion.author,
        date: options2.insertion.date
      }));
      this.addChildElement(run);
    } else if (options2.deletion) {
      _super("w:del");
      this.root.push(new ChangeAttributes({
        id: options2.deletion.id,
        author: options2.deletion.author,
        date: options2.deletion.date
      }));
      this.addChildElement(run);
    } else {
      _super("w:r");
      this.root.push(new RunProperties({}));
      this.root.push(drawing);
    }
    this.imageData = imageData;
  }
  prepForXml(context) {
    context.file.Media.addImage(this.imageData.fileName, this.imageData);
    if (this.imageData.type === "svg") context.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback);
    return super.prepForXml(context);
  }
};
var RelationshipsAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { xmlns: "xmlns" });
  }
};
var TargetModeType = {
  /** Target is external to the package (e.g., hyperlink to a URL) */
  EXTERNAL: "External"
};
var createRelationship = (id, type, target, targetMode) => new BuilderElement({
  name: "Relationship",
  attributes: {
    id: {
      key: "Id",
      value: id
    },
    type: {
      key: "Type",
      value: type
    },
    target: {
      key: "Target",
      value: target
    },
    targetMode: {
      key: "TargetMode",
      value: targetMode
    }
  }
});
var Relationships = class extends XmlComponent {
  constructor() {
    super("Relationships");
    this.root.push(new RelationshipsAttributes({ xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" }));
  }
  /**
  * Creates a new relationship to another part in the package.
  *
  * @param id - Unique identifier for this relationship (will be prefixed with "rId")
  * @param type - Relationship type URI (e.g., image, header, hyperlink)
  * @param target - Path to the target part
  * @param targetMode - Optional mode indicating if target is external
  */
  addRelationship(id, type, target, targetMode) {
    this.root.push(createRelationship(`rId${id}`, type, target, targetMode));
  }
  /**
  * Gets the count of relationships in this collection.
  * Excludes the attributes element from the count.
  */
  get RelationshipCount() {
    return this.root.length - 1;
  }
};
var CommentAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      id: "w:id",
      initials: "w:initials",
      author: "w:author",
      date: "w:date"
    });
  }
};
var RootCommentsAttributes = class extends XmlAttributeComponent {
  constructor(..._args3) {
    super(..._args3);
    _defineProperty(this, "xmlKeys", {
      "xmlns:cx": "xmlns:cx",
      "xmlns:cx1": "xmlns:cx1",
      "xmlns:cx2": "xmlns:cx2",
      "xmlns:cx3": "xmlns:cx3",
      "xmlns:cx4": "xmlns:cx4",
      "xmlns:cx5": "xmlns:cx5",
      "xmlns:cx6": "xmlns:cx6",
      "xmlns:cx7": "xmlns:cx7",
      "xmlns:cx8": "xmlns:cx8",
      "xmlns:mc": "xmlns:mc",
      "xmlns:aink": "xmlns:aink",
      "xmlns:am3d": "xmlns:am3d",
      "xmlns:o": "xmlns:o",
      "xmlns:r": "xmlns:r",
      "xmlns:m": "xmlns:m",
      "xmlns:v": "xmlns:v",
      "xmlns:wp14": "xmlns:wp14",
      "xmlns:wp": "xmlns:wp",
      "xmlns:w10": "xmlns:w10",
      "xmlns:w": "xmlns:w",
      "xmlns:w14": "xmlns:w14",
      "xmlns:w15": "xmlns:w15",
      "xmlns:w16cex": "xmlns:w16cex",
      "xmlns:w16cid": "xmlns:w16cid",
      "xmlns:w16": "xmlns:w16",
      "xmlns:w16sdtdh": "xmlns:w16sdtdh",
      "xmlns:w16se": "xmlns:w16se",
      "xmlns:wpg": "xmlns:wpg",
      "xmlns:wpi": "xmlns:wpi",
      "xmlns:wne": "xmlns:wne",
      "xmlns:wps": "xmlns:wps"
    });
  }
};
var Comment = class extends XmlComponent {
  constructor({ id, initials, author, date = /* @__PURE__ */ new Date(), children }, paraId) {
    super("w:comment");
    _defineProperty(this, "paraId", void 0);
    this.paraId = paraId;
    this.root.push(new CommentAttributes({
      id,
      initials,
      author,
      date: date.toISOString()
    }));
    for (const child of children) this.root.push(child);
  }
  /**
  * Serializes this comment to XML, injecting w14:paraId and w14:textId into the last
  * paragraph when threading is active. These attributes link the comment to its
  * corresponding w15:commentEx entry in commentsExtended.xml.
  */
  prepForXml(context) {
    const result = super.prepForXml(context);
    if (!result || !this.paraId) return result;
    const commentChildren = result["w:comment"];
    if (!Array.isArray(commentChildren)) return result;
    for (let i = commentChildren.length - 1; i >= 0; i--) {
      const child = commentChildren[i];
      if (child && typeof child === "object" && "w:p" in child) {
        const pChildren = child["w:p"];
        if (Array.isArray(pChildren)) pChildren.unshift({ _attr: {
          "w14:paraId": this.paraId,
          "w14:textId": this.paraId
        } });
        break;
      }
    }
    return result;
  }
};
var commentIdToParaId = (id) => (id + 1).toString(16).toUpperCase().padStart(8, "0");
var Comments = class extends XmlComponent {
  constructor({ children }) {
    super("w:comments");
    _defineProperty(this, "relationships", void 0);
    _defineProperty(this, "threadData", void 0);
    this.root.push(new RootCommentsAttributes({
      "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex",
      "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
      "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
      "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
      "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
      "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
      "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
      "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
      "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink",
      "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d",
      "xmlns:o": "urn:schemas-microsoft-com:office:office",
      "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
      "xmlns:v": "urn:schemas-microsoft-com:vml",
      "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      "xmlns:w10": "urn:schemas-microsoft-com:office:word",
      "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex",
      "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml",
      "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
      "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex",
      "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml",
      "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
    }));
    if (children.some((child) => child.parentId !== void 0)) {
      const idToParaId = new Map(children.map((child) => [child.id, commentIdToParaId(child.id)]));
      for (const child of children) this.root.push(new Comment(child, idToParaId.get(child.id)));
      this.threadData = children.map((child) => ({
        paraId: idToParaId.get(child.id),
        parentParaId: child.parentId !== void 0 ? idToParaId.get(child.parentId) : void 0,
        done: child.resolved
      }));
    } else for (const child of children) this.root.push(new Comment(child));
    this.relationships = new Relationships();
  }
  get Relationships() {
    return this.relationships;
  }
  /** Thread data for commentsExtended.xml, or undefined when no comments use parentId. */
  get ThreadData() {
    return this.threadData;
  }
};
var CommentsExtendedAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      "xmlns:wpc": "xmlns:wpc",
      "xmlns:mc": "xmlns:mc",
      "xmlns:w15": "xmlns:w15",
      "mc:Ignorable": "mc:Ignorable"
    });
  }
};
var CommentExAttributes = class extends XmlAttributeComponent {
  constructor(..._args2) {
    super(..._args2);
    _defineProperty(this, "xmlKeys", {
      paraId: "w15:paraId",
      paraIdParent: "w15:paraIdParent",
      done: "w15:done"
    });
  }
};
var CommentEx = class extends XmlComponent {
  constructor(options2) {
    super("w15:commentEx");
    this.root.push(new CommentExAttributes({
      paraId: options2.paraId,
      paraIdParent: options2.parentParaId,
      done: options2.done !== void 0 ? options2.done ? "1" : "0" : void 0
    }));
  }
};
var CommentsExtended = class extends XmlComponent {
  constructor(threadData) {
    super("w15:commentsEx");
    this.root.push(new CommentsExtendedAttributes({
      "xmlns:wpc": "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
      "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
      "mc:Ignorable": "w15"
    }));
    for (const data of threadData) this.root.push(new CommentEx(data));
  }
};
var EndnoteReference = class extends EmptyElement {
  constructor() {
    super("w:endnoteRef");
  }
};
var Tab = class extends EmptyElement {
  constructor() {
    super("w:tab");
  }
};
var PageBreakBefore = class extends XmlComponent {
  constructor() {
    super("w:pageBreakBefore");
  }
};
var LineRuleType = {
  /** Line spacing is at least the specified value */
  AT_LEAST: "atLeast",
  /** Line spacing is exactly the specified value */
  EXACTLY: "exactly",
  /** Line spacing is exactly the specified value (alias for EXACTLY) */
  EXACT: "exact",
  /** Line spacing is automatically determined based on content */
  AUTO: "auto"
};
var createSpacing = ({ after, before, line, lineRule, beforeAutoSpacing, afterAutoSpacing }) => new BuilderElement({
  name: "w:spacing",
  attributes: {
    after: {
      key: "w:after",
      value: after
    },
    before: {
      key: "w:before",
      value: before
    },
    line: {
      key: "w:line",
      value: line
    },
    lineRule: {
      key: "w:lineRule",
      value: lineRule
    },
    beforeAutoSpacing: {
      key: "w:beforeAutospacing",
      value: beforeAutoSpacing
    },
    afterAutoSpacing: {
      key: "w:afterAutospacing",
      value: afterAutoSpacing
    }
  }
});
var createParagraphStyle = (styleId) => new BuilderElement({
  name: "w:pStyle",
  attributes: { val: {
    key: "w:val",
    value: styleId
  } }
});
var TabStopType = {
  /** Left-aligned tab stop */
  LEFT: "left",
  /** Right-aligned tab stop */
  RIGHT: "right",
  /** Center-aligned tab stop */
  CENTER: "center",
  /** Bar tab stop - inserts a vertical bar at the position */
  BAR: "bar",
  /** Clears a tab stop at the specified position */
  CLEAR: "clear",
  /** Decimal-aligned tab stop - aligns on decimal point */
  DECIMAL: "decimal",
  /** End-aligned tab stop (right-to-left equivalent) */
  END: "end",
  /** List tab stop for numbered lists */
  NUM: "num",
  /** Start-aligned tab stop (left-to-right equivalent) */
  START: "start"
};
var createTabStopItem = ({ type, position, leader }) => new BuilderElement({
  name: "w:tab",
  attributes: {
    val: {
      key: "w:val",
      value: type
    },
    pos: {
      key: "w:pos",
      value: position
    },
    leader: {
      key: "w:leader",
      value: leader
    }
  }
});
var createTabStop = (tabDefinitions) => new BuilderElement({
  name: "w:tabs",
  children: tabDefinitions.map((tabDefinition) => createTabStopItem(tabDefinition))
});
var NumberProperties = class extends XmlComponent {
  constructor(numberId, indentLevel) {
    super("w:numPr");
    this.root.push(new IndentLevel(indentLevel));
    this.root.push(new NumberId(numberId));
  }
};
var IndentLevel = class extends XmlComponent {
  constructor(level) {
    super("w:ilvl");
    if (level > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new Attributes({ val: level }));
  }
};
var NumberId = class extends XmlComponent {
  constructor(id) {
    super("w:numId");
    this.root.push(new Attributes({ val: typeof id === "string" ? `{${id}}` : id }));
  }
};
var FileChild = class extends XmlComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(
      this,
      /** Marker property identifying this as a FileChild */
      "fileChild",
      Symbol()
    );
  }
};
var HyperlinkAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      id: "r:id",
      history: "w:history",
      anchor: "w:anchor"
    });
  }
};
var ConcreteHyperlink = class extends XmlComponent {
  constructor(children, relationshipId, anchor) {
    super("w:hyperlink");
    _defineProperty(this, "linkId", void 0);
    this.linkId = relationshipId;
    const attributes = new HyperlinkAttributes({
      history: 1,
      anchor: anchor ? anchor : void 0,
      id: !anchor ? `rId${this.linkId}` : void 0
    });
    this.root.push(attributes);
    children.forEach((child) => {
      this.root.push(child);
    });
  }
};
var ExternalHyperlink = class extends XmlComponent {
  constructor(options2) {
    super("w:externalHyperlink");
    _defineProperty(this, "options", void 0);
    this.options = options2;
  }
};
var BookmarkStartAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      id: "w:id",
      name: "w:name"
    });
  }
};
var BookmarkEndAttributes = class extends XmlAttributeComponent {
  constructor(..._args2) {
    super(..._args2);
    _defineProperty(this, "xmlKeys", { id: "w:id" });
  }
};
var Bookmark = class {
  constructor(options2) {
    _defineProperty(this, "bookmarkUniqueNumericId", bookmarkUniqueNumericIdGen());
    _defineProperty(this, "start", void 0);
    _defineProperty(this, "children", void 0);
    _defineProperty(this, "end", void 0);
    const linkId = this.bookmarkUniqueNumericId();
    this.start = new BookmarkStart(options2.id, linkId);
    this.children = options2.children;
    this.end = new BookmarkEnd(linkId);
  }
};
var BookmarkStart = class extends XmlComponent {
  constructor(id, linkId) {
    super("w:bookmarkStart");
    const attributes = new BookmarkStartAttributes({
      name: id,
      id: linkId
    });
    this.root.push(attributes);
  }
};
var BookmarkEnd = class extends XmlComponent {
  constructor(linkId) {
    super("w:bookmarkEnd");
    const attributes = new BookmarkEndAttributes({ id: linkId });
    this.root.push(attributes);
  }
};
var createOutlineLevel = (level) => new BuilderElement({
  name: "w:outlineLvl",
  attributes: { val: {
    key: "w:val",
    value: level
  } }
});
var createFontRelationship = ({ id, fontKey, subsetted }, name) => new BuilderElement({
  name,
  attributes: _objectSpread2({ id: {
    key: "r:id",
    value: id
  } }, fontKey ? { fontKey: {
    key: "w:fontKey",
    value: `{${fontKey}}`
  } } : {}),
  children: [...subsetted ? [new OnOffElement("w:subsetted", subsetted)] : []]
});
var createFont = ({ name, altName, panose1, charset, family, notTrueType, pitch, sig, embedRegular, embedBold, embedItalic, embedBoldItalic }) => new BuilderElement({
  name: "w:font",
  attributes: { name: {
    key: "w:name",
    value: name
  } },
  children: [
    ...altName ? [createStringElement("w:altName", altName)] : [],
    ...panose1 ? [createStringElement("w:panose1", panose1)] : [],
    ...charset ? [createStringElement("w:charset", charset)] : [],
    ...family ? [createStringElement("w:family", family)] : [],
    ...notTrueType ? [new OnOffElement("w:notTrueType", notTrueType)] : [],
    ...pitch ? [createStringElement("w:pitch", pitch)] : [],
    ...sig ? [new BuilderElement({
      name: "w:sig",
      attributes: {
        usb0: {
          key: "w:usb0",
          value: sig.usb0
        },
        usb1: {
          key: "w:usb1",
          value: sig.usb1
        },
        usb2: {
          key: "w:usb2",
          value: sig.usb2
        },
        usb3: {
          key: "w:usb3",
          value: sig.usb3
        },
        csb0: {
          key: "w:csb0",
          value: sig.csb0
        },
        csb1: {
          key: "w:csb1",
          value: sig.csb1
        }
      }
    })] : [],
    ...embedRegular ? [createFontRelationship(embedRegular, "w:embedRegular")] : [],
    ...embedBold ? [createFontRelationship(embedBold, "w:embedBold")] : [],
    ...embedItalic ? [createFontRelationship(embedItalic, "w:embedItalic")] : [],
    ...embedBoldItalic ? [createFontRelationship(embedBoldItalic, "w:embedBoldItalic")] : []
  ]
});
var createRegularFont = ({ name, index, fontKey, characterSet }) => createFont({
  name,
  sig: {
    usb0: "E0002AFF",
    usb1: "C000247B",
    usb2: "00000009",
    usb3: "00000000",
    csb0: "000001FF",
    csb1: "00000000"
  },
  charset: characterSet,
  family: "auto",
  pitch: "variable",
  embedRegular: {
    fontKey,
    id: `rId${index}`
  }
});
var createFontTable = (fonts) => new BuilderElement({
  name: "w:fonts",
  attributes: {
    mc: {
      key: "xmlns:mc",
      value: "http://schemas.openxmlformats.org/markup-compatibility/2006"
    },
    r: {
      key: "xmlns:r",
      value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
    },
    w: {
      key: "xmlns:w",
      value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
    },
    w14: {
      key: "xmlns:w14",
      value: "http://schemas.microsoft.com/office/word/2010/wordml"
    },
    w15: {
      key: "xmlns:w15",
      value: "http://schemas.microsoft.com/office/word/2012/wordml"
    },
    w16cex: {
      key: "xmlns:w16cex",
      value: "http://schemas.microsoft.com/office/word/2018/wordml/cex"
    },
    w16cid: {
      key: "xmlns:w16cid",
      value: "http://schemas.microsoft.com/office/word/2016/wordml/cid"
    },
    w16: {
      key: "xmlns:w16",
      value: "http://schemas.microsoft.com/office/word/2018/wordml"
    },
    w16sdtdh: {
      key: "xmlns:w16sdtdh",
      value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash"
    },
    w16se: {
      key: "xmlns:w16se",
      value: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
    },
    Ignorable: {
      key: "mc:Ignorable",
      value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh"
    }
  },
  children: fonts.map((font2, i) => createRegularFont({
    name: font2.name,
    index: i + 1,
    fontKey: font2.fontKey,
    characterSet: font2.characterSet
  }))
});
var FontWrapper = class {
  constructor(options2) {
    _defineProperty(this, "options", void 0);
    _defineProperty(this, "fontTable", void 0);
    _defineProperty(this, "relationships", void 0);
    _defineProperty(this, "fontOptionsWithKey", []);
    this.options = options2;
    this.fontOptionsWithKey = options2.map((o) => _objectSpread2(_objectSpread2({}, o), {}, { fontKey: uniqueUuid() }));
    this.fontTable = createFontTable(this.fontOptionsWithKey);
    this.relationships = new Relationships();
    for (let i = 0; i < options2.length; i++) this.relationships.addRelationship(i + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font", `fonts/font${i + 1}.odttf`);
  }
  get View() {
    return this.fontTable;
  }
  get Relationships() {
    return this.relationships;
  }
};
var createWordWrap = () => new BuilderElement({
  name: "w:wordWrap",
  attributes: { val: {
    key: "w:val",
    value: 0
  } }
});
var createFrameProperties = (options2) => {
  var _options$space, _options$space2;
  return new BuilderElement({
    name: "w:framePr",
    attributes: {
      anchorLock: {
        key: "w:anchorLock",
        value: options2.anchorLock
      },
      dropCap: {
        key: "w:dropCap",
        value: options2.dropCap
      },
      width: {
        key: "w:w",
        value: options2.width
      },
      height: {
        key: "w:h",
        value: options2.height
      },
      x: {
        key: "w:x",
        value: options2.position ? options2.position.x : void 0
      },
      y: {
        key: "w:y",
        value: options2.position ? options2.position.y : void 0
      },
      anchorHorizontal: {
        key: "w:hAnchor",
        value: options2.anchor.horizontal
      },
      anchorVertical: {
        key: "w:vAnchor",
        value: options2.anchor.vertical
      },
      spaceHorizontal: {
        key: "w:hSpace",
        value: (_options$space = options2.space) === null || _options$space === void 0 ? void 0 : _options$space.horizontal
      },
      spaceVertical: {
        key: "w:vSpace",
        value: (_options$space2 = options2.space) === null || _options$space2 === void 0 ? void 0 : _options$space2.vertical
      },
      rule: {
        key: "w:hRule",
        value: options2.rule
      },
      alignmentX: {
        key: "w:xAlign",
        value: options2.alignment ? options2.alignment.x : void 0
      },
      alignmentY: {
        key: "w:yAlign",
        value: options2.alignment ? options2.alignment.y : void 0
      },
      lines: {
        key: "w:lines",
        value: options2.lines
      },
      wrap: {
        key: "w:wrap",
        value: options2.wrap
      }
    }
  });
};
var ParagraphProperties = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:pPr", options2 === null || options2 === void 0 ? void 0 : options2.includeIfEmpty);
    _defineProperty(this, "numberingReferences", []);
    if (!options2) return this;
    if (options2.heading) this.push(createParagraphStyle(options2.heading));
    if (options2.bullet) this.push(createParagraphStyle("ListParagraph"));
    if (options2.numbering) {
      if (!options2.style && !options2.heading) {
        if (!options2.numbering.custom) this.push(createParagraphStyle("ListParagraph"));
      }
    }
    if (options2.style) this.push(createParagraphStyle(options2.style));
    if (options2.keepNext !== void 0) this.push(new OnOffElement("w:keepNext", options2.keepNext));
    if (options2.keepLines !== void 0) this.push(new OnOffElement("w:keepLines", options2.keepLines));
    if (options2.pageBreakBefore) this.push(new PageBreakBefore());
    if (options2.frame) this.push(createFrameProperties(options2.frame));
    if (options2.widowControl !== void 0) this.push(new OnOffElement("w:widowControl", options2.widowControl));
    if (options2.bullet) this.push(new NumberProperties(1, options2.bullet.level));
    if (options2.numbering) {
      var _options$numbering$in, _options$numbering$in2;
      this.numberingReferences.push({
        reference: options2.numbering.reference,
        instance: (_options$numbering$in = options2.numbering.instance) !== null && _options$numbering$in !== void 0 ? _options$numbering$in : 0
      });
      this.push(new NumberProperties(`${options2.numbering.reference}-${(_options$numbering$in2 = options2.numbering.instance) !== null && _options$numbering$in2 !== void 0 ? _options$numbering$in2 : 0}`, options2.numbering.level));
    } else if (options2.numbering === false) this.push(new NumberProperties(0, 0));
    if (options2.border) this.push(new Border(options2.border));
    if (options2.thematicBreak) this.push(new ThematicBreak());
    if (options2.shading) this.push(createShading(options2.shading));
    if (options2.wordWrap) this.push(createWordWrap());
    if (options2.overflowPunctuation) this.push(new OnOffElement("w:overflowPunct", options2.overflowPunctuation));
    const tabDefinitions = [
      ...options2.rightTabStop !== void 0 ? [{
        type: TabStopType.RIGHT,
        position: options2.rightTabStop
      }] : [],
      ...options2.tabStops ? options2.tabStops : [],
      ...options2.leftTabStop !== void 0 ? [{
        type: TabStopType.LEFT,
        position: options2.leftTabStop
      }] : []
    ];
    if (tabDefinitions.length > 0) this.push(createTabStop(tabDefinitions));
    if (options2.bidirectional !== void 0) this.push(new OnOffElement("w:bidi", options2.bidirectional));
    if (options2.spacing) this.push(createSpacing(options2.spacing));
    if (options2.indent) this.push(createIndent(options2.indent));
    if (options2.contextualSpacing !== void 0) this.push(new OnOffElement("w:contextualSpacing", options2.contextualSpacing));
    if (options2.alignment) this.push(createAlignment(options2.alignment));
    if (options2.outlineLevel !== void 0) this.push(createOutlineLevel(options2.outlineLevel));
    if (options2.suppressLineNumbers !== void 0) this.push(new OnOffElement("w:suppressLineNumbers", options2.suppressLineNumbers));
    if (options2.autoSpaceEastAsianText !== void 0) this.push(new OnOffElement("w:autoSpaceDN", options2.autoSpaceEastAsianText));
    if (options2.run) this.push(new ParagraphRunProperties(options2.run));
    if (options2.revision) this.push(new ParagraphPropertiesChange(options2.revision));
  }
  /**
  * Adds a property element to the paragraph properties.
  *
  * @param item - The XML component to add to the paragraph properties
  */
  push(item) {
    this.root.push(item);
  }
  /**
  * Prepares the paragraph properties for XML serialization.
  *
  * This method creates concrete numbering instances for any numbering references
  * before the properties are converted to XML.
  *
  * @param context - The XML context containing document and file information
  * @returns The prepared XML object, or undefined if the component should be ignored
  */
  prepForXml(context) {
    if (!(context.viewWrapper instanceof FontWrapper)) for (const reference of this.numberingReferences) context.file.Numbering.createConcreteNumberingInstance(reference.reference, reference.instance);
    return super.prepForXml(context);
  }
};
var ParagraphPropertiesChange = class extends XmlComponent {
  constructor(options2) {
    super("w:pPrChange");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
    this.root.push(new ParagraphProperties(_objectSpread2(_objectSpread2({}, options2), {}, { includeIfEmpty: true })));
  }
};
var Paragraph = class extends FileChild {
  constructor(options2) {
    super("w:p");
    _defineProperty(this, "properties", void 0);
    if (typeof options2 === "string") {
      this.properties = new ParagraphProperties({});
      this.root.push(this.properties);
      this.root.push(new TextRun(options2));
      return this;
    }
    this.properties = new ParagraphProperties(options2);
    this.root.push(this.properties);
    if (options2.text) this.root.push(new TextRun(options2.text));
    if (options2.children) for (const child of options2.children) {
      if (child instanceof Bookmark) {
        this.root.push(child.start);
        for (const textRun of child.children) this.root.push(textRun);
        this.root.push(child.end);
        continue;
      }
      this.root.push(child);
    }
  }
  prepForXml(context) {
    for (const element of this.root) if (element instanceof ExternalHyperlink) {
      const index = this.root.indexOf(element);
      const concreteHyperlink = new ConcreteHyperlink(element.options.children, uniqueId());
      context.viewWrapper.Relationships.addRelationship(concreteHyperlink.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", element.options.link, TargetModeType.EXTERNAL);
      this.root[index] = concreteHyperlink;
    }
    return super.prepForXml(context);
  }
  addRunToFront(run) {
    this.root.splice(1, 0, run);
    return this;
  }
};
var createGridCol = (width) => new BuilderElement({
  name: "w:gridCol",
  attributes: width !== void 0 ? { width: {
    key: "w:w",
    value: twipsMeasureValue(width)
  } } : void 0
});
var TableGrid = class extends XmlComponent {
  constructor(widths, revision) {
    super("w:tblGrid");
    for (const width of widths) this.root.push(createGridCol(width));
    if (revision) this.root.push(new TableGridChange(revision));
  }
};
var TableGridChangeAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { id: "w:id" });
  }
};
var TableGridChange = class extends XmlComponent {
  constructor(options2) {
    super("w:tblGridChange");
    this.root.push(new TableGridChangeAttributes({ id: options2.id }));
    this.root.push(new TableGrid(options2.columnWidths));
  }
};
var InsertedTableRow = class extends XmlComponent {
  constructor(options2) {
    super("w:ins");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
  }
};
var DeletedTableRow = class extends XmlComponent {
  constructor(options2) {
    super("w:del");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
  }
};
var InsertedTableCell = class extends XmlComponent {
  constructor(options2) {
    super("w:cellIns");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
  }
};
var DeletedTableCell = class extends XmlComponent {
  constructor(options2) {
    super("w:cellDel");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
  }
};
var CellMergeAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      id: "w:id",
      author: "w:author",
      date: "w:date",
      verticalMerge: "w:vMerge",
      verticalMergeOriginal: "w:vMergeOrig"
    });
  }
};
var CellMerge = class extends XmlComponent {
  constructor(options2) {
    super("w:cellMerge");
    this.root.push(new CellMergeAttributes(options2));
  }
};
var VerticalAlignTable = {
  TOP: "top",
  CENTER: "center",
  BOTTOM: "bottom"
};
var VerticalAlignSection = _objectSpread2(_objectSpread2({}, VerticalAlignTable), {}, { BOTH: "both" });
var VerticalAlign = VerticalAlignSection;
var createVerticalAlign = (value) => new BuilderElement({
  name: "w:vAlign",
  attributes: { verticalAlign: {
    key: "w:val",
    value
  } }
});
var buildMarginChildren = ({ marginUnitType = WidthType.DXA, top, left, bottom, right }) => [
  {
    name: "w:top",
    size: top
  },
  {
    name: "w:left",
    size: left
  },
  {
    name: "w:bottom",
    size: bottom
  },
  {
    name: "w:right",
    size: right
  }
].filter((entry) => entry.size !== void 0).map(({ name, size }) => createTableWidthElement(name, {
  type: marginUnitType,
  size
}));
var createTableCellMargin = (options2) => {
  const children = buildMarginChildren(options2);
  if (children.length === 0) return;
  return new BuilderElement({
    name: "w:tblCellMar",
    children
  });
};
var createCellMargin = (options2) => {
  const children = buildMarginChildren(options2);
  if (children.length === 0) return;
  return new BuilderElement({
    name: "w:tcMar",
    children
  });
};
var WidthType = {
  /** Auto. */
  AUTO: "auto",
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil",
  /** Value is in percentage. */
  PERCENTAGE: "pct"
};
var createTableWidthElement = (name, { type = WidthType.AUTO, size }) => {
  let tableWidthValue = size;
  if (type === WidthType.PERCENTAGE && typeof size === "number") tableWidthValue = `${size}%`;
  return new BuilderElement({
    name,
    attributes: {
      type: {
        key: "w:type",
        value: type
      },
      size: {
        key: "w:w",
        value: measurementOrPercentValue(tableWidthValue)
      }
    }
  });
};
var TableCellBorders = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:tcBorders");
    if (options2.top) this.root.push(createBorderElement("w:top", options2.top));
    if (options2.start) this.root.push(createBorderElement("w:start", options2.start));
    if (options2.left) this.root.push(createBorderElement("w:left", options2.left));
    if (options2.bottom) this.root.push(createBorderElement("w:bottom", options2.bottom));
    if (options2.end) this.root.push(createBorderElement("w:end", options2.end));
    if (options2.right) this.root.push(createBorderElement("w:right", options2.right));
  }
};
var GridSpanAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { val: "w:val" });
  }
};
var GridSpan = class extends XmlComponent {
  constructor(value) {
    super("w:gridSpan");
    this.root.push(new GridSpanAttributes({ val: decimalNumber(value) }));
  }
};
var VerticalMergeType = {
  /**
  * Cell that is merged with upper one.
  * This cell continues a vertical merge started by a cell above it.
  */
  CONTINUE: "continue",
  /**
  * Cell that is starting the vertical merge.
  * This cell begins a new vertical merge region.
  */
  RESTART: "restart"
};
var VerticalMergeAttributes = class extends XmlAttributeComponent {
  constructor(..._args2) {
    super(..._args2);
    _defineProperty(this, "xmlKeys", { val: "w:val" });
  }
};
var VerticalMerge = class extends XmlComponent {
  constructor(value) {
    super("w:vMerge");
    this.root.push(new VerticalMergeAttributes({ val: value }));
  }
};
var TDirectionAttributes = class extends XmlAttributeComponent {
  constructor(..._args3) {
    super(..._args3);
    _defineProperty(this, "xmlKeys", { val: "w:val" });
  }
};
var TDirection = class extends XmlComponent {
  constructor(value) {
    super("w:textDirection");
    this.root.push(new TDirectionAttributes({ val: value }));
  }
};
var TableCellProperties = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:tcPr", options2.includeIfEmpty);
    if (options2.width) this.root.push(createTableWidthElement("w:tcW", options2.width));
    if (options2.columnSpan) this.root.push(new GridSpan(options2.columnSpan));
    if (options2.verticalMerge) this.root.push(new VerticalMerge(options2.verticalMerge));
    else if (options2.rowSpan && options2.rowSpan > 1) this.root.push(new VerticalMerge(VerticalMergeType.RESTART));
    if (options2.borders) this.root.push(new TableCellBorders(options2.borders));
    if (options2.shading) this.root.push(createShading(options2.shading));
    if (options2.margins) {
      const cellMargin = createCellMargin(options2.margins);
      if (cellMargin) this.root.push(cellMargin);
    }
    if (options2.textDirection) this.root.push(new TDirection(options2.textDirection));
    if (options2.verticalAlign) this.root.push(createVerticalAlign(options2.verticalAlign));
    if (options2.insertion) this.root.push(new InsertedTableCell(options2.insertion));
    if (options2.deletion) this.root.push(new DeletedTableCell(options2.deletion));
    if (options2.revision) this.root.push(new TableCellPropertiesChange(options2.revision));
    if (options2.cellMerge) this.root.push(new CellMerge(options2.cellMerge));
  }
};
var TableCellPropertiesChange = class extends XmlComponent {
  constructor(options2) {
    super("w:tcPrChange");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
    this.root.push(new TableCellProperties(_objectSpread2(_objectSpread2({}, options2), {}, { includeIfEmpty: true })));
  }
};
var TableCell = class extends XmlComponent {
  constructor(options2) {
    super("w:tc");
    _defineProperty(this, "options", void 0);
    this.options = options2;
    this.root.push(new TableCellProperties(options2));
    for (const child of options2.children) this.root.push(child);
  }
  prepForXml(context) {
    if (!(this.root[this.root.length - 1] instanceof Paragraph)) this.root.push(new Paragraph({}));
    return super.prepForXml(context);
  }
};
var NONE_BORDER = {
  style: BorderStyle.NONE,
  size: 0,
  color: "auto"
};
var DEFAULT_BORDER = {
  style: BorderStyle.SINGLE,
  size: 4,
  color: "auto"
};
var TableBorders = class extends XmlComponent {
  constructor(options2) {
    var _options$top, _options$left, _options$bottom, _options$right, _options$insideHorizo, _options$insideVertic;
    super("w:tblBorders");
    this.root.push(createBorderElement("w:top", (_options$top = options2.top) !== null && _options$top !== void 0 ? _options$top : DEFAULT_BORDER));
    this.root.push(createBorderElement("w:left", (_options$left = options2.left) !== null && _options$left !== void 0 ? _options$left : DEFAULT_BORDER));
    this.root.push(createBorderElement("w:bottom", (_options$bottom = options2.bottom) !== null && _options$bottom !== void 0 ? _options$bottom : DEFAULT_BORDER));
    this.root.push(createBorderElement("w:right", (_options$right = options2.right) !== null && _options$right !== void 0 ? _options$right : DEFAULT_BORDER));
    this.root.push(createBorderElement("w:insideH", (_options$insideHorizo = options2.insideHorizontal) !== null && _options$insideHorizo !== void 0 ? _options$insideHorizo : DEFAULT_BORDER));
    this.root.push(createBorderElement("w:insideV", (_options$insideVertic = options2.insideVertical) !== null && _options$insideVertic !== void 0 ? _options$insideVertic : DEFAULT_BORDER));
  }
};
_defineProperty(TableBorders, "NONE", {
  top: NONE_BORDER,
  bottom: NONE_BORDER,
  left: NONE_BORDER,
  right: NONE_BORDER,
  insideHorizontal: NONE_BORDER,
  insideVertical: NONE_BORDER
});
var createOverlapElement = (overlap) => new BuilderElement({
  name: "w:tblOverlap",
  attributes: { val: {
    key: "w:val",
    value: overlap
  } }
});
var createTableFloatProperties = ({ horizontalAnchor, verticalAnchor, absoluteHorizontalPosition, relativeHorizontalPosition, absoluteVerticalPosition, relativeVerticalPosition, bottomFromText, topFromText, leftFromText, rightFromText, overlap }) => new BuilderElement({
  name: "w:tblpPr",
  attributes: {
    leftFromText: {
      key: "w:leftFromText",
      value: leftFromText === void 0 ? void 0 : twipsMeasureValue(leftFromText)
    },
    rightFromText: {
      key: "w:rightFromText",
      value: rightFromText === void 0 ? void 0 : twipsMeasureValue(rightFromText)
    },
    topFromText: {
      key: "w:topFromText",
      value: topFromText === void 0 ? void 0 : twipsMeasureValue(topFromText)
    },
    bottomFromText: {
      key: "w:bottomFromText",
      value: bottomFromText === void 0 ? void 0 : twipsMeasureValue(bottomFromText)
    },
    absoluteHorizontalPosition: {
      key: "w:tblpX",
      value: absoluteHorizontalPosition === void 0 ? void 0 : signedTwipsMeasureValue(absoluteHorizontalPosition)
    },
    absoluteVerticalPosition: {
      key: "w:tblpY",
      value: absoluteVerticalPosition === void 0 ? void 0 : signedTwipsMeasureValue(absoluteVerticalPosition)
    },
    horizontalAnchor: {
      key: "w:horzAnchor",
      value: horizontalAnchor
    },
    relativeHorizontalPosition: {
      key: "w:tblpXSpec",
      value: relativeHorizontalPosition
    },
    relativeVerticalPosition: {
      key: "w:tblpYSpec",
      value: relativeVerticalPosition
    },
    verticalAnchor: {
      key: "w:vertAnchor",
      value: verticalAnchor
    }
  },
  children: overlap ? [createOverlapElement(overlap)] : void 0
});
var TableLayoutType = {
  /** Auto-fit layout - column widths are adjusted based on content */
  AUTOFIT: "autofit",
  /** Fixed layout - column widths are fixed as specified */
  FIXED: "fixed"
};
var createTableLayout = (type) => new BuilderElement({
  name: "w:tblLayout",
  attributes: { type: {
    key: "w:type",
    value: type
  } }
});
var CellSpacingType = {
  /** Value is in twentieths of a point */
  DXA: "dxa",
  /** No (empty) value. */
  NIL: "nil"
};
var createTableCellSpacing = ({ type = CellSpacingType.DXA, value }) => new BuilderElement({
  name: "w:tblCellSpacing",
  attributes: {
    type: {
      key: "w:type",
      value: type
    },
    value: {
      key: "w:w",
      value: measurementOrPercentValue(value)
    }
  }
});
var createTableLook = ({ firstRow, lastRow, firstColumn, lastColumn, noHBand, noVBand }) => new BuilderElement({
  name: "w:tblLook",
  attributes: {
    firstRow: {
      key: "w:firstRow",
      value: firstRow
    },
    lastRow: {
      key: "w:lastRow",
      value: lastRow
    },
    firstColumn: {
      key: "w:firstColumn",
      value: firstColumn
    },
    lastColumn: {
      key: "w:lastColumn",
      value: lastColumn
    },
    noHBand: {
      key: "w:noHBand",
      value: noHBand
    },
    noVBand: {
      key: "w:noVBand",
      value: noVBand
    }
  }
});
var TableProperties = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:tblPr", options2.includeIfEmpty);
    if (options2.style) this.root.push(new StringValueElement("w:tblStyle", options2.style));
    if (options2.float) this.root.push(createTableFloatProperties(options2.float));
    if (options2.visuallyRightToLeft !== void 0) this.root.push(new OnOffElement("w:bidiVisual", options2.visuallyRightToLeft));
    if (options2.width) this.root.push(createTableWidthElement("w:tblW", options2.width));
    if (options2.alignment) this.root.push(createAlignment(options2.alignment));
    if (options2.indent) this.root.push(createTableWidthElement("w:tblInd", options2.indent));
    if (options2.borders) this.root.push(new TableBorders(options2.borders));
    if (options2.shading) this.root.push(createShading(options2.shading));
    if (options2.layout) this.root.push(createTableLayout(options2.layout));
    if (options2.cellMargin) {
      const cellMargin = createTableCellMargin(options2.cellMargin);
      if (cellMargin) this.root.push(cellMargin);
    }
    if (options2.tableLook) this.root.push(createTableLook(options2.tableLook));
    if (options2.cellSpacing) this.root.push(createTableCellSpacing(options2.cellSpacing));
    if (options2.revision) this.root.push(new TablePropertiesChange(options2.revision));
  }
};
var TablePropertiesChange = class extends XmlComponent {
  constructor(options2) {
    super("w:tblPrChange");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
    this.root.push(new TableProperties(_objectSpread2(_objectSpread2({}, options2), {}, { includeIfEmpty: true })));
  }
};
var Table = class extends FileChild {
  constructor({ rows, width, columnWidths = Array(Math.max(...rows.map((row) => row.CellCount))).fill(100), columnWidthsRevision, margins, indent, float, layout, style, borders, alignment, visuallyRightToLeft, tableLook, cellSpacing, revision }) {
    super("w:tbl");
    this.root.push(new TableProperties({
      borders: borders !== null && borders !== void 0 ? borders : {},
      width: width !== null && width !== void 0 ? width : { size: 100 },
      indent,
      float,
      layout,
      style,
      alignment,
      cellMargin: margins,
      visuallyRightToLeft,
      tableLook,
      cellSpacing,
      revision
    }));
    this.root.push(new TableGrid(columnWidths, columnWidthsRevision));
    for (const row of rows) this.root.push(row);
    rows.forEach((row, rowIndex) => {
      if (rowIndex === rows.length - 1) return;
      let columnIndex = 0;
      row.cells.forEach((cell) => {
        if (cell.options.rowSpan && cell.options.rowSpan > 1) {
          const continueCell = new TableCell({
            rowSpan: cell.options.rowSpan - 1,
            columnSpan: cell.options.columnSpan,
            borders: cell.options.borders,
            children: [],
            verticalMerge: VerticalMergeType.CONTINUE
          });
          rows[rowIndex + 1].addCellToColumnIndex(continueCell, columnIndex);
        }
        columnIndex += cell.options.columnSpan || 1;
      });
    });
  }
};
var createTableRowHeight = (value, rule) => new BuilderElement({
  name: "w:trHeight",
  attributes: {
    value: {
      key: "w:val",
      value: twipsMeasureValue(value)
    },
    rule: {
      key: "w:hRule",
      value: rule
    }
  }
});
var TableRowProperties = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:trPr", options2.includeIfEmpty);
    if (options2.cantSplit !== void 0) this.root.push(new OnOffElement("w:cantSplit", options2.cantSplit));
    if (options2.tableHeader !== void 0) this.root.push(new OnOffElement("w:tblHeader", options2.tableHeader));
    if (options2.height) this.root.push(createTableRowHeight(options2.height.value, options2.height.rule));
    if (options2.cellSpacing) this.root.push(createTableCellSpacing(options2.cellSpacing));
    if (options2.insertion) this.root.push(new InsertedTableRow(options2.insertion));
    if (options2.deletion) this.root.push(new DeletedTableRow(options2.deletion));
    if (options2.revision) this.root.push(new TableRowPropertiesChange(options2.revision));
  }
};
var TableRowPropertiesChange = class extends XmlComponent {
  constructor(options2) {
    super("w:trPrChange");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
    this.root.push(new TableRowProperties(_objectSpread2(_objectSpread2({}, options2), {}, { includeIfEmpty: true })));
  }
};
var TableRow = class extends XmlComponent {
  constructor(options2) {
    super("w:tr");
    _defineProperty(this, "options", void 0);
    this.options = options2;
    this.root.push(new TableRowProperties(options2));
    for (const child of options2.children) this.root.push(child);
  }
  get CellCount() {
    return this.options.children.length;
  }
  get cells() {
    return this.root.filter((xmlComponent) => xmlComponent instanceof TableCell);
  }
  addCellToIndex(cell, index) {
    this.root.splice(index + 1, 0, cell);
  }
  addCellToColumnIndex(cell, columnIndex) {
    const rootIndex = this.columnIndexToRootIndex(columnIndex, true);
    this.addCellToIndex(cell, rootIndex - 1);
  }
  rootIndexToColumnIndex(rootIndex) {
    if (rootIndex < 1 || rootIndex >= this.root.length) throw new Error(`cell 'rootIndex' should between 1 to ${this.root.length - 1}`);
    let colIdx = 0;
    for (let rootIdx = 1; rootIdx < rootIndex; rootIdx++) {
      const cell = this.root[rootIdx];
      colIdx += cell.options.columnSpan || 1;
    }
    return colIdx;
  }
  columnIndexToRootIndex(columnIndex, allowEndNewCell = false) {
    if (columnIndex < 0) throw new Error(`cell 'columnIndex' should not less than zero`);
    let colIdx = 0;
    let rootIdx = 1;
    while (colIdx <= columnIndex) {
      if (rootIdx >= this.root.length) if (allowEndNewCell) return this.root.length;
      else throw new Error(`cell 'columnIndex' should not great than ${colIdx - 1}`);
      const cell = this.root[rootIdx];
      rootIdx += 1;
      colIdx += cell && cell.options.columnSpan || 1;
    }
    return rootIdx - 1;
  }
};
var AppPropertiesAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
};
var AppProperties = class extends XmlComponent {
  constructor() {
    super("Properties");
    this.root.push(new AppPropertiesAttributes({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
  }
};
var ContentTypeAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { xmlns: "xmlns" });
  }
};
var createDefault = (contentType, extension) => new BuilderElement({
  name: "Default",
  attributes: {
    contentType: {
      key: "ContentType",
      value: contentType
    },
    extension: {
      key: "Extension",
      value: extension
    }
  }
});
var createOverride = (contentType, partName) => new BuilderElement({
  name: "Override",
  attributes: {
    contentType: {
      key: "ContentType",
      value: contentType
    },
    partName: {
      key: "PartName",
      value: partName
    }
  }
});
var ContentTypes = class extends XmlComponent {
  constructor() {
    super("Types");
    this.root.push(new ContentTypeAttributes({ xmlns: "http://schemas.openxmlformats.org/package/2006/content-types" }));
    this.root.push(createDefault("image/png", "png"));
    this.root.push(createDefault("image/jpeg", "jpeg"));
    this.root.push(createDefault("image/jpeg", "jpg"));
    this.root.push(createDefault("image/bmp", "bmp"));
    this.root.push(createDefault("image/gif", "gif"));
    this.root.push(createDefault("image/svg+xml", "svg"));
    this.root.push(createDefault("application/vnd.openxmlformats-package.relationships+xml", "rels"));
    this.root.push(createDefault("application/xml", "xml"));
    this.root.push(createDefault("application/vnd.openxmlformats-officedocument.obfuscatedFont", "odttf"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml", "/word/document.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml", "/word/styles.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-package.core-properties+xml", "/docProps/core.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.custom-properties+xml", "/docProps/custom.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.extended-properties+xml", "/docProps/app.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml", "/word/numbering.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml", "/word/footnotes.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml", "/word/endnotes.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml", "/word/settings.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml", "/word/comments.xml"));
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml", "/word/fontTable.xml"));
  }
  /**
  * Registers the commentsExtended part in the content types.
  */
  addCommentsExtended() {
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.commentsExtended+xml", "/word/commentsExtended.xml"));
  }
  /**
  * Registers a footer part in the content types.
  *
  * @param index - Footer index number (e.g., 1 for footer1.xml)
  */
  addFooter(index) {
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml", `/word/footer${index}.xml`));
  }
  /**
  * Registers a header part in the content types.
  *
  * @param index - Header index number (e.g., 1 for header1.xml)
  */
  addHeader(index) {
    this.root.push(createOverride("application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml", `/word/header${index}.xml`));
  }
};
var DocumentAttributeNamespaces = {
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  o: "urn:schemas-microsoft-com:office:office",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  v: "urn:schemas-microsoft-com:vml",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  w10: "urn:schemas-microsoft-com:office:word",
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
  wne: "http://schemas.microsoft.com/office/word/2006/wordml",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
  cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
  cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
  cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
  cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
  cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
  cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
  cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
  cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
  aink: "http://schemas.microsoft.com/office/drawing/2016/ink",
  am3d: "http://schemas.microsoft.com/office/drawing/2017/model3d",
  w16cex: "http://schemas.microsoft.com/office/word/2018/wordml/cex",
  w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
  w16: "http://schemas.microsoft.com/office/word/2018/wordml",
  w16sdtdh: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
  w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
};
var DocumentAttributes = class extends XmlAttributeComponent {
  constructor(ns, Ignorable) {
    super(_objectSpread2({ Ignorable }, Object.fromEntries(ns.map((n) => [n, DocumentAttributeNamespaces[n]]))));
    _defineProperty(this, "xmlKeys", _objectSpread2({ Ignorable: "mc:Ignorable" }, Object.fromEntries(Object.keys(DocumentAttributeNamespaces).map((key) => [key, `xmlns:${key}`]))));
  }
};
var CoreProperties = class extends XmlComponent {
  constructor(options2) {
    super("cp:coreProperties");
    this.root.push(new DocumentAttributes([
      "cp",
      "dc",
      "dcterms",
      "dcmitype",
      "xsi"
    ]));
    if (options2.title) this.root.push(new StringContainer("dc:title", options2.title));
    if (options2.subject) this.root.push(new StringContainer("dc:subject", options2.subject));
    if (options2.creator) this.root.push(new StringContainer("dc:creator", options2.creator));
    if (options2.keywords) this.root.push(new StringContainer("cp:keywords", options2.keywords));
    if (options2.description) this.root.push(new StringContainer("dc:description", options2.description));
    if (options2.lastModifiedBy) this.root.push(new StringContainer("cp:lastModifiedBy", options2.lastModifiedBy));
    if (options2.revision) this.root.push(new StringContainer("cp:revision", String(options2.revision)));
    this.root.push(new TimestampElement("dcterms:created"));
    this.root.push(new TimestampElement("dcterms:modified"));
  }
};
var TimestampElementProperties = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { type: "xsi:type" });
  }
};
var TimestampElement = class extends XmlComponent {
  constructor(name) {
    super(name);
    this.root.push(new TimestampElementProperties({ type: "dcterms:W3CDTF" }));
    this.root.push(dateTimeValue(/* @__PURE__ */ new Date()));
  }
};
var CustomPropertiesAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      xmlns: "xmlns",
      vt: "xmlns:vt"
    });
  }
};
var CustomPropertyAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      formatId: "fmtid",
      pid: "pid",
      name: "name"
    });
  }
};
var CustomProperty = class extends XmlComponent {
  constructor(id, properties) {
    super("property");
    this.root.push(new CustomPropertyAttributes({
      formatId: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: id.toString(),
      name: properties.name
    }));
    this.root.push(new CustomPropertyValue(properties.value));
  }
};
var CustomPropertyValue = class extends XmlComponent {
  constructor(value) {
    super("vt:lpwstr");
    this.root.push(value);
  }
};
var CustomProperties = class extends XmlComponent {
  constructor(properties) {
    super("Properties");
    _defineProperty(this, "nextId", void 0);
    _defineProperty(this, "properties", []);
    this.root.push(new CustomPropertiesAttributes({
      xmlns: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
      vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"
    }));
    this.nextId = 2;
    for (const property of properties) this.addCustomProperty(property);
  }
  prepForXml(context) {
    this.properties.forEach((x) => this.root.push(x));
    return super.prepForXml(context);
  }
  addCustomProperty(property) {
    this.properties.push(new CustomProperty(this.nextId++, property));
  }
};
var createColumns = ({ space, count, separate, equalWidth, children }) => new BuilderElement({
  name: "w:cols",
  attributes: {
    space: {
      key: "w:space",
      value: space === void 0 ? void 0 : twipsMeasureValue(space)
    },
    count: {
      key: "w:num",
      value: count === void 0 ? void 0 : decimalNumber(count)
    },
    separate: {
      key: "w:sep",
      value: separate
    },
    equalWidth: {
      key: "w:equalWidth",
      value: equalWidth
    }
  },
  children: !equalWidth && children ? children : void 0
});
var createDocumentGrid = ({ type, linePitch, charSpace }) => new BuilderElement({
  name: "w:docGrid",
  attributes: {
    type: {
      key: "w:type",
      value: type
    },
    linePitch: {
      key: "w:linePitch",
      value: decimalNumber(linePitch)
    },
    charSpace: {
      key: "w:charSpace",
      value: charSpace ? decimalNumber(charSpace) : void 0
    }
  }
});
var HeaderFooterReferenceType = {
  /** Specifies that this header or footer shall appear on every page in this section which is not overridden with a specific `even` or `first` page header/footer. In a section with all three types specified, this type shall be used on all odd numbered pages (counting from the `first` page in the section, not the section numbering). */
  DEFAULT: "default",
  /** Specifies that this header or footer shall appear on the first page in this section. The appearance of this header or footer is contingent on the setting of the `titlePg` element (§2.10.6). */
  FIRST: "first",
  /** Specifies that this header or footer shall appear on all even numbered pages in this section (counting from the first page in the section, not the section numbering). The appearance of this header or footer is contingent on the setting of the `evenAndOddHeaders` element (§2.10.1). */
  EVEN: "even"
};
var HeaderFooterType = {
  HEADER: "w:headerReference",
  FOOTER: "w:footerReference"
};
var createHeaderFooterReference = (type, options2) => new BuilderElement({
  name: type,
  attributes: {
    type: {
      key: "w:type",
      value: options2.type || HeaderFooterReferenceType.DEFAULT
    },
    id: {
      key: "r:id",
      value: `rId${options2.id}`
    }
  }
});
var createLineNumberType = ({ countBy, start, restart, distance }) => new BuilderElement({
  name: "w:lnNumType",
  attributes: {
    countBy: {
      key: "w:countBy",
      value: countBy === void 0 ? void 0 : decimalNumber(countBy)
    },
    start: {
      key: "w:start",
      value: start === void 0 ? void 0 : decimalNumber(start)
    },
    restart: {
      key: "w:restart",
      value: restart
    },
    distance: {
      key: "w:distance",
      value: distance === void 0 ? void 0 : twipsMeasureValue(distance)
    }
  }
});
var PageBordersAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      display: "w:display",
      offsetFrom: "w:offsetFrom",
      zOrder: "w:zOrder"
    });
  }
};
var PageBorders = class extends IgnoreIfEmptyXmlComponent {
  constructor(options2) {
    super("w:pgBorders");
    if (!options2) return this;
    if (options2.pageBorders) this.root.push(new PageBordersAttributes({
      display: options2.pageBorders.display,
      offsetFrom: options2.pageBorders.offsetFrom,
      zOrder: options2.pageBorders.zOrder
    }));
    else this.root.push(new PageBordersAttributes({}));
    if (options2.pageBorderTop) this.root.push(createBorderElement("w:top", options2.pageBorderTop));
    if (options2.pageBorderLeft) this.root.push(createBorderElement("w:left", options2.pageBorderLeft));
    if (options2.pageBorderBottom) this.root.push(createBorderElement("w:bottom", options2.pageBorderBottom));
    if (options2.pageBorderRight) this.root.push(createBorderElement("w:right", options2.pageBorderRight));
  }
};
var createPageMargin = (top, right, bottom, left, header, footer, gutter) => new BuilderElement({
  name: "w:pgMar",
  attributes: {
    top: {
      key: "w:top",
      value: signedTwipsMeasureValue(top)
    },
    right: {
      key: "w:right",
      value: twipsMeasureValue(right)
    },
    bottom: {
      key: "w:bottom",
      value: signedTwipsMeasureValue(bottom)
    },
    left: {
      key: "w:left",
      value: twipsMeasureValue(left)
    },
    header: {
      key: "w:header",
      value: twipsMeasureValue(header)
    },
    footer: {
      key: "w:footer",
      value: twipsMeasureValue(footer)
    },
    gutter: {
      key: "w:gutter",
      value: twipsMeasureValue(gutter)
    }
  }
});
var createPageNumberType = ({ start, formatType, separator }) => new BuilderElement({
  name: "w:pgNumType",
  attributes: {
    start: {
      key: "w:start",
      value: start === void 0 ? void 0 : decimalNumber(start)
    },
    formatType: {
      key: "w:fmt",
      value: formatType
    },
    separator: {
      key: "w:chapSep",
      value: separator
    }
  }
});
var PageOrientation = {
  /**
  * ## Portrait Mode
  *
  * Specifies that pages in this section shall be printed in portrait mode.
  */
  PORTRAIT: "portrait",
  /**
  * ## Landscape Mode
  *
  * Specifies that pages in this section shall be printed in landscape mode, which prints the page contents with a 90 degree rotation with respect to the normal page orientation.
  */
  LANDSCAPE: "landscape"
};
var createPageSize = ({ width, height, orientation, code }) => {
  const widthTwips = twipsMeasureValue(width);
  const heightTwips = twipsMeasureValue(height);
  return new BuilderElement({
    name: "w:pgSz",
    attributes: {
      width: {
        key: "w:w",
        value: orientation === PageOrientation.LANDSCAPE ? heightTwips : widthTwips
      },
      height: {
        key: "w:h",
        value: orientation === PageOrientation.LANDSCAPE ? widthTwips : heightTwips
      },
      orientation: {
        key: "w:orient",
        value: orientation
      },
      code: {
        key: "w:code",
        value: code
      }
    }
  });
};
var PageTextDirectionAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { val: "w:val" });
  }
};
var PageTextDirection = class extends XmlComponent {
  constructor(value) {
    super("w:textDirection");
    this.root.push(new PageTextDirectionAttributes({ val: value }));
  }
};
var SectionType = {
  /** Section begins on the next page */
  NEXT_PAGE: "nextPage",
  /** Section begins on the next column */
  NEXT_COLUMN: "nextColumn",
  /** Section begins immediately following the previous section */
  CONTINUOUS: "continuous",
  /** Section begins on the next even-numbered page */
  EVEN_PAGE: "evenPage",
  /** Section begins on the next odd-numbered page */
  ODD_PAGE: "oddPage"
};
var createSectionType = (value) => new BuilderElement({
  name: "w:type",
  attributes: { val: {
    key: "w:val",
    value
  } }
});
var sectionMarginDefaults = {
  /** Top margin: 1440 twips (1 inch) */
  TOP: 1440,
  /** Right margin: 1440 twips (1 inch) */
  RIGHT: 1440,
  /** Bottom margin: 1440 twips (1 inch) */
  BOTTOM: 1440,
  /** Left margin: 1440 twips (1 inch) */
  LEFT: 1440,
  /** Header margin from top: 708 twips (0.5 inches) */
  HEADER: 708,
  /** Footer margin from bottom: 708 twips (0.5 inches) */
  FOOTER: 708,
  /** Gutter margin for binding: 0 twips */
  GUTTER: 0
};
var sectionPageSizeDefaults = {
  /** Page width: 11906 twips (8.27 inches, 210mm) */
  WIDTH: 11906,
  /** Page height: 16838 twips (11.69 inches, 297mm) */
  HEIGHT: 16838,
  /** Page orientation: portrait */
  ORIENTATION: PageOrientation.PORTRAIT
};
var SectionProperties = class extends XmlComponent {
  constructor({ page: { size: { width = sectionPageSizeDefaults.WIDTH, height = sectionPageSizeDefaults.HEIGHT, orientation = sectionPageSizeDefaults.ORIENTATION, code } = {}, margin: { top = sectionMarginDefaults.TOP, right = sectionMarginDefaults.RIGHT, bottom = sectionMarginDefaults.BOTTOM, left = sectionMarginDefaults.LEFT, header = sectionMarginDefaults.HEADER, footer = sectionMarginDefaults.FOOTER, gutter = sectionMarginDefaults.GUTTER } = {}, pageNumbers = {}, borders, textDirection } = {}, grid: { linePitch = 360, charSpace, type: gridType } = {}, headerWrapperGroup = {}, footerWrapperGroup = {}, lineNumbers, titlePage, verticalAlign, column, type, revision } = {}) {
    super("w:sectPr");
    this.addHeaderFooterGroup(HeaderFooterType.HEADER, headerWrapperGroup);
    this.addHeaderFooterGroup(HeaderFooterType.FOOTER, footerWrapperGroup);
    if (type) this.root.push(createSectionType(type));
    this.root.push(createPageSize({
      width,
      height,
      orientation,
      code
    }));
    this.root.push(createPageMargin(top, right, bottom, left, header, footer, gutter));
    if (borders) this.root.push(new PageBorders(borders));
    if (lineNumbers) this.root.push(createLineNumberType(lineNumbers));
    this.root.push(createPageNumberType(pageNumbers));
    if (column) this.root.push(createColumns(column));
    if (verticalAlign) this.root.push(createVerticalAlign(verticalAlign));
    if (titlePage !== void 0) this.root.push(new OnOffElement("w:titlePg", titlePage));
    if (textDirection) this.root.push(new PageTextDirection(textDirection));
    if (revision) this.root.push(new SectionPropertiesChange(revision));
    this.root.push(createDocumentGrid({
      linePitch,
      charSpace,
      type: gridType
    }));
  }
  addHeaderFooterGroup(type, group) {
    if (group.default) this.root.push(createHeaderFooterReference(type, {
      type: HeaderFooterReferenceType.DEFAULT,
      id: group.default.View.ReferenceId
    }));
    if (group.first) this.root.push(createHeaderFooterReference(type, {
      type: HeaderFooterReferenceType.FIRST,
      id: group.first.View.ReferenceId
    }));
    if (group.even) this.root.push(createHeaderFooterReference(type, {
      type: HeaderFooterReferenceType.EVEN,
      id: group.even.View.ReferenceId
    }));
  }
};
var SectionPropertiesChange = class extends XmlComponent {
  constructor(options2) {
    super("w:sectPrChange");
    this.root.push(new ChangeAttributes({
      id: options2.id,
      author: options2.author,
      date: options2.date
    }));
    this.root.push(new SectionProperties(options2));
  }
};
var Body = class extends XmlComponent {
  constructor() {
    super("w:body");
    _defineProperty(this, "sections", []);
  }
  /**
  * Adds new section properties to the document body.
  *
  * Creates a new section by moving the previous section's properties into a paragraph
  * at the end of that section, and then adding the new section as the current section.
  *
  * According to the OOXML specification:
  * - Section properties for all sections except the last must be stored in a paragraph's
  *   properties (pPr/sectPr) at the end of each section
  * - The last section's properties are stored as a direct child of the body element (w:body/w:sectPr)
  *
  * @param options - Section properties configuration (page size, margins, headers, footers, etc.)
  */
  addSection(options2) {
    const currentSection = this.sections.pop();
    this.root.push(this.createSectionParagraph(currentSection));
    this.sections.push(new SectionProperties(options2));
  }
  /**
  * Prepares the body element for XML serialization.
  *
  * Ensures that the last section's properties are placed as a direct child of the body
  * element, as required by the OOXML specification.
  *
  * @param context - The XML serialization context
  * @returns The prepared XML object or undefined
  */
  prepForXml(context) {
    if (this.sections.length === 1) {
      this.root.splice(0, 1);
      this.root.push(this.sections.pop());
    }
    return super.prepForXml(context);
  }
  /**
  * Adds a block-level component to the body.
  *
  * This method is used internally by the Document class to add paragraphs,
  * tables, and other block-level elements to the document body.
  *
  * @param component - The XML component to add (paragraph, table, etc.)
  */
  push(component) {
    this.root.push(component);
  }
  createSectionParagraph(section) {
    const paragraph2 = new Paragraph({});
    const properties = new ParagraphProperties({});
    properties.push(section);
    paragraph2.addChildElement(properties);
    return paragraph2;
  }
};
var DocumentBackgroundAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      color: "w:color",
      themeColor: "w:themeColor",
      themeShade: "w:themeShade",
      themeTint: "w:themeTint"
    });
  }
};
var DocumentBackground = class extends XmlComponent {
  constructor(options2) {
    super("w:background");
    this.root.push(new DocumentBackgroundAttributes({
      color: options2.color === void 0 ? void 0 : hexColorValue(options2.color),
      themeColor: options2.themeColor,
      themeShade: options2.themeShade === void 0 ? void 0 : uCharHexNumber(options2.themeShade),
      themeTint: options2.themeTint === void 0 ? void 0 : uCharHexNumber(options2.themeTint)
    }));
  }
};
var Document = class extends XmlComponent {
  constructor(options2) {
    super("w:document");
    _defineProperty(this, "body", void 0);
    this.root.push(new DocumentAttributes([
      "wpc",
      "mc",
      "o",
      "r",
      "m",
      "v",
      "wp14",
      "wp",
      "w10",
      "w",
      "w14",
      "w15",
      "wpg",
      "wpi",
      "wne",
      "wps",
      "cx",
      "cx1",
      "cx2",
      "cx3",
      "cx4",
      "cx5",
      "cx6",
      "cx7",
      "cx8",
      "aink",
      "am3d",
      "w16cex",
      "w16cid",
      "w16",
      "w16sdtdh",
      "w16se"
    ], "w14 w15 wp14"));
    this.body = new Body();
    if (options2.background) this.root.push(new DocumentBackground(options2.background));
    this.root.push(this.body);
  }
  /**
  * Adds a block-level element to the document body.
  *
  * @param item - The element to add (paragraph, table, table of contents, or hyperlink)
  * @returns The Document instance for method chaining
  */
  add(item) {
    this.body.push(item);
    return this;
  }
  /**
  * Gets the document body element.
  *
  * @returns The Body instance containing all document content
  */
  get Body() {
    return this.body;
  }
};
var DocumentWrapper = class {
  constructor(options2) {
    _defineProperty(this, "document", void 0);
    _defineProperty(this, "relationships", void 0);
    this.document = new Document(options2);
    this.relationships = new Relationships();
  }
  get View() {
    return this.document;
  }
  get Relationships() {
    return this.relationships;
  }
};
var EndnotesAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
};
var EndnoteAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
};
var EndnoteRefRun = class extends Run {
  constructor() {
    super({ style: "EndnoteReference" });
    this.root.push(new EndnoteReference());
  }
};
var EndnoteType = {
  SEPARATOR: "separator",
  CONTINUATION_SEPARATOR: "continuationSeparator"
};
var Endnote = class extends XmlComponent {
  constructor(options2) {
    super("w:endnote");
    this.root.push(new EndnoteAttributes({
      type: options2.type,
      id: options2.id
    }));
    for (let i = 0; i < options2.children.length; i++) {
      const child = options2.children[i];
      if (i === 0) child.addRunToFront(new EndnoteRefRun());
      this.root.push(child);
    }
  }
};
var ContinuationSeperator = class extends XmlComponent {
  constructor() {
    super("w:continuationSeparator");
  }
};
var ContinuationSeperatorRun = class extends Run {
  constructor() {
    super({});
    this.root.push(new ContinuationSeperator());
  }
};
var Seperator = class extends XmlComponent {
  constructor() {
    super("w:separator");
  }
};
var SeperatorRun = class extends Run {
  constructor() {
    super({});
    this.root.push(new Seperator());
  }
};
var Endnotes = class extends XmlComponent {
  constructor() {
    super("w:endnotes");
    this.root.push(new EndnotesAttributes({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      Ignorable: "w14 w15 wp14"
    }));
    const begin = new Endnote({
      id: -1,
      type: EndnoteType.SEPARATOR,
      children: [new Paragraph({
        spacing: {
          after: 0,
          line: 240,
          lineRule: LineRuleType.AUTO
        },
        children: [new SeperatorRun()]
      })]
    });
    this.root.push(begin);
    const spacing = new Endnote({
      id: 0,
      type: EndnoteType.CONTINUATION_SEPARATOR,
      children: [new Paragraph({
        spacing: {
          after: 0,
          line: 240,
          lineRule: LineRuleType.AUTO
        },
        children: [new ContinuationSeperatorRun()]
      })]
    });
    this.root.push(spacing);
  }
  createEndnote(id, paragraph2) {
    const endnote = new Endnote({
      id,
      children: paragraph2
    });
    this.root.push(endnote);
  }
};
var EndnotesWrapper = class {
  constructor() {
    _defineProperty(this, "endnotes", void 0);
    _defineProperty(this, "relationships", void 0);
    this.endnotes = new Endnotes();
    this.relationships = new Relationships();
  }
  get View() {
    return this.endnotes;
  }
  get Relationships() {
    return this.relationships;
  }
};
var FooterAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type"
    });
  }
};
var Footer$1 = class extends InitializableXmlComponent {
  constructor(referenceNumber, initContent) {
    super("w:ftr", initContent);
    _defineProperty(this, "refId", void 0);
    this.refId = referenceNumber;
    if (!initContent) this.root.push(new FooterAttributes({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
    }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(item) {
    this.root.push(item);
  }
};
var FooterWrapper = class {
  constructor(media, referenceId, initContent) {
    _defineProperty(this, "media", void 0);
    _defineProperty(this, "footer", void 0);
    _defineProperty(this, "relationships", void 0);
    this.media = media;
    this.footer = new Footer$1(referenceId, initContent);
    this.relationships = new Relationships();
  }
  add(item) {
    this.footer.add(item);
  }
  addChildElement(childElement) {
    this.footer.addChildElement(childElement);
  }
  get View() {
    return this.footer;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
};
var FootnoteAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      type: "w:type",
      id: "w:id"
    });
  }
};
var FootnoteRef = class extends XmlComponent {
  constructor() {
    super("w:footnoteRef");
  }
};
var FootnoteRefRun = class extends Run {
  constructor() {
    super({ style: "FootnoteReference" });
    this.root.push(new FootnoteRef());
  }
};
var FootnoteType = {
  /** Separator line between body text and footnotes */
  SEPERATOR: "separator",
  /** Continuation separator for footnotes spanning pages */
  CONTINUATION_SEPERATOR: "continuationSeparator"
};
var Footnote = class extends XmlComponent {
  constructor(options2) {
    super("w:footnote");
    this.root.push(new FootnoteAttributes({
      type: options2.type,
      id: options2.id
    }));
    for (let i = 0; i < options2.children.length; i++) {
      const child = options2.children[i];
      if (i === 0) child.addRunToFront(new FootnoteRefRun());
      this.root.push(child);
    }
  }
};
var FootnotesAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
};
var FootNotes = class extends XmlComponent {
  constructor() {
    super("w:footnotes");
    this.root.push(new FootnotesAttributes({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      Ignorable: "w14 w15 wp14"
    }));
    const begin = new Footnote({
      id: -1,
      type: FootnoteType.SEPERATOR,
      children: [new Paragraph({
        spacing: {
          after: 0,
          line: 240,
          lineRule: LineRuleType.AUTO
        },
        children: [new SeperatorRun()]
      })]
    });
    this.root.push(begin);
    const spacing = new Footnote({
      id: 0,
      type: FootnoteType.CONTINUATION_SEPERATOR,
      children: [new Paragraph({
        spacing: {
          after: 0,
          line: 240,
          lineRule: LineRuleType.AUTO
        },
        children: [new ContinuationSeperatorRun()]
      })]
    });
    this.root.push(spacing);
  }
  /**
  * Creates and adds a new footnote to the collection.
  *
  * @param id - Unique numeric identifier for the footnote
  * @param paragraph - Array of paragraphs that make up the footnote content
  */
  createFootNote(id, paragraph2) {
    const footnote = new Footnote({
      id,
      children: paragraph2
    });
    this.root.push(footnote);
  }
};
var FootnotesWrapper = class {
  constructor() {
    _defineProperty(this, "footnotess", void 0);
    _defineProperty(this, "relationships", void 0);
    this.footnotess = new FootNotes();
    this.relationships = new Relationships();
  }
  get View() {
    return this.footnotess;
  }
  get Relationships() {
    return this.relationships;
  }
};
var HeaderAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      cp: "xmlns:cp",
      dc: "xmlns:dc",
      dcterms: "xmlns:dcterms",
      dcmitype: "xmlns:dcmitype",
      xsi: "xmlns:xsi",
      type: "xsi:type",
      cx: "xmlns:cx",
      cx1: "xmlns:cx1",
      cx2: "xmlns:cx2",
      cx3: "xmlns:cx3",
      cx4: "xmlns:cx4",
      cx5: "xmlns:cx5",
      cx6: "xmlns:cx6",
      cx7: "xmlns:cx7",
      cx8: "xmlns:cx8",
      w16cid: "xmlns:w16cid",
      w16se: "xmlns:w16se"
    });
  }
};
var Header$1 = class extends InitializableXmlComponent {
  constructor(referenceNumber, initContent) {
    super("w:hdr", initContent);
    _defineProperty(this, "refId", void 0);
    this.refId = referenceNumber;
    if (!initContent) this.root.push(new HeaderAttributes({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
      cx1: "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
      cx2: "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
      cx3: "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
      cx4: "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
      cx5: "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
      cx6: "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
      cx7: "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
      cx8: "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
      w16cid: "http://schemas.microsoft.com/office/word/2016/wordml/cid",
      w16se: "http://schemas.microsoft.com/office/word/2015/wordml/symex"
    }));
  }
  get ReferenceId() {
    return this.refId;
  }
  add(item) {
    this.root.push(item);
  }
};
var HeaderWrapper = class {
  constructor(media, referenceId, initContent) {
    _defineProperty(this, "media", void 0);
    _defineProperty(this, "header", void 0);
    _defineProperty(this, "relationships", void 0);
    this.media = media;
    this.header = new Header$1(referenceId, initContent);
    this.relationships = new Relationships();
  }
  add(item) {
    this.header.add(item);
    return this;
  }
  addChildElement(childElement) {
    this.header.addChildElement(childElement);
  }
  get View() {
    return this.header;
  }
  get Relationships() {
    return this.relationships;
  }
  get Media() {
    return this.media;
  }
};
var Media = class {
  constructor() {
    _defineProperty(this, "map", void 0);
    this.map = /* @__PURE__ */ new Map();
  }
  /**
  * Adds an image to the media collection.
  *
  * @param key - Unique identifier for this image
  * @param mediaData - Complete image data including file name, transformation, and raw data
  */
  addImage(key, mediaData) {
    this.map.set(key, mediaData);
  }
  /**
  * Gets all images as an array.
  *
  * @returns Read-only array of all media data in the collection
  */
  get Array() {
    return Array.from(this.map.values());
  }
};
var LevelFormat = {
  /** Decimal numbering (1, 2, 3...). */
  DECIMAL: "decimal",
  /** Uppercase roman numerals (I, II, III...). */
  UPPER_ROMAN: "upperRoman",
  /** Lowercase roman numerals (i, ii, iii...). */
  LOWER_ROMAN: "lowerRoman",
  /** Uppercase letters (A, B, C...). */
  UPPER_LETTER: "upperLetter",
  /** Lowercase letters (a, b, c...). */
  LOWER_LETTER: "lowerLetter",
  /** Ordinal numbers (1st, 2nd, 3rd...). */
  ORDINAL: "ordinal",
  /** Cardinal text (one, two, three...). */
  CARDINAL_TEXT: "cardinalText",
  /** Ordinal text (first, second, third...). */
  ORDINAL_TEXT: "ordinalText",
  /** Hexadecimal numbering. */
  HEX: "hex",
  /** Chicago Manual of Style numbering. */
  CHICAGO: "chicago",
  /** Ideograph digital numbering. */
  IDEOGRAPH__DIGITAL: "ideographDigital",
  /** Japanese counting system. */
  JAPANESE_COUNTING: "japaneseCounting",
  /** Japanese aiueo ordering. */
  AIUEO: "aiueo",
  /** Japanese iroha ordering. */
  IROHA: "iroha",
  /** Full-width decimal numbering. */
  DECIMAL_FULL_WIDTH: "decimalFullWidth",
  /** Half-width decimal numbering. */
  DECIMAL_HALF_WIDTH: "decimalHalfWidth",
  /** Japanese legal numbering. */
  JAPANESE_LEGAL: "japaneseLegal",
  /** Japanese digital ten thousand numbering. */
  JAPANESE_DIGITAL_TEN_THOUSAND: "japaneseDigitalTenThousand",
  /** Decimal numbers enclosed in circles. */
  DECIMAL_ENCLOSED_CIRCLE: "decimalEnclosedCircle",
  /** Full-width decimal numbering variant 2. */
  DECIMAL_FULL_WIDTH2: "decimalFullWidth2",
  /** Full-width aiueo ordering. */
  AIUEO_FULL_WIDTH: "aiueoFullWidth",
  /** Full-width iroha ordering. */
  IROHA_FULL_WIDTH: "irohaFullWidth",
  /** Decimal with leading zeros. */
  DECIMAL_ZERO: "decimalZero",
  /** Bullet points. */
  BULLET: "bullet",
  /** Korean ganada ordering. */
  GANADA: "ganada",
  /** Korean chosung ordering. */
  CHOSUNG: "chosung",
  /** Decimal enclosed with fullstop. */
  DECIMAL_ENCLOSED_FULLSTOP: "decimalEnclosedFullstop",
  /** Decimal enclosed in parentheses. */
  DECIMAL_ENCLOSED_PARENTHESES: "decimalEnclosedParen",
  /** Decimal enclosed in circles (Chinese). */
  DECIMAL_ENCLOSED_CIRCLE_CHINESE: "decimalEnclosedCircleChinese",
  /** Ideograph enclosed in circles. */
  IDEOGRAPH_ENCLOSED_CIRCLE: "ideographEnclosedCircle",
  /** Traditional ideograph numbering. */
  IDEOGRAPH_TRADITIONAL: "ideographTraditional",
  /** Ideograph zodiac numbering. */
  IDEOGRAPH_ZODIAC: "ideographZodiac",
  /** Traditional ideograph zodiac numbering. */
  IDEOGRAPH_ZODIAC_TRADITIONAL: "ideographZodiacTraditional",
  /** Taiwanese counting system. */
  TAIWANESE_COUNTING: "taiwaneseCounting",
  /** Traditional ideograph legal numbering. */
  IDEOGRAPH_LEGAL_TRADITIONAL: "ideographLegalTraditional",
  /** Taiwanese counting thousand system. */
  TAIWANESE_COUNTING_THOUSAND: "taiwaneseCountingThousand",
  /** Taiwanese digital numbering. */
  TAIWANESE_DIGITAL: "taiwaneseDigital",
  /** Chinese counting system. */
  CHINESE_COUNTING: "chineseCounting",
  /** Simplified Chinese legal numbering. */
  CHINESE_LEGAL_SIMPLIFIED: "chineseLegalSimplified",
  /** Chinese counting thousand system. */
  CHINESE_COUNTING_THOUSAND: "chineseCountingThousand",
  /** Korean digital numbering. */
  KOREAN_DIGITAL: "koreanDigital",
  /** Korean counting system. */
  KOREAN_COUNTING: "koreanCounting",
  /** Korean legal numbering. */
  KOREAN_LEGAL: "koreanLegal",
  /** Korean digital numbering variant 2. */
  KOREAN_DIGITAL2: "koreanDigital2",
  /** Vietnamese counting system. */
  VIETNAMESE_COUNTING: "vietnameseCounting",
  /** Russian lowercase numbering. */
  RUSSIAN_LOWER: "russianLower",
  /** Russian uppercase numbering. */
  RUSSIAN_UPPER: "russianUpper",
  /** No numbering. */
  NONE: "none",
  /** Number enclosed in dashes. */
  NUMBER_IN_DASH: "numberInDash",
  /** Hebrew numbering variant 1. */
  HEBREW1: "hebrew1",
  /** Hebrew numbering variant 2. */
  HEBREW2: "hebrew2",
  /** Arabic alpha numbering. */
  ARABIC_ALPHA: "arabicAlpha",
  /** Arabic abjad numbering. */
  ARABIC_ABJAD: "arabicAbjad",
  /** Hindi vowels. */
  HINDI_VOWELS: "hindiVowels",
  /** Hindi consonants. */
  HINDI_CONSONANTS: "hindiConsonants",
  /** Hindi numbers. */
  HINDI_NUMBERS: "hindiNumbers",
  /** Hindi counting system. */
  HINDI_COUNTING: "hindiCounting",
  /** Thai letters. */
  THAI_LETTERS: "thaiLetters",
  /** Thai numbers. */
  THAI_NUMBERS: "thaiNumbers",
  /** Thai counting system. */
  THAI_COUNTING: "thaiCounting",
  /** Thai Baht text. */
  BAHT_TEXT: "bahtText",
  /** Dollar text. */
  DOLLAR_TEXT: "dollarText",
  /** Custom numbering format. */
  CUSTOM: "custom"
};
var LevelAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      ilvl: "w:ilvl",
      tentative: "w15:tentative"
    });
  }
};
var NumberFormat$1 = class extends XmlComponent {
  constructor(value) {
    super("w:numFmt");
    this.root.push(new Attributes({ val: value }));
  }
};
var LevelText = class extends XmlComponent {
  constructor(value) {
    super("w:lvlText");
    this.root.push(new Attributes({ val: value }));
  }
};
var LevelJc = class extends XmlComponent {
  constructor(value) {
    super("w:lvlJc");
    this.root.push(new Attributes({ val: value }));
  }
};
var Suffix = class extends XmlComponent {
  constructor(value) {
    super("w:suff");
    this.root.push(new Attributes({ val: value }));
  }
};
var IsLegalNumberingStyle = class extends XmlComponent {
  constructor() {
    super("w:isLgl");
  }
};
var LevelBase = class extends XmlComponent {
  /**
  * Creates a new numbering level.
  *
  * @param options - Level configuration options
  * @throws Error if level is greater than 9 (Word limitation)
  */
  constructor({ level, format, text, alignment = AlignmentType.START, start = 1, style, suffix, isLegalNumberingStyle }) {
    super("w:lvl");
    _defineProperty(this, "paragraphProperties", void 0);
    _defineProperty(this, "runProperties", void 0);
    this.root.push(new NumberValueElement("w:start", decimalNumber(start)));
    if (format) this.root.push(new NumberFormat$1(format));
    if (suffix) this.root.push(new Suffix(suffix));
    if (isLegalNumberingStyle) this.root.push(new IsLegalNumberingStyle());
    if (text) this.root.push(new LevelText(text));
    this.root.push(new LevelJc(alignment));
    if (style === null || style === void 0 ? void 0 : style.style) this.root.push(createParagraphStyle(style.style));
    this.paragraphProperties = new ParagraphProperties(style && style.paragraph);
    this.runProperties = new RunProperties(style && style.run);
    this.root.push(this.paragraphProperties);
    this.root.push(this.runProperties);
    if (level > 9) throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
    this.root.push(new LevelAttributes({
      ilvl: decimalNumber(level),
      tentative: 1
    }));
  }
};
var Level = class extends LevelBase {
};
var MultiLevelType = class extends XmlComponent {
  /**
  * Creates a new multi-level type specification.
  *
  * @param value - The multi-level type: "singleLevel", "multilevel", or "hybridMultilevel"
  */
  constructor(value) {
    super("w:multiLevelType");
    this.root.push(new Attributes({ val: value }));
  }
};
var AbstractNumberingAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      abstractNumId: "w:abstractNumId",
      restartNumberingAfterBreak: "w15:restartNumberingAfterBreak"
    });
  }
};
var AbstractNumbering = class extends XmlComponent {
  /**
  * Creates a new abstract numbering definition.
  *
  * @param id - Unique identifier for this abstract numbering definition
  * @param levelOptions - Array of level definitions (up to 9 levels)
  */
  constructor(id, levelOptions) {
    super("w:abstractNum");
    _defineProperty(
      this,
      /** The unique identifier for this abstract numbering definition. */
      "id",
      void 0
    );
    this.root.push(new AbstractNumberingAttributes({
      abstractNumId: decimalNumber(id),
      restartNumberingAfterBreak: 0
    }));
    this.root.push(new MultiLevelType("hybridMultilevel"));
    this.id = id;
    for (const option of levelOptions) this.root.push(new Level(option));
  }
};
var AbstractNumId = class extends XmlComponent {
  constructor(value) {
    super("w:abstractNumId");
    this.root.push(new Attributes({ val: value }));
  }
};
var NumAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { numId: "w:numId" });
  }
};
var ConcreteNumbering = class extends XmlComponent {
  /**
  * Creates a new concrete numbering instance.
  *
  * @param options - Configuration options for the numbering instance
  */
  constructor(options2) {
    super("w:num");
    _defineProperty(
      this,
      /** The unique identifier for this numbering instance. */
      "numId",
      void 0
    );
    _defineProperty(
      this,
      /** The reference name for this numbering instance. */
      "reference",
      void 0
    );
    _defineProperty(
      this,
      /** The instance number for tracking multiple uses. */
      "instance",
      void 0
    );
    this.numId = options2.numId;
    this.reference = options2.reference;
    this.instance = options2.instance;
    this.root.push(new NumAttributes({ numId: decimalNumber(options2.numId) }));
    this.root.push(new AbstractNumId(decimalNumber(options2.abstractNumId)));
    if (options2.overrideLevels && options2.overrideLevels.length) for (const level of options2.overrideLevels) this.root.push(new LevelOverride(level.num, level.start));
  }
};
var LevelOverrideAttributes = class extends XmlAttributeComponent {
  constructor(..._args2) {
    super(..._args2);
    _defineProperty(this, "xmlKeys", { ilvl: "w:ilvl" });
  }
};
var LevelOverride = class extends XmlComponent {
  /**
  * Creates a new level override.
  *
  * @param levelNum - The level number to override (0-8)
  * @param start - Optional starting number for the level
  */
  constructor(levelNum, start) {
    super("w:lvlOverride");
    this.root.push(new LevelOverrideAttributes({ ilvl: levelNum }));
    if (start !== void 0) this.root.push(new StartOverride(start));
  }
};
var StartOverrideAttributes = class extends XmlAttributeComponent {
  constructor(..._args3) {
    super(..._args3);
    _defineProperty(this, "xmlKeys", { val: "w:val" });
  }
};
var StartOverride = class extends XmlComponent {
  /**
  * Creates a new start override.
  *
  * @param start - The starting number
  */
  constructor(start) {
    super("w:startOverride");
    this.root.push(new StartOverrideAttributes({ val: start }));
  }
};
var Numbering = class extends XmlComponent {
  /**
  * Creates a new numbering definition collection.
  *
  * Initializes the numbering with a default bullet list configuration and
  * any custom numbering configurations provided in the options.
  *
  * @param options - Configuration options for numbering definitions
  */
  constructor(options2) {
    super("w:numbering");
    _defineProperty(this, "abstractNumberingMap", /* @__PURE__ */ new Map());
    _defineProperty(this, "concreteNumberingMap", /* @__PURE__ */ new Map());
    _defineProperty(this, "referenceConfigMap", /* @__PURE__ */ new Map());
    _defineProperty(this, "abstractNumUniqueNumericId", abstractNumUniqueNumericIdGen());
    _defineProperty(this, "concreteNumUniqueNumericId", concreteNumUniqueNumericIdGen());
    this.root.push(new DocumentAttributes([
      "wpc",
      "mc",
      "o",
      "r",
      "m",
      "v",
      "wp14",
      "wp",
      "w10",
      "w",
      "w14",
      "w15",
      "wpg",
      "wpi",
      "wne",
      "wps"
    ], "w14 w15 wp14"));
    const abstractNumbering = new AbstractNumbering(this.abstractNumUniqueNumericId(), [
      {
        level: 0,
        format: LevelFormat.BULLET,
        text: "\u25CF",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: convertInchesToTwip(0.5),
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 1,
        format: LevelFormat.BULLET,
        text: "\u25CB",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: convertInchesToTwip(1),
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 2,
        format: LevelFormat.BULLET,
        text: "\u25A0",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 2160,
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 3,
        format: LevelFormat.BULLET,
        text: "\u25CF",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 2880,
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 4,
        format: LevelFormat.BULLET,
        text: "\u25CB",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 3600,
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 5,
        format: LevelFormat.BULLET,
        text: "\u25A0",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 4320,
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 6,
        format: LevelFormat.BULLET,
        text: "\u25CF",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 5040,
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 7,
        format: LevelFormat.BULLET,
        text: "\u25CF",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 5760,
          hanging: convertInchesToTwip(0.25)
        } } }
      },
      {
        level: 8,
        format: LevelFormat.BULLET,
        text: "\u25CF",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: {
          left: 6480,
          hanging: convertInchesToTwip(0.25)
        } } }
      }
    ]);
    this.concreteNumberingMap.set("default-bullet-numbering", new ConcreteNumbering({
      numId: 1,
      abstractNumId: abstractNumbering.id,
      reference: "default-bullet-numbering",
      instance: 0,
      overrideLevels: [{
        num: 0,
        start: 1
      }]
    }));
    this.abstractNumberingMap.set("default-bullet-numbering", abstractNumbering);
    for (const con of options2.config) {
      this.abstractNumberingMap.set(con.reference, new AbstractNumbering(this.abstractNumUniqueNumericId(), con.levels));
      this.referenceConfigMap.set(con.reference, con.levels);
    }
  }
  /**
  * Prepares the numbering definitions for XML serialization.
  *
  * Adds all abstract and concrete numbering definitions to the XML tree.
  *
  * @param context - The XML context
  * @returns The prepared XML object
  */
  prepForXml(context) {
    for (const numbering of this.abstractNumberingMap.values()) this.root.push(numbering);
    for (const numbering of this.concreteNumberingMap.values()) this.root.push(numbering);
    return super.prepForXml(context);
  }
  /**
  * Creates a concrete numbering instance from an abstract numbering definition.
  *
  * This method creates a new concrete numbering instance that references an
  * abstract numbering definition. It's used internally when paragraphs reference
  * numbering configurations.
  *
  * @param reference - The reference name of the abstract numbering definition
  * @param instance - The instance number for this concrete numbering
  */
  createConcreteNumberingInstance(reference, instance) {
    const abstractNumbering = this.abstractNumberingMap.get(reference);
    if (!abstractNumbering) return;
    const fullReference = `${reference}-${instance}`;
    if (this.concreteNumberingMap.has(fullReference)) return;
    const referenceConfigLevels = this.referenceConfigMap.get(reference);
    const firstLevelStartNumber = referenceConfigLevels && referenceConfigLevels[0].start;
    const concreteNumberingSettings = {
      numId: this.concreteNumUniqueNumericId(),
      abstractNumId: abstractNumbering.id,
      reference,
      instance,
      overrideLevels: [typeof firstLevelStartNumber === "number" && Number.isInteger(firstLevelStartNumber) ? {
        num: 0,
        start: firstLevelStartNumber
      } : {
        num: 0,
        start: 1
      }]
    };
    this.concreteNumberingMap.set(fullReference, new ConcreteNumbering(concreteNumberingSettings));
  }
  /**
  * Gets all concrete numbering instances.
  *
  * @returns An array of all concrete numbering instances
  */
  get ConcreteNumbering() {
    return Array.from(this.concreteNumberingMap.values());
  }
  /**
  * Gets all reference configurations.
  *
  * @returns An array of all numbering reference configurations
  */
  get ReferenceConfig() {
    return Array.from(this.referenceConfigMap.values());
  }
};
var createCompatibilitySetting = (version) => new BuilderElement({
  name: "w:compatSetting",
  attributes: {
    version: {
      key: "w:val",
      value: version
    },
    name: {
      key: "w:name",
      value: "compatibilityMode"
    },
    uri: {
      key: "w:uri",
      value: "http://schemas.microsoft.com/office/word"
    }
  }
});
var Compatibility = class extends XmlComponent {
  constructor(options2) {
    super("w:compat");
    if (options2.version) this.root.push(createCompatibilitySetting(options2.version));
    if (options2.useSingleBorderforContiguousCells) this.root.push(new OnOffElement("w:useSingleBorderforContiguousCells", options2.useSingleBorderforContiguousCells));
    if (options2.wordPerfectJustification) this.root.push(new OnOffElement("w:wpJustification", options2.wordPerfectJustification));
    if (options2.noTabStopForHangingIndent) this.root.push(new OnOffElement("w:noTabHangInd", options2.noTabStopForHangingIndent));
    if (options2.noLeading) this.root.push(new OnOffElement("w:noLeading", options2.noLeading));
    if (options2.spaceForUnderline) this.root.push(new OnOffElement("w:spaceForUL", options2.spaceForUnderline));
    if (options2.noColumnBalance) this.root.push(new OnOffElement("w:noColumnBalance", options2.noColumnBalance));
    if (options2.balanceSingleByteDoubleByteWidth) this.root.push(new OnOffElement("w:balanceSingleByteDoubleByteWidth", options2.balanceSingleByteDoubleByteWidth));
    if (options2.noExtraLineSpacing) this.root.push(new OnOffElement("w:noExtraLineSpacing", options2.noExtraLineSpacing));
    if (options2.doNotLeaveBackslashAlone) this.root.push(new OnOffElement("w:doNotLeaveBackslashAlone", options2.doNotLeaveBackslashAlone));
    if (options2.underlineTrailingSpaces) this.root.push(new OnOffElement("w:ulTrailSpace", options2.underlineTrailingSpaces));
    if (options2.doNotExpandShiftReturn) this.root.push(new OnOffElement("w:doNotExpandShiftReturn", options2.doNotExpandShiftReturn));
    if (options2.spacingInWholePoints) this.root.push(new OnOffElement("w:spacingInWholePoints", options2.spacingInWholePoints));
    if (options2.lineWrapLikeWord6) this.root.push(new OnOffElement("w:lineWrapLikeWord6", options2.lineWrapLikeWord6));
    if (options2.printBodyTextBeforeHeader) this.root.push(new OnOffElement("w:printBodyTextBeforeHeader", options2.printBodyTextBeforeHeader));
    if (options2.printColorsBlack) this.root.push(new OnOffElement("w:printColBlack", options2.printColorsBlack));
    if (options2.spaceWidth) this.root.push(new OnOffElement("w:wpSpaceWidth", options2.spaceWidth));
    if (options2.showBreaksInFrames) this.root.push(new OnOffElement("w:showBreaksInFrames", options2.showBreaksInFrames));
    if (options2.subFontBySize) this.root.push(new OnOffElement("w:subFontBySize", options2.subFontBySize));
    if (options2.suppressBottomSpacing) this.root.push(new OnOffElement("w:suppressBottomSpacing", options2.suppressBottomSpacing));
    if (options2.suppressTopSpacing) this.root.push(new OnOffElement("w:suppressTopSpacing", options2.suppressTopSpacing));
    if (options2.suppressSpacingAtTopOfPage) this.root.push(new OnOffElement("w:suppressSpacingAtTopOfPage", options2.suppressSpacingAtTopOfPage));
    if (options2.suppressTopSpacingWP) this.root.push(new OnOffElement("w:suppressTopSpacingWP", options2.suppressTopSpacingWP));
    if (options2.suppressSpBfAfterPgBrk) this.root.push(new OnOffElement("w:suppressSpBfAfterPgBrk", options2.suppressSpBfAfterPgBrk));
    if (options2.swapBordersFacingPages) this.root.push(new OnOffElement("w:swapBordersFacingPages", options2.swapBordersFacingPages));
    if (options2.convertMailMergeEsc) this.root.push(new OnOffElement("w:convMailMergeEsc", options2.convertMailMergeEsc));
    if (options2.truncateFontHeightsLikeWP6) this.root.push(new OnOffElement("w:truncateFontHeightsLikeWP6", options2.truncateFontHeightsLikeWP6));
    if (options2.macWordSmallCaps) this.root.push(new OnOffElement("w:mwSmallCaps", options2.macWordSmallCaps));
    if (options2.usePrinterMetrics) this.root.push(new OnOffElement("w:usePrinterMetrics", options2.usePrinterMetrics));
    if (options2.doNotSuppressParagraphBorders) this.root.push(new OnOffElement("w:doNotSuppressParagraphBorders", options2.doNotSuppressParagraphBorders));
    if (options2.wrapTrailSpaces) this.root.push(new OnOffElement("w:wrapTrailSpaces", options2.wrapTrailSpaces));
    if (options2.footnoteLayoutLikeWW8) this.root.push(new OnOffElement("w:footnoteLayoutLikeWW8", options2.footnoteLayoutLikeWW8));
    if (options2.shapeLayoutLikeWW8) this.root.push(new OnOffElement("w:shapeLayoutLikeWW8", options2.shapeLayoutLikeWW8));
    if (options2.alignTablesRowByRow) this.root.push(new OnOffElement("w:alignTablesRowByRow", options2.alignTablesRowByRow));
    if (options2.forgetLastTabAlignment) this.root.push(new OnOffElement("w:forgetLastTabAlignment", options2.forgetLastTabAlignment));
    if (options2.adjustLineHeightInTable) this.root.push(new OnOffElement("w:adjustLineHeightInTable", options2.adjustLineHeightInTable));
    if (options2.autoSpaceLikeWord95) this.root.push(new OnOffElement("w:autoSpaceLikeWord95", options2.autoSpaceLikeWord95));
    if (options2.noSpaceRaiseLower) this.root.push(new OnOffElement("w:noSpaceRaiseLower", options2.noSpaceRaiseLower));
    if (options2.doNotUseHTMLParagraphAutoSpacing) this.root.push(new OnOffElement("w:doNotUseHTMLParagraphAutoSpacing", options2.doNotUseHTMLParagraphAutoSpacing));
    if (options2.layoutRawTableWidth) this.root.push(new OnOffElement("w:layoutRawTableWidth", options2.layoutRawTableWidth));
    if (options2.layoutTableRowsApart) this.root.push(new OnOffElement("w:layoutTableRowsApart", options2.layoutTableRowsApart));
    if (options2.useWord97LineBreakRules) this.root.push(new OnOffElement("w:useWord97LineBreakRules", options2.useWord97LineBreakRules));
    if (options2.doNotBreakWrappedTables) this.root.push(new OnOffElement("w:doNotBreakWrappedTables", options2.doNotBreakWrappedTables));
    if (options2.doNotSnapToGridInCell) this.root.push(new OnOffElement("w:doNotSnapToGridInCell", options2.doNotSnapToGridInCell));
    if (options2.selectFieldWithFirstOrLastCharacter) this.root.push(new OnOffElement("w:selectFldWithFirstOrLastChar", options2.selectFieldWithFirstOrLastCharacter));
    if (options2.applyBreakingRules) this.root.push(new OnOffElement("w:applyBreakingRules", options2.applyBreakingRules));
    if (options2.doNotWrapTextWithPunctuation) this.root.push(new OnOffElement("w:doNotWrapTextWithPunct", options2.doNotWrapTextWithPunctuation));
    if (options2.doNotUseEastAsianBreakRules) this.root.push(new OnOffElement("w:doNotUseEastAsianBreakRules", options2.doNotUseEastAsianBreakRules));
    if (options2.useWord2002TableStyleRules) this.root.push(new OnOffElement("w:useWord2002TableStyleRules", options2.useWord2002TableStyleRules));
    if (options2.growAutofit) this.root.push(new OnOffElement("w:growAutofit", options2.growAutofit));
    if (options2.useFELayout) this.root.push(new OnOffElement("w:useFELayout", options2.useFELayout));
    if (options2.useNormalStyleForList) this.root.push(new OnOffElement("w:useNormalStyleForList", options2.useNormalStyleForList));
    if (options2.doNotUseIndentAsNumberingTabStop) this.root.push(new OnOffElement("w:doNotUseIndentAsNumberingTabStop", options2.doNotUseIndentAsNumberingTabStop));
    if (options2.useAlternateEastAsianLineBreakRules) this.root.push(new OnOffElement("w:useAltKinsokuLineBreakRules", options2.useAlternateEastAsianLineBreakRules));
    if (options2.allowSpaceOfSameStyleInTable) this.root.push(new OnOffElement("w:allowSpaceOfSameStyleInTable", options2.allowSpaceOfSameStyleInTable));
    if (options2.doNotSuppressIndentation) this.root.push(new OnOffElement("w:doNotSuppressIndentation", options2.doNotSuppressIndentation));
    if (options2.doNotAutofitConstrainedTables) this.root.push(new OnOffElement("w:doNotAutofitConstrainedTables", options2.doNotAutofitConstrainedTables));
    if (options2.autofitToFirstFixedWidthCell) this.root.push(new OnOffElement("w:autofitToFirstFixedWidthCell", options2.autofitToFirstFixedWidthCell));
    if (options2.underlineTabInNumberingList) this.root.push(new OnOffElement("w:underlineTabInNumList", options2.underlineTabInNumberingList));
    if (options2.displayHangulFixedWidth) this.root.push(new OnOffElement("w:displayHangulFixedWidth", options2.displayHangulFixedWidth));
    if (options2.splitPgBreakAndParaMark) this.root.push(new OnOffElement("w:splitPgBreakAndParaMark", options2.splitPgBreakAndParaMark));
    if (options2.doNotVerticallyAlignCellWithSp) this.root.push(new OnOffElement("w:doNotVertAlignCellWithSp", options2.doNotVerticallyAlignCellWithSp));
    if (options2.doNotBreakConstrainedForcedTable) this.root.push(new OnOffElement("w:doNotBreakConstrainedForcedTable", options2.doNotBreakConstrainedForcedTable));
    if (options2.ignoreVerticalAlignmentInTextboxes) this.root.push(new OnOffElement("w:doNotVertAlignInTxbx", options2.ignoreVerticalAlignmentInTextboxes));
    if (options2.useAnsiKerningPairs) this.root.push(new OnOffElement("w:useAnsiKerningPairs", options2.useAnsiKerningPairs));
    if (options2.cachedColumnBalance) this.root.push(new OnOffElement("w:cachedColBalance", options2.cachedColumnBalance));
  }
};
var SettingsAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      wpc: "xmlns:wpc",
      mc: "xmlns:mc",
      o: "xmlns:o",
      r: "xmlns:r",
      m: "xmlns:m",
      v: "xmlns:v",
      wp14: "xmlns:wp14",
      wp: "xmlns:wp",
      w10: "xmlns:w10",
      w: "xmlns:w",
      w14: "xmlns:w14",
      w15: "xmlns:w15",
      wpg: "xmlns:wpg",
      wpi: "xmlns:wpi",
      wne: "xmlns:wne",
      wps: "xmlns:wps",
      Ignorable: "mc:Ignorable"
    });
  }
};
var Settings = class extends XmlComponent {
  constructor(options2) {
    var _options$hyphenation, _options$hyphenation2, _options$hyphenation3, _options$hyphenation4, _options$compatibilit, _ref, _options$compatibilit2, _options$compatibilit3;
    super("w:settings");
    this.root.push(new SettingsAttributes({
      wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
      mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
      o: "urn:schemas-microsoft-com:office:office",
      r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
      v: "urn:schemas-microsoft-com:vml",
      wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
      wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
      w10: "urn:schemas-microsoft-com:office:word",
      w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
      w14: "http://schemas.microsoft.com/office/word/2010/wordml",
      w15: "http://schemas.microsoft.com/office/word/2012/wordml",
      wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
      wpi: "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
      wne: "http://schemas.microsoft.com/office/word/2006/wordml",
      wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
      Ignorable: "w14 w15 wp14"
    }));
    this.root.push(new OnOffElement("w:displayBackgroundShape", true));
    if (options2.trackRevisions !== void 0) this.root.push(new OnOffElement("w:trackRevisions", options2.trackRevisions));
    if (options2.evenAndOddHeaders !== void 0) this.root.push(new OnOffElement("w:evenAndOddHeaders", options2.evenAndOddHeaders));
    if (options2.updateFields !== void 0) this.root.push(new OnOffElement("w:updateFields", options2.updateFields));
    if (options2.defaultTabStop !== void 0) this.root.push(new NumberValueElement("w:defaultTabStop", options2.defaultTabStop));
    if (((_options$hyphenation = options2.hyphenation) === null || _options$hyphenation === void 0 ? void 0 : _options$hyphenation.autoHyphenation) !== void 0) this.root.push(new OnOffElement("w:autoHyphenation", options2.hyphenation.autoHyphenation));
    if (((_options$hyphenation2 = options2.hyphenation) === null || _options$hyphenation2 === void 0 ? void 0 : _options$hyphenation2.hyphenationZone) !== void 0) this.root.push(new NumberValueElement("w:hyphenationZone", options2.hyphenation.hyphenationZone));
    if (((_options$hyphenation3 = options2.hyphenation) === null || _options$hyphenation3 === void 0 ? void 0 : _options$hyphenation3.consecutiveHyphenLimit) !== void 0) this.root.push(new NumberValueElement("w:consecutiveHyphenLimit", options2.hyphenation.consecutiveHyphenLimit));
    if (((_options$hyphenation4 = options2.hyphenation) === null || _options$hyphenation4 === void 0 ? void 0 : _options$hyphenation4.doNotHyphenateCaps) !== void 0) this.root.push(new OnOffElement("w:doNotHyphenateCaps", options2.hyphenation.doNotHyphenateCaps));
    this.root.push(new Compatibility(_objectSpread2(_objectSpread2({}, (_options$compatibilit = options2.compatibility) !== null && _options$compatibilit !== void 0 ? _options$compatibilit : {}), {}, { version: (_ref = (_options$compatibilit2 = (_options$compatibilit3 = options2.compatibility) === null || _options$compatibilit3 === void 0 ? void 0 : _options$compatibilit3.version) !== null && _options$compatibilit2 !== void 0 ? _options$compatibilit2 : options2.compatibilityModeVersion) !== null && _ref !== void 0 ? _ref : 15 })));
  }
};
var ComponentAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", { val: "w:val" });
  }
};
var Name = class extends XmlComponent {
  constructor(value) {
    super("w:name");
    this.root.push(new ComponentAttributes({ val: value }));
  }
};
var UiPriority = class extends XmlComponent {
  constructor(value) {
    super("w:uiPriority");
    this.root.push(new ComponentAttributes({ val: decimalNumber(value) }));
  }
};
var StyleAttributes = class extends XmlAttributeComponent {
  constructor(..._args) {
    super(..._args);
    _defineProperty(this, "xmlKeys", {
      type: "w:type",
      styleId: "w:styleId",
      default: "w:default",
      customStyle: "w:customStyle"
    });
  }
};
var Style = class extends XmlComponent {
  constructor(attributes, options2) {
    super("w:style");
    this.root.push(new StyleAttributes(attributes));
    if (options2.name) this.root.push(new Name(options2.name));
    if (options2.basedOn) this.root.push(new StringValueElement("w:basedOn", options2.basedOn));
    if (options2.next) this.root.push(new StringValueElement("w:next", options2.next));
    if (options2.link) this.root.push(new StringValueElement("w:link", options2.link));
    if (options2.uiPriority !== void 0) this.root.push(new UiPriority(options2.uiPriority));
    if (options2.semiHidden !== void 0) this.root.push(new OnOffElement("w:semiHidden", options2.semiHidden));
    if (options2.unhideWhenUsed !== void 0) this.root.push(new OnOffElement("w:unhideWhenUsed", options2.unhideWhenUsed));
    if (options2.quickFormat !== void 0) this.root.push(new OnOffElement("w:qFormat", options2.quickFormat));
  }
};
var StyleForParagraph = class extends Style {
  constructor(options2) {
    super({
      type: "paragraph",
      styleId: options2.id
    }, options2);
    _defineProperty(this, "paragraphProperties", void 0);
    _defineProperty(this, "runProperties", void 0);
    this.paragraphProperties = new ParagraphProperties(options2.paragraph);
    this.runProperties = new RunProperties(options2.run);
    this.root.push(this.paragraphProperties);
    this.root.push(this.runProperties);
  }
};
var StyleForCharacter = class extends Style {
  constructor(options2) {
    super({
      type: "character",
      styleId: options2.id
    }, _objectSpread2({
      uiPriority: 99,
      unhideWhenUsed: true
    }, options2));
    _defineProperty(this, "runProperties", void 0);
    this.runProperties = new RunProperties(options2.run);
    this.root.push(this.runProperties);
  }
};
var HeadingStyle = class extends StyleForParagraph {
  constructor(options2) {
    super(_objectSpread2({
      basedOn: "Normal",
      next: "Normal",
      quickFormat: true
    }, options2));
  }
};
var TitleStyle = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Title",
      name: "Title"
    }, options2));
  }
};
var Heading1Style = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Heading1",
      name: "Heading 1"
    }, options2));
  }
};
var Heading2Style = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Heading2",
      name: "Heading 2"
    }, options2));
  }
};
var Heading3Style = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Heading3",
      name: "Heading 3"
    }, options2));
  }
};
var Heading4Style = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Heading4",
      name: "Heading 4"
    }, options2));
  }
};
var Heading5Style = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Heading5",
      name: "Heading 5"
    }, options2));
  }
};
var Heading6Style = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Heading6",
      name: "Heading 6"
    }, options2));
  }
};
var StrongStyle = class extends HeadingStyle {
  constructor(options2) {
    super(_objectSpread2({
      id: "Strong",
      name: "Strong"
    }, options2));
  }
};
var ListParagraph = class extends StyleForParagraph {
  constructor(options2) {
    super(_objectSpread2({
      id: "ListParagraph",
      name: "List Paragraph",
      basedOn: "Normal",
      quickFormat: true
    }, options2));
  }
};
var FootnoteText = class extends StyleForParagraph {
  constructor(options2) {
    super(_objectSpread2({
      id: "FootnoteText",
      name: "footnote text",
      link: "FootnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: true,
      unhideWhenUsed: true,
      paragraph: { spacing: {
        after: 0,
        line: 240,
        lineRule: LineRuleType.AUTO
      } },
      run: { size: 20 }
    }, options2));
  }
};
var FootnoteReferenceStyle = class extends StyleForCharacter {
  constructor(options2) {
    super(_objectSpread2({
      id: "FootnoteReference",
      name: "footnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: true,
      run: { superScript: true }
    }, options2));
  }
};
var FootnoteTextChar = class extends StyleForCharacter {
  constructor(options2) {
    super(_objectSpread2({
      id: "FootnoteTextChar",
      name: "Footnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "FootnoteText",
      semiHidden: true,
      run: { size: 20 }
    }, options2));
  }
};
var EndnoteText = class extends StyleForParagraph {
  constructor(options2) {
    super(_objectSpread2({
      id: "EndnoteText",
      name: "endnote text",
      link: "EndnoteTextChar",
      basedOn: "Normal",
      uiPriority: 99,
      semiHidden: true,
      unhideWhenUsed: true,
      paragraph: { spacing: {
        after: 0,
        line: 240,
        lineRule: LineRuleType.AUTO
      } },
      run: { size: 20 }
    }, options2));
  }
};
var EndnoteReferenceStyle = class extends StyleForCharacter {
  constructor(options2) {
    super(_objectSpread2({
      id: "EndnoteReference",
      name: "endnote reference",
      basedOn: "DefaultParagraphFont",
      semiHidden: true,
      run: { superScript: true }
    }, options2));
  }
};
var EndnoteTextChar = class extends StyleForCharacter {
  constructor(options2) {
    super(_objectSpread2({
      id: "EndnoteTextChar",
      name: "Endnote Text Char",
      basedOn: "DefaultParagraphFont",
      link: "EndnoteText",
      semiHidden: true,
      run: { size: 20 }
    }, options2));
  }
};
var HyperlinkStyle = class extends StyleForCharacter {
  constructor(options2) {
    super(_objectSpread2({
      id: "Hyperlink",
      name: "Hyperlink",
      basedOn: "DefaultParagraphFont",
      run: {
        color: "0563C1",
        underline: { type: UnderlineType.SINGLE }
      }
    }, options2));
  }
};
var Styles = class extends XmlComponent {
  constructor(options2) {
    super("w:styles");
    if (options2.initialStyles) this.root.push(options2.initialStyles);
    if (options2.importedStyles) for (const style of options2.importedStyles) this.root.push(style);
    if (options2.paragraphStyles) for (const style of options2.paragraphStyles) this.root.push(new StyleForParagraph(style));
    if (options2.characterStyles) for (const style of options2.characterStyles) this.root.push(new StyleForCharacter(style));
  }
};
var ParagraphPropertiesDefaults = class extends XmlComponent {
  constructor(options2) {
    super("w:pPrDefault");
    this.root.push(new ParagraphProperties(options2));
  }
};
var RunPropertiesDefaults = class extends XmlComponent {
  constructor(options2) {
    super("w:rPrDefault");
    this.root.push(new RunProperties(options2));
  }
};
var DocumentDefaults = class extends XmlComponent {
  constructor(options2) {
    super("w:docDefaults");
    _defineProperty(this, "runPropertiesDefaults", void 0);
    _defineProperty(this, "paragraphPropertiesDefaults", void 0);
    this.runPropertiesDefaults = new RunPropertiesDefaults(options2.run);
    this.paragraphPropertiesDefaults = new ParagraphPropertiesDefaults(options2.paragraph);
    this.root.push(this.runPropertiesDefaults);
    this.root.push(this.paragraphPropertiesDefaults);
  }
};
var ExternalStylesFactory = class {
  /**
  * Creates new Styles based on the given XML data.
  *
  * Parses the styles XML and converts them to XmlComponent instances.
  *
  * Example content from styles.xml:
  * ```xml
  * <?xml version="1.0"?>
  * <w:styles xmlns:mc="some schema" ...>
  *   <w:style w:type="paragraph" w:styleId="Heading1">
  *     <w:name w:val="heading 1"/>
  *     ...
  *   </w:style>
  *   <w:style w:type="paragraph" w:styleId="Heading2">
  *     <w:name w:val="heading 2"/>
  *     ...
  *   </w:style>
  *   <w:docDefaults>...</w:docDefaults>
  * </w:styles>
  * ```
  *
  * @param xmlData - XML string containing styles data from styles.xml
  * @returns Styles object containing all parsed styles
  * @throws Error if styles element cannot be found in the XML
  */
  newInstance(xmlData) {
    const xmlObj = (0, import_lib.xml2js)(xmlData, { compact: false });
    let stylesXmlElement;
    for (const xmlElm of xmlObj.elements || []) if (xmlElm.name === "w:styles") stylesXmlElement = xmlElm;
    if (stylesXmlElement === void 0) throw new Error("can not find styles element");
    const stylesElements = stylesXmlElement.elements || [];
    return {
      initialStyles: new ImportedRootElementAttributes(stylesXmlElement.attributes),
      importedStyles: stylesElements.map((childElm) => convertToXmlComponent(childElm))
    };
  }
};
var DefaultStylesFactory = class {
  newInstance(options2 = {}) {
    var _options$document;
    return {
      initialStyles: new DocumentAttributes([
        "mc",
        "r",
        "w",
        "w14",
        "w15"
      ], "w14 w15"),
      importedStyles: [
        new DocumentDefaults((_options$document = options2.document) !== null && _options$document !== void 0 ? _options$document : {}),
        new TitleStyle(_objectSpread2({ run: { size: 56 } }, options2.title)),
        new Heading1Style(_objectSpread2({ run: {
          color: "2E74B5",
          size: 32
        } }, options2.heading1)),
        new Heading2Style(_objectSpread2({ run: {
          color: "2E74B5",
          size: 26
        } }, options2.heading2)),
        new Heading3Style(_objectSpread2({ run: {
          color: "1F4D78",
          size: 24
        } }, options2.heading3)),
        new Heading4Style(_objectSpread2({ run: {
          color: "2E74B5",
          italics: true
        } }, options2.heading4)),
        new Heading5Style(_objectSpread2({ run: { color: "2E74B5" } }, options2.heading5)),
        new Heading6Style(_objectSpread2({ run: { color: "1F4D78" } }, options2.heading6)),
        new StrongStyle(_objectSpread2({ run: { bold: true } }, options2.strong)),
        new ListParagraph(options2.listParagraph || {}),
        new HyperlinkStyle(options2.hyperlink || {}),
        new FootnoteReferenceStyle(options2.footnoteReference || {}),
        new FootnoteText(options2.footnoteText || {}),
        new FootnoteTextChar(options2.footnoteTextChar || {}),
        new EndnoteReferenceStyle(options2.endnoteReference || {}),
        new EndnoteText(options2.endnoteText || {}),
        new EndnoteTextChar(options2.endnoteTextChar || {})
      ]
    };
  }
};
var File = class {
  constructor(options2) {
    var _options$creator, _options$revision, _options$lastModified, _options$comments, _options$customProper, _options$features, _options$features2, _options$hyphenation, _options$hyphenation2, _options$hyphenation3, _options$hyphenation4, _options$fonts;
    _defineProperty(this, "currentRelationshipId", 1);
    _defineProperty(this, "documentWrapper", void 0);
    _defineProperty(this, "headers", []);
    _defineProperty(this, "footers", []);
    _defineProperty(this, "coreProperties", void 0);
    _defineProperty(this, "numbering", void 0);
    _defineProperty(this, "media", void 0);
    _defineProperty(this, "fileRelationships", void 0);
    _defineProperty(this, "footnotesWrapper", void 0);
    _defineProperty(this, "endnotesWrapper", void 0);
    _defineProperty(this, "settings", void 0);
    _defineProperty(this, "contentTypes", void 0);
    _defineProperty(this, "customProperties", void 0);
    _defineProperty(this, "appProperties", void 0);
    _defineProperty(this, "styles", void 0);
    _defineProperty(this, "comments", void 0);
    _defineProperty(
      this,
      /** Extended comment data for reply threading and resolved state (word/commentsExtended.xml). */
      "commentsExtended",
      void 0
    );
    _defineProperty(this, "fontWrapper", void 0);
    this.coreProperties = new CoreProperties(_objectSpread2(_objectSpread2({}, options2), {}, {
      creator: (_options$creator = options2.creator) !== null && _options$creator !== void 0 ? _options$creator : "Un-named",
      revision: (_options$revision = options2.revision) !== null && _options$revision !== void 0 ? _options$revision : 1,
      lastModifiedBy: (_options$lastModified = options2.lastModifiedBy) !== null && _options$lastModified !== void 0 ? _options$lastModified : "Un-named"
    }));
    this.numbering = new Numbering(options2.numbering ? options2.numbering : { config: [] });
    this.comments = new Comments((_options$comments = options2.comments) !== null && _options$comments !== void 0 ? _options$comments : { children: [] });
    if (this.comments.ThreadData) this.commentsExtended = new CommentsExtended(this.comments.ThreadData);
    this.fileRelationships = new Relationships();
    this.customProperties = new CustomProperties((_options$customProper = options2.customProperties) !== null && _options$customProper !== void 0 ? _options$customProper : []);
    this.appProperties = new AppProperties();
    this.footnotesWrapper = new FootnotesWrapper();
    this.endnotesWrapper = new EndnotesWrapper();
    this.contentTypes = new ContentTypes();
    this.documentWrapper = new DocumentWrapper({ background: options2.background });
    this.settings = new Settings({
      compatibilityModeVersion: options2.compatabilityModeVersion,
      compatibility: options2.compatibility,
      evenAndOddHeaders: options2.evenAndOddHeaderAndFooters ? true : false,
      trackRevisions: (_options$features = options2.features) === null || _options$features === void 0 ? void 0 : _options$features.trackRevisions,
      updateFields: (_options$features2 = options2.features) === null || _options$features2 === void 0 ? void 0 : _options$features2.updateFields,
      defaultTabStop: options2.defaultTabStop,
      hyphenation: {
        autoHyphenation: (_options$hyphenation = options2.hyphenation) === null || _options$hyphenation === void 0 ? void 0 : _options$hyphenation.autoHyphenation,
        hyphenationZone: (_options$hyphenation2 = options2.hyphenation) === null || _options$hyphenation2 === void 0 ? void 0 : _options$hyphenation2.hyphenationZone,
        consecutiveHyphenLimit: (_options$hyphenation3 = options2.hyphenation) === null || _options$hyphenation3 === void 0 ? void 0 : _options$hyphenation3.consecutiveHyphenLimit,
        doNotHyphenateCaps: (_options$hyphenation4 = options2.hyphenation) === null || _options$hyphenation4 === void 0 ? void 0 : _options$hyphenation4.doNotHyphenateCaps
      }
    });
    this.media = new Media();
    if (options2.externalStyles !== void 0) {
      var _options$styles;
      const defaultStyles = new DefaultStylesFactory().newInstance((_options$styles = options2.styles) === null || _options$styles === void 0 ? void 0 : _options$styles.default);
      const externalStyles = new ExternalStylesFactory().newInstance(options2.externalStyles);
      this.styles = new Styles(_objectSpread2(_objectSpread2({}, externalStyles), {}, { importedStyles: [...defaultStyles.importedStyles, ...externalStyles.importedStyles] }));
    } else if (options2.styles) {
      const defaultStyles = new DefaultStylesFactory().newInstance(options2.styles.default);
      this.styles = new Styles(_objectSpread2(_objectSpread2({}, defaultStyles), options2.styles));
    } else {
      const stylesFactory = new DefaultStylesFactory();
      this.styles = new Styles(stylesFactory.newInstance());
    }
    this.addDefaultRelationships();
    for (const section of options2.sections) this.addSection(section);
    if (options2.footnotes) for (const key in options2.footnotes) this.footnotesWrapper.View.createFootNote(parseFloat(key), options2.footnotes[key].children);
    if (options2.endnotes) for (const key in options2.endnotes) this.endnotesWrapper.View.createEndnote(parseFloat(key), options2.endnotes[key].children);
    this.fontWrapper = new FontWrapper((_options$fonts = options2.fonts) !== null && _options$fonts !== void 0 ? _options$fonts : []);
  }
  addSection({ headers = {}, footers = {}, children, properties }) {
    this.documentWrapper.View.Body.addSection(_objectSpread2(_objectSpread2({}, properties), {}, {
      headerWrapperGroup: {
        default: headers.default ? this.createHeader(headers.default) : void 0,
        first: headers.first ? this.createHeader(headers.first) : void 0,
        even: headers.even ? this.createHeader(headers.even) : void 0
      },
      footerWrapperGroup: {
        default: footers.default ? this.createFooter(footers.default) : void 0,
        first: footers.first ? this.createFooter(footers.first) : void 0,
        even: footers.even ? this.createFooter(footers.even) : void 0
      }
    }));
    for (const child of children) this.documentWrapper.View.add(child);
  }
  createHeader(header) {
    const wrapper = new HeaderWrapper(this.media, this.currentRelationshipId++);
    for (const child of header.options.children) wrapper.add(child);
    this.addHeaderToDocument(wrapper);
    return wrapper;
  }
  createFooter(footer) {
    const wrapper = new FooterWrapper(this.media, this.currentRelationshipId++);
    for (const child of footer.options.children) wrapper.add(child);
    this.addFooterToDocument(wrapper);
    return wrapper;
  }
  addHeaderToDocument(header, type = HeaderFooterReferenceType.DEFAULT) {
    this.headers.push({
      header,
      type
    });
    this.documentWrapper.Relationships.addRelationship(header.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`);
    this.contentTypes.addHeader(this.headers.length);
  }
  addFooterToDocument(footer, type = HeaderFooterReferenceType.DEFAULT) {
    this.footers.push({
      footer,
      type
    });
    this.documentWrapper.Relationships.addRelationship(footer.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", `footer${this.footers.length}.xml`);
    this.contentTypes.addFooter(this.footers.length);
  }
  addDefaultRelationships() {
    this.fileRelationships.addRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml");
    this.fileRelationships.addRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml");
    this.fileRelationships.addRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml");
    this.fileRelationships.addRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml");
    this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml");
    this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml");
    this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml");
    this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", "endnotes.xml");
    this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml");
    this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml");
    if (this.commentsExtended) {
      this.documentWrapper.Relationships.addRelationship(this.currentRelationshipId++, "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", "commentsExtended.xml");
      this.contentTypes.addCommentsExtended();
    }
  }
  get Document() {
    return this.documentWrapper;
  }
  get Styles() {
    return this.styles;
  }
  get CoreProperties() {
    return this.coreProperties;
  }
  get Numbering() {
    return this.numbering;
  }
  get Media() {
    return this.media;
  }
  get FileRelationships() {
    return this.fileRelationships;
  }
  get Headers() {
    return this.headers.map((item) => item.header);
  }
  get Footers() {
    return this.footers.map((item) => item.footer);
  }
  get ContentTypes() {
    return this.contentTypes;
  }
  get CustomProperties() {
    return this.customProperties;
  }
  get AppProperties() {
    return this.appProperties;
  }
  get FootNotes() {
    return this.footnotesWrapper;
  }
  get Endnotes() {
    return this.endnotesWrapper;
  }
  get Settings() {
    return this.settings;
  }
  get Comments() {
    return this.comments;
  }
  /** Extended comments part for reply threading. Undefined when no comment threads exist. */
  get CommentsExtended() {
    return this.commentsExtended;
  }
  get FontTable() {
    return this.fontWrapper;
  }
};
var Footer = class {
  constructor(options2 = { children: [] }) {
    _defineProperty(this, "options", void 0);
    this.options = options2;
  }
};
var require_jszip_min = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist$1();
  init_dist();
  (function(e) {
    if ("object" == typeof exports2 && "undefined" != typeof module2) module2.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
  })(function() {
    return function s(a, o, h) {
      function u(r, e2) {
        if (!o[r]) {
          if (!a[r]) {
            var t = "function" == typeof __require && __require;
            if (!e2 && t) return t(r, true);
            if (l) return l(r, true);
            var n = /* @__PURE__ */ new Error("Cannot find module '" + r + "'");
            throw n.code = "MODULE_NOT_FOUND", n;
          }
          var i = o[r] = { exports: {} };
          a[r][0].call(i.exports, function(e3) {
            var t2 = a[r][1][e3];
            return u(t2 || e3);
          }, i, i.exports, s, a, o, h);
        }
        return o[r].exports;
      }
      for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
      return u;
    }({
      1: [function(e, t, r) {
        "use strict";
        var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        r.encode = function(e2) {
          for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
          return h.join("");
        }, r.decode = function(e2) {
          var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
          if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
          var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
          return l;
        };
      }, {
        "./support": 30,
        "./utils": 32
      }],
      2: [function(e, t, r) {
        "use strict";
        var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
        function o(e2, t2, r2, n2, i2) {
          this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
        }
        o.prototype = {
          getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          },
          getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        }, o.createWorkerFrom = function(e2, t2, r2) {
          return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
        }, t.exports = o;
      }, {
        "./external": 6,
        "./stream/Crc32Probe": 25,
        "./stream/DataLengthProbe": 26,
        "./stream/DataWorker": 27
      }],
      3: [function(e, t, r) {
        "use strict";
        var n = e("./stream/GenericWorker");
        r.STORE = {
          magic: "\0\0",
          compressWorker: function() {
            return new n("STORE compression");
          },
          uncompressWorker: function() {
            return new n("STORE decompression");
          }
        }, r.DEFLATE = e("./flate");
      }, {
        "./flate": 7,
        "./stream/GenericWorker": 28
      }],
      4: [function(e, t, r) {
        "use strict";
        var n = e("./utils");
        var o = function() {
          for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
            e2 = r2;
            for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r2] = e2;
          }
          return t2;
        }();
        t.exports = function(e2, t2) {
          return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? function(e3, t3, r2, n2) {
            var i = o, s = n2 + r2;
            e3 ^= -1;
            for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
            return -1 ^ e3;
          }(0 | t2, e2, e2.length, 0) : function(e3, t3, r2, n2) {
            var i = o, s = n2 + r2;
            e3 ^= -1;
            for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
            return -1 ^ e3;
          }(0 | t2, e2, e2.length, 0) : 0;
        };
      }, { "./utils": 32 }],
      5: [function(e, t, r) {
        "use strict";
        r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
      }, {}],
      6: [function(e, t, r) {
        "use strict";
        var n = null;
        n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
      }, { lie: 37 }],
      7: [function(e, t, r) {
        "use strict";
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
        function h(e2, t2) {
          a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
        }
        r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
          this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
        }, h.prototype.flush = function() {
          a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
        }, h.prototype.cleanUp = function() {
          a.prototype.cleanUp.call(this), this._pako = null;
        }, h.prototype._createPako = function() {
          this._pako = new i[this._pakoAction]({
            raw: true,
            level: this._pakoOptions.level || -1
          });
          var t2 = this;
          this._pako.onData = function(e2) {
            t2.push({
              data: e2,
              meta: t2.meta
            });
          };
        }, r.compressWorker = function(e2) {
          return new h("Deflate", e2);
        }, r.uncompressWorker = function() {
          return new h("Inflate", {});
        };
      }, {
        "./stream/GenericWorker": 28,
        "./utils": 32,
        pako: 38
      }],
      8: [function(e, t, r) {
        "use strict";
        function A(e2, t2) {
          var r2, n2 = "";
          for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
          return n2;
        }
        function n(e2, t2, r2, n2, i2, s2) {
          var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = {
            crc32: 0,
            compressedSize: 0,
            uncompressedSize: 0
          };
          t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
          var S = 0;
          t2 && (S |= 8), l || !_ && !g || (S |= 2048);
          var z = 0, C = 0;
          w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= function(e3, t3) {
            var r3 = e3;
            return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
          }(h.unixPermissions, w)) : (C = 20, z |= function(e3) {
            return 63 & (e3 || 0);
          }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
          var E = "";
          return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), {
            fileRecord: R.LOCAL_FILE_HEADER + E + f + b,
            dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p
          };
        }
        var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
        function s(e2, t2, r2, n2) {
          i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        I.inherits(s, i), s.prototype.push = function(e2) {
          var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
          this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, {
            data: e2.data,
            meta: {
              currentFile: this.currentFile,
              percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100
            }
          }));
        }, s.prototype.openedSource = function(e2) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
          var t2 = this.streamFiles && !e2.file.dir;
          if (t2) {
            var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({
              data: r2.fileRecord,
              meta: { percent: 0 }
            });
          } else this.accumulate = true;
        }, s.prototype.closedSource = function(e2) {
          this.accumulate = false;
          var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(r2.dirRecord), t2) this.push({
            data: function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            }(e2),
            meta: { percent: 100 }
          });
          else for (this.push({
            data: r2.fileRecord,
            meta: { percent: 0 }
          }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, s.prototype.flush = function() {
          for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({
            data: this.dirRecords[t2],
            meta: { percent: 100 }
          });
          var r2 = this.bytesWritten - e2, n2 = function(e3, t3, r3, n3, i2) {
            var s2 = I.transformTo("string", i2(n3));
            return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
          }(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
          this.push({
            data: n2,
            meta: { percent: 100 }
          });
        }, s.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, s.prototype.registerPrevious = function(e2) {
          this._sources.push(e2);
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, s.prototype.resume = function() {
          return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
        }, s.prototype.error = function(e2) {
          var t2 = this._sources;
          if (!i.prototype.error.call(this, e2)) return false;
          for (var r2 = 0; r2 < t2.length; r2++) try {
            t2[r2].error(e2);
          } catch (e3) {
          }
          return true;
        }, s.prototype.lock = function() {
          i.prototype.lock.call(this);
          for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
        }, t.exports = s;
      }, {
        "../crc32": 4,
        "../signature": 23,
        "../stream/GenericWorker": 28,
        "../utf8": 31,
        "../utils": 32
      }],
      9: [function(e, t, r) {
        "use strict";
        var u = e("../compressions"), n = e("./ZipFileWorker");
        r.generateWorker = function(e2, a, t2) {
          var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
          try {
            e2.forEach(function(e3, t3) {
              h++;
              var r2 = function(e4, t4) {
                var r3 = e4 || t4, n3 = u[r3];
                if (!n3) throw new Error(r3 + " is not a valid compression method !");
                return n3;
              }(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
              t3._compressWorker(r2, n2).withStreamInfo("file", {
                name: e3,
                dir: i,
                date: s,
                comment: t3.comment || "",
                unixPermissions: t3.unixPermissions,
                dosPermissions: t3.dosPermissions
              }).pipe(o);
            }), o.entriesCount = h;
          } catch (e3) {
            o.error(e3);
          }
          return o;
        };
      }, {
        "../compressions": 3,
        "./ZipFileWorker": 8
      }],
      10: [function(e, t, r) {
        "use strict";
        function n() {
          if (!(this instanceof n)) return new n();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var e2 = new n();
            for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
            return e2;
          };
        }
        (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e2, t2) {
          return new n().loadAsync(e2, t2);
        }, n.external = e("./external"), t.exports = n;
      }, {
        "./defaults": 5,
        "./external": 6,
        "./load": 11,
        "./object": 15,
        "./support": 30
      }],
      11: [function(e, t, r) {
        "use strict";
        var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
        function f(n2) {
          return new i.Promise(function(e2, t2) {
            var r2 = n2.decompressed.getContentWorker().pipe(new a());
            r2.on("error", function(e3) {
              t2(e3);
            }).on("end", function() {
              r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(/* @__PURE__ */ new Error("Corrupted zip : CRC32 mismatch")) : e2();
            }).resume();
          });
        }
        t.exports = function(e2, o) {
          var h = this;
          return o = u.extend(o || {}, {
            base64: false,
            checkCRC32: false,
            optimizedBinaryString: false,
            createFolders: false,
            decodeFileName: n.utf8decode
          }), l.isNode && l.isStream(e2) ? i.Promise.reject(/* @__PURE__ */ new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
            var t2 = new s(o);
            return t2.load(e3), t2;
          }).then(function(e3) {
            var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
            if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
            return i.Promise.all(t2);
          }).then(function(e3) {
            for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
              var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
              h.file(a2, i2.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: i2.date,
                dir: i2.dir,
                comment: i2.fileCommentStr.length ? i2.fileCommentStr : null,
                unixPermissions: i2.unixPermissions,
                dosPermissions: i2.dosPermissions,
                createFolders: o.createFolders
              }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
            }
            return t2.zipComment.length && (h.comment = t2.zipComment), h;
          });
        };
      }, {
        "./external": 6,
        "./nodejsUtils": 14,
        "./stream/Crc32Probe": 25,
        "./utf8": 31,
        "./utils": 32,
        "./zipEntries": 33
      }],
      12: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("../stream/GenericWorker");
        function s(e2, t2) {
          i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
        }
        n.inherits(s, i), s.prototype._bindStream = function(e2) {
          var t2 = this;
          (this._stream = e2).pause(), e2.on("data", function(e3) {
            t2.push({
              data: e3,
              meta: { percent: 0 }
            });
          }).on("error", function(e3) {
            t2.isPaused ? this.generatedError = e3 : t2.error(e3);
          }).on("end", function() {
            t2.isPaused ? t2._upstreamEnded = true : t2.end();
          });
        }, s.prototype.pause = function() {
          return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
        }, s.prototype.resume = function() {
          return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
        }, t.exports = s;
      }, {
        "../stream/GenericWorker": 28,
        "../utils": 32
      }],
      13: [function(e, t, r) {
        "use strict";
        var i = e("readable-stream").Readable;
        function n(e2, t2, r2) {
          i.call(this, t2), this._helper = e2;
          var n2 = this;
          e2.on("data", function(e3, t3) {
            n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
          }).on("error", function(e3) {
            n2.emit("error", e3);
          }).on("end", function() {
            n2.push(null);
          });
        }
        e("../utils").inherits(n, i), n.prototype._read = function() {
          this._helper.resume();
        }, t.exports = n;
      }, {
        "../utils": 32,
        "readable-stream": 16
      }],
      14: [function(e, t, r) {
        "use strict";
        t.exports = {
          isNode: "undefined" != typeof Buffer,
          newBufferFrom: function(e2, t2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t2);
          },
          allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t2 = new Buffer(e2);
            return t2.fill(0), t2;
          },
          isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          },
          isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          }
        };
      }, {}],
      15: [function(e, t, r) {
        "use strict";
        function s(e2, t2, r2) {
          var n, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
          s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n = _(e2)) && b.call(this, n, true);
          var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
          r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
          var o2 = null;
          o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
          var h2 = new d(e2, o2, s2);
          this.files[e2] = h2;
        }
        var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
          "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
          var t2 = e2.lastIndexOf("/");
          return 0 < t2 ? e2.substring(0, t2) : "";
        }, g = function(e2) {
          return "/" !== e2.slice(-1) && (e2 += "/"), e2;
        }, b = function(e2, t2) {
          return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, {
            dir: true,
            createFolders: t2
          }), this.files[e2];
        };
        function h(e2) {
          return "[object RegExp]" === Object.prototype.toString.call(e2);
        }
        t.exports = {
          load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          forEach: function(e2) {
            var t2, r2, n;
            for (t2 in this.files) n = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n);
          },
          filter: function(r2) {
            var n = [];
            return this.forEach(function(e2, t2) {
              r2(e2, t2) && n.push(t2);
            }), n;
          },
          file: function(e2, t2, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
            if (h(e2)) {
              var n = e2;
              return this.filter(function(e3, t3) {
                return !t3.dir && n.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          },
          folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t3) {
              return t3.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t2 = b.call(this, e2), n = this.clone();
            return n.root = t2.name, n;
          },
          remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t2 = this.filter(function(e3, t3) {
              return t3.name.slice(0, r2.length) === r2;
            }), n = 0; n < t2.length; n++) delete this.files[t2[n].name];
            return this;
          },
          generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          },
          generateInternalStream: function(e2) {
            var t2, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, {
                streamFiles: false,
                compression: "STORE",
                compressionOptions: null,
                type: "",
                platform: "DOS",
                comment: null,
                mimeType: "application/zip",
                encodeFileName: i.utf8encode
              })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n = r2.comment || this.comment || "";
              t2 = o.generateWorker(this, r2, n);
            } catch (e3) {
              (t2 = new l("error")).error(e3);
            }
            return new a(t2, r2.type || "string", r2.mimeType);
          },
          generateAsync: function(e2, t2) {
            return this.generateInternalStream(e2).accumulate(t2);
          },
          generateNodeStream: function(e2, t2) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
          }
        };
      }, {
        "./compressedObject": 2,
        "./defaults": 5,
        "./generate": 9,
        "./nodejs/NodejsStreamInputAdapter": 12,
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31,
        "./utils": 32,
        "./zipObject": 35
      }],
      16: [function(e, t, r) {
        "use strict";
        t.exports = e("stream");
      }, { stream: void 0 }],
      17: [function(e, t, r) {
        "use strict";
        var n = e("./DataReader");
        function i(e2) {
          n.call(this, e2);
          for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
        }
        e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
          return this.data[this.zero + e2];
        }, i.prototype.lastIndexOfSignature = function(e2) {
          for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
          return -1;
        }, i.prototype.readAndCheckSignature = function(e2) {
          var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
          return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
        }, i.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return [];
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      18: [function(e, t, r) {
        "use strict";
        var n = e("../utils");
        function i(e2) {
          this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
        }
        i.prototype = {
          checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          },
          checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          },
          setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          },
          skip: function(e2) {
            this.setIndex(this.index + e2);
          },
          byteAt: function() {
          },
          readInt: function(e2) {
            var t2, r2 = 0;
            for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
            return this.index += e2, r2;
          },
          readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          },
          readData: function() {
          },
          lastIndexOfSignature: function() {
          },
          readAndCheckSignature: function() {
          },
          readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          }
        }, t.exports = i;
      }, { "../utils": 32 }],
      19: [function(e, t, r) {
        "use strict";
        var n = e("./Uint8ArrayReader");
        function i(e2) {
          n.call(this, e2);
        }
        e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, {
        "../utils": 32,
        "./Uint8ArrayReader": 21
      }],
      20: [function(e, t, r) {
        "use strict";
        var n = e("./DataReader");
        function i(e2) {
          n.call(this, e2);
        }
        e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
          return this.data.charCodeAt(this.zero + e2);
        }, i.prototype.lastIndexOfSignature = function(e2) {
          return this.data.lastIndexOf(e2) - this.zero;
        }, i.prototype.readAndCheckSignature = function(e2) {
          return e2 === this.readData(4);
        }, i.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, {
        "../utils": 32,
        "./DataReader": 18
      }],
      21: [function(e, t, r) {
        "use strict";
        var n = e("./ArrayReader");
        function i(e2) {
          n.call(this, e2);
        }
        e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
          var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, {
        "../utils": 32,
        "./ArrayReader": 17
      }],
      22: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
        t.exports = function(e2) {
          var t2 = n.getTypeOf(e2);
          return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
        };
      }, {
        "../support": 30,
        "../utils": 32,
        "./ArrayReader": 17,
        "./NodeBufferReader": 19,
        "./StringReader": 20,
        "./Uint8ArrayReader": 21
      }],
      23: [function(e, t, r) {
        "use strict";
        r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}],
      24: [function(e, t, r) {
        "use strict";
        var n = e("./GenericWorker"), i = e("../utils");
        function s(e2) {
          n.call(this, "ConvertWorker to " + e2), this.destType = e2;
        }
        i.inherits(s, n), s.prototype.processChunk = function(e2) {
          this.push({
            data: i.transformTo(this.destType, e2.data),
            meta: e2.meta
          });
        }, t.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      25: [function(e, t, r) {
        "use strict";
        var n = e("./GenericWorker"), i = e("../crc32");
        function s() {
          n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
          this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
        }, t.exports = s;
      }, {
        "../crc32": 4,
        "../utils": 32,
        "./GenericWorker": 28
      }],
      26: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("./GenericWorker");
        function s(e2) {
          i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
        }
        n.inherits(s, i), s.prototype.processChunk = function(e2) {
          if (e2) {
            var t2 = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = t2 + e2.data.length;
          }
          i.prototype.processChunk.call(this, e2);
        }, t.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      27: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("./GenericWorker");
        function s(e2) {
          i.call(this, "DataWorker");
          var t2 = this;
          this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
            t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
          }, function(e3) {
            t2.error(e3);
          });
        }
        n.inherits(s, i), s.prototype.cleanUp = function() {
          i.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return false;
          var e2 = null, t2 = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              e2 = this.data.substring(this.index, t2);
              break;
            case "uint8array":
              e2 = this.data.subarray(this.index, t2);
              break;
            case "array":
            case "nodebuffer":
              e2 = this.data.slice(this.index, t2);
          }
          return this.index = t2, this.push({
            data: e2,
            meta: { percent: this.max ? this.index / this.max * 100 : 0 }
          });
        }, t.exports = s;
      }, {
        "../utils": 32,
        "./GenericWorker": 28
      }],
      28: [function(e, t, r) {
        "use strict";
        function n(e2) {
          this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = {
            data: [],
            end: [],
            error: []
          }, this.previous = null;
        }
        n.prototype = {
          push: function(e2) {
            this.emit("data", e2);
          },
          end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          },
          error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          },
          on: function(e2, t2) {
            return this._listeners[e2].push(t2), this;
          },
          cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          },
          emit: function(e2, t2) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
          },
          pipe: function(e2) {
            return e2.registerPrevious(this);
          },
          registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          },
          pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          },
          resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          },
          flush: function() {
          },
          processChunk: function(e2) {
            this.push(e2);
          },
          withStreamInfo: function(e2, t2) {
            return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
          },
          mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          },
          lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          },
          toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          }
        }, t.exports = n;
      }, {}],
      29: [function(e, t, r) {
        "use strict";
        var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
        if (n.nodestream) try {
          o = e("../nodejs/NodejsStreamOutputAdapter");
        } catch (e2) {
        }
        function l(e2, o2) {
          return new a.Promise(function(t2, r2) {
            var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
            e2.on("data", function(e3, t3) {
              n2.push(e3), o2 && o2(t3);
            }).on("error", function(e3) {
              n2 = [], r2(e3);
            }).on("end", function() {
              try {
                t2(function(e3, t3, r3) {
                  switch (e3) {
                    case "blob":
                      return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                    case "base64":
                      return u.encode(t3);
                    default:
                      return h.transformTo(e3, t3);
                  }
                }(s2, function(e3, t3) {
                  var r3, n3 = 0, i3 = null, s3 = 0;
                  for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                  switch (e3) {
                    case "string":
                      return t3.join("");
                    case "array":
                      return Array.prototype.concat.apply([], t3);
                    case "uint8array":
                      for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                      return i3;
                    case "nodebuffer":
                      return Buffer.concat(t3);
                    default:
                      throw new Error("concat : unsupported type '" + e3 + "'");
                  }
                }(i2, n2), a2));
              } catch (e3) {
                r2(e3);
              }
              n2 = [];
            }).resume();
          });
        }
        function f(e2, t2, r2) {
          var n2 = t2;
          switch (t2) {
            case "blob":
            case "arraybuffer":
              n2 = "uint8array";
              break;
            case "base64":
              n2 = "string";
          }
          try {
            this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
          } catch (e3) {
            this._worker = new s("error"), this._worker.error(e3);
          }
        }
        f.prototype = {
          accumulate: function(e2) {
            return l(this, e2);
          },
          on: function(e2, t2) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t2.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t2, arguments, r2);
            }), this;
          },
          resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          },
          pause: function() {
            return this._worker.pause(), this;
          },
          toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          }
        }, t.exports = f;
      }, {
        "../base64": 1,
        "../external": 6,
        "../nodejs/NodejsStreamOutputAdapter": 13,
        "../support": 30,
        "../utils": 32,
        "./ConvertWorker": 24,
        "./GenericWorker": 28
      }],
      30: [function(e, t, r) {
        "use strict";
        if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
        else {
          var n = /* @__PURE__ */ new ArrayBuffer(0);
          try {
            r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
          } catch (e2) {
            try {
              var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
            } catch (e3) {
              r.blob = false;
            }
          }
        }
        try {
          r.nodestream = !!e("readable-stream").Readable;
        } catch (e2) {
          r.nodestream = false;
        }
      }, { "readable-stream": 16 }],
      31: [function(e, t, s) {
        "use strict";
        for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
        u[254] = u[254] = 1;
        function a() {
          n.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function l() {
          n.call(this, "utf-8 encode");
        }
        s.utf8encode = function(e2) {
          return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : function(e3) {
            var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
            for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          }(e2);
        }, s.utf8decode = function(e2) {
          return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : function(e3) {
            var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
            for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
            else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
            else {
              for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
              1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
            }
            return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
          }(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
        }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
          var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
          if (this.leftOver && this.leftOver.length) {
            if (h.uint8array) {
              var r2 = t2;
              (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
            } else t2 = this.leftOver.concat(t2);
            this.leftOver = null;
          }
          var n2 = function(e3, t3) {
            var r3;
            for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
            return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
          }(t2), i2 = t2;
          n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({
            data: s.utf8decode(i2),
            meta: e2.meta
          });
        }, a.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({
            data: s.utf8decode(this.leftOver),
            meta: {}
          }), this.leftOver = null);
        }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
          this.push({
            data: s.utf8encode(e2.data),
            meta: e2.meta
          });
        }, s.Utf8EncodeWorker = l;
      }, {
        "./nodejsUtils": 14,
        "./stream/GenericWorker": 28,
        "./support": 30,
        "./utils": 32
      }],
      32: [function(e, t, a) {
        "use strict";
        var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
        function n(e2) {
          return e2;
        }
        function l(e2, t2) {
          for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
          return t2;
        }
        e("setimmediate"), a.newBlob = function(t2, r2) {
          a.checkSupport("blob");
          try {
            return new Blob([t2], { type: r2 });
          } catch (e2) {
            try {
              var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return n2.append(t2), n2.getBlob(r2);
            } catch (e3) {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var i = {
          stringifyByChunk: function(e2, t2, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          },
          stringifyByChar: function(e2) {
            for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
            return t2;
          },
          applyCanBeUsed: {
            uint8array: function() {
              try {
                return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
              } catch (e2) {
                return false;
              }
            }(),
            nodebuffer: function() {
              try {
                return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
              } catch (e2) {
                return false;
              }
            }()
          }
        };
        function s(e2) {
          var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
          if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
            return i.stringifyByChunk(e2, r2, t2);
          } catch (e3) {
            t2 = Math.floor(t2 / 2);
          }
          return i.stringifyByChar(e2);
        }
        function f(e2, t2) {
          for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
          return t2;
        }
        a.applyFromCharCode = s;
        var c = {};
        c.string = {
          string: n,
          array: function(e2) {
            return l(e2, new Array(e2.length));
          },
          arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          },
          uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          },
          nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          }
        }, c.array = {
          string: s,
          array: n,
          arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          },
          uint8array: function(e2) {
            return new Uint8Array(e2);
          },
          nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          }
        }, c.arraybuffer = {
          string: function(e2) {
            return s(new Uint8Array(e2));
          },
          array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          },
          arraybuffer: n,
          uint8array: function(e2) {
            return new Uint8Array(e2);
          },
          nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          }
        }, c.uint8array = {
          string: s,
          array: function(e2) {
            return f(e2, new Array(e2.length));
          },
          arraybuffer: function(e2) {
            return e2.buffer;
          },
          uint8array: n,
          nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          }
        }, c.nodebuffer = {
          string: s,
          array: function(e2) {
            return f(e2, new Array(e2.length));
          },
          arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          },
          uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          },
          nodebuffer: n
        }, a.transformTo = function(e2, t2) {
          if (t2 = t2 || "", !e2) return t2;
          a.checkSupport(e2);
          return c[a.getTypeOf(t2)][e2](t2);
        }, a.resolve = function(e2) {
          for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
          }
          return r2.join("/");
        }, a.getTypeOf = function(e2) {
          return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, a.checkSupport = function(e2) {
          if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
        }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
          var t2, r2, n2 = "";
          for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
          return n2;
        }, a.delay = function(e2, t2, r2) {
          setImmediate(function() {
            e2.apply(r2 || null, t2 || []);
          });
        }, a.inherits = function(e2, t2) {
          function r2() {
          }
          r2.prototype = t2.prototype, e2.prototype = new r2();
        }, a.extend = function() {
          var e2, t2, r2 = {};
          for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
          return r2;
        }, a.prepareContent = function(r2, e2, n2, i2, s2) {
          return u.Promise.resolve(e2).then(function(n3) {
            return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) && "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
              var e3 = new FileReader();
              e3.onload = function(e4) {
                t2(e4.target.result);
              }, e3.onerror = function(e4) {
                r3(e4.target.error);
              }, e3.readAsArrayBuffer(n3);
            }) : n3;
          }).then(function(e3) {
            var t2 = a.getTypeOf(e3);
            return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = function(e4) {
              return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
            }(e3))), e3) : u.Promise.reject(/* @__PURE__ */ new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, {
        "./base64": 1,
        "./external": 6,
        "./nodejsUtils": 14,
        "./support": 30,
        setimmediate: 54
      }],
      33: [function(e, t, r) {
        "use strict";
        var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
        function h(e2) {
          this.files = [], this.loadOptions = e2;
        }
        h.prototype = {
          checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
            }
          },
          isSignature: function(e2, t2) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t2;
            return this.reader.setIndex(r2), n2;
          },
          readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          },
          readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = {
              id: e2,
              length: t2,
              value: r2
            };
          },
          readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          },
          readLocalFiles: function() {
            var e2, t2;
            for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
          },
          readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          },
          readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? /* @__PURE__ */ new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : /* @__PURE__ */ new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t2 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t2 - r2;
            if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          },
          prepareReader: function(e2) {
            this.reader = n(e2);
          },
          load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          }
        }, t.exports = h;
      }, {
        "./reader/readerFor": 22,
        "./signature": 23,
        "./support": 30,
        "./utils": 32,
        "./zipEntry": 34
      }],
      34: [function(e, t, r) {
        "use strict";
        var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
        function l(e2, t2) {
          this.options = e2, this.loadOptions = t2;
        }
        l.prototype = {
          isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          },
          useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          },
          readLocalPart: function(e2) {
            var t2, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t2 = function(e3) {
              for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
              return null;
            }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
          },
          readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t2 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          },
          processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          },
          parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          },
          readExtraFields: function(e2) {
            var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = {
              id: t2,
              length: r2,
              value: n2
            };
            e2.setIndex(i2);
          },
          handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t2 = this.findExtraFieldUnicodePath();
              if (null !== t2) this.fileNameStr = t2;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          },
          findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          },
          findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          }
        }, t.exports = l;
      }, {
        "./compressedObject": 2,
        "./compressions": 3,
        "./crc32": 4,
        "./reader/readerFor": 22,
        "./support": 30,
        "./utf8": 31,
        "./utils": 32
      }],
      35: [function(e, t, r) {
        "use strict";
        function n(e2, t2, r2) {
          this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = {
            compression: r2.compression,
            compressionOptions: r2.compressionOptions
          };
        }
        var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
        n.prototype = {
          internalStream: function(e2) {
            var t2 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t2 = new h("error")).error(e3);
            }
            return new s(t2, r2, "");
          },
          async: function(e2, t2) {
            return this.internalStream(e2).accumulate(t2);
          },
          nodeStream: function(e2, t2) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
          },
          _compressWorker: function(e2, t2) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
          },
          _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          }
        };
        for (var u = [
          "asText",
          "asBinary",
          "asNodeBuffer",
          "asUint8Array",
          "asArrayBuffer"
        ], l = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
        t.exports = n;
      }, {
        "./compressedObject": 2,
        "./stream/DataWorker": 27,
        "./stream/GenericWorker": 28,
        "./stream/StreamHelper": 29,
        "./utf8": 31
      }],
      36: [function(e, l, t) {
        (function(t2) {
          "use strict";
          var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
          if (e2) {
            var i = 0, s = new e2(u), a = t2.document.createTextNode("");
            s.observe(a, { characterData: true }), r = function() {
              a.data = i = ++i % 2;
            };
          } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
            var e3 = t2.document.createElement("script");
            e3.onreadystatechange = function() {
              u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
            }, t2.document.documentElement.appendChild(e3);
          } : function() {
            setTimeout(u, 0);
          };
          else {
            var o = new t2.MessageChannel();
            o.port1.onmessage = u, r = function() {
              o.port2.postMessage(0);
            };
          }
          var h = [];
          function u() {
            var e3, t3;
            n = true;
            for (var r2 = h.length; r2; ) {
              for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
              r2 = h.length;
            }
            n = false;
          }
          l.exports = function(e3) {
            1 !== h.push(e3) || n || r();
          };
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}],
      37: [function(e, t, r) {
        "use strict";
        var i = e("immediate");
        function u() {
        }
        var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
        function o(e2) {
          if ("function" != typeof e2) throw new TypeError("resolver must be a function");
          this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
        }
        function h(e2, t2, r2) {
          this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
        }
        function f(t2, r2, n2) {
          i(function() {
            var e2;
            try {
              e2 = r2(n2);
            } catch (e3) {
              return l.reject(t2, e3);
            }
            e2 === t2 ? l.reject(t2, /* @__PURE__ */ new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
          });
        }
        function c(e2) {
          var t2 = e2 && e2.then;
          if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
            t2.apply(e2, arguments);
          };
        }
        function d(t2, e2) {
          var r2 = false;
          function n2(e3) {
            r2 || (r2 = true, l.reject(t2, e3));
          }
          function i2(e3) {
            r2 || (r2 = true, l.resolve(t2, e3));
          }
          var s2 = p(function() {
            e2(i2, n2);
          });
          "error" === s2.status && n2(s2.value);
        }
        function p(e2, t2) {
          var r2 = {};
          try {
            r2.value = e2(t2), r2.status = "success";
          } catch (e3) {
            r2.status = "error", r2.value = e3;
          }
          return r2;
        }
        (t.exports = o).prototype.finally = function(t2) {
          if ("function" != typeof t2) return this;
          var r2 = this.constructor;
          return this.then(function(e2) {
            return r2.resolve(t2()).then(function() {
              return e2;
            });
          }, function(e2) {
            return r2.resolve(t2()).then(function() {
              throw e2;
            });
          });
        }, o.prototype.catch = function(e2) {
          return this.then(null, e2);
        }, o.prototype.then = function(e2, t2) {
          if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
          var r2 = new this.constructor(u);
          this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
          return r2;
        }, h.prototype.callFulfilled = function(e2) {
          l.resolve(this.promise, e2);
        }, h.prototype.otherCallFulfilled = function(e2) {
          f(this.promise, this.onFulfilled, e2);
        }, h.prototype.callRejected = function(e2) {
          l.reject(this.promise, e2);
        }, h.prototype.otherCallRejected = function(e2) {
          f(this.promise, this.onRejected, e2);
        }, l.resolve = function(e2, t2) {
          var r2 = p(c, t2);
          if ("error" === r2.status) return l.reject(e2, r2.value);
          var n2 = r2.value;
          if (n2) d(e2, n2);
          else {
            e2.state = a, e2.outcome = t2;
            for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
          }
          return e2;
        }, l.reject = function(e2, t2) {
          e2.state = s, e2.outcome = t2;
          for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
          return e2;
        }, o.resolve = function(e2) {
          if (e2 instanceof this) return e2;
          return l.resolve(new this(u), e2);
        }, o.reject = function(e2) {
          var t2 = new this(u);
          return l.reject(t2, e2);
        }, o.all = function(e2) {
          var r2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var n2 = e2.length, i2 = false;
          if (!n2) return this.resolve([]);
          var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
          for (; ++t2 < n2; ) h2(e2[t2], t2);
          return o2;
          function h2(e3, t3) {
            r2.resolve(e3).then(function(e4) {
              s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
            }, function(e4) {
              i2 || (i2 = true, l.reject(o2, e4));
            });
          }
        }, o.race = function(e2) {
          var t2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(/* @__PURE__ */ new TypeError("must be an array"));
          var r2 = e2.length, n2 = false;
          if (!r2) return this.resolve([]);
          var i2 = -1, s2 = new this(u);
          for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
            n2 || (n2 = true, l.resolve(s2, e3));
          }, function(e3) {
            n2 || (n2 = true, l.reject(s2, e3));
          });
          var a2;
          return s2;
        };
      }, { immediate: 36 }],
      38: [function(e, t, r) {
        "use strict";
        var n = {};
        (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
      }, {
        "./lib/deflate": 39,
        "./lib/inflate": 40,
        "./lib/utils/common": 41,
        "./lib/zlib/constants": 44
      }],
      39: [function(e, t, r) {
        "use strict";
        var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
        function p(e2) {
          if (!(this instanceof p)) return new p(e2);
          this.options = o.assign({
            level: f,
            method: d,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: c,
            to: ""
          }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
          var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
          if (r2 !== l) throw new Error(i[r2]);
          if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
            var n2;
            if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
            this._dict_set = true;
          }
        }
        function n(e2, t2) {
          var r2 = new p(t2);
          if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
          return r2.result;
        }
        p.prototype.push = function(e2, t2) {
          var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
          if (this.ended) return false;
          n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
          do {
            if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
            0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
          } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
          return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
        }, p.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, p.prototype.onEnd = function(e2) {
          e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, n(e2, t2);
        }, r.gzip = function(e2, t2) {
          return (t2 = t2 || {}).gzip = true, n(e2, t2);
        };
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/deflate": 46,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      40: [function(e, t, r) {
        "use strict";
        var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
        function a(e2) {
          if (!(this instanceof a)) return new a(e2);
          this.options = d.assign({
            chunkSize: 16384,
            windowBits: 0,
            to: ""
          }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
          var r2 = c.inflateInit2(this.strm, t2.windowBits);
          if (r2 !== m.Z_OK) throw new Error(n[r2]);
          this.header = new s(), c.inflateGetHeader(this.strm, this.header);
        }
        function o(e2, t2) {
          var r2 = new a(t2);
          if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
          return r2.result;
        }
        a.prototype.push = function(e2, t2) {
          var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
          if (this.ended) return false;
          n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
          do {
            if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
            h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
          } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
          return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
        }, a.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, a.prototype.onEnd = function(e2) {
          e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, o(e2, t2);
        }, r.ungzip = o;
      }, {
        "./utils/common": 41,
        "./utils/strings": 42,
        "./zlib/constants": 44,
        "./zlib/gzheader": 47,
        "./zlib/inflate": 49,
        "./zlib/messages": 51,
        "./zlib/zstream": 53
      }],
      41: [function(e, t, r) {
        "use strict";
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        r.assign = function(e2) {
          for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
            var r2 = t2.shift();
            if (r2) {
              if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
              for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
            }
          }
          return e2;
        }, r.shrinkBuf = function(e2, t2) {
          return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
        };
        var i = {
          arraySet: function(e2, t2, r2, n2, i2) {
            if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          },
          flattenChunks: function(e2) {
            var t2, r2, n2, i2, s2, a;
            for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
            for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
            return a;
          }
        }, s = {
          arraySet: function(e2, t2, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          },
          flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          }
        };
        r.setTyped = function(e2) {
          e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
        }, r.setTyped(n);
      }, {}],
      42: [function(e, t, r) {
        "use strict";
        var h = e("./common"), i = true, s = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch (e2) {
          i = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (e2) {
          s = false;
        }
        for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
        function l(e2, t2) {
          if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
          for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
          return r2;
        }
        u[254] = u[254] = 1, r.string2buf = function(e2) {
          var t2, r2, n2, i2, s2, a = e2.length, o = 0;
          for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
          return t2;
        }, r.buf2binstring = function(e2) {
          return l(e2, e2.length);
        }, r.binstring2buf = function(e2) {
          for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
          return t2;
        }, r.buf2string = function(e2, t2) {
          var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
          for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
          else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
          else {
            for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
            1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
          }
          return l(o, n2);
        }, r.utf8border = function(e2, t2) {
          var r2;
          for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
          return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
        };
      }, { "./common": 41 }],
      43: [function(e, t, r) {
        "use strict";
        t.exports = function(e2, t2, r2, n) {
          for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
            for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
            i %= 65521, s %= 65521;
          }
          return i | s << 16 | 0;
        };
      }, {}],
      44: [function(e, t, r) {
        "use strict";
        t.exports = {
          Z_NO_FLUSH: 0,
          Z_PARTIAL_FLUSH: 1,
          Z_SYNC_FLUSH: 2,
          Z_FULL_FLUSH: 3,
          Z_FINISH: 4,
          Z_BLOCK: 5,
          Z_TREES: 6,
          Z_OK: 0,
          Z_STREAM_END: 1,
          Z_NEED_DICT: 2,
          Z_ERRNO: -1,
          Z_STREAM_ERROR: -2,
          Z_DATA_ERROR: -3,
          Z_BUF_ERROR: -5,
          Z_NO_COMPRESSION: 0,
          Z_BEST_SPEED: 1,
          Z_BEST_COMPRESSION: 9,
          Z_DEFAULT_COMPRESSION: -1,
          Z_FILTERED: 1,
          Z_HUFFMAN_ONLY: 2,
          Z_RLE: 3,
          Z_FIXED: 4,
          Z_DEFAULT_STRATEGY: 0,
          Z_BINARY: 0,
          Z_TEXT: 1,
          Z_UNKNOWN: 2,
          Z_DEFLATED: 8
        };
      }, {}],
      45: [function(e, t, r) {
        "use strict";
        var o = function() {
          for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
            e2 = r2;
            for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r2] = e2;
          }
          return t2;
        }();
        t.exports = function(e2, t2, r2, n) {
          var i = o, s = n + r2;
          e2 ^= -1;
          for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
          return -1 ^ e2;
        };
      }, {}],
      46: [function(e, t, r) {
        "use strict";
        var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
        function R(e2, t2) {
          return e2.msg = n[t2], t2;
        }
        function T(e2) {
          return (e2 << 1) - (4 < e2 ? 9 : 0);
        }
        function D(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        function F(e2) {
          var t2 = e2.state, r2 = t2.pending;
          r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
        }
        function N(e2, t2) {
          u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
        }
        function U(e2, t2) {
          e2.pending_buf[e2.pending++] = t2;
        }
        function P(e2, t2) {
          e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
        }
        function L(e2, t2) {
          var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
          e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
          do
            if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
              s2 += 2, r2++;
              do
                ;
              while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
              if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
              }
            }
          while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
          return a2 <= e2.lookahead ? a2 : e2.lookahead;
        }
        function j(e2) {
          var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
          do {
            if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
              for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
              for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
              i2 += f2;
            }
            if (0 === e2.strm.avail_in) break;
            if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
          } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
        }
        function Z(e2, t2) {
          for (var r2, n2; ; ) {
            if (e2.lookahead < z) {
              if (j(e2), e2.lookahead < z && t2 === l) return A;
              if (0 === e2.lookahead) break;
            }
            if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
              for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
              e2.strstart++;
            } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
            else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
            if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
          }
          return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
        }
        function W(e2, t2) {
          for (var r2, n2, i2; ; ) {
            if (e2.lookahead < z) {
              if (j(e2), e2.lookahead < z && t2 === l) return A;
              if (0 === e2.lookahead) break;
            }
            if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
              for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
              if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            } else if (e2.match_available) {
              if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
            } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
          }
          return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
        }
        function M(e2, t2, r2, n2, i2) {
          this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
        }
        function H() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function G(e2) {
          var t2;
          return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
        }
        function K(e2) {
          var t2 = G(e2);
          return t2 === m && function(e3) {
            e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
          }(e2.state), t2;
        }
        function Y(e2, t2, r2, n2, i2, s2) {
          if (!e2) return _;
          var a2 = 1;
          if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
          8 === n2 && (n2 = 9);
          var o2 = new H();
          return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
        }
        h = [
          new M(0, 0, 0, 0, function(e2, t2) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }),
          new M(4, 4, 8, 4, Z),
          new M(4, 5, 16, 8, Z),
          new M(4, 6, 32, 32, Z),
          new M(4, 4, 16, 16, W),
          new M(8, 16, 32, 32, W),
          new M(8, 16, 128, 128, W),
          new M(8, 32, 128, 256, W),
          new M(32, 128, 258, 1024, W),
          new M(32, 258, 258, 4096, W)
        ], r.deflateInit = function(e2, t2) {
          return Y(e2, t2, v, 15, 8, 0);
        }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
          return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
        }, r.deflate = function(e2, t2) {
          var r2, n2, i2, s2;
          if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
          if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
          if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
          else {
            var a2 = v + (n2.w_bits - 8 << 4) << 8;
            a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
          }
          if (69 === n2.status) if (n2.gzhead.extra) {
            for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
            n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
          } else n2.status = 73;
          if (73 === n2.status) if (n2.gzhead.name) {
            i2 = n2.pending;
            do {
              if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
            } while (0 !== s2);
            n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
          } else n2.status = 91;
          if (91 === n2.status) if (n2.gzhead.comment) {
            i2 = n2.pending;
            do {
              if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
            } while (0 !== s2);
            n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
          } else n2.status = 103;
          if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
            if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
          } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
          if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
          if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
            var o2 = 2 === n2.strategy ? function(e3, t3) {
              for (var r3; ; ) {
                if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                  if (t3 === l) return A;
                  break;
                }
                if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
              }
              return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
            }(n2, t2) : 3 === n2.strategy ? function(e3, t3) {
              for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                if (e3.lookahead <= S) {
                  if (j(e3), e3.lookahead <= S && t3 === l) return A;
                  if (0 === e3.lookahead) break;
                }
                if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                  s3 = e3.strstart + S;
                  do
                    ;
                  while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                  e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                }
                if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
              }
              return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
            }(n2, t2) : h[n2.level].func(n2, t2);
            if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
            if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
          }
          return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
        }, r.deflateEnd = function(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
        }, r.deflateSetDictionary = function(e2, t2) {
          var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
          if (!e2 || !e2.state) return _;
          if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
          for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
            for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
            r2.strstart = n2, r2.lookahead = x - 1, j(r2);
          }
          return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
        }, r.deflateInfo = "pako deflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./messages": 51,
        "./trees": 52
      }],
      47: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, {}],
      48: [function(e, t, r) {
        "use strict";
        t.exports = function(e2, t2) {
          var r2 = e2.state, n = e2.next_in, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z = e2.input, C;
          i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
          e: do {
            p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
            t: for (; ; ) {
              if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
              else {
                if (!(16 & y)) {
                  if (0 == (64 & y)) {
                    v = m[(65535 & v) + (d & (1 << y) - 1)];
                    continue t;
                  }
                  if (32 & y) {
                    r2.mode = 12;
                    break e;
                  }
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break e;
                }
                w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                r: for (; ; ) {
                  if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                    if (0 == (64 & y)) {
                      v = _[(65535 & v) + (d & (1 << y) - 1)];
                      continue r;
                    }
                    e2.msg = "invalid distance code", r2.mode = 30;
                    break e;
                  }
                  if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break e;
                  }
                  if (d >>>= y, p -= y, (y = s - a) < k) {
                    if (l < (y = k - y) && r2.sane) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (S = c, (x = 0) === f) {
                      if (x += u - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                    } else if (f < y) {
                      if (x += u + f - y, (y -= f) < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        if (x = 0, f < w) {
                          for (w -= y = f; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      }
                    } else if (x += f - y, y < w) {
                      for (w -= y; C[s++] = c[x++], --y; ) ;
                      x = s - k, S = C;
                    }
                    for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                    w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                  } else {
                    for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                    w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (n < i && s < o);
          n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
        };
      }, {}],
      49: [function(e, t, r) {
        "use strict";
        var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
        function L(e2) {
          return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
        }
        function s() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function a(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
        }
        function o(e2) {
          var t2;
          return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
        }
        function h(e2, t2) {
          var r2, n2;
          return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
        }
        function u(e2, t2) {
          var r2, n2;
          return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
        }
        var l, f, c = true;
        function j(e2) {
          if (c) {
            var t2;
            for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
            for (; t2 < 256; ) e2.lens[t2++] = 9;
            for (; t2 < 280; ) e2.lens[t2++] = 7;
            for (; t2 < 288; ) e2.lens[t2++] = 8;
            for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
            T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
          }
          e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
        }
        function Z(e2, t2, r2, n2) {
          var i2, s2 = e2.state;
          return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
        }
        r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
          return u(e2, 15);
        }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
          var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [
            16,
            17,
            18,
            0,
            8,
            7,
            9,
            6,
            10,
            5,
            11,
            4,
            12,
            3,
            13,
            2,
            14,
            1,
            15
          ];
          if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
          12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
          e: for (; ; ) switch (r2.mode) {
            case P:
              if (0 === r2.wrap) {
                r2.mode = 13;
                break;
              }
              for (; l2 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (2 & r2.wrap && 35615 === u2) {
                E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                break;
              }
              if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                e2.msg = "incorrect header check", r2.mode = 30;
                break;
              }
              if (8 != (15 & u2)) {
                e2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
              else if (k > r2.wbits) {
                e2.msg = "invalid window size", r2.mode = 30;
                break;
              }
              r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
              break;
            case 2:
              for (; l2 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (r2.flags = u2, 8 != (255 & r2.flags)) {
                e2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (57344 & r2.flags) {
                e2.msg = "unknown header flags set", r2.mode = 30;
                break;
              }
              r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
            case 3:
              for (; l2 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
            case 4:
              for (; l2 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
            case 5:
              if (1024 & r2.flags) {
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
              } else r2.head && (r2.head.extra = null);
              r2.mode = 6;
            case 6:
              if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
              r2.length = 0, r2.mode = 7;
            case 7:
              if (2048 & r2.flags) {
                if (0 === o2) break e;
                for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
              } else r2.head && (r2.head.name = null);
              r2.length = 0, r2.mode = 8;
            case 8:
              if (4096 & r2.flags) {
                if (0 === o2) break e;
                for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
              } else r2.head && (r2.head.comment = null);
              r2.mode = 9;
            case 9:
              if (512 & r2.flags) {
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (u2 !== (65535 & r2.check)) {
                  e2.msg = "header crc mismatch", r2.mode = 30;
                  break;
                }
                l2 = u2 = 0;
              }
              r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
              break;
            case 10:
              for (; l2 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
            case 11:
              if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
              e2.adler = r2.check = 1, r2.mode = 12;
            case 12:
              if (5 === t2 || 6 === t2) break e;
            case 13:
              if (r2.last) {
                u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                break;
              }
              for (; l2 < 3; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                case 0:
                  r2.mode = 14;
                  break;
                case 1:
                  if (j(r2), r2.mode = 20, 6 !== t2) break;
                  u2 >>>= 2, l2 -= 2;
                  break e;
                case 2:
                  r2.mode = 17;
                  break;
                case 3:
                  e2.msg = "invalid block type", r2.mode = 30;
              }
              u2 >>>= 2, l2 -= 2;
              break;
            case 14:
              for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                e2.msg = "invalid stored block lengths", r2.mode = 30;
                break;
              }
              if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
            case 15:
              r2.mode = 16;
            case 16:
              if (d = r2.length) {
                if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                break;
              }
              r2.mode = 12;
              break;
            case 17:
              for (; l2 < 14; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                e2.msg = "too many length or distance symbols", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 18;
            case 18:
              for (; r2.have < r2.ncode; ) {
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
              }
              for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
              if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                e2.msg = "invalid code lengths set", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 19;
            case 19:
              for (; r2.have < r2.nlen + r2.ndist; ) {
                for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                else {
                  if (16 === b) {
                    for (z = _ + 2; l2 < z; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n2[s2++] << l2, l2 += 8;
                    }
                    if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                  } else if (17 === b) {
                    for (z = _ + 3; l2 < z; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n2[s2++] << l2, l2 += 8;
                    }
                    l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                  } else {
                    for (z = _ + 7; l2 < z; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n2[s2++] << l2, l2 += 8;
                    }
                    l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                  }
                  if (r2.have + d > r2.nlen + r2.ndist) {
                    e2.msg = "invalid bit length repeat", r2.mode = 30;
                    break;
                  }
                  for (; d--; ) r2.lens[r2.have++] = k;
                }
              }
              if (30 === r2.mode) break;
              if (0 === r2.lens[256]) {
                e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                break;
              }
              if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                e2.msg = "invalid literal/lengths set", r2.mode = 30;
                break;
              }
              if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                e2.msg = "invalid distances set", r2.mode = 30;
                break;
              }
              if (r2.mode = 20, 6 === t2) break e;
            case 20:
              r2.mode = 21;
            case 21:
              if (6 <= o2 && 258 <= h2) {
                e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                break;
              }
              for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (g && 0 == (240 & g)) {
                for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                u2 >>>= v, l2 -= v, r2.back += v;
              }
              if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                r2.mode = 26;
                break;
              }
              if (32 & g) {
                r2.back = -1, r2.mode = 12;
                break;
              }
              if (64 & g) {
                e2.msg = "invalid literal/length code", r2.mode = 30;
                break;
              }
              r2.extra = 15 & g, r2.mode = 22;
            case 22:
              if (r2.extra) {
                for (z = r2.extra; l2 < z; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
              }
              r2.was = r2.length, r2.mode = 23;
            case 23:
              for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (0 == (240 & g)) {
                for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                u2 >>>= v, l2 -= v, r2.back += v;
              }
              if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                e2.msg = "invalid distance code", r2.mode = 30;
                break;
              }
              r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
            case 24:
              if (r2.extra) {
                for (z = r2.extra; l2 < z; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
              }
              if (r2.offset > r2.dmax) {
                e2.msg = "invalid distance too far back", r2.mode = 30;
                break;
              }
              r2.mode = 25;
            case 25:
              if (0 === h2) break e;
              if (d = c2 - h2, r2.offset > d) {
                if ((d = r2.offset - d) > r2.whave && r2.sane) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
              } else m = i2, p = a2 - r2.offset, d = r2.length;
              for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
              0 === r2.length && (r2.mode = 21);
              break;
            case 26:
              if (0 === h2) break e;
              i2[a2++] = r2.length, h2--, r2.mode = 21;
              break;
            case 27:
              if (r2.wrap) {
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 |= n2[s2++] << l2, l2 += 8;
                }
                if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                  e2.msg = "incorrect data check", r2.mode = 30;
                  break;
                }
                l2 = u2 = 0;
              }
              r2.mode = 28;
            case 28:
              if (r2.wrap && r2.flags) {
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (u2 !== (4294967295 & r2.total)) {
                  e2.msg = "incorrect length check", r2.mode = 30;
                  break;
                }
                l2 = u2 = 0;
              }
              r2.mode = 29;
            case 29:
              x = 1;
              break e;
            case 30:
              x = -3;
              break e;
            case 31:
              return -4;
            case 32:
            default:
              return U;
          }
          return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
        }, r.inflateEnd = function(e2) {
          if (!e2 || !e2.state) return U;
          var t2 = e2.state;
          return t2.window && (t2.window = null), e2.state = null, N;
        }, r.inflateGetHeader = function(e2, t2) {
          var r2;
          return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
        }, r.inflateSetDictionary = function(e2, t2) {
          var r2, n2 = t2.length;
          return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
        }, r.inflateInfo = "pako inflate (from Nodeca project)";
      }, {
        "../utils/common": 41,
        "./adler32": 43,
        "./crc32": 45,
        "./inffast": 48,
        "./inftrees": 50
      }],
      50: [function(e, t, r) {
        "use strict";
        var D = e("../utils/common"), F = [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          13,
          15,
          17,
          19,
          23,
          27,
          31,
          35,
          43,
          51,
          59,
          67,
          83,
          99,
          115,
          131,
          163,
          195,
          227,
          258,
          0,
          0
        ], N = [
          16,
          16,
          16,
          16,
          16,
          16,
          16,
          16,
          17,
          17,
          17,
          17,
          18,
          18,
          18,
          18,
          19,
          19,
          19,
          19,
          20,
          20,
          20,
          20,
          21,
          21,
          21,
          21,
          16,
          72,
          78
        ], U = [
          1,
          2,
          3,
          4,
          5,
          7,
          9,
          13,
          17,
          25,
          33,
          49,
          65,
          97,
          129,
          193,
          257,
          385,
          513,
          769,
          1025,
          1537,
          2049,
          3073,
          4097,
          6145,
          8193,
          12289,
          16385,
          24577,
          0,
          0
        ], P = [
          16,
          16,
          16,
          16,
          17,
          17,
          18,
          18,
          19,
          19,
          20,
          20,
          21,
          21,
          22,
          22,
          23,
          23,
          24,
          24,
          25,
          25,
          26,
          26,
          27,
          27,
          28,
          28,
          29,
          29,
          64,
          64
        ];
        t.exports = function(e2, t2, r2, n, i, s, a, o) {
          var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
          for (b = 0; b <= 15; b++) O[b] = 0;
          for (v = 0; v < n; v++) O[t2[r2 + v]]++;
          for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
          if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
          for (y = 1; y < w && 0 === O[y]; y++) ;
          for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
          if (0 < z && (0 === e2 || 1 !== w)) return -1;
          for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
          for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
          if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
          for (; ; ) {
            for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
            for (h = 1 << b - 1; E & h; ) h >>= 1;
            if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
              if (b === w) break;
              b = t2[r2 + a[v]];
            }
            if (k < b && (E & f) !== l) {
              for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
              if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
              i[l = E & f] = k << 24 | x << 16 | c - s | 0;
            }
          }
          return 0 !== E && (i[c + E] = b - S << 24 | 4194304), o.bits = k, 0;
        };
      }, { "../utils/common": 41 }],
      51: [function(e, t, r) {
        "use strict";
        t.exports = {
          2: "need dictionary",
          1: "stream end",
          0: "",
          "-1": "file error",
          "-2": "stream error",
          "-3": "data error",
          "-4": "insufficient memory",
          "-5": "buffer error",
          "-6": "incompatible version"
        };
      }, {}],
      52: [function(e, t, r) {
        "use strict";
        var i = e("../utils/common"), o = 0, h = 1;
        function n(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          4,
          4,
          4,
          4,
          5,
          5,
          5,
          5,
          0
        ], k = [
          0,
          0,
          0,
          0,
          1,
          1,
          2,
          2,
          3,
          3,
          4,
          4,
          5,
          5,
          6,
          6,
          7,
          7,
          8,
          8,
          9,
          9,
          10,
          10,
          11,
          11,
          12,
          12,
          13,
          13
        ], x = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          2,
          3,
          7
        ], S = [
          16,
          17,
          18,
          0,
          8,
          7,
          9,
          6,
          10,
          5,
          11,
          4,
          12,
          3,
          13,
          2,
          14,
          1,
          15
        ], z = new Array(2 * (l + 2));
        n(z);
        var C = new Array(2 * f);
        n(C);
        var E = new Array(512);
        n(E);
        var A = new Array(256);
        n(A);
        var I = new Array(a);
        n(I);
        var O, B, R, T = new Array(f);
        function D(e2, t2, r2, n2, i2) {
          this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
        }
        function F(e2, t2) {
          this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
        }
        function N(e2) {
          return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
        }
        function U(e2, t2) {
          e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
        }
        function P(e2, t2, r2) {
          e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
        }
        function L(e2, t2, r2) {
          P(e2, r2[2 * t2], r2[2 * t2 + 1]);
        }
        function j(e2, t2) {
          for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
          return r2 >>> 1;
        }
        function Z(e2, t2, r2) {
          var n2, i2, s2 = new Array(g + 1), a2 = 0;
          for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
          for (i2 = 0; i2 <= t2; i2++) {
            var o2 = e2[2 * i2 + 1];
            0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
          }
        }
        function W(e2) {
          var t2;
          for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
          for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
          for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
          e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
        }
        function M(e2) {
          8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
        }
        function H(e2, t2, r2, n2) {
          var i2 = 2 * t2, s2 = 2 * r2;
          return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
        }
        function G(e2, t2, r2) {
          for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
          e2.heap[r2] = n2;
        }
        function K(e2, t2, r2) {
          var n2, i2, s2, a2, o2 = 0;
          if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
          L(e2, m, t2);
        }
        function Y(e2, t2) {
          var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
          for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
          for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
          for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
          for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
          e2.heap[--e2.heap_max] = e2.heap[1], function(e3, t3) {
            var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
            for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
            for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
            if (0 !== m2) {
              do {
                for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
              } while (0 < m2);
              for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
            }
          }(e2, t2), Z(s2, u2, e2.bl_count);
        }
        function X(e2, t2, r2) {
          var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
          for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
        }
        function V(e2, t2, r2) {
          var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
          for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
            if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
            else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
            s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
          }
        }
        n(T);
        var q = false;
        function J(e2, t2, r2, n2) {
          P(e2, (s << 1) + (n2 ? 1 : 0), 3), function(e3, t3, r3, n3) {
            M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
          }(e2, t2, r2, true);
        }
        r._tr_init = function(e2) {
          q || (function() {
            var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
            for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
            for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
            for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
            for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
            for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
            for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
            for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
            O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
          }(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
        }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
          var i2, s2, a2 = 0;
          0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = function(e3) {
            var t3, r3 = 4093624447;
            for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
            if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
            for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
            return o;
          }(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = function(e3) {
            var t3;
            for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
            return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
          }(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), function(e3, t3, r3, n3) {
            var i3;
            for (P(e3, t3 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
            V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
          }(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
        }, r._tr_tally = function(e2, t2, r2) {
          return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
        }, r._tr_align = function(e2) {
          P(e2, 2, 3), L(e2, m, z), function(e3) {
            16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
          }(e2);
        };
      }, { "../utils/common": 41 }],
      53: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}],
      54: [function(e, t, r) {
        (function(e2) {
          (function(r2, n) {
            "use strict";
            if (!r2.setImmediate) {
              var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
              e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                process$1.nextTick(function() {
                  c(e4);
                });
              } : function() {
                if (r2.postMessage && !r2.importScripts) {
                  var e4 = true, t3 = r2.onmessage;
                  return r2.onmessage = function() {
                    e4 = false;
                  }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                }
              }() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                r2.postMessage(a + e4, "*");
              }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                c(e4.data);
              }, function(e4) {
                t2.port2.postMessage(e4);
              }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                var t3 = l.createElement("script");
                t3.onreadystatechange = function() {
                  c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                }, s.appendChild(t3);
              }) : function(e4) {
                setTimeout(c, 0, e4);
              }, e3.setImmediate = function(e4) {
                "function" != typeof e4 && (e4 = new Function("" + e4));
                for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                return h[o] = {
                  callback: e4,
                  args: t3
                }, i(o), o++;
              }, e3.clearImmediate = f;
            }
            function f(e4) {
              delete h[e4];
            }
            function c(e4) {
              if (u) setTimeout(c, 0, e4);
              else {
                var t3 = h[e4];
                if (t3) {
                  u = true;
                  try {
                    (function(e5) {
                      var t4 = e5.callback, r3 = e5.args;
                      switch (r3.length) {
                        case 0:
                          t4();
                          break;
                        case 1:
                          t4(r3[0]);
                          break;
                        case 2:
                          t4(r3[0], r3[1]);
                          break;
                        case 3:
                          t4(r3[0], r3[1], r3[2]);
                          break;
                        default:
                          t4.apply(n, r3);
                      }
                    })(t3);
                  } finally {
                    f(e4), u = false;
                  }
                }
              }
            }
            function d(e4) {
              e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
            }
          })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}]
    }, {}, [10])(10);
  });
});
var require_escapeForXML = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  var XML_CHARACTER_MAP = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;"
  };
  function escapeForXML(string) {
    return string && string.replace ? string.replace(/([&"<>'])/g, function(str, item) {
      return XML_CHARACTER_MAP[item];
    }) : string;
  }
  module2.exports = escapeForXML;
});
var require_xml = /* @__PURE__ */ __commonJSMin((exports2, module2) => {
  init_dist();
  var escapeForXML = require_escapeForXML();
  var Stream = require_stream_browserify().Stream;
  var DEFAULT_INDENT = "    ";
  function xml(input, options2) {
    if (typeof options2 !== "object") options2 = { indent: options2 };
    var stream = options2.stream ? new Stream() : null, output = "", interrupted = false, indent = !options2.indent ? "" : options2.indent === true ? DEFAULT_INDENT : options2.indent, instant = true;
    function delay(func) {
      if (!instant) func();
      else process$1.nextTick(func);
    }
    function append(interrupt, out) {
      if (out !== void 0) output += out;
      if (interrupt && !interrupted) {
        stream = stream || new Stream();
        interrupted = true;
      }
      if (interrupt && interrupted) {
        var data = output;
        delay(function() {
          stream.emit("data", data);
        });
        output = "";
      }
    }
    function add(value, last) {
      format(append, resolve(value, indent, indent ? 1 : 0), last);
    }
    function end() {
      if (stream) {
        var data = output;
        delay(function() {
          stream.emit("data", data);
          stream.emit("end");
          stream.readable = false;
          stream.emit("close");
        });
      }
    }
    function addXmlDeclaration(declaration) {
      var attr = {
        version: "1.0",
        encoding: declaration.encoding || "UTF-8"
      };
      if (declaration.standalone) attr.standalone = declaration.standalone;
      add({ "?xml": { _attr: attr } });
      output = output.replace("/>", "?>");
    }
    delay(function() {
      instant = false;
    });
    if (options2.declaration) addXmlDeclaration(options2.declaration);
    if (input && input.forEach) input.forEach(function(value, i) {
      var last;
      if (i + 1 === input.length) last = end;
      add(value, last);
    });
    else add(input, end);
    if (stream) {
      stream.readable = true;
      return stream;
    }
    return output;
  }
  function element() {
    var self2 = { _elem: resolve(Array.prototype.slice.call(arguments)) };
    self2.push = function(input) {
      if (!this.append) throw new Error("not assigned to a parent!");
      var that = this;
      var indent = this._elem.indent;
      format(this.append, resolve(input, indent, this._elem.icount + (indent ? 1 : 0)), function() {
        that.append(true);
      });
    };
    self2.close = function(input) {
      if (input !== void 0) this.push(input);
      if (this.end) this.end();
    };
    return self2;
  }
  function create_indent(character, count) {
    return new Array(count || 0).join(character || "");
  }
  function resolve(data, indent, indent_count) {
    indent_count = indent_count || 0;
    var indent_spaces = create_indent(indent, indent_count);
    var name;
    var values = data;
    var interrupt = false;
    if (typeof data === "object") {
      name = Object.keys(data)[0];
      values = data[name];
      if (values && values._elem) {
        values._elem.name = name;
        values._elem.icount = indent_count;
        values._elem.indent = indent;
        values._elem.indents = indent_spaces;
        values._elem.interrupt = values;
        return values._elem;
      }
    }
    var attributes = [], content = [];
    var isStringContent;
    function get_attributes(obj) {
      Object.keys(obj).forEach(function(key) {
        attributes.push(attribute(key, obj[key]));
      });
    }
    switch (typeof values) {
      case "object":
        if (values === null) break;
        if (values._attr) get_attributes(values._attr);
        if (values._cdata) content.push(("<![CDATA[" + values._cdata).replace(/\]\]>/g, "]]]]><![CDATA[>") + "]]>");
        if (values.forEach) {
          isStringContent = false;
          content.push("");
          values.forEach(function(value) {
            if (typeof value == "object") if (Object.keys(value)[0] == "_attr") get_attributes(value._attr);
            else content.push(resolve(value, indent, indent_count + 1));
            else {
              content.pop();
              isStringContent = true;
              content.push(escapeForXML(value));
            }
          });
          if (!isStringContent) content.push("");
        }
        break;
      default:
        content.push(escapeForXML(values));
    }
    return {
      name,
      interrupt,
      attributes,
      content,
      icount: indent_count,
      indents: indent_spaces,
      indent
    };
  }
  function format(append, elem, end) {
    if (typeof elem != "object") return append(false, elem);
    var len = elem.interrupt ? 1 : elem.content.length;
    function proceed() {
      while (elem.content.length) {
        var value = elem.content.shift();
        if (value === void 0) continue;
        if (interrupt(value)) return;
        format(append, value);
      }
      append(false, (len > 1 ? elem.indents : "") + (elem.name ? "</" + elem.name + ">" : "") + (elem.indent && !end ? "\n" : ""));
      if (end) end();
    }
    function interrupt(value) {
      if (value.interrupt) {
        value.interrupt.append = append;
        value.interrupt.end = proceed;
        value.interrupt = false;
        append(true);
        return true;
      }
      return false;
    }
    append(false, elem.indents + (elem.name ? "<" + elem.name : "") + (elem.attributes.length ? " " + elem.attributes.join(" ") : "") + (len ? elem.name ? ">" : "" : elem.name ? "/>" : "") + (elem.indent && len > 1 ? "\n" : ""));
    if (!len) return append(false, elem.indent ? "\n" : "");
    if (!interrupt(elem)) proceed();
  }
  function attribute(key, value) {
    return key + '="' + escapeForXML(value) + '"';
  }
  module2.exports = xml;
  module2.exports.element = module2.exports.Element = element;
});
var import_stream_browserify = require_stream_browserify();
var import_jszip_min = /* @__PURE__ */ __toESM(require_jszip_min(), 1);
var import_xml = /* @__PURE__ */ __toESM(require_xml(), 1);
var obfuscatedStartOffset = 0;
var obfuscatedEndOffset = 32;
var guidSize = 32;
var obfuscate = (buf, fontKey) => {
  const guid = fontKey.replace(/-/g, "");
  if (guid.length !== guidSize) throw new Error(`Error: Cannot extract GUID from font filename: ${fontKey}`);
  const hexNumbers = guid.replace(/(..)/g, "$1 ").trim().split(" ").map((hexString) => parseInt(hexString, 16));
  hexNumbers.reverse();
  const obfuscatedBytes = buf.slice(obfuscatedStartOffset, obfuscatedEndOffset).map((byte, i) => byte ^ hexNumbers[i % hexNumbers.length]);
  const out = new Uint8Array(obfuscatedStartOffset + obfuscatedBytes.length + Math.max(0, buf.length - obfuscatedEndOffset));
  out.set(buf.slice(0, obfuscatedStartOffset));
  out.set(obfuscatedBytes, obfuscatedStartOffset);
  out.set(buf.slice(obfuscatedEndOffset), obfuscatedStartOffset + obfuscatedBytes.length);
  return out;
};
var Formatter = class {
  /**
  * Formats an XML component into a serializable object.
  *
  * @param input - The XML component to format
  * @param context - The context containing file state and relationships
  * @returns A serializable XML object structure
  * @throws Error if the component cannot be formatted correctly
  */
  format(input, context = { stack: [] }) {
    const output = input.prepForXml(context);
    if (output) return output;
    else throw Error("XMLComponent did not format correctly");
  }
};
var ImageReplacer = class {
  /**
  * Replaces image placeholder tokens with relationship IDs.
  *
  * @param xmlData - The XML string containing image placeholders
  * @param mediaData - Array of media data to replace
  * @param offset - Starting offset for relationship IDs
  * @returns XML string with placeholders replaced by relationship IDs
  */
  replace(xmlData, mediaData, offset) {
    let currentXmlData = xmlData;
    mediaData.forEach((image, i) => {
      currentXmlData = currentXmlData.replace(new RegExp(`{${image.fileName}}`, "g"), (offset + i).toString());
    });
    return currentXmlData;
  }
  /**
  * Extracts media data referenced in the XML content.
  *
  * @param xmlData - The XML string to search for media references
  * @param media - The media collection to search within
  * @returns Array of media data found in the XML
  */
  getMediaData(xmlData, media) {
    return media.Array.filter((image) => xmlData.search(`{${image.fileName}}`) > 0);
  }
};
var NumberingReplacer = class {
  /**
  * Replaces numbering placeholder tokens with actual numbering IDs.
  *
  * Placeholder format: {reference-instance} where reference identifies the
  * numbering definition and instance is the specific usage.
  *
  * @param xmlData - The XML string containing numbering placeholders
  * @param concreteNumberings - Array of concrete numbering instances to replace
  * @returns XML string with placeholders replaced by numbering IDs
  */
  replace(xmlData, concreteNumberings) {
    let currentXmlData = xmlData;
    for (const concreteNumbering of concreteNumberings) currentXmlData = currentXmlData.replace(new RegExp(`{${concreteNumbering.reference}-${concreteNumbering.instance}}`, "g"), concreteNumbering.numId.toString());
    return currentXmlData;
  }
};
var Compiler = class {
  /**
  * Creates a new Compiler instance.
  *
  * Initializes the formatter and replacer utilities used during compilation.
  */
  constructor() {
    _defineProperty(this, "formatter", void 0);
    _defineProperty(this, "imageReplacer", void 0);
    _defineProperty(this, "numberingReplacer", void 0);
    this.formatter = new Formatter();
    this.imageReplacer = new ImageReplacer();
    this.numberingReplacer = new NumberingReplacer();
  }
  /**
  * Compiles a File object into a JSZip archive containing the complete OOXML package.
  *
  * This method orchestrates the entire compilation process:
  * - Converts all document components to XML
  * - Manages image and numbering placeholder replacements
  * - Creates relationship files
  * - Packages fonts and media files
  * - Assembles everything into a ZIP archive
  *
  * @param file - The document to compile
  * @param prettifyXml - Optional XML formatting style
  * @param overrides - Optional custom XML file overrides
  * @returns A JSZip instance containing the complete .docx package
  */
  compile(file, prettifyXml, overrides = []) {
    const zip = new import_jszip_min.default();
    const xmlifiedFileMapping = this.xmlifyFile(file, prettifyXml);
    const map = new Map(Object.entries(xmlifiedFileMapping));
    for (const [, obj] of map) if (Array.isArray(obj)) for (const subFile of obj) zip.file(subFile.path, encodeUtf8(subFile.data));
    else zip.file(obj.path, encodeUtf8(obj.data));
    for (const subFile of overrides) zip.file(subFile.path, encodeUtf8(subFile.data));
    for (const data of file.Media.Array) if (data.type !== "svg") zip.file(`word/media/${data.fileName}`, data.data);
    else {
      zip.file(`word/media/${data.fileName}`, data.data);
      zip.file(`word/media/${data.fallback.fileName}`, data.fallback.data);
    }
    for (const [i, { data: buffer, fontKey }] of file.FontTable.fontOptionsWithKey.entries()) zip.file(`word/fonts/font${i + 1}.odttf`, obfuscate(buffer, fontKey));
    return zip;
  }
  xmlifyFile(file, prettify) {
    const documentRelationshipCount = file.Document.Relationships.RelationshipCount + 1;
    const documentXmlData = (0, import_xml.default)(this.formatter.format(file.Document.View, {
      viewWrapper: file.Document,
      file,
      stack: []
    }), {
      indent: prettify,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    });
    const commentRelationshipCount = file.Comments.Relationships.RelationshipCount + 1;
    const commentXmlData = (0, import_xml.default)(this.formatter.format(file.Comments, {
      viewWrapper: {
        View: file.Comments,
        Relationships: file.Comments.Relationships
      },
      file,
      stack: []
    }), {
      indent: prettify,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    });
    const footnoteRelationshipCount = file.FootNotes.Relationships.RelationshipCount + 1;
    const footnoteXmlData = (0, import_xml.default)(this.formatter.format(file.FootNotes.View, {
      viewWrapper: file.FootNotes,
      file,
      stack: []
    }), {
      indent: prettify,
      declaration: {
        standalone: "yes",
        encoding: "UTF-8"
      }
    });
    const documentMediaDatas = this.imageReplacer.getMediaData(documentXmlData, file.Media);
    const commentMediaDatas = this.imageReplacer.getMediaData(commentXmlData, file.Media);
    const footnoteMediaDatas = this.imageReplacer.getMediaData(footnoteXmlData, file.Media);
    return _objectSpread2(_objectSpread2({
      Relationships: {
        data: (() => {
          documentMediaDatas.forEach((mediaData, i) => {
            file.Document.Relationships.addRelationship(documentRelationshipCount + i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${mediaData.fileName}`);
          });
          file.Document.Relationships.addRelationship(file.Document.Relationships.RelationshipCount + 1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", "fontTable.xml");
          return (0, import_xml.default)(this.formatter.format(file.Document.Relationships, {
            viewWrapper: file.Document,
            file,
            stack: []
          }), {
            indent: prettify,
            declaration: { encoding: "UTF-8" }
          });
        })(),
        path: "word/_rels/document.xml.rels"
      },
      Document: {
        data: (() => {
          const xmlData = this.imageReplacer.replace(documentXmlData, documentMediaDatas, documentRelationshipCount);
          return this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);
        })(),
        path: "word/document.xml"
      },
      Styles: {
        data: (() => {
          const xmlStyles = (0, import_xml.default)(this.formatter.format(file.Styles, {
            viewWrapper: file.Document,
            file,
            stack: []
          }), {
            indent: prettify,
            declaration: {
              standalone: "yes",
              encoding: "UTF-8"
            }
          });
          return this.numberingReplacer.replace(xmlStyles, file.Numbering.ConcreteNumbering);
        })(),
        path: "word/styles.xml"
      },
      Properties: {
        data: (0, import_xml.default)(this.formatter.format(file.CoreProperties, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/core.xml"
      },
      Numbering: {
        data: (0, import_xml.default)(this.formatter.format(file.Numbering, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/numbering.xml"
      },
      FileRelationships: {
        data: (0, import_xml.default)(this.formatter.format(file.FileRelationships, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        }),
        path: "_rels/.rels"
      },
      HeaderRelationships: file.Headers.map((headerWrapper, index) => {
        const xmlData = (0, import_xml.default)(this.formatter.format(headerWrapper.View, {
          viewWrapper: headerWrapper,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        });
        this.imageReplacer.getMediaData(xmlData, file.Media).forEach((mediaData, i) => {
          headerWrapper.Relationships.addRelationship(i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${mediaData.fileName}`);
        });
        return {
          data: (0, import_xml.default)(this.formatter.format(headerWrapper.Relationships, {
            viewWrapper: headerWrapper,
            file,
            stack: []
          }), {
            indent: prettify,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/header${index + 1}.xml.rels`
        };
      }),
      FooterRelationships: file.Footers.map((footerWrapper, index) => {
        const xmlData = (0, import_xml.default)(this.formatter.format(footerWrapper.View, {
          viewWrapper: footerWrapper,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        });
        this.imageReplacer.getMediaData(xmlData, file.Media).forEach((mediaData, i) => {
          footerWrapper.Relationships.addRelationship(i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${mediaData.fileName}`);
        });
        return {
          data: (0, import_xml.default)(this.formatter.format(footerWrapper.Relationships, {
            viewWrapper: footerWrapper,
            file,
            stack: []
          }), {
            indent: prettify,
            declaration: { encoding: "UTF-8" }
          }),
          path: `word/_rels/footer${index + 1}.xml.rels`
        };
      }),
      Headers: file.Headers.map((headerWrapper, index) => {
        const tempXmlData = (0, import_xml.default)(this.formatter.format(headerWrapper.View, {
          viewWrapper: headerWrapper,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        });
        const mediaDatas = this.imageReplacer.getMediaData(tempXmlData, file.Media);
        const xmlData = this.imageReplacer.replace(tempXmlData, mediaDatas, 0);
        return {
          data: this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering),
          path: `word/header${index + 1}.xml`
        };
      }),
      Footers: file.Footers.map((footerWrapper, index) => {
        const tempXmlData = (0, import_xml.default)(this.formatter.format(footerWrapper.View, {
          viewWrapper: footerWrapper,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        });
        const mediaDatas = this.imageReplacer.getMediaData(tempXmlData, file.Media);
        const xmlData = this.imageReplacer.replace(tempXmlData, mediaDatas, 0);
        return {
          data: this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering),
          path: `word/footer${index + 1}.xml`
        };
      }),
      ContentTypes: {
        data: (0, import_xml.default)(this.formatter.format(file.ContentTypes, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        }),
        path: "[Content_Types].xml"
      },
      CustomProperties: {
        data: (0, import_xml.default)(this.formatter.format(file.CustomProperties, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/custom.xml"
      },
      AppProperties: {
        data: (0, import_xml.default)(this.formatter.format(file.AppProperties, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "docProps/app.xml"
      },
      FootNotes: {
        data: (() => {
          const xmlData = this.imageReplacer.replace(footnoteXmlData, footnoteMediaDatas, footnoteRelationshipCount);
          return this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);
        })(),
        path: "word/footnotes.xml"
      },
      FootNotesRelationships: {
        data: (() => {
          footnoteMediaDatas.forEach((mediaData, i) => {
            file.FootNotes.Relationships.addRelationship(footnoteRelationshipCount + i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${mediaData.fileName}`);
          });
          return (0, import_xml.default)(this.formatter.format(file.FootNotes.Relationships, {
            viewWrapper: file.FootNotes,
            file,
            stack: []
          }), {
            indent: prettify,
            declaration: { encoding: "UTF-8" }
          });
        })(),
        path: "word/_rels/footnotes.xml.rels"
      },
      Endnotes: {
        data: (0, import_xml.default)(this.formatter.format(file.Endnotes.View, {
          viewWrapper: file.Endnotes,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/endnotes.xml"
      },
      EndnotesRelationships: {
        data: (0, import_xml.default)(this.formatter.format(file.Endnotes.Relationships, {
          viewWrapper: file.Endnotes,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/endnotes.xml.rels"
      },
      Settings: {
        data: (0, import_xml.default)(this.formatter.format(file.Settings, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/settings.xml"
      },
      Comments: {
        data: (() => {
          const xmlData = this.imageReplacer.replace(commentXmlData, commentMediaDatas, commentRelationshipCount);
          return this.numberingReplacer.replace(xmlData, file.Numbering.ConcreteNumbering);
        })(),
        path: "word/comments.xml"
      },
      CommentsRelationships: {
        data: (() => {
          commentMediaDatas.forEach((mediaData, i) => {
            file.Comments.Relationships.addRelationship(commentRelationshipCount + i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${mediaData.fileName}`);
          });
          return (0, import_xml.default)(this.formatter.format(file.Comments.Relationships, {
            viewWrapper: {
              View: file.Comments,
              Relationships: file.Comments.Relationships
            },
            file,
            stack: []
          }), {
            indent: prettify,
            declaration: { encoding: "UTF-8" }
          });
        })(),
        path: "word/_rels/comments.xml.rels"
      }
    }, file.CommentsExtended ? { CommentsExtended: {
      data: (0, import_xml.default)(this.formatter.format(file.CommentsExtended, {
        viewWrapper: {
          View: file.CommentsExtended,
          Relationships: file.Comments.Relationships
        },
        file,
        stack: []
      }), {
        indent: prettify,
        declaration: {
          standalone: "yes",
          encoding: "UTF-8"
        }
      }),
      path: "word/commentsExtended.xml"
    } } : {}), {}, {
      FontTable: {
        data: (0, import_xml.default)(this.formatter.format(file.FontTable.View, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: {
            standalone: "yes",
            encoding: "UTF-8"
          }
        }),
        path: "word/fontTable.xml"
      },
      FontTableRelationships: {
        data: (0, import_xml.default)(this.formatter.format(file.FontTable.Relationships, {
          viewWrapper: file.Document,
          file,
          stack: []
        }), {
          indent: prettify,
          declaration: { encoding: "UTF-8" }
        }),
        path: "word/_rels/fontTable.xml.rels"
      }
    });
  }
};
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c), u = i.value;
  } catch (n2) {
    e(n2);
    return;
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}
var PrettifyType = {
  /** No prettification (smallest file size) */
  NONE: "",
  /** Indent with 2 spaces */
  WITH_2_BLANKS: "  ",
  /** Indent with 4 spaces */
  WITH_4_BLANKS: "    ",
  /** Indent with tab character */
  WITH_TAB: "	"
};
var convertPrettifyType = (prettify) => prettify === true ? PrettifyType.WITH_2_BLANKS : prettify === false ? void 0 : prettify;
var Packer = class Packer2 {
  /**
  * Exports a document to the specified output format.
  *
  * @param file - The document to export
  * @param type - The output format type (e.g., "nodebuffer", "blob", "string")
  * @param prettify - Whether to prettify the XML output (boolean or PrettifyType)
  * @param overrides - Optional array of file overrides for custom XML content
  * @returns A promise resolving to the exported document in the specified format
  */
  static pack(_x, _x2, _x3) {
    var _this = this;
    return _asyncToGenerator(function* (file, type, prettify, overrides = []) {
      return _this.compiler.compile(file, convertPrettifyType(prettify), overrides).generateAsync({
        type,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE"
      });
    }).apply(this, arguments);
  }
  /**
  * Exports a document to a string representation.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a string
  */
  static toString(file, prettify, overrides = []) {
    return Packer2.pack(file, "string", prettify, overrides);
  }
  /**
  * Exports a document to a Node.js Buffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Buffer
  */
  static toBuffer(file, prettify, overrides = []) {
    return Packer2.pack(file, "nodebuffer", prettify, overrides);
  }
  /**
  * Exports a document to a base64-encoded string.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a base64 string
  */
  static toBase64String(file, prettify, overrides = []) {
    return Packer2.pack(file, "base64", prettify, overrides);
  }
  /**
  * Exports a document to a Blob (for browser environments).
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as a Blob
  */
  static toBlob(file, prettify, overrides = []) {
    return Packer2.pack(file, "blob", prettify, overrides);
  }
  /**
  * Exports a document to an ArrayBuffer.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A promise resolving to the document as an ArrayBuffer
  */
  static toArrayBuffer(file, prettify, overrides = []) {
    return Packer2.pack(file, "arraybuffer", prettify, overrides);
  }
  /**
  * Exports a document to a Node.js Stream.
  *
  * @param file - The document to export
  * @param prettify - Whether to prettify the XML output
  * @param overrides - Optional array of file overrides
  * @returns A readable stream containing the document data
  */
  static toStream(file, prettify, overrides = []) {
    const stream = new import_stream_browserify.Stream();
    this.compiler.compile(file, convertPrettifyType(prettify), overrides).generateAsync({
      type: "nodebuffer",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    }).then((z) => {
      stream.emit("data", z);
      stream.emit("end");
    });
    return stream;
  }
};
_defineProperty(Packer, "compiler", new Compiler());
var formatter$1 = new Formatter();
var toJson = (xmlData) => {
  return (0, import_lib.xml2js)(xmlData, {
    compact: false,
    captureSpacesBetweenElements: true
  });
};
var createTextElementContents = (text) => {
  var _textJson$elements$0$;
  return (_textJson$elements$0$ = toJson((0, import_xml.default)(formatter$1.format(new Text({ text })))).elements[0].elements) !== null && _textJson$elements$0$ !== void 0 ? _textJson$elements$0$ : [];
};
var patchSpaceAttribute = (element) => _objectSpread2(_objectSpread2({}, element), {}, { attributes: { "xml:space": "preserve" } });
var getFirstLevelElements = (relationships, id) => {
  var _relationships$elemen, _relationships$elemen2;
  return (_relationships$elemen = (_relationships$elemen2 = relationships.elements) === null || _relationships$elemen2 === void 0 ? void 0 : _relationships$elemen2.filter((e) => e.name === id)[0].elements) !== null && _relationships$elemen !== void 0 ? _relationships$elemen : [];
};
var appendContentType = (element, contentType, extension) => {
  const relationshipElements = getFirstLevelElements(element, "Types");
  if (relationshipElements.some((el) => {
    var _el$attributes, _el$attributes2;
    return el.type === "element" && el.name === "Default" && (el === null || el === void 0 || (_el$attributes = el.attributes) === null || _el$attributes === void 0 ? void 0 : _el$attributes.ContentType) === contentType && (el === null || el === void 0 || (_el$attributes2 = el.attributes) === null || _el$attributes2 === void 0 ? void 0 : _el$attributes2.Extension) === extension;
  })) return;
  relationshipElements.push({
    attributes: {
      ContentType: contentType,
      Extension: extension
    },
    name: "Default",
    type: "element"
  });
};
var getIdFromRelationshipId = (relationshipId) => {
  const output = parseInt(relationshipId.substring(3), 10);
  return isNaN(output) ? 0 : output;
};
var getNextRelationshipIndex = (relationships) => {
  return getFirstLevelElements(relationships, "Relationships").map((e) => {
    var _e$attributes$Id$toSt, _e$attributes;
    return getIdFromRelationshipId((_e$attributes$Id$toSt = (_e$attributes = e.attributes) === null || _e$attributes === void 0 || (_e$attributes = _e$attributes.Id) === null || _e$attributes === void 0 ? void 0 : _e$attributes.toString()) !== null && _e$attributes$Id$toSt !== void 0 ? _e$attributes$Id$toSt : "");
  }).reduce((acc, curr) => Math.max(acc, curr), 0) + 1;
};
var appendRelationship = (relationships, id, type, target, targetMode) => {
  const relationshipElements = getFirstLevelElements(relationships, "Relationships");
  relationshipElements.push({
    attributes: {
      Id: `rId${id}`,
      Type: type,
      Target: target,
      TargetMode: targetMode
    },
    name: "Relationship",
    type: "element"
  });
  return relationshipElements;
};
var TokenNotFoundError = class extends Error {
  constructor(token) {
    super(`Token ${token} not found`);
    this.name = "TokenNotFoundError";
  }
};
var findRunElementIndexWithToken = (paragraphElement, token) => {
  var _paragraphElement$ele;
  for (let i = 0; i < ((_paragraphElement$ele = paragraphElement.elements) !== null && _paragraphElement$ele !== void 0 ? _paragraphElement$ele : []).length; i++) {
    const element = paragraphElement.elements[i];
    if (element.type === "element" && element.name === "w:r") {
      var _element$elements;
      const textElement = ((_element$elements = element.elements) !== null && _element$elements !== void 0 ? _element$elements : []).filter((e) => e.type === "element" && e.name === "w:t");
      for (const text of textElement) {
        var _text$elements, _text$elements$0$text;
        if (!((_text$elements = text.elements) === null || _text$elements === void 0 ? void 0 : _text$elements[0])) continue;
        if ((_text$elements$0$text = text.elements[0].text) === null || _text$elements$0$text === void 0 ? void 0 : _text$elements$0$text.includes(token)) return i;
      }
    }
  }
  throw new TokenNotFoundError(token);
};
var splitRunElement = (runElement, token) => {
  var _runElement$elements$, _runElement$elements;
  let splitIndex = -1;
  const splitElements = (_runElement$elements$ = (_runElement$elements = runElement.elements) === null || _runElement$elements === void 0 ? void 0 : _runElement$elements.map((e, i) => {
    if (splitIndex !== -1) return e;
    if (e.type === "element" && e.name === "w:t") {
      var _e$elements$0$text, _e$elements;
      const splitText = ((_e$elements$0$text = (_e$elements = e.elements) === null || _e$elements === void 0 || (_e$elements = _e$elements[0]) === null || _e$elements === void 0 ? void 0 : _e$elements.text) !== null && _e$elements$0$text !== void 0 ? _e$elements$0$text : "").split(token);
      const newElements = splitText.map((t) => _objectSpread2(_objectSpread2(_objectSpread2({}, e), patchSpaceAttribute(e)), {}, { elements: createTextElementContents(t) }));
      if (splitText.length > 1) splitIndex = i;
      return newElements;
    } else return e;
  }).flat()) !== null && _runElement$elements$ !== void 0 ? _runElement$elements$ : [];
  return {
    left: _objectSpread2(_objectSpread2({}, JSON.parse(JSON.stringify(runElement))), {}, { elements: splitElements.slice(0, splitIndex + 1) }),
    right: _objectSpread2(_objectSpread2({}, JSON.parse(JSON.stringify(runElement))), {}, { elements: splitElements.slice(splitIndex + 1) })
  };
};
var ReplaceMode = {
  /** Looking for the start of the replacement text */
  START: 0,
  /** Processing runs in the middle of the replacement text */
  MIDDLE: 1,
  /** Reached the end of the replacement text */
  END: 2
};
var replaceTokenInParagraphElement = ({ paragraphElement, renderedParagraph, originalText, replacementText }) => {
  const startIndex = renderedParagraph.text.indexOf(originalText);
  const endIndex = startIndex + originalText.length - 1;
  let replaceMode = ReplaceMode.START;
  for (const run of renderedParagraph.runs) for (const { text, index, start, end } of run.parts) switch (replaceMode) {
    case ReplaceMode.START:
      if (startIndex >= start && startIndex <= end) {
        const offsetStartIndex = startIndex - start;
        const offsetEndIndex = Math.min(endIndex, end) - start;
        const partToReplace = run.text.substring(offsetStartIndex, offsetEndIndex + 1);
        if (partToReplace === "") continue;
        const firstPart = text.replace(partToReplace, replacementText);
        patchTextElement(paragraphElement.elements[run.index].elements[index], firstPart);
        replaceMode = ReplaceMode.MIDDLE;
        continue;
      }
      break;
    case ReplaceMode.MIDDLE:
      if (endIndex <= end) {
        const lastPart = text.substring(endIndex - start + 1);
        patchTextElement(paragraphElement.elements[run.index].elements[index], lastPart);
        const currentElement = paragraphElement.elements[run.index].elements[index];
        paragraphElement.elements[run.index].elements[index] = patchSpaceAttribute(currentElement);
        replaceMode = ReplaceMode.END;
      } else patchTextElement(paragraphElement.elements[run.index].elements[index], "");
      break;
    default:
  }
  return paragraphElement;
};
var patchTextElement = (element, text) => {
  element.elements = createTextElementContents(text);
  return element;
};
var renderParagraphNode = (node) => {
  if (node.element.name !== "w:p") throw new Error(`Invalid node type: ${node.element.name}`);
  if (!node.element.elements) return {
    text: "",
    runs: [],
    index: -1,
    pathToParagraph: []
  };
  let currentRunStringLength = 0;
  const runs = node.element.elements.map((element, i) => ({
    element,
    i
  })).filter(({ element }) => element.name === "w:r").map(({ element, i }) => {
    const renderedRunNode = renderRunNode(element, i, currentRunStringLength);
    currentRunStringLength += renderedRunNode.text.length;
    return renderedRunNode;
  }).filter((e) => !!e);
  return {
    text: runs.reduce((acc, curr) => acc + curr.text, ""),
    runs,
    index: node.index,
    pathToParagraph: buildNodePath(node)
  };
};
var renderRunNode = (node, index, currentRunStringIndex) => {
  if (!node.elements) return {
    text: "",
    parts: [],
    index: -1,
    start: currentRunStringIndex,
    end: currentRunStringIndex
  };
  let currentTextStringIndex = currentRunStringIndex;
  const parts = node.elements.map((element, i) => {
    var _element$elements$0$t, _element$elements$0$t2;
    return element.name === "w:t" && element.elements && element.elements.length > 0 ? {
      text: (_element$elements$0$t = (_element$elements$0$t2 = element.elements[0].text) === null || _element$elements$0$t2 === void 0 ? void 0 : _element$elements$0$t2.toString()) !== null && _element$elements$0$t !== void 0 ? _element$elements$0$t : "",
      index: i,
      start: currentTextStringIndex,
      end: (() => {
        var _element$elements$0$t3, _element$elements$0$t4;
        currentTextStringIndex += ((_element$elements$0$t3 = (_element$elements$0$t4 = element.elements[0].text) === null || _element$elements$0$t4 === void 0 ? void 0 : _element$elements$0$t4.toString()) !== null && _element$elements$0$t3 !== void 0 ? _element$elements$0$t3 : "").length - 1;
        return currentTextStringIndex;
      })()
    } : void 0;
  }).filter((e) => !!e).map((e) => e);
  return {
    text: parts.reduce((acc, curr) => acc + curr.text, ""),
    parts,
    index,
    start: currentRunStringIndex,
    end: currentTextStringIndex
  };
};
var buildNodePath = (node) => node.parent ? [...buildNodePath(node.parent), node.index] : [node.index];
var elementsToWrapper = (wrapper) => {
  var _wrapper$element$elem, _wrapper$element$elem2;
  return (_wrapper$element$elem = (_wrapper$element$elem2 = wrapper.element.elements) === null || _wrapper$element$elem2 === void 0 ? void 0 : _wrapper$element$elem2.map((e, i) => ({
    element: e,
    index: i,
    parent: wrapper
  }))) !== null && _wrapper$element$elem !== void 0 ? _wrapper$element$elem : [];
};
var traverse = (node) => {
  let renderedParagraphs = [];
  const queue2 = [...elementsToWrapper({
    element: node,
    index: 0,
    parent: void 0
  })];
  let currentNode;
  while (queue2.length > 0) {
    currentNode = queue2.shift();
    if (currentNode.element.name === "w:p") renderedParagraphs = [...renderedParagraphs, renderParagraphNode(currentNode)];
    queue2.push(...elementsToWrapper(currentNode));
  }
  return renderedParagraphs;
};
var findLocationOfText = (node, text) => traverse(node).filter((p) => p.text.includes(text));
var formatter = new Formatter();
var SPLIT_TOKEN = "\u0275";
var replacer = ({ json, patch, patchText, context, keepOriginalStyles = true }) => {
  const renderedParagraphs = findLocationOfText(json, patchText);
  if (renderedParagraphs.length === 0) return {
    element: json,
    didFindOccurrence: false
  };
  for (const renderedParagraph of renderedParagraphs) {
    const textJson = patch.children.map((c) => toJson((0, import_xml.default)(formatter.format(c, context)))).map((c) => c.elements[0]);
    switch (patch.type) {
      case PatchType.DOCUMENT: {
        const parentElement = goToParentElementFromPath(json, renderedParagraph.pathToParagraph);
        const elementIndex = getLastElementIndexFromPath(renderedParagraph.pathToParagraph);
        parentElement.elements.splice(elementIndex, 1, ...textJson);
        break;
      }
      case PatchType.PARAGRAPH:
      default: {
        const paragraphElement = goToElementFromPath(json, renderedParagraph.pathToParagraph);
        replaceTokenInParagraphElement({
          paragraphElement,
          renderedParagraph,
          originalText: patchText,
          replacementText: SPLIT_TOKEN
        });
        const index = findRunElementIndexWithToken(paragraphElement, SPLIT_TOKEN);
        const runElementToBeReplaced = paragraphElement.elements[index];
        const { left, right } = splitRunElement(runElementToBeReplaced, SPLIT_TOKEN);
        let newRunElements = textJson;
        let patchedRightElement = right;
        if (keepOriginalStyles) {
          const runElementNonTextualElements = runElementToBeReplaced.elements.filter((e) => e.type === "element" && e.name === "w:rPr");
          newRunElements = textJson.map((e) => {
            var _e$elements;
            return _objectSpread2(_objectSpread2({}, e), {}, { elements: [...runElementNonTextualElements, ...(_e$elements = e.elements) !== null && _e$elements !== void 0 ? _e$elements : []] });
          });
          patchedRightElement = _objectSpread2(_objectSpread2({}, right), {}, { elements: [...runElementNonTextualElements, ...right.elements] });
        }
        paragraphElement.elements.splice(index, 1, left, ...newRunElements, patchedRightElement);
        break;
      }
    }
  }
  return {
    element: json,
    didFindOccurrence: true
  };
};
var goToElementFromPath = (json, path) => {
  let element = json;
  for (let i = 1; i < path.length; i++) {
    const index = path[i];
    element = element.elements[index];
  }
  return element;
};
var goToParentElementFromPath = (json, path) => goToElementFromPath(json, path.slice(0, path.length - 1));
var getLastElementIndexFromPath = (path) => path[path.length - 1];
var PatchType = {
  /** Replace entire file-level elements (e.g., whole paragraphs) */
  DOCUMENT: "file",
  /** Replace content within paragraphs (inline replacement) */
  PARAGRAPH: "paragraph"
};
var imageReplacer = new ImageReplacer();
var UTF16LE = new Uint8Array([255, 254]);
var UTF16BE = new Uint8Array([254, 255]);
var compareByteArrays = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
};
var patchDocument = function() {
  var _ref = _asyncToGenerator(function* ({ outputType, data, patches, keepOriginalStyles, placeholderDelimiters = {
    start: "{{",
    end: "}}"
  }, recursive = true }) {
    const zipContent = data instanceof import_jszip_min.default ? data : yield import_jszip_min.default.loadAsync(data);
    const contexts = /* @__PURE__ */ new Map();
    const file = { Media: new Media() };
    const map = /* @__PURE__ */ new Map();
    const imageRelationshipAdditions = [];
    const hyperlinkRelationshipAdditions = [];
    let hasMedia = false;
    const binaryContentMap = /* @__PURE__ */ new Map();
    for (const [key, value] of Object.entries(zipContent.files)) {
      const binaryValue = yield value.async("uint8array");
      const startBytes = binaryValue.slice(0, 2);
      if (compareByteArrays(startBytes, UTF16LE) || compareByteArrays(startBytes, UTF16BE)) {
        binaryContentMap.set(key, binaryValue);
        continue;
      }
      if (!key.endsWith(".xml") && !key.endsWith(".rels")) {
        binaryContentMap.set(key, binaryValue);
        continue;
      }
      const json = toJson(yield value.async("text"));
      if (key === "word/document.xml") {
        var _json$elements;
        const document2 = (_json$elements = json.elements) === null || _json$elements === void 0 ? void 0 : _json$elements.find((i) => i.name === "w:document");
        if (document2 && document2.attributes) {
          for (const ns of [
            "mc",
            "wp",
            "r",
            "w15",
            "m"
          ]) document2.attributes[`xmlns:${ns}`] = DocumentAttributeNamespaces[ns];
          document2.attributes["mc:Ignorable"] = `${document2.attributes["mc:Ignorable"] || ""} w15`.trim();
        }
      }
      if (key.startsWith("word/") && !key.endsWith(".xml.rels")) {
        const context = {
          file,
          viewWrapper: { Relationships: { addRelationship: (linkId, _, target, __) => {
            hyperlinkRelationshipAdditions.push({
              key,
              hyperlink: {
                id: linkId,
                link: target
              }
            });
          } } },
          stack: []
        };
        contexts.set(key, context);
        if (!(placeholderDelimiters === null || placeholderDelimiters === void 0 ? void 0 : placeholderDelimiters.start.trim()) || !(placeholderDelimiters === null || placeholderDelimiters === void 0 ? void 0 : placeholderDelimiters.end.trim())) throw new Error("Both start and end delimiters must be non-empty strings.");
        const { start, end } = placeholderDelimiters;
        for (const [patchKey, patchValue] of Object.entries(patches)) {
          const patchText = `${start}${patchKey}${end}`;
          while (true) {
            const { didFindOccurrence } = replacer({
              json,
              patch: _objectSpread2(_objectSpread2({}, patchValue), {}, { children: patchValue.children.map((element) => {
                if (element instanceof ExternalHyperlink) {
                  const concreteHyperlink = new ConcreteHyperlink(element.options.children, uniqueId());
                  hyperlinkRelationshipAdditions.push({
                    key,
                    hyperlink: {
                      id: concreteHyperlink.linkId,
                      link: element.options.link
                    }
                  });
                  return concreteHyperlink;
                } else return element;
              }) }),
              patchText,
              context,
              keepOriginalStyles
            });
            if (!recursive || !didFindOccurrence) break;
          }
        }
        const mediaDatas = imageReplacer.getMediaData(JSON.stringify(json), context.file.Media);
        if (mediaDatas.length > 0) {
          hasMedia = true;
          imageRelationshipAdditions.push({
            key,
            mediaDatas
          });
        }
      }
      map.set(key, json);
    }
    for (const { key, mediaDatas } of imageRelationshipAdditions) {
      var _map$get;
      const relationshipKey = `word/_rels/${key.split("/").pop()}.rels`;
      const relationshipsJson = (_map$get = map.get(relationshipKey)) !== null && _map$get !== void 0 ? _map$get : createRelationshipFile();
      map.set(relationshipKey, relationshipsJson);
      const index = getNextRelationshipIndex(relationshipsJson);
      const newJson = imageReplacer.replace(JSON.stringify(map.get(key)), mediaDatas, index);
      map.set(key, JSON.parse(newJson));
      for (let i = 0; i < mediaDatas.length; i++) {
        const { fileName } = mediaDatas[i];
        appendRelationship(relationshipsJson, index + i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${fileName}`);
      }
    }
    for (const { key, hyperlink } of hyperlinkRelationshipAdditions) {
      var _map$get2;
      const relationshipKey = `word/_rels/${key.split("/").pop()}.rels`;
      const relationshipsJson = (_map$get2 = map.get(relationshipKey)) !== null && _map$get2 !== void 0 ? _map$get2 : createRelationshipFile();
      map.set(relationshipKey, relationshipsJson);
      appendRelationship(relationshipsJson, hyperlink.id, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", hyperlink.link, TargetModeType.EXTERNAL);
    }
    if (hasMedia) {
      const contentTypesJson = map.get("[Content_Types].xml");
      if (!contentTypesJson) throw new Error("Could not find content types file");
      appendContentType(contentTypesJson, "image/png", "png");
      appendContentType(contentTypesJson, "image/jpeg", "jpeg");
      appendContentType(contentTypesJson, "image/jpeg", "jpg");
      appendContentType(contentTypesJson, "image/bmp", "bmp");
      appendContentType(contentTypesJson, "image/gif", "gif");
      appendContentType(contentTypesJson, "image/svg+xml", "svg");
    }
    const zip = new import_jszip_min.default();
    for (const [key, value] of map) {
      const output = toXml(value);
      zip.file(key, encodeUtf8(output));
    }
    for (const [key, value] of binaryContentMap) zip.file(key, value);
    for (const { data: stream, fileName } of file.Media.Array) zip.file(`word/media/${fileName}`, stream);
    return zip.generateAsync({
      type: outputType,
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE"
    });
  });
  return function patchDocument2(_x) {
    return _ref.apply(this, arguments);
  };
}();
var toXml = (jsonObj) => {
  return (0, import_lib.js2xml)(jsonObj, { attributeValueFn: (str) => String(str).replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") });
};
var createRelationshipFile = () => ({
  declaration: { attributes: {
    version: "1.0",
    encoding: "UTF-8",
    standalone: "yes"
  } },
  elements: [{
    type: "element",
    name: "Relationships",
    attributes: { xmlns: "http://schemas.openxmlformats.org/package/2006/relationships" },
    elements: []
  }]
});
var patchDetector = function() {
  var _ref = _asyncToGenerator(function* ({ data }) {
    const zipContent = data instanceof import_jszip_min.default ? data : yield import_jszip_min.default.loadAsync(data);
    const patches = /* @__PURE__ */ new Set();
    for (const [key, value] of Object.entries(zipContent.files)) {
      if (!key.endsWith(".xml") && !key.endsWith(".rels")) continue;
      if (key.startsWith("word/") && !key.endsWith(".xml.rels")) traverse(toJson(yield value.async("text"))).forEach((p) => findPatchKeys(p.text).forEach((patch) => patches.add(patch)));
    }
    return Array.from(patches);
  });
  return function patchDetector2(_x) {
    return _ref.apply(this, arguments);
  };
}();
var findPatchKeys = (text) => {
  var _text$match;
  const pattern = /* @__PURE__ */ new RegExp("(?<=\\{\\{).+?(?=\\}\\})", "gs");
  return (_text$match = text.match(pattern)) !== null && _text$match !== void 0 ? _text$match : [];
};

// src/gongwen/format.ts
var PAGE_NUMBER_OPTIONS = [
  { id: "none", label: "\u65E0\u9875\u7801" },
  { id: "gongwen", label: "\u516C\u6587\u5F0F\uFF1A\u2014 1 \u2014\uFF08\u5355\u9875\u53F3 / \u53CC\u9875\u5DE6\uFF09" },
  { id: "dash", label: "\u77ED\u6A2A\u7EBF\uFF1A- 1 -" },
  { id: "plain", label: "\u7EAF\u6570\u5B57\uFF1A1" },
  { id: "cnPage", label: "\u4E2D\u6587\u5F0F\uFF1A\u7B2C 1 \u9875" },
  { id: "total", label: "\u5E26\u603B\u6570\uFF1A\u7B2C 1 \u9875 / \u5171 3 \u9875" }
];
var ROLE_FONT_FALLBACK = {
  docTitle: ["\u65B9\u6B63\u5C0F\u6807\u5B8B\u7B80\u4F53", "\u65B9\u6B63\u5C0F\u6807\u5B8B_GBK", "\u534E\u6587\u4E2D\u5B8B", "STZhongsong"],
  h1: ["\u9ED1\u4F53", "SimHei", "STHeiti"],
  h2: ["\u6977\u4F53_GB2312", "\u6977\u4F53", "STKaiti"],
  h3: ["\u4EFF\u5B8B_GB2312", "\u4EFF\u5B8B", "STFangsong"],
  body: ["\u4EFF\u5B8B_GB2312", "\u4EFF\u5B8B", "STFangsong"],
  table: ["\u4EFF\u5B8B_GB2312", "\u4EFF\u5B8B", "STFangsong"]
};
var LATIN_FONT = "Times New Roman";
var PAGE_NUMBER_FONT = ["\u5B8B\u4F53", "SimSun", "STSong"];
var RED_COLOR = "FF0000";
var RED_HEAD_STYLE = {
  /** 发文机关标志：红色小标宋，推荐醒目字号（国标未定字号，取常见红头大小） */
  agency: { font: ["\u65B9\u6B63\u5C0F\u6807\u5B8B\u7B80\u4F53", "\u65B9\u6B63\u5C0F\u6807\u5B8B_GBK", "\u534E\u6587\u4E2D\u5B8B", "STZhongsong"], sizePt: 33 },
  /** 份号 / 密级和保密期限 / 紧急程度：三号黑体，版心左上角顶格 */
  notice: { font: ["\u9ED1\u4F53", "SimHei", "STHeiti"], sizePt: 16 },
  /** 发文字号 / 签发人：三号仿宋 */
  number: { font: ["\u4EFF\u5B8B_GB2312", "\u4EFF\u5B8B", "STFangsong"], sizePt: 16 },
  /** 红色分隔线：与版心等宽，高度约 0.35mm */
  lineWidthMm: 0.35
};
var SEAL_STYLE = { sizeMm: 42 };
function fitAgencySizePt(agencies, maxSizePt = RED_HEAD_STYLE.agency.sizePt) {
  if (!agencies.length) return maxSizePt;
  const contentPt = Math.floor(156 * 2.8346 * 0.985);
  const widthAt = (name, size2) => [...name].reduce((w, ch) => w + (/[\x00-\xff]/.test(ch) ? size2 * 0.52 : size2), 0);
  const maxName = agencies.reduce((a, b) => a.length >= b.length ? a : b);
  let size = Math.max(22, Math.floor(maxSizePt));
  while (size > 22 && widthAt(maxName, size) > contentPt) size -= 1;
  return size;
}
var STRUCT_STYLE = {
  colophonSizePt: 14
};
var STRUCT_DEFAULTS = {
  signatureAlign: "right",
  signatureRightChars: 4,
  signatureLeftChars: 0,
  attachIndentChars: 2,
  notesIndentChars: 2,
  colophonLeftChars: 1,
  printRightChars: 1,
  copiesRightChars: 3
};
function textWidthChars(s) {
  let w = 0;
  for (const ch of s) w += /[\x00-\xff]/.test(ch) ? 0.5 : 1;
  return w;
}
var role = (font2, sizePt, bold = false, align = "left", indentChars = 0) => ({ font: font2, sizePt, bold, align, indentChars });
var BUILTIN_PRESETS = [
  {
    id: "gongwen-standard",
    name: "\u516C\u6587 \xB7 \u6807\u51C6\uFF08GB/T 9704\uFF09",
    builtin: true,
    page: { top: 37, bottom: 35, left: 28, right: 26 },
    linePt: 28,
    titleLinePt: 35,
    roles: {
      docTitle: role("\u65B9\u6B63\u5C0F\u6807\u5B8B\u7B80\u4F53", 22, false, "center"),
      h1: role("\u9ED1\u4F53", 16),
      h2: role("\u6977\u4F53_GB2312", 16),
      h3: role("\u4EFF\u5B8B_GB2312", 16, true, "left", 2),
      body: role("\u4EFF\u5B8B_GB2312", 16, false, "left", 2),
      table: role("\u4EFF\u5B8B_GB2312", 14, false, "left", 0)
    },
    pageNumber: { style: "gongwen", align: "right", sizePt: 14 }
  },
  {
    id: "generic-simple",
    name: "\u65E5\u5E38 \xB7 \u7B80\u6D01",
    builtin: true,
    page: { top: 25.4, bottom: 25.4, left: 31.8, right: 31.8 },
    linePt: 22,
    titleLinePt: 30,
    roles: {
      docTitle: role("", 16, true, "center"),
      h1: role("", 14, true),
      h2: role("", 12, true),
      h3: role("", 12, true, "left", 2),
      body: role("", 12, false, "left", 2),
      table: role("", 11, false, "left", 0)
    },
    pageNumber: { style: "plain", align: "center", sizePt: 12 }
  }
];
function roleFontChain(presetRole, fallbackKey) {
  const base = ROLE_FONT_FALLBACK[fallbackKey];
  if (!presetRole.font) return base;
  return [presetRole.font, ...base.filter((f) => f !== presetRole.font)];
}
function clonePreset(p, patch) {
  return {
    ...structuredClone(p),
    ...patch,
    page: { ...p.page, ...patch.page ?? {} },
    roles: {
      docTitle: { ...p.roles.docTitle, ...patch.roles?.docTitle ?? {} },
      h1: { ...p.roles.h1, ...patch.roles?.h1 ?? {} },
      h2: { ...p.roles.h2, ...patch.roles?.h2 ?? {} },
      h3: { ...p.roles.h3, ...patch.roles?.h3 ?? {} },
      body: { ...p.roles.body, ...patch.roles?.body ?? {} },
      table: { ...p.roles.table, ...patch.roles?.table ?? {} }
    }
  };
}
function normalizePageNumber(raw) {
  const STYLES = ["none", "gongwen", "dash", "plain", "cnPage", "total"];
  const old = raw;
  let style = "none";
  if (typeof old === "string") style = STYLES.includes(old) ? old : "none";
  else if (old && typeof old === "object" && STYLES.includes(old.style)) style = old.style;
  const align = raw?.align === "left" || raw?.align === "right" ? raw.align : raw?.align === "center" ? "center" : "center";
  const sizePt = typeof raw?.sizePt === "number" && raw.sizePt > 0 && raw.sizePt < 72 ? raw.sizePt : 14;
  return { style, align, sizePt };
}
function normalizePreset(raw) {
  if (!raw || typeof raw !== "object" || !raw.id || !raw.name) return null;
  const base = BUILTIN_PRESETS[0];
  const num = (v, d) => typeof v === "number" && isFinite(v) && v > 0 ? v : d;
  const rs = (v, d) => ({
    font: typeof v?.font === "string" ? v.font : d.font,
    sizePt: num(v?.sizePt, d.sizePt),
    bold: !!v?.bold,
    align: v?.align === "center" ? "center" : "left",
    indentChars: typeof v?.indentChars === "number" && v.indentChars >= 0 ? v.indentChars : d.indentChars
  });
  return {
    id: String(raw.id),
    name: String(raw.name),
    builtin: false,
    page: {
      top: num(raw.page?.top, base.page.top),
      bottom: num(raw.page?.bottom, base.page.bottom),
      left: num(raw.page?.left, base.page.left),
      right: num(raw.page?.right, base.page.right)
    },
    linePt: num(raw.linePt, base.linePt),
    titleLinePt: num(raw.titleLinePt, base.titleLinePt),
    roles: {
      docTitle: rs(raw.roles?.docTitle, base.roles.docTitle),
      h1: rs(raw.roles?.h1, base.roles.h1),
      h2: rs(raw.roles?.h2, base.roles.h2),
      h3: rs(raw.roles?.h3, base.roles.h3),
      body: rs(raw.roles?.body, base.roles.body),
      table: rs(raw.roles?.table, base.roles.table)
    },
    pageNumber: normalizePageNumber(raw.pageNumber)
  };
}

// src/gongwen/docx_export.ts
var MM = 56.693;
function font(chain) {
  return { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: chain[0] };
}
function bodyRuns(text, preset, boldFirst) {
  const st = preset.roles.body;
  const size = st.sizePt * 2;
  const chain = roleFontChain(st, "body");
  const m = text.match(/^([^。]+。)?([\s\S]*)$/);
  const first = m?.[1] ?? "";
  const rest = m?.[2] ?? "";
  if (boldFirst && first) {
    return [
      new TextRun({ text: first, size, bold: true, font: font(chain) }),
      ...rest ? [new TextRun({ text: rest, size, font: font(chain) })] : []
    ];
  }
  return [new TextRun({ text, size, font: font(chain) })];
}
function bodyPara(text, preset, boldFirst, keepNext = false) {
  const st = preset.roles.body;
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT },
    indent: st.indentChars ? { firstLine: st.indentChars * st.sizePt * 20 } : void 0,
    ...keepNext ? { keepNext: true } : {},
    children: bodyRuns(text, preset, boldFirst)
  });
}
function headingPara(text, st, fallbackKey, preset, keepNext = false) {
  const indent = st.indentChars ? { firstLine: st.indentChars * st.sizePt * 20 } : void 0;
  return new Paragraph({
    alignment: st.align === "center" ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT },
    ...keepNext ? { keepNext: true } : {},
    indent,
    children: [
      new TextRun({
        text,
        size: st.sizePt * 2,
        bold: st.bold,
        font: font(roleFontChain(st, fallbackKey))
      })
    ]
  });
}
function blockToPara(b, preset, boldFirst, keepNext = false) {
  switch (b.kind) {
    case "docTitle": {
      const st = preset.roles.docTitle;
      const lines = b.text.split("\n");
      return lines.map(
        (line, i) => new Paragraph({
          alignment: st.align === "center" ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { line: preset.titleLinePt * 20, lineRule: LineRuleType.EXACT, after: 240 },
          ...keepNext && i === lines.length - 1 ? { keepNext: true } : {},
          children: [new TextRun({ text: line, size: st.sizePt * 2, bold: st.bold, font: font(roleFontChain(st, "docTitle")) })]
        })
      );
    }
    case "h1":
      return [headingPara(b.text, preset.roles.h1, "h1", preset, keepNext)];
    case "h2":
      return [headingPara(b.text, preset.roles.h2, "h2", preset, keepNext)];
    case "h3":
      return [headingPara(b.text, preset.roles.h3, "h3", preset, keepNext)];
    default:
      return [bodyPara(b.text, preset, boldFirst, keepNext)];
  }
}
var CELL_MARGINS = { top: 40, bottom: 40, left: 80, right: 80 };
function tableBorders() {
  const b = { style: BorderStyle.SINGLE, size: 4, color: "auto" };
  return {
    top: b,
    bottom: b,
    left: b,
    right: b,
    insideHorizontal: b,
    insideVertical: b
  };
}
function cellPara(text, preset, opts) {
  const st = preset.roles.table;
  const bold = opts.header || st.bold;
  const align = opts.align === "left" ? AlignmentType.LEFT : opts.align === "right" ? AlignmentType.RIGHT : AlignmentType.CENTER;
  return new Paragraph({
    alignment: align,
    spacing: { before: 0, after: 0 },
    children: [
      new TextRun({
        text,
        size: st.sizePt * 2,
        bold,
        font: font(roleFontChain(st, "table"))
      })
    ]
  });
}
function tableBlock(t, preset) {
  const colW = Math.floor(contentWidthTwips(preset) / Math.max(1, t.header.length));
  const alignOf2 = (i, header) => {
    if (header) return "center";
    return t.align?.[i] ?? "center";
  };
  const rows = [];
  const cell = (text, header, i) => new TableCell({
    verticalAlign: VerticalAlign.CENTER,
    margins: CELL_MARGINS,
    width: { size: colW, type: WidthType.DXA },
    children: [cellPara(text, preset, { header, align: alignOf2(i, header) })]
  });
  rows.push(
    new TableRow({
      tableHeader: true,
      children: t.header.map((h, i) => cell(h, true, i))
    })
  );
  for (const r of t.rows) rows.push(new TableRow({ children: r.map((c, i) => cell(c, false, i)) }));
  return new Table({
    width: { size: colW * t.header.length, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    alignment: AlignmentType.CENTER,
    borders: tableBorders(),
    rows
  });
}
function tableHeightPt(t, preset) {
  const st = preset.roles.table;
  const n = 1 + t.rows.length;
  return n * st.sizePt * 1.6 + 8;
}
function footerRuns(cfg) {
  const size = cfg.sizePt * 2;
  const f = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: PAGE_NUMBER_FONT[0] };
  switch (cfg.style) {
    case "gongwen":
      return [new TextRun({ children: ["\u2014 ", PageNumber.CURRENT, " \u2014"], size, font: f })];
    case "dash":
      return [new TextRun({ children: ["- ", PageNumber.CURRENT, " -"], size, font: f })];
    case "plain":
      return [new TextRun({ children: [PageNumber.CURRENT], size, font: f })];
    case "cnPage":
      return [new TextRun({ children: ["\u7B2C ", PageNumber.CURRENT, " \u9875"], size, font: f })];
    case "total":
      return [new TextRun({ children: ["\u7B2C ", PageNumber.CURRENT, " \u9875 / \u5171 ", PageNumber.TOTAL_PAGES, " \u9875"], size, font: f })];
    default:
      return [];
  }
}
function pageIndent(align, cfg) {
  if (cfg.style !== "gongwen") return void 0;
  const w = Math.round(cfg.sizePt * 20);
  if (align === AlignmentType.LEFT) return { left: w };
  if (align === AlignmentType.RIGHT) return { right: w };
  return void 0;
}
function pageFooter(align, cfg) {
  const indent = pageIndent(align, cfg);
  return new Footer({
    children: [
      new Paragraph({
        alignment: align,
        ...indent ? { indent } : {},
        children: footerRuns(cfg)
      })
    ]
  });
}
function alignOf(a) {
  return a === "left" ? AlignmentType.LEFT : a === "right" ? AlignmentType.RIGHT : AlignmentType.CENTER;
}
var COND_BOOKMARK = "rhLastBody";
var COND_XMLNS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
function importedRun(inner) {
  const wrapper = ImportedXmlComponent.fromXmlString(`<w:r ${COND_XMLNS}>${inner}</w:r>`);
  return wrapper.root;
}
function xmlEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function pnRpr(sizePt) {
  return `<w:rPr><w:rFonts w:ascii="${LATIN_FONT}" w:hAnsi="${LATIN_FONT}" w:eastAsia="${PAGE_NUMBER_FONT[0]}"/><w:sz w:val="${sizePt * 2}"/></w:rPr>`;
}
function fldRuns(type) {
  return importedRun(`<w:fldChar w:fldCharType="${type}"/>`);
}
function instrRuns(text) {
  return importedRun(`<w:instrText xml:space="preserve">${xmlEscape(text)}</w:instrText>`);
}
function cachedRuns(text, rpr) {
  return importedRun(`${rpr}<w:t xml:space="preserve">${xmlEscape(text)}</w:t>`);
}
function fieldRuns(instrText, cachedText, rpr) {
  return [...fldRuns("begin"), ...instrRuns(instrText), ...fldRuns("separate"), ...cachedRuns(cachedText, rpr), ...fldRuns("end")];
}
function pageNumberSegments(style) {
  switch (style) {
    case "gongwen":
      return [{ kind: "lit", text: "\u2014 " }, { kind: "page" }, { kind: "lit", text: " \u2014" }];
    case "dash":
      return [{ kind: "lit", text: "- " }, { kind: "page" }, { kind: "lit", text: " -" }];
    case "plain":
      return [{ kind: "page" }];
    case "cnPage":
      return [{ kind: "lit", text: "\u7B2C " }, { kind: "page" }, { kind: "lit", text: " \u9875" }];
    case "total":
      return [{ kind: "lit", text: "\u7B2C " }, { kind: "page" }, { kind: "lit", text: " \u9875 / \u5171 " }, { kind: "total" }, { kind: "lit", text: " \u9875" }];
    default:
      return [];
  }
}
function condOverflowRuns(rpr) {
  return [
    ...fieldRuns(" PAGE ", "1", rpr),
    ...instrRuns(" > "),
    ...fieldRuns(` PAGEREF ${COND_BOOKMARK} `, "1", rpr)
  ];
}
function condAdjacentRuns(rpr) {
  const formula = [
    ...fldRuns("begin"),
    ...instrRuns(" = "),
    ...fieldRuns(" PAGE ", "1", rpr),
    ...instrRuns(" - 1 "),
    ...fldRuns("separate"),
    ...cachedRuns("1", rpr),
    ...fldRuns("end")
  ];
  return [...fieldRuns(` PAGEREF ${COND_BOOKMARK} `, "1", rpr), ...instrRuns(" = "), ...formula];
}
function segmentField(seg, sizePt, mode) {
  const rpr = pnRpr(sizePt);
  let showInstrText = "";
  let showCached = "";
  const showRuns = [];
  if (seg.kind === "lit") {
    showInstrText = `"${seg.text}"`;
    showCached = seg.text;
  } else {
    showRuns.push(...fieldRuns(seg.kind === "page" ? " PAGE " : " NUMPAGES ", "1", rpr));
    showCached = "1";
  }
  const head = [...fldRuns("begin"), ...instrRuns(" IF "), ...mode === "hideOverflow" ? condOverflowRuns(rpr) : condAdjacentRuns(rpr)];
  const tail = [...fldRuns("separate"), ...cachedRuns(showCached, rpr), ...fldRuns("end")];
  if (mode === "hideOverflow") {
    return [...head, ...instrRuns(' "" '), ...showInstrText ? instrRuns(showInstrText) : [], ...showRuns, ...tail];
  }
  return [...head, ...showInstrText ? instrRuns(showInstrText) : [], ...showRuns, ...instrRuns(' "" '), ...tail];
}
function conditionalFooter(align, cfg, mode) {
  const children = pageNumberSegments(cfg.style).flatMap((seg) => segmentField(seg, cfg.sizePt, mode));
  const indent = pageIndent(align, cfg);
  return new Footer({
    children: [new Paragraph({ alignment: align, ...indent ? { indent } : {}, children })]
  });
}
function contentWidthTwips(preset) {
  return Math.round((210 - preset.page.left - preset.page.right) * MM);
}
function imageDims(buf, ext) {
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  if (ext === "png") return { w: dv.getUint32(16), h: dv.getUint32(20) };
  let i = 2;
  while (i + 9 < buf.byteLength) {
    if (buf[i] !== 255) {
      i++;
      continue;
    }
    const marker = buf[i + 1];
    if (marker >= 192 && marker <= 207 && marker !== 196 && marker !== 200 && marker !== 204) {
      return { w: dv.getUint16(i + 7), h: dv.getUint16(i + 5) };
    }
    const len = dv.getUint16(i + 2);
    i += 2 + len;
  }
  return { w: 0, h: 0 };
}
function logoPara(logo) {
  const buf = new Uint8Array(logo.data);
  const { w, h } = imageDims(buf, logo.ext);
  const targetWPx = Math.round(40 / 25.4 * 96);
  const hp = w > 0 && h > 0 ? Math.round(targetWPx * h / w) : targetWPx;
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      new ImageRun({
        type: logo.ext,
        data: logo.data,
        transformation: { width: targetWPx, height: hp }
      })
    ]
  });
}
function redHeadParas(meta, preset, logo) {
  const hasAny = Object.values(meta).some((v) => !!v) || !!logo;
  if (!hasAny) return [];
  const ps = [];
  const line28 = { line: 28 * 20, lineRule: LineRuleType.EXACT };
  const noticeFont = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.notice.font[0] };
  const numFont = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.number.font[0] };
  if (logo) ps.push(logoPara(logo));
  const notice = (t) => new Paragraph({ spacing: line28, children: [new TextRun({ text: t, size: RED_HEAD_STYLE.notice.sizePt * 2, font: noticeFont })] });
  if (meta.copyNumber) ps.push(notice(meta.copyNumber));
  if (meta.secretLevel) ps.push(notice(meta.secretLevel));
  if (meta.urgency) ps.push(notice(meta.urgency));
  if (meta.agency) {
    const agencies = splitAgencies(meta.agency);
    const agencySizePt = fitAgencySizePt(agencies);
    agencies.forEach((ag, i) => {
      ps.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { line: 44 * 20, lineRule: LineRuleType.EXACT, before: i === 0 ? 120 : 0 },
          children: [
            new TextRun({
              text: ag,
              size: agencySizePt * 2,
              color: RED_COLOR,
              font: { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.agency.font[0] }
            })
          ]
        })
      );
    });
  }
  if (meta.docNumber || meta.signer) {
    if (meta.signer) {
      const oneChar = Math.round(RED_HEAD_STYLE.number.sizePt * 20);
      ps.push(
        new Paragraph({
          tabStops: [{ type: TabStopType.RIGHT, position: contentWidthTwips(preset) - oneChar }],
          indent: { firstLine: oneChar },
          spacing: { ...line28, before: 28 * 20 },
          children: [
            new TextRun({ text: meta.docNumber ?? "", size: RED_HEAD_STYLE.number.sizePt * 2, font: numFont }),
            new TextRun({ children: [new Tab(), `\u7B7E\u53D1\u4EBA\uFF1A${meta.signer}`], size: RED_HEAD_STYLE.number.sizePt * 2, font: numFont })
          ]
        })
      );
    } else {
      ps.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { ...line28, before: 28 * 20 },
          children: [new TextRun({ text: meta.docNumber ?? "", size: RED_HEAD_STYLE.number.sizePt * 2, font: numFont })]
        })
      );
    }
  }
  ps.push(
    new Paragraph({
      spacing: { before: Math.round(4 * MM / 20), after: 240 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: RED_COLOR } },
      children: []
    })
  );
  return ps;
}
function sealFloatingRun(seal, preset, struct, dateText) {
  const buf = new Uint8Array(seal.data);
  const { w, h } = imageDims(buf, seal.ext);
  const targetWPx = Math.round(SEAL_STYLE.sizeMm / 25.4 * 96);
  const hpPx = w > 0 && h > 0 ? Math.round(targetWPx * h / w) : targetWPx;
  const charW = preset.roles.body.sizePt * 20;
  const sealWTw = SEAL_STYLE.sizeMm * MM;
  const sealHTw = hpPx / targetWPx * sealWTw;
  const dateWTw = textWidthChars(dateText) * charW;
  const rightGap = struct.signatureAlign === "left" ? 0 : struct.signatureRightChars * charW;
  const centerX = contentWidthTwips(preset) - rightGap - dateWTw / 2 + charW * 0.5;
  const offX = Math.round((centerX - sealWTw / 2) * 635);
  const lineTw = preset.linePt * 20;
  const offY = Math.round((lineTw * 0.35 - sealHTw) * 635);
  return new ImageRun({
    type: seal.ext,
    data: seal.data,
    transformation: { width: targetWPx, height: hpPx },
    floating: {
      horizontalPosition: { relative: "margin", offset: offX },
      verticalPosition: { relative: "paragraph", offset: offY },
      allowOverlap: true,
      behindDocument: false,
      // 章压在文字上方
      wrap: { type: TextWrappingType.NONE },
      zIndex: 10
    }
  });
}
var bodyFontOf = (preset) => font(roleFontChain(preset.roles.body, "body"));
function recipientsPara(text, preset) {
  const t = /[：:]$/.test(text.trim()) ? text.trim() : `${text.trim()}\uFF1A`;
  return new Paragraph({
    spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT, before: preset.linePt * 20 },
    children: [new TextRun({ text: t, size: preset.roles.body.sizePt * 2, font: bodyFontOf(preset) })]
  });
}
function attachmentParas(text, preset, attachIndentChars = STRUCT_DEFAULTS.attachIndentChars, keepLast = false) {
  const lines = text.split("/").map((s) => s.trim()).filter(Boolean);
  const indent = { left: attachIndentChars * preset.roles.body.sizePt * 20 };
  return lines.map((l, i) => {
    const label = lines.length > 1 && !/^[\d１-９]/.test(l) ? `\u9644\u4EF6${i + 1}\uFF1A${l}` : `\u9644\u4EF6\uFF1A${l}`;
    return new Paragraph({
      indent,
      spacing: { line: preset.linePt * 20, lineRule: LineRuleType.EXACT, before: i === 0 ? preset.linePt * 20 : 0 },
      keepNext: keepLast && i === lines.length - 1,
      children: [new TextRun({ text: label, size: preset.roles.body.sizePt * 2, font: bodyFontOf(preset) })]
    });
  });
}
function closingParas(meta, preset, struct = STRUCT_DEFAULTS, sealImg) {
  const hasSignBlock = !!(meta.signature || meta.date);
  if (!hasSignBlock && !meta.notes) return [];
  const ps = [];
  const size = preset.roles.body.sizePt * 2;
  const line = { line: preset.linePt * 20, lineRule: LineRuleType.EXACT };
  if (hasSignBlock) {
    const align = struct.signatureAlign;
    const charW = preset.roles.body.sizePt * 20;
    const alignment = align === "center" ? AlignmentType.CENTER : align === "left" ? AlignmentType.LEFT : AlignmentType.RIGHT;
    const indentFor = (rightChars) => align === "center" ? {} : align === "left" ? { left: Math.round(struct.signatureLeftChars * charW) } : { right: Math.max(0, Math.round(rightChars)) };
    const dw = textWidthChars(meta.date ?? "");
    const sw = textWidthChars(meta.signature ?? "");
    const dateRightTw = struct.signatureRightChars * charW;
    const sigRightTw = meta.date ? (struct.signatureRightChars + (dw - sw) / 2) * charW : dateRightTw;
    if (meta.signature) {
      ps.push(
        new Paragraph({
          alignment,
          indent: indentFor(sigRightTw),
          spacing: { ...line, before: preset.linePt * 20 },
          keepNext: !!meta.date,
          // 防成文日期孤行跑下一页（v0.10.0）
          children: [new TextRun({ text: meta.signature, size, font: bodyFontOf(preset) })]
        })
      );
    }
    if (meta.date) {
      const runs = [new TextRun({ text: meta.date, size, font: bodyFontOf(preset) })];
      if (sealImg) runs.push(sealFloatingRun(sealImg, preset, struct, meta.date));
      ps.push(
        new Paragraph({
          alignment,
          indent: indentFor(dateRightTw),
          spacing: line,
          children: runs
        })
      );
    }
  }
  if (meta.notes) {
    const n = meta.notes.trim();
    const wrapped = /^[（(]/.test(n) ? n : `\uFF08${n}\uFF09`;
    ps.push(
      new Paragraph({
        indent: { left: Math.round(struct.notesIndentChars * preset.roles.body.sizePt * 20) },
        spacing: { ...line, before: preset.linePt * 20 },
        children: [new TextRun({ text: wrapped, size, font: bodyFontOf(preset) })]
      })
    );
  }
  return ps;
}
function attachBlocksToParas(attach, preset) {
  const ps = [];
  const markFont = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: RED_HEAD_STYLE.notice.font[0] };
  const line = { line: preset.linePt * 20, lineRule: LineRuleType.EXACT };
  let firstHeading;
  const rest = [];
  for (const b of attach) {
    if (!firstHeading && (b.kind === "docTitle" || b.kind === "h1" || b.kind === "h2")) firstHeading = b;
    else rest.push(b);
  }
  const markRow = (mark) => new Paragraph({
    spacing: { ...line, before: preset.linePt * 20 },
    children: [new TextRun({ text: mark, size: RED_HEAD_STYLE.notice.sizePt * 2, font: markFont })]
  });
  if (firstHeading) {
    const { mark, title } = splitAttachTitle(firstHeading.text);
    ps.push(markRow(mark));
    if (title) {
      const st = preset.roles.docTitle;
      ps.push(
        new Paragraph({
          alignment: st.align === "center" ? AlignmentType.CENTER : AlignmentType.LEFT,
          spacing: { line: preset.titleLinePt * 20, lineRule: LineRuleType.EXACT, after: 240 },
          children: [new TextRun({ text: title, size: st.sizePt * 2, bold: st.bold, font: font(roleFontChain(st, "docTitle")) })]
        })
      );
    }
  } else {
    ps.push(markRow("\u9644\u4EF6"));
  }
  for (const b of rest) {
    if (b.kind === "table" && b.table && b.table.rows.length) ps.push(tableBlock(b.table, preset));
    else ps.push(...blockToPara(b, preset, false));
  }
  return ps;
}
function colophonParas(meta, preset, struct = STRUCT_DEFAULTS) {
  if (!meta.cc && !meta.printOrg && !meta.printDate && !meta.printCopies) return [];
  const ps = [];
  const sizePt = STRUCT_STYLE.colophonSizePt;
  const size = sizePt * 2;
  const f = { ascii: LATIN_FONT, hAnsi: LATIN_FONT, eastAsia: roleFontChain(preset.roles.body, "body")[0] };
  const line = { line: sizePt * 20, lineRule: LineRuleType.EXACT };
  const thick = { style: BorderStyle.SINGLE, size: 12, color: "000000" };
  const thin = { style: BorderStyle.SINGLE, size: 6, color: "000000" };
  const oneColophonChar = sizePt * 20;
  const leftPad = "\u3000".repeat(struct.colophonLeftChars);
  const total = (meta.cc ? 1 : 0) + (meta.printOrg || meta.printDate ? 1 : 0) + (meta.printCopies ? 1 : 0);
  let idx = 0;
  const borders = () => {
    const top = idx === 0 ? thick : thin;
    const isLast = idx === total - 1;
    idx++;
    return isLast ? { top, bottom: thick } : { top };
  };
  if (meta.cc) {
    const t = /[。！？]$/.test(meta.cc.trim()) ? meta.cc.trim() : `${meta.cc.trim()}\u3002`;
    ps.push(
      new Paragraph({
        spacing: { ...line, before: preset.linePt * 20 },
        border: borders(),
        children: [new TextRun({ text: `${leftPad}\u6284\u9001\uFF1A${t}`, size, font: f })]
      })
    );
  }
  if (meta.printOrg || meta.printDate) {
    const pd = /印发$/.test(meta.printDate?.trim() ?? "") ? meta.printDate.trim() : `${meta.printDate?.trim() ?? ""}\u5370\u53D1`;
    ps.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: contentWidthTwips(preset) - struct.printRightChars * oneColophonChar }],
        spacing: line,
        border: borders(),
        children: [
          new TextRun({ text: `${leftPad}${meta.printOrg ?? ""}`, size, font: f }),
          new TextRun({ children: [new Tab(), pd], size, font: f })
        ]
      })
    );
  }
  if (meta.printCopies) {
    const c = meta.printCopies.trim();
    const label = /印/.test(c) ? c : `\u5370${c}\u4EFD`;
    ps.push(
      new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: contentWidthTwips(preset) - struct.copiesRightChars * oneColophonChar }],
        spacing: line,
        border: borders(),
        children: [new TextRun({ children: [new Tab(), label], size, font: f })]
      })
    );
  }
  return ps;
}
var PT_PER_MM = 72 / 25.4;
function wrapLines(text, sizePt, indentChars, preset) {
  const contentWmm = 210 - preset.page.left - preset.page.right;
  const perLine = Math.max(1, Math.floor(contentWmm * PT_PER_MM / sizePt));
  const units = textWidthChars(text);
  const firstAvail = Math.max(0, perLine - indentChars);
  if (units <= firstAvail) return 1;
  return 1 + Math.ceil((units - firstAvail) / perLine);
}
function estimateBodyHeightPt(blocks, meta, preset, logo) {
  let pt = 0;
  const linePt = preset.linePt;
  const B = 16;
  const roleSize = (k) => preset.roles[k].sizePt;
  const roleIndent = (k) => preset.roles[k].indentChars ?? 0;
  const addPara = (text, sizePt, h, indentChars = 0, beforePt = 0, afterPt = 0) => {
    pt += wrapLines(text, sizePt, indentChars, preset) * h + beforePt + afterPt;
  };
  const hasRedHead = Object.values(meta).some((v) => !!v) || !!logo;
  if (hasRedHead) {
    if (logo) {
      const buf = new Uint8Array(logo.data);
      const { w, h } = imageDims(buf, logo.ext);
      const targetWPx = Math.round(40 / 25.4 * 96);
      const hp = w > 0 && h > 0 ? Math.round(targetWPx * h / w) : targetWPx;
      pt += hp * 72 / 96 + 6;
    }
    for (const k of ["copyNumber", "secretLevel", "urgency"]) {
      if (meta[k]) pt += 28;
    }
    for (const ag of splitAgencies(meta.agency)) addPara(ag, RED_HEAD_STYLE.agency.sizePt, 44, 0, 6);
    if (meta.docNumber || meta.signer) {
      const t = meta.signer ? `${meta.docNumber ?? ""}\u7B7E\u53D1\u4EBA\uFF1A${meta.signer}` : meta.docNumber ?? "";
      addPara(t, RED_HEAD_STYLE.number.sizePt, 28, 0, 28);
    }
    pt += 24;
  }
  for (const b of blocks) {
    if (b.kind === "table") {
      if (b.table && b.table.rows.length) pt += tableHeightPt(b.table, preset);
      continue;
    }
    if (b.kind === "docTitle") {
      for (const line of b.text.split("\n")) addPara(line, roleSize("docTitle"), preset.titleLinePt, 0, 0, 12);
      if (meta.recipients) addPara(meta.recipients, roleSize("body"), linePt, 0, linePt);
      continue;
    }
    const k = b.kind === "h1" ? "h1" : b.kind === "h2" ? "h2" : b.kind === "h3" ? "h3" : "body";
    addPara(b.text, roleSize(k), linePt, roleIndent(k));
  }
  if (meta.attachments) {
    const lines = meta.attachments.split("/").map((s) => s.trim()).filter(Boolean);
    lines.forEach((l, i) => addPara(l, roleSize("body"), linePt, 2, i === 0 ? linePt : 0));
  }
  if (meta.signature || meta.date) {
    if (meta.signature) addPara(meta.signature, roleSize("body"), linePt, 0, linePt);
    if (meta.date) addPara(meta.date, roleSize("body"), linePt, 0, 0);
  }
  if (meta.notes) addPara(meta.notes, roleSize("body"), linePt, 2, linePt);
  return pt;
}
function colophonFitsOnePage(blocks, meta, preset, logo) {
  const contentHmm = 297 - preset.page.top - preset.page.bottom;
  const bodyPt = estimateBodyHeightPt(blocks, meta, preset, logo);
  return bodyPt <= contentHmm * PT_PER_MM * 0.985;
}
function buildDoc(blocks, preset, boldFirst, meta = {}, logo, colophonMode = "off", struct = STRUCT_DEFAULTS, sealImg, attach) {
  const metaTitle = (blocks.find((b) => b.kind === "docTitle")?.text ?? "").split("\n")[0].trim() || void 0;
  const metaAgency = meta.agency?.trim() || meta.signature?.trim() || void 0;
  const pn = preset.pageNumber;
  const isGongwen = pn.style === "gongwen";
  const hasPageNumber = pn.style !== "none";
  const hasColophon = !!(meta.cc || meta.printOrg || meta.printDate || meta.printCopies);
  const hasAttach = !!attach && attach.length > 0;
  const closingNeeded = !!(meta.signature || meta.date || meta.notes);
  const splitColophon = hasColophon && !hasAttach && (colophonMode === "force" || colophonMode === "auto" && !colophonFitsOnePage(blocks, meta, preset, logo));
  const conditionalPn = splitColophon && hasPageNumber;
  const plainFooters = () => ({
    footers: {
      default: pageFooter(isGongwen ? AlignmentType.RIGHT : alignOf(pn.align), pn),
      ...isGongwen ? { even: pageFooter(AlignmentType.LEFT, pn) } : {}
    }
  });
  const condFooters = {
    // 节1：default（奇数页/单页脚）带 hideOverflow 条件——Word 自动补的空白页必为奇数页，
    // gongwen 偶数页脚保持普通（正文偶数页全部正常显示，无空白页落偶数页脚）
    footers: {
      default: conditionalFooter(isGongwen ? AlignmentType.RIGHT : alignOf(pn.align), pn, "hideOverflow"),
      ...isGongwen ? { even: pageFooter(AlignmentType.LEFT, pn) } : {}
    }
  };
  const sectionProps = {
    page: {
      size: { width: Math.round(210 * MM), height: Math.round(297 * MM) },
      margin: {
        top: Math.round(preset.page.top * MM),
        bottom: Math.round(preset.page.bottom * MM),
        left: Math.round(preset.page.left * MM),
        right: Math.round(preset.page.right * MM)
      }
    }
  };
  const mainChildren = [];
  const colophonChildren = [];
  {
    mainChildren.push(...redHeadParas(meta, preset, logo));
    let lastBodyIdx = -1;
    blocks.forEach((b, i) => {
      if (b.kind !== "table") lastBodyIdx = i;
    });
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.kind === "table") {
        if (b.table && b.table.rows.length) mainChildren.push(tableBlock(b.table, preset));
        continue;
      }
      mainChildren.push(...blockToPara(b, preset, boldFirst, closingNeeded && i === lastBodyIdx));
      if (b.kind === "docTitle" && meta.recipients) mainChildren.push(recipientsPara(meta.recipients, preset));
    }
    if (meta.attachments)
      mainChildren.push(...attachmentParas(meta.attachments, preset, struct.attachIndentChars, closingNeeded && blocks.length === 0));
    mainChildren.push(...closingParas(meta, preset, struct, sealImg));
    if (!hasAttach && !splitColophon) mainChildren.push(...colophonParas(meta, preset, struct));
  }
  if (splitColophon) colophonChildren.push(...colophonParas(meta, preset, struct));
  if (conditionalPn) {
    mainChildren.push(
      new Paragraph({
        spacing: { before: 0, after: 0, line: 20, lineRule: LineRuleType.EXACT },
        children: [new Bookmark({ id: COND_BOOKMARK, children: [] })]
      })
    );
  }
  const attachChildren = hasAttach ? [...attachBlocksToParas(attach, preset), ...hasColophon ? colophonParas(meta, preset, struct) : []] : [];
  return new File({
    // docx 文件属性（core.xml）：标题/作者（发文机关）/描述（发文字号）——批量归档时
    // 文件管理器可按属性检索、台账可与 docx 一一对应（v0.12.0）。
    // 恒传空串：docx 库对空值整标签省略，且盖掉其默认「Un-named」作者
    title: metaTitle ?? "",
    creator: metaAgency ?? "",
    description: meta.docNumber?.trim() ?? "",
    lastModifiedBy: metaAgency ?? "",
    // 盖掉 docx 库默认「Un-named」
    // 仅公文式需要奇偶页分离页脚（单右双左）；其余样式单页脚即可
    ...isGongwen ? { evenAndOddHeaderAndFooters: true } : {},
    // 条件页码域：打开文档时自动刷新域（Word/WPS 支持刷新；不刷新则退化为普通页码显示）
    ...conditionalPn ? { features: { updateFields: true } } : {},
    sections: [
      { properties: sectionProps, ...conditionalPn ? condFooters : hasPageNumber ? plainFooters() : {}, children: mainChildren },
      ...hasAttach ? [
        {
          properties: { ...sectionProps, type: SectionType.NEXT_PAGE },
          ...hasPageNumber ? plainFooters() : {},
          children: attachChildren
        }
      ] : [],
      ...splitColophon ? [
        {
          properties: { ...sectionProps, type: SectionType.EVEN_PAGE },
          // 节2：版记页恒为偶数页——gongwen 用 even 页脚承载 showIfAdjacent，default（奇）仅兜底
          footers: {
            default: conditionalFooter(alignOf(pn.align), pn, "showIfAdjacent"),
            ...isGongwen ? { even: conditionalFooter(AlignmentType.LEFT, pn, "showIfAdjacent") } : {}
          },
          children: colophonChildren
        }
      ] : []
    ]
  });
}
async function buildDocxBlob(blocks, preset, opts) {
  return Packer.toBlob(
    buildDoc(blocks, preset, !!opts?.firstSentenceBold, opts?.meta, opts?.logo, opts?.colophonMode ?? "off", {
      ...STRUCT_DEFAULTS,
      ...opts?.struct
    }, opts?.seal, opts?.attach)
  );
}

// src/gongwen/settings.ts
var DEFAULT_SETTINGS = {
  activePresetId: "gongwen-standard",
  firstSentenceBold: false,
  customPresets: [],
  builtinOverrides: [],
  previewOpenMode: "split",
  templateSelection: [],
  colophonMode: "off",
  signatureRightChars: 4,
  signatureAlign: "right",
  signatureLeftChars: 0,
  attachIndentChars: 2,
  notesIndentChars: 2,
  colophonLeftChars: 1,
  printRightChars: 1,
  copiesRightChars: 3,
  defaultAgency: ""
};
var CHARS_KEYS = [
  "signatureRightChars",
  "signatureLeftChars",
  "attachIndentChars",
  "notesIndentChars",
  "colophonLeftChars",
  "printRightChars",
  "copiesRightChars"
];
var clampChars = (v, def2) => typeof v === "number" && isFinite(v) && v >= 0 && v <= 12 ? Math.floor(v) : def2;
var alignOk = (v) => v === "right" || v === "center" || v === "left";
function sanitizeSettings(raw, templateOk = () => true) {
  const merged = {
    ...DEFAULT_SETTINGS,
    ...raw,
    customPresets: Array.isArray(raw?.customPresets) ? raw.customPresets.map(normalizePreset).filter((p) => !!p) : [],
    builtinOverrides: Array.isArray(raw?.builtinOverrides) ? raw.builtinOverrides.map((o) => {
      const base = BUILTIN_PRESETS.find((b) => b.id === o?.id);
      if (!base) return null;
      const n = normalizePreset({ ...structuredClone(base), ...o });
      return n ? { ...n, builtin: true } : null;
    }).filter((p) => !!p) : [],
    templateSelection: Array.isArray(raw?.templateSelection) ? raw.templateSelection.filter((k) => typeof k === "string" && templateOk(k)) : [],
    // 旧版 colophonEvenPage 布尔迁移：true → force（旧「开」），false/无 → off
    colophonMode: raw?.colophonMode === "auto" || raw?.colophonMode === "force" || raw?.colophonMode === "off" ? raw.colophonMode : raw?.colophonEvenPage === true ? "force" : "off",
    signatureAlign: alignOk(raw?.signatureAlign) ? raw.signatureAlign : DEFAULT_SETTINGS.signatureAlign
  };
  const m = merged;
  for (const k of CHARS_KEYS) {
    m[k] = clampChars((raw ?? {})[k], DEFAULT_SETTINGS[k]);
  }
  merged.defaultAgency = typeof raw?.defaultAgency === "string" ? raw.defaultAgency.trim().replace(/\s+/g, " ").slice(0, 80) : "";
  return merged;
}

// src/gongwen/templates.ts
var RED_HEAD_FM = `---
rh-agency: XX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6
rh-logo:
rh-docNumber: X\u653F\u53D1\u30142026\u3015X\u53F7
rh-signer:
rh-copyNumber:
rh-secretLevel:
rh-urgency:
---`;
var RED_HEAD_FM_TP = `---
rh-agency: <% tp.system.prompt("\u53D1\u6587\u673A\u5173\u6807\u5FD7\uFF08\u5982\uFF1AXX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6\uFF09", "XX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6") %>
rh-docNumber: <% tp.system.prompt("\u53D1\u6587\u5B57\u53F7\uFF08\u5982\uFF1AX\u653F\u53D1\u30142026\u3015X\u53F7\uFF09", "X\u653F\u53D1\u30142026\u3015X\u53F7") %>
rh-signer:
rh-copyNumber:
rh-secretLevel:
rh-urgency:
---`;
function toTemplaterSkeleton(skeleton) {
  return skeleton.replace(RED_HEAD_FM, RED_HEAD_FM_TP).replace(/^# (.*)$/m, (_m, t) => `# <% tp.system.prompt("\u516C\u6587\u6807\u9898", "${t}") %>`).replace(/2026年X月X日/g, '<% tp.date.now("YYYY\u5E74M\u6708D\u65E5") %>');
}
var GONGWEN_TEMPLATES = {
  "\u516C\u6587\u6A21\u677F-\u901A\u77E5": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u4F1A\u8BAE\u901A\u77E5

\u5404\u90E8\u95E8\uFF1A

\u6839\u636E\u4E0A\u7EA7\u5DE5\u4F5C\u8981\u6C42\uFF0C\u4E3A\u8FDB\u4E00\u6B65\u63A8\u8FDBXX\u5DE5\u4F5C\u5F00\u5C55\uFF0C\u51B3\u5B9A\u53EC\u5F00XX\u5DE5\u4F5C\u63A8\u8FDB\u4F1A\u3002\u73B0\u5C06\u6709\u5173\u4E8B\u9879\u901A\u77E5\u5982\u4E0B\uFF1A

## \u4E00\u3001\u4F1A\u8BAE\u65F6\u95F4

2026\u5E74X\u6708X\u65E5 \u4E0A\u53489:00\u3002

## \u4E8C\u3001\u4F1A\u8BAE\u5730\u70B9

XX\u8DEFXX\u53F7 XX\u4F1A\u8BAE\u5BA4\u3002

## \u4E09\u3001\u53C2\u4F1A\u4EBA\u5458

XX\u3001XX\u3001\u5404\u79D1\u5BA4\u8D1F\u8D23\u4EBA\u3002

## \u56DB\u3001\u6709\u5173\u8981\u6C42

\u53C2\u4F1A\u4EBA\u5458\u7740\u6B63\u88C5\uFF0C\u63D0\u524D10\u5206\u949F\u5165\u573A\uFF0C\u4F1A\u8BAE\u671F\u95F4\u624B\u673A\u9759\u97F3\u3002

\u8054\u7CFB\u4EBA\uFF1AXXX\u3000\u7535\u8BDD\uFF1AXXX-XXXXXXXX

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u8BF7\u793A": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u8BF7\u793A

XX\uFF08\u4E0A\u7EA7\u673A\u5173\uFF09\uFF1A

\u6839\u636EXX\u8981\u6C42\uFF08\u7F18\u7531\uFF09\uFF0C\u6211\u5355\u4F4D\u62DFXXXX\uFF08\u4E8B\u9879\uFF09\u3002\u73B0\u5C06\u6709\u5173\u60C5\u51B5\u62A5\u544A\u5982\u4E0B\uFF1A

## \u4E00\u3001\u57FA\u672C\u60C5\u51B5

## \u4E8C\u3001\u4E3B\u8981\u4E8B\u9879

## \u4E09\u3001\u6709\u5173\u5EFA\u8BAE

\u59A5\u5426\uFF0C\u8BF7\u6279\u793A\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u7B54\u590D": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u590D\u51FD

XX\u5355\u4F4D\uFF1A

\u4F60\u5355\u4F4D\u300A\u5173\u4E8EXXXX\u7684\u51FD\u300B\u6536\u6089\u3002\u7ECF\u7814\u7A76\uFF0C\u73B0\u7B54\u590D\u5982\u4E0B\uFF1A

## \u4E00\u3001\u5173\u4E8EXXXX\u95EE\u9898

## \u4E8C\u3001\u5173\u4E8EXXXX\u95EE\u9898

\u4EE5\u4E0A\u610F\u89C1\u4F9B\u53C2\u8003\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u62A5\u544A": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u62A5\u544A

XX\uFF08\u4E0A\u7EA7\u673A\u5173\uFF09\uFF1A

\u6839\u636EXX\u8981\u6C42\uFF0C\u73B0\u5C06XXXX\u60C5\u51B5\u62A5\u544A\u5982\u4E0B\uFF1A

## \u4E00\u3001\u57FA\u672C\u60C5\u51B5

## \u4E8C\u3001\u5B58\u5728\u95EE\u9898

## \u4E09\u3001\u4E0B\u4E00\u6B65\u5DE5\u4F5C\u6253\u7B97

\u7279\u6B64\u62A5\u544A\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u6279\u590D": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u6279\u590D

XX\u5355\u4F4D\uFF1A

\u4F60\u5355\u4F4D\u300A\u5173\u4E8EXXXX\u7684\u8BF7\u793A\u300B\uFF08X\u5B57\u30142026\u3015X\u53F7\uFF09\u6536\u6089\u3002\u7ECF\u7814\u7A76\uFF0C\u73B0\u6279\u590D\u5982\u4E0B\uFF1A

## \u4E00\u3001\u540C\u610FXXXX

## \u4E8C\u3001XXXX

\u6B64\u590D\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u51FD": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u51FD

XX\u5355\u4F4D\uFF1A

\u4E3A\u4E86XXXX\uFF0C\u73B0\u5546\u8BF7\u8D35\u5355\u4F4D\u534F\u52A9\u505A\u597D\u4EE5\u4E0B\u5DE5\u4F5C\uFF1A

## \u4E00\u3001XXXX

## \u4E8C\u3001XXXX

\u59A5\u5426\uFF0C\u76FC\u51FD\u590D\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u7EAA\u8981": `${RED_HEAD_FM}

# XXXX\u4F1A\u8BAE\u7EAA\u8981

2026\u5E74X\u6708X\u65E5\uFF0CXXX\u5728XX\u4E3B\u6301\u53EC\u5F00XXXX\u4F1A\u8BAE\uFF0C\u542C\u53D6XXXX\u60C5\u51B5\u6C47\u62A5\uFF0C\u7814\u7A76\u90E8\u7F72XXXX\u5DE5\u4F5C\u3002\u73B0\u5C06\u4F1A\u8BAE\u8BAE\u5B9A\u4E8B\u9879\u7EAA\u8981\u5982\u4E0B\uFF1A

## \u4E00\u3001\u4F1A\u8BAE\u542C\u53D6\u4E86XXXX

## \u4E8C\u3001\u4F1A\u8BAE\u6307\u51FAXXXX

## \u4E09\u3001\u4F1A\u8BAE\u51B3\u5B9AXXXX

\u53C2\u4F1A\u4EBA\u5458\uFF1AXXX\u3001XXX\u3002
`,
  "\u516C\u6587\u6A21\u677F-\u51B3\u5B9A": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u51B3\u5B9A

\u5404\u90E8\u95E8\uFF08\u5355\u4F4D\uFF09\uFF1A

\u4E3A\u4E86XXXX\uFF0C\u6839\u636EXXXX\uFF0C\u7ECF\u7814\u7A76\uFF0C\u51B3\u5B9A\uFF1A

## \u4E00\u3001XXXX

## \u4E8C\u3001XXXX

## \u4E09\u3001XXXX

\u672C\u51B3\u5B9A\u81EA2026\u5E74X\u6708X\u65E5\u8D77\u65BD\u884C\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u51B3\u8BAE": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u51B3\u8BAE

XXXX\u4F1A\u8BAE\u4E8E2026\u5E74X\u6708X\u65E5\u5BA1\u8BAE\u901A\u8FC7\uFF0C\u73B0\u4E88\u516C\u5E03\u3002

## \u4E00\u3001\u4F1A\u8BAE\u8BA4\u4E3AXXXX

## \u4E8C\u3001\u4F1A\u8BAE\u51B3\u5B9AXXXX

## \u4E09\u3001\u4F1A\u8BAE\u8981\u6C42XXXX

\u672C\u51B3\u8BAE\u81EA\u516C\u5E03\u4E4B\u65E5\u8D77\u65BD\u884C\u3002
`,
  "\u516C\u6587\u6A21\u677F-\u547D\u4EE4": `${RED_HEAD_FM}

# XXXX\u4EE4

\uFF08\u7B2C X \u53F7\uFF09

\u300AXXXX\u300B\u5DF2\u7ECFXXXX\u4F1A\u8BAE\u901A\u8FC7\uFF0C\u73B0\u4E88\u516C\u5E03\uFF0C\u81EA2026\u5E74X\u6708X\u65E5\u8D77\u65BD\u884C\u3002

\u7B7E\u53D1\u4EBA\uFF1AXXX

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u516C\u62A5": `${RED_HEAD_FM}

# XXXX\u516C\u62A5

XXXX\u4F1A\u8BAE\u4E8E2026\u5E74X\u6708X\u65E5\u81F3X\u65E5\u4E3E\u884C\u3002\u4F1A\u8BAE\u4E3B\u8981\u60C5\u51B5\u5982\u4E0B\uFF1A

## \u4E00\u3001\u4F1A\u8BAE\u6982\u51B5

## \u4E8C\u3001\u4E3B\u8981\u6210\u679C

## \u4E09\u3001\u5176\u4ED6\u4E8B\u9879
`,
  "\u516C\u6587\u6A21\u677F-\u516C\u544A": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u516C\u544A

\u6839\u636EXXXX\uFF0C\u73B0\u5C06XXXX\u6709\u5173\u4E8B\u9879\u516C\u544A\u5982\u4E0B\uFF1A

## \u4E00\u3001XXXX

## \u4E8C\u3001XXXX

\u672C\u516C\u544A\u81EA\u53D1\u5E03\u4E4B\u65E5\u8D77\u65BD\u884C\u3002

\u7279\u6B64\u516C\u544A\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u901A\u544A": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u901A\u544A

\u4E3AXXXX\uFF0C\u7ECF\u7814\u7A76\u51B3\u5B9A\uFF0C\u73B0\u5C31\u6709\u5173\u4E8B\u9879\u901A\u544A\u5982\u4E0B\uFF1A

## \u4E00\u3001XXXX

## \u4E8C\u3001XXXX

\u8FDD\u53CD\u672C\u901A\u544A\u89C4\u5B9A\u7684\uFF0C\u7531XXXX\u4F9D\u6CD5\u5904\u7406\u3002

\u7279\u6B64\u901A\u544A\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u610F\u89C1": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u610F\u89C1

\u5404\u90E8\u95E8\uFF08\u5355\u4F4D\uFF09\uFF1A

\u4E3AXXXX\uFF0C\u73B0\u63D0\u51FA\u5982\u4E0B\u610F\u89C1\uFF1A

## \u4E00\u3001\u603B\u4F53\u8981\u6C42

## \u4E8C\u3001\u4E3B\u8981\u4EFB\u52A1

## \u4E09\u3001\u4FDD\u969C\u63AA\u65BD

\u4EE5\u4E0A\u610F\u89C1\uFF0C\u8BF7\u7ED3\u5408\u5B9E\u9645\u8BA4\u771F\u8D2F\u5F7B\u6267\u884C\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u901A\u62A5": `${RED_HEAD_FM}

# \u5173\u4E8EXXXX\u7684\u901A\u62A5

\u5404\u90E8\u95E8\uFF08\u5355\u4F4D\uFF09\uFF1A

XXXX\u3002\u73B0\u5C06\u6709\u5173\u60C5\u51B5\u901A\u62A5\u5982\u4E0B\uFF1A

## \u4E00\u3001\u57FA\u672C\u60C5\u51B5

## \u4E8C\u3001\u5904\u7406\u610F\u89C1

## \u4E09\u3001\u5DE5\u4F5C\u8981\u6C42

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`,
  "\u516C\u6587\u6A21\u677F-\u8BAE\u6848": `${RED_HEAD_FM}

# \u5173\u4E8E\u63D0\u8BF7\u5BA1\u8BAEXXXX\u7684\u8BAE\u6848

XX\u4EBA\u6C11\u4EE3\u8868\u5927\u4F1A\uFF1A

\u4E3A\u4E86XXXX\uFF0C\u4F9D\u636EXXXX\uFF0C\u62DF\u63D0\u8BF7\u5BA1\u8BAE\u300AXXXX\uFF08\u8349\u6848\uFF09\u300B\u3002\u8BF7\u4E88\u5BA1\u8BAE\u3002

XX\u5355\u4F4D

2026\u5E74X\u6708X\u65E5
`
};
var TEMPLATE_META = {
  "\u516C\u6587\u6A21\u677F-\u901A\u77E5": { label: "\u901A\u77E5", desc: "\u53D1\u5E03\u8981\u6C42\u3001\u4F20\u8FBE\u4E8B\u9879\u3001\u8F6C\u53D1\u6587\u4EF6\uFF08\u4E0B\u884C\u6587\uFF0C\u6700\u5E38\u7528\uFF09" },
  "\u516C\u6587\u6A21\u677F-\u8BF7\u793A": { label: "\u8BF7\u793A", desc: "\u5411\u4E0A\u7EA7\u8BF7\u6C42\u6307\u793A\u3001\u6279\u51C6\uFF08\u4E0A\u884C\u6587\uFF0C\u5E26\u7B7E\u53D1\u4EBA\uFF09" },
  "\u516C\u6587\u6A21\u677F-\u62A5\u544A": { label: "\u62A5\u544A", desc: "\u5411\u4E0A\u7EA7\u6C47\u62A5\u5DE5\u4F5C\u3001\u53CD\u6620\u60C5\u51B5\u3001\u7B54\u590D\u8BE2\u95EE\uFF08\u4E0A\u884C\u6587\uFF09" },
  "\u516C\u6587\u6A21\u677F-\u6279\u590D": { label: "\u6279\u590D", desc: "\u7B54\u590D\u4E0B\u7EA7\u673A\u5173\u8BF7\u793A\u4E8B\u9879\uFF08\u4E0B\u884C\u6587\uFF09" },
  "\u516C\u6587\u6A21\u677F-\u7B54\u590D": { label: "\u590D\u51FD", desc: "\u7B54\u590D\u6765\u51FD\u8BE2\u95EE\u4E8B\u9879\uFF08\u5E73\u884C\u6587\uFF09" },
  "\u516C\u6587\u6A21\u677F-\u51FD": { label: "\u51FD", desc: "\u4E0D\u76F8\u96B6\u5C5E\u673A\u5173\u95F4\u5546\u6D3D\u5DE5\u4F5C\u3001\u8BE2\u95EE\u7B54\u590D\uFF08\u5E73\u884C\u6587\uFF09" },
  "\u516C\u6587\u6A21\u677F-\u7EAA\u8981": { label: "\u7EAA\u8981", desc: "\u8BB0\u8F7D\u4F1A\u8BAE\u4E3B\u8981\u60C5\u51B5\u548C\u8BAE\u5B9A\u4E8B\u9879" },
  "\u516C\u6587\u6A21\u677F-\u901A\u62A5": { label: "\u901A\u62A5", desc: "\u8868\u5F70\u5148\u8FDB\u3001\u6279\u8BC4\u9519\u8BEF\u3001\u4F20\u8FBE\u91CD\u8981\u7CBE\u795E" },
  "\u516C\u6587\u6A21\u677F-\u610F\u89C1": { label: "\u610F\u89C1", desc: "\u5BF9\u91CD\u8981\u95EE\u9898\u63D0\u51FA\u89C1\u89E3\u548C\u5904\u7406\u529E\u6CD5" },
  "\u516C\u6587\u6A21\u677F-\u51B3\u5B9A": { label: "\u51B3\u5B9A", desc: "\u5BF9\u91CD\u8981\u4E8B\u9879\u4F5C\u51FA\u51B3\u7B56\u90E8\u7F72" },
  "\u516C\u6587\u6A21\u677F-\u51B3\u8BAE": { label: "\u51B3\u8BAE", desc: "\u4F1A\u8BAE\u8BA8\u8BBA\u901A\u8FC7\u7684\u91CD\u5927\u51B3\u7B56\u4E8B\u9879" },
  "\u516C\u6587\u6A21\u677F-\u547D\u4EE4": { label: "\u547D\u4EE4\uFF08\u4EE4\uFF09", desc: "\u516C\u5E03\u884C\u653F\u6CD5\u89C4\u3001\u5BA3\u5E03\u91CD\u5927\u5F3A\u5236\u6027\u884C\u653F\u63AA\u65BD" },
  "\u516C\u6587\u6A21\u677F-\u516C\u62A5": { label: "\u516C\u62A5", desc: "\u516C\u5E03\u91CD\u8981\u51B3\u5B9A\u6216\u91CD\u5927\u4E8B\u9879" },
  "\u516C\u6587\u6A21\u677F-\u516C\u544A": { label: "\u516C\u544A", desc: "\u5411\u56FD\u5185\u5916\u5BA3\u5E03\u91CD\u8981\u4E8B\u9879" },
  "\u516C\u6587\u6A21\u677F-\u901A\u544A": { label: "\u901A\u544A", desc: "\u4E00\u5B9A\u8303\u56F4\u5185\u516C\u5E03\u5E94\u5F53\u9075\u5B88\u6216\u5468\u77E5\u7684\u4E8B\u9879" },
  "\u516C\u6587\u6A21\u677F-\u8BAE\u6848": { label: "\u8BAE\u6848", desc: "\u6309\u6CD5\u5F8B\u7A0B\u5E8F\u5411\u540C\u7EA7\u4EBA\u5927\u63D0\u8BF7\u5BA1\u8BAE\u4E8B\u9879" }
};
var TEMPLATE_GROUPS = [
  {
    label: "\u5BF9\u4E0A \xB7 \u4E0A\u884C\u6587",
    keys: ["\u516C\u6587\u6A21\u677F-\u8BF7\u793A", "\u516C\u6587\u6A21\u677F-\u62A5\u544A", "\u516C\u6587\u6A21\u677F-\u8BAE\u6848"]
  },
  {
    label: "\u5E73\u7EA7 \xB7 \u5E73\u884C\u6587",
    keys: ["\u516C\u6587\u6A21\u677F-\u7B54\u590D", "\u516C\u6587\u6A21\u677F-\u51FD"]
  },
  {
    label: "\u5BF9\u4E0B \xB7 \u4E0B\u884C\u6587",
    keys: [
      "\u516C\u6587\u6A21\u677F-\u901A\u77E5",
      "\u516C\u6587\u6A21\u677F-\u6279\u590D",
      "\u516C\u6587\u6A21\u677F-\u901A\u62A5",
      "\u516C\u6587\u6A21\u677F-\u610F\u89C1",
      "\u516C\u6587\u6A21\u677F-\u51B3\u5B9A",
      "\u516C\u6587\u6A21\u677F-\u51B3\u8BAE",
      "\u516C\u6587\u6A21\u677F-\u547D\u4EE4",
      "\u516C\u6587\u6A21\u677F-\u516C\u62A5",
      "\u516C\u6587\u6A21\u677F-\u516C\u544A",
      "\u516C\u6587\u6A21\u677F-\u901A\u544A",
      "\u516C\u6587\u6A21\u677F-\u7EAA\u8981"
    ]
  }
];
function sanitizeFileName(name) {
  return (name ?? "").replace(/[\\/:*?"<>|#^\[\]\u0000-\u001f]/g, "").replace(/\s+/g, " ").trim();
}
function buildNewGongwen(o) {
  const skeleton = GONGWEN_TEMPLATES[o.templateKey] ?? GONGWEN_TEMPLATES["\u516C\u6587\u6A21\u677F-\u901A\u77E5"];
  const year = o.year ?? (/* @__PURE__ */ new Date()).getFullYear();
  let content = skeleton.replace(/\b2026\b/g, String(year));
  const agency = (o.agency ?? "").trim();
  if (agency) content = content.replace(/^rh-agency: .*$/m, `rh-agency: ${agency}`);
  const title = (o.title ?? "").trim();
  if (title) content = content.replace(/^# .*$/m, `# ${title}`);
  const docLabel = TEMPLATE_META[o.templateKey]?.label ?? o.templateKey.replace("\u516C\u6587\u6A21\u677F-", "");
  let fileName = sanitizeFileName(o.fileName ?? "");
  if (!fileName) fileName = sanitizeFileName(title) || `\u516C\u6587-${docLabel}-${year}`;
  return { fileName: fileName.replace(/\.md$/i, "") + ".md", content };
}
var NEW_DOC_ITEMS = TEMPLATE_GROUPS.flatMap(
  (g) => g.keys.map((k) => ({
    key: k,
    label: TEMPLATE_META[k]?.label ?? k.replace("\u516C\u6587\u6A21\u677F-", ""),
    desc: TEMPLATE_META[k]?.desc ?? "",
    group: g.label
  }))
);

// src/paste_clean.ts
function decodeEntities(s) {
  return s.replace(/&nbsp;/gi, "\xA0").replace(/&ensp;/gi, "\u2002").replace(/&emsp;/gi, "\u2003").replace(/&thinsp;/gi, "\u2009").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&apos;/gi, "'").replace(/&amp;/gi, "&").replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)));
}
function htmlToLines(html2) {
  let s = String(html2 ?? "");
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
  const html2 = (input.html ?? "").trim();
  const text = (input.text ?? "").replace(/\r\n|\r/g, "\n");
  const lines = html2 ? htmlToLines(html2) : text.split("\n");
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
function checkDocument2(md0) {
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

// src/context.ts
var FLAT_RE = /^rh-([A-Za-z]+)\s*:\s*(.*)$/;
var NEST_HEAD_RE = /^redhead\s*:/;
var NEST_KEY_RE = /^\s+([A-Za-z_]+)\s*:\s*(.*)$/;
var unquote = (s) => s.trim().replace(/^["']|["']$/g, "");
var isRedKey = (k) => RED_HEAD_KEYS.includes(k);
function frontmatterIsGongwen(fmText) {
  let inNested = false;
  for (const raw of fmText.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    if (!/^\s/.test(line)) {
      inNested = NEST_HEAD_RE.test(line);
      const flat = line.match(FLAT_RE);
      if (flat && isRedKey(flat[1]) && unquote(flat[2])) return true;
      continue;
    }
    if (!inNested) continue;
    const kv = line.match(NEST_KEY_RE);
    if (kv && isRedKey(kv[1]) && unquote(kv[2])) return true;
  }
  return false;
}
function detectContext(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return "generic";
  return frontmatterIsGongwen(m[1]) ? "gongwen" : "generic";
}
var ContextGate = class {
  constructor() {
    this.mode = "auto";
  }
  setMode(m) {
    this.mode = m;
  }
  /** 生效上下文：手动强制 > frontmatter 自动判定 */
  resolve(md) {
    if (this.mode === "gongwen") return "gongwen";
    if (this.mode === "generic") return "generic";
    return detectContext(md);
  }
};

// src/views/preview_view.ts
var import_obsidian = require("obsidian");

// src/gongwen/preview.ts
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function cssFont(st, fallbackKey) {
  const chain = roleFontChain(st, fallbackKey).map((f) => `"${f}"`);
  return `"${LATIN_FONT}", ${chain.join(", ")}`;
}
function roleCss(cls, st, key, linePt, extra = "") {
  return `.${cls} { font-family: ${cssFont(st, key)}; font-size: ${st.sizePt}pt; font-weight: ${st.bold ? 700 : 400}; text-align: ${st.align === "center" ? "center" : "left"}; line-height: ${linePt}pt;${st.indentChars ? ` text-indent: ${st.indentChars}em;` : ""}${extra} }`;
}
function bodyHtml(text, boldFirst) {
  const m = text.match(/^([^。]+。)?([\s\S]*)$/);
  const first = m?.[1] ?? "";
  const rest = m?.[2] ?? "";
  if (boldFirst && first) return `<b>${esc(first)}</b>${esc(rest)}`;
  return esc(text);
}
function pageNumberHtml(cfg) {
  if (!cfg || cfg.style === "none") return "";
  const sample = cfg.style === "gongwen" ? "\u2014 1 \u2014" : cfg.style === "dash" ? "- 1 -" : cfg.style === "plain" ? "1" : cfg.style === "cnPage" ? "\u7B2C 1 \u9875" : "\u7B2C 1 \u9875 / \u5171 3 \u9875";
  const align = cfg.style === "gongwen" ? "right" : cfg.align;
  const family = `"${LATIN_FONT}", ${PAGE_NUMBER_FONT.map((f) => `"${f}"`).join(", ")}`;
  return `<div class="rg-pagenum" style="text-align:${align}; font-size:${cfg.sizePt}pt; font-family:${family};">${esc(sample)}</div>`;
}
function redHeadHtml(meta, logoUrl) {
  const hasAny = Object.values(meta).some((v) => !!v) || !!logoUrl;
  if (!hasAny) return "";
  const chain = (fonts) => fonts.map((f) => `"${f}"`).join(", ");
  const out = ['<div class="rg-redhead">'];
  const notice = (t) => `<div style="font-family:&quot;${LATIN_FONT}&quot;, ${chain(RED_HEAD_STYLE.notice.font)}; font-size:${RED_HEAD_STYLE.notice.sizePt}pt; line-height:28pt;">${esc(t)}</div>`;
  if (logoUrl)
    out.push(
      `<div style="text-align:center; margin-bottom:6pt;"><img src="${esc(logoUrl)}" style="width:40mm; height:auto;" alt="\u673A\u5173\u6807\u5FD7"></div>`
    );
  if (meta.copyNumber) out.push(notice(meta.copyNumber));
  if (meta.secretLevel) out.push(notice(meta.secretLevel));
  if (meta.urgency) out.push(notice(meta.urgency));
  if (meta.agency) {
    const agencies = splitAgencies(meta.agency);
    const sizePt = fitAgencySizePt(agencies);
    agencies.forEach((ag, i) => {
      out.push(
        `<div style="font-family:&quot;${LATIN_FONT}&quot;, ${chain(RED_HEAD_STYLE.agency.font)}; font-size:${sizePt}pt; line-height:44pt; color:#${RED_COLOR}; text-align:center;${i === 0 ? " margin-top:6pt;" : ""}">${esc(ag)}</div>`
      );
    });
  }
  if (meta.docNumber || meta.signer) {
    const numFont = `font-family:&quot;${LATIN_FONT}&quot;, ${chain(RED_HEAD_STYLE.number.font)}; font-size:${RED_HEAD_STYLE.number.sizePt}pt; line-height:28pt;`;
    if (meta.signer) {
      out.push(
        `<div style="${numFont} display:flex; justify-content:space-between; margin-top:28pt;"><span style="margin-left:1em;">${esc(meta.docNumber ?? "")}</span><span style="margin-right:1em;">\u7B7E\u53D1\u4EBA\uFF1A${esc(meta.signer)}</span></div>`
      );
    } else {
      out.push(`<div style="${numFont} text-align:center; margin-top:28pt;">${esc(meta.docNumber ?? "")}</div>`);
    }
  }
  out.push(
    `<div style="border-bottom:${(RED_HEAD_STYLE.lineWidthMm * 3).toFixed(1)}pt solid #${RED_COLOR}; margin-top:4mm; margin-bottom:16pt;"></div>`
  );
  out.push("</div>");
  return out.join("\n");
}
function recipientsHtml(text) {
  const t = /[：:]$/.test(text.trim()) ? text.trim() : `${text.trim()}\uFF1A`;
  return `<div class="rg-recipients">${esc(t)}</div>`;
}
function attachmentsHtml(text, attachIndentChars = STRUCT_DEFAULTS.attachIndentChars) {
  const lines = text.split("/").map((s) => s.trim()).filter(Boolean);
  return lines.map((l, i) => {
    const label = lines.length > 1 && !/^[\d１-９]/.test(l) ? `\u9644\u4EF6${i + 1}\uFF1A${l}` : `\u9644\u4EF6\uFF1A${l}`;
    return `<div class="rg-attach" style="margin-left:${attachIndentChars}em;">${esc(label)}</div>`;
  }).join("\n");
}
function sealHtml(sealUrl, dateText, preset, struct) {
  const bodyEm = preset.roles.body.sizePt;
  const sealWEm = SEAL_STYLE.sizeMm / 25.4 * 72 / bodyEm;
  const dateWEm = textWidthChars(dateText);
  const right = Math.max(0, (sealWEm - dateWEm) / 2);
  const bottom = (preset.linePt * 0.3).toFixed(2);
  return `<img class="rg-seal" src="${esc(sealUrl)}" alt="\u5370\u7AE0" style="position:absolute; width:${sealWEm.toFixed(2)}em; height:auto; right:${right.toFixed(2)}em; bottom:${bottom}pt; z-index:10;">`;
}
function closingHtml(meta, preset, struct = STRUCT_DEFAULTS, sealUrl) {
  const hasSignBlock = !!(meta.signature || meta.date);
  if (!hasSignBlock && !meta.notes) return "";
  const gap = `${preset.linePt}pt`;
  const out = ['<div class="rg-closing" style="position:relative;">'];
  if (hasSignBlock) {
    const align = struct.signatureAlign;
    const justify = align === "left" ? "flex-start" : align === "center" ? "center" : "flex-end";
    const side = align === "left" ? ` margin-left:${struct.signatureLeftChars}em;` : align === "right" ? ` margin-right:${struct.signatureRightChars}em;` : "";
    const innerAlign = align === "left" ? "flex-start" : "center";
    out.push(`<div style="display:flex; justify-content:${justify}; margin-top:${gap};${side}">`);
    out.push(`<div style="display:inline-flex; flex-direction:column; align-items:${innerAlign};">`);
    if (meta.signature) out.push(`<div>${esc(meta.signature)}</div>`);
    if (meta.date) out.push(`<div>${esc(meta.date)}</div>`);
    out.push("</div></div>");
  }
  if (meta.notes) {
    const n = meta.notes.trim();
    const wrapped = /^[（(]/.test(n) ? n : `\uFF08${n}\uFF09`;
    out.push(
      `<div style="margin-left:${struct.notesIndentChars}em; margin-top:${gap};">${esc(wrapped)}</div>`
    );
  }
  if (sealUrl && meta.date) out.push(sealHtml(sealUrl, meta.date, preset, struct));
  out.push("</div>");
  return out.join("\n");
}
function colophonHtml(meta, preset, struct = STRUCT_DEFAULTS) {
  if (!meta.cc && !meta.printOrg && !meta.printDate && !meta.printCopies) return "";
  const sizePt = STRUCT_STYLE.colophonSizePt;
  const base = `padding:2pt 0; font-size:${sizePt}pt;`;
  const flexGap = `${preset.linePt}pt`;
  const rows = [];
  let idx = 0;
  const total = (meta.cc ? 1 : 0) + (meta.printOrg || meta.printDate ? 1 : 0) + (meta.printCopies ? 1 : 0);
  const topBorder = () => {
    const b = idx === 0 ? "border-top:1.5pt solid #000;" : "border-top:0.75pt solid #000;";
    const last = idx === total - 1 ? "border-bottom:1.5pt solid #000;" : "";
    idx++;
    return b + last;
  };
  if (meta.cc) {
    const t = /[。！？]$/.test(meta.cc.trim()) ? meta.cc.trim() : `${meta.cc.trim()}\u3002`;
    rows.push(`<div style="${topBorder()}${base} padding-left:${struct.colophonLeftChars}em;">\u6284\u9001\uFF1A${esc(t)}</div>`);
  }
  if (meta.printOrg || meta.printDate) {
    const pd = /印发$/.test(meta.printDate?.trim() ?? "") ? meta.printDate.trim() : `${meta.printDate?.trim() ?? ""}\u5370\u53D1`;
    rows.push(
      `<div style="${topBorder()}${base} display:flex; justify-content:space-between;"><span style="margin-left:${struct.colophonLeftChars}em;">${esc(meta.printOrg ?? "")}</span><span style="margin-right:${struct.printRightChars}em;">${esc(pd)}</span></div>`
    );
  }
  if (meta.printCopies) {
    const c = meta.printCopies.trim();
    const label = /印/.test(c) ? c : `\u5370${c}\u4EFD`;
    rows.push(`<div style="${topBorder()}${base} text-align:right; padding-right:${struct.copiesRightChars}em;">${esc(label)}</div>`);
  }
  return [`<div class="rg-colophon" style="margin-top:${flexGap};">`, ...rows, "</div>"].join("\n");
}
function tableHtml(t, preset) {
  const st = preset.roles.table;
  const family = cssFont(st, "table").replace(/"/g, "&quot;");
  const base = `font-family:${family}; font-size:${st.sizePt}pt; font-weight:${st.bold ? 700 : 400}; padding:3pt 4pt; border:0.5pt solid #000; word-break:break-all;`;
  const al = (a) => a === "left" ? "left" : a === "right" ? "right" : "center";
  const trs = [];
  const ths = t.header.map((h, i) => `<th style="${base}font-weight:700; text-align:center;">${esc(h)}</th>`).join("");
  trs.push(`<tr>${ths}</tr>`);
  for (const r of t.rows)
    trs.push(
      `<tr>${r.map((c, i) => {
        const txt = c.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/[*_`]/g, "");
        return `<td style="${base} text-align:${al(t.align?.[i])};">${esc(txt)}</td>`;
      }).join("")}</tr>`
    );
  return `<table class="rg-table" style="border-collapse:collapse; width:100%; table-layout:fixed; margin:${preset.linePt}pt 0;">${trs.join("")}</table>`;
}
function blockHtml(b, preset, boldFirst) {
  switch (b.kind) {
    case "docTitle":
      return `<div class="rg-title">${b.text.split("\n").map((l) => `<div>${esc(l)}</div>`).join("")}</div>`;
    case "h1":
      return `<div class="rg-h1">${esc(b.text)}</div>`;
    case "h2":
      return `<div class="rg-h2">${esc(b.text)}</div>`;
    case "h3":
      return `<div class="rg-h3">${esc(b.text)}</div>`;
    case "table":
      return b.table && b.table.rows.length ? tableHtml(b.table, preset) : "";
    default:
      return `<div class="rg-para">${bodyHtml(b.text, boldFirst)}</div>`;
  }
}
function renderAttach(attach, preset, boldFirst) {
  const out = ['<div class="rg-attach-break">\u53E6\u9762 \xB7 \u9644\u4EF6</div>', '<div class="rg-attach-section">'];
  let firstHeadingIdx = -1;
  for (let i = 0; i < attach.length; i++) {
    if (attach[i].kind === "docTitle" || attach[i].kind === "h1" || attach[i].kind === "h2") {
      firstHeadingIdx = i;
      break;
    }
  }
  if (firstHeadingIdx >= 0) {
    const { mark, title } = splitAttachTitle(attach[firstHeadingIdx].text);
    out.push(`<div class="rg-attach-mark">${esc(mark)}</div>`);
    if (title) out.push(`<div class="rg-title">${esc(title)}</div>`);
  } else {
    out.push('<div class="rg-attach-mark">\u9644\u4EF6</div>');
  }
  for (let i = 0; i < attach.length; i++) {
    if (i === firstHeadingIdx) continue;
    out.push(blockHtml(attach[i], preset, boldFirst));
  }
  out.push("</div>");
  return out.join("\n");
}
function renderPreview(blocks, preset, opts) {
  const boldFirst = !!opts?.firstSentenceBold;
  const struct = { ...STRUCT_DEFAULTS, ...opts?.struct };
  const meta = opts?.meta;
  const body = [];
  if (meta || opts?.logoUrl) body.push(redHeadHtml(meta ?? {}, opts?.logoUrl));
  for (const b of blocks) {
    body.push(blockHtml(b, preset, boldFirst));
    if (b.kind === "docTitle" && meta?.recipients) body.push(recipientsHtml(meta.recipients));
  }
  if (meta) {
    if (meta.attachments) body.push(attachmentsHtml(meta.attachments, struct.attachIndentChars));
    const closing = closingHtml(meta, preset, struct, opts?.sealUrl);
    if (closing) body.push(closing);
  }
  if (opts?.attach && opts.attach.length) body.push(renderAttach(opts.attach, preset, boldFirst));
  if (meta) {
    const colophon = colophonHtml(meta, preset, struct);
    if (colophon) body.push(colophon);
  }
  const css = `
.rg-page {
  width: 210mm;
  min-height: 297mm;
  padding: ${preset.page.top}mm ${preset.page.right}mm ${preset.page.bottom}mm ${preset.page.left}mm;
  background: #fff; color: #000; box-sizing: border-box;
  font-family: ${cssFont(preset.roles.body, "body")};
  font-size: ${preset.roles.body.sizePt}pt;
  line-height: ${preset.linePt}pt;
}
${roleCss("rg-title", preset.roles.docTitle, "docTitle", preset.titleLinePt, " margin: 0 0 14pt;")}
${roleCss("rg-h1", preset.roles.h1, "h1", preset.linePt)}
${roleCss("rg-h2", preset.roles.h2, "h2", preset.linePt)}
${roleCss("rg-h3", preset.roles.h3, "h3", preset.linePt)}
.rg-para { text-align: justify;${preset.roles.body.indentChars ? ` text-indent: ${preset.roles.body.indentChars}em;` : ""} }
.rg-recipients { margin-top: ${preset.linePt}pt; }
.rg-attach { margin-top: ${preset.linePt}pt; }
.rg-pagenum { margin-top: 12pt; }
.rg-attach-mark { font-family: ${cssFont(preset.roles.h1, "h1").replace(/"/g, "&quot;")}; font-size: ${preset.roles.body.sizePt}pt; font-weight: 400; margin-top: ${preset.linePt}pt; }
.rg-attach-break { margin-top: ${Math.round(preset.linePt * 3)}pt; padding: 3pt 0; border-top: 1px dashed #99a; text-align: center; color: #99a; font-size: 10.5pt; letter-spacing: 0.4em; }
.rg-attach-section .rg-title { margin-top: ${preset.linePt}pt; }
`;
  return `<style>${css}</style><div class="rg-page">${body.join("\n")}${pageNumberHtml(preset.pageNumber)}</div>`;
}

// src/views/preview_view.ts
var PreviewView = class extends import_obsidian.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    /** 当前预览的笔记（openPreview 在 leaf 激活前捕获后写入） */
    this.file = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_PREVIEW;
  }
  getDisplayText() {
    return "\u6392\u7248\u9884\u89C8";
  }
  getIcon() {
    return "file-text";
  }
  async onOpen() {
    this.render();
    this.registerEvent(
      this.plugin.app.workspace.on("active-leaf-change", async () => {
        const mv = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (mv?.file && mv.file !== this.file) {
          this.file = mv.file;
          await this.render();
        }
      })
    );
  }
  async render() {
    const mv = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (mv?.file) this.file = mv.file;
    const content = this.contentEl;
    content.empty();
    const bar = content.createEl("div", { cls: "redquill-bar" });
    const select = bar.createEl("select", { cls: "dropdown" });
    for (const p of this.plugin.allPresets()) {
      select.createEl("option", { value: p.id, text: p.name }).selected = p.id === this.plugin.settings.activePresetId;
    }
    select.addEventListener("change", async () => {
      this.plugin.settings.activePresetId = select.value;
      await this.plugin.saveSettings();
      await this.render();
    });
    const boldLabel = bar.createEl("label", { cls: "redquill-toggle" });
    const boldCheck = boldLabel.createEl("input", { type: "checkbox" });
    boldCheck.checked = this.plugin.settings.firstSentenceBold;
    boldLabel.createEl("span", { text: "\u9996\u53E5\u6807\u7C97" });
    boldCheck.addEventListener("change", async () => {
      this.plugin.settings.firstSentenceBold = boldCheck.checked;
      await this.plugin.saveSettings();
      await this.render();
    });
    const btn = bar.createEl("button", { text: "\u5BFC\u51FA docx", cls: "mod-cta" });
    btn.addEventListener("click", () => this.exportDocx());
    const checkBtn = bar.createEl("button", { text: "\u4F53\u68C0" });
    checkBtn.addEventListener("click", () => {
      if (this.file) void this.plugin.openCheck(this.file);
    });
    const pdfBtn = bar.createEl("button", { text: "\u6253\u5370 / \u5B58\u4E3A PDF" });
    pdfBtn.addEventListener("click", () => this.printPdf());
    const paper = content.createEl("div", { cls: "redquill-paper" });
    if (!this.file) {
      paper.createEl("p", { text: "\u6253\u5F00\u4E00\u4E2A md \u7B14\u8BB0\u540E\u81EA\u52A8\u9884\u89C8\u3002" });
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
      struct: this.plugin.structLayout()
    });
  }
  async exportDocx() {
    if (!this.file) {
      new import_obsidian.Notice("RedQuill\uFF1A\u6CA1\u6709\u6253\u5F00\u7684\u7B14\u8BB0\u3002");
      return;
    }
    const md = await this.plugin.app.vault.cachedRead(this.file);
    const { meta, blocks, attach } = parseDocument(md);
    const warn = validateDocNumber(meta.docNumber);
    if (warn) new import_obsidian.Notice(`RedQuill\uFF1A${warn}`, 8e3);
    const { logo, seal } = await this.plugin.resolveLogo(meta);
    const blob = await buildDocxBlob(blocks, this.plugin.activePreset(), {
      firstSentenceBold: this.plugin.settings.firstSentenceBold,
      meta,
      logo,
      seal,
      attach,
      colophonMode: this.plugin.settings.colophonMode,
      struct: this.plugin.structLayout()
    });
    const path = this.file.path.replace(/\.md$/i, ".docx");
    await this.plugin.app.vault.adapter.writeBinary(path, await blob.arrayBuffer());
    new import_obsidian.Notice(`RedQuill\uFF1A\u5DF2\u5BFC\u51FA ${path}`);
  }
  /**
   * M3 PDF：预览即真相源——把预览面板同一份 renderPreview HTML 注入隐藏 iframe，
   * @page A4 零边距（.rg-page 自带页边距 padding），走 Electron 打印管线「另存为 PDF」。
   */
  async printPdf() {
    if (!this.file) {
      new import_obsidian.Notice("RedQuill\uFF1A\u6CA1\u6709\u6253\u5F00\u7684\u7B14\u8BB0\u3002");
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
      struct: this.plugin.structLayout()
    });
    const safeName = this.file.basename.replace(/[<>&"]/g, "");
    const html2 = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${safeName}</title><style>
@page { size: A4; margin: 0; }
html, body { margin: 0; padding: 0; background: #fff; }
.rg-page { min-height: auto; }
</style></head><body>${inner}</body></html>`;
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed; right:0; bottom:0; width:1px; height:1px; border:0; opacity:0;";
    iframe.srcdoc = html2;
    iframe.addEventListener("load", () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        window.setTimeout(() => iframe.remove(), 6e4);
      }
    });
    document.body.appendChild(iframe);
    new import_obsidian.Notice("RedQuill\uFF1A\u6253\u5370\u5BF9\u8BDD\u6846\u4E2D\u9009\u300C\u53E6\u5B58\u4E3A PDF\u300D\u5373\u53EF\uFF08PDF \u4E0E\u9884\u89C8\u96F6\u5DEE\u5F02\uFF09\u3002", 6e3);
  }
  async onClose() {
  }
};

// src/views/write_assist_view.ts
var import_obsidian3 = require("obsidian");

// src/gongwen/writeassist.ts
var CN = ["\u96F6", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"];
function cnNum(n) {
  if (n <= 0) return "";
  if (n <= 10) return CN[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return (tens === 1 ? "\u5341" : CN[tens] + "\u5341") + (ones ? CN[ones] : "");
}
function lineRole(line) {
  const raw = line ?? "";
  const t = raw.trim();
  if (!t) return { role: "empty", label: "\u7A7A\u884C\uFF08\u6BB5\u843D\u5206\u9694\uFF09" };
  if (/^-{3,}\s*$/.test(t)) return { role: "fm", label: "frontmatter \u680F\u7EBF\uFF08---\uFF09", tip: "\u5F00\u680F\u540E\u5199 rh-* \u516C\u6587\u5C5E\u6027\uFF1B\u6B63\u6587\u4E2D\u5355\u72EC\u4E00\u884C --- \u4F1A\u5F00\u542F\u9644\u4EF6\u533A\uFF08\u53E6\u9762\u8D77\u6392\uFF09" };
  if (/^rh-[A-Za-z][A-Za-z0-9]*\s*:/.test(t) || /^[A-Za-z_][A-Za-z0-9_]*\s*:/.test(t))
    return { role: "fm", label: "frontmatter \u5C5E\u6027\u884C", tip: "rh- \u524D\u7F00\u4E3A\u516C\u6587\u5C5E\u6027\uFF1B\u666E\u901A yaml \u952E\u4E0D\u5F71\u54CD\u6392\u7248" };
  if (/^#\s+\S/.test(t)) return { role: "docTitle", label: "\u6587\u4EF6\u6807\u9898\uFF08#\uFF09", tip: "\u5C0F\u6807\u5B8B\u4E8C\u53F7\u5C45\u4E2D\uFF1B\u6574\u7BC7\u53EA\u53D6\u7B2C\u4E00\u4E2A #\uFF0C\u6B63\u6587\u91CC\u7684\u7EA7\u6B21\u8BF7\u7528 ## \u8D77" };
  if (/^##\s+\S/.test(t)) return { role: "h1", label: "\u4E00\u7EA7\u6807\u9898\uFF08## \u4E00\u3001\uFF09", tip: "\u9ED1\u4F53\u4E09\u53F7\u9876\u683C\uFF1B\u5EFA\u8BAE\u5E8F\u53F7\u300C\u4E00\u3001\u4E8C\u3001\u4E09\u2026\u300D" };
  if (/^###\s+\S/.test(t)) return { role: "h2", label: "\u4E8C\u7EA7\u6807\u9898\uFF08### \uFF08\u4E00\uFF09\uFF09", tip: "\u6977\u4F53\u4E09\u53F7\u9876\u683C\uFF1B\u5EFA\u8BAE\u5E8F\u53F7\u300C\uFF08\u4E00\uFF09\uFF08\u4E8C\uFF09\u2026\u300D" };
  if (/^####\s+\S/.test(t)) return { role: "h3", label: "\u4E09\u7EA7\u6807\u9898\uFF08#### 1.\uFF09", tip: "\u4EFF\u5B8B\u4E09\u53F7\u52A0\u7C97\u3001\u9996\u884C\u7F29\u8FDB 2 \u5B57\uFF1B\u5EFA\u8BAE\u5E8F\u53F7\u300C1. 2. \u2026\u300D" };
  if (/^#{5,}\s+\S/.test(t))
    return { role: "plain", label: "\u8FC7\u6DF1\u6807\u9898\uFF08#####+\uFF09", tip: "\u516C\u6587\u7EA7\u6B21\u53EA\u5230\u4E09\u7EA7\uFF08# \u6807\u9898 / ## \u4E00\u3001/ ### \uFF08\u4E00\uFF09/ #### 1.\uFF09\uFF0C\u66F4\u6DF1\u7684\u884C\u6309\u6B63\u6587\u5904\u7406" };
  const out = detectOutlineHeading(t);
  if (out === "h1") return { role: "bare-h1", label: "\u4E00\u7EA7\u6807\u9898\uFF08\u88F8\u5199\u300C\u4E00\u3001\u300D\u8BC6\u522B\uFF09", tip: "\u5DF2\u81EA\u52A8\u6309\u9ED1\u4F53\u4E09\u53F7\u4E00\u7EA7\u6807\u9898\u6392\u7248\uFF1B\u4E5F\u53EF\u5199\u6210 ## \u524D\u7F00\u66F4\u663E\u5F0F" };
  if (/^[一二三四五六七八九十]{1,3}、/.test(t))
    return { role: "bare-h1-body", label: "\u6B63\u6587\u6BB5\uFF08\u6BB5\u9996\u5E8F\u6570\u300C\u4E00\u3001\u2026\u300D\uFF09", tip: "\u884C\u5185\u542B\u53E5\u53F7 \u2192 \u6309\u6B63\u6587\u6E32\u67D3\uFF08\u9996\u884C\u7F29\u8FDB 2 \u5B57\uFF09\u3002\u6807\u9898\u884C\u5EFA\u8BAE\u4E0D\u5199\u53E5\u53F7" };
  if (/^（[一二三四五六七八九十]{1,3}）/.test(t) && !t.includes("\u3002"))
    return { role: "suggest-h2", label: "\u7591\u4F3C\u4E8C\u7EA7\u6807\u9898\uFF08\uFF08\u4E00\uFF09\u2026\uFF09", tip: "\u88F8\u5199\uFF08\u4E00\uFF09\u4E0D\u8BC6\u522B\u5C42\u7EA7\uFF0C\u8BF7\u52A0 ### \u524D\u7F00\uFF08\u6977\u4F53\u4E09\u53F7\uFF09\u6216\u76F4\u63A5\u63A5\u6B63\u6587" };
  if (/^\d{1,2}[.、]/.test(t) && !t.includes("\u3002"))
    return { role: "suggest-h3", label: "\u7591\u4F3C\u4E09\u7EA7\u6807\u9898\uFF081. \u2026\uFF09", tip: "\u88F8\u5199 1. \u4E0D\u8BC6\u522B\u5C42\u7EA7\uFF0C\u8BF7\u52A0 #### \u524D\u7F00\uFF08\u4EFF\u5B8B\u52A0\u7C97\u3001\u7F29\u8FDB 2 \u5B57\uFF09\u6216\u76F4\u63A5\u63A5\u6B63\u6587" };
  if (/^\s*\|/.test(t)) return { role: "table", label: "md \u8868\u683C", tip: "\u8868\u5934\u9996\u884C\u52A0\u7C97\u5C45\u4E2D\uFF0C\u5217\u5BF9\u9F50\u8BA4 :-- \u5DE6 / :--: \u4E2D / --: \u53F3" };
  if (/^>\s?/.test(t)) return { role: "quote", label: "\u5F15\u7528\u884C\uFF08> \u5143\u4FE1\u606F\uFF09", tip: "\u5F15\u7528\u5757\u4E0D\u8FDB\u6B63\u6587\uFF08\u4F5C\u5143\u4FE1\u606F/\u5907\u6CE8\u7528\uFF09" };
  if (/^[-*+]\s/.test(t)) return { role: "list", label: "\u5217\u8868\u9879", tip: "\u6E32\u67D3\u65F6\u6761\u76EE\u62CD\u5E73\u6210\u6B63\u6587\u6BB5\u843D\uFF1B\u516C\u6587\u5E8F\u53F7\u8BF7\u76F4\u63A5\u5199\u5728\u539F\u6587\uFF08\u4E00\u3001/\uFF08\u4E00\uFF09/1.\uFF09" };
  if (/^```/.test(t)) return { role: "code", label: "\u4EE3\u7801\u5757", tip: "\u4EE3\u7801\u5757\u4E0D\u8FDB\u6B63\u6587" };
  if (/^[\s\u3000\u00A0]/.test(raw) && !/^\s*\|/.test(raw))
    return { role: "body-indent", label: "\u6B63\u6587\u6BB5\uFF08\u884C\u9996\u6709\u624B\u6572\u7A7A\u683C\uFF09", tip: "\u9996\u884C\u7F29\u8FDB\u7531\u6392\u7248\u81EA\u52A8\u751F\u6210\uFF082 \u5B57\uFF09\uFF0C\u884C\u9996\u7A7A\u683C\u8BF7\u5220\u9664\uFF0C\u907F\u514D\u5BFC\u51FA docx \u51FA\u73B0\u591A\u4F59\u7A7A\u767D" };
  return { role: "body", label: "\u6B63\u6587\u6BB5", tip: "\u9996\u884C\u81EA\u52A8\u7F29\u8FDB 2 \u5B57\u3001\u4E24\u7AEF\u5BF9\u9F50\uFF1B\u6BB5\u4E0E\u6BB5\u4E4B\u95F4\u7559\u4E00\u4E2A\u7A7A\u884C" };
}
function isH1Line(line) {
  const t = line.trim();
  return /^##\s+\S/.test(t) || detectOutlineHeading(t) === "h1";
}
function isH2Line(line) {
  return /^###\s+\S/.test(line.trim());
}
function nextH1(lines) {
  let n = 0;
  let inFm = false;
  for (const ln of lines) {
    const t = ln.trim();
    if (/^-{3,}\s*$/.test(t)) {
      inFm = !inFm;
      continue;
    }
    if (!inFm && isH1Line(ln)) n += 1;
  }
  return cnNum(n + 1) + "\u3001";
}
function nextH2(lines) {
  let n = 0;
  let inFm = false;
  for (const ln of lines) {
    const t = ln.trim();
    if (/^-{3,}\s*$/.test(t)) {
      inFm = !inFm;
      continue;
    }
    if (!inFm && isH2Line(ln)) n += 1;
  }
  return `\uFF08${CN[n + 1]}\uFF09`;
}

// src/modals.ts
var import_obsidian2 = require("obsidian");

// src/frontmatter.ts
var FM_FORM_FIELDS = [
  { label: "\u673A\u5173\u6807\u5FD7\u6587\u5B57\uFF08\u7EA2\u5934\u5927\u5B57\uFF09", key: "rh-agency", group: "\u7248\u5934", placeholder: "XX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6\uFF1B\u8054\u5408\u884C\u6587\u7528 / \u5206\u9694\u591A\u673A\u5173" },
  { label: "\u673A\u5173\u6807\u5FD7\u56FE\u7247\uFF08vault \u8DEF\u5F84\uFF0Cpng/jpg\uFF09", key: "rh-logo", group: "\u7248\u5934", placeholder: "_assets/logo.png" },
  { label: "\u53D1\u6587\u5B57\u53F7", key: "rh-docNumber", group: "\u7248\u5934", placeholder: "X\u653F\u53D1\u30142026\u301512\u53F7" },
  { label: "\u7B7E\u53D1\u4EBA\uFF08\u4E0A\u884C\u6587\u624D\u586B\uFF09", key: "rh-signer", group: "\u7248\u5934", placeholder: "\u5F20\u4E09" },
  { label: "\u4EFD\u53F7\uFF086 \u4F4D\u6570\u5B57\uFF09", key: "rh-copyNumber", group: "\u7248\u5934", placeholder: "000001" },
  { label: "\u5BC6\u7EA7\u548C\u4FDD\u5BC6\u671F\u9650", key: "rh-secretLevel", group: "\u7248\u5934", placeholder: "\u673A\u5BC6\u26051\u5E74" },
  { label: "\u7D27\u6025\u7A0B\u5EA6", key: "rh-urgency", group: "\u7248\u5934", placeholder: "\u7279\u6025" },
  { label: "\u4E3B\u9001\u673A\u5173\uFF08\u591A\u4E2A\u7528\u987F\u53F7\u5206\u9694\uFF09", key: "rh-recipients", group: "\u4E3B\u4F53", placeholder: "\u5404\u90E8\u95E8\u3001\u5404\u79D1\u5BA4", wide: true },
  { label: "\u7F72\u540D\uFF08\u53D1\u6587\u673A\u5173\u540D\uFF09", key: "rh-signature", group: "\u4E3B\u4F53", placeholder: "XX\u9547\u4EBA\u6C11\u653F\u5E9C" },
  { label: "\u6210\u6587\u65E5\u671F", key: "rh-date", group: "\u4E3B\u4F53", placeholder: "2026\u5E749\u67082\u65E5" },
  { label: "\u5370\u7AE0\u56FE\uFF08vault \u8DEF\u5F84\uFF0C\u6D6E\u76D6\u5728\u6210\u6587\u65E5\u671F\u4E0A\uFF09", key: "rh-seal", group: "\u4E3B\u4F53", placeholder: "_assets/seal.png" },
  { label: "\u9644\u4EF6\u8BF4\u660E\uFF08\u591A\u4E2A\u7528 / \u5206\u9694\uFF09", key: "rh-attachments", group: "\u4E3B\u4F53", placeholder: "\u4F1A\u8BAE\u8BAE\u7A0B/\u53C2\u4F1A\u540D\u5355", wide: true },
  { label: "\u9644\u6CE8\uFF08\u8054\u7CFB\u4EBA\u7B49\uFF0C\u81EA\u52A8\u52A0\u5706\u62EC\u53F7\uFF09", key: "rh-notes", group: "\u4E3B\u4F53", placeholder: "\u8054\u7CFB\u4EBA\uFF1A\u5F20\u4E09", wide: true },
  { label: "\u6284\u9001\u673A\u5173", key: "rh-cc", group: "\u7248\u8BB0", placeholder: "\u53BF\u519C\u4E1A\u519C\u6751\u5C40\u3001\u53BF\u8D22\u653F\u5C40" },
  { label: "\u5370\u53D1\u673A\u5173", key: "rh-printOrg", group: "\u7248\u8BB0", placeholder: "XX\u9547\u515A\u653F\u529E\u516C\u5BA4" },
  { label: "\u5370\u53D1\u65F6\u95F4", key: "rh-printDate", group: "\u7248\u8BB0", placeholder: "2026\u5E749\u67082\u65E5" },
  { label: "\u5370\u53D1\u4EFD\u6570", key: "rh-printCopies", group: "\u7248\u8BB0", placeholder: "20" }
];
function fmQuote(v) {
  return /[:#[\]{}&*!|>'"%@`]/.test(v) || /^\s|\s$/.test(v) ? `"${v.replace(/"/g, '\\"')}"` : v;
}
function applyFrontmatter(src, entries) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) {
    const fm = ["---", ...entries.map(([k, v]) => `${k}: ${fmQuote(v)}`), "---", ""].join("\n");
    return fm + src;
  }
  let fmText = m[1];
  for (const [k, v] of entries) {
    const re = new RegExp(`^(${k}\\s*:\\s*)(.*)$`, "m");
    if (re.test(fmText)) fmText = fmText.replace(re, (_s, pre) => `${pre}${fmQuote(v)}`);
    else fmText += `
${k}: ${fmQuote(v)}`;
  }
  const rest = src.slice(m[0].length);
  return `---
${fmText}
---
${rest.startsWith("\n") || rest === "" ? rest : "\n" + rest}`;
}

// src/modals.ts
var NewGongwenWizard = class extends import_obsidian2.FuzzySuggestModal {
  constructor(plugin) {
    super(plugin.app);
    this.plugin = plugin;
    this.setPlaceholder("\u8F93\u5165\u6587\u79CD\u540D\u7B5B\u9009\uFF1A\u901A\u77E5 / \u8BF7\u793A / \u62A5\u544A / \u7EAA\u8981 \u2026");
  }
  getItems() {
    return NEW_DOC_ITEMS;
  }
  getItemText(it) {
    return `${it.label}\uFF08${it.group}\uFF09\u2014 ${it.desc}`;
  }
  onChooseItem(it) {
    new NewGongwenDraftModal(this.plugin, it).open();
  }
};
var NewGongwenDraftModal = class extends import_obsidian2.Modal {
  constructor(plugin, item) {
    super(plugin.app);
    this.plugin = plugin;
    this.item = item;
    this.titleEl.setText(`\u65B0\u5EFA\u516C\u6587 \xB7 ${item.label}`);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: `\u65B0\u5EFA\u516C\u6587\uFF1A${this.item.label}` });
    const agency = this.plugin.settings.defaultAgency;
    contentEl.createEl("p", {
      text: `${this.item.desc}\u3002\u53D1\u6587\u673A\u5173\uFF1A${agency ? `\u300C${agency}\u300D` : "\u6A21\u677F\u5360\u4F4D\u300CXX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6\u300D"}\uFF1B\u6A21\u677F\u4E2D\u5199\u6B7B\u7684\u5E74\u4EFD\u81EA\u52A8\u66FF\u6362\u4E3A\u4ECA\u5E74\u3002\u6587\u4EF6\u5EFA\u5728\u5F53\u524D\u7B14\u8BB0\u6240\u5728\u6587\u4EF6\u5939\u3002`,
      cls: "setting-item-description"
    });
    const input = contentEl.createEl("input", {
      type: "text",
      cls: "redquill-wizard-input",
      placeholder: "\u516C\u6587\u6807\u9898\uFF08\u53EF\u7559\u7A7A\u7528\u6A21\u677F\u5360\u4F4D\uFF0C\u5982\uFF1A\u5173\u4E8E\u5F00\u5C55\u79CB\u5B63\u4EBA\u5C45\u73AF\u5883\u6574\u6CBB\u7684\u901A\u77E5\uFF09"
    });
    input.style.width = "100%";
    input.focus();
    new import_obsidian2.Setting(contentEl).addButton(
      (b) => b.setButtonText("\u521B\u5EFA\u5E76\u6253\u5F00").setCta().onClick(async () => {
        const title = input.value.trim();
        try {
          await this.plugin.createGongwenDoc(this.item, title);
        } catch (e) {
          new import_obsidian2.Notice(`RedQuill\uFF1A\u521B\u5EFA\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`, 6e3);
          return;
        }
        new import_obsidian2.Notice("RedQuill\uFF1A\u516C\u6587\u5DF2\u521B\u5EFA\uFF0C\u5F00\u59CB\u5199\u4F5C\uFF08\u5199\u8F85\u52A9\u53EF\u63D0\u793A\u6807\u9898\u5C42\u7EA7\uFF09\u3002");
        this.close();
      })
    );
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        contentEl.querySelector("button.mod-cta")?.click();
      }
    });
  }
};
var GongwenFormModal = class extends import_obsidian2.Modal {
  constructor(plugin, initial) {
    super(plugin.app);
    this.plugin = plugin;
    this.initial = initial;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "\u586B\u5199\u516C\u6587\u5C5E\u6027" });
    contentEl.createEl("p", {
      text: "\u4E2D\u6587\u586B\u5199\uFF0C\u4FDD\u5B58\u540E\u4EE5 rh-* \u82F1\u6587\u5C5E\u6027\u5199\u5165\u7B14\u8BB0 frontmatter\u3002\u7559\u7A7A = \u4E0D\u6E32\u67D3\u8BE5\u8981\u7D20\u3002",
      cls: "setting-item-description"
    });
    const values = {};
    const inputs = {};
    let lastGroup = "";
    for (const f of FM_FORM_FIELDS) {
      if (f.group !== lastGroup) {
        lastGroup = f.group;
        contentEl.createEl("h4", { text: f.group });
      }
      const metaKey = f.key.slice(3);
      new import_obsidian2.Setting(contentEl).setName(f.label).setClass(f.wide ? "redquill-form-wide" : "redquill-form").addText((t) => {
        t.setPlaceholder(f.placeholder ?? "").setValue(this.initial[metaKey] ?? "");
        inputs[f.key] = t.inputEl;
        t.inputEl.style.width = "100%";
      });
      values[f.key] = "";
      inputs[f.key].addEventListener("input", () => values[f.key] = inputs[f.key].value);
    }
    new import_obsidian2.Setting(contentEl).addButton(
      (b) => b.setButtonText("\u5199\u5165 frontmatter").setCta().onClick(() => {
        const entries = FM_FORM_FIELDS.map(({ key }) => [key, values[key].trim()]).filter(
          ([, v]) => v !== ""
        );
        const warn = validateDocNumber(values["rh-docNumber"]);
        if (warn) new import_obsidian2.Notice(`RedQuill\uFF1A${warn}`, 8e3);
        const mv = this.plugin.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
        if (!mv?.file) {
          new import_obsidian2.Notice("RedQuill\uFF1A\u5F53\u524D\u6CA1\u6709\u6253\u5F00\u7684 md \u7B14\u8BB0\u3002");
          return;
        }
        mv.editor.setValue(applyFrontmatter(mv.editor.getValue(), entries));
        new import_obsidian2.Notice("RedQuill\uFF1A\u516C\u6587\u5C5E\u6027\u5DF2\u5199\u5165 frontmatter\u3002");
        this.close();
      })
    ).addButton((b) => b.setButtonText("\u53D6\u6D88").onClick(() => this.close()));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var CheckReportModal = class extends import_obsidian2.Modal {
  constructor(plugin, file, issues) {
    super(plugin.app);
    this.plugin = plugin;
    this.file = file;
    this.issues = issues;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const errs = this.issues.filter((i) => i.level === "error").length;
    const warns = this.issues.length - errs;
    contentEl.createEl("h3", {
      text: this.issues.length ? `\u6392\u7248\u4F53\u68C0\uFF1A${errs} \u5904\u9700\u5904\u7406\uFF0C${warns} \u5904\u5EFA\u8BAE` : "\u6392\u7248\u4F53\u68C0\uFF1A\u901A\u8FC7"
    });
    contentEl.createEl("p", {
      text: "\u673A\u5668\u81EA\u67E5\u4EC5\u63D0\u793A\u3001\u4E0D\u4FEE\u6539\u3001\u4E0D\u963B\u585E\u5BFC\u51FA\u3002\u70B9\u51FB\u300C\u7B2C N \u884C\u300D\u8DF3\u5230\u5BF9\u5E94\u4F4D\u7F6E\uFF08\u4F1A\u81EA\u52A8\u5207\u5230\u6E90\u7801\u6A21\u5F0F\uFF09\u3002",
      cls: "setting-item-description"
    });
    if (!this.issues.length) {
      contentEl.createEl("p", { text: "\u672A\u53D1\u73B0\u95EE\u9898\uFF0C\u53EF\u76F4\u63A5\u5BFC\u51FA\u3002", cls: "setting-item-description" });
      return;
    }
    const list2 = contentEl.createEl("div", { cls: "redquill-check-list" });
    for (const it of this.issues) {
      const row = list2.createEl("div", { cls: `redquill-check-item ${it.level}` });
      row.createEl("span", { cls: "redquill-check-badge", text: it.level === "error" ? "\u9700\u5904\u7406" : "\u5EFA\u8BAE" });
      row.createEl("span", { cls: "redquill-check-msg", text: it.message });
      if (it.line !== void 0) {
        const ln = row.createEl("span", { cls: "redquill-check-line", text: `\u7B2C ${it.line} \u884C \u2197` });
        ln.addEventListener("click", () => void this.jumpTo(it.line));
      }
    }
  }
  /** 跳到该文件源码模式第 line 行（1-based），并高亮当前行 */
  async jumpTo(line) {
    const { workspace } = this.app;
    let leaf = workspace.getLeavesOfType("markdown").find((l) => l.view?.file === this.file);
    if (!leaf) leaf = workspace.getLeaf(false);
    await leaf.openFile(this.file, { active: true, state: { mode: "source" } });
    const ed = leaf.view.editor;
    if (ed) {
      const l = Math.max(0, line - 1);
      ed.setCursor({ line: l, ch: 0 });
      ed.scrollIntoView({ from: { line: l, ch: 0 }, to: { line: l, ch: 0 } }, true);
    }
    this.close();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var SettingsBackupModal = class extends import_obsidian2.Modal {
  constructor(plugin) {
    super(plugin.app);
    this.pasted = "";
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "\u5BFC\u5165 RedQuill \u8BBE\u7F6E" });
    contentEl.createEl("p", {
      text: "\u4ECE\u672C vault \u7684 redquill-settings-*.json \u5907\u4EFD\u6062\u590D\uFF0C\u6216\u7C98\u8D34\u5176\u4ED6\u673A\u5668\u5BFC\u51FA\u7684 JSON\u3002\u5BFC\u5165\u524D\u4F1A\u505A\u7ED3\u6784\u4E0E\u53D6\u503C\u6821\u9A8C\uFF0C\u975E\u6CD5\u9879\u81EA\u52A8\u56DE\u9ED8\u8BA4\u3002",
      cls: "setting-item-description"
    });
    const files = this.plugin.backupFiles();
    if (files.length) {
      contentEl.createEl("h4", { text: `\u672C\u5E93\u5907\u4EFD\uFF08${files.length}\uFF09` });
      for (const f of files.slice(0, 8)) {
        const when = new Date(f.stat.mtime).toLocaleString();
        new import_obsidian2.Setting(contentEl).setName(f.name).setDesc(`${when}\u3000\u81EA\u5B9A\u4E49\u9884\u8BBE ${(f.stat.size / 1024).toFixed(1)} KB`).addButton(
          (b) => b.setButtonText("\u5BFC\u5165").onClick(async () => {
            try {
              const txt = await this.plugin.app.vault.read(f);
              await this.plugin.importSettingsText(txt, f.name);
              this.close();
            } catch (e) {
              new import_obsidian2.Notice(`RedQuill\uFF1A\u5BFC\u5165\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`, 6e3);
            }
          })
        );
      }
    } else {
      contentEl.createEl("p", { text: "\u672C\u5E93\u6682\u65E0 redquill-settings-*.json \u5907\u4EFD\u3002", cls: "setting-item-description" });
    }
    contentEl.createEl("h4", { text: "\u7C98\u8D34 JSON" });
    const ta = contentEl.createEl("textarea", { cls: "redquill-import-json" });
    ta.placeholder = "\u7C98\u8D34\u5176\u4ED6\u673A\u5668\u5BFC\u51FA\u7684 redquill-settings JSON \u5168\u6587\u2026";
    ta.addEventListener("input", () => this.pasted = ta.value);
    new import_obsidian2.Setting(contentEl).addButton(
      (b) => b.setButtonText("\u4ECE\u7C98\u8D34\u5185\u5BB9\u5BFC\u5165").setCta().onClick(async () => {
        if (!this.pasted.trim()) {
          new import_obsidian2.Notice("RedQuill\uFF1A\u8BF7\u5148\u7C98\u8D34 JSON \u5185\u5BB9\u3002");
          return;
        }
        try {
          await this.plugin.importSettingsText(this.pasted.trim(), "\u7C98\u8D34\u5185\u5BB9");
          this.close();
        } catch (e) {
          new import_obsidian2.Notice(`RedQuill\uFF1A\u5BFC\u5165\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`, 6e3);
        }
      })
    );
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/views/write_assist_view.ts
var ROLE_LABELS = {
  docTitle: "\u5927\u6807\u9898",
  h1: "\u4E00\u7EA7\u6807\u9898",
  h2: "\u4E8C\u7EA7\u6807\u9898",
  h3: "\u4E09\u7EA7\u6807\u9898",
  body: "\u6B63\u6587",
  table: "\u8868\u683C\uFF08\u8868\u5185\u6587\u5B57\uFF09"
};
function installResultText(r) {
  const base = `RedQuill\uFF1A\u65B0\u5EFA ${r.created} \u4E2A${r.skipped ? `\u3001\u8DF3\u8FC7\u5DF2\u5B58\u5728 ${r.skipped} \u4E2A` : ""}`;
  const tp = r.tpCreated || r.tpSkipped ? `\uFF1B\u5F39\u7A97\u7248 ${r.tpCreated} \u4E2A${r.tpSkipped ? `\u3001\u8DF3\u8FC7 ${r.tpSkipped} \u4E2A` : ""}` : "";
  return `${base}${tp}\uFF08${r.folder}\uFF09\u3002`;
}
var WriteAssistView = class extends import_obsidian3.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    /** 防抖句柄：editor-change / 切文件都触发重渲，200ms 合并 */
    this.pending = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_WRITEASSIST;
  }
  getDisplayText() {
    return "\u5199\u4F5C\u8F85\u52A9";
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
    el.createEl("h4", { text: "\u5199\u4F5C\u8F85\u52A9" });
    const mv = this.plugin.app.workspace.getActiveViewOfType(import_obsidian3.MarkdownView);
    if (!mv?.file) {
      el.createEl("p", {
        text: "\u6253\u5F00\u4E00\u4E2A md \u7B14\u8BB0\u540E\uFF0C\u8FD9\u91CC\u8DDF\u968F\u5149\u6807\u8BCA\u65AD\u6BCF\u4E00\u884C\u7684\u516C\u6587\u89D2\u8272\uFF0C\u5E76\u7ED9\u51FA\u6807\u9898\u5E8F\u53F7\u5EFA\u8BAE\u3002",
        cls: "setting-item-description"
      });
      return;
    }
    const editor = mv.editor;
    const cursor = editor.getCursor();
    const lineText = editor.getLine(cursor.line);
    const info = lineRole(lineText);
    const card = el.createEl("div", { cls: "redquill-write-card" });
    card.createEl("div", { cls: "redquill-write-role", text: `\u7B2C ${cursor.line + 1} \u884C \xB7 ${info.label}` });
    if (info.tip) card.createEl("div", { cls: "setting-item-description", text: info.tip });
    const all = editor.getValue().split("\n");
    const n1 = nextH1(all);
    const n2 = nextH2(all);
    const hint = el.createEl("p", { cls: "redquill-write-hint" });
    hint.createSpan({ text: `\u4E0B\u4E00\u4E2A\u5E8F\u53F7\u5EFA\u8BAE\uFF1A\u4E00\u7EA7 ${n1}\u3000\u4E8C\u7EA7 ${n2}` });
    el.createEl("h5", { text: "\u63D2\u5165\uFF08\u5149\u6807\u5904\uFF09" });
    const grid = el.createEl("div", { cls: "redquill-write-btns" });
    const mk = (label, snippet, tip = "") => {
      const b = grid.createEl("button", { text: label, cls: "redquill-write-btn" });
      b.title = tip || snippet;
      b.addEventListener("click", () => {
        editor.replaceSelection(snippet);
        editor.focus();
        this.schedule();
      });
    };
    mk(`\u4E00\u7EA7 ${n1}`, `## ${n1}`);
    mk(`\u4E8C\u7EA7 ${n2}`, `### ${n2}`);
    mk("\u4E09\u7EA7 1.", "#### 1.");
    mk("\u6587\u4EF6\u6807\u9898", "# ");
    mk("\u8868\u683C", "| \u9879\u76EE | \u8BF4\u660E |\n| :--- | :--- |\n|  |  |\n|  |  |");
    mk("\u9644\u4EF6\u53E6\u9762", "\n---\n", "\u6B63\u6587\u540E\u5355\u72EC\u4E00\u884C ---\uFF1A\u4E4B\u540E\u7684\u5185\u5BB9\u53E6\u9762\u8D77\u6392\u4E3A\u9644\u4EF6\u533A\uFF08\u6807\u9898\u5199 # \u9644\u4EF6N\uFF1A\u6807\u9898\uFF09");
    el.createEl("h5", { text: "\u5E38\u7528" });
    const ops = el.createEl("div", { cls: "redquill-write-btns" });
    const op = (label, fn) => {
      const b = ops.createEl("button", { text: label, cls: "redquill-write-btn" });
      b.addEventListener("click", fn);
    };
    op("\u516C\u6587\u5C5E\u6027\u8868\u5355", () => {
      const meta = parseDocument(editor.getValue()).meta;
      new GongwenFormModal(this.plugin, meta).open();
    });
    op("\u6392\u7248\u4F53\u68C0", () => {
      if (mv.file) void this.plugin.openCheck(mv.file);
    });
    op("\u5BFC\u51FA docx", () => {
      void this.plugin.exportActiveDocx();
    });
  }
};

// src/views/panel_view.ts
var import_obsidian4 = require("obsidian");

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

// src/views/panel_view.ts
var RedQuillPanelView = class extends import_obsidian4.ItemView {
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
    return "gauge";
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
    el.createEl("h4", { text: "RedQuill \u5199\u4F5C\u9762\u677F" });
    const mv = this.plugin.app.workspace.getActiveViewOfType(import_obsidian4.MarkdownView);
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
    const issues = checkDocument2(text);
    const errs = issues.filter((i) => i.level === "error").length;
    const warns = issues.length - errs;
    const card2 = el.createEl("div", { cls: "mdquill-card" });
    const head2 = card2.createEl("div", { cls: "mdquill-card-head" });
    head2.createEl("div", {
      cls: "mdquill-card-title",
      text: `\u516B\u6761\u4F53\u68C0${issues.length ? `\uFF1A${errs} \u5904\u9700\u5904\u7406 / ${warns} \u5904\u5EFA\u8BAE` : "\uFF1A\u901A\u8FC7"}`
    });
    const btn2 = head2.createEl("button", { text: issues.length ? "\u770B\u62A5\u544A" : "\u518D\u4F53\u68C0", cls: "mdquill-btn" });
    btn2.addEventListener("click", () => {
      if (mv.file) new CheckReportModal(this.plugin, mv.file, issues).open();
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
      card5.createEl("div", {
        text: "\u7A7A\u7B14\u8BB0\u3002\u76F4\u63A5\u5F00\u59CB\u5199\uFF1A\u6807\u9898\u7528 # \u5F00\u5934\uFF0C\u6BB5\u843D\u95F4\u7A7A\u4E00\u884C\u3002\u5199\u5B8C\u540E\u8FD0\u884C\u300C\u6392\u7248\u4F53\u68C0\u300D\uFF0C\u7C98\u8D34\u5916\u6765\u5185\u5BB9\u524D\u8FD0\u884C\u300C\u7C98\u8D34\u5E76\u51C0\u5316\u300D\u3002"
      });
    }
  }
};

// src/settings_tab.ts
var import_obsidian5 = require("obsidian");
var RedQuillSettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    /** 正在编辑的自定义预设 id */
    this.editingId = null;
    /** 渲染序号：display() 重入时丢弃旧的异步模板清单渲染 */
    this.renderSeq = 0;
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "RedQuill \u8BBE\u7F6E" });
    containerEl.createEl("h3", { text: "\u901A\u7528" });
    new import_obsidian5.Setting(containerEl).setName("\u81EA\u52A8\u51C0\u5316\u7C98\u8D34").setDesc("\u5F00\u542F\u540E\uFF0C\u5728\u7B14\u8BB0\u7F16\u8F91\u5668\u91CC\u7C98\u8D34\u6765\u81EA\u7F51\u9875/Word/WPS \u7684\u5185\u5BB9\u4F1A\u81EA\u52A8\u6E05\u6D17\u683C\u5F0F\uFF08\u4EC5\u5F53\u526A\u8D34\u677F\u5E26 HTML \u6837\u5F0F\u65F6\u624D\u5904\u7406\uFF0C\u7EAF\u6587\u672C\u76F4\u901A\uFF09\u3002\u9ED8\u8BA4\u5173\u95ED\uFF0C\u4E5F\u53EF\u968F\u65F6\u7528\u547D\u4EE4\u300C\u7C98\u8D34\u5E76\u51C0\u5316\u300D\u3002").addToggle((t) => {
      t.setValue(this.plugin.settings.autoClean).onChange(async (v) => {
        this.plugin.settings.autoClean = v;
        await this.plugin.saveSettings();
      });
    });
    containerEl.createEl("h3", { text: "\u516C\u6587" });
    new import_obsidian5.Setting(containerEl).setName("\u6D3B\u52A8\u9884\u8BBE").setDesc("\u9884\u89C8\u4E0E\u5BFC\u51FA\u4F7F\u7528\u7684\u7248\u5F0F\u3002\u9884\u89C8\u9762\u677F\u9876\u90E8\u4E0B\u62C9\u5207\u6362\u540C\u6837\u4F1A\u4FDD\u5B58\u5230\u8FD9\u91CC\u3002").addDropdown((dd) => {
      for (const p of this.plugin.allPresets()) dd.addOption(p.id, p.name);
      dd.setValue(this.plugin.settings.activePresetId).onChange(async (v) => {
        this.plugin.settings.activePresetId = v;
        await this.plugin.saveSettings();
        this.plugin.refreshPreviewViews();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("\u9884\u89C8\u6253\u5F00\u65B9\u5F0F").setDesc("\u70B9\u51FB\u9884\u89C8\u6309\u94AE/\u547D\u4EE4\u65F6\u9762\u677F\u7684\u6253\u5F00\u4F4D\u7F6E\u3002\u5DE6\u53F3\u5206\u5C4F = \u4E0E\u7B14\u8BB0\u5E76\u6392\u5BF9\u7167\uFF1B\u65B0\u6807\u7B7E\u9875 = \u4E3B\u5DE5\u4F5C\u533A\u6807\u7B7E\u3002").addDropdown(
      (dd) => dd.addOption("split", "\u5DE6\u53F3\u5206\u5C4F\uFF08\u9ED8\u8BA4\uFF09").addOption("tab", "\u65B0\u6807\u7B7E\u9875").setValue(this.plugin.settings.previewOpenMode).onChange(async (v) => {
        this.plugin.settings.previewOpenMode = v === "tab" ? "tab" : "split";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\u9996\u53E5\u6807\u7C97").setDesc("\u6BCF\u4E2A\u6B63\u6587\u6BB5\u843D\u7684\u7B2C\u4E00\u53E5\uFF08\u622A\u81F3\u7B2C\u4E00\u4E2A\u53E5\u53F7\uFF09\u52A0\u7C97\uFF0C\u9002\u5408\u8BF7\u793A\u3001\u6C47\u62A5\u7684\u6BB5\u65E8\u53E5\u5199\u6CD5\u3002").addToggle(
      (tg) => tg.setValue(this.plugin.settings.firstSentenceBold).onChange(async (v) => {
        this.plugin.settings.firstSentenceBold = v;
        await this.plugin.saveSettings();
        this.plugin.refreshPreviewViews();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\u7248\u8BB0\u5206\u9875\u6A21\u5F0F").setDesc(
      "GB/T 9704 \u53CC\u9762\u5370\u5236\uFF1A\u7248\u8BB0\u7F6E\u4E8E\u516C\u6587\u6700\u540E\u4E00\u9762\uFF08\u53CC\u9762\u5370\u5236\u5373\u5076\u6570\u9875\uFF09\u3002off=\u7248\u8BB0\u968F\u6B63\u6587\uFF08\u77ED\u6587/\u5355\u9762\u6253\u5370\uFF09\uFF1Bauto=\u6B63\u6587\u4E00\u9875\u88C5\u5F97\u4E0B\u5219\u4E0D\u62C6\uFF08\u7248\u8BB0\u7559\u7B2C 1 \u9875\uFF09\uFF0C\u88C5\u4E0D\u4E0B\u624D\u62C6\u5230\u5076\u6570\u9875\uFF08\u63A8\u8350\uFF09\uFF1Bforce=\u6052\u62C6\u5230\u5076\u6570\u9875\uFF08\u6B63\u6587\u6B62\u4E8E\u5076\u6570\u9875\u65F6 Word \u81EA\u52A8\u8865\u7A7A\u767D\u9875\uFF09\u3002\u62C6\u8282\u65F6\u9875\u7801\u6309\u56FD\u6807\u4E24\u5206\u6CD5\u7531\u6761\u4EF6\u57DF\u5728 Word/WPS \u6253\u5F00\u65F6\u6C42\u503C\uFF08\u4EC5\u5F71\u54CD docx \u5BFC\u51FA\uFF1B\u9884\u89C8/PDF \u6253\u5370\u4E0D\u9002\u7528\uFF09\u3002"
    ).addDropdown(
      (dd) => dd.addOption("off", "\u5173\u95ED\uFF08\u968F\u6B63\u6587\uFF09").addOption("auto", "\u81EA\u52A8\uFF08\u63A8\u8350\uFF09").addOption("force", "\u5F3A\u5236\u5076\u6570\u9875").setValue(this.plugin.settings.colophonMode).onChange(async (v) => {
        this.plugin.settings.colophonMode = v;
        await this.plugin.saveSettings();
      })
    );
    let rightInput;
    let leftInput;
    const applyDisabled = (align) => {
      rightInput.disabled = align !== "right";
      leftInput.disabled = align !== "left";
    };
    new import_obsidian5.Setting(containerEl).setName("\u843D\u6B3E\u5BF9\u9F50").setDesc(
      "\u7F72\u540D\u4E0E\u6210\u6587\u65E5\u671F\u7684\u5BF9\u9F50\uFF1A\u53F3\u5BF9\u9F50\uFF08GB/T 9704\uFF0C\u53F3\u7A7A N \u5B57\uFF09/ \u6C34\u5E73\u5C45\u4E2D / \u5DE6\u5BF9\u9F50\uFF08\u5DE6\u7A7A N \u5B57\uFF0C0=\u9876\u683C\uFF09\u3002\u843D\u6B3E\u4F4D\u7F6E = \u5BF9\u9F50\u65B9\u5F0F + \u5DE6/\u53F3\u7A7A\u5B57\u6570\u5171\u540C\u51B3\u5B9A\uFF0C\u9884\u89C8\u4E0E docx \u5BFC\u51FA\u540C\u6B65\u751F\u6548\u3002"
    ).addDropdown(
      (dd) => dd.addOption("right", "\u53F3\u5BF9\u9F50\uFF08GB/T\uFF0C\u53F3\u7A7AN\u5B57\uFF09").addOption("center", "\u6C34\u5E73\u5C45\u4E2D").addOption("left", "\u5DE6\u5BF9\u9F50\uFF08\u5DE6\u7A7AN\u5B57\uFF09").setValue(this.plugin.settings.signatureAlign).onChange(async (v) => {
        this.plugin.settings.signatureAlign = v;
        await this.plugin.saveSettings();
        applyDisabled(v);
        this.plugin.refreshPreviewViews();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\u843D\u6B3E\u53F3\u7A7A\uFF08\u5B57\uFF09").setDesc("\u7F72\u540D\u4E0E\u6210\u6587\u65E5\u671F\u76F8\u5BF9\u53F3\u7248\u5FC3\u7684\u8DDD\u79BB\uFF08\u53F3\u5BF9\u9F50\u6A21\u5F0F\u751F\u6548\uFF09\u3002GB/T 9704 \u89C4\u5B9A 4 \u5B57\uFF08\u9ED8\u8BA4\uFF09\uFF1B\u5B9E\u52A1\u5E38\u7528 2 \u5B57\u66F4\u8D34\u53F3\uFF1B0=\u7D27\u8D34\u53F3\u8FB9\u8DDD\u3002").addText((tx) => {
      tx.setValue(String(this.plugin.settings.signatureRightChars));
      tx.inputEl.type = "number";
      tx.inputEl.min = "0";
      tx.inputEl.max = "12";
      tx.inputEl.step = "1";
      tx.inputEl.style.width = "5em";
      rightInput = tx.inputEl;
      tx.onChange(async (v) => {
        const n = parseInt(v, 10);
        if (!isFinite(n) || n < 0 || n > 12) return;
        this.plugin.settings.signatureRightChars = n;
        await this.plugin.saveSettings();
        this.plugin.refreshPreviewViews();
      });
    });
    new import_obsidian5.Setting(containerEl).setName("\u843D\u6B3E\u5DE6\u7A7A\uFF08\u5B57\uFF09").setDesc("\u7F72\u540D\u4E0E\u6210\u6587\u65E5\u671F\u76F8\u5BF9\u5DE6\u7248\u5FC3\u8D77\u6392\u7684\u5DE6\u7A7A\uFF08\u5DE6\u5BF9\u9F50\u6A21\u5F0F\u751F\u6548\uFF1B0=\u9876\u683C\u5DE6\u5BF9\u9F50\uFF09\u3002").addText((tx) => {
      tx.setValue(String(this.plugin.settings.signatureLeftChars));
      tx.inputEl.type = "number";
      tx.inputEl.min = "0";
      tx.inputEl.max = "12";
      tx.inputEl.step = "1";
      tx.inputEl.style.width = "5em";
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
    new import_obsidian5.Setting(containerEl).setName("\u7ED3\u6784\u5C42\u4F4D\u7F6E").setHeading();
    const charsSetting = (name, desc, get, set) => new import_obsidian5.Setting(containerEl).setName(name).setDesc(desc).addText((tx) => {
      tx.setValue(String(get()));
      tx.inputEl.type = "number";
      tx.inputEl.min = "0";
      tx.inputEl.max = "12";
      tx.inputEl.step = "1";
      tx.inputEl.style.width = "5em";
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
      "\u9644\u6CE8\u5DE6\u7A7A\uFF08\u5B57\uFF09",
      "rh-notes \u9644\u6CE8\u884C\uFF08\u8054\u7CFB\u4EBA\u7B49\u5706\u62EC\u53F7\u6CE8\uFF09\u76F8\u5BF9\u5DE6\u7248\u5FC3\u7684\u5DE6\u7A7A\uFF0C\u9ED8\u8BA4 2\uFF08GB/T 9704\uFF09\u3002",
      () => s.notesIndentChars,
      (n) => s.notesIndentChars = n
    );
    charsSetting(
      "\u9644\u4EF6\u8BF4\u660E\u5DE6\u7A7A\uFF08\u5B57\uFF09",
      "rh-attachments \u9644\u4EF6\u8BF4\u660E\u884C\u76F8\u5BF9\u5DE6\u7248\u5FC3\u7684\u5DE6\u7A7A\uFF0C\u9ED8\u8BA4 2\uFF08GB/T 9704\uFF09\u3002",
      () => s.attachIndentChars,
      (n) => s.attachIndentChars = n
    );
    charsSetting(
      "\u7248\u8BB0\u6284\u9001/\u5370\u53D1\u673A\u5173\u5DE6\u7A7A\uFF08\u5B57\uFF09",
      "rh-cc \u6284\u9001\u884C\u4E0E rh-printOrg \u5370\u53D1\u673A\u5173\u884C\u7684\u5DE6\u7A7A\uFF0C\u9ED8\u8BA4 1\uFF08GB/T 9704\uFF0C\u6B63\u6587\u56DB\u53F7\u5B57\u5BBD\u8BA1\uFF09\u3002",
      () => s.colophonLeftChars,
      (n) => s.colophonLeftChars = n
    );
    charsSetting(
      "\u7248\u8BB0\u5370\u53D1\u65E5\u671F\u53F3\u7A7A\uFF08\u5B57\uFF09",
      "rh-printDate \u5370\u53D1\u65E5\u671F\u76F8\u5BF9\u53F3\u7248\u5FC3\u7684\u53F3\u7A7A\uFF0C\u9ED8\u8BA4 1\uFF08GB/T 9704\uFF09\u3002",
      () => s.printRightChars,
      (n) => s.printRightChars = n
    );
    charsSetting(
      "\u7248\u8BB0\u5370\u53D1\u4EFD\u6570\u53F3\u7A7A\uFF08\u5B57\uFF09",
      "rh-printCopies \u5370\u53D1\u4EFD\u6570\u76F8\u5BF9\u53F3\u7248\u5FC3\u7684\u53F3\u7A7A\uFF0C\u9ED8\u8BA4 3\uFF08GB/T 9704\uFF09\u3002",
      () => s.copiesRightChars,
      (n) => s.copiesRightChars = n
    );
    new import_obsidian5.Setting(containerEl).setName("\u9884\u8BBE\u7BA1\u7406").setHeading();
    for (const p of this.plugin.allPresets()) this.presetRow(containerEl, p);
    new import_obsidian5.Setting(containerEl).addButton(
      (btn) => btn.setButtonText("\uFF0B \u65B0\u5EFA\u9884\u8BBE\uFF08\u590D\u5236\u5F53\u524D\u6D3B\u52A8\u9884\u8BBE\uFF09").onClick(async () => {
        const src = this.plugin.activePreset();
        const preset = clonePreset(src, { id: `custom-${Date.now()}`, name: `${src.name} \u526F\u672C`, builtin: false });
        this.plugin.settings.customPresets.push(preset);
        this.plugin.settings.activePresetId = preset.id;
        await this.plugin.saveSettings();
        this.editingId = preset.id;
        this.display();
        this.plugin.refreshPreviewViews();
      })
    );
    this.renderWriteSection(containerEl);
    new import_obsidian5.Setting(containerEl).setName("\u516C\u6587\u6A21\u677F").setHeading();
    const seq = ++this.renderSeq;
    void this.renderTemplateSection(containerEl, seq);
    this.renderBackupSection(containerEl);
    if (this.editingId) {
      const target = this.plugin.allPresets().find((p) => p.id === this.editingId);
      if (target) this.presetEditor(containerEl, target);
      else this.editingId = null;
    }
  }
  /** 一行预设：名称 + 操作按钮（内置：编辑/重置/复制；自定义：编辑/删除/复制） */
  presetRow(containerEl, p) {
    const overridden = p.builtin && !!this.plugin.builtinOverrideFor(p.id);
    const tag2 = p.builtin ? overridden ? "\uFF08\u5185\u7F6E \xB7 \u5DF2\u4FEE\u6539\uFF09" : "\uFF08\u5185\u7F6E\uFF09" : "";
    const active = p.id === this.plugin.settings.activePresetId ? " \xB7 \u5F53\u524D\u4F7F\u7528" : "";
    const s = new import_obsidian5.Setting(containerEl).setName(`${p.name}${tag2}${active}`);
    s.addExtraButton(
      (b) => b.setIcon("pencil").setTooltip("\u7F16\u8F91").onClick(() => {
        this.editingId = p.id;
        this.display();
      })
    );
    if (p.builtin) {
      s.addExtraButton(
        (b) => b.setIcon("rotate-ccw").setTooltip("\u91CD\u7F6E\u4E3A\u51FA\u5382\u9ED8\u8BA4").onClick(async () => {
          await this.plugin.resetBuiltinPreset(p.id);
          if (this.editingId === p.id) this.editingId = null;
          this.display();
          new import_obsidian5.Notice(`RedQuill\uFF1A${p.name} \u5DF2\u91CD\u7F6E\u4E3A\u51FA\u5382\u9ED8\u8BA4\u3002`);
        })
      );
    } else {
      s.addExtraButton(
        (b) => b.setIcon("trash").setTooltip("\u5220\u9664").onClick(async () => {
          this.plugin.settings.customPresets = this.plugin.settings.customPresets.filter((x) => x.id !== p.id);
          if (this.plugin.settings.activePresetId === p.id) {
            this.plugin.settings.activePresetId = BUILTIN_PRESETS[0].id;
          }
          if (this.editingId === p.id) this.editingId = null;
          await this.plugin.saveSettings();
          this.display();
          this.plugin.refreshPreviewViews();
        })
      );
    }
    s.addExtraButton(
      (b) => b.setIcon("copy").setTooltip("\u590D\u5236\u4E3A\u65B0\u9884\u8BBE").onClick(async () => {
        const preset = clonePreset(p, { id: `custom-${Date.now()}`, name: `${p.name} \u526F\u672C`, builtin: false });
        this.plugin.settings.customPresets.push(preset);
        this.plugin.settings.activePresetId = preset.id;
        await this.plugin.saveSettings();
        this.editingId = preset.id;
        this.display();
        this.plugin.refreshPreviewViews();
      })
    );
  }
  /**
   * 预设编辑表单。内置预设编辑的是工作副本，每次改动写入覆盖层（出厂定义不动，
   * 随时可在列表行一键重置）；自定义预设直接改本体。
   */
  presetEditor(containerEl, target) {
    const isBuiltin = target.builtin;
    const p = isBuiltin ? clonePreset(target, { id: target.id, name: target.name }) : target;
    const box = containerEl.createEl("div", { cls: "redquill-preset-editor" });
    box.createEl("h3", { text: `\u7F16\u8F91\uFF1A${p.name}${isBuiltin ? "\uFF08\u5185\u7F6E\uFF0C\u6539\u52A8\u5373\u4FDD\u5B58\uFF0C\u53EF\u91CD\u7F6E\u4E3A\u51FA\u5382\uFF09" : ""}` });
    const save = () => isBuiltin ? this.plugin.saveBuiltinOverride(p) : this.plugin.saveCustomPreset(p);
    const num = (label, desc, get, set, unit = "") => {
      new import_obsidian5.Setting(box).setName(label).setDesc(desc).addText((tx) => {
        tx.setValue(String(get()));
        tx.inputEl.type = "number";
        tx.onChange((v) => {
          const n = parseFloat(v);
          if (isFinite(n) && n > 0) {
            set(n);
            save();
          }
        });
      });
    };
    new import_obsidian5.Setting(box).setName("\u9884\u8BBE\u540D\u79F0").addText(
      (tx) => tx.setValue(p.name).onChange((v) => {
        p.name = v.trim() || p.name;
        save();
      })
    );
    box.createEl("h4", { text: "\u9875\u9762" });
    num("\u4E0A\u8FB9\u8DDD (mm)", "", () => p.page.top, (v) => p.page.top = v);
    num("\u4E0B\u8FB9\u8DDD (mm)", "", () => p.page.bottom, (v) => p.page.bottom = v);
    num("\u5DE6\u8FB9\u8DDD (mm)", "", () => p.page.left, (v) => p.page.left = v);
    num("\u53F3\u8FB9\u8DDD (mm)", "", () => p.page.right, (v) => p.page.right = v);
    num("\u6B63\u6587\u884C\u8DDD (\u78C5)", "\u56FA\u5B9A\u503C\u884C\u8DDD", () => p.linePt, (v) => p.linePt = v);
    num("\u5927\u6807\u9898\u884C\u8DDD (\u78C5)", "\u56FA\u5B9A\u503C\u884C\u8DDD", () => p.titleLinePt, (v) => p.titleLinePt = v);
    new import_obsidian5.Setting(box).setName("\u9875\u7801\u6837\u5F0F").setDesc("\u516C\u6587\u5F0F\u4E3A GB/T 9704 \u56FA\u5B9A\u6392\u6CD5\uFF08\u5355\u9875\u53F3 / \u53CC\u9875\u5DE6\uFF09\uFF0C\u5FFD\u7565\u4E0B\u65B9\u5BF9\u9F50\u8BBE\u7F6E\u3002").addDropdown((dd) => {
      for (const o of PAGE_NUMBER_OPTIONS) dd.addOption(o.id, o.label);
      dd.setValue(p.pageNumber.style).onChange(async (v) => {
        p.pageNumber.style = v;
        save();
      });
    });
    new import_obsidian5.Setting(box).setName("\u9875\u7801\u5BF9\u9F50").setDesc("\u975E\u516C\u6587\u5F0F\u9875\u7801\u7684\u5BF9\u9F50\u4F4D\u7F6E").addDropdown(
      (dd) => dd.addOption("left", "\u5C45\u5DE6").addOption("center", "\u5C45\u4E2D").addOption("right", "\u5C45\u53F3").setValue(p.pageNumber.align).onChange(async (v) => {
        p.pageNumber.align = v;
        save();
      })
    );
    num("\u9875\u7801\u5B57\u53F7 (pt)", "\u56FD\u6807\u4E3A\u56DB\u53F7 14pt", () => p.pageNumber.sizePt, (v) => p.pageNumber.sizePt = v);
    box.createEl("h4", { text: "\u89D2\u8272\u6392\u7248" });
    for (const key of ["docTitle", "h1", "h2", "h3", "body", "table"]) {
      const st = p.roles[key];
      box.createEl("h5", { text: ROLE_LABELS[key] });
      new import_obsidian5.Setting(box).setName("\u4E2D\u6587\u5B57\u4F53").setDesc("\u7559\u7A7A\u7528\u9ED8\u8BA4\u5B57\u94FE\uFF1B\u586B\u672C\u673A\u5DF2\u5B89\u88C5\u7684\u5B57\u4F53\u540D").addText(
        (tx) => tx.setValue(st.font).setPlaceholder("\u9ED8\u8BA4").onChange((v) => {
          st.font = v.trim();
          save();
        })
      );
      num("\u5B57\u53F7 (pt)", "", () => st.sizePt, (v) => st.sizePt = v);
      new import_obsidian5.Setting(box).setName("\u52A0\u7C97").addToggle(
        (tg) => tg.setValue(st.bold).onChange(async (v) => {
          st.bold = v;
          save();
        })
      );
      if (key !== "table") {
        new import_obsidian5.Setting(box).setName("\u5BF9\u9F50").addDropdown(
          (dd) => dd.addOption("left", "\u5DE6\u5BF9\u9F50").addOption("center", "\u5C45\u4E2D").setValue(st.align).onChange(async (v) => {
            st.align = v;
            save();
          })
        );
      }
      if (key === "h3" || key === "body") {
        num("\u9996\u884C\u7F29\u8FDB (\u5B57\u7B26)", "0 = \u4E0D\u7F29\u8FDB", () => st.indentChars, (v) => st.indentChars = Math.max(0, Math.floor(v)));
      }
    }
    new import_obsidian5.Setting(box).addButton(
      (btn) => btn.setButtonText("\u6536\u8D77\u7F16\u8F91\u5668").onClick(() => {
        this.editingId = null;
        this.display();
      })
    );
  }
  /** v0.11.0 写作提效设置：默认发文机关（新建向导预填）+ 写作辅助面板入口 */
  renderWriteSection(containerEl) {
    containerEl.createEl("h3", { text: "\u5199\u4F5C" });
    new import_obsidian5.Setting(containerEl).setName("\u9ED8\u8BA4\u53D1\u6587\u673A\u5173\uFF08\u7EA2\u5934\uFF09").setDesc("\u300C\u65B0\u5EFA\u516C\u6587\u300D\u5411\u5BFC\u81EA\u52A8\u628A\u8BE5\u673A\u5173\u9884\u586B\u8FDB frontmatter \u7684 rh-agency\uFF1B\u8054\u5408\u884C\u6587\u7528 / \u5206\u9694\u591A\u673A\u5173\u3002\u7559\u7A7A = \u7528\u6A21\u677F\u5360\u4F4D\u300CXX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6\u300D\u3002").addText(
      (tx) => tx.setPlaceholder("XX\u9547\u4EBA\u6C11\u653F\u5E9C\u6587\u4EF6").setValue(this.plugin.settings.defaultAgency).onChange(async (v) => {
        this.plugin.settings.defaultAgency = v.trim().replace(/\s+/g, " ").slice(0, 80);
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("\u5199\u4F5C\u8F85\u52A9\u9762\u677F").setDesc("\u53F3\u4FA7\u680F\u8DDF\u968F\u5149\u6807\u8BCA\u65AD\u5F53\u524D\u884C\u7684\u516C\u6587\u89D2\u8272\uFF08\u6807\u9898\u5C42\u7EA7/\u6B63\u6587/\u8868\u683C\u2026\uFF09\uFF0C\u7ED9\u4E0B\u4E00\u7EA7\u6807\u9898\u5E8F\u53F7\u5EFA\u8BAE\u4E0E\u5FEB\u6377\u63D2\u5165\uFF1B\u4E5F\u53EF\u7528\u547D\u4EE4\u300C\u6253\u5F00\u5199\u4F5C\u8F85\u52A9\u9762\u677F\u300D\u3002").addButton((b) => b.setButtonText("\u6253\u5F00").onClick(() => this.plugin.openWriteAssistBtn()));
  }
  /** v0.8.0 备份与同步：导出全部设置 / 导入（备份列表 + 粘贴 JSON） */
  renderBackupSection(containerEl) {
    containerEl.createEl("h3", { text: "\u5907\u4EFD\u4E0E\u540C\u6B65" });
    containerEl.createEl("p", {
      text: "\u53CC\u673A\u6216\u540C\u4E8B\u95F4\u540C\u6B65\u540C\u4E00\u5957\u7248\u5F0F\uFF1A\u5BFC\u51FA\u540E\u5728\u53E6\u4E00\u53F0\u5BFC\u5165\u5373\u53EF\uFF08\u5907\u4EFD\u6587\u4EF6\u653E vault \u6839\u76EE\u5F55\uFF0C\u968F\u5E93\u540C\u6B65\uFF09\u3002",
      cls: "setting-item-description"
    });
    new import_obsidian5.Setting(containerEl).setName("\u5BFC\u51FA\u5168\u90E8\u8BBE\u7F6E").setDesc("\u81EA\u5B9A\u4E49\u9884\u8BBE + \u7248\u5F0F\u53C2\u6570\uFF08\u843D\u6B3E\u5BF9\u9F50\u3001\u7ED3\u6784\u5C42\u4F4D\u7F6E\u3001\u7248\u8BB0\u5206\u9875\u3001\u9996\u53E5\u6807\u7C97\u7B49\uFF09\u6253\u5305\u4E3A JSON\u3002").addButton((b) => b.setButtonText("\u5BFC\u51FA JSON").setCta().onClick(() => void this.plugin.exportSettingsJson()));
    new import_obsidian5.Setting(containerEl).setName("\u5BFC\u5165\u8BBE\u7F6E").setDesc("\u4ECE\u672C\u5E93 redquill-settings-*.json \u5907\u4EFD\u6062\u590D\uFF0C\u6216\u7C98\u8D34\u5176\u4ED6\u673A\u5668\u5BFC\u51FA\u7684 JSON\u3002\u5BFC\u5165\u81EA\u52A8\u6821\u9A8C\uFF0C\u975E\u6CD5\u9879\u56DE\u9ED8\u8BA4\u3002").addButton((b) => b.setButtonText("\u5BFC\u5165\u2026").onClick(() => new SettingsBackupModal(this.plugin).open()));
  }
  /** 公文模板清单：按行文方向三组折叠（对上/平级/对下），勾选 + 单独安装 + 批量 */
  async renderTemplateSection(containerEl, seq) {
    const adapter = this.plugin.app.vault.adapter;
    let folder;
    try {
      folder = await this.plugin.templateFolder();
    } catch {
      return;
    }
    if (seq !== this.renderSeq) return;
    const box = containerEl.createEl("div", { cls: "redquill-template-list" });
    const tpHint = this.plugin.isTemplaterInstalled() ? "\u68C0\u6D4B\u5230 Templater\uFF1A\u5B89\u88C5\u65F6\u540C\u65F6\u5199\u5165\u300C(\u5F39\u7A97)\u300D\u7248\u3002" : "\u672A\u68C0\u6D4B\u5230 Templater\uFF1A\u53EA\u5B89\u88C5\u666E\u901A\u7248\uFF08\u88C5 Templater \u540E\u91CD\u88C5\u53EF\u8865\u5F39\u7A97\u7248\uFF09\u3002";
    new import_obsidian5.Setting(box).setName("\u6279\u91CF\u5B89\u88C5").setDesc(`\u5199\u5165\u300C${folder}\u300D\uFF08\u5DF2\u5B58\u5728\u7684\u4E0D\u8986\u76D6\uFF09\u3002\u63D2\u5165\u7528 Obsidian\u300C\u63D2\u5165\u6A21\u677F\u300D\u6216 Templater\u3002${tpHint}`).addButton(
      (btn) => btn.setButtonText("\u5B89\u88C5\u6240\u9009").onClick(async () => {
        const keys = this.plugin.settings.templateSelection.filter((k) => GONGWEN_TEMPLATES[k]);
        if (!keys.length) {
          new import_obsidian5.Notice("RedQuill\uFF1A\u5148\u52FE\u9009\u8981\u5B89\u88C5\u7684\u6587\u79CD\u3002");
          return;
        }
        const r = await this.plugin.installTemplates(keys);
        new import_obsidian5.Notice(installResultText(r), 6e3);
        this.display();
      })
    ).addButton(
      (btn) => btn.setButtonText("\u5168\u90E8\u5B89\u88C5").onClick(async () => {
        const r = await this.plugin.installTemplates(Object.keys(GONGWEN_TEMPLATES));
        new import_obsidian5.Notice(installResultText(r), 6e3);
        this.display();
      })
    );
    for (const group of TEMPLATE_GROUPS) {
      const details = box.createEl("details", { cls: "redquill-tgroup" });
      const selCount = group.keys.filter((k) => this.plugin.settings.templateSelection.includes(k)).length;
      details.createEl("summary", {
        text: `${group.label}\uFF08${group.keys.length} \u4E2A\u6587\u79CD\uFF0C\u5DF2\u9009 ${selCount}\uFF09`
      });
      for (const key of group.keys) {
        const meta = TEMPLATE_META[key] ?? { label: key, desc: "" };
        let installed = false;
        let installedTp = false;
        try {
          installed = await adapter.exists(`${folder}/${key}.md`);
          installedTp = await adapter.exists(`${folder}/${key}(\u5F39\u7A97).md`);
        } catch {
        }
        if (seq !== this.renderSeq) return;
        const status = installed || installedTp ? " \xB7 \u5DF2\u5B89\u88C5" : "";
        const tag2 = installed && installedTp ? "\uFF08\u542B\u5F39\u7A97\u7248\uFF09" : installedTp ? "\uFF08\u4EC5\u5F39\u7A97\u7248\uFF09" : "";
        const selected = this.plugin.settings.templateSelection.includes(key);
        new import_obsidian5.Setting(details).setName(`${meta.label}${status}${tag2}`).setDesc(meta.desc).addToggle(
          (tg) => tg.setValue(selected).onChange(async (v) => {
            const cur = new Set(this.plugin.settings.templateSelection);
            if (v) cur.add(key);
            else cur.delete(key);
            this.plugin.settings.templateSelection = [...cur];
            await this.plugin.saveSettings();
          })
        ).addExtraButton(
          (b) => b.setIcon("download").setTooltip("\u5B89\u88C5\u6B64\u6A21\u677F").onClick(async () => {
            const r = await this.plugin.installTemplates([key]);
            new import_obsidian5.Notice(
              r.created || r.tpCreated ? `RedQuill\uFF1A\u5DF2\u5B89\u88C5\u300C${meta.label}\u300D${r.tpCreated ? "\uFF08\u542B\u5F39\u7A97\u7248\uFF09" : ""}\u3002` : `RedQuill\uFF1A\u300C${meta.label}\u300D\u5DF2\u5B58\u5728\uFF0C\u672A\u8986\u76D6\u3002`
            );
            this.display();
          })
        );
      }
    }
  }
};

// src/editing/plugin.ts
var import_view = require("@codemirror/view");
var import_state = require("@codemirror/state");

// src/editing/segments.ts
function isCjk(cp) {
  return cp >= 13312 && cp <= 19903 || // CJK 扩展 A
  cp >= 19968 && cp <= 40959 || // CJK 基本
  cp >= 63744 && cp <= 64255 || // CJK 兼容
  cp >= 131072 && cp <= 195103;
}
function segClsOf(ch) {
  if (!ch) return "other";
  const cp = ch.codePointAt(0);
  if (isCjk(cp)) return "cjk";
  if (cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 95)
    return "alnum";
  return "other";
}
var isBlank = (ch) => ch === " " || ch === "	" || ch === "\n" || ch === "\r";
function wordSegmentAt(text, offset) {
  const len = text.length;
  if (!len) return null;
  const pos = Math.max(0, Math.min(offset, len - 1));
  const ch = text[pos];
  if (isBlank(ch)) return null;
  const cls = segClsOf(ch);
  if (cls === "other") {
    let s2 = pos, e2 = pos;
    while (s2 > 0 && text[s2 - 1] === ch) s2--;
    while (e2 + 1 < len && text[e2 + 1] === ch) e2++;
    return [s2, e2 + 1];
  }
  let s = pos, e = pos;
  while (s > 0 && segClsOf(text[s - 1]) === cls) s--;
  while (e + 1 < len && segClsOf(text[e + 1]) === cls) e++;
  return [s, e + 1];
}
function lineRangeAt(text, offset) {
  const len = text.length;
  const cur = Math.max(0, Math.min(offset, len));
  const lineStart = text.lastIndexOf("\n", cur - 1) + 1;
  let lineEnd = text.indexOf("\n", cur);
  if (lineEnd === -1) lineEnd = len;
  if (lineEnd > lineStart && text[lineEnd - 1] === "\r") lineEnd--;
  return [lineStart, lineEnd];
}
var isBlankLine = (text, s, e) => text.slice(s, e).trim() === "";
function blockRangeAt(text, offset) {
  const len = text.length;
  if (!len) return [0, 0];
  const [lineStart, lineEnd] = lineRangeAt(text, offset);
  if (isBlankLine(text, lineStart, lineEnd)) return [lineStart, lineEnd];
  let start = lineStart;
  while (start > 0) {
    const prevEnd = start - 1;
    const prevStart = text.lastIndexOf("\n", prevEnd - 1) + 1;
    if (isBlankLine(text, prevStart, prevEnd)) break;
    start = prevStart;
  }
  let end = lineEnd;
  while (end < len) {
    const nextStart = end + 1;
    const raw = text.indexOf("\n", nextStart);
    const nextEnd = raw === -1 ? len : raw;
    if (isBlankLine(text, nextStart, nextEnd)) break;
    end = nextEnd;
  }
  return [start, end];
}
function titleLineRangeAt(text, block2, offset) {
  const [s, e] = block2;
  if (e <= s) return [s, e];
  const [lineStart, lineEnd] = lineRangeAt(text, s);
  if (lineStart === s) {
    const line = text.slice(lineStart, lineEnd);
    if (/^#{1,6}\s+/.test(line)) {
      const curLine = lineRangeAt(text, Math.max(0, Math.min(offset, text.length)))[0];
      return curLine === s ? [lineStart, lineEnd] : [s, e];
    }
  }
  return [s, e];
}

// src/editing/quotes.ts
function hasCjkNear(text, offset, win = 40) {
  const from = Math.max(0, offset - win);
  const to = Math.min(text.length, offset + win);
  for (let i = from; i < to; i++) {
    if (segClsOf(text[i]) === "cjk") return true;
  }
  return false;
}
function inFence(text, offset) {
  const cur = Math.max(0, Math.min(offset, text.length));
  const upTo = text.slice(0, cur);
  const lines = upTo.split("\n");
  const curLine = lines.length - 1;
  if (/^\s*```/.test(lines[curLine] ?? "")) return false;
  let fence = 0;
  for (let i = 0; i < curLine; i++) {
    if (/^\s*```/.test(lines[i])) fence++;
  }
  return fence % 2 === 1;
}
function quotePairAt(text, offset) {
  const len = text.length;
  if (!len) return null;
  const pos = Math.max(0, Math.min(offset, len));
  if (inFence(text, pos)) return null;
  const before = pos > 0 ? text[pos - 1] : "";
  const after = pos < len ? text[pos] : "";
  if (after === "\u201D") return { type: "jump", replacement: "", from: pos + 1, to: pos + 1 };
  const winStart = Math.max(0, pos - 40);
  for (let i = pos - 1; i >= winStart; i--) {
    const ch = text[i];
    if (ch === "\u201C") {
      if (after !== "\u201D")
        return { type: "close", replacement: "\u201D", from: pos + 1, to: pos + 1 };
      break;
    }
    if (ch === "\u201D") break;
  }
  const prevIsAlnum = !!before && segClsOf(before) === "alnum";
  const nextIsAlnum = !!after && segClsOf(after) === "alnum";
  if (prevIsAlnum || nextIsAlnum) return null;
  if (!hasCjkNear(text, pos)) return null;
  return { type: "open", replacement: "\u201C\u201D", from: pos + 1, to: pos + 1 };
}
function curlyWrapDelta(text, a, b) {
  const s = Math.max(0, Math.min(a, text.length));
  const e = Math.max(s, Math.min(b, text.length));
  if (e <= s) {
    return { from: s, to: s, insert: "\u201C\u201D", anchor: s + 1, head: s + 1 };
  }
  return {
    from: s,
    to: e,
    insert: "\u201C" + text.slice(s, e) + "\u201D",
    anchor: s + 1,
    head: e + 1
  };
}

// src/editing/plugin.ts
var dblclickSegment = import_view.ViewPlugin.fromClass(
  class {
    constructor(view) {
      this.view = view;
    }
  },
  {
    eventHandlers: {
      dblclick(event, view) {
        const pos = view.posAtCoords({ x: event.clientX, y: event.clientY });
        if (pos === null || pos === void 0) return false;
        const seg = wordSegmentAt(view.state.doc.toString(), pos);
        if (!seg) return false;
        const [s, e] = seg;
        const sel = view.state.selection.main;
        if (sel.from === s && sel.to === e) return true;
        view.dispatch({
          selection: import_state.EditorSelection.single(s, e),
          scrollIntoView: true,
          userEvent: "select.pointer"
        });
        return true;
      }
    }
  }
);
var quoteInput = import_view.EditorView.inputHandler.of(
  (view, from, to, text) => {
    if (text !== '"' || from !== to) return false;
    const r = quotePairAt(view.state.doc.toString(), from);
    if (!r) return false;
    if (r.type === "jump" && r.replacement === "") {
      view.dispatch({ selection: import_state.EditorSelection.single(r.from, r.to), scrollIntoView: true });
    } else {
      view.dispatch({
        changes: { from, to, insert: r.replacement },
        selection: import_state.EditorSelection.single(r.from, r.to),
        scrollIntoView: true
      });
    }
    return true;
  }
);
function buildEditingExtensions() {
  return [dblclickSegment, quoteInput];
}

// src/editing/inline.ts
function inlineReplace(text, a, b, mark) {
  const len = text.length;
  const s = Math.max(0, Math.min(a, len));
  const e = Math.max(s, Math.min(b, len));
  const ml = mark.length;
  if (ml === 0) return { from: s, to: e, insert: text.slice(s, e), anchor: s, head: e };
  if (e > s && s >= ml && text.slice(s - ml, s) === mark && text.slice(e, e + ml) === mark) {
    return { from: s - ml, to: e + ml, insert: text.slice(s, e), anchor: s - ml, head: e - ml };
  }
  if (e <= s) {
    return { from: s, to: s, insert: mark + mark, anchor: s + ml, head: s + ml };
  }
  return {
    from: s,
    to: e,
    insert: mark + text.slice(s, e) + mark,
    anchor: s + ml,
    head: e + ml
  };
}

// src/editing/listops.ts
var LIST_RE = /^\s*(?:[-*+]|\d{1,3}[.)])\s+/;
function breakList(text, offset) {
  const len = text.length;
  const cur = Math.max(0, Math.min(offset, len));
  const lineStart = text.lastIndexOf("\n", cur - 1) + 1;
  let lineEnd = text.indexOf("\n", cur);
  if (lineEnd === -1) lineEnd = len;
  if (lineEnd > lineStart && text[lineEnd - 1] === "\r") lineEnd--;
  const line = text.slice(lineStart, lineEnd);
  if (!LIST_RE.test(line)) return null;
  if (cur < lineEnd && text.slice(cur, lineEnd).trim() !== "") return null;
  const hasNl = lineEnd < len && text[lineEnd] === "\n";
  return {
    from: lineEnd,
    to: lineEnd,
    insert: hasNl ? "\n" : "\n\n",
    cursor: lineEnd + 1
  };
}
function listToPlain(text) {
  return text.replace(/^(\s*)(?:[-*+]|\d{1,3}[.)])\s+/gm, "$1");
}

// src/main.ts
var import_state2 = require("@codemirror/state");
var VIEW_TYPE_PREVIEW = "redquill-preview";
var VIEW_TYPE_WRITEASSIST = "redquill-write";
var VIEW_TYPE_PANEL = "redquill-panel";
var RedQuillPlugin = class extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS, autoClean: false };
    /** 公文上下文手动覆盖闸门（会话级，不入 data.json） */
    this.contextGate = new ContextGate();
  }
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE_PREVIEW, (leaf) => new PreviewView(leaf, this));
    this.registerView(VIEW_TYPE_WRITEASSIST, (leaf) => new WriteAssistView(leaf, this));
    this.registerView(VIEW_TYPE_PANEL, (leaf) => new RedQuillPanelView(leaf, this));
    this.registerEditorExtension(buildEditingExtensions());
    this.addSettingTab(new RedQuillSettingTab(this.app, this));
    this.addRibbonIcon("file-text", "\u6392\u7248\u9884\u89C8", () => this.openPreview());
    this.addRibbonIcon("pen-tool", "\u5199\u4F5C\u8F85\u52A9\uFF08\u8DDF\u968F\u5149\u6807\u8BCA\u65AD\u6807\u9898\u5C42\u7EA7\uFF09", () => this.openWriteAssistBtn());
    this.addCommand({ id: "open-preview", name: "\u6253\u5F00\u6392\u7248\u9884\u89C8", callback: () => this.openPreview() });
    this.addCommand({
      id: "open-writeassist",
      name: "\u6253\u5F00\u5199\u4F5C\u8F85\u52A9\u9762\u677F\uFF08\u6807\u9898\u5C42\u7EA7\u8BCA\u65AD\u4E0E\u5FEB\u6377\u63D2\u5165\uFF09",
      callback: () => this.openWriteAssistBtn()
    });
    this.addCommand({
      id: "open-panel",
      name: "\u6253\u5F00\u901A\u7528\u5199\u4F5C\u9762\u677F\uFF08\u5B57\u6570/\u516B\u6761\u4F53\u68C0\u901F\u89C8/\u6807\u9898\u6811/\u5FEB\u6377\u63D2\u5165\uFF09",
      callback: () => this.openPanel()
    });
    this.addCommand({
      id: "new-gongwen-doc",
      name: "\u65B0\u5EFA\u516C\u6587\uFF08\u9009\u6587\u79CD \u2192 \u8F93\u6807\u9898\uFF0C\u9ED8\u8BA4\u53D1\u6587\u673A\u5173\u81EA\u52A8\u9884\u586B\uFF09",
      callback: () => new NewGongwenWizard(this).open()
    });
    this.addCommand({
      id: "paste-clean",
      name: "\u7C98\u8D34\u5E76\u51C0\u5316\uFF08\u6E05\u6D17\u526A\u8D34\u677F\u683C\u5F0F\u540E\u63D2\u5165\u5149\u6807\u5904\uFF0C\u516C\u6587/\u901A\u7528\u540C\u5F15\u64CE\uFF09",
      editorCallback: (editor) => void this.pasteClean(editor)
    });
    this.addCommand({
      id: "clean-selection",
      name: "\u6E05\u6D17\u9009\u533A / \u5F53\u524D\u6BB5\uFF08\u53BB\u884C\u9996\u5C3E\u7A7A\u683C\u4E0E\u591A\u4F59\u7A7A\u884C\uFF09",
      editorCallback: (editor) => this.cleanSelection(editor)
    });
    this.addCommand({
      id: "gongwen-check",
      name: "\u516C\u6587\u6392\u7248\u4F53\u68C0\uFF08\u5F53\u524D\u7B14\u8BB0\uFF09",
      callback: () => this.runCheckOnActive()
    });
    this.addCommand({
      id: "export-docx",
      name: "\u5BFC\u51FA\u5F53\u524D\u7B14\u8BB0\u4E3A docx",
      callback: () => this.exportActiveDocx()
    });
    this.addCommand({
      id: "install-gongwen-templates",
      name: "\u5B89\u88C5\u516C\u6587\u6A21\u677F\u5230\u6A21\u677F\u6587\u4EF6\u5939\uFF0816 \u6587\u79CD\uFF0C\u5DF2\u88C5 Templater \u65F6\u9644\u5E26\u5F39\u7A97\u7248\uFF09",
      callback: () => this.installGongwenTemplates()
    });
    this.addCommand({
      id: "check-typo",
      name: "\u6392\u7248\u4F53\u68C0\xB7\u901A\u7528\u516B\u6761\uFF08\u5F53\u524D\u7B14\u8BB0\uFF1A\u91CD\u590D\u6807\u70B9/\u534A\u89D2\u6DF7\u7528/\u4E2D\u82F1\u7A7A\u683C/\u62EC\u53F7\u5F15\u53F7/\u76F4\u5F15\u53F7/\u53E0\u5B57/\u63A7\u5236\u5B57\u7B26/\u5168\u89D2\u7A7A\u683C\uFF09",
      callback: () => this.runCheckTypoOnActive()
    });
    this.addCommand({
      id: "fix-typo",
      name: "\u4E00\u952E\u4FEE\u590D\u6392\u7248\xB7\u901A\u7528\u516B\u6761\uFF08\u5F53\u524D\u7B14\u8BB0\uFF0C\u4EC5\u65E0\u6B67\u4E49\u9879\uFF0C\u9010\u884C\u53EF\u64A4\u9500\uFF09",
      editorCallback: (editor) => this.runFixTypo(editor)
    });
    this.addCommand({
      id: "cycle-context",
      name: "\u5207\u6362\u516C\u6587\u6A21\u5F0F\uFF08\u81EA\u52A8\u5224\u5B9A \u2192 \u5F3A\u5236\u516C\u6587 \u2192 \u5F3A\u5236\u901A\u7528\uFF0C\u5FAA\u73AF\uFF1B\u4F1A\u8BDD\u7EA7\uFF0C\u5207\u56DE\u81EA\u52A8\u540E\u6309 frontmatter \u91CD\u5224\uFF09",
      callback: () => this.cycleContext()
    });
    this.addCommand({
      id: "select-block",
      name: "\u9009\u4E2D\u5F53\u524D\u6BB5 / \u6807\u9898\u884C\uFF08md \u5757\u8BED\u4E49\uFF1A\u8FDE\u7EED\u5217\u8868/\u5F15\u7528\u4E0D\u62C6\uFF0C\u6807\u9898\u884C\u53EA\u9009\u6807\u9898\u672C\u8EAB\uFF09",
      editorCallback: (editor) => this.selectBlock(editor)
    });
    this.addCommand({
      id: "select-word-segment",
      name: "\u9009\u4E2D\u5149\u6807\u5904\u8BCD\u6BB5\uFF08\u4E2D\u6587\u6309\u8BED\u4E49\u8FB9\u754C\uFF1A\u4E2D/\u82F1/\u6570\u5206\u6D41\uFF0C\u6807\u70B9\u4E0D\u7C98\u8FDE\uFF09",
      editorCallback: (editor) => this.selectWordSegment(editor)
    });
    this.addCommand({
      id: "quote-wrap",
      name: "\u4E2D\u6587\u5F2F\u5F15\u53F7\u5305\u88F9\u9009\u533A\uFF08\u65E0\u9009\u533A\u5219\u63D2\u5165\u4E00\u5BF9\uFF0C\u5149\u6807\u5C45\u4E2D\uFF09",
      editorCallback: (editor) => this.quoteWrap(editor)
    });
    for (const [id, mark, label] of [
      ["bold", "**", "\u52A0\u7C97"],
      ["italic", "*", "\u659C\u4F53"],
      ["strike", "~~", "\u5220\u9664\u7EBF"],
      ["highlight", "==", "\u9AD8\u4EAE"],
      ["code", "`", "\u884C\u5185\u4EE3\u7801"]
    ]) {
      this.addCommand({
        id: `toggle-inline-${id}`,
        name: `\u884C\u5185\u683C\u5F0F\uFF1A${label}\uFF08\u5DF2\u6709\u540C\u6807\u8BB0\u5219\u5265\u79BB\uFF0C\u65E0\u9009\u533A\u63D2\u5165\u7A7A\u5BF9\uFF09`,
        editorCallback: (editor) => this.toggleInlineMark(editor, mark)
      });
    }
    this.addCommand({
      id: "break-list",
      name: "\u6253\u65AD\u5217\u8868\uFF08\u5149\u6807\u5728\u5217\u8868\u9879\u884C\u5C3E\u65F6\u8DF3\u51FA\u56DE\u6B63\u6587\u6BB5\u843D\uFF09",
      editorCallback: (editor) => this.breakListAt(editor)
    });
    this.addCommand({
      id: "list-to-plain",
      name: "\u5217\u8868\u8F6C\u7EAF\u6587\u672C\uFF08\u9009\u533A\u6216\u5F53\u524D\u6BB5\u9010\u884C\u53BB\u5217\u8868\u524D\u7F00\uFF0C\u4FDD\u7559\u7F29\u8FDB\uFF09",
      editorCallback: (editor) => this.listToPlainAt(editor)
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
        const html2 = evt.clipboardData?.getData("text/html") ?? "";
        const text = evt.clipboardData?.getData("text/plain") ?? "";
        const cleaned = cleanPaste({ html: html2, text });
        if (!html2 || !cleaned || cleaned === (text || "").trim()) return;
        evt.preventDefault();
        hit.editor.replaceSelection(cleaned);
        new import_obsidian6.Notice("RedQuill\uFF1A\u5DF2\u81EA\u52A8\u51C0\u5316\u7C98\u8D34\uFF08\u53BB\u683C\u5F0F\u3001\u538B\u7A7A\u884C\uFF09\u3002", 4e3);
      },
      { capture: true }
    );
  }
  async loadSettings() {
    const raw = await this.loadData();
    const s = sanitizeSettings(raw, (k) => !!GONGWEN_TEMPLATES[k]);
    this.settings = { ...s, autoClean: raw?.autoClean === true };
    if (!this.allPresets().some((p) => p.id === this.settings.activePresetId)) {
      this.settings.activePresetId = BUILTIN_PRESETS[0].id;
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  /** 全部预设：内置（含用户修改覆盖）+ 自定义 */
  allPresets() {
    const merged = BUILTIN_PRESETS.map((b) => this.settings.builtinOverrides.find((o) => o.id === b.id) ?? b);
    return [...merged, ...this.settings.customPresets];
  }
  /** 当前活动预设（缺失时回落第一个内置） */
  activePreset() {
    return this.allPresets().find((p) => p.id === this.settings.activePresetId) ?? BUILTIN_PRESETS[0];
  }
  /** 结构层位置参数包（落款对齐 + 各要素左空/右空 → 预览与 docx 导出共用） */
  structLayout() {
    const s = this.settings;
    return {
      signatureAlign: s.signatureAlign,
      signatureRightChars: s.signatureRightChars,
      signatureLeftChars: s.signatureLeftChars,
      attachIndentChars: s.attachIndentChars,
      notesIndentChars: s.notesIndentChars,
      colophonLeftChars: s.colophonLeftChars,
      printRightChars: s.printRightChars,
      copiesRightChars: s.copiesRightChars
    };
  }
  /** 内置预设的修改覆盖项（无则未修改过） */
  builtinOverrideFor(id) {
    return this.settings.builtinOverrides.find((o) => o.id === id);
  }
  /** 保存内置预设的修改（写入覆盖层）并刷新预览 */
  async saveBuiltinOverride(p) {
    const i = this.settings.builtinOverrides.findIndex((x) => x.id === p.id);
    if (i !== -1) this.settings.builtinOverrides[i] = p;
    else this.settings.builtinOverrides.push(p);
    await this.saveSettings();
    this.refreshPreviewViews();
  }
  /** 内置预设重置为出厂默认（删除覆盖层） */
  async resetBuiltinPreset(id) {
    this.settings.builtinOverrides = this.settings.builtinOverrides.filter((o) => o.id !== id);
    await this.saveSettings();
    this.refreshPreviewViews();
  }
  /** 保存自定义预设并刷新预览 */
  async saveCustomPreset(p) {
    const i = this.settings.customPresets.findIndex((x) => x.id === p.id);
    if (i !== -1) this.settings.customPresets[i] = p;
    await this.saveSettings();
    this.refreshPreviewViews();
  }
  /** 设置变更后刷新已打开的预览面板 */
  refreshPreviewViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_PREVIEW)) {
      leaf.view.render();
    }
  }
  /* ------------------------------------------------------------------ */
  /* v0.11.0 写作提效：向导 / 粘贴清洗 / 写作辅助面板                        */
  /* ------------------------------------------------------------------ */
  /** 新建公文向导落盘（见 NewGongwenDraftModal）：默认机关/标题/当年替换 → 当前文件夹建文件 → 打开 */
  async createGongwenDoc(item, title) {
    const { fileName, content } = buildNewGongwen({
      templateKey: item.key,
      title: title.trim() || void 0,
      agency: this.settings.defaultAgency
    });
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    const dir = mv?.file?.parent?.path ?? "";
    const exists = async (pp) => {
      try {
        return await this.app.vault.adapter.exists(pp);
      } catch {
        return false;
      }
    };
    let p = dir ? `${dir}/${fileName}` : fileName;
    const base = fileName.replace(/\.md$/i, "");
    for (let i = 2; await exists(p); i++) p = dir ? `${dir}/${base} ${i}.md` : `${base} ${i}.md`;
    const f = await this.app.vault.create(p, content);
    const leaf = this.app.workspace.getLeaf("tab");
    await leaf.openFile(f);
  }
  /** 粘贴为公文正文：读剪贴板（html 优先）→ 清洗 → 替换光标选区 */
  async pasteClean(editor) {
    let html2 = "";
    let text = "";
    try {
      const cb = navigator.clipboard;
      if (cb?.read) {
        for (const item of await cb.read()) {
          const t = await item.getType("text/html").then((b) => b.text()).catch(() => null);
          if (t) html2 = t;
          const tx = await item.getType("text/plain").then((b) => b.text()).catch(() => null);
          if (tx) text = tx;
        }
      } else if (cb?.readText) {
        text = await cb.readText();
      }
    } catch {
    }
    if (!html2 && !text) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BFB\u4E0D\u5230\u526A\u8D34\u677F\u3002\u8BF7\u5148\u590D\u5236\u5185\u5BB9\uFF0C\u6216\u7C98\u8D34\u540E\u8FD0\u884C\u300C\u6E05\u6D17\u9009\u533A / \u5F53\u524D\u6BB5\u300D\u3002", 6e3);
      return;
    }
    const cleaned = cleanPaste({ html: html2, text });
    if (!cleaned) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u526A\u8D34\u677F\u4E2D\u6CA1\u6709\u53EF\u7C98\u8D34\u7684\u6587\u5B57\u5185\u5BB9\u3002", 4e3);
      return;
    }
    editor.replaceSelection(cleaned);
    new import_obsidian6.Notice("RedQuill\uFF1A\u5DF2\u6E05\u6D17\u63D2\u5165\uFF08\u53BB\u884C\u9996\u5C3E\u7A7A\u683C\u3001\u538B\u7F29\u591A\u4F59\u7A7A\u884C\uFF09\u3002", 5e3);
  }
  /** 清洗选区 / 当前段（不依赖剪贴板：把选中文本或光标所在行按公文规则规整） */
  cleanSelection(editor) {
    const sel = editor.getSelection();
    if (sel.trim()) {
      editor.replaceSelection(cleanPaste({ text: sel }));
      new import_obsidian6.Notice("RedQuill\uFF1A\u9009\u533A\u5DF2\u6E05\u6D17\u3002", 4e3);
      return;
    }
    const cursor = editor.getCursor();
    const line = editor.getLine(cursor.line);
    const cleaned = cleanPaste({ text: line });
    if (cleaned === line) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5F53\u524D\u884C\u672C\u5C31\u5E72\u51C0\uFF08\u65E0\u884C\u9996\u5C3E\u7A7A\u683C/\u591A\u4F59\u7A7A\u884C\uFF09\u3002", 4e3);
      return;
    }
    editor.replaceRange(cleaned, { line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
    new import_obsidian6.Notice("RedQuill\uFF1A\u5F53\u524D\u884C\u5DF2\u6E05\u6D17\u3002", 4e3);
  }
  /* ------------------------------------------------------------------ */
  /* v1.1 编辑器手感命令实现（④⑤⑦）：纯函数 delta → CM6 dispatch 单事务      */
  /* ------------------------------------------------------------------ */
  /** 取 CM6 EditorView：Obsidian 1.4+ 编辑器内核即 CM6（registerEditorExtension 生效的前提），Editor 实例上带非官方 cm 桥 */
  cmOf(editor) {
    const cm = editor.cm;
    return cm && typeof cm.dispatch === "function" ? cm : null;
  }
  /** ④ 选中当前段 / 标题行：空行界定 md 块，标题行只选标题本身（纯选择事务，不改内容） */
  selectBlock(editor) {
    const cm = this.cmOf(editor);
    if (!cm) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BF7\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u4F7F\u7528\u3002", 4e3);
      return;
    }
    const text = cm.state.doc.toString();
    const cur = cm.state.selection.main.head;
    const [s, e] = titleLineRangeAt(text, blockRangeAt(text, cur), cur);
    if (s >= e) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5149\u6807\u5728\u7A7A\u884C\u4E0A\uFF0C\u65E0\u53EF\u9009\u4E2D\u5185\u5BB9\u3002", 3e3);
      return;
    }
    cm.dispatch({ selection: import_state2.EditorSelection.single(s, e), scrollIntoView: true });
  }
  /** ④ 选中光标处词段（命令版；双击自动版走 buildEditingExtensions）：中/英/数分流、标点不粘连 */
  selectWordSegment(editor) {
    const cm = this.cmOf(editor);
    if (!cm) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BF7\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u4F7F\u7528\u3002", 4e3);
      return;
    }
    const text = cm.state.doc.toString();
    const seg = wordSegmentAt(text, cm.state.selection.main.head);
    if (!seg) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5149\u6807\u4E0D\u5728\u8BCD\u6BB5\u4E0A\uFF08\u7A7A\u767D/\u6807\u70B9\u533A\uFF09\u3002", 3e3);
      return;
    }
    cm.dispatch({ selection: import_state2.EditorSelection.single(seg[0], seg[1]), scrollIntoView: true });
  }
  /** ⑤ 中文弯引号包裹选区（无选区 → 插 “” 光标居中）；自动成对走扩展，本命令供手动兜底/快捷键 */
  quoteWrap(editor) {
    const cm = this.cmOf(editor);
    if (!cm) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BF7\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u4F7F\u7528\u3002", 4e3);
      return;
    }
    const text = cm.state.doc.toString();
    const { from, to } = cm.state.selection.main;
    const d = curlyWrapDelta(text, from, to);
    cm.dispatch({
      changes: { from: d.from, to: d.to, insert: d.insert },
      selection: import_state2.EditorSelection.single(d.anchor, d.head),
      scrollIntoView: true
    });
  }
  /** ⑤ 行内格式 toggle（mark 由调用方指定：** * ~~ == `）：有同标记剥离、无选区插空对、否则包裹——单事务一次 undo */
  toggleInlineMark(editor, mark) {
    const cm = this.cmOf(editor);
    if (!cm) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BF7\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u4F7F\u7528\u3002", 4e3);
      return;
    }
    const text = cm.state.doc.toString();
    const { from, to } = cm.state.selection.main;
    const d = inlineReplace(text, from, to, mark);
    cm.dispatch({
      changes: { from: d.from, to: d.to, insert: d.insert },
      selection: import_state2.EditorSelection.single(d.anchor, d.head),
      scrollIntoView: true
    });
  }
  /** ⑦ 打断列表：光标在列表项行尾 → 行尾插空行跳出列表（单事务一次 undo）；不满足条件提示 */
  breakListAt(editor) {
    const cm = this.cmOf(editor);
    if (!cm) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BF7\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u4F7F\u7528\u3002", 4e3);
      return;
    }
    const text = cm.state.doc.toString();
    const cur = cm.state.selection.main.head;
    const d = breakList(text, cur);
    if (!d) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5149\u6807\u9700\u5728\u5217\u8868\u9879\u884C\u5C3E\uFF08\u4E14\u884C\u5185\u65E0\u5F85\u7EED\u5185\u5BB9\uFF09\u624D\u80FD\u6253\u65AD\u3002", 4e3);
      return;
    }
    cm.dispatch({
      changes: { from: d.from, to: d.to, insert: d.insert },
      selection: import_state2.EditorSelection.single(d.cursor),
      scrollIntoView: true
    });
  }
  /** ⑦ 列表转纯文本：选区存在则作用于选区；否则作用于光标所在 md 块（空行界定） */
  listToPlainAt(editor) {
    const cm = this.cmOf(editor);
    if (!cm) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u8BF7\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u4F7F\u7528\u3002", 4e3);
      return;
    }
    const text = cm.state.doc.toString();
    const { from, to } = cm.state.selection.main;
    const s = from === to ? blockRangeAt(text, to)[0] : from;
    const e = from === to ? blockRangeAt(text, to)[1] : to;
    if (s >= e) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u6CA1\u6709\u53EF\u5904\u7406\u7684\u5217\u8868\u5185\u5BB9\u3002", 3e3);
      return;
    }
    const out = listToPlain(text.slice(s, e));
    if (out === text.slice(s, e)) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u9009\u533A/\u5F53\u524D\u6BB5\u4E0D\u542B\u5217\u8868\u6807\u8BB0\uFF0C\u65E0\u9700\u8F6C\u6362\u3002", 3e3);
      return;
    }
    cm.dispatch({
      changes: { from: s, to: e, insert: out },
      selection: import_state2.EditorSelection.single(s),
      scrollIntoView: true
    });
  }
  /** 打开写作辅助面板：已有则复用并显示，否则在右侧栏新建（ribbon/命令/设置页共用） */
  openWriteAssistBtn() {
    const existing = this.app.workspace.getLeavesOfType(VIEW_TYPE_WRITEASSIST)[0];
    if (existing) {
      this.app.workspace.revealLeaf(existing);
      existing.view.renderPanel();
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false);
    if (!leaf) return;
    void leaf.setViewState({ type: VIEW_TYPE_WRITEASSIST, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  /** 打开通用写作面板（五卡）：已有则复用并显示，否则在右侧栏新建 */
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
  /**
   * 打开预览面板（0.3.3：不再走侧边栏）。
   * - split（默认）：与当前 md 笔记左右分屏；找不到 md 笔记时回落新标签页
   * - tab：主工作区新标签页
   */
  async openPreview() {
    const { workspace } = this.app;
    const mv = workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    const currentFile = mv?.file ?? null;
    const existing = workspace.getLeavesOfType(VIEW_TYPE_PREVIEW)[0];
    if (existing) {
      workspace.revealLeaf(existing);
      const view = existing.view;
      if (currentFile && view.file !== currentFile) {
        view.file = currentFile;
        await view.render();
      }
      return;
    }
    let leaf;
    if (this.settings.previewOpenMode === "split") {
      const hasMd = mv || workspace.getLeavesOfType("markdown").length > 0;
      leaf = hasMd ? workspace.getLeaf("split", "vertical") : workspace.getLeaf(true);
    } else {
      leaf = workspace.getLeaf(true);
    }
    await leaf.setViewState({ type: VIEW_TYPE_PREVIEW, active: true });
    workspace.revealLeaf(leaf);
    if (currentFile) {
      const view = leaf.view;
      if (view.file !== currentFile) {
        view.file = currentFile;
        await view.render();
      }
    }
  }
  async exportActiveDocx() {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    if (!mv?.file) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5F53\u524D\u6CA1\u6709\u6253\u5F00\u7684 md \u7B14\u8BB0\u3002");
      return;
    }
    const md = await this.app.vault.cachedRead(mv.file);
    const { meta, blocks, attach } = parseDocument(md);
    const warn = validateDocNumber(meta.docNumber);
    if (warn) new import_obsidian6.Notice(`RedQuill\uFF1A${warn}`, 8e3);
    const { logo, seal } = await this.resolveLogo(meta);
    const blob = await buildDocxBlob(blocks, this.activePreset(), {
      firstSentenceBold: this.settings.firstSentenceBold,
      meta,
      logo,
      seal,
      attach,
      colophonMode: this.settings.colophonMode,
      struct: this.structLayout()
    });
    const path = mv.file.path.replace(/\.md$/i, ".docx");
    await this.app.vault.adapter.writeBinary(path, await blob.arrayBuffer());
    new import_obsidian6.Notice(`RedQuill\uFF1A\u5DF2\u5BFC\u51FA ${path}`);
  }
  /** 公文排版体检：读当前笔记 → 有错开报告弹窗，无错 Notice 通过（命令与预览按钮共用） */
  async openCheck(file) {
    const md = await this.app.vault.cachedRead(file);
    const issues = checkDocument(md);
    if (!issues.length) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u6392\u7248\u4F53\u68C0\u901A\u8FC7\uFF0C\u672A\u53D1\u73B0\u95EE\u9898\u3002", 4e3);
      return;
    }
    new CheckReportModal(this, file, issues).open();
  }
  /** 命令入口：体检当前打开的 md 笔记 */
  async runCheckOnActive() {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    if (!mv?.file) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5F53\u524D\u6CA1\u6709\u6253\u5F00\u7684 md \u7B14\u8BB0\u3002");
      return;
    }
    await this.openCheck(mv.file);
  }
  /* ---- 通用八条体检 / 修复 / 上下文切换（v1.0.0 合一注入） ---- */
  /** 通用八条体检：读当前笔记 → issues 弹 CheckReportModal（与公文体检共用弹窗） */
  runCheckTypoOnActive() {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    if (!mv?.file) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5F53\u524D\u6CA1\u6709\u6253\u5F00\u7684 md \u7B14\u8BB0\u3002");
      return;
    }
    const issues = checkDocument2(mv.editor.getValue());
    if (!issues.length) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u901A\u7528\u516B\u6761\u4F53\u68C0\u901A\u8FC7\uFF0C\u672A\u53D1\u73B0\u95EE\u9898\u3002", 4e3);
      return;
    }
    new CheckReportModal(this, mv.file, issues).open();
  }
  /** 一键修复通用八条：只改有变动的行（replaceRange 逐行，保留 Ctrl+Z 撤销） */
  runFixTypo(editor) {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    if (!mv) return;
    const text = editor.getValue();
    const fixed = fixAll(text);
    if (fixed === text) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u6CA1\u6709\u53EF\u81EA\u52A8\u4FEE\u590D\u7684\u95EE\u9898\uFF08\u53EA\u4FEE\u65E0\u6B67\u4E49\u9879\uFF09\u3002", 4e3);
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
    new import_obsidian6.Notice(`RedQuill\uFF1A\u5DF2\u4FEE\u590D ${changed} \u884C\uFF08Ctrl+Z \u53EF\u9010\u884C\u64A4\u9500\uFF09\u3002`, 5e3);
  }
  /** 上下文三态循环：auto（frontmatter 自动判定）→ 强制公文 → 强制通用 → auto */
  cycleContext() {
    const next = this.contextGate.mode === "auto" ? "gongwen" : this.contextGate.mode === "gongwen" ? "generic" : "auto";
    this.contextGate.setMode(next);
    const label = next === "auto" ? "\u81EA\u52A8\u5224\u5B9A\uFF08\u6309 frontmatter \u662F\u5426\u542B\u516C\u6587\u6807\u8BB0\uFF09" : next === "gongwen" ? "\u5F3A\u5236\u516C\u6587" : "\u5F3A\u5236\u901A\u7528";
    new import_obsidian6.Notice(
      `RedQuill\uFF1A\u4E0A\u4E0B\u6587 \u2192 ${label}${next === "auto" ? "" : "\u3002\u518D\u6B21\u8FD0\u884C\u672C\u547D\u4EE4\u53EF\u5207\u56DE\u81EA\u52A8"}`,
      5e3
    );
  }
  /* ---- v0.8.0 设置导出 / 导入（随库同步，多机换机同版式） ---- */
  /** 导出全部设置到 vault 根 JSON：{app, kind, version, exportedAt, settings} */
  async exportSettingsJson() {
    const d = /* @__PURE__ */ new Date();
    const p2 = (n) => String(n).padStart(2, "0");
    const name = `redquill-settings-${d.getFullYear()}${p2(d.getMonth() + 1)}${p2(d.getDate())}-${p2(d.getHours())}${p2(d.getMinutes())}${p2(d.getSeconds())}.json`;
    const payload = {
      app: "redquill",
      kind: "redquill-settings",
      version: 1,
      exportedAt: d.toISOString(),
      settings: this.settings
    };
    try {
      await this.app.vault.create(name, JSON.stringify(payload, null, 2));
      new import_obsidian6.Notice(`RedQuill\uFF1A\u5DF2\u5BFC\u51FA ${name}\uFF08vault \u6839\u76EE\u5F55\uFF0C\u968F\u5E93\u540C\u6B65\u53EF\u6362\u673A\u5BFC\u5165\uFF09`, 6e3);
    } catch (e) {
      new import_obsidian6.Notice(`RedQuill\uFF1A\u5BFC\u51FA\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`, 6e3);
    }
  }
  /** vault 内 redquill-settings-*.json 备份文件（按修改时间倒序） */
  backupFiles() {
    return this.app.vault.getFiles().filter((f) => /^redquill-settings-.*\.json$/i.test(f.name)).sort((a, b) => b.stat.mtime - a.stat.mtime);
  }
  /** 从 JSON 文本导入并清洗（兼容整包 / 裸 settings / data.json 三种形状）；返回导入的自定义预设数 */
  async importSettingsText(json, fromName) {
    const raw = JSON.parse(json);
    if (!raw || typeof raw !== "object") throw new Error("JSON \u9876\u5C42\u4E0D\u662F\u5BF9\u8C61");
    const s = raw.settings && typeof raw.settings === "object" && raw.kind === "redquill-settings" ? raw.settings : raw;
    const merged = sanitizeSettings(
      { ...s, activePresetId: s?.activePresetId ?? this.settings.activePresetId },
      (k) => !!GONGWEN_TEMPLATES[k]
    );
    this.settings = { ...merged, autoClean: s?.autoClean === true };
    if (!this.allPresets().some((p) => p.id === this.settings.activePresetId)) {
      this.settings.activePresetId = BUILTIN_PRESETS[0].id;
    }
    await this.saveSettings();
    this.refreshPreviewViews();
    new import_obsidian6.Notice(`RedQuill\uFF1A\u5DF2\u4ECE ${fromName} \u5BFC\u5165\u8BBE\u7F6E\uFF08${merged.customPresets.length} \u4E2A\u81EA\u5B9A\u4E49\u9884\u8BBE\uFF09`, 6e3);
    return merged.customPresets.length;
  }
  /** 公文属性中文表单入口：预填当前笔记已有 rh-* 值 */
  async openFormModal() {
    const mv = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
    if (!mv?.file) {
      new import_obsidian6.Notice("RedQuill\uFF1A\u5F53\u524D\u6CA1\u6709\u6253\u5F00\u7684 md \u7B14\u8BB0\u3002");
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
  async resolveLogo(meta) {
    const out = {};
    const readImg = async (path, key) => {
      const p = path?.trim();
      if (!p) return false;
      try {
        if (!await this.app.vault.adapter.exists(p)) {
          new import_obsidian6.Notice(`RedQuill\uFF1Arh-${key} \u6307\u5411\u7684\u6587\u4EF6\u4E0D\u5B58\u5728\uFF1A${p}`);
          return false;
        }
        const ext = /\.(jpe?g)$/i.test(p) ? "jpg" : "png";
        const data = await this.app.vault.adapter.readBinary(p);
        if (key === "logo") {
          out.logoUrl = this.app.vault.adapter.getResourcePath(p);
          out.logo = { data, ext };
        } else {
          out.sealUrl = this.app.vault.adapter.getResourcePath(p);
          out.seal = { data, ext };
        }
        return true;
      } catch (e) {
        new import_obsidian6.Notice(`RedQuill\uFF1Arh-${key} \u8BFB\u53D6\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`);
        return false;
      }
    };
    await readImg(meta.logo ?? "", "logo");
    await readImg(meta.seal ?? "", "seal");
    return out;
  }
  /** 检测模板文件夹：核心模板插件 → Templater → 默认 templates */
  async templateFolder() {
    const anyApp = this.app;
    const core = anyApp.internalPlugins?.getEnabledPluginById?.("templates")?.options?.folder ?? anyApp.internalPlugins?.getPluginById?.("templates")?.instance?.options?.folder;
    if (core) return core;
    try {
      const data = JSON.parse(await this.app.vault.adapter.read(".obsidian/plugins/templater-obsidian/data.json"));
      if (data?.templates_folder) return data.templates_folder;
    } catch {
    }
    return "templates";
  }
  /** 检测 Templater 是否已启用（决定是否附带写入弹窗版模板） */
  isTemplaterInstalled() {
    const anyApp = this.app;
    return !!anyApp.plugins?.plugins?.["templater-obsidian"];
  }
  /**
   * 把公文骨架 md 写进模板文件夹（已存在的不覆盖），返回安装结果。
   * 已启用 Templater 时，同名「(弹窗)」版同时写入：插入时弹窗输入标题/机关/字号，落款日期自动。
   */
  async installTemplates(keys) {
    const folder = await this.templateFolder();
    const adapter = this.app.vault.adapter;
    if (!await adapter.exists(folder)) await adapter.mkdir(folder);
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
        const tpPath = `${folder}/${key}(\u5F39\u7A97).md`;
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
  async installGongwenTemplates() {
    const r = await this.installTemplates(Object.keys(GONGWEN_TEMPLATES));
    const tpPart = r.tpCreated ? `\uFF1B\u5F39\u7A97\u7248 ${r.tpCreated} \u4E2A${r.tpSkipped ? `\u3001\u8DF3\u8FC7 ${r.tpSkipped} \u4E2A` : ""}` : "";
    new import_obsidian6.Notice(
      `RedQuill\uFF1A\u6A21\u677F\u6587\u4EF6\u5939\u300C${r.folder}\u300D\u65B0\u5EFA ${r.created} \u4E2A${r.skipped ? `\u3001\u8DF3\u8FC7\u5DF2\u5B58\u5728 ${r.skipped} \u4E2A` : ""}${tpPart}\u3002\u4F7F\u7528\uFF1A\u547D\u4EE4\u9762\u677F\u641C\u300C\u63D2\u5165\u6A21\u677F\u300D\uFF08\u6216 Templater\uFF09\u9009\u62E9\u516C\u6587\u6A21\u677F\u3002`,
      8e3
    );
  }
};
var main_default = RedQuillPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GONGWEN_TEMPLATES,
  RedQuillPlugin,
  VIEW_TYPE_PANEL,
  VIEW_TYPE_PREVIEW,
  VIEW_TYPE_WRITEASSIST,
  applyFrontmatter,
  toTemplaterSkeleton
});
/*! Bundled license information:

docx/dist/index.mjs:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  (*!
  * The buffer module from node.js, for the browser.
  *
  * @author   Feross Aboukhadijeh <https://feross.org>
  * @license  MIT
  *)
  (*! http://mths.be/fromcodepoint v0.1.0 by @mathias *)

docx/dist/index.mjs:
  (*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)
*/
