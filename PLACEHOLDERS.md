# Content status & outstanding items

All editable content lives in **`lib/site.ts`** (and articles in
**`lib/insights.ts`**). Updated after the client feedback round of July 2026
and the "AOCA Expertise — NEW" deck of August 2026.

## Implemented from "AOCA Expertise — NEW" deck (August 2026)

- Expertise restructured to the deck's nine areas, in deck order:
  Insurance & Forensic / Civil / Structural / Fire Safety & Disability Access /
  Project & Construction Management / **Consulting Engineering (new)** /
  Building Envelope (unchanged per deck) / Building Surveying /
  **Assigned Certifier & Regulatory Compliance** (was PSDP / Assigned Certifier)
- Specialist Services and Building Science pages retired — content absorbed
  into Consulting Engineering / Assigned Certifier / Building Envelope.
  301 redirects added in `next.config.js`; project "Services Provided"
  mappings updated.
- Building Surveying now uses client copy (deck still marks it
  "work in progress" — expect revisions).
- Deck slide 1 re-confirms the seven insights articles still to come
  (adds "Structural Fire Engineering" to the list below).

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

## Implemented from SharePoint "00 WEBSITE PROJECTS" drop (August 2026)

- **All project pages rebuilt** from "All Project Information for website.docx":
  client overviews, Services Provided text, locations. 14 new projects added
  (Scoil Molaise, Stradbally Fire Station, Rosslare Europort, Domestic
  Violence Refuge, Data Centre Projects, Abbeyleix, Bohernamona Road,
  Rath Nua, Vista Montana, One-Off Bespoke Dwellings, Bristol-Myers Squibb,
  Harold's Cross Hospice, Pharmaceutical Building Ireland + Grange Manor
  retitle). ~190 new photos processed to `public/images/2026-08-*`.
- "Abbott Kilkenny" replaced by the client's anonymised "Pharmaceutical
  Building, Ireland" (same photos + theirs). St. Brigid's NS removed —
  its gallery duplicated St. Patrick's and it's absent from the client's
  definitive project list.
- **Real testimonials** (Testimonies.docx): all 7 wired, incl. Alan Synnott
  and Donal Fitzgerald; Stephen Nolan's role corrected.
