// App.jsx
import { Routes, Route } from "react-router-dom"; 
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Songs from "./pages/Songs";
import Song from "./pages/Song";

export default function App() {
  // Lógica do Tema (Permanece igual)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Agrupamos as props do tema para facilitar
  const themeProps = { darkMode, toggleTheme };

  return (
    <div className="app-container">
      {/* REMOVI O BOTÃO FLUTUANTE DAQUI */}
      
      <Routes>
        {/* Passamos as props do tema para cada página usando spread (...) */}
        <Route path="/" element={<Home {...themeProps} />} />
        <Route path="/musicas" element={<Songs {...themeProps} />} />
        <Route path="/musica/:id" element={<Song {...themeProps} />} />
      </Routes>
    </div>
  );
}