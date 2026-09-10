# Kericho Happy Church — The City Church

A fast, dependency-free website for Kericho Happy Church. Plain HTML, CSS and
JavaScript — no build step, no framework, no npm install. Open it, edit it, ship it.

## Run it locally

```bash
python3 -m http.server 4321 --directory .
```

Then open <http://localhost:4321>.

## Files

```
index.html          Homepage
about.html          Story, mission, beliefs, leadership
ministries.html     12 ministries with filtering
sermons.html        Featured message + filterable archive
events.html         Weekly rhythm + upcoming events (auto-hides past dates)
give.html           M-Pesa, bank, in person + giving FAQs
contact.html        Contact cards, "what to expect", message form, map
assets/css/styles.css   Design system + all styles
assets/js/site.config.js   ← EDIT THIS FIRST: all church details
assets/js/site.js       Header/footer rendering + interactions
assets/img/             Generated SVG artwork (swap for real photos)
```

## Edit this first

Everything that changes often lives in **`assets/js/site.config.js`**:
phone numbers, email, address, service times, M-Pesa paybill, bank details,
social links and leadership. Change it once and every page updates.

Placeholders still to replace: phone numbers, email, exact street address,
M-Pesa paybill/till, bank account, social URLs, and leaders' names.

## Adding content

- **Sermons** — edit the `SERMONS` array at the bottom of `sermons.html`.
- **Events** — edit the `EVENTS` array at the bottom of `events.html`.
  Dates are `YYYY-MM-DD`; anything in the past disappears automatically.
- **Service times** — the `services` array in `site.config.js` drives the
  homepage strip, the times list, the countdown and the footer.

## Photos and logo

The artwork in `assets/img/` is generated SVG standing in for photography.
Real photos drop in without touching any HTML:

1. **Optimise them** (resizes + compresses, uses macOS's built-in `sips`):

   ```bash
   ./tools/prepare-images.sh ~/Desktop/church-photos/*.jpg
   ./tools/prepare-images.sh --logo ~/Desktop/hcmi-logo.png
   ```

2. **Map them** in the `window.PHOTOS` block of `assets/js/site.config.js`:

   ```js
   kids: { src: "assets/img/photos/happy-kids.jpg", alt: "Children in Happy Kids class" },
   ```

Slots left as `null` keep their illustration, so photos can go in one at a
time. See `assets/img/photos/README.md` for all 20 slots, the shape each one
needs, and a note on photo permission.

Leader portraits are separate: add `photo:` to any entry in the `leaders`
array. Portraits get an upright 4:5 frame, so supply a head-and-shoulders
shot at least **800px on the short side** — anything smaller goes blurry.

### Cache busting

The CSS and JS links carry a `?v=YYYYMMDD` stamp. **Bump it whenever you
change `styles.css` or either JS file**, otherwise returning visitors keep
running the old cached copy:

```bash
sed -i '' 's/?v=[0-9]\{8\}/?v='"$(date +%Y%m%d)"'/g' *.html
```

### The logo

The supplied logo (`originals/logo.jpeg`) is processed into web assets by
two scripts. Re-run them only if the logo itself changes:

```bash
python3 tools/make-logo.py originals/logo.jpeg    # transparent PNG for header/footer
python3 tools/make-favicon.py                     # browser-tab icons
```

`make-logo.py` flood-fills transparency inwards from the edges, which strips
the white box the JPEG carries while keeping the white *inside* the artwork
(the globe band and the INTERNATIONAL bar).

`make-favicon.py` builds a simplified mark — the shield silhouette from the
logo's own alpha channel, in brand green, with the brand-red cross enlarged.
The full logo is four elements plus two lines of text, which turns to mush at
the 16px browser tabs actually use; the simplified mark stays readable.

Brand colours sampled from the logo: green `#A8C848`, red `#D83038`,
blue `#484898`.

If `assets/img/brand/logo.png` is ever missing, the header falls back to the
built-in dove mark rather than showing a broken image.

## Deploying

The site is hosted on **Netlify**, deployed from the `main` branch of
GitHub. Push, and Netlify rebuilds within about a minute:

```bash
git add -A && git commit -m "Update" && git push
```

`netlify.toml` sets the cache headers. HTML always revalidates, so a
change shows on the next refresh, while photos, video and the
versioned CSS/JS stay cached.

**Deploy from GitHub, not from your Mac.** A Git deploy only publishes
committed files, which keeps `originals/` private — it holds 200+ MB
of source photos, many still carrying the GPS coordinates recorded by
the camera. Running `netlify deploy` from this folder would upload
that whole directory.

Bump the asset stamp whenever you change CSS or JS:

```bash
sed -i '' 's/?v=[0-9]\{8,12\}/?v='"$(date +%Y%m%d%H%M)"'/g' *.html
```

## The map

The Contact page uses **Leaflet + OpenStreetMap tiles**, self-hosted from
`assets/vendor/leaflet/` (no CDN, no API key, no tracking).

This is deliberate. Google's keyless embed labels every nearby business,
including other churches, and there is no way to switch those off without a
paid Maps API key. OpenStreetMap at zoom 16 draws roads, buildings and street
names but no places of worship — so ours is the only church on the map.

**Zoom is capped at 16 on purpose.** From zoom 17 OpenStreetMap starts
rendering church names. If you ever want closer zoom without other churches
appearing, that needs a vector basemap (MapLibre + OpenFreeMap) with the
points-of-interest layer switched off.

The pin, centre and zoom all come from `contact.lat` / `contact.lng` in
`site.config.js`. If the library or tiles fail to load, the map area falls
back to a link card rather than an empty box.

Note: OpenStreetMap's public tile servers are free but intended for modest
traffic. If the site ever gets busy, move to a paid tile provider.

## Notes

- The contact form opens the visitor's email app (no server needed). To collect
  submissions properly, point the `<form>` at Formspree, Netlify Forms or your
  own endpoint.
- Fonts load from Google Fonts; the site falls back to system fonts offline.
- Respects `prefers-reduced-motion`, keyboard focus and screen readers.
