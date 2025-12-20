import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import EmojiIcon from './EmojiIcon';
import './UploadCifra.css';

export default function UploadCifra({ onCifraSubmitted }) {
  const { theme } = useTheme();
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
    // Limpar erro do campo quando usuário começa a digitar
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
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 500));

      const cifraPendente = {
        id: `cifra_${Date.now()}`,
        ...formData,
        dataCriacao: new Date().toISOString(),
        status: 'pendente', // pendente, aprovado, rejeitado
        musicoEmail: '', // Pode ser adicionado se houver autenticação
      };

      // Salvar no localStorage
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

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao enviar cifra:', error);
      setErrors({ submit: 'Erro ao enviar cifra. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`upload-cifra-container ${theme}`}>
      <div className="upload-header">
        <h2>
          <EmojiIcon emoji="🎸" /> Enviar Cifra
        </h2>
        <p>Compartilhe suas cifras com a comunidade</p>
      </div>

      {success && (
        <div className="success-message">
          <EmojiIcon emoji="✅" /> Cifra enviada com sucesso! Obrigado por contribuir 🎵
        </div>
      )}

      {errors.submit && (
        <div className="error-message">
          <EmojiIcon emoji="❌" /> {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        {/* Linha 1: Título e Artista */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="titulo">
              <EmojiIcon emoji="🎵" /> Título da Música *
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Aleluia"
              className={errors.titulo ? 'error' : ''}
            />
            {errors.titulo && <span className="field-error">{errors.titulo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="artista">
              <EmojiIcon emoji="🎤" /> Artista *
            </label>
            <input
              type="text"
              id="artista"
              name="artista"
              value={formData.artista}
              onChange={handleChange}
              placeholder="Ex: Gabriela Rocha"
              className={errors.artista ? 'error' : ''}
            />
            {errors.artista && <span className="field-error">{errors.artista}</span>}
          </div>
        </div>

        {/* Linha 2: Compositor, Tom, Dificuldade */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="compositor">
              <EmojiIcon emoji="✏️" /> Compositor
            </label>
            <input
              type="text"
              id="compositor"
              name="compositor"
              value={formData.compositor}
              onChange={handleChange}
              placeholder="Ex: Gabriela Rocha"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tom">
              <EmojiIcon emoji="🎹" /> Tom
            </label>
            <select id="tom" name="tom" value={formData.tom} onChange={handleChange}>
              {tons.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dificuldade">
              <EmojiIcon emoji="📊" /> Dificuldade
            </label>
            <select
              id="dificuldade"
              name="dificuldade"
              value={formData.dificuldade}
              onChange={handleChange}
            >
              {dificuldades.map(d => (
                <option key={d} value={d.toLowerCase()}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cifra */}
        <div className="form-group full-width">
          <label htmlFor="cifra">
            <EmojiIcon emoji="📝" /> Cifra (com acordes) *
          </label>
          <textarea
            id="cifra"
            name="cifra"
            value={formData.cifra}
            onChange={handleChange}
            placeholder="Cole a cifra aqui. Ex:&#10;C      F&#10;Aleluia, aleluia&#10;Am     G&#10;Que reina em meu coração"
            rows="12"
            className={`cifra-textarea ${errors.cifra ? 'error' : ''}`}
          />
          <div className="char-count">
            {formData.cifra.length} caracteres
          </div>
          {errors.cifra && <span className="field-error">{errors.cifra}</span>}
        </div>

        {/* Comentários */}
        <div className="form-group full-width">
          <label htmlFor="comentarios">
            <EmojiIcon emoji="💬" /> Comentários (opcional)
          </label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Ex: Essa é a versão simplificada, toque com cuidado no refrão..."
            rows="4"
          />
        </div>

        {/* Botão de Envio */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? (
              <>
                <EmojiIcon emoji="⏳" /> Enviando...
              </>
            ) : (
              <>
                <EmojiIcon emoji="🚀" /> Enviar Cifra
              </>
            )}
          </button>
        </div>

        <div className="form-info">
          <p>
            <EmojiIcon emoji="ℹ️" /> Sua cifra será <strong>revisada</strong> antes de ser publicada.
            Certifique-se de que está correta!
          </p>
        </div>
      </form>
    </div>
  );
}
