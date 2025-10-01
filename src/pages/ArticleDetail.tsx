import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Post } from '@/types/wordpress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { SocialShare } from '@/components/article/SocialShare';
import { CommentForm } from '@/components/article/CommentForm';
import { CommentsList } from '@/components/article/CommentsList';
import { TranslatedArticleContent } from '@/components/article/TranslatedArticleContent';
import { formatDate, getFeaturedImageUrl } from '@/lib/wordpress-api';
import { useToast } from '@/hooks/use-toast';
import { decodeHtmlEntities } from '@/lib/utils';

const ArticleDetail = () => {
  const { year, month, day, slug } = useParams<{ year: string; month: string; day: string; slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentsRefreshTrigger, setCommentsRefreshTrigger] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://lafortunerdc.net/wp-json/wp/v2/posts?slug=${slug}&_embed`);
      const posts = await response.json();
      
      if (posts.length === 0) {
        navigate('/404');
        return;
      }
      
      setPost(posts[0]);
    } catch (error) {
      console.error('Error loading post:', error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger l'article. Veuillez réessayer.",
        variant: "destructive",
      });
      navigate('/');
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

  if (!post) {
    return null;
  }

  const featuredImageUrl = getFeaturedImageUrl(post, 'large');
  const postDate = new Date(post.date);
  const articleUrl = `https://lafortunerdc.net/${postDate.getFullYear()}/${String(postDate.getMonth() + 1).padStart(2, '0')}/${String(postDate.getDate()).padStart(2, '0')}/${post.slug}`;

  const handleCommentSubmitted = () => {
    setCommentsRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-6">
              <TranslatedArticleContent 
                title={post.title.rendered}
              />
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <time dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
            </header>

            {/* Featured Image */}
            {featuredImageUrl !== '/placeholder.svg' && (
              <div className="mb-6">
                <img
                  src={featuredImageUrl}
                  alt={decodeHtmlEntities(post.title.rendered)}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <TranslatedArticleContent 
              content={post.content.rendered}
            />

            {/* Social Share */}
            <SocialShare 
              title={decodeHtmlEntities(post.title.rendered)}
              url={articleUrl}
            />

            {/* Comments List */}
            <CommentsList 
              postId={post.id} 
              refreshTrigger={commentsRefreshTrigger}
            />

            {/* Comment Form */}
            <CommentForm 
              postId={post.id} 
              onCommentSubmitted={handleCommentSubmitted}
            />
          </article>
          
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

export default ArticleDetail;