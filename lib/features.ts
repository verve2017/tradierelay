export type FeatureCategory = 'Calls' | 'Workflow' | 'Service';

export type FeatureProductVisual =
  | {
      kind: 'screen';
      screen: 'alert' | 'lead' | 'pipeline';
      label: string;
      caption: string;
    }
  | {
      kind: 'image';
      src: string;
      alt: string;
      label: string;
      caption: string;
      portrait?: boolean;
    };

export type FeaturePage = {
  slug: string;
  number: string;
  name: string;
  menuLine: string;
  category: FeatureCategory;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroBody: string;
  heroImage: string;
  heroImageAlt: string;
  shortAnswer: string;
  overview: {
    plain: string;
    customer: string;
    tradie: string;
    control: string;
    outcome: string;
    boundary: string;
  };
  painTitle: string;
  painBody: string;
  outcomes: Array<{ title: string; body: string }>;
  steps: Array<{ title: string; body: string }>;
  productVisual: FeatureProductVisual;
  visualTitle: string;
  visualBody: string;
  customerExperience: Array<{ label: string; body: string }>;
  controls: string[];
  example: {
    trade: string;
    situation: string;
    customer: string;
    relay: string;
    tradie: string;
  };
  boundary: string;
  faq: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
};

export const featurePages: FeaturePage[] = [
  {
    slug: 'ai-phone-reception',
    number: '01',
    name: 'AI phone reception',
    menuLine: 'Answer missed, busy, overflow or after-hours calls.',
    category: 'Calls',
    metaTitle: 'AI Phone Reception for Australian Tradies',
    metaDescription: 'See how TradieRelay answers trade-business calls, identifies itself, captures the job and hands the next decision back to the tradie.',
    heroTitle: 'A useful answer when you cannot pick up.',
    heroBody: 'TradieRelay answers under the call rule you choose, uses your business name, explains that it is automated and captures the information needed for a real next step.',
    heroImage: '/blog/customer-hearing-ai-greeting.webp',
    heroImageAlt: 'Australian homeowner speaking with an automated trade receptionist after a missed call',
    shortAnswer: 'AI phone reception answers a call when your approved routing rule applies, clearly identifies the business and automated assistant, captures the caller and job details, then follows your transfer, callback, booking-request or message rule. It does not diagnose the work, invent a price or promise attendance.',
    overview: {
      plain: 'When a call follows the rule you chose—missed, busy, overflow or after hours—the assistant answers using your business name and clearly says it is automated.',
      customer: 'They can explain the job straight away instead of reaching a dead-end voicemail.',
      tradie: 'A call record and useful next step without stopping the job in front of you.',
      control: 'The greeting, hours, transfer rules, approved answers and anything the assistant must never promise.',
      outcome: 'A caller is acknowledged quickly and the trade business receives a structured enquiry instead of an unexplained missed call.',
      boundary: 'The assistant handles reception and information capture. Trade judgement, diagnosis, price and final commitments stay with the business.',
    },
    painTitle: 'The phone rings at the exact moment both hands are busy.',
    painBody: 'Voicemail asks the customer to wait and asks the tradie to reconstruct the job later. A controlled receptionist gives both sides a useful next step without pretending the work has already been assessed.',
    outcomes: [
      { title: 'No dead-end voicemail', body: 'The caller can explain what they need while the reason for calling is still fresh.' },
      { title: 'Fewer unsafe interruptions', body: 'The tradie can finish the task in front of them before deciding which enquiry needs attention.' },
      { title: 'A clear hand-off', body: 'The summary records the customer, job, location, urgency indicators and requested next action.' },
    ],
    steps: [
      { title: 'Your number rings first', body: 'The normal phone experience stays in place until the missed, busy, overflow or after-hours rule applies.' },
      { title: 'Relay introduces itself', body: 'The greeting names the trade business and says the caller is speaking with an automated assistant.' },
      { title: 'The job is captured', body: 'Approved questions collect the caller, suburb, job, timing, visible issue and any useful evidence.' },
      { title: 'The right next step runs', body: 'A transfer, callback request, booking request, message or polite decline follows the rule the business approved.' },
    ],
    productVisual: {
      kind: 'screen',
      screen: 'alert',
      label: 'WORKING PRODUCT PREVIEW · FAKE DATA',
      caption: 'The tradie receives the reason for the call, urgency indicators, evidence and a direct next action.',
    },
    visualTitle: 'The useful part lands without the tradie replaying a voicemail.',
    visualBody: 'The alert is deliberately short. It keeps the caller’s words and the business’s rules together so the owner can act without starting the intake conversation again.',
    customerExperience: [
      { label: 'They hear', body: 'The business name, a clear automated-assistant introduction and what the assistant can do.' },
      { label: 'They provide', body: 'Only the details needed for the enquiry and the next step approved for that job type.' },
      { label: 'They leave with', body: 'A confirmation of what happens next—without an invented price, diagnosis or arrival time.' },
    ],
    controls: ['Answer mode and delay', 'Business greeting', 'Opening and after-hours wording', 'Required job questions', 'Live-transfer and callback rules', 'Forbidden promises and escalation triggers'],
    example: {
      trade: 'Plumbing business',
      situation: 'A customer calls about water beneath a kitchen sink while the plumber is already on another job.',
      customer: 'Explains the visible issue, confirms the suburb and callback number, and receives a photo-upload link.',
      relay: 'Records that water is reported as isolated, requests the approved evidence and marks the call for prompt review without diagnosing the fault.',
      tradie: 'Receives one alert, checks the photo and decides whether to call, fit it into the run or decline.',
    },
    boundary: 'TradieRelay may repeat approved business information and collect what the caller reports. It must not diagnose a trade problem, coach unsafe work, negotiate, invent availability or commit the business beyond its written rules.',
    faq: [
      { question: 'Does TradieRelay answer every phone call?', answer: 'Only if that is the mode you choose. The recommended pilot normally starts with missed calls, no-answer, overflow or after-hours so answered calls continue working as they do today.' },
      { question: 'Will callers know it is automated?', answer: 'Yes. The introduction is clear and brief. TradieRelay does not pretend to be a human receptionist.' },
      { question: 'Can it transfer an urgent caller?', answer: 'A live transfer can be configured and tested for a customer setup. If the transfer cannot complete, the approved fallback captures callback details and alerts the nominated person.' },
      { question: 'What happens if it does not understand?', answer: 'It confirms the important detail once, then records uncertainty and hands the enquiry to a person rather than guessing.' },
    ],
    relatedSlugs: ['your-call-rules', 'lead-qualification', 'hot-lead-alerts'],
  },
  {
    slug: 'your-call-rules',
    number: '02',
    name: 'Your call rules',
    menuLine: 'Set the hours, jobs, questions, promises and fallbacks.',
    category: 'Calls',
    metaTitle: 'AI Receptionist Call Rules for Tradies',
    metaDescription: 'See how TradieRelay turns a trade business’s service area, job types, hours, questions and hand-offs into clear call rules.',
    heroTitle: 'Your business rules every conversation.',
    heroBody: 'TradieRelay works from a written rulebook for your jobs, service area, hours, approved answers, exclusions and hand-offs. The automation does not get to make up the way your business operates.',
    heroImage: '/blog/mapping-call-rules.webp',
    heroImageAlt: 'Australian tradie and operator mapping business call rules together',
    shortAnswer: 'Your call rules define when TradieRelay answers, what it may say, which questions it asks, what counts as a suitable or urgent enquiry, where each job goes and when it must stop and hand over. Material rule changes are reviewed and tested before they reach customers.',
    overview: {
      plain: 'TradieRelay follows a written rulebook for your service area, job types, opening hours, preferred work, exclusions and hand-offs.',
      customer: 'A clear response that matches how your business actually works.',
      tradie: 'Fewer unsuitable enquiries and fewer awkward promises to unwind later.',
      control: 'Every live rule. Nothing changes because the AI “felt like it”.',
      outcome: 'The receptionist behaves consistently across routine, unwanted, unclear and urgent enquiries.',
      boundary: 'Rules can guide reception and routing. They do not turn an automated assistant into a licensed trade decision-maker.',
    },
    painTitle: 'A generic receptionist cannot know which jobs are good jobs for you.',
    painBody: 'Two businesses in the same trade may cover different suburbs, avoid different work and use different urgency language. The useful setup is the rulebook, not a generic list of trade questions.',
    outcomes: [
      { title: 'Fewer wrong promises', body: 'Availability, fees and response times stay inside the exact wording you approved.' },
      { title: 'Cleaner lead fit', body: 'Service area, job type, timing and exclusions are checked before the enquiry reaches the team.' },
      { title: 'Known fallbacks', body: 'Unknown questions, failed transfers and uncertain calls already have a safe next step.' },
    ],
    steps: [
      { title: 'Map real calls', body: 'Recent enquiries show the jobs, questions and edge cases the business actually receives.' },
      { title: 'Write plain rules', body: 'Each fact becomes an approved answer, required question, prohibited promise or hand-off condition.' },
      { title: 'Test the awkward cases', body: 'Out-of-area jobs, vague callers, price requests, complaints and failures are tried before launch.' },
      { title: 'Approve and review', body: 'The owner approves the live version and later changes are checked against real conversations.' },
    ],
    productVisual: {
      kind: 'image',
      src: '/blog/tradierelay-dashboard.png',
      alt: 'TradieRelay job dashboard showing captured details and customer evidence produced by approved call rules',
      label: 'WORKING PRODUCT · FAKE DATA',
      caption: 'The rulebook becomes visible in the fields captured, the urgency wording and the next actions offered.',
    },
    visualTitle: 'The rules show up in the result—not in a hidden technical document.',
    visualBody: 'A useful job record shows what the assistant asked, what the customer reported and which decision remains with the tradie. If the record is wrong, the rule can be corrected and retested.',
    customerExperience: [
      { label: 'Relevant questions', body: 'The caller is not forced through plumbing questions for an electrical quote or project questions for a repair.' },
      { label: 'Accurate expectations', body: 'They hear the approved service area, callback or booking language rather than a guess.' },
      { label: 'A safe unknown', body: 'If the rulebook does not contain the answer, the customer is told a person needs to confirm it.' },
    ],
    controls: ['Answer hours and trigger', 'Service areas', 'Wanted and excluded jobs', 'Urgency indicators', 'Approved fees and wording', 'Transfer, callback and failure paths'],
    example: {
      trade: 'Electrical business',
      situation: 'A caller in an outer suburb asks whether the electrician can attend a partial power issue today.',
      customer: 'Provides the property, affected area and visible indicators using the approved questions.',
      relay: 'Checks the suburb and urgency wording, avoids diagnosis and records that attendance has not been promised.',
      tradie: 'Sees the fit and urgency context, then decides whether to call, route or decline.',
    },
    boundary: 'A call rule may classify a response against business-approved criteria. It must not diagnose a fault, invent a technical conclusion or override a licensed person’s judgement.',
    faq: [
      { question: 'Who writes the call rules?', answer: 'Noah maps the business process with the owner, Jake configures the tested behaviour and the owner approves what goes live.' },
      { question: 'Can different hours use different rules?', answer: 'Yes. Daytime no-answer, after-hours and overflow modes can have different greetings, routing and expectations.' },
      { question: 'How quickly can a rule change?', answer: 'Simple factual changes can be prepared quickly, but anything affecting safety, price, suitability or promises is checked before release.' },
      { question: 'What if the business has no written process?', answer: 'That is common. The setup uses recent real calls to pull the working rules out of the owner’s head without asking them to write a manual.' },
    ],
    relatedSlugs: ['ai-phone-reception', 'different-job-type-rules', 'multi-person-call-routing'],
  },
  {
    slug: 'lead-qualification',
    number: '03',
    name: 'Lead qualification',
    menuLine: 'Capture who, what, where, timing, fit and useful evidence.',
    category: 'Calls',
    metaTitle: 'AI Lead Qualification for Australian Tradies',
    metaDescription: 'See how TradieRelay captures job details, location, timing, fit, urgency indicators and customer evidence before the callback.',
    heroTitle: 'Know what the job is before you call back.',
    heroBody: 'TradieRelay collects the short set of facts your business needs to decide whether an enquiry should be called, quoted, booked, routed or politely declined.',
    heroImage: '/blog/plumber-reviewing-callback-lead.webp',
    heroImageAlt: 'Australian plumber reviewing a captured customer enquiry before calling back',
    shortAnswer: 'Lead qualification captures the caller, suburb, job type, plain-English problem, timing, access, approved urgency indicators and useful evidence. It applies the fit rules the tradie supplied, but the tradie still decides diagnosis, price, final suitability and commitment.',
    overview: {
      plain: 'The assistant collects the caller’s name, callback number, suburb, job type, plain-English problem, urgency, timing and any evidence your flow needs.',
      customer: 'They tell the story once and know what happens next.',
      tradie: 'Enough detail to decide whether to call, book, quote, route or politely decline.',
      control: 'Which questions are asked, what counts as a fit and when uncertainty goes to a person.',
      outcome: 'The first human conversation starts with context instead of repeating basic intake.',
      boundary: 'Qualification organises the caller’s information. It does not replace inspection, technical judgement or customer approval.',
    },
    painTitle: 'An unexplained missed call is not a lead—it is another intake task.',
    painBody: 'Without the job, suburb, timing and evidence, the tradie has to call blind. Good qualification makes the next decision faster without turning the call into an interrogation.',
    outcomes: [
      { title: 'Faster callback decisions', body: 'The owner can see fit, urgency indicators and the requested next step before dialling.' },
      { title: 'Less repeated explaining', body: 'The customer’s description and evidence remain attached to the same enquiry.' },
      { title: 'Fewer poor-fit jobs', body: 'Area, job type, size, timing and exclusions are checked against the business rules.' },
    ],
    steps: [
      { title: 'Identify the caller', body: 'Name, callback number, property and contact role establish who the enquiry belongs to.' },
      { title: 'Understand the job', body: 'A trade-specific branch asks the shortest useful set of questions for that work.' },
      { title: 'Check fit and timing', body: 'Location, service type, urgency indicators, access and customer expectations are compared with the rules.' },
      { title: 'Deliver the summary', body: 'The caller’s words, structured facts, uncertainty and evidence land in one job record.' },
    ],
    productVisual: {
      kind: 'screen',
      screen: 'lead',
      label: 'QUALIFIED JOB · FAKE DATA',
      caption: 'The job record keeps the caller’s words, structured fields, evidence and next action together.',
    },
    visualTitle: 'A decision screen, not a transcript dump.',
    visualBody: 'The useful details are pulled forward while the original conversation remains available for review. Uncertain information is marked for checking rather than presented as fact.',
    customerExperience: [
      { label: 'One clear conversation', body: 'They explain the job once through questions that match the type of work.' },
      { label: 'Evidence where useful', body: 'Photos, model details or access notes can be requested after the call when enabled.' },
      { label: 'A specific next step', body: 'They hear whether the business will call, review, request more information or decline.' },
    ],
    controls: ['Required customer fields', 'Trade-specific questions', 'Service area checks', 'Job-fit and exclusion rules', 'Urgency wording', 'Evidence and hand-off requirements'],
    example: {
      trade: 'Air-conditioning business',
      situation: 'An office caller says the front area is not cooling but cannot name the system.',
      customer: 'Provides the site, affected area, visible symptom, access and a model-label photo after the call.',
      relay: 'Keeps the symptom in the caller’s words, avoids troubleshooting and marks the preferred service window.',
      tradie: 'Reviews the unit photo and decides the correct callback and service response.',
    },
    boundary: 'TradieRelay can apply business fit rules to captured information. It does not guarantee the customer’s description is correct or make the final technical, commercial or safety decision.',
    faq: [
      { question: 'How many questions should qualification ask?', answer: 'Only enough to make the next decision useful. Each job branch should be shorter than a generic checklist covering every service.' },
      { question: 'Can it reject unwanted jobs?', answer: 'It can politely decline work that clearly matches an approved exclusion. Unclear or sensitive cases should be handed to a person.' },
      { question: 'Can customers add photos?', answer: 'Yes, where enabled. A secure link can be texted after the call and the uploaded images stay with the job.' },
      { question: 'Does qualification score customers automatically?', answer: 'The founding setup uses transparent fit and urgency rules rather than a hidden quality score. The tradie can see why an enquiry was labelled.' },
    ],
    relatedSlugs: ['your-call-rules', 'hot-lead-alerts', 'different-job-type-rules'],
  },
  {
    slug: 'hot-lead-alerts',
    number: '04',
    name: 'Hot lead alerts',
    menuLine: 'Put suitable or urgent work in front of the right person.',
    category: 'Calls',
    metaTitle: 'Hot Lead Alerts for Australian Tradies',
    metaDescription: 'See how TradieRelay alerts a tradie when a captured enquiry matches approved fit or urgency rules.',
    heroTitle: 'See the calls worth stopping for.',
    heroBody: 'When an enquiry matches the fit or urgency rules you approved, TradieRelay sends the important details and the reason for the alert to the nominated person.',
    heroImage: '/blog/trade-dispatch-several-calls.webp',
    heroImageAlt: 'Australian trade team sorting customer jobs and priorities in a workshop',
    shortAnswer: 'A hot lead alert is a short, explainable notification triggered by the business’s approved suitability or urgency rules. It includes who called, where the job is, what they need, why it was flagged, the evidence available and the next action requested.',
    overview: {
      plain: 'When an enquiry matches the urgency and fit rules you approved, a short alert lands with the important details already pulled out.',
      customer: 'A quicker response from the right person.',
      tradie: 'Who called, where they are, what is wrong, why it is urgent and the requested next step.',
      control: 'What earns a hot label, who receives it and what happens if the first person does not respond.',
      outcome: 'The most useful or time-sensitive enquiries no longer look identical to every other missed call.',
      boundary: 'The alert explains the rule that fired. It is not a diagnosis, guarantee or hidden AI opinion.',
    },
    painTitle: 'A list of ten missed calls gives every caller the same priority.',
    painBody: 'The tradie needs to know which enquiry fits, which one may be urgent and which person should respond—without opening ten conversations on site.',
    outcomes: [
      { title: 'The reason is visible', body: 'The alert states the job, location and rule that caused the priority label.' },
      { title: 'The right person sees it', body: 'Notifications follow the owner, estimator, technician or backup routing agreed for that lead type.' },
      { title: 'A failure is not silent', body: 'If delivery or the first response path fails, the configured fallback can notify another person.' },
    ],
    steps: [
      { title: 'Capture the enquiry', body: 'The receptionist records the required job and customer details.' },
      { title: 'Apply approved rules', body: 'Fit, area, timing and urgency indicators are checked transparently.' },
      { title: 'Send the alert', body: 'The nominated person receives a concise summary with the reason for priority.' },
      { title: 'Track the next action', body: 'The job remains visible until it is contacted, booked, quoted, routed or closed.' },
    ],
    productVisual: {
      kind: 'screen',
      screen: 'alert',
      label: 'HOT LEAD ALERT · FAKE DATA',
      caption: 'The alert explains the customer, job, location, urgency indicators, evidence and next action.',
    },
    visualTitle: 'Priority without the mystery score.',
    visualBody: 'The owner can see why the lead was surfaced. If the rule is too broad, too narrow or creates noise, it can be changed during review.',
    customerExperience: [
      { label: 'Quicker acknowledgement', body: 'The suitable caller is not left waiting behind unrelated supplier or poor-fit messages.' },
      { label: 'No fake emergency promise', body: 'The customer hears the approved next step, not a guarantee that a tradie is already coming.' },
      { label: 'Fewer repeated questions', body: 'The person who calls back already has the reason, context and evidence.' },
    ],
    controls: ['Hot-lead criteria', 'Urgency indicators', 'Recipients by job type', 'Notification channels', 'Escalation delay', 'Acknowledgement and fallback rules'],
    example: {
      trade: 'Plumbing business',
      situation: 'Two calls arrive together: a contained leak in the service area and a routine tap quote outside it.',
      customer: 'Each caller receives the correct expectation based on the business rules.',
      relay: 'Flags the contained leak for prompt review and records the other enquiry without pretending both have the same priority.',
      tradie: 'Sees the reason for the alert and decides the response without opening both calls first.',
    },
    boundary: 'An alert may describe approved indicators such as active water, power impact or requested timing. It must not label a technical diagnosis or promise an emergency response the business has not accepted.',
    faq: [
      { question: 'What makes a lead “hot”?', answer: 'Only the fit and urgency rules the business approves—for example service area, wanted job type, timing and specific caller-reported indicators.' },
      { question: 'Can different people receive different alerts?', answer: 'Yes. Alerts can follow job type, territory, hours or team responsibility, subject to the routing setup agreed for the account.' },
      { question: 'What if nobody responds?', answer: 'A timed fallback can alert a backup person or leave the job clearly marked as needing action rather than silently disappearing.' },
      { question: 'Can the alert be wrong?', answer: 'Caller information can be incomplete or incorrect. The alert shows the captured reason and should be treated as a callback decision aid, not a technical fact.' },
    ],
    relatedSlugs: ['lead-qualification', 'multi-person-call-routing', 'ai-phone-reception'],
  },
  {
    slug: 'quote-follow-up-flow',
    number: '05',
    name: 'Quote follow-up flow',
    menuLine: 'Follow up open quotes, sort replies and stop at the right time.',
    category: 'Workflow',
    metaTitle: 'Automated Quote Follow-Up for Australian Tradies',
    metaDescription: 'See how TradieRelay follows up trade quotes, surfaces questions and stops on booking, decline, opt-out or the approved limit.',
    heroTitle: 'Follow up the quote without becoming the pest.',
    heroBody: 'TradieRelay sends the agreed check-ins, keeps replies with the quote and brings questions or ready-to-book customers back to the tradie.',
    heroImage: '/blog/quote-followup-office-manager.webp',
    heroImageAlt: 'Australian trade office manager reviewing quote follow-up work',
    shortAnswer: 'The quote follow-up flow starts only after a quote is marked as sent, uses the timing and wording the business approved, sorts customer replies and stops on acceptance, decline, opt-out, closure, expiry, manual pause or the maximum attempt count.',
    overview: {
      plain: 'After a quote is marked as sent, TradieRelay sends the agreed check-ins, sorts the reply and stops when the customer books, declines, opts out or reaches the follow-up limit.',
      customer: 'A useful reminder and an easy way to ask a question—not the same “just following up” text five times.',
      tradie: 'Questions, objections and ready-to-book replies surfaced with the quote context.',
      control: 'Timing, wording, maximum attempts, stop conditions and every message that needs human approval.',
      outcome: 'Open quotes get a consistent next step while negotiation and scope decisions stay with the tradie.',
      boundary: 'Automation may remind and classify. It does not change scope, discount, negotiate or accept a job without authority.',
    },
    painTitle: 'A good quote can go quiet simply because the next job started.',
    painBody: 'The customer may be ready, confused or waiting on timing. A useful follow-up makes the decision easy while stopping before the contact becomes unwanted chasing.',
    outcomes: [
      { title: 'Every live quote gets a next step', body: 'The sequence starts from a real sent status rather than someone remembering to set a reminder.' },
      { title: 'Replies keep their context', body: 'Questions and decisions remain attached to the customer, job and quote.' },
      { title: 'Stop rules protect the customer', body: 'Acceptance, decline, opt-out, closure and the agreed limit end the sequence.' },
    ],
    steps: [
      { title: 'Quote marked sent', body: 'Only an approved quote in the agreed status enters the follow-up sequence.' },
      { title: 'Useful check-in sent', body: 'The message identifies the business, quote and a simple action or question path.' },
      { title: 'Reply sorted', body: 'Ready, question, change, timing, decline and opt-out are kept with the quote.' },
      { title: 'Human decision or stop', body: 'The tradie handles scope and negotiation while completed or unwanted sequences stop.' },
    ],
    productVisual: {
      kind: 'image',
      src: '/blog/tradierelay-quote-editor-v2.png',
      alt: 'TradieRelay working quote editor showing saved products, quantities, prices and customer notes',
      label: 'WORKING QUOTE FLOW · FAKE DATA',
      caption: 'The draft, customer message and follow-up status stay connected to the captured job.',
    },
    visualTitle: 'The quote starts from the job that was already captured.',
    visualBody: 'Saved products speed up drafting, but the tradie reviews the scope, quantities, price and note before the customer receives anything.',
    customerExperience: [
      { label: 'They know the sender', body: 'The message identifies the trade business and the quote being discussed.' },
      { label: 'They can answer simply', body: 'Proceed, ask a question, request a change, choose later or decline without a phone chase.' },
      { label: 'They can stop contact', body: 'Opt-out and decline are respected and the follow-up record shows why the sequence ended.' },
    ],
    controls: ['Start status', 'First follow-up timing', 'Message wording', 'Maximum attempts', 'Reply categories', 'Stop, opt-out and manual-pause rules'],
    example: {
      trade: 'Painting business',
      situation: 'An exterior repaint quote has been viewed but the customer has not replied.',
      customer: 'Receives one useful check-in and replies that the colour decision will be made next week.',
      relay: 'Classifies a timing delay, keeps the reply with the quote and pauses the immediate chase.',
      tradie: 'Sees the reason, chooses the next date and answers any scope question personally.',
    },
    boundary: 'TradieRelay does not discount, negotiate, change scope, promise a start date or mark a quote accepted without the authority and workflow the business has explicitly approved.',
    faq: [
      { question: 'How many follow-ups are sent?', answer: 'The business chooses the timing and maximum attempts. A short, limited sequence is safer than indefinite chasing.' },
      { question: 'When does follow-up stop?', answer: 'It stops on acceptance, booking, decline, opt-out, closure, expiry, manual pause or the approved attempt limit.' },
      { question: 'Can it answer quote questions?', answer: 'It can repeat approved factual information. Scope, price, negotiation and uncertain questions are surfaced to the tradie.' },
      { question: 'How does the system know a quote was sent?', answer: 'The founding setup defines the source of truth—such as the TradieRelay quote status or an agreed hand-off from the current quoting process.' },
    ],
    relatedSlugs: ['lead-qualification', 'fortnightly-optimisation', 'higher-included-usage'],
  },
  {
    slug: 'multi-person-call-routing',
    number: '06',
    name: 'Multi-person call routing',
    menuLine: 'Send each enquiry to the right person with a known fallback.',
    category: 'Workflow',
    metaTitle: 'Multi-Person Call Routing for Trade Businesses',
    metaDescription: 'See how TradieRelay routes trade enquiries to owners, estimators, technicians or office staff using approved rules and fallbacks.',
    heroTitle: 'The right lead should reach the right person.',
    heroBody: 'TradieRelay can route enquiries by job type, location, hours or responsibility, then follow the backup path if the first person cannot take it.',
    heroImage: '/blog/trade-crew-routing.webp',
    heroImageAlt: 'Australian trade crew reviewing job routing beside work vehicles',
    shortAnswer: 'Multi-person call routing sends an enquiry to the owner, office person, estimator, technician or branch chosen by written rules. It defines order, hours, transfer limits, acknowledgement and fallback so a failed first route does not silently lose the job.',
    overview: {
      plain: 'Different enquiries can go to different people or teams based on the rules you set—then follow a fallback if nobody takes it.',
      customer: 'They reach the person most likely to help without being bounced around blindly.',
      tradie: 'The right lead reaches the right estimator, office person, technician or owner.',
      control: 'Routing order, working hours, fallback person, transfer limits and when to take a message instead.',
      outcome: 'Responsibility is clear before the call arrives instead of being decided in a group chat afterwards.',
      boundary: 'Routing moves information and calls. It does not grant technical or commercial authority to the wrong role.',
    },
    painTitle: 'A growing crew can answer more calls and still lose ownership of the lead.',
    painBody: 'Passing every enquiry to the owner creates a bottleneck. Blindly ringing the whole team creates interruption and confusion. Useful routing names the first owner and the fallback.',
    outcomes: [
      { title: 'Clear ownership', body: 'Each lead type has a nominated first person or team and an acknowledgement path.' },
      { title: 'Less blind transferring', body: 'The caller’s reason is captured before the business decides whether a live transfer is sensible.' },
      { title: 'A tested backup', body: 'Unavailable people, after-hours calls and failed transfers follow a documented fallback.' },
    ],
    steps: [
      { title: 'Identify the route', body: 'Job type, territory, customer status or hours select the approved path.' },
      { title: 'Try the first owner', body: 'The lead or transfer goes to the person responsible for that work.' },
      { title: 'Use the fallback', body: 'No response, failed transfer or closed hours trigger the backup person or message path.' },
      { title: 'Keep one job record', body: 'The conversation, route attempts and final action remain together for review.' },
    ],
    productVisual: {
      kind: 'screen',
      screen: 'pipeline',
      label: 'TEAM PIPELINE · FAKE DATA',
      caption: 'Jobs remain visible by status after the routing decision, so ownership does not disappear with the notification.',
    },
    visualTitle: 'Routing works when the team can still see what happened.',
    visualBody: 'The pipeline shows which jobs need action, which are waiting and which are booked. The route is a hand-off, not the end of the record.',
    customerExperience: [
      { label: 'One explanation', body: 'The job is captured before hand-off so the customer does not repeat the same story to each person.' },
      { label: 'An honest fallback', body: 'If a live transfer fails, they hear that a callback is required rather than staying in a loop.' },
      { label: 'The right expectation', body: 'Transfer and callback wording changes with hours, job type and the business’s actual availability.' },
    ],
    controls: ['Routes by job type or area', 'Working hours', 'Person and team order', 'Transfer timeout', 'Acknowledgement timing', 'Backup and message path'],
    example: {
      trade: 'Building and maintenance company',
      situation: 'A new renovation enquiry, an existing customer issue and an urgent maintenance call arrive in one afternoon.',
      customer: 'Each caller explains the issue once and hears the next step that matches their call type.',
      relay: 'Routes the project to the estimator, the existing job to the coordinator and the urgent indicator to the on-call person.',
      tradie: 'Each owner receives the correct context while the operator can see any route that failed.',
    },
    boundary: 'Routing does not guarantee that a person will answer. The customer must receive accurate fallback wording, and a failed transfer must become a visible callback task rather than a silent dead end.',
    faq: [
      { question: 'Can calls route by job type?', answer: 'Yes. New projects, service jobs, existing customers and urgent indicators can follow different people and fallbacks.' },
      { question: 'Can routing change after hours?', answer: 'Yes. After-hours rules can use a different on-call person, callback expectation or message path.' },
      { question: 'What happens when a transfer fails?', answer: 'The caller hears the approved fallback, callback details are confirmed and the nominated person receives an alert showing the failed attempt.' },
      { question: 'Can several people ring at once?', answer: 'That pattern may be possible, but a deliberate sequence is often clearer and less disruptive. The setup defines exactly how each route behaves.' },
    ],
    relatedSlugs: ['hot-lead-alerts', 'different-job-type-rules', 'your-call-rules'],
  },
  {
    slug: 'different-job-type-rules',
    number: '07',
    name: 'Different job-type rules',
    menuLine: 'Give leaks, faults, projects and unwanted work different flows.',
    category: 'Workflow',
    metaTitle: 'Different AI Call Rules by Trade Job Type',
    metaDescription: 'See how TradieRelay gives different trade jobs their own questions, fit checks, urgency rules and next actions.',
    heroTitle: 'A burst pipe should not follow the same script as a bathroom quote.',
    heroBody: 'Each job type can have a short, relevant question set, its own suitability and urgency checks, and the next action that matches how the business handles that work.',
    heroImage: '/blog/customised-setup-workshop.webp',
    heroImageAlt: 'TradieRelay operator and Australian tradie testing different job call scenarios',
    shortAnswer: 'Different job-type rules branch the call according to what the customer needs. Repairs, emergencies, installations, quotes, existing jobs, complaints and excluded work can each ask different questions and follow different routing, evidence and hand-off rules.',
    overview: {
      plain: 'An emergency leak should not follow the same questions as a bathroom quote. Each job type can have its own questions, fit checks, urgency rules and next step.',
      customer: 'A shorter, more relevant conversation.',
      tradie: 'Better information without making every caller sit through every question.',
      control: 'Which job types exist, what each flow asks and which jobs are escalated, booked or declined.',
      outcome: 'The first conversation feels specific to the work while the resulting job record remains consistent.',
      boundary: 'A branch can organise the enquiry. It cannot replace technical assessment or create certainty from vague answers.',
    },
    painTitle: 'One long script makes every customer answer questions that do not matter.',
    painBody: 'Relevant branching keeps the call short. A repair needs visible symptoms and access; a project needs scope, plans, timing and the decision-maker.',
    outcomes: [
      { title: 'Shorter conversations', body: 'Callers hear only the questions needed for their job and next step.' },
      { title: 'Better evidence', body: 'Each flow asks for the photos, models, dimensions or plans that actually help.' },
      { title: 'Different hand-offs', body: 'A fault, project, complaint and unwanted job do not land in the same undifferentiated queue.' },
    ],
    steps: [
      { title: 'Find the intent', body: 'The assistant establishes the broad reason for the call before asking detailed questions.' },
      { title: 'Open the right branch', body: 'The relevant job questions, fit checks and evidence request are selected.' },
      { title: 'Apply that branch’s rules', body: 'Urgency, routing and customer expectation follow the approved job-specific path.' },
      { title: 'Return one consistent record', body: 'Different flows still deliver a clear customer, job, evidence and next action.' },
    ],
    productVisual: {
      kind: 'image',
      src: '/blog/tradierelay-dashboard.png',
      alt: 'TradieRelay job dashboard showing a job-specific captured enquiry and customer evidence',
      label: 'JOB-SPECIFIC OUTPUT · FAKE DATA',
      caption: 'The fields and evidence reflect the selected job branch instead of a generic intake form.',
    },
    visualTitle: 'Different questions. One clean job record.',
    visualBody: 'The plumbing, electrical, air-conditioning and project flows can differ without creating a different place for the team to work.',
    customerExperience: [
      { label: 'The call feels relevant', body: 'A customer with a repair is not asked for project budget and a project customer is not rushed through fault questions.' },
      { label: 'They know what is needed', body: 'The evidence request explains which photo, model, dimension or document will help.' },
      { label: 'They get the matching next step', body: 'Urgent review, estimator callback, booking request or decline follows the selected branch.' },
    ],
    controls: ['Job-type list', 'Intent questions', 'Required fields by branch', 'Evidence by branch', 'Fit and urgency rules', 'Route and next action by branch'],
    example: {
      trade: 'Carpentry business',
      situation: 'One caller needs a sticking door repaired and another wants a new rear deck quoted.',
      customer: 'The repair caller gives the affected door and access; the project caller gives rough size, photos, timing and material ideas.',
      relay: 'Runs two short branches and sends each enquiry to the correct service or estimating path.',
      tradie: 'Sees a repair-ready callback and a qualified project brief rather than two generic carpentry calls.',
    },
    boundary: 'The job branch is based on what the caller reports. If the type is uncertain, the assistant should capture the ambiguity and hand over rather than force a false classification.',
    faq: [
      { question: 'How many job types can be configured?', answer: 'Enough to reflect the real business without creating an unmanageable script. The plan scope states the number of routes included.' },
      { question: 'Can one call move between branches?', answer: 'Yes, when the caller clarifies the intent. The flow should avoid repeatedly restarting or asking duplicate questions.' },
      { question: 'Can unwanted jobs receive a polite decline?', answer: 'Yes, when the exclusion is clear and approved. Sensitive or uncertain situations should go to a person.' },
      { question: 'Do job-type rules work for every trade?', answer: 'They work best where repeatable first questions and boundaries can be described. The trade pages show examples for common Australian trade businesses.' },
    ],
    relatedSlugs: ['your-call-rules', 'lead-qualification', 'multi-person-call-routing'],
  },
  {
    slug: 'priority-setup-support',
    number: '08',
    name: 'Priority setup support',
    menuLine: 'A named founder owns mapping, testing and launch progress.',
    category: 'Service',
    metaTitle: 'Priority AI Receptionist Setup Support',
    metaDescription: 'See what TradieRelay priority setup support includes: workflow mapping, rule writing, testing, launch ownership and direct founder help.',
    heroTitle: 'One person owns getting the setup live safely.',
    heroBody: 'Noah maps the business, chases the missing decisions and keeps launch moving while Jake configures and tests the approved behaviour.',
    heroImage: '/blog/young-founders-testing-call-flow.webp',
    heroImageAlt: 'Two young Australian founders testing a trade business call flow together',
    shortAnswer: 'Priority setup support is a named, faster onboarding path led by Noah and Jake. It covers call discovery, rule mapping, configuration, edge-case testing, launch coordination and early review. Priority means active ownership—not skipping approval or safety checks.',
    overview: {
      plain: 'Noah personally maps your call flow, chases the information needed to finish it and keeps your launch moving ahead of standard setup work.',
      customer: 'A tested call experience that reflects the trade business before they hear it.',
      tradie: 'One named person to resolve decisions and show what is ready, missing or blocked.',
      control: 'The owner still approves live wording, prices, job rules, routing and fallback behaviour.',
      outcome: 'The setup reaches a testable launch state without the tradie becoming an unpaid software project manager.',
      boundary: 'Support accelerates coordination. It does not make an unclear, unsafe or untested rule suitable for release.',
    },
    painTitle: 'Software setup stalls when every missing answer waits on somebody else.',
    painBody: 'A named setup owner turns loose questions into decisions, schedules tests and keeps the tradie focused on approving the business behaviour rather than managing technical tasks.',
    outcomes: [
      { title: 'A named owner', body: 'Noah is responsible for scope, decisions and visible launch progress.' },
      { title: 'A tested configuration', body: 'Jake checks normal, awkward and failed calls before a customer hears the flow.' },
      { title: 'A controlled start', body: 'The pilot begins with one useful call problem, a fallback and a review date.' },
    ],
    steps: [
      { title: 'Map the leak', body: 'One costly missed-call, reception or quote-follow-up problem defines the pilot.' },
      { title: 'Collect decisions', body: 'Noah documents services, areas, questions, promises, routes and missing owner choices.' },
      { title: 'Build and test', body: 'Jake configures the approved workflow and tries normal, awkward and failure cases.' },
      { title: 'Launch and review', body: 'The narrow pilot goes live with a fallback and a 14-day keep, change or stop review.' },
    ],
    productVisual: {
      kind: 'image',
      src: '/blog/tradierelay-products-prices-v2.png',
      alt: 'TradieRelay account setup showing editable saved products and prices',
      label: 'CUSTOMER-SPECIFIC SETUP · FAKE DATA',
      caption: 'Business facts such as saved services and prices are configured in the account and remain editable by the tradie.',
    },
    visualTitle: 'The output is a working account and the rules behind it.',
    visualBody: 'Priority support is not a premium queue with no deliverable. The account, call rules, test cases, routing plan and launch decisions remain visible and reviewable.',
    customerExperience: [
      { label: 'Tested wording', body: 'The introduction, questions and expectations are heard in test calls before launch.' },
      { label: 'Fewer contradictions', body: 'Services, prices, hours and exclusions are checked across the customer and tradie views.' },
      { label: 'A known fallback', body: 'If the automation or transfer cannot complete, the caller still reaches the approved backup path.' },
    ],
    controls: ['Pilot scope', 'Decision owner', 'Rule approval', 'Test cases', 'Go-live window', 'Keep, change or stop review'],
    example: {
      trade: 'Sole-trader electrical business',
      situation: 'The owner wants missed calls covered but has never written down the jobs, areas or urgency language.',
      customer: 'Later hears a short flow built from the business’s real calls rather than a generic electrician script.',
      relay: 'Uses the approved questions, records uncertainty and follows the tested callback path.',
      tradie: 'Approves the flow, sees the test evidence and knows Noah owns any launch issue.',
    },
    boundary: 'Priority support does not mean instant activation, unlimited custom development or skipping customer disclosure, routing checks, privacy choices or safe fallback testing.',
    faq: [
      { question: 'What makes support “priority”?', answer: 'A named founder owns progress, missing decisions are actively chased and the setup is scheduled ahead of the standard queue.' },
      { question: 'Does the tradie still need to provide information?', answer: 'Yes, but Noah pulls it out through practical examples. The owner must approve business facts, promises and hand-offs.' },
      { question: 'How long does setup take?', answer: 'It depends on phone feasibility, workflow complexity and how quickly decisions are approved. A date is agreed after the call setup is checked.' },
      { question: 'What is delivered before launch?', answer: 'An approved scope, call rules, test cases, routing plan, lead format, fallback and review point.' },
    ],
    relatedSlugs: ['your-call-rules', 'fortnightly-optimisation', 'different-job-type-rules'],
  },
  {
    slug: 'higher-included-usage',
    number: '09',
    name: 'Higher included usage',
    menuLine: 'A larger agreed call and follow-up allowance for growing teams.',
    category: 'Service',
    metaTitle: 'Higher Included AI Receptionist Usage for Trade Teams',
    metaDescription: 'Understand TradieRelay higher included usage, allowance monitoring, warnings and the difference between a larger plan and unlimited use.',
    heroTitle: 'More calls covered without a surprise bill.',
    heroBody: 'The Crew plan includes a larger agreed allowance for answered call time, messages and active follow-up work, with the volume and extra-use rate written down before launch.',
    heroImage: '/blog/reviewing-plan-inclusions.webp',
    heroImageAlt: 'Australian tradie reviewing service plan inclusions and call volume',
    shortAnswer: 'Higher included usage gives a growing trade team a larger agreed pool of answered call time, messages and active follow-up activity before extra use applies. It is monitored against normal volume, and any proposed plan or cost change is raised before it becomes a surprise.',
    overview: {
      plain: 'The Crew plan includes a larger agreed pool of answered call time, messages and active follow-up work before extra usage applies.',
      customer: 'Calls and follow-ups continue to receive a consistent response as the team gets busier.',
      tradie: 'Room for more enquiries, routes and quote activity without treating every extra call as a billing emergency.',
      control: 'The allowance, measurement, warning point and extra-use rate written into the proposal.',
      outcome: 'Usage capacity matches a growing operation while spend remains visible and reviewable.',
      boundary: 'Higher included usage is not unlimited usage and it does not excuse poor routing, spam traffic or an inefficient call flow.',
    },
    painTitle: 'A growing team needs capacity—but “unlimited” is rarely a real operating rule.',
    painBody: 'The practical answer is a transparent allowance sized from real volume, a warning before change and a review of whether extra activity represents useful customer work.',
    outcomes: [
      { title: 'A written allowance', body: 'Included call, message and follow-up activity is stated in the agreed plan scope.' },
      { title: 'Visible trend', body: 'Volume changes are reviewed before they quietly become a recurring surprise.' },
      { title: 'Capacity with discipline', body: 'Growing traffic can be separated from spam, wrong numbers and avoidable call length.' },
    ],
    steps: [
      { title: 'Estimate normal volume', body: 'Recent calls, duration, routes and open quote activity provide a realistic starting point.' },
      { title: 'Agree the allowance', body: 'The proposal states what is included and how extra usage would be measured.' },
      { title: 'Watch useful demand', body: 'Answered calls, messages, follow-up activity and outcomes are reviewed together.' },
      { title: 'Warn before change', body: 'A sustained increase triggers a conversation before a plan or charge changes.' },
    ],
    productVisual: {
      kind: 'screen',
      screen: 'pipeline',
      label: 'ACTIVE WORK PIPELINE · FAKE DATA',
      caption: 'Usage matters because it is connected to real jobs, customer replies and team actions—not because a counter went up.',
    },
    visualTitle: 'Volume is useful only when the team can see the work it created.',
    visualBody: 'The operating review looks beyond minutes or messages to the jobs captured, actions required and quote decisions moved forward.',
    customerExperience: [
      { label: 'Consistent response', body: 'A busy week does not suddenly create a different greeting or missing workflow.' },
      { label: 'The same boundaries', body: 'Higher volume does not relax disclosure, stop rules or human hand-offs.' },
      { label: 'Less queue pressure', body: 'More suitable enquiries can be sorted and routed without every caller waiting on the owner.' },
    ],
    controls: ['Included call activity', 'Included messages', 'Active follow-up allowance', 'Monitoring period', 'Warning threshold', 'Extra-use rate and plan review'],
    example: {
      trade: 'Growing plumbing crew',
      situation: 'Seasonal demand increases missed calls, after-hours enquiries and open quotes for three weeks.',
      customer: 'Continues to receive the same approved call and follow-up experience.',
      relay: 'Records higher activity while keeping spam, failures and customer opt-outs visible.',
      tradie: 'Reviews whether the increase produced useful jobs before agreeing to any plan change.',
    },
    boundary: 'Higher included usage does not mean unlimited calls, messages, custom flows or provider costs. Exact inclusions and extra-use treatment must be written before activation.',
    faq: [
      { question: 'Is higher included usage unlimited?', answer: 'No. The allowance and any extra-use rate are agreed in writing before launch.' },
      { question: 'What activity counts?', answer: 'The proposal defines the relevant answered call time, messages and active follow-up work for the customer setup.' },
      { question: 'Will one busy week change the plan?', answer: 'A short spike should be reviewed in context. A sustained change in useful volume is the reason to discuss capacity.' },
      { question: 'How are surprise bills avoided?', answer: 'Normal volume, the included allowance, warning point and extra-use treatment are documented, then reviewed before a change is proposed.' },
    ],
    relatedSlugs: ['fortnightly-optimisation', 'multi-person-call-routing', 'quote-follow-up-flow'],
  },
  {
    slug: 'fortnightly-optimisation',
    number: '10',
    name: 'Fortnightly optimisation',
    menuLine: 'Review real calls, friction, lead quality and approved improvements.',
    category: 'Service',
    metaTitle: 'Fortnightly AI Receptionist Optimisation for Tradies',
    metaDescription: 'See how TradieRelay reviews real trade calls, hand-offs, customer friction and lead outcomes every fortnight before approving improvements.',
    heroTitle: 'Improve the flow from evidence, not guesses.',
    heroBody: 'Every two weeks, Noah and Jake review what callers asked, where the assistant handed off, which leads were useful and what created avoidable work.',
    heroImage: '/blog/trade-team-reviewing-quote-results.webp',
    heroImageAlt: 'Australian trade team reviewing call and quote outcomes together',
    shortAnswer: 'Fortnightly optimisation is a structured review of call reasons, qualification, hand-offs, customer friction, lead usefulness, quote replies, failures and team actions. Noah and Jake recommend changes; the trade business approves material wording, routing and rule changes before release.',
    overview: {
      plain: 'Every two weeks, Noah and Jake review what callers asked, where the assistant handed off, which leads were useful and what created avoidable work.',
      customer: 'A clearer, shorter experience as real questions and points of confusion are corrected.',
      tradie: 'Less noise, better summaries and rules tuned to the work the business actually wants.',
      control: 'The owner approves changes to live wording, qualification, routing and customer promises.',
      outcome: 'The service gets more useful without silently drifting away from the business rules.',
      boundary: 'Optimisation improves an approved workflow. It is not permission for automatic experiments on live customers.',
    },
    painTitle: 'The first setup cannot predict every phrase, exception and team habit.',
    painBody: 'Real conversations reveal duplicate questions, missing facts, unclear expectations and routes nobody owns. A short review turns those observations into controlled improvements.',
    outcomes: [
      { title: 'Less customer friction', body: 'Repeated questions, long branches and avoidable hand-offs are identified from real calls.' },
      { title: 'Better lead usefulness', body: 'The team can say which fields, labels and alerts helped or created noise.' },
      { title: 'No silent drift', body: 'Recommended changes are documented, tested and approved before live behaviour changes.' },
    ],
    steps: [
      { title: 'Review the evidence', body: 'Calls, summaries, routes, quote replies, failures and outcomes are inspected together.' },
      { title: 'Find one useful change', body: 'The review prioritises the clearest friction or lead-quality problem instead of rewriting everything.' },
      { title: 'Test the change', body: 'Updated wording or rules are checked against normal and awkward examples.' },
      { title: 'Approve or leave it', body: 'The owner decides whether the tested change reaches customers.' },
    ],
    productVisual: {
      kind: 'image',
      src: '/blog/tradierelay-dashboard.png',
      alt: 'TradieRelay working dashboard showing captured job details, evidence and current action',
      label: 'REVIEW SURFACE · FAKE DATA',
      caption: 'The review connects call behaviour to the job record and the action the team actually took.',
    },
    visualTitle: 'Optimise the hand-off, not the AI performance theatre.',
    visualBody: 'A better flow gives the customer a clearer experience and the tradie a more useful decision. That is the standard—not whether the assistant used impressive language.',
    customerExperience: [
      { label: 'Shorter where possible', body: 'Questions that do not change the next decision can be removed or moved later.' },
      { label: 'Clearer expectations', body: 'Repeated confusion shows where callback, booking, timing or automated-assistant wording needs work.' },
      { label: 'Faster human help', body: 'Calls that repeatedly need a person can be handed over earlier under an approved rule.' },
    ],
    controls: ['Review cadence', 'Evidence included', 'Change owner', 'Test examples', 'Approval required', 'Rollback and review note'],
    example: {
      trade: 'Air-conditioning business',
      situation: 'Several callers say “it is blowing but not cooling,” and the team still has to ask for the model after every callback.',
      customer: 'Receives a shorter follow-up text asking for the model-label photo rather than another call question.',
      relay: 'Keeps the symptom in the caller’s words and attaches the model photo to the same job.',
      tradie: 'Approves the tested improvement after confirming it makes the service callback more useful.',
    },
    boundary: 'TradieRelay may recommend changes from observed patterns. It must not automatically expand services, weaken stop rules, change prices, alter safety wording or reroute responsibility without approval.',
    faq: [
      { question: 'What is reviewed every fortnight?', answer: 'Call reasons, missing or repeated questions, hand-offs, failed routes, lead usefulness, quote replies, customer friction and team outcomes.' },
      { question: 'Does TradieRelay change itself automatically?', answer: 'No. Material live wording, qualification, routing and promise changes are recommended, tested and approved.' },
      { question: 'What if nothing needs changing?', answer: 'Then the current flow stays. Optimisation is not a requirement to manufacture work every fortnight.' },
      { question: 'Can a bad change be rolled back?', answer: 'Yes. Changes should be documented and reversible, with the earlier approved behaviour available as the fallback.' },
    ],
    relatedSlugs: ['your-call-rules', 'quote-follow-up-flow', 'higher-included-usage'],
  },
];

export function getFeature(slug: string) {
  return featurePages.find((feature) => feature.slug === slug);
}
