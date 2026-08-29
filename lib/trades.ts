export type TradeCallType = {
  icon: string;
  title: string;
  body: string;
};

export type TradeFaq = {
  question: string;
  answer: string;
};

export type TradePage = {
  slug: string;
  name: string;
  singular: string;
  shortName: string;
  image: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroBody: string;
  quickAnswer: string;
  cardLine: string;
  cardQuestions: string[];
  heroAlert: string;
  painPoints: Array<{ title: string; body: string }>;
  callTypes: TradeCallType[];
  questions: string[];
  example: {
    customer: string;
    suburb: string;
    job: string;
    urgency: string;
    description: string;
    evidence: string;
    nextStep: string;
  };
  quoteSteps: Array<{ title: string; body: string }>;
  boundary: string;
  faq: TradeFaq[];
};

export const tradePages: TradePage[] = [
  {
    slug: 'plumbers',
    name: 'Plumbers',
    singular: 'plumber',
    shortName: 'Plumbing',
    image: '/trades/plumbers.jpg',
    imageAlt: 'Australian plumber inspecting a leaking hose beneath a kitchen sink',
    metaTitle: 'AI Receptionist for Plumbers in Australia',
    metaDescription: 'Recover missed plumbing calls, capture leak and blockage details, collect customer photos and follow up quotes with TradieRelay.',
    heroTitle: 'The leak is urgent. The missed call should not sit in voicemail.',
    heroBody: 'TradieRelay answers when you cannot, works out what sort of plumbing job is waiting and sends you the details needed to choose the next move.',
    quickAnswer: 'TradieRelay is an AI receptionist and quote follow-up service for Australian plumbers. It can answer missed or after-hours calls, capture the address, affected fixture, water status, access and photos, then alert the person you nominate. It does not diagnose the fault or promise attendance.',
    cardLine: 'Capture the leak, location and containment status before you call back.',
    cardQuestions: ['Suburb and affected fixture', 'Whether water is still flowing', 'What has been safely isolated', 'Photos, access and approval contact'],
    heroAlert: 'Urgent leak details captured',
    painPoints: [
      { title: 'You are already under a sink', body: 'The next caller gets voicemail because both hands are on the job in front of you.' },
      { title: 'Urgent and routine calls look the same', body: 'A burst flexi hose and a tap replacement both arrive as one unexplained missed call.' },
      { title: 'The quote goes quiet', body: 'Bathroom, hot-water and drainage quotes lose momentum while you are back on the tools.' },
    ],
    callTypes: [
      { icon: '💧', title: 'Active leaks', body: 'Affected fixture, water status, location and what the caller has already done.' },
      { icon: '↯', title: 'Burst pipes', body: 'Property address, visible water, access and the approved urgent hand-off rule.' },
      { icon: '◉', title: 'Blocked drains', body: 'Which drains are affected, overflow indicators, property type and availability.' },
      { icon: '♨', title: 'Hot-water problems', body: 'System type if known, symptom, property access and preferred callback time.' },
      { icon: '⌂', title: 'Renovation quotes', body: 'Rooms, plans, timing, approval contact and whether photos are ready.' },
      { icon: '✓', title: 'Routine repairs', body: 'Fixture, issue, suburb and the customer’s suitable service windows.' },
    ],
    questions: ['Who is calling and what is the best callback number?', 'What is the property address and suburb?', 'Which fixture, pipe or drain is affected?', 'Is water still flowing or causing visible damage?', 'What has already been safely isolated?', 'Who can provide access and approve the work?', 'Can the customer send a clear photo by text?', 'What outcome and timing is the customer asking for?'],
    example: {
      customer: 'Sarah Mitchell', suburb: 'Palm Beach, QLD', job: 'Leaking flexi hose under kitchen sink', urgency: 'Urgent review',
      description: 'Water is still dripping into the cupboard. Sarah says the local stop tap is off and she is at the property now.',
      evidence: '2 customer photos attached', nextStep: 'Call Sarah and confirm whether this fits today’s urgent run.',
    },
    quoteSteps: [
      { title: 'Quote marked sent', body: 'The approved follow-up sequence starts only when the quote reaches the agreed status.' },
      { title: 'Useful check-in', body: 'The customer gets a short message tied to the plumbing work—not a generic sales chase.' },
      { title: 'Reply sorted', body: 'Ready to proceed, question, change request, decline and opt-out are kept with the quote.' },
      { title: 'You make the call', body: 'Pricing, scope changes and final booking commitments stay with your business.' },
    ],
    boundary: 'TradieRelay can collect the caller’s description and apply your urgency rules. It does not diagnose plumbing faults, give repair instructions, tell a caller an area is safe or promise a plumber will attend.',
    faq: [
      { question: 'Can an AI receptionist handle an emergency plumbing call?', answer: 'It can answer, capture the facts and apply the urgent routing rule you approved. It should not diagnose the emergency. If the call matches your escalation wording, the nominated person receives the alert or transfer.' },
      { question: 'Can plumbing customers send photos?', answer: 'Yes, where the agreed messaging setup supports it. TradieRelay can text a secure upload link after the call, and the photos stay attached to that job in the tradie dashboard.' },
      { question: 'What plumbing details does TradieRelay collect?', answer: 'A typical plumbing flow captures the caller, callback number, address, fixture or area affected, visible symptom, water status, access, approval contact, timing and photos. You choose the required fields.' },
      { question: 'Will TradieRelay give a plumbing quote?', answer: 'Only an exact fee or rule you have explicitly approved can be repeated. New diagnosis, scope and pricing decisions stay with the plumber. TradieRelay can prepare and follow up a draft for human review.' },
      { question: 'Can I start with missed calls only?', answer: 'Yes. Missed-call and after-hours recovery is the recommended starting point because it leaves your normal answered calls alone and gives the pilot a clear result to measure.' },
    ],
  },
  {
    slug: 'electricians',
    name: 'Electricians',
    singular: 'electrician',
    shortName: 'Electrical',
    image: '/trades/electricians.jpg',
    imageAlt: 'Australian electrician inspecting a residential switchboard',
    metaTitle: 'AI Receptionist for Electricians in Australia',
    metaDescription: 'Recover missed electrical calls, separate urgent faults from planned work and follow up open quotes with TradieRelay.',
    heroTitle: 'Know whether it is a power fault or a planned job before you call back.',
    heroBody: 'TradieRelay answers the repeatable first questions, separates urgent enquiries from routine electrical work and keeps every promise inside the rules you approve.',
    quickAnswer: 'TradieRelay is an AI receptionist for Australian electrical businesses. It captures the address, property type, caller’s description, visible indicators, timing and access, then routes the enquiry using your rules. It never gives electrical diagnosis or safety instructions.',
    cardLine: 'Sort urgent faults from planned electrical work.',
    cardQuestions: ['Suburb and property type', 'Power status and visible issue', 'Approved emergency indicators', 'Access and callback availability'],
    heroAlert: 'Electrical fault sorted for review',
    painPoints: [
      { title: 'The phone rings on the ladder', body: 'Stopping mid-job is unsafe and disruptive, but an unexplained missed call may be good work.' },
      { title: 'Faults and quotes arrive together', body: 'A partial power loss needs a different response from a downlight or switchboard quote.' },
      { title: 'Small details waste the callback', body: 'Without the address, property type and caller’s description, the first callback becomes another intake call.' },
    ],
    callTypes: [
      { icon: '⚡', title: 'Power faults', body: 'Property, affected area, caller’s visible observations and approved escalation indicators.' },
      { icon: '▣', title: 'Switchboard work', body: 'Existing setup, reason for enquiry, property access and quote timing.' },
      { icon: '◌', title: 'Lighting jobs', body: 'Repair or install, number and type of fittings, location and photos where useful.' },
      { icon: '⌁', title: 'Power points', body: 'New installation or fault enquiry, room, quantity and access details.' },
      { icon: '⌂', title: 'Renovations', body: 'Project stage, plans, scope, target dates and the decision-maker.' },
      { icon: '↗', title: 'Commercial enquiries', body: 'Site contact, business hours, access rules and requested response time.' },
    ],
    questions: ['Who is calling and where is the property?', 'Is it a home, business, body corporate or managed property?', 'What has the caller noticed—in their own words?', 'Is power affected throughout the property or only in one area?', 'Are there visible indicators covered by your urgent rule?', 'Is this a repair, installation, inspection or quote request?', 'Who can provide site access?', 'When can the right person call them back?'],
    example: {
      customer: 'Mark Evans', suburb: 'Robina, QLD', job: 'Partial power loss in kitchen', urgency: 'Priority callback',
      description: 'Kitchen lights and power points are not working. The rest of the home has power. No smoke or visible damage reported.',
      evidence: 'Switchboard photo requested', nextStep: 'Licensed electrician to review and call Mark. No remote diagnosis given.',
    },
    quoteSteps: [
      { title: 'Electrical quote sent', body: 'The quote remains inactive until you mark it ready for the approved sequence.' },
      { title: 'Customer checked in', body: 'A concise message asks whether they want to proceed or need a question answered.' },
      { title: 'Objection surfaced', body: 'Scope, timing and price questions return with the original job context.' },
      { title: 'Human approval', body: 'A licensed person handles technical questions and every final commitment.' },
    ],
    boundary: 'TradieRelay never diagnoses an electrical fault, recommends testing, gives isolation instructions or tells someone a site is safe. Uncertainty triggers your human hand-off or callback rule.',
    faq: [
      { question: 'Can TradieRelay tell if an electrical call is urgent?', answer: 'It can ask the approved questions and match the caller’s answers to the urgency indicators you define. It does not make an electrical diagnosis; the nominated licensed person decides the response.' },
      { question: 'Will it give electrical safety advice?', answer: 'No. TradieRelay does not provide remote testing, isolation or repair instructions. It captures what the caller reports and follows the safe wording and escalation path you approve.' },
      { question: 'Can it separate service work from project quotes?', answer: 'Yes. Different electrical job types can have different questions, fit checks and next steps, so a fault call does not sit in the same flow as a renovation quote.' },
      { question: 'Can customers send switchboard or fitting photos?', answer: 'Where enabled, the customer receives a secure photo link by text. The photos appear with the job record so the electrician sees them before deciding the next step.' },
      { question: 'Does TradieRelay replace my office person?', answer: 'It is designed first to recover calls and repeatable follow-up that would otherwise be missed. Human judgement, exceptions, technical advice and customer commitments remain with your team.' },
    ],
  },
  {
    slug: 'air-conditioning',
    name: 'Air conditioning',
    singular: 'air-conditioning technician',
    shortName: 'Air conditioning',
    image: '/trades/air-conditioning.jpg',
    imageAlt: 'Australian air-conditioning technician servicing a wall-mounted split system',
    metaTitle: 'AI Receptionist for Air Conditioning Businesses',
    metaDescription: 'Capture air-conditioning breakdown, service and installation enquiries and follow up open quotes with TradieRelay.',
    heroTitle: 'Get the system and symptom details before the service callback.',
    heroBody: 'TradieRelay separates breakdowns, service requests and installation quotes, then sends the unit details, access and preferred timing to your team.',
    quickAnswer: 'TradieRelay is an AI receptionist for Australian air-conditioning businesses. It captures the property, system type, model if known, symptoms, access and preferred service window, then routes the enquiry without attempting technical troubleshooting.',
    cardLine: 'Get the unit and symptom details before the callback.',
    cardQuestions: ['Home or commercial site', 'System type and model if known', 'Cooling, power or noise symptom', 'Access and preferred timing'],
    heroAlert: 'Breakdown details ready to scan',
    painPoints: [
      { title: 'Hot days create call bursts', body: 'The phone peaks when the crew is already driving, servicing or working in a roof space.' },
      { title: 'Every “not cooling” job is different', body: 'The system, property, access and symptoms matter before anyone promises a time.' },
      { title: 'Install quotes need follow-up', body: 'A useful proposal can cool off while everyone is busy handling service work.' },
    ],
    callTypes: [
      { icon: '❄', title: 'Not cooling', body: 'System type, affected area, visible symptoms, property and preferred response time.' },
      { icon: '◌', title: 'Unusual noise', body: 'Caller’s description, when it occurs, unit location and access information.' },
      { icon: '💧', title: 'Water or leaking', body: 'Visible location, property impact, system type and the approved priority rule.' },
      { icon: '✓', title: 'Routine servicing', body: 'Number and type of systems, property use, access and suitable service windows.' },
      { icon: '⌂', title: 'New installations', body: 'Rooms, existing system, plans or photos, timing and quote contact.' },
      { icon: '▦', title: 'Commercial systems', body: 'Site contact, affected area, operating hours, access and service expectations.' },
    ],
    questions: ['Is the site residential, commercial or managed property?', 'What type of air-conditioning system is involved?', 'Is the make or model known?', 'What is the caller noticing—in their own words?', 'Is one area affected or the whole site?', 'Can the indoor and outdoor units be accessed?', 'Are useful photos or model details available?', 'What service or quote timing is preferred?'],
    example: {
      customer: 'Daniel Cho', suburb: 'Southport, QLD', job: 'Split system not cooling office', urgency: 'Same-day review requested',
      description: 'Wall-mounted split system powers on and blows air but the front office is not cooling. Model photo is available.',
      evidence: 'Model label and indoor-unit photos attached', nextStep: 'Technician to review details and confirm the appropriate service window.',
    },
    quoteSteps: [
      { title: 'Install quote sent', body: 'TradieRelay watches the agreed quote status rather than guessing which proposals are live.' },
      { title: 'Decision made easy', body: 'The customer can proceed, ask about an option, request a change or decline.' },
      { title: 'Context preserved', body: 'System, room and access information stays with the quote conversation.' },
      { title: 'You confirm the job', body: 'Equipment selection, technical scope, pricing and dates remain human decisions.' },
    ],
    boundary: 'TradieRelay collects symptoms and system details but does not troubleshoot electrical, refrigeration or mechanical faults. It never promises a diagnosis, part, price or attendance time without your approval.',
    faq: [
      { question: 'Can TradieRelay handle both repairs and new air-conditioning quotes?', answer: 'Yes. Breakdown, routine service and new-install enquiries can follow different question sets and next steps, so the technician receives the right context for each type of work.' },
      { question: 'What system information can it collect?', answer: 'The flow can ask for split, ducted or other system type, make and model if known, affected area, caller-reported symptom, access, photos and preferred timing.' },
      { question: 'Does it troubleshoot air conditioners?', answer: 'No. It records what the customer observes and applies your routing rules. Technical troubleshooting, diagnosis and safety advice stay with a qualified person.' },
      { question: 'Can it follow up installation quotes?', answer: 'Yes. Once a quote is approved for follow-up, TradieRelay can send the agreed check-ins, classify the reply and stop when the customer proceeds, declines, opts out or reaches the limit.' },
      { question: 'Can it manage maintenance reminders?', answer: 'Recurring maintenance is a sensible later-stage workflow. For the founding pilot, TradieRelay should first prove missed-call recovery and quote follow-up against your real calls.' },
    ],
  },
  {
    slug: 'carpenters',
    name: 'Carpenters',
    singular: 'carpenter',
    shortName: 'Carpentry',
    image: '/trades/carpenters.jpg',
    imageAlt: 'Australian carpenter measuring timber framing during a residential renovation',
    metaTitle: 'AI Receptionist for Carpenters in Australia',
    metaDescription: 'Qualify carpentry repairs, custom jobs and quote requests, collect photos and keep quote follow-up moving with TradieRelay.',
    heroTitle: 'Find out if it is a repair, a real project or a vague price check.',
    heroBody: 'TradieRelay captures the scope, rough dimensions, materials, access, photos and timing before a carpenter has to stop cutting or measuring.',
    quickAnswer: 'TradieRelay is an AI receptionist for Australian carpenters. It can qualify repair, custom-build and renovation enquiries, collect rough dimensions and photos, and route quote requests using the carpenter’s service area and job rules.',
    cardLine: 'Qualify repairs, custom work and project enquiries before the site call.',
    cardQuestions: ['Job type and affected area', 'Rough dimensions or plans', 'Material preferences and photos', 'Access, timing and decision-maker'],
    heroAlert: 'Project scope captured',
    painPoints: [
      { title: 'Machines drown out the phone', body: 'Calls arrive while you are cutting, fixing or working with a customer on site.' },
      { title: '“How much for a deck?” is not a brief', body: 'Location, size, material, access and timing are missing from the first conversation.' },
      { title: 'Good quotes need a next step', body: 'Detailed carpentry proposals can sit unanswered while the next build takes over.' },
    ],
    callTypes: [
      { icon: '▥', title: 'Doors and repairs', body: 'Affected item, visible problem, rough size, photos, access and preferred timing.' },
      { icon: '⌂', title: 'Renovation carpentry', body: 'Project stage, plans, scope, site contact and target dates.' },
      { icon: '▤', title: 'Decks and outdoor work', body: 'Approximate area, existing structure, material ideas, access and photos.' },
      { icon: '◇', title: 'Custom joinery', body: 'Room, intended use, rough dimensions, style references and decision-maker.' },
      { icon: '↗', title: 'Commercial work', body: 'Site, scope, operating restrictions, induction or access needs and timing.' },
      { icon: '✎', title: 'Quote visits', body: 'Enough project detail to decide whether a site measure is the sensible next step.' },
    ],
    questions: ['What needs to be repaired, built or changed?', 'Where is the property and what type of site is it?', 'Are rough dimensions, plans or drawings available?', 'What materials or finish does the customer have in mind?', 'Can the customer send photos of the area?', 'What is the project stage and target timing?', 'Who owns the decision and quote approval?', 'Are there access, parking or working-hour restrictions?'],
    example: {
      customer: 'Priya Nair', suburb: 'Burleigh Waters, QLD', job: 'Replace weathered rear deck', urgency: 'Qualified quote request',
      description: 'Existing timber deck is approximately 5 m × 3 m. Customer wants to discuss timber and low-maintenance options before a site measure.',
      evidence: '4 deck and access photos attached', nextStep: 'Review fit, then offer a site-measure callback if the project suits.',
    },
    quoteSteps: [
      { title: 'Carpentry quote sent', body: 'The proposal and captured project notes stay connected.' },
      { title: 'Customer prompted', body: 'A useful check-in asks whether they want to proceed or need a scope question answered.' },
      { title: 'Change request captured', body: 'Material, dimension and timing questions return to you clearly.' },
      { title: 'Work confirmed by you', body: 'Final measurements, structural judgement, materials, price and schedule stay human.' },
    ],
    boundary: 'TradieRelay does not provide structural advice, confirm code compliance, calculate final materials or quote from rough dimensions. It gathers the brief and gives the carpenter a cleaner decision.',
    faq: [
      { question: 'Can TradieRelay qualify carpentry quote requests?', answer: 'Yes. It can capture job type, property, rough dimensions, plans, material preferences, photos, timing and decision-maker, then apply your service-area and job-fit rules.' },
      { question: 'Will it calculate materials or structural requirements?', answer: 'No. Rough information helps qualify the enquiry, but final measurements, quantities, structural judgement and compliance decisions stay with the carpenter.' },
      { question: 'Can callers send project photos and plans?', answer: 'Photos can be requested through the customer upload flow where enabled. Plans and larger document handling should be confirmed as part of the pilot setup.' },
      { question: 'Can different carpentry jobs ask different questions?', answer: 'Yes. A door repair, deck enquiry and renovation project can each have a shorter, relevant question set and a different hand-off.' },
      { question: 'Can TradieRelay follow up a detailed carpentry quote?', answer: 'Yes. It can run the approved reminder sequence, classify replies and return scope or price questions to you without negotiating or changing the quote.' },
    ],
  },
  {
    slug: 'painters',
    name: 'Painters',
    singular: 'painter',
    shortName: 'Painting',
    image: '/trades/painters.jpg',
    imageAlt: 'Australian professional painter applying paint inside a protected residential living room',
    metaTitle: 'AI Receptionist for Painters in Australia',
    metaDescription: 'Capture painting scope, rooms, surfaces, photos and quote timing, then keep painting quote follow-up moving with TradieRelay.',
    heroTitle: 'Get the rooms, surfaces and photos before you organise the quote visit.',
    heroBody: 'TradieRelay turns “I need some painting done” into a useful brief with the property, scope, condition, access, colour stage and preferred timing.',
    quickAnswer: 'TradieRelay is an AI receptionist for Australian painters. It qualifies interior, exterior and commercial painting enquiries, captures rooms, surfaces, preparation, height, access, colour status and photos, then follows the business’s approved callback and quote rules.',
    cardLine: 'Turn a broad painting enquiry into a useful quote brief.',
    cardQuestions: ['Interior, exterior or commercial', 'Rooms, surfaces and condition', 'Colours, finishes and photos', 'Height, access and quote timing'],
    heroAlert: 'Painting scope ready for review',
    painPoints: [
      { title: 'The enquiry starts too broad', body: '“Paint my house” leaves out rooms, surfaces, condition, access and whether colours are decided.' },
      { title: 'Quote visits eat the week', body: 'Without basic qualification, you drive to jobs that do not fit the crew, area or timing.' },
      { title: 'Customers need gentle follow-up', body: 'A quote may depend on colour, timing or budget questions that disappear inside old text threads.' },
    ],
    callTypes: [
      { icon: '▥', title: 'Interior repainting', body: 'Rooms, walls or ceilings, condition, occupancy, colour stage and preferred timing.' },
      { icon: '⌂', title: 'Exterior painting', body: 'Property type, elevations, surface condition, access, height and photos.' },
      { icon: '◇', title: 'New builds', body: 'Project stage, plans, builder contact, surfaces, program and quote requirements.' },
      { icon: '✦', title: 'Feature finishes', body: 'Area, desired finish, references, preparation expectations and decision-maker.' },
      { icon: '↗', title: 'Commercial work', body: 'Site use, trading hours, access, staging, contact and required completion window.' },
      { icon: '✓', title: 'Repairs and touch-ups', body: 'Affected areas, cause already addressed, surface photos and job expectations.' },
    ],
    questions: ['Is the work interior, exterior, residential or commercial?', 'Which rooms, areas and surfaces are included?', 'What is the current condition and preparation need?', 'Is the property occupied or in use?', 'Are colours and finishes chosen yet?', 'Are height, access or staged-work constraints involved?', 'Can the customer send clear photos?', 'When do they want a quote visit and the work completed?'],
    example: {
      customer: 'Alicia Brown', suburb: 'Mermaid Waters, QLD', job: 'Interior repaint—living area and hallway', urgency: 'Quote request',
      description: 'Occupied two-storey home. Walls and skirting in the main living area plus hallway; colours not final. Customer prefers a morning quote visit.',
      evidence: '5 room and wall-condition photos attached', nextStep: 'Review scope and call Alicia about a suitable quote visit.',
    },
    quoteSteps: [
      { title: 'Painting quote sent', body: 'Rooms, surfaces, prep notes and options stay with the proposal.' },
      { title: 'Decision checked', body: 'The customer can proceed, ask about colour or timing, request a change or decline.' },
      { title: 'Loose ends surfaced', body: 'The reply is tagged with the original scope so you know what needs an answer.' },
      { title: 'You lock it in', body: 'Final preparation, products, price, colours and work dates remain your call.' },
    ],
    boundary: 'TradieRelay does not assess coatings, guarantee coverage, calculate quantities or promise a price from photos. It collects the customer’s brief and keeps the quote conversation organised.',
    faq: [
      { question: 'What details can TradieRelay collect for a painting quote?', answer: 'The flow can capture interior or exterior scope, rooms and surfaces, current condition, occupancy, height, access, colour and finish stage, photos, timing and quote contact.' },
      { question: 'Can a customer upload painting photos?', answer: 'Yes, where the photo flow is enabled. The customer receives a secure link, and the images appear with the job so the painter can review them before arranging the next step.' },
      { question: 'Will TradieRelay estimate paint quantities or price the job?', answer: 'No. It can repeat an approved fixed rule, but product choice, preparation, measurements, quantities and final pricing remain with the painting business.' },
      { question: 'Can it arrange a quote visit?', answer: 'It can capture preferred times and route a booking request. Live calendar booking should only be enabled after the business’s availability and clash rules are connected and tested.' },
      { question: 'Can it follow up customers waiting on colours or approval?', answer: 'Yes. The follow-up flow can distinguish a ready customer from a colour question, scope change, timing issue, decline or opt-out and bring the right reply back to you.' },
    ],
  },
  {
    slug: 'landscapers',
    name: 'Landscapers',
    singular: 'landscaper',
    shortName: 'Landscaping',
    image: '/trades/landscapers.jpg',
    imageAlt: 'Australian landscaper shaping a subtropical residential garden',
    metaTitle: 'AI Receptionist for Landscapers in Australia',
    metaDescription: 'Qualify landscaping projects and maintenance enquiries, collect site photos and follow up quotes with TradieRelay.',
    heroTitle: 'Separate the real landscaping project from the one-line price enquiry.',
    heroBody: 'TradieRelay captures the property, area, goal, access, photos, timing and maintenance needs before you interrupt the crew or leave site.',
    quickAnswer: 'TradieRelay is an AI receptionist for Australian landscapers. It qualifies design, build and maintenance enquiries, gathers property and access details, approximate area, customer goals, photos and timing, then routes the opportunity using your job rules.',
    cardLine: 'Qualify area, scope and timing without a long interruption on site.',
    cardQuestions: ['Property and approximate area', 'Design, build or maintenance', 'Goals, photos or plans', 'Access, timing and frequency'],
    heroAlert: 'Landscaping opportunity qualified',
    painPoints: [
      { title: 'The crew cannot stop for every call', body: 'Machinery, gloves and customers on site make phone intake a constant interruption.' },
      { title: '“Fix my garden” hides the scope', body: 'Area, access, goals, budget readiness, photos and timing are missing.' },
      { title: 'Projects and maintenance need different flows', body: 'A garden redesign should not follow the same intake as a recurring mow-and-maintain enquiry.' },
    ],
    callTypes: [
      { icon: '✦', title: 'Garden redesigns', body: 'Property, goals, approximate area, existing site, inspiration and preferred timing.' },
      { icon: '▰', title: 'Turf and planting', body: 'Area, current surface, access, sunlight observations, photos and job expectations.' },
      { icon: '≋', title: 'Irrigation enquiries', body: 'Existing or new system, affected area, visible issue and property access.' },
      { icon: '⌂', title: 'New-build landscaping', body: 'Plans, build stage, access, handover target and decision-maker.' },
      { icon: '↻', title: 'Regular maintenance', body: 'Property size, frequency, current condition, green-waste needs and access.' },
      { icon: '↗', title: 'Commercial sites', body: 'Site contact, operating limits, service frequency, access and reporting needs.' },
    ],
    questions: ['Where is the property and what type of site is it?', 'Is this design, construction, improvement or maintenance?', 'What area and outcome does the customer have in mind?', 'Are photos, plans or inspiration available?', 'What is the current condition of the site?', 'Can vehicles, machinery and materials access the area?', 'Is the work one-off or recurring?', 'What timing and next step is the customer expecting?'],
    example: {
      customer: 'Tom Bradley', suburb: 'Carrara, QLD', job: 'Backyard redesign and low-maintenance planting', urgency: 'Qualified project lead',
      description: 'Approximate 90 m² backyard with side access. Customer wants a simpler subtropical garden and a small lawn area before summer.',
      evidence: '6 site and access photos attached', nextStep: 'Review fit and call Tom about the project brief and site visit.',
    },
    quoteSteps: [
      { title: 'Landscape quote sent', body: 'The site brief, options and agreed next step stay connected.' },
      { title: 'Follow-up timed', body: 'The customer gets the approved check-in instead of falling off the list.' },
      { title: 'Project signal sorted', body: 'Proceed, design question, change request, timing issue and decline are separated.' },
      { title: 'You plan the work', body: 'Design, materials, site conditions, pricing, weather and crew scheduling remain human.' },
    ],
    boundary: 'TradieRelay does not design a landscape, assess engineering needs, select plants or materials, or quote from a rough area. It gathers useful site context and routes the customer to the right next step.',
    faq: [
      { question: 'Can TradieRelay separate landscaping projects from maintenance?', answer: 'Yes. Design, construction, one-off improvement and recurring maintenance enquiries can each use different questions, fit checks and routing rules.' },
      { question: 'What site details can it collect?', answer: 'A landscaping flow can capture the property, approximate area, customer goal, current condition, access, photos or plans, timing, maintenance frequency and decision-maker.' },
      { question: 'Can customers send garden and access photos?', answer: 'Yes, when the customer photo flow is enabled. Images stay attached to the enquiry in the dashboard so the landscaper can scan them before calling.' },
      { question: 'Will it design or price a landscaping job?', answer: 'No. TradieRelay does not choose materials or plants, diagnose site conditions, assess engineering requirements or invent a price. Those decisions stay with the landscaping business.' },
      { question: 'Can it handle recurring maintenance reminders?', answer: 'Recurring reminders are a valuable next-stage workflow. The pilot should first define the frequency, access rules, customer communication and person responsible for schedule changes.' },
    ],
  },
];

export function getTrade(slug: string) {
  return tradePages.find((trade) => trade.slug === slug);
}
