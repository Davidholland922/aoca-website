/**
 * ALL editable site content lives in this file.
 * Content sourced from the existing aoca.ie draft (crawled 2026-07-03).
 * Remaining placeholders are listed in PLACEHOLDERS.md.
 *
 * Projects added by the client through /admin land in content/projects.json
 * and are merged (newest first) with the built-in list below.
 */
import uploadedProjects from "../content/projects.json";
import hiddenSlugsJson from "../content/hidden.json";
import overridesJson from "../content/overrides.json";
import uploadedServices from "../content/services.json";

/** Sections editable by the client via /admin (content/overrides.json). */
const overrides = overridesJson as Partial<{
  team: { name: string; role: string; cred: string; bio?: string; photo?: string }[];
  stats: { value: string; label: string }[];
  offices: {
    name: string;
    address: string[];
    phone: string;
    phoneHref: string;
    email: string;
  }[];
  about: string[];
  featured: string[];
  jobs: { title: string; location: string; type: string; summary: string }[];
  banners: { key: string; title: string; body: string }[];
}>;

/** Big call-to-action banners — client-editable via /admin (Edit details). */
const bannerDefaults = {
  home: {
    title: "Talk to an engineer, not a switchboard.",
    body: "Tell us what you're planning and we'll give you a straight view on feasibility, cost and programme — before you commit.",
  },
  projects: {
    title: "Your project could be next.",
    body: "Bring us the awkward site, the tight programme, the building nobody has drawings for. That's the work we like.",
  },
};
const bannerOverrides = Object.fromEntries(
  (overrides.banners ?? []).map((b) => [b.key, { title: b.title, body: b.body }])
);
export const banners = {
  home: bannerOverrides.home ?? bannerDefaults.home,
  projects: bannerOverrides.projects ?? bannerDefaults.projects,
};

/** "About us" story paragraphs — client-editable via /admin. */
export const aboutParagraphs: string[] =
  overrides.about ?? [
    "With our head office located in Portlaoise, where the company was established by Aidan O'Connell, we opened a second office in Dublin in May 2014. The Dublin office has expanded considerably in the intervening period and offers the full range of engineering services along with pyrite investigation. Our offices share resources to ensure we provide the best possible service to every client.",
    "Since our initial steps on the ladder of engineering consultancy, we have expanded and evolved to service all sectors of the construction industry. This continuous growth is testament to our commitment to the quality of service we provide to all our clients.",
    "Our business philosophy is, always, to provide the most professional attention, together with the most practical solution at a reasonable cost. Our professional staff are on hand to discuss projects of any magnitude — simple or complex — and will deliver the highest standard possible to help you achieve your stated goal.",
  ];

/** Open job positions — client-editable via /admin. */
export const jobs = overrides.jobs ?? [];

/** Slugs removed from the site via /admin (reversible). */
export const hiddenSlugs = hiddenSlugsJson as string[];

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

const builtInOffices = [
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

export const offices = overrides.offices ?? builtInOffices;

const builtInStats = [
  { value: "1996", label: "In practice since" },
  { value: "7,000+", label: "Projects delivered" },
  { value: "3", label: "Offices — IRL & UK" },
];

export const stats = overrides.stats ?? builtInStats;

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

/**
 * Company history for the /history page ("reeling in the years").
 * [PLACEHOLDER] — milestones marked `confirm` are inferred from published
 * material and need AOCA sign-off; they will also want to add their own.
 */
export const timeline = [
  {
    year: "1996",
    title: "The beginning",
    text: "Aidan O'Connell & Associates is founded in Portlaoise — one engineer, a drawing board and a conviction that clients deserve consultants who take responsibility.",
    image: "/images/2026-08-aidan-on-computer-27th-march-1999.jpg",
  },
  {
    year: "2006",
    title: "A permanent home",
    text: "The practice moves to its current head office at Lismard House on the Timahoe Road, Portlaoise.",
    image: "/images/office-building.jpg",
  },
  {
    year: "2014",
    title: "Dublin calling",
    text: "A second office opens at Centrepoint Business Park, Clondalkin, to better serve the Eastern region — growing to offer the full range of engineering services along with pyrite investigation.",
    image: "/images/dublin-office.jpg",
  },
  {
    year: "2017",
    title: "Rebranded",
    // [PLACEHOLDER] year to be confirmed by Philip (Ciara, Sept 2026 notes)
    text: "AOCA rebranded to create a more inclusive identity that reflected the people and values behind the business. The new name represented the company's growth from a small regional consultancy into a national and international engineering practice.",
    image: "/images/2026-08-aoca-engineering-portlaoise-dbp-01-03-17-1-of-3-003.jpg",
    clipping: "/images/aoca-newspaper.jpg",
  },
  {
    year: "2016–2023",
    title: "The remediation years",
    text: "AOCA helps develop two NSAI National Standards for pyrite remediation and goes on to manage some of the largest residential remediation programmes in Ireland — while the practice itself keeps building.",
    image: "/images/2026-09-pyrite-infill.jpg",
  },
  {
    year: "2024",
    title: "Recognised as Best in Class",
    text: "Shortlisted at the Irish Building & Design Awards, and appointed Design Lead and Project Manager on the restoration of the historic Old Bank of Ireland Building in Tuam — converting it into modern offices for the Department of Social Protection.",
    image: "/images/ibda-finalist-2024.png",
  },
  {
    year: "2025",
    title: "Recognised with prestigious industry awards",
    text: "The Arklow Wastewater Treatment Plant is recognised with prestigious industry awards.",
    image: "/images/2025-09-arklow_case_study_featured_ojg6cb.webp",
  },
  {
    year: "2025",
    title: "A new chapter",
    text: "After nearly three decades, founder Aidan O'Connell hands the reins to a new generation of leadership as Philip O'Connell steps in as Managing Director.",
    image: "/images/aidan-philip-2025.jpg",
  },
  {
    year: "Today",
    title: "7,000 projects and counting",
    text: "A multidisciplinary team across Portlaoise, Dublin and Manchester, delivering nine expertise areas to clients across Ireland, the UK and Europe — with the same uncompromising standard as 1996.",
    image: "/images/2026-08-management-team-2025.jpg",
  },
];

const builtInTeam = [
  {
    name: "Philip O'Connell",
    role: "Managing Director",
    cred: "MIEI",
    photo: "/images/2025-11-153a3552.jpg",
    bio: "Over 11 years' experience in civil engineering, project management and fire safety consultancy, specialising in fire safety assessment and remediation of multi-unit residential developments. BEng (Hons) in Civil Engineering, MSc in Project Management, currently completing a Level 9 Certificate in Fire Safety. Member of Engineers Ireland and the Passive House Association of Ireland.",
  },
  {
    name: "Brian Byrne",
    role: "Director",
    cred: "FIEI",
    photo: "/images/2025-11-153a3905.jpg",
    bio: "Chartered Engineer with over 26 years' experience in civil and structural engineering. Leads the design of residential and commercial developments, with expertise in drainage, infrastructure and project delivery. An experienced forensic engineer and expert witness specialising in structural defects and insurance-related claims. Fellow of Engineers Ireland.",
  },
  {
    name: "Emmett O'Reilly",
    role: "Associate Director",
    cred: "FIEI",
    photo: "/images/2025-11-153a3630.jpg",
    bio: "Chartered Engineer with over 25 years' experience in civil and structural engineering, specialising in structural design and wind load analysis across residential, commercial and data centre projects. An experienced forensic engineer and expert witness on structural defects and insurance-related claims. Fellow of Engineers Ireland and an Ancillary Design Certifier.",
  },
  {
    name: "Colin Scott",
    role: "Associate Director",
    cred: "FIEI",
    photo: "/images/2025-11-153a3667-2.jpg",
    bio: "Chartered Engineer with over 25 years' experience in civil and structural engineering. Manages AOCA's Dublin office and leads major residential, commercial and remediation projects, including large-scale pyrite remediation programmes. Acts as an expert witness in engineering and construction disputes. Fellow of Engineers Ireland, with additional qualifications in renewable energy and construction law.",
  },
];

export const team = overrides.team ?? builtInTeam;

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string;
  image: string;
  gallery: string[];
  intro: string;
  /** image renders the section as a split text/photo row (copy-heavy pages) */
  sections: { heading: string; body: string; image?: string }[];
  /** heading shown above the condensed service-list block (copy-heavy pages) */
  sectionsLabel?: string;
  highlights: string[];
  video?: string; // optional in-page film (shown before the gallery)
  videoPoster?: string;
  draft?: boolean; // copy still awaited from AOCA — see PLACEHOLDERS.md
};

/**
 * The nine expertise areas from AOCA's "Expertise — NEW" deck (August 2026),
 * in the deck's overview order. Building Envelope Engineering is unchanged
 * ("no change to what is there already" per the deck); Building Surveying
 * copy was supplied but the deck still marks it work-in-progress.
 */
