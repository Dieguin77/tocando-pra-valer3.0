// src/components/ThemeToggle.jsx
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label="Alternar tema"
    >
      {darkMode ? (
        <Sun className="icon sun-icon" />
      ) : (
        <Moon className="icon moon-icon" />
      )}
    </button>
  );
}