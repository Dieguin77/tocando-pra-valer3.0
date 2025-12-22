// App.jsx
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Song from "./pages/Song";
import AdminMusic from "./pages/AdminMusic";
import UploadPage from "./pages/UploadPage";
import AdminReviewCifras from "./pages/AdminReviewCifras";
import { initEmailJS } from "./services/emailService";

export default function App() {
  // Inicializar EmailJS na primeira montagem
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    // ADICIONEI AS CLASSES AQUI EMBAIXO 👇
    // min-h-screen: garante que o site ocupe a altura toda
    // dark:bg-gray-900: define o fundo preto global
    // dark:text-white: define a cor da letra branca global
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musicas" element={<Songs />} />
        <Route path="/musica/:id" element={<Song />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/admin/musicas" element={<AdminMusic />} />
        <Route path="/admin/revisar-cifras" element={<AdminReviewCifras />} />
      </Routes>
    </div>
  );
}