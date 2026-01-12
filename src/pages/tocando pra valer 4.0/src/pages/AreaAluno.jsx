import { useRef } from 'react';
import Metronome from '../components/Metronome';
import Tuner from '../components/Tuner';
import Piano from '../components/Piano';

export default function AreaAluno() {
  const metronomeRef = useRef(null);
  const tunerRef = useRef(null);
  const pianoRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tools = [
    { id: 'metronome', name: 'Metrônomo', icon: '🎵', ref: metronomeRef, description: 'Mantenha o ritmo perfeito' },
    { id: 'tuner', name: 'Afinador', icon: '🎸', ref: tunerRef, description: 'Afine seu instrumento' },
    { id: 'piano', name: 'Piano', icon: '🎹', ref: pianoRef, description: 'Confira notas e acordes' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
            🎓 Área do <span className="text-blue-500">Aluno</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Ferramentas essenciais para seus estudos musicais. Tudo o que você precisa em um só lugar.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => scrollToSection(tool.ref)}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-left border border-slate-100 dark:border-slate-700"
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
                {tool.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {tool.description}
              </p>
            </button>
          ))}
        </div>

        {/* Metrônomo */}
        <section ref={metronomeRef} className="mb-16 scroll-mt-24">
          <Metronome />
        </section>

        {/* Afinador */}
        <section ref={tunerRef} className="mb-16 scroll-mt-24">
          <Tuner />
        </section>

        {/* Piano */}
        <section ref={pianoRef} className="mb-16 scroll-mt-24">
          <Piano />
        </section>

        {/* Links úteis */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
            📌 Acesso Rápido
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/cifras"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-2xl">📚</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">Cifras</span>
            </a>
            <a
              href="/cursos"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-2xl">🎓</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">Cursos</span>
            </a>
            <a
              href="/sobre"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-2xl">ℹ️</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">Sobre</span>
            </a>
            <a
              href="/contato"
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
            >
              <span className="text-2xl">📞</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">Contato</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
