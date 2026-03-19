import { notFound } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS, getArticlesByCategory } from '@/lib/articles';

export const revalidate = 300;

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ category: cat.toLowerCase() }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES.find(c => c.toLowerCase() === category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(cat);
  const color = CATEGORY_COLORS[cat];
  const label = CATEGORY_LABELS[cat];

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: color }} />
        <h1 className="text-3xl font-black text-white">{label}</h1>
      </div>
      {articles.length === 0 ? (
        <p className="text-white/40 text-center py-24">No articles yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map(a => (
            <ArticleCard key={a.slug} article={a} size="large" />
          ))}
        </div>
      )}
    </>
  );
}
