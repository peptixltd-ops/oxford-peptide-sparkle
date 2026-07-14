"""
Oxford Research Peptides — Label Export System
Extracts the approved website label design as print-ready vector artwork.

Label physical dimensions:
  Trim  : 60 mm × 30 mm
  Bleed : 3 mm (all sides)  → 66 mm × 36 mm
  Safe  : 3 mm inside trim  → 54 mm × 24 mm safe area
"""

import os, re, json
from pathlib import Path

OUT = Path("/mnt/documents/label-exports")
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "svg").mkdir(exist_ok=True)
(OUT / "pdf").mkdir(exist_ok=True)
(OUT / "png").mkdir(exist_ok=True)

# ---- Product data (mirrors src/lib/products.ts) ----
PRODUCTS = [
    ("retatrutide", "RETATRUTIDE", ["10MG", "20MG", "30MG", "40MG"]),
    ("tirzepatide", "TIRZEPATIDE", ["10MG", "20MG", "40MG"]),
    ("ghk-cu", "GHK-CU", ["50MG"]),
    ("mots-c", "MOTS-C", ["40MG"]),
    ("bacteriostatic-water", "BACTERIOSTATIC WATER", ["3ML"]),
    ("nad", "NAD+", ["500MG"]),
    ("bpc-tb500", "BPC-157 / TB-500", ["20MG BLEND"]),
    ("ipamorelin", "IPAMORELIN", ["10MG"]),
    ("selank", "SELANK", ["10MG"]),
    ("semaglutide", "SEMAGLUTIDE", ["15MG"]),
    ("tesamorelin", "TESAMORELIN", ["10MG"]),
    ("klow", "KLOW", ["80MG BLEND"]),
    ("tb-500", "TB-500", ["10MG"]),
    ("igf-lr3", "IGF-1 LR3", ["1MG"]),
    ("cagrilintide", "CAGRILINTIDE", ["10MG"]),
    ("ss-31", "SS-31", ["10MG", "50MG"]),
    ("pt-141", "PT-141", ["10MG"]),
    ("semax", "SEMAX", ["30MG"]),
    ("bpc-157", "BPC-157", ["10MG"]),
]

NAVY = "#0D1B2D"
NAVY_MID = "#1d3557"
STRIPE_TOP = "#7fa0c4"
STRIPE_MID = "#4a6d94"

# Print geometry (mm)
TRIM_W, TRIM_H = 60.0, 30.0
BLEED = 3.0
SAFE = 3.0
CANVAS_W = TRIM_W + 2 * BLEED    # 66
CANVAS_H = TRIM_H + 2 * BLEED    # 36

