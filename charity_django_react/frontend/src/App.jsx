import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Leaf, Users } from 'lucide-react';
import { API_BASE_URL } from './config';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { AboutPage as AboutPageView } from './pages/AboutPage';
import { ArticleDetailPage as ArticleDetailPageView } from './pages/ArticleDetailPage';
import { BlogPage as BlogPageView } from './pages/BlogPage';
import { CauseDetailPage as CauseDetailPageView } from './pages/CauseDetailPage';
import { CausesPage as CausesPageView } from './pages/CausesPage';
import { ContactPage as ContactPageView } from './pages/ContactPage';
import { EventsPage as EventsPageView } from './pages/EventsPage';
import { HomePage as HomePageView } from './pages/HomePage';
import { LoginPage as LoginPageView } from './pages/LoginPage';
import { NotFoundPage as NotFoundPageView } from './pages/NotFoundPage';
import { ProfilePage as ProfilePageView } from './pages/ProfilePage';
import { ProtectedPage as ProtectedPageView } from './pages/ProtectedPage';
import { ReceiptPage as ReceiptPageView } from './pages/ReceiptPage';
import { SignupPage as SignupPageView } from './pages/SignupPage';

const fallbackData = {
  brand: 'HopeBridge',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Causes', href: '/causes' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  hero: {
    title: 'Making A Difference Through Our Causes',
    subtitle:
      'Together we can restore hope, protect children, and build healthier communities across the region.',
    primaryButton: 'Donate Now',
    secondaryButton: 'Learn More',
    stats: [
      { label: 'People Helped', value: '24K+' },
      { label: 'Volunteer Hours', value: '8.2K' },
      { label: 'Active Donors', value: '1.4K' },
    ],
  },
  impact: [
    {
      icon: 'Leaf',
      title: 'Clean Water & Sanitation',
      description:
        'Borewells, filters, and hygiene education for villages facing severe water scarcity.',
    },
    {
      icon: 'Heart',
      title: 'Children & Education',
      description:
        'School meals, scholarships, and classroom resources for children in need.',
    },
    {
      icon: 'Users',
      title: 'Community Support',
      description:
        'Disaster relief, food drives, and mobile health clinics for vulnerable families.',
    },
  ],
  causes: [
    {
      id: 'clean-water',
      title: 'Providing Clean Water To Remote Villages',
      category: 'Water Access',
      image: '/images/clean-water-bottle.jpg',
      raised: 16500,
      goal: 22000,
      supporters: 412,
      summary:
        'Install water purification systems and safe storage tanks to bring clean drinking water to rural families.',
    },
    {
      id: 'food-security',
      title: 'Fighting Hunger With Nutritious Meals',
      category: 'Food Relief',
      image:
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80',
      raised: 20800,
      goal: 30000,
      supporters: 535,
      summary:
        'Deliver weekly meal packs and school nutrition support to children and families in crisis.',
    },
    {
      id: 'education',
      title: 'Empowering Children Through Education',
      category: 'Education',
      image:
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
      raised: 19100,
      goal: 26000,
      supporters: 621,
      summary:
        'Fund school kits, teacher training, and safe learning spaces for underserved communities.',
    },
    {
      id: 'healthcare',
      title: 'Improving Health Access In Rural Areas',
      category: 'Healthcare',
      image:
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
      raised: 13700,
      goal: 18000,
      supporters: 298,
      summary:
        'Support mobile health clinics, maternal care, and preventative treatment programs.',
    },
  ],
  events: [
    {
      id: 'community-garden',
      title: 'Community Garden Day',
      location: 'Dhaka, Bangladesh',
      date: 'May 18, 2026',
      time: '9:00 AM',
      image:
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=900&q=80',
      description:
        'Join families in a day of planting, learning, and sharing fresh food with local neighborhoods.',
    },
    {
      id: 'health-camp',
      title: 'Mobile Health Camp',
      location: 'Khulna, Bangladesh',
      date: 'Jun 07, 2026',
      time: '8:30 AM',
      image:
        'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80',
      description:
        'Free checkups, vaccination support, and health counseling for mothers and children.',
    },
  ],
  articles: [
    {
      id: 'empowering-stories',
      title: 'Empowering Lives Stories Of Hope And Change',
      category: 'Latest Articles',
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
      excerpt:
        'A look into the stories of families whose lives changed through clean water projects and community investment.',
      date: 'April 18, 2026',
    },
    {
      id: 'school-journey',
      title: 'How Education Creates Better Futures',
      category: 'Education',
      image:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=80',
      excerpt:
        'Scholarships and tutoring continue to open meaningful opportunities for young learners.',
      date: 'March 22, 2026',
    },
    {
      id: 'rural-healthcare',
      title: 'Rural Healthcare Access And Community Care',
      category: 'Healthcare',
      image:
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80',
      excerpt:
        'Local health workers and mobile clinics are helping families receive urgent and preventive care.',
      date: 'February 10, 2026',
    },
  ],
  testimonials: [
    {
      name: 'Nadia Rahman',
      role: 'Volunteer',
      image: '/images/volunteers/nadia-rahman.jpg',
      quote:
        'Seeing children receive clean water and safe learning spaces has changed my perspective on what real impact can look like.',
    },
    {
      name: 'Imran Ali',
      role: 'Donor',
      image: '/images/volunteers/imran-ali.jpg',
      quote:
        'The transparency and trust from this team make every contribution feel personal and genuinely transformative.',
    },
  ],
  faq: [
    {
      question: 'How can I donate to a specific cause?',
      answer:
        'Choose a project from the causes section and donate directly through the secure checkout form.',
    },
    {
      question: 'Can I volunteer my time?',
      answer:
        'Yes. We welcome volunteers for community events, field work, teaching, and digital support.',
    },
    {
      question: 'Do you work with local organizations?',
      answer:
        'We partner with local leaders and grassroots groups to ensure programs are community-led and sustainable.',
    },
  ],
  contact: {
    phone: '+8801681388150',
    email: 'hello@hopebridge.org',
    address: 'Dhaka, Bangladesh',
    hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  },
};

