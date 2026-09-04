import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container section-block not-found-page">
      <div className="not-found-shell">
        <div className="not-found-hero">
          <div className="not-found-number">404</div>
          <h1>Oops! Page Not Found</h1>
          <p>The page you are looking for does not exist or has moved.</p>
          <Link to="/" className="primary-btn">Back to Home</Link>
        </div>

        <div className="not-found-panel">
          <div className="brand brand-protected">
            <span className="brand-mark">❤</span>
            <span>HopeBridge</span>
          </div>
          <div className="newsletter-row">
            <input type="email" placeholder="Your email address" />
            <button type="button" className="primary-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
