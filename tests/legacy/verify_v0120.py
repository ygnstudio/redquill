#!/usr/bin/env python3
"""RedHead v0.12.0 校验：多文档归档。
A. entry_v0120.ts 纯函数层（glob 翻译 / 输入展开 / 台账判定 / 登记表格式）
B. 批量导出：batch_arch 目录（含子目录）→ --out-dir 6 个 docx；单文件 -o 回归
C. docx 文件属性（core.xml）：title=正文标题 / creator=发文机关 / description=文号
D. --check 批量：多文件汇总 { summary, files[] }；干净目录 exit 0、含坏样例 exit 2
E. --ledger 台账：-o ledger.csv / ledger.md 断言重号/漏号行与汇总
F. glob 输入展开（CLI 层）：**\/*.md 收子目录。全过输出 PASS 总数。"""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
CLI = ROOT / "dist" / "cli.js"
BATCH = ROOT / "tests" / "samples" / "batch_arch"
BAD = ROOT / "tests" / "samples" / "sample_check_bad.md"
GOOD = ROOT / "tests" / "samples" / "sample_struct.md"
ENTRY_CJS = ROOT / "tests" / ".tmp_v0120_entry.cjs"

passed, failed = [], []


def check(cond: bool, name: str, detail: str = ""):
    (passed if cond else failed).append(name)
    print(("  ✅ " if cond else "  ❌ ") + name + (f"  {detail}" if detail and not cond else ""))


def run(*cmd, **kw) -> subprocess.CompletedProcess:
    return subprocess.run([str(x) for x in cmd], capture_output=True, text=True, cwd=ROOT, **kw)


def core_xml(path: Path) -> str:
    with zipfile.ZipFile(path) as z:
        return z.read("docProps/core.xml").decode("utf-8")


