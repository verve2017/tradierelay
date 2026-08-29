import type { Metadata } from 'next';
import { OperatorConsole } from '../operator-console';

export const metadata: Metadata = { title: 'Operator console demo | TradieRelay', robots: { index: false, follow: false } };

export default function OperatorDemoPage() { return <OperatorConsole demo />; }
