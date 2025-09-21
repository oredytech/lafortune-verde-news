import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { ArticleCard } from '@/components/news/ArticleCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/wordpress';
import { useToast } from '@/hooks/use-toast';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const response = await fetch(
        `https://lafortunerdc.net/wp-json/wp/v2/posts?search=${encodeURIComponent(searchQuery)}&_embed`
      );
      const posts = await response.json();
      setSearchResults(posts);
    } catch (error) {
      console.error('Error searching posts:', error);
      toast({
        title: "Erreur de recherche",
        description: "Impossible d'effectuer la recherche. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-6">Rechercher des articles</h1>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                <Input
                  type="search"
                  placeholder="Entrez vos mots-clés..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-news-primary hover:bg-news-primary-dark"
                  disabled={loading}
                >
                  <Search className="h-4 w-4 mr-2" />
                  {loading ? 'Recherche...' : 'Rechercher'}
                </Button>
              </form>
            </div>

            {/* Search Results */}
            {hasSearched && (
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {searchResults.length > 0 
                    ? `${searchResults.length} résultat(s) trouvé(s) pour "${searchQuery}"`
                    : `Aucun résultat trouvé pour "${searchQuery}"`
                  }
                </h2>
                
                {searchResults.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.map((post) => (
                      <ArticleCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {!hasSearched && (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Recherchez dans nos articles
                </h2>
                <p className="text-muted-foreground">
                  Utilisez le formulaire ci-dessus pour trouver des articles par mots-clés
                </p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Sidebar />
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchPage;