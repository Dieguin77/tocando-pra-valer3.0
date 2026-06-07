// src/contexts/ThemeContext.jsx
import { createContext, useState, useEffect, useContext, useMemo } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Estado para guardar o tema. Começa verificando o localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Efeito que roda sempre que o 'theme' muda
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.add('dark-mode');
      root.setAttribute('data-theme', 'dark');
      body.classList.add('dark');
      body.classList.add('dark-mode');
    } else {
      root.classList.remove('dark');
      root.classList.remove('dark-mode');
      root.setAttribute('data-theme', 'light');
      body.classList.remove('dark');
      body.classList.remove('dark-mode');
    }

    // Salva a escolha no navegador
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para facilitar o uso
export const useTheme = () => useContext(ThemeContext);