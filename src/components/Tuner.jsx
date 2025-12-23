import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff, Guitar } from "lucide-react";

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

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md mx-auto">
      
      {/* Título */}
      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
        <Guitar className="text-orange-500" /> Afinador
      </h2>

      {/* Display principal */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Círculo de fundo */}
        <div className="absolute inset-0 rounded-full bg-slate-700/50 border-4 border-slate-600" />
        
        {/* Indicador de afinação */}
        {currentNote && (
          <div 
            className="absolute inset-4 rounded-full transition-all duration-200"
            style={{
              background: `conic-gradient(
                from ${180 + currentNote.cents * 1.5}deg,
                ${tuningStatus.color === "green" ? "#22c55e" : tuningStatus.color === "yellow" ? "#eab308" : "#ef4444"} 0deg,
                transparent 30deg
              )`,
              opacity: 0.5,
            }}
          />
        )}

        {/* Centro com nota */}
        <div className="relative z-10 text-center">
          {currentNote ? (
            <>
              <div className="text-6xl font-bold text-white">
                {currentNote.name}
                <span className="text-2xl text-gray-400">{currentNote.octave}</span>
              </div>
              <div className="text-lg text-gray-400 mt-1">
                {currentNote.detectedFreq.toFixed(1)} Hz
              </div>
              <div className={`text-sm font-medium mt-2 ${
                tuningStatus.color === "green" ? "text-green-500" :
                tuningStatus.color === "yellow" ? "text-yellow-500" : "text-red-500"
              }`}>
                {tuningStatus.status}
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-lg">
              {isListening ? "Toque uma nota..." : "Clique para iniciar"}
            </div>
          )}
        </div>
      </div>

      {/* Indicador de cents */}
      {currentNote && (
        <div className="w-full max-w-xs">
          <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-full bg-green-500" />
            </div>
            <div
              className="absolute top-0 h-full w-3 bg-white rounded-full transition-all duration-100 shadow-lg"
              style={{
                left: `calc(50% + ${Math.max(-48, Math.min(48, currentNote.cents))}% - 6px)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-50¢</span>
            <span>0</span>
            <span>+50¢</span>
          </div>
        </div>
      )}

      {/* Botão de controle */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all active:scale-95 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30 animate-pulse"
            : "bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30"
        }`}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </button>

      {/* Mensagem de permissão negada */}
      {permission === "denied" && (
        <div className="text-red-400 text-sm text-center">
          Permissão de microfone negada. <br />
          Por favor, permita o acesso ao microfone nas configurações do navegador.
        </div>
      )}

      {/* Dica */}
      <p className="text-gray-500 text-sm text-center max-w-xs">
        Toque uma corda ou nota e o afinador detectará automaticamente. 
        O indicador verde significa que está afinado!
      </p>

      {/* Referência de notas padrão */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        <span className="text-xs text-gray-500">Cordas do violão:</span>
        {["E2", "A2", "D3", "G3", "B3", "E4"].map((note) => (
          <span key={note} className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300">
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}
