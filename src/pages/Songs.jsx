import { useState } from "react";
import { Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import "./songs.css";

export default function Songs() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar músicas com base no termo de busca
  const filteredSongs = musicas.filter((song) =>
    song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (song.artista && song.artista.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="songs-page-container">
      <div className="songs-header">
        <Link to="/" className="back-link">
          &larr; Voltar para o Início
        </Link>
        <h1>Repertório Musical</h1>
        <p>Explore nossa coleção de músicas cifradas</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por música ou artista..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="songs-grid">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Link to={`/musica/${song.id}`} key={song.id} className="song-card">
              <h3>{song.titulo}</h3>
              <p className="artist">{song.artista || "Artista Desconhecido"}</p>
            </Link>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhuma música encontrada</p>
          </div>
        )}
      </div>

      {/* Botão de Tema Flutuante */}
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
    </div>
  );
}