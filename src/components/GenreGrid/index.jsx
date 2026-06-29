import { Link } from 'react-router-dom';
import { GENRE_MAP } from '../../utils/genres';
import './GenreGrid.scss';

const GENRE_COLORS = {
  28:    ['#EF4444', '#B91C1C'],
  12:    ['#F59E0B', '#B45309'],
  16:    ['#3B82F6', '#1D4ED8'],
  35:    ['#FBBF24', '#D97706'],
  80:    ['#6B7280', '#374151'],
  99:    ['#10B981', '#047857'],
  18:    ['#8B5CF6', '#6D28D9'],
  10751: ['#EC4899', '#BE185D'],
  14:    ['#6366F1', '#4338CA'],
  27:    ['#DC2626', '#7F1D1D'],
  878:   ['#06B6D4', '#0E7490'],
  53:    ['#F97316', '#C2410C'],
};

const FEATURED_GENRES = [28, 35, 18, 27, 878, 53, 14, 16, 80, 12, 10751, 99];

function GenreGrid({ title }) {
  return (
    <section className="genre-grid">
      <h2 className="genre-grid__title">{title}</h2>
      <div className="genre-grid__list">
        {FEATURED_GENRES.map((id) => {
          const [from, to] = GENRE_COLORS[id] ?? ['#7C3AED', '#6D28D9'];
          return (
            <Link
              key={id}
              to={`/genre/${id}`}
              className="genre-grid__item"
              style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
            >
              {GENRE_MAP[id]}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default GenreGrid;
