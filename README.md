# BrainTree HR — Website (Developer Handoff)

Static, dependency-free marketing website for **BrainTree HR Consulting Pvt. Ltd.**
Built as plain HTML + CSS with a small amount of vanilla JavaScript. **No build step, no framework, no package manager.** Every page is production-ready and can be deployed as-is to any static host.

---

## 1. Quick start

There is nothing to compile. To preview locally, serve the folder with any static server so that relative asset paths resolve:

```bash
# Python 3
python3 -m http.server 8080

# or Node
npx serve .
```

Then open <http://localhost:8080/Home.html>.

> Opening the files directly via `file://` mostly works, but a local server is recommended so fonts, images, and inter-page links behave exactly as in production.

---

## 2. Project structure

```
/
├── Home.html          # Landing page (hero, partners marquee, services, blog teasers)
├── Careers.html       # Job search / open roles listing
├── Apply.html         # Application form (role prefilled via ?role= query param)
├── About.html         # Company story, values, offices, founder
├── Blog.html          # Blog index (featured + grid) — cards link by #anchor
├── Contact.html       # Contact form + office details
├── SignIn.html        # Sign-in screen
├── Sitemap.html       # Human-readable sitemap
├── Privacy.html       # Privacy Policy (India DPDP + US CCPA/CPRA + Texas TDPSA)
├── Terms.html         # Terms of Service
│
├── styles.css         # Stylesheet for Home.html + SignIn.html (dark theme)
├── pages.css          # Stylesheet for all secondary/content pages (light theme + shared dark nav)
│
├── assets/
│   ├── logo-red2.webp             # Primary logo mark (used in nav badge + footer)
│   ├── braintree-mark-white.webp  # White logo variant
│   ├── hero/1–7.webp              # Home hero background slideshow
│   ├── partners/*.webp            # Client / partner logos (marquee)
│   ├── min/*.webp                 # Blog thumbnails + service/quote imagery
│   ├── find-role.webp             # Careers imagery
│   ├── office-bangalore.webp      # About — office photo
│   ├── office-chicago.webp        # About — office photo
│   └── umesh-belludi.webp         # About — founder photo
│
└── BrainTreeHR-Website.html       # OPTIONAL single-file build of the whole site (see §6)
```

---

## 3. Pages & navigation

- The site is a **multi-page static site**. Navigation is ordinary `<a href="Page.html">` links — no client-side router.
- Shared **dark navigation bar** appears on every page (logo badge, links: Home · Careers · About · Blog · Contact, and a violet **Sign in** button). The active page's link is marked with `class="nav-link active"`.
- Shared **dark footer** on every page (Services, Company, Get in touch columns + legal row linking Privacy / Terms / Sitemap).
- **Mobile**: below 980px the links collapse into a burger menu (`#burger` toggles `.mobile-menu.open`). Each page carries the small inline script that wires this up.
- **Blog**: cards on Home and the Blog index link to `Blog.html#<slug>` (`career-change`, `get-hired`, `job-trends`).
- **Apply**: `Apply.html?role=<Role+Name>` pre-fills the role field (handled by inline JS reading the query string).

---

## 4. Styling system

Two stylesheets, split by theme:

| File | Used by | Theme |
|---|---|---|
| `styles.css` | `Home.html`, `SignIn.html` | Dark (near-black bg, violet accents) |
| `pages.css` | All other pages | Light paper bg, white cards, violet accents, **shared dark nav** |

- Design tokens are CSS custom properties declared in `:root` at the top of each stylesheet (colors, radii, shadows). Change brand colors there.
- Fonts are loaded from Google Fonts in each page `<head>`: **Sora** (display), **Hanken Grotesk** (body), **JetBrains Mono** (eyebrows/labels).
- Fully responsive; breakpoints ladder at 980 / 880 / 860 / 840 / 820 / 760 / 560 / 520 / 480px. Audited for no horizontal overflow down to 375px.

---

## 5. Assets & performance

- **All images are WebP** and already compressed (~730 KB total across the site; each page loads only a subset).
- All `<img>` tags use `loading="lazy"` and `decoding="async"` so offscreen images don't block first paint.
- No JavaScript dependencies, no fonts self-hosted (served from Google Fonts CDN). If you need to remove third-party requests, self-host the three font families and swap the `<link>` tags for local `@font-face`.

---

## 6. The single-file build (`BrainTreeHR-Website.html`)

`BrainTreeHR-Website.html` is an **optional, self-contained** version of the entire site: all 10 pages + CSS + images inlined into one HTML file that runs offline with no server. It is handy for quick previews, email, or offline demos.

**It is a generated artifact, not a source file.** Do all real editing in the individual `.html`/`.css` files. For a normal web deployment, ignore this file and deploy the individual pages.

---

## 7. Deployment

Deploy the repository root to any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, Nginx, Apache). No environment variables, no server runtime.

Recommended:
- Set `Home.html` as the site index, or add a host-level redirect/rewrite from `/` → `/Home.html` (or rename `Home.html` → `index.html` and update the ~40 in-site links to `Home.html`).
- Enable gzip/brotli and long-cache headers for `assets/**`.

### Forms — action required
The **Contact**, **Apply**, and **Sign in** forms are **front-end only**; they do not submit anywhere yet. Before launch, wire each `<form>` to a backend or form service (e.g. Formspree, a serverless function, or your CRM/ATS endpoint) by setting the `action`/`method` and handling submission. Search for `<form` in the three pages.

---

## 8. Content notes

- **Address (single source of truth):** #19, 5th Floor, Shivashankar Plaza, Richmond Circle, Bengaluru – 560027, Karnataka, India.
- **Contact:** info@braintreehr.com · +91 9845930384.
- **Legal pages** (`Privacy.html`, `Terms.html`) contain thorough templates covering India's DPDP Act 2023, US CCPA/CPRA (California), and TDPSA (Texas), plus CAN-SPAM/TCPA/COPPA. They carry a visible disclaimer — **have qualified counsel review and localize before publishing.**

---

## 9. Suggested next steps for the dev team

1. Wire up the three forms to a real backend / form service.
2. Decide on `index.html` entry (rename or host redirect).
3. Add real `<title>`/meta-description/Open Graph tags per page for SEO (basic titles are present).
4. Optional: self-host fonts to remove the Google Fonts request.
5. Optional: generate an XML `sitemap.xml` + `robots.txt` for crawlers (the current `Sitemap.html` is the human-facing one).
6. Populate the blog with full article pages if the three posts should have dedicated reading views (currently teasers on a single index).

_Last updated: 2 July 2026_