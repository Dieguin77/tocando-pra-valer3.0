import React from "react";
import { Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import "./songs.css";

export default function Songs() {
  return (
    <div className="songs-page-container">

      <div className="songs-header-nav">
         <Link to="/" className="btn-voltar-home">
            &larr; Voltar para o Início
         </Link>
         <h1>Repertório Completo</h1>
      </div>

      <h1>Repertório</h1>

      <div className="songs-grid">
        {musicas.map(song => (
          <Link to={`/musica/${song.id}`} key={song.id} className="song-card">
            <div className="song-image">
            </div>
            <div className="song-info">
              <h2>{song.titulo}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
