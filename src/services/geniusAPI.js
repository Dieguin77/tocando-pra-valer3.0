// src/services/geniusAPI.js

const GENIUS_API_BASE = 'https://api.genius.com';

// Para usar esta API, você precisa:
// 1. Ir em https://genius.com/api-clients
// 2. Criar uma conta e gerar um token
// 3. Adicionar o token em um arquivo .env:
//    VITE_GENIUS_ACCESS_TOKEN=seu_token_aqui

const GENIUS_ACCESS_TOKEN = import.meta.env.VITE_GENIUS_ACCESS_TOKEN;

/**
 * Busca música no Genius
 * @param {string} title - Título da música
 * @param {string} artist - Artista
 * @returns {Promise<Object>} Dados da música
 */
export const searchSongOnGenius = async (title, artist) => {
  if (!GENIUS_ACCESS_TOKEN) {
    console.warn('VITE_GENIUS_ACCESS_TOKEN não configurado. Adicione em seu .env');
    return null;
  }

  try {
    const query = `${title} ${artist}`;
    const response = await fetch(
      `${GENIUS_API_BASE}/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API Genius: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.response || !data.response.hits || data.response.hits.length === 0) {
      return null;
    }

    // Retorna o primeiro resultado
    const hit = data.response.hits[0];
    return {
      titulo: hit.result.title,
      artista: hit.result.primary_artist?.name,
      url: hit.result.url,
      imagem: hit.result.song_art_image_url,
      compositores: hit.result.primary_artist?.name || 'Desconhecido',
    };
  } catch (error) {
    console.error('Erro ao buscar música no Genius:', error);
    return null;
  }
};

/**
 * Busca letras de múltiplas músicas
 * @param {Array} musicas - Array de objetos com {titulo, artista}
 * @returns {Promise<Array>} Array de músicas com dados do Genius
 */
export const enrichSongsWithGeniusData = async (musicas) => {
  const enrichedMusicas = [];

  for (const musica of musicas) {
    try {
      // Pequeno delay para respeitar rate limit
      await new Promise(resolve => setTimeout(resolve, 500));

      const geniusData = await searchSongOnGenius(musica.titulo, musica.artista);
      
      if (geniusData) {
        enrichedMusicas.push({
          ...musica,
          ...geniusData,
          url: geniusData.url,
        });
      } else {
        enrichedMusicas.push(musica);
      }
    } catch (error) {
      console.error(`Erro ao buscar ${musica.titulo}:`, error);
      enrichedMusicas.push(musica);
    }
  }

  return enrichedMusicas;
};

/**
 * Busca letra em HTML do Genius (requer parsing)
 * Nota: Isso requer um servidor backend pois CORS pode bloquear
 * @param {string} url - URL da música no Genius
 * @returns {Promise<string>} Letra da música
 */
export const getLyricsFromGenius = async (url) => {
  try {
    // Esta é uma operação complexa que requer backend
    // Genius não fornece letras via API por razões legais
    // Você precisa fazer parsing do HTML da página
    
    console.warn('Para obter letras do Genius, use um serviço backend');
    return null;
  } catch (error) {
    console.error('Erro ao buscar letra:', error);
    return null;
  }
};
