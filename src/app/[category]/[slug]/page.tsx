import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS, getArticle, getArticlesByCategory } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';

export const revalidate = 300;

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const cat of CATEGORIES) {
    const articles = getArticlesByCategory(cat);
    for (const a of articles) {
      params.push({ category: cat.toLowerCase(), slug: a.slug });
    }
  }
  return params;
}

export default async function ArticlePage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const cat = CATEGORIES.find(c => c.toLowerCase() === category);
  if (!cat) notFound();

  const article = getArticle(cat, slug);
  if (!article) notFound();

  const color = CATEGORY_COLORS[cat];
  const label = CATEGORY_LABELS[cat];
  const date = new Date(article.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const related = getArticlesByCategory(cat, 4).filter(a => a.slug !== slug);
  const paragraphs = article.body.split('\n\n').filter(p => p.trim());

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-white transition-colors" style={{ color }}>{label}</Link>
        <span>/</span>
        <span className="text-white/20 truncate">{article.title}</span>
      </div>

      {/* Header */}
      <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ backgroundColor: color + '22', color }}>
        {label}
      </span>
      <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">{article.title}</h1>
      <p className="text-white/40 text-sm mb-6">{date}</p>

      {/* Hero image */}
      {article.image && (
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-8">
          <Image src={article.image} alt={article.title} fill className="object-cover" unoptimized />
        </div>
      )}

      {/* Ad slot */}
      <div className="w-full h-20 bg-[#111827] rounded-xl mb-8 flex items-center justify-center text-white/20 text-xs border border-white/5">
        Advertisement
      </div>

      {/* Body */}
      <article className="article-body mb-12">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      {/* Source */}
      {article.source_url && (
        <div className="border-t border-white/10 pt-4 mb-12">
          <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            Source →
          </a>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-4 pb-2 border-b border-white/10">More in {label}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.slice(0, 3).map(a => (
              <ArticleCard key={a.slug} article={a} size="medium" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
