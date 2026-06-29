import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getUpcomingMovies, IMAGE_BASE } from '../../api/tmdb';
import './Upcoming.scss';

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

function Upcoming() {
  const { t } = useTranslation();
  const { data, loading } = useFetch(getUpcomingMovies, []);
  const movies = data?.results ?? [];

  return (
    <div className="upcoming-page">
      <div className="upcoming-page__hero">
        <h1 className="upcoming-page__heading">{t('upcoming.title')}</h1>
        <p className="upcoming-page__sub">{t('upcoming.subtitle')}</p>
      </div>

      <div className="upcoming-page__grid">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="upcoming-card upcoming-card--skeleton" />
            ))
          : movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="upcoming-card">
                <div className="upcoming-card__poster">
                  {movie.poster_path ? (
                    <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.title} loading="lazy" />
                  ) : (
                    <div className="upcoming-card__no-img">{movie.title}</div>
                  )}
                  <div className="upcoming-card__overlay" />
                </div>
                <div className="upcoming-card__info">
                  <h3 className="upcoming-card__title">{movie.title}</h3>
                  {movie.release_date && (
                    <div className="upcoming-card__date">
                      <CalendarIcon />
                      <span>{formatDate(movie.release_date)}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default Upcoming;
