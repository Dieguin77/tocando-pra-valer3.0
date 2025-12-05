import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png"; // Certifique-se de ter a imagem aqui!
import "./home.css";

export default function Home() {
  return (
    <div className="home-wrapper">
      
      {/* 1. MENU FLUTUANTE (GLASSMORPHISM) */}
      <nav className="glass-nav">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="Logo" />
          <span>Tocando Pra Valer</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/musicas" className="nav-link">Repertório</Link>
          <a href="#" className="nav-link">Sobre</a>
        </div>

        <Link to="/musicas" className="nav-cta">
          Acessar App
        </Link>
      </nav>

      {/* 2. HERO SECTION (TÍTULO DE IMPACTO) */}
      <header className="hero-container">
        <h1 className="hero-title">
          Revolucione a sua <br />
          <span className="gradient-text">Performance Musical</span>
        </h1>
        
        <p className="hero-subtitle">
          Cifras inteligentes com transposição automática, diagramas visuais em tempo real 
          e design imersivo. Feito para músicos exigentes.
        </p>

        <Link to="/musicas" className="main-cta-button">
          Começar Agora 🎸
        </Link>
      </header>

      {/* 3. GRID DE DIFERENCIAIS (WOW FACTOR) */}
      <section className="features-section">
        <div className="feature-box">
          <div className="feature-icon">🔄</div>
          <h3>Transposição Mágica</h3>
          <p>Mude o tom da música instantaneamente sem precisar recalcular acordes mentalmente.</p>
        </div>

        <div className="feature-box">
          <div className="feature-icon">🎸</div>
          <h3>Diagramas Dinâmicos</h3>
          <p>Esqueceu como faz o acorde? Passe o mouse e veja o diagrama neon flutuante.</p>
        </div>

        <div className="feature-box">
          <div className="feature-icon">⚡</div>
          <h3>Modo Performance</h3>
          <p>Interface escura e alto contraste projetada para uso em palcos e ambientes com pouca luz.</p>
        </div>
      </section>

      {/* 4. RODAPÉ (FOOTER) */}
      <footer className="site-footer">
        <span className="footer-logo">Tocando Pra Valer</span>
        <p>© 2025 Eliseu Marques de Oliveira & Diego Moraes. Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}