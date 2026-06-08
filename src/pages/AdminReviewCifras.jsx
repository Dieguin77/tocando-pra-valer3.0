import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { 
  Guitar, Clock, CheckCircle, XCircle, PartyPopper, Piano, BarChart2, 
  Calendar, ChevronDown, ChevronRight, Trash2, ArrowLeft, MailX,
  Cloud, CloudOff, RefreshCw, Loader2
} from 'lucide-react';
import { 
  buscarCifras, 
  aprovarCifra as aprovarCifraService, 
  rejeitarCifra as rejeitarCifraService, 
  deletarCifra as deletarCifraService,
  getBackendInfo 
} from '../services/cifrasService';
import './AdminReviewCifras.css';

export default function AdminReviewCifras() {
  const backendInfo = getBackendInfo();
  
  const [cifrasPendentes, setCifrasPendentes] = useState([]);
  const [cifrasAprovadas, setCifrasAprovadas] = useState([]);
  const [cifrasRejeitadas, setCifrasRejeitadas] = useState([]);
  const [tab, setTab] = useState('pendentes');
  const [expandedId, setExpandedId] = useState(null);
  const [_motivoRejeicao, setMotivoRejeicao] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    carregarCifras();
  }, []);

  const carregarCifras = async () => {
    setIsLoading(true);
    try {
      // Usar o novo serviço de cifras
      const [pendentes, aprovadas, rejeitadas] = await Promise.all([
        buscarCifras('pendente'),
        buscarCifras('aprovado'),
        buscarCifras('rejeitado'),
      ]);

      setCifrasPendentes(pendentes);
      setCifrasAprovadas(aprovadas);
      setCifrasRejeitadas(rejeitadas);
    } catch (error) {
      console.error('Erro ao carregar cifras:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await carregarCifras();
    setIsRefreshing(false);
  };

  const aprovarCifra = async (id) => {
    try {
      await aprovarCifraService(id);
      await carregarCifras(); // Recarregar dados
      alert('✅ Cifra aprovada com sucesso!');
    } catch (error) {
      console.error('Erro ao aprovar cifra:', error);
      alert('❌ Erro ao aprovar cifra');
    }
  };

  const rejeitarCifra = async (id, motivo) => {
    if (!motivo?.trim()) {
      alert('Informe o motivo da rejeição');
      return;
    }

    try {
      await rejeitarCifraService(id, motivo);
      await carregarCifras(); // Recarregar dados
      setMotivoRejeicao('');
      alert('Cifra rejeitada com sucesso!');
    } catch (error) {
      console.error('Erro ao rejeitar cifra:', error);
      alert('❌ Erro ao rejeitar cifra');
    }
  };

  const deletarCifra = async (id, tipo) => {
    if (!confirm('Tem certeza que deseja deletar esta cifra?')) return;

    try {
      await deletarCifraService(id, tipo);
      await carregarCifras(); // Recarregar dados
    } catch (error) {
      console.error('Erro ao deletar cifra:', error);
      alert('❌ Erro ao deletar cifra');
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
        <Link to="/" className="back-link flex items-center gap-1"><ArrowLeft size={16} /> Voltar</Link>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="flex items-center gap-2">
            <Guitar size={28} /> Revisar Cifras Enviadas
          </h1>
          
          {/* Indicador de Backend + Refresh */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              backendInfo.isConfigured 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {backendInfo.isConfigured ? (
                <>
                  <Cloud size={14} />
                  <span>Backend: {backendInfo.backend}</span>
                </>
              ) : (
                <>
                  <CloudOff size={14} />
                  <span>Modo Local</span>
                </>
              )}
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
              Atualizar
            </button>
          </div>
        </div>
        
        <p>Gerencie as cifras submetidas pela comunidade</p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="text-gray-500">Carregando cifras...</p>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="review-tabs">
            <button
              className={`tab ${tab === 'pendentes' ? 'active' : ''}`}
              onClick={() => setTab('pendentes')}
            >
              <Clock size={16} /> Pendentes ({cifrasPendentes.length})
            </button>
            <button
              className={`tab ${tab === 'aprovadas' ? 'active' : ''}`}
              onClick={() => setTab('aprovadas')}
            >
              <CheckCircle size={16} /> Aprovadas ({cifrasAprovadas.length})
            </button>
            <button
              className={`tab ${tab === 'rejeitadas' ? 'active' : ''}`}
              onClick={() => setTab('rejeitadas')}
            >
              <XCircle size={16} /> Rejeitadas ({cifrasRejeitadas.length})
            </button>
          </div>

          {/* Conteúdo */}
          <div className="review-content">
            {tab === 'pendentes' && (
              <div className="tab-content">
                {cifrasPendentes.length === 0 ? (
                  <div className="empty-state flex items-center gap-2">
                    <PartyPopper size={20} /> Parabéns! Não há cifras pendentes.
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
                      <span className="flex items-center gap-1">
                        <Piano size={14} /> Tom: {cifra.tom}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart2 size={14} /> Dificuldade: {cifra.dificuldade}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {formatarData(cifra.dataCriacao)}
                      </span>
                    </div>

                    <button
                      className="btn-expand flex items-center gap-1"
                      onClick={() =>
                        setExpandedId(expandedId === cifra.id ? null : cifra.id)
                      }
                    >
                      {expandedId === cifra.id ? <><ChevronDown size={14} /> Ocultar</> : <><ChevronRight size={14} /> Ver Cifra</>}
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
                            className="btn-approve flex items-center gap-1"
                            onClick={() => aprovarCifra(cifra.id)}
                          >
                            <CheckCircle size={16} /> Aprovar
                          </button>

                          <button
                            className="btn-reject flex items-center gap-1"
                            onClick={() => {
                              const motivo = prompt('Motivo da rejeição:');
                              if (motivo) {
                                rejeitarCifra(cifra.id, motivo);
                              }
                            }}
                          >
                            <XCircle size={16} /> Rejeitar
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
              <div className="empty-state flex items-center gap-2">
                <MailX size={20} /> Nenhuma cifra aprovada ainda.
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
                      <span className="badge-approved flex items-center gap-1"><CheckCircle size={14} /> Aprovada</span>
                    </div>

                    <div className="cifra-meta">
                      <span className="flex items-center gap-1">
                        <Piano size={14} /> Tom: {cifra.tom}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart2 size={14} /> Dificuldade: {cifra.dificuldade}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {formatarData(cifra.dataAprovacao)}
                      </span>
                    </div>

                    <button
                      className="btn-delete flex items-center gap-1"
                      onClick={() => deletarCifra(cifra.id, 'aprovado')}
                    >
                      <Trash2 size={16} /> Deletar
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
              <div className="empty-state flex items-center gap-2">
                <MailX size={20} /> Nenhuma cifra rejeitada.
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
                      <span className="badge-rejected flex items-center gap-1"><XCircle size={14} /> Rejeitada</span>
                    </div>

                    <div className="cifra-meta">
                      <span className="flex items-center gap-1">
                        <Piano size={14} /> Tom: {cifra.tom}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart2 size={14} /> Dificuldade: {cifra.dificuldade}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {formatarData(cifra.dataRejeicao)}
                      </span>
                    </div>

                    <div className="rejection-reason">
                      <strong>Motivo da Rejeição:</strong>
                      <p>{cifra.motivoRejeicao}</p>
                    </div>

                    <button
                      className="btn-delete flex items-center gap-1"
                      onClick={() => deletarCifra(cifra.id, 'rejeitada')}
                    >
                      <Trash2 size={16} /> Deletar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      </>
      )}

      {/* Botão de Tema */}
      <ThemeToggle />
    </div>
  );
}