const iconByName = {
  Leaf,
  Heart,
  Users,
};

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed.');
  }

  return payload;
}

function App() {
  const [siteData, setSiteData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/site-data/`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load data');
        return response.json();
      })
      .then((data) => {
        if (isMounted) setSiteData(data);
      })
      .catch(() => {
        if (isMounted) setSiteData(fallbackData);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    fetch(`${API_BASE_URL}/api/auth/me/`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (isMounted && data.authenticated) {
          setAuthUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setAuthChecking(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading || authChecking) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <WebsiteLayout data={siteData} authUser={authUser} setAuthUser={setAuthUser} />
    </BrowserRouter>
  );
}

function LoadingScreen() {
  return <div className="loading-shell">Loading HopeBridge...</div>;
}

function SignupPage({ setAuthUser }) {
  const navigate = useNavigate();
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

function LoginPage({ setAuthUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to log in.');
      setAuthUser(result.user);
      setStatus({ type: 'success', message: result.message });
      navigate('/');
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to log in.' });
    }
  };

  return (
    <div className="container section-block auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <span className="eyebrow accent">Welcome back</span>
          <h1>Log in to your account</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Password
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </label>
            <button type="submit" className="primary-btn">Log in</button>
          </form>

          <p className="auth-switch">
            Need an account? <Link to="/signup">Sign up</Link>
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

function ProfilePage({ authUser, setAuthUser }) {
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

function AboutPage() {
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

function EventsPage() {
  const navigate = useNavigate();
  const events = [
    {
      title: 'Community Clean-Up Day',
      date: 'May 18, 2026',
      time: '9:00 AM',
      image: '/images/events/photo-1469571486292-0ba58a3f068b.jpg',
      description: 'Help remove waste, improve public spaces, and support neighborhood care.',
    },
    {
      title: 'Hope Cafe Fundraiser Event',
      date: 'June 07, 2026',
      time: '8:30 AM',
      image: '/images/events/charity-event.jpg',
      description: 'Join our supporters for a day of meals, storytelling, and community giving.',
    },
    {
      title: 'Annual Giving Drive Kickoff',
      date: 'July 10, 2026',
      time: '11:00 AM',
      image: '/images/events/photo-1529156069898-49953e39b3ac.jpg',
      description: 'Celebrate the launch of this year’s regional support campaign and outreach efforts.',
    },
  ];

  const handleJoinEvent = (eventTitle) => {
    navigate('/contact', { state: { eventTitle } });
  };

  return (
    <div className="container section-block feature-page">
      <div className="feature-shell">
        <header className="feature-header">
          <div className="brand brand-protected">
            <span className="brand-mark">❤</span>
            <span>HopeBridge</span>
          </div>
          <nav className="protected-nav" aria-label="Events page navigation">
            <Link to="/">Home</Link>
            <Link to="/causes">Causes</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <div className="feature-banner feature-banner-light">
          <h1>Join Our Upcoming Events</h1>
        </div>

        <div className="feature-content-wrap">
          <div className="event-listing">
            {events.map((event) => (
              <article key={event.title} className="event-panel">
                <img src={event.image} alt={event.title} />
                <div className="event-panel-copy">
                  <span className="tag">Community</span>
                  <h3>{event.title}</h3>
                  <div className="meta-row">
                    <span><CalendarDays size={14} /> {event.date}</span>
                    <span><Clock3 size={14} /> {event.time}</span>
                  </div>
                  <p>{event.description}</p>
                  <button type="button" className="primary-btn small-btn" onClick={() => handleJoinEvent(event.title)}>
                    Join Event
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectedPage() {
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

function ReceiptPage() {
  const location = useLocation();
  const donation = location.state?.donation;

  const content = donation || {
    donorName: 'Guest Donor',
    amount: '0.00',
    date: new Date().toISOString().slice(0, 10),
    id: 'HB-0000',
    paymentMethod: 'Visa',
  };

  const printReceipt = () => window.print();

  return (
    <div className="container section-block receipt-page">
      <div className="receipt-card">
        <div className="receipt-header-row">
          <div>
            <span className="eyebrow accent">Donation receipt</span>
            <h1>Thank you for your generosity</h1>
          </div>
          <button type="button" className="primary-btn" onClick={printReceipt}>Print receipt</button>
        </div>

        <div className="receipt-body">
          <div className="receipt-meta">
            <span>Receipt ID</span>
            <strong>{content.id}</strong>
          </div>
          <div className="receipt-meta">
            <span>Donor</span>
            <strong>{content.donorName}</strong>
          </div>
          <div className="receipt-meta">
            <span>Amount</span>
            <strong>${Number(content.amount || 0).toFixed(2)}</strong>
          </div>
          <div className="receipt-meta">
            <span>Date</span>
            <strong>{content.date}</strong>
          </div>
          <div className="receipt-meta">
            <span>Payment method</span>
            <strong>{content.paymentMethod || 'Visa'}</strong>
          </div>
        </div>

        <p className="receipt-note">
          This receipt confirms that your donation supports HopeBridge programmes and helps bring clean water,
          education, and essential support to communities in need.
        </p>
      </div>
    </div>
  );
}

function NotFoundPage() {
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

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return null;
}

function RequireAuth({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signup" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function PublicOnlyRoute({ user, children }) {
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function WebsiteLayout({ data, authUser, setAuthUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout/`, {
        method: 'POST',
        credentials: 'include',
      });
      setAuthUser(null);
      navigate('/signup');
    } catch (error) {
      setAuthUser(null);
      navigate('/signup');
    }
  };

  return (
    <>
      <SiteHeader
        data={data}
        authUser={authUser}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="page-shell">
        <Routes>
          <Route path="/signup" element={<PublicOnlyRoute user={authUser}><SignupPageView setAuthUser={setAuthUser} /></PublicOnlyRoute>} />
          <Route path="/login" element={<PublicOnlyRoute user={authUser}><LoginPageView setAuthUser={setAuthUser} /></PublicOnlyRoute>} />
          <Route path="/profile" element={<RequireAuth user={authUser}><ProfilePageView authUser={authUser} setAuthUser={setAuthUser} /></RequireAuth>} />
          <Route path="/" element={<HomePageView data={data} />} />
          <Route path="/causes" element={<RequireAuth user={authUser}><CausesPageView data={data} /></RequireAuth>} />
          <Route path="/causes/:causeId" element={<RequireAuth user={authUser}><CauseDetailPageView data={data} /></RequireAuth>} />
          <Route path="/blog" element={<RequireAuth user={authUser}><BlogPageView data={data} /></RequireAuth>} />
          <Route path="/blog/:articleId" element={<RequireAuth user={authUser}><ArticleDetailPageView data={data} /></RequireAuth>} />
          <Route path="/contact" element={<RequireAuth user={authUser}><ContactPageView data={data} /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth user={authUser}><AboutPageView /></RequireAuth>} />
          <Route path="/events" element={<RequireAuth user={authUser}><EventsPageView /></RequireAuth>} />
          <Route path="/protected" element={<RequireAuth user={authUser}><ProtectedPageView /></RequireAuth>} />
          <Route path="/receipt" element={<RequireAuth user={authUser}><ReceiptPageView /></RequireAuth>} />
          <Route path="*" element={<RequireAuth user={authUser}><NotFoundPageView /></RequireAuth>} />
        </Routes>
      </main>

      <SiteFooter data={data} />
    </>
  );
}

