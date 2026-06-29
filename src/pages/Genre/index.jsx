import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMoviesByGenre, IMAGE_BASE } from '../../api/tmdb';
import { GENRE_MAP } from '../../utils/genres';
import './Genre.scss';

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

function Genre() {
  const { id } = useParams();
  const genreName = GENRE_MAP[Number(id)] ?? 'Genre';

  const [movies, setMovies]         = useState([]);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Reset when genre changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    setLoading(true);
  }, [id]);

  // Fetch whenever id or page changes
  useEffect(() => {
    let cancelled = false;
    const isFirstPage = page === 1;

    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);

    getMoviesByGenre(id, page)
      .then(({ data }) => {
        if (cancelled) return;
        setMovies((prev) => isFirstPage ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages ?? 1);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      });

    return () => { cancelled = true; };
  }, [id, page]);

  const handleLoadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const hasMore = page < totalPages;

  return (
    <div className="genre-page">
      <div className="genre-page__hero">
        <p className="genre-page__label">Browse by genre</p>
        <h1 className="genre-page__heading">{genreName}</h1>
        {!loading && <p className="genre-page__count">{movies.length} movies</p>}
      </div>

      <div className="genre-page__grid">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="genre-card genre-card--skeleton" />
            ))
          : movies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="genre-card">
                <div className="genre-card__poster">
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_BASE}${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className="genre-card__no-img">{movie.title}</div>
                  )}
                  <div className="genre-card__overlay" />
                </div>
                <div className="genre-card__info">
                  <h3 className="genre-card__title">{movie.title}</h3>
                  <div className="genre-card__meta">
                    {movie.vote_average > 0 && (
                      <span className="genre-card__rating">
                        <StarIcon />{movie.vote_average.toFixed(1)}
                      </span>
                    )}
                    {movie.release_date && (
                      <span className="genre-card__year">{movie.release_date.slice(0, 4)}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}

        {/* Skeleton rows appended while loading more */}
        {loadingMore && Array.from({ length: 20 }).map((_, i) => (
          <div key={`more-${i}`} className="genre-card genre-card--skeleton" />
        ))}
      </div>

      {!loading && hasMore && (
        <div className="genre-page__more">
          <button
            className="genre-page__load-btn"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading…' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Genre;
