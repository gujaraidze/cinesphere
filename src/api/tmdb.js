import axiosClient from './axiosClient';

export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

export const getTrending = (mediaType = 'movie', timeWindow = 'week') =>
  axiosClient.get(`/trending/${mediaType}/${timeWindow}`);

export const getPopular = () =>
  axiosClient.get('/movie/popular');

export const getTopRated = () =>
  axiosClient.get('/movie/top_rated');

export const getNowPlaying = () =>
  axiosClient.get('/movie/now_playing');

export const getMovieDetails = (id) =>
  axiosClient.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
  axiosClient.get(`/movie/${id}/credits`);

export const getSimilarMovies = (id) =>
  axiosClient.get(`/movie/${id}/similar`);

export const getMovieVideos = (id) =>
  axiosClient.get(`/movie/${id}/videos`);

export const searchMovies = (query, page = 1) =>
  axiosClient.get('/search/movie', { params: { query, page } });
