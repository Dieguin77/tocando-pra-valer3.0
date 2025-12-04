import { useParams } from "react-router-dom";
import { useState } from "react";
import { musicas } from "../data/musicas";
import "./song.css";

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function transposeChord(chord, steps) {
  // Regex para separar a nota (ex: C, F#) do resto (m, 7, etc)
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  let note = match[1];
  let suffix = match[2];

  let index = notes.indexOf(note);
  if (index === -1) return chord; // Se não achar a nota, retorna original

  // FÓRMULA CORRIGIDA (Matemática circular que aceita números negativos)
  let newIndex = ((index + steps) % notes.length + notes.length) % notes.length;

  return notes[newIndex] + suffix;
}

export default function Song() {
  const { id } = useParams();
  
  // CORREÇÃO CRÍTICA: Convertendo id para Number para garantir que encontre a música
  const musica = musicas.find((m) => m.id === Number(id));

  const [fontSize, setFontSize] = useState(18);
  const [transpose, setTranspose] = useState(0);

  if (!musica) {
    return (
      <div className="song-container">
        <h2 style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
          Música não encontrada (ID: {id})
        </h2>
      </div>
    );
  }

  function transposeLyrics(text) {
    // Procura por padrões como [C], [Am7], [F#] e troca
    return text.replace(/\[([^\]]+)\]/g, (_, chord) => {
      return `[${transposeChord(chord, transpose)}]`;
    });
  }

  return (
    <div className="song-container">
      <div className="song-header">
        <h1>{musica.titulo}</h1>
      </div>

      <div className="controls">
        <button onClick={() => setTranspose(transpose - 1)}>Tom -</button>
        <button onClick={() => setTranspose(transpose + 1)}>Tom +</button>
        <button onClick={() => setFontSize(fontSize - 2)}>Fonte -</button>
        <button onClick={() => setFontSize(fontSize + 2)}>Fonte +</button>
      </div>

      <pre style={{ fontSize: fontSize + "px" }}>
        {transposeLyrics(musica.letra)}
      </pre>
    </div>
  );
}