#!/usr/bin/env python3
"""RedQuill v1.1 编辑器手感纯函数校验（④光标与选区/⑤输入辅助/⑦列表续排）。
entry_editing.ts → esbuild → node 全过输出 PASS 总数。
覆盖：字符类别、双击词段（中英分流/标点连串/边界）、整段选中（空行块语义/CRLF）、
标题行窄化、引号配对（成对/跳越/补右/围栏直通）、行内格式 toggle、列表打断/转纯文本。"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
ENTRY_CJS = ROOT / "tests" / ".tmp_editing_entry.cjs"

passed, failed = [], []


def check(cond: bool, name: str):
    (passed if cond else failed).append(name)
    print(("  ✅ " if cond else "  ❌ ") + name)


print("== 编译 entry_editing ==")
r0 = subprocess.run(
    [ESBUILD, "tests/entry_editing.ts", "--bundle", "--format=cjs", "--platform=node",
     "--outfile=tests/.tmp_editing_entry.cjs"],
    cwd=ROOT, check=False, capture_output=True)
check(r0.returncode == 0, f"esbuild 编译成功（{r0.stderr.decode()[:200]}）")

print("== 编辑器手感断言 ==")
r = subprocess.run([NODE, str(ENTRY_CJS)], capture_output=True, text=True, cwd=ROOT)
out = (r.stdout or "") + (r.stderr or "")
print("\n".join(out.strip().splitlines()[-10:]))
check(r.returncode == 0, "entry_editing 全部断言通过（exit 0）")

# 残留清理
Path(ENTRY_CJS).unlink(missing_ok=True)

print(f"\nPASS {len(passed)}  FAIL {len(failed)}")
if failed:
    for f in failed:
        print("  ❌ " + f)
    sys.exit(1)
