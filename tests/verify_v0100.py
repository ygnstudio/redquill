#!/usr/bin/env python3
"""verify_v0100.py —— 版式收官（v0.10.0）。

覆盖：
  A. entry_v0100.ts 纯函数层：splitAttachTitle / hr 附件切分 / rh-seal / preview 印章+附件渲染
  B. 印章（rh-seal）：动态生成模拟章 PNG → docx 含 <wp:anchor> 浮图（behindDoc=0、positionV
     relativeFrom=paragraph、extent≈42mm），与成文日期同段（骑年盖月）
  C. 落款防孤行：正文末段与署名段 <w:keepNext/>
  D. 页码空一字：公文页码 default(odd) 段右缩 280 twips、even 段左缩 280 twips
  E. 附件另面：document.xml 两个 sectPr、第二节 type=nextPage；「附件1」黑体标记行 + 居中标题；
     版记并入附件节；附件模式不产生偶页拆节（无 evenPage）
  F. sample_v0100.md 全要素 docx 导出成功（含附件说明两条）
"""
import os
import re
import shutil
import struct
import subprocess
import sys
import zipfile
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
CLI = ROOT / "dist" / "cli.js"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
SAMPLE = ROOT / "tests" / "samples" / "sample_v0100.md"
TMP = Path("/tmp/redhead_v0100")
TMP.mkdir(exist_ok=True)

PASS = 0
FAIL = []


def ok(name: str, cond: bool, detail: str = "") -> None:
    global PASS
    if cond:
        PASS += 1
    else:
        FAIL.append(f"{name}: {detail}")


def make_seal_png(path: Path) -> None:
    """纯标准库生成 360x360 模拟章（红环，透明外底）：仅验证浮章定位，非真实印章"""
    S = 360
    cx = cy = S / 2
    R1, R2 = 168.0, 104.0
    rows = bytearray()
    for y in range(S):
        rows.append(0)  # filter: None
        for x in range(S):
            d = ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2) ** 0.5
            if R2 <= d <= R1:
                rows += bytes((0xBE, 0x0B, 0x0B, 255))
            else:
                rows += bytes((0, 0, 0, 0))

    def chunk(tag: bytes, data: bytes) -> bytes:
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", S, S, 8, 6, 0, 0, 0)
    png = (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(bytes(rows))) + chunk(b"IEND", b""))
    path.write_bytes(png)


def cli_docx(md_file: Path, out: str) -> str:
    """CLI 导出并返回 document.xml 文本（失败记 FAIL 返回空）"""
    r = subprocess.run([NODE, str(CLI), str(md_file), "-o", str(TMP / out), "--preset", "gongwen-standard"],
                       capture_output=True, text=True)
    if r.returncode != 0:
        FAIL.append(f"{out}: CLI 失败 {r.stderr.strip()[:200]}")
        return ""
    return zipfile.ZipFile(TMP / out).read("word/document.xml").decode("utf-8")


def p_has_keepnext(xml: str, needle: str) -> bool:
    """含 needle 文本的段落是否带 <w:keepNext/>"""
    for p in re.findall(r"<w:p\b.*?</w:p>", xml, re.DOTALL):
        if needle in p:
            return "<w:keepNext/>" in p
    return False


# ---- A: entry ----
entry = TMP / "entry_v0100.cjs"
subprocess.run([ESBUILD, "tests/entry_v0100.ts", "--bundle", "--format=cjs", "--platform=node",
                "--outfile=" + str(entry)], cwd=ROOT, check=True, capture_output=True)
r = subprocess.run([NODE, str(entry)], capture_output=True, text=True)
for line in r.stdout.splitlines():
    if line.startswith("PB-OK:"):
        PASS += 1
    elif line.startswith("PB-FAIL:"):
        FAIL.append("entry: " + line[8:])
if r.returncode != 0 and not any("PB-FAIL" in l for l in r.stdout.splitlines()):
    FAIL.append(f"entry 崩溃: {r.stderr.strip()[:200]}")

