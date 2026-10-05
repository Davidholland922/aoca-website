import { projects, type Project } from "@/lib/site";

/**
 * Search landing pages: specialist service pages under /expertise and county
 * pages under /areas. They live beside the client-written expertise pages and
 * never replace them. While LANDING_LIVE is false they are reachable at their
 * address for review but carry noindex, sit outside the sitemap and are not
 * linked from any menu.
 */
export const LANDING_LIVE = false;

export type Faq = { q: string; a: string };
export type LandingSection = { heading: string; body: string[] };

export type ServiceLanding = {
  kind: "service";
  slug: string;
  /** H1 */
  title: string;
  /** <title>, under 60 characters with the brand suffix */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  lead: string;
  image: string;
  intro: string[];
  sections: LandingSection[];
  faqs: Faq[];
  /** expertise slugs this page sits beside */
  related: { slug: string; title: string }[];
  /** project slugs that prove it */
  projectSlugs?: string[];
  /** insights slugs worth reading */
  articles?: { slug: string; title: string }[];
  /** the "instruct us" panel */
  panel: { title: string; lines: string[] };
  counties: string[];
};

export type CountyLanding = {
  kind: "county";
  slug: string;
  county: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  image: string;
  intro: string[];
  towns: string[];
  /** substrings matched against project.location */
  match: string[];
  faqs: Faq[];
};

const IE = ["Laois", "Kildare", "Carlow", "Kilkenny", "Tipperary", "Offaly", "Westmeath", "Dublin", "All Ireland"];

