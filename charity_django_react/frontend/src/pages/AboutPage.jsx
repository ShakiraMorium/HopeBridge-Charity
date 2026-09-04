import { Link } from 'react-router-dom';

export function AboutPage() {
  const image = '/images/pages/about-events-reference.png';

  return (
    <div className="container section-block feature-page">
      <div className="feature-shell">
        <header className="feature-header">
          <div className="brand brand-protected">
            <span className="brand-mark">❤</span>
            <span>HopeBridge</span>
          </div>
          <nav className="protected-nav" aria-label="About page navigation">
            <Link to="/">Home</Link>
            <Link to="/causes">Causes</Link>
            <Link to="/events">Events</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <div className="feature-banner feature-banner-light">
          <h1>Our Mission: Food, Education, Medicine</h1>
        </div>

        <div className="feature-content-wrap">
          <div className="about-hero-block">
            <div className="about-copy-card">
              <span className="eyebrow accent">Our story</span>
              <h2>A Trusted Non-Profit Charity Organization</h2>
              <p>
                We support families with food assistance, education access, and essential healthcare through
                practical, community-led action.
              </p>
              <div className="feature-actions">
                <Link to="/contact" className="primary-btn">Donate Now</Link>
                <Link to="/causes" className="secondary-btn">Explore Causes</Link>
              </div>
            </div>
            <img src={image} alt="Children and community support" className="feature-hero-image" />
          </div>

          <div className="stats-row">
            <div className="stat-box stat-box-compact">
              <strong>500K</strong>
              <span>Food Boxes</span>
            </div>
            <div className="stat-box stat-box-compact">
              <strong>200+</strong>
              <span>Volunteers</span>
            </div>
            <div className="stat-box stat-box-compact">
              <strong>100+</strong>
              <span>Health Programs</span>
            </div>
            <div className="stat-box stat-box-compact">
              <strong>1000+</strong>
              <span>Children helped</span>
            </div>
          </div>

          <div className="feature-split-row">
            <div className="feature-side-card">
              <span className="eyebrow accent">Our promise</span>
              <h3>Committed To Achieving Our Core Goals</h3>
              <p>
                We work transparently, use local partnerships, and focus on measurable positive change across every
                programme we run.
              </p>
            </div>
            <div className="feature-side-card themed-card">
              <span className="eyebrow accent">Impact</span>
              <h3>Dedicated To Positive Change</h3>
              <p>Every donation helps us create momentum for healthier communities and brighter futures.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
