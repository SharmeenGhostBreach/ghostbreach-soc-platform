import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-main)',
      padding: '20px'
    }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
          <Shield size={32} />
          <span>GhostBreach SOC</span>
        </Link>
      </div>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '32px'
      }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;