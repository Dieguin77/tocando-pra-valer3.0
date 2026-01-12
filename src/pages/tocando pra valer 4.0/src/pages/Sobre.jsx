export default function Sobre() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900 animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 text-center">
          Sobre o <span className="text-blue-500">Tocando Pra Valer</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          Conheça nossa história e metodologia de ensino.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span>📖</span> Nossa História
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              O Tocando Pra Valer nasceu da paixão pela música e pelo desejo de tornar 
              o aprendizado do violão acessível a todos. Acreditamos que qualquer pessoa 
              pode aprender a tocar, independente da idade ou experiência prévia.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Nossa metodologia foi desenvolvida ao longo de anos de experiência, 
              combinando teoria musical com prática constante. O foco está sempre 
              em tocar músicas reais desde o primeiro dia.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Já ajudamos centenas de alunos a realizar o sonho de tocar violão, 
              e queremos ajudar você também!
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-500 mb-6 flex items-center gap-2">
              <span>🎯</span> Nossa Metodologia
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  🎯
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Foco na Prática</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Você aprende tocando, não apenas estudando teoria.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  🎵
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Músicas Reais</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Repertório com músicas que você conhece e gosta.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  📈
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Progressão Natural</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Evolução gradual, respeitando seu ritmo de aprendizado.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                  💪
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white">Suporte Constante</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Acompanhamento personalizado para tirar todas as dúvidas.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Números */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '100+', label: 'Cifras', icon: '📚' },
            { number: '3', label: 'Ferramentas', icon: '🛠️' },
            { number: '4', label: 'Cursos', icon: '🎓' },
            { number: '∞', label: 'Possibilidades', icon: '✨' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-md"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-500">{stat.number}</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
