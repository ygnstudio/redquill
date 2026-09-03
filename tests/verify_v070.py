#!/usr/bin/env python3
"""verify_v070.py —— 公文排版体检（v0.7.0）。

覆盖（CLI --check → JSON 清单）：
  A. sample_check_bad.md（问题行号固定）：5 类问题精确 codes+行号、exit 2
  B. sample_struct.md（全合规）：零问题、exit 0
  C. 动态小样例：signature 无 date（date-missing+行号）、date 早于文号年（date-before-doc-year）、
     agency 无 docNumber（no-doc-number）、date 用横杠（date-format warn）、
     版记缺份数（colophon-copies-missing warn）、空文档（empty-document）
  D. exit code 语义：有 error → 2；仅 warn → 0；干净 → 0
"""
import json
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
CLI = ROOT / "dist" / "cli.js"
GOOD = ROOT / "tests" / "samples" / "sample_struct.md"
BAD = ROOT / "tests" / "samples" / "sample_check_bad.md"
TMP = Path("/tmp/redhead_v070")
TMP.mkdir(exist_ok=True)

PASS = 0
FAIL = []


def ok(name: str, cond: bool, detail: str = "") -> None:
    global PASS
    if cond:
        PASS += 1
    else:
        FAIL.append(f"{name}: {detail}")


def run_check(md_file) -> tuple:
    r = subprocess.run([NODE, str(CLI), str(md_file), "--check"], capture_output=True, text=True)
    try:
        issues = json.loads(r.stdout)
    except Exception:
        issues = []
        FAIL.append(f"{Path(md_file).name}: --check 输出非 JSON：{r.stdout[:200]} / {r.stderr[:200]}")
    return issues, r.returncode


def codes(issues, level=None) -> list:
    return [i["code"] for i in issues if level is None or i["level"] == level]


# ---- A: 坏样例精确 codes + 行号 ----
issues, rc = run_check(BAD)
exp_codes = ["unknown-rh-key", "doc-number-format", "attachment-format", "colophon-incomplete", "heading-skip"]
ok("A.坏样例5类", codes(issues) == exp_codes, f"got {codes(issues)}")
ok("A.exit=2", rc == 2, f"got {rc}")
line_map = {i["code"]: i.get("line") for i in issues}
ok("A.行号定位", line_map == {
    "unknown-rh-key": 6, "doc-number-format": 3, "attachment-format": 5,
    "colophon-incomplete": 10, "heading-skip": 18,
}, f"got {line_map}")
err = [i for i in issues if i["level"] == "error"]
warn = [i for i in issues if i["level"] == "warn"]
ok("A.分级 3错误2建议", len(err) == 3 and len(warn) == 2, f"err={len(err)} warn={len(warn)}")
for it in issues:
    ok(f"A.{it['code']}有message", bool(it["message"]), it["message"])

# ---- B: 全合规样例零问题 ----
issues, rc = run_check(GOOD)
ok("B.合规零问题", issues == [], f"got {issues}")
ok("B.exit=0", rc == 0, f"got {rc}")

# ---- C: 动态小样例 ----
def write(name: str, body: str) -> Path:
    p = TMP / name
    p.write_text(body, encoding="utf-8")
    return p

