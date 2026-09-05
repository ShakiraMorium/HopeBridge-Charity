import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { API_BASE_URL } from '../config';

export function SignupPage({ setAuthUser }) {
  const navigate = useNavigate();
  const signupAnimationUrl = import.meta.env.VITE_SIGNUP_LOTTIE_URL;
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (avatar) payload.append('avatar', avatar);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup/`, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to create account.');
      setAuthUser(result.user);
      setStatus({ type: 'success', message: result.message });
      navigate('/');
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to create account.' });
    }
  };

  return (
    <div className="container section-block auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          {signupAnimationUrl && (
            <div className="signup-animation" aria-hidden="true">
              <DotLottieReact src={signupAnimationUrl} loop autoplay />
            </div>
          )}
          <span className="eyebrow accent">Create account</span>
          <h1>Sign up to continue</h1>
          <p>Join HopeBridge and start supporting communities with your time and generosity.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                First name
                <input type="text" name="first_name" value={form.first_name} onChange={handleChange} required />
              </label>
              <label>
                Last name
                <input type="text" name="last_name" value={form.last_name} onChange={handleChange} />
              </label>
            </div>

            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>

            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>

            <label>
              Confirm password
              <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} required />
            </label>

            <label>
              Profile photo
              <input type="file" accept="image/*" onChange={(event) => setAvatar(event.target.files?.[0] || null)} />
            </label>

            <button type="submit" className="primary-btn">Create account</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
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
