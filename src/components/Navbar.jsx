import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Music, Wrench, Globe, Send, ChevronDown } from 'lucide-react';
import logo from '../assets/logooficial.png';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo apenas */}
        <Link to="/" className="flex items-center justify-center" aria-label="Ir para a página inicial">
          <img src={logo} alt="Logo Tocando Pra Valer" className="h-10 w-auto rounded-lg" />
        </Link>
        
        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/90 dark:hover:bg-slate-800 transition-colors text-sm"
          >
            <Home size={18} />
            Home
          </Link>
          <Link 
            to="/busca-global" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/90 dark:hover:bg-slate-800 transition-colors text-sm"
          >
            <Globe size={18} />
            Busca Vagalume
          </Link>
          <Link 
            to="/musicas" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/90 dark:hover:bg-slate-800 transition-colors text-sm"
          >
            <Music size={18} />
            Cifras
          </Link>
          <Link 
            to="/ferramentas" 
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm"
          >
            <Wrench size={18} />
            Ferramentas
          </Link>
          <ThemeToggle />
        </div>

        {/* Menu mobile */}
        <div className="md:hidden relative" ref={dropdownRef}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm"
          >
            Menu
            <ChevronDown size={16} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 glass-surface rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
              <Link 
                to="/" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                onClick={() => setMenuOpen(false)}
              >
                <Home size={18} className="text-blue-500" />
                Home
              </Link>
              <Link 
                to="/busca-global" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                onClick={() => setMenuOpen(false)}
              >
                <Globe size={18} className="text-blue-500" />
                Busca Vagalume
              </Link>
              <Link 
                to="/musicas" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                onClick={() => setMenuOpen(false)}
              >
                <Music size={18} className="text-blue-500" />
                Cifras
              </Link>
              <Link 
                to="/upload" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                onClick={() => setMenuOpen(false)}
              >
                <Send size={18} className="text-blue-500" />
                Enviar Cifra
              </Link>
              <Link 
                to="/ferramentas" 
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800/80"
                onClick={() => setMenuOpen(false)}
              >
                <Wrench size={18} className="text-blue-500" />
                Ferramentas
              </Link>
              <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 flex justify-end">
                <ThemeToggle />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
