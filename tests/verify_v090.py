#!/usr/bin/env python3
"""verify_v090.py —— 联合行文 / 红头多机关（v0.9.0）。

覆盖：
  A/B/C. splitAgencies + fitAgencySizePt + preview 多机关渲染（entry_v090.ts）
  D. docx（sample_agency.md gongwen-standard）：两机关两行红头（红色 33pt 居中）、
     机关名完整、红线 1 条、导出成功；单机关（sample_struct.md）仍 1 行 66 half-pt 无回归
  E. 超长机关名（动态样例）→ docx 红头字号自适应降号（sz < 66 half-pt）
  F. 全角斜杠 ／ 在 docx 侧同样拆两行（动态样例）
"""
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
AGENCY = ROOT / "tests" / "samples" / "sample_agency.md"
GOOD = ROOT / "tests" / "samples" / "sample_struct.md"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
TMP = Path("/tmp/redhead_v090")
TMP.mkdir(exist_ok=True)

PASS = 0
FAIL = []


def ok(name: str, cond: bool, detail: str = "") -> None:
    global PASS
    if cond:
        PASS += 1
    else:
        FAIL.append(f"{name}: {detail}")


def docx_of(md_file, out: str, extra=None) -> str:
    args = [NODE, str(CLI), str(md_file), "-o", str(TMP / out), "--preset", "gongwen-standard"]
    if extra:
        args += extra
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode != 0:
        FAIL.append(f"{out}: CLI 失败 {r.stderr.strip()[:150]}")
        return ""
    return zipfile.ZipFile(TMP / out).read("word/document.xml").decode("utf-8")


def red_runs(xml: str) -> list:
    """红头机关段落里的 run 文本 + 字号（half-pt）+ 颜色"""
    found = []
    for p in re.findall(r"<w:p\b.*?</w:p>", xml, re.DOTALL):
        if "w:color" not in p:
            continue
        col = re.search(r'w:color w:val="([0-9A-Fa-f]{6})"', p)
        sz = re.search(r'<w:sz w:val="(\d+)"', p)
        if col and sz:
            texts = re.findall(r"<w:t[^>]*>([^<]*)</w:t>", p)
            found.append({"texts": texts, "sz": int(sz.group(1)), "color": col.group(1)})
    return found


# ---- A/B/C: entry ----
entry = TMP / "entry_v090.cjs"
subprocess.run([ESBUILD, "tests/entry_v090.ts", "--bundle", "--format=cjs", "--platform=node",
                "--outfile=" + str(entry)], cwd=ROOT, check=True, capture_output=True)
r = subprocess.run([NODE, str(entry)], capture_output=True, text=True)
for line in r.stdout.splitlines():
    if line.startswith("PB-OK:"):
        PASS += 1
    elif line.startswith("PB-FAIL:"):
        FAIL.append("entry: " + line[8:])
if r.returncode != 0 and not any("PB-FAIL" in l for l in r.stdout.splitlines()):
    FAIL.append(f"entry 崩溃: {r.stderr.strip()[:200]}")

# ---- D: 联合行文 docx ----
xml = docx_of(AGENCY, "agency.docx")
if xml:
    runs = red_runs(xml)
    ok("D.两行红头", len(runs) == 2, f"got {len(runs)} runs {runs}")
    if len(runs) == 2:
        ok("D.字号33pt", runs[0]["sz"] == 66 and runs[1]["sz"] == 66, f"{[x['sz'] for x in runs]}")
        ok("D.红色FF0000", all(x["color"].upper() == "FF0000" for x in runs), f"{[x['color'] for x in runs]}")
        ok("D.机关名完整", "中共云溪镇委员会" in runs[0]["texts"][0] and "云溪镇人民政府" in runs[1]["texts"][0],
           f"{runs}")
        ok("D.两行不粘连", runs[0]["texts"][0] != runs[1]["texts"][0])
    # 分隔线红线仍一条（红头段落边框 color FF0000）
    red_lines = len(re.findall(r'<w:pBdr>.*?w:color="FF0000"', xml, re.DOTALL))
    ok("D.红线1条", red_lines >= 1, f"red border lines={red_lines}")
    ok("D.标题共存", "关于联合开展农村人居环境整治专项行动的通知" in xml)

# ---- D2: 单机关无回归（sample_struct → 1 行 66） ----
xml2 = docx_of(GOOD, "single.docx")
if xml2:
    runs2 = red_runs(xml2)
    ok("D2.单机关仍1行", len(runs2) == 1, f"got {len(runs2)}")
    if runs2:
        ok("D2.字号33pt", runs2[0]["sz"] == 66, f"{runs2[0]['sz']}")
        ok("D2.机关名", "云溪镇人民政府文件" in runs2[0]["texts"][0], f"{runs2[0]['texts']}")

# ---- E: 超长机关名 docx 降号 ----
LONG = "中国共产党云溪镇农村人居环境整治工作领导小组办公室"
p_long = TMP / "long_agency.md"
p_long.write_text("\n".join([
    "---", f"rh-agency: {LONG} / 云溪镇人民政府",
    "rh-docNumber: 云委发〔2026〕8号", "rh-date: 2026年9月5日", "rh-signature: A单位",
    "---", "", "# 关于联合开展整治行动的通知", "", "正文。",
]), encoding="utf-8")
xml3 = docx_of(p_long, "long.docx")
if xml3:
    runs3 = red_runs(xml3)
    ok("E.两行", len(runs3) == 2, f"got {len(runs3)}")
    if runs3:
        ok("E.降号<33pt", runs3[0]["sz"] < 66 and runs3[1]["sz"] < 66, f"{[x['sz'] for x in runs3]}")
        ok("E.两行同字号", runs3[0]["sz"] == runs3[1]["sz"], f"{[x['sz'] for x in runs3]}")

# ---- F: 全角斜杠 ／ docx 侧同样拆两行 ----
p_fw = TMP / "fw_slash.md"
p_fw.write_text("\n".join([
    "---", "rh-agency: 中共云溪镇委员会／云溪镇人民政府",
    "rh-docNumber: 云委发〔2026〕8号", "rh-date: 2026年9月5日", "rh-signature: A单位",
    "---", "", "# 关于XX的通知", "", "正文。",
]), encoding="utf-8")
xml4 = docx_of(p_fw, "fw.docx")
if xml4:
    runs4 = red_runs(xml4)
    ok("F.全角斜杠拆两行", len(runs4) == 2, f"got {len(runs4)} {runs4}")

print(f"v090: {PASS} 项通过" + ("" if not FAIL else f"，失败 {len(FAIL)}：\n" + "\n".join(FAIL)))
sys.exit(1 if FAIL else 0)
