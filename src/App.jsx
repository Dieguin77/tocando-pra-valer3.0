/**
 * ⚠️ IMPORTANTE: Por que NÃO colocar testes visuais aqui no App.jsx?
 * 
 * Em projetos com React Router, o App.jsx é apenas o "roteador central".
 * Ele define QUAIS componentes serão renderizados em QUAIS rotas, mas
 * o conteúdo visual de cada página fica nos componentes específicos.
 * 
 * - A rota "/" renderiza o componente <Home />
 * - Portanto, qualquer teste visual para a página inicial deve ir em Home.jsx
 * - Se você colocar HTML diretamente aqui, ele vai aparecer em TODAS as páginas
 *   ou pode quebrar a estrutura de rotas.
 */

import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { initEmailJS } from "./services/emailService";

// Importação das Páginas (code splitting: cada rota vira um chunk separado)
const Home = lazy(() => import("./pages/Home"));
const Songs = lazy(() => import("./pages/Songs"));
const Song = lazy(() => import("./pages/Song"));
const AdminMusic = lazy(() => import("./pages/AdminMusic"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const AdminReviewCifras = lazy(() => import("./pages/AdminReviewCifras"));
const GlobalSearch = lazy(() => import("./pages/GlobalSearch"));
const PianoPage = lazy(() => import("./pages/PianoPage"));
const ToolsPage = lazy(() => import("./pages/ToolsPage"));

// Importação dos Componentes de Layout
import Navbar from "./components/Navbar";

// Fallback exibido enquanto o chunk da rota é carregado
const PageLoader = () => (
  <div
    className="flex items-center justify-center min-h-[50vh] text-gray-500"
    role="status"
    aria-live="polite"
  >
    Carregando…
  </div>
);

// Página 404 para rotas inexistentes
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center px-4">
    <h1 className="text-4xl font-bold text-gray-800">404</h1>
    <p className="text-gray-500">Página não encontrada.</p>
    <Link to="/" className="text-brand-blue font-semibold hover:underline">
      Voltar para a Home
    </Link>
  </div>
);

// --- LAYOUTS ---

// 1. Layout Público (Só o Header Horizontal)
const PublicLayout = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-20">
      <Outlet />
    </main>
  </div>
);

// 2. Layout da Plataforma (Com Navbar)
const PlatformLayout = () => (
  <div className="min-h-screen bg-gray-50">
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
