import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import EmojiIcon from "../components/EmojiIcon";
import { Globe, Upload, Instagram, MessageCircle, Youtube, ChevronDown, Wrench, BookOpen, Send, Zap, Music, Eye, Play, Brain, Smile, Users, ArrowRight, Sparkles } from "lucide-react";
import { GlassCard, GradientButton, TechBadge, FeatureCard } from "../components/ui/HighTechUI";

// --- IMPORTAÇÃO DAS IMAGENS ---
import imgAdolescente from "../assets/adolescente-tocando.jpg";
import imgCriancas from "../assets/crianças-tocando.jpg"; 
import imgHomem from "../assets/homem-tocando.jpg";
import imgIdosos from "../assets/idosos-tocando.jpg";
import imgLife from "../assets/life-violao.jpg";

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
    <div className="page-container overflow-x-hidden w-full" style={{ background: 'linear-gradient(180deg, #0a0a0f, #050508)' }}>
      
      {/* --- HERO SECTION HIGH-TECH --- */}
      <div className="home-wrapper-hightech relative min-h-screen">
        
        {/* Grid de fundo animado */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Efeitos de luz ambiente */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.15), transparent)', filter: 'blur(100px)' }} 
        />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(191, 0, 255, 0.15), transparent)', filter: 'blur(100px)' }} 
        />
        
        {/* NAV HIGH-TECH */}
        <nav className="glass-nav-hightech fixed top-0 left-0 right-0 z-50 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-3 md:py-4 gap-3 md:gap-4"
            style={{
              background: 'rgba(10, 10, 15, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '0 0 20px 20px',
              border: '1px solid rgba(0, 245, 255, 0.1)',
              borderTop: 'none',
            }}
          >
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)' }}>
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Tocando</span>
                <span style={{ color: '#00f5ff' }}>PraValer</span>
              </span>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm">
              <Link to="/busca-global" className="nav-link-hightech group">
                <Globe size={14} style={{ color: '#ffd000' }} /> 
                <span>Busca Vagalume</span>
              </Link>
              <Link to="/musicas" className="nav-link-hightech">Repertório</Link>
              <Link to="/upload" className="nav-link-hightech">
                <Upload size={14} /> Enviar Cifra
              </Link>
              <a href="#beneficios" className="nav-link-hightech hidden sm:flex">Benefícios</a>
              <a href="#videos" className="nav-link-hightech hidden sm:flex">Vídeos</a>
            </div>
            
            {/* Dropdown Área do Aluno */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(0, 245, 255, 0.3)',
                }}
              >
                <Zap size={16} />
                Área do Aluno
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden z-50"
                  style={{
                    background: 'rgba(15, 15, 25, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(0, 245, 255, 0.2)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <Link 
                    to="/musicas" 
                    className="flex items-center gap-3 px-5 py-4 transition-all hover:bg-white/5"
                    style={{ color: 'rgba(255, 255, 255, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <BookOpen size={18} style={{ color: '#00f5ff' }} />
                    <span>Repertório</span>
                  </Link>
                  <Link 
                    to="/ferramentas" 
                    className="flex items-center gap-3 px-5 py-4 transition-all hover:bg-white/5"
                    style={{ color: 'rgba(255, 255, 255, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Wrench size={18} style={{ color: '#bf00ff' }} />
                    <span>Ferramentas</span>
                  </Link>
                  <Link 
                    to="/upload" 
                    className="flex items-center gap-3 px-5 py-4 transition-all hover:bg-white/5"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Send size={18} style={{ color: '#00ff88' }} />
                    <span>Enviar Cifra</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* HERO CONTENT */}
        <div className="hero-container-hightech relative z-10 flex flex-col items-center justify-center text-center px-4 pt-32 md:pt-40 pb-20">
          
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.3)',
            }}
          >
            <Sparkles size={16} style={{ color: '#00f5ff' }} />
            <span className="text-sm font-medium" style={{ color: '#00f5ff' }}>Plataforma Musical Inteligente</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
            <span className="text-white">Domine o Instrumento e</span><br />
            <span 
              className="inline-block mt-2"
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #bf00ff, #ff006e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Toque com Alma
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Mais do que cifras: uma plataforma completa com <strong style={{ color: '#00f5ff' }}>inteligência musical</strong> para você evoluir do iniciante ao profissional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/musicas" 
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all hover:translate-y-[-2px]"
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                color: 'white',
                boxShadow: '0 8px 30px rgba(0, 245, 255, 0.4)',
              }}
            >
              Começar Agora
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#beneficios" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/10"
              style={{
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
              }}
            >
              Saber Mais
            </a>
          </div>
          
          {/* Stats animados */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-16">
            {[
              { value: '+1.000', label: 'Músicas', color: '#00f5ff' },
              { value: '100%', label: 'Precisão', color: '#bf00ff' },
              { value: '24h', label: 'Acesso', color: '#00ff88' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div 
                  className="text-3xl md:text-4xl font-black mb-1"
                  style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50` }}
                >
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FAIXA DE DADOS --- */}
      <div className="stats-bar bg-orange-500 text-white py-8 flex flex-col md:flex-row justify-center md:justify-around gap-8 text-center px-4">
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

      {/* --- BENEFÍCIOS HIGH-TECH --- */}
      <section id="beneficios" className="py-20 px-4 relative">
        {/* Efeito de luz */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(191, 0, 255, 0.1), transparent)', filter: 'blur(80px)' }} 
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(191, 0, 255, 0.1)', border: '1px solid rgba(191, 0, 255, 0.3)' }}
            >
              <Brain size={16} style={{ color: '#bf00ff' }} />
              <span className="text-sm font-medium" style={{ color: '#bf00ff' }}>Ciência + Música</span>
            </div>
            <h2 
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #ffffff, #bf00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              A Música Transforma Vidas
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }} className="text-lg">
              O que a ciência diz sobre aprender um instrumento:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Poder Cerebral', desc: 'Aumenta a memória e a capacidade de foco em até 40%.', color: '#00f5ff' },
              { icon: Smile, title: 'Zero Estresse', desc: 'Tocar reduz o cortisol instantaneamente.', color: '#bf00ff' },
              { icon: Users, title: 'Conexão Social', desc: 'Quem toca nunca está sozinho. A música une pessoas.', color: '#00ff88' },
            ].map((item, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] group"
                style={{
                  background: 'rgba(15, 15, 25, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ background: `${item.color}20`, border: `1px solid ${item.color}50` }}
                >
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FUNCIONALIDADES HIGH-TECH --- */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Fundo com imagem e overlay */}
        <div className="absolute inset-0">
          <img src={imgHomem} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5, 5, 8, 0.9), rgba(10, 10, 15, 0.95))' }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)' }}
              >
                <Zap size={16} style={{ color: '#00f5ff' }} />
                <span className="text-sm font-medium" style={{ color: '#00f5ff' }}>Tecnologia Avançada</span>
              </div>
              
              <h2 
                className="text-3xl md:text-4xl font-black mb-8"
                style={{ 
                  background: 'linear-gradient(135deg, #ffffff, #00f5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Tecnologia a favor da sua Arte
              </h2>
              
              <div className="space-y-5">
                {[
                  { icon: Music, title: 'Transposição Inteligente', desc: 'Mude o tom com um clique.', color: '#00f5ff' },
                  { icon: Eye, title: 'Diagramas Interativos', desc: 'Veja o acorde exato no braço.', color: '#bf00ff' },
                  { icon: Play, title: 'Modo Palco', desc: 'Design limpo para tocar ao vivo.', color: '#00ff88' },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all hover:bg-white/5"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15`, border: `1px solid ${item.color}40` }}
                    >
                      <item.icon size={22} style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Card de imagem com glow */}
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-3xl"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.3), rgba(191, 0, 255, 0.3))',
                  filter: 'blur(40px)',
                  transform: 'scale(0.9)',
                }}
              />
              <img 
                src={imgHomem} 
                alt="Músico usando o app" 
                className="relative rounded-3xl w-full h-auto object-cover"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- VÍDEOS HIGH-TECH --- */}
      <section id="videos" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255, 0, 110, 0.1)', border: '1px solid rgba(255, 0, 110, 0.3)' }}
            >
              <Play size={16} style={{ color: '#ff006e' }} />
              <span className="text-sm font-medium" style={{ color: '#ff006e' }}>Vídeos Exclusivos</span>
            </div>
            <h2 
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #ffffff, #ff006e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Veja na Prática
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }} className="text-lg">
              Assista a demonstrações exclusivas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosDemonstracao.map((video) => (
              <div 
                key={video.id} 
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] group"
                style={{
                  background: 'rgba(15, 15, 25, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="aspect-video w-full relative overflow-hidden">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <h3 className="p-4 font-semibold text-lg text-white flex items-center gap-2">
                  <Play size={16} style={{ color: '#ff006e' }} />
                  {video.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALERIA HIGH-TECH --- */}
      <section id="galeria" className="py-20 px-4 relative">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent, rgba(191, 0, 255, 0.05), transparent)' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #ffffff, #00ff88)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nossa Comunidade
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {fotosGaleria.map((item) => (
              <div 
                key={item.id} 
                className="relative group rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <img 
                  src={item.img} 
                  alt={item.titulo} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0, 245, 255, 0.8), rgba(191, 0, 255, 0.6))' }}
                >
                  <span className="text-white font-bold text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    {item.titulo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA FINAL HIGH-TECH --- */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(191, 0, 255, 0.1))',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(0, 245, 255, 0.2), transparent)', filter: 'blur(60px)' }}
        />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 
            className="text-3xl md:text-5xl font-black mb-6"
            style={{ 
              background: 'linear-gradient(135deg, #ffffff, #00f5ff, #bf00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Pronto para elevar seu nível?
          </h2>
          <p className="text-lg mb-10" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Junte-se a milhares de músicos que já estão evoluindo com nossa plataforma.
          </p>
          <Link 
            to="/musicas" 
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-xl transition-all hover:translate-y-[-2px] hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
              color: 'white',
              boxShadow: '0 10px 40px rgba(0, 245, 255, 0.4)',
            }}
          >
            <Zap size={24} />
            Acessar Acervo Agora
          </Link>
        </div>
      </section>

      {/* --- FOOTER HIGH-TECH --- */}
      <footer className="py-16 px-4 relative" style={{ background: 'rgba(5, 5, 10, 0.9)' }}>
        <div className="absolute inset-0" style={{ borderTop: '1px solid rgba(0, 245, 255, 0.1)' }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00f5ff, #bf00ff)' }}>
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Tocando</span>
                <span style={{ color: '#00f5ff' }}>PraValer</span>
              </span>
            </div>
            
            <p className="mb-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Siga nossas redes e entre em contato direto.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a 
                href="https://www.instagram.com/tocandopravaler" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:translate-y-[-2px]"
                style={{ 
                  background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                <Instagram size={20} /> Instagram
              </a>

              <a 
                href="https://wa.me/55999941669" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:translate-y-[-2px]"
                style={{ 
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                <MessageCircle size={20} /> WhatsApp
              </a>

              <a 
                href="https://www.youtube.com/@TocandoPraValer" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all hover:translate-y-[-2px]"
                style={{ 
                  background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                  color: 'white',
                  fontWeight: '600',
                }}
              >
                <Youtube size={20} /> YouTube
              </a>
            </div>

            <div 
              className="pt-8 text-sm"
              style={{ color: 'rgba(255, 255, 255, 0.4)', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
            >
              <p>© 2025 Tocando Pra Valer. Desenvolvido por Diego Gomes.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
