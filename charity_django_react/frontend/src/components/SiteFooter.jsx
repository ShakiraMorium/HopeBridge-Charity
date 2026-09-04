import { Globe, HeartHandshake, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SiteFooter({ data }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{data.brand}</h3>
          <p>
            Working together to build stronger communities through compassion, action,
            and sustainable support.
          </p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            {data.navigation.map((item) => (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>{data.contact.address}</li>
            <li>{data.contact.email}</li>
            <li>{data.contact.phone}</li>
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <div className="social-row">
            <a href="https://facebook.com" aria-label="Facebook"><Globe size={18} /></a>
            <a href="https://instagram.com" aria-label="Instagram"><MessageCircle size={18} /></a>
            <a href="https://twitter.com" aria-label="Twitter"><HeartHandshake size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
