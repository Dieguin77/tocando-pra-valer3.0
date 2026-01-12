import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { musicas } from '../data/musicas';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_PT = {
  'C': 'Dó', 'C#': 'Dó#', 'D': 'Ré', 'D#': 'Ré#', 'E': 'Mi', 'F': 'Fá',
  'F#': 'Fá#', 'G': 'Sol', 'G#': 'Sol#', 'A': 'Lá', 'A#': 'Lá#', 'B': 'Si'
};

// Diagramas de acordes simples
const CHORD_DIAGRAMS = {
  'C': { frets: [0, 1, 0, 2, 3, 'x'], fingers: '0-1-0-2-3-x' },
  'D': { frets: [2, 3, 2, 0, 'x', 'x'], fingers: '2-3-2-0-x-x' },
  'E': { frets: [0, 0, 1, 2, 2, 0], fingers: '0-0-1-2-2-0' },
  'F': { frets: [1, 1, 2, 3, 3, 1], fingers: 'Pestana' },
  'G': { frets: [3, 0, 0, 0, 2, 3], fingers: '3-0-0-0-2-3' },
  'A': { frets: [0, 2, 2, 2, 0, 'x'], fingers: '0-2-2-2-0-x' },
  'B': { frets: [2, 4, 4, 4, 2, 'x'], fingers: 'Pestana 2' },
  'Am': { frets: [0, 1, 2, 2, 0, 'x'], fingers: '0-1-2-2-0-x' },
  'Em': { frets: [0, 0, 0, 2, 2, 0], fingers: '0-0-0-2-2-0' },
  'Dm': { frets: [1, 3, 2, 0, 'x', 'x'], fingers: '1-3-2-0-x-x' },
  'Cm': { frets: [3, 4, 5, 5, 3, 'x'], fingers: 'Pestana 3' },
  'F#m': { frets: [2, 2, 2, 4, 4, 2], fingers: 'Pestana 2' },
  'Bm': { frets: [2, 3, 4, 4, 2, 'x'], fingers: 'Pestana 2' },
};

function ChordDiagram({ chord }) {
  const diagram = CHORD_DIAGRAMS[chord];
  
  if (!diagram) {
    return (
      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-center">
        <span className="font-bold text-slate-800 dark:text-white">{chord}</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-center">
      <div className="font-bold text-slate-800 dark:text-white mb-2">{chord}</div>
      <div className="flex justify-center gap-1">
        {diagram.frets.map((fret, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
              fret === 'x'
                ? 'bg-red-400 text-white'
                : fret === 0
                ? 'bg-green-400 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {fret}
          </div>
        ))}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {diagram.fingers}
      </div>
    </div>
  );
}

export default function CifraView() {
  const { id } = useParams();
  const musica = musicas.find(m => m.id === id);
  const cifraRef = useRef(null);
  
  const [fontSize, setFontSize] = useState(16);
  const [transposition, setTransposition] = useState(0);
  const [showDiagrams, setShowDiagrams] = useState(true);

  if (!musica) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Cifra não encontrada
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            A cifra que você está procurando não existe.
          </p>
          <Link
            to="/cifras"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Voltar para Cifras
          </Link>
        </div>
      </div>
    );
  }

  const transposeChord = (chord) => {
    if (transposition === 0) return chord;
    
    const match = chord.match(/^([A-G]#?)(.*)$/);
    if (!match) return chord;
    
    const [, root, suffix] = match;
    const noteIndex = NOTES.indexOf(root);
    if (noteIndex === -1) return chord;
    
    const newIndex = (noteIndex + transposition + 12) % 12;
    return NOTES[newIndex] + suffix;
  };

  const transposeCifra = (cifra) => {
    if (transposition === 0) return cifra;
    
    return cifra.replace(/\b([A-G]#?)(m|maj|min|dim|aug|7|9|11|13|sus[24]?|add\d+)?\b/g, (match) => {
      return transposeChord(match);
    });
  };

  const getTransposedChords = () => {
    return musica.acordes.map(chord => transposeChord(chord));
  };

  const getCurrentTom = () => {
    if (transposition === 0) return musica.acordes[0];
    return transposeChord(musica.acordes[0]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
${musica.titulo}
${musica.artista}

Tom: ${getCurrentTom()}
Acordes: ${getTransposedChords().join(', ')}

${transposeCifra(musica.cifra)}

---
Gerado por Tocando Pra Valer - tocandopravaler.com.br
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${musica.titulo} - ${musica.artista}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-50 dark:bg-slate-900 print:bg-white print:pt-0">
      <div className="container-custom">
        {/* Navegação */}
        <Link
          to="/cifras"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6 print:hidden"
        >
          ← Voltar para Cifras
        </Link>

        {/* Cabeçalho da música */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 shadow-lg print:shadow-none print:rounded-none print:p-4">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Foto do artista */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl text-white print:hidden">
              🎤
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
                {musica.titulo}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                {musica.artista}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Tom: {getCurrentTom()}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  {musica.nivel}
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  {musica.categoria}
                </span>
              </div>
              
              {/* Aviso de direitos autorais */}
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ⚠️ Cifra para fins educacionais. Todos os direitos reservados aos compositores.
              </p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-6 shadow-lg print:hidden">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Modulação */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Tom:</span>
              <button
                onClick={() => setTransposition(t => t - 1)}
                className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-slate-800 dark:text-white">
                {transposition > 0 ? `+${transposition}` : transposition}
              </span>
              <button
                onClick={() => setTransposition(t => t + 1)}
                className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                +
              </button>
            </div>

            {/* Tamanho da fonte */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">Fonte:</span>
              <button
                onClick={() => setFontSize(s => Math.max(12, s - 2))}
                className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                A−
              </button>
              <span className="w-8 text-center text-sm text-slate-800 dark:text-white">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(s => Math.min(24, s + 2))}
                className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-600"
              >
                A+
              </button>
            </div>

            {/* Toggle diagramas */}
            <button
              onClick={() => setShowDiagrams(!showDiagrams)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showDiagrams
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white'
              }`}
            >
              {showDiagrams ? '🎸 Acordes' : '🎸 Acordes'}
            </button>

            {/* Ações */}
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium"
              >
                🖨️ Imprimir
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm font-medium"
              >
                ⬇️ Baixar TXT
              </button>
            </div>
          </div>
        </div>

        {/* Diagramas de acordes */}
        {showDiagrams && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-6 shadow-lg print:break-inside-avoid">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              Acordes Utilizados
            </h3>
            <div className="flex flex-wrap gap-3">
              {getTransposedChords().map((chord, index) => (
                <ChordDiagram key={index} chord={chord} />
              ))}
            </div>
          </div>
        )}

        {/* Cifra */}
        <div
          ref={cifraRef}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg print:shadow-none print:rounded-none"
        >
          <pre
            className="font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap overflow-x-auto print:text-black"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
          >
            {transposeCifra(musica.cifra)}
          </pre>
        </div>

        {/* Dicas */}
        {musica.dicas && musica.dicas.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mt-6 shadow-lg print:break-inside-avoid">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              💡 Dicas para Tocar
            </h3>
            <ul className="space-y-2">
              {musica.dicas.map((dica, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
                >
                  <span className="text-blue-500">•</span>
                  {dica}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Estilos de impressão */}
      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:text-black { color: black !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:pt-0 { padding-top: 0 !important; }
          .print\\:p-4 { padding: 1rem !important; }
          .print\\:break-inside-avoid { break-inside: avoid !important; }
          @page {
            margin: 1.5cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}
