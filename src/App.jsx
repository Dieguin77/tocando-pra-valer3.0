// App.jsx
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Song from "./pages/Song";
import AdminMusic from "./pages/AdminMusic";
import UploadPage from "./pages/UploadPage";
import AdminReviewCifras from "./pages/AdminReviewCifras";

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* As páginas receberão o tema via useTheme() */}
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