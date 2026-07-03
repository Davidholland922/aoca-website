/**
 * ALL editable site content lives in this file.
 * Content sourced from the existing aoca.ie draft (crawled 2026-07-03).
 * Remaining placeholders are listed in PLACEHOLDERS.md.
 */

export const site = {
  name: "AOCA Engineering Consultants",
  legalName: "Aidan O'Connell & Associates Ltd.",
  shortName: "AOCA",
  tagline: "We turn vision into reality.",
  url: "https://aoca-draft.vercel.app",
  phone: "+353 (0)57 866 3244",
  phoneHref: "tel:+353578663244",
  email: "info@aoca.ie",
  founded: "1996",
  hours: "Monday to Friday, 8:30am – 5:00pm",
};

export const offices = [
  {
    name: "Head Office — Portlaoise",
    address: ["Lismard House", "Timahoe Road", "Portlaoise, Co. Laois"],
    phone: "+353 (0)57 866 3244",
    phoneHref: "tel:+353578663244",
    email: "info@aoca.ie",
  },
  {
    name: "Dublin Office",
    address: [
      "Unit E6, Centrepoint Business Park",
      "Oak Drive, Clondalkin",
      "Dublin 12",
    ],
    phone: "+353 (0)1 424 3035",
    phoneHref: "tel:+35314243035",
    email: "info@aoca.ie",
  },
  {
    name: "UK Office — Manchester",
    address: ["11 Portland Street", "(Aytoun St side)", "Manchester M1 3HU"],
    phone: "+44 3300 053 9213",
    phoneHref: "tel:+4433000539213",
    email: "info@aoca.co.uk",
  },
];

export const stats = [
  { value: "1996", label: "In practice since" },
  { value: "7,000+", label: "Projects delivered" },
  { value: "3", label: "Offices — IRL & UK" },
  { value: "100+", label: "Claims investigated yearly" },
];

export const mission =
  "To solve real engineering challenges with practical thinking, honest effort and genuine pride in the work that carries our name.";

export const values = [
  {
    title: "Straight Talking",
    body: "We tell you what you need to hear, not what you want to hear. Our reputation has been built on honest advice over nearly 30 years.",
  },
  {
    title: "Curiosity",
    body: "Thirty years in business could make you set in your ways. We've chosen a different path. We stay curious — about new technologies, better methods and smarter solutions. It's what keeps our thinking fresh and our clients ahead of the curve.",
  },
  {
    title: "Practical Thinking",
    body: "We find solutions that actually work in the real world, on real budgets, with real timelines.",
  },
  {
    title: "Loyalty",
    body: "We look after our clients and they look after us. Many of the people we work with today were with us at the very beginning.",
  },
  {
    title: "People First",
    body: "Irish owned and independently run since 1996. No corporate hierarchy, no distant boardrooms — just a team that genuinely cares about the outcome and each other.",
  },
];

export const timeline = [
  {
    year: "1996",
    text: "Aidan O'Connell & Associates founded in Portlaoise.",
  },
  { year: "2006", text: "Moved to our current head office at Lismard House, Portlaoise." },
  { year: "2014", text: "Dublin office opened to better serve the Eastern region." },
  {
    year: "2024",
    text: "Three offices — Portlaoise, Dublin and Manchester — serving Ireland, the UK and Europe.",
  },
];

