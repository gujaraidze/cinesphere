import axiosClient from './axiosClient';

export const IMAGE_BASE     = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE  = 'https://image.tmdb.org/t/p/w780';   // valid backdrop size
export const IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

// ── Movies ────────────────────────────────────────────────────
export const getTrending = (mediaType = 'movie', timeWindow = 'week') =>
  axiosClient.get(`/trending/${mediaType}/${timeWindow}`);

export const getPopular = () =>
  axiosClient.get('/movie/popular');

export const getTopRated = () =>
  axiosClient.get('/movie/top_rated');

export const getNowPlaying = () =>
  axiosClient.get('/movie/now_playing');

export const getUpcomingMovies = () =>
  axiosClient.get('/movie/upcoming');

export const getTrendingMoviesMonth = () =>
  axiosClient.get('/trending/movie/month');

export const getMoviesByGenre = (genreId, page = 1) =>
  axiosClient.get('/discover/movie', { params: { with_genres: genreId, page, sort_by: 'popularity.desc' } });

// ── Movie detail ──────────────────────────────────────────────
export const getMovieDetails = (id) =>
  axiosClient.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
  axiosClient.get(`/movie/${id}/credits`);

export const getSimilarMovies = (id) =>
  axiosClient.get(`/movie/${id}/similar`);

export const getMovieVideos = (id) =>
  axiosClient.get(`/movie/${id}/videos`);

// ── TV Shows ──────────────────────────────────────────────────
export const getTVPopular = () =>
  axiosClient.get('/tv/popular');

export const getTVTopRated = () =>
  axiosClient.get('/tv/top_rated');

export const getTVOnAir = () =>
  axiosClient.get('/tv/on_the_air');

export const getTVAiringToday = () =>
  axiosClient.get('/tv/airing_today');

// ── TV detail ─────────────────────────────────────────────────
export const getTVDetails = (id) =>
  axiosClient.get(`/tv/${id}`);

export const getTVCredits = (id) =>
  axiosClient.get(`/tv/${id}/credits`);

export const getSimilarShows = (id) =>
  axiosClient.get(`/tv/${id}/similar`);

export const getTVVideos = (id) =>
  axiosClient.get(`/tv/${id}/videos`);

// ── Search ────────────────────────────────────────────────────
export const searchMovies = (query, page = 1) =>
  axiosClient.get('/search/movie', { params: { query, page } });
