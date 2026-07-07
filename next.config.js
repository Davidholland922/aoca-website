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
    // Assets are pre-sized (max 1600px) at build time; serving them directly
    // keeps the Vercel free-tier image-optimization quota untouched.
    unoptimized: true,
  },

  /**
   * 301s from every URL on the old WordPress aoca.ie to its new home.
   * This is what carries the existing Google presence across at go-live —
   * harmless on the staging domain (those paths never existed here).
   */
  async redirects() {
    return [
      // ---- old service pages → new expertise structure
      { source: "/civil-engineering", destination: "/expertise/civil-engineering", permanent: true },
      { source: "/structural-engineering", destination: "/expertise/structural-engineering", permanent: true },
      { source: "/insurance-engineering", destination: "/expertise/insurance-forensic-engineering", permanent: true },
      { source: "/pyrite-remediation", destination: "/expertise/insurance-forensic-engineering", permanent: true },
      { source: "/consulting-engineers", destination: "/expertise/project-construction-management", permanent: true },

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
