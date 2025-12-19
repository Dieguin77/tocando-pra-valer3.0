import './PrintView.css';

export default function PrintView({ song, semitones }) {
  // Função para processar a letra e transpor acordes
  const transposeChord = (chord, semitones) => {
    const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const normalizeChord = (chord) => {
      const map = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
      return map[chord] || chord;
    };

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

  const renderLyricsForPrint = (lyrics) => {
    const parts = lyrics.split(/(\[.*?\])/g);

    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const originalChord = part.slice(1, -1);
        const currentChord = transposeChord(originalChord, semitones);
        return (
          <span key={index} className="print-chord">
            {currentChord}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Calcular o tom transposto
  const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const normalizeChord = (chord) => {
    const map = { "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#" };
    return map[chord] || chord;
  };

  const getTransposedKey = () => {
    if (!song.tom) return "Tom não definido";
    let root = normalizeChord(song.tom);
    let index = NOTES.indexOf(root);
    if (index === -1) return song.tom;
    let newIndex = (index + semitones) % 12;
    if (newIndex < 0) newIndex += 12;
    return NOTES[newIndex];
  };

  return (
    <div className="print-view">
      {/* Header da cifra */}
      <div className="print-header">
        {song.imagem && (
          <img src={song.imagem} alt={song.artista} className="print-artist-image" />
        )}
        
        <div className="print-info">
          <h1 className="print-title">{song.titulo}</h1>
          
          {song.artista && (
            <p className="print-artist">
              <strong>Intérprete:</strong> {song.artista}
            </p>
          )}
          
          {song.compositores && (
            <p className="print-composer">
              <strong>Composição:</strong> {song.compositores}
            </p>
          )}
          
          <p className="print-key">
            <strong>Tom:</strong> {getTransposedKey()}
            {semitones !== 0 && (
              <span className="print-transposition">
                (Original: {song.tom} {semitones > 0 ? '+' : ''}{semitones})
              </span>
            )}
          </p>

          <p className="print-source">
            Cifra do site: Tocando Pra Valer • www.tocandopravaler.com.br
          </p>
        </div>
      </div>

      {/* Separador */}
      <hr className="print-separator" />

      {/* Cifra */}
      <div className="print-lyrics">
        <pre>{renderLyricsForPrint(song.letra)}</pre>
      </div>

      {/* Footer */}
      <div className="print-footer">
        <p>Tocando Pra Valer - Cifras para Violão/Guitarra</p>
        <p>Impresso em: {new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  );
}
