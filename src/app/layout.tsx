import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'ScrollCorner — Breaking News, Tech, Finance & More',
  description: 'Stay informed with ScrollCorner. Latest breaking news on world events, technology, finance, science, entertainment, and sports.',
  openGraph: {
    title: 'ScrollCorner',
    description: 'Breaking news on world events, technology, finance, science, entertainment, and sports.',
    url: 'https://scrollcorner.com',
    siteName: 'ScrollCorner',
    type: 'website',
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
        <footer className="border-t border-white/10 mt-16 py-8 text-center text-white/30 text-xs">
          <p>© {new Date().getFullYear()} ScrollCorner. All rights reserved.</p>
          <p className="mt-1">News aggregated and edited for informational purposes.</p>
        </footer>
      </body>
    </html>
  );
}
