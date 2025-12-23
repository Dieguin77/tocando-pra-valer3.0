import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { transposeText } from "../utils/musicLogic";
import { Search, Music, ArrowLeft, Guitar, Globe } from "lucide-react";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transposition, setTransposition] = useState(0);

  // CHAVE PÚBLICA (Funciona na maioria dos casos para testes)
  const API_KEY = "660a4395f992ff67786584e238f501aa"; 

  // URL DO TÚNEL (PROXY) para contornar o erro de CORS
  const PROXY = "https://api.allorigins.win/raw?url=";

  // 1. Busca a lista de músicas (USANDO O PROXY)
  const searchVagalume = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);
    setSelectedSong(null);

    try {
      // Montamos a URL original do Vagalume
      const targetUrl = `https://api.vagalume.com.br/search.excerpt?q=${encodeURIComponent(query)}&limit=10&apikey=${API_KEY}`;
      
      // Chamamos através do PROXY
      const response = await fetch(PROXY + encodeURIComponent(targetUrl));
      
      if (!response.ok) throw new Error("Falha na conexão");
      
      const data = await response.json();
      
      if (data.response && data.response.docs) {
        setResults(data.response.docs);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      alert("Não foi possível buscar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Busca a letra/cifra (USANDO O PROXY)
  const fetchSongContent = async (id) => {
    setLoading(true);
    try {
      const targetUrl = `https://api.vagalume.com.br/search.php?musid=${id}&apikey=${API_KEY}`;
      
      // Chamamos através do PROXY
      const response = await fetch(PROXY + encodeURIComponent(targetUrl));
      const data = await response.json();
      
      if (data.type === 'exact' || data.type === 'approx') {
        setSelectedSong({
          title: data.mus[0].name,
          artist: data.art.name,
          text: data.mus[0].text 
        });
        setTransposition(0);
      } else {
        alert("Letra não disponível.");
      }
    } catch (error) {
      console.error("Erro ao abrir música:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* --- CABEÇALHO --- */}
      <header className="bg-white dark:bg-black/40 shadow-sm border-b border-gray-200 dark:border-gray-800 p-6 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition font-medium">
            <ArrowLeft size={18} /> Voltar
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <span className="text-orange-600">Mini</span> Cifra Club <Globe size={22} className="text-orange-500" />
          </h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 flex flex-col items-center">
        
        {/* --- ÁREA DE PESQUISA --- */}
        {!selectedSong && (
          <div className="w-full max-w-2xl mt-10 text-center animate-fade-in-up">
            <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Qual música você quer tocar?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
              Busque milhões de cifras e letras direto do Vagalume.
            </p>

            <div className="relative group">
              <input 
                type="text" 
                placeholder="Digite o nome da música ou artista..." 
                className="w-full p-5 pl-12 rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg shadow-lg focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchVagalume()}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-orange-500 transition" />
              
              <button 
                onClick={searchVagalume}
                className="absolute right-2 top-2 bottom-2 bg-orange-600 hover:bg-orange-700 text-white px-6 rounded-full font-bold transition shadow-md"
              >
                Buscar
              </button>
            </div>
          </div>
        )}

        {/* --- LOADING --- */}
        {loading && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Consultando API Vagalume...</p>
          </div>
        )}

        {/* --- LISTA DE RESULTADOS --- */}
        {!selectedSong && results.length > 0 && !loading && (
          <div className="w-full max-w-2xl mt-10 grid gap-3">
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-2">Encontramos {results.length} resultados:</p>
            {results.map((item) => (
              <div 
                key={item.id} 
                onClick={() => fetchSongContent(item.id)}
                className="group flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-orange-400 dark:hover:border-orange-600 cursor-pointer transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                    <Music size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-orange-600 transition">{item.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.band}</p>
                  </div>
                </div>
                <ArrowLeft className="rotate-180 text-gray-300 group-hover:text-orange-500 transition" size={18} />
              </div>
            ))}
          </div>
        )}
        
        {/* MENSAGEM SE NÃO ACHAR NADA */}
        {!selectedSong && results.length === 0 && !loading && query && (
           <p className="mt-8 text-gray-500">Nenhuma música encontrada. Tente outro nome.</p>
        )}

        {/* --- VISUALIZADOR DA MÚSICA (COM MODULAÇÃO) --- */}
        {selectedSong && !loading && (
          <div className="w-full max-w-4xl animate-fade-in">
            {/* Barra de Ferramentas Superior */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{selectedSong.title}</h2>
                <p className="text-xl text-orange-600 font-medium flex items-center gap-2">
                  <Guitar size={20} /> {selectedSong.artist}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                  <button onClick={() => setTransposition(prev => prev - 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm font-bold text-lg transition text-black dark:text-white">-1</button>
                  <div className="px-4 font-mono font-bold text-orange-600 w-12 text-center">
                    {transposition > 0 ? `+${transposition}` : transposition}
                  </div>
                  <button onClick={() => setTransposition(prev => prev + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm font-bold text-lg transition text-black dark:text-white">+1</button>
                </div>
                
                <button 
                  onClick={() => setSelectedSong(null)}
                  className="px-4 py-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-lg hover:bg-red-200 transition"
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* A CIFRA/LETRA */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 min-h-[500px]">
              <pre className="whitespace-pre-wrap font-mono text-lg md:text-xl leading-loose text-gray-800 dark:text-gray-300 overflow-x-auto select-text">
                {transposeText(selectedSong.text, transposition)}
              </pre>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}