import { Link } from "react-router-dom";
import "./home.css";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import EmojiIcon from "../components/EmojiIcon";

// --- IMPORTAÇÃO DAS IMAGENS (Nomes exatos da sua pasta) ---
import imgAdolescente from "../assets/adolescente-tocando.jpg";
import imgCriancas from "../assets/crianças-tocando.jpg"; 
import imgHomem from "../assets/homem-tocando.jpg";
import imgIdosos from "../assets/idosos-tocando.jpg";
import imgLife from "../assets/life-violao.jpg";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  
  // Dados da Galeria de Fotos
  const fotosGaleria = [
    { id: 1, img: imgAdolescente, titulo: "Jovens Talentos" },
    { id: 2, img: imgCriancas, titulo: "Iniciação Musical" },
    { id: 3, img: imgHomem, titulo: "Prática Constante" },
    { id: 4, img: imgIdosos, titulo: "Música em Qualquer Idade" },
    { id: 5, img: imgLife, titulo: "Estilo de Vida" },
  ];

  // --- DADOS DOS VÍDEOS (Exemplos) ---
  const videosDemonstracao = [
    { id: 1, title: "Escalas campo harmônico", youtubeId: "3CflnDOcuso" },
    { id: 2, title: "Aprenda Aleluia de Gabriela Rocha", youtubeId: "Sdxn1JWn6z0" },
    { id: 3, title: "Acordes menores e maiores no violão", youtubeId: "UGb-pvRd1ic" },
    { id: 4, title: "Tocando com aluno Gabriel", youtubeId: "KYkkP7mZyYU" },
    { id: 5, title: "Progressão em Samba", youtubeId: "oXkQ64mmwoE" },
    { id: 6, title: "O nosso General - Mini tutorial", youtubeId: "vijjN0QOUXw" },
  ];

  return (
    <div className="page-container">
      
      {/* --- 1. HERO SECTION (Topo) --- */}
      <div className="home-wrapper">
        <nav className="glass-nav">
          <Link to="/" className="nav-logo"> Tocando Pra Valer</Link>
          <div className="nav-links">
            <Link to="/musicas" className="nav-link">Repertório</Link>
            <a href="#beneficios" className="nav-link">Benefícios</a>
            <a href="#videos" className="nav-link">Vídeos</a>
            <a href="#galeria" className="nav-link">Comunidade</a>
          </div>
          <Link to="/login" className="nav-cta">Área do Aluno</Link>
        </nav>

        <div className="hero-container">
          <h1 className="hero-title">
            Domine o Instrumento e <br />
            <span className="gradient-text">Toque com Alma</span>
          </h1>
          <p className="hero-subtitle">
            Mais do que cifras: uma plataforma completa com inteligência musical para você evoluir do iniciante ao profissional.
          </p>
          <div className="hero-buttons">
            <Link to="/musicas" className="main-cta-button">
              Começar Agora 
            </Link>
            <a href="#beneficios" className="secondary-button">
              Saber Mais
            </a>
          </div>
        </div>
      </div>

      {/* --- 2. FAIXA DE DADOS (Autoridade) --- */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">+1.000</span>
          <span className="stat-label">Músicas Cifradas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">100%</span>
          <span className="stat-label">Precisão Musical</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24h</span>
          <span className="stat-label">Acesso Ilimitado</span>
        </div>
      </div>

      {/* --- 3. POR QUE TOCAR? --- */}
      <section id="beneficios" className="benefits-section">
        <h2 className="section-title">A Música Transforma Vidas</h2>
        <p className="section-subtitle">O que a ciência diz sobre aprender um instrumento:</p>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon"><EmojiIcon emoji="brain" size="xl" /></div>
            <h3>Poder Cerebral</h3>
            <p>Aumenta a memória e a capacidade de foco em até 40%.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><EmojiIcon emoji="smile" size="xl" /></div>
            <h3>Zero Estresse</h3>
            <p>Tocar reduz o cortisol instantaneamente.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon"><EmojiIcon emoji="users" size="xl" /></div>
            <h3>Conexão Social</h3>
            <p>Quem toca nunca está sozinho. A música une pessoas.</p>
          </div>
        </div>
      </section>

      {/* --- 4. FUNCIONALIDADES --- */}
      <section className="features-section">
        <div className="feature-content">
          <h2>Tecnologia a favor da sua Arte</h2>
          <ul className="feature-list">
            <li><strong><EmojiIcon emoji="music" size="md" /> Transposição Inteligente:</strong> Mude o tom com um clique.</li>
            <li><strong><EmojiIcon emoji="eye" size="md" /> Diagramas Interativos:</strong> Veja o acorde exato no braço.</li>
            <li><strong><EmojiIcon emoji="play" size="md" /> Modo Palco:</strong> Design limpo para tocar ao vivo.</li>
          </ul>
        </div>
        <div className="feature-image">
           <img src={imgHomem} alt="Músico usando o app" />
        </div>
      </section>

      {/* --- 5. SEÇÃO DE VÍDEOS (NOVO) --- */}
      <section id="videos" className="videos-section">
        <h2 className="section-title">Veja na Prática</h2>
        <p className="section-subtitle">Assista a demonstrações exclusivas.</p>
        
        <div className="videos-grid">
          {videosDemonstracao.map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-container">
                <iframe 
                  src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <h3>{video.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --- 6. GALERIA --- */}
      <div id="galeria" className="gallery-section">
        <h2 className="gallery-title">Nossa Comunidade</h2>
        <div className="gallery-grid">
          {fotosGaleria.map((item) => (
            <div key={item.id} className="gallery-card">
              <img src={item.img} alt={item.titulo} />
              <div className="card-overlay">
                <span>{item.titulo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 7. CTA FINAL --- */}
      <div className="final-cta">
        <h2>Pronto para elevar seu nível?</h2>
        <Link to="/musicas" className="cta-button-large">
          Acessar Acervo Agora
        </Link>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <h3 className="footer-title">Vamos tocar juntos?</h3>
          <p>Siga nossas redes e entre em contato direto.</p>
          
          <div className="social-buttons-container">
            {/* Botão Instagram */}
            <a 
              href="https://www.instagram.com/tocandopravaler" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-social btn-instagram"
            >
              <FaInstagram /> Instagram
            </a>

            {/* Botão WhatsApp */}
            <a 
              href="https://wa.me/55999941669" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-social btn-whatsapp"
            >
              <FaWhatsapp /> WhatsApp
            </a>

            {/* Botão YouTube */}
            <a 
              href="https://www.youtube.com/@TocandoPraValer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-social btn-youtube"
            >
              <FaYoutube /> YouTube
            </a>
          </div>

          <div className="footer-copyright">
            <p>© 2025 Tocando Pra Valer. Desenvolvido por Diego Gomes.</p>
          </div>
        </div>
      </footer>

      {/* Botão de Tema Flutuante */}
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

    </div>
  );
}