#!/usr/bin/env python3
"""RedHead v0.11.0 校验：写作提效五件套。
A. entry_v0110.ts 纯函数层（一、识别 / 粘贴清洗 / 行角色 / 向导 / defaultAgency）
B. sample_v0110 导出 docx：裸写「一、」→ 黑体一级标题顶格；含句号段首序数仍是正文
   （带首行缩进）；### （一）楷体二级不受影响；frontmatter 不泄漏
C. 预览 HTML 同源文本齐全。全过输出 PASS 总数。"""

import json
import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
CLI = ROOT / "dist" / "cli.js"
SAMPLE = ROOT / "tests" / "samples" / "sample_v0110.md"
OUT = ROOT / "tests" / "out_v0110.docx"
ENTRY_CJS = ROOT / "tests" / ".tmp_v0110_entry.cjs"
PREVIEW_CJS = ROOT / "tests" / ".tmp_v0110_preview.cjs"

passed, failed = [], []


def check(cond: bool, name: str):
    (passed if cond else failed).append(name)
    print(("  ✅ " if cond else "  ❌ ") + name)


def doc_xml(path: Path) -> str:
    with zipfile.ZipFile(path) as z:
        return z.read("word/document.xml").decode("utf-8")


def own_ppr(xml: str, needle: str) -> str:
    """文本所在段落自己的属性区（<w:p 起、</w:p> 止）——避免 600 字符窗口吞到相邻段误报。

    定位：段起始取 needle 前最近的 <w:p> 或 <w:p ...>（两者取更近者，max）；
    段结束取 needle 后第一个 </w:p>（文本在 <w:t> 内，本段结束必是最近一个）。
    黑体/sz/楷体等字链在 run 级 rPr（</w:pPr> 之后、文本之前），故区间须含到 </w:p>；
    又因不跨段，不会吞进相邻段 pPr 的 firstLine。"""
    i = xml.find(needle)
    if i < 0:
        return ""
    p_start = max(xml.rfind("<w:p>", 0, i), xml.rfind("<w:p ", 0, i))
    if p_start < 0:
        return ""
    seg_end = xml.find("</w:p>", i)
    if seg_end < 0:
        return ""
    return xml[p_start:seg_end]


# ---- A. 纯函数层 ----
print("== 纯函数层 entry_v0110 ==")
subprocess.run(
    [ESBUILD, "tests/entry_v0110.ts", "--bundle", "--format=cjs", "--platform=node",
     "--outfile=tests/.tmp_v0110_entry.cjs"],
    cwd=ROOT, check=True, capture_output=True)
r = subprocess.run([NODE, str(ENTRY_CJS)], capture_output=True, text=True, cwd=ROOT)
print((r.stdout or r.stderr).strip().splitlines()[-6:])
check(r.returncode == 0, "entry_v0110 全部断言通过（exit 0）")

# ---- B. CLI 导出：裸写一、识别链路 ----
print("== docx 导出（sample_v0110）==")
r2 = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(OUT), "--preset", "gongwen-standard"],
                    capture_output=True, text=True)
check(r2.returncode == 0, f"CLI 导出成功（{r2.stdout.strip() or r2.stderr.strip()[:60]}）")
xml = doc_xml(OUT)

# 一、总体目标 → 一级标题（黑体三号=16pt、顶格无首行缩进）
i_h1 = xml.find("一、总体目标")
check(i_h1 > 0, "裸写「一、总体目标」进入 docx")
own = own_ppr(xml, "一、总体目标")
check('w:eastAsia="黑体"' in own, "一级标题黑体字链（eastAsia 黑体）")
check('w:sz w:val="32"' in own, "一级标题三号 16pt（half-pt 32）")
check("firstLine" not in own, "一级标题顶格（无首行缩进）")

# 含句号段首序数 → 仍是正文（首行缩进 2 字 640 twips）
i_body = xml.find("一、加强组织领导。")
check(i_body > 0, "含句号段首序数进入 docx")
own_b = own_ppr(xml, "一、加强组织领导。")
check('w:firstLine="640"' in own_b, "正文首行缩进 2 字（640 twips）")
check("黑体" not in own_b, "正文段不含黑体字链（回落仿宋）")

# ### （一）→ 楷体二级标题（原有 md 标题写法不受影响）
i_h2 = xml.find("（一）健全保洁队伍")
check(i_h2 > 0, "### （一）二级标题进入 docx")
own_h2 = own_ppr(xml, "（一）健全保洁队伍")
check("楷体" in own_h2, "二级标题楷体字链")

# 三、保障措施 也黑体一级
i_h1c = xml.find("三、保障措施")
check(i_h1c > 0, "「三、保障措施」进入 docx")

# frontmatter 不泄漏
check("rh-agency" not in xml and "docNumber" not in xml, "frontmatter 键名不泄漏")

# 版记要素仍正常（回归）
check("抄送：县农业农村局。" in xml, "版记抄送正常")

# ---- C. 预览 HTML 同源 ----
print("== 预览 HTML ==")
subprocess.run(
    [ESBUILD, "tests/preview_entry_v0110.ts", "--bundle", "--format=cjs", "--platform=node",
     "--outfile=tests/.tmp_v0110_preview.cjs"],
    cwd=ROOT, check=True, capture_output=True)
r3 = subprocess.run([NODE, "-e", """
const { renderPreview, parseDocument, BUILTIN_PRESETS } = require('./tests/.tmp_v0110_preview.cjs');
const fs = require('fs');
const d = parseDocument(fs.readFileSync('tests/samples/sample_v0110.md', 'utf-8'));
const html = renderPreview(d.blocks, BUILTIN_PRESETS[0], { meta: d.meta });
console.log(JSON.stringify({
  title: html.includes('关于开展村庄清洁行动的通知'),
  h1: html.includes('一、总体目标'),
  h1c: html.includes('三、保障措施'),
  body: html.includes('一、加强组织领导。各村要成立'),
  h2: html.includes('（一）健全保洁队伍'),
}));
"""], capture_output=True, text=True, cwd=ROOT)
check(r3.returncode == 0, f"预览渲染执行成功（{r3.stderr.strip()[:80] if r3.returncode else ''}）")
if r3.returncode == 0:
    flags = json.loads(r3.stdout)
    for k, v in flags.items():
        check(v, f"预览断言：{k}")

# ---- 清理 ----
for f in [OUT, ENTRY_CJS, PREVIEW_CJS]:
    f.unlink(missing_ok=True)

print(f"\n{'='*40}\n通过 {len(passed)} / {len(passed) + len(failed)}")
if failed:
    print("失败项：")
    for f in failed:
        print("  ❌ " + f)
    sys.exit(1)
