import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Shows from './pages/Shows';
import Upcoming from './pages/Upcoming';
import Genre from './pages/Genre';
import Detail from './pages/Detail';
import TVDetail from './pages/TVDetail';
import Watchlist from './pages/Watchlist';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
        <Route path="/movies"     element={<PageTransition><Movies /></PageTransition>} />
        <Route path="/shows"      element={<PageTransition><Shows /></PageTransition>} />
        <Route path="/upcoming"   element={<PageTransition><Upcoming /></PageTransition>} />
        <Route path="/genre/:id"  element={<PageTransition><Genre /></PageTransition>} />
        <Route path="/movie/:id"  element={<PageTransition><Detail /></PageTransition>} />
        <Route path="/tv/:id"     element={<PageTransition><TVDetail /></PageTransition>} />
        <Route path="/watchlist"  element={<PageTransition><Watchlist /></PageTransition>} />
        <Route path="/search"     element={<PageTransition><Search /></PageTransition>} />
        <Route path="*"           element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </BrowserRouter>
        </LanguageProvider>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;
