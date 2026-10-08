/**
 * Content Security Policy. Lists the only places the site may load code,
 * frames and data from, so an injected script pointing anywhere else is
 * refused by the browser. Add a host here when a new service is added.
 *   - Google Analytics (after consent), hCaptcha (forms), Google Maps (office
 *     maps), Web3Forms (form delivery), Vercel Analytics.
 */
const dev = process.env.NODE_ENV !== "production";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://hcaptcha.com https://*.hcaptcha.com https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline' https://hcaptcha.com https://*.hcaptcha.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "media-src 'self' blob:",
  `connect-src 'self' https://api.web3forms.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://hcaptcha.com https://*.hcaptcha.com https://vitals.vercel-insights.com${dev ? " ws: http://localhost:*" : ""}`,
  "frame-src https://maps.google.com https://www.google.com https://hcaptcha.com https://*.hcaptcha.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import('next').NextConfig} */

// Article slugs that lived at the ROOT of the old WordPress site and now
// live under /insights/ — enumerated explicitly so we never wildcard "/".
const OLD_ROOT_ARTICLES = [
  "arklow-wastewater-treatment-plant-recognised-with-prestigious-awards",
  "a-new-chapter-at-aoca",
  "the-effects-of-climate-change-are-increasingly-visible-in-ireland",
  "apartment-duplex-defects-remediation-bill-2024",
  "healthy-homes-ireland-retrofit",
  "shortlisted-for-the-irish-building-and-design-awards-recognised-as-being-best-in-class",
  "government-announces-interim-fire-safety-funding-for-celtic-tiger-era-apartments",
  "legislative-hurdles-delay-remediation-apartment-defects-2024",
  "the-urgent-need-for-modular-housing-to-address-the-crisis-in-ireland",
  "celtic-tiger-apartment-defects-repair-plan",
  "embracing-a-sustainable-cladding-alternative",
  "a-breakthrough-in-solar-power-with-chromium",
  "zero-emission-concrete-on-the-horizon-as-industry-standard",
  "retrofitting-buildings-for-a-sustainable-future",
  "aoca-team-spreads-joy-through-community-service-at-lauralynn-hospice",
  "defective-block-works-crisis-tackled-by-aoca",
  "an-overview-of-the-enhanced-defective-concrete-blocks-grant-scheme",
  "when-to-worry-about-cracks-in-home",
  "why-structural-condition-survey-is-necessary",
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Vercel Pro: let the optimizer serve responsive AVIF/WebP variants
    formats: ["image/avif", "image/webp"],
  },

  /**
   * 301s from every URL on the old WordPress aoca.ie to its new home.
   * This is what carries the existing Google presence across at go-live —
   * harmless on the staging domain (those paths never existed here).
   */
  // security headers (HSTS is added by Vercel itself)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // ---- every remaining URL from the old WordPress sitemap (verified 4 Oct 2026)
      { source: "/5-simple-steps-to-detect-pyrite-in-your-home", destination: "/insights", permanent: true },
      { source: "/a-breakthrough-in-solar-power-with-chromium", destination: "/insights/a-breakthrough-in-solar-power-with-chromium", permanent: true },
      { source: "/a-new-chapter-at-aoca", destination: "/insights/a-new-chapter-at-aoca", permanent: true },
      { source: "/ai-assessing-damage-concrete-structures-aoca-perspectiv", destination: "/insights", permanent: true },
      { source: "/aidan-oconnells-engineering-journey-an-exclusive-podcast-feature", destination: "/insights", permanent: true },
      { source: "/an-overview-of-the-enhanced-defective-concrete-blocks-grant-scheme", destination: "/insights/an-overview-of-the-enhanced-defective-concrete-blocks-grant-scheme", permanent: true },
      { source: "/aoca-engineering-consultants-were-appointed-as-design-lead-and-project-manager-on-this-9m-fire-safety-and-cladding-remediation-project-in-the-u-k", destination: "/insights", permanent: true },
      { source: "/aoca-engineering-consultants", destination: "/company", permanent: true },
      { source: "/aoca-team-spreads-joy-through-community-service-at-lauralynn-hospice", destination: "/insights/aoca-team-spreads-joy-through-community-service-at-lauralynn-hospice", permanent: true },
      { source: "/aoca-uk-limited", destination: "/company", permanent: true },
      { source: "/apartment-duplex-defects-remediation-bill-2024", destination: "/insights/apartment-duplex-defects-remediation-bill-2024", permanent: true },
      { source: "/arklow-wastewater-treatment-plant-recognised-with-prestigious-awards", destination: "/insights/arklow-wastewater-treatment-plant-recognised-with-prestigious-awards", permanent: true },
      { source: "/building-surveyor", destination: "/expertise/building-surveying", permanent: true },
      { source: "/category/news", destination: "/insights", permanent: true },
      { source: "/category/news/latent-defects", destination: "/insights", permanent: true },
      { source: "/category/news/mica", destination: "/insights", permanent: true },
      { source: "/category/news/structural-engineering", destination: "/insights", permanent: true },
      { source: "/category/uncategorized", destination: "/insights", permanent: true },
      { source: "/celtic-tiger-apartment-defects-repair-plan", destination: "/insights/celtic-tiger-apartment-defects-repair-plan", permanent: true },
      { source: "/civil-structural-engineer", destination: "/careers", permanent: true },
      { source: "/civil-structural-engineering-technician", destination: "/careers", permanent: true },
      { source: "/civil_engineering", destination: "/expertise/civil-engineering", permanent: true },
      { source: "/company/career", destination: "/careers", permanent: true },
      { source: "/company/career/architectural-technologist", destination: "/careers", permanent: true },
      { source: "/company/career/chartered-building-surveyor", destination: "/careers", permanent: true },
      { source: "/company/career/civil-engineer", destination: "/careers", permanent: true },
      { source: "/company/career/structural-engineer", destination: "/careers", permanent: true },
      { source: "/company/career/structural-engineering", destination: "/careers", permanent: true },
      { source: "/company/career/structural-technician", destination: "/careers", permanent: true },
      { source: "/covid-19-update-2", destination: "/insights", permanent: true },
      { source: "/covid-19-update", destination: "/insights", permanent: true },
      { source: "/defective-block-works-crisis-tackled-by-aoca", destination: "/insights/defective-block-works-crisis-tackled-by-aoca", permanent: true },
      { source: "/early-engagement-with-uisce-eireann-aoca-support", destination: "/insights", permanent: true },
      { source: "/embracing-a-sustainable-cladding-alternative", destination: "/insights/embracing-a-sustainable-cladding-alternative", permanent: true },
      { source: "/government-announces-interim-fire-safety-funding-for-celtic-tiger-era-apartments", destination: "/insights/government-announces-interim-fire-safety-funding-for-celtic-tiger-era-apartments", permanent: true },
      { source: "/government-signs-off-on-e420000-grant-cap-for-mica-redress-scheme", destination: "/insights", permanent: true },
      { source: "/great-news-for-portlaoise", destination: "/insights", permanent: true },
      { source: "/healthy-homes-ireland-retrofit", destination: "/insights/healthy-homes-ireland-retrofit", permanent: true },
      { source: "/international-women-in-engineering-day-2023", destination: "/insights", permanent: true },
      { source: "/is465-aoca-experts-in-pyrite-mica", destination: "/insights", permanent: true },
      { source: "/kilcavan-gaa-club", destination: "/projects/kilcavan-gaa-club", permanent: true },
      { source: "/latent-defects-insurance-importance", destination: "/insights", permanent: true },
      { source: "/legislative-hurdles-delay-remediation-apartment-defects-2024", destination: "/insights/legislative-hurdles-delay-remediation-apartment-defects-2024", permanent: true },
      { source: "/mica-crisis-support-aoca", destination: "/insights", permanent: true },
      { source: "/modern-construction-methods-demand-updated-fire-safety-regulations", destination: "/insights", permanent: true },
      { source: "/new-forensic-fire-investigation-unit-aoca", destination: "/insights", permanent: true },
      { source: "/news", destination: "/insights", permanent: true },
      { source: "/newsletter", destination: "/insights", permanent: true },
      { source: "/nsai-concrete-blocks-committee-formed", destination: "/insights", permanent: true },
      { source: "/portfolio-item/1694", destination: "/projects", permanent: true },
      { source: "/portfolio-item/1721", destination: "/projects", permanent: true },
      { source: "/portfolio-item/b-braun-wellstone-midlands-renal-care-centre", destination: "/projects/b-braun-wellstone-midlands-renal-care-centre", permanent: true },
      { source: "/portfolio-item/balbriggan-primary-care-centre", destination: "/projects", permanent: true },
      { source: "/portfolio-item/celbridge-primary-care-centre", destination: "/projects", permanent: true },
      { source: "/portfolio-item/dodder-valley-park-sports-pavilion", destination: "/projects/sdcc-dodder-valley-pavilions", permanent: true },
      { source: "/portfolio-item/equine-facility", destination: "/projects/equine-facility", permanent: true },
      { source: "/portfolio-item/grange-national-school", destination: "/projects/grange-ns-carlow", permanent: true },
      { source: "/portfolio-item/homestore-and-more", destination: "/projects", permanent: true },
      { source: "/portfolio-item/house-on-the-hill-ballyragget-co-kilkenny", destination: "/projects", permanent: true },
      { source: "/portfolio-item/house-renovation-portlaoise", destination: "/projects", permanent: true },
      { source: "/portfolio-item/kilcavan-gaa-club", destination: "/projects/kilcavan-gaa-club", permanent: true },
      { source: "/portfolio-item/modern-holycross-house", destination: "/projects", permanent: true },
      { source: "/portfolio-item/private-dwellings-gortnahoe-house", destination: "/projects/gortnahoe-house", permanent: true },
      { source: "/portfolio-item/private-residence", destination: "/projects", permanent: true },
      { source: "/portfolio-item/rednut", destination: "/projects", permanent: true },
      { source: "/portfolio-item/southview-veterinary-hospital-clonmel", destination: "/projects", permanent: true },
      { source: "/portfolio_entries/architecture", destination: "/projects", permanent: true },
      { source: "/portfolio_entries/house", destination: "/projects", permanent: true },
      { source: "/portfolio_entries/interior", destination: "/projects", permanent: true },
      { source: "/portfolio_entries/large", destination: "/projects", permanent: true },
      { source: "/portfolio_entries/small", destination: "/projects", permanent: true },
      { source: "/professional-indemnity-insurance-in-ireland", destination: "/insights", permanent: true },
      { source: "/retrofitting-buildings-for-a-sustainable-future", destination: "/insights/retrofitting-buildings-for-a-sustainable-future", permanent: true },
      { source: "/seeking-structural-engineer-structural-technician-join-our-team", destination: "/careers", permanent: true },
      { source: "/service/consulting-engineers", destination: "/expertise/consulting-engineering", permanent: true },
      { source: "/service/pyrite-remediation", destination: "/expertise/insurance-forensic-engineering", permanent: true },
      { source: "/shortlisted-for-the-irish-building-and-design-awards-recognised-as-being-best-in-class", destination: "/insights/shortlisted-for-the-irish-building-and-design-awards-recognised-as-being-best-in-class", permanent: true },
      { source: "/shortlisted-laois-business-awards", destination: "/insights", permanent: true },
      { source: "/structural-engineer-for-new-home-build", destination: "/insights", permanent: true },
      { source: "/structural-survey-home-buying", destination: "/insights", permanent: true },
      { source: "/tag/available", destination: "/insights", permanent: true },
      { source: "/tag/recruitment", destination: "/insights", permanent: true },
      { source: "/the-effects-of-climate-change-are-increasingly-visible-in-ireland", destination: "/insights/the-effects-of-climate-change-are-increasingly-visible-in-ireland", permanent: true },
      { source: "/the-urgent-need-for-modular-housing-to-address-the-crisis-in-ireland", destination: "/insights/the-urgent-need-for-modular-housing-to-address-the-crisis-in-ireland", permanent: true },
      { source: "/we-are-hiring-engineering-positions-available", destination: "/careers", permanent: true },
      { source: "/wellstone-midlands-renal-care-centre-lismard-portlaoise-opens-its-doors", destination: "/insights", permanent: true },
      { source: "/when-to-worry-about-cracks-in-home", destination: "/insights/when-to-worry-about-cracks-in-home", permanent: true },
      { source: "/why-need-project-manager", destination: "/expertise/project-construction-management", permanent: true },
      { source: "/why-structural-condition-survey-is-necessary", destination: "/insights/why-structural-condition-survey-is-necessary", permanent: true },
      { source: "/world-environment-day-embracing-sustainable-practices", destination: "/insights", permanent: true },
      { source: "/zero-emission-concrete-on-the-horizon-as-industry-standard", destination: "/insights/zero-emission-concrete-on-the-horizon-as-industry-standard", permanent: true },

      // ---- the review address keeps working but sends people to the real site
      {
        source: "/:path*",
        has: [{ type: "host", value: "aoca-draft.vercel.app" }],
        destination: "https://www.aoca.ie/:path*",
        permanent: true,
      },
      // ---- Terms of Business lives at /terms (Philip's preference);
      // longer spellings land there too
      { source: "/terms-of-business", destination: "/terms", permanent: true },
      { source: "/termsofbusiness", destination: "/terms", permanent: true },
      // ---- old service pages → new expertise structure
      { source: "/civil-engineering", destination: "/expertise/civil-engineering", permanent: true },
      { source: "/structural-engineering", destination: "/expertise/structural-engineering", permanent: true },
      { source: "/insurance-engineering", destination: "/expertise/insurance-forensic-engineering", permanent: true },
      { source: "/pyrite-remediation", destination: "/expertise/insurance-forensic-engineering", permanent: true },
      { source: "/consulting-engineers", destination: "/expertise/consulting-engineering", permanent: true },

      // ---- expertise slugs retired in the August 2026 restructure
      { source: "/expertise/psdp-assigned-certifier", destination: "/expertise/assigned-certifier", permanent: true },
      { source: "/expertise/specialist-services", destination: "/expertise/consulting-engineering", permanent: true },
      { source: "/expertise/building-science", destination: "/expertise/building-envelope-engineering", permanent: true },

      // ---- project slugs retired in the August 2026 content round
      { source: "/projects/abbott-kilkenny", destination: "/projects/pharmaceutical-building-ireland", permanent: true },
      { source: "/projects/st-brigids-national-school", destination: "/projects", permanent: true },

      // ---- company pages
      { source: "/our-culture", destination: "/culture", permanent: true },

      // ---- projects (same slugs, new prefix) & category listings
      { source: "/project/:slug", destination: "/projects/:slug", permanent: true },
      { source: "/project_category/:slug", destination: "/projects?sector=:slug", permanent: true },

      // ---- articles that lived at the root of the old site
      ...OLD_ROOT_ARTICLES.map((slug) => ({
        source: `/${slug}`,
        destination: `/insights/${slug}`,
        permanent: true,
      })),

      // ---- WordPress plumbing that search engines may have indexed
      { source: "/feed", destination: "/insights", permanent: true },
      { source: "/category/:slug*", destination: "/insights", permanent: true },
    ];
  },
};

module.exports = nextConfig;