TMP = Path(tempfile.mkdtemp(prefix="rh_v0120_"))
try:
    # ---- A. 纯函数层 ----
    print("== 纯函数层 entry_v0120 ==")
    r = run(ESBUILD, "tests/entry_v0120.ts", "--bundle", "--format=cjs", "--platform=node",
            f"--outfile={ENTRY_CJS}")
    if r.returncode != 0:
        print(r.stderr[:800])
        check(False, "entry_v0120 esbuild 打包")
    else:
        r2 = run(NODE, ENTRY_CJS)
        tail = (r2.stdout or r2.stderr).strip().splitlines()[-3:]
        print("\n".join("  " + t for t in tail))
        check(r2.returncode == 0, "entry_v0120 全部断言通过（exit 0）", "\n".join((r2.stdout or r2.stderr).splitlines()[1:8]))

    # ---- B. 批量导出 ----
    print("== 批量导出（batch_arch → out-dir）==")
    out_dir = TMP / "out"
    r3 = run(NODE, CLI, BATCH, "--out-dir", out_dir, "--preset", "gongwen-standard")
    check(r3.returncode == 0, "B.目录批量导出 exit 0", r3.stderr[:200])
    names = ["001_tongzhi.docx", "002_tongzhi.docx", "003_tongzhi.docx", "004_pifu.docx", "006_riji.docx"]
    check(all((out_dir / n).exists() for n in names), "B.根目录 5 个 docx 落盘")
    check((out_dir / "sub" / "005_zhiban.docx").exists(), "B.子目录 docx 一并导出（递归）")
    check("❌" not in r3.stdout, "B.全程成功无失败日志", r3.stdout)
    # 单文件 -o 回归（CLI 重构不破坏）
    out1 = TMP / "single.docx"
    r4 = run(NODE, CLI, BATCH / "001_tongzhi.md", "-o", out1, "--preset", "gongwen-standard")
    check(r4.returncode == 0 and out1.exists(), "B.单文件 -o 回归正常", r4.stderr[:200])

    # ---- C. docx 文件属性 ----
    print("== docx 文件属性（core.xml）==")
    core = core_xml(out_dir / "001_tongzhi.docx")
    check("关于开展秋季秸秆禁烧巡查的通知" in core and "dc:title" in core, "C.title=正文标题")
    check("云溪镇人民政府文件" in core and "dc:creator" in core, "C.creator=发文机关")
    check("云政发〔2026〕20号" in core, "C.description=发文字号")
    core_riji = core_xml(out_dir / "006_riji.docx")
    # 006 有 # 标题（docTitle）→ title 写入；无机关/文号 → 无 creator/description 标签
    check("dc:title" in core_riji and "巡查记录模板" in core_riji, "C.有 # 标题则写 title 属性")
    check("Un-named" not in core_riji and "dc:creator" not in core_riji and "dc:description" not in core_riji,
          "C.无机关/文号不写 creator/description（且无 Un-named 默认作者）")

    # ---- D. --check 批量汇总 ----
    print("== --check 批量 ==")
    clean_dir = TMP / "clean"
    dirty_dir = TMP / "dirty"
    for d in (clean_dir, dirty_dir):
        d.mkdir()
    shutil.copy(GOOD, clean_dir / "a.md")
    shutil.copy(BATCH / "006_riji.md", clean_dir / "b.md")
    shutil.copy(GOOD, dirty_dir / "a.md")
    shutil.copy(BAD, dirty_dir / "b.md")
    r5 = run(NODE, CLI, clean_dir, "--check")
    j5 = json.loads(r5.stdout)
    check(r5.returncode == 0, "D.干净目录 exit 0", f"rc={r5.returncode}")
    check(j5["summary"]["files"] == 2 and j5["summary"]["errors"] == 0 and len(j5["files"]) == 2, "D.汇总字段 files/errors")
    check("a.md" in j5["files"][0]["file"], "D.files[] 含绝对路径")
    r6 = run(NODE, CLI, dirty_dir, "--check")
    j6 = json.loads(r6.stdout)
    check(r6.returncode == 2, "D.含坏样例 exit 2", f"rc={r6.returncode}")
    check(j6["summary"]["dirties"] == 1 and j6["summary"]["errors"] >= 1, "D.坏样例计入 dirties")
    check(any("doc-number-format" in [i["code"] for i in f["issues"]] for f in j6["files"]), "D.坏样例 codes 入 files[].issues")
    r6t = run(NODE, CLI, dirty_dir, "--check", "--table")
    check("不合规" in r6t.stdout, "D.--table 人读汇总", r6t.stdout[:100])

    # ---- E. --ledger 台账 ----
    print("== --ledger 文号台账 ==")
    csv_out = TMP / "ledger.csv"
    r7 = run(NODE, CLI, BATCH, "--ledger", "-o", csv_out)
    txt = r7.stdout + r7.stderr
    check(r7.returncode == 0, "E.台账 exit 0", r7.stderr[:200])
    check("共 6 篇" in txt and "已编号 4" in txt and "漏号 1" in txt and "重号 1 组" in txt, "E.汇总统计正确", txt[:200])
    check("⚠️ 重号：云政发〔2026〕21号" in r7.stderr and "002_tongzhi.md" in r7.stderr, "E.重号提示含同号名单", r7.stderr)
    check("⚠️ 漏号：004_pifu.md" in r7.stderr, "E.漏号提示", r7.stderr)
    csv = csv_out.read_text(encoding="utf-8")
    # splitlines 兼容 CRLF/LF（read_text 默认 universal newlines 会把 \r\n 归一成 \n）
    lines = csv.splitlines()
    check(len(lines) == 7, "E.csv 表头+6 行", f"got {len(lines)}")
    check("云政发〔2026〕20号,关于开展秋季秸秆禁烧巡查的通知" in csv, "E.csv 正常行字段")
    check("云政发〔2026〕21号" in csv and "重号" in csv, "E.csv 重号标记")
    check("004_pifu.md" in csv and "漏号" in csv, "E.csv 漏号标记")
    check("006_riji.md" in csv and "正常" in csv and "疑似公文未编号" not in csv.split("006_riji.md")[1].split("|")[0], "E.非公文不误报漏号")
    md_out = TMP / "ledger.md"
    run(NODE, CLI, BATCH, "--ledger", "-o", md_out)
    md = md_out.read_text(encoding="utf-8")
    check("| 序号 | 发文字号 |" in md and "| 重号 | 与 003_tongzhi.md 同号 |" in md, "E.md 登记表含重号说明")

    # ---- F. glob 输入（CLI 层）----
    print("== glob 输入展开 ==")
    r8 = run(NODE, CLI, "tests/samples/batch_arch/**/*.md", "--check")
    j8 = json.loads(r8.stdout)
    check(j8["summary"]["files"] == 6, "F.glob ** 收 6 篇", f"got {j8['summary']['files']} rc={r8.returncode}")
    check(any("sub" in f["file"] for f in j8["files"]), "F.glob 含子目录文件")
finally:
    shutil.rmtree(TMP, ignore_errors=True)

print(f"\nPASS {len(passed)}/{len(passed) + len(failed)}")
if failed:
    print("FAILED:", ", ".join(failed))
    sys.exit(1)
