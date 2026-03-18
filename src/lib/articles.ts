import fs from 'fs';
import path from 'path';
import type { Article } from './constants';
export { CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS, type Article } from './constants';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const CATEGORIES_LIST = ['World-News', 'Technology', 'Finance', 'Science', 'Entertainment', 'Sports'];

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
  for (const cat of CATEGORIES_LIST) {
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
