import { useState } from 'react';
import { Link } from 'react-router-dom';
import UploadCifra from '../components/UploadCifra';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import EmojiIcon from '../components/EmojiIcon';
import './UploadPage.css';

export default function UploadPage() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [cifraSent, setCifraSent] = useState(false);

  const handleCifraSubmitted = (cifra) => {
    setCifraSent(true);
    setTimeout(() => setCifraSent(false), 3000);
  };

  return (
    <div className="upload-page">
      {/* Navegação */}
      <nav className="upload-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🎸 Tocando Pra Valer
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Início</Link>
            <Link to="/musicas" className="nav-link">Repertório</Link>
            <Link to="/upload" className="nav-link active">Enviar Cifra</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="upload-hero">
        <div className="hero-content">
          <h1>
            <EmojiIcon emoji="🎵" /> Contribua com o Nosso Acervo
          </h1>
          <p>Compartilhe suas cifras e ajude músicos de todo o mundo</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">+500</span>
              <span className="stat-label">Cifras no Acervo</span>
            </div>
            <div className="stat">
              <span className="stat-number">+2K</span>
              <span className="stat-label">Comunidade Ativa</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Revisadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Container Principal */}
      <div className="upload-page-container">
        <div className="upload-content">
          {/* Info Cards */}
          <div className="info-cards">
            <div className="info-card">
              <div className="card-icon">🔍</div>
              <h3>Revisão de Qualidade</h3>
              <p>Toda cifra é revisada por nossa equipe antes de ser publicada</p>
            </div>

            <div className="info-card">
              <div className="card-icon">✅</div>
              <h3>Simples e Rápido</h3>
              <p>Preencha o formulário e envie sua cifra em poucos cliques</p>
            </div>

            <div className="info-card">
              <div className="card-icon">🌍</div>
              <h3>Compartilhe com Todos</h3>
              <p>Sua cifra será acessível para músicos em todo o mundo</p>
            </div>

            <div className="info-card">
              <div className="card-icon">⭐</div>
              <h3>Reconhecimento</h3>
              <p>Seu nome aparecerá como colaborador na cifra</p>
            </div>
          </div>

          {/* Formulário de Upload */}
          <UploadCifra onCifraSubmitted={handleCifraSubmitted} />

          {/* Guia de Formatação */}
          <section className="formatting-guide">
            <h2>
              <EmojiIcon emoji="📚" /> Guia de Formatação
            </h2>

            <div className="guide-content">
              <div className="guide-section">
                <h3>✏️ Como Formatar Sua Cifra</h3>
                <p>Siga este padrão para melhor compatibilidade:</p>
                <pre className="code-block">{`[Verso 1]
C      F
Aleluia, aleluia
Am     G
Que reina em meu coração

[Refrão]
C           F
Você é santo, você é digno
Am          G
Você é poderoso em meu coração`}</pre>
              </div>

              <div className="guide-section">
                <h3>🎯 Boas Práticas</h3>
                <ul className="guide-list">
                  <li>✓ Use acordes entre colchetes quando apropriado</li>
                  <li>✓ Separe os acordes do texto com espaços</li>
                  <li>✓ Inclua seções (Verso, Refrão, Bridge)</li>
                  <li>✓ Verifique a sintaxe antes de enviar</li>
                  <li>✓ Cite a fonte ou versão original</li>
                  <li>✗ Não copie cifras de sites sem permissão</li>
                </ul>
              </div>

              <div className="guide-section">
                <h3>⚠️ Direitos Autorais</h3>
                <p>
                  Ao enviar uma cifra, você confirma que:
                </p>
                <ul className="guide-list">
                  <li>✓ A cifra é uma interpretação original ou baseada em fontes públicas</li>
                  <li>✓ Você tem permissão para compartilhá-la</li>
                  <li>✓ Você respeita os direitos da música original</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-section">
            <h2>
              <EmojiIcon emoji="❓" /> Perguntas Frequentes
            </h2>

            <div className="faq-items">
              <div className="faq-item">
                <h4>Quanto tempo leva para minha cifra ser aprovada?</h4>
                <p>Em média, 1 a 2 dias úteis. Revisamos todas as cifras para garantir qualidade.</p>
              </div>

              <div className="faq-item">
                <h4>Posso editar minha cifra após enviar?</h4>
                <p>Sim! Se sua cifra estiver pendente, você pode fazer alterações. Entre em contato pelo email de suporte.</p>
              </div>

              <div className="faq-item">
                <h4>Minha cifra foi rejeitada. O que faço?</h4>
                <p>Você receberá um email explicando o motivo. Faça as correções e envie novamente.</p>
              </div>

              <div className="faq-item">
                <h4>Preciso de uma conta para enviar?</h4>
                <p>Não! Você pode enviar anonimamente, mas recomendamos fornecer um email para atualizações.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="upload-sidebar">
          <div className="sidebar-card">
            <h3>
              <EmojiIcon emoji="🎯" /> Dica Importante
            </h3>
            <p>
              Músicas com cifras bem organizadas têm <strong>maior chance de aprovação</strong>. 
              Dedique um tempo para formatar corretamente!
            </p>
          </div>

          <div className="sidebar-card">
            <h3>
              <EmojiIcon emoji="📧" /> Precisa de Ajuda?
            </h3>
            <p>
              Entre em contato conosco:
            </p>
            <a href="mailto:suporte@tocandopravaler.com" className="btn-contact">
              📨 Email de Suporte
            </a>
          </div>

          <div className="sidebar-card highlight">
            <h3>
              <EmojiIcon emoji="🏆" /> Seja um Colaborador!
            </h3>
            <p>
              Colaboradores ativos ganham <strong>selo especial</strong> no site!
            </p>
            <button className="btn-collaborator">
              ⭐ Saiba Mais
            </button>
          </div>
        </aside>
      </div>

      {/* Botão de Tema */}
      <ThemeToggle />
    </div>
  );
}
