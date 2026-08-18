"""
Oxford Research Peptides — Label Export System
Recreates the approved website vial-label artwork as print-ready vector.

Trim  : 60 mm × 30 mm
Bleed : 3 mm (all sides) → 66 mm × 36 mm canvas
Safe  : 3 mm inside trim
"""

import json
from pathlib import Path

OUT = Path("/mnt/documents/label-exports")
for d in ("svg", "pdf", "png"):
    (OUT / d).mkdir(parents=True, exist_ok=True)

PRODUCTS = [
    ("retatrutide", "RETATRUTIDE", ['10MG', '20MG', '30MG', '40MG', '50MG', '60MG']),
    ("tirzepatide", "TIRZEPATIDE", ['10MG', '15MG', '20MG', '30MG', '40MG', '50MG', '60MG']),
    ("ghk-cu", "GHK-CU", ['50MG']),
    ("mots-c", "MOTS-C", ['10MG', '40MG']),
    ("bacteriostatic-water", "BACTERIOSTATIC WATER", ['3ML', '10ML']),
    ("nad", "NAD+", ['500MG']),
    ("bpc-tb500", "BPC-157 / TB-500", ['20MG BLEND']),
    ("ipamorelin", "IPAMORELIN", ['10MG']),
    ("selank", "SELANK", ['10MG']),
    ("semaglutide", "SEMAGLUTIDE", ['15MG']),
    ("tesamorelin", "TESAMORELIN", ['10MG']),
    ("klow", "KLOW", ['80MG BLEND']),
    ("tb-500", "TB-500", ['10MG']),
    ("igf-lr3", "IGF-1 LR3", ['1MG']),
    ("cagrilintide", "CAGRILINTIDE", ['5MG', '10MG']),
    ("ss-31", "SS-31", ['50MG']),
    ("pt-141", "PT-141", ['10MG']),
    ("semax", "SEMAX", ['10MG', '30MG']),
    ("bpc-157", "BPC-157", ['5MG', '10MG']),
]

NAVY = "#1B3A5F"        # Wordmark navy on-site
NAVY_DARK = "#0D1B2D"   # Deep navy (bottom stripe)
GREY = "#6b7684"        # "RESEARCH PEPTIDES" sublabel grey

TRIM_W, TRIM_H = 60.0, 30.0
BLEED = 3.0
CANVAS_W = TRIM_W + 2 * BLEED
CANVAS_H = TRIM_H + 2 * BLEED

SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"


def crop_marks(tx, ty):
    m, g = 2.0, 1.0
    out = []
    corners = [(tx, ty), (tx + TRIM_W, ty), (tx, ty + TRIM_H), (tx + TRIM_W, ty + TRIM_H)]
    for x, y in corners:
        if x == tx:
            out.append(f'<line x1="{x-g-m}" y1="{y}" x2="{x-g}" y2="{y}" stroke="black" stroke-width="0.15"/>')
        else:
            out.append(f'<line x1="{x+g}" y1="{y}" x2="{x+g+m}" y2="{y}" stroke="black" stroke-width="0.15"/>')
        if y == ty:
            out.append(f'<line x1="{x}" y1="{y-g-m}" x2="{x}" y2="{y-g}" stroke="black" stroke-width="0.15"/>')
        else:
            out.append(f'<line x1="{x}" y1="{y+g}" x2="{x}" y2="{y+g+m}" stroke="black" stroke-width="0.15"/>')
    return "\n".join(out)


