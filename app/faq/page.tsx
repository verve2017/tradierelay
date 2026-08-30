import { CtaBand } from '@/components/cta-band';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Frequently asked questions', 'Detailed answers about TradieRelay phone setup, customer experience, control, quote follow-up, pricing, privacy and the founding pilot.', '/faq');

const groups = [
  {
    title: 'Fit and phone setup',
    items: [
      ['Do I need a new phone number?', 'Usually not. The recommended pilot keeps the number customers already know and applies a reversible no-answer, busy, overflow or after-hours routing rule. Feasibility depends on your current phone provider and is confirmed first.'],
      ['Does TradieRelay answer every call?', 'Only if that is the rule you choose. Most founding customers should start with missed calls or after-hours so the existing call experience stays intact.'],
      ['What trades does it suit?', 'It suits businesses with repeatable first questions and clear service boundaries: electrical, plumbing, air conditioning, building, landscaping, maintenance and similar services.'],
      ['What size business is it for?', 'Catch is aimed at a sole trader or small crew. Relay adds reception and quote follow-up. Crew adds more routing for a growing team.'],
      ['What happens if I change phone provider?', 'The routing plan is reviewed and reconnected. The conversation rules and knowledge remain reusable.'],
    ],
  },
  {
    title: 'The caller experience',
    items: [
      ['Will callers know it is automated?', 'Yes. The introduction is brief and clear. TradieRelay does not pretend to be a person.'],
      ['Will it sound robotic?', 'The words are written for a normal trade-service conversation, not a call-centre script. The pilot test checks pacing, interruptions and natural caller language before launch.'],
      ['What if someone just wants a human?', 'The flow follows your approved transfer or callback rule. It should not trap a caller in automation.'],
      ['Can it handle different accents or noisy sites?', 'Speech systems can still struggle with noise, poor reception or unfamiliar phrasing. The fallback is to confirm key details, ask once more and capture a callback rather than guess.'],
      ['Can customers send photos?', 'Where the chosen messaging setup supports it, the flow can request photos or useful details by text and keep them with the enquiry. This is confirmed during setup.'],
    ],
  },
  {
    title: 'Control and safety',
    items: [
      ['Can it give a price?', 'Only if you provide a specific approved fee or pricing rule. It does not invent a quote, diagnose remotely or estimate work outside that rule.'],
      ['What happens when it does not know?', 'It says the team needs to confirm, captures the question and routes it to the nominated person. Unknown is a hand-off state, not permission to improvise.'],
      ['Can I listen to or review conversations?', 'The available record depends on the phone setup and recording choices agreed for the pilot. The lead summary always shows the material facts and what the customer was told.'],
      ['Can I change an answer quickly?', 'Yes. Business facts, exclusions and routing rules can be narrowed or changed. Material changes are checked before the live flow is updated.'],
      ['Can I turn it off?', 'Yes. The routing method is designed to be reversible, with a documented fallback to your normal line or voicemail setup.'],
    ],
  },
  {
    title: 'Quote follow-up',
    items: [
      ['How does it know which quotes to follow up?', 'The pilot defines the source of open quotes and the status that starts a sequence. The exact connection depends on your current quoting tool or agreed manual hand-off.'],
      ['How many times will it contact someone?', 'You approve the sequence and maximum count. It stops on a booking, decline, opt-out, manual pause or the set limit.'],
      ['What if the customer has a price objection?', 'The objection and quote context are surfaced to you. TradieRelay does not negotiate unless you have approved a very specific response.'],
      ['Will it keep annoying customers?', 'The flow uses short messages, clear stop conditions and opt-out handling. A pilot review checks for friction before the sequence expands.'],
    ],
  },
  {
    title: 'Pricing and pilot',
    items: [
      ['Why is there a setup fee?', 'The work is mapping, writing and testing your specific call rules, routing, summaries and fallbacks. A generic login would not provide that control.'],
      ['Is there a long contract?', 'The founding pilot has no long-term lock-in. Final scope, inclusions, usage and service terms are reviewed before activation.'],
      ['What happens if call volume is higher than expected?', 'Normal volume is estimated before launch. Usage is monitored and you are warned before a plan or cost change is proposed. No silent surprise overage.'],
      ['How do we decide whether the pilot worked?', 'The 14-day review looks at useful enquiries recovered, owner time saved, caller friction and any incorrect answer or promise.'],
      ['Can I start with only missed calls?', 'Yes. That is the recommended pilot for most sole traders because it is useful, measurable and easy to reverse.'],
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="The questions you should ask before handing over the phone."
        body="Phone routing, caller experience, control, pricing and the awkward edge cases—answered without the sales fog."
        note="Still unsure? Bring the question to Noah"
        image="/blog/questions-before-buying.webp"
        imageAlt="Australian tradie reviewing a checklist before choosing an AI receptionist"
        imageBadge="CHECK BEFORE YOU BUY"
        imageCaption="Ask about the awkward calls, not just the easy demo."
      />
      <section className="section complete-faq-section">
        <div className="shell complete-faq-grid">
          {groups.map((group) => (
            <section key={group.title} className="faq-group">
              <h2>{group.title}</h2>
              <div className="faq-list">
                {group.items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}
              </div>
            </section>
          ))}
        </div>
      </section>
      <CtaBand title="Have a question we did not answer?" body="Send Noah the exact concern. If the answer changes whether the pilot is safe or useful, it belongs in the setup rules." />
      <SiteFooter />
    </main>
  );
}
