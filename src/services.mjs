export const services = [
  {
    slug: 'energy-performance-certificate', short: 'EPC', title: 'Energy Performance Certificates', group: 'Certificates & surveys', icon: 'energy',
    intro: 'A clearer picture of your property’s energy performance.',
    description: 'An energy assessment that helps you understand how a property uses energy and where improvements could make a difference.',
    body: 'An Energy Performance Certificate gives a property an energy-efficiency rating and outlines potential improvements. Whether you are preparing to market a home or reviewing an existing property, it provides a useful starting point for understanding its performance.',
    detail: 'Tell us about your property, its size and any existing certificate. We can discuss the assessment you need and the information to have ready before a visit.',
    includes: ['Assessment of relevant building features and services', 'Energy-efficiency rating and certificate', 'Recommendations for potential improvements', 'Digital certificate or official record link'],
    prepare: ['Share the property address, type and approximate size.', 'Have any existing EPC or improvement records available.', 'Arrange access to rooms, heating controls and relevant spaces.'],
    audience: 'Homeowners, landlords and property agents',
    faqs: [['Can you assess a flat?', 'Tell us the type and size of the flat when enquiring so we can confirm the appropriate assessment.'], ['Should I keep my previous EPC?', 'Yes. An existing certificate and records of insulation or heating improvements can help establish what has changed.'], ['Will the assessment include improvement advice?', 'An EPC includes recommendations. The suitability and cost of individual measures should be assessed for the property before work is commissioned.']]
  },
  {
    slug: 'eicr-report', short: 'EICR', title: 'Electrical Condition Reports', group: 'Certificates & surveys', icon: 'electrical',
    intro: 'Understand the condition of the electrics behind your walls.',
    description: 'Inspection and testing of fixed electrical installations, with findings explained in a practical written report.',
    body: 'An Electrical Installation Condition Report examines the condition of a property’s fixed wiring and associated equipment. It records the findings of inspection and testing, helping owners identify defects, deterioration and work that may need attention.',
    detail: 'The scope depends on the property and its installation. We will ask about the property type, consumer unit and access arrangements so the visit can be planned properly. Any remedial work is discussed separately.',
    includes: ['Inspection of the agreed electrical installation', 'Relevant testing of circuits and protective devices', 'Written observations and report outcome', 'Clear next steps where further work is recommended'],
    prepare: ['Provide any previous electrical reports.', 'Make the consumer unit and sockets accessible.', 'Plan for temporary power interruptions during testing.'],
    audience: 'Landlords, homeowners and business owners',
    faqs: [['Is an EICR the same as PAT testing?', 'No. An EICR concerns the fixed electrical installation; PAT testing relates to portable electrical equipment.'], ['Are repairs included?', 'An inspection report and remedial work are different services. The scope and price of any repairs should be agreed before the work begins.'], ['Will the power need to be switched off?', 'Testing can involve interruptions to the supply. Let us know about sensitive equipment or access restrictions when enquiring.']]
  },
  {
    slug: 'gas-safety-certificate', short: 'Gas safety', title: 'Gas Safety Checks', group: 'Certificates & surveys', icon: 'gas',
    intro: 'Practical checks. A clear record. Greater peace of mind.',
    description: 'Gas safety inspections and records for the appliances and installations included in your agreed visit.',
    body: 'A gas safety visit checks the relevant appliances and associated installation within the agreed scope. The resulting record documents what was inspected and any findings that need attention.',
    detail: 'Gas work must be carried out by a suitably qualified Gas Safe registered engineer. Provide the number and type of appliances when you contact us, and ask about combining the visit with boiler servicing.',
    includes: ['Checks on the gas appliances agreed in your quotation', 'Relevant ventilation and flue checks', 'Gas safety record following the visit', 'Explanation of any identified issues'],
    prepare: ['List the boiler, hob and other gas appliances.', 'Ensure clear access to appliances and the meter.', 'Tell us about known faults before the appointment.'],
    audience: 'Landlords and property managers',
    faqs: [['Is a boiler service included?', 'A gas safety check and a boiler service are separate tasks. If you need both, request a combined quotation.'], ['How is the quotation calculated?', 'The appliance count, property and required work affect the scope. Share those details so the quotation reflects your needs.'], ['What if an issue is found?', 'The engineer will explain the findings and any immediate action required. Repairs are agreed separately.']]
  },
  {
    slug: 'pat-testing', short: 'PAT testing', title: 'Portable Appliance Testing', group: 'Certificates & surveys', icon: 'electrical',
    intro: 'Know where your electrical equipment stands.',
    description: 'Visual inspections and appropriate electrical tests for portable appliances in rental and business premises.',
    body: 'Portable Appliance Testing helps identify damage and faults in electrical equipment. The checks and test methods depend on the equipment and its use, rather than treating every item the same.',
    detail: 'Send an approximate appliance count and any access requirements. We can discuss a practical testing arrangement and the records you need for the property.',
    includes: ['Visual inspection of equipment and cables', 'Appropriate testing of applicable appliances', 'Identification of tested items', 'Results and an equipment record'],
    prepare: ['Estimate the number of items needing attention.', 'Make appliances and their plugs accessible.', 'Flag equipment that cannot be disconnected easily.'],
    audience: 'Businesses, landlords and managing agents',
    faqs: [['What appliances can be checked?', 'Common examples include kettles, office equipment and other portable electrical items. Share your equipment list to confirm suitability.'], ['Does every item need the same test?', 'No. Appropriate checks depend on the equipment type, condition and use.']]
  },
  {
    slug: 'fire-risk-assessment', short: 'Fire safety', title: 'Fire Risk Assessments', group: 'Certificates & surveys', icon: 'shield',
    intro: 'Identify the risks. Understand the priorities.',
    description: 'A structured review of fire risks, existing precautions and actions to consider for your premises.',
    body: 'A fire risk assessment considers how a fire might start, who could be affected and what precautions are in place. It brings the findings together so the responsible person can understand the priorities.',
    detail: 'The assessment must suit the building and its use. Tell us whether you manage commercial premises, shared residential areas or another type of property so the scope can be confirmed.',
    includes: ['Review of the agreed premises and their use', 'Identification of relevant fire hazards', 'Consideration of existing precautions', 'Written findings and prioritised recommendations'],
    prepare: ['Provide floor plans and previous assessments if available.', 'Explain occupancy and access arrangements.', 'Have relevant maintenance and testing records ready.'],
    audience: 'Property managers, building owners and businesses',
    faqs: [['Does an assessment include remedial work?', 'No. The assessment identifies findings and recommendations. Installation, maintenance or other follow-up work is scoped separately.'], ['Can shared residential areas be assessed?', 'Yes, enquiries can cover communal areas. The exact extent and suitable assessor must be confirmed for the building.']]
  },
  {
    slug: 'asbestos-survey', short: 'Asbestos', title: 'Asbestos Surveys', group: 'Certificates & surveys', icon: 'shield',
    intro: 'Plan property work with better information.',
    description: 'Survey enquiries for managing existing buildings or planning refurbishment, with the scope matched to your project.',
    body: 'An asbestos survey helps establish whether suspect materials are present within the agreed areas of a building. The survey required for ongoing management may differ from the investigation needed before intrusive refurbishment.',
    detail: 'Describe the age and use of the building and any planned work. Do not disturb suspect materials yourself; discuss the appropriate survey and sampling arrangements with the surveyor.',
    includes: ['Survey scope agreed to suit the building and planned work', 'Inspection of relevant accessible areas', 'Sampling arrangements where appropriate', 'Written findings and recommendations'],
    prepare: ['Explain the proposed works and affected areas.', 'Share previous surveys or asbestos records.', 'Discuss any occupancy or access limitations.'],
    audience: 'Building owners, property managers and developers',
    faqs: [['Are all asbestos surveys the same?', 'No. The purpose of the survey matters. Management and refurbishment enquiries need different scopes and access arrangements.'], ['Is removal included?', 'Asbestos removal is separate from a survey and needs its own assessment, quotation and appropriate contractor.']]
  },
  {
    slug: 'inventory-report', short: 'Inventories', title: 'Property Inventory Reports', group: 'Certificates & surveys', icon: 'document',
    intro: 'Start a tenancy with a shared understanding.',
    description: 'A room-by-room record of a property and its contents to support clear check-in and check-out discussions.',
    body: 'An inventory records the visible condition of rooms, fixtures and agreed contents at a particular point in time. Photographs and written descriptions provide a useful reference for the landlord, agent and tenant.',
    detail: 'Reports can be arranged around the start or end of a tenancy. Let us know whether the property is furnished, its size and the planned handover date.',
    includes: ['Room-by-room condition descriptions', 'Record of agreed fixtures and contents', 'Supporting photographs', 'Digital report for your records'],
    prepare: ['Confirm whether the property is furnished.', 'Arrange access after cleaning and before handover.', 'Provide any previous inventory for a check-out comparison.'],
    audience: 'Landlords, letting agents and property managers',
    faqs: [['Can you document an unfurnished property?', 'Yes. Floors, walls, fittings and other included elements can still be recorded.'], ['Does a report guarantee a dispute outcome?', 'No. A clear inventory provides evidence of condition but cannot guarantee the outcome of a tenancy or deposit dispute.']]
  },
  {
    slug: 'sap-calculations', short: 'SAP', title: 'SAP Calculations', group: 'Certificates & surveys', icon: 'energy',
    intro: 'Make energy performance part of the design.',
    description: 'Energy calculation enquiries for new dwellings, conversions and relevant development projects.',
    body: 'SAP calculations model the energy performance of a dwelling using information about its design, materials and building services. Bringing the assessment into the design process helps identify issues before work is too far advanced.',
    detail: 'Share the project location, drawings and construction specification. The assessor can confirm the required calculation method, applicable standards and deliverables for your project.',
    includes: ['Review of supplied drawings and specifications', 'Energy-performance calculations within the agreed scope', 'Feedback on the proposed building specification', 'Design-stage or as-built deliverables as agreed'],
    prepare: ['Provide scaled plans, elevations and sections.', 'Gather insulation, glazing and heating specifications.', 'Identify the project stage and building-control requirements.'],
    audience: 'Developers, architects and self-builders',
    faqs: [['When should I enquire?', 'Ideally while design choices can still be adjusted. Early assessment can help avoid late changes.'], ['Do you need drawings?', 'Yes. Accurate drawings and specifications are typically needed to establish the model and scope.']]
  },
  {
    slug: 'retrofit-assessment', short: 'Retrofit', title: 'Retrofit Assessments', group: 'Certificates & surveys', icon: 'energy',
    intro: 'A whole-property view before you improve.',
    description: 'Understand a home’s condition, energy use and occupancy before planning energy-efficiency improvements.',
    body: 'A retrofit assessment considers the home as a whole rather than looking at an individual improvement in isolation. Building condition, ventilation, energy performance and the way the property is used all help inform the next stage.',
    detail: 'Tell us whether the assessment relates to a particular scheme or programme. We will discuss the required scope and how the assessment fits with your project team.',
    includes: ['Review of the property’s condition', 'Information about occupancy and energy use', 'Consideration of relevant building features', 'Assessment records for the agreed project'],
    prepare: ['Explain the improvements you are considering.', 'Provide existing energy and survey documents.', 'Share any programme or coordinator requirements.'],
    audience: 'Homeowners, landlords and retrofit project teams',
    faqs: [['Is this an installation service?', 'The assessment is the information-gathering stage. Design, coordination and installation require their own agreed scope.'], ['Can the assessment be used for a funding scheme?', 'Scheme requirements vary. Share the programme details before booking so suitability can be confirmed.']]
  },
  {
    slug: 'electrical-services', short: 'Electrical', title: 'Electrical Services', group: 'Electrical', icon: 'electrical',
    intro: 'Thoughtful electrical work for everyday spaces.',
    description: 'Enquiries for installations, rewiring, consumer-unit upgrades, fault finding and EV charging.',
    body: 'From a recurring electrical fault to a planned upgrade, a clear description of the problem makes it easier to arrange the right next step. We can discuss domestic and commercial electrical work and the survey information required for a quotation.',
    detail: 'Every installation is different. The proposed work, existing condition and access arrangements will be considered before confirming the scope. Testing and any applicable completion documentation should be agreed as part of the job.',
    includes: ['Fault finding and repair enquiries', 'Rewiring and consumer-unit upgrades', 'Electrical installation and EV charger enquiries', 'Safety alarm installation enquiries'],
    prepare: ['Describe the issue or planned installation.', 'Share photographs only where it is safe to do so.', 'Mention previous reports and any urgent safety concerns.'],
    audience: 'Homeowners, landlords and businesses',
    faqs: [['Can you quote for rewiring?', 'Yes. Tell us the property type and the extent of the work you are considering. A survey may be needed before the price can be confirmed.'], ['Do you deal with faults?', 'Contact us with a description of the problem. Availability and the appropriate response will be confirmed; this website is not an emergency reporting service.']]
  },
  {
    slug: 'plumbing-and-heating', short: 'Plumbing & heating', title: 'Plumbing & Heating', group: 'Gas & plumbing', icon: 'gas',
    intro: 'Keep the essential parts of your property working.',
    description: 'Boiler servicing, heating, leaks and plumbing repair enquiries, all through one point of contact.',
    body: 'Heating and plumbing problems can quickly disrupt a home or business. Describe the symptoms, equipment and property so we can discuss the appropriate inspection, repair or planned-maintenance service.',
    detail: 'For replacement boilers or more extensive heating work, a survey may be required to establish the right specification. Gas-related work must be undertaken by an appropriately qualified Gas Safe registered engineer.',
    includes: ['Boiler installation and servicing enquiries', 'Heating and hot-water fault enquiries', 'Plumbing repairs and leak investigations', 'Central-heating maintenance and power-flushing enquiries'],
    prepare: ['Provide the boiler make and model if known.', 'Describe the symptoms and any displayed fault codes.', 'Explain access arrangements and your preferred timing.'],
    audience: 'Homeowners, landlords and property managers',
    faqs: [['Can a boiler service and gas check be combined?', 'You can request both together. They remain distinct services, and the quotation will confirm what is included.'], ['Can you provide a price from a photograph?', 'Photographs can help clarify an enquiry, but diagnosis or a site survey may be needed before confirming the work and price.']]
  }
];
