import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  Heart,
  HeartHandshake,
  Leaf,
  MapPin,
  Quote,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const iconByName = {
  Leaf,
  Heart,
  Users,
};

export function HomePage({ data }) {
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

