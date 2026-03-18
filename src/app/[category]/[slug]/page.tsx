import { notFound } from 'next/navigation';
import SafeImage from '@/components/SafeImage';
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
  const related = getArticlesByCategory(cat, 4).filter(a => a.slug !== slug).slice(0, 3);
  const paragraphs = article.body.split('\n\n').filter(p => p.trim());

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-white/30 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${category}`} className="hover:text-white transition-colors font-semibold" style={{ color }}>{label}</Link>
      </nav>

      {/* Category + date */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg" style={{ backgroundColor: color, color: '#fff' }}>{label}</span>
        <span className="text-white/30 text-xs">{date}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-6">{article.title}</h1>

      {/* Hero image */}
      {article.image && (
        <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: '16/9' }}>
          <SafeImage src={article.image} alt={article.title} fill className="object-cover" />
        </div>
      )}

      {/* Ad slot */}
      <div className="w-full h-16 bg-[#0f1623] rounded-xl mb-8 flex items-center justify-center text-white/15 text-xs border border-white/5 tracking-widest uppercase">
        Advertisement
      </div>

      {/* Body */}
      <article className="article-body mb-10">
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </article>

      {/* Source */}
      {article.source_url && (
        <div className="border-t border-white/5 pt-4 mb-12">
          <a href={article.source_url} target="_blank" rel="noopener noreferrer"
            className="text-xs text-white/25 hover:text-white/50 transition-colors">
            Source article →
          </a>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full" style={{ backgroundColor: color }} />
            <h2 className="text-xs font-black uppercase tracking-widest text-white/50">More in {label}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map(a => <ArticleCard key={a.slug} article={a} size="medium" />)}
          </div>
        </div>
      )}
    </div>
  );
}
