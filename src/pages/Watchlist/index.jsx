import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useWatchlist } from '../../context/WatchlistContext';
import MovieCard from '../../components/MovieCard';
import './Watchlist.scss';

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function Watchlist() {
  const { t } = useTranslation();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="watchlist-page">
        <div className="watchlist-page__empty">
          <BookmarkIcon />
          <h2>{t('watchlist.title')}</h2>
          <p>{t('watchlist.empty')}</p>
          <Link to="/">{t('common.backHome')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-page__header">
        <h1 className="watchlist-page__heading">{t('watchlist.title')}</h1>
        <span className="watchlist-page__count">{watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}</span>
      </div>

      <div className="watchlist-page__grid">
        {watchlist.map((movie) => (
          <div key={movie.id} className="watchlist-page__card-wrap">
            <MovieCard movie={movie} />
            <button
              className="watchlist-page__remove"
              onClick={() => removeFromWatchlist(movie.id)}
              aria-label={`Remove ${movie.title} from watchlist`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
