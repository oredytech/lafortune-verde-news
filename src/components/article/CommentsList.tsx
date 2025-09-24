import { useState, useEffect } from 'react';
import { Comment } from '@/types/wordpress';
import { fetchComments, formatDate } from '@/lib/wordpress-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CommentsListProps {
  postId: number;
  refreshTrigger?: number;
}

export const CommentsList = ({ postId, refreshTrigger }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [postId, refreshTrigger]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-news-primary">
            Commentaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-news-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (comments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-news-primary">
            Commentaires ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-news-primary">
          Commentaires ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={comment.author_avatar_urls?.['48'] || comment.author_avatar_urls?.['96']} 
                  alt={comment.author_name}
                />
                <AvatarFallback>
                  {comment.author_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    {comment.author_name}
                  </h4>
                  <time className="text-xs text-muted-foreground">
                    {formatDate(comment.date)}
                  </time>
                </div>
                <div 
                  className="text-sm text-foreground prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};