export const serviceLandings: ServiceLanding[] = [
  {
    kind: "service",
    slug: "subsidence-engineering",
    title: "Subsidence engineers",
    metaTitle: "Subsidence Engineers Ireland",
    metaDescription:
      "Subsidence investigation, monitoring and remediation design across Ireland. Reports written for insurers and loss adjusters. AOCA, Portlaoise, Dublin and Manchester.",
    eyebrow: "Expertise / Subsidence",
    lead: "Finding the true cause of movement, assessing the damage, and setting out the repair. Reports that insurers, loss adjusters and homeowners can act on.",
    image: "/images/2026-08-pamela-on-site.jpg",
    intro: [
      "We regularly investigate subsidence-related claims, identifying the true cause of movement, assessing damage and recommending appropriate remediation. Our investigations may include trial holes, drainage surveys, monitoring and specialist testing.",
      "AOCA carries out several hundred insurance-related inspections every year across Ireland and the UK. Subsidence is among the most common, and the most often misdiagnosed. Cracking that looks alarming is frequently seasonal movement or a leaking drain; cracking that looks minor can be the first sign of foundation failure. The investigation tells the difference.",
    ],
    sections: [
      {
        heading: "What causes subsidence",
        body: [
          "Most Irish subsidence comes from one of four things: shrinkable clay soils drying out, often made worse by nearby trees; leaking or collapsed drains washing fines from beneath the foundation; poorly compacted fill under an extension or a later addition; and, less commonly, mining, peat or made ground settling over time.",
          "Heave, the opposite movement, happens when a clay soil takes on water after a tree is removed. It produces similar cracking and needs the same discipline of investigation.",
        ],
      },
      {
        heading: "How we investigate",
        body: [
          "An inspection starts with the crack pattern, the age and construction of the building, and the ground and drainage around it. Where the cause is not clear from the inspection we use trial holes to see the foundation and the soil beneath it, drainage surveys with a camera, level and crack monitoring over a period of months, and laboratory testing of soil samples where clay shrinkage is suspected.",
          "The report sets out the cause, the extent of damage, whether movement is progressive or historic, and what has to happen next. Where a policy is involved it addresses the policy definitions directly.",
        ],
      },
      {
        heading: "Remediation",
        body: [
          "Not every subsidence case needs underpinning. Repairing a drain, managing a tree or allowing a season of monitoring is often the right answer. Where structural repair is needed we design it: underpinning, piled solutions, grout stabilisation or resin injection, and the crack repair and redecoration that follow. We can act as engineer through the works and certify them on completion.",
        ],
      },
      {
        heading: "Expert witness",
        body: [
          "We regularly provide expert witness services, drawing on years of direct project experience. From subsidence and structural failures to insurance claims and dispute resolution, our engineers offer clear, objective and practical technical evidence that reflects real-world engineering challenges and solutions.",
        ],
      },
    ],
    faqs: [
      { q: "Is every crack subsidence?", a: "No. Most cracks in Irish homes are from thermal and moisture movement, lintel deflection or settlement of a newer extension, and are not progressive. Diagonal stepped cracking wider than about 5 mm, cracks that widen over months, doors and windows sticking, and cracking near drains or trees are the signs worth an inspection." },
      { q: "Who instructs AOCA on a subsidence claim?", a: "Insurers, loss adjusters and loss assessors instruct us directly. Homeowners and solicitors also instruct us for independent reports, second opinions and expert witness work." },
      { q: "How long does an investigation take?", a: "The first inspection and report are quick. Where monitoring is needed to prove whether movement is ongoing, the monitoring itself runs over a period of months, and we say at the outset how long and why." },
      { q: "Do you cover all of Ireland?", a: "Yes, from the Portlaoise and Dublin offices, and the UK from Manchester." },
    ],
    related: [
      { slug: "insurance-forensic-engineering", title: "Insurance & Forensic Engineering" },
      { slug: "structural-engineering", title: "Structural Engineering" },
      { slug: "building-surveying", title: "Building Surveying" },
    ],
    articles: [{ slug: "when-to-worry-about-cracks-in-home", title: "When should I worry about cracks in my home?" }],
    panel: { title: "Instruct AOCA", lines: ["Several hundred insurance inspections a year.", "Reports written to the policy definitions.", "Portlaoise, Dublin and Manchester."] },
    counties: IE,
  },
  {
    kind: "service",
    slug: "structural-reports-insurance-claims",
    title: "Structural reports for insurance claims",
    metaTitle: "Structural Reports for Insurance Claims",
    metaDescription:
      "Independent structural engineer's reports for insurance claims: subsidence, fire, storm, flood and impact damage. Causation, extent and repair scope. AOCA, Ireland and the UK.",
    eyebrow: "Expertise / Structural reports",
    lead: "A clear engineer's report on what happened, why, how far the damage goes and what it takes to put right. Written for insurers, loss adjusters, loss assessors and property owners.",
    image: "/images/2026-08-pamela-on-site.jpg",
    intro: [
      "AOCA investigates a wide range of building damage claims, from minor defects to major structural failures. Our focus is on establishing causation, extent of damage and compliance with policy definitions.",
      "Every report is written to be read by someone who is not an engineer and to stand up if it is challenged. Property Claims Loss Assessors, who have worked with the team for many years, put it this way: rapid response times and a level of detail in the reporting that leaves no stone unturned.",
    ],
    sections: [
      {
        heading: "What the report contains",
        body: [
          "The cause of the damage and the evidence for it. The extent of the damage, including what is not visible. Whether the damage matches the event claimed or arises from a pre-existing defect, workmanship or materials. A scope of repair and, where asked, a cost estimate. Photographs, drawings and a plain summary at the front.",
        ],
      },
      {
        heading: "The types of claim we report on",
        body: [
          "Subsidence and heave: identifying the true cause of movement, assessing damage and recommending appropriate remediation.",
          "Fire damage: we assess fire-damaged buildings to determine structural integrity, repair feasibility and compliance with current regulations. Our inspections consider both visible damage and hidden structural implications, and our forensic fire investigation team also analyses scenes to determine the cause and mode of a fire.",
          "Storm damage: we investigate storm-related damage, particularly wind-induced failures. Our assessments distinguish between genuine storm events and defects arising from poor workmanship or material failure.",
          "Flooding: we undertake detailed flood investigations to determine contributory factors, including site alterations, culverted watercourses and drainage failures. Our reports address both causation and remediation requirements.",
          "Impact, vehicle strike, structural failure and collapse, water ingress and escape of water.",
        ],
      },
      {
        heading: "Who instructs us",
        body: [
          "Insurers and their panel loss adjusters, loss assessors acting for policyholders, solicitors in dispute and litigation, management companies and property owners. We are independent: the same report whoever is paying for it.",
        ],
      },
      {
        heading: "Expert witness and litigation",
        body: [
          "We regularly provide expert witness services, drawing on years of direct project experience. From subsidence and structural failures to insurance claims and dispute resolution, our engineers offer clear, objective and practical technical evidence.",
        ],
      },
    ],
    faqs: [
      { q: "How do I instruct AOCA?", a: "Send the address, a line on what happened and any photographs through the contact page, or ring the Portlaoise office. We confirm the inspection date by return." },
      { q: "Can the homeowner instruct you directly?", a: "Yes. Many of our reports are commissioned by policyholders or their loss assessor to support a claim or to get an independent second opinion." },
      { q: "Do you also design and supervise the repair?", a: "Yes. The same engineer can scope the works, prepare drawings, procure a contractor and certify completion, which keeps the claim moving." },
      { q: "Which areas do you cover?", a: "All of Ireland from Portlaoise and Dublin, and England and Wales from the Manchester office." },
    ],
    related: [
      { slug: "insurance-forensic-engineering", title: "Insurance & Forensic Engineering" },
      { slug: "subsidence-engineering", title: "Subsidence Engineering" },
      { slug: "structural-engineering", title: "Structural Engineering" },
    ],
    panel: { title: "Instruct AOCA", lines: ["Insurers, adjusters, assessors and owners.", "Causation, extent, policy compliance, repair scope.", "Ireland and the UK."] },
    counties: IE,
  },
  {
    kind: "service",
    slug: "latent-defects",
    title: "Latent defects engineers",
    metaTitle: "Latent Defects Engineers, Ireland & UK",
    metaDescription:
      "Latent defect investigation, technical audits and remediation management. Sole engineering consultant on the Liberty LDI programme, 1,000 homes remediated, £200m of UK projects.",
    eyebrow: "Expertise / Latent defects",
    lead: "Thirty years of finding, scoping and fixing the defects that show up after a building is finished, for insurers, warranty providers, developers and owners in Ireland and the UK.",
    image: "/images/2026-08-team-shot-3.jpg",
    intro: [
      "We have over 30 years of latent defect investigation and remediation experience in Ireland and the UK. AOCA Engineering Consultants were the sole engineering consultant for Liberty Syndicates and their Premier Guarantee LDI policy, managing the full investigation and remediation of over 1,000 residential homes.",
      "From our UK office in Manchester we have managed over £200m of latent defect remediation projects, from investigation, scope of works and design through to construction and handover. Through our sister company Fire Safety Consultants, AOCA is currently remediating apartment schemes throughout Ireland under the apartment defects remediation scheme.",
    ],
    sections: [
      {
        heading: "Technical audits during construction",
        body: [
          "AOCA has in the past managed the entire LDI portfolio for Liberty Syndicates through its sister company National Property Audit Services (NPAS). We still routinely carry out detailed evaluations to support insurance claims and risk management, inspecting construction work to identify potential issues and prevent them from turning into future claims for underwriters.",
        ],
      },
      {
        heading: "Investigation and scope",
        body: [
          "When a defect appears after completion, the first job is to establish what it is, how far it extends and whether it is a design, workmanship or materials failure. We open up, test and survey as needed, then write a scope of works that a contractor can price and a warranty provider can approve.",
        ],
      },
      {
        heading: "Remediation management",
        body: [
          "AOCA specialises in the management of building defect remediation projects, including pyrite, fire safety defects, water ingress, structural defects, façade defects and legacy construction issues. We manage the process from investigation and scope development through to design, procurement, site works, stakeholder communication and close-out.",
        ],
      },
      {
        heading: "Who we work for",
        body: [
          "Latent defects insurers and warranty providers, developers and contractors, owners' management companies, housing bodies and local authorities, and their solicitors. In the UK, brokers and underwriters who need an engineer's view before a policy is written or a claim is settled.",
        ],
      },
    ],
    faqs: [
      { q: "What counts as a latent defect?", a: "A defect in design, workmanship or materials that was not apparent at completion and shows up later, typically within the ten-year structural warranty period. Water ingress, fire-stopping omissions, foundation movement and façade failures are the common ones." },
      { q: "Do you work on apartment schemes?", a: "Yes. Through our sister company Fire Safety Consultants, AOCA is remediating apartment schemes throughout Ireland under the apartment defects remediation scheme. See the apartment defects page." },
      { q: "Do you cover the UK?", a: "Yes, from the Manchester office, where we have managed over £200m of latent defect remediation projects." },
    ],
    related: [
      { slug: "apartment-defects-remediation", title: "Apartment Defects Remediation" },
      { slug: "pyrite-defective-blocks", title: "Pyrite & Defective Blocks" },
      { slug: "project-construction-management", title: "Project & Construction Management" },
    ],
    panel: { title: "Talk to us", lines: ["Sole engineering consultant, Liberty LDI programme.", "1,000+ homes remediated.", "£200m+ of UK projects from Manchester."] },
    counties: [...IE, "Manchester & UK"],
  },
  {
    kind: "service",
    slug: "pyrite-defective-blocks",
    title: "Pyrite and defective concrete blocks",
    metaTitle: "Pyrite Testing & Remediation Engineers",
    metaDescription:
      "Pyrite testing, categorisation and remediation, and defective concrete block assessment. AOCA helped develop the NSAI standards for pyrite remediation and has managed some of Ireland's largest programmes.",
    eyebrow: "Expertise / Pyrite and defective blocks",
    lead: "From the test result to the finished floor. AOCA helped write the national standards for pyrite remediation and has managed some of the largest residential remediation programmes in Ireland.",
    image: "/images/2026-08-team-shot-3.jpg",
    intro: [
      "Between 2016 and 2023 AOCA helped develop two NSAI National Standards for pyrite remediation and went on to manage some of the largest residential remediation programmes in Ireland. The Dublin office, opened in 2014, grew to offer the full range of engineering services along with pyrite investigation.",
      "AOCA specialises in the management of building defect remediation projects, including pyrite, fire safety defects, water ingress, structural defects, façade defects and legacy construction issues. We manage the process from investigation and scope development through to design, procurement, site works, stakeholder communication and close-out.",
    ],
    sections: [
      {
        heading: "Pyrite: testing and what the result means",
        body: [
          "Pyritic hardcore under a ground floor slab swells as the pyrite oxidises, lifting floors, cracking walls and jamming doors. Testing to the Irish standard I.S. 398 samples the hardcore, measures its reactivity and assigns a damage category to the building. The category decides whether the house is monitored, remediated now, or needs no action.",
          "We arrange the sampling and laboratory testing, interpret the result in plain terms, and tell the owner what it means for the house, for a sale, and for a claim.",
        ],
      },
      {
        heading: "Pyrite remediation",
        body: [
          "Remediation means removing the ground floor slab and the hardcore beneath it, replacing both to the standard, and making good the house. We prepare the scope and specification, procure the contractor, supervise the works and certify completion so the owner has the paperwork a buyer or a bank will ask for.",
        ],
      },
      {
        heading: "Defective concrete blocks",
        body: [
          "Blocks containing excessive mica or pyrrhotite crumble and crack from the inside, the problem seen across Donegal, Mayo and increasingly elsewhere. The Enhanced Defective Concrete Blocks Grant Scheme funds assessment and remediation. We carry out the engineer's assessment to I.S. 465, categorise the damage, and prepare the remediation option and the application.",
        ],
      },
      {
        heading: "Modern methods of construction",
        body: [
          "We support Modern Methods of Construction manufacturers in developing robust, compliant and certifiable structural systems, providing structural design and technical documentation for NSAI Agrément certification and compliance with Part D of the Building Regulations.",
        ],
      },
    ],
    faqs: [
      { q: "My test came back with a category. What now?", a: "Send us the report. We will tell you in plain terms whether the house needs monitoring, remediation or nothing, and what the next step is for a claim or a sale." },
      { q: "Do you handle the whole remediation?", a: "Yes. Scope, specification, procurement, supervision and the completion certificate." },
      { q: "Do you cover defective concrete blocks as well as pyrite?", a: "Yes. We assess to I.S. 465 and prepare the engineer's report for the grant scheme." },
    ],
    related: [
      { slug: "latent-defects", title: "Latent Defects" },
      { slug: "structural-engineering", title: "Structural Engineering" },
      { slug: "building-surveying", title: "Building Surveying" },
    ],
    articles: [
      { slug: "an-overview-of-the-enhanced-defective-concrete-blocks-grant-scheme", title: "The Enhanced Defective Concrete Blocks Grant Scheme" },
      { slug: "defective-block-works-crisis-tackled-by-aoca", title: "Defective block works crisis tackled by AOCA" },
    ],
    panel: { title: "Talk to us", lines: ["Helped develop two NSAI standards for pyrite remediation.", "Some of Ireland's largest remediation programmes.", "Testing, categorisation, remediation, certification."] },
    counties: IE,
  },
  {
    kind: "service",
    slug: "apartment-defects-remediation",
    title: "Apartment defects remediation",
    metaTitle: "Apartment Defects Remediation Engineers",
    metaDescription:
      "Fire safety, structural and water ingress defects in apartments and duplexes built 1991 to 2013. Assessment, scope, design and remediation under the Interim Remediation Scheme. AOCA and Fire Safety Consultants.",
    eyebrow: "Expertise / Apartment defects",
    lead: "Engineering for owners' management companies dealing with fire safety, structural and water ingress defects in apartment and duplex schemes, under the Interim Remediation Scheme and the legislation that follows it.",
    image: "/images/2026-08-team-shot-3.jpg",
    intro: [
      "Between 1991 and 2013, 50% to 80% of apartments and duplexes were built with significant problems, such as those pertaining to fire safety, structural defects, and water ingress. Government has committed to a remediation scheme for them, with the Interim Remediation Scheme for fire safety defects already open and the Apartment and Duplex Defects Remediation Bill setting out the full scheme.",
      "Through our sister company Fire Safety Consultants, AOCA is remediating apartment schemes throughout Ireland under the scheme. Our Managing Director, Philip O'Connell, specialises in fire safety assessment and remediation of multi-unit residential developments.",
    ],
    sections: [
      {
        heading: "What the scheme covers",
        body: [
          "Apartments and duplexes built between 1991 and 2013 qualify where the problems happened because of faulty design, poor workmanship, or materials that did not meet the requirements of the Building Regulations in place when the properties were constructed. Fire safety defects are funded first through the Interim Remediation Scheme; structural and water ingress defects follow under the full scheme.",
        ],
      },
      {
        heading: "What AOCA does for an owners' management company",
        body: [
          "Fire safety assessment of the scheme, with a competent fire safety assessor, to establish the defects and the works required. Structural and water ingress investigation where those are also present. A scope of works and cost plan the scheme will fund. Design, procurement of a contractor, supervision of the works, liaison with the fire authority and the Housing Agency, and close-out with the certification the OMC needs.",
        ],
      },
      {
        heading: "Why an engineer-led team",
        body: [
          "Apartment defects rarely come one at a time. Missing fire-stopping sits behind the same walls as water ingress and the same floors as structural shortfalls. AOCA specialises in the management of building defect remediation projects, including pyrite, fire safety defects, water ingress, structural defects, façade defects and legacy construction issues, and manages the process from investigation through to close-out with one team.",
        ],
      },
    ],
    faqs: [
      { q: "Our scheme has already started fire safety works. Can we still apply?", a: "If you commenced addressing fire safety issues after 18 January 2023 you can be part of the scheme, subject to its conditions, including approval from the local fire authority before starting." },
      { q: "Who should instruct AOCA, the OMC or the managing agent?", a: "Either. We usually work with the OMC board and its managing agent together, and report to the board." },
      { q: "Do you also do the fire safety assessment?", a: "Yes, through Fire Safety Consultants, the AOCA sister company, which carries out the assessment and the fire engineering design." },
    ],
    related: [
      { slug: "fire-safety-disability-access", title: "Fire Safety & Disability Access" },
      { slug: "latent-defects", title: "Latent Defects" },
      { slug: "project-construction-management", title: "Project & Construction Management" },
    ],
    articles: [
      { slug: "apartment-duplex-defects-remediation-bill-2024", title: "Apartment and Duplex Defects Remediation Bill 2024" },
      { slug: "celtic-tiger-apartment-defects-repair-plan", title: "Celtic Tiger apartment defects: eligibility and timeline" },
      { slug: "government-announces-interim-fire-safety-funding-for-celtic-tiger-era-apartments", title: "Interim fire safety funding for Celtic Tiger era apartments" },
    ],
    panel: { title: "Talk to us", lines: ["Remediating apartment schemes throughout Ireland.", "Fire safety, structural and water ingress defects.", "One team from assessment to close-out."] },
    counties: ["Dublin", "Kildare", "Laois", "Leinster", "All Ireland"],
  },
];

