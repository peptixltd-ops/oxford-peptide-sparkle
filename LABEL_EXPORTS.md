# Label Exports — Oxford Research Peptides

Print-ready extraction of the approved website vial labels. No redesign —
artwork mirrors the current mockups shown on the storefront.

## Locations

- `label-exports/svg/` — editable vector SVG (text remains selectable text)
- `label-exports/pdf/` — print-ready PDF with 3 mm bleed and crop marks
- `label-exports/png/` — 1600 px wide transparent-flat PNG (marketing)
- `label-exports/manifest.json` — machine-readable index of all variants

Each file is named `<product-slug>-<strength>.{svg|pdf|png}`
(e.g. `retatrutide-10mg.pdf`, `ss-31-50mg.pdf`).

## Physical dimensions

| Measure       | Value              |
| ------------- | ------------------ |
| Trim size     | **60 mm × 30 mm**  |
| Bleed         | 3 mm (all sides)   |
| Canvas w/ bleed | 66 mm × 36 mm    |
| Safe area     | 3 mm inside trim (54 mm × 24 mm) |
| Crop marks    | 2 mm marks, 1 mm gap from trim, 0.15 pt hairline |

The SVG viewBox is expressed in millimetres, so 1 unit = 1 mm at 100%.

## Colour

| Element              | Hex       | Notes                    |
| -------------------- | --------- | ------------------------ |
| Navy (primary)       | `#0D1B2D` | text, monogram fill      |
| Label substrate      | `#F5F2EA` | matches website mockup   |
| Divider rule         | `#0D1B2D` @ 35% opacity | hairline 0.18 mm |

Convert to CMYK on press: Navy ≈ C90 M78 Y50 K60. Substrate is warm
off-white; supplier may print on natural stock and omit the fill.

## Typography

- **Wordmark "Oxford"** — Georgia / Times Roman family, 700 weight
- **"RESEARCH PEPTIDES" sub-lockup** — Helvetica / Arial 600, tracked +0.18
- **Product name** — Helvetica / Arial 800, auto-scaled to fit width
- **Strength pill** — Helvetica / Arial 800 inside 0.25 mm navy stroke
- **Disclaimer & BATCH** — Helvetica / Arial 700

Text in the SVG is live text. If the supplier prefers, outline the type in
Illustrator (`Type → Create Outlines`) before sending to plate.

## Variable fields (already present, left as placeholder)

Only the **BATCH** line is a variable field on the current design.
The exported files ship with `BATCH: ORP-XXXXX` as a placeholder — the
supplier populates this per production run (typically via variable-data
printing or a batch-code overprint station).

No other variable fields exist on the approved artwork. No Lot,
Manufacture Date, Expiry Date, or QR code appear on the website mockup
and none have been introduced.

## Export workflow

The exports are produced by `scripts/gen_labels.py` (kept alongside
the release notes). The pipeline is:

1. Python builds an SVG per SKU from the product list in
   `src/lib/products.ts`.
2. `rsvg-convert -f pdf` produces the vector PDF with crop marks.
3. `rsvg-convert -f png -w 1600` produces the marketing PNG.

Re-run when a new SKU is added:

```bash
python3 scripts/gen_labels.py
for f in /mnt/documents/label-exports/svg/*.svg; do
  b=$(basename "$f" .svg)
  rsvg-convert -f pdf -o /mnt/documents/label-exports/pdf/$b.pdf "$f"
  rsvg-convert -f png -w 1600 -o /mnt/documents/label-exports/png/$b.png "$f"
done
```

## Supplier notes

- Files supplied at final size, 1:1 scale.
- Bleed already included in canvas; **do not** re-scale.
- Crop marks are outside the trim box — keep them for cutting registration.
- Fonts are common system fonts; outline before RIP if the supplier
  cannot guarantee Helvetica / Georgia availability.
- Substrate: matte white BOPP or paper label stock, gloss laminate optional.

## Variant coverage

25 SKUs generated across 19 products. See `manifest.json` for the full
list — every variant currently sold on `oxfordresearchpeptides.com` has a
matching label file.
