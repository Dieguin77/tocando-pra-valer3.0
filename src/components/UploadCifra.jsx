import { useState } from 'react';
import { Music, Mic, FileText, Send, Loader2, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function UploadCifra({ onCifraSubmitted }) {
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    cifra: '',
    tom: 'C',
    compositor: '',
    dificuldade: 'intermediário',
    comentarios: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dificuldades = ['Fácil', 'Intermediário', 'Difícil'];
  const tons = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) newErrors.titulo = 'Título é obrigatório';
    if (!formData.artista.trim()) newErrors.artista = 'Artista é obrigatório';
    if (!formData.cifra.trim()) newErrors.cifra = 'A cifra é obrigatória';
    if (formData.cifra.trim().length < 20)
      newErrors.cifra = 'A cifra deve ter pelo menos 20 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const cifraPendente = {
        id: `cifra_${Date.now()}`,
        ...formData,
        dataCriacao: new Date().toISOString(),
        status: 'pendente',
        musicoEmail: '',
      };

      const cifraspendentes = JSON.parse(
        localStorage.getItem('cifrasPendentes') || '[]'
      );
      cifraspendentes.push(cifraPendente);
      localStorage.setItem('cifrasPendentes', JSON.stringify(cifraspendentes));

      setSuccess(true);
      setFormData({
        titulo: '',
        artista: '',
        cifra: '',
        tom: 'C',
        compositor: '',
        dificuldade: 'intermediário',
        comentarios: '',
      });

      if (onCifraSubmitted) {
        onCifraSubmitted(cifraPendente);
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao enviar cifra:', error);
      setErrors({ submit: 'Erro ao enviar cifra. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '1rem',
    width: '100%',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: '#ff4444',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  };

  return (
    <div 
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(15, 15, 25, 0.8)',
        border: '1px solid rgba(0, 255, 136, 0.2)',
      }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Music size={24} style={{ color: '#00ff88' }} />
          Enviar Cifra
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Compartilhe suas cifras com a comunidade
        </p>
      </div>

      {success && (
        <div 
          className="flex items-center gap-3 p-4 rounded-xl mb-6"
          style={{
            background: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
          }}
        >
          <CheckCircle size={20} style={{ color: '#00ff88' }} />
          <span style={{ color: '#00ff88' }}>Cifra enviada com sucesso! Obrigado por contribuir 🎵</span>
        </div>
      )}

      {errors.submit && (
        <div 
          className="flex items-center gap-3 p-4 rounded-xl mb-6"
          style={{
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
          }}
        >
          <AlertCircle size={20} style={{ color: '#ff4444' }} />
          <span style={{ color: '#ff6666' }}>{errors.submit}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Linha 1: Título e Artista */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>
              <Music size={16} style={{ color: '#00f5ff' }} /> Título da Música *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Aleluia"
              style={errors.titulo ? inputErrorStyle : inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#00f5ff'}
              onBlur={(e) => e.target.style.borderColor = errors.titulo ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'}
            />
            {errors.titulo && (
              <span className="text-xs mt-1 block" style={{ color: '#ff6666' }}>{errors.titulo}</span>
            )}
          </div>

          <div>
            <label style={labelStyle}>
              <Mic size={16} style={{ color: '#bf00ff' }} /> Artista *
            </label>
            <input
              type="text"
              name="artista"
              value={formData.artista}
              onChange={handleChange}
              placeholder="Ex: Gabriela Rocha"
              style={errors.artista ? inputErrorStyle : inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#bf00ff'}
              onBlur={(e) => e.target.style.borderColor = errors.artista ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'}
            />
            {errors.artista && (
              <span className="text-xs mt-1 block" style={{ color: '#ff6666' }}>{errors.artista}</span>
            )}
          </div>
        </div>

        {/* Linha 2: Compositor, Tom, Dificuldade */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label style={labelStyle}>
              ✏️ Compositor
            </label>
            <input
              type="text"
              name="compositor"
              value={formData.compositor}
              onChange={handleChange}
              placeholder="Ex: Gabriela Rocha"
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#00f5ff'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
            />
          </div>

          <div>
            <label style={labelStyle}>
              🎹 Tom
            </label>
            <select 
              name="tom" 
              value={formData.tom} 
              onChange={handleChange}
              style={inputStyle}
            >
              {tons.map(t => (
                <option key={t} value={t} style={{ background: '#0a0a0f', color: '#fff' }}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              📊 Dificuldade
            </label>
            <select
              name="dificuldade"
              value={formData.dificuldade}
              onChange={handleChange}
              style={inputStyle}
            >
              {dificuldades.map(d => (
                <option key={d} value={d.toLowerCase()} style={{ background: '#0a0a0f', color: '#fff' }}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cifra */}
        <div>
          <label style={labelStyle}>
            <FileText size={16} style={{ color: '#00ff88' }} /> Cifra (com acordes) *
          </label>
          <textarea
            name="cifra"
            value={formData.cifra}
            onChange={handleChange}
            placeholder={`Cole a cifra aqui. Ex:\nC      F\nAleluia, aleluia\nAm     G\nQue reina em meu coração`}
            rows="10"
            style={{
              ...inputStyle,
              ...(errors.cifra ? { borderColor: '#ff4444' } : {}),
              fontFamily: 'monospace',
              resize: 'vertical',
            }}
            onFocus={(e) => e.target.style.borderColor = '#00ff88'}
            onBlur={(e) => e.target.style.borderColor = errors.cifra ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              {formData.cifra.length} caracteres
            </span>
            {errors.cifra && (
              <span className="text-xs" style={{ color: '#ff6666' }}>{errors.cifra}</span>
            )}
          </div>
        </div>

        {/* Comentários */}
        <div>
          <label style={labelStyle}>
            💬 Comentários (opcional)
          </label>
          <textarea
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Ex: Essa é a versão simplificada, toque com cuidado no refrão..."
            rows="3"
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = '#00f5ff'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          />
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          style={{
            background: loading ? 'rgba(0, 255, 136, 0.3)' : 'linear-gradient(135deg, #00ff88, #00f5ff)',
            color: loading ? 'rgba(255, 255, 255, 0.7)' : '#000',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(0, 255, 136, 0.3)',
          }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Send size={20} /> Enviar Cifra
            </>
          )}
        </button>

        <div 
          className="flex items-start gap-3 p-4 rounded-xl"
          style={{
            background: 'rgba(0, 245, 255, 0.1)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
          }}
        >
          <Info size={18} style={{ color: '#00f5ff', flexShrink: 0, marginTop: '2px' }} />
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Sua cifra será <strong style={{ color: '#00f5ff' }}>revisada</strong> antes de ser publicada.
            Certifique-se de que está correta!
          </p>
        </div>
      </form>
    </div>
  );
}

