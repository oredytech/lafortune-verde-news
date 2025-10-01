import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslationService } from '@/contexts/TranslationContext';

export const useArticleTranslation = (originalText: string) => {
  const { i18n } = useTranslation();
  const { translateText } = useTranslationService();
  const [translatedText, setTranslatedText] = useState(originalText);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (i18n.language === 'fr' || !originalText) {
        setTranslatedText(originalText);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await translateText(originalText, i18n.language);
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedText(originalText);
      } finally {
        setIsTranslating(false);
      }
    };

    translate();
  }, [originalText, i18n.language, translateText]);

  return { translatedText, isTranslating };
};
