import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Post } from '@/types/wordpress';
import { fetchPostsByCategory, fetchCategories } from '@/lib/wordpress-api';
import { Loader2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 12;

  const getCategoryId = (slug: string): number | null => {
    const categoryMap: { [key: string]: number } = {
      'actualites': 1,
      'analyses': 2,
      'opinions': 3,
      'reportages': 4
    };
    return categoryMap[slug] || null;
  };

  const getCategoryDisplayName = (slug: string): string => {
    const nameMap: { [key: string]: string } = {
      'actualites': 'Actualités',
      'analyses': 'Analyses',
      'opinions': 'Opinions',
      'reportages': 'Reportages'
    };
    return nameMap[slug] || slug;
  };

  useEffect(() => {
    const loadCategoryPosts = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        // Use category slug directly with the API
        const categoryPosts = await fetchPostsByCategory(category, currentPage, postsPerPage);
        setPosts(categoryPosts);
        setCategoryName(getCategoryDisplayName(category));
        // Estimez le nombre total de pages (dans un vrai projet, l'API devrait retourner cette info)
        setTotalPages(Math.ceil(categoryPosts.length >= postsPerPage ? currentPage + 2 : currentPage));
      } catch (error) {
        console.error('Erreur lors du chargement des articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryPosts();
  }, [category, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-news-primary" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground border-l-4 border-news-primary pl-4">
                {categoryName}
              </h1>
              <p className="text-muted-foreground mt-2">
                {posts.length} article{posts.length > 1 ? 's' : ''} trouvé{posts.length > 1 ? 's' : ''}
              </p>
            </div>

            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <ArticleCard key={post.id} post={post} variant="default" />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(currentPage - 1);
                              }}
                            />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(currentPage + 1);
                              }}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Aucun article trouvé dans cette catégorie.
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;