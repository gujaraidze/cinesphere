import { useRef } from 'react';
import MovieCard from '../MovieCard';
import './Row.scss';

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

const SCROLL_AMOUNT = 600;
const SKELETON_COUNT = 6;

function Row({ title, movies = [], loading = false }) {
  const trackRef = useRef(null);

  const scroll = (dir) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: dir * SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  return (
    <section className="row">
      <div className="row__header">
        <h2 className="row__title">{title}</h2>
        <div className="row__controls">
          <button className="row__arrow" onClick={() => scroll(-1)} aria-label="Scroll left">
            <ChevronLeft />
          </button>
          <button className="row__arrow" onClick={() => scroll(1)} aria-label="Scroll right">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="row__track" ref={trackRef}>
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className="row__skeleton" />
            ))
          : movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>
    </section>
  );
}

export default Row;
