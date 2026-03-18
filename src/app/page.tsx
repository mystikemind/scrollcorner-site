import ArticleCard from '@/components/ArticleCard';
import CategorySection from '@/components/CategorySection';
import { CATEGORIES, getAllArticles, getArticlesByCategory } from '@/lib/articles';

export const revalidate = 300;

export default function HomePage() {
  const allArticles = getAllArticles();
  const hero = allArticles[0];
  const topStories = allArticles.slice(1, 5);

  return (
    <>
      {hero && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="md:col-span-2">
            <ArticleCard article={hero} size="hero" />
          </div>
          <div className="flex flex-col bg-[#111827] rounded-xl p-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-2 pb-2 border-b border-white/10">Top Stories</h2>
            {topStories.map(a => (
              <ArticleCard key={a.slug} article={a} size="small" />
            ))}
          </div>
        </section>
      )}

      <div className="w-full h-24 bg-[#111827] rounded-xl mb-10 flex items-center justify-center text-white/20 text-xs border border-white/5">
        Advertisement
      </div>

      {CATEGORIES.map(cat => {
        const articles = getArticlesByCategory(cat, 5);
        return <CategorySection key={cat} category={cat} articles={articles} />;
      })}
    </>
  );
}
