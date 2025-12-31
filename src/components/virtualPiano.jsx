import { useState, useEffect, useCallback } from "react";

// Mapeamento de teclas
const KEY_MAP = {
  a: "C", w: "C#", s: "D", e: "D#", d: "E", f: "F", t: "F#",
  g: "G", y: "G#", h: "A", u: "A#", j: "B", k: "C2",
};

const NOTE_NAMES_PT = {
  "C": "Dó", "C#": "Dó#", "D": "Ré", "D#": "Ré#", "E": "Mi",
  "F": "Fá", "F#": "Fá#", "G": "Sol", "G#": "Sol#", "A": "Lá",
  "A#": "Lá#", "B": "Si", "C2": "Dó",
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

  const getFrequency = (baseFreq) => {
    return baseFreq * Math.pow(2, octave - 4);
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
  }, [octave]); // Dependência necessária para recalcular frequência correta

  const handleKeyDown = useCallback((event) => {
      const noteName = KEY_MAP[event.key.toLowerCase()];
      if (noteName) {
        const note = baseNotes.find((n) => n.name === noteName);
        if (note && activeKey !== note.name) {
          playSound(note.baseFreq, note.name);
        }
      }
      // Atalhos de oitava
      if (event.key.toLowerCase() === 'z') setOctave(prev => Math.max(1, prev - 1));
      if (event.key.toLowerCase() === 'x') setOctave(prev => Math.min(7, prev + 1));
    }, [baseNotes, playSound, activeKey]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Filtra apenas as brancas para cálculos de layout
  const whiteNotes = baseNotes.filter(n => n.type === "white");

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full h-full">
      
      {/* Display */}
      <div className="text-center">
        <div className={`text-5xl font-bold h-16 transition-colors ${activeKey ? 'text-brand-blue' : 'text-transparent'}`}>
          {activeKey ? NOTE_NAMES_PT[activeKey] : "Dó"}
        </div>
        <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">
          {activeKey ? `Oitava ${octave}` : "Toque uma tecla"}
        </div>
      </div>

      {/* Controles Oitava */}
      <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl">
        <button
          onClick={() => setOctave(o => Math.max(1, o - 1))}
          disabled={octave <= 1}
          className="w-10 h-10 rounded-lg hover:bg-white text-gray-600 hover:text-brand-blue font-bold transition-all disabled:opacity-30"
        >
          −
        </button>
        <span className="text-xl font-bold text-gray-800 w-8 text-center">{octave}</span>
        <button
          onClick={() => setOctave(o => Math.min(7, o + 1))}
          disabled={octave >= 7}
          className="w-10 h-10 rounded-lg hover:bg-white text-gray-600 hover:text-brand-blue font-bold transition-all disabled:opacity-30"
        >
          +
        </button>
      </div>

      {/* PIANO RESPONSIVO (CORREÇÃO AQUI) */}
      <div className="relative w-full aspect-[2/1] select-none shadow-xl rounded-b-xl overflow-hidden bg-white">
        
        {/* Camada Teclas Brancas (Flexbox) */}
        <div className="flex w-full h-full">
          {whiteNotes.map((note) => (
            <div
              key={note.name}
              onMouseDown={() => playSound(note.baseFreq, note.name)}
              className={`flex-1 border-r border-gray-200 last:border-0 border-b-4 rounded-b-lg cursor-pointer flex flex-col items-center justify-end pb-2 transition-colors ${
                activeKey === note.name 
                  ? "bg-blue-50 border-brand-blue" 
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="text-[10px] sm:text-xs text-gray-400 font-bold mb-1">{note.key.toUpperCase()}</span>
              <span className="text-[10px] sm:text-xs text-brand-blue font-bold">{NOTE_NAMES_PT[note.name]}</span>
            </div>
          ))}
        </div>

        {/* Camada Teclas Pretas (Porcentagem) */}
        <div className="absolute top-0 left-0 w-full h-[60%] pointer-events-none">
          {baseNotes.map((note, index) => {
            if (note.type !== "black") return null;
            
            // Lógica responsiva: Calcula % baseada nas teclas brancas anteriores
            const whiteBefore = baseNotes.slice(0, index).filter(n => n.type === "white").length;
            const leftPosition = (whiteBefore / whiteNotes.length) * 100;

            return (
              <div
                key={note.name}
                onMouseDown={() => playSound(note.baseFreq, note.name)}
                style={{ 
                  left: `${leftPosition}%`, 
                  transform: 'translateX(-50%)' // Centraliza na divisória
                }}
                className={`absolute w-[10%] h-full rounded-b-md cursor-pointer pointer-events-auto transition-colors shadow-md flex items-end justify-center pb-2 ${
                  activeKey === note.name ? "bg-brand-blue" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <span className="text-[8px] sm:text-[10px] text-gray-400 font-bold">{note.key.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
}