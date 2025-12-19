// src/components/ThemeToggle.jsx
import { Sun, Moon } from 'lucide-react';
import './ThemeToggle.css';

export default function ThemeToggle({ darkMode, toggleTheme }) {
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