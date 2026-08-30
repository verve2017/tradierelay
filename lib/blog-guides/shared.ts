import type { BlogArticle, BlogSection } from '@/lib/blog';

type GuideCategory = BlogArticle['category'];
type ProductVisual = BlogArticle['productVisual'];

type GuideInput = {
  slug: string;
  number: number;
  category: GuideCategory;
  title: string;
  description: string;
  directAnswer: string;
  readMinutes?: number;
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  keyPoints: [string, string, string];
  sections: [BlogSection, BlogSection, BlogSection, BlogSection, BlogSection];
  example: BlogArticle['example'];
  productVisual: ProductVisual;
  productCaption: string;
  checklist?: string[];
  table?: BlogArticle['table'];
  faqs: [BlogArticle['faqs'][number], BlogArticle['faqs'][number], BlogArticle['faqs'][number]];
  sources?: BlogArticle['sources'];
  related: [string, string, string];
};

const screenshotByVisual: Record<ProductVisual, Pick<BlogArticle, 'secondaryImage' | 'secondaryAlt' | 'secondaryCaption'>> = {
  alert: {
    secondaryImage: '/app-screens/hot-lead-alert.png',
    secondaryAlt: 'TradieRelay hot lead alert showing fictional customer and job details',
    secondaryCaption: 'The alert gives the nominated person the caller, suburb, job, urgency and next action. The screen uses fictional demo data.',
  },
  lead: {
    secondaryImage: '/app-screens/qualified-lead.png',
    secondaryAlt: 'TradieRelay qualified lead screen using fictional customer data',
    secondaryCaption: 'The qualified-lead screen gives the tradie the caller, suburb, job, evidence and requested next action. Fictional demo data is shown.',
  },
  pipeline: {
    secondaryImage: '/app-screens/qualified-lead.png',
    secondaryAlt: 'TradieRelay qualified lead before it enters the action pipeline',
    secondaryCaption: 'A structured lead provides the context needed before the team moves it through the action pipeline. Fictional demo data is shown.',
  },
  dashboard: {
    secondaryImage: '/app-screens/hot-lead-alert.png',
    secondaryAlt: 'TradieRelay hot lead alert with fictional customer data',
    secondaryCaption: 'The alert carries the customer, suburb, job and next action before the full record is reviewed. Fictional demo data is shown.',
  },
  rules: {
    secondaryImage: '/blog/tradierelay-dashboard.png',
    secondaryAlt: 'TradieRelay dashboard showing the result of configured call rules',
    secondaryCaption: 'Configured rules turn into visible calls, jobs and actions in the working dashboard. Fictional demo data is shown.',
  },
  'photo-request': {
    secondaryImage: '/app-screens/customer-photo-tile.png',
    secondaryAlt: 'Customer job photo displayed as a tile in the TradieRelay dashboard',
    secondaryCaption: 'After upload, the actual customer evidence appears as a tile on the matching dashboard job. Fictional demo data is shown.',
  },
  'quote-editor': {
    secondaryImage: '/blog/tradierelay-products-prices-v2.png',
    secondaryAlt: 'TradieRelay approved products and prices feeding the quote editor',
    secondaryCaption: 'The tradie controls the approved items that can be selected in the quote editor. Fictional demo data is shown.',
  },
  'products-prices': {
    secondaryImage: '/blog/tradierelay-quote-editor-v2.png',
    secondaryAlt: 'TradieRelay quote editor using approved saved products and prices',
    secondaryCaption: 'Approved saved items flow into a quote that the tradie reviews before sending. Fictional demo data is shown.',
  },
  'customer-quote': {
    secondaryImage: '/blog/tradierelay-quote-editor-v2.png',
    secondaryAlt: 'TradieRelay quote editor before the customer receives the quote',
    secondaryCaption: 'The tradie reviews the customer, scope and price in the working editor before the mobile quote is sent. Fictional demo data is shown.',
  },
};

export function makeGuide(input: GuideInput): BlogArticle {
  const screenshot = screenshotByVisual[input.productVisual];
  return {
    ...input,
    readMinutes: input.readMinutes ?? 8,
    ...screenshot,
    checklist: input.checklist ?? [
      'Write the current process before changing it.',
      'Name the one person who owns the next action.',
      'Set the boundary and fallback in plain English.',
      'Test a normal case and an awkward case.',
      'Check what the caller hears and what the dashboard receives.',
      'Review the result after the first fortnight.',
    ],
  };
}

export const sources = {
  aiStandard: { label: 'Australian Government: Voluntary AI Safety Standard', url: 'https://www.industry.gov.au/publications/voluntary-ai-safety-standard' },
  aiGuardrails: { label: 'Australian Government: 10 voluntary AI guardrails', url: 'https://www.industry.gov.au/publications/voluntary-ai-safety-standard/10-guardrails' },
  oaicAi: { label: 'OAIC: Privacy and commercially available AI products', url: 'https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products' },
  oaicApp5: { label: 'OAIC: APP 5 notification of collection', url: 'https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-5-app-5-notification-of-the-collection-of-personal-information' },
  oaicApp11: { label: 'OAIC: APP 11 security of personal information', url: 'https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-11-app-11-security-of-personal-information' },
  oaicBreach: { label: 'OAIC: Preparing a data breach response plan', url: 'https://www.oaic.gov.au/privacy/notifiable-data-breaches/preventing-preparing-for-and-responding-to-data-breaches/data-breach-preparation-and-response/part-2-preparing-a-data-breach-response-plan' },
  acmaSpam: { label: 'ACMA: Email and SMS unsubscribe rules', url: 'https://www.acma.gov.au/sites/default/files/2024-05/Fact%20sheet%20-%20email%20and%20SMS%20unsubscribe%20rules.pdf' },
  acccPrices: { label: 'ACCC: Price displays', url: 'https://www.accc.gov.au/business/pricing/price-displays' },
  acccClaims: { label: 'ACCC: False or misleading claims', url: 'https://www.accc.gov.au/business/advertising-and-promotions/false-or-misleading-claims' },
  acccReviews: { label: 'ACCC: Online reviews guide for business', url: 'https://www.accc.gov.au/system/files/Online%20reviews%E2%80%94a%20guide%20for%20business%20and%20review%20platforms.pdf' },
  googleHelpful: { label: 'Google Search Central: Helpful, reliable, people-first content', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' },
  googleAiSearch: { label: 'Google Search Central: AI features optimisation guide', url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide' },
  googleLocalData: { label: 'Google Search Central: LocalBusiness structured data', url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business' },
  googleProfile: { label: 'Google Business Profile Help: Get started', url: 'https://support.google.com/business/answer/7039811?hl=en-AU' },
  googleReviews: { label: 'Google Business Profile Help: Get more reviews', url: 'https://support.google.com/business/answer/3474122?hl=en-AU' },
  googleServiceArea: { label: 'Google Business Profile Help: Manage a service-area address', url: 'https://support.google.com/business/answer/2853879?hl=en-AU' },
};
