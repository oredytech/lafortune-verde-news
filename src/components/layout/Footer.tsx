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
              <a href="#" className="text-gray-300 hover:text-news-accent transition-colors">
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
                <a href="/actualites" className="text-gray-300 hover:text-white transition-colors">
                  Actualités
                </a>
              </li>
              <li>
                <a href="/analyses" className="text-gray-300 hover:text-white transition-colors">
                  Analyses
                </a>
              </li>
              <li>
                <a href="/opinions" className="text-gray-300 hover:text-white transition-colors">
                  Opinions
                </a>
              </li>
              <li>
                <a href="/reportages" className="text-gray-300 hover:text-white transition-colors">
                  Reportages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-news-accent mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Kinshasa, RDC</li>
              <li>contact@lafortunerdc.net</li>
              <li>+243 XX XXX XXXX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 LA FORTUNE RDC | Conçu par Oredy TECHNOLOGIES</p>
        </div>
      </div>
    </footer>
  );
};