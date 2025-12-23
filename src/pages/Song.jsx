import { useParams, Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { fetchLyrics } from "../services/vagalume"; // Importando nosso serviço novo

export default function Song() {
  const { id } = useParams();
  const { theme } = useTheme();
  
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
    return <div className="text-center p-10 dark:text-white">Música não encontrada!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 flex flex-col items-center p-6">
      
      {/* Botão Voltar */}
      <div className="w-full max-w-4xl mb-6">
        <Link to="/musicas" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium">
          &larr; Voltar para o Repertório
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 max-w-4xl w-full border border-gray-100 dark:border-gray-800">
        {/* Cabeçalho da Música */}
        <div className="text-center mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {songData.titulo}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            {songData.artista}
          </p>
          <div className="mt-4 inline-block bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
            Tom: {songData.tom || "Original"}
          </div>
        </div>

        {/* Área da Letra / Cifra */}
        <div className="prose dark:prose-invert max-w-none">
          {/* Se você tiver cifra manual no musicas.js, mostre ela. Se não, mostre a do Vagalume */}
          <h3 className="text-xl font-bold dark:text-white mb-4">Letra da Música</h3>
          
          <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-800 dark:text-gray-300 font-sans">
            {lyrics}
          </div>
        </div>

        {/* Embed do Youtube (se tiver ID) */}
        {songData.youtubeId && (
          <div className="mt-10">
            <h3 className="text-xl font-bold dark:text-white mb-4">Vídeo Aula / Clip</h3>
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
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

      <div className="fixed bottom-6 right-6">
        <ThemeToggle />
      </div>
    </div>
  );
}