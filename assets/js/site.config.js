/* =============================================================
   HAPPY CHURCH KERICHO — THE CITY CHURCH
   Site configuration. EDIT THIS FILE to change church details.
   Everything here feeds the header, footer and key page sections.
   ============================================================= */

window.CHURCH = {
  name: "Kericho Happy Church",
  tagline: "The City Church",
  shortName: "Happy Church",
  motto: "A home for every heart in the heart of the city.",

  /* ---- Contact ------------------------------------------------ */
  contact: {
    phone: "+254 722 725 791",
    whatsapp: "254722725791",           // digits only, no +
    email: "hello@happychurchkericho.org",
    address: "Kericho Town, Kericho County, Kenya",
    addressLine2: "Kericho Town - Kenya",               // Google listing has no street name

    /* Exact location, taken from the church's own Google Maps listing.
       Listed there as "Happy Church Kericho Town- City Church". */
    plusCode: "J7QR+8P7",
    lat: -0.3622333,
    lng: 35.2918608,
    placeUrl: "https://maps.app.goo.gl/CYKSoAD9tMg62eGv7",
    mapQuery: "J7QR+8P7, Kericho, Kenya",       // fallback for text searches
    poBox: "P.O. Box 1360 - 20200, Kericho - Kenya"
  },

  /* ---- Service times ------------------------------------------
     day: 0=Sun 1=Mon ... 6=Sat   |  start: 24h "HH:MM"          */
  /* day: 0=Sun 1=Mon ... 6=Sat  |  start/end: 24h "HH:MM"
     `end` is optional — leave it out and only the start time shows.
     `tag` is the small label on the day badge. */
  services: [
    { name: "Morning Devotion",      day: 0, start: "06:30", tag: "Worship" },
    { name: "First Service",         day: 0, start: "09:00", end: "10:00", tag: "Worship" },
    { name: "Second Service",        day: 0, start: "10:00", end: "12:00", tag: "Worship" },
    { name: "Women Midweek Prayers", day: 3, start: "10:00", end: "15:00", tag: "Women" },
    { name: "Prayer Meeting",        day: 5, start: "17:00", tag: "Prayer" },
    { name: "Kesha",                 day: 5, start: "21:00", end: "04:00", tag: "Kesha",
      note: "Overnight prayer, every Friday" }
  ],

  /* ---- Giving -------------------------------------------------- */
  giving: {
    paybill: "522533",
    account: "7972058",

    /* Not supplied yet. Anything left null is hidden on the giving page
       rather than shown as zeros. */
    tillNumber: null,
    bankName: null,
    bankAccount: null,
    bankSwift: null
  },

  /* ---- Social -------------------------------------------------- */
  social: {
    youtube: "https://www.youtube.com/@johndeusofficial",
    tiktok: "https://www.tiktok.com/@john.deus.officia",

    /* Add a real page URL to bring these back; null keeps them hidden. */
    facebook: null,
    instagram: null,
    x: null
  },

  /* ---- Leadership ---------------------------------------------- */
  /* Add  photo: "assets/img/photos/pastor-name.jpg"  to any leader to
     replace the placeholder illustration with a real portrait. */
  leaders: [
    { name: "Pastor John Deus",
      role: "Senior Pastor",
      photo: "assets/img/photos/pastor-and-wife.jpg",
      bio: "Shepherding Kericho Happy Church, and carrying the gospel through crusades and ministry visits across Africa, Europe, Asia and America." }
  ]

};

/* Navigation — one place for every page link. */
window.NAV = [
  { label: "Home",       href: "index.html" },
  { label: "About",      href: "about.html" },
  { label: "Ministries", href: "ministries.html" },
  { label: "Sermons",    href: "sermons.html" },
  { label: "Events",     href: "events.html" },
  { label: "Contact",    href: "contact.html" }
];

/* =============================================================
   PHOTOS & LOGO
   -------------------------------------------------------------
   Drop your real image files into  assets/img/photos/  (and the
   logo into assets/img/brand/), then fill in the entries below.

   Each entry:  slot: { src: "assets/img/photos/FILE.jpg",
                        alt: "Plain description of the photo" }

   Any slot left as null keeps the placeholder illustration, so
   you can swap photos in one at a time without breaking a page.
   Run  ./tools/prepare-images.sh  first to resize + optimise.
   ============================================================= */

window.LOGO = {
  /* Set to null to use the built-in dove mark instead. */
  src: "assets/img/brand/logo.png",
  alt: "Christ HCMI International — Kericho Happy Church"
};

