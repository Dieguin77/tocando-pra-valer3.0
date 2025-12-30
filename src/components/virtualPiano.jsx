import { useState, useEffect, useCallback } from "react";

// Mapeamento de teclas do teclado
const KEY_MAP = {
  a: "C",
  w: "C#",
  s: "D",
  e: "D#",
  d: "E",
  f: "F",
  t: "F#",
  g: "G",
  y: "G#",
  h: "A",
  u: "A#",
  j: "B",
  k: "C2",
};

// Nomes em português
const NOTE_NAMES_PT = {
  "C": "Dó",
  "C#": "Dó#",
  "D": "Ré",
  "D#": "Ré#",
  "E": "Mi",
  "F": "Fá",
  "F#": "Fá#",
  "G": "Sol",
  "G#": "Sol#",
  "A": "Lá",
  "A#": "Lá#",
  "B": "Si",
  "C2": "Dó",
};

export default function VirtualPiano() {
  const [activeKey, setActiveKey] = useState(null);
  const [octave, setOctave] = useState(4);

  const baseNotes = [
    { name: "C", type: "white", baseFreq: 261.63, key: "a" },
    { name: "C#", type: "black", baseFreq: 277.18, key: "w" },
    { name: "D", type: "white", baseFreq: 293.66, key: "s" },
    { name: "D#", type: "black", baseFreq: 311.13, key: "e" },
    { name: "E", type: "white", baseFreq: 329.63, key: "d" },
    { name: "F", type: "white", baseFreq: 349.23, key: "f" },
    { name: "F#", type: "black", baseFreq: 369.99, key: "t" },
    { name: "G", type: "white", baseFreq: 392.00, key: "g" },
    { name: "G#", type: "black", baseFreq: 415.30, key: "y" },
    { name: "A", type: "white", baseFreq: 440.00, key: "h" },
    { name: "A#", type: "black", baseFreq: 466.16, key: "u" },
    { name: "B", type: "white", baseFreq: 493.88, key: "j" },
    { name: "C2", type: "white", baseFreq: 523.25, key: "k" },
  ];

  // Calcula frequência baseada na oitava
  const getFrequency = (baseFreq) => {
    const octaveMultiplier = Math.pow(2, octave - 4);
    return baseFreq * octaveMultiplier;
  };

  const playSound = useCallback((baseFreq, noteName) => {
    setActiveKey(noteName);
    const freq = getFrequency(baseFreq);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.8);

    setTimeout(() => setActiveKey(null), 200);
  }, [octave]);

  const handleKeyDown = useCallback(
    (event) => {
      const noteName = KEY_MAP[event.key.toLowerCase()];
      if (noteName) {
        const note = baseNotes.find((n) => n.name === noteName);
        if (note && activeKey !== note.name) {
          playSound(note.baseFreq, note.name);
        }
      }
    },
    [baseNotes, playSound, activeKey]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Ajustar oitava (incremento de 1)
  const adjustOctave = (amount) => {
    setOctave(prev => Math.max(1, Math.min(7, prev + amount)));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-2xl mx-auto">
      
      {/* Nota sendo tocada */}
      <div className="text-center">
        <div className="text-5xl font-bold text-gray-900 h-16">
          {activeKey ? NOTE_NAMES_PT[activeKey] : ""}
        </div>
        <div className="text-sm text-gray-500">
          {activeKey ? `${activeKey} (Oitava ${octave})` : "Pressione uma tecla"}
        </div>
      </div>

      {/* Controle de Oitava */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => adjustOctave(-1)}
          disabled={octave <= 1}
          className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
        >
          −
        </button>
        <div className="text-center min-w-[100px]">
          <div className="text-sm text-gray-500">Oitava</div>
          <div className="text-2xl font-bold text-gray-900">{octave}</div>
        </div>
        <button
          onClick={() => adjustOctave(1)}
          disabled={octave >= 7}
          className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
        >
          +
        </button>
      </div>

      {/* Piano */}
      <div className="relative flex justify-center select-none">
        {baseNotes.map((note) => {
          const isWhite = note.type === "white";
          const isActive = activeKey === note.name;

          if (isWhite) {
            return (
              <div
                key={note.name}
                onMouseDown={() => playSound(note.baseFreq, note.name)}
                className={`relative w-12 h-40 border border-gray-300 rounded-b-lg cursor-pointer transition-all flex flex-col items-center justify-end pb-2 ${
                  isActive 
                    ? "bg-blue-100 border-blue-400" 
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <span className="text-xs text-gray-400 uppercase">{note.key}</span>
                <span className="text-xs text-gray-600 font-medium">{NOTE_NAMES_PT[note.name]}</span>
              </div>
            );
          }
          return null;
        })}
        
        {/* Teclas pretas (posicionadas absolutamente) */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
          {baseNotes.map((note, index) => {
            if (note.type !== "black") return null;
            
            const isActive = activeKey === note.name;
            // Calcula posição baseada nas teclas brancas anteriores
            const whiteKeysBefore = baseNotes.slice(0, index).filter(n => n.type === "white").length;
            const leftOffset = whiteKeysBefore * 48 - 16; // 48px = largura da tecla branca, 16px = metade da tecla preta

            return (
              <div
                key={note.name}
                onMouseDown={() => playSound(note.baseFreq, note.name)}
                style={{ left: `${leftOffset}px` }}
                className={`absolute w-8 h-24 rounded-b-md cursor-pointer transition-all pointer-events-auto flex flex-col items-center justify-end pb-1 ${
                  isActive 
                    ? "bg-blue-600" 
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <span className="text-[10px] text-gray-400 uppercase">{note.key}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dica */}
      <p className="text-xs text-gray-400 text-center">
        Use as teclas do teclado (A, W, S, E, D...) ou clique nas teclas do piano
      </p>
    </div>
  );
}