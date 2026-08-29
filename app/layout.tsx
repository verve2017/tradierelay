import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tradie-relay.verve-9089.chatgpt.site'),
  title: {
    default: 'TradieRelay | Turn missed calls into booked jobs',
    template: '%s | TradieRelay',
  },
  description: 'AI receptionist and quote follow-up for Australian tradies. Capture missed calls, follow up open quotes and stay focused on the job.',
  alternates: { canonical: '/' },
  icons: {
    icon: '/tradierelay-icon.png',
    apple: '/tradierelay-icon.png',
  },
  openGraph: {
    title: 'Turn missed calls into booked jobs',
    description: 'AI receptionist and quote follow-up for Australian tradies.',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/og-tradierelay.jpg', width: 1730, height: 909, alt: 'TradieRelay for Australian tradies' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turn missed calls into booked jobs',
    description: 'AI receptionist and quote follow-up for Australian tradies.',
    images: ['/og-tradierelay.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'TradieRelay',
              url: 'https://tradie-relay.verve-9089.chatgpt.site',
              description: 'Missed-call recovery, AI reception and quote follow-up for Australian trade businesses.',
              areaServed: { '@type': 'Country', name: 'Australia' },
              founder: [{ '@type': 'Person', name: 'Noah' }, { '@type': 'Person', name: 'Jake' }],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