const builtInServices: Service[] = [
  {
    slug: "insurance-forensic-engineering",
    title: "Insurance & Forensic Engineering",
    icon: "scale",
    short:
      "A leading European provider of insurance and forensic engineering — several hundred insurance inspections carried out every year.",
    image: "/images/ins-flood-full.jpg",
    gallery: [],
    intro:
      "AOCA is recognised as a leading provider of expert insurance and forensic engineering services in Europe. We carry out several hundred insurance-related inspections annually, delivering clear, objective and technically robust reports for insurers, loss adjusters, legal teams and private clients. We cover Ireland, the UK and Europe, with active live cases all over the continent.",
    sections: [
      {
        heading: "Subsidence",
        body: "We regularly investigate subsidence-related claims, identifying the true cause of movement, assessing damage and recommending appropriate remediation. Our investigations may include trial holes, drainage surveys, monitoring and specialist testing.",
        image: "/images/2026-09-sec-ins-subsidence.jpg",
      },
      {
        heading: "Structural Damage",
        body: "AOCA investigates a wide range of building damage claims, from minor defects to major structural failures. Our focus is on establishing causation, extent of damage and compliance with policy definitions.",
        image: "/images/2026-09-sec-ins-structural-damage.jpg",
      },
      {
        heading: "Flooding",
        body: "We undertake detailed flood investigations to determine contributory factors, including site alterations, culverted watercourses and drainage failures. Our reports address both causation and remediation requirements.",
        image: "/images/2026-09-sec-ins-flooding.jpg",
      },
      {
        heading: "Fire Damage",
        body: "We assess fire-damaged buildings to determine structural integrity, repair feasibility and compliance with current regulations. Our inspections consider both visible damage and hidden structural implications, and our forensic fire investigation team also analyses scenes to determine the cause and mode of a fire.",
        image: "/images/2026-09-sec-ins-fire-damage.jpg",
      },
      {
        heading: "Storm Damage",
        body: "AOCA investigates storm-related damage, particularly wind-induced failures. Our assessments distinguish between genuine storm events and defects arising from poor workmanship or material failure.",
        image: "/images/2026-09-sec-ins-storm-damage.jpg",
      },
    ],
    highlights: [
      "Several hundred insurance inspections annually",
      "Subsidence & structural damage investigation",
      "Flood, fire & storm damage assessment",
      "Active cases across Ireland, the UK & Europe",
      "Clear, objective reports insurers can act on",
    ],
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering / Built Environment",
    icon: "route",
    short:
      "Roads, active travel, cut/fill, drainage, water supply and geotechnics — the infrastructure that makes development possible.",
    image: "/images/2026-02-dji_20250526051209_0006_d.jpg",
    gallery: [],
    intro:
      "Our role is central to ensuring the safe, timely and well-resourced completion of projects — from feasibility, pre-planning and Uisce Éireann liaison through to handover — on new development and upgrade or retrofit works, across sustainable design and inspection of civil infrastructure, roads and active travel, waste management and geotechnical engineering. Our philosophy at all times is to meet the design brief by producing the most cost-effective and appropriate construction solution.",
    sections: [
      {
        heading: "Roads & Infrastructure",
        body: "Road design, DMURS-compliant street and active travel design, Road Safety Audits, and Traffic and Transport Assessments — from residential estate roads and junctions through to strategic infrastructure delivered with Local Authorities.",
        image: "/images/civil-roads.jpg",
      },
      {
        heading: "Surface Water & Sustainable Drainage",
        body: "Sustainable collection and discharge of surface water run-off from the built environment is an essential element in delivering sustainable development. We design Nature Based Solutions and SuDS-led drainage strategies that enhance biodiversity and amenity value, satisfy planning authorities and perform over the life of the development — including blue and green roofs designed with architects as part of the sustainable drainage strategy.",
        image: "/images/civil-suds.jpg",
      },
      {
        heading: "Flood Risk Assessment",
        body: "Flood Risk Assessments, flood modelling and Surface Water Management Plans are developed to reduce flood risk to developments and their environs into the future with our changing climate.",
        image: "/images/civil-flood-risk.jpg",
      },
      {
        heading: "Pumping Stations",
        body: "Where gravity drainage is not feasible, AOCA designs and oversees the installation of foul water pumping stations tailored to the scale and operational needs of each development — from small residential schemes to large multi-unit developments. We work closely with local authorities and specialist suppliers to ensure reliable operation, resilience and long-term maintainability of pumping infrastructure.",
        image: "/images/civil-pumping-stations.jpg",
      },
      {
        heading: "Geotechnical Engineering",
        body: "We provide a full geotechnical design and consultation service — utilities and topographical surveys, infiltration tests, CBR tests, boreholes, in-situ soil sampling, laboratory testing and trial holes — because understanding the ground early is the cheapest risk management a project can buy.",
        image: "/images/2026-08-geotechnical-engineering.jpg",
      },
    ],
    highlights: [
      "Road & active travel design to DMURS / TII standards",
      "Road Safety Audits & Traffic and Transport Assessments",
      "Nature-based SuDS strategies, blue & green roofs",
      "Flood risk assessment & flood modelling",
      "Foul water pumping stations",
      "Geotechnical investigation & testing",
    ],
  },
  {
    slug: "structural-engineering",
    title: "Structural Engineering",
    icon: "building",
    short:
      "Structural design and inspection across the commercial, industrial, residential and community sectors — in Ireland, the UK and Europe.",
    image: "/images/2026-02-dji_20250601131323_0012_d.jpg",
    gallery: [],
    intro:
      "AOCA delivers structural engineering solutions that combine technical excellence with practical construction insight. We provide full structural design and inspection services across the commercial, industrial, residential and community sectors. Our engineers are fully conversant with the Eurocodes and current building regulations, enabling us to develop efficient, buildable and economical structural solutions tailored to each project — with projects carried out across multiple countries including Ireland, the UK and Europe.",
    sections: [
      {
        heading: "BIM",
        body: "BIM is embedded in our engineering workflows, supporting coordinated, efficient and accurate design delivery. Our engineers use BIM tools daily to develop intelligent 3D models, coordinate structural elements with other disciplines, identify clashes early, streamline design changes and produce clear, consistent information throughout the project lifecycle for our clients.",
        image: "/images/structural-bim.jpg",
      },
      {
        heading: "Structural Condition Assessments",
        body: "Our Structural Condition Assessments provide a detailed evaluation of the condition, integrity and performance of existing buildings and structures. We identify defects, deterioration and potential structural risks, and provide clear recommendations for repair, remediation or further investigation — helping clients make informed decisions, maintain safety and compliance, and extend the service life of their assets.",
        image: "/images/structural-condition.jpg",
      },
      {
        heading: "Steel & Concrete Design",
        body: "We provide structural design expertise across both steel and reinforced concrete construction, delivering safe, efficient and practical solutions for projects of all scales. Our engineers consider buildability, economy, durability and long-term performance from the outset, producing coordinated designs that meet regulatory requirements while responding to the specific demands of each project.",
        image: "/images/structural-steel-concrete.jpg",
      },
      {
        heading: "Modern Methods of Construction (MMC)",
        body: "We support Modern Methods of Construction manufacturers in developing robust, compliant and certifiable structural systems. Our experience includes timber frame, light-gauge steel and other innovative construction systems, providing structural design and technical documentation for NSAI Agrément certification and compliance with Part D of the Building Regulations. We work closely with manufacturers to resolve technical issues early and help achieve a smooth, successful certification process.",
        image: "/images/structural-mmc.jpg",
      },
    ],
    highlights: [
      "Structural design to the Eurocodes",
      "BIM-embedded design workflows",
      "Structural condition assessments",
      "Steel & reinforced concrete design",
      "MMC systems & NSAI Agrément certification support",
    ],
  },
  {
    slug: "fire-safety-disability-access",
    title: "Fire Safety & Disability Access",
    icon: "flame",
    short:
      "Specialist fire safety and accessibility consultancy through Fire Safety Consultants — our joint venture with OCF.",
    image: "/images/fs-apartments.jpg",
    gallery: [],
    intro:
      "AOCA, in conjunction with OCF, has established Fire Safety Consultants to pool our resources and expertise and provide specialist fire safety and accessibility consultancy services. Fire Safety Consultants brings together internationally recognised expertise in fire engineering, fire safety compliance, accessibility, inspection, due diligence and structural fire engineering. For specialist fire safety services, please visit the Fire Safety Consultants website.",
    sections: [
      {
        heading: "Fire Engineering & Design",
        body: "Performance-based and prescriptive fire safety design for new and existing buildings; design and review of fire detection and alarm systems for compliance and life safety performance; and emergency lighting design and review to support safe escape in the event of fire or power failure.",
      },
      {
        heading: "Review, Assessment & Inspection",
        body: "Review of building designs and existing buildings to identify fire safety risks and compliance issues; fire risk assessments covering hazards, existing measures and practical risk-reduction recommendations; and fire safety inspections of buildings, fire doors, emergency lighting, alarm systems and passive fire protection.",
      },
      {
        heading: "Structural Fire Engineering & Passive Protection",
        body: "Specialist assessment of structural behaviour in fire — including steel, concrete, timber and composite structures — together with review and advice on fire stopping, compartmentation, cavity barriers, fire doors and structural fire protection.",
      },
      {
        heading: "Accessibility Consultancy",
        body: "Advice on accessibility, inclusive design and compliance with relevant accessibility requirements — designing buildings everyone can use.",
      },
      {
        heading: "Due Diligence & Third-Party Checking",
        body: "Independent fire safety reviews for acquisitions, developments, design teams, contractors and building owners.",
      },
    ],
    highlights: [
      "Fire engineering design — performance-based & prescriptive",
      "Fire risk assessments & compliance reviews",
      "Fire detection, alarm & emergency lighting design",
      "Structural fire engineering & passive fire protection",
      "Accessibility & inclusive design consultancy",
    ],
  },
  {
    slug: "project-construction-management",
    title: "Project & Construction Management",
    icon: "clipboard",
    short:
      "Engineering-led project management from concept to completion — including Ireland's largest residential remediation programmes.",
    image: "/images/2026-05-team-meeting-2.webp",
    gallery: [
      "/images/2026-08-checking-drawings-2.jpg",
      "/images/2026-08-site-image-1.jpg",
      "/images/2026-08-pamela-on-site.jpg",
      "/images/2026-02-img_20240212_125033.jpg",
      "/images/2026-02-20240708_132741914_ios.jpg",
      "/images/2026-08-team-shot-3.jpg",
    ],
    video: "/video/expertise-pm.mp4",
    videoPoster: "/images/2026-08-pamela-on-site.jpg",
    sectionsLabel: "Project Management Services",
    intro:
      "AOCA provides project management services for construction, development, remediation and technical engineering projects across the residential, commercial, industrial, healthcare and public sectors. Our approach is built around technical understanding, clear communication and practical delivery: we act as the client's representative, coordinating design teams, contractors, consultants and statutory processes to keep projects moving, risks managed and decisions clearly documented.",
    sections: [
      {
        heading: "An Engineering-Led Perspective",
        body: "We bring an engineering-led perspective to project management. This allows us to identify technical issues early, challenge design assumptions, manage programme risks and support clients through planning, procurement, construction and handover. AOCA has particular expertise in building defect remediation and has managed some of the largest residential remediation programmes in Ireland, including major pyrite remediation projects — experience that brings a strong understanding of complex stakeholder management, phased construction works, occupied buildings, technical investigations, statutory compliance, cost control and programme delivery.",
        image: "/images/2026-08-checking-drawings.jpg",
      },
      {
        heading: "Strategic Project Advice",
        body: "We help clients define the project brief, key objectives, budget priorities, programme requirements and delivery risks at an early stage. This ensures the project starts with a clear direction and a realistic route to completion.",
      },
      {
        heading: "Design Team Coordination",
        body: "AOCA coordinates architects, engineers, fire consultants, PSDP, Assigned Certifiers, contractors and specialist consultants to ensure the design process is properly managed and aligned with the client's objectives.",
      },
      {
        heading: "Building Defect Remediation",
        body: "AOCA specialises in the management of building defect remediation projects, including pyrite, fire safety defects, water ingress, structural defects, façade defects and legacy construction issues. We manage the process from investigation and scope development through to design, procurement, site works, stakeholder communication and close-out.",
      },
      {
        heading: "Planning & Statutory Process Management",
        body: "We manage and coordinate planning applications, Further Information responses, Fire Safety Certificates, Disability Access Certificates, BCAR requirements and other statutory approvals required to progress a project.",
      },
      {
        heading: "Procurement & Tender Management",
        body: "We advise on procurement strategy, prepare tender documentation, coordinate tender queries, review submissions and support clients through contractor selection and appointment.",
      },
      {
        heading: "Employer's Representative",
        body: "AOCA can act as the client's representative during construction, administering the contract, managing communications, chairing meetings, tracking progress and protecting the client's interests.",
      },
      {
        heading: "Programme, Cost, Risk & Change Management",
        body: "We prepare, review and monitor project programmes to ensure key milestones are understood, tracked and managed throughout the project lifecycle — and we help clients identify and manage project risks, review change requests, track decisions and maintain control over scope, programme and budget.",
      },
      {
        heading: "Site Monitoring & Progress Reporting",
        body: "AOCA provides regular site inspections, progress reviews and client reporting to ensure works are progressing in line with the design, specification, programme and statutory requirements.",
      },
      {
        heading: "Technical Problem Solving",
        body: "Our multidisciplinary engineering background allows us to identify and resolve technical issues quickly, particularly where structural, fire safety, building surveying, façade, water ingress or compliance matters arise during the project.",
      },
      {
        heading: "Handover & Close-Out",
        body: "We manage practical completion, snagging, certification, handover documentation and close-out requirements to support a smooth transition from construction to occupation or operation.",
      },
      {
        heading: "Why AOCA",
        body: "AOCA combines project management experience with in-house civil, structural, fire engineering and building surveying expertise. This gives our clients a practical, technically informed project management service that goes beyond administration: we understand the design, the statutory process, the construction risks and the commercial pressures involved in delivering successful projects. Our experience in large-scale remediation also means we understand the importance of communication, sequencing, resident liaison, risk management and maintaining control on complex live projects.",
        image: "/images/2026-08-team-meeting-1.jpg",
      },
      {
        heading: "Talk to AOCA",
        body: "Whether you are planning a new development, managing a refurbishment, delivering a remediation project or progressing a statutory approval, AOCA can provide clear project leadership from start to finish.",
      },
    ],
    highlights: [
      "Client representative & employer's agent",
      "Ireland's largest residential remediation programmes",
      "Planning & statutory process management",
      "Procurement & tender management",
      "Programme, cost & risk management",
      "Site monitoring & progress reporting",
    ],
  },
  {
    slug: "consulting-engineering",
    title: "Consulting Engineering",
    icon: "briefcase",
    short:
      "Remediation, latent defect investigation, expert witness, planning and PSDP services — built on over 30 years of practice.",
    image: "/images/2026-08-philip-and-brian-edit.jpg",
    gallery: [],
    intro:
      "AOCA's consulting engineering team supports clients across remediation, latent defects, litigation, planning and health and safety — delivering technically sound, site-specific solutions informed by decades of hands-on engineering practice in Ireland and the UK.",
    sections: [
      {
        heading: "Remediation & Reinstatement",
        body: "Our team has extensive experience assessing and remediating damaged or defective buildings, including pyrite-affected homes, fire-damaged structures, flood-impacted properties and subsidence cases. We deliver technically sound, site-specific solutions informed by decades of hands-on engineering practice and knowledge of local conditions.",
        image: "/images/2026-09-pyrite-infill.jpg",
      },
      {
        heading: "Construction Latent Defect Remediation",
        body: "We have over 30 years of latent defect investigation and remediation experience in Ireland and the UK. AOCA Engineering Consultants were the sole engineering consultant for Liberty Syndicates and their Premier Guarantee LDI policy, managing the full investigation and remediation of over 1,000 residential homes. Currently, through our sister company Fire Safety Consultants, AOCA is remediating apartment schemes throughout Ireland via the Apartment Remediation Defect Scheme — and from our UK office in Manchester we have managed over £200m of latent defect remediation projects, from investigation, scope of works and design through to construction and handover.",
      },
      {
        heading: "Expert Witness Services for Litigation",
        body: "We regularly provide expert witness services, drawing on years of direct project experience. From subsidence and structural failures to insurance claims and dispute resolution, our engineers offer clear, objective and practical technical evidence that reflects real-world engineering challenges and solutions.",
      },
      {
        heading: "Planning & Development Services",
        body: "AOCA has significant experience in securing planning permission and managing the full planning application process, including site appraisal, surveys, environmental coordination and regulatory compliance.",
      },
      {
        heading: "Surveys & Mapping",
        body: "We provide land surveying, mapping, setting-out and boundary services to support planning, design and construction activities.",
        image: "/images/2026-05-geo.jpg",
      },
      {
        heading: "Project Supervisor Design Process (PSDP)",
        body: "We regularly provide health and safety consultancy as well as PSDP services for projects we are involved in. Many of our staff have carried out training through the ACEI and are competent to fulfil this very important and legally required role.",
      },
    ],
    highlights: [
      "Remediation of pyrite, fire, flood & subsidence damage",
      "1,000+ homes remediated under the Liberty Syndicates LDI policy",
      "£200m+ of latent defect projects via our Manchester office",
      "Expert witness for litigation & disputes",
      "Planning applications & development services",
      "PSDP & health and safety consultancy",
    ],
  },
  {
    slug: "building-envelope-engineering",
    title: "Building Envelope Engineering",
    icon: "layers",
    short:
      "Roof and façade engineering for data centre, pharmaceutical and mission-critical buildings across Europe.",
    image: "/images/arklow-fins.jpg",
    gallery: [],
    intro:
      "AOCA provides specialist building envelope engineering services for data centre, pharmaceutical, industrial and other mission-critical buildings. Our role is to ensure that roof and façade systems are structurally sound, fire safe, moisture robust, thermally efficient and compliant with the project specification. We support clients, design teams and specialist contractors through design, review and site inspection services.",
    sections: [
      {
        heading: "Design & Analysis",
        body: "Roof and façade structural design; wind load design to Eurocode and FM Global requirements across multiple European jurisdictions; and finite element analysis for bespoke details and complex geometry.",
        image: "/images/2026-02-20250402_120133.jpg",
      },
      {
        heading: "Performance & Compliance",
        body: "Fire engineering review of façade, roof and cavity barrier systems; condensation risk analysis and hygrothermal modelling; U-value, thermal bridge and energy performance assessments; and architectural engineering specification advice.",
        image: "/images/2026-02-20251009_114732.jpg",
      },
      {
        heading: "Assurance On Site",
        body: "Design audits, peer reviews and compliance checks; BIM coordination and technical detailing support; and third-party site inspections and envelope audits — the role we perform on Dublin's Glass Bottle Site regeneration.",
      },
    ],
    highlights: [
      "Wind load design to Eurocode & FM Global",
      "Finite element analysis of complex details",
      "Condensation risk & hygrothermal modelling",
      "Façade & roof fire engineering review",
      "Third-party envelope inspections & audits",
    ],
  },
  {
    slug: "building-surveying",
    title: "Building Surveying",
    icon: "scan",
    short:
      "Fitout and refurbishment, digital and drone surveys, legal mapping, thermal imaging and moisture investigation.",
    image: "/images/2026-02-dji_0871.jpg",
    gallery: [],
    intro:
      "From fitout and refurbishment to digital surveying and moisture investigation, AOCA's building surveying team gives owners, occupiers and investors a clear technical picture of the buildings they hold — using modern digital survey tools alongside three decades of engineering judgment.",
    sections: [
      {
        heading: "Fitout & Refurbishment",
        body: "We deliver practical engineering support for fitout and refurbishment projects, balancing compliance, buildability, existing constraints, programme requirements and long-term performance.",
      },
      {
        heading: "Digital Surveying",
        body: "We use digital surveying technologies to capture accurate building data, improving design coordination, condition assessment, measurement, documentation and project efficiency.",
        image: "/images/surveying-digital.jpg",
      },
      {
        heading: "Legal Mapping",
        body: "We prepare accurate legal mapping for property, planning and land matters, supporting boundary identification, title registration, conveyancing and development requirements.",
      },
      {
        heading: "Building Thermal Imaging",
        body: "We use thermal imaging to investigate heat loss, insulation defects, thermal bridging, moisture patterns and building envelope performance across properties.",
      },
      {
        heading: "Drone Surveys",
        body: "Our drone surveys provide safe, efficient access to roofs, façades and difficult locations, capturing high-quality visual information for assessment purposes.",
        image: "/images/surveying-drone.jpg",
      },
      {
        heading: "Damp & Moisture Surveys",
        body: "We investigate damp and moisture problems using targeted surveys, testing and analysis to identify causes and recommend appropriate remedial solutions.",
        image: "/images/surveying-damp.jpg",
      },
    ],
    highlights: [
      "Fitout & refurbishment",
      "Digital surveying",
      "Legal mapping",
      "Building thermal imaging",
      "Drone surveys",
      "Damp & moisture surveys",
    ],
  },
  {
    slug: "assigned-certifier",
    title: "Assigned Certifier & Regulatory Compliance",
    icon: "shield",
    short:
      "Assigned Certifier under BCAR, independent third-party and LDI inspections, technical due diligence and design review.",
    image: "/images/ac-housing.jpg",
    gallery: [],
    intro:
      "Having managed complex projects across multiple sectors, we offer hands-on guidance to achieve full regulatory compliance in Ireland, the UK and Europe. Our team coordinates with design teams and local authorities to navigate building control processes efficiently, ensuring timely certification and risk mitigation.",
    sections: [
      {
        heading: "Assigned Certifier Services",
        body: "We regularly act as Assigned Certifier under the BCAR regime on a wide range of projects, from multi-unit housing to large commercial developments. Our practical experience of the Building Control Management System and the Code of Practice for Inspecting and Certifying Buildings and Works ensures robust oversight of design and construction, allowing projects to meet statutory requirements while keeping construction schedules on track.",
      },
      {
        heading: "Third-Party Inspections",
        body: "We offer independent third-party inspections to main contractors and specialist subcontractors to verify that construction work meets specified standards and regulations. Our independent and impartial assessments help identify any issues early, ensuring quality and compliance throughout the project lifecycle.",
      },
      {
        heading: "LDI Inspections",
        body: "AOCA has in the past managed the entire LDI portfolio for Liberty Syndicates through its sister company National Property Audit Services (NPAS). We still routinely carry out detailed evaluations to support insurance claims and risk management — inspecting construction work to identify potential issues and prevent them from turning into future claims for underwriters.",
      },
      {
        heading: "Technical Due Diligence & Design Review",
        body: "Our Technical Due Diligence and Design Review services provide independent, expert assessment of architectural and engineering designs throughout the construction lifecycle. We evaluate design feasibility, regulatory compliance, technical performance and safety, while identifying potential risks, deficiencies and opportunities for improvement. Our practical, multidisciplinary approach provides clients with the clear technical insight needed to make informed decisions, mitigate risk and optimise project outcomes.",
      },
    ],
    highlights: [
      "Assigned Certifier under BCAR (S.I. 9 of 2014)",
      "Building Control Management System expertise",
      "Independent third-party inspections",
      "LDI inspections for underwriters",
      "Technical due diligence & design review",
    ],
  },
];

