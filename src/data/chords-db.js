// src/data/chords-db.js

const chordsDB = {
  // --- MAIORES ---
  "C": {
    frets: [0, 3, 2, 0, 1, 0], // Cordas soltas (0) e casas apertadas
    fingers: [0, 3, 2, 0, 1, 0], // Dedos (1=indicador, etc)
    barres: [], // Pestanas
    capo: false,
  },
  "D": {
    frets: [-1, -1, 0, 2, 3, 2], // -1 significa não tocar a corda
    fingers: [0, 0, 0, 1, 3, 2],
    barres: [],
    capo: false,
  },
  "E": {
    frets: [0, 2, 2, 1, 0, 0],
    fingers: [0, 2, 3, 1, 0, 0],
    barres: [],
    capo: false,
  },
  "F": {
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    barres: [1], // Pestana na casa 1
    capo: false,
  },
  "G": {
    frets: [3, 2, 0, 0, 0, 3],
    fingers: [2, 1, 0, 0, 0, 3],
    barres: [],
    capo: false,
  },
  "A": {
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: [0, 0, 1, 2, 3, 0],
    barres: [],
    capo: false,
  },
  "B": {
    frets: [-1, 2, 4, 4, 4, 2],
    fingers: [0, 1, 2, 3, 4, 1],
    barres: [2],
    capo: false,
  },

  // --- SUSTENIDOS (#) BÁSICOS ---
  "F#": {
    frets: [2, 4, 4, 3, 2, 2],
    fingers: [1, 3, 4, 2, 1, 1],
    barres: [2],
    capo: false,
  },
  
  // --- MENORES (Exemplos) ---
  "Em": {
    frets: [0, 2, 2, 0, 0, 0],
    fingers: [0, 2, 3, 0, 0, 0],
    barres: [],
    capo: false,
  },
  "Am": {
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: [0, 0, 2, 3, 1, 0],
    barres: [],
    capo: false,
  }
  
  // DICA: Você pode adicionar mais acordes aqui seguindo esse padrão!
};

export default chordsDB;