// src/services/vagalume.js

// Para usar esta API, você precisa:
// 1. Obter uma chave de API no site do Vagalume.
// 2. Adicionar a chave em um arquivo .env na raiz do projeto:
//    VITE_VAGALUME_API_KEY=sua_chave_aqui

const API_KEY = import.meta.env.VITE_VAGALUME_API_KEY;
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const memoryCache = new Map();

const buildCacheKey = (artist, song) => `${artist}::${song}`.toLowerCase().trim();

const getCachedLyrics = (cacheKey) => {
  const inMemory = memoryCache.get(cacheKey);
  if (inMemory && Date.now() - inMemory.timestamp < CACHE_TTL_MS) {
    return inMemory.value;
  }

  const raw = localStorage.getItem(`lyrics:${cacheKey}`);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      localStorage.removeItem(`lyrics:${cacheKey}`);
      return null;
    }

    memoryCache.set(cacheKey, parsed);
    return parsed.value;
  } catch {
    localStorage.removeItem(`lyrics:${cacheKey}`);
    return null;
  }
};

const setCachedLyrics = (cacheKey, value) => {
  const payload = { value, timestamp: Date.now() };
  memoryCache.set(cacheKey, payload);

  try {
    localStorage.setItem(`lyrics:${cacheKey}`, JSON.stringify(payload));
  } catch {
    // Em ambientes com storage cheio, mantemos ao menos cache em memória.
  }
};

export const fetchLyrics = async (artist, song) => {
  const cacheKey = buildCacheKey(artist, song);
  const cached = getCachedLyrics(cacheKey);

  if (cached) {
    return cached;
  }

  if (!API_KEY) {
    console.warn('VITE_VAGALUME_API_KEY não configurada. A busca pode falhar. Adicione a chave em seu .env');
    // Você pode decidir se quer continuar sem a chave ou retornar null aqui.
    // Por enquanto, tentaremos sem a chave.
  }

  try {
    const apiUrl = `https://api.vagalume.com.br/search.php?art=${encodeURIComponent(artist)}&mus=${encodeURIComponent(song)}${API_KEY ? `&apikey=${API_KEY}` : ''}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();

    // O Vagalume retorna type: 'exact' ou 'approx' quando encontra
    if (data.type === 'exact' || data.type === 'approx' && data.mus.length > 0) {
      const lyrics = data.mus[0].text;
      setCachedLyrics(cacheKey, lyrics);
      return lyrics; // Retorna apenas o texto da letra
    } else {
      console.log(`Letra de '${song}' por '${artist}' não encontrada no Vagalume.`);
      return null; // Não encontrou
    }
  } catch (error) {
    console.error("Erro ao buscar letra no Vagalume:", error);
    return null;
  }
};