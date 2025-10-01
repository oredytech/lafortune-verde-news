import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Header
      home: "Accueil",
      categories: "Catégories",
      contacts: "Contacts",
      about: "À propos",
      search: "Rechercher",
      // Footer
      editorial_team: "Équipe Rédactionnelle",
      useful_links: "Liens Utiles",
      follow_us: "Suivez-nous",
      all_rights_reserved: "Tous droits réservés",
      // Article
      share: "Partager",
      comments: "Commentaires",
      leave_comment: "Laisser un commentaire",
      name: "Nom",
      email: "Email",
      comment: "Commentaire",
      submit: "Soumettre",
      // Categories
      view_more: "Voir plus",
      // Languages
      language: "Langue",
      french: "Français",
      english: "Anglais",
      swahili: "Swahili",
      spanish: "Espagnol",
    }
  },
  en: {
    translation: {
      home: "Home",
      categories: "Categories",
      contacts: "Contact",
      about: "About",
      search: "Search",
      editorial_team: "Editorial Team",
      useful_links: "Useful Links",
      follow_us: "Follow Us",
      all_rights_reserved: "All rights reserved",
      share: "Share",
      comments: "Comments",
      leave_comment: "Leave a Comment",
      name: "Name",
      email: "Email",
      comment: "Comment",
      submit: "Submit",
      view_more: "View More",
      language: "Language",
      french: "French",
      english: "English",
      swahili: "Swahili",
      spanish: "Spanish",
    }
  },
  sw: {
    translation: {
      home: "Nyumbani",
      categories: "Makundi",
      contacts: "Wasiliana",
      about: "Kuhusu",
      search: "Tafuta",
      editorial_team: "Timu ya Uhariri",
      useful_links: "Viungo Muhimu",
      follow_us: "Tufuate",
      all_rights_reserved: "Haki zote zimehifadhiwa",
      share: "Shiriki",
      comments: "Maoni",
      leave_comment: "Acha Maoni",
      name: "Jina",
      email: "Barua pepe",
      comment: "Maoni",
      submit: "Wasilisha",
      view_more: "Tazama Zaidi",
      language: "Lugha",
      french: "Kifaransa",
      english: "Kiingereza",
      swahili: "Kiswahili",
      spanish: "Kihispania",
    }
  },
  es: {
    translation: {
      home: "Inicio",
      categories: "Categorías",
      contacts: "Contacto",
      about: "Acerca de",
      search: "Buscar",
      editorial_team: "Equipo Editorial",
      useful_links: "Enlaces Útiles",
      follow_us: "Síguenos",
      all_rights_reserved: "Todos los derechos reservados",
      share: "Compartir",
      comments: "Comentarios",
      leave_comment: "Dejar un Comentario",
      name: "Nombre",
      email: "Correo",
      comment: "Comentario",
      submit: "Enviar",
      view_more: "Ver Más",
      language: "Idioma",
      french: "Francés",
      english: "Inglés",
      swahili: "Suajili",
      spanish: "Español",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
