import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { getTVDetails, getTVCredits, getSimilarShows, IMAGE_ORIGINAL, IMAGE_BASE } from '../../api/tmdb';
import { useWatchlist } from '../../context/WatchlistContext';
import Row from '../../components/Row';
import TrailerModal from '../../components/TrailerModal';
import '../Detail/Detail.scss';

const PlayIcon     = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const VideoIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>;
const BookmarkIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
const StarIcon     = () => <svg viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ClockIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const ShareIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
const HeartIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;

function CastCard({ person }) {
  const initials = person.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return (
    <div className="cast-card">
      <div className="cast-card__avatar">
        {person.profile_path ? (
          <img src={`${IMAGE_BASE}${person.profile_path}`} alt={person.name} loading="lazy" />
        ) : (
          <div className="cast-card__initials">{initials}</div>
        )}
      </div>
      <p className="cast-card__name">{person.name}</p>
      <p className="cast-card__character">{person.character}</p>
    </div>
  );
}

function TVDetail() {
  const { id } = useParams();

  const fetchDetails = useCallback(() => getTVDetails(id),  [id]);
  const fetchCredits = useCallback(() => getTVCredits(id),  [id]);
  const fetchSimilar = useCallback(() => getSimilarShows(id), [id]);

  const { data: show,    loading: loadingShow    } = useFetch(fetchDetails, [id]);
  const { data: credits                           } = useFetch(fetchCredits, [id]);
  const { data: similar, loading: loadingSimilar } = useFetch(fetchSimilar, [id]);

  const [trailerOpen, setTrailerOpen] = useState(false);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  if (loadingShow) {
    return (
      <>
        <div className="detail-skeleton__hero" />
        <div className="detail-body">
          {[200, 160, 260, 120].map((w, i) => (
            <div key={i} className="detail-skeleton__text" style={{ width: w }} />
          ))}
        </div>
      </>
    );
  }

  if (!show) return <p style={{ padding: '80px 48px', color: '#999' }}>Show not found.</p>;

  const year        = show.first_air_date?.slice(0, 4);
  const genres      = show.genres?.map((g) => g.name) ?? [];
  const runtime     = show.episode_run_time?.[0] ? `~${show.episode_run_time[0]}m / ep` : null;
  const rating      = show.vote_average?.toFixed(1);
  const backdropUrl = show.backdrop_path ? `${IMAGE_ORIGINAL}${show.backdrop_path}` : null;
  const inWatchlist = isInWatchlist(show.id);
  const cast        = credits?.cast?.slice(0, 10) ?? [];
  const similarList = similar?.results?.slice(0, 12) ?? [];

  const showAsItem  = { ...show, title: show.name, release_date: show.first_air_date };

  return (
    <>
      <div className="detail-hero">
        {backdropUrl && <img className="detail-hero__img" src={backdropUrl} alt={show.name} />}
        <div className="detail-hero__gradient" />
        <div className="detail-hero__info">
          {year && <span className="detail-hero__year">{year}</span>}
          <h1 className="detail-hero__title">{show.name}</h1>
          <div className="detail-hero__tags">
            {genres.map((g) => <span key={g} className="detail-hero__tag">{g}</span>)}
          </div>
        </div>
      </div>

      <div className="detail-actions">
        <div className="detail-actions__left">
          <button className="action-btn action-btn--primary"><PlayIcon /> Play Now</button>
          <button className="action-btn action-btn--outline" onClick={() => setTrailerOpen(true)}>
            <VideoIcon /> Watch Trailer
          </button>
          <button className="action-btn action-btn--outline" onClick={() =>
            inWatchlist ? removeFromWatchlist(show.id) : addToWatchlist(showAsItem)
          }>
            <BookmarkIcon />
            {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
        <div className="detail-actions__right">
          <button className="action-btn action-btn--ghost"><ShareIcon /> Share</button>
          <button className="action-btn action-btn--ghost"><HeartIcon /> Like</button>
        </div>
      </div>

      <div className="detail-body">
        <div className="detail-meta">
          {rating && (
            <div className="detail-meta__item"><StarIcon /><span>{rating}</span> / 10</div>
          )}
          {runtime && (
            <div className="detail-meta__item"><ClockIcon /><span>{runtime}</span></div>
          )}
          {show.number_of_seasons && (
            <div className="detail-meta__item">Seasons: <span>{show.number_of_seasons}</span></div>
          )}
          {show.status && (
            <div className="detail-meta__item">Status: <span>{show.status}</span></div>
          )}
        </div>

        {show.overview && (
          <div className="detail-section">
            <h2>Synopsis</h2>
            <p className="detail-overview">{show.overview}</p>
          </div>
        )}

        {cast.length > 0 && (
          <div className="detail-section">
            <h2>Cast</h2>
            <div className="cast-list">
              {cast.map((person) => <CastCard key={person.credit_id} person={person} />)}
            </div>
          </div>
        )}
      </div>

      <TrailerModal movieId={id} mediaType="tv" isOpen={trailerOpen} onClose={() => setTrailerOpen(false)} />

      {(similarList.length > 0 || loadingSimilar) && (
        <Row title="Similar Shows" movies={similarList} loading={loadingSimilar} mediaType="tv" />
      )}
    </>
  );
}

export default TVDetail;
