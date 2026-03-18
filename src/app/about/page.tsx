export const metadata = {
  title: 'About Us — ScrollCorner',
  description: 'Learn about ScrollCorner, your source for daily news across world events, technology, finance, science, entertainment, and sports.',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-black text-white mb-8">About ScrollCorner</h1>

      <div className="space-y-6 text-white/60 leading-relaxed">
        <p>
          ScrollCorner is an independent digital news platform delivering daily coverage across six key areas: World News, Technology, Finance, Science, Entertainment, and Sports.
        </p>
        <p>
          Our editorial team aggregates the most relevant stories from trusted global sources — including BBC News, Reuters, Al Jazeera, and Deutsche Welle — and presents them in a clear, concise format for busy readers.
        </p>
        <p>
          We believe staying informed shouldn&apos;t be complicated. ScrollCorner exists to cut through the noise and surface the stories that matter, updated multiple times throughout the day.
        </p>

        <div className="border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white mb-3">Our Sources</h2>
          <p>
            ScrollCorner draws on publicly available news feeds from internationally recognised outlets. All articles are independently edited and rewritten for our audience. We are not affiliated with any of our source publications.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
          <p>
            For enquiries, corrections, or partnership requests, reach us at{' '}
            <a href="mailto:contact@scrollcorner.com" className="text-[#e63946] hover:underline">
              contact@scrollcorner.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
