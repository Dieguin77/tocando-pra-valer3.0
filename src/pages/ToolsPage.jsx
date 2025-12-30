import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Timer, Guitar, Piano, Wrench, Lightbulb } from "lucide-react";
import Metronome from "../components/Metronome";
import Tuner from "../components/Tuner";
import VirtualPiano from "../components/virtualPiano";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState("metronome");
  const toolContainerRef = useRef(null);

  const tools = [
    { id: "metronome", name: "Metrônomo", Icon: Timer, description: "Mantenha o tempo" },
    { id: "tuner", name: "Afinador", Icon: Guitar, description: "Afine seu instrumento" },
    { id: "piano", name: "Piano", Icon: Piano, description: "Teste notas e acordes" },
  ];

  // Seleciona ferramenta e rola até ela
  const selectTool = (toolId) => {
    setActiveTool(toolId);
    // Scroll suave até o container da ferramenta
    setTimeout(() => {
      toolContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition"
          >
            <ArrowLeft size={18} /> Voltar
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Wrench className="text-blue-500" size={24} /> Ferramentas Musicais
          </h1>
          <div className="w-20" />
        </div>

        {/* Navegação das ferramentas */}
        <div className="flex justify-center gap-3 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => selectTool(tool.id)}
              className={`flex flex-col items-center gap-1 px-5 py-3 rounded-xl transition-all ${
                activeTool === tool.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
              }`}
            >
              <tool.Icon size={24} />
              <span className="text-sm font-medium hidden sm:block">{tool.name}</span>
            </button>
          ))}
        </div>

        {/* Descrição da ferramenta ativa */}
        <p className="text-center text-gray-500 mb-6">
          {tools.find((t) => t.id === activeTool)?.description}
        </p>

        {/* Conteúdo da ferramenta */}
        <div ref={toolContainerRef} className="flex justify-center scroll-mt-24">
          {activeTool === "metronome" && <Metronome />}
          {activeTool === "tuner" && <Tuner />}
          {activeTool === "piano" && (
            <div className="w-full max-w-4xl bg-white p-6 rounded-xl border border-gray-200">
              <VirtualPiano />
              <p className="text-center text-gray-500 text-sm mt-4">
                Use as teclas <b>A, S, D, F, G, H, J, K</b> para notas brancas 
                e <b>W, E, T, Y, U</b> para notas pretas
              </p>
            </div>
          )}
        </div>

        {/* Cards de atalho para outras ferramentas */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tools
            .filter((t) => t.id !== activeTool)
            .map((tool) => (
              <button
                key={tool.id}
                onClick={() => selectTool(tool.id)}
                className="p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left"
              >
                <tool.Icon size={28} className="mb-2 text-blue-500" />
                <h3 className="font-semibold text-gray-900">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500">{tool.description}</p>
              </button>
            ))}
        </div>

        {/* Dicas */}
        <div className="mt-10 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="text-amber-500" size={20} /> Dicas de uso
          </h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• <b>Metrônomo:</b> Use para praticar ritmo. Comece devagar e aumente o BPM gradualmente.</li>
            <li>• <b>Afinador:</b> Funciona melhor em ambiente silencioso. Permita o acesso ao microfone.</li>
            <li>• <b>Piano:</b> Use para encontrar notas, testar acordes ou treinar seu ouvido musical.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
