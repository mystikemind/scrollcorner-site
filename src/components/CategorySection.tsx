import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/constants';
import type { Article } from '@/lib/constants';

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
    <section className="mb-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
          <h2 className="text-sm font-black uppercase tracking-widest text-white">{label}</h2>
        </div>
        <Link
          href={`/${category.toLowerCase()}`}
          className="text-xs font-semibold uppercase tracking-widest text-white/30 hover:text-white transition-colors flex items-center gap-1"
        >
          See all <span className="text-base leading-none">›</span>
        </Link>
      </div>

      {/* Grid: 1 featured large + 4 medium */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5">
          <ArticleCard article={featured} size="large" />
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-4">
          {rest.slice(0, 4).map(a => (
            <ArticleCard key={a.slug} article={a} size="medium" />
          ))}
        </div>
      </div>
    </section>
  );
}
