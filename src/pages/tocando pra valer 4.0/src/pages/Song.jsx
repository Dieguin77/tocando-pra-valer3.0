import { useParams, Link } from 'react-router-dom';
import { musicas } from '../data/musicas';
import Button from '../components/Button';

export default function Song() {
  const { id } = useParams();
  const musica = musicas.find(m => m.id === id);

  if (!musica) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Música não encontrada</h1>
          <p className="text-gray-300 mb-8">A música que você está procurando não existe.</p>
          <Button to="/aulas" variant="primary">
            Voltar para Aulas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fadeIn">
      <div className="container-custom">
        <Link to="/aulas" className="inline-flex items-center text-gold hover:text-yellow-400 mb-8 transition-colors">
          ← Voltar para Aulas
        </Link>

        <div className="bg-secondary rounded-xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {musica.titulo}
              </h1>
              <p className="text-xl text-gray-300">{musica.artista}</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <span className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-full">
                {musica.nivel}
              </span>
              <span className="bg-gold text-primary text-sm font-bold px-4 py-2 rounded-full">
                {musica.categoria}
              </span>
            </div>
          </div>

          {/* Acordes */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gold mb-4">Acordes Utilizados</h2>
            <div className="flex flex-wrap gap-3">
              {musica.acordes.map((acorde, index) => (
                <span
                  key={index}
                  className="bg-primary text-white font-mono text-lg px-4 py-2 rounded-lg"
                >
                  {acorde}
                </span>
              ))}
            </div>
          </div>

          {/* Cifra */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gold mb-4">Cifra</h2>
            <pre className="bg-primary p-6 rounded-lg text-white font-mono text-sm overflow-x-auto whitespace-pre-wrap">
              {musica.cifra}
            </pre>
          </div>

          {/* Dicas */}
          {musica.dicas && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gold mb-4">Dicas para Tocar</h2>
              <ul className="space-y-2">
                {musica.dicas.map((dica, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="text-gold">💡</span>
                    {dica}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Video */}
          {musica.videoUrl && (
            <div>
              <h2 className="text-2xl font-bold text-gold mb-4">Vídeo Aula</h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={musica.videoUrl}
                  title={`Vídeo aula - ${musica.titulo}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
