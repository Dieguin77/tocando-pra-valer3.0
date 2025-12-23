import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Plus, Minus, Timer } from "lucide-react";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);
  const nextNoteTimeRef = useRef(0);

  // Frequências dos sons
  const CLICK_FREQ = 1000;  // Click normal
  const ACCENT_FREQ = 1500; // Click acentuado (primeiro tempo)

  const playClick = useCallback((isAccent = false) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = isAccent ? ACCENT_FREQ : CLICK_FREQ;

    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, []);

  const startMetronome = useCallback(() => {
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    const interval = (60 / bpm) * 1000;
    let currentBeat = 0;

    const tick = () => {
      const isAccent = currentBeat === 0;
      playClick(isAccent);
      setBeat(currentBeat);
      currentBeat = (currentBeat + 1) % beatsPerMeasure;
    };

    tick(); // Toca imediatamente
    intervalRef.current = setInterval(tick, interval);
    setIsPlaying(true);
  }, [bpm, beatsPerMeasure, playClick]);

  const stopMetronome = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setBeat(0);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  // Reinicia o metrônomo quando BPM muda (se estiver tocando)
  useEffect(() => {
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  }, [bpm, beatsPerMeasure]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const adjustBpm = (amount) => {
    setBpm(prev => Math.max(20, Math.min(300, prev + amount)));
  };

  const tempoLabel = () => {
    if (bpm < 60) return "Largo";
    if (bpm < 80) return "Adagio";
    if (bpm < 100) return "Andante";
    if (bpm < 120) return "Moderato";
    if (bpm < 140) return "Allegro";
    if (bpm < 180) return "Vivace";
    return "Presto";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md mx-auto">
      
      {/* Título */}
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Timer className="text-orange-500" /> Metrônomo
      </h2>

      {/* Display de BPM */}
      <div className="text-center">
        <div className="text-7xl font-bold text-orange-500 tabular-nums">
          {bpm}
        </div>
        <div className="text-gray-400 text-sm uppercase tracking-wider mt-1">
          BPM • {tempoLabel()}
        </div>
      </div>

      {/* Controles de BPM */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => adjustBpm(-5)}
          className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all active:scale-95"
        >
          <Minus size={18} />
        </button>
        
        <input
          type="range"
          min="20"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-40 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        
        <button
          onClick={() => adjustBpm(5)}
          className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all active:scale-95"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Visualização dos beats */}
      <div className="flex gap-2">
        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full transition-all duration-100 ${
              isPlaying && beat === i
                ? i === 0
                  ? "bg-orange-500 scale-125 shadow-lg shadow-orange-500/50"
                  : "bg-blue-500 scale-110 shadow-lg shadow-blue-500/50"
                : "bg-slate-600"
            }`}
          />
        ))}
      </div>

      {/* Seletor de compasso */}
      <div className="flex items-center gap-3 text-gray-300">
        <span className="text-sm">Compasso:</span>
        {[2, 3, 4, 6].map((beats) => (
          <button
            key={beats}
            onClick={() => setBeatsPerMeasure(beats)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              beatsPerMeasure === beats
                ? "bg-orange-500 text-white"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            {beats}/4
          </button>
        ))}
      </div>

      {/* Botão Play/Pause */}
      <button
        onClick={togglePlay}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all active:scale-95 ${
          isPlaying
            ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30"
            : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30"
        }`}
      >
        {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
      </button>

      {/* Presets de tempo */}
      <div className="flex flex-wrap justify-center gap-2">
        {[60, 80, 100, 120, 140, 160].map((tempo) => (
          <button
            key={tempo}
            onClick={() => setBpm(tempo)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              bpm === tempo
                ? "bg-orange-500 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            {tempo}
          </button>
        ))}
      </div>
    </div>
  );
}
