import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

export function SiteHeader({ data, authUser, onLogout, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-mark">❤</span>
          <span>{data.brand}</span>
        </Link>

        <nav className="nav desktop-nav" aria-label="Main navigation">
          {data.navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <div className="desktop-auth-actions">
            {authUser ? (
              <>
                <Link to="/profile" className="action-button small-action">
                  {authUser.full_name || 'Profile'}
                </Link>
                <button type="button" className="secondary-btn small-btn-inline" onClick={onLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="secondary-btn small-btn-inline">Log in</Link>
                <Link to="/signup" className="action-button small-action">Sign up</Link>
              </>
            )}
          </div>

          <Link to="/contact" className="action-button donate-button">
            Donate
          </Link>

          <button
            type="button"
            className="menu-button"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          {data.navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {authUser ? (
            <>
              <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <button type="button" className="mobile-nav-link mobile-logout" onClick={onLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              <Link to="/signup" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Sign up</Link>
            </>
          )}
          <Link to="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Donate</Link>
        </div>
      )}
    </header>
  );
}
