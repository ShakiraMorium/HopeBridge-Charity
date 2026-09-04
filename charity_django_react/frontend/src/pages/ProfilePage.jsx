import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export function ProfilePage({ authUser, setAuthUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: authUser?.first_name || '',
    last_name: authUser?.last_name || '',
    bio: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = new FormData();
    payload.append('first_name', form.first_name);
    payload.append('last_name', form.last_name);
    payload.append('bio', form.bio);
    if (avatar) payload.append('avatar', avatar);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile/`, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to update your profile.');
      setAuthUser(result.user);
      setStatus({ type: 'success', message: result.message });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to update your profile.' });
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout/`, { method: 'POST', credentials: 'include' });
    setAuthUser(null);
    navigate('/signup');
  };

  return (
    <div className="container section-block profile-page">
      <div className="profile-shell">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-wrap">
              <img
                src={authUser?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'}
                alt={authUser?.full_name || 'User profile'}
                className="profile-avatar"
              />
            </div>
            <div>
              <span className="eyebrow accent">Your profile</span>
              <h1>{authUser?.full_name || 'Supporter profile'}</h1>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                First name
                <input type="text" name="first_name" value={form.first_name} onChange={handleChange} />
              </label>
              <label>
                Last name
                <input type="text" name="last_name" value={form.last_name} onChange={handleChange} />
              </label>
            </div>

            <label>
              Bio
              <textarea rows="4" name="bio" value={form.bio} onChange={handleChange} placeholder="Tell people about your passion for charity work." />
            </label>

            <label>
              Change profile image
              <input type="file" accept="image/*" onChange={(event) => setAvatar(event.target.files?.[0] || null)} />
            </label>

            <div className="auth-actions">
              <button type="submit" className="primary-btn">Save profile</button>
              <button type="button" className="secondary-btn" onClick={handleLogout}>Log out</button>
            </div>
          </form>

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
