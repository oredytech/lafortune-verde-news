import { Share2, Facebook, Twitter, Linkedin, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SocialShareProps {
  title: string;
  url: string;
}

export const SocialShare = ({ title, url }: SocialShareProps) => {
  const { toast } = useToast();

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Lien copié",
        description: "Le lien de l'article a été copié dans le presse-papiers.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-t border-border pt-6 mb-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Share2 className="h-5 w-5" />
          <span>Partager cet article :</span>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(shareUrls.facebook, '_blank')}
            className="flex items-center gap-2"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(shareUrls.twitter, '_blank')}
            className="flex items-center gap-2"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(shareUrls.linkedin, '_blank')}
            className="flex items-center gap-2"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Link className="h-4 w-4" />
            Copier
          </Button>
        </div>
      </div>
    </div>
  );
};