export const Footer = () => {
  return (
    <footer className="bg-news-secondary text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-news-accent mb-4">LA FORTUNE RDC</h3>
            <p className="text-gray-300 mb-4">
              La différence de l'info! Votre source d'information fiable et indépendante 
              sur l'actualité de la République Démocratique du Congo.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1EHKPrwisP/" className="text-gray-300 hover:text-news-accent transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-news-accent transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-news-accent transition-colors">
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-news-accent mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-gray-300 hover:text-white transition-colors">
                  Contacts
                </a>
              </li>
              <li>
                <a href="/recherche" className="text-gray-300 hover:text-white transition-colors">
                  Recherche
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-news-accent mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Nord-Kivu, Goma, Com. Karisimbi, Q. Virunga, Av. Muteberwa, N°112</li>
              <li>lafortunerdc3@gmail.com</li>
              <li>+243 974 980 040</li>
              <li>+243 829 412 747</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 LA FORTUNE RDC | Fièrement conçu par <a href="https://oredytech.com" target="_blank" rel="noopener noreferrer" className="text-news-accent hover:text-white transition-colors">Oredy TECHNOLOGIES</a></p>
        </div>
      </div>
    </footer>
  );
};
