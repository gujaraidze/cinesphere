import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_ORIGINAL } from '../../api/tmdb';
import { getGenreNames } from '../../utils/genres';
import { useWatchlist } from '../../context/WatchlistContext';
import TrailerModal from '../TrailerModal';
import './Hero.scss';

function PlayIcon() {
  return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
}
function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  );
}
function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

const AUTO_ADVANCE_MS = 6000;

function Hero({ movies = [], loading = false }) {
  const [index, setIndex]           = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    if (movies.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % movies.length), AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [movies.length]);

  // Reset to first slide when movies list changes
  useEffect(() => { setIndex(0); }, [movies]);

  if (loading) return <div className="hero hero--skeleton" />;
  if (!movies.length) return null;

  const movie       = movies[index];
  const backdropUrl = movie.backdrop_path ? `${IMAGE_ORIGINAL}${movie.backdrop_path}` : null;
  const year        = movie.release_date?.slice(0, 4) ?? movie.first_air_date?.slice(0, 4);
  const genres      = getGenreNames(movie.genre_ids, 3);
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <section className="hero">
      {backdropUrl && (
        <div className="hero__backdrop">
          <img src={backdropUrl} alt={movie.title ?? movie.name} />
        </div>
      )}
      <div className="hero__gradient" />

      <div className="hero__content">
        {year && <span className="hero__year">{year}</span>}
        <h1 className="hero__title">{movie.title ?? movie.name}</h1>

        {genres.length > 0 && (
          <div className="hero__tags">
            {genres.map((g) => <span key={g} className="hero__tag">{g}</span>)}
          </div>
        )}

        {movie.overview && (
          <p className="hero__overview">{movie.overview}</p>
        )}

        <div className="hero__actions">
          <Link to={`/movie/${movie.id}`} className="hero__btn hero__btn--primary">
            <PlayIcon /> Play Now
          </Link>
          <button className="hero__btn hero__btn--outline" onClick={() => setTrailerOpen(true)}>
            <VideoIcon /> Watch Trailer
          </button>
          <button className="hero__btn hero__btn--outline" onClick={() =>
            inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
          }>
            <BookmarkIcon />
            {inWatchlist ? 'In Watchlist' : 'Watchlist'}
          </button>
        </div>
      </div>

      {movies.length > 1 && (
        <div className="hero__dots">
          {movies.map((_, i) => (
            <button
              key={i}
              className={`hero__dot${i === index ? ' hero__dot--active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <TrailerModal
        movieId={movie.id}
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
      />
    </section>
  );
}

export default Hero;
