import { Post } from '@/types/wordpress';
import { ArticleCard } from './ArticleCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface NewsSectionProps {
  title: string;
  posts: Post[];
  sectionId: string;
  showViewMore?: boolean;
}

export const NewsSection = ({ title, posts, sectionId, showViewMore = true }: NewsSectionProps) => {
  if (posts.length === 0) return null;

  return (
    <section className="mb-12" id={sectionId}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground border-l-4 border-news-primary pl-4">
          {title}
        </h2>
        {showViewMore && (
          <Button 
            variant="outline" 
            className="text-news-primary border-news-primary hover:bg-news-primary hover:text-white"
            onClick={() => window.location.href = `/category/${sectionId}`}
          >
            Voir plus
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post, index) => (
          <ArticleCard 
            key={post.id} 
            post={post} 
            variant={index === 0 && posts.length > 3 ? 'large' : 'default'}
          />
        ))}
      </div>
    </section>
  );
};