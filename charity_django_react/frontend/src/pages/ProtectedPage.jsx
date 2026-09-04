import { Link } from 'react-router-dom';

export function ProtectedPage() {
  return (
    <div className="container section-block protected-page">
      <div className="protected-shell">
        <header className="protected-header">
          <div className="brand brand-protected">
            <span className="brand-mark">❤</span>
            <span>HopeBridge</span>
          </div>
          <nav className="protected-nav" aria-label="Protected page navigation">
            <Link to="/">Home</Link>
            <Link to="/causes">Causes</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <div className="protected-banner">Password Protected</div>

        <div className="protected-card-wrap">
          <div className="protected-card">
            <div className="protected-lock">🔒</div>
            <h3>Password Protected</h3>
            <p>This page is secured for approved supporters and partners.</p>
            <label>
              Password
              <input type="password" placeholder="Enter password" />
            </label>
            <button type="button" className="primary-btn">Unlock Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}