# SVG uses mm units directly
def label_svg(name: str, strength: str, batch: str = "ORP-XXXXX", with_marks: bool = True) -> str:
    # Auto-scale product name font-size to fit width
    max_chars_at_full = 11
    base_size = 5.2   # mm
    if len(name) > max_chars_at_full:
        base_size = max(3.0, base_size * max_chars_at_full / len(name))
    name_size = round(base_size, 2)

    # Positions (mm), origin top-left of full canvas (incl. bleed)
    cx = CANVAS_W / 2
    tx = BLEED  # trim origin x
    ty = BLEED  # trim origin y

    crop = ""
    if with_marks:
        m = 2.0  # mark length
        g = 1.0  # gap from trim
        def line(x1, y1, x2, y2):
            return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="black" stroke-width="0.15"/>'
        marks = []
        # 4 corners, 2 marks each
        corners = [
            (tx, ty),                       # TL
            (tx + TRIM_W, ty),              # TR
            (tx, ty + TRIM_H),              # BL
            (tx + TRIM_W, ty + TRIM_H),     # BR
        ]
        for (x, y) in corners:
            # Horizontal outward
            if x == tx:
                marks.append(line(x - g - m, y, x - g, y))
            else:
                marks.append(line(x + g, y, x + g + m, y))
            # Vertical outward
            if y == ty:
                marks.append(line(x, y - g - m, x, y - g))
            else:
                marks.append(line(x, y + g, x, y + g + m))
        crop = "\n".join(marks)

    # ORS monogram — rounded navy square with white "ORS"
    logo_x = tx + 5
    logo_y = ty + 3.5
    logo = f'''
      <g transform="translate({logo_x},{logo_y})">
        <rect x="0" y="0" width="6" height="6" rx="0.6" fill="{NAVY}"/>
        <text x="3" y="4.2" font-family="Georgia, 'Times New Roman', serif" font-size="2.8"
              font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.05">ORS</text>
      </g>
      <text x="{logo_x + 7.5}" y="{logo_y + 2.7}" font-family="Georgia, 'Times New Roman', serif"
            font-size="3.4" font-weight="700" fill="{NAVY}">Oxford</text>
      <text x="{logo_x + 7.5}" y="{logo_y + 5.4}" font-family="Helvetica, Arial, sans-serif"
            font-size="1.35" font-weight="600" fill="{NAVY}" letter-spacing="0.18">RESEARCH PEPTIDES</text>
    '''

    # Product name
    name_y = ty + 13.6
    name_block = f'''
      <text x="{cx}" y="{name_y}" font-family="Helvetica, Arial, sans-serif"
            font-size="{name_size}" font-weight="800" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.15">{name}</text>
    '''

    # Strength pill
    pill_w = max(10.0, 3.0 + len(strength) * 1.55)
    pill_h = 4.2
    pill_x = cx - pill_w / 2
    pill_y = ty + 15.6
    pill = f'''
      <rect x="{pill_x}" y="{pill_y}" width="{pill_w}" height="{pill_h}" rx="0.8"
            fill="none" stroke="{NAVY}" stroke-width="0.25"/>
      <text x="{cx}" y="{pill_y + 3.0}" font-family="Helvetica, Arial, sans-serif"
            font-size="2.4" font-weight="800" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.1">{strength}</text>
    '''

    # Disclaimer
    disc_y = ty + 22.0
    disclaimer = f'''
      <text x="{cx}" y="{disc_y}" font-family="Helvetica, Arial, sans-serif"
            font-size="1.7" font-weight="700" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.08">RESEARCH USE ONLY</text>
      <text x="{cx}" y="{disc_y + 1.9}" font-family="Helvetica, Arial, sans-serif"
            font-size="1.55" font-weight="600" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.06">NOT FOR HUMAN CONSUMPTION</text>
      <line x1="{tx + 4}" y1="{disc_y + 2.8}" x2="{tx + TRIM_W - 4}" y2="{disc_y + 2.8}"
            stroke="{NAVY}" stroke-width="0.18" opacity="0.35"/>
    '''

    # Batch
    batch_y = ty + TRIM_H - 2.4
    batch_block = f'''
      <text x="{cx}" y="{batch_y}" font-family="Helvetica, Arial, sans-serif"
            font-size="1.8" font-weight="700" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.08">BATCH: {batch}</text>
    '''

    # Background (label surface white)
    bg = f'<rect x="0" y="0" width="{CANVAS_W}" height="{CANVAS_H}" fill="#ffffff"/>'
    trim_bg = f'<rect x="{tx}" y="{ty}" width="{TRIM_W}" height="{TRIM_H}" fill="#f5f2ea"/>'

    stripe = ""

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="{CANVAS_W}mm" height="{CANVAS_H}mm"
     viewBox="0 0 {CANVAS_W} {CANVAS_H}">
  <title>{name} {strength} — Oxford Research Peptides vial label</title>
  {bg}
  {trim_bg}
  {stripe}
  {logo}
  {name_block}
  {pill}
  {disclaimer}
  {batch_block}
  {crop}
</svg>
'''
    return svg


manifest = []
for slug, name, strengths in PRODUCTS:
    for strength in strengths:
        s_slug = strength.lower().replace(" ", "-").replace("+", "plus").replace("/", "-")
        base = f"{slug}-{s_slug}"
        svg = label_svg(name, strength)
        (OUT / "svg" / f"{base}.svg").write_text(svg)
        manifest.append({"slug": slug, "name": name, "strength": strength, "file": base})

(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))
print(f"Wrote {len(manifest)} SVGs")
