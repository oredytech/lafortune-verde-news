import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TranslationContextType {
  translateText: (text: string, targetLang: string) => Promise<string>;
  translationCache: Map<string, string>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslationService = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationService must be used within TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [translationCache] = useState(new Map<string, string>());
  const { i18n } = useTranslation();

  const translateText = async (text: string, targetLang: string): Promise<string> => {
    if (!text || targetLang === 'fr') return text;

    const cacheKey = `${text}-${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    try {
      // Using MyMemory Translation API (free, no key required, 5000 words/day limit)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=fr|${targetLang}`
      );
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData) {
        const translated = data.responseData.translatedText;
        translationCache.set(cacheKey, translated);
        return translated;
      }
      
      return text;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  return (
    <TranslationContext.Provider value={{ translateText, translationCache }}>
      {children}
    </TranslationContext.Provider>
  );
};
