import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { initEmailJS } from "./services/emailService";
import Navbar from "./components/Navbar";

// Páginas carregadas sob demanda (code splitting — cada rota vira um chunk separado)
const Home = lazy(() => import("./pages/Home"));
const Songs = lazy(() => import("./pages/Songs"));
const Song = lazy(() => import("./pages/Song"));
const AdminMusic = lazy(() => import("./pages/AdminMusic"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const AdminReviewCifras = lazy(() => import("./pages/AdminReviewCifras"));
const GlobalSearch = lazy(() => import("./pages/GlobalSearch"));
const PianoPage = lazy(() => import("./pages/PianoPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));

const PageLoader = () => (
  <div
    className="flex flex-col items-center justify-center min-h-[60vh] gap-3"
    role="status"
    aria-live="polite"
    aria-label="Carregando página"
  >
    <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    <span className="text-sm text-gray-400">Carregando…</span>
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
    <span className="text-7xl" aria-hidden="true">🎵</span>
    <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">404</h1>
    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Página não encontrada</p>
    <p className="text-gray-400 max-w-xs text-sm">
      Essa nota saiu do pentagrama. Volte para o início e continue tocando.
    </p>
    <Link
      to="/"
      className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
    >
      Voltar para a Home
    </Link>
  </div>
);

const PublicLayout = () => (
  <div className="min-h-screen bg-white dark:bg-gray-950">
    <Navbar />
    <main className="pt-20">
      <Outlet />
    </main>
  </div>
);

const PlatformLayout = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
    <Navbar />
    <main className="pt-20 p-6">
      <Outlet />
    </main>
  </div>
);

export default function App() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Home tem layout próprio */}
        <Route path="/" element={<Home />} />

        {/* GRUPO 1: Rotas Públicas (Site, Vendas, Busca) */}
        <Route element={<PublicLayout />}>
          <Route path="/busca-global" element={<GlobalSearch />} />
          <Route path="/piano" element={<PianoPage />} />
        </Route>

        {/* GRUPO 2: Rotas da Plataforma (Área do Aluno / Admin) */}
        <Route element={<PlatformLayout />}>
          <Route path="/musicas" element={<Songs />} />
          <Route path="/musica/:id" element={<Song />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/ferramentas" element={<ToolsPage />} />

          {/* Admin */}
          <Route path="/admin/musicas" element={<AdminMusic />} />
          <Route path="/admin/revisar-cifras" element={<AdminReviewCifras />} />

          {/* 404 — rota não encontrada */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
