import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to send reset link.');
      setStatus({ type: 'success', message: result.message });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send reset link.' });
    }
  };

  return (
    <div className="container section-block auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <span className="eyebrow accent">Password recovery</span>
          <h1>Forgot your password?</h1>
          <p>Enter your email and we will send a secure reset link if an account exists.</p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <button type="submit" className="primary-btn">Send reset link</button>
          </form>
          <p className="auth-switch"><Link to="/login">Back to log in</Link></p>
          {status.message && <div className={`status-banner ${status.type}`}>{status.message}</div>}
        </div>
      </div>
    </div>
  );
}
