import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.jpeg';

const Footer = () => {
  return (
    <footer className="public-footer">
      <div className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img src={logoImg} alt="GhostBreach Logo" className="brand-logo-img" onError={(e) => { e.target.style.display = 'none'; }} />
            <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>GHOSTBREACH</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px' }}>
            LEARN • SECURE • DEFEND
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>
            Next-generation offensive security and continuous vulnerability intelligence operations.
          </p>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '0.875rem', letterSpacing: '1px', color: 'var(--accent-primary)' }}>NAVIGATION</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/platform">SOC Platform</Link>
            <Link to="/work">Case Studies</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '0.875rem', letterSpacing: '1px', color: 'var(--accent-primary)' }}>SERVICES</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="/services">Web Security Assessment</Link>
            <Link to="/services">Penetration Testing</Link>
            <Link to="/services">WordPress Audit</Link>
            <Link to="/services">API & Cloud Security</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '0.875rem', letterSpacing: '1px', color: 'var(--accent-primary)' }}>PLATFORM & CONTACT</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link to="/login">SOC Portal Login</Link>
            <a href="mailto:ghostbreachh@gmail.com">ghostbreachh@gmail.com</a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        &copy; 2026 GhostBreach Security Operations Center. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;