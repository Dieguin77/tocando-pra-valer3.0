import { useState } from "react";
import { Link } from "react-router-dom";
import { transposeText } from "../utils/musicLogic";
import { Search, Music, ArrowLeft, Globe, Zap, Sparkles, X, Minus, Plus, Loader2, AlertCircle } from "lucide-react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transposition, setTransposition] = useState(0);
  const [searchError, setSearchError] = useState("");

  // APIs disponíveis
  const LYRICS_OVH_API = "https://api.lyrics.ovh/v1";
  const VAGALUME_API_KEY = "660a4395f992ff67786584e238f501aa"; 

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

  // Lista de proxies para CORS
  const PROXIES = ["", "https://corsproxy.io/?"];

  // Função para tentar múltiplos proxies com timeout
  const fetchWithProxy = async (targetUrl, isJson = true, timeoutMs = 10000) => {
    for (const proxy of PROXIES) {
      try {
        const url = proxy ? proxy + encodeURIComponent(targetUrl) : targetUrl;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
        
        const response = await fetch(url, {
          headers: proxy ? { 'Origin': window.location.origin } : {},
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          return isJson ? await response.json() : await response.text();
        }
      } catch (e) {
        if (e.name === 'AbortError') {
          console.log(`${proxy || 'Direto'} timeout...`);
        } else {
          console.log(`${proxy || 'Direto'} falhou...`);
        }
      }
    }
    throw new Error("Falha na conexão");
  };

  // ========== BUSCA LETRAS (Lyrics.ovh) ==========
  const searchLyrics = async (artist, song) => {
    const url = `${LYRICS_OVH_API}/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
    const data = await fetchWithProxy(url, true, 15000); // 15s timeout
    return data.lyrics;
  };

  // Busca informações do artista no Vagalume (para lista de músicas)
  const fetchArtistInfo = async (artistSlug) => {
    try {
      const url = `https://api.vagalume.com.br/${artistSlug}/index.js`;
      const data = await fetchWithProxy(url);
      return data;
    } catch (e) {
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
      // CASO 1: Busca direta "Artista - Música" -> Lyrics.ovh
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
        } catch (e) {
          console.log("Lyrics.ovh não encontrou, tentando lista do artista...");
        }
        
        // Fallback: Buscar lista de músicas do artista no Vagalume
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
      
      // CASO 2: Busca só por artista -> Vagalume lista de músicas
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
      
      // Nada encontrado
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
      // Tentar Lyrics.ovh primeiro (mais confiável)
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
      } catch (e) {
        console.log("Lyrics.ovh falhou, tentando Vagalume...");
      }
      
      // Fallback: Vagalume API
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f, #050508)' }}>
      
      {/* Grid de fundo */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Efeitos de luz */}
      <div className="fixed top-0 right-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(255, 208, 0, 0.4), transparent)', filter: 'blur(80px)' }} 
      />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4), transparent)', filter: 'blur(80px)' }} 
      />
      
      {/* --- CABEÇALHO HIGH-TECH --- */}
      <header 
        className="sticky top-0 z-50 px-6 py-4"
        style={{
          background: 'rgba(10, 10, 15, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 245, 255, 0.1)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-white/5"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            <ArrowLeft size={18} /> Voltar
          </Link>
          
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ffd000, #ff6b00)' }}
            >
              <Globe size={20} className="text-white" />
            </div>
            <span className="text-white">Busca</span>
            <span style={{ color: '#ffd000' }}>Global</span>
          </h1>
          
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 relative z-10">
        
        {/* --- ÁREA DE PESQUISA HIGH-TECH --- */}
        {!selectedSong && (
          <div className="w-full max-w-3xl mx-auto mt-16 text-center">
            
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(255, 208, 0, 0.1)', border: '1px solid rgba(255, 208, 0, 0.3)' }}
            >
              <Sparkles size={16} style={{ color: '#ffd000' }} />
              <span className="text-sm font-medium" style={{ color: '#ffd000' }}>Milhões de Músicas</span>
            </div>
            
            <h2 
              className="text-4xl md:text-5xl font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #ffffff, #ffd000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Qual música você quer tocar?
            </h2>
            <p className="text-lg mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Busque milhões de letras usando Lyrics.ovh + Vagalume.
            </p>
            
            {/* Dica de uso */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8"
              style={{ background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.2)' }}
            >
              <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                💡 <strong style={{ color: '#00f5ff' }}>Dica:</strong> Para melhores resultados, busque no formato <strong style={{ color: '#ffd000' }}>Artista - Música</strong>
              </span>
            </div>

            {/* Input de busca futurista */}
            <div className="relative group">
              <div 
                className="absolute -inset-1 rounded-2xl opacity-50 blur-lg transition-all group-hover:opacity-100"
                style={{ background: 'linear-gradient(135deg, #ffd000, #ff6b00)' }}
              />
              <div 
                className="relative flex items-center rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(15, 15, 25, 0.9)',
                  border: '1px solid rgba(255, 208, 0, 0.3)',
                }}
              >
                <Search className="ml-5 w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                <input 
                  type="text" 
                  placeholder="Artista - Música (ex: Legião Urbana - Tempo Perdido)" 
                  className="flex-1 px-4 py-5 bg-transparent text-lg text-white placeholder-white/40 outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchMusic()}
                />
                <button 
                  onClick={searchMusic}
                  className="m-2 px-8 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #ffd000, #ff6b00)',
                    color: '#000',
                    boxShadow: '0 4px 20px rgba(255, 208, 0, 0.3)',
                  }}
                >
                  <Zap size={18} className="inline mr-2" />
                  Buscar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- LOADING HIGH-TECH --- */}
        {loading && (
          <div className="mt-20 flex flex-col items-center gap-4">
            <div className="relative">
              <div 
                className="w-16 h-16 rounded-full animate-spin"
                style={{ 
                  border: '3px solid rgba(255, 208, 0, 0.2)',
                  borderTopColor: '#ffd000',
                }}
              />
              <Loader2 
                className="absolute inset-0 m-auto w-8 h-8 animate-pulse"
                style={{ color: '#ffd000' }}
              />
            </div>
            <p className="font-medium" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Consultando API Vagalume...
            </p>
          </div>
        )}

        {/* --- LISTA DE RESULTADOS HIGH-TECH --- */}
        {!selectedSong && results.length > 0 && !loading && (
          <div className="w-full max-w-3xl mx-auto mt-12">
            <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Encontramos <span style={{ color: '#ffd000' }}>{results.length}</span> resultados:
            </p>
            <div className="grid gap-3">
              {results.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => fetchSongContent(item)}
                  className="group flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    background: 'rgba(15, 15, 25, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 208, 0, 0.4)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 208, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255, 208, 0, 0.2), rgba(255, 107, 0, 0.2))',
                        border: '1px solid rgba(255, 208, 0, 0.3)',
                      }}
                    >
                      <Music size={20} style={{ color: '#ffd000' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-yellow-400 transition">
                        {item.title}
                      </h3>
                      <p style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{item.band}</p>
                    </div>
                  </div>
                  <ArrowLeft 
                    className="rotate-180 transition-transform group-hover:translate-x-1" 
                    size={18} 
                    style={{ color: 'rgba(255, 255, 255, 0.3)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* MENSAGEM DE ERRO/INFO */}
        {searchError && !loading && (
          <div 
            className="mt-8 max-w-2xl mx-auto flex items-center gap-3 p-4 rounded-xl"
            style={{
              background: 'rgba(255, 107, 0, 0.1)',
              border: '1px solid rgba(255, 107, 0, 0.3)',
            }}
          >
            <AlertCircle size={20} style={{ color: '#ff6b00' }} />
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{searchError}</p>
          </div>
        )}

        {/* --- VISUALIZADOR DA MÚSICA HIGH-TECH --- */}
        {selectedSong && !loading && (
          <div className="w-full max-w-4xl mt-8">
            
            {/* Barra de Ferramentas Superior */}
            <div 
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 p-6 rounded-2xl"
              style={{
                background: 'rgba(15, 15, 25, 0.9)',
                border: '1px solid rgba(255, 208, 0, 0.2)',
              }}
            >
              <div>
                <h2 
                  className="text-2xl md:text-3xl font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, #ffd000)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {selectedSong.title}
                </h2>
                <p className="text-lg flex items-center gap-2" style={{ color: '#ffd000' }}>
                  <Guitar size={20} /> {selectedSong.artist}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Controle de transposição */}
                <div 
                  className="flex items-center rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <button 
                    onClick={() => setTransposition(prev => prev - 1)} 
                    className="w-12 h-12 flex items-center justify-center transition-all hover:bg-white/10"
                    style={{ color: '#00f5ff' }}
                  >
                    <Minus size={18} />
                  </button>
                  <div 
                    className="px-4 font-mono font-bold w-16 text-center"
                    style={{ color: '#ffd000' }}
                  >
                    {transposition > 0 ? `+${transposition}` : transposition}
                  </div>
                  <button 
                    onClick={() => setTransposition(prev => prev + 1)} 
                    className="w-12 h-12 flex items-center justify-center transition-all hover:bg-white/10"
                    style={{ color: '#00f5ff' }}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <button 
                  onClick={() => setSelectedSong(null)}
                  className="px-5 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255, 68, 68, 0.2)',
                    border: '1px solid rgba(255, 68, 68, 0.4)',
                    color: '#ff6666',
                  }}
                >
                  <X size={18} className="inline mr-1" />
                  Fechar
                </button>
              </div>
            </div>

            {/* A CIFRA/LETRA */}
            <div 
              className="p-8 rounded-2xl min-h-[500px]"
              style={{
                background: 'rgba(10, 10, 20, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <pre 
                className="whitespace-pre-wrap font-mono text-lg md:text-xl leading-loose overflow-x-auto select-text"
                style={{ color: 'rgba(255, 255, 255, 0.85)' }}
              >
                {transposeText(selectedSong.text, transposition)}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}