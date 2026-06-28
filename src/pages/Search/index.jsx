import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { searchMovies } from '../../api/tmdb';
import MovieCard from '../../components/MovieCard';
import './Search.scss';

const RECENT_KEY = 'cinesphere-recent-searches';
const DEBOUNCE_MS = 450;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function getRecent() {
  try { return JSON.parse(sessionStorage.getItem(RECENT_KEY) || '[]'); }
  catch { return []; }
}

function saveRecent(query) {
  const prev = getRecent().filter((q) => q !== query);
  sessionStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, 8)));
}

function Search() {
  const { t } = useTranslation();
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [recent, setRecent]   = useState(getRecent);
  const timerRef              = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchMovies(query.trim());
        setResults(res.data.results ?? []);
        setSearched(true);
        saveRecent(query.trim());
        setRecent(getRecent());
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  const applyRecent = (term) => setQuery(term);

  const showRecent   = !query.trim() && recent.length > 0;
  const showResults  = !!query.trim();
  const noResults    = searched && results.length === 0;

  return (
    <div className="search-page">
      <h1 className="search-page__heading">{t('nav.search')}</h1>

      {/* Search bar */}
      <div className="search-page__bar">
        <SearchIcon />
        <input
          type="search"
          placeholder={t('search.placeholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          aria-label="Search movies"
        />
        {query && (
          <button className="search-page__bar--clear" onClick={() => setQuery('')} aria-label="Clear">
            ✕
          </button>
        )}
      </div>

      {/* Recent searches */}
      {showRecent && (
        <div className="search-page__recent">
          <h3>{t('search.recent')}</h3>
          <div className="search-page__recent-tags">
            {recent.map((term) => (
              <button key={term} className="search-page__recent-tag" onClick={() => applyRecent(term)}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <>
          {!noResults && (
            <p className="search-page__label">
              {loading ? t('common.loading') : <>{t('search.results')} <span>"{query}"</span></>}
            </p>
          )}

          {noResults ? (
            <div className="search-page__empty">
              <EmptyIcon />
              <p>No results found for <strong>"{query}"</strong></p>
            </div>
          ) : (
            <div className="search-page__grid">
              {loading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{ aspectRatio: '2/3', borderRadius: 10, background: '#1A1A2E', animation: 'shimmer 1.4s infinite' }} />
                  ))
                : results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
              }
            </div>
          )}
        </>
      )}

      {!showRecent && !showResults && (
        <div className="search-page__empty">
          <EmptyIcon />
          <p>{t('search.placeholder')}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