export const team = [
  { name: "Philip O'Connell", role: "Managing Director", cred: "MIEI" },
  { name: "Brian Byrne", role: "Director", cred: "FIEI" },
  { name: "Emmett O'Reilly", role: "Associate Director", cred: "FIEI" },
  { name: "Colin Scott", role: "Associate Director", cred: "FIEI" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  gallery: string[];
  intro: string;
  sections: { heading: string; body: string }[];
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "civil-engineering",
    title: "Civil Engineering",
    short:
      "Roads, drainage, water supply and geotechnics — the infrastructure that makes development possible.",
    image: "/images/2026-05-group-36.jpg",
    gallery: [
      "/images/2026-05-group-37.jpg",
      "/images/2026-05-group-47.jpg",
      "/images/2026-05-group-39.jpg",
      "/images/2026-05-geo.jpg",
    ],
    intro:
      "Our role is central to ensuring the safe, timely and well-resourced completion of projects across road construction, waste management, coastal development and geotechnical engineering. Our philosophy at all times is to meet the design brief by producing the most cost-effective and appropriate construction solution.",
    sections: [
      {
        heading: "Roads & Infrastructure",
        body: "Our portfolio includes a critical section of the Portlaoise Southern Orbital Route, tying into the Timahoe Road (R426) and a previously completed section of the Orbital Route, and providing access to Lismard Retail Park via a roundabout — all completed to the full satisfaction of Laois County Council. On residential developments we design internal roads and junctions with National and Regional roads to Local Authority and TII requirements.",
      },
      {
        heading: "Surface Water & Sustainable Drainage",
        body: "The proper collection and discharge of surface water run-off from the built environment is an essential element in delivering sustainable development. We design SuDS-led drainage strategies that satisfy planning authorities and perform over the life of the development.",
      },
      {
        heading: "Water Supply & Pumping Stations",
        body: "From a 500mm diameter water main on the Portlaoise Southern Orbital Route to foul pumping stations serving developments from six to two hundred units, we deliver water services infrastructure in partnership with Local Authorities and specialist suppliers.",
      },
      {
        heading: "Geotechnical Engineering",
        body: "We provide a full geotechnical design and consultation service — boreholes, in-situ soil sampling, laboratory testing and trial holes — because understanding the ground early is the cheapest risk management a project can buy.",
      },
    ],
    highlights: [
      "Road & junction design to TII / DMURS standards",
      "Foul & storm drainage, SuDS strategy",
      "Water supply & pumping stations",
      "Geotechnical investigation & foundation design",
      "Waste permit & licence applications",
    ],
  },
  {
    slug: "structural-engineering",
    title: "Structural Engineering",
    short:
      "Complete structural design and project management across commercial, industrial, residential and community projects.",
    image: "/images/2026-05-group-40.jpg",
    gallery: [
      "/images/2026-05-group-41.jpg",
      "/images/2026-05-group-42.jpg",
      "/images/2026-05-group-43.jpg",
      "/images/2026-05-group-44.jpg",
    ],
    intro:
      "We provide a complete structural design and project management service to both the public and private sectors. Structural designers with a well-rounded knowledge of construction, the design Eurocodes and building regulations enable us to realise cost-effective solutions — from one-off retail units to €20m hotel developments.",
    sections: [
      {
        heading: "Commercial",
        body: "From Lismard Retail Park, Portlaoise (€15m, 120,000 sq ft steel portal frame on a brownfield site with ground conditions ranging from gravels to stiff clays) to the Mount Wolseley Hotel & Spa, Tullow (€20m, 130-bedroom extension with basement, built while the hotel traded fully) — we deliver complete structural packages whatever the scale.",
      },
      {
        heading: "Industrial",
        body: "We have designed a large number of industrial units using various forms of construction — including the 100,000 sq ft Warehouse 2000 on the outskirts of Portlaoise, with dock levellers set back into the building, and portal-frame units on a former sand pit at Lismard Industrial Estate.",
      },
      {
        heading: "Residential",
        body: "From one-off bespoke houses to multi-unit developments: a 50-unit scheme at Borris-in-Ossory where early site investigation identified the need for piled foundations south of a major storm outfall, and Ashbrook Gardens, Portlaoise — multi-storey apartment blocks within 12m of the Dublin–Cork rail line.",
      },
    ],
    highlights: [
      "Structural design to the Eurocodes",
      "Steel, concrete, masonry & timber",
      "Portal frames & long-span structures",
      "Piled foundations & difficult ground",
      "Construction-stage inspection & certification",
    ],
  },
  {
    slug: "insurance-engineering",
    title: "Insurance Engineering",
    short:
      "Forensic investigation of subsidence, flooding and structural damage — around 100 claims investigated every year.",
    image: "/images/2026-03-insurance.jpg",
    gallery: [],
    intro:
      "We are frequently asked to provide an engineering opinion on insurance claims lodged as subsidence, flooding or impact damage. We establish the proximate cause and the true extent of damage — using trial holes, dynamic probing, drains testing and CCTV surveys where required — and we currently investigate in the region of 100 subsidence claims in Ireland each year on behalf of both insurance companies and private homeowners.",
    sections: [
      {
        heading: "Subsidence & Structural Damage",
        body: "Whilst incidences of pure subsidence are rare, the point from which damage emanates is often clear while the underlying fault is not. Our engineers undertake every inspection with the care each case needs to reach the correct engineering determination.",
      },
      {
        heading: "Expert Witness",
        body: "We have been called upon on numerous occasions to provide expert witness testimony at conciliations, mediations, arbitrations and District, Circuit and High Court cases. Our role is to provide factual, unbiased opinions that can be clearly understood by all parties.",
      },
      {
        heading: "Unusual Cases",
        body: "Buildings struck by vehicles — manned and unmanned — a helicopter crash, lightning strikes including a castle: when the unusual happens, insurers call us to establish exactly what occurred and what it will take to put right.",
      },
    ],
    highlights: [
      "~100 subsidence claims investigated yearly",
      "Flooding & storm damage assessment",
      "Expert witness at all court levels",
      "Trial holes, probing, CCTV & drains testing",
      "Reporting insurers can act on",
    ],
  },
  {
    slug: "pyrite-remediation",
    title: "Pyrite Remediation",
    short:
      "National leaders in the identification and remediation of pyrite-affected properties.",
    image: "/images/2026-03-pyrite.jpg",
    gallery: [],
    intro:
      "Pyrite, or iron pyrite (FeS₂), is a common mineral present in many sedimentary rocks as framboidal crystals. When pyritic backfill, air and moisture mix, a chemical reaction creates expanding crystals within the material — causing floors to heave, walls to crack and buildings to suffer progressive damage.",
    sections: [
      {
        heading: "Identification & Testing",
        body: "We assess whether damage is consistent with pyritic heave, arrange sampling and testing, and give homeowners and insurers a clear, evidence-based determination.",
      },
      {
        heading: "National Standards",
        body: "AOCA has been highly involved with the NSAI in developing two National Standards which are used as the basis for the remediation of pyrite-affected properties in Ireland — the same standards we apply on every remediation project we certify.",
      },
    ],
    highlights: [
      "Contributors to the NSAI national remediation standards",
      "Assessment, testing & certification",
      "Remediation design & supervision",
      "Support through claims & schemes",
    ],
  },
  {
    slug: "consulting-engineers",
    title: "Consulting Engineers",
    short:
      "Project management, health & safety (PSDP) and the full breadth of consultancy services behind our design teams.",
    image: "/images/2026-05-group-45.jpg",
    gallery: [],
    intro:
      "Aidan O'Connell & Associates Ltd. offer the full range of consulting engineering services to complement our design teams — from project management of conservation and restoration works to acting as the sole professional service on civil and building projects.",
    sections: [
      {
        heading: "Project Management",
        body: "We have led design and construction teams to bring projects in on time and on budget, using management approaches adapted to each project — church restorations, a new parish centre, temporary school accommodation and medical centres among them. Whatever the scale, the service is tailored to suit the client's requirements.",
      },
      {
        heading: "Health & Safety / PSDP",
        body: "We aim to conduct every project to the best possible standards of health, safety and welfare. As designers we apply the General Principles of Prevention from design stage — eliminating hazards and reducing risk before anyone sets foot on site — and we discharge the PSDP role under the Construction Regulations 2006–2013.",
      },
    ],
    highlights: [
      "Project management & client representation",
      "PSDP & design-stage risk management",
      "Assigned Certifier & building control",
      "Technical due diligence & condition surveys",
      "Fire safety & regulatory compliance",
    ],
  },
];

