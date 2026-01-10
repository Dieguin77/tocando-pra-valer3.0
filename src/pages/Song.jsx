import { useParams, Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import { useState, useEffect } from "react";
import { fetchLyrics } from "../services/vagalume";
import { ArrowLeft } from "lucide-react";

export default function Song() {
  const { id } = useParams();
  
  // Encontra a música no seu "banco de dados" local
  const songData = musicas.find((m) => m.id === parseInt(id));

  // Estado para guardar a letra que virá da API
  const [lyrics, setLyrics] = useState("Carregando letra...");

  // Efeito que roda assim que a tela abre
  useEffect(() => {
    if (songData) {
      // Chama a API do Vagalume
      fetchLyrics(songData.artista, songData.titulo).then((letraEncontrada) => {
        if (letraEncontrada) {
          setLyrics(letraEncontrada);
        } else {
          setLyrics("Letra não encontrada no Vagalume.");
        }
      });
    }
  }, [songData]);

  if (!songData) {
    return <div className="text-center p-10 text-gray-500">Música não encontrada!</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        
        {/* Botão Voltar */}
        <Link 
          to="/musicas" 
          className="inline-flex items-center text-gray-500 hover:text-blue-500 transition-colors mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Voltar para Cifras
        </Link>

        {/* Cabeçalho da Música */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {songData.titulo}
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            {songData.artista}
          </p>
          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Tom: {songData.tom || "Original"}
          </span>
        </div>

        {/* Área da Letra / Cifra */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Letra da Música</h3>
          
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 font-sans bg-gray-50 p-6 rounded-xl">
            {lyrics}
          </div>
        </div>

        {/* Embed do Youtube (se tiver ID) */}
        {songData.youtubeId && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vídeo Aula / Clip</h3>
            <div className="aspect-video rounded-xl overflow-hidden border border-gray-200">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${songData.youtubeId}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}