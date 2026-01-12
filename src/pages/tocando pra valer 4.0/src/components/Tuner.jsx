import { useState, useEffect, useRef } from 'react';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_PT = {
  'C': 'Dó', 'C#': 'Dó#', 'D': 'Ré', 'D#': 'Ré#', 'E': 'Mi', 'F': 'Fá',
  'F#': 'Fá#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'Lá', 'A#': 'Lá#', 'B': 'Si'
};

const GUITAR_STRINGS = [
  { note: 'E', octave: 4, name: '1ª corda (Mi agudo)' },
  { note: 'B', octave: 3, name: '2ª corda (Si)' },
  { note: 'G', octave: 3, name: '3ª corda (Sol)' },
  { note: 'D', octave: 3, name: '4ª corda (Ré)' },
  { note: 'A', octave: 2, name: '5ª corda (Lá)' },
  { note: 'E', octave: 2, name: '6ª corda (Mi grave)' },
];

export default function Tuner() {
  const [isListening, setIsListening] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [currentFreq, setCurrentFreq] = useState(0);
  const [cents, setCents] = useState(0);
  const [selectedString, setSelectedString] = useState(null);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const animationRef = useRef(null);

  const getFrequencyFromNote = (note, octave) => {
    const noteIndex = NOTES.indexOf(note);
    const a4 = 440;
    const a4NoteIndex = NOTES.indexOf('A');
    const a4Octave = 4;
    const halfSteps = (octave - a4Octave) * 12 + (noteIndex - a4NoteIndex);
    return a4 * Math.pow(2, halfSteps / 12);
  };

  const getNoteFromFrequency = (frequency) => {
    if (frequency < 20 || frequency > 5000) return null;
    
    const a4 = 440;
    const halfSteps = 12 * Math.log2(frequency / a4);
    const roundedHalfSteps = Math.round(halfSteps);
    const cents = Math.round((halfSteps - roundedHalfSteps) * 100);
    
    const noteIndex = ((roundedHalfSteps % 12) + 12 + 9) % 12;
    const octave = Math.floor((roundedHalfSteps + 9) / 12) + 4;
    
    return {
      note: NOTES[noteIndex],
      octave,
      cents,
      frequency
    };
  };

  const autoCorrelate = (buffer, sampleRate) => {
    const SIZE = buffer.length;
    let rms = 0;
    
    for (let i = 0; i < SIZE; i++) {
      rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / SIZE);
    
    if (rms < 0.01) return -1;
    
    let r1 = 0, r2 = SIZE - 1;
    const threshold = 0.2;
    
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < threshold) { r2 = SIZE - i; break; }
    }
    
    const buf2 = buffer.slice(r1, r2);
    const c = new Array(buf2.length).fill(0);
    
    for (let i = 0; i < buf2.length; i++) {
      for (let j = 0; j < buf2.length - i; j++) {
        c[i] += buf2[j] * buf2[j + i];
      }
    }
    
    let d = 0;
    while (c[d] > c[d + 1]) d++;
    
    let maxVal = -1, maxPos = -1;
    for (let i = d; i < buf2.length; i++) {
      if (c[i] > maxVal) {
        maxVal = c[i];
        maxPos = i;
      }
    }
    
    return sampleRate / maxPos;
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setIsListening(true);
      detectPitch();
    } catch (err) {
      console.error('Erro ao acessar microfone:', err);
      alert('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };

  const stopListening = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListening(false);
    setCurrentNote(null);
    setCurrentFreq(0);
    setCents(0);
  };

  const detectPitch = () => {
    if (!analyserRef.current) return;
    
    const buffer = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buffer);
    
    const frequency = autoCorrelate(buffer, audioContextRef.current.sampleRate);
    
    if (frequency > 0) {
      const noteData = getNoteFromFrequency(frequency);
      if (noteData) {
        setCurrentNote(noteData.note);
        setCurrentFreq(Math.round(frequency));
        setCents(noteData.cents);
      }
    }
    
    animationRef.current = requestAnimationFrame(detectPitch);
  };

  const playReferenceNote = (note, octave) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = getFrequencyFromNote(note, octave);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
    
    setSelectedString({ note, octave });
    setTimeout(() => setSelectedString(null), 1500);
  };

  useEffect(() => {
    return () => stopListening();
  }, []);

  const getTuningStatus = () => {
    if (!currentNote) return { text: 'Aguardando...', color: 'text-slate-500' };
    if (Math.abs(cents) <= 5) return { text: 'Afinado!', color: 'text-green-500' };
    if (cents > 0) return { text: 'Muito alto ↓', color: 'text-orange-500' };
    return { text: 'Muito baixo ↑', color: 'text-orange-500' };
  };

  const status = getTuningStatus();

  return (
    <div id="tuner" className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">
        🎸 Afinador
      </h2>

      {/* Display da nota */}
      <div className="text-center mb-6">
        <div className="text-7xl font-bold text-slate-800 dark:text-white mb-2">
          {currentNote ? NOTE_NAMES_PT[currentNote] : '—'}
        </div>
        {currentNote && (
          <div className="text-slate-500 dark:text-slate-400 text-sm">
            {currentFreq} Hz
          </div>
        )}
      </div>

      {/* Indicador de afinação */}
      <div className="mb-6">
        <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-full bg-green-500" />
          </div>
          {currentNote && (
            <div
              className="absolute top-0 h-full w-3 bg-blue-500 rounded-full transition-all duration-100"
              style={{
                left: `calc(50% + ${cents}% - 6px)`,
                transform: `translateX(${cents * 2}px)`
              }}
            />
          )}
        </div>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
          <span>♭ Baixo</span>
          <span className={`font-semibold ${status.color}`}>{status.text}</span>
          <span>Alto ♯</span>
        </div>
      </div>

      {/* Botão de escuta */}
      <button
        onClick={isListening ? stopListening : startListening}
        className={`w-full py-4 rounded-xl font-bold text-lg mb-6 transition-all ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isListening ? '⏹ Parar' : '🎤 Iniciar Afinação'}
      </button>

      {/* Cordas do violão */}
      <div>
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
          Notas de referência (toque para ouvir):
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {GUITAR_STRINGS.map((string, index) => (
            <button
              key={index}
              onClick={() => playReferenceNote(string.note, string.octave)}
              className={`p-3 rounded-lg text-left transition-all ${
                selectedString?.note === string.note && selectedString?.octave === string.octave
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <div className="font-bold">{NOTE_NAMES_PT[string.note]}</div>
              <div className="text-xs opacity-70">{string.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
