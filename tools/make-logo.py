#!/usr/bin/env python3
"""
Turn the supplied logo JPEG into web-ready assets.

The source is a JPEG, so it has no transparency and carries a solid white
box around the green shield. We flood-fill transparency inwards from the
edges only, which removes that outer box while KEEPING the white areas
inside the artwork (the globe's centre band and the INTERNATIONAL bar).

    python3 tools/make-logo.py originals/logo.jpeg
"""
import sys
from collections import deque
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else "originals/logo.jpeg"
OUT = "assets/img/brand"
NEAR_WHITE = 238          # channel value at or above this counts as background

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

def is_bg(x, y):
    r, g, b, _ = px[x, y]
    return r >= NEAR_WHITE and g >= NEAR_WHITE and b >= NEAR_WHITE

# ---- flood fill from every border pixel ---------------------------------
seen = bytearray(w * h)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if is_bg(x, y) and not seen[y * w + x]:
            seen[y * w + x] = 1; q.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if is_bg(x, y) and not seen[y * w + x]:
            seen[y * w + x] = 1; q.append((x, y))

while q:
    x, y = q.popleft()
    px[x, y] = (255, 255, 255, 0)
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and is_bg(nx, ny):
            seen[ny * w + nx] = 1
            q.append((nx, ny))

cleared = sum(seen)

# ---- trim to the artwork, then pad back to a square ---------------------
bbox = img.getbbox()
img = img.crop(bbox)
side = max(img.size)
pad = int(side * 0.04)                      # a little breathing room
canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), (255, 255, 255, 0))
canvas.paste(img, ((canvas.width - img.width) // 2, (canvas.height - img.height) // 2))

# ---- export -------------------------------------------------------------
canvas.resize((512, 512), Image.LANCZOS).save(f"{OUT}/logo.png")
canvas.resize((180, 180), Image.LANCZOS).save(f"{OUT}/logo-icon.png")
# Browser icons are built separately by tools/make-favicon.py, which
# simplifies the mark so it stays legible at 16px.

print(f"source        {w}x{h}")
print(f"background    {cleared} px made transparent")
print(f"trimmed to    {bbox[2]-bbox[0]}x{bbox[3]-bbox[1]} (bbox {bbox})")
print(f"written       {OUT}/logo.png, logo-icon.png")
print("next          python3 tools/make-favicon.py")
