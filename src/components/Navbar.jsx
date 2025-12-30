import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Music, Wrench } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-auto rounded-lg" />
          <span className="text-xl font-semibold text-gray-900">
            Tocando<span className="text-blue-500">PraValer</span>
          </span>
        </Link>
        
        {/* Links */}
        <ul className="flex items-center gap-1">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/musicas" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Music size={18} />
              <span className="hidden sm:inline">Cifras</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/ferramentas" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Wrench size={18} />
              <span className="hidden sm:inline">Ferramentas</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