# C1: 有署名机关无成文日期（rh-signature 在第 8 行）
p = write("c1_no_date.md", "\n".join([
    "---",
    "rh-agency: 云溪镇人民政府文件",
    "rh-docNumber: 云政发〔2026〕6号",
    "rh-signature: 云溪镇人民政府",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C1.date-missing", codes(issues, "error") == ["date-missing"], f"{codes(issues)}")
ok("C1.行号4", next(i for i in issues if i["code"] == "date-missing").get("line") == 4, f"{issues}")
ok("C1.no-doc-number不报", "no-doc-number" not in codes(issues), f"{codes(issues)}")

# C2: 成文日期早于文号年份
p = write("c2_early.md", "\n".join([
    "---",
    "rh-docNumber: 云政发〔2025〕6号",
    "rh-date: 2024年12月30日",
    "rh-signature: 云溪镇人民政府",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C2.date-before-doc-year", "date-before-doc-year" in codes(issues, "error"), f"{codes(issues)}")

# C3: 有 agency+date 但无 docNumber → no-doc-number warn（exit 仍 0）
p = write("c3_no_num.md", "\n".join([
    "---",
    "rh-agency: 云溪镇人民政府文件",
    "rh-date: 2026年9月5日",
    "rh-signature: 云溪镇人民政府",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C3.no-doc-number", codes(issues, "warn") == ["no-doc-number"], f"{codes(issues)}")
ok("C3.仅warn exit0", rc == 0, f"got {rc}")

# C4: 成文日期用横杠 → date-format warn
p = write("c4_dash_date.md", "\n".join([
    "---",
    "rh-date: 2026-09-05",
    "rh-signature: 云溪镇人民政府",
    "rh-cc: 各村",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C4.date-format", "date-format" in codes(issues, "warn"), f"{codes(issues)}")
ok("C4.date-format行号2", next(i for i in issues if i["code"] == "date-format").get("line") == 2, f"{issues}")

# C5: 版记缺印发份数（机关/日期齐、抄送在）→ 仅 copies warn
p = write("c5_no_copies.md", "\n".join([
    "---",
    "rh-date: 2026年9月5日",
    "rh-signature: 云溪镇人民政府",
    "rh-cc: 各村",
    "rh-printOrg: 云溪镇党政办公室",
    "rh-printDate: 2026年9月5日",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C5.colophon-copies-missing", codes(issues, "warn") == ["colophon-copies-missing"], f"{codes(issues)}")
ok("C5.无incomplete", "colophon-incomplete" not in codes(issues), f"{codes(issues)}")

# C6: 版记机关在而印日缺 → incomplete error（行号指向 printOrg 行 5）
p = write("c6_no_pdate.md", "\n".join([
    "---",
    "rh-date: 2026年9月5日",
    "rh-signature: 云溪镇人民政府",
    "rh-printOrg: 云溪镇党政办公室",
    "rh-printCopies: 60",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C6.colophon-incomplete", "colophon-incomplete" in codes(issues, "error"), f"{codes(issues)}")
ok("C6.行号4", next(i for i in issues if i["code"] == "colophon-incomplete").get("line") == 4, f"{issues}")

# C7: 空文档
p = write("c7_empty.md", "")
issues, rc = run_check(p)
ok("C7.empty-document", codes(issues, "warn") == ["empty-document"], f"{codes(issues)}")
ok("C7.exit0", rc == 0, f"got {rc}")

# C8: 成文日期后有署名但无抄送无红头 → signature-missing 只在 agency/cc 存在时 warn —— 这里无 → 不报
p = write("c8_bare_date.md", "\n".join([
    "---",
    "rh-date: 2026年9月5日",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("C8.裸日期不报signature-missing", "signature-missing" not in codes(issues), f"{codes(issues)}")

# C9: 未知键近似提示文本
p = write("c9_typo.md", "\n".join([
    "---",
    "rh-datenumber: 云政发〔2026〕6号",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
u = next((i for i in issues if i["code"] == "unknown-rh-key"), None)
ok("C9.unknown-rh-key", u is not None and u["level"] == "error", f"{issues}")
ok("C9.近似提示docNumber", bool(u) and "rh-docNumber" in u["message"], u and u["message"])
ok("C9.行号2", bool(u) and u.get("line") == 2, f"{issues}")

# ---- D: exit code 语义汇总（上文已覆盖 0 与 2，再验仅 warn 混合） ----
p = write("d1.md", "\n".join([
    "---",
    "rh-date: 2026年9月5日",
    "rh-signature: 云溪镇人民政府",
    "rh-attachments: 方案一、方案二",
    "rh-printOrg: 云溪镇党政办公室",
    "rh-printDate: 2026年9月5日",
    "---",
    "",
    "# 关于XX的通知",
    "",
    "正文。",
]))
issues, rc = run_check(p)
ok("D.仅warn(attachment-format) exit0", "attachment-format" in codes(issues, "warn") and "error" not in [i["level"] for i in issues] and rc == 0,
   f"codes={codes(issues)} rc={rc}")

print(f"v070: {PASS} 项通过" + ("" if not FAIL else f"，失败 {len(FAIL)}：\n" + "\n".join(FAIL)))
sys.exit(1 if FAIL else 0)
