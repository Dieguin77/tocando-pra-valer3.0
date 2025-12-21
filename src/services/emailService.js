import emailjs from 'emailjs-com';

// Configurar EmailJS - MUDE PARA SUAS CREDENCIAIS
const SERVICE_ID = 'service_tocandopravaler'; // Seu Service ID
const TEMPLATE_ID_CONFIRMACAO = 'template_confirmacao'; // Template para confirmação
const TEMPLATE_ID_NOTIF_ADMIN = 'template_notif_admin'; // Template para notificar admin
const TEMPLATE_ID_APROVACAO = 'template_aprovacao'; // Template para aprovação
const TEMPLATE_ID_REJEICAO = 'template_rejeicao'; // Template para rejeição
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Seu Public Key

// Email de admin para notificações
const ADMIN_EMAIL = 'admin@tocandopravaler.com'; // MUDE PARA SEU EMAIL

/**
 * Inicializar EmailJS
 * Chamado uma única vez na App
 */
export const initEmailJS = () => {
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
