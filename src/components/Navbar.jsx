import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Home, Music, Zap } from 'lucide-react';
import './navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar-hightech">
      <div className="navbar-container">
        <div className="navbar-logo-hightech">
          <Link to="/" className="logo-link">
            <div className="logo-glow">
              <img src={logo} alt="Logo" />
            </div>
            <span className="logo-text">
              Tocando<span className="text-gradient">PraValer</span>
            </span>
          </Link>
        </div>
        
        <ul className="navbar-links-hightech">
          <li>
            <Link to="/" className="nav-item-hightech">
              <Home size={16} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/musicas" className="nav-item-hightech">
              <Music size={16} />
              <span>Músicas</span>
            </Link>
          </li>
          <li>
            <Link to="/ferramentas" className="nav-item-hightech featured">
              <Zap size={16} />
              <span>Ferramentas</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
