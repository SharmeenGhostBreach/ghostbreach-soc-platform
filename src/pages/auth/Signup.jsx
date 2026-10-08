import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { isEmail, passwordProblem } from '../../utils/validators';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) return setError('Full name is required.');
    if (!isEmail(email)) return setError('Please enter a valid email address.');
    const problem = passwordProblem(password);
    if (problem) return setError(problem);
    if (password !== confirmPassword) return setError('Passwords do not match');

    setSubmitting(true);
    const result = await signup(fullName.trim(), email.trim(), password);
    setSubmitting(false);

    if (result.success) {
      navigate('/soc');
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Create Account</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>Sign up for a GhostBreach SOC account.</p>

      {error && (
        <div style={{ padding: '8px 12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--status-danger)', borderRadius: '6px', color: 'var(--status-danger)', fontSize: '0.875rem', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '6px' }}>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '6px' }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '6px' }}>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)' }}>Sign In</Link>
      </div>
    </div>
  );
};

export default Signup;