/**
 * Expertise pages edited or added via /admin land in content/services.json
 * and override built-in entries by slug; hidden slugs are removed site-wide.
 */
export const allServices: Service[] = [
  ...(uploadedServices as Service[]),
  ...builtInServices.filter(
    (b) => !(uploadedServices as Service[]).some((u) => u.slug === b.slug)
  ),
];

export const services: Service[] = allServices.filter(
  (s) => !hiddenSlugs.includes(s.slug)
);

/** Accreditations & certifications — exact wording from AOCA, July 2026. */
export const accreditations = [
  "Member of the Institute of Fire Engineers",
  "Corporate Member of Engineers Ireland",
  "ISO9001 Certification with NSAI",
  "Member of Passive House Association of Ireland",
  "Green Cert Registered",
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
    image: "/images/2026-08-commercial-and-retail.jpg",
  },
  {
    slug: "education-government",
    title: "Education",
    blurb: "Trusted engineering for schools and places of learning.",
    image: "/images/2026-08-education.jpg",
  },
  {
    slug: "infrastructure-government",
    title: "Infrastructure & Government",
    blurb: "Delivering vital public infrastructure and civic buildings.",
    image: "/images/2026-08-infrastructure-and-government.jpg",
  },
  {
    slug: "hospitality-leisure-community",
    title: "Hospitality, Leisure & Community",
    blurb: "Engineering welcoming, high-performance spaces for hotels, leisure and community use.",
    image: "/images/2026-08-hospitality-leisure-and-community.jpg",
  },
  {
    slug: "industrial-data-centres",
    title: "Industrial & Data Centres",
    blurb: "Delivering reliable, precision engineering for industrial and mission-critical facilities.",
    image: "/images/2026-08-industrial-and-data-centres.jpg",
  },
  {
    slug: "residential",
    title: "Residential",
    blurb: "Expert engineering for homes and residential developments of every scale.",
    image: "/images/sector-residential.avif",
  },
  {
    slug: "life-sciences-healthcare",
    title: "Life Sciences & Healthcare",
    blurb: "Specialist engineering for healthcare and life science environments.",
    image: "/images/2026-08-life-science-and-health-care.jpg",
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
  servicesProvided?: string[]; // expertise slugs (set by /admin uploads)
  servicesText?: string[]; // client-written "Services Provided" paragraphs
  video?: string; // optional case-study film (add via David — needs encoding)
  videoPoster?: string;
};

const P = "/images/";

