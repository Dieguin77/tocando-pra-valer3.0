import { Link } from "react-router-dom";
import "./home.css";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import EmojiIcon from "../components/EmojiIcon";

// --- IMPORTAÇÃO DAS IMAGENS ---
import imgAdolescente from "../assets/adolescente-tocando.jpg";
import imgCriancas from "../assets/crianças-tocando.jpg"; 
import imgHomem from "../assets/homem-tocando.jpg";
import imgIdosos from "../assets/idosos-tocando.jpg";
import imgLife from "../assets/life-violao.jpg";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Home() {
  const { theme } = useTheme(); // Removi toggleTheme pois ele já está no componente ThemeToggle
  
  // Dados da Galeria
  const fotosGaleria = [
    { id: 1, img: imgAdolescente, titulo: "Jovens Talentos" },
    { id: 2, img: imgCriancas, titulo: "Iniciação Musical" },
    { id: 3, img: imgHomem, titulo: "Prática Constante" },
    { id: 4, img: imgIdosos, titulo: "Música em Qualquer Idade" },
    { id: 5, img: imgLife, titulo: "Estilo de Vida" },
  ];

  // Dados dos Vídeos
  const videosDemonstracao = [
    { id: 1, title: "Escalas campo harmônico", youtubeId: "3CflnDOcuso" },
    { id: 2, title: "Aprenda Aleluia de Gabriela Rocha", youtubeId: "Sdxn1JWn6z0" },
    { id: 3, title: "Acordes menores e maiores no violão", youtubeId: "UGb-pvRd1ic" },
    { id: 4, title: "Tocando com aluno Gabriel", youtubeId: "KYkkP7mZyYU" },
    { id: 5, title: "Progressão em Samba", youtubeId: "oXkQ64mmwoE" },
    { id: 6, title: "O nosso General - Mini tutorial", youtubeId: "vijjN0QOUXw" },
  ];

  return (
    // 1. CORREÇÃO GLOBAL: Fundo escuro geral e texto branco no modo escuro
    <div className="page-container transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      
      {/* --- HERO SECTION --- */}
      <div className="home-wrapper">
        <nav className="glass-nav dark:bg-black/50 dark:text-white">
          <Link to="/" className="nav-logo text-white"> Tocando Pra Valer</Link>
          <div className="nav-links">
            <Link to="/musicas" className="nav-link text-white hover:text-orange-400">Repertório</Link>
            <Link to="/upload" className="nav-link text-white hover:text-orange-400">📤 Enviar Cifra</Link>
            <a href="#beneficios" className="nav-link text-white hover:text-orange-400">Benefícios</a>
            <a href="#videos" className="nav-link text-white hover:text-orange-400">Vídeos</a>
            <a href="#galeria" className="nav-link text-white hover:text-orange-400">Comunidade</a>
          </div>
          <Link to="/login" className="nav-cta">Área do Aluno</Link>
        </nav>

        <div className="hero-container">
          <h1 className="hero-title text-white">
            Domine o Instrumento e <br />
            <span className="gradient-text">Toque com Alma</span>
          </h1>
          <p className="hero-subtitle text-gray-200">
            Mais do que cifras: uma plataforma completa com inteligência musical para você evoluir do iniciante ao profissional.
          </p>
          <div className="hero-buttons">
            <Link to="/musicas" className="main-cta-button">
              Começar Agora 
            </Link>
            <a href="#beneficios" className="secondary-button text-white border-white hover:bg-white hover:text-black">
              Saber Mais
            </a>
          </div>
        </div>
      </div>

      {/* --- FAIXA DE DADOS --- */}
      {/* Adicionei dark:bg-gray-800 para a faixa não ficar branca */}
      <div className="stats-bar bg-orange-500 dark:bg-gray-800 text-white">
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

      {/* --- 2. AQUI ESTAVA O PROBLEMA DA FAIXA BRANCA --- */}
      {/* Adicionei 'bg-white dark:bg-gray-900' para trocar a cor */}
      <section id="beneficios" className="benefits-section py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="section-title dark:text-white">A Música Transforma Vidas</h2>
        <p className="section-subtitle dark:text-gray-300">O que a ciência diz sobre aprender um instrumento:</p>
        
        <div className="benefits-grid">
          {/* Card com fundo escuro mais suave (gray-800) */}
          <div className="benefit-card bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
            {/* O 'dark:text-white' aqui corrige os EMOJIS escuros */}
            <div className="benefit-icon text-4xl mb-4 dark:text-white"><EmojiIcon emoji="brain" size="xl" /></div>
            <h3 className="font-bold text-xl mb-2 dark:text-white">Poder Cerebral</h3>
            <p className="dark:text-gray-300">Aumenta a memória e a capacidade de foco em até 40%.</p>
          </div>
          
          <div className="benefit-card bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
            <div className="benefit-icon text-4xl mb-4 dark:text-white"><EmojiIcon emoji="smile" size="xl" /></div>
            <h3 className="font-bold text-xl mb-2 dark:text-white">Zero Estresse</h3>
            <p className="dark:text-gray-300">Tocar reduz o cortisol instantaneamente.</p>
          </div>
          
          <div className="benefit-card bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all">
            <div className="benefit-icon text-4xl mb-4 dark:text-white"><EmojiIcon emoji="users" size="xl" /></div>
            <h3 className="font-bold text-xl mb-2 dark:text-white">Conexão Social</h3>
            <p className="dark:text-gray-300">Quem toca nunca está sozinho. A música une pessoas.</p>
          </div>
        </div>
      </section>

      {/* --- FUNCIONALIDADES --- */}
      {/* Fundo levemente diferente para contraste */}
      <section className="features-section py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="feature-content">
          <h2 className="dark:text-white">Tecnologia a favor da sua Arte</h2>
          <ul className="feature-list mt-4 space-y-4">
            <li className="flex items-center gap-2 dark:text-gray-300">
                <span className="dark:text-white"><EmojiIcon emoji="music" size="md" /></span> 
                <strong>Transposição Inteligente:</strong> Mude o tom com um clique.
            </li>
            <li className="flex items-center gap-2 dark:text-gray-300">
                <span className="dark:text-white"><EmojiIcon emoji="eye" size="md" /></span> 
                <strong>Diagramas Interativos:</strong> Veja o acorde exato no braço.
            </li>
            <li className="flex items-center gap-2 dark:text-gray-300">
                <span className="dark:text-white"><EmojiIcon emoji="play" size="md" /></span> 
                <strong>Modo Palco:</strong> Design limpo para tocar ao vivo.
            </li>
          </ul>
        </div>
        <div className="feature-image">
           <img src={imgHomem} alt="Músico usando o app" className="rounded-lg shadow-xl" />
        </div>
      </section>

      {/* --- VÍDEOS --- */}
      <section id="videos" className="videos-section py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="section-title dark:text-white">Veja na Prática</h2>
        <p className="section-subtitle dark:text-gray-300">Assista a demonstrações exclusivas.</p>
        
        <div className="videos-grid">
          {videosDemonstracao.map((video) => (
            <div key={video.id} className="video-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="video-container">
                <iframe 
                  src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                  title={video.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
              </div>
              <h3 className="p-4 font-semibold dark:text-white">{video.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* --- GALERIA --- */}
      <div id="galeria" className="gallery-section py-16 bg-gray-50 dark:bg-gray-950">
        <h2 className="gallery-title dark:text-white mb-8 text-center text-3xl font-bold">Nossa Comunidade</h2>
        <div className="gallery-grid">
          {fotosGaleria.map((item) => (
            <div key={item.id} className="gallery-card relative group">
              <img src={item.img} alt={item.titulo} className="w-full h-full object-cover rounded-lg" />
              <div className="card-overlay absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <span className="text-white font-bold">{item.titulo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CTA FINAL --- */}
      <div className="final-cta bg-orange-600 py-20 text-center text-white dark:bg-orange-800">
        <h2 className="text-3xl font-bold mb-6">Pronto para elevar seu nível?</h2>
        <Link to="/musicas" className="cta-button-large bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
          Acessar Acervo Agora
        </Link>
      </div>

      {/* --- FOOTER --- */}
      <footer className="site-footer bg-gray-900 text-white py-12 dark:bg-black">
        <div className="footer-content text-center">
          <h3 className="footer-title text-2xl font-bold mb-4">Vamos tocar juntos?</h3>
          <p className="mb-6 text-gray-400">Siga nossas redes e entre em contato direto.</p>
          
          <div className="social-buttons-container flex justify-center gap-4 mb-8">
            <a 
              href="https://www.instagram.com/tocandopravaler" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-social btn-instagram flex items-center gap-2 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              <FaInstagram /> Instagram
            </a>

            <a 
              href="https://wa.me/55999941669" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-social btn-whatsapp flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <FaWhatsapp /> WhatsApp
            </a>

            <a 
              href="https://www.youtube.com/@TocandoPraValer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-social btn-youtube flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <FaYoutube /> YouTube
            </a>
          </div>

          <div className="footer-copyright text-gray-500 text-sm">
            <p>© 2025 Tocando Pra Valer. Desenvolvido por Diego Gomes.</p>
          </div>
        </div>
      </footer>

      {/* Botão de Tema Flutuante */}
      <div className="fixed bottom-4 right-4 z-50">
         <ThemeToggle />
      </div>

    </div>
  );
}