window.PHOTOS = {
  /* --- Homepage ------------------------------------------- */
  hero:          { src: "assets/img/photos/congregation-hall.jpg", alt: "The congregation gathered for a service at Kericho Happy Church" },   /* 1920x1080 — wide shot of the congregation or building */
  welcome:       { src: "assets/img/photos/church-building.jpg", alt: "The Kericho Happy Church building, with lawns and hedges" },   /* 1200x750  — the church exterior / where to find us    */
  story:         { src: "assets/img/photos/congregation-worship.jpg", alt: "The church family worshipping together during a service" },   /* 1200x750  — the church family together                */

  /* --- Ministry cards (1200x750 each) --------------------- */
  kids:          { src: "assets/img/photos/kids-ministry.jpg", alt: "Children at the Happy Kids ministry" },
  youth:         { src: "assets/img/photos/city-youth.jpg", alt: "The City Youth group together after a service" },
  youngadults:  null,
  outreach:      { src: "assets/img/photos/street-outreach.jpg", alt: "Church members out in the streets of Kericho - Kenya in the evening" },
  worship:       { src: "assets/img/photos/congregation-standing.jpg", alt: "The congregation standing in worship" },
  prayer:        { src: "assets/img/photos/prayer-2.jpg", alt: "A pastor laying hands on a member during prayer ministry" },
  lifegroups:   null,
  hospitality:   { src: "assets/img/photos/congregation-seated.jpg", alt: "The congregation seated before the service begins" },
  fellowship:   null,
  benevolence:  null,
  missions:      { src: "assets/img/photos/ministry-partners.jpg", alt: "Meeting ministry partners abroad" },
  bibleschool:  null,

  /* --- Sermons -------------------------------------------- */
  sermonLatest:  { src: "assets/img/photos/ministryabroad.jpg", alt: "Preaching the Word during a ministry visit" },   /* 1200x675 (16:9) — preaching shot */

  /* --- Events --------------------------------------------- */
  eventEaster:  null,
  eventConf:    null,
  eventCarols:  null

  /* The contact page now shows a live Google map built from
     contact.mapQuery, so it needs no photo slot. */
};

/* =============================================================
   GALLERIES
   Each key here matches a  data-gallery="<key>"  element in the HTML.
   An item is a photo:      { src: "...", caption: "..." }
   or a video:              { video: "...", poster: "...", caption: "..." }
   Videos open in the lightbox and only download when clicked.
   ============================================================= */
window.GALLERIES = {

  /* Homepage — the church's ministry outside Kenya */
  abroad: {
    eyebrow: "Our wider ministry",
    title: "Ministry beyond Kenya",
    intro: "The Lord has opened doors far beyond our own borders — open-air crusades, preaching and praying with believers in Tanzania, Ukraine, the United States, Denmark, Germany, Sweden and South Korea.",
    items: [
      { src: "assets/img/photos/prayer10.jpg", caption: "Standing together in prayer" },
      { src: "assets/img/photos/prayer-2.jpg", caption: "Laying on of hands" },
      { src: "assets/img/photos/prayer8.jpg",  caption: "Hands raised in worship" },
      { src: "assets/img/photos/prayer9.jpg",  caption: "Praying with believers" },
      { src: "assets/img/photos/prayer1.jpg",  caption: "Ministering one by one" },
      { src: "assets/img/photos/prayer4.jpg",  caption: "A congregation in worship" },
      { src: "assets/img/photos/prayer5.jpg",  caption: "Prayer for every person" },
      { src: "assets/img/photos/prayer6.jpg",  caption: "Receiving prayer" },
      { src: "assets/img/photos/prayer3.jpg",  caption: "Waiting on the Lord" },
      { src: "assets/img/photos/prayer7.jpg",  caption: "Praying through the room" },
      { src: "assets/img/photos/ministryabroad.jpg",  caption: "Preaching at a partner church" },
      { src: "assets/img/photos/ministryabroad1.jpg", caption: "Ministering abroad" },
      { src: "assets/img/photos/heritage-band.jpg", caption: "The early days in music" },
      { src: "assets/img/photos/heritage-singing.jpg", caption: "Leading a song" },
      { src: "assets/img/photos/heritage-keyboard.jpg", caption: "At the keyboard" },
      { src: "assets/img/photos/mission-crusade.jpg", caption: "A mission crusade" },
      { src: "assets/img/photos/mission-preaching.jpg", caption: "Preaching at an open-air crusade" },
      { src: "assets/img/photos/mission-crowd.jpg", caption: "Crowds at a mission crusade" },
      { src: "assets/img/photos/heritage-crusade.jpg", caption: "An open-air crusade in Tanzania" },
      { src: "assets/img/photos/idols-burning.jpg", caption: "Idols brought forward to be burned" },
      { src: "assets/img/photos/idols-burned.jpg", caption: "Burning the idols after people gave their lives to Christ" },
      { src: "assets/img/photos/testimony.jpg", caption: "A testimony at the crusade" },
      { src: "assets/img/photos/praying-for-people.jpg", caption: "Praying for people" },
      { src: "assets/img/photos/mission-ukraine.jpg", caption: "On mission in Ukraine" },
      { src: "assets/img/photos/heritage-preaching.jpg", caption: "Ministering the Word" },
      { src: "assets/img/photos/heritage-meeting.jpg", caption: "A gathering of believers" },
      { src: "assets/img/photos/heritage-children.jpg", caption: "Ministering to children" },
      { src: "assets/img/photos/ministry-pulpit.jpg", caption: "Ministering in song in the United States" }
    ]
  },



  /* About page — life at the church here in Kericho */
  life: {
    eyebrow: "Our church life",
    title: "Life at Kericho Happy Church",
    intro: "A few moments from our Sundays, our children's ministry and our life together in the city.",
    items: [
      { video: "assets/video/congregation-worship.mp4", poster: "assets/video/congregation-worship.jpg",
        caption: "The congregation in worship" },
      { src: "assets/img/photos/congregation-hall.jpg",     caption: "Sunday morning in the hall" },
      { src: "assets/img/photos/church-building.jpg",       caption: "Our church building" },
      { video: "assets/video/kids-ministry.mp4", poster: "assets/video/kids-ministry.jpg",
        caption: "Happy Kids ministry" },
      { src: "assets/img/photos/congregation-standing.jpg", caption: "Standing to worship" },
      { src: "assets/img/photos/pastor-stage.jpg",          caption: "Ministering on stage" },
      { video: "assets/video/kids-praise.mp4", poster: "assets/video/kids-praise.jpg",
        caption: "The children in praise" },
      { src: "assets/img/photos/heritage-crusade.jpg",      caption: "An open-air crusade in Tanzania" },
      { src: "assets/img/photos/heritage-meeting.jpg",      caption: "A gathering of believers" },
      { src: "assets/img/photos/pastor-worship.jpg",        caption: "Worship under the tent" },
      { video: "assets/video/kids-welcome.mp4", poster: "assets/video/kids-welcome.jpg",
        caption: "Welcoming the children" },
      { src: "assets/img/photos/church-sign-town.jpg",      caption: "Finding us in town" },
      { src: "assets/img/photos/street-outreach.jpg",       caption: "Out in the city at night" }
    ]
  }
};

