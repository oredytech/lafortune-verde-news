import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import logoImage from '@/assets/logo-large.jpg';
import { Users, Target, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="bg-card rounded-lg shadow-sm border border-border p-8">
              <header className="text-center mb-8">
                <img 
                  src={logoImage} 
                  alt="LA FORTUNE RDC" 
                  className="h-20 w-auto mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-foreground mb-2">À propos de LA FORTUNE RDC</h1>
                <p className="text-lg text-news-primary font-medium italic">
                  "Écrire l'histoire agricole et environnementale"
                </p>
              </header>

              <div className="prose prose-lg max-w-none text-foreground">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-news-primary mr-2" />
                    <h2 className="text-2xl font-bold">Notre Mission</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    La Fortune RDC est un média d'information numérique, indépendant et couvrant de manière générale 
                    toute l'actualité de la République Démocratique du Congo (RDC).
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Nous sommes un média pour la promotion de l'agriculture, l'environnement et l'entrepreneuriat congolais.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Avec comme devise <strong>"Écrire l'histoire agricole et environnementale"</strong>, 
                    lafortunerdc.net se veut leader dans la valorisation de la production agricole de la RDC.
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-news-primary mr-2" />
                    <h2 className="text-2xl font-bold">Notre Équipe</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-bold text-news-primary">Direction</h3>
                      <p><strong>Magloire TSONGO</strong><br />Directeur et Fondateur</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-bold text-news-primary">Rédaction</h3>
                      <p><strong>Roger Kambale</strong><br />Rédacteur en chef</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-bold text-news-primary">Marketing</h3>
                      <p><strong>Espérance T</strong><br />Service Marketing et Commercial</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-news-primary mb-3">Équipe Rédactionnelle</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <p>• Kaleru Kakule</p>
                      <p>• Yannick Warangisi</p>
                      <p>• Katehero Bienvenue</p>
                      <p>• Erick Randa</p>
                      <p>• Tresor Wayitsomaya</p>
                    </div>
                  </div>
                </div>

                <div className="bg-news-primary/10 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Award className="h-6 w-6 text-news-primary mr-2" />
                    <h3 className="text-xl font-bold">Nos Valeurs</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>Indépendance</strong> - Information libre et objective</li>
                    <li>• <strong>Agriculture</strong> - Promotion du secteur agricole congolais</li>
                    <li>• <strong>Environnement</strong> - Protection et valorisation de notre écosystème</li>
                    <li>• <strong>Entrepreneuriat</strong> - Soutien aux initiatives locales</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;