import { Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import logoImg from "../assets/logo.png"; // Importando a logo para o menu
import "./songs.css";

export default function Songs() {
  return (
    <div className="songs-wrapper">
      
      {/* 1. MENU FLUTUANTE (Igual ao da Home para manter padrão) */}
      <nav className="glass-nav">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="Logo" />
          <span>Tocando Pra Valer</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/musicas" className="nav-link" style={{color: '#fff'}}>Repertório</Link>
        </div>

        <Link to="/" className="nav-cta">
          Voltar
        </Link>
      </nav>

      {/* 2. CABEÇALHO */}
      <header className="songs-header-section">
        <h1 className="page-title">
          Seu <span className="gradient-text">Repertório</span>
        </h1>
        <p className="page-subtitle">Escolha uma música e comece a praticar agora.</p>
      </header>

      {/* 3. GRID DE CARDS PREMIUM */}
      <div className="songs-grid">
        {musicas.map((song) => (
          <Link to={`/musica/${song.id}`} key={song.id} className="song-card">
            
            {/* Ícone com brilho neon */}
            <div className="card-icon-wrapper">
              🎵
            </div>

            <div className="song-info">
              <h2>{song.titulo}</h2>
              <p>{song.artista || "Artista Desconhecido"}</p>
            </div>

            <span className="play-btn">Tocar Agora →</span>
          </Link>
        ))}
      </div>

    </div>
  );
}