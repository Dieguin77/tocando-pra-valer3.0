import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchMusic from '../components/SearchMusic';
import { useTheme } from '../contexts/ThemeContext';
import EmojiIcon from '../components/EmojiIcon';
import './AdminMusic.css';

export default function AdminMusic() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [songs, setSongs] = useState([]);

  const handleSongFound = (songData) => {
    // Adicionar a música encontrada à lista
    const newSong = {
      id: songs.length + 1,
      ...songData,
      tom: 'C', // Tom padrão
      letra: '', // Letra ainda vazia
    };

    setSongs([...songs, newSong]);
    alert(`Música "${newSong.titulo}" adicionada com sucesso!`);
  };

  const removeSong = (id) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  return (
    <div className="admin-music-container">
      <div className="admin-header">
        <Link to="/" className="back-link">← Voltar</Link>
        <h1><EmojiIcon emoji="book" size="lg" /> Admin - Adicionar Músicas</h1>
        <p>Busque e adicione novas músicas ao banco de dados</p>
      </div>

      <SearchMusic onSongFound={handleSongFound} />

      {songs.length > 0 && (
        <div className="songs-added">
          <h2><EmojiIcon emoji="check" size="lg" /> Músicas Adicionadas ({songs.length})</h2>
          
          <div className="songs-list">
            {songs.map(song => (
              <div key={song.id} className="song-card">
                {song.imagem && (
                  <img src={song.imagem} alt={song.titulo} className="song-image" />
                )}
                
                <div className="song-details">
                  <h3>{song.titulo}</h3>
                  <p><strong>Artista:</strong> {song.artista}</p>
                  <p><strong>Compositor:</strong> {song.compositores}</p>
                  <p><strong>Tom:</strong> {song.tom}</p>
                  
                  {song.url && (
                    <a href={song.url} target="_blank" rel="noopener noreferrer">
                      <EmojiIcon emoji="eye" size="md" /> Ver no Genius
                    </a>
                  )}
                </div>

                <button 
                  className="btn-remove"
                  onClick={() => removeSong(song.id)}
                  title="Remover música"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="export-section">
            <h3><EmojiIcon emoji="share" size="lg" /> Exportar Dados</h3>
            <button 
              className="btn-export"
              onClick={() => {
                const json = JSON.stringify(songs, null, 2);
                const blob = new Blob([json], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'musicas.json';
                a.click();
              }}
            >
              <EmojiIcon emoji="download" size="md" /> Download JSON
            </button>

            <p className="info">
              Você pode copiar este JSON e adicionar ao seu arquivo <code>src/data/musicas.jsx</code>
            </p>
          </div>
        </div>
      )}

      <div className="info-box">
        <h3>ℹ️ Como usar esta ferramenta</h3>
        <ol>
          <li>Busque uma música pelo título e artista</li>
          <li>A música será adicionada com informações do Genius</li>
          <li>Revise os dados e edite conforme necessário</li>
          <li>Exporte como JSON quando estiver pronto</li>
          <li>Adicione o JSON ao seu banco de dados</li>
        </ol>
      </div>
    </div>
  );
}
