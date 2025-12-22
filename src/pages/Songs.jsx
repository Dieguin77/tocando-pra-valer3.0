import { useState } from "react";
import { Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import "./songs.css"; // Pode manter, mas as classes do Tailwind abaixo terão prioridade

export default function Songs() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar músicas com base no termo de busca
  const filteredSongs = musicas.filter((song) =>
    song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (song.artista && song.artista.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    // CONTAINER PRINCIPAL: Fundo cinza claro no modo Light, Fundo preto (gray-950) no modo Dark
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* CABEÇALHO */}
      <div className="max-w-6xl mx-auto text-center mb-8 pt-4">
        <Link to="/" className="inline-block mb-4 text-orange-600 hover:text-orange-700 dark:text-orange-400 font-medium transition-colors">
          &larr; Voltar para o Início
        </Link>
        {/* Título: Preto no claro, Branco no escuro */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Repertório Musical
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Explore nossa coleção de músicas cifradas</p>
      </div>

      {/* BARRA DE BUSCA */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Buscar por música ou artista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // Input: Fundo branco/escuro, Texto preto/branco, Borda cinza
          className="w-full p-4 rounded-full border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-orange-500 focus:outline-none 
                     dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 transition-colors"
        />
      </div>

      {/* GRADE DE MÚSICAS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Link 
              to={`/musica/${song.id}`} 
              key={song.id} 
              // CARD: Fundo branco no Light, Fundo cinza escuro no Dark. Borda muda ao passar o mouse.
              className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all
                         dark:bg-gray-900 dark:border-gray-800"
            >
              {/* TÍTULO DA MÚSICA: AQUI ESTÁ A CORREÇÃO (dark:text-white) */}
              {/* No modo claro fica roxo (purple-700), no escuro fica BRANCO */}
              <h3 className="text-xl font-bold mb-1 text-purple-700 group-hover:text-orange-600 transition-colors dark:text-white">
                {song.titulo}
              </h3>
              
              {/* Nome do Artista: Cinza no claro, Cinza mais claro no escuro */}
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {song.artista || "Artista Desconhecido"}
              </p>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma música encontrada 😕</p>
          </div>
        )}
      </div>

      {/* Botão de Tema Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}