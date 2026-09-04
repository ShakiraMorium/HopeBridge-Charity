import { useParams } from 'react-router-dom';

export function ArticleDetailPage({ data }) {
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