def label_svg(name: str, strength: str, batch: str = "ORP-XXXXX") -> str:
    tx, ty = BLEED, BLEED

    # Auto-fit product name
    base = 5.4
    max_c = 11
    if len(name) > max_c:
        base = max(3.0, base * max_c / len(name))
    name_size = round(base, 2)

    # ---------- Header lockup (top-left) ----------
    # ORS badge: bordered square, small "O R" over "S" in navy
    bx = tx + 4.0
    by = ty + 3.2
    bs = 6.4  # badge size
    badge = f'''
      <rect x="{bx}" y="{by}" width="{bs}" height="{bs}" rx="0.5"
            fill="none" stroke="{NAVY}" stroke-width="0.35"/>
      <text x="{bx + bs*0.28}" y="{by + bs*0.48}" font-family="{SANS}"
            font-size="2.1" font-weight="700" fill="{NAVY}" text-anchor="middle">O</text>
      <text x="{bx + bs*0.72}" y="{by + bs*0.48}" font-family="{SANS}"
            font-size="2.1" font-weight="700" fill="{NAVY}" text-anchor="middle">R</text>
      <text x="{bx + bs*0.50}" y="{by + bs*0.88}" font-family="{SANS}"
            font-size="2.1" font-weight="700" fill="{NAVY}" text-anchor="middle">S</text>
    '''

    # Wordmark right of badge
    wx = bx + bs + 1.6
    wordmark = f'''
      <text x="{wx}" y="{by + 3.8}" font-family="{SANS}"
            font-size="4.2" font-weight="700" fill="{NAVY}" letter-spacing="0.02">OXFORD</text>
      <text x="{wx}" y="{by + 6.2}" font-family="{SANS}"
            font-size="1.55" font-weight="600" fill="{GREY}" letter-spacing="0.22">RESEARCH PEPTIDES</text>
    '''

    # ---------- Product name (centered) ----------
    name_y = ty + 15.2
    name_block = f'''
      <text x="{tx + TRIM_W/2}" y="{name_y}" font-family="{SANS}"
            font-size="{name_size}" font-weight="700" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.18">{name}</text>
    '''

    # ---------- Strength pill ----------
    pill_w = max(9.0, 2.6 + len(strength) * 1.45)
    pill_h = 3.8
    pill_x = tx + TRIM_W/2 - pill_w/2
    pill_y = ty + 17.0
    pill = f'''
      <rect x="{pill_x}" y="{pill_y}" width="{pill_w}" height="{pill_h}" rx="0.6"
            fill="none" stroke="{NAVY}" stroke-width="0.3"/>
      <text x="{tx + TRIM_W/2}" y="{pill_y + 2.75}" font-family="{SANS}"
            font-size="2.1" font-weight="700" fill="{NAVY}" text-anchor="middle"
            letter-spacing="0.12">{strength}</text>
    '''

    # ---------- Disclaimer (left-aligned) ----------
    disc_x = tx + 4.0
    disc_y = ty + 24.0
    disclaimer = f'''
      <text x="{disc_x}" y="{disc_y}" font-family="{SANS}"
            font-size="1.55" font-weight="700" fill="{NAVY}"
            letter-spacing="0.06">RESEARCH USE ONLY</text>
      <text x="{disc_x}" y="{disc_y + 1.75}" font-family="{SANS}"
            font-size="1.4" font-weight="600" fill="{NAVY}"
            letter-spacing="0.05">NOT FOR HUMAN CONSUMPTION</text>
    '''

    # Divider
    div_y = disc_y + 2.6
    divider = f'<line x1="{tx + 4.0}" y1="{div_y}" x2="{tx + TRIM_W - 4.0}" y2="{div_y}" stroke="{NAVY}" stroke-width="0.15" opacity="0.55"/>'

    # Batch (centered under divider)
    batch_y = div_y + 2.0
    batch_block = f'''
      <text x="{tx + TRIM_W/2}" y="{batch_y}" font-family="{SANS}"
            font-size="1.55" font-weight="700" fill="{NAVY}"
            text-anchor="middle" letter-spacing="0.06">BATCH:  {batch}</text>
    '''

    # Bottom navy stripe (site labels wrap in a dark band at the base)
    stripe_h = 1.4
    stripe = f'<rect x="{tx}" y="{ty + TRIM_H - stripe_h}" width="{TRIM_W}" height="{stripe_h}" fill="{NAVY_DARK}"/>'

    bg = f'<rect x="0" y="0" width="{CANVAS_W}" height="{CANVAS_H}" fill="#ffffff"/>'
    trim_bg = f'<rect x="{tx}" y="{ty}" width="{TRIM_W}" height="{TRIM_H}" fill="#ffffff"/>'

    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="{CANVAS_W}mm" height="{CANVAS_H}mm"
     viewBox="0 0 {CANVAS_W} {CANVAS_H}">
  <title>{name} {strength} — Oxford Research Peptides vial label</title>
  {bg}
  {trim_bg}
  {badge}
  {wordmark}
  {name_block}
  {pill}
  {disclaimer}
  {divider}
  {batch_block}
  {stripe}
  {crop_marks(tx, ty)}
</svg>
'''


manifest = []
for slug, name, strengths in PRODUCTS:
    for strength in strengths:
        s_slug = strength.lower().replace(" ", "-").replace("+", "plus").replace("/", "-")
        base = f"{slug}-{s_slug}"
        (OUT / "svg" / f"{base}.svg").write_text(label_svg(name, strength))
        manifest.append({"slug": slug, "name": name, "strength": strength, "file": base})

(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))
print(f"Wrote {len(manifest)} SVGs")
