import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CausesPage({ data }) {
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
