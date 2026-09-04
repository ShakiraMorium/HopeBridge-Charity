import { CalendarDays, Clock3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function EventsPage() {
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
