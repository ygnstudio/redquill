#!/usr/bin/env python3
"""verify_v053.py —— 版记分页三态模式校验（off/auto/force，v0.5.3）
断言清单：
  auto + 短公文（一页装得下）：
    1. 单节结构（sectPr 数 = 1）——不拆节，版记随正文留第 1 页
    2. 无书签 / 无 IF+PAGEREF / settings 无 updateFields
    3. 版记段落仍在正文（document.xml 含抄送文案）
  auto + 长公文（多页）：
    4. 双节 + evenPage 分节符（拆到偶数页）
    5. 书签 rhLastBody + IF/PAGEREF 条件域 + updateFields（页码两分法保留）
  force + 短公文（回归 v0.5.2）：
    6. 短公文也强制拆双节（force 语义不变）
  off + 短公文（回归默认）：
    7. 单节、无条件域
用法：python3 tests/verify_v053.py
"""

import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLI = ROOT / "dist" / "cli.js"
SHORT = ROOT / "tests" / "samples" / "sample_short.md"
LONG = ROOT / "tests" / "samples" / "sample_long.md"
OUT_AUTO_SHORT = ROOT / "tests" / "out_v053_auto_short.docx"
OUT_AUTO_LONG = ROOT / "tests" / "out_v053_auto_long.docx"
OUT_FORCE_SHORT = ROOT / "tests" / "out_v053_force_short.docx"
OUT_OFF_SHORT = ROOT / "tests" / "out_v053_off_short.docx"
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"

passed = 0


def ok(cond, label):
    global passed
    if cond:
        passed += 1
        print(f"  PASS {label}")
    else:
        print(f"  FAIL {label}")
        sys.exit(1)


def build(out: Path, sample: Path, mode: str) -> None:
    args = [NODE, str(CLI), str(sample), "-o", str(out), "--preset", "gongwen-standard"]
    if mode != "off":
        args += ["--colophon-mode", mode]
    r = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout, r.stderr)
        sys.exit(1)


def parts(docx: Path) -> dict[str, str]:
    with zipfile.ZipFile(docx) as z:
        return {n: z.read(n).decode("utf-8") for n in z.namelist() if n.endswith(".xml")}


print("== auto + 短公文（应一页不拆） ==")
build(OUT_AUTO_SHORT, SHORT, "auto")
p = parts(OUT_AUTO_SHORT)
doc = p["word/document.xml"]
ok(doc.count("<w:sectPr") == 1, "单节结构（不拆节）")
ok('w:name="rhLastBody"' not in doc, "无书签 rhLastBody")
foot = "\n".join(s for n, s in p.items() if n.startswith("word/footer"))
ok("PAGEREF" not in foot and " IF " not in foot, "页脚无条件域")
ok("w:updateFields" not in p["word/settings.xml"], "settings 无 updateFields")
ok("抄送" in doc, "版记段落随正文（抄送文案在 document.xml）")

print("== auto + 长公文（应拆偶数页） ==")
build(OUT_AUTO_LONG, LONG, "auto")
p = parts(OUT_AUTO_LONG)
doc = p["word/document.xml"]
ok(doc.count("<w:sectPr") == 2, "双节结构")
ok('w:type w:val="evenPage"' in doc or 'w:val="evenPage"' in doc, "evenPage 分节符存在")
ok('w:name="rhLastBody"' in doc, "书签 rhLastBody 存在")
foot = "\n".join(s for n, s in p.items() if n.startswith("word/footer"))
ok("PAGEREF rhLastBody" in foot and " IF " in foot, "条件页码域存在")
ok("w:updateFields" in p["word/settings.xml"], "settings 含 updateFields")

print("== force + 短公文（回归：短也强制拆） ==")
build(OUT_FORCE_SHORT, SHORT, "force")
doc = parts(OUT_FORCE_SHORT)["word/document.xml"]
ok(doc.count("<w:sectPr") == 2, "双节结构（force 恒拆）")

print("== off + 短公文（回归默认） ==")
build(OUT_OFF_SHORT, SHORT, "off")
p = parts(OUT_OFF_SHORT)
doc = p["word/document.xml"]
ok(doc.count("<w:sectPr") == 1, "单节结构")
foot = "\n".join(s for n, s in p.items() if n.startswith("word/footer"))
ok("PAGEREF" not in foot and " IF " not in foot, "无条件域")

print(f"\nverify_v053 共 {passed} 项全部通过 ✓")