/* =============================================================
   SERMONS — newest first. The homepage shows the first three;
   the sermons page shows them all and filters by `cat`.

     cat   : "rooted" | "city" | "standalone" (matches the filter bar)
     len   : runtime, e.g. "12 min" (dates are not shown on the site)
     url   : the YouTube (or other) link — "#" if not published yet
     img   : a real thumbnail; falls back to the `art` illustration
     art   : placeholder illustration name from assets/img/
   ============================================================= */
window.SERMONS = [
  {
    title: "Mabadiliko — The Transformation",
    cat: "standalone",
    series: "Happy Church Kehancha",
    text: "Preached in Kiswahili",
    len: "23 min",
    img: "assets/img/photos/sermon-mabadiliko.jpg",
    art: "art-sermon",
    blurb: "A call to real, lasting change in Christ. Preached by Pastor John Deus. English subtitles available — turn on CC in YouTube.",
    url: "https://www.youtube.com/watch?v=cLBehdwptx4"
  },

  {
    title: "Refuse Partial Victories",
    cat: "standalone",
    series: "John Deus",
    text: "2 Kings 13:14-19",
    len: "10 min",
    img: "assets/img/photos/sermon-refuse-partial-victories.jpg",
    art: "art-worship",
    blurb: "King Joash was handed the secret to total victory — then struck the arrows only three times and stopped. A word about refusing to settle for a partial breakthrough.",
    url: "https://www.youtube.com/watch?v=VH-7YJExXuk"
  },

  {
    title: "Break Free From Your Past",
    cat: "standalone",
    series: "Ministry abroad",
    text: "Isaiah 43:18-19",
    len: "12 min",
    img: "assets/img/photos/sermon-break-free.jpg",
    art: "art-prayer",
    blurb: "God is doing a new thing — a way in the wilderness, rivers in the desert. Your mistakes and failures do not define your destiny. Preached in English and German.",
    url: "https://www.youtube.com/watch?v=BGlCHxqB2cA"
  },

];

/* =============================================================
   NATIONS — countries the ministry has preached in.
   `code` is the ISO 3166-1 alpha-2 code and must match a file in
   assets/img/flags/. To add a country, download its flag:
     curl -o assets/img/flags/<code>.svg https://flagcdn.com/<code>.svg
   ============================================================= */
window.NATIONS = {
  eyebrow: "To the nations",
  title: "Where the gospel has taken us",
  intro: "From open-air crusades at home to pulpits across Europe, Asia and America — the same gospel, carried wherever the door has opened.",

  /* `home` is the point every arc is drawn from.
     lat/lng place each marker on the globe — decimal degrees,
     north and east positive. */
  home: { name: "Kericho", lat: -0.3622, lng: 35.2919 },
  items: [
    { code: "ke", name: "Kenya",         note: "Home", lat: -0.3622, lng:  35.2919 },
    { code: "tz", name: "Tanzania",                    lat: -6.3690, lng:  34.8888 },
    { code: "us", name: "United States",               lat: 39.8283, lng: -98.5795 },
    { code: "dk", name: "Denmark",                     lat: 56.2639, lng:   9.5018 },
    { code: "de", name: "Germany",                     lat: 51.1657, lng:  10.4515 },
    { code: "se", name: "Sweden",                      lat: 60.1282, lng:  18.6435 },
    { code: "kr", name: "South Korea",                 lat: 35.9078, lng: 127.7669 },
    { code: "ua", name: "Ukraine",                     lat: 48.3794, lng:  31.1656 }
  ]
};
