import { useState, useEffect } from 'react';
import { Search, Menu, X, Facebook, Twitter, Youtube, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logoImage from '@/assets/LOGO LARGE 2.jpg';
import { fetchCategories } from '@/lib/wordpress-api';
import { Category } from '@/types/wordpress';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    loadCategories();

    // Mettre à jour la date
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate = now.toLocaleDateString('fr-FR', options);
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      setCurrentDate(capitalizedDate);
    };

    updateDate();
    // Mettre à jour la date chaque minute
    const dateInterval = setInterval(updateDate, 60000);

    return () => clearInterval(dateInterval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar with social icons */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {currentDate}
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-news-primary hover:text-news-primary-light">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-news-primary hover:text-news-primary-light">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-news-primary hover:text-news-primary-light">
              <Youtube className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src={logoImage} 
              alt="LA FORTUNE RDC" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-news-primary font-medium transition-colors">
              Accueil
            </a>
            
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-news-primary font-medium transition-colors">
                  Catégories
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <a 
                      href={`/category/${category.slug}`}
                      className="cursor-pointer w-full"
                    >
                      {category.name}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="/contacts" className="text-foreground hover:text-news-primary font-medium transition-colors">
              Contacts
            </a>
            <a href="/a-propos" className="text-foreground hover:text-news-primary font-medium transition-colors">
              À propos
            </a>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center">
              <Button 
                size="sm" 
                className="bg-news-primary hover:bg-news-primary-dark"
                onClick={() => window.location.href = '/recherche'}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex items-center mb-4">
              <Button 
                size="sm" 
                className="bg-news-primary hover:bg-news-primary-dark w-full"
                onClick={() => window.location.href = '/recherche'}
              >
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
            <a href="/" className="block text-foreground hover:text-news-primary font-medium py-2">
              Accueil
            </a>
            
            {/* Mobile Categories */}
            <div className="border-t border-border pt-2 mt-2">
              <div className="text-sm font-semibold text-muted-foreground mb-2">Catégories</div>
              <div className="max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <a 
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block text-foreground hover:text-news-primary font-medium py-2 pl-4"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="border-t border-border pt-2 mt-2">
              <a href="/contacts" className="block text-foreground hover:text-news-primary font-medium py-2">
                Contacts
              </a>
              <a href="/a-propos" className="block text-foreground hover:text-news-primary font-medium py-2">
                À propos
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
