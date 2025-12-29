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
  <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f, #050508)' }}>
    {/* Grid de fundo futurista */}
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
    {/* Efeitos de luz ambiente */}
    <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none" 
      style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.3), transparent)', filter: 'blur(80px)' }} 
    />
    <div className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none" 
      style={{ background: 'radial-gradient(circle, rgba(191, 0, 255, 0.3), transparent)', filter: 'blur(80px)' }} 
    />
    <Navbar />
    <main className="pt-24 relative z-10">
      <Outlet />
    </main>
  </div>
);

// 2. Layout da Plataforma (Com Navbar)
const PlatformLayout = () => (
  <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0f, #050508)' }}>
    {/* Grid de fundo futurista */}
    <div 
      className="fixed inset-0 pointer-events-none opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
    {/* Efeitos de luz ambiente */}
    <div className="fixed top-20 right-0 w-80 h-80 rounded-full opacity-15 pointer-events-none" 
      style={{ background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4), transparent)', filter: 'blur(60px)' }} 
    />
    <div className="fixed bottom-20 left-0 w-80 h-80 rounded-full opacity-15 pointer-events-none" 
      style={{ background: 'radial-gradient(circle, rgba(191, 0, 255, 0.4), transparent)', filter: 'blur(60px)' }} 
    />
    <Navbar />
    <main className="pt-24 p-6 relative z-10">
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
      </Route>
    </Routes>
  );
}