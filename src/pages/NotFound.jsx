import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '64px 16px' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--accent-primary)', marginBottom: '16px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Signal lost.</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Requested security module was not found.</p>
      <Link to="/soc" className="btn-primary">Return to SOC</Link>
    </div>
  );
};

export default NotFound;