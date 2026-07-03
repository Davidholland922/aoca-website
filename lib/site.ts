/**
 * ALL editable site content lives in this file.
 * Anything marked [PLACEHOLDER] needs to be confirmed with AOCA —
 * see PLACEHOLDERS.md at the project root for the full swap-list.
 */

export const site = {
  name: "AOCA Engineering Consultants",
  shortName: "AOCA",
  tagline: "Engineering certainty, from the ground up.",
  // [PLACEHOLDER] — confirm real staging/production URL after deploy
  url: "https://aoca-draft.vercel.app",
  // [PLACEHOLDER] — confirm real contact details with AOCA
  phone: "+353 (0)57 000 0000",
  phoneHref: "tel:+353570000000",
  email: "info@aoca.ie",
  // [PLACEHOLDER] — confirm registered address
  address: "Unit 0, Business Park, Portlaoise, Co. Laois, R32 XX00",
  // [PLACEHOLDER] — confirm service area
  serviceArea: "Serving clients nationwide from the Midlands",
  founded: "2005", // [PLACEHOLDER]
};

export const stats = [
  // [PLACEHOLDER] — confirm real figures with AOCA
  { value: "20+", label: "Years in practice" },
  { value: "350+", label: "Projects delivered" },
  { value: "26", label: "Counties served" },
  { value: "6", label: "Core disciplines" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string; // lucide icon name key, mapped in components
  problem: string;
  approach: string;
  deliverables: string[];
  relatedProject: string; // project slug
};

// [PLACEHOLDER] — confirm AOCA's actual service list; these six are a
// typical multi-disciplinary consultancy structure (modelled on the brief).
export const services: Service[] = [
  {
    slug: "civil-structural-engineering",
    title: "Civil & Structural Engineering",
    short:
      "Structural design that stands up to scrutiny — from concept schemes to construction-stage detail.",
    icon: "building",
    problem:
      "A structure that is over-designed wastes money; one that is under-designed risks everything. Getting the balance right takes judgment that only comes from years of built work.",
    approach:
      "We design efficient, buildable structures in steel, concrete, masonry and timber. Every scheme is developed with the contractor's reality in mind — sequencing, access, availability of materials — so the design that leaves our office is the one that gets built.",
    deliverables: [
      "Structural design & analysis to the Eurocodes",
      "Civil design — drainage, roads, site levels",
      "Construction-stage drawings & specifications",
      "Structural certification & compliance reports",
    ],
    relatedProject: "riverside-residential-development",
  },
  {
    slug: "project-management",
    title: "Project Management",
    short:
      "One point of accountability from planning to handover — programme, budget and quality held in balance.",
    problem:
      "Projects rarely fail in one big moment. They drift — a late decision here, an unmanaged change there. By the time it shows in the programme, the money is already spent.",
    approach:
      "We run projects with a discipline learned on site: clear scope, honest programmes, decisions made when they're needed. Our clients get straight answers about cost and risk early enough to act on them.",
    deliverables: [
      "Programme development & monitoring",
      "Cost control & change management",
      "Contractor procurement & tender analysis",
      "Employer's representative services",
    ],
    icon: "clipboard",
    relatedProject: "commercial-office-fitout",
  },
  {
    slug: "assigned-certifier",
    title: "Assigned Certifier & BCAR",
    short:
      "Building-control compliance handled properly — inspections, ancillary certificates and the statutory register.",
    icon: "shield",
    problem:
      "Since BCAR, compliance is a legal trail, not a formality. Gaps in the inspection record or ancillary certification surface at the worst possible time — at sale, at refinance, at handover.",
    approach:
      "We act as Assigned Certifier on residential, commercial and industrial projects, building the compliance file from day one. Inspections are planned against the works programme, so certification never holds up completion.",
    deliverables: [
      "Assigned Certifier role under BCAR (S.I. 9 of 2014)",
      "Preliminary inspection plans",
      "Ancillary certificate coordination",
      "Statutory register lodgement & completion certification",
    ],
    relatedProject: "primary-school-extension",
  },
  {
    slug: "site-development-infrastructure",
    title: "Site Development & Infrastructure",
    short:
      "Feasibility, drainage, roads and utilities — the engineering that makes a site worth building on.",
    icon: "map",
    problem:
      "Land is bought on potential, but potential is an engineering question: can it drain, can it connect, can it carry the density the numbers need? Finding out late is expensive.",
    approach:
      "We assess sites before commitments are made and design the infrastructure that unlocks them — foul and surface water strategy, road layouts and Taking-in-Charge standards, utility connections and flood risk.",
    deliverables: [
      "Site feasibility & due diligence reports",
      "Drainage design & SuDS strategy",
      "Road & entrance design (DMURS / TII standards)",
      "Flood risk assessments & planning reports",
    ],
    relatedProject: "agri-industrial-facility",
  },
  {
    slug: "structural-surveys-assessments",
    title: "Structural Surveys & Assessments",
    short:
      "Clear, defensible reporting on the condition of existing buildings — before purchase, after damage, ahead of works.",
    icon: "search",
    problem:
      "An existing building keeps its problems to itself. Cracking, movement, corrosion, altered structure — the cost of not knowing lands on whoever signs next.",
    approach:
      "We survey and assess existing structures with a practical eye: what is actually wrong, what it will take to fix, and what can safely be left alone. Our reports are written to be acted on — by owners, buyers, insurers and courts.",
    deliverables: [
      "Pre-purchase structural surveys",
      "Crack, movement & subsidence assessments",
      "Certificates of compliance & exemption",
      "Expert reports for insurance & legal matters",
    ],
    relatedProject: "heritage-mill-restoration",
  },
  {
    slug: "health-safety-psdp",
    title: "Health & Safety (PSDP)",
    short:
      "Design-stage safety coordination that protects the people who build — and the client who commissions.",
    icon: "hardhat",
    problem:
      "Safety duties under the Construction Regulations sit with the client whether they realise it or not. Appointing the right PSDP is the difference between a managed duty and an unmanaged liability.",
    approach:
      "As Project Supervisor for the Design Process we identify hazards while they can still be designed out, coordinate the design team's risk management, and hand over a safety file that's actually useful to the people who maintain the building.",
    deliverables: [
      "PSDP appointment & design risk coordination",
      "Preliminary health & safety plans",
      "Safety file preparation & handover",
      "Client duty advice under S.I. 291 of 2013",
    ],
    relatedProject: "healthcare-clinic-upgrade",
  },
];

export type Project = {
  slug: string;
  title: string;
  sector: string;
  location: string;
  value: string;
  scope: string;
  summary: string;
  challenge: string;
  outcome: string;
  servicesProvided: string[]; // service slugs
};

// [PLACEHOLDER] — all six case studies are sample content demonstrating the
// intended format. Replace with real AOCA projects (with photos) before launch.
export const projects: Project[] = [
  {
    slug: "riverside-residential-development",
    title: "Riverside Residential Development",
    sector: "Residential",
    location: "Co. Laois",
    value: "€8.5m",
    scope: "42-unit scheme — civil & structural design, roads and drainage",
    summary:
      "Full civil and structural design for a 42-unit residential scheme on a constrained riverside site.",
    challenge:
      "A flood-zone boundary crossed the eastern third of the site, and ground conditions varied from rock at surface to soft alluvium within 80 metres.",
    outcome:
      "A revised site layout kept all habitable units outside the flood extent without losing density. Foundations were zoned to ground conditions, saving significant piling cost against the original scheme.",
    servicesProvided: [
      "civil-structural-engineering",
      "site-development-infrastructure",
    ],
  },
  {
    slug: "commercial-office-fitout",
    title: "Commercial Office Fit-Out",
    sector: "Commercial",
    location: "Portlaoise",
    value: "€1.2m",
    scope: "Structural alterations & project management for a three-storey fit-out",
    summary:
      "Structural opening-up works and end-to-end project management for the fit-out of a three-storey town-centre office.",
    challenge:
      "The client needed occupation within a fixed 22-week window to align with a lease break, in a building with no as-built structural records.",
    outcome:
      "Intrusive surveys in week one de-risked the structural works. The programme was re-sequenced around long-lead items and the building was occupied five days ahead of the deadline.",
    servicesProvided: ["project-management", "structural-surveys-assessments"],
  },
  {
    slug: "primary-school-extension",
    title: "Primary School Extension",
    sector: "Education",
    location: "Midlands",
    value: "€3.4m",
    scope: "Assigned Certifier & structural design for a 6-classroom extension",
    summary:
      "Structural design and Assigned Certifier services for a six-classroom extension to a live school campus.",
    challenge:
      "All works had to proceed alongside a fully occupied school, with certification milestones tied to Department funding drawdowns.",
    outcome:
      "The inspection plan was mapped to the funding schedule from the outset. Every drawdown certificate was issued on time and the statutory register was lodged the week the works completed.",
    servicesProvided: ["assigned-certifier", "civil-structural-engineering"],
  },
  {
    slug: "agri-industrial-facility",
    title: "Agri-Industrial Facility",
    sector: "Industrial",
    location: "Co. Kilkenny",
    value: "€5.1m",
    scope: "Site development & structural design for a grain intake and storage facility",
    summary:
      "Site infrastructure and structural design for a grain intake, drying and storage facility on a greenfield site.",
    challenge:
      "Heavy vehicle circulation, large clear-span structures and significant surface-water run-off on a site with no existing services.",
    outcome:
      "A one-way HGV circulation layout eliminated reversing movements at the intake pit. Portal frames were standardised across three buildings, cutting steel tonnage and programme.",
    servicesProvided: [
      "site-development-infrastructure",
      "civil-structural-engineering",
    ],
  },
  {
    slug: "heritage-mill-restoration",
    title: "Heritage Mill Restoration",
    sector: "Conservation",
    location: "Co. Offaly",
    value: "€2.0m",
    scope: "Structural assessment & repair design for a protected 19th-century mill",
    summary:
      "Condition assessment and sympathetic structural repair design for the conversion of a protected stone mill.",
    challenge:
      "Two centuries of alteration, flood damage and decay — with conservation constraints ruling out most conventional strengthening details.",
    outcome:
      "Targeted repairs retained over 90% of the historic fabric. Discreet steel interventions were threaded through existing openings, satisfying both the conservation architect and the building's new structural demands.",
    servicesProvided: [
      "structural-surveys-assessments",
      "civil-structural-engineering",
    ],
  },
  {
    slug: "healthcare-clinic-upgrade",
    title: "Healthcare Clinic Upgrade",
    sector: "Healthcare",
    location: "Co. Tipperary",
    value: "€900k",
    scope: "PSDP & structural alterations for a live primary-care clinic",
    summary:
      "Health & safety coordination and structural alterations for the phased upgrade of an operating primary-care clinic.",
    challenge:
      "Clinical services could not be interrupted; every phase of the works had to maintain safe, segregated public access.",
    outcome:
      "Design-stage risk workshops re-phased the works to keep clinical zones live throughout. The project completed with zero reportable incidents and no lost clinical days.",
    servicesProvided: ["health-safety-psdp", "structural-surveys-assessments"],
  },
];

export const values = [
  {
    title: "Judgment",
    body: "Codes and software don't make decisions — engineers do. We give clear recommendations and stand behind them.",
  },
  {
    title: "Rigour",
    body: "Every calculation checked, every assumption recorded, every certificate backed by evidence. Compliance is a trail, and ours holds up.",
  },
  {
    title: "Partnership",
    body: "Most of our work comes from clients we've worked with before. We earn the next project on the current one.",
  },
];

// [PLACEHOLDER] — sample testimonials; replace with real client quotes
export const testimonials = [
  {
    quote:
      "AOCA told us in week two what the site would really cost to develop. That honesty saved us from a purchase we'd have regretted.",
    author: "Development Client",
    role: "Residential Developer, Midlands",
  },
  {
    quote:
      "Their inspection plan was mapped to our funding drawdowns from day one. Not one certificate was late across the whole build.",
    author: "School Principal",
    role: "Education Sector Client",
  },
  {
    quote:
      "Straight answers, fast turnaround, and drawings the contractor could actually build from. We've used them on every project since.",
    author: "Main Contractor",
    role: "Commercial & Industrial Projects",
  },
];

// [PLACEHOLDER] — confirm team members, roles and qualifications
export const team = [
  {
    name: "Team Member Name",
    role: "Managing Director · Chartered Engineer",
    bio: "Placeholder bio — 25 years across residential, commercial and industrial projects.",
  },
  {
    name: "Team Member Name",
    role: "Senior Structural Engineer",
    bio: "Placeholder bio — structural design lead across steel, concrete and conservation work.",
  },
  {
    name: "Team Member Name",
    role: "Project Manager",
    bio: "Placeholder bio — programme and cost control on projects up to €10m.",
  },
];

export const sectors = [
  "Residential",
  "Commercial",
  "Industrial",
  "Education",
  "Healthcare",
  "Conservation",
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
