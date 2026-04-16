import ArticleCard from '@/components/ArticleCard';
import CategorySection from '@/components/CategorySection';
import { CATEGORIES, getArticlesByCategory } from '@/lib/articles';

export default function HomePage() {
  // Hero: latest article from World-News
  const worldNews = getArticlesByCategory('World-News', 5);
  const hero = worldNews[0];

  // Top Stories: one latest article per category (excluding World-News), in nav order
  const topStories = CATEGORIES.filter(cat => cat !== 'World-News').map(cat => {
    return getArticlesByCategory(cat, 1)[0] || null;
  }).filter(Boolean);

  if (!hero) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-white/20 text-4xl mb-4">📰</p>
        <p className="text-white/40">Articles loading... check back in a few minutes.</p>
      </div>
    );
  }

  return (
    <>
      {/* ── HERO + TOP STORIES ── */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <div className="lg:col-span-2">
          <ArticleCard article={hero} size="hero" />
        </div>
        <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-4 flex flex-col">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 pb-2 border-b border-white/5">Top Stories</p>
          {topStories.map(a => (
            <ArticleCard key={a!.slug} article={a!} size="small" />
          ))}
        </div>
      </section>

      {/* ── AD SLOT ── */}
      <div className="w-full h-20 bg-[#0f1623] rounded-xl mb-10 flex items-center justify-center text-white/15 text-xs border border-white/5 tracking-widest uppercase">
        Advertisement
      </div>

      {/* ── CATEGORY SECTIONS ── */}
      {CATEGORIES.map(cat => {
        const articles = getArticlesByCategory(cat, 5);
        return <CategorySection key={cat} category={cat} articles={articles} />;
      })}
    </>
  );
}
