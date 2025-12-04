import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", padding: "40px" }}>
      <h1 style={{ color: "var(--primary)" }}>Tocando Pra Valer</h1>

      <p style={{ color: "var(--text-muted)", maxWidth: "500px" }}>
        Bem-vindo ao Tocando Pra Valer!  
        Aqui você aprende músicas com cifras interativas, ajuste de tom e tamanho de letra.
      </p>

      <Link
        to="/musicas"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 20px",
          background: "var(--primary)",
          color: "#000",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Acessar músicas
      </Link>
    </div>
  );
}
