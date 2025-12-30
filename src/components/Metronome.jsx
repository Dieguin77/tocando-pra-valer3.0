import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Plus, Minus, Hand } from "lucide-react";

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);
  
  // Tap Tempo
  const [tapTimes, setTapTimes] = useState([]);
  
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Frequências dos sons
  const CLICK_FREQ = 1000;
  const ACCENT_FREQ = 1500;

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

    tick();
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

  // Reinicia quando BPM ou compasso muda
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

  // Ajustar BPM (incremento de 1)
  const adjustBpm = (amount) => {
    setBpm(prev => Math.max(20, Math.min(300, prev + amount)));
  };

  // Tap Tempo - calcula BPM baseado em toques
  const handleTapTempo = () => {
    const now = Date.now();
    const newTaps = [...tapTimes, now].filter(t => now - t < 3000); // Apenas últimos 3 segundos
    setTapTimes(newTaps);
    
    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(Math.max(20, Math.min(300, calculatedBpm)));
    }
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
    <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-md mx-auto">
      
      {/* Display de BPM */}
      <div className="text-center">
        <div className="text-7xl font-bold text-gray-900 tabular-nums">
          {bpm}
        </div>
        <div className="text-gray-500 text-sm uppercase tracking-wider mt-1">
          BPM • {tempoLabel()}
        </div>
      </div>

      {/* Controles de BPM - incremento de 1 */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => adjustBpm(-1)}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all active:scale-95 border border-gray-200"
        >
          <Minus size={20} />
        </button>
        
        <input
          type="range"
          min="20"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-40 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        
        <button
          onClick={() => adjustBpm(1)}
          className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all active:scale-95 border border-gray-200"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Visualização dos beats com ponteiro animado estilo metrônomo físico */}
      <div className="relative w-full max-w-xs h-24 flex flex-col items-center justify-center select-none mb-2">
        {/* Ponteiro animado */}
        <div
          className="absolute left-1/2 bottom-6 w-1 h-20 bg-gray-400 origin-bottom transition-transform duration-200"
          style={{
            // Alterna entre dois ângulos: -35° (esquerda) e +35° (direita)
            transform: `translateX(-50%) rotate(${beat % 2 === 0 ? -35 : 35}deg)`
          }}
        >
          {/* Bolinha na ponta do ponteiro */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg border-2 border-blue-700" />
        </div>
        {/* Base do metrônomo */}
        <div className="absolute left-1/2 bottom-4 w-8 h-3 bg-gray-300 rounded-b-xl -translate-x-1/2 shadow" />
        {/* Marcadores dos beats */}
        <div className="relative z-10 flex w-full justify-between px-2 mt-16">
          {Array.from({ length: beatsPerMeasure }).map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base transition-all duration-200 border-2 ${
                isPlaying && beat === i
                  ? i === 0
                    ? "bg-blue-500 text-white border-blue-700 scale-125 shadow-lg"
                    : "bg-blue-100 text-blue-700 border-blue-400 scale-110"
                  : "bg-gray-200 text-gray-500 border-gray-300"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Seletor de compasso - 2/4, 3/4, 4/4 sempre visível */}
      <div className="flex items-center gap-3 w-full justify-center mt-2 mb-2">
        <span className="text-sm text-gray-600 font-medium">Compasso:</span>
        {[2, 3, 4].map((beats) => (
          <button
            key={beats}
            onClick={() => setBeatsPerMeasure(beats)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
              beatsPerMeasure === beats
                ? "bg-blue-500 text-white border-blue-600 shadow"
                : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
            }`}
            style={{minWidth: 56}}
          >
            {beats}/4
          </button>
        ))}
      </div>

      {/* Botões principais */}
      <div className="flex items-center gap-4">
        {/* Tap Tempo */}
        <button
          onClick={handleTapTempo}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all active:scale-95 border border-gray-200"
        >
          <Hand size={18} />
          Tap
        </button>

        {/* Botão Play/Pause - AZUL */}
        <button
          onClick={togglePlay}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-95 ${
            isPlaying
              ? "bg-gray-700 hover:bg-gray-800 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          }`}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
      </div>

      {/* Presets de tempo */}
      <div className="flex flex-wrap justify-center gap-2">
        {[60, 80, 100, 120, 140, 160].map((tempo) => (
          <button
            key={tempo}
            onClick={() => setBpm(tempo)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              bpm === tempo
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
            }`}
          >
            {tempo}
          </button>
        ))}
      </div>
    </div>
  );
}
