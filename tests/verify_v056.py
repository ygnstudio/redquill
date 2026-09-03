#!/usr/bin/env python3
"""verify_v056.py —— 结构层位置参数（v0.5.6）：落款对齐三档 + 各要素左空/右空设置项。

覆盖（经 CLI --flag / --data 全链路到 docx）：
  1. center：署名/日期段 w:jc center，无右缩进
  2. left + 左空 2：两段 w:ind left=640（3号16pt → 320 twips/字）
  3. 多 flag：附件左空3→960、附注左空1→320、版记抄送左空0→文本无全角空格、
     印发/份数右空0→tab pos=8844（版心宽 156mm）
  4. 默认（GB/T）回归：日期右空4→1280、抄送左空1→全角空格前缀、
     印发右空1→8564、份数右空3→8004
  5. data.json 通道：center + 附注左空1 + 印发右空2 → 8284
  6. 越界兜底：--attach-left 99 忽略 → 仍默认 2（640）
"""
import json
import os
import re
import subprocess
import sys
import zipfile
from typing import Optional

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLI = ["node", os.path.join(ROOT, "dist", "cli.js")]
SAMPLE = os.path.join(ROOT, "tests", "samples", "sample_struct.md")
TMP = "/tmp/redhead_v056"
os.makedirs(TMP, exist_ok=True)

PASS = 0
FAIL = []


def run(args: list[str], name: str) -> str:
    global PASS, FAIL
    out = os.path.join(TMP, f"{name}.docx")
    r = subprocess.run(
        CLI + [SAMPLE, "-o", out, "--preset", "gongwen-standard"] + args,
        capture_output=True,
        text=True,
    )
    if r.returncode != 0:
        FAIL.append(f"{name}: CLI 失败 {r.stderr.strip()}")
        return ""
    return zipfile.ZipFile(out).read("word/document.xml").decode("utf-8")


def ok(name: str, cond: bool, detail: str = "") -> None:
    global PASS, FAIL
    if cond:
        PASS += 1
    else:
        FAIL.append(f"{name}: {detail}")


def para_with(xml: str, exact: Optional[str] = None, contains: Optional[str] = None) -> Optional[str]:
    """返回含精确 <w:t>exact</w:t> 或包含文本片段的段落完整 XML；找不到 None"""
    for p in re.findall(r"<w:p\b.*?</w:p>", xml, re.DOTALL):
        if exact is not None:
            if re.search(rf"<w:t\b[^>]*>{re.escape(exact)}</w:t>", p):
                return p
        elif contains is not None and contains in p:
            return p
    return None


def ind_left(p: str) -> Optional[int]:
    m = re.search(r'<w:ind\b[^>]*\bw:left="(-?\d+)"', p)
    return int(m.group(1)) if m else None


def ind_right(p: str) -> Optional[int]:
    m = re.search(r'<w:ind\b[^>]*\bw:right="(-?\d+)"', p)
    return int(m.group(1)) if m else None


def jc(p: str) -> Optional[str]:
    m = re.search(r'<w:jc w:val="(\w+)"', p)
    return m.group(1) if m else None


def tabs_pos(p: str) -> list[int]:
    return [int(x) for x in re.findall(r'<w:tab w:val="right" w:pos="(\d+)"', p)]


def first_text(p: str) -> str:
    m = re.search(r"<w:t\b[^>]*>(.*?)</w:t>", p)
    return m.group(1) if m else ""


# 常量：版心宽 (210-28-26)=156mm → 8844 twips；3 号正文 16pt→320 twips/字；版记四号 14pt→280 twips/字
W = 8844
BODY_CHAR = 320
COL_CHAR = 280

# 1) center：署名/日期整行居中，无右缩进
xml = run(["--signature-align", "center"], "center")
sig = para_with(xml, "云溪镇人民政府")
date = para_with(xml, "2026年9月5日")
ok("center.署名jc", sig is not None and jc(sig) == "center", f"sig jc={jc(sig) if sig else None}")
ok("center.日期jc", date is not None and jc(date) == "center", f"date jc={jc(date) if date else None}")
ok("center.署名无右缩进", sig is not None and ind_right(sig) in (None, 0), f"sig right={ind_right(sig) if sig else None}")
ok("center.日期无右缩进", date is not None and ind_right(date) in (None, 0), f"date right={ind_right(date) if date else None}")

# 2) left + 左空 2：两段同左空 640
xml = run(["--signature-align", "left", "--signature-left", "2"], "left")
sig = para_with(xml, "云溪镇人民政府")
date = para_with(xml, "2026年9月5日")
ok("left.署名左空2", sig is not None and ind_left(sig) == 2 * BODY_CHAR, f"sig left={ind_left(sig) if sig else None}")
ok("left.日期左空2", date is not None and ind_left(date) == 2 * BODY_CHAR, f"date left={ind_left(date) if date else None}")
ok("left.署名无右缩进", sig is not None and ind_right(sig) in (None, 0), f"sig right={ind_right(sig) if sig else None}")

