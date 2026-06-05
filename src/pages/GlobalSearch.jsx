import { useState } from "react";
import { Link } from "react-router-dom";
import { transposeText } from "../utils/musicLogic";
import { Search, Music, ArrowLeft, Globe, X, Minus, Plus, Loader2, AlertCircle } from "lucide-react";
import logo from "../assets/logooficial.png";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transposition, setTransposition] = useState(0);
  const [searchError, setSearchError] = useState("");

  // APIs disponíveis
  const LYRICS_OVH_API = "https://api.lyrics.ovh/v1";
  // Chave da Vagalume: prioriza variável de ambiente (VITE_VAGALUME_API_KEY),
  // com fallback para a chave pública padrão.
  const VAGALUME_API_KEY =
    import.meta.env.VITE_VAGALUME_API_KEY || "660a4395f992ff67786584e238f501aa";

  // Função para converter string para slug
  const toSlug = (str) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Estratégias de requisição: tenta direto primeiro (APIs com CORS aberto,
  // como Lyrics.ovh) e, em caso de bloqueio CORS, recorre a proxies públicos
  // confiáveis. Cada proxy recebe a URL-alvo já codificada.
  const PROXIES = [
    (target) => target, // direto
    (target) => `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
    (target) => `https://corsproxy.io/?url=${encodeURIComponent(target)}`,
  ];

  // Função para tentar múltiplas estratégias com timeout robusto
  const fetchWithProxy = async (targetUrl, isJson = true, timeoutMs = 12000) => {
    let lastError = null;

    for (const buildUrl of PROXIES) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const url = buildUrl(targetUrl);
        const response = await fetch(url, {
          // NÃO enviar header "Origin": é um header proibido e o navegador o ignora.
          headers: { Accept: isJson ? "application/json, text/plain, */*" : "text/plain, */*" },
          signal: controller.signal,
        });

        if (!response.ok) {
          lastError = new Error(`HTTP ${response.status}`);
          continue;
        }

        // Alguns proxies retornam text/plain mesmo para JSON: parse defensivo.
        const raw = await response.text();
        if (!raw) {
          lastError = new Error("Resposta vazia");
          continue;
        }
        if (!isJson) return raw;
        try {
          return JSON.parse(raw);
        } catch {
          lastError = new Error("JSON inválido");
          continue;
        }
      } catch (e) {
        lastError = e;
        console.log(e?.name === "AbortError" ? "Timeout na requisição..." : "Estratégia falhou, tentando próxima...");
      } finally {
        clearTimeout(timeoutId);
      }
    }

    throw lastError || new Error("Falha na conexão");
  };

  // ========== BUSCA LETRAS (Lyrics.ovh) ==========
  const searchLyrics = async (artist, song) => {
    const url = `${LYRICS_OVH_API}/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
    const data = await fetchWithProxy(url, true, 15000);
    return data.lyrics;
  };

  // Busca informações do artista no Vagalume
  const fetchArtistInfo = async (artistSlug) => {
    try {
      const url = `https://api.vagalume.com.br/${artistSlug}/index.js`;
      const data = await fetchWithProxy(url);
      return data;
    } catch {
      return null;
    }
  };

  // ========== BUSCA PRINCIPAL ==========
  const searchMusic = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults([]);
    setSelectedSong(null);
    setSearchError("");

    const parts = query.split('-').map(p => p.trim());
    
    try {
      if (parts.length >= 2) {
        const artist = parts[0];
        const song = parts.slice(1).join(' ');
        
        try {
          const lyrics = await searchLyrics(artist, song);
          if (lyrics) {
            setSelectedSong({
              title: song,
              artist: artist,
              text: lyrics
            });
            setTransposition(0);
            return;
          }
        } catch {
          console.log("Lyrics.ovh não encontrou, tentando lista do artista...");
        }
        
        const artistSlug = toSlug(artist);
        const artistData = await fetchArtistInfo(artistSlug);
        
        if (artistData?.artist?.lyrics?.item) {
          const songSlug = toSlug(song);
          const matchingSongs = artistData.artist.lyrics.item.filter(item => 
            toSlug(item.desc).includes(songSlug) || songSlug.includes(toSlug(item.desc))
          );
          
          const songsToShow = matchingSongs.length > 0 
            ? matchingSongs 
            : artistData.artist.lyrics.item;
          
          setResults(songsToShow.slice(0, 20).map(item => ({
            id: item.id,
            title: item.desc,
            band: artistData.artist.desc,
          })));
          
          if (matchingSongs.length === 0) {
            setSearchError(`"${song}" não encontrada. Mostrando outras músicas de ${artistData.artist.desc}`);
          }
          return;
        }
      }
      
      const artistSlug = toSlug(query);
      const artistData = await fetchArtistInfo(artistSlug);
      
      if (artistData?.artist?.lyrics?.item) {
        setResults(artistData.artist.lyrics.item.slice(0, 25).map(item => ({
          id: item.id,
          title: item.desc,
          band: artistData.artist.desc,
        })));
        return;
      }
      
      setSearchError(`Nenhum resultado para "${query}". Use o formato: Artista - Música`);
      
    } catch (error) {
      console.error("Erro na busca:", error);
      setSearchError("Erro na conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // ========== BUSCAR LETRA DA MÚSICA SELECIONADA ==========
  const fetchSongContent = async (songInfo) => {
    setLoading(true);
    setSearchError("");
    
    const artist = songInfo.band;
    const song = songInfo.title;
    
    try {
      try {
        const lyrics = await searchLyrics(artist, song);
        if (lyrics) {
          setSelectedSong({
            title: song,
            artist: artist,
            text: lyrics
          });
          setTransposition(0);
          return;
        }
      } catch {
        console.log("Lyrics.ovh falhou, tentando Vagalume...");
      }
      
      const targetUrl = `https://api.vagalume.com.br/search.php?art=${encodeURIComponent(artist)}&mus=${encodeURIComponent(song)}&apikey=${VAGALUME_API_KEY}`;
      const data = await fetchWithProxy(targetUrl);
      
      if (data.type === 'exact' || data.type === 'approx') {
        setSelectedSong({
          title: data.mus[0].name,
          artist: data.art.name,
          text: data.mus[0].text 
        });
        setTransposition(0);
        return;
      }
      
      setSearchError("Letra não disponível para esta música.");
    } catch (error) {
      console.error("Erro ao buscar letra:", error);
      setSearchError("Não foi possível carregar a letra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* --- NAVBAR PADRÃO --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center justify-center" aria-label="Ir para a página inicial">
            <img src={logo} alt="Logo Tocando Pra Valer" className="h-10 w-auto rounded-lg" />
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Voltar</span>
          </Link>
        </div>
      </nav>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* --- HEADER DA PÁGINA --- */}
          {!selectedSong && (
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                <Globe size={16} />
                Busca Global
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Qual música você quer tocar?
              </h1>
              <p className="text-gray-600 max-w-xl mx-auto mb-2">
                Busque milhões de letras usando Lyrics.ovh + Vagalume.
              </p>
              <p className="text-sm text-gray-500">
                💡 <strong>Dica:</strong> Para melhores resultados, busque no formato <strong className="text-blue-500">Artista - Música</strong>
              </p>
            </div>
          )}

          {/* --- CAMPO DE BUSCA --- */}
          {!selectedSong && (
            <div className="max-w-2xl mx-auto mb-10">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Artista - Música (ex: Legião Urbana - Tempo Perdido)" 
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchMusic()}
                  />
                </div>
                <button 
                  onClick={searchMusic}
                  disabled={loading}
                  className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Search size={20} />}
                  <span className="hidden sm:inline">Buscar</span>
                </button>
              </div>
            </div>
          )}

          {/* --- LOADING --- */}
          {loading && !selectedSong && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2 size={40} className="text-blue-500 animate-spin" />
              <p className="text-gray-600">Buscando músicas...</p>
            </div>
          )}

          {/* --- MENSAGEM DE ERRO --- */}
          {searchError && !loading && (
            <div className="max-w-2xl mx-auto mb-8 flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
              <p className="text-amber-800">{searchError}</p>
            </div>
          )}

          {/* --- LISTA DE RESULTADOS --- */}
          {!selectedSong && results.length > 0 && !loading && (
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-gray-500 mb-4">
                Encontramos <span className="font-semibold text-blue-500">{results.length}</span> resultados:
              </p>
              <div className="space-y-2">
                {results.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => fetchSongContent(item)}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Music size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500">{item.band}</p>
                      </div>
                    </div>
                    <ArrowLeft size={18} className="rotate-180 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- VISUALIZADOR DA MÚSICA --- */}
          {selectedSong && !loading && (
            <div className="max-w-4xl mx-auto">
              
              {/* Barra de Ferramentas */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 sm:p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                    {selectedSong.title}
                  </h2>
                  <p className="text-blue-500 font-medium flex items-center gap-2">
                    <Music size={18} />
                    {selectedSong.artist}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Controle de transposição */}
                  <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => setTransposition(prev => prev - 1)} 
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <div className="px-3 font-mono font-bold text-blue-500 min-w-[40px] text-center">
                      {transposition > 0 ? `+${transposition}` : transposition}
                    </div>
                    <button 
                      onClick={() => setTransposition(prev => prev + 1)} 
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedSong(null)}
                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <X size={18} />
                    <span className="hidden sm:inline">Fechar</span>
                  </button>
                </div>
              </div>

              {/* Letra/Cifra */}
              <div className="p-4 sm:p-8 bg-gray-50 border border-gray-200 rounded-lg min-h-[400px]">
                <pre className="whitespace-pre-wrap font-mono text-base sm:text-lg leading-relaxed text-gray-800 overflow-x-auto">
                  {transposeText(selectedSong.text, transposition)}
                </pre>
              </div>
              
              {/* Botão voltar à busca */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setSelectedSong(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Voltar à busca
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}