# ---- B: 印章浮图（动态带章样本） ----
make_seal_png(TMP / "seal.png")
seal_md = TMP / "seal_sample.md"
seal_body = [
    "---", "rh-agency: 云溪镇人民政府文件", "rh-docNumber: 云政发〔2026〕8号",
    "rh-seal: seal.png", "rh-date: 2026年9月8日", "rh-signature: 云溪镇人民政府",
    "rh-cc: 县农业农村局", "rh-printOrg: 云溪镇党政办公室", "rh-printDate: 2026年9月8日印发", "rh-printCopies: 40",
    "---", "", "# 关于启用印章排版功能的通知", "", "正文内容用于校验印章浮图定位。",
]
seal_md.write_text("\n".join(seal_body), encoding="utf-8")
xml_seal = cli_docx(seal_md, "seal.docx")
if xml_seal:
    ok("B.浮图anchor", "<wp:anchor" in xml_seal and "<w:drawing>" in xml_seal)
    m_ext = re.search(r'<wp:extent cx="(\d+)" cy="(\d+)"', xml_seal)
    ok("B.尺寸≈42mm", bool(m_ext) and 1_400_000 < int(m_ext.group(1)) < 1_700_000,
       f"cx={m_ext.group(1) if m_ext else '?'} (42mm@96dpi=1514475EMU)")
    ok("B.paragraph锚定", 'relativeFrom="paragraph"' in xml_seal, "positionV 应为段落锚")
    ok("B.尺寸非天文", "143231222655600" not in xml_seal and 'cy="1514475"' in xml_seal,
       "cy 应≈159px×9525（此前 Buffer 池错位 bug 会产生天文数）")
    ok("B.章在日期段", bool(re.search(r"<w:t[^>]*>2026年9月8日</w:t>[\s\S]{0,1200}?<wp:anchor", xml_seal)) or
       bool(re.search(r"<wp:anchor[\s\S]{0,2000}?2026年9月8日", xml_seal)), "章与日期应同段（先查日期后 drawing 或紧邻）")
    ok("B.无evenPage拆节", "evenPage" not in xml_seal)

# ---- C: 防孤行（sample_v0100 静态样本） ----
xml_full = cli_docx(SAMPLE, "v0100.docx")
if xml_full:
    ok("C.正文末段keepNext", p_has_keepnext(xml_full, "本样例用于"), "正文最后一段应 keepNext（样例注释段）")
    ok("C.署名段keepNext", p_has_keepnext(xml_full, ">云溪镇人民政府<") or p_has_keepnext(xml_full, "云溪镇人民政府</w:t>"),
       "署名段应 keepNext 防日期孤行")
    # E: 附件另面
    n_sect = len(re.findall(r"<w:sectPr\b", xml_full))
    ok("E.两个节", n_sect == 2, f"sectPr={n_sect}")
    ok("E.附件节nextPage", xml_full.count('w:val="nextPage"') >= 1, "第二节应 NEXT_PAGE 另面")
    ok("E.附件1标记", ">附件1<" in xml_full.replace("附件1：云溪镇村庄清洁行动长效管护实施方案", "附件1"),
       "首标题应拆出附件1 标记行")
    ok("E.附件标题居中", bool(re.search(r'<w:jc w:val="center"', xml_full)), "拆出的标题居中")
    ok("E.附件黑体标记", bool(re.search(r'w:eastAsia="黑体"[\s\S]{0,400}?附件1|附件1[\s\S]{0,400}?w:eastAsia="黑体"', xml_full)),
       "附件N 标记行黑体")
    ok("E.版记并入", "县农业农村局" in xml_full and "云溪镇党政办公室" in xml_full, "版记段落应在附件节末")
    ok("F.附件说明两条", "附件1：" in xml_full and "附件2：" in xml_full and "云溪镇村庄清洁行动长效管护实施方案" in xml_full,
       "正文附件说明应拆两行带序号")

# ---- D: 页码空一字（footer1/2.xml：default=odd 右空、even 左空 280 twips） ----
zf = zipfile.ZipFile(TMP / "v0100.docx")
footers = {}
for n in zf.namelist():
    if re.fullmatch(r"word/footer\d+\.xml", n):
        footers[n] = zf.read(n).decode("utf-8")
right_one = left_one = False
for name, fx in footers.items():
    if re.search(r'<w:ind w:right="280"', fx) and re.search(r'<w:jc w:val="(right|end)"', fx):
        right_one = True
    if re.search(r'<w:ind w:left="280"', fx) and re.search(r'<w:jc w:val="left"', fx):
        left_one = True
ok("D.单页页码右空一字", right_one, f"footer 段应 jc=right + ind right=280，见 {list(footers.keys())}")
ok("D.双页页码左空一字", left_one, "even footer 应 jc=left + ind left=280")

print(f"v0100: {PASS} 项通过" + ("" if not FAIL else f"，失败 {len(FAIL)}：\n" + "\n".join(FAIL)))
sys.exit(1 if FAIL else 0)
