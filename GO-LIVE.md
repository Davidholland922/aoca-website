# Go-live runbook — aoca.ie → new site

Prepared 2026-07-07. Everything in Part A is ALREADY DONE and deployed.
Parts B–D happen on cutover day (~15 minutes) once the client signs off.

## Current state of the domain (checked 2026-07-07)

- DNS hosted at **Blacknight** (ns1/ns2.blacknight.com) — cp.blacknight.com
- Website: `A` record → 80.93.26.192 (old WordPress server), same for www
- **Email: Microsoft 365** (`MX → aoca-ie.mail.protection.outlook.com`) —
  fully independent of web hosting. Web cutover CANNOT affect email.
  MX / SPF / TXT records are NOT to be touched.
- TTL 3600s (1 hour)

## Part A — done in advance ✅

- [x] Full 301 redirect map old-WordPress → new URLs (next.config.js):
      service pages → /expertise/*, /project/* → /projects/*,
      /project_category/* → sector-filtered projects, /our-culture → /culture,
      all 19 root-level articles → /insights/*, /feed & /category/* → /insights
- [x] Vercel Web Analytics component installed (enable toggle: Vercel
      dashboard → aoca-draft → Analytics → Enable — free tier)
- [x] Sitemap, canonical metadata, JSON-LD structured data
- [x] GitHub→Vercel auto-deploy

## Part B — cutover day, in order

1. **(Optional, morning-of) Lower TTL** at Blacknight: set aoca.ie A record
   TTL to 300 so any rollback takes 5 minutes, not an hour.
2. **Add domain in Vercel**: dashboard → aoca-draft project → Settings →
   Domains → add `aoca.ie` and `www.aoca.ie` (redirect www → apex when
   asked). Vercel shows the records it wants — they will match step 3.
3. **At Blacknight** (cp.blacknight.com → DNS for aoca.ie):
   - Change `A` record for `@` (aoca.ie):  80.93.26.192 → `76.76.21.21`
   - Change `www`: → CNAME `cname.vercel-dns.com`
     (if www must stay an A record, use 76.76.21.21)
   - **Change nothing else.** No MX, no TXT/SPF, no nameservers.
4. Wait for Vercel's domain panel to show both domains valid (it issues
   SSL automatically, usually < 10 min at TTL 300).

## Part C — flip the site to production mode (I do this, 1 commit)

- `lib/site.ts` → `url: "https://aoca.ie"`
- `app/layout.tsx` → remove `robots: { index: false }`
- `app/robots.ts` → allow all, point to sitemap
- Remove the "Draft for review" footer notice
- Push → auto-deploys

## Part D — SEO tracking & follow-through

1. **Google Search Console**: add property `aoca.ie` (domain property via
   DNS TXT record at Blacknight — the one TXT addition, harmless to email).
   If the old site already has a GSC property, keep it — history carries.
2. Submit `https://aoca.ie/sitemap.xml`.
3. Request indexing of the homepage + top pages.
4. **Baseline & monitoring**: export current GSC queries/positions in week 1
   (that's the baseline), then check weekly for: Coverage errors, 404s
   (any missed redirect → add it to next.config.js), Core Web Vitals.
5. Vercel Analytics dashboard for live traffic.
6. After 4–6 weeks of stable indexing: consider re-enabling Next image
   optimization for Core Web Vitals gains.

## Rollback (if anything looks wrong)

Change the two DNS records back to 80.93.26.192 — the old WordPress site
is untouched and comes straight back (within TTL).

## Needed from David/client before cutover

- [ ] Client sign-off on the draft
- [ ] Blacknight login (client logs in themselves — or screen-share; the
      change is the two records in step B3)
- [ ] Google account for Search Console (theirs, with David added)
- [ ] Agreed cutover time (any quiet weekday morning; it's ~zero downtime)
