import { Post } from '@/types/wordpress';
import { getFeaturedImageUrl, formatDate, getCategoryNames, getExcerpt } from '@/lib/wordpress-api';
import { Badge } from '@/components/ui/badge';

interface ArticleCardProps {
  post: Post;
  variant?: 'default' | 'large' | 'small';
}

export const ArticleCard = ({ post, variant = 'default' }: ArticleCardProps) => {
  const imageUrl = getFeaturedImageUrl(post, variant === 'large' ? 'large' : 'medium');
  const categories = getCategoryNames(post);
  const excerpt = getExcerpt(post.excerpt.rendered || post.content.rendered, 25);

  const cardClasses = {
    default: 'bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group',
    large: 'bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group',
    small: 'bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group'
  };

  const imageClasses = {
    default: 'w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300',
    large: 'w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300',
    small: 'w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300'
  };

  return (
    <article className={cardClasses[variant]}>
      <a href={post.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={post.title.rendered}
            className={imageClasses[variant]}
            loading="lazy"
          />
          {categories.length > 0 && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-category-bg text-category-text hover:bg-news-primary-dark">
                {categories[0]}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className={`font-bold text-card-foreground group-hover:text-news-primary transition-colors line-clamp-2 ${
            variant === 'large' ? 'text-xl mb-3' : variant === 'small' ? 'text-sm mb-2' : 'text-lg mb-2'
          }`}>
            {post.title.rendered}
          </h3>
          
          {variant !== 'small' && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
              {excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <time>{formatDate(post.date)}</time>
            {categories.length > 1 && (
              <div className="flex space-x-1">
                {categories.slice(1, 3).map((category, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </a>
    </article>
  );
};