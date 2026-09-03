#!/usr/bin/env python3
"""MDQuill v0.1.0 校验：粘贴净化 / 中文排版体检（八规则+修复）/ 标题树 / 设置。
全部为纯函数断言（entry_v010.ts → esbuild → node）。全过输出 PASS 总数。"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
ENTRY_CJS = ROOT / "tests" / ".tmp_v010_entry.cjs"

passed, failed = [], []


def check(cond: bool, name: str):
    (passed if cond else failed).append(name)
    print(("  ✅ " if cond else "  ❌ ") + name)


print("== 编译 entry_v010 ==")
r0 = subprocess.run(
    [ESBUILD, "tests/entry_v010.ts", "--bundle", "--format=cjs", "--platform=node",
     "--outfile=tests/.tmp_v010_entry.cjs"],
    cwd=ROOT, check=False, capture_output=True)
check(r0.returncode == 0, f"esbuild 编译成功（{r0.stderr.decode()[:200]}）")

print("== 纯函数断言 ==")
r = subprocess.run([NODE, str(ENTRY_CJS)], capture_output=True, text=True, cwd=ROOT)
lines = (r.stdout or r.stderr).strip().splitlines()
print("\n".join(lines[-8:]))
check(r.returncode == 0, "entry_v010 全部断言通过（exit 0）")

# 残留清理
Path(ENTRY_CJS).unlink(missing_ok=True)

print(f"\nPASS {len(passed)}  FAIL {len(failed)}")
if failed:
    for f in failed:
        print("  ❌ " + f)
    sys.exit(1)
