import { useState, useEffect } from 'react';
import { Post } from '@/types/wordpress';
import { fetchPosts, fetchPostsByCategory } from '@/lib/wordpress-api';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreakingNews } from '@/components/news/BreakingNews';
import { HeroSection } from '@/components/news/HeroSection';
import { NewsSection } from '@/components/news/NewsSection';
import { Sidebar } from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';

const NewsHome = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [analysesPosts, setAnalysesPosts] = useState<Post[]>([]);
  const [opinionsPosts, setOpinionsPosts] = useState<Post[]>([]);
  const [reportagesPosts, setReportagesPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Load all posts and category-specific posts in parallel
      const [posts, analyses, opinions, reportages] = await Promise.all([
        fetchPosts(1, 20),
        fetchPostsByCategory('analyses', 1, 8),
        fetchPostsByCategory('opinions', 1, 8),
        fetchPostsByCategory('reportages', 1, 8)
      ]);

      setAllPosts(posts);
      setAnalysesPosts(analyses);
      setOpinionsPosts(opinions);
      setReportagesPosts(reportages);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les articles. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-news-primary"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const breakingNewsPosts = allPosts.slice(0, 5);
  const heroPosts = allPosts.slice(0, 6);
  const latestPosts = allPosts.slice(6, 14);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breaking News */}
      <BreakingNews posts={breakingNewsPosts} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <HeroSection posts={heroPosts} />
            
            {/* Latest News */}
            <NewsSection 
              title="Actualités" 
              posts={latestPosts} 
              sectionId="actualites"
            />
            
            {/* Analyses Section */}
            {analysesPosts.length > 0 && (
              <NewsSection 
                title="Analyses" 
                posts={analysesPosts} 
                sectionId="analyses"
              />
            )}
            
            {/* Opinions Section */}
            {opinionsPosts.length > 0 && (
              <NewsSection 
                title="Opinions" 
                posts={opinionsPosts} 
                sectionId="opinions"
              />
            )}
            
            {/* Reportages Section */}
            {reportagesPosts.length > 0 && (
              <NewsSection 
                title="Reportages" 
                posts={reportagesPosts} 
                sectionId="reportages"
              />
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsHome;