import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { NewsCard } from '@/components/news/NewsCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { useArticles } from '@/hooks/useArticles';
import { useNewsItems } from '@/hooks/useNewsItems';
import { Zap } from 'lucide-react';

const SpatialUpdates = () => {
  const { articles } = useArticles('spatial-updates');
  const { data: newsItems } = useNewsItems(24);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title={<>Spatial <span className="text-primary">Updates</span></>}
          description="Daily news, product launches, and industry updates"
          icon={Zap}
          action={<LiveIndicator label="Daily" />}
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsItems && newsItems.length > 0 ? (
                newsItems.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))
              ) : (
                articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SpatialUpdates;