export const serviceLines = [
  "Insurance Expert Consultancy",
  "Insurance Reinstatement",
  "Expert Witness for Litigation",
  "Assigned Certifier",
  "Fire Safety",
  "Building Services Engineering",
  "Mechanical & Electrical Design",
  "Sustainability & Energy Efficiency",
  "Project Management & Client Representation",
  "Technical Due Diligence & Condition Surveys",
  "Regulatory Compliance & Building Control",
  "Design Coordination & BIM Services",
];

export type Sector = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
};

export const sectors: Sector[] = [
  {
    slug: "commercial",
    title: "Commercial & Retail",
    blurb: "Engineering solutions for offices, retail and corporate environments.",
    image: "/images/2026-02-img_0773.jpg",
  },
  {
    slug: "education-government",
    title: "Education & Government",
    blurb: "Trusted engineering for schools, civic buildings and public sector projects.",
    image: "/images/2026-04-government-education.jpg",
  },
  {
    slug: "hospitality-leisure-community",
    title: "Hospitality, Leisure & Community",
    blurb: "Engineering welcoming, high-performance spaces for hotels, leisure and community use.",
    image: "/images/2026-04-hospitality-leisure-community.jpg",
  },
  {
    slug: "industrial-data-centres",
    title: "Industrial & Data Centres",
    blurb: "Delivering reliable, precision engineering for industrial and mission-critical facilities.",
    image: "/images/2026-04-industrial-data.jpg",
  },
  {
    slug: "residential",
    title: "Residential",
    blurb: "Expert engineering for homes and residential developments of every scale.",
    image: "/images/2026-04-residential.jpg",
  },
  {
    slug: "life-sciences-healthcare",
    title: "Life Sciences & Healthcare",
    blurb: "Specialist engineering for healthcare and life science environments.",
    image: "/images/2026-04-life-science-health-care.jpg",
  },
];

export type Project = {
  slug: string;
  title: string;
  sector: string; // sector slug
  location?: string;
  thumb: string;
  hero?: string;
  gallery: string[];
  summary: string;
  body: string[];
  featured?: boolean;
};

const P = "/images/";

