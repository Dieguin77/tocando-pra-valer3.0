import { useState, useRef, useCallback } from 'react';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_PT = {
  'C': 'Dó', 'C#': 'Dó#', 'D': 'Ré', 'D#': 'Ré#', 'E': 'Mi', 'F': 'Fá',
  'F#': 'Fá#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'Lá', 'A#': 'Lá#', 'B': 'Si'
};

export default function Piano() {
  const [activeKey, setActiveKey] = useState(null);
  const [octave, setOctave] = useState(4);
  const audioContextRef = useRef(null);

  const getFrequency = (note, oct) => {
    const noteIndex = NOTES.indexOf(note);
    const a4 = 440;
    const a4NoteIndex = NOTES.indexOf('A');
    const a4Octave = 4;
    const halfSteps = (oct - a4Octave) * 12 + (noteIndex - a4NoteIndex);
    return a4 * Math.pow(2, halfSteps / 12);
  };

  const playNote = useCallback((note) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = getFrequency(note, octave);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
    
    setActiveKey(note);
    setTimeout(() => setActiveKey(null), 200);
  }, [octave]);

  const isBlackKey = (note) => note.includes('#');

  const whiteKeys = NOTES.filter(n => !isBlackKey(n));
  const blackKeyPositions = {
    'C#': 0, 'D#': 1, 'F#': 3, 'G#': 4, 'A#': 5
  };

  return (
    <div id="piano" className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">
        🎹 Piano
      </h2>

      {/* Seletor de oitava */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setOctave(Math.max(2, octave - 1))}
          className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          −
        </button>
        <span className="text-lg font-semibold text-slate-800 dark:text-white">
          Oitava {octave}
        </span>
        <button
          onClick={() => setOctave(Math.min(6, octave + 1))}
          className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          +
        </button>
      </div>

      {/* Teclado */}
      <div className="relative">
        {/* Teclas brancas */}
        <div className="flex">
          {whiteKeys.map((note) => (
            <button
              key={note}
              onClick={() => playNote(note)}
              className={`flex-1 h-32 md:h-40 border border-slate-300 dark:border-slate-600 rounded-b-lg flex flex-col items-center justify-end pb-2 transition-all ${
                activeKey === note
                  ? 'bg-blue-200 dark:bg-blue-600'
                  : 'bg-white dark:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-200'
              }`}
            >
              <span className="text-xs md:text-sm font-semibold text-slate-700">
                {NOTE_NAMES_PT[note]}
              </span>
            </button>
          ))}
        </div>

        {/* Teclas pretas */}
        <div className="absolute top-0 left-0 right-0 flex pointer-events-none">
          {whiteKeys.map((note) => {
            const blackNote = NOTES.find(n => n === note + '#');
            if (!blackNote || !Object.keys(blackKeyPositions).includes(blackNote)) {
              return <div key={note} className="flex-1" />;
            }
            return (
              <div key={note} className="flex-1 relative">
                <button
                  onClick={() => playNote(blackNote)}
                  className={`pointer-events-auto absolute -right-3 w-6 md:w-8 h-20 md:h-24 rounded-b-md z-10 transition-all ${
                    activeKey === blackNote
                      ? 'bg-blue-700'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  <span className="text-[10px] md:text-xs text-white font-semibold">
                    {NOTE_NAMES_PT[blackNote]}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nota ativa */}
      {activeKey && (
        <div className="mt-4 text-center">
          <span className="text-lg font-semibold text-blue-500">
            {NOTE_NAMES_PT[activeKey]} ({activeKey}{octave})
          </span>
        </div>
      )}
    </div>
  );
}
