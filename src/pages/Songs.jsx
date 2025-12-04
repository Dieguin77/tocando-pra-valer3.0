import { useState } from "react";
import { Link } from "react-router-dom";
import { musicas } from "../data/musicas";

const notas = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

function transporAcorde(acorde, tom) {
  const match = acorde.match(/^([A-G]#?)(.*)$/);
  if (!match) return acorde;

  const nota = match[1];
  const sufixo = match[2];
  const posAtual = notas.indexOf(nota);
  if (posAtual === -1) return acorde;

  const novaPos = (posAtual + tom + notas.length) % notas.length;
  return notas[novaPos] + sufixo;
}

export default function Songs() {
  const [busca, setBusca] = useState("");
  const [tom, setTom] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [musicaSelecionada, setMusicaSelecionada] = useState(musicas[0]);

  function renderLetra() {
    if (!musicaSelecionada) return null;

    return musicaSelecionada.letra.split("\n").map((linha, i) => {
      const partes = linha.split(/(\[[^\]]+\])/g);

      return (
        <div key={i}>
          {partes.map((parte, index) => {
            if (parte.startsWith("[") && parte.endsWith("]")) {
              const acorde = parte.replace(/\[|\]/g, "");
              return (
                <strong key={index} style={{ color: "var(--primary)" }}>
                  [{transporAcorde(acorde, tom)}]
                </strong>
              );
            }
            return <span key={index}> {parte}</span>;
          })}
        </div>
      );
    });
  }

  const musicasFiltradas = musicas.filter((m) =>
    m.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    m.artista.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)" }}>
      {/* HEADER */}
      <header style={{ padding: "15px 20px", borderBottom: "1px solid #111", display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ color: "var(--primary)", textDecoration: "none" }}>
          Tocando Pra Valer
        </Link>

        <input
          placeholder="Buscar música..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            background: "#111",
            border: "1px solid #222",
            color: "#fff",
            padding: "8px 12px",
            borderRadius: "6px"
          }}
        />
      </header>

      <main style={{ padding: "20px", display: "grid", gap: "20px" }}>
        {/* LISTA */}
        <section>
          <h3 style={{ color: "var(--primary-light)" }}>Músicas</h3>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {musicasFiltradas.map(m => (
              <button
                key={m.id}
                onClick={() => { setMusicaSelecionada(m); setTom(0); }}
                style={{
                  background: musicaSelecionada.id === m.id ? "#111" : "var(--bg-card)",
                  border: musicaSelecionada.id === m.id ? "1px solid var(--primary)" : "1px solid #222",
                  color: "#fff",
                  padding: "8px 12px",
                  borderRadius: "6px"
                }}
              >
                {m.titulo}
              </button>
            ))}
          </div>
        </section>

        {/* CIFRA */}
        <section style={{ background: "var(--bg-card)", padding: "20px", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <div>
              <h2 style={{ color: "var(--primary-light)" }}>{musicaSelecionada.titulo}</h2>
              <p style={{ color: "var(--text-muted)" }}>{musicaSelecionada.artista}</p>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <div>
                <span>Tom</span><br />
                <button onClick={() => setTom(tom - 1)}>-</button>
                <span> {tom} </span>
                <button onClick={() => setTom(tom + 1)}>+</button>
              </div>

              <div>
                <span>Fonte</span><br />
                <button onClick={() => setFontSize(f => Math.max(12, f - 2))}>A-</button>
                <span> {fontSize}px </span>
                <button onClick={() => setFontSize(f => Math.min(32, f + 2))}>A+</button>
              </div>
            </div>
          </div>

          <div style={{ fontSize, lineHeight: "1.8" }}>
            {renderLetra()}
          </div>
        </section>
      </main>
    </div>
  );
}
