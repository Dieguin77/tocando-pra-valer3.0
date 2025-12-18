import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/musicas">Músicas</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
