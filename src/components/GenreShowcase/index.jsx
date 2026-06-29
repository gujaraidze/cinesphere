import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPopular, getTrending, IMAGE_ORIGINAL, BACKDROP_BASE } from '../../api/tmdb';
import { useWatchlist } from '../../context/WatchlistContext';
import TrailerModal from '../TrailerModal';
import './GenreShowcase.scss';

const GENRES = [
  { id: 28,    name: 'Action' },
  { id: 12,    name: 'Adventure' },
  { id: 80,    name: 'Crime' },
  { id: 35,    name: 'Comedy' },
  { id: 14,    name: 'Fantasy' },
  { id: 27,    name: 'Horror' },
  { id: 878,   name: 'Sci-Fi' },
  { id: 18,    name: 'Drama' },
  { id: 53,    name: 'Thriller' },
  { id: 16,    name: 'Animation' },
  { id: 10751, name: 'Family' },
  { id: 9648,  name: 'Mystery' },
];

const PlayIcon     = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const VideoIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
const BookmarkIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const ChevronLeft  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;
const ExploreArrow = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

function GenreShowcase({ title, subtitle }) {
  const [pool, setPool]               = useState([]);
  const [selectedId, setSelectedId]   = useState(GENRES[0].id);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const stripRef                      = useRef(null);
  const navigate                      = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    Promise.all([getPopular(), getTrending()])
      .then(([popRes, trendRes]) => {
        setPool([...popRes.data.results, ...trendRes.data.results]);
      })
      .catch(() => {});
  }, []);

  // Greedy unique assignment — each genre card gets a different movie from the pool
  const genreMovieMap = useMemo(() => {
    const used = new Set();
    const map  = {};
    for (const g of GENRES) {
      const movie = pool.find((m) => !used.has(m.id) && m.genre_ids?.includes(g.id));
      if (movie) {
        map[g.id] = movie;
        used.add(movie.id);
      }
    }
    return map;
  }, [pool]);

  // Hero IS the card movie — same source, so background always matches the selected card
  const heroMovie = useMemo(() => genreMovieMap[selectedId] ?? null, [genreMovieMap, selectedId]);

  // First click → select genre (show its movie); second click → go to genre page
  const handleGenreClick = (genreId) => {
    if (selectedId === genreId) {
      navigate(`/genre/${genreId}`);
    } else {
      setSelectedId(genreId);
    }
  };

  const scrollStrip = (dir) =>
    stripRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });

  const year        = heroMovie?.release_date?.slice(0, 4) ?? heroMovie?.first_air_date?.slice(0, 4);
  const inWatchlist = heroMovie ? isInWatchlist(heroMovie.id) : false;
  const backdropUrl = heroMovie?.backdrop_path ? `${IMAGE_ORIGINAL}${heroMovie.backdrop_path}` : null;

  return (
    <section className="genre-showcase">
      <div className="genre-showcase__bg">
        {backdropUrl && <img key={backdropUrl} src={backdropUrl} alt="" />}
        <div className="genre-showcase__gradient" />
      </div>

      <div className="genre-showcase__body">
        {/* Section label — always at top */}
        <div className="genre-showcase__head">
          <h2 className="genre-showcase__section-title">{title}</h2>
          <p className="genre-showcase__section-sub">{subtitle}</p>
        </div>

        {/* Movie info — pinned above genre strip */}
        {heroMovie && (
          <div className="genre-showcase__info" key={heroMovie.id}>
            {year && <span className="genre-showcase__year">{year}</span>}
            <h1 className="genre-showcase__title">{heroMovie.title ?? heroMovie.name}</h1>
            <p className="genre-showcase__overview">{heroMovie.overview}</p>
            <div className="genre-showcase__actions">
              <Link to={`/movie/${heroMovie.id}`} className="gs-btn gs-btn--primary">
                <PlayIcon /> Play Now
              </Link>
              <button className="gs-btn gs-btn--outline" onClick={() => setTrailerOpen(true)}>
                <VideoIcon /> Watch Trailer
              </button>
              <button
                className="gs-btn gs-btn--outline"
                onClick={() => inWatchlist ? removeFromWatchlist(heroMovie.id) : addToWatchlist(heroMovie)}
              >
                <BookmarkIcon /> {inWatchlist ? 'In Watchlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        )}

        {/* Genre selector strip */}
        <div className="genre-showcase__strip-wrap">
          <div className="genre-showcase__strip" ref={stripRef}>
            {GENRES.map((g) => {
              const cardMovie = genreMovieMap[g.id];
              const bgUrl = cardMovie?.backdrop_path
                ? `${BACKDROP_BASE}${cardMovie.backdrop_path}`
                : null;
              const isActive = selectedId === g.id;
              return (
                <button
                  key={g.id}
                  className={`genre-showcase__card${isActive ? ' genre-showcase__card--active' : ''}`}
                  onClick={() => handleGenreClick(g.id)}
                  title={isActive ? `Explore all ${g.name} movies` : g.name}
                >
                  {bgUrl && (
                    <div
                      className="genre-showcase__card-bg"
                      style={{ backgroundImage: `url(${bgUrl})` }}
                    />
                  )}
                  <div className="genre-showcase__card-overlay" />
                  <span className="genre-showcase__card-name">{g.name}</span>
                  {isActive && (
                    <div className="genre-showcase__card-explore" aria-hidden="true">
                      <ExploreArrow />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="genre-showcase__strip-arrows">
            <button className="genre-showcase__arrow" onClick={() => scrollStrip(-1)} aria-label="Scroll left">
              <ChevronLeft />
            </button>
            <button className="genre-showcase__arrow" onClick={() => scrollStrip(1)} aria-label="Scroll right">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <TrailerModal movieId={heroMovie?.id} isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />
    </section>
  );
}

export default GenreShowcase;
