import { useState } from 'react';
import { Search, Menu, X, Facebook, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logoImage from '@/assets/logo-large.jpg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top bar with social icons */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Samedi 21 septembre 2025
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
            <a href="/actualites" className="text-foreground hover:text-news-primary font-medium transition-colors">
              Actualités
            </a>
            <a href="/analyses" className="text-foreground hover:text-news-primary font-medium transition-colors">
              Analyses
            </a>
            <a href="/opinions" className="text-foreground hover:text-news-primary font-medium transition-colors">
              Opinions
            </a>
            <a href="/reportages" className="text-foreground hover:text-news-primary font-medium transition-colors">
              Reportages
            </a>
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
              <Input 
                type="search" 
                placeholder="Rechercher..." 
                className="w-64"
              />
              <Button size="sm" className="ml-2 bg-news-primary hover:bg-news-primary-dark">
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
              <Input 
                type="search" 
                placeholder="Rechercher..." 
                className="flex-1 mr-2"
              />
              <Button size="sm" className="bg-news-primary hover:bg-news-primary-dark">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <a href="/" className="block text-foreground hover:text-news-primary font-medium py-2">
              Accueil
            </a>
            <a href="/actualites" className="block text-foreground hover:text-news-primary font-medium py-2">
              Actualités
            </a>
            <a href="/analyses" className="block text-foreground hover:text-news-primary font-medium py-2">
              Analyses
            </a>
            <a href="/opinions" className="block text-foreground hover:text-news-primary font-medium py-2">
              Opinions
            </a>
            <a href="/reportages" className="block text-foreground hover:text-news-primary font-medium py-2">
              Reportages
            </a>
            <a href="/contacts" className="block text-foreground hover:text-news-primary font-medium py-2">
              Contacts
            </a>
            <a href="/a-propos" className="block text-foreground hover:text-news-primary font-medium py-2">
              À propos
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};