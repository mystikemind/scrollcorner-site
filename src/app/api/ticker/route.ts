import { NextResponse } from 'next/server';

// Multiple RSS sources for breaking news ticker
const TICKER_FEEDS = [
  'https://feeds.bbci.co.uk/news/world/rss.xml',
  'https://www.aljazeera.com/xml/rss/all.xml',
  'https://rss.dw.com/rdf/rss-en-world',
];

// Strip common " - Source Name" or " | Source" suffixes from RSS titles
function stripSource(title: string): string {
  return title.replace(/\s[\-–|]\s+[^-–|]{3,40}$/, '').trim();
}

async function fetchHeadlines(feedUrl: string, limit = 4): Promise<string[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'ScrollCorner/1.0' },
      next: { revalidate: 3600 }, // cache 1 hour
    });
    const text = await res.text();
    const titles: string[] = [];
    const matches = text.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/g);
    for (const m of matches) {
      const raw = (m[1] || m[2] || '').trim();
      const title = stripSource(raw);
      if (title && !title.toLowerCase().includes('rss') && title.length > 10) {
        titles.push(title);
        if (titles.length >= limit) break;
      }
    }
    return titles;
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(TICKER_FEEDS.map(f => fetchHeadlines(f, 4)));
  const headlines = results.flat().filter(Boolean);

  // Deduplicate roughly
  const seen = new Set<string>();
  const unique = headlines.filter(h => {
    const key = h.toLowerCase().slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return NextResponse.json({ headlines: unique.slice(0, 10) }, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=300' },
  });
}
