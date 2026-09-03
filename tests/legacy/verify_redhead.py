#!/usr/bin/env python3
"""verify_redhead.py —— 红头（版头）功能机器校验 v0.3.2
断言清单：frontmatter 解析 / 红头要素渲染 / frontmatter 不泄漏进正文 / 签发人对排
用法：python3 tests/verify_redhead.py
"""

import re
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLI = ROOT / "dist" / "cli.js"
OUT1 = ROOT / "tests" / "out_redhead.docx"
OUT2 = ROOT / "tests" / "out_updoc.docx"
import os
import shutil
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"

results: list[tuple[bool, str]] = []


def check(ok: bool, name: str) -> None:
    results.append((ok, name))


def doc_xml(docx: Path) -> str:
    with zipfile.ZipFile(docx) as z:
        return z.read("word/document.xml").decode("utf-8")


# ---- 1. 导出下行文样例（无签发人）----
subprocess.run([NODE, str(CLI), "tests/samples/sample_notice.md", "-o", str(OUT1)],
               cwd=ROOT, check=True, capture_output=True)
xml1 = doc_xml(OUT1)

check("××镇人民政府文件" in xml1, "机关标志文本写入")
check("FF0000" in xml1, "红色（机关标志/分隔线）写入")
check("×政发〔2026〕18号" in xml1, "发文字号写入")
check("000001" in xml1, "份号写入")
check("redhead" not in xml1, "frontmatter 键名不泄漏进正文")
check("urgency" not in xml1 and "secretLevel" not in xml1, "空要素不渲染")
check("签发人" not in xml1, "无签发人时不输出签发人栏")

# ---- 2. 导出上行文样例（有签发人）----
subprocess.run([NODE, str(CLI), "tests/samples/sample_updoc.md", "-o", str(OUT2)],
               cwd=ROOT, check=True, capture_output=True)
xml2 = doc_xml(OUT2)

check("××县教育体育局" in xml2, "上行文机关标志写入")
check("签发人：张三" in xml2, "签发人写入")
check('w:br w:type="page"' not in xml2, "正文未受污染")
check("redhead" not in xml2, "上行文 frontmatter 不泄漏")
# 红色分隔线：底边框段落
check(re.search(r'w:bottom[^>]*w:val="single"[^>]*w:color="FF0000"', xml2) is not None,
      "红色分隔线（段落底边框）写入")
# 签发人右制表位存在
check('w:tab w:val="right"' in xml2, "签发人右制表位写入")

# ---- 3. 预览 HTML 同源校验 ----
esbuild = ROOT / "node_modules" / ".bin" / "esbuild"
subprocess.run([str(esbuild), "tests/preview_entry.ts", "--bundle", "--format=cjs",
                "--outfile=tests/.tmp_preview.cjs"], cwd=ROOT, check=True, capture_output=True)
out = subprocess.run([NODE, "tests/preview_check.cjs"], cwd=ROOT, check=True,
                     capture_output=True, text=True)
html = __import__("json").loads(out.stdout)
html1, html2 = html["html1"], html["html2"]
check("rg-redhead" in html1, "预览渲染红头容器")
check("#ff0000" in html1.lower(), "预览红色写入")
check("××镇人民政府文件" in html1, "预览机关标志写入")
check("签发人" not in html1, "预览无签发人时不输出")
check("签发人：张三" in html2, "预览签发人写入")

# ---- 汇总 ----
failed = [n for ok, n in results if not ok]
for ok, n in results:
    print(("✅" if ok else "❌"), n)
print(f"\n{len(results) - len(failed)}/{len(results)} 通过")
sys.exit(1 if failed else 0)
