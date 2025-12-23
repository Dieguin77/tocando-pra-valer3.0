// src/services/vagalume.js

// Para usar esta API, você precisa:
// 1. Obter uma chave de API no site do Vagalume.
// 2. Adicionar a chave em um arquivo .env na raiz do projeto:
//    VITE_VAGALUME_API_KEY=sua_chave_aqui

const API_KEY = import.meta.env.VITE_VAGALUME_API_KEY;

export const fetchLyrics = async (artist, song) => {
  if (!API_KEY) {
    console.warn('VITE_VAGALUME_API_KEY não configurada. A busca pode falhar. Adicione a chave em seu .env');
    // Você pode decidir se quer continuar sem a chave ou retornar null aqui.
    // Por enquanto, tentaremos sem a chave.
  }

  try {
    const apiUrl = `https://api.vagalume.com.br/search.php?art=${encodeURIComponent(artist)}&mus=${encodeURIComponent(song)}${API_KEY ? `&apikey=${API_KEY}` : ''}`;
    
    const response = await fetch(apiUrl);

    const data = await response.json();

    // O Vagalume retorna type: 'exact' ou 'approx' quando encontra
    if (data.type === 'exact' || data.type === 'approx' && data.mus.length > 0) {
      return data.mus[0].text; // Retorna apenas o texto da letra
    } else {
      console.log(`Letra de '${song}' por '${artist}' não encontrada no Vagalume.`);
      return null; // Não encontrou
    }
  } catch (error) {
    console.error("Erro ao buscar letra no Vagalume:", error);
    return null;
  }
};