import emailjs from 'emailjs-com';

// As credenciais do EmailJS devem ser armazenadas em um arquivo .env
// Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
// VITE_EMAILJS_SERVICE_ID=seu_service_id
// VITE_EMAILJS_TEMPLATE_CONFIRMACAO=seu_template_id
// VITE_EMAILJS_TEMPLATE_NOTIF_ADMIN=seu_template_id
// VITE_EMAILJS_TEMPLATE_APROVACAO=seu_template_id
// VITE_EMAILJS_TEMPLATE_REJEICAO=seu_template_id
// VITE_EMAILJS_PUBLIC_KEY=sua_public_key
// VITE_ADMIN_EMAIL=seu_email_de_admin

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_CONFIRMACAO = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMACAO;
const TEMPLATE_ID_NOTIF_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIF_ADMIN;
const TEMPLATE_ID_APROVACAO = import.meta.env.VITE_EMAILJS_TEMPLATE_APROVACAO;
const TEMPLATE_ID_REJEICAO = import.meta.env.VITE_EMAILJS_TEMPLATE_REJEICAO;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const areEmailJsCredsAvailable = SERVICE_ID && TEMPLATE_ID_CONFIRMACAO && TEMPLATE_ID_NOTIF_ADMIN && TEMPLATE_ID_APROVACAO && TEMPLATE_ID_REJEICAO && PUBLIC_KEY && ADMIN_EMAIL;

/**
 * Inicializar EmailJS
 * Chamado uma única vez na App
 */
export const initEmailJS = () => {
  if (!areEmailJsCredsAvailable) {
    console.warn('Credenciais do EmailJS não configuradas. Verifique seu arquivo .env');
    return;
  }
  try {
    emailjs.init(PUBLIC_KEY);
    console.log('✅ EmailJS inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar EmailJS:', error);
  }
};

/**
 * Enviar e-mail de confirmação ao músico
 * @param {string} musicoEmail - Email do músico
 * @param {string} titulo - Título da música
 * @param {string} artista - Nome do artista
 */
export const enviarConfirmacao = async (musicoEmail, titulo, artista) => {
    if (!areEmailJsCredsAvailable) return false;
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_CONFIRMACAO, {
      to_email: musicoEmail,
      titulo: titulo,
      artista: artista,
      data_envio: new Date().toLocaleDateString('pt-BR'),
    });

    console.log('✅ Email de confirmação enviado:', response);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar confirmação:', error);
    return false;
  }
};

/**
 * Notificar admin sobre nova cifra pendente
 * @param {object} cifra - Dados da cifra
 */
export const notificarAdminNovaCifra = async (cifra) => {
    if (!areEmailJsCredsAvailable) return false;
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_NOTIF_ADMIN, {
      to_email: ADMIN_EMAIL,
      titulo: cifra.titulo,
      artista: cifra.artista,
      musico_email: cifra.musicoEmail,
      tom: cifra.tom,
      dificuldade: cifra.dificuldade,
      data_envio: new Date().toLocaleDateString('pt-BR'),
      link_admin: `${window.location.origin}/admin/revisar-cifras`,
    });

    console.log('✅ Notificação de admin enviada:', response);
    return true;
  } catch (error) {
    console.error('❌ Erro ao notificar admin:', error);
    return false;
  }
};

/**
 * Enviar notificação de aprovação da cifra
 * @param {string} musicoEmail - Email do músico
 * @param {string} titulo - Título da música
 * @param {string} artista - Nome do artista
 */
export const enviarNotificacaoAprovacao = async (musicoEmail, titulo, artista) => {
    if (!areEmailJsCredsAvailable) return false;
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_APROVACAO, {
      to_email: musicoEmail,
      titulo: titulo,
      artista: artista,
      data_aprovacao: new Date().toLocaleDateString('pt-BR'),
      link_repertorio: `${window.location.origin}/musicas`,
    });

    console.log('✅ Email de aprovação enviado:', response);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar aprovação:', error);
    return false;
  }
};

/**
 * Enviar notificação de rejeição da cifra
 * @param {string} musicoEmail - Email do músico
 * @param {string} titulo - Título da música
 * @param {string} motivo - Motivo da rejeição
 */
export const enviarNotificacaoRejeicao = async (musicoEmail, titulo, motivo) => {
    if (!areEmailJsCredsAvailable) return false;
  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_REJEICAO, {
      to_email: musicoEmail,
      titulo: titulo,
      motivo: motivo || 'Verifique o formato da cifra e tente novamente',
      data_rejeicao: new Date().toLocaleDateString('pt-BR'),
      link_upload: `${window.location.origin}/upload`,
    });

    console.log('✅ Email de rejeição enviado:', response);
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar rejeição:', error);
    return false;
  }
};