export const countyLandings: CountyLanding[] = [
  {
    kind: "county", slug: "kildare", county: "Kildare",
    title: "Structural and civil engineers in Kildare",
    metaTitle: "Structural Engineers Kildare",
    metaDescription: "Civil, structural, insurance and forensic engineers serving Kildare from Portlaoise and Dublin. Schools, housing, commercial and insurance work. AOCA Engineering Consultants.",
    lead: "Newbridge, Naas, Kildare town, Athy, Maynooth and Celbridge, served from Portlaoise and from the Dublin office in Clondalkin.",
    image: "/images/2026-02-st-patricks-ns.jpg",
    intro: [
      "AOCA has worked across Kildare for thirty years, including the new St Patrick's National School in Newbridge, where the practice provided civil and structural engineering and acted as assigned certifier.",
      "Kildare sits between the two Irish offices. Engineers travel from Portlaoise to the west of the county and from Clondalkin to the north and east, so a site visit is rarely more than a day away.",
    ],
    towns: ["Newbridge", "Naas", "Kildare town", "Athy", "Maynooth", "Celbridge", "Leixlip", "Monasterevin"],
    match: ["Kildare", "Portarlington", "Mountmellick"],
    faqs: [
      { q: "Do you take on one-off houses and extensions in Kildare?", a: "Yes. Structural design, planning drawings, certification and building surveys for homeowners, alongside the larger commercial and public work." },
      { q: "Can you act as assigned certifier in Kildare?", a: "Yes. We did so on St Patrick's National School in Newbridge and on schools in Carlow." },
    ],
  },
  {
    kind: "county", slug: "carlow", county: "Carlow",
    title: "Structural and civil engineers in Carlow",
    metaTitle: "Structural Engineers Carlow",
    metaDescription: "Civil, structural, insurance and forensic engineers serving Carlow from Portlaoise, 35 minutes away. Schools, housing and insurance work. AOCA Engineering Consultants.",
    lead: "Carlow town, Tullow, Bagenalstown and the county, served from the head office in Portlaoise.",
    image: "/images/2026-02-st-patricks-ns.jpg",
    intro: [
      "Two Carlow schools are on the AOCA project list: Grange National School and Scoil Molaise, both with civil and structural engineering and assigned certifier services from the practice.",
      "Carlow is the closest county to the head office after Laois itself, and the engineers who did those schools are the ones who will turn up.",
    ],
    towns: ["Carlow town", "Tullow", "Bagenalstown", "Graiguecullen", "Leighlinbridge", "Hacketstown"],
    match: ["Carlow"],
    faqs: [
      { q: "How far is Carlow from the Portlaoise office?", a: "About 35 minutes by road, which is why Carlow work is run from head office." },
      { q: "Do you do insurance inspections in Carlow?", a: "Yes. Subsidence, fire, storm and flood inspections for insurers and loss adjusters across the county." },
    ],
  },
  {
    kind: "county", slug: "kilkenny", county: "Kilkenny",
    title: "Structural and civil engineers in Kilkenny",
    metaTitle: "Structural Engineers Kilkenny",
    metaDescription: "Civil, structural, insurance and forensic engineers serving Kilkenny from Portlaoise. Commercial, residential, community and insurance work. AOCA Engineering Consultants.",
    lead: "Kilkenny city, Castlecomer, Callan and Thomastown, served from the head office in Portlaoise, under an hour away.",
    image: "/images/office-building.jpg",
    intro: [
      "AOCA serves Kilkenny from Portlaoise, with the same engineers and the same services as the Laois and Carlow work: structural and civil design, building surveys, assigned certifier, fire safety and insurance inspections.",
      "The projects below are the nearest to Kilkenny on the AOCA list. Kilkenny work is added here as it is completed.",
    ],
    towns: ["Kilkenny city", "Castlecomer", "Callan", "Thomastown", "Graignamanagh", "Freshford"],
    match: ["Kilkenny", "Carlow", "Durrow", "Abbeyleix"],
    faqs: [
      { q: "Do you cover the whole county?", a: "Yes. Kilkenny city and the north of the county are under an hour from Portlaoise; the south is covered on the same basis." },
    ],
  },
  {
    kind: "county", slug: "tipperary", county: "Tipperary",
    title: "Structural and civil engineers in Tipperary",
    metaTitle: "Structural Engineers Tipperary",
    metaDescription: "Civil, structural, insurance and forensic engineers serving Tipperary from Portlaoise. Housing in Thurles, one-off homes and insurance work. AOCA Engineering Consultants.",
    lead: "Thurles, Roscrea, Nenagh, Templemore and Clonmel, served from the head office in Portlaoise.",
    image: "/images/office-building.jpg",
    intro: [
      "AOCA's Tipperary work includes the Bohernamona Road housing development in Thurles and Gortnahoe House, with structural and civil engineering from the Portlaoise team.",
      "North Tipperary is within an hour of head office; the south of the county is covered on the same basis.",
    ],
    towns: ["Thurles", "Roscrea", "Nenagh", "Templemore", "Clonmel", "Cashel", "Tipperary town"],
    match: ["Tipperary", "Thurles"],
    faqs: [
      { q: "Do you do housing schemes in Tipperary?", a: "Yes. Bohernamona Road in Thurles is on the project list, with civil and structural engineering from AOCA." },
    ],
  },
  {
    kind: "county", slug: "offaly", county: "Offaly",
    title: "Structural and civil engineers in Offaly",
    metaTitle: "Structural Engineers Offaly",
    metaDescription: "Civil, structural, insurance and forensic engineers serving Offaly from Portlaoise, 30 minutes from Tullamore. Housing, commercial and insurance work. AOCA Engineering Consultants.",
    lead: "Tullamore, Birr, Edenderry, Clara and Portarlington, served from the head office in Portlaoise.",
    image: "/images/office-building.jpg",
    intro: [
      "Offaly borders Laois and Tullamore is half an hour from the Portlaoise office. AOCA's work along the border includes the Droughhill housing development in Portarlington and projects across the Midlands.",
      "The projects below are the nearest to Offaly on the AOCA list. Offaly work is added here as it is completed.",
    ],
    towns: ["Tullamore", "Birr", "Edenderry", "Clara", "Portarlington", "Banagher"],
    match: ["Offaly", "Portarlington", "Mountmellick"],
    faqs: [
      { q: "Do you cover Tullamore and Birr?", a: "Yes. Both are within an hour of Portlaoise and served by the head office team." },
    ],
  },
  {
    kind: "county", slug: "westmeath", county: "Westmeath",
    title: "Structural and civil engineers in Westmeath",
    metaTitle: "Structural Engineers Westmeath",
    metaDescription: "Civil, structural, insurance and forensic engineers serving Westmeath and Athlone from Portlaoise. Commercial, residential and insurance work across the Midlands. AOCA Engineering Consultants.",
    lead: "Athlone, Mullingar, Moate and Kilbeggan, served from the head office in Portlaoise.",
    image: "/images/office-building.jpg",
    intro: [
      "AOCA serves Westmeath as part of its Midlands coverage from Portlaoise, with structural and civil design, building surveys, assigned certifier, fire safety and insurance inspections.",
      "The projects below are the nearest to Westmeath on the AOCA list. Westmeath work is added here as it is completed.",
    ],
    towns: ["Athlone", "Mullingar", "Moate", "Kilbeggan", "Castlepollard", "Kinnegad"],
    match: ["Westmeath", "Athlone", "Mountmellick", "Portarlington"],
    faqs: [
      { q: "Is Athlone within your area?", a: "Yes. Athlone and Mullingar are both served from Portlaoise, about an hour away." },
    ],
  },
];

export function getServiceLanding(slug: string) {
  return serviceLandings.find((l) => l.slug === slug) ?? null;
}
export function getCountyLanding(slug: string) {
  return countyLandings.find((l) => l.slug === slug) ?? null;
}
export function projectsForCounty(l: CountyLanding, limit = 6): Project[] {
  const exact = projects.filter((p) => l.match.slice(0, 1).some((k) => (p.location ?? "").includes(k)));
  const near = projects.filter((p) => l.match.slice(1).some((k) => (p.location ?? "").includes(k)));
  const out: Project[] = [];
  for (const p of [...exact, ...near]) if (!out.find((o) => o.slug === p.slug)) out.push(p);
  return out.slice(0, limit);
}
