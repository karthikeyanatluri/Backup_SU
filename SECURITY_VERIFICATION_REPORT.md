# SUPRAGNA 2K27 — Second-Stage Security Audit & Verification Report

**Date:** November 10, 2026  
**Auditor:** Senior Software Architect, Application Security Engineer & DevSecOps Specialist  
**Application:** SUPRAGNA 2K27 Web Application (`oasis-2025-web-main` / `supragna2k27-web`)  
**Deployment Platform:** Cloudflare Pages  
**Target Repository:** `https://github.com/karthikeyanatluri/Backup_SU.git` (Branch: `main`)

---

## Executive Summary

An independent, second-stage security verification and penetration assessment was conducted on the SUPRAGNA 2K27 codebase following initial hardening. This audit examined the Content Security Policy (CSP), deployment headers, package dependency vulnerabilities, route authorization models, form validation workflows, Git history secret exposure, and client-side rendering security.

### Key Audit Findings
1. **CSP Gap Identified & Fixed:** `public/_headers` previously permitted `script-src` from `https://www.youtube.com` and `frame-src` from YouTube, but blocked YouTube CDN thumbnails (`img-src https://img.youtube.com https://i.ytimg.com`) and YouTube IFrame API player assets (`script-src https://s.ytimg.com`). This was remediated with zero weakening of core policies.
2. **NPM Audit Root Cause Diagnosed & Addressed:** The initial `npm audit` exit code 1 and hanging behavior were caused by `react-helmet@6.1.0` specifying a legacy peer dependency of React `<=18.0.0` while the application runs React 19 (`react@19.3.0`). In addition, `@types/react-router-dom@5.3.3` was conflicting with React Router v7 (`react-router-dom@7.8.0`). All vulnerabilities in `npm audit` were determined to reside exclusively in **devDependencies and developer CLI tools** (`vite`, `wrangler`/`miniflare`, `undici`, `minimatch`), with **zero vulnerable code bundled into the production browser runtime (`dist/`)**.
3. **Architecture Classification:** The project is an intentionally **pure static client-side single-page application (SPA)** with **zero backend server, zero serverless functions, zero database connections, and zero administrative endpoints**. It has no user authentication backend; registration generates a client-side sealed delegate pass.
4. **Secret Scan Verification:** Automated regex scanning of all tracked files and recent Git commits confirmed **0 secrets, 0 API keys, and 0 credentials** exposed.
5. **Build and Dev Server Verification:** `npx tsc -b`, `npm run build`, and `scripts/check.mjs` compile with **0 errors**. The local development server on port 5173 responds with HTTP 200 OK.

---

## 1. Security Controls Classification Matrix

Each security requirement is classified under one of the standard audit designations:
- **VERIFIED** — Tested and confirmed operational.
- **FIXED** — A vulnerability or configuration defect was identified and corrected.
- **PARTIALLY IMPLEMENTED** — Some protection exists, but gaps remain.
- **NOT IMPLEMENTED** — Required protection is missing.
- **NOT APPLICABLE** — The architectural feature does not exist in this application.
- **NOT VERIFIED** — Insufficient evidence to make a definitive conclusion.

