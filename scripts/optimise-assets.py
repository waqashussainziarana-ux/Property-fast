"""Composition-preserving resizing and lossy WebP encoding of generated assets."""
from PIL import Image
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / 'brand-assets'
assets = root / 'public' / 'assets'
for original, output, width in [
    ('property-fast-logo.png', 'logo.webp', 900),
    ('architecture.png', 'architecture.webp', 1122),
]:
    image = Image.open(source / original)
    image.thumbnail((width, 1800), Image.Resampling.LANCZOS)
    image.save(assets / output, 'WEBP', quality=94 if 'logo' in output else 85)
    print(output, image.size)
