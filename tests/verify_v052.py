#!/usr/bin/env python3
"""verify_v052.py —— 条件页码域校验（版记偶数页 GB/T 页码两分法，v0.5.2）
断言清单：
  开启 --even-colophon：
    1. 正文末段书签 rhLastBody（bookmarkStart/End）
    2. settings.xml 含 updateFields（打开时自动刷新域）
    3. 节1 页脚：IF { PAGE } > { PAGEREF rhLastBody }（空白页隐藏页码）
    4. 节2 页脚：IF { PAGEREF rhLastBody } = { = { PAGE } - 1 }（无空白页才编页码）
    5. 全部 footer XML 可被 ElementTree 解析（well-formed）
    6. 缓存结果存在（域未求值时退化为普通页码显示）
  不开启（回归）：
    7. 页脚无 IF/PAGEREF、无书签、settings 无 updateFields，普通 PAGE 页码仍在
用法：python3 tests/verify_v052.py
"""

import os
import shutil
import subprocess
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLI = ROOT / "dist" / "cli.js"
SAMPLE = ROOT / "tests" / "samples" / "sample_full.md"
OUT_EVEN = ROOT / "tests" / "out_v052_even.docx"
OUT_PLAIN = ROOT / "tests" / "out_v052_plain.docx"
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

def build(out: Path, even: bool) -> None:
    args = [NODE, str(CLI), str(SAMPLE), "-o", str(out), "--preset", "gongwen-standard"]
    if even:
        args.append("--even-colophon")
    r = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout, r.stderr)
        sys.exit(1)

def parts(docx: Path) -> dict[str, str]:
    with zipfile.ZipFile(docx) as z:
        return {n: z.read(n).decode("utf-8") for n in z.namelist() if n.endswith(".xml")}

print("== 开启 --even-colophon ==")
build(OUT_EVEN, True)
p = parts(OUT_EVEN)

doc = p["word/document.xml"]
ok('w:name="rhLastBody"' in doc, "正文末段书签 rhLastBody 存在")
ok("<w:bookmarkEnd" in doc, "bookmarkEnd 闭合存在")
ok("w:updateFields" in p["word/settings.xml"], "settings.xml 含 updateFields")

footers = {n: s for n, s in p.items() if n.startswith("word/footer")}
allf = "\n".join(footers.values())
ok("PAGEREF rhLastBody" in allf, "页脚含 PAGEREF 书签引用")
ok(" IF " in allf, "页脚含 IF 条件域")
ok(" PAGE " in allf, "页脚含嵌套 PAGE 域")
ok(" - 1 " in allf, "节2 含 = { PAGE } - 1 公式域")
ok(" NUMPAGES " not in allf, "gongwen 样式不含 NUMPAGES 段")
ok("&gt;" in allf, "比较符 > 已 XML 转义")
ok("&quot;" in allf, "IF 结果参数引号已 XML 转义")

# 节1/节2 分工：hideOverflow（> 比较）与 showIfAdjacent（= 比较 + 公式）分属不同 footer 部件
overflow = [n for n, s in footers.items() if " &gt; " in s]
adjacent = [n for n, s in footers.items() if " - 1 " in s and " PAGEREF " in s]
ok(len(overflow) >= 1, f"hideOverflow 页脚存在（{overflow}）")
ok(len(adjacent) >= 1, f"showIfAdjacent 页脚存在（{adjacent}）")
ok(not (set(overflow) & set(adjacent)), "两类条件页脚分属不同部件")

# well-formed：全部 footer 与 document 可解析
for n, s in {**footers, "word/document.xml": doc}.items():
    try:
        ET.fromstring(s)
        ok(True, f"XML well-formed：{n}")
    except ET.ParseError as e:
        ok(False, f"XML well-formed：{n}（{e}）")

# 缓存结果：域未求值时的退化显示（宋体四号页码 run）
ok('<w:t xml:space="preserve">— </w:t>' in allf, "缓存结果含装饰段（— ）")
ok('<w:t xml:space="preserve">1</w:t>' in allf, "缓存结果含页码占位 1")

# v0.5.1 行为保留：双节 + evenPage 分节符在末节
ok(doc.count("<w:sectPr") == 2, "双节结构保留")
ok('w:type w:val="evenPage"' in doc or 'w:val="evenPage"' in doc, "版记节 evenPage 分节符保留")

print("== 不开启（回归） ==")
build(OUT_PLAIN, False)
p2 = parts(OUT_PLAIN)
doc2 = p2["word/document.xml"]
f2 = "\n".join(s for n, s in p2.items() if n.startswith("word/footer"))
ok("PAGEREF" not in f2, "无条件域（PAGEREF 不出现）")
ok(" IF " not in f2, "无 IF 域")
ok('w:name="rhLastBody"' not in doc2, "无书签")
ok("w:updateFields" not in p2["word/settings.xml"], "settings 无 updateFields")
ok(" PAGE " in f2 or "PAGE" in f2, "普通 PAGE 页码保留")

print(f"\nverify_v052 共 {passed} 项全部通过 ✓")
