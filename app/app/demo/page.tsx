import type { Metadata } from 'next';
import { DemoWorkspace } from './workspace';

export const metadata: Metadata = {
  title: 'Tradie workspace demo',
  description: 'A working preview of the TradieRelay job workspace.',
  robots: { index: false, follow: false },
};

export default function DemoWorkspacePage() {
  return <DemoWorkspace />;
}