function HomePage({ data }) {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-wrap">
          <div className="hero-copy">
            <span className="eyebrow">Make an impact today</span>
            <h1>{data.hero.title}</h1>
            <p>{data.hero.subtitle}</p>
            <div className="hero-actions">
              <Link to="/causes" className="primary-btn">
                {data.hero.primaryButton}
              </Link>
              <Link to="/blog" className="secondary-btn">
                {data.hero.secondaryButton}
              </Link>
            </div>
            <div className="hero-stats">
              {data.hero.stats.map((stat) => (
                <div key={stat.label} className="stat-box">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card large">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80"
                alt="Children and families being supported"
              />
            </div>
            <div className="floating-card donation-card">
              <span className="mini-label">Let’s create change</span>
              <h3>$24,800 raised</h3>
              <div className="progress-track">
                <span style={{ width: '72%' }}></span>
              </div>
              <small>72% of this month’s goal</small>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <span className="eyebrow">Our mission</span>
          <h2>We focus on the causes that create lasting change</h2>
        </div>

        <div className="impact-grid">
          {data.impact.map((item) => {
            const Icon = iconByName[item.icon] || HeartHandshake;
            return (
              <div key={item.title} className="impact-card">
                <div className="icon-wrap">
                  <Icon size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container section-block" id="events">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Latest events</span>
            <h2>Join Our Upcoming Events</h2>
          </div>
          <Link to="/events" className="text-link">
            View all events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="event-grid">
          {data.events.map((event) => (
            <article key={event.id} className="event-card">
              <img src={event.image} alt={event.title} />
              <div className="event-body">
                <div className="meta-row">
                  <span><CalendarDays size={14} /> {event.date}</span>
                  <span><Clock3 size={14} /> {event.time}</span>
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="location-line">
                  <MapPin size={14} /> {event.location}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Featured projects</span>
            <h2>Safe, sustainable support for community growth</h2>
          </div>
          <Link to="/causes" className="text-link">
            Explore all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="cause-grid">
          {data.causes.map((cause) => (
            <article key={cause.id} className="cause-card">
              <img src={cause.image} alt={cause.title} />
              <div className="cause-body">
                <span className="tag">{cause.category}</span>
                <h3>{cause.title}</h3>
                <p>{cause.summary}</p>
                <div className="progress-row">
                  <span>${cause.raised.toLocaleString()} raised</span>
                  <span>{Math.round((cause.raised / cause.goal) * 100)}%</span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${Math.min((cause.raised / cause.goal) * 100, 100)}%` }}></span>
                </div>
                <Link to={`/causes/${cause.id}`} className="inline-link">
                  Learn more <ChevronRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block testimonial-block">
        <div className="section-heading">
          <span className="eyebrow">Volunteer stories</span>
          <h2>Real people, real change</h2>
        </div>

        <div className="testimonial-grid">
          {data.testimonials.map((person) => (
            <article key={person.name} className="testimonial-card">
              <img src={person.image} alt={person.name} className="testimonial-photo" />
              <Quote size={32} className="quote-mark" />
              <p>{person.quote}</p>
              <div className="person-meta">
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block blog-block">
        <div className="section-heading split">
          <div>
            <span className="eyebrow">Latest articles</span>
            <h2>Stories that inspire action</h2>
          </div>
          <Link to="/blog" className="text-link">
            Explore blog <ArrowRight size={16} />
          </Link>
        </div>

        <div className="article-grid">
          {data.articles.map((article) => (
            <article key={article.id} className="article-card">
              <img src={article.image} alt={article.title} />
              <div className="article-body">
                <span className="tag">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <div className="article-footer">
                  <span>{article.date}</span>
                  <Link to={`/blog/${article.id}`} className="inline-link">
                    Read more <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-block cta-banner">
        <div className="cta-panel">
          <div>
            <span className="eyebrow accent">Get involved</span>
            <h2>Help build brighter futures for families in need</h2>
          </div>
          <Link to="/contact" className="primary-btn">
            Support our cause
          </Link>
        </div>
      </section>
    </>
  );
}

function CausesPage({ data }) {
  return (
    <div className="container section-block page-intro-block">
      <div className="section-heading center-heading">
        <span className="eyebrow">Causes</span>
        <h1>Every contribution creates lasting change</h1>
      </div>

      <div className="cause-grid causes-grid">
        {data.causes.map((cause) => (
          <article key={cause.id} className="cause-card">
            <img src={cause.image} alt={cause.title} />
            <div className="cause-body">
              <span className="tag">{cause.category}</span>
              <h3>{cause.title}</h3>
              <p>{cause.summary}</p>
              <div className="progress-row">
                <span>${cause.raised.toLocaleString()} raised</span>
                <span>{Math.round((cause.raised / cause.goal) * 100)}%</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${Math.min((cause.raised / cause.goal) * 100, 100)}%` }}></span>
              </div>
              <Link to={`/causes/${cause.id}`} className="inline-link">
                Donate now <ChevronRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CauseDetailPage({ data }) {
  const { causeId } = useParams();
  const cause = data.causes.find((item) => item.id === causeId) || data.causes[0];

  return (
    <div className="container section-block detail-page">
      <div className="detail-hero">
        <div className="detail-copy">
          <span className="eyebrow">{cause.category}</span>
          <h1>{cause.title}</h1>
          <p>{cause.summary}</p>
          <div className="detail-metrics">
            <div>
              <strong>${cause.raised.toLocaleString()}</strong>
              <span>Raised</span>
            </div>
            <div>
              <strong>{cause.supporters}</strong>
              <span>Supporters</span>
            </div>
            <div>
              <strong>${cause.goal.toLocaleString()}</strong>
              <span>Goal</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link to="/contact" className="primary-btn">
              Donate now
            </Link>
            <Link to="/causes" className="secondary-btn">
              Back to causes
            </Link>
          </div>
        </div>
        <img src={cause.image} alt={cause.title} className="detail-image" />
      </div>

      <div className="impact-bullets">
        <div className="info-card">
          <HandCoins size={24} />
          <h3>Why this matters</h3>
          <p>
            Your support helps families access essential resources, build resilience, and
            create healthier long-term opportunities.
          </p>
        </div>
        <div className="info-card">
          <ShieldCheck size={24} />
          <h3>How we work</h3>
          <p>
            We partner with local leaders, use transparent reporting, and focus on programs
            with measurable, sustainable impact.
          </p>
        </div>
        <div className="info-card">
          <Users size={24} />
          <h3>What we deliver</h3>
          <p>
            Supplies, field support, education resources, and direct assistance to the people
            who need it most.
          </p>
        </div>
      </div>
    </div>
  );
}

function BlogPage({ data }) {
  return (
    <div className="container section-block page-intro-block">
      <div className="section-heading center-heading">
        <span className="eyebrow">Blog</span>
        <h1>Stories of hope and community resilience</h1>
      </div>

      <div className="article-grid blog-grid">
        {data.articles.map((article) => (
          <article key={article.id} className="article-card">
            <img src={article.image} alt={article.title} />
            <div className="article-body">
              <span className="tag">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <div className="article-footer">
                <span>{article.date}</span>
                <Link to={`/blog/${article.id}`} className="inline-link">
                  Read story <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ArticleDetailPage({ data }) {
  const { articleId } = useParams();
  const article = data.articles.find((item) => item.id === articleId) || data.articles[0];

  return (
    <div className="container section-block detail-page">
      <div className="article-detail-card">
        <span className="eyebrow">{article.category}</span>
        <h1>{article.title}</h1>
        <div className="article-meta-line">
          <span>{article.date}</span>
          <span>By HopeBridge Team</span>
        </div>
        <img src={article.image} alt={article.title} className="article-detail-image" />
        <div className="article-content">
          <p>
            Across every community we serve, stories of perseverance and compassion continue to shape our mission.
            By listening closely to local leaders and families, we can design solutions that are practical, respectful,
            and truly life-changing.
          </p>
          <p>
            This project reflects the belief that lasting impact begins with trust. When people have access to clean water,
            healthy food, quality education, and caring support, they can build safety, dignity, and brighter futures for
            the next generation.
          </p>
          <p>
            Thanks to generous donors, volunteers, and local partners, we are able to turn small acts of generosity into
            measurable change. Whether it is a classroom, a clinic, or a clean-water station, each investment strengthens
            the foundation for a thriving community.
          </p>
        </div>
      </div>
    </div>
  );
}

function ContactPage({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    address: '',
    country: '',
    date: '',
    amount: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (location.state?.eventTitle) {
      setContactForm((current) => ({
        ...current,
        subject: `Event registration: ${location.state.eventTitle}`,
      }));
    }
  }, [location.state]);

  const handleContactChange = (event) => {
    setContactForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDonationChange = (event) => {
    setDonationForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to send message.');
      }

      setStatus({ type: 'success', message: result.message });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send message.' });
    }
  };

  const handleDonationSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/donate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationForm),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to process donation.');
      }

      const donationReceipt = {
        donorName: donationForm.name,
        amount: donationForm.amount,
        date: donationForm.date || new Date().toISOString().slice(0, 10),
        id: result.donationId ? `HB-${result.donationId}` : 'HB-0000',
        paymentMethod: 'International Card',
      };

      setStatus({ type: 'success', message: result.message });
      setDonationForm({ name: '', email: '', address: '', country: '', date: '', amount: '', cardNumber: '', expiry: '', cvc: '' });
      navigate('/receipt', { state: { donation: donationReceipt } });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to process donation.' });
    }
  };

  return (
    <div className="container section-block contact-page">
      <div className="section-heading center-heading">
        <span className="eyebrow">Contact us</span>
        <h1>Connect with us and make a difference</h1>
      </div>

      <div className="contact-layout">
        <div className="contact-card">
          <h3>Send a message</h3>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <label>
                Name
                <input type="text" name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={contactForm.email} onChange={handleContactChange} placeholder="Your email" required />
              </label>
            </div>
            <label>
              Subject
              <input type="text" name="subject" value={contactForm.subject} onChange={handleContactChange} placeholder="How can we help?" />
            </label>
            <label>
              Message
              <textarea rows="5" name="message" value={contactForm.message} onChange={handleContactChange} placeholder="Tell us more about your idea or question" required />
            </label>
            <button type="submit" className="primary-btn">
              Send message
            </button>
          </form>
        </div>

        <div className="sidebar-column">
          <div className="mini-card donation-box">
            <h3>Donate online</h3>
            <p className="donation-note">International card donations are welcome for supporters anywhere in the world.</p>
            <form className="donation-form" onSubmit={handleDonationSubmit}>
              <label>
                Full Name
                <input type="text" name="name" value={donationForm.name} onChange={handleDonationChange} required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={donationForm.email} onChange={handleDonationChange} required />
              </label>
              <label>
                Address
                <input type="text" name="address" value={donationForm.address} onChange={handleDonationChange} placeholder="Street, city, country" required />
              </label>
              <label>
                Country
                <input type="text" name="country" value={donationForm.country} onChange={handleDonationChange} placeholder="Bangladesh" required />
              </label>
              <label>
                Card Number
                <input type="text" name="cardNumber" value={donationForm.cardNumber} onChange={handleDonationChange} placeholder="1234 5678 9012 3456" required />
              </label>
              <div className="form-row donation-mini-row">
                <label>
                  Expiry
                  <input type="text" name="expiry" value={donationForm.expiry} onChange={handleDonationChange} placeholder="MM/YY" required />
                </label>
                <label>
                  CVC
                  <input type="text" name="cvc" value={donationForm.cvc} onChange={handleDonationChange} placeholder="123" required />
                </label>
              </div>
              <div className="form-row donation-mini-row">
                <label>
                  Date
                  <input type="date" name="date" value={donationForm.date} onChange={handleDonationChange} required />
                </label>
                <label>
                  Amount
                  <input type="number" name="amount" min="1" step="0.01" value={donationForm.amount} onChange={handleDonationChange} placeholder="25.00" required />
                </label>
              </div>
              <button type="submit" className="primary-btn">
                Donate now
              </button>
            </form>
          </div>

          <div className="mini-card info-stack">
            <div className="info-row">
              <Phone size={18} />
              <span>{data.contact.phone}</span>
            </div>
            <div className="info-row">
              <Mail size={18} />
              <span>{data.contact.email}</span>
            </div>
            <div className="info-row">
              <MapPin size={18} />
              <span>{data.contact.address}</span>
            </div>
            <div className="info-row">
              <Clock3 size={18} />
              <span>{data.contact.hours}</span>
            </div>
          </div>

          <div className="mini-card faq-card">
            <h3>Frequently asked questions</h3>
            {data.faq.map((item) => (
              <div key={item.question} className="faq-item">
                <div className="faq-question">
                  <CheckCircle2 size={16} />
                  <span>{item.question}</span>
                </div>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {status.message && (
        <div className={`status-banner ${status.type === 'success' ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}

export default App;
