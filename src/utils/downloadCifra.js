// src/utils/downloadCifra.js

export const downloadCifraAsTxt = (song, semitones) => {
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

  // Processar a letra
  const parts = song.letra.split(/(\[.*?\])/g);
  const processedLyrics = parts
    .map((part) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const originalChord = part.slice(1, -1);
        const currentChord = transposeChord(originalChord, semitones);
        return `[${currentChord}]`;
      }
      return part;
    })
    .join("");

  // Calcular tom transposto
  const getTransposedKey = () => {
    if (!song.tom) return "Tom não definido";
    let root = normalizeChord(song.tom);
    let index = NOTES.indexOf(root);
    if (index === -1) return song.tom;
    let newIndex = (index + semitones) % 12;
    if (newIndex < 0) newIndex += 12;
    return NOTES[newIndex];
  };

  // Montar o conteúdo do arquivo
  const content = `
${song.titulo}
${song.artista ? `Intérprete: ${song.artista}` : ''}
${song.compositores ? `Composição: ${song.compositores}` : ''}
Tom: ${getTransposedKey()}
${semitones !== 0 ? `(Original: ${song.tom} ${semitones > 0 ? '+' : ''}${semitones})` : ''}

${'-'.repeat(60)}

${processedLyrics}

${'-'.repeat(60)}
Cifra do site: Tocando Pra Valer
www.tocandopravaler.com.br
Impresso em: ${new Date().toLocaleDateString('pt-BR')}
  `.trim();

  // Criar o blob e fazer download
  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${song.titulo.replace(/\s+/g, "-").toLowerCase()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
