import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/cifras', label: 'Cifras', mobileLabel: 'Cifras' },
    { path: '/area-aluno', label: 'Área do Aluno' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/contribuinte', label: 'Apoie' },
    { path: '/contato', label: 'Contato' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm fixed w-full top-0 z-50 shadow-md border-b border-slate-200 dark:border-slate-800">
      <div className="container-custom">
        <nav className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
              🎸 Tocando Pra Valer
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                      isActive(link.path) 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="text-slate-700 dark:text-slate-300 text-2xl p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="lg:hidden pb-4 animate-fadeIn border-t border-slate-200 dark:border-slate-700 pt-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block py-3 text-base font-medium transition-colors hover:text-blue-500 ${
                    isActive(link.path) 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.mobileLabel || link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
