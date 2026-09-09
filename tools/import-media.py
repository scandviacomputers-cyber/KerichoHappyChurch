#!/usr/bin/env python3
"""
Import photos and videos from originals/ into the web assets folder.

For every image it:
  * applies the EXIF orientation flag and bakes the rotation into the pixels
    (phones store "rotate 90" as a tag; not every renderer honours it)
  * strips ALL metadata — these files carry GPS coordinates, and publishing
    those would expose exactly where each photo was taken
  * converts HEIC/HEIF (what iPhones shoot) into JPEG, which browsers
    can actually display
  * resizes to fit within 1600px and re-encodes as progressive JPEG

    python3 tools/import-media.py originals/photo.jpg [more...]
"""
import sys, os, subprocess, tempfile
from PIL import Image, ImageOps

OUT = "assets/img/photos"
MAX = 1600
QUALITY = 78

def slug(name):
    s = os.path.splitext(os.path.basename(name))[0].lower()
    keep = "".join(c if c.isalnum() else "-" for c in s)
    while "--" in keep:
        keep = keep.replace("--", "-")
    return keep.strip("-")

def main(paths):
    os.makedirs(OUT, exist_ok=True)
    for p in paths:
        if not os.path.isfile(p):
            print(f"skip (not a file): {p}"); continue
        src = p
        tmp = None
        if os.path.splitext(p)[1].lower() in (".heic", ".heif"):
            # Pillow cannot read HEIC; macOS sips can, so transcode first.
            tmp = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False).name
            subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "95",
                            p, "--out", tmp],
                           check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            src = tmp
        im = Image.open(src)
        before = im.size
        im = ImageOps.exif_transpose(im)          # bake rotation
        rotated = im.size != before
        im = im.convert("RGB")
        im.thumbnail((MAX, MAX), Image.LANCZOS)   # only ever shrinks

        clean = Image.new("RGB", im.size)         # new image = no EXIF at all
        clean.putdata(list(im.getdata()))

        out = os.path.join(OUT, slug(p) + ".jpg")
        clean.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        kb = os.path.getsize(out) // 1024
        print(f"{os.path.basename(out):<30} {im.size[0]}x{im.size[1]:<6} {kb:>5} KB"
              f"{'  (rotated)' if rotated else ''}{'  (from HEIC)' if tmp else ''}")
        if tmp:
            os.unlink(tmp)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    main(sys.argv[1:])
