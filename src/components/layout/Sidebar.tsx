import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/types/wordpress';
import { fetchCategories } from '@/lib/wordpress-api';

export const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data.filter(cat => cat.count > 0).slice(0, 15));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <aside className="space-y-6">
      {/* Search Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-news-primary">
            Recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="search"
              placeholder="Rechercher des articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm" className="bg-news-primary hover:bg-news-primary-dark">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-news-primary">
            Catégories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between py-1">
                <a 
                  href={`/category/${category.slug}`}
                  className="text-sm text-foreground hover:text-news-primary transition-colors flex-1"
                >
                  {category.name}
                </a>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Latest Comments Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-news-primary">
            Derniers commentaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Jean Mukendi</p>
              <p className="line-clamp-2">
                Très bon article sur la situation économique...
              </p>
              <time className="text-xs">il y a 2 heures</time>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Marie Kabila</p>
              <p className="line-clamp-2">
                J'espère que les autorités vont prendre...
              </p>
              <time className="text-xs">il y a 5 heures</time>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Papa Wemba</p>
              <p className="line-clamp-2">
                Il faut que le gouvernement agisse rapidement...
              </p>
              <time className="text-xs">il y a 1 jour</time>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tags Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-news-primary">
            Mots-clés populaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Politique', 'Économie', 'Société', 'Kinshasa', 'RDC', 'Gouvernement', 'Élections', 'Santé'].map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs hover:bg-news-primary hover:text-white cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};