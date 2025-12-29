import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Guitar, Activity, Waves, Zap } from "lucide-react";

// Notas musicais e suas frequências
const NOTES = [
  { name: "C", freq: 261.63 },
  { name: "C#", freq: 277.18 },
  { name: "D", freq: 293.66 },
  { name: "D#", freq: 311.13 },
  { name: "E", freq: 329.63 },
  { name: "F", freq: 349.23 },
  { name: "F#", freq: 369.99 },
  { name: "G", freq: 392.00 },
  { name: "G#", freq: 415.30 },
  { name: "A", freq: 440.00 },
  { name: "A#", freq: 466.16 },
  { name: "B", freq: 493.88 },
];

// Gera todas as notas de várias oitavas
const generateAllNotes = () => {
  const allNotes = [];
  for (let octave = 1; octave <= 7; octave++) {
    NOTES.forEach((note) => {
      const freq = note.freq * Math.pow(2, octave - 4);
      allNotes.push({
        name: note.name,
        octave,
        freq,
        fullName: `${note.name}${octave}`,
      });
    });
  }
  return allNotes;
};

const ALL_NOTES = generateAllNotes();

// Encontra a nota mais próxima de uma frequência
const findClosestNote = (frequency) => {
  if (!frequency || frequency < 20 || frequency > 5000) return null;

  let closestNote = null;
  let minDiff = Infinity;

  ALL_NOTES.forEach((note) => {
    const diff = Math.abs(note.freq - frequency);
    if (diff < minDiff) {
      minDiff = diff;
      closestNote = note;
    }
  });

  if (closestNote) {
    // Calcula cents (diferença em centésimos de semitom)
    const cents = 1200 * Math.log2(frequency / closestNote.freq);
    return { ...closestNote, cents: Math.round(cents), detectedFreq: frequency };
  }

  return null;
};

