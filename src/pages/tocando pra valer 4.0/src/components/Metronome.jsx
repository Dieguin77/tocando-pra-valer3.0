import { useState, useEffect, useRef, useCallback } from 'react';

export default function Metronome() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [currentBeat, setCurrentBeat] = useState(0);
  const [tapTimes, setTapTimes] = useState([]);
  
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);
  const metronomeRef = useRef(null);

  const getBeatsPerMeasure = () => {
    const [beats] = timeSignature.split('/');
    return parseInt(beats);
  };

  const playClick = useCallback((isAccent = false) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = isAccent ? 1000 : 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }, []);

  const startMetronome = useCallback(() => {
    if (intervalRef.current) return;
    
    const [beats] = timeSignature.split('/');
    const beatsPerMeasure = parseInt(beats);
    let beat = 0;
    
    const interval = (60 / bpm) * 1000;
    
    const tick = () => {
      const isAccent = beat === 0;
      playClick(isAccent);
      setCurrentBeat(beat);
      beat = (beat + 1) % beatsPerMeasure;
    };
    
    tick();
    intervalRef.current = setInterval(tick, interval);
  }, [bpm, playClick, timeSignature]);

  const stopMetronome = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentBeat(0);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTap = () => {
    const now = Date.now();
    const newTapTimes = [...tapTimes, now].slice(-4);
    setTapTimes(newTapTimes);
    
    if (newTapTimes.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTapTimes.length; i++) {
        intervals.push(newTapTimes[i] - newTapTimes[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgInterval);
      if (calculatedBpm >= 20 && calculatedBpm <= 300) {
        setBpm(calculatedBpm);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bpm, timeSignature]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const adjustBpm = (amount) => {
    const newBpm = Math.max(20, Math.min(300, bpm + amount));
    setBpm(newBpm);
  };

  const beatsPerMeasure = getBeatsPerMeasure();

  return (
    <div 
      ref={metronomeRef}
      id="metronome"
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">
        🎵 Metrônomo
      </h2>

      {/* Indicador de batidas */}
      <div className="flex justify-center gap-2 mb-6">
        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-100 ${
              currentBeat === i && isPlaying
                ? i === 0
                  ? 'bg-red-500 scale-125'
                  : 'bg-blue-500 scale-125'
                : 'bg-slate-300 dark:bg-slate-600'
            }`}
          />
        ))}
      </div>

      {/* Display BPM */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-slate-800 dark:text-white mb-2">
          {bpm}
        </div>
        <div className="text-slate-500 dark:text-slate-400 text-sm">BPM</div>
      </div>

      {/* Controles de BPM */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => adjustBpm(-1)}
          className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-2xl font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          −
        </button>
        <input
          type="range"
          min="20"
          max="300"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
          className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <button
          onClick={() => adjustBpm(1)}
          className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-2xl font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          +
        </button>
      </div>

      {/* Seletor de compasso */}
      <div className="flex justify-center gap-2 mb-6">
        {['2/4', '3/4', '4/4'].map((sig) => (
          <button
            key={sig}
            onClick={() => setTimeSignature(sig)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              timeSignature === sig
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {sig}
          </button>
        ))}
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col gap-3">
        <button
          onClick={togglePlay}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isPlaying ? '⏹ Parar' : '▶ Iniciar'}
        </button>
        
        <button
          onClick={handleTap}
          className="w-full py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          🎯 Marcar Tempo (Tap)
        </button>
      </div>
    </div>
  );
}
