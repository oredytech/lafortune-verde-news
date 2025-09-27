import { useState, useEffect } from 'react';
import { Post } from '@/types/wordpress';
import { getFeaturedImageUrl, formatDate, getCategoryNames, getExcerpt } from '@/lib/wordpress-api';
import { generatePostUrl } from '@/lib/url-helpers';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { decodeHtmlEntities } from '@/lib/utils';

interface HeroSectionProps {
  posts: Post[];
}

export const HeroSection = ({ posts }: HeroSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (posts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % posts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [posts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (posts.length === 0) return null;

  const mainPost = posts[currentSlide];
  const sidebarPosts = posts.slice(0, 4).filter((_, index) => index !== currentSlide);

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured article */}
        <div className="lg:col-span-2">
          <div className="relative group overflow-hidden rounded-lg">
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <img
                src={getFeaturedImageUrl(mainPost, 'large')}
                alt={decodeHtmlEntities(mainPost.title.rendered)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Navigation arrows */}
              {posts.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {getCategoryNames(mainPost).length > 0 && (
                <Badge className="bg-news-primary text-white mb-3">
                  {getCategoryNames(mainPost)[0]}
                </Badge>
              )}
              <a href={generatePostUrl(mainPost)}>
                <h1 className="text-2xl lg:text-3xl font-bold mb-3 hover:text-news-accent transition-colors">
                  {decodeHtmlEntities(mainPost.title.rendered)}
                </h1>
              </a>
              <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                {getExcerpt(mainPost.excerpt.rendered || mainPost.content.rendered, 30)}
              </p>
              <time className="text-gray-300 text-sm">
                {formatDate(mainPost.date)}
              </time>
            </div>

            {/* Slide indicators */}
            {posts.length > 1 && (
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar with other featured articles */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground border-l-4 border-news-primary pl-4">
            À la Une
          </h3>
          {sidebarPosts.map((post) => (
            <article key={post.id} className="group">
              <a href={generatePostUrl(post)} className="flex space-x-3">
                <div className="relative flex-shrink-0 w-20 h-16 overflow-hidden rounded">
                  <img
                    src={getFeaturedImageUrl(post, 'thumbnail')}
                    alt={decodeHtmlEntities(post.title.rendered)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-card-foreground group-hover:text-news-primary transition-colors line-clamp-2 mb-1">
                    {decodeHtmlEntities(post.title.rendered)}
                  </h4>
                  <time className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};