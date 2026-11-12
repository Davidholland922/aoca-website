import type { Faq } from "@/lib/landing";

/**
 * Questions and answers for the nine client-written expertise pages and the
 * company page. Every answer restates what AOCA has already published on
 * that page (the August 2026 expertise copy), in question form, so search
 * engines and AI assistants can quote a direct answer. Nothing here should
 * claim anything the page itself does not.
 *
 * Keyed by expertise slug so the list survives edits made through /admin.
 */
export const expertiseFaqs: Record<string, Faq[]> = {
  "insurance-forensic-engineering": [
    {
      q: "What types of insurance claims does AOCA investigate?",
      a: "AOCA investigates subsidence, structural damage, flooding, fire damage and storm damage claims. We carry out several hundred insurance-related inspections every year and deliver clear, objective and technically robust reports.",
    },
    {
      q: "Who does AOCA carry out insurance and forensic engineering work for?",
      a: "We act for insurers, loss adjusters, legal teams and private clients. Our role is to establish the cause of damage, its extent and whether it meets policy definitions, independently of who instructs us.",
    },
    {
      q: "How does AOCA investigate a subsidence claim?",
      a: "We identify the true cause of movement, assess the damage and recommend appropriate remediation. Depending on the property, the investigation may include trial holes, drainage surveys, monitoring and specialist testing.",
    },
    {
      q: "Can AOCA tell genuine storm damage from poor workmanship?",
      a: "Yes. Our storm damage assessments, particularly of wind-induced failures, distinguish between genuine storm events and defects arising from poor workmanship or material failure.",
    },
    {
      q: "Does AOCA handle insurance claims outside Ireland?",
      a: "Yes. We cover Ireland, the UK and Europe, with active live cases across the continent.",
    },
  ],
  "civil-engineering": [
    {
      q: "What civil engineering services does AOCA provide?",
      a: "Road design, DMURS-compliant street and active travel design, Road Safety Audits, Traffic and Transport Assessments, sustainable drainage (SuDS), flood risk assessment, foul water pumping stations and geotechnical engineering, for new developments and upgrade or retrofit works.",
    },
    {
      q: "Does AOCA design SuDS and nature-based drainage?",
      a: "Yes. We design nature-based solutions and SuDS-led drainage strategies that enhance biodiversity and amenity value, satisfy planning authorities and perform over the life of the development, including blue and green roofs designed with architects.",
    },
    {
      q: "Does AOCA carry out Flood Risk Assessments?",
      a: "Yes. We prepare Flood Risk Assessments, flood modelling and Surface Water Management Plans to reduce flood risk to developments and their surroundings as the climate changes.",
    },
    {
      q: "At what stage of a project does AOCA get involved?",
      a: "From the start. We work from feasibility, pre-planning and Uisce Éireann liaison through design and inspection to handover.",
    },
    {
      q: "What does a geotechnical investigation by AOCA include?",
      a: "Utilities and topographical surveys, infiltration tests, CBR tests, boreholes, in-situ soil sampling, laboratory testing and trial holes, followed by geotechnical design and consultation.",
    },
  ],
  "structural-engineering": [
    {
      q: "What structural engineering services does AOCA offer?",
      a: "Full structural design and inspection across the commercial, industrial, residential and community sectors, including steel and reinforced concrete design, structural condition assessments, BIM-based design and structural design for Modern Methods of Construction.",
    },
    {
      q: "Does AOCA use BIM for structural design?",
      a: "Yes. BIM is embedded in our engineering workflows. Our engineers use BIM tools daily to build intelligent 3D models, coordinate with other disciplines, identify clashes early and produce clear, consistent information.",
    },
    {
      q: "What is a Structural Condition Assessment?",
      a: "A detailed evaluation of the condition, integrity and performance of an existing building or structure. We identify defects, deterioration and potential structural risks, and give clear recommendations for repair, remediation or further investigation.",
    },
    {
      q: "Can AOCA help with NSAI Agrément certification for MMC systems?",
      a: "Yes. We support Modern Methods of Construction manufacturers, including timber frame and light-gauge steel systems, with structural design and technical documentation for NSAI Agrément certification and compliance with Part D of the Building Regulations.",
    },
    {
      q: "Where does AOCA carry out structural engineering projects?",
      a: "Across Ireland, the UK and Europe. Our engineers are fully conversant with the Eurocodes and current building regulations.",
    },
  ],
  "fire-safety-disability-access": [
    {
      q: "Who provides AOCA's fire safety services?",
      a: "Fire Safety Consultants, the specialist practice AOCA established with OCF to pool resources and expertise in fire safety and accessibility consultancy.",
    },
    {
      q: "What fire safety services are available?",
      a: "Performance-based and prescriptive fire engineering design, fire safety review and assessment, fire risk assessments, inspections of fire doors, alarms, emergency lighting and passive fire protection, fire detection and alarm system design, emergency lighting design, structural fire engineering and independent due diligence.",
    },
    {
      q: "Does AOCA provide accessibility and disability access consultancy?",
      a: "Yes. Through Fire Safety Consultants we advise on accessibility, inclusive design and compliance with the relevant accessibility requirements.",
    },
    {
      q: "Can you review an existing building for fire safety?",
      a: "Yes. We review existing buildings and building designs to identify fire safety risks and compliance issues, and carry out fire risk assessments with practical risk-reduction recommendations.",
    },
  ],
  "project-construction-management": [
    {
      q: "What does AOCA's project management service cover?",
      a: "Strategic project advice, design team coordination, planning and statutory process management, procurement and tender management, programme, cost, risk and change management, site monitoring and progress reporting, and handover and close-out.",
    },
    {
      q: "What makes AOCA's project management engineering-led?",
      a: "We combine project management with in-house civil, structural, fire engineering and building surveying expertise. That lets us identify technical issues early, challenge design assumptions and resolve problems that arise during a project.",
    },
    {
      q: "Does AOCA manage building defect remediation projects?",
      a: "Yes. We manage remediation of pyrite, fire safety defects, water ingress, structural defects, façade defects and legacy construction issues, from investigation and scope through design, procurement, site works and close-out. AOCA has managed some of the largest residential remediation programmes in Ireland.",
    },
    {
      q: "Can AOCA act as Employer's Representative?",
      a: "Yes. We act as the client's representative during construction: administering the contract, managing communications, chairing meetings, tracking progress and protecting the client's interests.",
    },
    {
      q: "Which sectors does AOCA manage projects in?",
      a: "Residential, commercial, industrial, healthcare and public sector projects, covering construction, development, remediation and technical engineering work.",
    },
  ],
  "consulting-engineering": [
    {
      q: "What experience does AOCA have with latent defects?",
      a: "Over 30 years of latent defect investigation and remediation in Ireland and the UK. AOCA was the sole engineering consultant for Liberty Syndicates and their Premier Guarantee LDI policy, managing the investigation and remediation of over 1,000 homes, and has managed over £200m of latent defect remediation projects from its Manchester office.",
    },
    {
      q: "Does AOCA provide expert witness services?",
      a: "Yes. We regularly provide expert witness services for litigation, from subsidence and structural failures to insurance claims and dispute resolution, offering clear, objective and practical technical evidence.",
    },
    {
      q: "Can AOCA act as PSDP?",
      a: "Yes. We regularly provide Project Supervisor Design Process (PSDP) and health and safety consultancy services. Many of our staff have trained through the ACEI and are competent to fulfil this legally required role.",
    },
    {
      q: "Does AOCA remediate pyrite, fire, flood and subsidence damage?",
      a: "Yes. Our team has extensive experience assessing and remediating damaged or defective buildings, including pyrite-affected homes, fire-damaged structures, flood-impacted properties and subsidence cases.",
    },
    {
      q: "Can AOCA manage a planning application?",
      a: "Yes. We have significant experience securing planning permission and managing the full planning application process, including site appraisal, surveys, environmental coordination and regulatory compliance.",
    },
  ],
  "building-envelope-engineering": [
    {
      q: "What is building envelope engineering?",
      a: "The engineering of a building's roof and façade systems so that they are structurally sound, fire safe, moisture robust, thermally efficient and compliant with the project specification.",
    },
    {
      q: "What kinds of buildings does AOCA provide envelope engineering for?",
      a: "Data centres, pharmaceutical buildings, industrial buildings and other mission-critical facilities, across multiple European jurisdictions.",
    },
    {
      q: "Does AOCA design to FM Global requirements?",
      a: "Yes. We carry out roof and façade wind load design to both Eurocode and FM Global requirements.",
    },
    {
      q: "Does AOCA carry out condensation risk analysis?",
      a: "Yes. We provide condensation risk analysis and hygrothermal modelling, along with U-value, thermal bridge and energy performance assessments.",
    },
    {
      q: "Can AOCA inspect an envelope installation as an independent third party?",
      a: "Yes. We provide design audits, peer reviews and compliance checks, plus third-party site inspections and envelope audits.",
    },
  ],
  "building-surveying": [
    {
      q: "What building surveying services does AOCA provide?",
      a: "Engineering support for fitout and refurbishment, digital surveying, legal mapping, building thermal imaging, drone surveys, and damp and moisture surveys.",
    },
    {
      q: "What can a thermal imaging survey find?",
      a: "Heat loss, insulation defects, thermal bridging, moisture patterns and problems with building envelope performance.",
    },
    {
      q: "Why use a drone for a building survey?",
      a: "Drone surveys give safe, efficient access to roofs, façades and difficult locations, capturing high-quality visual information for assessment without scaffolding or access equipment.",
    },
    {
      q: "Does AOCA prepare legal maps for property and land registration?",
      a: "Yes. We prepare accurate legal mapping for property, planning and land matters, supporting boundary identification, title registration, conveyancing and development requirements.",
    },
    {
      q: "How does AOCA investigate damp?",
      a: "With targeted surveys, testing and analysis to identify the cause of the damp or moisture problem, followed by recommendations for the appropriate remedial solution.",
    },
  ],
  "assigned-certifier": [
    {
      q: "What does an Assigned Certifier do?",
      a: "Under Ireland's BCAR regime the Assigned Certifier oversees the inspection and certification of design and construction through the Building Control Management System. AOCA regularly acts as Assigned Certifier, from multi-unit housing to large commercial developments.",
    },
    {
      q: "Does AOCA carry out independent third-party inspections?",
      a: "Yes. We provide independent, impartial inspections for main contractors and specialist subcontractors to verify that construction work meets the specified standards and regulations.",
    },
    {
      q: "What are LDI inspections?",
      a: "Inspections of construction work carried out for latent defects insurance. AOCA previously managed the entire LDI portfolio for Liberty Syndicates through its sister company National Property Audit Services, and still routinely inspects work to stop potential issues becoming future claims for underwriters.",
    },
    {
      q: "What is Technical Due Diligence?",
      a: "An independent, expert assessment of architectural and engineering designs. We evaluate design feasibility, regulatory compliance, technical performance and safety, and identify risks, deficiencies and opportunities for improvement.",
    },
    {
      q: "Where does AOCA provide regulatory compliance services?",
      a: "In Ireland, the UK and Europe, coordinating with design teams and local authorities to navigate building control processes.",
    },
  ],
};

