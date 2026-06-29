import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero';
import Row from '../../components/Row';
import useFetch from '../../hooks/useFetch';
import { getPopular, getTopRated, getNowPlaying, getUpcomingMovies } from '../../api/tmdb';

function Movies() {
  const { t } = useTranslation();

  const popular    = useFetch(getPopular,        []);
  const topRated   = useFetch(getTopRated,       []);
  const nowPlaying = useFetch(getNowPlaying,     []);
  const upcoming   = useFetch(getUpcomingMovies, []);

  const heroMovies = popular.data?.results?.slice(0, 5) ?? [];

  return (
    <>
      <Hero movies={heroMovies} loading={popular.loading} />
      <div style={{ paddingTop: '48px' }}>
        <Row title={t('movies.nowPlaying')} movies={nowPlaying.data?.results ?? []} loading={nowPlaying.loading} />
        <Row title={t('movies.popular')}    movies={popular.data?.results    ?? []} loading={popular.loading} />
        <Row title={t('movies.topRated')}   movies={topRated.data?.results   ?? []} loading={topRated.loading} />
        <Row title={t('movies.upcoming')}   movies={upcoming.data?.results   ?? []} loading={upcoming.loading} />
      </div>
    </>
  );
}

export default Movies;
