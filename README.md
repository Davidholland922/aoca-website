# AOCA Engineering Consultants — draft website

Client-facing draft for AOCA Engineering Consultants, built for staging review
on Vercel's free tier **before** any domain or hosting is purchased.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (scroll reveals, reduced-motion aware)
- Lucide icons

## Working on the site

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
```

## Where things live

- **All copy/content:** `lib/site.ts` — services, projects, testimonials,
  team, contact details. One file, heavily commented.
- **Placeholder swap-list:** `PLACEHOLDERS.md` — everything AOCA must
  confirm or supply before launch (photos, phone, address, real case studies…).
- **Pages:** `app/` — home, about, services (+6 detail pages),
  projects (+6 case studies), contact, 404, sitemap, robots.
- **Components:** `components/` — navbar, footer, section heading, CTA band,
  blueprint-style photo placeholders, contact form.

## Draft-mode guards (remove at launch)

- `robots.ts` disallows all crawlers; `layout.tsx` sets `noindex`.
- Footer carries a "Draft for review" notice.
- Contact form simulates success (no backend yet).

## Client project uploads (/admin)

The client adds projects at **`/admin`** (password-protected; checked
server-side on publish). Publishing commits the project JSON + resized
photos to this GitHub repo in one commit (`content/projects.json` +
`public/images/uploads/`), and the site rebuilds automatically once the
Vercel project is connected to GitHub. Uploaded projects appear ahead of
the built-in list everywhere (grid, filters, related, sitemap).

Server env vars (set in Vercel, production): `GITHUB_TOKEN` (repo
contents access), `ADMIN_PASSWORD`.

## Deploy (staging)

```bash
npx vercel        # first run: log in (GitHub login easiest), accept defaults
npx vercel --prod # promote to the stable staging URL
```
