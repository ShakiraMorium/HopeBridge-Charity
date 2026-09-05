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

        <div className="protected-banner">Supporter Area</div>

        <div className="protected-card-wrap">
          <div className="protected-card">
            <div className="protected-lock">✓</div>
            <h3>You are signed in</h3>
            <p>This private supporter area is available only to authenticated HopeBridge members.</p>
            <Link to="/profile" className="primary-btn">Open my profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
