#!/usr/bin/env bash
# =============================================================
#  prepare-images.sh — resize + optimise photos for the website
#
#  Usage:
#     ./tools/prepare-images.sh ~/Desktop/church-photos/*.jpg
#     ./tools/prepare-images.sh --logo ~/Desktop/hcmi-logo.png
#
#  Photos  -> assets/img/photos/  (max 1600px wide, JPEG quality 72)
#  Logo    -> assets/img/brand/logo.png (max 512px, transparency kept)
#
#  Uses macOS's built-in `sips` — nothing to install.
# =============================================================
set -euo pipefail

cd "$(dirname "$0")/.."
PHOTO_DIR="assets/img/photos"
BRAND_DIR="assets/img/brand"
mkdir -p "$PHOTO_DIR" "$BRAND_DIR"

if [ $# -eq 0 ]; then
  sed -n '2,13p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

# ---- logo mode ----------------------------------------------
if [ "${1:-}" = "--logo" ]; then
  shift
  [ $# -ge 1 ] || { echo "error: --logo needs a file path"; exit 1; }
  src="$1"
  [ -f "$src" ] || { echo "error: no such file: $src"; exit 1; }
  cp "$src" "$BRAND_DIR/logo-original.${src##*.}"
  sips -Z 512 -s format png "$src" --out "$BRAND_DIR/logo.png" >/dev/null
  # small square version for the browser tab
  sips -Z 180 -s format png "$src" --out "$BRAND_DIR/logo-icon.png" >/dev/null
  echo "logo    -> $BRAND_DIR/logo.png  ($(du -h "$BRAND_DIR/logo.png" | cut -f1))"
  echo "icon    -> $BRAND_DIR/logo-icon.png"
  echo
  echo "Original kept at $BRAND_DIR/logo-original.${src##*.}"
  exit 0
fi

# ---- photo mode ---------------------------------------------
count=0
for src in "$@"; do
  [ -f "$src" ] || { echo "skip (not a file): $src"; continue; }

  base="$(basename "${src%.*}")"
  # tidy the filename: lowercase, spaces and underscores become dashes
  slug="$(echo "$base" | tr '[:upper:] _' '[:lower:]--' | sed 's/[^a-z0-9-]//g; s/--*/-/g; s/^-//; s/-$//')"
  out="$PHOTO_DIR/$slug.jpg"

  # Only ever shrink. Enlarging a small photo adds file size and blur but
  # no detail, so images already under the cap are converted at native size.
  srcw=$(sips -g pixelWidth "$src" | awk '/pixelWidth/{print $2}')
  if [ -n "$srcw" ] && [ "$srcw" -gt 1600 ]; then
    sips -Z 1600 -s format jpeg -s formatOptions 72 "$src" --out "$out" >/dev/null 2>&1
  else
    sips -s format jpeg -s formatOptions 72 "$src" --out "$out" >/dev/null 2>&1
  fi

  dims="$(sips -g pixelWidth -g pixelHeight "$out" | awk '/pixel/{printf "%s ", $2}')"
  printf '%-42s %-12s %s\n' "$(basename "$out")" "${dims% }" "$(du -h "$out" | cut -f1)"
  count=$((count+1))
done

echo
echo "$count photo(s) ready in $PHOTO_DIR"
echo "Now add them to window.PHOTOS in assets/js/site.config.js, e.g.:"
echo '   kids: { src: "assets/img/photos/'"${slug:-your-photo}"'.jpg", alt: "Children in Happy Kids class" },'
