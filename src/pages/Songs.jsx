import { Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import "./songs.css";

export default function Songs() {
  return (
    <div className="songs-page">
      <h1>Repertório</h1>

      <div className="songs-grid">
        {musicas.map(song => (
          <Link to={`/musica/${song.id}`} key={song.id} className="song-card">
            <div className="song-image">
              🎵
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
