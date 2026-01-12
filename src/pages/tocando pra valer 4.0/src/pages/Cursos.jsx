import { Link } from 'react-router-dom';

export default function Cursos() {
  const cursos = [
    {
      id: 1,
      titulo: 'Violão do Zero',
      descricao: 'Aprenda os fundamentos do violão, acordes básicos, ritmos e suas primeiras músicas.',
      nivel: 'Iniciante',
      duracao: '8 semanas',
      aulas: 24,
      icon: '🎸',
    },
    {
      id: 2,
      titulo: 'Violão Intermediário',
      descricao: 'Aprofunde seus conhecimentos com pestanas, dedilhados e músicas mais complexas.',
      nivel: 'Intermediário',
      duracao: '12 semanas',
      aulas: 36,
      icon: '🎵',
    },
    {
      id: 3,
      titulo: 'Guitarra Rock',
      descricao: 'Técnicas de guitarra para rock, power chords, solos e efeitos.',
      nivel: 'Intermediário',
      duracao: '10 semanas',
      aulas: 30,
      icon: '🎸',
    },
    {
      id: 4,
      titulo: 'Fingerstyle',
      descricao: 'Domine a técnica de fingerstyle e toque melodia e acompanhamento ao mesmo tempo.',
      nivel: 'Avançado',
      duracao: '16 semanas',
      aulas: 48,
      icon: '✨',
    },
  ];

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'Iniciante':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'Intermediário':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'Avançado':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900 animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 text-center">
          🎓 Nossos <span className="text-blue-500">Cursos</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          Programas completos para você evoluir de forma estruturada no violão e na guitarra.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{curso.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      {curso.titulo}
                    </h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${getNivelColor(curso.nivel)}`}>
                      {curso.nivel}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{curso.descricao}</p>
              <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-6">
                <span className="flex items-center gap-1">
                  <span>⏱️</span> {curso.duracao}
                </span>
                <span className="flex items-center gap-1">
                  <span>📚</span> {curso.aulas} aulas
                </span>
              </div>
              <Link
                to="/contato"
                className="block w-full text-center py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Saber Mais
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Não sabe por onde começar?
          </h2>
          <p className="text-white/90 mb-6">
            Entre em contato e te ajudaremos a escolher o curso ideal para você!
          </p>
          <Link
            to="/contato"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
          >
            Fale Conosco
          </Link>
        </div>
      </div>
    </div>
  );
}
