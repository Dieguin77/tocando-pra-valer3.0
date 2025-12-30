import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";

// Notas musicais - em português
const NOTES = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"];
const NOTE_LETTERS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function Tuner() {
  const [isListening, setIsListening] = useState(false);
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState(null);
  const [cents, setCents] = useState(0);
  const [error, setError] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  // Calcula a nota mais próxima da frequência
  const getNote = useCallback((freq) => {
    if (!freq || freq < 20 || freq > 5000) return null;

    // A4 = 440Hz como referência
    const A4 = 440;
    const semitonesFromA4 = 12 * Math.log2(freq / A4);
    const noteIndex = Math.round(semitonesFromA4) + 9; // A é índice 9
    const octave = Math.floor((noteIndex + 3) / 12) + 4;
    const noteInOctave = ((noteIndex % 12) + 12) % 12;

    // Cents (diferença em centésimos)
    const exactSemitones = semitonesFromA4 + 9;
    const roundedSemitones = Math.round(exactSemitones);
    const centsOff = Math.round((exactSemitones - roundedSemitones) * 100);

    return {
      name: NOTES[noteInOctave],
      letter: NOTE_LETTERS[noteInOctave],
      octave,
      cents: centsOff,
    };
  }, []);

  // Autocorrelação para detectar frequência (menos sensível)
  const autoCorrelate = useCallback((buffer, sampleRate) => {
    const SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / SIZE);

    // Threshold mais alto = menos sensível a ruídos
    if (rms < 0.06) return -1; // era 0.02, agora menos sensível

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

    const buf = buffer.slice(r1, r2);
    const c = new Array(buf.length).fill(0);

    for (let i = 0; i < buf.length; i++) {
      for (let j = 0; j < buf.length - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;

    let maxval = -1, maxpos = -1;
    for (let i = d; i < buf.length; i++) {
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
  }, []);

  // Loop de análise
  // Suavização do indicador de cents
  const analyze = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.fftSize;
    const buffer = new Float32Array(bufferLength);
    analyserRef.current.getFloatTimeDomainData(buffer);

    const freq = autoCorrelate(buffer, audioContextRef.current.sampleRate);

    if (freq > 0) {
      setFrequency(Math.round(freq));
      const noteData = getNote(freq);
      if (noteData) {
        setNote(noteData);
        // Suaviza a variação dos cents
        setCents(prev => prev === 0 ? noteData.cents : prev * 0.7 + noteData.cents * 0.3);
      }
    }

    animationRef.current = requestAnimationFrame(analyze);
  }, [autoCorrelate, getNote]);

  // Inicia o microfone
  const startListening = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      setIsListening(true);
      analyze();
    } catch (err) {
      setError("Não foi possível acessar o microfone. Verifique as permissões.");
      console.error(err);
    }
  };

  // Para o microfone
  const stopListening = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setFrequency(null);
    setNote(null);
    setCents(0);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  // Determina a cor do indicador baseado nos cents
  const getIndicatorColor = () => {
    if (!note) return "bg-gray-300";
    const absCents = Math.abs(cents);
    if (absCents <= 5) return "bg-green-500";
    if (absCents <= 15) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Texto de afinação
  const getTuningText = () => {
    if (!note) return "Toque uma nota";
    const absCents = Math.abs(cents);
    if (absCents <= 5) return "Afinado!";
    if (cents > 0) return "Muito alto";
    return "Muito baixo";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-md mx-auto">
      
      {/* Display da Nota */}
      <div className="text-center">
        <div className="text-8xl font-bold text-gray-900">
          {note ? note.name : "--"}
        </div>
        {note && (
          <div className="text-lg text-gray-500 mt-1">
            {note.letter}{note.octave}
          </div>
        )}
      </div>

      {/* Indicador de Afinação */}
      <div className="w-full max-w-xs">
        {/* Barra de cents */}
        <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Marcador central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 -translate-x-1/2 z-10" />
          
          {/* Indicador móvel */}
          {note && (
            <div
              className={`absolute top-0 bottom-0 w-4 rounded-full transition-all duration-150 ${getIndicatorColor()}`}
              style={{
                left: `calc(50% + ${(cents / 50) * 50}% - 8px)`,
              }}
            />
          )}
        </div>
        
        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>-50</span>
          <span>0</span>
          <span>+50</span>
        </div>
      </div>

      {/* Status de Afinação */}
      <div className={`text-lg font-medium ${
        !note ? "text-gray-400" :
        Math.abs(cents) <= 5 ? "text-green-600" :
        "text-gray-600"
      }`}>
        {getTuningText()}
      </div>

      {/* Frequência */}
      {frequency && (
        <div className="text-sm text-gray-500">
          {frequency} Hz
        </div>
      )}

      {/* Erro */}
      {error && (
        <div className="text-sm text-red-500 text-center px-4">
          {error}
        </div>
      )}

      {/* Botão Microfone */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all active:scale-95 ${
          isListening
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
        }`}
      >
        {isListening ? (
          <>
            <MicOff size={20} />
            Parar
          </>
        ) : (
          <>
            <Mic size={20} />
            Iniciar Afinador
          </>
        )}
      </button>

      {/* Dica */}
      <p className="text-xs text-gray-400 text-center max-w-xs">
        Toque uma corda do instrumento próximo ao microfone para ver a nota detectada.
      </p>
    </div>
  );
}
