# Shraddha Thorat — Portfolio

Framer-exported static site, rebranded from the "Hanzo" template. Deployed on Vercel via GitHub (`prateekpagore-eng/Shraddha_Portfolio`, `main` branch).

---

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main entry point. All custom HTML/CSS/JS injected here. |
| `404.html` | Custom error page. |
| `assets/shraddha-photo.png` | Shraddha's profile photo (used in About section). |
| `assets/framerusercontent.com/sites/4CSv68REPVhNqr03koTPs9/` | Framer JS/MJS bundles — these re-render the page after hydration and override static HTML. Must be patched alongside index.html. |

---

## Patched MJS Asset Files

These files contain the actual rendered content. Changing only `index.html` is not enough — Framer JS re-hydrates and overwrites.

| File | What was changed |
|------|-----------------|
| `j8dorx1i1.B6pGEQAK.mjs` | Footer: `©Irise Studio 2026` → `©2026 Shraddha Thorat`, `Rosyid Qoim` → `Shraddha Thorat` |
| `r3pgXBKYQ.Cn8RRTkR.mjs` | Nav wordmark default prop: `Hanzo` → `Shraddha Thorat` (3 occurrences) |
| `script_main.CXxzkXGP.mjs` | Footer text: `© Hanzo Studio, 2025` → `©2026 Shraddha Thorat` |
| `bJ33zZF_tm-XTZ6zgFzqVAnIrpxtZiLmvdPeMrXJ510.tMIsszZD.mjs` | Footer text: `© Hanzo Studio, 2025` → `©2026 Shraddha Thorat` |
| `shared-lib.D1MmSO8W.mjs` | Meta description: `Hanzo` → `Shraddha Thorat` (2 occurrences) |

---

## Page Sections (IDs)

| ID | Section |
|----|---------|
| `#main` | Root wrapper — has `padding-top: 62px` added for custom header |
| `#hero` | Hero / first fold |
| `#about` | Scrolling tickers section — **hidden** via `.framer-cyj4wy { display: none !important }` |
| `#intro` | Intro text section |
| `#work` | Work / case studies section |
| `#process` | Design process heading section |
| `#process-cards` | Understand / Shape / Craft cards |
| `#about-1` | About Me section (photo + bio) |
| `#experience` | Experience section (used as Contact anchor) |

---

## Key CSS Classes

| Class | Element |
|-------|---------|
| `.framer-1lcmve6` | Original Framer header/nav — **hidden** (`display: none !important`) |
| `.framer-cyj4wy` | Second fold tickers/scrolling section — **hidden** |
| `.framer-n0isp` | Footer container |
| `.framer-12koumt` | Process card item wrapper |
| `.framer-3649hr` | Number area inside each process card |
| `.framer-5dwcuy` | Title + description area inside each process card |
| `.framer-huw5mi-container` | Hero CTA buttons container |
| `.framer-EOUFL` | Primary CTA button (About Me) |

---

## Custom Injections in `index.html`

All injected immediately after `<body>`:

### 1. Custom Header (`#st-header`)
- Fixed top bar, white frosted glass background
- "Shraddha Thorat" wordmark (left) + hamburger button (right)
- Hamburger opens `#st-nav` dropdown with scroll links
- Smooth-scroll JS listener for all `a[href^="#"]` links

### 2. Custom Nav (`#st-nav`)
Links: Process (`#process`) · Work (`#work`) · About (`#about-1`) · Contact (`#experience`)

### 3. CSS Overrides (`<style id="st-custom">`)
- Hides `.framer-1lcmve6` (original Framer nav)
- Hides `.framer-cyj4wy` (scrolling tickers — second fold)
- Adds `padding-top: 62px` to `#main`

---

## About Me Section Image

- **HTML selector:** `img` inside `#about-1 .framer-1c0vbc5`
- **Old URL:** `https://framerusercontent.com/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png`
- **New path:** `assets/shraddha-photo.png`
- Replace all occurrences of the old URL (appears ~4x with query params like `?width=`, `?scale-down-to=`)

---

## Process Cards — Illustrations

SVG illustrations injected inside `.framer-3649hr` (after the number, before `.framer-5dwcuy`):

| Card | Number | Illustration |
|------|--------|-------------|
| Understand | 1 | Magnifying glass with crosshairs |
| Shape | 2 | Diamond wireframe with corner anchor points |
| Craft | 3 | Pencil/tool path illustration |

Injected pattern:
```
<number div>N</number div>  →  <number div>N</number div>[SVG]</div><div class="framer-5dwcuy">
```

---

## Hero CTA

- **"About Me" button** — `href` changed from `https://stfn.lemonsqueezy.com/buy/...` to `#about-1`
- Appears in multiple SSR variant divs — use `replaceAll`

---

## Footer (Custom)

Replaced original Irise Studio footer with:
```html
<div style="...flex; justify-content: space-between; padding: 24px 40px;">
  <div>©2026 Shraddha Thorat. All rights reserved.</div>
  <div>Product Designer</div>
</div>
```
Uses same CSS variables: `--token-5a2e47a6-02a0-466e-809d-963a06e9a292` (muted gray) and Geist font.

---

## Git / Deploy

- **Remote:** `https://github.com/prateekpagore-eng/Shraddha_Portfolio.git`
- **Branch:** `main`
- **Git user:** `prateekpagore-eng` / `prateekpagore@gmail.com` (set globally)
- **Vercel:** Auto-deploys on push to `main`. Changes in `.mjs` assets require a full redeploy (Vercel picks these up automatically since they are committed files).

> ⚠️ Always patch both `index.html` AND the relevant `.mjs` files — Framer hydration overwrites static HTML content.
