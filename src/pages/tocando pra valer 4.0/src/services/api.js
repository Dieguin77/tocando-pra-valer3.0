// API Service para futuras integrações
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const api = {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error('Erro na requisição');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro na requisição');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Métodos específicos para o projeto
  async sendContactForm(formData) {
    // Futura integração com backend
    console.log('Form data:', formData);
    return { success: true, message: 'Mensagem enviada!' };
  },
};
