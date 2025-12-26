import React, { useState } from 'react';
import { Search, ArrowLeft, Music, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { musicas } from '../data/musicas';

export default function Songs() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtragem simples
  const filteredSongs = musicas.filter(song => 
    song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (song.artista && song.artista.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Background Decorativo (Glow effects) - só no modo escuro */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none dark:block hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Header / Voltar */}
        <Link 
          to="/"
          className="group flex items-center text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Voltar para o Início</span>
        </Link>

        {/* Título Principal */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
            Repertório Musical
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl">
            Explore nossa coleção de músicas cifradas com tecnologia e precisão.
          </p>
        </div>

        {/* Barra de Busca */}
        <div className="relative max-w-2xl mb-16 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-2xl">
            <Search className="w-6 h-6 text-gray-400 dark:text-slate-400 ml-4" />
            <input 
              type="text"
              placeholder="Buscar por música, artista ou tom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent p-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 text-lg"
            />
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSongs.map((song) => (
            <Link 
              to={`/musica/${song.id}`}
              key={song.id} 
              className="group relative bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-100 dark:bg-slate-700/50 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Music className="w-6 h-6" />
                </div>
                <PlayCircle className="w-8 h-8 text-gray-300 dark:text-slate-600 group-hover:text-indigo-500 dark:group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                {song.titulo}
              </h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm font-medium mb-4">
                {song.artista}
              </p>
              
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-slate-900 rounded-full text-xs font-semibold text-gray-600 dark:text-slate-300 border border-gray-200 dark:border-slate-700">
                  Tom: {song.tom}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Estado Vazio */}
        {filteredSongs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-slate-500 text-lg">Nenhuma música encontrada para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}