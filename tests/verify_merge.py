#!/usr/bin/env python3
"""RedQuill 合一 v1.0.0 校验（P3.2）：公文上下文判定器。
entry_merge.ts → esbuild → node 全过输出 PASS 总数。
覆盖：frontmatter 命中/不命中（平铺+嵌套+值空+引号）、detectContext 整篇口径、
与 extractRedHead 一致性对账、ContextGate 手动覆盖三态。"""

import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
ENTRY_CJS = ROOT / "tests" / ".tmp_merge_entry.cjs"

passed, failed = [], []


def check(cond: bool, name: str):
    (passed if cond else failed).append(name)
    print(("  ✅ " if cond else "  ❌ ") + name)


print("== 编译 entry_merge ==")
r0 = subprocess.run(
    [ESBUILD, "tests/entry_merge.ts", "--bundle", "--format=cjs", "--platform=node",
     "--outfile=tests/.tmp_merge_entry.cjs"],
    cwd=ROOT, check=False, capture_output=True)
check(r0.returncode == 0, f"esbuild 编译成功（{r0.stderr.decode()[:200]}）")

print("== 判定器断言 ==")
r = subprocess.run([NODE, str(ENTRY_CJS)], capture_output=True, text=True, cwd=ROOT)
lines = (r.stdout or r.stderr).strip().splitlines()
print("\n".join(lines[-8:]))
check(r.returncode == 0, "entry_merge 全部断言通过（exit 0）")

# 残留清理
Path(ENTRY_CJS).unlink(missing_ok=True)

print(f"\nPASS {len(passed)}  FAIL {len(failed)}")
if failed:
    for f in failed:
        print("  ❌ " + f)
    sys.exit(1)
