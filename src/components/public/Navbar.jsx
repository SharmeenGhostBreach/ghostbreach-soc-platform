import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ShieldAlert } from 'lucide-react';
import logoImg from '../../assets/logo.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="public-header">
      <div className="nav-container">
        <Link to="/" className="nav-logo-group">
          <img src={logoImg} alt="GhostBreach Logo" className="brand-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.5px' }}>GHOSTBREACH</span>
        </Link>

        <nav className="nav-links-desktop">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Services</NavLink>
          <NavLink to="/platform" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Platform</NavLink>
          <NavLink to="/work" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Work</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/login" className="btn-primary">ENTER SOC</Link>
          <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-nav-overlay">
          <NavLink to="/" end className="nav-link" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</NavLink>
          <NavLink to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink to="/platform" className="nav-link" onClick={() => setIsOpen(false)}>Platform</NavLink>
          <NavLink to="/work" className="nav-link" onClick={() => setIsOpen(false)}>Work</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</NavLink>
          <Link to="/login" className="btn-primary" style={{ justifyContent: 'center', marginTop: '12px' }} onClick={() => setIsOpen(false)}>
            ENTER SOC
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;