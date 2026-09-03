#!/usr/bin/env python3
"""verify_v060.py —— md 表格支持（v0.6.0）。

覆盖（md 表格 → 全链路）：
  A. mdast 解析：数据表 → table 块、仅表头表跳过、md 对齐标记映射（entry_v060.ts）
  B. preview 渲染：<table>/<th> 数量、默认居中、左右对齐标记、table 角色字号字体
  C. docx（CLI gongwen-standard）：<w:tbl> ×2、行数、表头加粗/跨页、单实线边框、
     固定布局、列宽均分、字号 14pt 仿宋、表1 默认居中、表2 左/中/右、内容不丢不串行
  D. 日常预设冒烟（table 角色 11pt）
  E. 版记分页与表格共存回归（off/auto/force 均成功导出）
"""
import json
import os
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
CLI = ROOT / "dist" / "cli.js"
SAMPLE = ROOT / "tests" / "samples" / "sample_table.md"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
TMP = Path("/tmp/redhead_v060")
TMP.mkdir(exist_ok=True)

PASS = 0
FAIL = []


def ok(name: str, cond: bool, detail: str = "") -> None:
    global PASS
    if cond:
        PASS += 1
    else:
        FAIL.append(f"{name}: {detail}")


def run_cli(args: list[str], out: str) -> str:
    r = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(TMP / out), "--preset", "gongwen-standard"] + args,
                       capture_output=True, text=True)
    if r.returncode != 0:
        FAIL.append(f"{out}: CLI 失败 {r.stderr.strip()}")
        return ""
    return zipfile.ZipFile(TMP / out).read("word/document.xml").decode("utf-8")


def tables(xml: str) -> list[str]:
    return re.findall(r"<w:tbl\b.*?</w:tbl>", xml, re.DOTALL)


# ---- A/B: 解析 + preview（esbuild 临时入口，与既有脚本同法） ----
entry = TMP / "entry_v060.cjs"
subprocess.run([ESBUILD, "tests/entry_v060.ts", "--bundle", "--format=cjs", "--platform=node",
                "--outfile=" + str(entry)], cwd=ROOT, check=True, capture_output=True)
r = subprocess.run([NODE, str(entry), str(SAMPLE)], capture_output=True, text=True)
for line in r.stdout.splitlines():
    if line.startswith("PB-OK:"):
        PASS += 1
    elif line.startswith("PB-FAIL:"):
        FAIL.append("preview: " + line[8:])
if r.returncode != 0 and not any("PB-FAIL" in l for l in r.stdout.splitlines()):
    FAIL.append(f"entry 崩溃: {r.stderr.strip()[:200]}")

# ---- C: docx gongwen-standard ----
xml = run_cli([], "table.docx")
t = tables(xml)
ok("C.两个tbl", len(t) == 2, f"got {len(t)}")
if len(t) >= 2:
    for i, tb in enumerate(t):
        tag = "表1" if i == 0 else "表2"
        rows = re.findall(r"<w:tr\b.*?</w:tr>", tb, re.DOTALL)
        ok(f"C.{tag}行数3", len(rows) == 3, f"got {len(rows)}")
        ok(f"C.{tag}表头跨页", "w:tblHeader" in tb)
        ok(f"C.{tag}固定布局", 'w:type="fixed"' in tb)
        single_cnt = tb.count('w:val="single"')
        ok(f"C.{tag}单实线6", single_cnt == 6, f"single={single_cnt}")
        ok(f"C.{tag}字号14pt", 'w:val="28"' in tb)
        ok(f"C.{tag}仿宋", 'w:eastAsia="仿宋_GB2312"' in tb)
    bolds = sum(len(re.findall(r"<w:b(?:\s+w:val=\"(?:true|1)\")?/>", tb)) for tb in t)
    ok("C.表头加粗6格", bolds == 6, f"got {bolds}")
    widths = set(int(x) for x in re.findall(r'<w:tcW[^>]*w:w="(\d+)"', xml))
    ok("C.列宽均分(2948±2)", any(abs(w - 2948) <= 2 for w in widths), f"widths={sorted(widths)}")
    jcs = [re.findall(r'<w:jc w:val="(\w+)"', tb) for tb in t]
    ok("C.表1全居中", set(jcs[0]) == {"center"}, f"{jcs[0]}")
    ok("C.表2左中右", set(jcs[1]) == {"left", "center", "right"}, f"{jcs[1]}")
ok("C.仅表头不渲染", "仅表头" not in xml)
ok("C.内容完整", all(s in xml for s in ["云溪村", "桃园社区", "环卫所", "水利站", "污水沟渠清理"]))
ok("C.表格文字不串行", xml.count("云溪村") == 1, f"count={xml.count('云溪村')}")
ok("C.标题与表格共存", "关于下达2026年秋季农村人居环境整治任务的通知" in xml)

# ---- D: generic-simple 冒烟（table 角色 11pt → w:val=22） ----
r = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(TMP / "table_generic.docx"), "--preset", "generic-simple"],
                   capture_output=True, text=True)
if r.returncode != 0:
    FAIL.append("D: generic CLI 失败 " + r.stderr.strip()[:120])
else:
    gx = zipfile.ZipFile(TMP / "table_generic.docx").read("word/document.xml").decode("utf-8")
    ok("D.日常预设导出成功且含表", bool(re.search(r"<w:tbl\b", gx)) and 'w:val="22"' in gx)

# ---- E: 版记分页三态与表格共存 ----
for mode in ["off", "auto", "force"]:
    r = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(TMP / f"table_col_{mode}.docx"),
                        "--preset", "gongwen-standard", "--colophon-mode", mode], capture_output=True, text=True)
    ok(f"E.colophon-{mode} 导出成功", r.returncode == 0, (r.stderr or r.stdout).strip()[:120])

print(f"v060: {PASS} 项通过" + ("" if not FAIL else f"，失败 {len(FAIL)}：\n" + "\n".join(FAIL)))
sys.exit(1 if FAIL else 0)
