import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero';
import Row from '../../components/Row';
import GenreShowcase from '../../components/GenreShowcase';
import MostWatchedShowcase from '../../components/MostWatchedShowcase';
import useFetch from '../../hooks/useFetch';
import { getTrending, getPopular, getTopRated, getNowPlaying } from '../../api/tmdb';

function Home() {
  const { t } = useTranslation();

  const trending   = useFetch(getTrending,   []);
  const popular    = useFetch(getPopular,    []);
  const topRated   = useFetch(getTopRated,   []);
  const nowPlaying = useFetch(getNowPlaying, []);

  const heroMovies = trending.data?.results?.slice(0, 5) ?? [];

  return (
    <>
      <Hero movies={heroMovies} loading={trending.loading} />

      <div style={{ paddingTop: '48px' }}>
        <Row title={t('home.trending')}   movies={trending.data?.results   ?? []} loading={trending.loading} />
        <Row title={t('home.nowPlaying')} movies={nowPlaying.data?.results ?? []} loading={nowPlaying.loading} />
      </div>

      <MostWatchedShowcase
        title={t('home.mostWatched')}
        subtitle="Watch this month's most watched shows"
      />

      <div style={{ paddingTop: '48px' }}>
        <Row title={t('home.popular')}  movies={popular.data?.results  ?? []} loading={popular.loading} />
      </div>

      <GenreShowcase
        title={t('home.genres')}
        subtitle="See wide range of genres you like"
      />

      <div style={{ paddingTop: '48px' }}>
        <Row title={t('home.topRated')} movies={topRated.data?.results ?? []} loading={topRated.loading} />
      </div>
    </>
  );
}

export default Home;
