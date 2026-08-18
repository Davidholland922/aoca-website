# AOCA design system

Identity approved by the client (P. O'Connell, July 2026 feedback round).
Amplify this language; don't import new ones.

## Tokens
- **Navy ramp** `navy-50…950` (#1C3945 base, #0C1B22 deepest) — structure,
  dark sections, body ink (`navy-900` on white, `navy-700` for body).
- **Brand red** `#C8202F` (`brand`), dark `#A31A26`, light `#E04552` —
  accents, rules, CTAs. Never for body text.
- White body background; dark navy sections for contrast bands.
- Fonts: `font-heading` / `font-body` (next/font CSS vars). Headings bold,
  `text-wrap: balance` globally.

## Motifs (the brand language)
- **Blueprint grid** — `.blueprint` (dark) / `.blueprint-light` 48px grid
  texture; engineering-drawing world.
- **Apex clip** — `.btn` corners clipped at the AOCA "A" apex angle
  (`clip-path` 12px notch, top-right). Reusable on images/frames.
- **Red rule** — `.rule` 3px×56px red bar under headings (echoes the logo
  underline).
- **A-mark stamp** — small framed A-mark badge on media (see SectionVideo).
- **Offset red frame** — 2px red border offset behind media.
- Square corners everywhere (no border-radius); sharp, drawn, technical.

## Components
- `PageHero` (dark navy hero with image), `SectionHeading` (eyebrow +
  title + lead + rule), `CtaBand`, `Reveal` (framer-motion fade-rise,
  ~0.5s ease-out), `SectionVideo` (in-view video with offset frame).
- Buttons: `.btn-primary` red, `.btn-outline-light/dark`.
- Layout: `.container-site` max-w 76rem; `.section` py-16/24.

## Rules
- Contrast: body ≥4.5:1 (navy-700+ on white; navy-100/200 on navy-950).
- Motion: Reveal entrances OK; reduced-motion collapses all animation
  (global rule in globals.css). Content must be visible without JS/motion.
- Imagery: real AOCA photography preferred over stock/AI (client request).
