import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Reset Password</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>Enter your email to receive password reset instructions.</p>

      {sent ? (
        <div style={{ padding: '12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--status-success)', borderRadius: '6px', color: 'var(--status-success)', fontSize: '0.875rem' }}>
          Reset instructions sent to your email.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '6px' }}>Email</label>
            <input type="email" required style={{ width: '100%' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Reset Link</button>
        </form>
      )}

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.875rem' }}>
        <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;