# 3) 多 flag：附件3 / 附注1 / 抄送左空0 / 印发右空0 / 份数右空0
xml = run(
    [
        "--attach-left", "3",
        "--notes-left", "1",
        "--colophon-left", "0",
        "--print-right", "0",
        "--copies-right", "0",
    ],
    "multiflag",
)
att = para_with(xml, contains="附件：云溪镇村庄清洁行动实施方案")
note = para_with(xml, contains="联系人：王五")
cc = para_with(xml, contains="抄送：县农业农村局")
print_p = para_with(xml, contains="云溪镇党政办公室")
copies_p = para_with(xml, contains="印60份")
ok("multi.附件左空3", att is not None and ind_left(att) == 3 * BODY_CHAR, f"att left={ind_left(att) if att else None}")
ok("multi.附注左空1", note is not None and ind_left(note) == 1 * BODY_CHAR, f"note left={ind_left(note) if note else None}")
ok("multi.抄送无全角空格", cc is not None and not first_text(cc).startswith("\u3000"), f"cc 首字符={first_text(cc)[:2]!r}")
ok("multi.抄送文本正确", cc is not None and "抄送：县农业农村局。" in cc)
ok("multi.印发机关同左空0", print_p is not None and not first_text(print_p).startswith("\u3000"), f"print 首字符={first_text(print_p)[:2]!r}")
ok("multi.印发tab右空0", print_p is not None and W in tabs_pos(print_p), f"print tabs={tabs_pos(print_p) if print_p else None}")
ok("multi.份数tab右空0", copies_p is not None and W in tabs_pos(copies_p), f"copies tabs={tabs_pos(copies_p) if copies_p else None}")

# 4) 默认（GB/T）回归：右空4=1280；抄送左空1=全角空格；印发8564；份数8004
xml = run([], "default")
date = para_with(xml, "2026年9月5日")
cc = para_with(xml, contains="抄送：县农业农村局")
print_p = para_with(xml, contains="云溪镇党政办公室")
copies_p = para_with(xml, contains="印60份")
ok("def.日期右空4", date is not None and ind_right(date) == 4 * BODY_CHAR, f"date right={ind_right(date) if date else None}")
ok("def.抄送左空1全角", cc is not None and first_text(cc).startswith("\u3000"), f"cc 首={first_text(cc)[:2]!r}")
ok("def.印发tab右空1", print_p is not None and W - 1 * COL_CHAR in tabs_pos(print_p), f"print tabs={tabs_pos(print_p) if print_p else None}")
ok("def.份数tab右空3", copies_p is not None and W - 3 * COL_CHAR in tabs_pos(copies_p), f"copies tabs={tabs_pos(copies_p) if copies_p else None}")

# 5) data.json 通道：center + 附注左空1 + 印发右空2
dj = os.path.join(TMP, "data.json")
with open(dj, "w", encoding="utf-8") as f:
    json.dump(
        {
            "signatureAlign": "center",
            "notesIndentChars": 1,
            "printRightChars": 2,
        },
        f,
    )
xml = run(["--data", dj], "datajson")
date = para_with(xml, "2026年9月5日")
note = para_with(xml, contains="联系人：王五")
print_p = para_with(xml, contains="云溪镇党政办公室")
ok("data.日期center", date is not None and jc(date) == "center", f"date jc={jc(date) if date else None}")
ok("data.附注左空1", note is not None and ind_left(note) == 1 * BODY_CHAR, f"note left={ind_left(note) if note else None}")
ok("data.印发右空2", print_p is not None and W - 2 * COL_CHAR in tabs_pos(print_p), f"print tabs={tabs_pos(print_p) if print_p else None}")

# 6) 越界兜底：--attach-left 99 忽略 → 默认 2（640）；data.json 越界同兜底
xml = run(["--attach-left", "99"], "oob")
att = para_with(xml, contains="附件：云溪镇村庄清洁行动实施方案")
ok("oob.越界CLI回默认2", att is not None and ind_left(att) == 2 * BODY_CHAR, f"att left={ind_left(att) if att else None}")
dj2 = os.path.join(TMP, "data2.json")
with open(dj2, "w", encoding="utf-8") as f:
    json.dump({"attachIndentChars": 99}, f)
xml = run(["--data", dj2], "oobdata")
att = para_with(xml, contains="附件：云溪镇村庄清洁行动实施方案")
ok("oob.越界data回默认2", att is not None and ind_left(att) == 2 * BODY_CHAR, f"att left={ind_left(att) if att else None}")

# 7) CLI --signature-align 优先级高于 data.json
dj3 = os.path.join(TMP, "data3.json")
with open(dj3, "w", encoding="utf-8") as f:
    json.dump({"signatureAlign": "center"}, f)
xml = run(["--data", dj3, "--signature-align", "left", "--signature-left", "1"], "cliover")
sig = para_with(xml, "云溪镇人民政府")
ok("prio.CLI覆盖data", sig is not None and ind_left(sig) == 1 * BODY_CHAR, f"sig left={ind_left(sig) if sig else None}")

print(f"v056: {PASS} 项通过" + ("" if not FAIL else f"，失败 {len(FAIL)}：\n" + "\n".join(FAIL)))
sys.exit(1 if FAIL else 0)
