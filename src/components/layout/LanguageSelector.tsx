import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const languages = [
  { code: 'fr', name: 'french', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'en', name: 'english', flag: '🇬🇧', nativeName: 'English' },
  { code: 'sw', name: 'swahili', flag: '🇹🇿', nativeName: 'Kiswahili' },
  { code: 'es', name: 'spanish', flag: '🇪🇸', nativeName: 'Español' },
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-foreground hover:text-news-primary">
          <Globe className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('language')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={i18n.language === lang.code ? 'default' : 'outline'}
              className="justify-start text-left h-auto py-3"
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="text-2xl mr-3">{lang.flag}</span>
              <div>
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-muted-foreground">{t(lang.name)}</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
