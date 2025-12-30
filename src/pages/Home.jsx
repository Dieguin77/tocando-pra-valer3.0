import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Globe, Upload, Instagram, MessageCircle, Youtube, ChevronDown, Wrench, BookOpen, Send, Music, Play, Brain, Smile, Users, ArrowRight } from "lucide-react";

// --- IMPORTAÇÃO DAS IMAGENS ---
import imgAdolescente from "../assets/adolescente-tocando.jpg";
import imgCriancas from "../assets/crianças-tocando.jpg"; 
import imgHomem from "../assets/homem-tocando.jpg";
import imgIdosos from "../assets/idosos-tocando.jpg";
import imgLife from "../assets/life-violao.jpg";
import logo from "../assets/logo.png";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div className="min-h-screen bg-white">
      
      {/* --- NAVBAR CLEAN --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-semibold text-gray-900">
              Tocando<span className="text-blue-500">PraValer</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/busca-global" className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
              <Globe size={16} /> Busca Vagalume
            </Link>
            <Link to="/musicas" className="text-gray-600 hover:text-blue-500 transition-colors">Cifras</Link>
            <Link to="/upload" className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
              <Upload size={16} /> Enviar Cifra
            </Link>
            <a href="#beneficios" className="text-gray-600 hover:text-blue-500 transition-colors">Benefícios</a>
            <a href="#videos" className="text-gray-600 hover:text-blue-500 transition-colors">Vídeos</a>
          </div>
          
          {/* Dropdown Área do Aluno */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Área do Aluno
              <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                <Link 
                  to="/musicas" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <BookOpen size={18} className="text-blue-500" />
                  <span>Cifras</span>
                </Link>
                <Link 
                  to="/ferramentas" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Wrench size={18} className="text-blue-500" />
                  <span>Ferramentas</span>
                </Link>
                <Link 
                  to="/upload" 
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Send size={18} className="text-blue-500" />
                  <span>Enviar Cifra</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION CLEAN --- */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
            Plataforma Musical
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Domine o Instrumento e<br />
            <span className="text-blue-500">Toque com Alma</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Mais do que cifras: uma plataforma completa para você evoluir do iniciante ao profissional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/musicas" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Começar Agora
              <ArrowRight size={20} />
            </Link>
            <a 
              href="#beneficios" 
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition-colors"
            >
              Saber Mais
            </a>
          </div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-blue-500 text-white py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold">+1.000</div>
            <div className="text-sm opacity-90">Músicas Cifradas</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">100%</div>
            <div className="text-sm opacity-90">Precisão Musical</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">24h</div>
            <div className="text-sm opacity-90">Acesso Ilimitado</div>
          </div>
        </div>
      </section>

      {/* --- BENEFÍCIOS CLEAN --- */}
      <section id="beneficios" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              Ciência + Música
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              A Música Transforma Vidas
            </h2>
            <p className="text-gray-600 text-lg">
              O que a ciência diz sobre aprender um instrumento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Poder Cerebral', desc: 'Aumenta a memória e a capacidade de foco em até 40%.' },
              { icon: Smile, title: 'Zero Estresse', desc: 'Tocar reduz o cortisol instantaneamente.' },
              { icon: Users, title: 'Conexão Social', desc: 'Quem toca nunca está sozinho. A música une pessoas.' },
            ].map((item, i) => (
              <div 
                key={i}
                className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <item.icon size={28} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FUNCIONALIDADES --- */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                Recursos
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Tecnologia a favor da sua Arte
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: Music, title: 'Transposição Inteligente', desc: 'Mude o tom com um clique.' },
                  { icon: BookOpen, title: 'Diagramas de Acordes', desc: 'Veja o acorde exato no braço.' },
                  { icon: Play, title: 'Modo Palco', desc: 'Design limpo para tocar ao vivo.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon size={22} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <img 
                src={imgHomem} 
                alt="Músico usando o app" 
                className="rounded-2xl w-full h-auto object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- VÍDEOS --- */}
      <section id="videos" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
              Vídeos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Veja na Prática
            </h2>
            <p className="text-gray-600 text-lg">
              Assista a demonstrações exclusivas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosDemonstracao.map((video) => (
              <div 
                key={video.id} 
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video w-full">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <h3 className="p-4 font-medium text-gray-900 flex items-center gap-2">
                  <Play size={16} className="text-blue-500" />
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERIA --- */}
      <section id="galeria" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossa Comunidade
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {fotosGaleria.map((item) => (
              <div 
                key={item.id} 
                className="relative group rounded-xl overflow-hidden aspect-[3/4]"
              >
                <img 
                  src={item.img} 
                  alt={item.titulo} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium text-center px-4">
                    {item.titulo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 px-4 bg-blue-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para elevar seu nível?
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Junte-se a milhares de músicos que já estão evoluindo com nossa plataforma.
          </p>
          <Link 
            to="/musicas" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition-colors"
          >
            <Music size={20} />
            Acessar Acervo Agora
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={logo} alt="Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-semibold text-white">
              Tocando<span className="text-blue-500">PraValer</span>
            </span>
          </div>
          
          <p className="text-gray-400 mb-8">
            Siga nossas redes e entre em contato direto.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a 
              href="https://www.instagram.com/tocandopravaler" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Instagram size={20} /> Instagram
            </a>

            <a 
              href="https://wa.me/55999941669" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-green-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>

            <a 
              href="https://www.youtube.com/@TocandoPraValer" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Youtube size={20} /> YouTube
            </a>
          </div>

          <div className="pt-8 text-sm text-gray-500 border-t border-gray-800">
            <p>© 2025 Tocando Pra Valer. Desenvolvido por Diego Gomes.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
