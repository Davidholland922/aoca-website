# Placeholder swap-list

Everything the client (AOCA) needs to confirm or supply before launch.
All editable content lives in **`lib/site.ts`** — one file, clearly commented.

## Must confirm with AOCA

| Item | Where | Currently |
|---|---|---|
| Phone number | `lib/site.ts` → `site.phone` | Dummy `+353 (0)57 000 0000` |
| Email | `lib/site.ts` → `site.email` | `info@aoca.ie` (unverified) |
| Office address | `lib/site.ts` → `site.address` | Dummy Portlaoise address |
| Founding year | `lib/site.ts` → `site.founded` | 2005 (guess) |
| Stats (years/projects/counties) | `lib/site.ts` → `stats` | Invented figures |
| Service list (6 disciplines) | `lib/site.ts` → `services` | Typical consultancy set — confirm which apply |
| Case studies (all 6) | `lib/site.ts` → `projects` | **Entirely sample content** — replace with real projects |
| Testimonials | `lib/site.ts` → `testimonials` | Sample quotes, anonymous attributions |
| Team members | `lib/site.ts` → `team` | Placeholder names/roles/bios |
| Company history copy | `app/about/page.tsx` story section | Drafted, needs fact-check |
| What "AOCA" stands for | — | Not yet used anywhere; add to About once confirmed |

## Must supply

- **Photography**: every `PlaceholderImage` component slot — hero/team/office,
  6 project card photos + 6 project hero photos, map/office photo on Contact.
  Swap `<PlaceholderImage …/>` for `next/image` `<Image …/>` when received.
- **Accreditations/memberships** (Engineers Ireland, PI insurance wording, etc.)
  — deliberately NOT claimed anywhere yet to avoid false claims.

## Technical before production launch

- Contact form backend (`components/ContactForm.tsx`) — currently simulates
  success. Wire to Formspree/Resend/API route.
- Re-enable indexing: remove `robots: { index: false }` in `app/layout.tsx`
  and open up `app/robots.ts` (both locked down for the draft).
- Update `site.url` in `lib/site.ts` to the real domain.
- Favicon/OG image: currently uses the colour logo; consider a proper OG card.
