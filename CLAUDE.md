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

## ⚡ Architecture Note — Framer Hydration DISABLED

`script_main.CXxzkXGP.mjs` (the sole external script tag) has been **removed**.
Framer's React engine no longer loads, so the page is served as **pure static HTML**.

**Benefits:**
- `index.html` edits are permanent — nothing overrides them
- MJS files no longer need to be patched for content changes
- No more "reverts after a second" behaviour

**What still works:** All inline scripts (animator, appear effects, breakpoints, smooth scroll), our custom header/nav/JS.

> ⚠️ If Framer animations break in future, patch the relevant inline `<script>` blocks in `index.html` directly — do NOT re-enable script_main.

## MJS Files (historical — no longer active)

The MJS files below were patched before hydration was disabled. They are still on disk but are no longer loaded.

| File | What was changed |
|------|-----------------|
| `j8dorx1i1.B6pGEQAK.mjs` | Footer: `©Irise Studio 2026` → `©2026 Shraddha Thorat`, `Rosyid Qoim` → `Shraddha Thorat` |
| `r3pgXBKYQ.Cn8RRTkR.mjs` | Nav wordmark default prop: `Hanzo` → `Shraddha Thorat` (3 occurrences) |
| `script_main.CXxzkXGP.mjs` | Footer text: `© Hanzo Studio, 2025` → `©2026 Shraddha Thorat` |
| `bJ33zZF_tm-XTZ6zgFzqVAnIrpxtZiLmvdPeMrXJ510.tMIsszZD.mjs` | Footer text: `© Hanzo Studio, 2025` → `©2026 Shraddha Thorat` |
| `shared-lib.D1MmSO8W.mjs` | Meta description: `Hanzo` → `Shraddha Thorat` (2 occurrences) |
| `PW-h38ugHlefrPpVcoOjo4n8GXcAguncpMk6oCz9kC8.DhJ9gF0g.mjs` | About image: all 12 refs replaced with transparent 1px gif placeholder. |

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
- Fixed top bar, glassmorphism: `background: rgba(255,255,255,0.55)`, `backdrop-filter: blur(20px) saturate(180%)`
- `border-bottom: 1px solid rgba(255,255,255,0.4)` + subtle box-shadow
- "Shraddha Thorat" wordmark (left) + hamburger button (right)
- Hamburger opens `#st-nav` dropdown; closes on outside click
- Smooth-scroll JS listener for all `a[href^="#"]` links

### 2. Custom Nav (`#st-nav`)
- **Right-aligned panel** — `position: fixed; top: 58px; right: 40px; width: 200px`
- Frosted glass: `background: rgba(255,255,255,0.75)`, `backdrop-filter: blur(24px) saturate(180%)`
- `border-radius: 16px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.12)`
- Links: Process (`#process`) · Work (`#work`) · About (`#about-1`) · Contact (`#experience`)

### 3. CSS Overrides (`<style id="st-custom">`)
- Hides `.framer-1lcmve6` (original Framer nav)
- Hides `.framer-cyj4wy` (scrolling tickers — second fold)
- Adds `padding-top: 62px` to `#main`
- **Desktop header padding:** `@media (min-width: 810px)` → `padding: 16px 100px` (2.5× the 40px default)
- **Second fold (`.framer-ts46om`) padding 0.7×:** `56px 0` desktop, `39px 0` tablet, `28px 0` mobile
- **Process cards mobile:** `height:auto !important; overflow:visible !important` on `.framer-12koumt`, `.framer-1mpb03n`, `.framer-hFxSj`, `#process-cards`
- **AFK Detour mobile:** Force `.framer-1evcvgy`/`.framer-sgtebz` visible; center `.framer-191bz3v-container` and `.framer-eiw4av`
- **Footer mobile:** `overflow:visible; height:auto; padding-bottom:24px` on `.framer-n0isp`

---

## About Me Section Image

- **HTML selector:** `img` inside `#about-1 .framer-1c0vbc5`
- **Old URL:** `https://framerusercontent.com/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png`
- **New path:** `assets/shraddha-photo.png`
- Patched in `PW-h38ug...mjs` — all 12 refs changed to `/assets/shraddha-photo.png`
- Static HTML `<img>` tag: srcset/src cleaned of Framer CDN query params (`?scale-down-to`, `?width=`, `?height=`)
- Post-render JS `fixAboutImage()` runs at 400ms/1500ms/3500ms to force `.framer-1c0vbc5 img` src after Framer hydration
- **Favicon:** All `<link rel="icon">` and `<link rel="apple-touch-icon">` tags removed from `<head>`

---

## Process Cards — Illustrations

SVG illustrations are injected **post-render via JavaScript** (not static HTML, because Framer hydration wipes static injections).

The script in `index.html` runs at 300ms / 1200ms / 3000ms after load, targets `[data-framer-name="Card Item"]`, finds the `<strong>` number, and inserts an `.st-illustration` div before the text section. Guards against double-injection with `if (card.querySelector('.st-illustration')) return`.

| Card | Number | Illustration |
|------|--------|-------------|
| Understand | 1 | Magnifying glass with crosshairs |
| Shape | 2 | Diamond wireframe with corner anchor points |
| Craft | 3 | Pencil/tool illustration |

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
