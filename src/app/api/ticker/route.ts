import { NextResponse } from 'next/server';

const TICKER_FEEDS = [
  'https://feeds.bbci.co.uk/news/world/rss.xml',
  'https://www.aljazeera.com/xml/rss/all.xml',
  'https://rss.dw.com/rdf/rss-en-world',
];

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

// Known source suffixes to strip
const SOURCE_SUFFIXES = [
  /\s[-–—|]\s*(BBC|Al Jazeera|Deutsche Welle|DW|Reuters|AP|AFP|Guardian|CNN|NBC|CBS|ABC|Fox News|Sky News|Euronews).*/i,
  /\s[-–—]\s+[A-Z][^-–—]{2,35}$/,
];

function cleanTitle(raw: string): string {
  let title = decodeEntities(raw).trim();
  for (const pattern of SOURCE_SUFFIXES) {
    title = title.replace(pattern, '').trim();
  }
  return title;
}

// Channel title keywords — skip any title that looks like a feed name
const FEED_TITLE_PATTERNS = [
  /breaking news/i, /world news/i, /rss/i, /al jazeera/i, /bbc news/i,
  /deutsche welle/i, /^dw\b/i,
];

async function fetchHeadlines(feedUrl: string, limit = 4): Promise<string[]> {
  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'ScrollCorner/1.0' },
      next: { revalidate: 3600 },
    });
    const text = await res.text();
    const titles: string[] = [];
    const matches = [...text.matchAll(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>|<title>([\s\S]*?)<\/title>/g)];

    for (let i = 0; i < matches.length; i++) {
      const raw = (matches[i][1] || matches[i][2] || '').trim();
      const title = cleanTitle(raw);
      if (
        title.length > 15 &&
        !FEED_TITLE_PATTERNS.some(p => p.test(title))
      ) {
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
