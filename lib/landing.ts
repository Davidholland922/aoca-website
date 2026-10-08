import { projects, type Project } from "@/lib/site";

/**
 * Search landing pages: specialist service pages under /expertise and county
 * pages under /areas. They live beside the client-written expertise pages and
 * never replace them. While LANDING_LIVE is false they are reachable at their
 * address for review but carry noindex, sit outside the sitemap and are not
 * linked from any menu.
 */
export const LANDING_LIVE = true;

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
  /** council and planning authority, for the how-we-work section */
  council: string;
};

const IE = ["Laois", "Kildare", "Carlow", "Kilkenny", "Tipperary", "Offaly", "Westmeath", "Wicklow", "Wexford", "Dublin", "All Ireland"];

export const serviceLandings: ServiceLanding[] = [
  {
    kind: "service",
    slug: "subsidence-engineering",
    title: "Subsidence engineers",
    metaTitle: "Subsidence Engineers Ireland",
    metaDescription:
      "Subsidence investigation, monitoring, repair design and certification across Ireland. Independent engineers' reports insurers act on. Portlaoise and Dublin.",
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
        heading: "Subsidence repair: who does what",
        body: [
          "A subsidence repair has three parts, and it helps to know which is which. The engineer establishes the cause and designs the repair. A specialist contractor carries it out, whether that is underpinning, piling, resin injection or a drainage repair. The engineer then inspects the work as it proceeds and certifies it when it is finished, which is the document an insurer, a lender or a future buyer will ask for.",
          "AOCA is the engineer in that arrangement. We are independent of the contractors, so the repair we specify is the one the building needs. We can prepare the specification, help you obtain and compare contractors' prices, and supervise the work through to the completion certificate.",
        ],
      },
      {
        heading: "Commercial, public and multi-unit buildings",
        body: [
          "Subsidence is not only a problem for houses. We investigate movement in commercial and industrial buildings, schools, churches, apartment blocks and local authority housing, where the questions are the same but the stakes are higher: whether the building can stay in use, what has to be propped or monitored in the meantime, and how the repair can be phased around the people who use it.",
          "For councils, housing bodies, property managers and insurers with several affected properties, we survey and report across the portfolio so the worst cases are dealt with first and each repair is specified once.",
        ],
      },
      {
        heading: "Subsidence in Dublin and the east",
        body: [
          "Dublin and the commuter counties are served from our office in Centrepoint Business Park, Clondalkin. Much of the older housing in the city has shallow foundations and old clay drains, and a leaking or collapsed drain is one of the most common causes of the movement we are asked to look at. A drainage survey with a camera is often the first step, and often the cheapest answer.",
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
      { q: "Do you carry out the subsidence repair yourselves?", a: "We design, specify, supervise and certify the repair. The physical work is done by a specialist contractor, and we can help you obtain and compare prices. Keeping the two separate means the repair is specified by someone with nothing to gain from making it bigger." },
      { q: "Will my insurer accept an AOCA report?", a: "Insurers and loss adjusters instruct us directly for these reports, and we write them to the policy definitions. Where a homeowner instructs us, the report is independent and can be given to the insurer or loss assessor." },
      { q: "Do you investigate subsidence in Dublin?", a: "Yes, from the Dublin office in Clondalkin, along with Kildare, Wicklow and Meath. The rest of the country is covered from the head office in Portlaoise." },
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
      "Independent engineer's reports for insurance claims: subsidence, fire, storm, flood and impact damage. Cause, extent and repair scope. Ireland and the UK.",
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
      "Latent defect investigation, technical audits and remediation management. 1,000 homes remediated under the Liberty LDI programme, £200m of UK projects.",
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
      "Pyrite testing, categorisation and remediation, and defective concrete block assessment to I.S. 465. AOCA helped develop the NSAI pyrite remediation standards.",
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
      "Fire safety, structural and water ingress defects in apartments built 1991 to 2013. Assessment, design and remediation under the Interim Remediation Scheme.",
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

  {
    kind: "service",
    slug: "pre-purchase-structural-survey",
    title: "Pre-purchase structural surveys",
    metaTitle: "Structural Survey Before Buying a House",
    metaDescription:
      "Independent structural surveys and engineer's reports before you buy, sell or extend. Experienced engineers, plain written reports. Portlaoise and Dublin.",
    eyebrow: "Expertise / Structural surveys",
    lead: "An engineer's inspection of the structure before you commit, and a report that says plainly what is wrong, what it means and what it will take to put right.",
    image: "/images/structural-condition.jpg",
    intro: [
      "Investing in a property is a major financial commitment, so it matters that the investment is sound. A structural condition survey by qualified and experienced engineers gives a clear understanding of the property's structural integrity before contracts are signed.",
      "Our structural condition assessments provide a detailed evaluation of the condition, integrity and performance of existing buildings. We identify defects, deterioration and potential structural risks, and give clear recommendations for repair, remediation or further investigation.",
    ],
    sections: [
      {
        heading: "What the survey covers",
        body: [
          "The engineer looks at the property from the roof to the foundations: the roof structure, external and internal walls, floors, lintels and chimneys, any cracking or signs of movement, and the ground and drainage around the house. Where an extension, an attic conversion or an opened-up wall has been added, we look at how it was done and what it is sitting on.",
          "Where the inspection alone cannot answer a question we bring the building surveying tools to it: thermal imaging for heat loss, insulation defects and moisture patterns, targeted damp and moisture testing, and drone surveys for roofs and façades that cannot be reached safely from a ladder.",
        ],
      },
      {
        heading: "The report",
        body: [
          "Following the inspection we compile a detailed report outlining any issues found, complete with photographs and recommendations for rectification. It gives a comprehensive picture of the property's current structural health and a roadmap for future maintenance.",
          "The report is written in plain terms, so a buyer, a solicitor, a lender or a builder can act on it without translation. Where something needs a specialist test, for instance pyrite or defective blocks in an area where they occur, we say so and arrange it.",
        ],
      },
      {
        heading: "Extensions, alterations and older houses",
        body: [
          "Many surveys are for people who are not buying but planning: removing a load-bearing wall, converting an attic, adding an extension or taking on an older rural house. The same inspection tells you what the structure will carry, what has to be strengthened and what the sensible sequence of work is, and it leads straight into the structural design and drawings if the project goes ahead.",
        ],
      },
      {
        heading: "Engineer's reports and certification",
        body: [
          "Alongside surveys we provide structural design, planning drawings and certification for homeowners, and engineer's reports for lenders, insurers and solicitors where a sale, a mortgage or a claim depends on an independent view of the structure.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a structural survey as well as a surveyor's report?", a: "A valuer's or general surveyor's report is a broad condition check. When it flags cracking, movement, dampness or alterations, or when the house is old or has been extended, a structural engineer's survey looks at the structure specifically and says whether repair is needed and what it involves." },
      { q: "How long does it take?", a: "The inspection takes a few hours on site for a typical house. We agree the timing of the written report when you book, and we flag anything serious on the day." },
      { q: "Can you survey a house I am selling?", a: "Yes. A pre-sale survey lets you deal with issues on your own terms rather than in a buyer's negotiation." },
      { q: "Where do you survey?", a: "Laois and the Midlands from Portlaoise, Dublin and the commuter counties from Clondalkin, and the UK from Manchester." },
    ],
    related: [
      { slug: "structural-engineering", title: "Structural Engineering" },
      { slug: "building-surveying", title: "Building Surveying" },
      { slug: "subsidence-engineering", title: "Subsidence Engineering" },
    ],
    projectSlugs: ["one-off-bespoke-dwellings"],
    articles: [
      { slug: "why-structural-condition-survey-is-necessary", title: "Why do I need a structural condition survey?" },
      { slug: "when-to-worry-about-cracks-in-home", title: "When should I worry about cracks in my home?" },
    ],
    panel: { title: "Book a survey", lines: ["Engineers in practice since 1996.", "Report with photographs and clear recommendations.", "Portlaoise, Dublin and Manchester."] },
    counties: IE,
  },
  {
    kind: "service",
    slug: "fire-safety-certificates",
    title: "Fire safety certificates and disability access certificates",
    metaTitle: "Fire Safety Certificate & DAC Applications",
    metaDescription:
      "Fire safety certificate and disability access certificate applications, fire risk assessments and compliance reviews across Ireland.",
    eyebrow: "Expertise / Fire safety",
    lead: "Fire safety certificate and disability access certificate applications, fire risk assessments and compliance advice, delivered through Fire Safety Consultants, AOCA's joint venture with OCF.",
    image: "/images/fs-apartments.jpg",
    intro: [
      "AOCA, in conjunction with OCF, has established Fire Safety Consultants to pool resources and expertise and provide specialist fire safety and accessibility consultancy. It brings together internationally recognised expertise in fire engineering, fire safety compliance, accessibility, inspection, due diligence and structural fire engineering.",
      "For most building projects in Ireland other than houses, a Fire Safety Certificate and a Disability Access Certificate must be granted by the building control authority before work starts. We prepare and manage both applications, and we carry out the fire risk assessments and compliance reviews that existing buildings need.",
    ],
    sections: [
      {
        heading: "Fire safety certificate applications",
        body: [
          "A fire safety certificate application has to show the building control authority that the design meets Part B of the Building Regulations, either by following Technical Guidance Document B or through a performance-based fire engineering design. We prepare the fire strategy, the compliance report and the drawings, lodge the application, and deal with the authority's queries through to grant.",
          "Where works were carried out without a certificate, or the design changed after one was granted, we prepare regularisation and revised fire safety certificate applications.",
        ],
      },
      {
        heading: "Disability access certificate applications",
        body: [
          "A disability access certificate confirms that a new building, extension or material change of use complies with Part M of the Building Regulations on access and use. We prepare the access statement and drawings and lodge the application alongside the fire safety certificate so the two run together.",
          "Beyond the certificate we advise on accessibility, inclusive design and compliance with the relevant accessibility requirements, designing buildings everyone can use.",
        ],
      },
      {
        heading: "Fire risk assessments and inspections",
        body: [
          "We review building designs and existing buildings to identify fire safety risks and compliance issues, and carry out fire risk assessments covering hazards, existing measures and practical risk-reduction recommendations. Inspections cover fire doors, emergency lighting, alarm systems and passive fire protection, and we design and review fire detection, alarm and emergency lighting systems for compliance and life safety performance.",
        ],
      },
      {
        heading: "Apartment buildings and passive fire protection",
        body: [
          "Much of our fire safety work is in apartment buildings with defects from the construction boom: missing fire stopping, poor compartmentation and cavity barriers, and fire doors that do not perform. We assess structural behaviour in fire for steel, concrete, timber and composite structures and advise on fire stopping, compartmentation, cavity barriers, fire doors and structural fire protection, and we have followed the Government's remediation scheme for these buildings closely.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a fire safety certificate for my house?", a: "No. A single dwelling house, and an extension to one, is exempt. Apartment buildings, commercial, industrial, educational and most other buildings need a certificate for new construction, extensions and material changes of use." },
      { q: "When is a disability access certificate needed?", a: "For new buildings other than dwelling houses, and for material alterations, extensions and changes of use to them. Apartment blocks need one for the common areas." },
      { q: "Work was done without a certificate. What now?", a: "A regularisation fire safety certificate or regularisation disability access certificate can be applied for. We inspect what was built, identify what has to change and prepare the application." },
      { q: "Who carries out the work?", a: "The Fire Safety Consultants team, drawn from AOCA and OCF, working from the AOCA offices in Portlaoise, Dublin and Manchester." },
    ],
    related: [
      { slug: "fire-safety-disability-access", title: "Fire Safety & Disability Access" },
      { slug: "assigned-certifier", title: "Assigned Certifier & Regulatory Compliance" },
      { slug: "apartment-defects-remediation", title: "Apartment Defects Remediation" },
    ],
    articles: [
      { slug: "a-new-adventure-fire-safety-consultants", title: "A New Adventure: Fire Safety Consultants" },
      { slug: "government-announces-interim-fire-safety-funding-for-celtic-tiger-era-apartments", title: "Interim fire safety funding for Celtic Tiger era apartments" },
    ],
    panel: { title: "Instruct Fire Safety Consultants", lines: ["Joint venture of AOCA and OCF.", "Certificate applications, assessments and inspections.", "Ireland and the UK."] },
    counties: IE,
  },
  {
    kind: "service",
    slug: "assigned-certifier-bcar",
    title: "Assigned certifier services under BCAR",
    metaTitle: "Assigned Certifier Ireland (BCAR)",
    metaDescription:
      "Assigned certifier under BCAR for housing, schools and commercial projects across Ireland. Inspection plans, BCMS lodgement and completion certificates.",
    eyebrow: "Expertise / Assigned certifier",
    lead: "Independent, experienced assigned certifiers for projects under the Building Control (Amendment) Regulations, from multi-unit housing to schools and commercial developments.",
    image: "/images/ac-housing.jpg",
    intro: [
      "We regularly act as Assigned Certifier under the BCAR regime on a wide range of projects, from multi-unit housing to large commercial developments. Our practical experience of the Building Control Management System and the Code of Practice for Inspecting and Certifying Buildings and Works ensures robust oversight of design and construction, allowing projects to meet statutory requirements while keeping construction schedules on track.",
      "Recent assigned certifier appointments include St Patrick's National School in Newbridge and Grange National School and Scoil Molaise in Carlow, alongside the civil and structural engineering on each.",
    ],
    sections: [
      {
        heading: "What the assigned certifier does",
        body: [
          "Under the Building Control (Amendment) Regulations, S.I. 9 of 2014, the building owner appoints an assigned certifier before work starts. The assigned certifier prepares and signs the preliminary inspection plan, coordinates the ancillary certificates from the designers and the builder, inspects the works as they proceed, keeps the inspection records, and at the end signs the Certificate of Compliance on Completion with the builder. Until that certificate is on the statutory register the building cannot be opened, occupied or used.",
        ],
      },
      {
        heading: "How we run it",
        body: [
          "We set the inspection plan at the start so everyone knows which stages will be inspected and what evidence is needed. Ancillary certifiers are lined up early, inspections happen at the agreed stages, and records go onto the Building Control Management System as the job proceeds rather than in a rush at the end. That is what keeps the completion certificate from becoming the thing that delays the opening.",
        ],
      },
      {
        heading: "Independent inspections and due diligence",
        body: [
          "We offer independent third-party inspections to main contractors and specialist subcontractors to verify that construction work meets specified standards and regulations, identifying issues early. Our technical due diligence and design review services provide independent, expert assessment of architectural and engineering designs, evaluating feasibility, regulatory compliance, technical performance and safety.",
        ],
      },
      {
        heading: "One-off houses and extensions",
        body: [
          "Since 2015 the owner of a single dwelling, or of an extension under 40 square metres, can opt out of the BCAR certification process. Many owners still want an engineer to inspect the work and certify it for the lender, the insurer or a future sale. We provide that inspection and certification alongside the structural design.",
        ],
      },
    ],
    faqs: [
      { q: "Who can act as assigned certifier?", a: "The regulations limit the role to registered architects, chartered engineers and registered building surveyors. AOCA's assigned certifiers are chartered engineers." },
      { q: "Can the same firm design the structure and act as assigned certifier?", a: "Yes, and it is common. On the schools listed on this page AOCA provided the civil and structural engineering and acted as assigned certifier." },
      { q: "What happens if the works do not match the design?", a: "The inspection records capture it and the non-compliance is resolved before the Certificate of Compliance on Completion is signed. Catching it during construction rather than at the end is the point of the role." },
      { q: "Do you act as assigned certifier outside Laois?", a: "Yes, across Ireland from the Portlaoise and Dublin offices." },
    ],
    related: [
      { slug: "assigned-certifier", title: "Assigned Certifier & Regulatory Compliance" },
      { slug: "structural-engineering", title: "Structural Engineering" },
      { slug: "project-construction-management", title: "Project & Construction Management" },
    ],
    projectSlugs: ["st-patricks-national-school-newbridge-co-kildare", "grange-ns-carlow", "scoil-molaise-carlow"],
    panel: { title: "Appoint AOCA", lines: ["Assigned certifier on schools, housing and commercial projects.", "Inspection plans and BCMS lodgement handled.", "Portlaoise and Dublin, all of Ireland."] },
    counties: IE,
  },
  {
    kind: "service",
    slug: "structural-engineers-dublin",
    title: "Structural engineers in Dublin",
    metaTitle: "Structural Engineers Dublin",
    metaDescription:
      "Structural and civil engineers in Dublin, from our Clondalkin office. Apartments, data centres, public buildings, surveys and reports. In practice since 1996.",
    eyebrow: "Expertise / Dublin",
    lead: "Structural and civil engineering for Dublin and the commuter counties, from the AOCA office in Centrepoint Business Park, Clondalkin.",
    image: "/images/2026-02-glass-bottle-site.webp",
    intro: [
      "AOCA opened its Dublin office in May 2014. It has expanded considerably since and offers the full range of engineering services along with pyrite investigation, sharing resources with the head office in Portlaoise so every project has the people it needs.",
      "AOCA delivers structural engineering solutions that combine technical excellence with practical construction insight. Our engineers are fully conversant with the Eurocodes and current building regulations, enabling us to develop efficient, buildable and economical structural solutions tailored to each project.",
    ],
    sections: [
      {
        heading: "What we have built in Dublin",
        body: [
          "The Hole in the Wall is a 42-unit, seven-storey apartment scheme with a basement car park on a compact 0.2 hectare site, for which AOCA provided the full civil and structural design, including the basement and foundations and a first-floor transfer slab. At Vista Montana we brought a stalled 11-unit development through to completion with assessment, design and BCAR oversight.",
          "For South Dublin County Council we delivered the Dodder Valley sports pavilions and an equestrian centre as design and build projects, with bespoke foundations and sustainable drainage on difficult ground. At Harold's Cross we managed the refurbishment and upgrade of a hospice building, including roof replacement, a plant deck and hydrotherapy pool works.",
        ],
      },
      {
        heading: "Data centres and large commercial structures",
        body: [
          "The practice has provided structural engineering on a 52 MW data centre campus in Dublin, two two-storey facilities on a 22 acre site, and on data centres in Wales, Sweden and Finland. On one of Dublin's landmark regeneration sites in Ringsend we act as the independent third-party quality assurance advisor for the waterproofing systems.",
        ],
      },
      {
        heading: "Apartment defects, pyrite and insurance work",
        body: [
          "A large share of the Dublin office's work is on existing buildings: defects in apartment blocks from the construction boom, pyrite in floors, subsidence, and fire, flood and impact damage for insurers and loss adjusters. We investigate, report, design the remediation and supervise it through to certification.",
        ],
      },
      {
        heading: "Homeowners",
        body: [
          "For homeowners in Dublin we carry out structural surveys before a purchase, engineer's reports on cracking and movement, and the structural design and certification for extensions, attic conversions and the removal of load-bearing walls.",
        ],
      },
    ],
    faqs: [
      { q: "Where is your Dublin office?", a: "Unit E6, Centrepoint Business Park, Oak Drive, Clondalkin, Dublin 12, beside the M50 and the Naas Road. The phone number is 01 424 3035." },
      { q: "Which parts of Dublin do you cover?", a: "All of the city and county, with Kildare, Wicklow and Meath from the same office." },
      { q: "Do you take on small residential jobs in Dublin?", a: "Yes. Surveys, engineer's reports and structural design for extensions and alterations are a steady part of the work, alongside the large commercial and public projects." },
      { q: "Can you act as assigned certifier on a Dublin project?", a: "Yes. We act as assigned certifier under BCAR on housing, school and commercial projects." },
    ],
    related: [
      { slug: "structural-engineering", title: "Structural Engineering" },
      { slug: "civil-engineering", title: "Civil Engineering" },
      { slug: "pre-purchase-structural-survey", title: "Pre-purchase Structural Surveys" },
      { slug: "apartment-defects-remediation", title: "Apartment Defects Remediation" },
    ],
    projectSlugs: ["the-hole-in-the-wall", "sdcc-dodder-valley-pavilions", "52-mw-data-centre-dublin-bjd6", "vista-montana", "harolds-cross-hospice-refurbishment", "the-glass-bottle-site"],
    panel: { title: "Dublin office", lines: ["Centrepoint Business Park, Clondalkin, Dublin 12.", "01 424 3035", "Monday to Friday, 8:30am to 5:00pm."] },
    counties: ["Dublin", "Kildare", "Wicklow"],
  },
  {
    kind: "service",
    slug: "fire-safety-consultants-dublin",
    title: "Fire safety consultants in Dublin",
    metaTitle: "Fire Safety Consultants Dublin",
    metaDescription:
      "Fire safety consultants in Dublin: fire safety certificates, risk assessments, apartment defect surveys and fire engineering from our Clondalkin office.",
    eyebrow: "Expertise / Fire safety, Dublin",
    lead: "Fire engineering, fire safety certificates, risk assessments and apartment fire defect surveys for Dublin, delivered through Fire Safety Consultants, AOCA's joint venture with OCF.",
    image: "/images/fs-apartments.jpg",
    intro: [
      "AOCA, in conjunction with OCF, has established Fire Safety Consultants to pool resources and expertise and provide specialist fire safety and accessibility consultancy. It brings together internationally recognised expertise in fire engineering, fire safety compliance, accessibility, inspection, due diligence and structural fire engineering.",
      "In Dublin the work is led from the AOCA office in Clondalkin, for developers, design teams, owners' management companies, property managers and building owners across the city and county.",
    ],
    sections: [
      {
        heading: "Fire safety certificates and disability access certificates",
        body: [
          "New buildings, extensions and material changes of use in Dublin, other than houses, need a Fire Safety Certificate and a Disability Access Certificate from the building control authority: Dublin City Council, South Dublin, Fingal or Dún Laoghaire-Rathdown. We prepare the fire strategy, the compliance report and the drawings, lodge both applications and deal with the authority's queries through to grant, including regularisation applications where work was done without a certificate.",
        ],
      },
      {
        heading: "Apartment buildings and owners' management companies",
        body: [
          "Many Dublin apartment blocks built during the construction boom have fire safety defects: missing fire stopping, poor compartmentation and cavity barriers, and fire doors that do not perform. We survey the building, set out what has to be done and in what order, and design and oversee the remediation, and we have followed the Government's remediation scheme and its interim fire safety funding closely.",
        ],
      },
      {
        heading: "Fire risk assessments and inspections",
        body: [
          "We carry out fire risk assessments covering hazards, existing measures and practical risk-reduction recommendations, and inspections of fire doors, emergency lighting, alarm systems and passive fire protection. We also design and review fire detection, alarm and emergency lighting systems for compliance and life safety performance.",
        ],
      },
      {
        heading: "Fire engineering and due diligence",
        body: [
          "For new and existing buildings we provide performance-based and prescriptive fire safety design, and specialist assessment of structural behaviour in fire for steel, concrete, timber and composite structures. For acquisitions, developments, design teams and contractors we provide independent fire safety reviews and third-party checking.",
        ],
      },
    ],
    faqs: [
      { q: "Do you prepare fire safety certificate applications for Dublin City Council?", a: "Yes, and for South Dublin, Fingal and Dún Laoghaire-Rathdown County Councils. We prepare and lodge the application and manage it through to grant." },
      { q: "We are an owners' management company with fire defects. Where do we start?", a: "With a survey that establishes what is wrong and how serious it is. From that we set out the interim measures, the remediation and the cost, which is also what an application to the remediation scheme needs." },
      { q: "Do you carry out fire risk assessments for commercial premises?", a: "Yes, for offices, retail, industrial and multi-unit residential buildings across Dublin." },
      { q: "Who does the work?", a: "The Fire Safety Consultants team, drawn from AOCA and OCF, working from the AOCA office in Clondalkin." },
    ],
    related: [
      { slug: "fire-safety-disability-access", title: "Fire Safety & Disability Access" },
      { slug: "fire-safety-certificates", title: "Fire Safety Certificate Applications" },
      { slug: "apartment-defects-remediation", title: "Apartment Defects Remediation" },
      { slug: "structural-engineers-dublin", title: "Structural Engineers Dublin" },
    ],
    articles: [
      { slug: "a-new-adventure-fire-safety-consultants", title: "A New Adventure: Fire Safety Consultants" },
      { slug: "government-announces-interim-fire-safety-funding-for-celtic-tiger-era-apartments", title: "Interim fire safety funding for Celtic Tiger era apartments" },
      { slug: "celtic-tiger-apartment-defects-repair-plan", title: "Apartment defects: repair plan eligibility and timeline" },
    ],
    panel: { title: "Instruct Fire Safety Consultants", lines: ["Joint venture of AOCA and OCF.", "Clondalkin, Dublin 12. 01 424 3035.", "Certificates, assessments, surveys and fire engineering."] },
    counties: ["Dublin", "Kildare", "Wicklow"],
  },
];

export const countyLandings: CountyLanding[] = [
  {
    kind: "county", slug: "laois", county: "Laois", council: "Laois County Council",
    title: "Structural and civil engineers in Laois",
    metaTitle: "Structural & Civil Engineers Laois",
    metaDescription: "Structural and civil engineers in Laois, based in Portlaoise since 1996. Schools, churches, housing, retail, surveys and one-off homes.",
    lead: "Portlaoise, Portarlington, Mountmellick, Abbeyleix, Stradbally and Durrow, from the head office at Lismard House on the Timahoe Road.",
    image: "/images/office-building.jpg",
    intro: [
      "Laois is home. The practice was founded in Portlaoise in 1996 and the head office is still at Lismard House on the Timahoe Road, so more AOCA projects sit in Laois than in any other county: Stradbally Fire Station, Portlaoise Retail Park, People First Credit Union, Ratheniska Church and the Heath Church, housing in Abbeyleix, Mountmellick, Durrow and Portarlington, and a great many one-off homes.",
      "For a homeowner that means an engineer who can be on site the same week. For developers, schools and parishes it means a team that knows the county's planners, ground conditions and builders.",
    ],
    towns: ["Portlaoise", "Portarlington", "Mountmellick", "Abbeyleix", "Stradbally", "Durrow", "Mountrath", "Rathdowney", "Ballyroan", "The Heath"],
    match: ["Laois", "Portlaoise"],
    faqs: [
      { q: "Do you take on small jobs in Laois?", a: "Yes. Extensions, attic conversions, structural surveys before a purchase, engineer's reports and certification for one-off houses are a steady part of the Portlaoise office's work." },
      { q: "Can you act as assigned certifier in Laois?", a: "Yes. We act as assigned certifier on housing, school and commercial projects across the county." },
      { q: "Do you test for pyrite and defective blocks in Laois?", a: "Yes. We arrange sampling and testing to I.S. 398 and I.S. 465 and prepare the engineer's report, and we design and supervise the remediation where it is needed." },
    ],
  },
  {
    kind: "county", slug: "wicklow", county: "Wicklow", council: "Wicklow County Council",
    title: "Structural and civil engineers in Wicklow",
    metaTitle: "Structural & Civil Engineers Wicklow",
    metaDescription: "Structural and civil engineers for Wicklow, from our Dublin and Portlaoise offices. Façade design on the award-winning Arklow wastewater plant.",
    lead: "Bray, Greystones, Wicklow town, Arklow, Blessington and Baltinglass, served from the Dublin office and from Portlaoise.",
    image: "/images/2026-02-arklow_hero_final_dou4go-1.jpg",
    intro: [
      "In Wicklow AOCA provided the structural design of the fixing system for the architectural fin louvres on the award-winning Arklow Wastewater Treatment Plant, a façade in an exposed coastal location that had to hold its line in every wind.",
      "North Wicklow is served from the Dublin office in Clondalkin, under an hour from Bray and Greystones. West Wicklow around Blessington and Baltinglass is as close to Portlaoise as it is to Dublin.",
    ],
    towns: ["Bray", "Greystones", "Wicklow town", "Arklow", "Blessington", "Baltinglass", "Rathdrum", "Newtownmountkennedy"],
    match: ["Wicklow", "Arklow", "Dublin"],
    faqs: [
      { q: "Do you take on houses and extensions in Wicklow?", a: "Yes. Structural design, planning drawings, certification and pre-purchase structural surveys for homeowners, alongside commercial and public work." },
      { q: "Do you carry out insurance inspections in Wicklow?", a: "Yes. Subsidence, fire, flood and impact damage inspections for insurers and loss adjusters, from the Dublin office." },
    ],
  },
  {
    kind: "county", slug: "wexford", county: "Wexford", council: "Wexford County Council",
    title: "Structural and civil engineers in Wexford",
    metaTitle: "Structural & Civil Engineers Wexford",
    metaDescription: "Structural and civil engineers for Wexford, including work at Rosslare Europort. Inspections, reports and design from Portlaoise and Dublin.",
    lead: "Wexford town, Gorey, Enniscorthy, New Ross and Rosslare, served from Portlaoise and from the Dublin office.",
    image: "/images/2026-08-maxresdefault.jpg",
    intro: [
      "AOCA has provided engineering services at Rosslare Europort, Ireland's gateway port to Europe, and carries out insurance and forensic inspections across the south east for insurers and loss adjusters.",
      "Wexford is reached from Portlaoise by the M9 and from Dublin by the M11, so site visits and inspections are straightforward to arrange from either office.",
    ],
    towns: ["Wexford town", "Gorey", "Enniscorthy", "New Ross", "Rosslare", "Bunclody", "Courtown"],
    match: ["Wexford", "Rosslare", "Carlow"],
    faqs: [
      { q: "Is Wexford within your area?", a: "Yes. Wexford is served from Portlaoise and from the Dublin office for design, surveys, certification and insurance inspections." },
      { q: "Do you do structural surveys for house purchases in Wexford?", a: "Yes. An engineer inspects the property and reports with photographs and clear recommendations before you sign." },
    ],
  },
  {
    kind: "county", slug: "kildare", county: "Kildare", council: "Kildare County Council",
    title: "Structural and civil engineers in Kildare",
    metaTitle: "Structural & Civil Engineers Kildare",
    metaDescription: "Structural and civil engineers for Naas, Newbridge, Maynooth and all of Kildare. Surveys, reports, design and certification from Portlaoise and Dublin.",
    lead: "Newbridge, Naas, Kildare town, Athy, Maynooth and Celbridge, served from Portlaoise and from the Dublin office in Clondalkin.",
    image: "/images/2026-02-st-patricks-ns.jpg",
    intro: [
      "AOCA has worked across Kildare for thirty years, including the new St Patrick's National School in Newbridge, where the practice provided civil and structural engineering and acted as assigned certifier.",
      "Kildare sits between the two Irish offices. Engineers travel from Portlaoise to the west of the county and from Clondalkin to the north and east, so a site visit is rarely more than a day away.",
      "Naas and Newbridge are both about half an hour from either office. For homeowners there that means structural surveys before a purchase, engineer's reports for cracks and subsidence, and design and certification for extensions. For developers and businesses it means civil and structural design, assigned certifier services and fire safety certificate applications from one practice.",
    ],
    towns: ["Newbridge", "Naas", "Kildare town", "Athy", "Maynooth", "Celbridge", "Leixlip", "Monasterevin"],
    match: ["Kildare", "Portarlington", "Mountmellick"],
    faqs: [
      { q: "Do you take on one-off houses and extensions in Kildare?", a: "Yes. Structural design, planning drawings, certification and building surveys for homeowners, alongside the larger commercial and public work." },
      { q: "Can you act as assigned certifier in Kildare?", a: "Yes. We did so on St Patrick's National School in Newbridge and on schools in Carlow." },
      { q: "Do you have engineers covering Naas and Newbridge?", a: "Yes. Both towns are about half an hour from the Portlaoise and Dublin offices, and we worked in Newbridge on St Patrick's National School. We carry out structural surveys, engineer's reports, design and certification across both." },
      { q: "Can I get a structural survey in Kildare before I buy a house?", a: "Yes. An engineer inspects the property from roof to foundations and gives you a written report with photographs and clear recommendations before you sign." },
    ],
  },
  {
    kind: "county", slug: "carlow", county: "Carlow", council: "Carlow County Council",
    title: "Structural and civil engineers in Carlow",
    metaTitle: "Structural & Civil Engineers Carlow",
    metaDescription: "Civil, structural, insurance and forensic engineers for Carlow, 35 minutes from the Portlaoise office. Schools, housing and insurance work since 1996.",
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
    kind: "county", slug: "kilkenny", county: "Kilkenny", council: "Kilkenny County Council",
    title: "Structural and civil engineers in Kilkenny",
    metaTitle: "Structural & Civil Engineers Kilkenny",
    metaDescription: "Civil, structural, insurance and forensic engineers for Kilkenny, under an hour from Portlaoise. Commercial, residential and insurance work since 1996.",
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
    kind: "county", slug: "tipperary", county: "Tipperary", council: "Tipperary County Council",
    title: "Structural and civil engineers in Tipperary",
    metaTitle: "Structural & Civil Engineers Tipperary",
    metaDescription: "Civil, structural, insurance and forensic engineers for Tipperary, from Portlaoise. Housing in Thurles, one-off homes and insurance work since 1996.",
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
    kind: "county", slug: "offaly", county: "Offaly", council: "Offaly County Council",
    title: "Structural and civil engineers in Offaly",
    metaTitle: "Structural & Civil Engineers Offaly",
    metaDescription: "Civil, structural, insurance and forensic engineers for Offaly, 30 minutes from Tullamore. Housing, commercial and insurance work since 1996.",
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
    kind: "county", slug: "westmeath", county: "Westmeath", council: "Westmeath County Council",
    title: "Structural and civil engineers in Westmeath",
    metaTitle: "Structural & Civil Engineers Westmeath",
    metaDescription: "Civil, structural, insurance and forensic engineers for Westmeath and Athlone, from Portlaoise. Commercial, residential and insurance work since 1996.",
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

/** Landing pages worth linking from an insights article, chosen by what the article is about. */
const ARTICLE_RULES: { test: RegExp; slug: string }[] = [
  { test: /pyrite|defective (concrete )?block|mica/i, slug: "pyrite-defective-blocks" },
  { test: /apartment|duplex/i, slug: "apartment-defects-remediation" },
  { test: /crack|subsidence/i, slug: "subsidence-engineering" },
  { test: /structural (condition )?survey|buying a (house|home|property)/i, slug: "pre-purchase-structural-survey" },
  { test: /fire safety|fire engineering|fire certificate/i, slug: "fire-safety-certificates" },
  { test: /latent defect|cladding|remediation/i, slug: "latent-defects" },
  { test: /insurance|insurer|loss adjuster/i, slug: "structural-reports-insurance-claims" },
];
export function landingsForArticle(text: string, limit = 3): ServiceLanding[] {
  const out: ServiceLanding[] = [];
  for (const r of ARTICLE_RULES) {
    if (!r.test.test(text)) continue;
    const l = getServiceLanding(r.slug);
    if (l && !out.includes(l)) out.push(l);
    if (out.length >= limit) break;
  }
  return out;
}
