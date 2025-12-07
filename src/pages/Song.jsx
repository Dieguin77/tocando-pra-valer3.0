import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import chordsDB from "../data/chords-db";
import ChordDiagram from "./ChordDiagram";
import "./song.css";

// --- LÓGICA DE TRANSPOSIÇÃO (Mantida igual) ---
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const normalizeChord = (chord) => {
  const map = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
  return map[chord] || chord;
};
const transposeChord = (chord, semitones) => {
  if (!chord) return "";
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;
  let [_, root, suffix] = match;
  root = normalizeChord(root);
  let index = NOTES.indexOf(root);
  if (index === -1) return chord;
  let newIndex = (index + semitones) % 12;
  if (newIndex < 0) newIndex += 12;
  return NOTES[newIndex] + suffix;
};

export default function Song() {
  const { id } = useParams();
  const song = musicas.find((m) => m.id === parseInt(id));

  // --- ESTADOS ---
  const [semitones, setSemitones] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  
  // ESTADO NOVO: Qual acorde está "selecionado" (clicado) no mobile?
  const [activeChordIndex, setActiveChordIndex] = useState(null);

  // Fecha o balão se clicar fora (opcional, para UX melhor)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.chord-wrapper')) {
        setActiveChordIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!song) return <div className="song-page-container"><h1>Música não encontrada!</h1></div>;

  const renderLyrics = (lyrics) => {
    const parts = lyrics.split(/(\[.*?\])/g);

    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const originalChord = part.slice(1, -1);
        const currentChord = transposeChord(originalChord, semitones);
        const chordData = chordsDB[currentChord] || chordsDB[normalizeChord(currentChord)];

        // Verifica se este é o acorde clicado no momento
        const isActive = activeChordIndex === index;

        return (
          <span 
            key={index} 
            className={`chord-wrapper ${isActive ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation(); // Impede que o clique feche o balão imediatamente
              // Se já está ativo, desativa. Se não, ativa este.
              setActiveChordIndex(isActive ? null : index);
            }}
          >
            <span className="chord-symbol">{currentChord}</span>
            
            {/* O Balão aparece se tiver dados E (estiver ativo OU sendo "hovered" pelo CSS) */}
            {chordData && (
              <div className="chord-tooltip">
                <ChordDiagram chordData={chordData} />
              </div>
            )}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="song-page-container">
      
      {/* --- MUDANÇA AQUI: Alterar o Link para apontar para "/" --- */}
      <div className="song-header">
        <Link to="/" className="back-link">
           &larr; Voltar para o Início
        </Link>
        <h1>{song.titulo}</h1>
        <p className="artist">{song.artista || "Artista Desconhecido"}</p>
      </div>

      <div className="controls-bar">
        {/* ... (resto do código dos botões mantém igual) ... */}
        <div className="control-group">
          <span className="label">Tom:</span>
          <button className="btn-control" onClick={() => setSemitones(semitones - 1)}>-</button>
          <span className="value">{semitones > 0 ? `+${semitones}` : semitones}</span>
          <button className="btn-control" onClick={() => setSemitones(semitones + 1)}>+</button>
        </div>
        <div className="control-group">
          <span className="label">Fonte:</span>
          <button className="btn-control" onClick={() => setFontSize(Math.max(12, fontSize - 2))}>A-</button>
          <button className="btn-control" onClick={() => setFontSize(Math.min(36, fontSize + 2))}>A+</button>
        </div>
      </div>

      <div className="lyrics-box" style={{ fontSize: `${fontSize}px` }}>
        <pre style={{ fontSize: `${fontSize}px`, lineHeight: 3.5 }}>{renderLyrics(song.letra)}</pre>
      </div>
    </div>
  );

}