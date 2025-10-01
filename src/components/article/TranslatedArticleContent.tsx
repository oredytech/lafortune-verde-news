import { useArticleTranslation } from '@/hooks/useArticleTranslation';
import { decodeHtmlEntities } from '@/lib/utils';

interface TranslatedArticleContentProps {
  title?: string;
  content?: string;
}

export const TranslatedArticleContent = ({ title, content }: TranslatedArticleContentProps) => {
  const { translatedText: translatedTitle } = useArticleTranslation(title ? decodeHtmlEntities(title) : '');
  const { translatedText: translatedContent } = useArticleTranslation(content || '');

  return (
    <>
      {title && (
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {translatedTitle}
        </h1>
      )}
      {content && (
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: translatedContent }}
        />
      )}
    </>
  );
};