/** Plain facts about the firm, for the company page. */
export const companyFaqs: Faq[] = [
  {
    q: "What is AOCA?",
    a: "AOCA Engineering Consultants (Aidan O'Connell & Associates Ltd.) is an Irish multidisciplinary engineering consultancy providing civil and structural engineering, insurance and forensic engineering, fire safety, building envelope engineering, building surveying, project management and regulatory compliance services.",
  },
  {
    q: "When was AOCA founded?",
    a: "AOCA was founded in Portlaoise in 1996 by Aidan O'Connell and has operated continuously since.",
  },
  {
    q: "Where are AOCA's offices?",
    a: "The head office is at Lismard House, Timahoe Road, Portlaoise, Co. Laois. AOCA also has a Dublin office at Centrepoint Business Park, Clondalkin, opened in 2014, and a UK office.",
  },
  {
    q: "Who leads AOCA?",
    a: "Philip O'Connell is Managing Director, working with Director Brian Byrne and Associate Directors Emmett O'Reilly and Colin Scott. Founder Aidan O'Connell continues to contribute as a consultant.",
  },
  {
    q: "Where does AOCA work?",
    a: "Across Ireland, the UK and Europe, from one-off houses to data centres and national infrastructure.",
  },
  {
    q: "What is the relationship between AOCA and Fire Safety Consultants?",
    a: "Fire Safety Consultants is the specialist fire safety and accessibility practice AOCA established in conjunction with OCF.",
  },
];
