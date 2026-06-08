import { useState } from 'react';
import { Music, Mic, FileText, Send, Loader2, CheckCircle, AlertCircle, Info, Cloud, CloudOff, Mail } from 'lucide-react';
import { enviarCifra, getBackendInfo } from '../services/cifrasService';
import { enviarConfirmacao, notificarAdminNovaCifra } from '../services/emailService';

export default function UploadCifra({ onCifraSubmitted }) {
  const backendInfo = getBackendInfo();
  
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    cifra: '',
    tom: 'C',
    compositor: '',
    dificuldade: 'intermediário',
    comentarios: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const dificuldades = ['Fácil', 'Intermediário', 'Difícil'];
  const tons = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) newErrors.titulo = 'Título é obrigatório';
    if (!formData.artista.trim()) newErrors.artista = 'Artista é obrigatório';
    if (!formData.cifra.trim()) newErrors.cifra = 'A cifra é obrigatória';
    if (formData.cifra.trim().length < 20)
      newErrors.cifra = 'A cifra deve ter pelo menos 20 caracteres';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'E-mail inválido';

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
    setOfflineMode(false);

    try {
      // Usar o novo serviço de cifras
      const result = await enviarCifra(formData);

      if (result.offline) {
        setOfflineMode(true);
      }

      // Enviar e-mail de confirmação se o cliente informou o e-mail
      if (formData.email) {
        try {
          await enviarConfirmacao(formData.email, formData.titulo, formData.artista);
          console.log('✅ E-mail de confirmação enviado para:', formData.email);
        } catch (emailError) {
          console.warn('⚠️ Não foi possível enviar e-mail de confirmação:', emailError);
        }
      }

      // Notificar administrador sobre nova cifra pendente de revisão
      try {
        await notificarAdminNovaCifra(result.cifra);
        console.log('✅ Administrador notificado sobre nova cifra pendente.');
      } catch (notifError) {
        console.warn('⚠️ Não foi possível notificar o administrador:', notifError);
      }

      setSuccess(true);
      setFormData({
        titulo: '',
        artista: '',
        cifra: '',
        tom: 'C',
        compositor: '',
        dificuldade: 'intermediário',
        comentarios: '',
        email: '',
      });

      if (onCifraSubmitted) {
        onCifraSubmitted(result.cifra);
      }

      setTimeout(() => {
        setSuccess(false);
        setOfflineMode(false);
      }, 5000);
    } catch (error) {
      console.error('Erro ao enviar cifra:', error);
      setErrors({ submit: 'Erro ao enviar cifra. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const inputErrorClasses = "w-full px-4 py-3 bg-white border border-red-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all";
  const labelClasses = "flex items-center gap-2 mb-2 font-medium text-gray-700";

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Music size={22} className="text-blue-500" />
            Enviar Cifra
          </h2>
          {/* Indicador de Backend */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            backendInfo.isConfigured 
              ? 'bg-green-50 text-green-600' 
              : 'bg-amber-50 text-amber-600'
          }`}>
            {backendInfo.isConfigured ? (
              <>
                <Cloud size={14} />
                <span>Sincronizado</span>
              </>
            ) : (
              <>
                <CloudOff size={14} />
                <span>Modo Local</span>
              </>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          Compartilhe suas cifras com a comunidade
        </p>
      </div>

      {success && (
        <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${
          offlineMode 
            ? 'bg-amber-50 border border-amber-200' 
            : 'bg-green-50 border border-green-200'
        }`}>
          <CheckCircle size={20} className={offlineMode ? 'text-amber-500' : 'text-green-500'} />
          <div>
            <span className={offlineMode ? 'text-amber-700' : 'text-green-700'}>
              {offlineMode 
                ? 'Cifra salva localmente (modo offline) 📱'
                : 'Cifra enviada com sucesso! Obrigado por contribuir 🎵'
              }
            </span>
            {offlineMode && (
              <p className="text-xs text-amber-600 mt-1">
                Será sincronizada quando o backend estiver configurado.
              </p>
            )}
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
          <AlertCircle size={20} className="text-red-500" />
          <span className="text-red-700">{errors.submit}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Linha 1: Título e Artista */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>
              <Music size={16} className="text-gray-400" /> Título da Música *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Aleluia"
              className={errors.titulo ? inputErrorClasses : inputClasses}
            />
            {errors.titulo && (
              <span className="text-xs text-red-500 mt-1 block">{errors.titulo}</span>
            )}
          </div>

          <div>
            <label className={labelClasses}>
              <Mic size={16} className="text-gray-400" /> Artista *
            </label>
            <input
              type="text"
              name="artista"
              value={formData.artista}
              onChange={handleChange}
              placeholder="Ex: Gabriela Rocha"
              className={errors.artista ? inputErrorClasses : inputClasses}
            />
            {errors.artista && (
              <span className="text-xs text-red-500 mt-1 block">{errors.artista}</span>
            )}
          </div>
        </div>

        {/* E-mail para confirmação */}
        <div>
          <label className={labelClasses}>
            <Mail size={16} className="text-gray-400" /> Seu E-mail (opcional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: seu@email.com - Receba confirmação do envio"
            className={errors.email ? inputErrorClasses : inputClasses}
          />
          {errors.email && (
            <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
          )}
          <span className="text-xs text-gray-400 mt-1 block">Informe seu e-mail para receber confirmação quando a cifra for enviada</span>
        </div>

        {/* Linha 2: Compositor, Tom, Dificuldade */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className={labelClasses}>
              Compositor
            </label>
            <input
              type="text"
              name="compositor"
              value={formData.compositor}
              onChange={handleChange}
              placeholder="Ex: Gabriela Rocha"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>
              Tom
            </label>
            <select 
              name="tom" 
              value={formData.tom} 
              onChange={handleChange}
              className={inputClasses}
            >
              {tons.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              Dificuldade
            </label>
            <select
              name="dificuldade"
              value={formData.dificuldade}
              onChange={handleChange}
              className={inputClasses}
            >
              {dificuldades.map(d => (
                <option key={d} value={d.toLowerCase()}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cifra */}
        <div>
          <label className={labelClasses}>
            <FileText size={16} className="text-gray-400" /> Cifra (com acordes) *
          </label>
          <textarea
            name="cifra"
            value={formData.cifra}
            onChange={handleChange}
            placeholder={`Cole a cifra aqui. Ex:\nC      F\nAleluia, aleluia\nAm     G\nQue reina em meu coração`}
            rows="10"
            className={`${errors.cifra ? inputErrorClasses : inputClasses} font-mono resize-y`}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">
              {formData.cifra.length} caracteres
            </span>
            {errors.cifra && (
              <span className="text-xs text-red-500">{errors.cifra}</span>
            )}
          </div>
        </div>

        {/* Comentários */}
        <div>
          <label className={labelClasses}>
            Comentários (opcional)
          </label>
          <textarea
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Ex: Essa é a versão simplificada, toque com cuidado no refrão..."
            rows="3"
            className={inputClasses}
          />
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
            loading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600 active:scale-[0.98]'
          }`}
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

        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            Sua cifra será <strong className="text-blue-600">revisada</strong> antes de ser publicada.
            Certifique-se de que está correta!
          </p>
        </div>
      </form>
    </div>
  );
}

