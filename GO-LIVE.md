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

## Exact DNS zone at Blacknight (read from the panel 4 Oct 2026 — rollback reference)

Panel: cp.blacknighthosting.com → Domains → aoca.ie → Manage DNS Records
(DNSManager3 zone id 26435). David has account access (invite accepted
4 Oct). Nameservers ns1–ns4.blacknight.com (zone is live here).

| Name | Type | TTL | Value | Launch action |
|---|---|---|---|---|
| @ | A | 3600 | 80.93.26.192 | **edit → 76.76.21.21** |
| www | A | 3600 | 80.93.26.192 | **edit → 76.76.21.21** |
| exchange | A | 3600 | 213.191.225.59 | leave (legacy) |
| @ | NS | 3600 | ns1/ns2.blacknight.com | leave (never remove) |
| @ | MX | 300 | 10 aoca-ie.mail.protection.outlook.com | **leave — email** |
| @ | TXT | 3600 | v=spf1 … include:spf.protection.outlook.com -all | **leave — email** |
| @ | TXT | 3600 | 8mqfd9202mju34ti3cg38128a6 | leave (verification) |
| _acme-challenge.www | TXT | 3600 | 9oZFEiiKk… | leave (old host cert) |
| autodiscover | CNAME | 3600 | autodiscover.outlook.com | **leave — email** |
| k2._domainkey / k3._domainkey | CNAME | 3600 | dkim2/dkim3.mcsv.net | **leave — Mailchimp email** |
| hs1-27138842._domainkey | CNAME | 3600 | …dkim.hubspotemail.net | **leave — HubSpot email** |
| enterpriseenrollment / enterpriseregistration | CNAME | 3600 | Microsoft Intune | leave |

Only the two bold A records change. Every email-related record (MX, SPF,
autodiscover, Mailchimp/HubSpot DKIM) is untouched. Rollback = set the two
A records back to 80.93.26.192 (takes effect within the 3600s TTL).

The go-live code flip is parked on local git branch `launch` (commit
builds clean); pushing it to main is step 1 on launch day.

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
