import Link from 'next/link';
import SafeImage from './SafeImage';
import { Article, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/constants';

export interface ArticleCardProps {
  article: Article;
  size?: 'hero' | 'large' | 'medium' | 'small';
}

export default function ArticleCard({ article, size = 'medium' }: ArticleCardProps) {
  const color = CATEGORY_COLORS[article.category] || '#e63946';
  const label = CATEGORY_LABELS[article.category] || article.category;
  const href = `/${article.category.toLowerCase()}/${article.slug}`;
  const excerpt = article.body.replace(/\n+/g, ' ').slice(0, 140) + '…';
  const date = new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (size === 'hero') {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-2xl bg-[#0f1623] card-hover">
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          <SafeImage src={article.image} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md" style={{ backgroundColor: color, color: '#fff' }}>{label}</span>
          </div>
          <h1 className="text-xl md:text-3xl font-black text-white leading-tight mb-2 group-hover:text-white/90 transition-colors line-clamp-3">{article.title}</h1>
          <p className="text-white/55 text-sm leading-relaxed line-clamp-2 hidden md:block">{excerpt}</p>
        </div>
      </Link>
    );
  }

  if (size === 'large') {
    return (
      <Link href={href} className="group flex flex-col bg-[#0f1623] rounded-xl overflow-hidden card-hover h-full border border-white/5 hover:border-white/10 transition-colors">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <SafeImage src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: color + '25', color }}>{label}</span>
          </div>
          <h2 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-white/80 line-clamp-3 flex-1">{article.title}</h2>
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{excerpt}</p>
        </div>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={href} className="group flex gap-3 items-start py-3 border-b border-white/5 last:border-0 hover:opacity-75 transition-opacity">
        <div className="relative flex-shrink-0 overflow-hidden rounded-lg" style={{ width: 72, height: 54 }}>
          <SafeImage src={article.image} alt={article.title} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>{label}</span>
          <h3 className="text-xs font-semibold text-white leading-snug line-clamp-2 mt-0.5 group-hover:text-white/75">{article.title}</h3>
        </div>
      </Link>
    );
  }

  // medium
  return (
    <Link href={href} className="group flex flex-col bg-[#0f1623] rounded-xl overflow-hidden card-hover h-full border border-white/5 hover:border-white/10 transition-colors">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <SafeImage src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: color + '25', color }}>{label}</span>
        </div>
        <h2 className="text-sm font-bold text-white leading-snug group-hover:text-white/80 line-clamp-2">{article.title}</h2>
      </div>
    </Link>
  );
}