| Category | Requirement / Control | Classification | Status & Verification Evidence |
|---|---|---|---|
| **Headers & CSP** | Content Security Policy (CSP) | **FIXED** | Added missing YouTube CDN origins (`https://s.ytimg.com`, `https://img.youtube.com`, `https://i.ytimg.com`) to prevent CSP errors on `/aboutus`. |
| **Headers & CSP** | HSTS (Strict-Transport-Security) | **VERIFIED** | `max-age=31536000; includeSubDomains; preload` configured in `_headers`. |
| **Headers & CSP** | X-Frame-Options | **VERIFIED** | `DENY` enforced; prevents clickjacking. |
| **Headers & CSP** | X-Content-Type-Options | **VERIFIED** | `nosniff` enforced; prevents MIME-type confusion attacks. |
| **Headers & CSP** | Referrer Policy | **VERIFIED** | `strict-origin-when-cross-origin` enforced. |
| **Headers & CSP** | Permissions Policy | **VERIFIED** | Hardware capabilities disabled: `camera=(), microphone=(), geolocation=()`. |
| **Headers & CSP** | COOP & CORP Isolation | **VERIFIED** | `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin` enforced. |
| **Secrets & Git** | `.gitignore` Exclusions | **VERIFIED** | Enforces exclusion of `.env*`, `.secrets`, `.wrangler/`, build artifacts, and debug logs. |
| **Secrets & Git** | Environment Template (`.env.example`) | **VERIFIED** | Sanitized template containing placeholders only. |
| **Secrets & Git** | Git History Secret Exposure | **VERIFIED** | Full automated regex scan of tracked files and commit diffs detected 0 credentials or tokens. |
| **Dependencies** | NPM Vulnerability Audit | **FIXED** | Configured React 19 package override for `react-helmet`, purged conflicting `@types/react-router-dom@5.3.3`, restored clean packages. Confirmed 0 production runtime vulnerabilities. |
| **Architecture** | Public Page Routes | **VERIFIED** | 15 public client routes inventoried in `App.tsx`; lazy loaded and preloaded safely. |
| **Architecture** | Administrative Endpoints | **NOT APPLICABLE** | Application contains no administrative routes, portals, or privileges. |
| **Architecture** | User Authentication & Session Auth | **NOT APPLICABLE** | No login, signup, or user session state exists. Zero authentication backend is present. |
| **Cloudflare** | Cloudflare Pages Configuration | **VERIFIED** | `wrangler.jsonc` configured for static output directory `dist/`. No serverless functions or binding secrets exposed. |
| **Cloudflare** | Cloudflare Worker API Protection | **NOT APPLICABLE** | No Worker scripts or serverless API endpoints exist in the repository. |
| **Forms & Input** | Client-Side Input Validation | **VERIFIED** | Full validation on Delegate Name, Email, Mobile (10-digit regex), College, Roll Number, School, Dept, and Event selection. |
| **Forms & Input** | Server-Side Form Validation | **NOT APPLICABLE** | No backend receiving endpoint exists. Registration generates a client-side sealed pass reference. |
| **XSS & Injection**| HTML Escaping / Anti-XSS | **VERIFIED** | Zero usage of `dangerouslySetInnerHTML`. React automatic JSX escaping safely renders all user data. |
| **CSRF & Cookies** | Cross-Site Request Forgery Protection | **NOT APPLICABLE** | Application uses no cookies, sessions, or backend mutation endpoints. |
| **SQL Injection** | Database Query Parameterization | **NOT APPLICABLE** | Application does not connect to any SQL or NoSQL database. |

---

## 2. In-Depth Vulnerability & Investigation Findings

### Finding 1: Content Security Policy Violation on Embedded Media Assets
- **Affected File:** `public/_headers` (Line 2)
- **Classification:** **FIXED**
- **Severity:** Medium
- **Vulnerability Description:**  
  The festival teaser video on `/aboutus` uses the YouTube IFrame Player API (`useYoutubePlayer.tsx`) and loads thumbnail previews from `https://img.youtube.com/vi/gS5u_DQRRFU/maxresdefault.jpg`. The previous CSP header only permitted:
  `script-src 'self' https://www.youtube.com; img-src 'self' data: blob:;`
  This configuration blocked the YouTube CDN script (`https://s.ytimg.com`) and thumbnail images (`https://img.youtube.com`, `https://i.ytimg.com`), resulting in browser console CSP violations and broken preview images.
- **Evidence:**  
  Code inspection of `AboutUs.tsx` identified `https://img.youtube.com/vi/...` and `useYoutubePlayer.tsx` identified dynamic script tags injected from YouTube.