const builtInProjects: Project[] = [
  // ---- Commercial & Retail -------------------------------------------------
  {
    slug: "portlaoise-retail-park",
    video: "/video/projects/portlaoise-retail-park.mp4",
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
      P + "2026-08-feature-image-1030x485.jpg",
    ],
    summary:
      "Full civil and structural design, supervision and certification for one of AOCA's flagship retail and road-infrastructure projects.",
    body: [
      "AOCA delivered the full civil and structural engineering design, supervision and certification for the Portlaoise Retail Park development. The project included a section of the Portlaoise Southern Orbital Route with two major roundabouts and required extensive coordination with Laois County Council, Inland Fisheries and other stakeholders.",
      "Significant engineering challenges included a 4-metre retaining wall adjacent to the Triogue River, temporary river diversion works and oversized attenuation infrastructure. Extending to 11,748 sq m (126,450 sq ft), the completed development remains one of AOCA's flagship projects and is now a key transport and retail destination within Portlaoise.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, site supervision, construction certification, road and infrastructure design, retaining wall design and stormwater attenuation design.",
    ],
    featured: true,
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
      P + "2026-08-whatsapp-image-2026-07-02-at-12-40-35-10.jpg",
    ],
    summary:
      "Removal and replacement of defective external stone cladding — project management and façade engineering for an important community institution.",
    body: [
      "AOCA was appointed to manage the removal and replacement of the external stone cladding at the People First Credit Union following the identification of defects in the original cladding fixings, which had resulted in several stone panels becoming dislodged and posing a public safety risk.",
      "Acting as Project Managers and Façade Engineers, we coordinated the works between the client and contractor, supervised construction activities, monitored quality and programme, and ensured the replacement cladding system was installed to the highest safety and performance standards.",
      "The completed project delivered a secure, long-term solution while allowing this important community facility to continue serving its members with confidence. AOCA was particularly proud to support the Credit Union, located just one mile from our Head Office.",
    ],
    servicesText: [
      "Project management, construction supervision, quality control and inspection, construction coordination, contract administration, construction certification and façade engineering.",
    ],
  },

  // ---- Education -----------------------------------------------------------
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
    summary:
      "New ASD Unit extension delivered through planning, tender and construction — modern specialist facilities for students with additional needs.",
    body: [
      "AOCA provided full Civil and Structural Engineering services throughout the Planning, Tender and Construction stages for the delivery of a new ASD Unit extension to an existing school. Designed by McLoughlin Architecture, the development provides modern specialist educational facilities, including multi-sensory and safe spaces, a central activity hall, sensory gardens and soft play areas to support students with additional needs.",
      "The approximately 480 m² extension was constructed on precast piles with reinforced concrete ground beams and suspended precast ground floors. The superstructure comprised traditional masonry construction with structural steel supports and prefabricated timber roof trusses, delivering a robust and efficient building solution.",
      "The project also included significant civil engineering works, comprising a new watermain connection, a new wastewater treatment system, sustainable stormwater attenuation infrastructure and additional car parking facilities, ensuring the development was fully serviced and integrated with the existing school campus.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, planning stage services, tender stage services, construction stage services and construction certification.",
    ],
  },
  {
    slug: "scoil-molaise-carlow",
    video: "/video/projects/scoil-molaise-carlow.mp4",
    title: "Scoil Molaise, Carlow",
    sector: "education-government",
    location: "Co. Carlow",
    thumb: P + "2026-08-dji-20250429115014-0096-d.jpg",
    hero: P + "2026-08-dji-20250429114041-0088-d.jpg",
    gallery: [
      P + "2026-08-dji-20250429115014-0096-d.jpg",
      P + "2026-08-dji-20250429120311-0108-d.jpg",
      P + "2026-08-shared-image-4.jpg",
      P + "2026-08-shared-image-7.jpg",
    ],
    summary:
      "Two-storey ASD Unit extension — full civil and structural engineering from planning through construction certification.",
    body: [
      "As part of a wider Design Team, AOCA provided full Civil and Structural Engineering services throughout the Planning, Tender and Construction stages for the delivery of a new ASD Unit extension to this existing school. Designed by McLoughlin Architecture, the development provides modern specialist educational facilities, including classrooms, multi-sensory and safe spaces, a central activity hall and soft play area to support students with additional needs.",
      "The approximately 359 m² extension was constructed utilising traditional concrete strip foundations and solid ground bearing floors. The superstructure comprised wind posts incorporated into traditional masonry construction with additional steel framed supports to a two-storey structure, precast suspended upper-level floors and a combination of prefabricated metal deck, timber truss and flat roofed structures, delivering a robust and efficient building solution.",
      "The project also included significant civil engineering works, comprising a new wastewater treatment system, sustainable stormwater attenuation infrastructure and accessible car parking facilities, ensuring the development was fully serviced and integrated with the existing school campus.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, planning stage services, tender stage services, construction stage services and construction certification.",
    ],
  },
  {
    slug: "st-patricks-national-school-newbridge-co-kildare",
    video: "/video/projects/st-patricks-national-school-newbridge-co-kildare.mp4",
    title: "St. Patrick's National School, Newbridge",
    sector: "education-government",
    location: "Newbridge, Co. Kildare",
    thumb: P + "2026-02-img_3012-1.jpg",
    hero: P + "2026-02-st-patricks-ns.jpg",
    gallery: [
      P + "2026-02-st-patricks-ns_1.jpg",
      P + "2026-08-dji-0213.jpg",
      P + "2026-02-img_3094.jpg",
      P + "2026-08-img-3054.jpg",
      P + "2026-02-img_5408.jpg",
      P + "2026-02-img_6858.jpg",
      P + "2026-02-img_7462.jpg",
      P + "2026-02-img_7535.jpg",
      P + "2026-02-media-3.jpg",
    ],
    summary:
      "School extension around a live campus — SEN classroom, SET rooms and library delivered with the wider design team.",
    body: [
      "AOCA provided full Civil and Structural Engineering services throughout the Planning, Tender and Construction stages for this extension to an existing school. Working alongside McLoughlin Architecture and the wider design team, the project delivered modern educational facilities, including a new SEN classroom, two SET rooms, a library/resource room and a boiler room, together with alterations to the existing school layout, revised car parking arrangements and a secure soft play area.",
      "The 204 m² extension was constructed using traditional masonry with structural steel frame supports, incorporating a steel portal frame to create the large open-span SEN classroom. The project also included the installation of a new wastewater pump station, sustainable stormwater drainage infrastructure and associated external works, ensuring the development was fully integrated with the existing school campus.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, planning stage services, tender stage services, construction stage services and construction certification.",
    ],
  },

  // ---- Infrastructure & Government ----------------------------------------
  {
    slug: "stradbally-fire-station",
    title: "Stradbally Fire Station",
    sector: "infrastructure-government",
    location: "Stradbally, Co. Laois",
    thumb: P + "2026-08-stradbally-fire-station-new-0.jpg",
    hero: P + "2026-08-stradbally-fire-station-new-0.jpg",
    gallery: [P + "2026-08-24-nod-node-architects-fire-station-stradbally.jpg"],
    summary:
      "Civil and structural engineering within the multidisciplinary team delivering the new €3.2m two-bay fire station for Laois Fire & Rescue.",
    body: [
      "AOCA Engineering Consultants formed part of the multidisciplinary design team delivering the new €3.2 million, two-bay Fire Station in Stradbally. Working alongside the lead architects and wider consultant team, AOCA provided Civil and Structural Engineering services to support the development of this modern emergency services facility.",
      "Our role included the design and coordination of the civil and structural engineering elements, ensuring the building and associated infrastructure met the operational requirements of Laois Fire & Rescue Service while complying with current safety, regulatory and engineering standards.",
      "The completed fire station provides a purpose-built, state-of-the-art facility designed to support emergency response operations and enhance resilience for the local community. AOCA is proud to have contributed to the successful delivery of this important public infrastructure project.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, multidisciplinary design coordination, planning and design stage services, construction stage engineering support and construction certification.",
    ],
  },
  {
    slug: "arklow-water-treatment-plant",
    title: "Arklow Water Treatment Plant",
    sector: "infrastructure-government",
    location: "Arklow, Co. Wicklow",
    thumb: P + "2026-02-thumb-1.jpg",
    hero: P + "arklow-aerial-2026.jpg",
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
      "Structural design of the fixing system for the architectural fin louvres on Arklow's award-winning wastewater treatment plant.",
    body: [
      "AOCA was appointed to provide the structural engineering calculations and design for the fixing system supporting the architectural fin louvres to the exterior of the award-winning Arklow Wastewater Treatment Plant. The striking louvre façade transforms the treatment facility into a landmark structure, combining architectural vision with robust engineering design.",
      "The project presented several engineering challenges, including the complex geometry of the façade, the exposed coastal location and the height of the building. Careful consideration was given to the structural performance of the fixing system to ensure it could safely withstand environmental loading while maintaining the architectural intent. AOCA worked closely with the project team to develop a practical and reliable solution for installation.",
      "AOCA is proud to have contributed to the successful delivery of this major infrastructure project, helping create a facility that not only serves an essential public function but also sets a new benchmark for the architectural design of utility buildings.",
    ],
    servicesText: [
      "Structural engineering design, structural calculations, façade support design and fixing system design.",
    ],
    featured: true,
  },
  {
    slug: "sdcc-dodder-valley-pavilions",
    title: "SDCC Dodder Valley Pavilions",
    sector: "infrastructure-government",
    location: "Dodder Valley, Dublin",
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
      P + "2026-08-corkagh-park-aerial-view.jpg",
      P + "2026-08-dodder-valley-pavilion.jpg",
    ],
    summary:
      "Design & Build sports pavilion for South Dublin County Council — bespoke foundations and SuDS drainage on challenging ground.",
    body: [
      "AOCA, in collaboration with JSD Contracting, delivered the civil and structural engineering design for a new sports pavilion on behalf of South Dublin County Council at Dodder Valley. Procured as a Design & Build project, the development provides modern changing and support facilities for the numerous sports teams using the adjacent playing pitches.",
      "The project presented several engineering challenges, including poor ground conditions across part of the building footprint, requiring the design of a bespoke foundation solution to ensure long-term structural performance. AOCA also designed a sustainable stormwater drainage system incorporating attenuation swales adjacent to the site entrance and car park, providing an environmentally responsible drainage solution while meeting the project's performance requirements.",
      "The completed pavilion delivers high-quality changing facilities with secure electronic access, providing a modern and efficient amenity for local sports clubs and the wider community.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, foundation design, sustainable drainage (SuDS) design, planning and construction stage services and construction certification.",
    ],
  },
  {
    slug: "legal-aid-board",
    title: "Legal Aid Board Offices",
    sector: "infrastructure-government",
    location: "Various locations throughout Ireland",
    thumb: P + "2026-02-legal-aid-thumb.jpg",
    hero: P + "2026-02-img_2431.jpg",
    gallery: [
      P + "2026-02-img_0582.jpg",
      P + "2026-02-img_0597.jpg",
      P + "2026-02-img_0598.jpg",
      P + "2026-08-img-1976.jpg",
      P + "2026-08-img-4114.jpg",
      P + "2026-02-img_2641.jpg",
      P + "2026-02-img_4590.jpg",
      P + "2026-02-img_8875.jpg",
      P + "2026-08-leixlip.jpg",
    ],
    summary:
      "Project management and structural engineering for the design and fit-out of Legal Aid Board offices across Ireland.",
    body: [
      "AOCA has provided Project Management and Structural Engineering services for the design and fit-out of Legal Aid Board office facilities across Ireland. Our role has included the coordination and delivery of modern office environments incorporating mechanical and electrical upgrades, lighting systems and high-quality interior finishes.",
      "At the Legal Aid Board Ballymun office, AOCA project-managed the works and acted as Structural Engineers for the design and fit-out of a 6,400 sq ft office facility. The project included the coordination of air conditioning systems, lighting upgrades and internal finishes to create a functional and efficient workplace environment.",
      "Through our experience in delivering office fit-out projects nationwide, AOCA provides integrated project management and engineering expertise, ensuring works are completed to the required standards while meeting client operational requirements.",
    ],
    servicesText: [
      "Project management, structural engineering design, office fit-out design, building services coordination, construction supervision, quality control and inspection, employer's representative and quantity surveying.",
    ],
  },
  {
    slug: "rosslare-europort",
    title: "Rosslare Europort",
    sector: "infrastructure-government",
    location: "Rosslare, Co. Wexford",
    thumb: P + "2026-08-6f50075aef2b6dae76ca37a08c0c4d45-1.jpg",
    hero: P + "2026-08-maxresdefault.jpg",
    gallery: [P + "2026-08-6f50075aef2b6dae76ca37a08c0c4d45-1.jpg"],
    summary:
      "Engineering services at Ireland's gateway port to Europe.",
    body: [],
  },

  // ---- Hospitality, Leisure & Community -----------------------------------
  {
    slug: "equine-facility",
    title: "South Dublin Equestrian Facility",
    sector: "hospitality-leisure-community",
    location: "South Dublin",
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
      "Design & Build equestrian centre for South Dublin County Council — stables, arena and paddocks delivered within budget and programme.",
    body: [
      "AOCA delivered the Civil and Structural Engineering input for this Design & Build project in collaboration with JSD Construction on behalf of South Dublin County Council. Our role was to develop the architect's design proposals into a practical, buildable solution that could be delivered within the available budget and programme constraints.",
      "The completed facility comprises a purpose-built stable block incorporating facilities for horse owners and handlers, together with a large tarmac surfaced yard, cast-in-situ reinforced concrete dungstead, jumping arena and a number of dedicated paddock areas. AOCA provided engineering solutions to ensure the development was functional, durable and suited to the operational requirements of the facility.",
      "The project required careful coordination between the design team, contractor and client to successfully translate the initial concept into a fully operational equestrian centre. The completed facility provides a safe and modern environment for horses while offering a valuable community resource for local residents, particularly young people with a strong interest in equestrian activities.",
      "AOCA was delighted to contribute to a project that delivers significant social and recreational benefits to the surrounding area and supports continued community engagement and development.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, design and build coordination, construction management support, site infrastructure design, budget and programme optimisation and construction certification.",
    ],
  },
  {
    slug: "domestic-violence-refuge",
    title: "Domestic Violence Refuge",
    sector: "hospitality-leisure-community",
    location: "Dublin",
    thumb: P + "2026-08-20260304-112456020-ios.jpg",
    hero: P + "2026-08-20260304-112456020-ios.jpg",
    gallery: [
      P + "2026-08-img-1528.jpg",
      P + "2026-08-img-1529.jpg",
      P + "2026-08-img-1530.jpg",
      P + "2026-08-img-1531.jpg",
    ],
    summary:
      "Short-stay accommodation — civil and structural engineering for multiple two-storey apartment blocks with intensive green roofs.",
    body: [
      "AOCA is providing Civil and Structural Engineering services for this short-stay accommodation development, comprising multiple two-storey apartment blocks. Intensive green roofs are included in accordance with the Local Authority's policy.",
      "Our role covers planning and tender design, construction inspections and BCAR review, with construction currently ongoing.",
    ],
    servicesText: [
      "Civil and structural engineering — planning and tender design, construction inspections and BCAR review.",
    ],
  },
  {
    slug: "ratheniska-church",
    title: "Ratheniska Church",
    sector: "hospitality-leisure-community",
    location: "Ratheniska, Co. Laois",
    thumb: P + "2026-02-niskathumb.jpg",
    hero: P + "2026-02-header.webp",
    gallery: [
      P + "2026-08-dji-0928.jpg",
      P + "2026-02-before-0.jpg",
      P + "2026-02-before-1.jpg",
      P + "2026-02-during-1.jpg",
      P + "2026-02-during2.jpg",
      P + "2026-02-during3.jpg",
      P + "2026-02-during4.jpg",
      P + "2026-02-roof-complete.jpg",
      P + "2026-02-finished-8.jpg",
      P + "2026-02-finished-16.jpg",
    ],
    summary:
      "Refurbishment and extension of an important community building — planning, tender, fire safety and accessibility upgrades.",
    body: [
      "AOCA provided full planning and tender package services for the refurbishment and extension works at Ratheniska Church. The project involved the careful coordination of improvements to this important community building, including the installation of a new roof covering, upgrades to the existing heating system and internal renovations.",
      "The works also incorporated fire safety and accessibility upgrades, ensuring the building met current regulatory requirements while improving comfort, safety and usability for all visitors. AOCA managed the preparation of the necessary documentation and design information to support the successful delivery of the refurbishment works.",
    ],
    servicesText: [
      "Planning permission services, tender package preparation, building design coordination, fire safety certification, disability access certification and renovation and refurbishment design.",
    ],
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
      P + "2026-08-dsc6266.jpg",
      P + "2026-02-5606327494_004961d666_o.jpg",
      P + "2026-02-32235998280_00b60d4c44_o.jpg",
      P + "2026-02-picture-003.jpg",
      P + "2026-02-picture-019.jpg",
      P + "2026-02-picture13.jpg",
      P + "2026-02-picture16.jpg",
    ],
    summary:
      "Comprehensive refurbishment and modernisation of Portlaoise's landmark church — project management and design coordination.",
    body: [
      "AOCA provided project management and design coordination services for the comprehensive refurbishment and transformation of St. Peter & Paul's Church. The project involved extensive internal upgrades together with improvements to the front façade and external access routes, enhancing the functionality, accessibility and overall experience of the building.",
      "The internal refurbishment included the installation of a state-of-the-art underfloor heating system, a stone carpet floor finish, relocation of the sanctuary, upgraded audio-visual systems, new camera installations, live internet connectivity, improved lighting, a refreshed internal colour scheme and refurbishment of the existing pews.",
      "Completed between May 2008 and October 2009, the project successfully modernised the church facilities while respecting the character and importance of the existing building, creating a welcoming and adaptable space for the local community.",
    ],
    servicesText: [
      "Project management, building design coordination, refurbishment design, construction supervision, accessibility and external works coordination and building services coordination.",
    ],
  },
  {
    slug: "heath-church",
    title: "The Heath Church",
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
      "Internal refurbishment and modernisation of The Heath Church — project management and design coordination throughout.",
    body: [
      "AOCA provided project management and design coordination services for the internal refurbishment and modernisation of The Heath Church. The project focused on enhancing the comfort, functionality and overall visitor experience through a comprehensive programme of internal improvements.",
      "The completed works included the installation of a state-of-the-art underfloor heating system, new floor finishes, wall panelling, an upgraded audio-visual system, camera installation, live internet connectivity, a new lighting system, refreshed internal finishes and refurbishment of the existing pews.",
      "The refurbishment successfully delivered a modern, efficient and adaptable worship space while maintaining the character and community importance of the existing church building.",
    ],
    servicesText: [
      "Project management, refurbishment design, building services coordination, construction supervision, interior upgrade coordination and audio-visual and technology integration.",
    ],
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
      "LAMA Awards finalist — full project management and design coordination from planning permission through to completion.",
    body: [
      "AOCA provided a full project management and design coordination service for the delivery of the Portlaoise Parish Centre, from securing planning permission through to completion. Our role included the preparation of detailed construction and interior design drawings, tender documentation, contractor appointment and overseeing the works throughout the construction phase.",
      "The completed Centre has been highly successful in terms of both design and functionality, receiving recognition as a finalist in the LAMA Awards. The building features a distinctive sedum roof and shingle finish, carefully designed to complement and blend with the surrounding landscaped environment.",
      "Internally, the Centre provides a welcoming and flexible community facility incorporating a reception and coffee area, meeting rooms, consultation rooms, offices, a religious shop and a first-floor meditation dome. High-quality finishes, including natural stone flooring, beech joinery and cherry inlay details, create a warm and contemporary setting that supports the wide range of activities hosted within the building.",
      "Now open daily and in continuous use, Portlaoise Parish Centre has become an important community asset, successfully delivering the welcoming and inclusive environment envisioned at the outset of the project.",
    ],
    servicesText: [
      "Planning permission services, architectural and interior design coordination, construction drawing preparation, tender package preparation, contractor appointment, project management and construction supervision.",
    ],
  },

  // ---- Industrial & Data Centres ------------------------------------------
  {
    slug: "data-centre-projects",
    title: "Data Centre Projects",
    sector: "industrial-data-centres",
    location: "Ireland, UK & Europe",
    thumb: P + "2026-08-screenshot-2025-09-29-150238.jpg",
    hero: P + "2026-08-screenshot-2025-09-29-150238.jpg",
    gallery: [
      P + "2026-08-dub1-aerial.jpg",
      P + "2026-08-16mw-uk.jpg",
      P + "2026-08-northern-sweden.jpg",
      P + "2026-08-southern-sweden-data-centre-phase1.jpg",
      P + "2026-08-cwl01-cardiff.jpg",
      P + "2026-08-40mw-winthrop-sweden.jpg",
      P + "2026-08-greenlink-interconnector-ipswich.jpg",
      P + "2026-08-projects-mn-civils-26.jpg",
      P + "2026-08-e62ffcab-e96b-4a28-a7d8-616901fb1741.jpg",
      P + "2026-08-c5cd74a5-6c4f-45ab-a8a9-8e0de95bd53f.jpg",
      P + "2026-08-dub1.jpg",
      P + "2026-08-screenshot-2025-09-29-144442.jpg",
      P + "2026-08-69957162-1ff6-4e70-84cb-902937699ced.jpg",
      P + "2026-08-0d6bf748-b53d-4c79-a951-620ebe8dddea.jpg",
    ],
    summary:
      "Building envelope and structural engineering for mission-critical facilities across Europe — from 16MW to 52MW campuses.",
    body: [
      "AOCA provides specialist building envelope and structural engineering services on data centre projects across Ireland, the UK and Europe. Our portfolio includes facilities in Dublin, Newport, Cardiff, Sweden and Finland, ranging from 16MW single buildings to 52MW campuses.",
      "Our role on these mission-critical projects typically covers roof and façade structural design, wind load design to Eurocode and FM Global requirements, condensation risk analysis, fire engineering review of envelope systems and third-party site inspections.",
    ],
  },
  {
    slug: "corcorans-test-centre",
    title: "Corcorans Commercial Vehicle Facility",
    sector: "industrial-data-centres",
    location: "Portlaoise, Co. Laois",
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
    summary:
      "Purpose-built commercial vehicle facility — complete engineering and project delivery from planning to certification.",
    body: [
      "AOCA provided a complete engineering and project delivery service for the Corcorans Commercial Vehicle Facility, including the preparation of design information, submission of planning documentation, production of construction drawings and supervision of the works through to completion and certification.",
      "The facility was designed to accommodate the specialist requirements of commercial vehicle servicing and maintenance. The building comprises a steel portal frame structure with insulated wall and roof panels, providing a robust and efficient solution suitable for the operational demands of the business. The floor construction incorporated specialist inspection pits, allowing safe and practical access to the underside of commercial vehicles during maintenance works.",
      "The project was successfully delivered on programme and within budget, providing Corcorans with a modern, purpose-built facility that remains fully operational and continues to support their commercial vehicle operations.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, planning permission services, construction drawing preparation, project supervision and construction certification.",
    ],
  },
  {
    slug: "industrial-warehousing-portlaoise",
    video: "/video/projects/industrial-warehousing-portlaoise.mp4",
    title: "Industrial Warehousing Development",
    sector: "industrial-data-centres",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-02-warehouse-thumb.jpg",
    hero: P + "2026-02-dji_0871.jpg",
    gallery: [
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
      "Over 100,000 sq ft of warehousing in six independent units — full civil and structural engineering from concept to certification.",
    body: [
      "AOCA provided a complete civil and structural engineering service for this large-scale industrial warehousing development, supporting the project from initial concept and planning stages through construction completion and certification. As part of a long-standing client relationship, AOCA delivered the full design package required to successfully bring this significant commercial development to completion.",
      "The development comprised over 100,000 sq ft of warehousing, subdivided into six independent units, each designed with dedicated access arrangements to provide flexibility for future occupiers. The project presented a number of engineering challenges, including its close proximity to the N80, variable ground conditions, the incorporation of dock levellers within each unit and the requirement for level access roller doors to support efficient logistics operations.",
      "The overall structural solution comprised steel portal frame construction with precast concrete internal walls, blockwork at ground floor office areas and insulated cladding panels to the external elevations and roof. The completed facility provides a modern, flexible and efficient industrial environment and is now fully operational, with all units occupied, demonstrating the success of the client's vision and investment.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, planning permission services, construction drawings, project supervision and construction certification.",
    ],
  },

  // ---- Residential ---------------------------------------------------------
  {
    slug: "the-glass-bottle-site",
    title: "The Glass Bottle Site",
    sector: "residential",
    location: "Ringsend, Dublin",
    thumb: P + "2026-02-glass-bottle-site.webp",
    hero: P + "2026-02-glass-bottle-site.webp",
    gallery: [
      P + "2026-08-gb-marketing-01-1.jpg",
      P + "2026-08-gb-marketing-04-1.jpg",
      P + "2026-08-gb-marketing-07-1.jpg",
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
      "AOCA was appointed as the independent Third-Party Quality Assurance Advisor for the waterproofing roof envelope works associated with the Glass Bottle Development. Our role is to provide objective technical oversight and assurance throughout the design, installation and performance verification of the various waterproofing systems incorporated into the project.",
      "The roof envelope designs varied significantly across the development, incorporating a range of solutions including sedum roofs, blue and green roof systems, and concrete paved roof finishes installed over Paralon waterproofing membranes. Given the complexity and diversity of the roof build-ups, careful review and monitoring were required to ensure each system met the required performance, durability and compliance standards.",
      "As an independent QA Advisor, AOCA provided impartial assessment of design details, installation practices and workmanship, working to minimise the risk of future defects, water ingress and warranty issues. Through proactive quality management and technical assurance, AOCA supported the successful delivery of a robust and reliable waterproofing envelope for this significant development.",
    ],
    servicesText: [
      "Third-party quality assurance advisory, waterproofing envelope inspection, roof system design review, construction quality auditing, technical compliance assessment and installation monitoring.",
    ],
    featured: true,
  },
  {
    slug: "abbeyleix-residential-development",
    title: "Abbeyleix Residential Development",
    sector: "residential",
    location: "Abbeyleix, Co. Laois",
    thumb: P + "2026-08-chatgpt-image-jul-10-2026-03-19-47-pm.jpg",
    hero: P + "2026-08-chatgpt-image-jul-10-2026-03-19-43-pm.jpg",
    gallery: [
      P + "2026-08-chatgpt-image-jul-10-2026-03-19-47-pm.jpg",
      P + "2026-08-chatgpt-image-jul-10-2026-03-19-52-pm.jpg",
      P + "2026-08-picture2.jpg",
    ],
    summary:
      "Planning secured at An Coimisiún Pleanála — project management and civil engineering through a complex environmental planning process.",
    body: [
      "AOCA Engineering Consultants provided Project Management and Civil Engineering services for the planning and design of this residential development in Abbeyleix. Working closely with the client and wider design team, AOCA guided the project through the planning process, culminating in planning permission being granted by An Coimisiún Pleanála in August 2025 following an appeal.",
      "The development presented a number of complex engineering and environmental challenges. These included the protection of riparian corridors and tree root protection zones, together with the design of a wastewater pumping station to serve the development and accommodate the diversion of existing foul water infrastructure.",
      "A comprehensive stormwater management strategy was developed, incorporating a discharge to a local stream with a hydrological connection to the River Barrow and River Nore SAC and the River Nore SPA. AOCA integrated Sustainable Drainage Systems (SuDS) and nature-based solutions throughout the design to deliver an environmentally responsible and resilient drainage network.",
      "The site's topography required a substantial volume of engineered fill, which was carefully value engineered to minimise costs while maintaining gravity drainage across the development. Additional civil engineering works included the incorporation of traffic calming measures along the R433 and implementation of recommendations arising from the Road Safety Audit process, ensuring safe and efficient access to the development.",
      "The successful planning outcome reflects the collaborative approach of the project team and the careful consideration given to the engineering, environmental and transportation challenges associated with the site.",
    ],
    servicesText: [
      "Project management, civil engineering design, planning application services, site infrastructure design, foul and stormwater drainage design, sustainable drainage (SuDS) design, road and traffic engineering and environmental coordination.",
    ],
  },
  {
    slug: "the-hole-in-the-wall",
    video: "/video/projects/the-hole-in-the-wall.mp4",
    title: "The Hole in the Wall",
    sector: "residential",
    location: "Dublin",
    thumb: P + "2026-09-hole-in-the-wall-finished.jpg",
    hero: P + "2026-09-hole-in-the-wall-finished.jpg",
    gallery: [
      P + "2026-02-20240926_090259262_ios.jpg",
      P + "2026-02-20241007_125128936_ios.jpg",
      P + "2026-02-20250805_135354450_ios.jpg",
      P + "2026-02-20251003_091345484_ios.jpg",
      P + "2026-08-near-finish.jpg",
      P + "2026-08-img-1018.jpg",
      P + "2026-02-dji_20250601131323_0012_d.jpg",
      P + "2026-02-img-20250423-wa0028.jpg",
    ],
    summary:
      "42-unit, 7-storey apartment scheme with basement car park on a compact 0.2-hectare site — full civil and structural design.",
    body: [
      "AOCA provided full Civil and Structural Engineering Design services for the delivery of this 42-unit apartment development on behalf of a long-term client and project partner. The scheme comprises a seven-storey residential building with a basement car park, located on a compact 0.2-hectare urban site.",
      "The project presented a number of significant engineering challenges due to the constrained site conditions, including the presence of a 1050 mm storm sewer and a 300 mm foul sewer crossing the development footprint. AOCA successfully designed and coordinated the diversion of both services within the site boundary, allowing construction to proceed while maintaining compliance with required wayleave constraints.",
      "Key structural elements included the design of a significant first-floor transfer slab to achieve optimal column layouts above the basement car park, providing both architectural flexibility and efficient structural performance. The building structure is supported on reinforced concrete columns founded on skin friction piles extending to depths of approximately 14 metres, providing a robust foundation solution suited to the challenging ground conditions.",
      "AOCA also provided the required Ancillary Design Certificate for the works, supporting the successful delivery of this complex urban residential development.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, basement and foundation design, infrastructure diversion design, transfer slab design and ancillary design certification.",
    ],
  },
  {
    slug: "harper-street-mountmellick",
    title: "Grange Manor Mountmellick",
    sector: "residential",
    location: "Mountmellick, Co. Laois",
    video: "/video/projects/harper-street-mountmellick.mp4",
    videoPoster: "/images/harper-street-video-poster.jpg",
    thumb: P + "2026-02-harper-thumb.jpg",
    hero: P + "2026-02-dji_0807.jpg",
    gallery: [
      P + "2026-08-dji-0015.jpg",
      P + "2026-08-dji-0016.jpg",
      P + "2026-08-dji-0017.jpg",
      P + "2026-02-dji_0814.jpg",
      P + "2026-02-dji_20250526051209_0006_d.jpg",
      P + "2026-02-20240708_132741914_ios.jpg",
      P + "2026-02-20241017_104842393_ios.jpg",
      P + "2026-02-20241030_103550.jpg",
      P + "2026-08-spec-4.jpg",
      P + "2026-08-grange-manor-images.jpg",
    ],
    summary:
      "54-unit residential development on a greenfield site — full civil engineering design, supervision and certification.",
    body: [
      "AOCA provided full Civil Engineering services for the delivery of this 54-unit residential development on a greenfield site located on the approach to Mountmellick from the Dublin side. The development comprised a mix of 42 three-bedroom two-storey houses, 8 two-bedroom two-storey houses and 4 two-bedroom bungalows, providing a varied residential scheme to meet local housing requirements.",
      "AOCA was responsible for the design, supervision and certification of all civil engineering elements associated with the development. A key engineering challenge was the contrasting drainage requirements across the site, with the foul water system naturally falling towards the main entrance road while the stormwater system required drainage in the opposite direction towards an existing drain located across adjacent farmland.",
      "This required careful coordination and detailed design of the underground services network, including the strategic positioning of service crossings and the development of an effective stormwater conveyance system capable of serving the entire development. Through close collaboration between the developer and design team throughout the construction phase, the project was successfully delivered on programme.",
    ],
    servicesText: [
      "Civil engineering design, site infrastructure design, stormwater drainage design, foul water drainage design, utilities coordination, construction supervision and civil works certification.",
    ],
  },
  {
    slug: "derry-road-durrow",
    video: "/video/projects/derry-road-durrow.mp4",
    title: "Derry Road, Durrow",
    sector: "residential",
    location: "Durrow, Co. Laois",
    thumb: P + "2026-02-derry.jpg",
    hero: P + "2026-08-dji-20250428111105-0067-d.jpg",
    gallery: [
      P + "2026-08-dji-20250428112130-0070-d.jpg",
      P + "2026-08-dji-20250428112814-0077-d.jpg",
      P + "2026-08-dji-20250428112825-0079-d.jpg",
      P + "2026-08-dji-20250428112832-0080-d.jpg",
    ],
    summary:
      "20-unit social housing development for Laois County Council — stepped foundations and split attenuation on a steeply falling site.",
    body: [
      "AOCA is providing full Civil and Structural Engineering services for this 20-unit social housing development on behalf of Laois County Council. The development comprises a mix of bungalow, two-storey, terraced and duplex residential units, all designed using traditional construction methods.",
      "AOCA's role includes the design, supervision and certification of all civil and structural elements, including foul and stormwater drainage systems, watermain infrastructure and associated external site works. The project presents several complex engineering challenges due to the significant changes in ground levels across the site, from Derry Road to the south-eastern boundary and onwards towards the junction with the N77.",
      "To address these constraints, AOCA developed bespoke engineering solutions including stepped foundations and boundary walls to accommodate level differences, together with a split stormwater attenuation strategy incorporating two separate storage areas. The restricted site footprint, combined with the requirement to maximise residential delivery, required careful coordination and efficient design solutions to ensure the development functions effectively without compromising quality or performance.",
      "Through considered engineering design and close collaboration with the client and wider project team, AOCA is supporting the successful delivery of a high-quality residential development for the local community.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, site infrastructure design, foul and stormwater drainage design, watermain design, foundation and boundary wall design, construction supervision and construction certification.",
    ],
  },
  {
    slug: "bohernamona-road-thurles",
    title: "Bohernamona Road, Thurles",
    sector: "residential",
    location: "Thurles, Co. Tipperary",
    thumb: P + "2026-08-aerial-01.jpg",
    hero: P + "2026-08-aerial-01.jpg",
    gallery: [
      P + "2026-08-aerial-02.jpg",
      P + "2026-08-aerial-03.jpg",
      P + "2026-08-aerial-04.jpg",
    ],
    summary:
      "96-unit residential development — complete civil engineering design as a single coordinated entity, delivered in two phases.",
    body: [
      "AOCA provided the complete Civil Engineering design services for this 96-unit residential development located in Thurles, Co. Tipperary. The scheme was designed as a comprehensive development, with all infrastructure elements including foul and storm drainage, water mains and internal road layouts fully designed as a single coordinated entity.",
      "The site naturally falls from east to west towards the public roadway, providing favourable conditions for the proposed development. The project was designed to be delivered in two phases, with the initial phase located on the eastern side of the site to maximise connectivity to existing services. Despite the phased construction approach, all engineering design was completed for the full development to ensure a seamless and efficient delivery process when construction proceeds.",
      "A key element of the civil design was the development of a significant stormwater attenuation storage area located to the north-west of the site, together with a gravity foul sewer system discharging towards the public roadway and onwards to an existing pumping station further north-west. While the internal site levels allowed for effective gravity drainage, the variation in levels between the site discharge point and the pumping station required detailed assessment and careful design coordination.",
    ],
    servicesText: [
      "Civil engineering design, site infrastructure design, foul and stormwater drainage design, watermain design, road layout design, phasing strategy development and utility coordination.",
    ],
  },
  {
    slug: "the-cross-of-newtown-ballyroan-co-laois",
    video: "/video/projects/the-cross-of-newtown-ballyroan-co-laois.mp4",
    title: "The Cross of Newtown, Ballyroan",
    sector: "residential",
    location: "Ballyroan, Co. Laois",
    thumb: P + "2026-02-thumb-newtown.jpg",
    hero: P + "2026-02-dji_0922.jpg",
    gallery: [
      P + "2026-08-newtown-1.jpg",
      P + "2026-08-newtown-2.jpg",
      P + "2026-08-newtown-3.jpg",
      P + "2026-08-newtown-4.jpg",
      P + "2026-02-img_3378.jpg",
      P + "2026-02-img_3385.jpg",
      P + "2026-02-img_3398.jpg",
      P + "2026-02-img_3416.jpg",
    ],
    summary:
      "Phased residential development on difficult riverside ground — complete design and engineering, currently at Phase Three.",
    body: [
      "AOCA has provided a complete design and engineering service for the Cross of Newtown residential development, supporting the project from inception through to completion. The development has progressed over several phases and is currently at Phase Three, comprising 21 new housing units.",
      "Working with a long-standing client, AOCA has been responsible for all aspects of the project delivery, including residential design, planning applications, civil and structural engineering design, foundation solutions, site services, ancillary works and final certification. The development is being constructed on a phased basis in line with individual sales, rather than as a speculative housing scheme.",
      "Phase Three presented significant engineering challenges due to the difficult ground conditions and the site's close proximity to the river. To overcome these constraints, each dwelling has been designed and constructed on piled raft foundations, providing a robust and reliable structural solution suited to the site conditions.",
      "Through careful coordination and detailed engineering design, AOCA has successfully supported the ongoing delivery of a high-quality residential development, ensuring each phase is completed to the required standards from initial design through to final handover.",
    ],
    servicesText: [
      "Residential building design, planning permission services, civil engineering design, structural engineering design, foundation design, site infrastructure design, construction supervision and completion certification.",
    ],
  },
  {
    slug: "rath-nua-portlaoise",
    title: "Rath Nua, Portlaoise",
    sector: "residential",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2026-08-7f0db3c7d519724b5e2ebf724565152c85046d75-1920x1080.jpg",
    hero: P + "2026-08-3e63cf8088d3703f6c3d3b2d53237c2c84bf2e80-1920x1080.jpg",
    gallery: [
      P + "2026-08-7f0db3c7d519724b5e2ebf724565152c85046d75-1920x1080.jpg",
      P + "2026-08-screenshot-2025-10-22-165136.jpg",
      P + "2026-08-screenshot-2026-07-15-144035.jpg",
    ],
    summary:
      "County Laois's first Large Scale Residential Development — civil engineering design and planning support on a landmark scheme.",
    body: [
      "AOCA formed part of the design team responsible for delivering the first Large Scale Residential Development (LRD) scheme in County Laois, located on a greenfield site within Portlaoise. AOCA's extensive knowledge of the site, combined with our strong working relationship with Laois County Council and understanding of local infrastructure requirements, provided valuable support throughout the design and planning process.",
      "AOCA was responsible for the design and coordination of key civil engineering elements, including the foul and stormwater drainage infrastructure. The foul water disposal strategy incorporated a connection to an existing 300 mm Irish Water sewer main running through the site, together with an additional connection to an adjoining residential development. Stormwater disposal was achieved through two separate connections to the adjacent development to the west, ensuring an efficient and sustainable drainage solution.",
      "Through close collaboration between the client, design team and local authority, the LRD planning process was successfully managed with minimal amendments required during assessment. Planning permission was granted without restrictive conditions, allowing the development to proceed as designed and within the proposed budget parameters.",
      "Construction is currently progressing on site, with a number of residential units already completed and occupied, marking an important milestone in the delivery of much-needed housing within Portlaoise.",
    ],
    servicesText: [
      "Civil engineering design, site infrastructure design, foul water drainage design, stormwater drainage design, utility coordination, planning stage engineering support and construction stage services.",
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
      P + "2026-08-screenshot-2026-04-09-140459.jpg",
      P + "2026-08-screenshot-2026-04-09-140635.jpg",
      P + "2026-08-screenshot-2026-04-09-140716.jpg",
      P + "2026-02-dscn1764.jpg",
      P + "2026-02-dscn6797.jpg",
      P + "2026-02-dscn8438.jpg",
      P + "2026-02-dscn8476.jpg",
      P + "2026-02-dscn8501.jpg",
      P + "2026-02-img_6830.jpg",
      P + "2026-02-img_6910.jpg",
    ],
    summary:
      "26-unit residential development — complete design and engineering from housing design and planning to supervision and certification.",
    body: [
      "AOCA provided a complete design and engineering service for this 26-unit residential development located on the northern side of Portarlington. Our involvement extended from the initial design of the housing units and planning process through to construction supervision and final certification of the completed works.",
      "The project was delivered in close collaboration with the developer, whose commitment to quality and attention to detail ensured a successful outcome. The high standards established at the outset were maintained throughout the construction period, allowing the development to be completed on programme and within budget.",
      "The site presented a number of engineering challenges, particularly due to variable and poor ground conditions in certain areas. To address these constraints, AOCA designed bespoke foundation solutions for a number of dwellings, incorporating widened foundations to provide suitable bearing capacity and ensure long-term structural performance.",
      "A dedicated foul water pumping station was also required to facilitate wastewater disposal from the development. AOCA was responsible for the design, sizing, location and coordination of the pumping station installation, working closely with Irish Water to achieve an agreed and effective solution.",
      "Now fully occupied, the development continues to provide high-quality homes and remains a testament to the successful collaboration between the client, design team and contractor.",
    ],
    servicesText: [
      "Residential building design, planning permission services, civil engineering design, structural engineering design, foundation design, foul water pumping station design, construction supervision and completion certification.",
    ],
  },
  {
    slug: "vista-montana",
    title: "Vista Montana",
    sector: "residential",
    location: "Dublin",
    thumb: P + "2026-08-11186.jpg",
    hero: P + "2026-08-11186.jpg",
    gallery: [
      P + "2026-08-11208.jpg",
      P + "2026-08-11216.jpg",
      P + "2026-08-11228.jpg",
      P + "2026-08-11296.jpg",
    ],
    summary:
      "Bringing a stalled 11-unit development through to completion — assessment, design and BCAR oversight in two phases.",
    body: [
      "AOCA was appointed as Civil and Structural Design Engineers to assist in bringing this unfinished residential development through to successful completion. The project had originally been left incomplete by a previous developer in 2020, with our client subsequently acquiring the site and engaging AOCA to assess the existing works, address outstanding technical matters and provide the engineering services required to complete the development.",
      "The scheme comprises 11 residential units and is being delivered in two phases. Phase 1 involved the completion of 7 new residential units together with associated site infrastructure and services. The successful delivery of this phase enabled the relocation of existing residents on the site, allowing the original dwelling to be demolished and facilitating the commencement of Phase 2.",
      "Phase 2, consisting of the final 4 residential units, is currently underway. AOCA continues to provide engineering support through the construction process, including inspections, technical reviews and BCAR compliance oversight to ensure the completed development meets the required standards.",
      "Through detailed assessment, coordinated design and ongoing construction support, AOCA has helped transform a stalled development into a high-quality residential scheme that provides much-needed housing within the Dublin area.",
    ],
    servicesText: [
      "Civil engineering design, structural engineering design, planning compliance review, existing build assessment, technical design development, construction inspections and BCAR review and support.",
    ],
  },
  {
    slug: "one-off-bespoke-dwellings",
    title: "One-Off Bespoke Dwellings",
    sector: "residential",
    location: "Various locations throughout Ireland",
    thumb: P + "2026-08-img-1720.jpg",
    hero: P + "2026-08-img-20210426-164434.jpg",
    gallery: [
      P + "2026-08-img-1720.jpg",
      P + "2026-08-img-20191118-105955.jpg",
      P + "2026-08-img-4495.jpg",
      P + "2026-08-img-20220615-114033.jpg",
      P + "2026-08-img-20220623-094041.jpg",
    ],
    summary:
      "Almost 30 years of bespoke one-off homes — from rural bungalows to contemporary houses with basements and pool annexes.",
    body: [
      "Since establishing practice almost 30 years ago, AOCA has successfully delivered a wide range of one-off bespoke residential dwellings, providing tailored architectural and engineering solutions to suit each individual client, site and brief. These projects have included everything from modest rural bungalows located adjacent to family farms to complex contemporary homes incorporating basements, swimming pool annexes, bespoke structural systems and challenging site conditions.",
      "AOCA's experience in one-off housing covers a broad range of construction methods and materials, including traditional masonry construction, timber frame systems, reinforced concrete structures and insulated concrete formwork. External finishes and roof systems have varied significantly, incorporating natural slate, concrete tiles, standing-seam zinc, waterproof membranes and specialist cladding solutions designed to complement their rural surroundings.",
      "Every site presents its own unique engineering requirements, with careful consideration given to ground conditions, site topography and environmental constraints. AOCA has designed solutions for properties located on steeply sloping sites, flat rural plots and complex landscapes, providing bespoke foundation designs together with associated infrastructure including stormwater soakaways, septic tanks, wastewater treatment systems and percolation areas.",
      "One-off dwellings have remained a fundamental part of AOCA's practice since its early years, with many original clients returning for further projects, reflecting the trust and quality of service delivered. As a rural-based consultancy, AOCA understands the importance of creating homes that are unique to each client and location, and continues to regard these projects as some of the most rewarding within our portfolio.",
    ],
    servicesText: [
      "Residential building design, planning permission services, civil engineering design, structural engineering design, foundation design, site investigation and assessment, drainage and wastewater design, construction supervision and completion certification.",
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

  // ---- Life Sciences & Healthcare -----------------------------------------
  {
    slug: "b-braun-wellstone-midlands-renal-care-centre",
    video: "/video/projects/b-braun-wellstone-midlands-renal-care-centre.mp4",
    title: "B. Braun Renal Dialysis Facility",
    sector: "life-sciences-healthcare",
    location: "Portlaoise, Co. Laois",
    thumb: P + "2025-11-b-braun-720-logoless.jpg",
    hero: P + "2025-11-dji_0035.jpg",
    gallery: [
      P + "2025-11-dscn4179.jpg",
      P + "2026-08-img-4443.jpg",
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
      "Dedicated renal dialysis facility on challenging esker ground — full civil and structural engineering with bespoke foundations.",
    body: [
      "AOCA provided full Civil and Structural Engineering services for the development of the B. Braun Renal Dialysis Facility in Portlaoise. The facility was developed to provide a dedicated renal dialysis service for the local area, significantly improving accessibility for patients who previously had to travel to Tullamore for treatment.",
      "Working closely with the project architects, AOCA delivered the structural design for the facility, which incorporates a steel frame construction with two monopitched roof structures spanning the reception area and the main treatment section of the building. The complete structural design was undertaken in-house, ensuring a coordinated and efficient approach from initial design through to fabrication and construction.",
      "A key engineering consideration was the challenging ground conditions associated with the site, which is located within an area influenced by an existing esker formation and historic sand and gravel extraction activities. To establish an accurate understanding of the ground profile, AOCA commissioned a comprehensive site investigation programme incorporating boreholes, window sampling and dynamic probing. The findings allowed the development of a bespoke foundation solution tailored to the site conditions and designed to ensure the long-term performance and stability of the facility.",
      "The project also required close coordination with ESB due to the presence of a high-voltage powerline adjacent to the site. Careful planning and communication ensured that the development remained clear of required infrastructure zones and that the existing pylons and associated equipment were protected throughout the works.",
      "Successfully completed and fully operational, the B. Braun Renal Dialysis Facility represents an important healthcare asset for the region. AOCA is proud to have contributed to the delivery of such a valuable facility within our local community.",
    ],
    servicesText: [
      "Structural engineering design, civil engineering design, ground investigation and foundation design, site infrastructure design, utility coordination, construction supervision and structural certification.",
    ],
  },
  {
    slug: "pharmaceutical-building-ireland",
    title: "Pharmaceutical Building, Ireland",
    sector: "life-sciences-healthcare",
    location: "Ireland",
    thumb: P + "2026-02-img-3635.jpg",
    hero: P + "2026-09-pharma-building-aerial.jpg",
    gallery: [
      P + "2026-02-img_3602.jpg",
      P + "2026-02-img-3635.jpg",
    ],
    summary:
      "Building envelope investigation and remediation — resolving water ingress at a newly completed pharmaceutical facility.",
    body: [
      "AOCA was appointed to investigate issues affecting the external building envelope at this pharmaceutical building, primarily relating to the roof system, where water ingress was occurring within the newly completed facility. Our role involved carrying out detailed inspections and assessments of the building fabric to identify the source and extent of the defects.",
      "Working alongside specialist partners, AOCA coordinated advanced roof investigations, including spark testing of the roof membrane, to accurately identify areas of failure and potential pathways for water penetration. The investigations identified multiple defects associated with the installation and performance of the roof membrane system.",
      "Following completion of the assessment works, AOCA prepared a comprehensive remediation strategy to address the identified issues. The recommended works enabled the building to achieve the required performance standards, allowing the facility to be successfully completed and operate as originally intended.",
    ],
    servicesText: [
      "Building envelope inspection, structural engineering assessment, roof investigation and defect analysis, remediation design, specialist consultant coordination and construction monitoring.",
    ],
  },
  {
    slug: "pharmaceutical-facility-extension",
    title: "Pharmaceutical Building Extension, Ireland",
    sector: "life-sciences-healthcare",
    location: "Ireland",
    thumb: P + "2026-09-pharma-ext-render-1.jpg",
    hero: P + "2026-09-pharma-ext-render-1.jpg",
    gallery: [
      P + "2026-09-pharma-ext-render-2.jpg",
      P + "2026-08-capture-png1.jpg",
      P + "2026-09-pharma-campus-aerial.jpg",
    ],
    summary:
      "Engineering services on a major extension at a pharmaceutical facility in Ireland.",
    body: [],
  },
  {
    slug: "harolds-cross-hospice-refurbishment",
    title: "Harold's Cross Hospice Refurbishment",
    sector: "life-sciences-healthcare",
    location: "Dublin",
    thumb: P + "2026-08-img-5076.jpg",
    hero: P + "2026-08-img-5076.jpg",
    gallery: [
      P + "2026-08-img-4232.jpg",
      P + "2026-08-img-9942.jpg",
    ],
    summary:
      "Comprehensive refurbishment and building upgrade — roof replacement, plant deck, solar integration and hydrotherapy pool works.",
    body: [
      "AOCA provided engineering and project management services for the refurbishment and upgrade works at Harold's Cross Hospice. The project involved a comprehensive programme of building improvements, including replacement of the existing roof, installation of new parapet capping, implementation of a fall arrest system and guardrails, and the integration of solar panels to improve the building's energy performance.",
      "The works also included the construction of a new raised roof plant deck, replacement of air handling units, upgrades to internal and external lighting systems, replacement of roof glazing and automatic opening vents (AOVs), together with internal redecoration works throughout the facility.",
      "In addition to the building refurbishment works, AOCA supported the enhancement of the hydrotherapy pool facilities. This included complete pool retiling with improved definition of steps and level changes, the decommissioning and recommissioning of associated equipment, and refurbishment of all pool handrails to improve safety, accessibility and usability.",
      "The completed works have enhanced the functionality, safety and operational performance of the hospice, providing an improved environment for patients, staff and visitors.",
    ],
    servicesText: [
      "Project management, structural engineering design, building refurbishment coordination, roof upgrade design and supervision, plant deck structural works, building services coordination and construction supervision.",
    ],
  },
];

/** Every project, including ones hidden via /admin (used by the admin UI).
 * Edited/uploaded records (content/projects.json) override built-ins by slug. */
export const allProjects: Project[] = [
  ...(uploadedProjects as Project[]),
  ...builtInProjects.filter(
    (b) => !(uploadedProjects as Project[]).some((u) => u.slug === b.slug)
  ),
];

/** Client-uploaded projects (via /admin) appear first; hidden ones removed. */
export const projects: Project[] = allProjects.filter(
  (p) => !hiddenSlugs.includes(p.slug)
);

/**
 * Homepage featured projects. When the client has chosen a list via /admin
 * (overrides.featured) it wins; otherwise the built-in flags apply.
 */
export const featuredSlugs: string[] | undefined = overrides.featured;
export const featuredProjects: Project[] = projects.filter((p) =>
  featuredSlugs ? featuredSlugs.includes(p.slug) : p.featured
);

export const testimonials = [
  {
    quote:
      "What sets AOCA apart is not just their technical expertise, but their reliability and professionalism. They are approachable, proactive, and always willing to go the extra mile to ensure projects run smoothly. We would have no hesitation in recommending AOCA to others.",
    author: "Owen O'Gorman",
    role: "Managing Director",
    company: "Crown Roofing & Cladding",
    logo: "/images/2026-09-logo-crown.png",
  },
  {
    quote:
      "Their team brings genuine technical expertise to every project, and their ability to engage practically and collaboratively with our architectural practice makes the design and delivery process genuinely seamless. We value their engineering knowledge, professionalism and responsiveness — and recommend without hesitation.",
    author: "Jonathan Marais",
    role: "Head of Operations",
    company: "RDF Architects & Planning",
    logo: "/images/2026-06-rdf.png",
  },
  {
    quote:
      "The professionalism and expert guidance AOCA have afforded in their investigations have left no stones unturned. I consider AOCA a problem solver who consistently delivers high quality work, and to date their assistance has been invaluable.",
    author: "Fiona Beirne",
    role: "Senior Claims Associate",
    company: "Davies",
    logo: "/images/2026-06-davies-rgb-white-copy.png",
  },
  {
    quote:
      "Property Claims Loss Assessors have worked with the AOCA team for many years now. We love their service because of their rapid response times and the level of detail in their reporting — leaving no stone unturned, and always available to discuss ongoing projects.",
    author: "Peter Mulvaney",
    role: "Director",
    company: "Property Claims Loss Assessors",
    logo: "/images/2026-06-pcla.png",
    logoTall: true,
  },
  {
    quote:
      "I have worked alongside many consulting professionals over the years, but few demonstrate the consistency, integrity, impartiality, and technical competence that AOCA has shown time and again. Their team has provided high-quality, objective engineering services on a wide range of domestic and commercial property damage claims.",
    author: "Stephen Nolan",
    role: "Major & Complex Loss Specialist",
    company: "OMC Claims",
    logo: "/images/2026-06-omc-logo.png",
  },
  {
    quote:
      "No nonsense, straight talking expert advice in a timely manner.",
    author: "Alan Synnott",
    role: "Stephen MacKenzie & Co",
    logo: "/images/2026-09-logo-mackenzie-light.png",
    logoTall: true,
  },
  {
    quote:
      "I have worked with AOCA on various projects over many years. In all situations they have been diligent, professional, approachable and delivered a high quality service. The staff are committed and client focused, ensuring the delivery of projects.",
    author: "Donal Fitzgerald",
    role: "Director",
    company: "DNCF",
    logo: "/images/2026-09-logo-dncf-light.png",
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
    "31", "32", "33", "35", "36", "37", "38", "39", "40", "41",
    "42",
  ].map((n) => `/images/2026-03-image-${n}.jpg`),
  "/images/2026-09-logo-crown.png",
  "/images/2026-09-logo-dncf.png",
];

export const cultureImages = [
  P + "dayout-pool.jpg",
  P + "dayout-drone.jpg",
  P + "dayout-344a7160.jpg",
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
  P + "2026-08-344a7015.jpg",
  P + "2026-08-344a7160.jpg",
  P + "2026-08-153a4159.jpg",
  P + "2026-08-pool-1.jpg",
  P + "2026-08-pam-and-tamara-pool.jpg",
  P + "2026-08-whatsapp-image-2026-06-09-at-16-03-09.jpg",
  P + "2026-08-img-4313.jpg",
  P + "2026-08-dji-fly-20230511-125242-867-1683805975036-photo-optimized.jpg",
  P + "2026-08-pool-2.jpg",
  P + "2026-08-pool-4.jpg",
  P + "2026-08-pam-pool-1.jpg",
  P + "2026-08-whatsapp-image-2026-06-09-at-16-03-11.jpg",
  P + "2026-08-20230511-140725.jpg",
  P + "2026-08-20230511-141813.jpg",
  P + "2026-08-img-20250902-wa0039.jpg",
  P + "2026-08-img-20250902-wa0048.jpg",
];

export const companyImages = {
  hero: P + "2026-05-344a6971.jpg",
  office: [P + "office-building.jpg"],
  // real photography preferred over AI-generated imagery (client feedback)
  brandedTeam: P + "2026-05-dji_0603.jpg",
  brandedTeam2: P + "tamara-reception.jpg",
  cultureTeaser: P + "2026-05-group-49-2.jpg",
  careers: P + "2026-05-344a6993.jpg",
  contact: P + "2026-08-contact-us.jpg",
  expertiseHero: P + "2026-02-arklow-waste-water-treatment-plant-clancy-moore-architects_16-1-1.jpg",
  expertiseAlt: P + "2026-03-shutterstock_2715611483-1.jpg",
  homeStrip: P + "2026-02-arklow_hero_final_dou4go-1.jpg",
  videoPoster: P + "hero-poster.jpg",
};

/**
 * Services provided per project (new expertise slugs), shown as links in the
 * "Services Provided" panel on each project page. AOCA will supply a summary
 * for each — these are sensible defaults pending their list.
 */
export const projectServices: Record<string, string[]> = {
  "the-glass-bottle-site": ["building-envelope-engineering", "assigned-certifier"],
  "arklow-water-treatment-plant": ["structural-engineering", "building-envelope-engineering"],
  "portlaoise-retail-park": ["civil-engineering", "structural-engineering"],
  "sdcc-dodder-valley-pavilions": ["structural-engineering", "civil-engineering"],
  "people-first-credit-union-portlaoise": ["project-construction-management", "building-envelope-engineering"],
  "st-patricks-national-school-newbridge-co-kildare": ["civil-engineering", "structural-engineering", "assigned-certifier"],
  "grange-ns-carlow": ["civil-engineering", "structural-engineering", "assigned-certifier"],
  "scoil-molaise-carlow": ["civil-engineering", "structural-engineering", "assigned-certifier"],
  "stradbally-fire-station": ["civil-engineering", "structural-engineering"],
  "legal-aid-board": ["project-construction-management", "structural-engineering", "building-surveying"],
  "rosslare-europort": ["civil-engineering", "structural-engineering"],
  "portlaoise-parish-centre": ["project-construction-management", "structural-engineering"],
  "ratheniska-church": ["project-construction-management", "assigned-certifier"],
  "st-peter-pauls-church": ["project-construction-management", "structural-engineering"],
  "heath-church": ["project-construction-management", "structural-engineering"],
  "data-centre-projects": ["building-envelope-engineering", "structural-engineering"],
  "industrial-warehousing-portlaoise": ["structural-engineering", "civil-engineering"],
  "corcorans-test-centre": ["structural-engineering", "civil-engineering"],
  "equine-facility": ["civil-engineering", "structural-engineering", "project-construction-management"],
  "domestic-violence-refuge": ["civil-engineering", "structural-engineering", "assigned-certifier"],
  "b-braun-wellstone-midlands-renal-care-centre": ["structural-engineering", "civil-engineering"],
  "pharmaceutical-building-ireland": ["building-envelope-engineering", "building-surveying"],
  "pharmaceutical-facility-extension": ["structural-engineering", "building-envelope-engineering"],
  "harolds-cross-hospice-refurbishment": ["project-construction-management", "structural-engineering"],
  "the-hole-in-the-wall": ["civil-engineering", "structural-engineering", "assigned-certifier"],
  "abbeyleix-residential-development": ["project-construction-management", "civil-engineering"],
  "harper-street-mountmellick": ["civil-engineering", "assigned-certifier"],
  "derry-road-durrow": ["civil-engineering", "structural-engineering"],
  "bohernamona-road-thurles": ["civil-engineering"],
  "rath-nua-portlaoise": ["civil-engineering"],
  "droughhill-portarlington": ["civil-engineering", "structural-engineering"],
  "the-cross-of-newtown-ballyroan-co-laois": ["civil-engineering", "structural-engineering"],
  "vista-montana": ["civil-engineering", "structural-engineering", "assigned-certifier"],
  "one-off-bespoke-dwellings": ["civil-engineering", "structural-engineering"],
  "gortnahoe-house": ["structural-engineering", "assigned-certifier"],
};

/** Card-friendly location: just the county/city, not "Town, Co. X" twice
 *  under a title that already names the town (Ciara, Sept 2026 notes). */
export function shortLocation(location: string) {
  const last = location.split(",").pop()?.trim();
  return last && last.length > 2 ? last : location;
}

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getSector(slug: string) {
  return sectors.find((s) => s.slug === slug);
}
