import { Link } from "react-router-dom";
import VirtualPiano from "../components/virtualPiano";
import ThemeToggle from "../components/ThemeToggle";
import { ArrowLeft, Keyboard, Piano } from "lucide-react";
import "./PianoPage.css";

export default function PianoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition font-medium"
        >
          <ArrowLeft size={18} /> Voltar
        </Link>
      </div>

      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 flex items-center justify-center gap-3">
          Piano Virtual <Piano size={40} className="text-orange-600" />
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Teste notas, afine seu ouvido ou apenas divirta-se tocando.
        </p>
      </div>

      <div className="w-full max-w-4xl bg-gray-200 dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-2xl border-t-8 border-orange-600">
        <VirtualPiano />
      </div>

      <div className="mt-8 text-sm text-gray-500 flex items-center gap-2">
        <Keyboard size={18} />
        <p>
          Dica: Use as teclas <b>A, S, D, F, G, H, J, K</b> para tocar as
          teclas brancas e <b>W, E, T, Y, U</b> para as pretas.
        </p>
      </div>

      <div className="fixed bottom-6 right-6">
        <ThemeToggle />
      </div>
    </div>
  );
}