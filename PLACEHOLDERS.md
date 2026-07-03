# Content status & remaining swap-list

Content and imagery are now **real** — sourced from the existing aoca.ie draft
(crawled via the SkipDNS staging link on 2026-07-03). All editable content
lives in **`lib/site.ts`**.

## Real content in place

- Company history, mission, 5 values, timeline (est. 1996, Aidan O'Connell & Associates)
- 3 offices with real addresses/phones (Portlaoise HQ, Dublin, Manchester)
- Management team: Philip O'Connell, Brian Byrne, Emmett O'Reilly, Colin Scott
- 5 services with real copy (Civil, Structural, Insurance, Pyrite, Consulting)
- 24 real projects with real photography (334 images from the current site)
- 5 real client testimonials + partner logos (Davies, PCLA, RDF, OMC)
- 30-brand client logo wall
- Hero background video supplied by the client (public/video/hero.mp4)

## Still to confirm with AOCA

| Item | Notes |
|---|---|
| Testimonial attributions | Names/roles are real but company names weren't on the old site — confirm before launch |
| "7,000+ projects / 27 years" stats | Old site says both "27 years" and "since 1996" (30 yrs) — confirm preferred figure |
| Team photos | Management team currently shown with initials — headshots would lift the Company page |
| Insights/news section | Old site has ~10 articles; not migrated into this draft yet (add later if wanted) |
| Sector assignment of Arklow WTP | Old site categorised it under Commercial; arguably Infrastructure — confirm |

## Technical before production launch

- Contact form backend (`components/ContactForm.tsx`) — still simulates success.
- Re-enable indexing: remove `robots: { index: false }` in `app/layout.tsx`
  and open up `app/robots.ts`.
- Update `site.url` in `lib/site.ts` to https://aoca.ie when it goes live.
- Cookie/privacy policy pages (old site has them; not in this draft).
- Video: 8.4MB mp4 — consider a compressed webm variant for slower connections.
