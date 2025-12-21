import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import EmojiIcon from '../components/EmojiIcon';
import ThemeToggle from '../components/ThemeToggle';
import './AdminReviewCifras.css';

export default function AdminReviewCifras() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const [cifrasPendentes, setCifrasPendentes] = useState([]);
  const [cifrasAprovadas, setCifrasAprovadas] = useState([]);
  const [cifraseRejeitadas, setCifrasRejeitadas] = useState([]);
  const [tab, setTab] = useState('pendentes');
  const [expandedId, setExpandedId] = useState(null);
  const [motivoRejeicao, setMotivoRejeicao] = useState('');

  useEffect(() => {
    carregarCifras();
  }, []);

  const carregarCifras = () => {
    const pendentes = JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
    const aprovadas = JSON.parse(localStorage.getItem('cifrasAprovadas') || '[]');
    const rejeitadas = JSON.parse(localStorage.getItem('cifrasRejeitadas') || '[]');

    setCifrasPendentes(pendentes.filter(c => c.status === 'pendente'));
    setCifrasAprovadas(aprovadas);
    setCifrasRejeitadas(rejeitadas);
  };

  const aprovarCifra = (id) => {
    const cifra = cifrasPendentes.find(c => c.id === id);
    if (!cifra) return;

    const cifraPendentes = JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
    const novasPendentes = cifraPendentes.filter(c => c.id !== id);
    localStorage.setItem('cifrasPendentes', JSON.stringify(novasPendentes));

    const cifrasAprovadas = JSON.parse(localStorage.getItem('cifrasAprovadas') || '[]');
    cifrasAprovadas.push({
      ...cifra,
      status: 'aprovado',
      dataAprovacao: new Date().toISOString(),
    });
    localStorage.setItem('cifrasAprovadas', JSON.stringify(cifrasAprovadas));

    setCifrasPendentes(novasPendentes.filter(c => c.status === 'pendente'));
    setCifrasAprovadas(cifrasAprovadas);
  };

  const rejeitarCifra = (id, motivo) => {
    if (!motivo.trim()) {
      alert('Informe o motivo da rejeição');
      return;
    }

    const cifra = cifrasPendentes.find(c => c.id === id);
    if (!cifra) return;

    const cifraPendentes = JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
    const novasPendentes = cifraPendentes.filter(c => c.id !== id);
    localStorage.setItem('cifrasPendentes', JSON.stringify(novasPendentes));

    const cifrasRejeitadas = JSON.parse(localStorage.getItem('cifrasRejeitadas') || '[]');
    cifrasRejeitadas.push({
      ...cifra,
      status: 'rejeitado',
      motivoRejeicao: motivo,
      dataRejeicao: new Date().toISOString(),
    });
    localStorage.setItem('cifrasRejeitadas', JSON.stringify(cifrasRejeitadas));

    setCifrasPendentes(novasPendentes.filter(c => c.status === 'pendente'));
    setCifrasRejeitadas(cifrasRejeitadas);
    setMotivoRejeicao('');
  };

  const deletarCifra = (id, tipo) => {
    if (!confirm('Tem certeza que deseja deletar esta cifra?')) return;

    if (tipo === 'aprovada') {
      const cifrasAprovadas = JSON.parse(localStorage.getItem('cifrasAprovadas') || '[]');
      const novas = cifrasAprovadas.filter(c => c.id !== id);
      localStorage.setItem('cifrasAprovadas', JSON.stringify(novas));
      setCifrasAprovadas(novas);
    } else if (tipo === 'rejeitada') {
      const cifrasRejeitadas = JSON.parse(localStorage.getItem('cifrasRejeitadas') || '[]');
      const novas = cifrasRejeitadas.filter(c => c.id !== id);
      localStorage.setItem('cifrasRejeitadas', JSON.stringify(novas));
      setCifrasRejeitadas(novas);
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="admin-review-container">
      {/* Header */}
      <div className="admin-review-header">
        <Link to="/" className="back-link">← Voltar</Link>
        <h1>
          <EmojiIcon emoji="🎸" /> Revisar Cifras Enviadas
        </h1>
        <p>Gerencie as cifras submetidas pela comunidade</p>
      </div>

      {/* Tabs */}
      <div className="review-tabs">
        <button
          className={`tab ${tab === 'pendentes' ? 'active' : ''}`}
          onClick={() => setTab('pendentes')}
        >
          <EmojiIcon emoji="⏳" /> Pendentes ({cifrasPendentes.length})
        </button>
        <button
          className={`tab ${tab === 'aprovadas' ? 'active' : ''}`}
          onClick={() => setTab('aprovadas')}
        >
          <EmojiIcon emoji="✅" /> Aprovadas ({cifrasAprovadas.length})
        </button>
        <button
          className={`tab ${tab === 'rejeitadas' ? 'active' : ''}`}
          onClick={() => setTab('rejeitadas')}
        >
          <EmojiIcon emoji="❌" /> Rejeitadas ({cifrasRejeitadas.length})
        </button>
      </div>

      {/* Conteúdo */}
      <div className="review-content">
        {tab === 'pendentes' && (
          <div className="tab-content">
            {cifrasPendentes.length === 0 ? (
              <div className="empty-state">
                <EmojiIcon emoji="🎉" /> Parabéns! Não há cifras pendentes.
              </div>
            ) : (
              <div className="cifras-list">
                {cifrasPendentes.map(cifra => (
                  <div key={cifra.id} className="cifra-card">
                    <div className="cifra-header">
                      <h3>{cifra.titulo}</h3>
                      <span className="artista">{cifra.artista}</span>
                    </div>

                    <div className="cifra-meta">
                      <span>
                        <EmojiIcon emoji="🎹" /> Tom: {cifra.tom}
                      </span>
                      <span>
                        <EmojiIcon emoji="📊" /> Dificuldade: {cifra.dificuldade}
                      </span>
                      <span>
                        <EmojiIcon emoji="📅" /> {formatarData(cifra.dataCriacao)}
                      </span>
                    </div>

                    <button
                      className="btn-expand"
                      onClick={() =>
                        setExpandedId(expandedId === cifra.id ? null : cifra.id)
                      }
                    >
                      {expandedId === cifra.id ? '▼ Ocultar' : '▶ Ver Cifra'}
                    </button>

                    {expandedId === cifra.id && (
                      <div className="cifra-expanded">
                        <div className="cifra-content">
                          <pre>{cifra.cifra}</pre>
                        </div>

                        {cifra.comentarios && (
                          <div className="cifra-comments">
                            <strong>Comentários do Músico:</strong>
                            <p>{cifra.comentarios}</p>
                          </div>
                        )}

                        <div className="cifra-actions">
                          <button
                            className="btn-approve"
                            onClick={() => {
                              aprovarCifra(cifra.id);
                              alert('Cifra aprovada com sucesso!');
                            }}
                          >
                            <EmojiIcon emoji="✅" /> Aprovar
                          </button>

                          <button
                            className="btn-reject"
                            onClick={() => {
                              const motivo = prompt('Motivo da rejeição:');
                              if (motivo) {
                                rejeitarCifra(cifra.id, motivo);
                                alert('Cifra rejeitada com sucesso!');
                              }
                            }}
                          >
                            <EmojiIcon emoji="❌" /> Rejeitar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'aprovadas' && (
          <div className="tab-content">
            {cifrasAprovadas.length === 0 ? (
              <div className="empty-state">
                <EmojiIcon emoji="📭" /> Nenhuma cifra aprovada ainda.
              </div>
            ) : (
              <div className="cifras-list">
                {cifrasAprovadas.map(cifra => (
                  <div key={cifra.id} className="cifra-card approved">
                    <div className="cifra-header">
                      <div>
                        <h3>{cifra.titulo}</h3>
                        <span className="artista">{cifra.artista}</span>
                      </div>
                      <span className="badge-approved">✅ Aprovada</span>
                    </div>

                    <div className="cifra-meta">
                      <span>
                        <EmojiIcon emoji="🎹" /> Tom: {cifra.tom}
                      </span>
                      <span>
                        <EmojiIcon emoji="📊" /> Dificuldade: {cifra.dificuldade}
                      </span>
                      <span>
                        <EmojiIcon emoji="📅" /> {formatarData(cifra.dataAprovacao)}
                      </span>
                    </div>

                    <button
                      className="btn-delete"
                      onClick={() => deletarCifra(cifra.id, 'aprovada')}
                    >
                      <EmojiIcon emoji="🗑️" /> Deletar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'rejeitadas' && (
          <div className="tab-content">
            {cifrasRejeitadas.length === 0 ? (
              <div className="empty-state">
                <EmojiIcon emoji="📭" /> Nenhuma cifra rejeitada.
              </div>
            ) : (
              <div className="cifras-list">
                {cifrasRejeitadas.map(cifra => (
                  <div key={cifra.id} className="cifra-card rejected">
                    <div className="cifra-header">
                      <div>
                        <h3>{cifra.titulo}</h3>
                        <span className="artista">{cifra.artista}</span>
                      </div>
                      <span className="badge-rejected">❌ Rejeitada</span>
                    </div>

                    <div className="cifra-meta">
                      <span>
                        <EmojiIcon emoji="🎹" /> Tom: {cifra.tom}
                      </span>
                      <span>
                        <EmojiIcon emoji="📊" /> Dificuldade: {cifra.dificuldade}
                      </span>
                      <span>
                        <EmojiIcon emoji="📅" /> {formatarData(cifra.dataRejeicao)}
                      </span>
                    </div>

                    <div className="rejection-reason">
                      <strong>Motivo da Rejeição:</strong>
                      <p>{cifra.motivoRejeicao}</p>
                    </div>

                    <button
                      className="btn-delete"
                      onClick={() => deletarCifra(cifra.id, 'rejeitada')}
                    >
                      <EmojiIcon emoji="🗑️" /> Deletar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão de Tema */}
      <ThemeToggle />
    </div>
  );
}