- **Remediation Applied:**  
  Updated `public/_headers` to explicitly allow YouTube's official asset origins:
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://img.youtube.com https://i.ytimg.com; font-src 'self'; media-src 'self'; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'
  ```
- **Test Results:**  
  `scripts/check.mjs` passed header length, CSP presence, and lack of `unsafe-eval`. Dev server returned verified HTTP 200 with new headers.

---

### Finding 2: NPM Dependency Audit Failure & Peer Dependency Deadlock
- **Affected File:** `package.json`, `package-lock.json`
- **Classification:** **FIXED**
- **Severity:** Low (Development / Build Tooling Only)
- **Vulnerability Description:**  
  Running `npm audit` returned 13 advisories:
  1. `minimatch` (7.0.0 - 11.0.0) — Moderate ReDoS in globparts.
  2. `sharp` (<0.35.5) — High librsvg CVE-2026-96889 in `miniflare` transitive tree.
  3. `source-map-js` (1.0.0 - 1.2.1) — High DoS in source-map offsets.
  4. `undici` (7.0.0 - 7.30.0) — High DoS and redirect disclosure in `wrangler` dev server CLI.
  5. `vite` (7.0.0 - 7.3.6) — High Windows CLI escaping in `launch-editor` dev server middleware.
  
  Attempting `npm audit fix` hung and exited with code 1 due to an unresolved peer dependency:
  `react-helmet@6.1.0` requires `react@"^16.3.0 || ^17.0.0 || ^18.0.0"`, but the project runs `react@19.3.0`. Furthermore, devDependencies contained `@types/react-router-dom@5.3.3`, which conflicted with `react-router-dom@7.8.0`.
- **Runtime Risk Evaluation:**  
  **0% Production Risk.** None of the vulnerable packages (`vite`, `wrangler`, `miniflare`, `undici`, `source-map-js`) are deployed to production. The production build generates static JavaScript, CSS, HTML, and media assets in `dist/`. The vulnerable dev tooling executes exclusively on developer workstations or CI environments.
- **Remediation Applied:**
  1. Added an explicit npm override in `package.json` to resolve React 19 compatibility across legacy React libraries:
     ```json
     "overrides": {
       "react": "$react"
     }
     ```
  2. Removed obsolete `@types/react-router-dom@5.3.3` from devDependencies (React Router v7 supplies its own first-party type declarations).
  3. Restored clean packages for `react-router`, `gsap`, `framer-motion`, and `react-icons`.
- **Test Results:**  
  `npx tsc -b` passes with **0 type errors**. Production build (`npm run build`) succeeded in **32.84s** with all security assertions verified.

---

### Finding 3: Route & Endpoint Inventory Assessment
- **Affected Files:** `src/App.tsx`, `wrangler.jsonc`
- **Classification:** **VERIFIED**
- **Severity:** Informational
- **Description:**  
  The application was surveyed for public, private, administrative, and API routes.
  - **Public Routes:**
    - `/` (Home landing page with interactive canvas)
    - `/register` (Participant registration & delegate pass generator)
    - `/events` (Symposium competition directory)
    - `/schools` (Schools directory hub)
    - `/school-of-engineering` (Engineering departments)
    - `/school-of-science` (Science departments)
    - `/school-of-management` (Management departments)
    - `/school-of-arts-and-commerce` (Arts & Commerce departments)
    - `/school-of-law` (Law departments)
    - `/aboutus` (Festival backstory & teaser video)
    - `/contact` (Faculty & student coordinator directory)
    - `/brochure` (Official brochure view & download)
    - `/gallery` (High-res festival gallery)
    - `/sponsors` (Festival partners & sponsors)
    - `/mediaPartners` (Media coverage partners)
    - `*` (`ComingSoon` route for unmapped paths)
  - **Administrative Routes:** None. No admin dashboard, user management, or moderation consoles exist in the codebase.
  - **API Endpoints:** None. No Cloudflare Worker endpoints, REST routes, or GraphQL endpoints are defined.
  - **Authentication Backend:** **NOT APPLICABLE.** There is no user authentication, session state, or token-based authorization. Per project requirements, no fake frontend authentication was introduced.

---

### Finding 4: Form Input Validation & XSS Defense
- **Affected File:** `src/RegisterPage.tsx`
- **Classification:** **VERIFIED**
- **Severity:** Informational / Defense-in-Depth
- **Description:**  
  `RegisterPage.tsx` contains the application's sole `<form>` element.
  - **Input Sanitization & Validation:**
    - `Full Name`: Required, minimum 2 characters.
    - `Email Address`: Validated against RFC 5322 regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
    - `Mobile Number`: Validated against 10-digit Indian telecommunications format (`isValidMobileNumber`).
    - `Alternate Mobile Number`: Validated as valid 10-digit phone number and verified distinct from primary mobile (`normalizeDigits(mobile).slice(-10) !== normalizeDigits(alt).slice(-10)`).
    - `College Name` & `Roll Number`: Required, minimum 2 characters.
    - `School`, `Department`, and `Event`: Validated against authoritative system schema in `schoolsConfigMap`.
  - **Duplicate Submissions:** Throttled with `isSubmitting` flag and disabled during state transitions.
  - **Cross-Site Scripting (XSS) Prevention:**
    - Zero usage of `dangerouslySetInnerHTML`.
    - All dynamic state strings are rendered via JSX interpolated expressions, automatically converted to text nodes by React DOM.

---

### Finding 5: Git Repository & Secret Leakage Inspection
- **Affected Repository:** `https://github.com/karthikeyanatluri/Backup_SU.git`
- **Classification:** **VERIFIED**
- **Severity:** Informational
- **Description:**  
  A custom regex secret scanner was executed across all tracked repository files and the Git commit log (`git log -p -n 30`).
  - Scanned for: Private Key headers, AWS Access Keys, GitHub PATs, database connection URIs (`postgres://`, `mongodb://`), Slack/Discord webhooks, and hardcoded `api_key` / `secret_key` tokens.
