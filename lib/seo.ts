import { site, offices, services, sectors, projects, projectServices, type Project, type Service } from "@/lib/site";
import type { Article } from "@/lib/insights";

/**
 * Structured data and location helpers shared by the page routes.
 * Everything here is derived from the same content the pages render, so
 * what Google reads always matches what the visitor sees.
 */

export const ORG_ID = `${site.url}/#organization`;

export type OfficeSlug = "portlaoise" | "dublin" | "manchester";

/** The three offices as fixed, linkable places. Order matches the offices list. */
export const officePlaces: {
  slug: OfficeSlug;
  city: string;
  region: string;
  country: "IE" | "GB";
  countryName: string;
  postalCode?: string;
  image: string;
  /** project.location substrings that count as "near this office" */
  nearby: string[];
  /** Google Business Profile listing, when one exists */
  mapsUrl?: string;
}[] = [
  {
    slug: "portlaoise",
    city: "Portlaoise",
    region: "Co. Laois",
    country: "IE",
    countryName: "Ireland",
    image: "/images/office-building.jpg",
    nearby: ["Laois", "Carlow", "Kildare", "Tipperary", "Wexford", "Wicklow"],
    mapsUrl: "https://www.google.com/maps?cid=13273417419359897270",
  },
  {
    slug: "dublin",
    city: "Dublin",
    region: "Dublin 12",
    country: "IE",
    countryName: "Ireland",
    image: "/images/dublin-office.jpg",
    nearby: ["Dublin"],
    mapsUrl: "https://www.google.com/maps?cid=19978543044409404",
  },
  {
    slug: "manchester",
    city: "Manchester",
    region: "Greater Manchester",
    country: "GB",
    countryName: "United Kingdom",
    postalCode: "M1 3HU",
    image: "/images/2026-08-team-shot-3.jpg",
    nearby: ["UK", "United Kingdom", "Wales", "England", "Manchester"],
  },
];

/**
 * Google Maps embed for an office. Where the office has a Google Business
 * listing the map opens on that exact listing; otherwise it pins the surveyed
 * coordinates. A typed address is never used, because Google's geocoder
 * placed "Lismard House, Timahoe Road" and "Centrepoint Business Park" in the
 * wrong spot.
 */
const officePins: Record<string, { cid?: string; lat: number; lng: number; label: string }> = {
  portlaoise: { cid: "13273417419359897270", lat: 53.0271408, lng: -7.2898112, label: "AOCA Engineering Consultants" },
  dublin: { cid: "19978543044409404", lat: 53.3226173, lng: -6.3690849, label: "AOCA Engineering Consultants, Dublin Office" },
  manchester: { lat: 53.4798316, lng: -2.2361118, label: "AOCA, 11 Portland Street" },
};
export function officeMapEmbed(slug: string) {
  const pin = officePins[slug];
  if (!pin) return null;
  return pin.cid
    ? `https://maps.google.com/maps?cid=${pin.cid}&z=15&output=embed`
    : `https://maps.google.com/maps?q=${pin.lat},${pin.lng}(${encodeURIComponent(pin.label)})&z=16&output=embed`;
}

export function getOffice(slug: string) {
  const i = officePlaces.findIndex((o) => o.slug === slug);
  if (i < 0 || !offices[i]) return null;
  return { ...officePlaces[i], ...offices[i], index: i };
}

export function projectsNear(slug: OfficeSlug): Project[] {
  const place = officePlaces.find((o) => o.slug === slug);
  if (!place) return [];
  return projects.filter((p) =>
    place.nearby.some((k) => (p.location ?? "").includes(k))
  );
}

export function servicesForProject(p: Project): string[] {
  return p.servicesProvided?.length
    ? p.servicesProvided
    : projectServices[p.slug] ?? [];
}

export function projectsForService(slug: string): Project[] {
  return projects.filter((p) => servicesForProject(p).includes(slug));
}

function postalAddress(i: number) {
  const o = offices[i];
  const place = officePlaces[i];
  if (!o || !place) return undefined;
  const lines = o.address.filter((l) => !l.startsWith("("));
  return {
    "@type": "PostalAddress",
    streetAddress: lines.slice(0, -1).join(", "),
    addressLocality: place.city,
    addressRegion: place.region,
    ...(place.postalCode ? { postalCode: place.postalCode } : {}),
    addressCountry: place.country,
  };
}

const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:30",
  closes: "17:00",
};

