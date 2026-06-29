import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTVPopular, IMAGE_ORIGINAL, IMAGE_BASE } from '../../api/tmdb';
import { useWatchlist } from '../../context/WatchlistContext';
import TrailerModal from '../TrailerModal';
import './MostWatchedShowcase.scss';

const TV_GENRE_MAP = {
  10759: 'Action', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 9648: 'Mystery',
  10765: 'Sci-Fi', 10768: 'War', 37: 'Western',
};

const getGenreTags = (ids = [], limit = 3) =>
  ids.slice(0, limit).map((id) => TV_GENRE_MAP[id]).filter(Boolean);

const PlayIcon     = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const BookmarkIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const ChevronLeft  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;
const ChevronRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>;

const VISIBLE = 3; // poster cards visible at once

function MostWatchedShowcase({ title, subtitle }) {
  const [shows, setShows]           = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    getTVPopular()
      .then(({ data }) => setShows(data.results?.slice(0, 10) ?? []))
      .catch(() => {});
  }, []);

  const show       = shows[selectedIdx];
  const visibleEnd = Math.min(windowStart + VISIBLE, shows.length);
  const visibleShows = shows.slice(windowStart, visibleEnd);

  const canPrev = windowStart > 0;
  const canNext = windowStart + VISIBLE < shows.length;

  const prev = () => {
    if (!canPrev) return;
    const next = windowStart - 1;
    setWindowStart(next);
    setSelectedIdx(next);
  };

  const next = () => {
    if (!canNext) return;
    const next = windowStart + 1;
    setWindowStart(next);
    setSelectedIdx(next);
  };

  const backdropUrl = show?.backdrop_path
    ? `${IMAGE_ORIGINAL}${show.backdrop_path}`
    : null;

  const year     = show?.first_air_date?.slice(0, 4);
  const genres   = getGenreTags(show?.genre_ids);
  const inWatch  = show ? isInWatchlist(show.id) : false;
  const showItem = show ? { ...show, title: show.name, release_date: show.first_air_date } : null;

  if (!shows.length) return null;

  return (
    <section className="mw-showcase">
      {/* Backdrop */}
      <div className="mw-showcase__bg">
        {backdropUrl && <img key={backdropUrl} src={backdropUrl} alt="" />}
        <div className="mw-showcase__gradient" />
      </div>

      <div className="mw-showcase__layout">
        {/* ── Left: info ── */}
        <div className="mw-showcase__left">
          <div className="mw-showcase__head">
            <h2 className="mw-showcase__section-title">{title}</h2>
            <p className="mw-showcase__section-sub">{subtitle}</p>
          </div>

          {show && (
            <div className="mw-showcase__info" key={show.id}>
              {year && <span className="mw-showcase__year">{year}</span>}
              <h1 className="mw-showcase__title">{show.name}</h1>

              {genres.length > 0 && (
                <div className="mw-showcase__tags">
                  {genres.map((g, i) => (
                    <span key={g}>
                      {g}{i < genres.length - 1 && <span className="mw-showcase__dot"> • </span>}
                    </span>
                  ))}
                </div>
              )}

              <p className="mw-showcase__overview">{show.overview}</p>

              <div className="mw-showcase__actions">
                <Link to={`/tv/${show.id}`} className="mw-btn mw-btn--primary">
                  <PlayIcon /> Play Now
                </Link>
                <button
                  className="mw-btn mw-btn--outline"
                  onClick={() => inWatch ? removeFromWatchlist(show.id) : addToWatchlist(showItem)}
                >
                  <BookmarkIcon /> {inWatch ? 'In Watchlist' : 'Add to Wishlist'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: poster cards ── */}
        <div className="mw-showcase__right">
          <div className="mw-showcase__cards">
            {visibleShows.map((s, i) => {
              const realIdx = windowStart + i;
              const active  = realIdx === selectedIdx;
              const posterUrl = s.poster_path ? `${IMAGE_BASE}${s.poster_path}` : null;
              return (
                <button
                  key={s.id}
                  className={`mw-card${active ? ' mw-card--active' : ''}`}
                  onClick={() => setSelectedIdx(realIdx)}
                >
                  {posterUrl ? (
                    <img src={posterUrl} alt={s.name} />
                  ) : (
                    <div className="mw-card__placeholder">{s.name}</div>
                  )}
                  {active && <div className="mw-card__active-border" />}
                </button>
              );
            })}
          </div>

          <div className="mw-showcase__nav">
            <button className="mw-showcase__arrow" onClick={prev} disabled={!canPrev} aria-label="Previous">
              <ChevronLeft />
            </button>
            <button className="mw-showcase__arrow" onClick={next} disabled={!canNext} aria-label="Next">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <TrailerModal movieId={show?.id} mediaType="tv" isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />
    </section>
  );
}

export default MostWatchedShowcase;
