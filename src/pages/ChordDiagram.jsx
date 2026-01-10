import React from 'react';

const ChordDiagram = ({ chordData }) => {
  if (!chordData) return null;

  const { frets } = chordData;
  // frets é um array tipo [-1, 3, 2, 0, 1, 0] (Corda E até e)
  
  // Configurações do desenho (tamanho, espaçamento)
  const width = 100;
  const height = 120;
  const numFrets = 5; // Quantas casas desenhar
  const numStrings = 6;
  const xOffset = 20; // Margem lateral
  const yOffset = 20; // Margem topo
  const stringSpacing = 12; // Espaço entre cordas
  const fretSpacing = 18; // Espaço entre casas

  // Função para desenhar bolinha (dedo)
  const renderDot = (stringIndex, fret) => {
    // stringIndex 0 é a corda grossa (E), desenhamos da esquerda pra direita
    const x = xOffset + stringIndex * stringSpacing;
    const y = yOffset + fret * fretSpacing - (fretSpacing / 2);
    return <circle key={`dot-${stringIndex}`} cx={x} cy={y} r="4" fill="#00aaff" />;
  };

  // Função para desenhar X (não toca) ou O (corda solta)
  const renderMarker = (stringIndex, type) => {
    const x = xOffset + stringIndex * stringSpacing;
    const y = yOffset - 8;
    
    if (type === 'x') {
      return <text key={`x-${stringIndex}`} x={x} y={y} textAnchor="middle" fill="#ff4444" fontSize="10" fontFamily="Arial">✕</text>;
    }
    return <circle key={`o-${stringIndex}`} cx={x} cy={y - 3} r="3" stroke="#fff" strokeWidth="1" fill="none" />;
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* 1. Desenha o Braço (Grid) */}
      <rect x={xOffset} y={yOffset} width={stringSpacing * 5} height={fretSpacing * numFrets} fill="#222" />
      
      {/* Linhas das cordas (Verticais) */}
      {[...Array(numStrings)].map((_, i) => (
        <line 
          key={`str-${i}`} 
          x1={xOffset + i * stringSpacing} y1={yOffset} 
          x2={xOffset + i * stringSpacing} y2={yOffset + fretSpacing * numFrets} 
          stroke="#666" strokeWidth="1" 
        />
      ))}

      {/* Linhas dos trastes (Horizontais) */}
      {[...Array(numFrets + 1)].map((_, i) => (
        <line 
          key={`fret-${i}`} 
          x1={xOffset} y1={yOffset + i * fretSpacing} 
          x2={xOffset + stringSpacing * 5} y2={yOffset + i * fretSpacing} 
          stroke="#888" strokeWidth="1" 
        />
      ))}

      {/* Pestana (Linha grossa no topo) */}
      <line x1={xOffset} y1={yOffset} x2={xOffset + stringSpacing * 5} y2={yOffset} stroke="#fff" strokeWidth="3" />

      {/* 2. Desenha os Dedos e Marcadores */}
      {frets.map((fret, stringIndex) => {
        if (fret === -1) return renderMarker(stringIndex, 'x'); // Não toca
        if (fret === 0) return renderMarker(stringIndex, 'o');  // Corda solta
        return renderDot(stringIndex, fret);                    // Dedo na casa
      })}
    </svg>
  );
};

export default ChordDiagram;