export function localBusinessJsonLd(i: number) {
  const o = offices[i];
  const place = officePlaces[i];
  if (!o || !place) return null;
  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${site.url}/offices/${place.slug}#office`,
    name: `${site.name}, ${place.city}`,
    parentOrganization: { "@id": ORG_ID },
    url: `${site.url}/offices/${place.slug}`,
    telephone: o.phone.replace(/\s|\(0\)/g, ""),
    email: o.email,
    address: postalAddress(i),
    openingHoursSpecification: openingHours,
    image: `${site.url}${place.image}`,
    areaServed: place.countryName,
    ...(place.mapsUrl ? { hasMap: place.mapsUrl } : {}),
  };
}

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": ORG_ID,
        name: site.name,
        alternateName: ["AOCA", site.legalName],
        legalName: site.legalName,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/aoca-logo-colour.png`,
        },
        image: `${site.url}/og.png`,
        telephone: site.phoneHref.replace("tel:", ""),
        email: site.email,
        foundingDate: site.founded,
        address: postalAddress(0),
        location: offices.map((_, i) => ({ "@id": `${site.url}/offices/${officePlaces[i]?.slug}#office` })),
        areaServed: ["Ireland", "United Kingdom", "Europe"],
        knowsAbout: services.map((s) => s.title),
        sameAs: [
          "https://www.linkedin.com/company/aidan-o'connell-&-associates",
          "https://www.facebook.com/aoca.ie",
          "https://instagram.com/aocaengineering",
          "https://www.youtube.com/@AOCAEngineering",
          "https://twitter.com/aocaie",
          "https://www.google.com/maps?cid=13273417419359897270",
        ],
        description:
          "Civil & structural engineering, insurance and forensic engineering, fire safety and building surveying consultants since 1996. Offices in Portlaoise, Dublin and Manchester.",
      },
      ...offices.map((_, i) => localBusinessJsonLd(i)).filter(Boolean),
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { "@id": ORG_ID },
        inLanguage: "en-IE",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function serviceJsonLd(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/expertise/${s.slug}#service`,
    name: s.title,
    serviceType: s.title,
    description: s.short,
    url: `${site.url}/expertise/${s.slug}`,
    image: `${site.url}${s.image}`,
    provider: { "@id": ORG_ID },
    areaServed: ["Ireland", "United Kingdom"],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site.url}/contact`,
      servicePhone: site.phoneHref.replace("tel:", ""),
    },
  };
}

export function projectJsonLd(p: Project) {
  const sector = sectors.find((s) => s.slug === p.sector);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/projects/${p.slug}#project`,
    name: p.title,
    headline: p.title,
    description: p.summary,
    url: `${site.url}/projects/${p.slug}`,
    image: `${site.url}${p.hero ?? p.thumb}`,
    creator: { "@id": ORG_ID },
    ...(p.location ? { locationCreated: { "@type": "Place", name: p.location } } : {}),
    ...(sector ? { about: sector.title } : {}),
    keywords: servicesForProject(p)
      .map((slug) => services.find((s) => s.slug === slug)?.title)
      .filter(Boolean)
      .join(", "),
  };
}

export function articleJsonLd(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}/insights/${a.slug}#article`,
    headline: a.title,
    description: a.excerpt,
    image: `${site.url}${a.image}`,
    datePublished: a.date,
    dateModified: a.date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
    inLanguage: "en-IE",
  };
}

/** JobPosting for an open position, so it can appear in Google's job listings. */
export function jobPostingJsonLd(job: { title: string; location: string; type: string; summary: string; posted?: string }) {
  const where = officePlaces
    .map((place, i) => ({ place, i }))
    .filter(({ place }) => job.location.toLowerCase().includes(place.city.toLowerCase()));
  const type = /part/i.test(job.type) ? "PART_TIME" : /contract/i.test(job.type) ? "CONTRACTOR" : /intern|placement|graduate/i.test(job.type) ? "INTERN" : "FULL_TIME";
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary
      .split(/\n\s*\n/)
      .map((para) => `<p>${para.trim().replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`)
      .join(""),
    datePosted: job.posted ?? new Date().toISOString().slice(0, 10),
    employmentType: type,
    directApply: true,
    url: `${site.url}/careers#apply`,
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: `${site.url}/aoca-logo-colour.png` },
    jobLocation: (where.length ? where : [{ place: officePlaces[0], i: 0 }]).map(({ i }) => ({
      "@type": "Place",
      address: postalAddress(i),
    })),
  };
}