export const projects: Project[] = [
  {
    slug: "the-glass-bottle-site",
    title: "The Glass Bottle Site",
    sector: "residential",
    location: "Ringsend, Dublin",
    thumb: P + "2026-02-glass-bottle-site.webp",
    hero: P + "2026-02-glass-bottle-site.webp",
    gallery: [
      P + "2026-02-20240424_142547.jpg",
      P + "2026-02-20241121_102059.jpg",
      P + "2026-02-20241121_104022.jpg",
      P + "2026-02-20250402_120133.jpg",
      P + "2026-02-20250402_120136.jpg",
      P + "2026-02-20250402_121334.jpg",
      P + "2026-02-20251009_114732.jpg",
      P + "2026-02-20251009_123106.jpg",
    ],
    summary:
      "Independent Third-Party Quality Assurance Advisor for the waterproofing systems on one of Dublin's landmark regeneration projects.",
    body: [
      "AOCA, as an independent Third-Party Quality Assurance Advisor (QA Advisor), provides objective oversight and technical assurance for the design, installation, and performance of waterproofing systems in roof envelope works. Our role is to safeguard the project's quality, durability and compliance.",
      "The QA Advisor's role is to help the client minimise the risk of future leaks, defects, or warranty claims by ensuring that the waterproofing envelope is designed and installed correctly — the first time.",
    ],
    featured: true,
  },
  {
    slug: "arklow-water-treatment-plant",
    title: "Arklow Water Treatment Plant",
    sector: "commercial",
    location: "Arklow, Co. Wicklow",
    thumb: P + "2026-02-thumb-1.jpg",
    hero: P + "2026-02-arklow_hero_final_dou4go-1.jpg",
    gallery: [
      P + "2026-02-arklow-waste-water-treatment-plant-clancy-moore-architects_16-1-1.jpg",
      P + "2026-02-arklow-wwtp-site_june-2022-1.jpg",
      P + "2026-02-arklowwwtpfeb25-1.jpg",
      P + "2026-02-7938-1.jpg",
      P + "2026-02-1711483458928-1.jpg",
      P + "2026-02-1711483460657-1.jpg",
      P + "2026-02-1711483461515-1.jpg",
      P + "2026-02-arklow_case_study_featured_ojg6cb-2.jpg",
    ],
    summary:
      "Award-winning major infrastructure — part of the team that delivered Arklow's transformative wastewater treatment plant.",
    body: [
      "AOCA are delighted to have been part of the team that delivered this major piece of infrastructure to the town of Arklow, and with the outcome that has been achieved. The plant has since been recognised with prestigious industry awards.",
    ],
    featured: true,
  },
  {
    slug: "portlaoise-retail-park",
    title: "Portlaoise Retail Park",
    sector: "commercial",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-02-img_0769.jpg",
    hero: P + "2026-02-dji_0037.jpg",
    gallery: [
      P + "2026-02-dji_0039.jpg",
      P + "2026-02-img_0762.jpg",
      P + "2026-02-img_0769.jpg",
      P + "2026-02-img_0771.jpg",
      P + "2026-02-img_0773.jpg",
    ],
    summary:
      "Flagship 130,000 sq ft retail development including a section of the Portlaoise Southern Orbital Route.",
    body: [
      "This flagship 130,000 sq ft property included a section of the Portlaoise Southern Orbital Route, which involved two major roundabouts and had to tie in to the existing roads at both the Eastern and Western ends.",
      "The design of a 4m high retaining wall adjacent to a major watercourse was also required.",
    ],
    featured: true,
  },
  {
    slug: "abbott-kilkenny",
    title: "Abbott Kilkenny",
    sector: "commercial",
    location: "Kilkenny",
    thumb: P + "2026-02-dodder-thumb.jpg",
    hero: P + "2026-02-img_3602.jpg",
    gallery: [
      P + "2026-02-img-3633-rotated.jpg",
      P + "2026-02-img-3635.jpg",
    ],
    summary:
      "Engineering services on works at Abbott's Kilkenny facility — precision delivery in a live, regulated environment.",
    body: [],
  },
  {
    slug: "sdcc-dodder-valley-pavilions",
    title: "SDCC Dodder Valley Pavilions",
    sector: "commercial",
    location: "South Dublin",
    thumb: P + "2026-02-dodder-valley-thumb.jpg",
    hero: P + "2026-02-1950x1462-cover-1.jpg",
    gallery: [
      P + "2026-02-1100x646-cover.jpg",
      P + "2026-02-1100x679-cover.jpg",
      P + "2026-02-4-800x600-1.jpg",
      P + "2026-02-22-800x512-1.jpg",
      P + "2026-02-24-800x511-1.jpg",
      P + "2026-02-sam_9514.jpg",
      P + "2026-02-sam_9589.jpg",
      P + "2026-02-sam_9876.jpg",
    ],
    summary:
      "Sports pavilions for South Dublin County Council in the Dodder Valley — community infrastructure built to last.",
    body: [],
  },
  {
    slug: "people-first-credit-union-portlaoise",
    title: "People First Credit Union, Portlaoise",
    sector: "commercial",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-02-thumb.jpg",
    hero: P + "2026-02-dji_0524.jpg",
    gallery: [
      P + "2026-02-20241030_141937.jpg",
      P + "2026-02-img_20240212_125033.jpg",
      P + "2026-02-img_20240507_150533.jpg",
      P + "2026-02-img_20240513_155927.jpg",
      P + "2026-02-img_20240513_161108.jpg",
    ],
    summary:
      "Structural and civil engineering for the town-centre home of People First Credit Union.",
    body: [],
  },
  {
    slug: "st-patricks-national-school-newbridge-co-kildare",
    title: "St. Patrick's National School, Newbridge",
    sector: "education-government",
    location: "Newbridge, Co. Kildare",
    thumb: P + "2026-02-img_3012-1.jpg",
    hero: P + "2026-02-st-patricks-ns.jpg",
    gallery: [
      P + "2026-02-st-patricks-ns_1.jpg",
      P + "2026-02-img_3087.jpg",
      P + "2026-02-img_3094.jpg",
      P + "2026-02-img_5408.jpg",
      P + "2026-02-img_6858.jpg",
      P + "2026-02-img_7462.jpg",
      P + "2026-02-img_7535.jpg",
      P + "2026-02-media-3.jpg",
      P + "2026-02-media-4.jpg",
      P + "2026-02-media-5.jpg",
    ],
    summary:
      "School buildings delivered around a live campus — engineering for the education sector.",
    body: [],
  },
  {
    slug: "grange-ns-carlow",
    title: "Grange National School, Carlow",
    sector: "education-government",
    location: "Co. Carlow",
    thumb: P + "2026-02-grange-thumb.jpg",
    hero: P + "2026-02-20230712_100150.jpg",
    gallery: [
      P + "2026-02-20230712_095506.jpg",
      P + "2026-02-20230712_095450.jpg",
      P + "2026-02-20230712_095528.jpg",
      P + "2026-02-20230712_095754.jpg",
      P + "2026-02-20230712_095857.jpg",
      P + "2026-02-20230712_100228.jpg",
      P + "2026-02-20230712_100528.jpg",
    ],
    summary: "Extension and refurbishment works at Grange National School.",
    body: [],
  },
  {
    slug: "legal-aid-board",
    title: "Legal Aid Board",
    sector: "education-government",
    thumb: P + "2026-02-legal-aid-thumb.jpg",
    hero: P + "2026-02-img_2431.jpg",
    gallery: [
      P + "2026-02-img_0582.jpg",
      P + "2026-02-img_0597.jpg",
      P + "2026-02-img_0598.jpg",
      P + "2026-02-img_2641.jpg",
      P + "2026-02-img_4590.jpg",
      P + "2026-02-img_8875.jpg",
    ],
    summary: "Public-sector works for the Legal Aid Board.",
    body: [],
  },
  {
    slug: "st-brigids-national-school",
    title: "St. Brigid's National School",
    sector: "education-government",
    thumb: P + "2025-11-st-patricks-ns_1-thumb.jpg",
    hero: P + "2025-11-st-patricks-ns.jpg",
    gallery: [
      P + "2025-11-img_3012_1.jpg",
      P + "2025-11-img_3087.jpg",
      P + "2025-11-img_3094.jpg",
      P + "2025-11-img_5408.jpg",
      P + "2025-11-img_6858.jpg",
      P + "2025-11-img_7462.jpg",
      P + "2025-11-img_7535.jpg",
      P + "2025-11-media-3.jpg",
      P + "2025-11-media-4.jpg",
      P + "2025-11-media-5.jpg",
    ],
    summary: "School accommodation delivered for St. Brigid's National School.",
    body: [],
  },
  {
    slug: "portlaoise-parish-centre",
    title: "Portlaoise Parish Centre",
    sector: "hospitality-leisure-community",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-02-parish-centre-thumb.jpg",
    hero: P + "2026-02-dsc_8576-copy.jpg",
    gallery: [
      P + "2026-02-dsc7522.jpg",
      P + "2026-02-dsc_6344.jpg",
      P + "2026-02-dsc_6349.jpg",
      P + "2026-02-dsc_6364.jpg",
      P + "2026-02-dsc_6376.jpg",
      P + "2026-02-dsc_6383-edit.jpg",
      P + "2026-02-dsc_6398.jpg",
      P + "2026-02-dsc_6415.jpg",
      P + "2026-02-overhead21.jpg",
      P + "2026-02-p1120979-copy.jpg",
    ],
    summary:
      "Project management and engineering for the new Parish Centre in Portlaoise.",
    body: [],
  },
  {
    slug: "ratheniska-church",
    title: "Ratheniska Church",
    sector: "hospitality-leisure-community",
    location: "Ratheniska, Co. Laois",
    thumb: P + "2026-02-niskathumb.jpg",
    hero: P + "2026-02-header.webp",
    gallery: [
      P + "2026-02-before-0.jpg",
      P + "2026-02-before-1.jpg",
      P + "2026-02-during-1.jpg",
      P + "2026-02-during2.jpg",
      P + "2026-02-during3.jpg",
      P + "2026-02-during4.jpg",
      P + "2026-02-roof-complete.jpg",
      P + "2026-02-finished-8.jpg",
      P + "2026-02-finished-16.jpg",
      P + "2026-02-finished-17.jpg",
    ],
    summary:
      "Full restoration of Ratheniska Church — documented before, during and after.",
    body: [],
  },
  {
    slug: "st-peter-pauls-church",
    title: "St. Peter & Paul's Church",
    sector: "hospitality-leisure-community",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-02-ppthumb.jpg",
    hero: P + "2026-02-ppchurch.jpg",
    gallery: [
      P + "2026-02-dsc7697.jpg",
      P + "2026-02-dsc7808.jpg",
      P + "2026-02-5606327494_004961d666_o.jpg",
      P + "2026-02-32235998280_00b60d4c44_o.jpg",
      P + "2026-02-picture-003.jpg",
      P + "2026-02-picture-019.jpg",
      P + "2026-02-picture13.jpg",
      P + "2026-02-picture16.jpg",
    ],
    summary:
      "Church restoration project in the heart of Portlaoise — conservation engineering at scale.",
    body: [],
  },
  {
    slug: "heath-church",
    title: "Heath Church",
    sector: "hospitality-leisure-community",
    location: "The Heath, Co. Laois",
    thumb: P + "2025-11-heath-thumb-1.jpg",
    hero: P + "2025-11-heath-church.jpg",
    gallery: [
      P + "2025-11-20200114_074156.jpg",
      P + "2025-11-dsc_2765.jpg",
      P + "2025-11-heath-church-2.jpg",
      P + "2025-11-heath-renovation-19.jpg",
      P + "2025-11-heath-renovation-87.jpg",
      P + "2025-11-heath-renovation-100.jpg",
      P + "2025-11-img_0002.jpg",
      P + "2025-11-img_0005.jpg",
      P + "2025-11-img_0014.jpg",
      P + "2025-11-img_0016.jpg",
    ],
    summary:
      "Civil and structural engineering from tender stage to completion and certification on the full renovation of Heath Church.",
    body: [
      "Aidan O'Connell & Associates provided civil and structural engineering services from tender stage right through to completion and certification.",
      "The renovation of the entire church included underfloor heating, a new floor, a new altar and all associated groundworks.",
    ],
  },
  {
    slug: "industrial-warehousing-portlaoise",
    title: "Industrial Warehousing, Portlaoise",
    sector: "industrial-data-centres",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-02-warehouse-thumb.jpg",
    hero: P + "2026-02-dji_0871.jpg",
    gallery: [
      P + "2026-02-dji_0877.jpg",
      P + "2026-02-dji_0878.jpg",
      P + "2026-02-dji_0885.jpg",
      P + "2026-02-dji_0952.jpg",
      P + "2026-02-dscf0148.jpg",
      P + "2026-02-dscf0150.jpg",
      P + "2026-02-dscf0153.jpg",
      P + "2026-02-dscf7542.jpg",
      P + "2026-02-img_1878.jpg",
      P + "2026-02-img_3159.jpg",
    ],
    summary:
      "Large-scale portal-frame warehousing delivered on the outskirts of Portlaoise.",
    body: [],
  },
  {
    slug: "corcorans-test-centre",
    title: "Corcorans Test Centre",
    sector: "industrial-data-centres",
    thumb: P + "2026-02-corcorans.jpg",
    hero: P + "2026-02-dsc02787_1.jpg",
    gallery: [
      P + "2026-02-dsc02785.jpg",
      P + "2026-02-img_3918.jpg",
      P + "2026-02-img_3929.jpg",
      P + "2026-02-img_4525.jpg",
      P + "2026-02-img_4526.jpg",
      P + "2026-02-img_4555.jpg",
    ],
    summary: "Design and delivery of a purpose-built vehicle test centre.",
    body: [],
  },
  {
    slug: "equine-facility",
    title: "Equine Facility",
    sector: "industrial-data-centres",
    thumb: P + "2025-11-equest-thumb.jpg",
    hero: P + "2025-11-equine-facility-1.jpg",
    gallery: [
      P + "2025-11-dscf9485.jpg",
      P + "2025-11-dscf9491.jpg",
      P + "2025-11-img_0755.jpg",
      P + "2025-11-img_1016.jpg",
      P + "2025-11-img_1923.jpg",
      P + "2025-11-img_2105.jpg",
      P + "2025-11-img_2137.jpg",
    ],
    summary:
      "20-stall equine facility with sand arena — single-storey steel portal frame with rendered masonry walls and profiled metal roof sheeting, plus car parking, access and all ancillary services.",
    body: [
      "The facility comprises 20 equine stalls and ancillary facilities in a single-storey steel portal-framed structure with single-skin profiled metal roof and wall sheeting, alongside a sand arena, car parking, access and all necessary associated works.",
    ],
  },
  {
    slug: "b-braun-wellstone-midlands-renal-care-centre",
    title: "B. Braun Wellstone Renal Care Centre",
    sector: "life-sciences-healthcare",
    location: "Midlands",
    thumb: P + "2025-11-b-braun-720-logoless.jpg",
    hero: P + "2025-11-dji_0035.jpg",
    gallery: [
      P + "2025-11-dscn4179.jpg",
      P + "2025-11-img_8392.jpg",
      P + "2025-11-img_20191031_120403.jpg",
      P + "2025-11-p1530100.jpg",
      P + "2025-11-sam_7879.jpg",
      P + "2025-11-sam_8351.jpg",
      P + "2025-11-sam_8398.jpg",
      P + "2025-11-sam_8869.jpg",
      P + "2025-11-sam_9191.jpg",
    ],
    summary:
      "Steel-framed renal care centre on an esker site — bespoke foundation design informed by boreholes, window samples and dynamic probes.",
    body: [
      "AOCA worked closely with the architects in the development of the project, with a primary structure consisting of a steel frame with two monopitched roofs spanning the reception area and the main section of the building.",
      "Identifying the ground conditions was paramount: the site sits where an esker exists and where sand and gravel extraction has been undertaken nearby for many years. AOCA instructed boreholes, window samples and dynamic probes to inform a bespoke foundation design.",
    ],
  },
  {
    slug: "the-hole-in-the-wall",
    title: "The Hole in the Wall",
    sector: "residential",
    location: "Dublin",
    thumb: P + "2026-02-holeinthewall-thumb.jpg",
    hero: P + "2026-02-hole-in-the-wall-.jpg",
    gallery: [
      P + "2026-02-20240926_090259262_ios.jpg",
      P + "2026-02-20241007_125128936_ios.jpg",
      P + "2026-02-20250805_135354450_ios.jpg",
      P + "2026-02-20251003_091345484_ios.jpg",
      P + "2026-02-dji_20250601131323_0012_d.jpg",
      P + "2026-02-img-20250423-wa0028.jpg",
    ],
    summary:
      "42-unit, 7-storey apartment scheme with basement car park on a compact 0.2-hectare site — full civil and structural design.",
    body: [
      "This project involves the construction of a 42-unit apartment scheme, comprising a 7-storey building with a basement car park, situated on a compact 0.2-hectare site. AOCA Engineering Consultants is responsible for the full civil and structural engineering design, including preparation of the Ancillary Design Certificate.",
      "The site presented several constraints, including a 1050mm storm sewer and a 300mm foul sewer, both successfully diverted within the site footprint to enable construction outside the required wayleaves. Key design features include a significant first-floor transfer slab to accommodate optimal column layouts above the undercroft car park, and structural columns supported on skin-friction piles to a depth of 14 metres.",
      "Estimated completion: March 2026.",
    ],
  },
  {
    slug: "harper-street-mountmellick",
    title: "Harbour Street, Mountmellick",
    sector: "residential",
    location: "Mountmellick, Co. Laois",
    thumb: P + "2026-02-harper-thumb.jpg",
    hero: P + "2026-02-dji_0807.jpg",
    gallery: [
      P + "2026-02-dji_0814.jpg",
      P + "2026-02-dji_20250526051209_0006_d.jpg",
      P + "2026-02-20240708_132741914_ios.jpg",
      P + "2026-02-20241017_104842393_ios.jpg",
      P + "2026-02-20241017_104902752_ios.jpg",
      P + "2026-02-20241030_103550.jpg",
    ],
    summary:
      "54-dwelling development — full civil design, watermain, drainage, roads and certification.",
    body: [
      "Development of 54 dwelling units: 42 three-bedroom two-storey, 8 two-bedroom two-storey and 4 two-bedroom bungalows.",
      "AOCA delivered design and inspection of all civil elements — foundations, watermain design, foul and surface water drainage, internal roads — with periodic site inspections. All works were supervised and certified on completion.",
    ],
  },
  {
    slug: "derry-road-durrow",
    title: "Derry Road, Durrow",
    sector: "residential",
    location: "Durrow, Co. Laois",
    thumb: P + "2026-02-derry.jpg",
    hero: P + "2026-02-derry.jpg",
    gallery: [],
    summary:
      "20 social housing units for Laois County Council, including a major retaining wall design.",
    body: [
      "20 social housing units for Laois County Council, including 4 apartment units, 4 serviced sites, a large retaining wall design and all necessary and associated site works.",
      "AOCA is responsible for the design and inspection of all civil and structural elements, including foundations, foul and surface water drainage, and internal roads.",
      "Estimated completion: May 2026.",
    ],
  },
  {
    slug: "droughhill-portarlington",
    title: "Droughhill, Portarlington",
    sector: "residential",
    location: "Portarlington, Co. Laois",
    thumb: P + "2025-11-img_20191118_105955-1030x586-1.jpg",
    hero: P + "2026-02-img_6913-1.jpg",
    gallery: [
      P + "2026-02-dscn1764.jpg",
      P + "2026-02-dscn6797.jpg",
      P + "2026-02-dscn8438.jpg",
      P + "2026-02-dscn8476.jpg",
      P + "2026-02-dscn8501.jpg",
      P + "2026-02-dscn8859.jpg",
      P + "2026-02-img_6830.jpg",
      P + "2026-02-img_6910.jpg",
      P + "2026-02-img_6915.jpg",
    ],
    summary:
      "Residential development delivered from planning application through construction to completion.",
    body: [
      "Our responsibilities for this project included the planning application, construction drawings and project supervision through to completion.",
    ],
  },
  {
    slug: "the-cross-of-newtown-ballyroan-co-laois",
    title: "The Cross of Newtown, Ballyroan",
    sector: "residential",
    location: "Ballyroan, Co. Laois",
    thumb: P + "2026-02-thumb-newtown.jpg",
    hero: P + "2026-02-dji_0922.jpg",
    gallery: [
      P + "2026-02-img_3378.jpg",
      P + "2026-02-img_3385.jpg",
      P + "2026-02-img_3398.jpg",
      P + "2026-02-img_3416.jpg",
    ],
    summary:
      "Residential scheme at Ballyroan — planning, construction drawings and supervision to completion.",
    body: [
      "Our responsibilities for this project included the planning application, construction drawings and project supervision through to completion.",
    ],
  },
  {
    slug: "gortnahoe-house",
    title: "Gortnahoe House",
    sector: "residential",
    location: "Co. Tipperary",
    thumb: P + "2025-11-rendered-image-heidi-higgins-002-1030x475-1.jpg",
    hero: P + "2025-11-rendered-image-heidi-higgins-002-1030x475-1.jpg",
    gallery: [
      P + "2025-11-image-1-800x600-1.jpg",
      P + "2025-11-20190306_164711.jpg",
      P + "2025-11-20190306_164334.jpg",
      P + "2025-11-800x600-image-2.jpg",
      P + "2025-11-image-9-800x600-1.jpg",
    ],
    summary:
      "Four-bedroom detached contemporary rural house — architectural design, planning permission and construction supervision.",
    body: [
      "A 4-bedroom detached contemporary rural house delivered end-to-end: architectural design, planning permission and construction supervision.",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "What sets AOCA apart is not just their technical expertise, but their reliability and professionalism. They are approachable, proactive, and always willing to go the extra mile to ensure projects run smoothly. We would have no hesitation in recommending AOCA to others.",
    author: "Owen O'Gorman",
    role: "Managing Director",
  },
  {
    quote:
      "Their team brings genuine technical expertise to every project, and their ability to engage practically and collaboratively with our architectural practice makes the design and delivery process genuinely seamless. We value their engineering knowledge, professionalism and responsiveness — and recommend without hesitation.",
    author: "Johnathan Marais",
    role: "Head of Operations",
  },
  {
    quote:
      "The professionalism and expert guidance AOCA have afforded in their investigations have left no stones unturned. I consider AOCA a problem solver who consistently delivers high quality work, and to date their assistance has been invaluable.",
    author: "Fiona Beirne",
    role: "Senior Claims Associate",
  },
  {
    quote:
      "Property Claims Loss Assessors have worked with the AOCA team for many years now. We love their service because of their rapid response times and the level of detail in their reporting — leaving no stone unturned, and always available to discuss ongoing projects.",
    author: "Peter Mulvaney",
    role: "Director",
  },
  {
    quote:
      "I have worked alongside many consulting professionals over the years, but few demonstrate the consistency, integrity, impartiality, and technical competence that AOCA has shown time and again. Their team has provided high-quality, objective engineering services on a wide range of projects.",
    author: "Stephen Nolan",
    role: "Client",
  },
];

export const partnerLogos = [
  { src: "/images/2026-06-davies-rgb-white-copy.png", alt: "Davies" },
  { src: "/images/2026-06-pcla.png", alt: "PCLA" },
  { src: "/images/2026-06-rdf.png", alt: "RDF" },
  { src: "/images/2026-06-omc-logo.png", alt: "OMC" },
];

/** Client / partner logo wall shown on the homepage (30 brands). */
export const logoWall = [
  ...["10", "12", "14", "15", "17"].map((n) => `/images/2025-11-image-${n}.jpg`),
  ...[
    "18", "21-1", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41",
    "42", "43",
  ].map((n) => `/images/2026-03-image-${n}.jpg`),
];

export const cultureImages = [
  P + "2026-05-344a6971.jpg",
  P + "2026-05-344a6993.jpg",
  P + "2026-05-344a7050.jpg",
  P + "2026-05-153a4152.jpg",
  P + "2026-05-img-20250902-wa0004.jpg",
  P + "2026-05-img-20250902-wa0027.jpg",
  P + "2026-05-img-20250902-wa0034.jpg",
  P + "2026-05-img-20250902-wa0050.jpg",
  P + "2026-05-img_3055.jpg",
  P + "2026-05-img_3074.jpg",
  P + "2026-05-brian-playing-darts.jpg",
  P + "2026-05-20230511_153410.jpg",
  P + "2026-05-dji_0603.jpg",
  P + "2026-05-20180924_102420507_ios.jpg",
  P + "2026-05-website-our-culture.jpg",
  P + "2026-05-website-our-culture-2.jpg",
];

export const companyImages = {
  hero: P + "2026-05-group-46.jpg",
  office: [
    P + "2025-11-153a3552.jpg",
    P + "2025-11-153a3905.jpg",
    P + "2025-11-153a3630.jpg",
    P + "2025-11-153a3667-2.jpg",
  ],
  brandedTeam: P + "2026-05-group-33.jpg",
  brandedTeam2: P + "2026-05-group-34-1.jpg",
  cultureTeaser: P + "2026-05-group-49-2.jpg",
  careers: P + "2026-04-group-32.jpg",
  contact: P + "2026-05-team-meeting-2.webp",
  expertiseHero: P + "2026-04-adobestock_118976966.webp",
  expertiseAlt: P + "2026-03-shutterstock_2715611483-1.jpg",
  homeStrip: P + "2026-02-shutterstock_761907343.webp",
  videoPoster: P + "2026-02-home-fallback.webp",
};

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getSector(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
