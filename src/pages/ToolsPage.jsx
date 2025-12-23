import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Timer, Guitar, Piano, Wrench, Lightbulb } from "lucide-react";
import Metronome from "../components/Metronome";
import Tuner from "../components/Tuner";
import VirtualPiano from "../components/virtualPiano";

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState("metronome");

  const tools = [
    { id: "metronome", name: "Metrônomo", Icon: Timer, description: "Mantenha o tempo" },
    { id: "tuner", name: "Afinador", Icon: Guitar, description: "Afine seu instrumento" },
    { id: "piano", name: "Piano", Icon: Piano, description: "Teste notas e acordes" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition"
          >
            <ArrowLeft size={20} /> Voltar
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-center flex items-center gap-2">
            <Wrench className="text-orange-500" /> Ferramentas Musicais
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Navegação das ferramentas */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all ${
                activeTool === tool.id
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                  : "bg-slate-700/50 text-gray-300 hover:bg-slate-700"
              }`}
            >
              <tool.Icon size={28} />
              <span className="text-sm font-medium hidden sm:block">{tool.name}</span>
            </button>
          ))}
        </div>

        {/* Descrição da ferramenta ativa */}
        <p className="text-center text-gray-400 mb-6">
          {tools.find((t) => t.id === activeTool)?.description}
        </p>

        {/* Conteúdo da ferramenta */}
        <div className="flex justify-center">
          {activeTool === "metronome" && <Metronome />}
          {activeTool === "tuner" && <Tuner />}
          {activeTool === "piano" && (
            <div className="w-full max-w-4xl bg-slate-800/50 p-4 sm:p-6 rounded-2xl">
              <VirtualPiano />
              <p className="text-center text-gray-500 text-sm mt-4">
                Use as teclas <b>A, S, D, F, G, H, J, K</b> para notas brancas 
                e <b>W, E, T, Y, U</b> para notas pretas
              </p>
            </div>
          )}
        </div>

        {/* Cards de atalho para outras ferramentas */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tools
            .filter((t) => t.id !== activeTool)
            .map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className="p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-orange-500/50 hover:bg-slate-800/50 transition-all group"
              >
                <tool.Icon size={32} className="mb-2 text-orange-500" />
                <h3 className="font-semibold text-white group-hover:text-orange-400 transition">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500">{tool.description}</p>
              </button>
            ))}
        </div>

        {/* Dicas */}
        <div className="mt-12 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="text-yellow-500" size={20} /> Dicas de uso
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>• <b>Metrônomo:</b> Use para praticar ritmo. Comece devagar e aumente o BPM gradualmente.</li>
            <li>• <b>Afinador:</b> Funciona melhor em ambiente silencioso. Permita o acesso ao microfone.</li>
            <li>• <b>Piano:</b> Use para encontrar notas, testar acordes ou treinar seu ouvido musical.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
