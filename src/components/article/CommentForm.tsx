import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { submitComment } from '@/lib/wordpress-api';
import { useTranslation } from 'react-i18next';

interface CommentFormProps {
  postId: number;
  onCommentSubmitted?: () => void;
}

export const CommentForm = ({ postId, onCommentSubmitted }: CommentFormProps) => {
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author_name || !formData.author_email || !formData.content) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitComment(postId, formData.author_name, formData.author_email, formData.content);
      
      toast({
        title: "Commentaire envoyé",
        description: "Votre commentaire a été envoyé avec succès et sera publié après modération.",
      });
      
      setFormData({
        author_name: '',
        author_email: '',
        content: ''
      });
      
      // Refresh comments if callback provided
      if (onCommentSubmitted) {
        onCommentSubmitted();
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le commentaire. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-news-primary">
          {t('leave_comment')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author_name">{t('name')} *</Label>
              <Input
                id="author_name"
                type="text"
                value={formData.author_name}
                onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                placeholder={t('name')}
                required
              />
            </div>
            <div>
              <Label htmlFor="author_email">{t('email')} *</Label>
              <Input
                id="author_email"
                type="email"
                value={formData.author_email}
                onChange={(e) => setFormData(prev => ({ ...prev, author_email: e.target.value }))}
                placeholder={t('email')}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="content">{t('comment')} *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder={t('comment')}
              rows={4}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-news-primary hover:bg-news-primary-dark"
          >
            {isSubmitting ? '...' : t('submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};