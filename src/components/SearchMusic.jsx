import { useState } from 'react';
import { searchSongOnGenius } from '../services/geniusAPI';
import EmojiIcon, { IconButton } from './EmojiIcon';
import './SearchMusic.css';

export default function SearchMusic({ onSongFound }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !artist.trim()) {
      setError('Por favor, preencha título e artista');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const songData = await searchSongOnGenius(title, artist);
      
      if (songData) {
        setResult(songData);
        if (onSongFound) {
          onSongFound(songData);
        }
      } else {
        setError('Música não encontrada. Tente outro termo de busca.');
      }
    } catch (err) {
      setError(`Erro ao buscar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-music-container">
      <h2><EmojiIcon emoji="search" size="lg" /> Buscar Música no Genius</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label htmlFor="title">Título da Música</label>
          <input
            id="title"
            type="text"
            placeholder="Ex: Imagine"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="artist">Artista</label>
          <input
            id="artist"
            type="text"
            placeholder="Ex: John Lennon"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-search">
          {loading ? '⏳ Buscando...' : <><EmojiIcon emoji="search" size="md" /> Buscar</>}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="search-result">
          <h3>Encontrada!</h3>
          
          {result.imagem && (
            <img src={result.imagem} alt={result.titulo} className="result-image" />
          )}
          
          <div className="result-info">
            <p><strong>Título:</strong> {result.titulo}</p>
            <p><strong>Artista:</strong> {result.artista}</p>
            <p><strong>Compositor:</strong> {result.compositores}</p>
            
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-view-genius"
            >
              <EmojiIcon emoji="eye" size="md" /> Ver no Genius
            </a>
          </div>
        </div>
      )}

      <div className="genius-info">
        <h4>ℹ️ Como funciona?</h4>
        <p>
          Este recurso busca informações de músicas no Genius, um banco de dados 
          colaborativo com letras, acordes e análises musicais.
        </p>
        <p>
          <strong>Nota:</strong> Você precisa configurar uma chave da API Genius em seu <code>.env</code>
        </p>
      </div>
    </div>
  );
}
