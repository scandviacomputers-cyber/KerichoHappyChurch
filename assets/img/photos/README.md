# Photo slots

Drop your photos in this folder, then map them in `assets/js/site.config.js`
(the `window.PHOTOS` block). Any slot left as `null` keeps the placeholder
illustration, so you can add photos one at a time.

Run this first — it resizes and compresses everything for the web:

```bash
./tools/prepare-images.sh ~/Desktop/church-photos/*.jpg
```

## The 19 slots

| Slot | Where it appears | Shape | What to shoot |
|---|---|---|---|
| `hero` | Homepage headline background | 1920×1080 wide | Congregation worshipping, wide. Leave the left half uncluttered — text sits there |
| `welcome` | Homepage "When we gather" | 1200×750 | Church building / entrance, so visitors recognise it |
| `story` | Homepage + About "Our story" | 1200×750 | The church family together, warm and candid |
| `kids` | Happy Kids | 1200×750 | Children in class, engaged |
| `youth` | City Youth | 1200×750 | Teens in a youth session |
| `youngadults` | Young Adults & Campus | 1200×750 | Young adults gathered |
| `worship` | Worship Team | 1200×750 | Worship team leading |
| `prayer` | Prayer & Intercession | 1200×750 | People praying together |
| `bibleschool` | Bible School | 1200×750 | Teaching / open Bibles |
| `lifegroups` | Life Groups | 1200×750 | A group in a home |
| `hospitality` | Hospitality & Ushering | 1200×750 | Ushers welcoming at the door |
| `fellowship` | Men's & Women's Fellowship | 1200×750 | A fellowship gathering |
| `benevolence` | Benevolence & Care | 1200×750 | Care work — be sensitive, see below |
| `outreach` | City Outreach | 1200×750 | Outreach in the market or estates |
| `missions` | Missions | 1200×750 | Mission team or trip |
| `sermonLatest` | Sermons page + homepage | 1200×675 (16:9) | Pastor preaching |
| `eventEaster` | Events — Easter | 1200×750 | From a past Easter service |
| `eventConf` | Events — Conference | 1200×750 | From a past conference |
| `eventCarols` | Events — Carols | 1200×750 | Carols / candlelight |

## Practical notes

- **Landscape, not portrait.** Everything except the hero is a 16:10 frame.
  Portrait phone photos get cropped badly.
- **Shoot wide, crop later.** Faces near the edges may be cut on mobile.
- **Bright and sharp.** Dim phone photos of a dark sanctuary look worse than
  the illustrations — better to keep the illustration until you have a good shot.
- **Under 400 KB each.** The prepare script handles this.

## Permission

Get consent before publishing photos where individuals are recognisable —
especially **children** (ask the parents) and anyone in the benevolence
photos. A group shot from behind or a wide congregation shot avoids the
issue entirely. Once a photo is on the website it is public and gets indexed
by search engines.
