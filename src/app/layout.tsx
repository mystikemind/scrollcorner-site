import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://scrollcorner.com'),
  title: 'ScrollCorner — Breaking News, Tech, Finance & More',
  description: 'Stay informed with ScrollCorner. Latest breaking news on world events, technology, finance, science, entertainment, and sports.',
  alternates: { canonical: 'https://scrollcorner.com' },
  openGraph: {
    title: 'ScrollCorner',
    description: 'Breaking news on world events, technology, finance, science, entertainment, and sports.',
    url: 'https://scrollcorner.com',
    siteName: 'ScrollCorner',
    type: 'website',
    images: [{ url: 'https://scrollcorner.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScrollCorner',
    description: 'Breaking news on world events, technology, finance, science, entertainment, and sports.',
    images: ['https://scrollcorner.com/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080c18]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-J1251Y8850" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J1251Y8850');
        `}</Script>
        <footer className="border-t border-white/10 mt-16 py-8 text-center text-white/30 text-xs">
          <p>© {new Date().getFullYear()} ScrollCorner. All rights reserved.</p>
          <p className="mt-1">News aggregated and edited for informational purposes.</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="/about" className="hover:text-white transition-colors">About</a>
            <span>·</span>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <span>·</span>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
