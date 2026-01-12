import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: 'Cifras Completas',
      description: 'Letras com acordes, modulação e diagramas visuais.',
      icon: '📚',
    },
    {
      title: 'Ferramentas',
      description: 'Metrônomo, afinador e piano para seus estudos.',
      icon: '🎸',
    },
    {
      title: 'Repertório Variado',
      description: 'Do sertanejo ao rock, músicas para todos os gostos.',
      icon: '🎵',
    },
    {
      title: '100% Gratuito',
      description: 'Acesso livre a todo o conteúdo educacional.',
      icon: '💜',
    },
  ];

  const quickLinks = [
    { path: '/cifras', label: 'Ver Cifras', icon: '📚', color: 'bg-blue-500 hover:bg-blue-600' },
    { path: '/area-aluno', label: 'Ferramentas', icon: '🎓', color: 'bg-purple-500 hover:bg-purple-600' },
    { path: '/cursos', label: 'Cursos', icon: '🎯', color: 'bg-green-500 hover:bg-green-600' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 pt-20">
        <div className="container-custom text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            🎸 Tocando <span className="text-yellow-300">Pra Valer</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Aprenda a tocar violão e guitarra de forma prática e divertida.
            Cifras, ferramentas e muito mais!
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${link.color} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce text-white/70">
            <span className="text-3xl">↓</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-4">
            Por que escolher o <span className="text-blue-500">Tocando Pra Valer</span>?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Tudo o que você precisa para aprender música em um só lugar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-5xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-12">
            Ferramentas <span className="text-purple-500">para Músicos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/area-aluno"
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎵</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Metrônomo</h3>
              <p className="text-slate-600 dark:text-slate-400">Mantenha o ritmo perfeito nos seus estudos.</p>
            </Link>
            <Link
              to="/area-aluno"
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎸</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Afinador</h3>
              <p className="text-slate-600 dark:text-slate-400">Afine seu instrumento com precisão.</p>
            </Link>
            <Link
              to="/area-aluno"
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🎹</div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Piano</h3>
              <p className="text-slate-600 dark:text-slate-400">Confira notas e acordes no piano virtual.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para começar sua jornada musical?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Acesse nossas cifras e ferramentas gratuitamente!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cifras"
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
            >
              Explorar Cifras
            </Link>
            <Link
              to="/contribuinte"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Apoiar o Projeto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
