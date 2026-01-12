import { Link } from 'react-router-dom';
import { musicas } from '../data/musicas';

export default function Cifras() {
  const categorias = [...new Set(musicas.map(m => m.categoria))];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-900 animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2 text-center">
          📚 <span className="hidden md:inline">Repertório de</span>{' '}
          <span className="text-blue-500">Cifras</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-8 max-w-2xl mx-auto">
          Escolha uma música e aprenda a tocar com cifras, modulação e diagramas de acordes.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium">
            Todas
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de músicas */}
        {categorias.map((categoria) => (
          <div key={categoria} className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b-2 border-blue-500 pb-2 inline-block">
              {categoria}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {musicas
                .filter((m) => m.categoria === categoria)
                .map((musica) => (
                  <Link
                    key={musica.id}
                    to={`/cifra/${musica.id}`}
                    className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-slate-100 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl">
                        🎵
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                          {musica.titulo}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                          {musica.artista}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        musica.nivel === 'Iniciante'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : musica.nivel === 'Intermediário'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                      }`}>
                        {musica.nivel}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {musica.acordes.slice(0, 4).map((acorde, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-mono"
                        >
                          {acorde}
                        </span>
                      ))}
                      {musica.acordes.length > 4 && (
                        <span className="px-2 py-0.5 text-slate-400 text-xs">
                          +{musica.acordes.length - 4}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
