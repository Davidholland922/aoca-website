# Go-live runbook — aoca.ie → new site

Status (2 Oct 2026): everything is pre-staged. Launch is two DNS edits at
Blacknight plus one small code commit. Email is untouched throughout.

## Already done (no action)

- Vercel project `aoca-draft` (team `aoca`, Pro plan) has both domains
  attached and ownership-verified: `www.aoca.ie` (primary) and `aoca.ie`
  (308 redirect → www). HTTPS certificates issue automatically once DNS
  points at Vercel.
- Contact form live (Web3Forms key saved in admin, tested by Philip).
- Terms of Business at `/terms` (hidden, noindex); `/terms-of-business` and
  `/termsofbusiness` redirect to it.
- 301 redirect map from every old WordPress URL (next.config.js).
- Admin fully self-service; GitHub token never expires.

## Current DNS at Blacknight (recorded 2 Oct 2026 — rollback reference)

| Record | Name | Value | Action at launch |
|---|---|---|---|
| A | `@` (aoca.ie) | 80.93.26.192 | **change** → `76.76.21.21` |
| A | `www` | 80.93.26.192 | **change** → `76.76.21.21` |
| MX | `@` | 10 aoca-ie.mail.protection.outlook.com | **leave** (Microsoft 365 email) |
| TXT | `@` | v=spf1 ip4:213.191.225.59 ip4:83.70.179.45 ip4:80.93.26.192 include:spf.protection.outlook.com -all | **leave** |
| TXT | `@` | 8mqfd9202mju34ti3cg38128a6 | **leave** (domain verification) |
| anything else (autodiscover, _dmarc, DKIM selectors…) | | | **leave** |

Email lives entirely on the MX/TXT records → cannot be affected by the two
A-record changes. Rollback = set both A records back to 80.93.26.192.

## Launch day (≈30 min, best early morning)

1. **David — code flip (one commit, I do it):**
   - `lib/site.ts` → `url: "https://www.aoca.ie"`
   - `app/layout.tsx` robots → `index: true, follow: true`
   - `app/robots.ts` → allow all, point to sitemap
   - `components/Footer.tsx` → remove "Draft for review" line
   - `next.config.js` → host redirect `aoca-draft.vercel.app` → `https://www.aoca.ie/:path*`
   Push → auto-deploys in ~1 min.
2. **David — Blacknight DNS (the only manual step):** log in to the
   Blacknight control panel → aoca.ie → DNS records → edit the two A records
   above to `76.76.21.21`. Save. Touch nothing else.
3. **Wait 5–30 min** for DNS to propagate (`dig +short A www.aoca.ie` should
   return 76.76.21.21). Vercel issues the HTTPS certificate automatically.
4. **Verify:**
   - https://www.aoca.ie loads the new site, padlock valid
   - https://aoca.ie redirects to www
   - https://www.aoca.ie/terms works; `/projects`, admin, an old WordPress
     URL (e.g. `/civil-engineering`) redirects correctly
   - Send a contact-form test → arrives in info@aoca.ie
   - Send an email to info@aoca.ie from an outside address → arrives
     (proves email untouched)
5. **Same day:** Google Search Console → add property `www.aoca.ie` (DNS TXT
   or HTML-file verification), submit `https://www.aoca.ie/sitemap.xml`,
   request indexing of the homepage. Also "Change of address" is NOT needed
   (same domain).

## After launch

- Keep the old hosting (80.93.26.192) alive ~2 weeks as a safety net, then
  cancel it.
- Watch Search Console coverage for a few weeks: old URLs should report as
  redirected, not 404.
- Optional: a privacy policy page (recommended for an Irish business site;
  the contact form collects personal data).
