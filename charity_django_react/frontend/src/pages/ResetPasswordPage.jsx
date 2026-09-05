import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export function ResetPasswordPage() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirm_password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to reset password.');
      setStatus({ type: 'success', message: result.message });
      setTimeout(() => navigate('/login'), 900);
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to reset password.' });
    }
  };

  return (
    <div className="container section-block auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <span className="eyebrow accent">Secure reset</span>
          <h1>Create a new password</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              New password
              <input type="password" minLength="8" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            </label>
            <label>
              Confirm password
              <input type="password" minLength="8" value={form.confirm_password} onChange={(event) => setForm({ ...form, confirm_password: event.target.value })} required />
            </label>
            <button type="submit" className="primary-btn">Reset password</button>
          </form>
          <p className="auth-switch"><Link to="/login">Back to log in</Link></p>
          {status.message && <div className={`status-banner ${status.type}`}>{status.message}</div>}
        </div>
      </div>
    </div>
  );
}
