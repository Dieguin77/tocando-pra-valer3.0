import { Link } from "react-router-dom";
import "./home.css"; // Pode manter para detalhes menores, mas o layout agora é Tailwind
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
    <div className="page-container transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative min-h-screen flex flex-col justify-center">
        {/* Fundo com imagem/overlay manual para garantir contraste */}
        <div className="absolute inset-0 z-0">
            {/* Você pode colocar a imagem de fundo aqui via CSS ou img tag */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-gray-900/90 dark:from-black/90 dark:to-black"></div>
        </div>

        {/* Navbar Responsiva */}
        <nav className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 glass-nav dark:bg-black/20 border-b border-white/10">
          <Link to="/" className="text-2xl font-bold text-white mb-4 md:mb-0">Tocando Pra Valer</Link>
          
          {/* Links: No celular empilha ou rola horizontalmente, no PC fica em linha */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/musicas" className="text-white hover:text-orange-400 text-sm md:text-base">Repertório</Link>
            <Link to="/upload" className="text-white hover:text-orange-400 text-sm md:text-base">📤 Enviar Cifra</Link>
            <a href="#beneficios" className="text-white hover:text-orange-400 text-sm md:text-base">Benefícios</a>
            <a href="#videos" className="text-white hover:text-orange-400 text-sm md:text-base">Vídeos</a>
          </div>
          
          <Link to="/login" className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-bold transition">
            Área do Aluno
          </Link>
        </nav>

        {/* Conteúdo Hero */}
        <div className="relative z-10 container mx-auto px-4 text-center mt-10 md:mt-0">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Domine o Instrumento e <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Toque com Alma
            </span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Mais do que cifras: uma plataforma completa com inteligência musical para você evoluir do iniciante ao profissional.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/musicas" className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition shadow-lg shadow-orange-600/30">
              Começar Agora 
            </Link>
            <a href="#beneficios" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition">
              Saber Mais
            </a>
          </div>
        </div>
      </div>

      {/* --- FAIXA DE DADOS (Responsiva: Coluna no celular -> Linha no PC) --- */}
      <div className="bg-orange-500 dark:bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around gap-8 text-center">
          <div className="stat-item">
            <span className="block text-4xl font-bold">+1.000</span>
            <span className="text-sm uppercase tracking-wider">Músicas Cifradas</span>
          </div>
          <div className="stat-item">
            <span className="block text-4xl font-bold">100%</span>
            <span className="text-sm uppercase tracking-wider">Precisão Musical</span>
          </div>
          <div className="stat-item">
            <span className="block text-4xl font-bold">24h</span>
            <span className="text-sm uppercase tracking-wider">Acesso Ilimitado</span>
          </div>
        </div>
      </div>

      {/* --- BENEFÍCIOS (Grid Responsivo) --- */}
      <section id="beneficios" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 dark:text-white">A Música Transforma Vidas</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">O que a ciência diz sobre aprender um instrumento:</p>
          
          {/* AQUI ESTÁ A MÁGICA: grid-cols-1 (celular) md:grid-cols-3 (PC) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-6 dark:text-white"><EmojiIcon emoji="brain" size="xl" /></div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Poder Cerebral</h3>
              <p className="text-gray-600 dark:text-gray-300">Aumenta a memória e a capacidade de foco em até 40%.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-6 dark:text-white"><EmojiIcon emoji="smile" size="xl" /></div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Zero Estresse</h3>
              <p className="text-gray-600 dark:text-gray-300">Tocar reduz o cortisol instantaneamente.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform">
              <div className="text-5xl mb-6 dark:text-white"><EmojiIcon emoji="users" size="xl" /></div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Conexão Social</h3>
              <p className="text-gray-600 dark:text-gray-300">Quem toca nunca está sozinho. A música une pessoas.</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- FUNCIONALIDADES (Flex reverso no celular para imagem ficar em cima ou embaixo) --- */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Tecnologia a favor da sua Arte</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3 dark:text-gray-300">
                  <span className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg dark:text-white"><EmojiIcon emoji="music" size="md" /></span> 
                  <span><strong>Transposição Inteligente:</strong> Mude o tom com um clique.</span>
              </li>
              <li className="flex items-center gap-3 dark:text-gray-300">
                  <span className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg dark:text-white"><EmojiIcon emoji="eye" size="md" /></span> 
                  <span><strong>Diagramas Interativos:</strong> Veja o acorde exato no braço.</span>
              </li>
              <li className="flex items-center gap-3 dark:text-gray-300">
                  <span className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg dark:text-white"><EmojiIcon emoji="play" size="md" /></span> 
                  <span><strong>Modo Palco:</strong> Design limpo para tocar ao vivo.</span>
              </li>
            </ul>
          </div>
          
          <div className="flex-1 w-full">
             <img src={imgHomem} alt="Músico" className="rounded-2xl shadow-2xl w-full h-auto object-cover" />
          </div>

        </div>
      </section>

      {/* --- VÍDEOS --- */}
      <section id="videos" className="py-16 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2 dark:text-white">Veja na Prática</h2>
          <p className="text-center text-gray-500 mb-12 dark:text-gray-400">Assista a demonstrações exclusivas.</p>
          
          {/* GRID RESPONSIVO: 1 coluna (cel), 2 colunas (tablet), 3 colunas (PC) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosDemonstracao.map((video) => (
              <div key={video.id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative w-full aspect-video">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                    title={video.title} 
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="p-4 font-semibold text-lg dark:text-white">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERIA --- */}
      <div id="galeria" className="py-16 px-4 bg-gray-50 dark:bg-gray-950">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Nossa Comunidade</h2>
        {/* GALERIA FLEXÍVEL */}
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {fotosGaleria.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-xl aspect-[3/4]">
              <img src={item.img} alt={item.titulo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-bold text-sm">{item.titulo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- CTA FINAL --- */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-20 px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para elevar seu nível?</h2>
        <Link to="/musicas" className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
          Acessar Acervo Agora
        </Link>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-white py-12 px-4 dark:bg-black border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Vamos tocar juntos?</h3>
          <p className="mb-8 text-gray-400">Siga nossas redes e entre em contato direto.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://www.instagram.com/tocandopravaler" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 bg-pink-600 px-6 py-3 rounded-lg hover:bg-pink-700 transition">
              <FaInstagram /> Instagram
            </a>
            <a href="https://wa.me/55999941669" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="https://www.youtube.com/@TocandoPraValer" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition">
              <FaYoutube /> YouTube
            </a>
          </div>

          <div className="text-gray-500 text-sm">
            <p>© 2025 Tocando Pra Valer. Desenvolvido por Diego Gomes.</p>
          </div>
        </div>
      </footer>

      {/* Botão de Tema Flutuante */}
      <div className="fixed bottom-6 right-6 z-50">
         <ThemeToggle />
      </div>

    </div>
  );
}