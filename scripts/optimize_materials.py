"""Rebuild genuine showroom crops. Requires Pillow. No upscaling or invented textures.
Coordinates are pixels in the supplied 1496 × 1496 photographs.
Names are used only when legible; existing unmatched marble assets stay in the catalog.
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/materials'
SOURCES = OUT / 'source'
manifest = []

def export(slug, source, box=None, widths=(320, 640), label=None):
    image = ImageOps.exif_transpose(Image.open(SOURCES / f'{source}.jpeg')).convert('RGB')
    if box:
        image = image.crop(box)
    files = []
    for width in sorted(set(min(w, image.width) for w in widths)):
        height = round(image.height * width / image.width)
        target = OUT / f'{slug}-{width}.webp'
        image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=86, method=6)
        files.append({'path': str(target.relative_to(ROOT)), 'width': width, 'height': height, 'bytes': target.stat().st_size})
    manifest.append({'slug': slug, 'source': f'source/{source}.jpeg', 'crop': box, 'label': label, 'files': files})

# Main cards isolate each category: the quartz image excludes the neighboring marble display.
export('marble-card', 'marble-1', (275, 0, 1380, 1496), (480, 800, 1105))
export('quartz-card', 'quartz', (125, 0, 1030, 1496), (480, 800, 905))
export('granite-card', 'granite', (45, 115, 1496, 1265), (480, 800, 1200))
for source in ('marble-1', 'marble-2', 'granite'):
    export(f'{source}-showroom', source, widths=(640, 1100, 1496))
export('quartz-showroom', 'quartz', (125, 0, 1030, 1496), (640, 905))

for slug, source, label, box in [
    ('travertino-romano', 'marble-1', 'Travertino Romano', (312, 448, 736, 622)),
    ('onix-verde', 'marble-2', 'Onix Verde', (156, 475, 494, 623)),
    ('crema-capri', 'marble-1', 'Crema Capri', (305, 170, 732, 310)),
    ('botticino-classico', 'marble-1', 'Botticino Classico', (330, 740, 740, 893)),
    ('arabescato-fantastico', 'marble-1', 'Arabescato Fantástico', (768, 716, 1070, 846)),
    ('breccia-pernice', 'marble-2', 'Breccia Pernice', (153, 234, 494, 379)),
    ('rojo-alicante', 'marble-2', 'Rojo Alicante', (521, 223, 898, 385)),
    ('rosso-verona', 'marble-2', 'Rosso Verona', (929, 213, 1354, 380)),
    ('verde-quetzal', 'marble-2', 'Verde Quetzal', (917, 487, 1328, 645)),
    ('rosa-noruega', 'marble-2', 'Rosa Noruega', (909, 762, 1305, 899)),
    ('kenia-black', 'marble-2', 'Kenia Black', (889, 1255, 1272, 1360)),
]:
    export(slug, source, box, label=label)

quartz = [
    ('quartz-01', 'Muestra 01', (151, 201, 539, 377)),
    ('quartz-02', 'Muestra 02', (570, 183, 997, 370)),
    ('quartz-03', 'Muestra 03', (230, 467, 545, 648)),
    ('quartz-04', 'Muestra 04', (625, 489, 994, 662)),
    ('quartz-05', 'Muestra 05', (204, 765, 546, 904)),
    ('quartz-06', 'Muestra 06', (618, 789, 991, 929)),
    ('mistral', 'Mistral', (183, 1004, 550, 1130)),
    ('stardust-white', 'Stardust White', (583, 1028, 981, 1165)),
    ('quartz-09', 'Muestra 09', (388, 1249, 552, 1396)),
    ('stardust-black', 'Stardust Black', (585, 1280, 926, 1415)),
]
for slug, label, box in quartz:
    export(slug, 'quartz', box, label=label)

granite_names = [
    ['Negro África brillada', 'Negro África honed', 'Blue Pearl', 'Alaska White'],
    ['Negro Absoluto', 'Labrador Oscuro', 'Verde Ubatuba', 'Tan Brown'],
    ['Verde Olivo', 'Muestra 10', 'Paradiso Argentino', 'Blanco Macaubas'],
    ['Aurora', 'Rojo Tigrato', 'Rojo Imperial', 'Rojo Multicolor'],
    ['Baltic Brown', 'Desert Brown', 'Giallo Antico', 'Muestra 20'],
]
# Inset rectangles avoid shelf rails, name labels and foreground obstructions.
rows = [(250, 378), (467, 588), (686, 799), (888, 997), (1090, 1192)]
columns = [[(80, 404), (439, 765), (796, 1124), (1160, 1477)],
           [(92, 410), (441, 762), (793, 1110), (1142, 1460)],
           [(100, 416), (446, 759), (791, 1098), (1133, 1447)],
           [(110, 418), (449, 754), (788, 1091), (1124, 1428)],
           [(120, 426), (458, 752), (788, 1086), (1116, 1260)]]
for row, (top, bottom) in enumerate(rows):
    for col, (left, right) in enumerate(columns[row]):
        index = row * 4 + col + 1
        export(f'granite-{index:02}', 'granite', (left, top, right, bottom), label=granite_names[row][col])

(OUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'{len(manifest)} genuine image sets; {sum(f["bytes"] for entry in manifest for f in entry["files"]):,} bytes total')
