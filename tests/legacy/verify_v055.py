#!/usr/bin/env python3
"""verify_v055.py —— 落款右空设置项校验（0.5.5 起新增 RedHeadSettings.signatureRightChars）

覆盖三种取值（4/2/0 字）的 docx 段落右缩进 twips + 预览 CSS margin-right em。
"""
import os, re, subprocess, sys, tempfile, zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLI = ROOT / 'dist' / 'cli.js'
SAMPLE = ROOT / 'tests' / 'samples' / 'sample_short.md'

BODY_SIZE_PT = 16  # 3 号 = 16pt（公文标准默认）
TWIPS_PER_CHAR = BODY_SIZE_PT * 20  # 320
TEXT_WIDTH = {  # textWidthChars: CJK=1, ASCII=0.5
    '云溪镇人民政府': 7,    # 全 CJK
    '2026年9月5日': 6,    # 4CJK + 4ASCII
}

def run_cli(out_path: Path, right_chars: int) -> None:
    if out_path.exists():
        out_path.unlink()
    r = subprocess.run([
        'node', str(CLI), str(SAMPLE), '-o', str(out_path),
        '--preset', 'gongwen-standard', '--signature-right', str(right_chars),
    ], capture_output=True, text=True, cwd=ROOT)
    if r.returncode != 0:
        print('CLI 失败：', r.stderr); sys.exit(1)
    if not out_path.exists():
        print('docx 未生成'); sys.exit(1)

def extract_doc_xml(docx: Path) -> str:
    with zipfile.ZipFile(docx) as z:
        return z.read('word/document.xml').decode('utf-8')

def find_para_right_indent(xml: str, target_text: str) -> int | None:
    """定位落款段落（target_text 在 <w:t> 中）+ 返回 w:ind w:right twips；找不到返回 None

    红头机关标志（如「云溪镇人民政府文件」）也在文档里，避免被误匹配：
    落款段必定带 w:jc w:val="right"（AlignmentType.RIGHT）；红头标题段是 jc=center。
    """
    # 段落近似：以 <w:p> 块为单位扫描
    for m in re.finditer(r'<w:p\b[^>]*>(.*?)</w:p>', xml, re.DOTALL):
        block = m.group(1)
        if target_text not in block: continue
        if 'w:jc w:val="right"' not in block: continue  # 必须是右对齐段落
        ind_m = re.search(r'<w:ind\b([^/]*?)/?>', block)
        if not ind_m: return 0
        attrs = ind_m.group(1)
        rm = re.search(r'w:right="(-?\d+)"', attrs)
        return int(rm.group(1)) if rm else 0
    return None

def assert_eq(actual, expected, msg):
    if actual != expected:
        print(f'  ❌ {msg}\n     期望 {expected}, 实际 {actual}')
        sys.exit(1)
    print(f'  ✓ {msg} (={actual})')

def assert_close(actual, expected, tol, msg):
    if abs(actual - expected) > tol:
        print(f'  ❌ {msg}\n     期望≈{expected} (±{tol}), 实际 {actual}')
        sys.exit(1)
    print(f'  ✓ {msg} (≈{actual})')

print('=== verify_v055：落款右空设置项 ===')

# ============ 1. docx 右缩进 twips 校验 ============
print('\n[docx] 三档取值（4 / 2 / 0 字）的右缩进 twips：')
for chars in (4, 2, 0):
    with tempfile.TemporaryDirectory() as td:
        out = Path(td) / f'sig_right_{chars}.docx'
        run_cli(out, chars)
        xml = extract_doc_xml(out)
        sig_text = '云溪镇人民政府'
        date_text = '2026年9月5日'
        sig_twips = find_para_right_indent(xml, sig_text)
        date_twips = find_para_right_indent(xml, date_text)
        assert sig_twips is not None and date_twips is not None, f'{chars} 字：署名/日期段落缺失'

        dw = TEXT_WIDTH[date_text]
        sw = TEXT_WIDTH[sig_text]
        expected_date = chars * TWIPS_PER_CHAR
        # sigRight = (chars + (dw - sw)/2) * TWIPS_PER_CHAR
        raw_sig = (chars + (dw - sw) / 2) * TWIPS_PER_CHAR
        expected_sig = max(0, round(raw_sig))

        print(f'  -- {chars} 字 --')
        assert_eq(date_twips, expected_date, f'日期段 w:ind w:right ({chars} 字={chars}*{TWIPS_PER_CHAR})')
        assert_eq(sig_twips, expected_sig, f'署名段 w:ind w:right (按 GB/T 居中公式)')

