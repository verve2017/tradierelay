import type { Metadata } from 'next';
import { CustomerQuote } from '../../quote/quote-review';

export const metadata: Metadata = { title: 'Customer quote demo | TradieRelay', robots: { index: false, follow: false } };

export default function DemoQuotePage() { return <CustomerQuote demo />; }
