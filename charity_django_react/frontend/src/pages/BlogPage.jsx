import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogPage({ data }) {
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
