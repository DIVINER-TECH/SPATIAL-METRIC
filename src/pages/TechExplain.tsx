import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { useHybridArticles } from '@/hooks/useHybridArticles';
import { Cpu } from 'lucide-react';

const TechExplain = () => {
  const { articles } = useHybridArticles('tech-explain');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHero
          title={<>Tech <span className="text-primary">Explain</span></>}
          description="Technical specifications & innovation deep dives"
          icon={Cpu}
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TechExplain;