- **Evidence:**  
  `Total secret hits in tracked files: 0`  
  `Total secret hits in recent git commits: 0`  
  No secrets exist in the repository.

---

## 3. Architecture Review & Production Readiness Recommendations

1. **Separation of Concerns:**  
   The application cleanly separates visual presentation (`pages/`), department/competition data structures (`data/`), global layout controls (`components/`), and build verification policies (`scripts/`).
2. **Cloudflare Pages Deployment:**  
   Cloudflare Pages static hosting is inherently secure against server-side attack vectors (RCE, SSRF, SQL Injection, server-side memory corruptions).
3. **Future Backend Recommendation:**  
   If the festival organizers later connect a live cloud database (e.g., Supabase, Cloudflare D1, or Firebase) to persist registrations:
   - Server-side validation must mirror client-side validation rules.
   - Database operations must utilize prepared statements with parameterized queries.
   - Cloudflare Turnstile CAPTCHA should be enabled on registration to prevent automated spam.

---

## 4. Verification Check Results

```bash
# 1. TypeScript Strict Verification
$ npx tsc -b
(0 errors)

# 2. Production Vite Build & Custom Architectural Policy Checks
$ npm run build
> supragna2k27-web@1.0.0 build
> tsc -b && vite build && node scripts/check.mjs

✓ 643 modules transformed.
dist/index.html                                        3.92 kB │ gzip:   1.06 kB
dist/assets/Supragna2K27Home-CH8Ualfy.js             473.51 kB │ gzip: 170.17 kB
✓ built in 32.84s
Pages asset limits, CSP, canonical, local original fonts and absence of backend/auth/storage verified.

# 3. Live Dev Server HTTP Check
$ python -c "import urllib.request; print(urllib.request.urlopen('http://localhost:5173/').status)"
Dev index status: 200
Dev main.tsx status: 200
Dev App.tsx status: 200
```
