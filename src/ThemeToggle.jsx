import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // 1. Tenta pegar o tema do localStorage ou usa 'light' como padrão
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // 2. Toda vez que o 'theme' mudar, atualiza o HTML e o localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Salva a escolha do usuário para a próxima vez que ele entrar
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3. Função para alternar entre os temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-full transition-colors duration-300 border
        ${theme === 'dark' 
          ? 'bg-gray-800 text-yellow-300 border-gray-600 hover:bg-gray-700' 
          : 'bg-white text-orange-500 border-gray-300 hover:bg-gray-100'
        }
      `}
      aria-label="Alternar Tema"
    >
      {/* Ícone de Sol e Lua simples com Emoji (pode trocar por ícone SVG se quiser) */}
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}