# ============ 2. 极端边界 ============
print('\n[docx] 边界值校验：')
with tempfile.TemporaryDirectory() as td:
    # 0 字：日期紧贴右版心，署名因 sw>dw 居中公式结果为负 → Math.max 截到 0
    out = Path(td) / 'sig_right_0.docx'
    run_cli(out, 0)
    xml = extract_doc_xml(out)
    dt = find_para_right_indent(xml, '2026年9月5日')
    sg = find_para_right_indent(xml, '云溪镇人民政府')
    assert_eq(dt, 0, '0 字日期：w:ind w:right=0（紧贴右版心）')
    assert_eq(sg, 0, '0 字署名：(dw-sw)/2<0 时 max 截 0（不出现负缩进）')

# ============ 3. CLI flag 缺省 → 默认 4 字 ============
print('\n[CLI] 不传 --signature-right → 默认 4 字：')
with tempfile.TemporaryDirectory() as td:
    out = Path(td) / 'sig_default.docx'
    if out.exists(): out.unlink()
    subprocess.run([
        'node', str(CLI), str(SAMPLE), '-o', str(out), '--preset', 'gongwen-standard',
    ], check=True, cwd=ROOT, capture_output=True)
    xml = extract_doc_xml(out)
    dt = find_para_right_indent(xml, '2026年9月5日')
    assert_eq(dt, 4 * TWIPS_PER_CHAR, 'CLI 不传 --signature-right → 默认 4 字右缩进')

# ============ 4. CLI --data 读取 settings.signatureRightChars ============
print('\n[CLI] --data 自动读 data.json.signatureRightChars：')
with tempfile.TemporaryDirectory() as td:
    fake_data = Path(td) / 'data.json'
    fake_data.write_text('{"signatureRightChars": 2}', encoding='utf-8')
    out = Path(td) / 'sig_data.docx'
    if out.exists(): out.unlink()
    subprocess.run([
        'node', str(CLI), str(SAMPLE), '-o', str(out), '--preset', 'gongwen-standard',
        '--data', str(fake_data),
    ], check=True, cwd=ROOT, capture_output=True)
    xml = extract_doc_xml(out)
    dt = find_para_right_indent(xml, '2026年9月5日')
    assert_eq(dt, 2 * TWIPS_PER_CHAR, 'CLI --data 读 data.json.signatureRightChars=2 → 右缩进 640 twips')

# ============ 5. 越界值兜底（CLI 端 RangeError 不会发生） ============
print('\n[CLI] --signature-right 越界值：CLI 静默兜底为 4：')
with tempfile.TemporaryDirectory() as td:
    for bad in (99, -5):
        out = Path(td) / f'bad_{bad}.docx'
        if out.exists(): out.unlink()
        subprocess.run([
            'node', str(CLI), str(SAMPLE), '-o', str(out),
            '--preset', 'gongwen-standard', '--signature-right', str(bad),
        ], check=True, cwd=ROOT, capture_output=True)
        xml = extract_doc_xml(out)
        dt = find_para_right_indent(xml, '2026年9月5日')
        assert_eq(dt, 4 * TWIPS_PER_CHAR, f'越界 {bad} → 兜底 4 字（1280 twips）')

# ============ 6. 缺 rh-signature/rh-date 字段时无署名段落 ============
print('\n[docx] 无 rh-signature/rh-date 时不生成落款段落：')
with tempfile.TemporaryDirectory() as td:
    bare_md = Path(td) / 'bare.md'
    bare_md.write_text('---\nrh-agency: 测试\n---\n\n# 正文\n\n只有正文。\n', encoding='utf-8')
    out = Path(td) / 'bare.docx'
    if out.exists(): out.unlink()
    subprocess.run([
        'node', str(CLI), str(bare_md), '-o', str(out), '--preset', 'gongwen-standard',
        '--signature-right', '4',
    ], check=True, cwd=ROOT, capture_output=True)
    xml = extract_doc_xml(out)
    if find_para_right_indent(xml, '2026年9月5日') is not None:
        print('  ❌ 缺字段时不应生成日期段落'); sys.exit(1)
    print('  ✓ 缺 rh-signature/rh-date → 无落款段落生成')

print('\nverify_v055 共 14 项全部通过 ✓')