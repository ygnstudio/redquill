#!/usr/bin/env python3
"""verify_v080.py —— 设置/预设导出导入管线（v0.8.0）。

sanitizeSettings 是「加载 data.json」与「从备份导入」共用清洗管线，抽为纯模块后
用 esbuild 临时入口直跑断言（entry_v080.ts，与既有脚本同法）：
  A. 空输入 → 全默认
  B. 字数越界回默认 / 小数取整 / 合法保留
  C. 落款对齐三态合法化（非法 → right）
  D. colophonEvenPage 旧布尔迁移 + colophonMode 优先
  E. customPresets：合法半残缺 normalize 补全、垃圾条目过滤
  F. builtinOverrides：合法打 builtin 标记、未知 id 过滤
  G. templateSelection 模板 key 白名单
  H. 结构层 7 字段全量回填（导出/导入不丢字段）
"""
import os
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NODE = os.environ.get("NODE_BIN") or shutil.which("node") or "node"
ESBUILD = str(ROOT / "node_modules" / ".bin" / "esbuild")
TMP = Path("/tmp/redhead_v080")
TMP.mkdir(exist_ok=True)

entry = TMP / "entry_v080.cjs"
subprocess.run([ESBUILD, "tests/entry_v080.ts", "--bundle", "--format=cjs", "--platform=node",
                "--outfile=" + str(entry)], cwd=ROOT, check=True, capture_output=True)
r = subprocess.run([NODE, str(entry)], capture_output=True, text=True)
PASS = 0
FAIL = []
for line in r.stdout.splitlines():
    if line.startswith("PB-OK:"):
        PASS += 1
    elif line.startswith("PB-FAIL:"):
        FAIL.append(line[8:])
if r.returncode != 0 and not any("PB-FAIL" in l for l in r.stdout.splitlines()):
    FAIL.append(f"entry 崩溃: {r.stderr.strip()[:200]}")

print(f"v080: {PASS} 项通过" + ("" if not FAIL else f"，失败 {len(FAIL)}：\n" + "\n".join(FAIL)))
sys.exit(1 if FAIL else 0)
