import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: 'en-US',
  },
});

export default axiosClient;
