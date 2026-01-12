import { Link } from 'react-router-dom';
import { musicas } from '../data/musicas';
import Card from '../components/Card';

export default function Aulas() {
  const categorias = [...new Set(musicas.map(m => m.categoria))];

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fadeIn">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Nossas <span className="text-gold">Aulas</span>
        </h1>
        <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Escolha uma música e aprenda a tocar com cifras, vídeos e dicas práticas.
        </p>

        {categorias.map((categoria) => (
          <div key={categoria} className="mb-12">
            <h2 className="text-2xl font-bold text-gold mb-6 border-b border-gold/30 pb-2">
              {categoria}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {musicas
                .filter((m) => m.categoria === categoria)
                .map((musica) => (
                  <Card
                    key={musica.id}
                    title={musica.titulo}
                    description={`${musica.artista} • ${musica.nivel}`}
                    to={`/song/${musica.id}`}
                    badge={musica.nivel}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
