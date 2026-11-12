import { site, offices, services, sectors, projects, projectServices, team, accreditations, type Project, type Service } from "@/lib/site";
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
  // The address is edited by the client in /admin. If it no longer names
  // this office's city, the fixed locality and postcode above are stale, so
  // describe only what the page actually shows rather than publish an
  // address that does not exist.
  const shown = lines.join(", ");
  if (!shown.toLowerCase().includes(place.city.toLowerCase())) {
    const parts = shown.split(",").map((x) => x.trim()).filter(Boolean);
    const country = parts.filter((x) => /^(united kingdom|uk|ireland|england|wales|scotland)$/i.test(x));
    const rest = parts.filter((x) => !country.includes(x));
    const ukPostcode = rest.find((x) => /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(x));
    const body = rest.filter((x) => x !== ukPostcode);
    return {
      "@type": "PostalAddress",
      streetAddress: body.slice(0, -2).join(", ") || body.join(", "),
      ...(body.length > 2 ? { addressLocality: body[body.length - 2], addressRegion: body[body.length - 1] } : {}),
      ...(ukPostcode ? { postalCode: ukPostcode.toUpperCase() } : {}),
      addressCountry: place.country,
    };
  }
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
        founder: { "@type": "Person", name: "Aidan O'Connell" },
        employee: team.map((m) => ({ "@id": personId(m.name) })),
        hasCredential: accreditations.map((name) => ({
          "@type": "EducationalOccupationalCredential",
          name,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: site.phoneHref.replace("tel:", ""),
          email: site.email,
          areaServed: ["IE", "GB"],
          availableLanguage: "English",
        },
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
    articleSection: "Insights",
    wordCount: a.body.join(" ").split(/\s+/).length,
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/** JobPosting for an open position, so it can appear in Google's job listings. */
export function jobPostingJsonLd(job: { title: string; location: string; type: string; summary: string; posted?: string; slug?: string; responsibilities?: string[]; requirements?: string[] }) {
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const list = (h: string, items?: string[]) => (items?.length ? `<p><strong>${h}</strong></p><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "");
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
      .map((para) => `<p>${esc(para.trim())}</p>`)
      .join("") + list("Key responsibilities", job.responsibilities) + list("Requirements", job.requirements),
    datePosted: job.posted ?? new Date().toISOString().slice(0, 10),
    employmentType: type,
    directApply: true,
    url: job.slug ? `${site.url}/careers/${job.slug}` : `${site.url}/careers#apply`,
    hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: `${site.url}/aoca-logo-colour.png` },
    jobLocation: (where.length ? where : [{ place: officePlaces[0], i: 0 }]).map(({ i }) => ({
      "@type": "Place",
      address: postalAddress(i),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Titles and descriptions sized for search results                    */
/* ------------------------------------------------------------------ */

const SUFFIX = ` | ${site.shortName}`;

/** Cut at a word boundary, with an ellipsis, never mid-word. */
export function clip(text: string, max: number) {
  const t = text.replace(/\s+/g, " ").replace(/…$/, "").trim();
  if (t.length <= max) return t;
  return t.slice(0, t.lastIndexOf(" ", max - 1)).replace(/[\s,;:–—-]+$/, "") + "…";
}

/**
 * Page title that fits a search result (about 65 characters). Short titles
 * get the brand suffix from the layout template; long ones drop it rather
 * than be cut off mid-phrase by Google.
 */
export function fitTitle(title: string): string | { absolute: string } {
  if ((title + SUFFIX).length <= 65) return title;
  return { absolute: clip(title, 65) };
}

/**
 * Project title for search: the name plus where it is, without repeating a
 * town the name already contains ("…, Portlaoise, Portlaoise, Co. Laois").
 */
export function projectTitle(p: Project) {
  if (!p.location) return fitTitle(p.title);
  const loc = /various locations/i.test(p.location) ? "Ireland" : p.location;
  const parts = loc.split(",").map((x) => x.trim()).filter((x) => x && !p.title.toLowerCase().includes(x.toLowerCase()));
  for (const tail of [parts.join(", "), parts.slice(-1).join("")]) {
    const t = tail ? `${p.title}, ${tail}` : p.title;
    if ((t + SUFFIX).length <= 65) return t;
  }
  return fitTitle(p.title);
}

/** Project description: the summary, filled out when it is very short. */
export function projectDescription(p: Project) {
  if (p.summary.length >= 110) return clip(p.summary, 158);
  const sector = sectors.find((s) => s.slug === p.sector)?.title;
  const where = p.location && !/various/i.test(p.location) ? ` in ${p.location}` : "";
  return clip(`${p.summary.replace(/\.$/, "")}. ${sector ? `${sector} project` : "Project"}${where} by ${site.name}.`, 158);
}

/* ------------------------------------------------------------------ */
/* Structured data for answers, people and video                       */
/* ------------------------------------------------------------------ */

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function personId(name: string) {
  return `${site.url}/company#${name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`;
}

/** The management team as people, tied to the organisation. */
export function leadershipJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${site.url}/company#about`,
        url: `${site.url}/company`,
        name: `About ${site.name}`,
        about: { "@id": ORG_ID },
        isPartOf: { "@id": `${site.url}/#website` },
      },
      ...team.map((m) => ({
        "@type": "Person",
        "@id": personId(m.name),
        name: m.name,
        jobTitle: m.role,
        ...(m.cred ? { honorificSuffix: m.cred } : {}),
        ...(m.bio ? { description: m.bio } : {}),
        ...(m.photo ? { image: `${site.url}${m.photo}` } : {}),
        worksFor: { "@id": ORG_ID },
        url: `${site.url}/company`,
      })),
    ],
  };
}

/** A project film, so it can appear in video results. */
export function videoJsonLd(p: Project) {
  if (!p.video) return null;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${site.url}/projects/${p.slug}#video`,
    name: `${p.title}: project film`,
    description: p.summary,
    thumbnailUrl: `${site.url}${p.videoPoster ?? p.hero ?? p.thumb}`,
    contentUrl: `${site.url}${p.video}`,
    uploadDate: "2026-10-04T00:00:00+01:00",
    publisher: { "@id": ORG_ID },
    ...(p.location ? { contentLocation: { "@type": "Place", name: p.location } } : {}),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#contact`,
    url: `${site.url}/contact`,
    name: `Contact ${site.name}`,
    about: { "@id": ORG_ID },
    isPartOf: { "@id": `${site.url}/#website` },
  };
}

/** A list page (insights, projects) as an ordered list of its entries. */
export function itemListJsonLd(name: string, path: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}${path}#list`,
    url: `${site.url}${path}`,
    name,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `${site.url}${it.path}`,
      })),
    },
  };
}
