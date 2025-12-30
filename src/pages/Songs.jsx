import React, { useState } from 'react';
import { Search, ArrowLeft, Music } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      <div className="songs-responsive-container">
        
        {/* Header / Voltar */}
        <Link 
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Voltar para o Início</span>
        </Link>

        {/* Título Principal */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cifras
          </h1>
          <p className="text-lg text-gray-500">
            Explore nossa coleção de cifras musicais.
          </p>
        </div>

        {/* Barra de Busca */}
        <div className="relative max-w-xl mb-10">
          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input 
              type="text"
              placeholder="Buscar por cifra ou artista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent p-4 text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.map((song) => (
            <Link 
              to={`/musica/${song.id}`}
              key={song.id} 
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-500 group-hover:bg-blue-100 transition-colors">
                  <Music className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {song.titulo}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {song.artista}
                  </p>
                  <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                    Tom: {song.tom}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Estado Vazio */}
        {filteredSongs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Nenhuma cifra encontrada para "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}