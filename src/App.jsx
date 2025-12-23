import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { initEmailJS } from "./services/emailService";

// Importação das Páginas
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Song from "./pages/Song";
import AdminMusic from "./pages/AdminMusic";
import UploadPage from "./pages/UploadPage";
import AdminReviewCifras from "./pages/AdminReviewCifras";
import GlobalSearch from "./pages/GlobalSearch";
import PianoPage from "./pages/PianoPage";
import ToolsPage from "./pages/ToolsPage";

// Importação dos Componentes de Layout
import Navbar from "./components/Navbar";

// --- LAYOUTS ---

// 1. Layout Público (Só o Header Horizontal)
const PublicLayout = () => (
  <div className="min-h-screen bg-slate-950 text-white">
    <Navbar />
    <main className="pt-24">
      <Outlet />
    </main>
  </div>
);

// 2. Layout da Plataforma (Com Navbar)
const PlatformLayout = () => (
  <div className="min-h-screen bg-slate-900 text-white">
    <Navbar />
    <main className="pt-24 p-6">
      <Outlet />
    </main>
  </div>
);

export default function App() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <Routes>
      {/* GRUPO 1: Rotas Públicas (Site, Vendas, Busca) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
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
      </Route>
    </Routes>
  );
}