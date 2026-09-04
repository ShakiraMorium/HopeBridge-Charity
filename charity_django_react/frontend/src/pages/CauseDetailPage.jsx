import { ChevronRight, HandCoins, ShieldCheck, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function CauseDetailPage({ data }) {
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
