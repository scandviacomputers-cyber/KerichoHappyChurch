#!/usr/bin/env python3
"""
Build a favicon that stays legible at 16px.

The full logo has four elements (wordmark, cross, doves, globe) plus two
lines of text. At browser-tab size that becomes an unreadable smudge, so
this makes a simplified mark from the church's OWN artwork: the shield
silhouette taken straight from the logo's alpha channel, in the brand
green, with the brand-red cross enlarged to fill it.
"""
from PIL import Image, ImageDraw

GREEN = (168, 200, 72, 255)     # #A8C848 sampled from the logo
RED   = (216, 48, 56, 255)      # #D83038 sampled from the logo
OUT   = "assets/img/brand"
S     = 512

logo = Image.open(f"{OUT}/logo.png").convert("RGBA")
mask = logo.split()[3].resize((S, S), Image.LANCZOS).point(lambda v: 255 if v > 128 else 0)

icon = Image.new("RGBA", (S, S), (0, 0, 0, 0))
icon.paste(Image.new("RGBA", (S, S), GREEN), (0, 0), mask)

d = ImageDraw.Draw(icon)
cx, cy = S // 2, int(S * 0.47)
bar, arm, up, down = int(S * 0.115), int(S * 0.30), int(S * 0.30), int(S * 0.34)
d.rectangle([cx - bar // 2, cy - up, cx + bar // 2, cy + down], fill=RED)   # upright
d.rectangle([cx - arm, cy - int(S * 0.10), cx + arm, cy + int(S * 0.015)], fill=RED)  # crossbar

for n in (512, 180, 64, 32, 16):
    icon.resize((n, n), Image.LANCZOS).save(f"{OUT}/mark-{n}.png")
icon.resize((256, 256), Image.LANCZOS).save(
    f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print(f"wrote {OUT}/favicon.ico and mark-512/180/64/32/16.png")
