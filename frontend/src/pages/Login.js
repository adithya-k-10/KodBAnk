import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        '/api/login',
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{
          fontSize: '2rem',
          marginBottom: '30px',
          color: '#00f5ff',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(0, 245, 255, 0.3)'
        }}>
          🏦 KodBank
        </h1>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? '🔄 Logging in...' : '✓ Login'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          Don't have an account?{' '}
          <a
            href="/register"
            style={{
              color: '#00f5ff',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