// Algoritmo de autocorrelação para detectar pitch
const autoCorrelate = (buffer, sampleRate) => {
  const SIZE = buffer.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i++) {
    rms += buffer[i] * buffer[i];
  }
  rms = Math.sqrt(rms / SIZE);

  // Se o sinal é muito fraco, retorna -1
  if (rms < 0.01) return -1;

  let r1 = 0, r2 = SIZE - 1;
  const threshold = 0.2;

  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i;
      break;
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  buffer = buffer.slice(r1, r2);
  const newSize = buffer.length;

  const c = new Array(newSize).fill(0);
  for (let i = 0; i < newSize; i++) {
    for (let j = 0; j < newSize - i; j++) {
      c[i] += buffer[j] * buffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;

  let maxval = -1, maxpos = -1;
  for (let i = d; i < newSize; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  // Interpolação parabólica
  const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 = T0 - b / (2 * a);

  return sampleRate / T0;
};

export default function Tuner() {
  const [isListening, setIsListening] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [permission, setPermission] = useState("prompt"); // prompt, granted, denied

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const rafIdRef = useRef(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setPermission("granted");

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      setIsListening(true);
      detectPitch();
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
      setPermission("denied");
    }
  };

  const stopListening = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setCurrentNote(null);
  };

  const detectPitch = () => {
    if (!analyserRef.current) return;

    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);

    const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);
    
    if (frequency > 0) {
      const note = findClosestNote(frequency);
      setCurrentNote(note);
    }

    rafIdRef.current = requestAnimationFrame(detectPitch);
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const getTuningStatus = () => {
    if (!currentNote) return { status: "waiting", color: "gray" };
    
    const cents = currentNote.cents;
    if (Math.abs(cents) <= 5) return { status: "Afinado! ✓", color: "green" };
    if (Math.abs(cents) <= 15) return { status: cents > 0 ? "Um pouco agudo ↑" : "Um pouco grave ↓", color: "yellow" };
    return { status: cents > 0 ? "Muito agudo ↑↑" : "Muito grave ↓↓", color: "red" };
  };

  const tuningStatus = getTuningStatus();

  // Componente de ondas de áudio animadas
  const AudioWaves = ({ isActive }) => (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-150"
          style={{
            height: isActive ? `${Math.random() * 100}%` : '20%',
            background: `linear-gradient(to top, #00f5ff, #bf00ff)`,
            animation: isActive ? `wave-animation 0.5s ease-in-out infinite` : 'none',
            animationDelay: `${i * 0.05}s`,
            boxShadow: isActive ? '0 0 10px rgba(0, 245, 255, 0.5)' : 'none',
          }}
        />
      ))}
    </div>
  );

  // Indicadores LED circulares
  const CircularLEDs = ({ cents }) => {
    const leds = 24;
    return (
      <div className="absolute inset-0">
        {[...Array(leds)].map((_, i) => {
          const angle = (i / leds) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const isActive = cents !== null && Math.abs((i - leds/2) * (100/leds) - cents) < 10;
          const ledColor = i < leds/3 ? '#ff4444' : i > (2*leds/3) ? '#ff4444' : i === Math.floor(leds/2) ? '#00ff88' : '#ffd000';
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full transition-all duration-100"
              style={{
                left: `calc(50% + ${Math.cos(rad) * 115}px - 4px)`,
                top: `calc(50% + ${Math.sin(rad) * 115}px - 4px)`,
                background: isActive || i === Math.floor(leds/2) ? ledColor : 'rgba(255,255,255,0.1)',
                boxShadow: isActive || i === Math.floor(leds/2) ? `0 0 10px ${ledColor}` : 'none',
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center gap-6 p-8 rounded-3xl max-w-lg mx-auto overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(10, 10, 25, 0.95), rgba(5, 5, 15, 0.98))',
        border: '1px solid rgba(0, 245, 255, 0.2)',
        boxShadow: '0 0 60px rgba(0, 245, 255, 0.1), inset 0 0 60px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Grid de fundo */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* Círculos decorativos animados */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #bf00ff, transparent)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #00f5ff, transparent)',
          animation: 'pulse 4s ease-in-out infinite 2s',
        }}
      />

      {/* Título High-Tech */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="p-3 rounded-xl" style={{ background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)' }}>
          <Guitar className="w-6 h-6" style={{ color: '#00f5ff' }} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wider">
            TUNER <span style={{ color: '#00f5ff' }}>PRO</span>
          </h2>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <Activity className="w-3 h-3" style={{ color: '#00ff88' }} />
            <span>FREQUENCY ANALYZER</span>
          </div>
        </div>
      </div>

      {/* Ondas de áudio */}
      <div className="w-full px-4 py-2 rounded-lg" style={{ background: 'rgba(0, 0, 0, 0.3)' }}>
        <AudioWaves isActive={isListening && currentNote} />
      </div>

      {/* Display principal circular */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* LEDs circulares */}
        <CircularLEDs cents={currentNote?.cents || null} />
        
        {/* Anel externo giratório */}
        <div 
          className="absolute inset-2 rounded-full"
          style={{
            border: '2px dashed rgba(0, 245, 255, 0.3)',
            animation: isListening ? 'rotate-slow 20s linear infinite' : 'none',
          }}
        />
        
        {/* Anel interno com gradiente */}
        <div 
          className="absolute inset-6 rounded-full"
          style={{
            background: 'linear-gradient(145deg, rgba(20, 20, 40, 0.8), rgba(10, 10, 25, 0.9))',
            border: `2px solid ${tuningStatus.color === "green" ? '#00ff88' : tuningStatus.color === "yellow" ? '#ffd000' : tuningStatus.color === "red" ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: currentNote ? `0 0 30px ${tuningStatus.color === "green" ? 'rgba(0, 255, 136, 0.3)' : tuningStatus.color === "yellow" ? 'rgba(255, 208, 0, 0.3)' : 'rgba(255, 68, 68, 0.3)'}` : 'none',
            transition: 'all 0.3s ease',
          }}
        />
        
        {/* Indicador de afinação radial */}
        {currentNote && (
          <div 
            className="absolute inset-10 rounded-full transition-all duration-200"
            style={{
              background: `conic-gradient(
                from ${180 + currentNote.cents * 1.5}deg,
                ${tuningStatus.color === "green" ? "#00ff88" : tuningStatus.color === "yellow" ? "#ffd000" : "#ff4444"} 0deg,
                transparent 30deg
              )`,
              opacity: 0.6,
              filter: 'blur(1px)',
            }}
          />
        )}

        {/* Centro com dados */}
        <div className="relative z-10 text-center">
          {currentNote ? (
            <>
              <div 
                className="text-7xl font-black tracking-tight"
                style={{ 
                  color: '#fff',
                  textShadow: `0 0 30px ${tuningStatus.color === "green" ? '#00ff88' : tuningStatus.color === "yellow" ? '#ffd000' : '#ff4444'}`,
                }}
              >
                {currentNote.name}
                <span className="text-3xl font-light" style={{ color: 'rgba(255,255,255,0.5)' }}>{currentNote.octave}</span>
              </div>
              
              {/* Display de frequência estilo LED */}
              <div 
                className="mt-2 px-4 py-1 rounded-lg inline-block"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                }}
              >
                <span 
                  className="font-mono text-lg tracking-widest"
                  style={{ 
                    color: '#00f5ff',
                    textShadow: '0 0 10px #00f5ff',
                  }}
                >
                  {currentNote.detectedFreq.toFixed(1)} Hz
                </span>
              </div>
              
              {/* Status com ícone */}
              <div className={`flex items-center justify-center gap-2 mt-3 text-sm font-bold uppercase tracking-wider`}>
                <Zap className="w-4 h-4" style={{ 
                  color: tuningStatus.color === "green" ? '#00ff88' : tuningStatus.color === "yellow" ? '#ffd000' : '#ff4444' 
                }} />
                <span style={{ 
                  color: tuningStatus.color === "green" ? '#00ff88' : tuningStatus.color === "yellow" ? '#ffd000' : '#ff4444' 
                }}>
                  {tuningStatus.status}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center">
              <Waves 
                className="w-12 h-12 mx-auto mb-3" 
                style={{ 
                  color: isListening ? '#00f5ff' : 'rgba(255,255,255,0.3)',
                  animation: isListening ? 'pulse 2s ease-in-out infinite' : 'none',
                }} 
              />
              <div style={{ color: 'rgba(255,255,255,0.5)' }} className="text-sm uppercase tracking-wider">
                {isListening ? "Aguardando sinal..." : "Iniciar análise"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Barra de cents estilo high-tech */}
      {currentNote && (
        <div className="w-full max-w-xs">
          <div 
            className="relative h-3 rounded-full overflow-hidden"
            style={{ 
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Marcador central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
            </div>
            
            {/* Gradiente de fundo */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: 'linear-gradient(90deg, #ff4444, #ffd000 45%, #00ff88 50%, #ffd000 55%, #ff4444)',
              }}
            />
            
            {/* Indicador móvel */}
            <div
              className="absolute top-0 h-full w-4 rounded-full transition-all duration-100"
              style={{
                left: `calc(50% + ${Math.max(-45, Math.min(45, currentNote.cents))}% - 8px)`,
                background: 'linear-gradient(to bottom, #fff, #00f5ff)',
                boxShadow: '0 0 15px #00f5ff',
              }}
            />
          </div>
          
          {/* Labels */}
          <div className="flex justify-between text-xs mt-2 font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span>-50¢</span>
            <span style={{ color: '#00ff88' }}>0</span>
            <span>+50¢</span>
          </div>
        </div>
      )}

      {/* Botão de controle futurista */}
      <button
        onClick={isListening ? stopListening : startListening}
        className="relative w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95"
        style={{
          background: isListening 
            ? 'linear-gradient(145deg, #ff4444, #cc0000)' 
            : 'linear-gradient(145deg, #00f5ff, #0088ff)',
          boxShadow: isListening 
            ? '0 0 30px rgba(255, 68, 68, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3)' 
            : '0 0 30px rgba(0, 245, 255, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {/* Anel animado do botão */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            border: isListening ? '2px solid rgba(255, 68, 68, 0.5)' : '2px solid rgba(0, 245, 255, 0.5)',
            animation: isListening ? 'pulse-neon 1.5s ease-in-out infinite' : 'none',
          }}
        />
        
        {isListening ? (
          <MicOff size={28} className="text-white relative z-10" />
        ) : (
          <Mic size={28} className="text-white relative z-10" />
        )}
      </button>

      {/* Mensagem de permissão negada */}
      {permission === "denied" && (
        <div 
          className="px-4 py-3 rounded-xl text-sm text-center"
          style={{
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            color: '#ff6666',
          }}
        >
          <strong>Acesso Negado</strong><br />
          Permita o acesso ao microfone nas configurações do navegador.
        </div>
      )}

      {/* Dica estilizada */}
      <p 
        className="text-sm text-center max-w-xs"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        Toque uma corda ou nota para análise automática de frequência.
      </p>

      {/* Referência de notas - cordas do violão */}
      <div className="flex flex-col items-center gap-3 mt-2 w-full">
        <div className="flex items-center gap-2">
          <Guitar className="w-4 h-4" style={{ color: '#00f5ff' }} />
          <span className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Cordas Padrão
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {["E2", "A2", "D3", "G3", "B3", "E4"].map((note, i) => (
            <span 
              key={note} 
              className="px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{
                background: 'rgba(0, 245, 255, 0.1)',
                border: '1px solid rgba(0, 245, 255, 0.3)',
                color: '#00f5ff',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{i + 1}.</span> {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
