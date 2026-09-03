#!/usr/bin/env python3
"""RedHead v0.4.0 校验：结构层尾部要素 + PDF 管线入口 + CLI --data + Templater 骨架。
断言 docx XML、预览 HTML、CLI 行为三方一致。全过输出 PASS 总数。"""

import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
import os
import shutil
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
CLI = ROOT / "dist" / "cli.js"
SAMPLE = ROOT / "tests" / "samples" / "sample_full.md"

# ---- 0. 构建临时校验入口（preview / main+obsidian桩） ----
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
subprocess.run([ESBUILD, "tests/preview_entry_v04.ts", "--bundle", "--format=cjs",
                "--platform=node", "--outfile=tests/.tmp_v04_preview.cjs"],
               cwd=ROOT, check=True, capture_output=True)
subprocess.run([ESBUILD, "tests/main_entry_v04.ts", "--bundle", "--format=cjs", "--platform=node",
                "--alias:obsidian=./tests/obsidian_stub.ts", "--outfile=tests/.tmp_v04_main.cjs"],
               cwd=ROOT, check=True, capture_output=True)

passed = []
failed = []


def check(cond: bool, name: str):
    (passed if cond else failed).append(name)
    print(("  ✅ " if cond else "  ❌ ") + name)


def doc_xml(path: Path) -> str:
    with zipfile.ZipFile(path) as z:
        return z.read("word/document.xml").decode("utf-8")


def settings_xml(path: Path) -> str:
    with zipfile.ZipFile(path) as z:
        return z.read("word/settings.xml").decode("utf-8")


OUT = ROOT / "tests" / "out_v04.docx"

# ---- 1. CLI 导出全要素样例 ----
print("== CLI 导出 ==")
r = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(OUT), "--preset", "gongwen-standard"],
                   capture_output=True, text=True)
check(r.returncode == 0, f"CLI 导出成功（{r.stdout.strip() or r.stderr.strip()[:60]}）")
xml = doc_xml(OUT)

# ---- 2. docx 结构层断言 ----
print("== docx 结构层 ==")
check("各村（社区）、镇直各单位：" in xml, "主送机关输出且补全角冒号")
check("附件：1.人居环境整治实施方案" in xml and "附件：2.考核评分细则" in xml, "附件说明两条输出")
check("（联系人：李四，电话：12345678）" in xml, "附注自动包圆括号")
check(">2026年9月10日<" in xml, "成文日期输出")
check(">云溪镇人民政府<" in xml, "署名输出")
check("抄送：县农业农村局、县财政局。" in xml, "版记抄送输出且补句号")
check("云溪镇党政办公室" in xml and "2026年9月12日印发" in xml, "版记印发机关+印发时间")
check("印30份" in xml, "版记份数渲染成「印30份」")

# 主送机关紧跟标题（顺序：标题 → 主送 → 正文）
i_title = xml.find("关于开展2026年秋季农村人居环境整治工作的通知")
i_recip = xml.find("各村（社区）、镇直各单位：")
i_body = xml.find("根据上级统一部署")
check(0 < i_title < i_recip < i_body, "段落顺序：标题→主送→正文")

# 日期右空 4 字（右缩进 = 4 × 16pt × 20 = 1280 twips）
i_date = xml.find("2026年9月10日")
seg = xml[max(0, i_date - 600):i_date]
check('w:right="1280"' in seg and 'w:val="right"' in seg, "成文日期右对齐+右缩进 4 字（1280 twips）")

# 署名相对日期居中：署名宽 7 字、日期宽（2026=2, 年=1, 9=0.5, 月=1, 10=1, 日=1 → 6.5）→ 右缩进 = (4+(6.5-7)/2)=3.75 字=1200 twips
i_sig = xml.find("云溪镇人民政府<")
seg = xml[max(0, i_sig - 600):i_sig]
check('w:right="1200"' in seg, "署名右缩进按估宽居中（1200 twips）")

# 版记分隔线（GB/T 9704：首末粗线 sz=12、中间细线 sz=6，线全宽、文字缩进不缩线）
i_cc = xml.find("抄送：县农业农村局")
seg = xml[max(0, i_cc - 700):i_cc]
check('w:top' in seg and 'w:sz="12"' in seg and "single" in seg.lower(), "版记首要素带首粗线（top 1.5pt）")
check("w:bottom" not in seg, "首要素下不带底边框（线序归顶边）")
i_copies = xml.find("印30份")
seg_c = xml[max(0, i_copies - 700):i_copies]
check('w:bottom' in seg_c and 'w:sz="12"' in seg_c, "版记末要素带末粗线（bottom 1.5pt）")
i_print = xml.find("云溪镇党政办公室")
seg_p = xml[max(0, i_print - 700):i_print]
check('w:top' in seg_p and 'w:sz="6"' in seg_p, "版记中间要素带细线（top 0.75pt）")
check("w:ind" not in seg_c, "印数行无段落缩进（线全宽，右空由制表位实现）")

# frontmatter 不泄漏进正文
check("recipients" not in xml and "printCopies" not in xml, "frontmatter 键名不泄漏")

