# SUPRAGNA 2K27 — Complete Branding Cleanup & Asset Audit Report

**Date:** November 10, 2026  
**Project:** SUPRAGNA 2K27 (`oasis-2025-web-main` / `supragna2k27-web`)  
**Institution:** Siddhartha Academy of Higher Education (VR Siddhartha Engineering College - Deemed to be University)  
**Festival:** SUPRAGNA 2K27 National Techno-Cultural & Management Festival  
**Repository:** `https://github.com/karthikeyanatluri/Backup_SU.git` (Branch: `main`)

---

## Executive Summary

A comprehensive, zero-loss brand purge and asset cleanup was conducted across the entire codebase. Every legacy OASIS / BITS Pilani reference, obsolete asset, outdated contact photo, duplicate graphic, and legacy audit artifact was audited and removed. All brand collateral—including favicons, touch icons, web app manifest, OpenGraph / Twitter cards, meta tags, and headers—has been updated to strictly represent **SUPRAGNA 2K27**.

The application was built from scratch (`tsc -b && vite build && node scripts/check.mjs`) and passed all asset, CSP, canonical, font, and security constraints with zero errors.

---

## 1. Audit of Legacy OASIS Branding & References

Across all source files (`src/`, `public/`, `index.html`, `vite.config.ts`, `package.json`), a systematic search was performed for strings: `oasis`, `oasis 2025`, `o25`, `bits`, `pilani`, `dvm`.

| Scope | Findings | Action Taken |
|---|---|---|
| **Source Code (`src/**`)** | **0 active references** to OASIS / BITS Pilani. All components (`LandingRevamp`, `Supragna2K27Home`, `Supragna2K27Events`, `SchoolsHubPage`, `Registration`, `ContactDoors`, `AboutUs`, `Gallery`) were previously migrated to Supragna 2K27. | Preserved cleanly; confirmed no regressions. |
| **Package & Config** | `package.json` package name is `supragna2k27-web`; deploy target is `supragna2k27-web`. | Verified correct. |
| **Public Assets** | Found legacy date asset `O25_Date_White.webp`, legacy base64 raster `svgs/logo.svg`, legacy BITS graphic `svgs/landing/madeWithDvm.svg`, and unused backup folders. | Permanently removed from codebase and repository. |
| **Contact Images** | Legacy student portraits from old festival (`Aditya.png`, `Ahan.png`, `Aryan.png`, etc.) were still residing in `public/images/contact/`. Active contacts use `avatar_*.png`. | Obsolete portraits purged. Ornate contact frame textures (`ContactCard1.png`, `ContactCard2.png`, `ContactCard3.png`) retained. |

---

## 2. Files and Assets Removed

The following 33 obsolete or unreferenced legacy files and directories were deleted:

### A. Obsolete OASIS Graphics & Vectors
- `public/images/landing/O25_Date_White.webp` (OASIS 2025 date logo overlay)
- `public/svgs/logo.svg` (Legacy OASIS logo containing embedded base64 raster)
- `public/svgs/landing/madeWithDvm.svg` (Legacy "Made with DVM" BITS Pilani vector)

### B. Obsolete Student Contact Portraits Purged
The following unused portraits from the legacy festival were deleted from `public/images/contact/`:
- `Aditya.png`
- `Ahan.png`
- `Arshita.png`
- `Aryan.png`
- `Ayushmaan.png`
- `Dhruv.png`
- `Ishita.png`
- `Pranav.png`
- `Rahul.png`
- `SajalY.png`
- `avatar_ipsita.png` (Duplicate file with typo; active file is `avatar_ipsitha.png`)

*Note:* `ContactCard1.png`, `ContactCard2.png`, `ContactCard3.png` were verified as ornate parchment background card borders used in `ContactGallery.module.scss` and `ContactDoors.tsx`, and were carefully preserved.

### C. Unused Backup Directories
- `public/images/events/backup/` (entire unreferenced folder containing 18 obsolete event images: `backg.webp`, `dance.webp`, `drama.webp`, `evenback.webp`, `misc.webp`, `music.webp`, `photography.webp`, `quizzes.webp`, etc.)

