#!/usr/bin/env python3
"""
Check that every image and video the site references actually exists.

A missing file shows up as a broken image on the live site and is easy to
miss, so run this before deploying:

    python3 tools/check-media.py
"""
import re, os, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

PATTERN = re.compile(r'"(assets/(?:img|video)/[^"]+\.(?:jpg|jpeg|png|svg|mp4|ico))"')
# placeholders that appear in documentation comments, not real references
IGNORE = {"assets/img/photos/FILE.jpg", "assets/img/photos/pastor-name.jpg"}

refs = {}
for f in glob.glob("*.html") + glob.glob("assets/js/*.js"):
    for m in PATTERN.findall(open(f, encoding="utf-8").read()):
        # skip paths the JS builds at runtime, e.g. "assets/img/" + name + ".svg"
        if "+" in m or "'" in m:
            continue
        refs.setdefault(m, set()).add(f)

missing = {r: v for r, v in refs.items() if r not in IGNORE and not os.path.exists(r)}

# files on disk that nothing references
used = set(refs) | IGNORE
on_disk = set(glob.glob("assets/img/photos/*.jpg")) | set(glob.glob("assets/video/*.mp4"))
orphans = sorted(on_disk - used)

print(f"referenced : {len(refs)}")
print(f"missing    : {len(missing)}")
for r, where in sorted(missing.items()):
    print(f"   MISSING  {r}   (used in {', '.join(sorted(where))})")
print(f"unused     : {len(orphans)}")
for o in orphans:
    print(f"   unused   {o}")

sys.exit(1 if missing else 0)
