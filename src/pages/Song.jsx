import ChordDiagram from "../components/ChordDiagram";
import { useParams, Link } from "react-router-dom";
import { musicas } from "../data/musicas";
import { useState, useEffect, useMemo } from "react";
import { fetchLyrics } from "../services/vagalume";
import { getCifrasPublicadas } from "../services/cifrasService";
import { ArrowLeft } from "lucide-react";

export default function Song() {
  const { id } = useParams();

  // Encontra a música no seu "banco de dados" local
  const songData = useMemo(() => {
    const parsedId = Number.parseInt(id, 10);

    // Primeiro: procura nas músicas fixas (ID numérico)
    if (!Number.isNaN(parsedId)) {
      const found = musicas.find((m) => m.id === parsedId);
      if (found) return found;
    }

    // Segundo: procura nas cifras aprovadas da comunidade (ID string)
    const publicadas = getCifrasPublicadas();
    return publicadas.find((c) => c.id === id) || null;
  }, [id]);

  // Estado para guardar a letra que virá da API
  const [lyrics, setLyrics] = useState("");
  const [lyricsStatus, setLyricsStatus] = useState("idle");

  // Efeito que roda assim que a tela abre
  useEffect(() => {
    if (!songData) {
      return;
    }

    let isCancelled = false;
    setLyricsStatus("loading");

    // Chama a API do Vagalume
    fetchLyrics(songData.artista, songData.titulo)
      .then((letraEncontrada) => {
        if (isCancelled) {
          return;
        }

        if (letraEncontrada) {
          setLyrics(letraEncontrada);
          setLyricsStatus("success");
        } else {
          setLyrics("Letra não encontrada no Vagalume.");
          setLyricsStatus("empty");
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLyrics("Não foi possível carregar a letra agora.");
          setLyricsStatus("error");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [songData]);

  if (!songData) {
    return <div className="text-center p-10 text-gray-500">Música não encontrada!</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* Botão Voltar */}
        <Link
          to="/musicas"
          className="inline-flex items-center text-gray-500 hover:text-blue-500 transition-colors mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Voltar para Cifras
        </Link>

        {/* Cabeçalho da Música */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {songData.titulo}
          </h1>
          <p className="text-lg text-gray-500 mb-4">
            {songData.artista}
          </p>

          <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            Tom: {songData.tom || "Original"}
          </span>
        </div>

        {/* Bloco do Diagrama de Acorde */}
        <div className="mt-6 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="font-bold text-gray-700 mb-2">Acorde de Referência:</p>
          <ChordDiagram chordData={{ frets: [-1, 3, 2, 0, 1, 0] }} />
        </div>

        {/* Área da Letra / Cifra */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Letra da Música</h3>

          <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 font-sans bg-gray-50 p-6 rounded-xl">
            {lyricsStatus === "loading" ? "Carregando letra..." : lyrics}
          </div>
          {lyricsStatus === "error" && (
            <p className="text-sm text-red-500 mt-3">
              Erro de conexão com o serviço de letras.
            </p>
          )}
        </div>

        {/* Embed do Youtube (se tiver ID) */}
        {songData.youtubeId && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vídeo Aula / Clip</h3>
            <div className="aspect-video rounded-xl overflow-hidden border border-gray-200">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${songData.youtubeId}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}