import { useState } from 'react';
import { Link } from 'react-router-dom';
import UploadCifra from '../components/UploadCifra';
import { Guitar, Music, Search, CheckCircle, Globe, Star, BookOpen, Pencil, Target, AlertTriangle, HelpCircle, Mail, Trophy, Send, Zap, ArrowLeft, Sparkles } from 'lucide-react';

export default function UploadPage() {
  const [cifraSent, setCifraSent] = useState(false);

  const handleCifraSubmitted = (cifra) => {
    setCifraSent(true);
    setTimeout(() => setCifraSent(false), 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f, #050508)' }}>
      
      {/* Grid de fundo */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Efeitos de luz */}
      <div className="fixed top-20 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(0, 255, 136, 0.4), transparent)', filter: 'blur(60px)' }} 
      />
      <div className="fixed bottom-20 left-0 w-80 h-80 rounded-full opacity-15 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(191, 0, 255, 0.4), transparent)', filter: 'blur(60px)' }} 
      />

      {/* Navegação High-Tech */}
      <nav 
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00ff88, #00f5ff)' }}
            >
              <Guitar size={20} className="text-black" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Tocando</span>
              <span style={{ color: '#00ff88' }}>PraValer</span>
            </span>
          </Link>
          
          <div className="flex gap-2">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-xl transition-all hover:bg-white/5"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Início
            </Link>
            <Link 
              to="/musicas" 
              className="px-4 py-2 rounded-xl transition-all hover:bg-white/5"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              Repertório
            </Link>
            <Link 
              to="/upload" 
              className="px-4 py-2 rounded-xl"
              style={{ 
                background: 'rgba(0, 255, 136, 0.15)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                color: '#00ff88',
              }}
            >
              Enviar Cifra
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section High-Tech */}
      <section className="relative py-20 px-6 text-center">
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(0, 255, 136, 0.05), transparent)',
          }}
        />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)' }}
          >
            <Send size={16} style={{ color: '#00ff88' }} />
            <span className="text-sm font-medium" style={{ color: '#00ff88' }}>Colabore com a Comunidade</span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <Music size={40} style={{ color: '#00ff88' }} />
            Contribua com o Acervo
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Compartilhe suas cifras e ajude músicos de todo o mundo
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '+500', label: 'Cifras', color: '#00ff88' },
              { value: '+2K', label: 'Comunidade', color: '#00f5ff' },
              { value: '100%', label: 'Revisadas', color: '#bf00ff' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div 
                  className="text-2xl md:text-3xl font-black mb-1"
                  style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}50` }}
                >
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Container Principal */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Search, title: 'Revisão de Qualidade', desc: 'Toda cifra é revisada por nossa equipe', color: '#00f5ff' },
                { icon: CheckCircle, title: 'Simples e Rápido', desc: 'Preencha e envie em poucos cliques', color: '#00ff88' },
                { icon: Globe, title: 'Compartilhe com Todos', desc: 'Acessível para músicos do mundo todo', color: '#bf00ff' },
                { icon: Star, title: 'Reconhecimento', desc: 'Seu nome aparece como colaborador', color: '#ffd000' },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-5 rounded-2xl transition-all hover:translate-y-[-2px]"
                  style={{
                    background: 'rgba(15, 15, 25, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}
                  >
                    <item.icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Formulário de Upload */}
            <UploadCifra onCifraSubmitted={handleCifraSubmitted} />

            {/* Guia de Formatação */}
            <section 
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15, 15, 25, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <BookOpen size={24} style={{ color: '#00f5ff' }} /> Guia de Formatação
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                    <Pencil size={16} style={{ color: '#00ff88' }} /> Como Formatar
                  </h3>
                  <pre 
                    className="p-4 rounded-xl text-sm overflow-x-auto font-mono"
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(0, 255, 136, 0.2)',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >{`[Verso 1]
C      F
Aleluia, aleluia
Am     G
Que reina em meu coração

[Refrão]
C           F
Você é santo, você é digno`}</pre>
                </div>

                <div>
                  <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                    <Target size={16} style={{ color: '#bf00ff' }} /> Boas Práticas
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <li className="flex items-center gap-2">
                      <span style={{ color: '#00ff88' }}>✓</span> Use acordes entre colchetes
                    </li>
                    <li className="flex items-center gap-2">
                      <span style={{ color: '#00ff88' }}>✓</span> Separe acordes do texto
                    </li>
                    <li className="flex items-center gap-2">
                      <span style={{ color: '#00ff88' }}>✓</span> Inclua seções (Verso, Refrão)
                    </li>
                    <li className="flex items-center gap-2">
                      <span style={{ color: '#00ff88' }}>✓</span> Verifique antes de enviar
                    </li>
                    <li className="flex items-center gap-2">
                      <span style={{ color: '#ff4444' }}>✗</span> Não copie sem permissão
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                  <AlertTriangle size={16} style={{ color: '#ffd000' }} /> Direitos Autorais
                </h3>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Ao enviar, você confirma que a cifra é uma interpretação original ou baseada em fontes públicas.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section 
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15, 15, 25, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <HelpCircle size={24} style={{ color: '#bf00ff' }} /> Perguntas Frequentes
              </h2>

              <div className="space-y-4">
                {[
                  { q: 'Quanto tempo leva para ser aprovada?', a: 'Em média, 1 a 2 dias úteis.' },
                  { q: 'Posso editar após enviar?', a: 'Sim! Entre em contato pelo email de suporte.' },
                  { q: 'Minha cifra foi rejeitada. O que faço?', a: 'Você receberá um email com o motivo. Corrija e envie novamente.' },
                  { q: 'Preciso de conta para enviar?', a: 'Não! Mas recomendamos fornecer email para atualizações.' },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className="p-4 rounded-xl"
                    style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                  >
                    <h4 className="font-bold text-white mb-1">{item.q}</h4>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15, 15, 25, 0.8)',
                border: '1px solid rgba(0, 245, 255, 0.2)',
              }}
            >
              <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                <Target size={20} style={{ color: '#00f5ff' }} /> Dica Importante
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Músicas com cifras bem organizadas têm <strong style={{ color: '#00ff88' }}>maior chance de aprovação</strong>. 
                Dedique um tempo para formatar!
              </p>
            </div>

            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(15, 15, 25, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                <Mail size={20} style={{ color: '#bf00ff' }} /> Precisa de Ajuda?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Entre em contato conosco:
              </p>
              <a 
                href="mailto:suporte@tocandopravaler.com" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all hover:scale-105"
                style={{
                  background: 'rgba(191, 0, 255, 0.2)',
                  border: '1px solid rgba(191, 0, 255, 0.4)',
                  color: '#bf00ff',
                }}
              >
                <Mail size={16} /> Email de Suporte
              </a>
            </div>

            <div 
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 245, 255, 0.1))',
                border: '1px solid rgba(0, 255, 136, 0.3)',
              }}
            >
              <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                <Trophy size={20} style={{ color: '#ffd000' }} /> Seja um Colaborador!
              </h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Colaboradores ativos ganham <strong style={{ color: '#ffd000' }}>selo especial</strong> no site!
              </p>
              <button 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #00ff88, #00f5ff)',
                  color: '#000',
                }}
              >
                <Star size={16} /> Saiba Mais
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
