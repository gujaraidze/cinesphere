import { Link } from 'react-router-dom';
import { IMAGE_BASE } from '../../api/tmdb';
import { getGenreNames } from '../../utils/genres';
import './MovieCard.scss';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
  );
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function MovieCard({ movie }) {
  const genres = getGenreNames(movie.genre_ids);
  const rating = movie.vote_average?.toFixed(1);
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : null;

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card__poster">
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title ?? movie.name} loading="lazy" />
        ) : (
          <div className="movie-card__no-poster">No Image</div>
        )}
        <div className="movie-card__overlay">
          <div className="movie-card__play"><PlayIcon /></div>
        </div>
      </div>

      <div className="movie-card__info">
        <p className="movie-card__title">{movie.title ?? movie.name}</p>
        <div className="movie-card__meta">
          {rating && (
            <span className="movie-card__rating">
              <StarIcon />{rating}
            </span>
          )}
          {rating && genres.length > 0 && <span className="movie-card__dot" />}
          {genres.length > 0 && (
            <span className="movie-card__genres">{genres.join(' • ')}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
