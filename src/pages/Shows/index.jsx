import { useTranslation } from 'react-i18next';
import Hero from '../../components/Hero';
import Row from '../../components/Row';
import useFetch from '../../hooks/useFetch';
import { getTVPopular, getTVTopRated, getTVOnAir, getTVAiringToday } from '../../api/tmdb';

function Shows() {
  const { t } = useTranslation();

  const popular  = useFetch(getTVPopular,     []);
  const topRated = useFetch(getTVTopRated,    []);
  const onAir    = useFetch(getTVOnAir,       []);
  const today    = useFetch(getTVAiringToday, []);

  const heroShows = popular.data?.results?.slice(0, 5) ?? [];

  return (
    <>
      <Hero movies={heroShows} loading={popular.loading} />
      <div style={{ paddingTop: '48px' }}>
        <Row title={t('shows.airingToday')} movies={today.data?.results    ?? []} loading={today.loading}    mediaType="tv" />
        <Row title={t('shows.popular')}     movies={popular.data?.results  ?? []} loading={popular.loading}  mediaType="tv" />
        <Row title={t('shows.onAir')}       movies={onAir.data?.results    ?? []} loading={onAir.loading}    mediaType="tv" />
        <Row title={t('shows.topRated')}    movies={topRated.data?.results ?? []} loading={topRated.loading} mediaType="tv" />
      </div>
    </>
  );
}

export default Shows;
