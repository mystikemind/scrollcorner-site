import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { Article, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/articles';

interface Props {
  category: string;
  articles: Article[];
}

export default function CategorySection({ category, articles }: Props) {
  const color = CATEGORY_COLORS[category] || '#e63946';
  const label = CATEGORY_LABELS[category] || category;
  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full" style={{ backgroundColor: color }} />
          <h2 className="text-sm font-black uppercase tracking-widest text-white">{label}</h2>
        </div>
        <Link href={`/${category.toLowerCase()}`} className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest">
          More →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ArticleCard article={featured} size="large" />
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.slice(0, 4).map(a => (
            <ArticleCard key={a.slug} article={a} size="medium" />
          ))}
        </div>
      </div>
    </section>
  );
}