- **Management bios** (Management BIO's.docx) on the Company page.
- Sector tiles replaced with the client's "Images for Sectors" set.
- Insurance expertise gallery: client's subsidence/fire/flood/storm photos.
  Civil gallery: geotechnical + water supply. Structural gallery: Revit/BIM.
- History: 1996 entry now uses the archival 1999 photo; "Today" uses the
  2025 management team photo. New culture photos added to the strip.
- Contact page image → client's staged "Contact Us" photo.
- **Project films on 9 pages** ("Watch the project"): Retail Park, Scoil
  Molaise, St. Patrick's, Industrial Warehousing, Cross of Newtown, Derry
  Road, Hole in the Wall (edited film w/ sound), B. Braun, Grange Manor.
  Drone raws trimmed to 60s, 1080p ≤2.5Mbps. NOTE: the zip's "FINAL INTRO
  WEBSITE VIDEO" and "Mountmellick Case Study FINAL" are the files already
  live as the homepage hero and Grange Manor film — hero-merge chase item
  closed. Remaining Videography clips are b-roll (not wired). Second Derry
  Road drone file (DJI_..._0076) unused — swap in if preferred.

## Implemented from Ciara's "Update Notes 01-09-26" (Sept 2026)

- Client logo wall: old Crown wordmark replaced with new Crown logo;
  DNCF added back (new artwork). Testimonial logos under names
  (O'Gorman → Crown, Mulvaney → PCLA).
- Hole in the Wall: finished-building photo (homepage featured + hero).
- Expertise detail pages: topic photos now sit beside each section's text
  (insurance / civil / structural / envelope / surveying) — bottom
  galleries removed as requested.
- Insights: the three old "shaped" WordPress images replaced with full
  photos (apartments / pyrite infill / geotechnical rig).
- History: 2006 entry → AOCA building photo; remediation years → real
  pyrite-infill photo; **new 2017 "Rebranded" milestone added with
  Ciara's copy — YEAR NEEDS PHILIP'S CONFIRMATION.**
- Projects: green-field photo removed (warehousing); Abbeyleix gallery
  reordered per notes; "Grange Manor Mountmellick" rename; every gallery
  (2+ photos) now uses the enlargeable slider (Harold's Cross fixed);
  cards show county/city only under titles.
- Contact form: /api/contact ready for Web3Forms (no DNS) or Resend → info@aoca.ie +
  info@aoca.co.uk. **Ciara: get a free Web3Forms access key with info@aoca.ie; David: set WEB3FORMS_ACCESS_KEY in Vercel (Resend alternative needs
  a DNS TXT record, so avoid)** —
  until then the form reports a simulated send.
- Projects nav dropdown: verified working (?sector= filter applies);
  left in place.
- Footer: logo/strapline block removed (repeated the header) — offices
  row + hours + socials only, per Ciara mock. Hero ghost A watermark
  removed from the homepage video (17 Sept, David).

## Implemented from Ciara's "Update Notes 16-09-26" (22 Sept 2026)

- All A marks + nav/footer logo + favicon + og image rebuilt from the
  official artwork in the shared "AOCA Logo" folder — no more pixelation
  or white outline. Hero-video watermark stays removed.
- PCLA testimonial logo enlarged (squarish logos render taller now).
- Consulting Engineers page: photos beside Remediation & Reinstatement
  and Surveys & Mapping sections.
- History per Ciara's red wording: 2024 → Old Bank of Ireland Tuam
  restoration; 2025 split into "Recognised with prestigious industry
  awards" (Arklow) + "A new chapter" (Philip steps in as MD, portrait
  photo); Today text confirmed; newspaper clipping moved 2006 → 2017.
- Projects nav dropdown bug FIXED (second sector pick now re-filters —
  the grid follows ?sector= URL changes).
- Hidden /terms-of-business page scaffolded: unlisted (no nav/footer/
  sitemap links), noindex. **Waiting on the Terms of Business document
  from the client — nothing was ever shared (searched the whole
  SharePoint drop + all notes docs, 22 Sept).**

## Implemented from Ciara's "Update Notes 23-09-26" + email (23 Sept 2026)

- Life Sciences anonymisation per client contract: both pharma projects
  now "Pharmaceutical Building, Ireland" — operator names removed from
  titles, text, URLs (new slug pharmaceutical-facility-extension) AND
  images (branded photos deleted; watermarked aerials cropped clean;
  files with the operator's name in the filename removed/renamed).
- Homepage: logo strip under the testimonials removed.
- History 2025 "A new chapter" → photo of Aidan & Philip together
  (from Ciara's notes doc).
- Structural Engineering expertise: both sideways photos rotated upright.
- St. Patrick's NS: toilet photo removed (not in the client's folder).
- Project galleries now show each photo IN FULL (no corner cropping) —
  slider and grid letterbox instead of crop.
- Admin editable-everything batch (26 Sept): Homepage headline (hero),
  Sector cards, Our values, Accreditations (text; badge logos via David),
  Testimonials (logos ride along), Our mission — all under Edit details.
  Remaining non-editable by design: imagery/video, client logo wall,
  page micro-headings, terms page (legal via Philip).
- Admin "Edit details" now has a History timeline tab too (25 Sept):
  years, titles and text of every /history milestone are client-editable
  (photos stay attached; new milestones render a branded placeholder
  until a photo is supplied). History-years sign-off is now self-service.
- Admin "Edit details" now has a Page banners tab (25 Sept): the client
  edits the homepage + Projects-page CTA banner wording themselves —
  Philip's pending banner-wording decision is now self-service.
- update-section team save now preserves bios and headshots (was
  silently stripping them).
- Ciara has the admin login (aoca-draft.vercel.app/admin) for
  self-service image management. Editor upgraded 23 Sept after her
  feedback: editing a project now SHOWS its current photos with per-photo
  remove; new uploads append instead of replacing the set.
- Second pharma project renamed "Pharmaceutical Building Extension,
  Ireland" (Ciara approved).
- Testimonial logos: Ciara emailed the testimonials + logos 23 Sept —
  files still to be saved from the email and wired in.

## Waiting on the client (chase list)

| Item | Who | Notes |
|---|---|---|
| ~~Featured projects list~~ | Done | Aug 2026 notes: Stradbally Fire Station, Data Centre Projects, Hole in the Wall (set in content/overrides.json) |
| Rosslare Europort copy | Client | docx says "Text Required" — page live with images + one-line summary only |
| Data Centre Projects copy | Client | docx says "Require Text" — interim summary drafted by us, needs sign-off |
| Pharma extension copy | Client | (Project formerly named after its operator — anonymised 23 Sept per contract; no names in title, text, images or URLs.) Photos live, still no body text |
| Portlaoise Retail Park size | Client | Their new copy says "20,000 sq ft" but the old site said 130,000 sq ft — confirm which; size omitted from our copy meanwhile |
| Glass Bottle / Hole in the Wall status | Client | docx says "Ongoing / Completed (confirm as applicable)" |
| Logo wall accuracy | **Ciara** | Verify all 30 client logos are current versions |
| ~~Testimonial company names~~ | Done | From Ciara's Testimonies doc, 23 Sept |
| DNCF replacement logo | Client | DNCF logo removed from the logo wall per Aug 2026 notes — client to send the replacement logo mentioned |
| ~~Terms of Business content~~ | Done | Philip sent the final document 25 Sept — live verbatim on the hidden /terms page (moved from /terms-of-business 26 Sept per Philip; old spellings redirect) (generated into lib/terms.ts) |
| ~~Testimonial logos~~ | Done | All supplied 23 Sept: Crown, Davies, DNCF (white variant made for dark bg), OMC Claims, PCLA, RDF; Alan Synnott's (Stephen MacKenzie & Co Solicitors) added 24 Sept, white-text variant made |
| Office phone numbers | Client | "Multiple numbers so not sure this is 100% correct" |
| New insights articles ×6 | Client | FM Design for High Value Buildings; Designing for the Data Centre Industry; What is Condensation Risk Analysis; An update on Pyrite in Ireland; Structural Fire Engineering (list from slide 1 of the Aug 2026 deck). "A New Adventure – Fire Safety Consultants" written by us Aug 2026 (dated Jan 2026 per David) — needs client sign-off |
| Building Surveying sign-off | Client | Copy now live from their deck but deck marks it "work in progress" |
| History milestones | Client | /history timeline entries 2016–2025 inferred from published material — need sign-off |
| ~~Fire Safety Consultants website URL~~ | Done | Linked to firesafetyconsultants.ie; dedicated /fire-safety-consultants page + homepage banner added Aug 2026 |
| ~~Team headshots~~ | Done | Studio portraits now on the company-page team cards (Philip, Brian, Emmett, Colin) |
| History photos 2.jpg & 6.jpg | Client | Copies in the SharePoint drop are the same low-res files (206px/225px) — still need higher-res originals |

## Technical before production launch

- Contact form: SELF-SERVICE since 26 Sept — admin "Edit details → Contact
  form" tab; client creates a Web3Forms account with info@aoca.ie (and
  optionally info@aoca.co.uk), pastes the access key(s) there, form goes
  live. Until then the form simulates. Env vars still override if set.
- Re-enable indexing (`app/layout.tsx` robots + `app/robots.ts`).
- Update `site.url` in `lib/site.ts` to https://aoca.ie.
- Cookie/privacy policy pages.
- Compressed webm variant of hero videos.
