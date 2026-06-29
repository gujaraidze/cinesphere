import { useState, useEffect } from 'react';
import Modal from '../Modal';
import { getMovieVideos, getTVVideos } from '../../api/tmdb';

function TrailerModal({ movieId, mediaType = 'movie', isOpen, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading]       = useState(false);

  useEffect(() => {
    if (!isOpen || !movieId) return;

    setLoading(true);
    setTrailerKey(null);

    const fetchFn = mediaType === 'tv' ? getTVVideos : getMovieVideos;

    fetchFn(movieId)
      .then(({ data }) => {
        const trailer = data.results?.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
        ) ?? data.results?.find(
          (v) => v.site === 'YouTube' && v.type === 'Trailer'
        ) ?? data.results?.find(
          (v) => v.site === 'YouTube'
        );
        setTrailerKey(trailer?.key ?? null);
      })
      .catch(() => setTrailerKey(null))
      .finally(() => setLoading(false));
  }, [isOpen, movieId, mediaType]);

  const handleClose = () => {
    setTrailerKey(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {loading && <div className="trailer-none">Loading trailer…</div>}
      {!loading && trailerKey && (
        <div className="trailer-frame">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title="Trailer"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
      {!loading && !trailerKey && (
        <div className="trailer-none">No trailer available for this title.</div>
      )}
    </Modal>
  );
}

export default TrailerModal;
