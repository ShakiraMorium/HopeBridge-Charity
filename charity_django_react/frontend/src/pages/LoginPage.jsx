import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export function LoginPage({ setAuthUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to log in.');
      setAuthUser(result.user);
      setStatus({ type: 'success', message: result.message });
      navigate('/');
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to log in.' });
    }
  };

  return (
    <div className="container section-block auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <span className="eyebrow accent">Welcome back</span>
          <h1>Log in to your account</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>
            <button type="submit" className="primary-btn">Log in</button>
          </form>

          <p className="auth-switch">
            Need an account? <Link to="/signup">Sign up</Link>
          </p>

          {status.message && (
            <div className={`status-banner ${status.type === 'success' ? 'success' : 'error'}`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
