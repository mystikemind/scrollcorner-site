import fs from 'fs';
import path from 'path';

export interface Article {
  slug: string;
  title: string;
  body: string;
  category: string;
  image: string;
  date: string;
  tags: string[];
  source_url: string;
  discover: boolean;
}

const CONTENT_DIR = path.join(process.cwd(), 'content');

export const CATEGORIES = [
  'World-News',
  'Technology',
  'Finance',
  'Science',
  'Entertainment',
  'Sports',
];

export const CATEGORY_LABELS: Record<string, string> = {
  'World-News': 'World News',
  'Technology': 'Technology',
  'Finance': 'Finance',
  'Science': 'Science',
  'Entertainment': 'Entertainment',
  'Sports': 'Sports',
};

export const CATEGORY_COLORS: Record<string, string> = {
  'World-News': '#e63946',
  'Technology': '#4361ee',
  'Finance': '#2a9d8f',
  'Science': '#06d6a0',
  'Entertainment': '#f4a261',
  'Sports': '#e76f51',
};

export function getArticlesByCategory(category: string, limit?: number): Article[] {
  const dir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();
  const limited = limit ? files.slice(0, limit) : files;
  return limited.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    return JSON.parse(raw) as Article;
  });
}

export function getAllArticles(limit?: number): Article[] {
  const all: Article[] = [];
  for (const cat of CATEGORIES) {
    all.push(...getArticlesByCategory(cat));
  }
  all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return limit ? all.slice(0, limit) : all;
}

export function getArticle(category: string, slug: string): Article | null {
  const file = path.join(CONTENT_DIR, category, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as Article;
}

export function getDiscoverArticles(limit = 6): Article[] {
  return getAllArticles().filter(a => a.discover).slice(0, limit);
}
