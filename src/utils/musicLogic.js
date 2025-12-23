// src/utils/musicLogic.js

const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const notasBemol = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

// Identifica se uma linha é "linha de acordes" (tem mais notas que palavras)
export const isChordLine = (line) => {
  const trimmed = line.trim();
  if (!trimmed) return false;
  
  // Regra básica: Se tem muitas letras maiúsculas (A-G) seguidas de símbolos musicais e espaços, é cifra
  const potentialChords = trimmed.split(/\s+/);
  let chordCount = 0;
  
  const chordRegex = /^([A-G])(#|b)?(m|M|maj|min|dim|aug|sus|add)?\d*(\/[A-G](#|b)?)?(\(.*\))?$/;

  potentialChords.forEach(token => {
    if (chordRegex.test(token)) chordCount++;
  });

  // Se mais da metade dos itens na linha parecem acordes, tratamos como linha de cifra
  return chordCount > 0 && chordCount >= potentialChords.length * 0.5;
};

// Transpõe um único acorde
const transposeChord = (chord, semitones) => {
  // Regex para separar a nota base (Ex: C#) do resto (m7/G)
  const regex = /^([A-G][#b]?)(.*)$/;
  const match = chord.match(regex);
  
  if (!match) return chord; // Se não for acorde, devolve igual
  
  const [_, notaBase, resto] = match;
  
  // Achar índice da nota
  let index = notas.indexOf(notaBase);
  if (index === -1) index = notasBemol.indexOf(notaBase);
  if (index === -1) return chord; // Nota inválida

  // Calcular nova nota
  let newIndex = (index + semitones) % 12;
  if (newIndex < 0) newIndex += 12;

  // Usa sustenidos por padrão (poderia ser melhorado para usar bemóis dependendo da escala)
  return notas[newIndex] + resto;
};

// Processa o texto inteiro e muda os tons
export const transposeText = (fullText, semitones) => {
  if (semitones === 0) return fullText;

  return fullText.split("\n").map(line => {
    if (isChordLine(line)) {
      // Se for linha de acorde, quebra e transpõe cada um mantendo os espaços
      return line.replace(/([A-G][#b]?\S*)/g, (match) => transposeChord(match, semitones));
    }
    return line; // Se for letra, não mexe
  }).join("\n");
};