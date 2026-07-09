# Content status & outstanding items

All editable content lives in **`lib/site.ts`** (and articles in
**`lib/insights.ts`**). Updated after the client feedback round of July 2026.

## Implemented from client feedback (P. O'Connell, July 2026)

- Bigger navbar logo; crisper favicon (red A mark)
- Nav phone button → "Get in touch" linking to the contact form
- New hero headline: "A leader in multidisciplinary engineering expertise"
- Brand "A" motif used through section headings
- AI-generated imagery replaced with AOCA's real photography
- New 10-area expertise structure with client-supplied copy
  (Building Envelope, Project & Construction Management, Fire Safety)
- Accreditations band (Engineers Ireland, ISO 9001/NSAI, IFE, PHAI, Green Cert)
- Client logo wall re-rendered at native size (no more blur)
- Culture strip expanded to 8 photos
- Manchester office added to footer (all 3 offices now listed)
- Project template: "The Project" + "Services Provided" with expertise links
- /history page — "reeling in the years" timeline
- Better sector tile photos (Commercial, Education)

## Waiting on the client (chase list)

| Item | Who | Notes |
|---|---|---|
| Hero video merge | Client | Combine their own footage with the draft's video — "take the best bits from both" |
| Featured projects list | Client | They'll confirm which projects to feature. HOW-TO: set `featured: true` on a project in `lib/site.ts` |
| Better project/section photos & videos | Client | "We have more photos and videos… will use better photos" incl. Projects page hero, drone footage for Arklow |
| Per-project "Services Provided" + summaries | Client | Defaults in `projectServices` (lib/site.ts) pending their list |
| Logo wall accuracy | **Ciara** | Verify all 30 client logos are current versions |
| Office phone numbers | Client | "Multiple numbers so not sure this is 100% correct" |
| New insights articles ×7 | Client | FM Design for High Value Buildings; Designing for the Data Centre Industry; What is Condensation Risk Analysis; An update on Pyrite in Ireland; A new adventure – Fire Safety Consultants; Structural Fire Engineering |
| Copy for draft expertise pages | Client | Building Surveying, Specialist Services (both "work in progress" per their deck), Building Science (drafted by us — needs sign-off) |
| History milestones | Client | /history timeline entries 2016–2025 inferred from published material — need sign-off |
| Fire Safety Consultants website URL | Client | Their copy says "visit the Fire Safety Consultants website" — link needed |
| Team headshots | Client | Company page uses initials |


| Official accreditation logo files | Client | Homepage & Company page show designed monogram badges; drop official logos into public/images/accreditations/ and swap in AccreditationBadges.tsx |

## Technical before production launch

- Contact form backend (`components/ContactForm.tsx`) — still simulates success.
- Re-enable indexing (`app/layout.tsx` robots + `app/robots.ts`).
- Update `site.url` in `lib/site.ts` to https://aoca.ie.
- Cookie/privacy policy pages.
- Compressed webm variant of hero videos.
