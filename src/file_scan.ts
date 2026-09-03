/**
 * file_scan.ts —— 输入展开：文件 / 目录递归 / 最小 glob（v0.12.0 批量归档）。
 * 零依赖：只支持 `**`（任意层）、`*`（段内任意非 / 串）、`?`（段内单字符），
 * 其余字符按字面匹配。返回一律绝对路径。
 */

import { readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, join, dirname, basename, sep } from 'node:path';

/** 路径是否含 glob 魔法字符 */
export function hasMagic(p: string): boolean {
  return /[*?]/.test(p);
}

/**
 * 最小 glob → RegExp（锚定全串）。
 * 规则：双星号后跟斜杠（即 `**`+`/`）匹配任意层目录（含零层）；
 * 段尾双星号等价 `.*`；单星号 = 段内任意串（不含 /）；问号 = 段内单字符；
 * 其余字符字面（正则转义）。
 */
export function globToRegExp(glob: string): RegExp {
  const norm = glob.replace(/\\/g, '/').replace(/\/+/g, '/');
  let re = '';
  let i = 0;
  const n = norm.length;
  while (i < n) {
    const c = norm[i];
    if (c === '*') {
      if (norm[i + 1] === '*') {
        // `**`：后面跟 `/` → 任意层目录；否则（段尾）→ 任意串
        if (norm[i + 2] === '/') {
          re += '(?:.*/)?';
          i += 3;
        } else {
          re += '.*';
          i += 2;
        }
      } else {
        re += '[^/]*';
        i += 1;
      }
    } else if (c === '?') {
      re += '[^/]';
      i += 1;
    } else {
      re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
      i += 1;
    }
  }
  return new RegExp(`^${re}$`);
}

/** 输入串按目录层级切段（保留 / 分隔语义） */
function segments(p: string): string[] {
  return p.replace(/\\/g, '/').split('/');
}

/**
 * 把含魔法字符的路径拆成 { root, pattern }：
 * root = 首个魔法字符所在段之前的目录（含尾部 / 或不含均可，返回不含）；
 * pattern = 从首个魔法字符所在段起的剩余（相对 root）。
 * 例：`docs/**\/*.md` → root='docs'、pattern='**\/*.md'；`/a/b?.md` → root='/a'、pattern='b?.md'。
 */
export function splitGlobRoot(p: string): { root: string; pattern: string } {
  const segs = segments(p);
  let idx = segs.findIndex((s) => hasMagic(s));
  if (idx < 0) {
    // 无魔法：root 取 dirname，pattern 取 basename（调用方仅在有魔法时使用）
    return { root: dirname(p), pattern: basename(p) };
  }
  const root = segs.slice(0, idx).join('/') || '/';
  const pattern = segs.slice(idx).join('/');
  return { root, pattern };
}

/** 目录名是否应跳过（隐藏目录 / 依赖目录） */
export function isSkippableDir(name: string): boolean {
  return name.startsWith('.') || name === 'node_modules';
}

/** 递归收集目录下全部 .md（绝对路径），跳过隐藏/node_modules 目录 */
export function walkMd(dir: string, out: string[] = []): string[] {
  let ents: string[];
  try {
    ents = readdirSync(dir);
  } catch {
    return out; /* 无权限/不存在目录静默跳过 */
  }
  for (const e of ents) {
    if (isSkippableDir(e)) continue;
    const full = join(dir, e);
    try {
      if (statSync(full).isDirectory()) walkMd(full, out);
      else if (e.toLowerCase().endsWith('.md')) out.push(full);
    } catch {
      /* 断链等跳过 */
    }
  }
  return out;
}

/**
 * 展开一个输入为文件绝对路径列表（去重保序）：
 * - 无魔法：文件本身（存在）；目录 → 递归 *.md；不存在 → 忽略（调用方决定是否报错）
 * - 有魔法：从 root 递归，按 pattern 匹配（匹配路径为相对 root 的 / 分隔尾段）
 */
export function expandInput(input: string, cwd: string): string[] {
  const abs = resolve(cwd, input);
  if (!hasMagic(input)) {
    if (!existsSync(abs)) return [];
    try {
      if (statSync(abs).isDirectory()) return walkMd(abs);
    } catch {
      return [];
    }
    return [abs];
  }
  const { root, pattern } = splitGlobRoot(input);
  const rootAbs = resolve(cwd, root === '/' ? (input.startsWith('/') ? '/' : cwd) : root);
  const rx = globToRegExp(pattern);
  const hits = walkMd(rootAbs).filter((f) => rx.test(f.slice(rootAbs.length + 1).split(sep).join('/')));
  return hits;
}

/** 展开多个输入（文件/目录/glob 混用），按输入序去重 */
export function expandInputs(inputs: string[], cwd: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const inp of inputs) {
    for (const f of expandInput(inp, cwd)) {
      if (!seen.has(f)) {
        seen.add(f);
        out.push(f);
      }
    }
  }
  return out;
}

/**
 * 某 md 相对某输入的子路径（用于 --out-dir 镜像目录树）：
 * - 目录输入：md 在其树内 → 相对路径；否则 null
 * - glob 输入：md 在 glob 根下 → 相对 glob 根；否则 null
 * - 文件输入：md 恰为该文件 → basename；否则 null
 */
export function relativeToInput(mdAbs: string, inp: string, cwd: string): string | null {
  if (hasMagic(inp)) {
    const { root } = splitGlobRoot(inp);
    const baseAbs = resolve(cwd, root === '/' && !inp.startsWith('/') ? cwd : root);
    if (mdAbs.startsWith(baseAbs + sep)) return mdAbs.slice(baseAbs.length + 1);
    return null;
  }
  const abs = resolve(cwd, inp);
  try {
    if (statSync(abs).isDirectory()) {
      if (mdAbs.startsWith(abs + sep)) return mdAbs.slice(abs.length + 1);
      return null;
    }
  } catch {
    return null;
  }
  return mdAbs === abs ? basename(mdAbs) : null;
}

/**
 * 批量输出时文件应落的相对路径：按输入序取第一个命中的子路径；
 * 兜底 basename（正常不会发生——md 必来自某输入）。
 */
export function outRelPath(mdAbs: string, inputs: string[], cwd: string): string {
  for (const inp of inputs) {
    const rel = relativeToInput(mdAbs, inp, cwd);
    if (rel !== null) return rel;
  }
  return basename(mdAbs);
}
