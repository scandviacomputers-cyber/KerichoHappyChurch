/* =============================================================
   HAPPY CHURCH KERICHO — site behaviour
   Renders the shared header/footer and wires up interactions.
   ============================================================= */
(function () {
  "use strict";

  var C = window.CHURCH, NAV = window.NAV;
  var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  /* ---------- icons ------------------------------------------ */
  var I = {
    dove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M5 8h14M8.5 8c0 4 1.5 7 3.5 9 2-2 3.5-5 3.5-9"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5 5 0 00-7.1 0L12 7.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 21.4l8.8-8.7a5 5 0 000-7.1z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
    music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    hands: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 13V5a2 2 0 10-4 0v10"/><path d="M13 13V6a2 2 0 114 0v9"/><path d="M17 11a2 2 0 114 0v3a7 7 0 01-7 7h-3a7 7 0 01-7-7v-3a2 2 0 114 0"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5 9.8 12.2 3.5 10l6.3-1.7z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.5-.4-5.2a2.9 2.9 0 00-2-2C18.8 4.4 12 4.4 12 4.4s-6.8 0-8.6.4a2.9 2.9 0 00-2 2C1 8.5 1 12 1 12s0 3.5.4 5.2a2.9 2.9 0 002 2c1.8.4 8.6.4 8.6.4s6.8 0 8.6-.4a2.9 2.9 0 002-2C23 15.5 23 12 23 12zM9.8 15.3V8.7l5.7 3.3z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2h-3v13.2a2.7 2.7 0 11-2.2-2.7v-3a5.7 5.7 0 105.2 5.7V9.4a7 7 0 004 1.3v-3a4 4 0 01-4-4z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.5 3h6.2l4.3 5.6zm-1 16h1.6L7.6 4.7H5.9z"/></svg>'
  };
  window.ICONS = I;

  /* ---------- helpers ---------------------------------------- */
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function fmt12(hhmm) {
    var p = hhmm.split(":"), h = +p[0], m = +p[1];
    var ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return h + ":" + pad(m) + " " + ap;
  }

  /* "9:00 am – 3:00 pm", or just "9:00 am" when no end time is set. */
  function timeRange(svc) {
    return svc.end ? fmt12(svc.start) + " &ndash; " + fmt12(svc.end) : fmt12(svc.start);
  }

  /* Next occurrence of a service, as a Date */
  function nextDate(svc, from) {
    var now = from || new Date();
    var p = svc.start.split(":");
    var d = new Date(now);
    d.setHours(+p[0], +p[1], 0, 0);
    var delta = (svc.day - d.getDay() + 7) % 7;
    if (delta === 0 && d <= now) delta = 7;
    d.setDate(d.getDate() + delta);
    return d;
  }

  function nextService() {
    var best = null;
    C.services.forEach(function (s) {
      var d = nextDate(s);
      if (!best || d < best.date) best = { svc: s, date: d };
    });
    return best;
  }

  /* ---------- logo + photos ---------------------------------- */
  /* The brand mark shows the real logo when one is set in
     site.config.js, and falls back to the built-in dove if the file
     is missing so the header never renders empty. */
  function brandMark() {
    var L = window.LOGO;
    if (L && L.src) {
      return '<span class="brand-mark has-logo">' +
        '<img src="' + L.src + '" alt="' + (L.alt || "") + '" ' +
        'onerror="this.parentNode.classList.remove(\'has-logo\');' +
        'this.parentNode.innerHTML=' + JSON.stringify(I.dove).replace(/"/g, "&quot;") + ';">' +
      "</span>";
    }
    return '<span class="brand-mark" aria-hidden="true">' + I.dove + "</span>";
  }

  /* Swap placeholder illustrations for real photographs wherever a
     slot has been filled in. Slots left null keep the illustration. */
  function photos() {
    var P = window.PHOTOS || {};
    document.querySelectorAll("[data-photo]").forEach(function (img) {
      var slot = P[img.getAttribute("data-photo")];
      if (!slot || !slot.src) return;
      img.src = slot.src;
      if (slot.alt) img.alt = slot.alt;
      img.classList.add("is-photo");
    });

    /* Hero background photo, if one is set. */
    var hero = document.querySelector(".hero-bg");
    if (hero && P.hero && P.hero.src) {
      hero.style.backgroundImage = 'url("' + P.hero.src + '")';
      document.querySelector(".hero").classList.add("has-photo");
    }
  }

  /* Resolve a dotted path against the config, e.g. "giving.paybill". */
  function cfg(path) {
    var v = C;
    path.split(".").forEach(function (k) { v = v && v[k]; });
    return v;
  }

  /* ---------- header ----------------------------------------- */
  function currentPage() {
    var f = location.pathname.split("/").pop();
    return (!f || f === "") ? "index.html" : f;
  }

  function navHTML(cls) {
    var cur = currentPage();
    return NAV.map(function (n) {
      var active = n.href === cur ? ' aria-current="page"' : "";
      return '<a class="' + cls + '" href="' + n.href + '"' + active + ">" + n.label + "</a>";
    }).join("");
  }

  function renderHeader() {
    var host = document.querySelector("[data-header]");
    if (!host) return;
    host.innerHTML =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<header class="site-header" id="siteHeader"><div class="wrap nav-inner">' +
        '<a class="brand" href="index.html" aria-label="' + C.name + ' home">' +
          brandMark() +
          '<span class="brand-text">' +
            '<span class="brand-name">' + C.name + "</span>" +
            '<span class="brand-sub">' + C.tagline + "</span>" +
          "</span>" +
        "</a>" +
        '<nav class="nav-links" aria-label="Main">' + navHTML("") + "</nav>" +
        '<div class="nav-cta">' +
          '<a class="btn btn-gold btn-sm" href="give.html">Give</a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="navDrawer"><span></span></button>' +
        "</div>" +
      "</div></header>" +
      '<div class="nav-drawer" id="navDrawer">' + navHTML("drawer-link") +
        '<div class="drawer-foot">' +
          '<a class="btn btn-gold" href="give.html">Give online</a>' +
          '<a class="btn btn-ghost" href="contact.html">Plan your visit</a>' +
          '<p class="small" style="color:var(--muted);margin:.5rem 0 0">' + C.contact.phone + " &middot; " + C.contact.address + "</p>" +
        "</div>" +
      "</div>";

    var toggle = document.getElementById("navToggle");
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    document.querySelectorAll(".drawer-link").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        document.body.style.overflow = "";
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    var header = document.getElementById("siteHeader");
    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- footer ----------------------------------------- */
  function renderFooter() {
    var host = document.querySelector("[data-footer]");
    if (!host) return;
    var s = C.social;
    var socialLinks = [["facebook",s.facebook],["instagram",s.instagram],["youtube",s.youtube],["tiktok",s.tiktok],["x",s.x]]
      .filter(function (p) { return p[1]; })
      .map(function (p) {
        return '<a href="' + p[1] + '" target="_blank" rel="noopener" aria-label="' + p[0] + '">' + I[p[0]] + "</a>";
      }).join("");

    var sundays = C.services.filter(function (x) { return x.day === 0; })
      .map(function (x) { return "<li>" + x.name + " &middot; " + fmt12(x.start) + "</li>"; }).join("");
    var midweek = C.services.filter(function (x) { return x.day !== 0; })
      .map(function (x) { return "<li>" + x.name + " &middot; " + DAYS_SHORT[x.day] + " " + fmt12(x.start) + "</li>"; }).join("");

    host.innerHTML =
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          "<div>" +
            '<a class="brand" href="index.html" style="margin-bottom:1rem">' +
              brandMark() +
              '<span class="brand-text"><span class="brand-name" style="color:#fff">' + C.name + '</span><span class="brand-sub">' + C.tagline + "</span></span>" +
            "</a>" +
            '<p style="max-width:34ch;font-size:.93rem">' + C.motto + "</p>" +
            '<div class="socials">' + socialLinks + "</div>" +
          "</div>" +
          '<div><h4>Explore</h4><ul class="footer-links">' +
            NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
            '<li><a href="give.html">Give</a></li>' +
          "</ul></div>" +
          '<div><h4>Sundays</h4><ul class="footer-links">' + sundays + "</ul>" +
            '<h4 style="margin-top:1.5rem">In the week</h4><ul class="footer-links">' + midweek + "</ul></div>" +
          '<div><h4>Visit &amp; connect</h4><ul class="footer-links">' +
            "<li>" + C.contact.addressLine2 + "</li>" +
            "<li>" + C.contact.address + "</li>" +
            '<li><a href="tel:' + C.contact.phone.replace(/\s/g, "") + '">' + C.contact.phone + "</a></li>" +
            '<li><a href="mailto:' + C.contact.email + '">' + C.contact.email + "</a></li>" +
            '<li><a href="https://wa.me/' + C.contact.whatsapp + '" target="_blank" rel="noopener">WhatsApp us</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>&copy; " + new Date().getFullYear() + " " + C.name + " &mdash; " + C.tagline + ". All rights reserved.</span>" +
          "<span>" + C.contact.poBox + "</span>" +
        "</div>" +
      "</div></footer>";
  }

  /* ---------- sermon cards ------------------------------------
     One renderer for both the homepage (first three) and the
     sermons page (all of them), reading window.SERMONS.
     ------------------------------------------------------------- */
  function sermonCard(sv, i) {
    var art = sv.img
      ? '<img class="is-photo" src="' + sv.img + '" alt="' + sv.title + '" loading="lazy">'
      : '<img src="assets/img/' + (sv.art || "art-sermon") + '.svg" alt="">';
    var live = sv.url && sv.url !== "#";
    var open = live ? ' href="' + sv.url + '" target="_blank" rel="noopener"' : ' href="sermons.html"';
    var meta = [sv.series, sv.len].filter(Boolean)
      .map(function (m) { return "<span>" + m + "</span>"; }).join("");

    return '<article class="feature" data-cat="' + (sv.cat || "standalone") +
      '" data-reveal data-delay="' + ((i % 3) + 1) + '">' +
      '<div class="feature-art sermon-art">' + art +
        "<a class=\"play-btn\"" + open + ' aria-label="' +
          (live ? "Watch on YouTube: " : "See sermons: ") + sv.title + '">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg></a>' +
      "</div>" +
      '<div class="feature-body">' +
        '<div class="sermon-meta">' + meta + "</div>" +
        '<h3 class="h-3">' + sv.title + "</h3>" +
        (sv.blurb ? '<p style="color:var(--muted)">' + sv.blurb + "</p>" : "") +
        (sv.text ? '<p class="small" style="color:var(--muted);margin:0">' + sv.text + "</p>" : "") +
        "<a class=\"link-arrow\"" + open + ">" + (live ? "Watch on YouTube" : "Watch &amp; listen") +
          ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
      "</div></article>";
  }

  function sermons() {
    var list = window.SERMONS || [];
    if (!list.length) return;

    var grid = document.querySelector("[data-sermons]");
    if (grid) {
      /* data-sermons-from skips the ones already shown as "featured". */
      var from = parseInt(grid.getAttribute("data-sermons-from"), 10) || 0;
      var limit = parseInt(grid.getAttribute("data-sermons"), 10);
      var slice = list.slice(from);
      if (limit > 0) slice = slice.slice(0, limit);

      if (!slice.length) {
        var sec = grid.closest("section");
        if (sec) sec.remove();          /* nothing left to list */
      } else {
        grid.innerHTML = slice.map(sermonCard).join("");
      }
    }

    /* Featured block at the top of the sermons page = the newest sermon. */
    var feat = document.querySelector("[data-sermon-featured]");
    if (feat) {
      var sv = list[0];
      var live = sv.url && sv.url !== "#";
      feat.innerHTML =
        '<div class="media-frame sermon-art" style="aspect-ratio:16/9">' +
          (sv.img ? '<img class="is-photo" src="' + sv.img + '" alt="' + sv.title + '">'
                  : '<img src="assets/img/' + (sv.art || "art-sermon") + '.svg" alt="" style="width:100%;height:100%;object-fit:cover">') +
          (live ? '<a class="play-btn" href="' + sv.url + '" target="_blank" rel="noopener" aria-label="Watch: ' + sv.title + '">' +
                  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg></a>' : "") +
        "</div>" +
        "<div>" +
          '<span class="eyebrow">Latest message</span>' +
          '<h2 class="h-1">' + sv.title + "</h2>" +
          '<div class="sermon-meta" style="margin-top:1rem">' +
            [sv.series, sv.text, sv.len].filter(Boolean)
              .map(function (m) { return "<span>" + m + "</span>"; }).join("") +
          "</div>" +
          '<p class="lead">' + (sv.blurb || "") + "</p>" +
          '<div class="btn-row mt-2">' +
            (live ? '<a class="btn" href="' + sv.url + '" target="_blank" rel="noopener">Watch on YouTube</a>' : "") +
            '<a class="btn btn-ghost" href="' + (C.social.youtube || "#") + '" target="_blank" rel="noopener">More messages</a>' +
          "</div>" +
        "</div>";
    }
  }

  /* Build the sermon filter bar from the categories present, and drop it
     entirely when everything falls under one heading. */
  function sermonFilters() {
    var bar = document.querySelector("[data-filter-auto]");
    if (!bar) return;
    var list = window.SERMONS || [];
    var cats = [];
    list.forEach(function (sv) {
      var c = sv.cat || "standalone";
      if (cats.indexOf(c) < 0) cats.push(c);
    });
    if (cats.length < 2) { bar.remove(); return; }

    var LABELS = { rooted: "Rooted", city: "This City", standalone: "Stand-alone", family: "Family" };
    bar.innerHTML = '<button class="btn btn-gold btn-sm" data-filter="all">All</button>' +
      cats.map(function (c) {
        return '<button class="btn btn-ghost btn-sm" data-filter="' + c + '">' +
          (LABELS[c] || c.charAt(0).toUpperCase() + c.slice(1)) + "</button>";
      }).join("");
  }

  /* ---------- nations ------------------------------------------
     Flags of the countries the ministry has preached in, from
     window.NATIONS. Flags are self-hosted SVGs in assets/img/flags/.
     ------------------------------------------------------------- */
  function nations() {
    var host = document.querySelector("[data-nations]");
    var N = window.NATIONS;
    if (!host) return;
    if (!N || !N.items || !N.items.length) {
      var dead = host.closest("section");
      if (dead) dead.remove();
      return;
    }

    var head = document.querySelector("[data-nations-head]");
    if (head) {
      head.innerHTML =
        '<span class="eyebrow">' + (N.eyebrow || "To the nations") + "</span>" +
        '<h2 class="h-1">' + N.title + "</h2>" +
        (N.intro ? '<p class="lead">' + N.intro + "</p>" : "") +
        '<p class="nations-count"><b>' + N.items.length + "</b> nations ministered in &mdash; and counting</p>";
    }

    /* Names stay as real text beneath the globe — a canvas is invisible
       to screen readers and search engines. */
    host.innerHTML = N.items.map(function (n) {
      return '<li class="nation' + (n.note ? " is-home" : "") + '">' + n.name +
        (n.note ? '<span class="nation-note">' + n.note + "</span>" : "") + "</li>";
    }).join("");
  }

  /* ---------- rotating globe ----------------------------------
     A real Earth, drawn by texture-mapping the Natural Earth land
     mask onto a sphere. For every pixel of the disc we invert the
     projection to a latitude/longitude and look up land or sea, so
     coastlines are genuine rather than approximated.

     Because the globe only spins about its axis, each pixel's
     latitude never changes and its longitude is just an offset —
     so all the trigonometry is precomputed once and each frame is
     an integer lookup.

     No library, no WebGL. Drag to spin; honours reduced-motion.
     ------------------------------------------------------------- */
  function globe() {
    var cv = document.querySelector("[data-globe]");
    var N = window.NATIONS, L = window.GLOBE_LAND;
    if (!cv || !N || !N.items || !L) return;
    var ctx = cv.getContext("2d");
    if (!ctx) return;

    var TAU = Math.PI * 2, RAD = Math.PI / 180;
    var reduce = window.matchMedia &&
                 window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var raw = atob(L.bits), MW = L.w, MH = L.h;
    var bord = L.borders ? atob(L.borders) : null;

    var TILT = -20 * RAD, ct = Math.cos(TILT), st = Math.sin(TILT);
    var spin = -2.1, dragging = false, lastX = 0, W = 0, H = 0, R = 0, cx = 0, cy = 0;

    /* offscreen buffer holding just the globe disc */
    var off = document.createElement("canvas");
    var octx = off.getContext("2d");
    var S = 0, img = null, buf = null;
    var rowOff = null, colBase = null, inside = null;
    var landPix = null, seaPix = null, borderPix = null;

    function pack(r, g, b, sh) {
      r *= sh; g *= sh; b *= sh;
      if (r > 255) r = 255; if (g > 255) g = 255; if (b > 255) b = 255;
      return (255 << 24) | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0);
    }

    function build() {
      S = Math.max(64, Math.min(Math.round(2 * R * (window.devicePixelRatio || 1)), 560));
      off.width = off.height = S;
      img = octx.createImageData(S, S);
      buf = new Uint32Array(img.data.buffer);
      rowOff  = new Int32Array(S * S);
      colBase = new Float32Array(S * S);
      inside  = new Uint8Array(S * S);
      /* Shading and polar ice depend only on the pixel, never on the
         rotation, so both finished colours are baked in up front and
         each frame just picks one. */
      landPix   = new Uint32Array(S * S);
      seaPix    = new Uint32Array(S * S);
      borderPix = new Uint32Array(S * S);

      var Lx = -0.42, Ly = 0.48, Lz = 0.77;
      var n = Math.sqrt(Lx*Lx + Ly*Ly + Lz*Lz); Lx/=n; Ly/=n; Lz/=n;

      for (var y = 0; y < S; y++) {
        for (var x = 0; x < S; x++) {
          var i = y * S + x;
          var nx = (x + 0.5) / S * 2 - 1;
          var ny = 1 - (y + 0.5) / S * 2;
          var d2 = nx * nx + ny * ny;
          if (d2 >= 1) { inside[i] = 0; continue; }
          inside[i] = 1;
          var nz = Math.sqrt(1 - d2);

          /* undo the axial tilt to get sphere coords before rotation */
          var ys = ny * ct + nz * st;
          var zs = -ny * st + nz * ct;

          var lat = Math.asin(Math.max(-1, Math.min(1, ys)));
          var row = Math.floor((90 - lat / RAD) / 180 * MH);
          if (row < 0) row = 0; else if (row >= MH) row = MH - 1;
          rowOff[i] = row * MW;

          /* longitude is this constant plus the spin */
          var A = Math.atan2(zs, nx);
          colBase[i] = (A / TAU + 0.5) * MW;

          var dot = nx * Lx + ny * Ly + nz * Lz;
          var sh = 0.34 + 0.92 * (dot > 0 ? dot : 0);

          var latAbs = Math.abs(lat / RAD);
          var ice = latAbs > 60 ? Math.min(1, (latAbs - 60) / 22) : 0;

          landPix[i] = pack(74 + (226 - 74) * ice,
                            122 + (236 - 122) * ice,
                            78 + (240 - 78) * ice, sh);
          seaPix[i]  = pack(21 + (200 - 21) * ice,
                            71 + (222 - 71) * ice,
                            105 + (232 - 105) * ice, sh);
          borderPix[i] = pack(182 + (238 - 182) * ice,
                              212 + (244 - 212) * ice,
                              168 + (246 - 168) * ice, sh);
        }
      }
    }

    function resize() {
      var box = cv.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, box.width); H = Math.max(1, box.height);
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(W, H) * 0.42; cx = W / 2; cy = H / 2;
      build();
    }

    /* paint the sphere surface for the current rotation */
    function paintEarth() {
      var spinCols = spin / TAU * MW;
      for (var i = 0, len = S * S; i < len; i++) {
        if (!inside[i]) { buf[i] = 0; continue; }
        var c = colBase[i] + spinCols;
        c -= Math.floor(c / MW) * MW;
        var idx = rowOff[i] + (c | 0);
        var byteAt = idx >> 3, bitAt = 7 - (idx & 7);
        if (bord && ((bord.charCodeAt(byteAt) >> bitAt) & 1)) buf[i] = borderPix[i];
        else if ((raw.charCodeAt(byteAt) >> bitAt) & 1)       buf[i] = landPix[i];
        else                                                  buf[i] = seaPix[i];
      }
      octx.putImageData(img, 0, 0);
    }

    /* --- markers and arcs --- */
    var vec = function (lat, lng) {
      var a = lat * RAD, b = lng * RAD;
      return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)];
    };
    var marks = N.items.map(function (n) {
      return { name: n.name, note: n.note, v: vec(n.lat, n.lng) };
    });
    var home = N.home ? vec(N.home.lat, N.home.lng) : marks[0].v;

    function arc(a, b, steps) {
      var d = Math.max(-1, Math.min(1, a[0]*b[0] + a[1]*b[1] + a[2]*b[2]));
      var om = Math.acos(d), out = [];
      if (om < 1e-6) return [a];
      for (var t = 0; t <= steps; t++) {
        var f = t / steps;
        var s1 = Math.sin((1 - f) * om) / Math.sin(om);
        var s2 = Math.sin(f * om) / Math.sin(om);
        var lift = 1 + 0.16 * Math.sin(Math.PI * f);
        out.push([(a[0]*s1 + b[0]*s2) * lift,
                  (a[1]*s1 + b[1]*s2) * lift,
                  (a[2]*s1 + b[2]*s2) * lift]);
      }
      return out;
    }
    var arcs = marks.map(function (m) { return arc(home, m.v, 56); });

    /* A connection from Kericho to every country, drawn faintly behind
       the bright arcs. The bright ones are the nations actually
       ministered in; these are the rest of the world. */
    var visited = {};
    N.items.forEach(function (n) { visited[n.name] = true; });
    var reach = [];
    if (window.ALL_NATIONS) {
      window.ALL_NATIONS.forEach(function (n) {
        if (visited[n[0]]) return;
        var v = vec(n[1], n[2]);
        reach.push({ name: n[0], v: v, pts: arc(home, v, 20) });
      });
    }

    var _cs = 1, _sn = 0;                 /* refreshed once per frame */
    function project(p) {
      var cs = _cs, sn = _sn;
      var x = p[0] * cs + p[2] * sn;
      var z = -p[0] * sn + p[2] * cs;
      return [cx + x * R, cy - (p[1] * ct - z * st) * R, p[1] * st + z * ct];
    }

    function draw() {
      _cs = Math.cos(spin); _sn = Math.sin(spin);
      ctx.clearRect(0, 0, W, H);

      /* atmosphere */
      var halo = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.16);
      halo.addColorStop(0, "rgba(120,190,225,.30)");
      halo.addColorStop(1, "rgba(120,190,225,0)");
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, TAU); ctx.fill();

      paintEarth();
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, cx - R, cy - R, R * 2, R * 2);

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU);
      ctx.strokeStyle = "rgba(237,186,85,.30)"; ctx.lineWidth = 1; ctx.stroke();

      /* every other nation, faint */
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = "rgba(246,217,138,.16)";
      ctx.beginPath();
      for (var rr = 0; rr < reach.length; rr++) {
        var rp = reach[rr].pts, rstart = false;
        for (var rt = 0; rt < rp.length; rt++) {
          var rq = project(rp[rt]);
          if (rq[2] <= -0.05) { rstart = false; continue; }
          if (!rstart) { ctx.moveTo(rq[0], rq[1]); rstart = true; }
          else ctx.lineTo(rq[0], rq[1]);
        }
      }
      ctx.stroke();

      /* every nation gets the same marker as the ones ministered in */
      for (var rd = 0; rd < reach.length; rd++) {
        var rv = project(reach[rd].v);
        if (rv[2] <= 0.02) continue;
        ctx.globalAlpha = Math.min(1, 0.35 + rv[2]);
        ctx.beginPath(); ctx.arc(rv[0], rv[1], 3.2, 0, TAU);
        ctx.fillStyle = "#F6D98A"; ctx.fill();
        ctx.beginPath(); ctx.arc(rv[0], rv[1], 6.4, 0, TAU);
        ctx.strokeStyle = "rgba(246,217,138,.45)"; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* arcs to the nations ministered in */
      ctx.lineWidth = 1.5;
      for (var a = 0; a < arcs.length; a++) {
        var pts = arcs[a], started = false;
        ctx.beginPath();
        for (var t = 0; t < pts.length; t++) {
          var q = project(pts[t]);
          if (q[2] <= -0.05) { started = false; continue; }
          if (!started) { ctx.moveTo(q[0], q[1]); started = true; }
          else ctx.lineTo(q[0], q[1]);
        }
        ctx.strokeStyle = "rgba(246,217,138,.62)";
        ctx.stroke();
      }

      /* Markers for the nations ministered in. */
      var boxes = [];
      for (var mi = 0; mi < marks.length; mi++) {
        var mk = marks[mi], m2 = project(mk.v);
        if (m2[2] <= 0) continue;
        var isHome = !!mk.note;
        ctx.globalAlpha = Math.min(1, 0.4 + m2[2]);
        ctx.beginPath(); ctx.arc(m2[0], m2[1], isHome ? 4.8 : 3.6, 0, TAU);
        ctx.fillStyle = isHome ? "#FFF0C2" : "#F6D98A"; ctx.fill();
        ctx.beginPath(); ctx.arc(m2[0], m2[1], (isHome ? 4.8 : 3.6) + 3.5, 0, TAU);
        ctx.strokeStyle = "rgba(246,217,138,.5)"; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* Country names. The nations ministered in are placed first so they
         always win a clash; every other country is then labelled if its
         name still fits, which thins out crowded regions the way a printed
         map does. */
      var cands = [];
      for (var ci = 0; ci < marks.length; ci++) {
        cands.push({ name: marks[ci].name, v: marks[ci].v, key: 1 });
      }
      for (var cj = 0; cj < reach.length; cj++) {
        cands.push({ name: reach[cj].name, v: reach[cj].v, key: 0 });
      }
      cands.forEach(function (c) { c.p = project(c.v); });
      cands.sort(function (a, b) {
        if (a.key !== b.key) return b.key - a.key;      /* ministered first */
        return b.p[2] - a.p[2];                          /* then nearest */
      });

      for (var k = 0; k < cands.length; k++) {
        var c = cands[k], q = c.p;
        if (q[2] <= 0.12) continue;

        ctx.font = "600 11.5px 'Plus Jakarta Sans', system-ui, sans-serif";
        ctx.textBaseline = "middle";
        var tw = ctx.measureText(c.name).width;
        var bx = q[0] + 9, by = q[1] - 9;
        var box = [bx - 4, by - 8, tw + 8, 16];

        if (box[0] < 2 || box[0] + box[2] > W - 2) continue;
        var clash = false;
        for (var bb = 0; bb < boxes.length; bb++) {
          var o = boxes[bb];
          if (box[0] < o[0]+o[2] && box[0]+box[2] > o[0] &&
              box[1] < o[1]+o[3] && box[1]+box[3] > o[1]) { clash = true; break; }
        }
        if (clash) continue;
        boxes.push(box);

        ctx.globalAlpha = Math.min(1, 0.45 + q[2] * 1.4);
        ctx.fillStyle = "rgba(6,16,12,.72)";
        ctx.fillRect(box[0], box[1], box[2], box[3]);
        ctx.fillStyle = "rgba(255,255,255,.96)";
        ctx.fillText(c.name, bx, by);
        ctx.globalAlpha = 1;
      }
    }

    var last = 0;
    function frame(now) {
      if (!reduce && !dragging) spin += (now - last) * 0.00005;
      last = now;
      draw();
      requestAnimationFrame(frame);
    }

    cv.addEventListener("pointerdown", function (e) {
      dragging = true; lastX = e.clientX;
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
    });
    cv.addEventListener("pointermove", function (e) {
      if (dragging) { spin += (e.clientX - lastX) * 0.006; lastX = e.clientX; }
    });
    cv.addEventListener("pointerup", function (e) {
      dragging = false;
      try { cv.releasePointerCapture(e.pointerId); } catch (err) {}
    });

    window.addEventListener("resize", resize);
    resize();
    last = performance.now();
    requestAnimationFrame(frame);
  }

  /* ---------- galleries + lightbox ----------------------------
     Any element with data-gallery="<key>" is filled from
     window.GALLERIES[key]. Items may be photos or videos; videos
     show a poster with a play badge and only download when opened.
     ------------------------------------------------------------- */
  function gallery() {
    var sets = document.querySelectorAll("[data-gallery]");
    if (!sets.length) return;
    var G = window.GALLERIES || {};
    var boxes = [];

    sets.forEach(function (host) {
      var key = host.getAttribute("data-gallery");
      var data = G[key];
      if (!data || !data.items || !data.items.length) {
        var dead = host.closest("section");
        if (dead) dead.remove();
        return;
      }

      var head = host.parentElement.querySelector('[data-gallery-head="' + key + '"]')
              || host.parentElement.querySelector("[data-gallery-head]");
      if (head) {
        head.innerHTML = '<span class="eyebrow">' + (data.eyebrow || "Our wider ministry") + "</span>" +
          '<h2 class="h-1">' + data.title + "</h2>" +
          (data.intro ? '<p class="lead">' + data.intro + "</p>" : "");
      }

      host.innerHTML = data.items.map(function (it, i) {
        var thumb = it.video ? it.poster : it.src;
        return '<button class="shot' + (it.video ? " is-video" : "") + '" data-i="' + i + '"' +
          ' aria-label="' + (it.video ? "Play video: " : "View photo: ") + it.caption + '">' +
          '<img src="' + thumb + '" alt="' + it.caption + '" loading="lazy">' +
          (it.video ? '<span class="shot-play" aria-hidden="true">' +
             '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l14 8-14 8z"/></svg></span>' : "") +
          '<span class="shot-cap">' + it.caption + "</span>" +
        "</button>";
      }).join("");

      boxes.push({ host: host, items: data.items });
    });

    if (!boxes.length) return;

    /* --- one lightbox, shared by every gallery --- */
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.hidden = true;
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<figure class="lb-fig"><div class="lb-media"></div><figcaption></figcaption></figure>' +
      '<button class="lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(box);

    var media = box.querySelector(".lb-media"),
        cap = box.querySelector("figcaption"),
        items = [], cur = 0, opener = null;

    function stopVideo() {
      var v = media.querySelector("video");
      if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    }

    function show(i) {
      cur = (i + items.length) % items.length;
      var it = items[cur];
      stopVideo();
      media.innerHTML = it.video
        ? '<video controls autoplay playsinline preload="metadata" poster="' + (it.poster || "") +
          '" src="' + it.video + '"></video>'
        : '<img src="' + it.src + '" alt="' + it.caption + '">';
      cap.textContent = it.caption + "  (" + (cur + 1) + " of " + items.length + ")";
    }

    function open(list, i, from) {
      items = list; opener = from;
      show(i);
      box.hidden = false;
      document.body.style.overflow = "hidden";
      box.querySelector(".lb-close").focus();
    }

    function close() {
      stopVideo();
      box.hidden = true;
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }

    boxes.forEach(function (b) {
      b.host.addEventListener("click", function (e) {
        var t = e.target.closest(".shot");
        if (t) open(b.items, +t.getAttribute("data-i"), t);
      });
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(cur - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(cur + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* ---------- scroll reveal ---------------------------------- */
  function reveals() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("revealed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("revealed"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .12 });
    els.forEach(function (e) { io.observe(e); });

    /* Safety net: content must never be permanently invisible. If the
       observer has not fired for something after a few seconds (an inactive
       tab, an odd browser), reveal it anyway. */
    setTimeout(function () {
      els.forEach(function (e) { e.classList.add("revealed"); });
      io.disconnect();
    }, 3000);
  }

  /* ---------- countdown to next service ---------------------- */
  function countdown() {
    var host = document.querySelector("[data-countdown]");
    var label = document.querySelector("[data-next-service]");
    if (!host && !label) return;

    function tick() {
      var n = nextService();
      if (label) {
        label.textContent = n.svc.name + " &middot; " + DAYS[n.svc.day] + " " + fmt12(n.svc.start);
        label.innerHTML = n.svc.name + " &middot; " + DAYS[n.svc.day] + " " + fmt12(n.svc.start);
      }
      if (!host) return;
      var ms = n.date - new Date();
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24,
          m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      host.innerHTML =
        "<div><b>" + pad(d) + "</b><span>Days</span></div>" +
        "<div><b>" + pad(h) + "</b><span>Hours</span></div>" +
        "<div><b>" + pad(m) + "</b><span>Min</span></div>" +
        "<div><b>" + pad(s) + "</b><span>Sec</span></div>";
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- service time list ------------------------------ */
  function serviceList() {
    var host = document.querySelector("[data-services]");
    if (!host) return;
    var nx = nextService();
    host.innerHTML = C.services.map(function (s) {
      var isNext = s === nx.svc;
      return '<div class="time-row' + (isNext ? " is-next" : "") + '">' +
        '<div class="time-day"><b>' + DAYS_SHORT[s.day] + "</b><span>" +
          (s.tag || (s.day === 0 ? "Worship" : "Midweek")) + "</span></div>" +
        '<div class="time-meta"><h4>' + s.name +
          (isNext ? ' <span class="tag gold">Up next</span>' : "") + "</h4>" +
          (s.note ? "<p>" + s.note + "</p>" : "") + "</div>" +
        '<div class="time-clock">' + timeRange(s) + "</div>" +
      "</div>";
    }).join("");
  }

  /* ---------- hero service strip ----------------------------- */
  function heroStrip() {
    var host = document.querySelector("[data-hero-strip]");
    if (!host) return;
    var sun = C.services.filter(function (s) { return s.day === 0; });
    var cells = sun.map(function (s) {
      return "<div><dt>" + s.name + "</dt><dd>" + timeRange(s) +
        (s.note ? "<small>" + s.note + "</small>" : "") + "</dd></div>";
    });
    cells.push('<div><dt>Find us</dt><dd>' + C.contact.addressLine2.split(",")[0] + "<small>" + C.contact.address + "</small></dd></div>");
    host.innerHTML = cells.join("");
  }

  /* ---------- testimonial slider ----------------------------- */
  function quotes() {
    var box = document.querySelector("[data-quotes]");
    if (!box) return;
    var items = box.querySelectorAll(".quote");
    var dots = box.parentElement.querySelector(".quote-dots");
    if (!items.length) return;
    var i = 0, timer;

    dots.innerHTML = Array.prototype.map.call(items, function (_, k) {
      return '<button role="tab" aria-selected="' + (k === 0) + '" aria-label="Testimony ' + (k + 1) + '"></button>';
    }).join("");
    var btns = dots.querySelectorAll("button");

    function show(k) {
      i = (k + items.length) % items.length;
      items.forEach(function (el, n) { el.classList.toggle("active", n === i); });
      btns.forEach(function (b, n) { b.setAttribute("aria-selected", n === i); });
    }
    function start() { timer = setInterval(function () { show(i + 1); }, 7000); }
    function stop() { clearInterval(timer); }

    btns.forEach(function (b, k) { b.addEventListener("click", function () { stop(); show(k); start(); }); });
    box.addEventListener("mouseenter", stop);
    box.addEventListener("mouseleave", start);
    show(0); start();
  }

  /* ---------- copy-to-clipboard ------------------------------ */
  function copyButtons() {
    /* Buttons can name a config path instead of hard-coding a value. */
    document.querySelectorAll("[data-copy-key]").forEach(function (btn) {
      var v = cfg(btn.getAttribute("data-copy-key"));
      if (v != null) btn.setAttribute("data-copy", v);
    });
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute("data-copy");
        var done = function () {
          var old = btn.textContent;
          btn.textContent = "Copied";
          btn.classList.add("copied");
          setTimeout(function () { btn.textContent = old; btn.classList.remove("copied"); }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(val).then(done, done);
        } else {
          var t = document.createElement("textarea");
          t.value = val; document.body.appendChild(t); t.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(t); done();
        }
      });
    });
  }

  /* ---------- accordion -------------------------------------- */
  function accordions() {
    document.querySelectorAll(".acc-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = btn.nextElementSibling;
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.classList.toggle("open", !open);
      });
    });
  }

  /* ---------- filters (sermons / ministries) ----------------- */
  function filters() {
    var bar = document.querySelector("[data-filter-bar]");
    if (!bar) return;
    var items = document.querySelectorAll("[data-cat]");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      bar.querySelectorAll("button").forEach(function (x) {
        x.classList.toggle("btn-gold", x === b);
        x.classList.toggle("btn-ghost", x !== b);
      });
      items.forEach(function (it) {
        var match = f === "all" || it.getAttribute("data-cat") === f;
        it.style.display = match ? "" : "none";
      });
    });
  }

  /* ---------- forms (no backend yet) ------------------------- */
  function forms() {
    document.querySelectorAll("form[data-mailto]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var lines = [];
        data.forEach(function (v, k) { if (v) lines.push(k + ": " + v); });
        var subject = form.getAttribute("data-subject") || "Website enquiry";
        window.location.href = "mailto:" + C.contact.email +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines.join("\n"));
        var note = form.querySelector("[data-form-note]");
        if (note) note.textContent = "Opening your email app… if nothing happens, email us at " + C.contact.email;
      });
    });
  }

  /* The precise pin: coordinates when we have them, otherwise a text query. */
  function mapPoint() {
    var c = C.contact;
    return (c.lat != null && c.lng != null) ? c.lat + "," + c.lng : c.mapQuery;
  }

  /* ---------- map ---------------------------------------------
     A Leaflet map on OpenStreetMap tiles. Google's embed labels every
     nearby business — including other churches — and hiding those needs
     a paid API key. OSM at zoom 16 draws roads, buildings and street
     names but no places of worship, so ours is the only church on the
     map. Zoom is capped at 16 deliberately: from zoom 17 OSM starts
     rendering church names. Falls back to a plain link if the tiles
     or the library fail to load.
     ------------------------------------------------------------- */
  function drawMap() {
    var el = document.querySelector("[data-map]");
    if (!el) return;
    var c = C.contact;
    if (typeof L === "undefined" || c.lat == null) { mapFallback(el); return; }

    try {
      var map = L.map(el, {
        center: [c.lat, c.lng],
        zoom: 16,
        minZoom: 13,
        maxZoom: 16,                     /* 17+ starts labelling churches */
        scrollWheelZoom: false,          /* don't hijack page scrolling */
        attributionControl: true
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 16,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      /* Our own pin, in the brand colours from the logo. */
      var pin = L.divIcon({
        className: "church-pin",
        html: '<span class="pin-dot"></span><span class="pin-label">' + C.name + "</span>",
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      L.marker([c.lat, c.lng], { icon: pin, title: C.name, alt: C.name }).addTo(map);

      /* Tapping the map should still take you to directions. */
      map.on("click", function () {
        window.open("https://www.google.com/maps/dir/?api=1&destination=" +
          encodeURIComponent(c.lat + "," + c.lng), "_blank", "noopener");
      });
    } catch (e) {
      mapFallback(el);
    }
  }

  function mapFallback(el) {
    el.innerHTML = '<a class="map-fallback" href="' +
      (C.contact.placeUrl || "#") + '" target="_blank" rel="noopener">' +
      "<strong>" + C.name + "</strong><span>" + C.contact.addressLine2 +
      " &middot; Plus Code " + C.contact.plusCode + "</span>" +
      "<span class=\"map-fallback-cta\">Open in Google Maps</span></a>";
  }

  /* ---------- year + config text ----------------------------- */
  function bindText() {
    /* Drop anything whose config value is missing, so unconfirmed details
       are never shown as zeros or placeholder text. */
    document.querySelectorAll("[data-if]").forEach(function (el) {
      var v = cfg(el.getAttribute("data-if"));
      if (v == null || v === "") el.remove();
    });

    document.querySelectorAll("[data-text]").forEach(function (el) {
      var v = cfg(el.getAttribute("data-text"));
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-href]").forEach(function (el) {
      var kind = el.getAttribute("data-href");
      if (kind === "tel") el.href = "tel:" + C.contact.phone.replace(/\s/g, "");
      if (kind === "mail") el.href = "mailto:" + C.contact.email;
      if (kind === "whatsapp") el.href = "https://wa.me/" + C.contact.whatsapp;
      /* Prefer the church's own Google listing; fall back to a text search. */
      if (kind === "map") {
        el.href = C.contact.placeUrl ||
          "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.contact.mapQuery);
      }
      if (kind === "directions") {
        el.href = "https://www.google.com/maps/dir/?api=1&destination=" +
          encodeURIComponent(mapPoint());
      }
    });

    drawMap();
  }

  /* ---------- boot ------------------------------------------- */
  function init() {
    document.title = document.title.replace("{{church}}", C.name);
    renderHeader();
    renderFooter();
    photos();
    bindText();
    heroStrip();
    serviceList();
    countdown();
    quotes();
    copyButtons();
    accordions();
    sermons();
    sermonFilters();
    filters();
    forms();
    nations();
    globe();
    gallery();
    reveals();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
