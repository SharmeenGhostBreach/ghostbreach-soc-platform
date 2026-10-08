import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate('/soc');
    } else {
      setError(result.message);
    }
  };

  return (
    <div>

      <h2
        style={{
          fontSize: '1.25rem',
          marginBottom: '8px'
        }}
      >
        Sign In
      </h2>

      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          marginBottom: '20px'
        }}
      >
        Enter your credentials to access the SOC.
      </p>

      {error && (
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--status-danger)',
            borderRadius: '6px',
            color: 'var(--status-danger)',
            fontSize: '0.875rem',
            marginBottom: '16px'
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              marginBottom: '6px'
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ghostbreach.com"
            required
            style={{
              width: '100%'
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              marginBottom: '6px'
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            fontSize: '0.875rem'
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: 'var(--accent-primary)'
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{
            width: '100%',
            justifyContent: 'center',
            marginTop: '8px'
          }}
        >
          Sign In
        </button>

      </form>

      <div
        style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-muted)'
        }}
      >
        Don't have an account?{' '}
        <Link
          to="/signup"
          style={{
            color: 'var(--accent-primary)'
          }}
        >
          Sign Up
        </Link>
      </div>

    </div>
  );
};

export default Login;