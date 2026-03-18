import Link from 'next/link';
import Image from 'next/image';
import { Article, CATEGORY_COLORS, CATEGORY_LABELS } from '@/lib/articles';

interface Props {
  article: Article;
  size?: 'hero' | 'large' | 'medium' | 'small';
}

export default function ArticleCard({ article, size = 'medium' }: Props) {
  const color = CATEGORY_COLORS[article.category] || '#e63946';
  const label = CATEGORY_LABELS[article.category] || article.category;
  const href = `/${article.category.toLowerCase()}/${article.slug}`;
  const excerpt = article.body.split('\n\n')[0].slice(0, 160) + '...';
  const date = new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (size === 'hero') {
    return (
      <Link href={href} className="group block relative overflow-hidden rounded-xl h-[480px] md:h-[540px]">
        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-3" style={{ backgroundColor: color, color: '#fff' }}>{label}</span>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 group-hover:text-white/80 transition-colors">{article.title}</h1>
          <p className="text-white/60 text-sm hidden md:block">{excerpt}</p>
          <p className="text-white/40 text-xs mt-2">{date}</p>
        </div>
      </Link>
    );
  }

  if (size === 'large') {
    return (
      <Link href={href} className="group block bg-[#111827] rounded-xl overflow-hidden hover:bg-[#1a2235] transition-colors">
        <div className="relative h-48 overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
        </div>
        <div className="p-4">
          <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2" style={{ backgroundColor: color + '22', color }}>{label}</span>
          <h2 className="text-base font-bold text-white leading-snug mb-1 group-hover:text-white/80">{article.title}</h2>
          <p className="text-white/50 text-xs">{excerpt}</p>
          <p className="text-white/30 text-xs mt-2">{date}</p>
        </div>
      </Link>
    );
  }

  if (size === 'small') {
    return (
      <Link href={href} className="group flex gap-3 items-start py-3 border-b border-white/5 last:border-0 hover:opacity-80 transition-opacity">
        <div className="relative w-20 h-14 flex-shrink-0 rounded overflow-hidden">
          <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color }}>{label}</span>
          <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-white/80">{article.title}</h3>
          <p className="text-white/30 text-xs mt-0.5">{date}</p>
        </div>
      </Link>
    );
  }

  // medium (default)
  return (
    <Link href={href} className="group block bg-[#111827] rounded-xl overflow-hidden hover:bg-[#1a2235] transition-colors h-full">
      <div className="relative h-40 overflow-hidden">
        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
      </div>
      <div className="p-4">
        <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded mb-2" style={{ backgroundColor: color + '22', color }}>{label}</span>
        <h2 className="text-sm font-bold text-white leading-snug group-hover:text-white/80">{article.title}</h2>
        <p className="text-white/30 text-xs mt-2">{date}</p>
      </div>
    </Link>
  );
}
