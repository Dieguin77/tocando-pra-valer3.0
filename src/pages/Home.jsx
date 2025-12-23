import { Link } from "react-router-dom";
import "./home.css";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import EmojiIcon from "../components/EmojiIcon";
import { Globe, Upload, Instagram, MessageCircle, Youtube, Music } from "lucide-react";

// --- IMPORTAÇÃO DAS IMAGENS ---
import imgAdolescente from "../assets/adolescente-tocando.jpg";
import imgCriancas from "../assets/crianças-tocando.jpg"; 
import imgHomem from "../assets/homem-tocando.jpg";
import imgIdosos from "../assets/idosos-tocando.jpg";
import imgLife from "../assets/life-violao.jpg";

export default function Home() {
  const { theme } = useTheme();

  const fotosGaleria = [
    { id: 1, img: imgAdolescente, titulo: "Jovens Talentos" },
    { id: 2, img: imgCriancas, titulo: "Iniciação Musical" },
    { id: 3, img: imgHomem, titulo: "Prática Constante" },
    { id: 4, img: imgIdosos, titulo: "Música em Qualquer Idade" },
    { id: 5, img: imgLife, titulo: "Estilo de Vida" },
  ];

  const videosDemonstracao = [
    { id: 1, title: "Escalas campo harmônico", youtubeId: "3CflnDOcuso" },
    { id: 2, title: "Aprenda Aleluia", youtubeId: "Sdxn1JWn6z0" },
    { id: 3, title: "Acordes menores e maiores", youtubeId: "UGb-pvRd1ic" },
    { id: 4, title: "Tocando com aluno Gabriel", youtubeId: "KYkkP7mZyYU" },
    { id: 5, title: "Progressão em Samba", youtubeId: "oXkQ64mmwoE" },
    { id: 6, title: "O nosso General", youtubeId: "vijjN0QOUXw" },
  ];

  return (
    // overflow-x-hidden: Impede que o site balance para os lados no celular
    <div className="page-container transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100 overflow-x-hidden w-full">
      
      {/* --- HERO SECTION --- */}
      <div className="home-wrapper relative">
        
        {/* NAV: flex-col no celular (empilhado) -> md:flex-row no PC (lado a lado) */}
        <nav className="glass-nav dark:bg-black/50 dark:text-white flex flex-col md:flex-row items-center justify-between p-3 md:p-4 gap-2 md:gap-4">
          <Link to="/" className="nav-logo text-white text-lg md:text-xl font-bold"> Tocando Pra Valer</Link>
          
          {/* Links: flex-wrap permite que quebrem linha se a tela for muito pequena */}
          <div className="nav-links flex flex-wrap justify-center gap-2 md:gap-4 text-center text-sm">
            <Link to="/busca-global" className="nav-link text-yellow-300 hover:text-yellow-400 font-bold flex items-center gap-1">
              <Globe size={14} /> Busca Vagalume
            </Link>
  {/* ----------------------------------- */}
            <Link to="/musicas" className="nav-link text-white hover:text-orange-400">Repertório</Link>
            <Link to="/upload" className="nav-link text-white hover:text-orange-400 flex items-center gap-1">
              <Upload size={14} /> Enviar Cifra
            </Link>
            <a href="#beneficios" className="nav-link text-white hover:text-orange-400 hidden sm:block">Benefícios</a>
            <a href="#videos" className="nav-link text-white hover:text-orange-400 hidden sm:block">Vídeos</a>
            <a href="#galeria" className="nav-link text-white hover:text-orange-400 hidden md:block">Comunidade</a>
          </div>
          
          <Link to="/login" className="nav-cta bg-orange-600 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-sm hover:bg-orange-700 transition">Área do Aluno</Link>
        </nav>

        <div className="hero-container flex flex-col items-center justify-center text-center px-4 mt-8 md:mt-0">
          <h1 className="hero-title text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Domine o Instrumento e <br />
            <span className="gradient-text text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Toque com Alma</span>
          </h1>
          <p className="hero-subtitle text-gray-200 text-base md:text-xl max-w-2xl mt-4 mb-8">
            Mais do que cifras: uma plataforma completa com inteligência musical para você evoluir do iniciante ao profissional.
          </p>
          
          {/* Botões empilhados no celular, lado a lado no PC */}
          <div className="hero-buttons flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Link to="/musicas" className="main-cta-button bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-orange-700 text-center">
              Começar Agora 
            </Link>
            <a href="#beneficios" className="secondary-button text-white border-2 border-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-black transition text-center">
              Saber Mais
            </a>
          </div>
        </div>
      </div>

      {/* --- FAIXA DE DADOS --- */}
      {/* Flex-col no celular para empilhar os números */}
      <div className="stats-bar bg-orange-500 dark:bg-gray-800 text-white py-8 flex flex-col md:flex-row justify-center md:justify-around gap-8 text-center px-4">
        <div className="stat-item">
          <span className="stat-number text-3xl md:text-4xl font-bold block">+1.000</span>
          <span className="stat-label text-sm uppercase">Músicas Cifradas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number text-3xl md:text-4xl font-bold block">100%</span>
          <span className="stat-label text-sm uppercase">Precisão Musical</span>
        </div>
        <div className="stat-item">
          <span className="stat-number text-3xl md:text-4xl font-bold block">24h</span>
          <span className="stat-label text-sm uppercase">Acesso Ilimitado</span>
        </div>
      </div>

      {/* --- BENEFÍCIOS --- */}
      <section id="beneficios" className="benefits-section py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
            <h2 className="section-title dark:text-white text-3xl font-bold text-center mb-2">A Música Transforma Vidas</h2>
            <p className="section-subtitle dark:text-gray-300 text-center text-gray-600 mb-12">O que a ciência diz sobre aprender um instrumento:</p>
            
            {/* GRID RESPONSIVO: 1 coluna no celular (grid-cols-1), 3 no PC (md:grid-cols-3) */}
            <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="benefit-card bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:-translate-y-1">
                <div className="benefit-icon text-4xl mb-4 dark:text-white"><EmojiIcon emoji="brain" size="xl" /></div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Poder Cerebral</h3>
                <p className="dark:text-gray-300">Aumenta a memória e a capacidade de foco em até 40%.</p>
            </div>
            
            <div className="benefit-card bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:-translate-y-1">
                <div className="benefit-icon text-4xl mb-4 dark:text-white"><EmojiIcon emoji="smile" size="xl" /></div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Zero Estresse</h3>
                <p className="dark:text-gray-300">Tocar reduz o cortisol instantaneamente.</p>
            </div>
            
            <div className="benefit-card bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all hover:-translate-y-1">
                <div className="benefit-icon text-4xl mb-4 dark:text-white"><EmojiIcon emoji="users" size="xl" /></div>
                <h3 className="font-bold text-xl mb-2 dark:text-white">Conexão Social</h3>
                <p className="dark:text-gray-300">Quem toca nunca está sozinho. A música une pessoas.</p>
            </div>
            </div>
        </div>
      </section>

      {/* --- FUNCIONALIDADES --- */}
      <section className="features-section py-16 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="feature-content flex-1">
                <h2 className="dark:text-white text-3xl font-bold mb-6">Tecnologia a favor da sua Arte</h2>
                <ul className="feature-list space-y-4">
                    <li className="flex items-center gap-3 dark:text-gray-300">
                        <span className="p-2 bg-orange-100 rounded dark:bg-gray-800 dark:text-white"><EmojiIcon emoji="music" size="md" /></span> 
                        <span className="dark:text-white"><strong>Transposição Inteligente:</strong> Mude o tom com um clique.</span>
                    </li>
                    <li className="flex items-center gap-3 dark:text-gray-300">
                        <span className="p-2 bg-orange-100 rounded dark:bg-gray-800 dark:text-white"><EmojiIcon emoji="eye" size="md" /></span> 
                        <span className="dark:text-white"><strong>Diagramas Interativos:</strong> Veja o acorde exato no braço.</span>
                    </li>
                    <li className="flex items-center gap-3 dark:text-gray-300">
                        <span className="p-2 bg-orange-100 rounded dark:bg-gray-800 dark:text-white"><EmojiIcon emoji="play" size="md" /></span> 
                        <span className="dark:text-white"><strong>Modo Palco:</strong> Design limpo para tocar ao vivo.</span>
                    </li>
                </ul>
            </div>
            <div className="feature-image flex-1 w-full">
                <img src={imgHomem} alt="Músico usando o app" className="rounded-xl shadow-2xl w-full h-auto object-cover" />
            </div>
        </div>
      </section>

      {/* --- VÍDEOS --- */}
      <section id="videos" className="videos-section py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
            <h2 className="section-title dark:text-white text-3xl font-bold text-center mb-2">Veja na Prática</h2>
            <p className="section-subtitle dark:text-gray-300 text-center text-gray-500 mb-12">Assista a demonstrações exclusivas.</p>
            
            {/* GRID RESPONSIVO PARA VÍDEOS */}
            <div className="videos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosDemonstracao.map((video) => (
                <div key={video.id} className="video-card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="video-container aspect-video w-full">
                    <iframe 
                    src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                    ></iframe>
                </div>
                <h3 className="p-4 font-semibold text-lg dark:text-white">{video.title}</h3>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* --- GALERIA --- */}
      <div id="galeria" className="gallery-section py-16 px-4 bg-gray-50 dark:bg-gray-950">
        <h2 className="gallery-title dark:text-white mb-8 text-center text-3xl font-bold">Nossa Comunidade</h2>
        {/* Grid de 2 colunas no celular e 5 no PC */}
        <div className="gallery-grid container mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          {fotosGaleria.map((item) => (
            <div key={item.id} className="gallery-card relative group rounded-lg overflow-hidden aspect-[3/4]">
              <img src={item.img} alt={item.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="card-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold text-center px-2">{item.titulo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CTA FINAL --- */}
      <div className="final-cta bg-orange-600 py-20 px-4 text-center text-white dark:bg-orange-800">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para elevar seu nível?</h2>
        <Link to="/musicas" className="cta-button-large inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
          Acessar Acervo Agora
        </Link>
      </div>

      {/* --- FOOTER --- */}
      <footer className="site-footer bg-gray-900 text-white py-12 px-4 dark:bg-black">
        <div className="footer-content text-center container mx-auto">
          <h3 className="footer-title text-2xl font-bold mb-4">Vamos tocar juntos?</h3>
          <p className="mb-8 text-gray-400">Siga nossas redes e entre em contato direto.</p>
          
          <div className="social-buttons-container flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://www.instagram.com/tocandopravaler" target="_blank" rel="noopener noreferrer" 
               className="btn-social btn-instagram flex items-center gap-2 bg-pink-600 px-4 py-2 rounded-lg hover:bg-pink-700 transition">
              <Instagram size={20} /> Instagram
            </a>

            <a href="https://wa.me/55999941669" target="_blank" rel="noopener noreferrer" 
               className="btn-social btn-whatsapp flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <MessageCircle size={20} /> WhatsApp
            </a>

            <a href="https://www.youtube.com/@TocandoPraValer" target="_blank" rel="noopener noreferrer" 
               className="btn-social btn-youtube flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
              <Youtube size={20} /> YouTube
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