# ---- 3. 预览 HTML 同源断言 ----
print("== 预览 HTML ==")
r = subprocess.run([NODE, "-e", """
const { renderPreview, parseDocument, BUILTIN_PRESETS } = require('./tests/.tmp_v04_preview.cjs');
const fs = require('fs');
const d = parseDocument(fs.readFileSync('tests/samples/sample_full.md', 'utf-8'));
const html = renderPreview(d.blocks, BUILTIN_PRESETS[0], { meta: d.meta });
console.log(JSON.stringify({
  recip: html.includes('各村（社区）、镇直各单位：'),
  attach: html.includes('附件：2.考核评分细则'),
  notes: html.includes('（联系人：李四，电话：12345678）'),
  dateRight: html.includes('margin-right:4em'),
  sigCenter: html.includes('align-items:center'),
  cc: html.includes('抄送：县农业农村局、县财政局。'),
  print: html.includes('2026年9月12日印发'),
  copies: html.includes('印30份'),
  colophonThick: html.includes('border-top:1.5pt solid #000') && html.includes('border-bottom:1.5pt solid #000'),
  colophonThin: html.includes('border-top:0.75pt solid #000'),
  colophonFullWidth: html.includes('padding-left:1em') && html.includes('padding-right:3em'),
  order: html.indexOf('rg-recipients') > html.indexOf('rg-title') && html.indexOf('rg-recipients') < html.indexOf('根据上级统一部署'),
}));
"""], capture_output=True, text=True, cwd=ROOT)
check(r.returncode == 0, f"预览渲染执行成功（{r.stderr.strip()[:60] if r.returncode else ''}）")
if r.returncode == 0:
    import json
    flags = json.loads(r.stdout)
    for k, v in flags.items():
        check(v, f"预览断言：{k}")

# ---- 4. CLI --data 覆盖层 ----
print("== CLI --data ==")
fake_data = ROOT / "tests" / "fake_data.json"
fake_data.write_text(
    '{"builtinOverrides":[{"id":"gongwen-standard","name":"公文·标准（改过）","linePt":26}],'
    '"customPresets":[{"id":"my-custom","name":"我的预设","linePt":24}]}',
    encoding="utf-8",
)
r2 = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(ROOT / "tests" / "out_data.docx"),
                     "--preset", "my-custom", "--data", str(fake_data)], capture_output=True, text=True)
check(r2.returncode == 0 and "我的预设" in r2.stdout, "CLI --data 命中自定义预设")
x2 = doc_xml(ROOT / "tests" / "out_data.docx")
check('w:line="480"' in x2, "自定义预设 linePt=24 生效（480 twips）")
r3 = subprocess.run([NODE, str(CLI), str(SAMPLE), "-o", str(ROOT / "tests" / "out_ovr.docx"),
                     "--preset", "gongwen-standard", "--data", str(fake_data)], capture_output=True, text=True)
check(r3.returncode == 0 and "改过" in r3.stdout, "CLI --data 内置预设应用覆盖层")
x3 = doc_xml(ROOT / "tests" / "out_ovr.docx")
check('w:line="520"' in x3, "覆盖层 linePt=26 生效（520 twips）")

# ---- 5. Templater 弹窗版骨架 ----
print("== Templater 骨架 ==")
r4 = subprocess.run([NODE, "-e", """
const { GONGWEN_TEMPLATES, toTemplaterSkeleton } = require('./tests/.tmp_v04_main.cjs');
const tp = toTemplaterSkeleton(GONGWEN_TEMPLATES['公文模板-通知']);
const plain = GONGWEN_TEMPLATES['公文模板-通知'];
console.log(JSON.stringify({
  count: Object.keys(GONGWEN_TEMPLATES).length,
  fm: tp.includes('tp.system.prompt("发文机关标志'),
  title: tp.includes('tp.system.prompt("公文标题", "关于XXXX的会议通知")'),
  date: tp.includes('tp.date.now("YYYY年M月D日")'),
  bodyKept: tp.includes('## 一、会议时间'),
  plainUntouched: plain.includes('2026年X月X日') && plain.startsWith('---'),
}));
"""], capture_output=True, text=True, cwd=ROOT)
check(r4.returncode == 0, f"骨架转换执行成功（{r4.stderr.strip()[:80] if r4.returncode else ''}）")
if r4.returncode == 0:
    import json
    flags = json.loads(r4.stdout)
    for k, v in flags.items():
        check(v, f"Templater 断言：{k}")

# ---- 清理 ----
for f in [OUT, ROOT / "tests" / "out_data.docx", ROOT / "tests" / "out_ovr.docx", fake_data]:
    f.unlink(missing_ok=True)
(ROOT / "tests" / ".tmp_v04_preview.cjs").unlink(missing_ok=True)
(ROOT / "tests" / ".tmp_v04_main.cjs").unlink(missing_ok=True)

print(f"\n{'='*40}\n通过 {len(passed)} / {len(passed) + len(failed)}")
if failed:
    print("失败项：", *failed, sep="\n  - ")
    sys.exit(1)