### D. Obsolete Documentation & Logs
- `EDITION_REFINEMENT.md` (Legacy Oasis 2025 refinement doc)
- `PORTFOLIO_RESTORATION.md` (Legacy Oasis 2025 restoration notes)
- `evidence/` (Legacy 2026 Oasis audit folder containing 12 obsolete JSON and log files)

---

## 3. Brand Replacement & High-Resolution Asset Generation

The official Supragna 2K27 brand emblem (`public/logo2.png`, 1027×1027 RGBA high-resolution artwork featuring the rising sun, Japanese torii gate, Mount Fuji, and mythical dragon motif) was utilized to generate a complete suite of standard favicons and web manifests.

### Favicon & App Icon Matrix Generated
All icons were generated using high-quality Lanczos resampling and written to `public/`:

| Asset | Size | Format | Purpose |
|---|---|---|---|
| `public/favicon-16x16.png` | 16×16 px | PNG | Standard browser tab favicon |
| `public/favicon-32x32.png` | 32×32 px | PNG | Standard desktop browser tab favicon |
| `public/favicon-48x48.png` | 48×48 px | PNG | High-DPI browser favicon |
| `public/favicon.ico` | 16, 32, 48 px | Multi-res ICO | Legacy browser / Windows shortcut support |
| `public/apple-touch-icon.png` | 180×180 px | PNG | iOS Home Screen & Safari bookmarks |
| `public/favicon-192.png` | 192×192 px | PNG | Android PWA home screen icon |
| `public/favicon-512.png` | 512×512 px | PNG | Android splash screen & app stores |
| `public/site.webmanifest` | JSON | PWA Manifest | Web application manifest |

### `site.webmanifest` Configuration
```json
{
  "name": "SUPRAGNA 2K27",
  "short_name": "SUPRAGNA",
  "description": "National Techno-Cultural & Management Festival of Siddhartha Academy of Higher Education (VRSEC)",
  "icons": [
    {
      "src": "/favicon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/favicon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1a0f12",
  "background_color": "#000000",
  "display": "standalone",
  "start_url": "/"
}
```

---

## 4. Metadata & HTML Integration

`index.html` was updated to link all newly generated icon assets and theme metadata:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#1a0f12" />

<title>SUPRAGNA2K27 | National Techno-Cultural & Management Festival</title>
```

OpenGraph and Twitter metadata were verified:
- `og:site_name`: `SUPRAGNA2K27`
- `og:title`: `SUPRAGNA2K27 | National Techno-Cultural & Management Festival`
- `og:image`: `https://supragna2k27.in/logo2.png`
- `og:url`: `https://supragna2k27.in/`
- `twitter:site` / `twitter:creator`: `@supragna_2k27`

---

## 5. Remaining References Audit & Verification

### Project Root Directory Name
- Directory name on disk: `D:\SU2\oasis-2025-web-main`.
- **Reason Retained:** The local working directory name has no effect on build artifacts or web output, and per explicit instructions ("Do not rename npm package or project directory"), the directory name was preserved to avoid breaking local tooling, file paths, or running server handles.

### Build and Deployment Verification
1. **TypeScript Verification (`tsc -b`):** 0 type errors.
2. **Vite Production Build (`vite build`):**
   - Transformed 643 modules cleanly.
   - 0 missing asset errors.
   - All chunks bundled and optimized.
3. **Architecture Assertions (`scripts/check.mjs`):**
   - Verified presence of all Japanese & Serif typography (`japanRamen`, `ShipporiMincho`, `AbhayaLibre`, etc.).
   - Verified absence of insecure network/storage calls (`localStorage`, `sessionStorage`, `fetch`, `axios`).
   - Verified strict CSP headers and asset limits.
4. **Vite Dev Server Check (`http://localhost:5173/`):**
   - HTTP 200 OK returned.
   - Title contains `SUPRAGNA2K27`.
   - Favicon links verified in served DOM.
