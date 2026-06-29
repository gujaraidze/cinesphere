import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import './Navbar.scss';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function Navbar() {
  const [drawerOpen, setDrawerOpen]  = useState(false);
  const { theme, toggleTheme }       = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { t }                        = useTranslation();

  const closeDrawer = () => setDrawerOpen(false);

  const NAV_LINKS = [
    { label: t('nav.home'),     to: '/' },
    { label: t('nav.movies'),   to: '/movies' },
    { label: t('nav.shows'),    to: '/shows' },
    { label: t('nav.upcoming'), to: '/upcoming' },
  ];

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar__logo" onClick={closeDrawer}>
          <span className="navbar__logo-c">C</span>ine Sphere
        </Link>

        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, to }) => (
            <li key={to}>
              <NavLink to={to} end={to === '/'}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          {/* Search icon */}
          <Link to="/search" className="navbar__search-btn" aria-label="Search">
            <SearchIcon />
          </Link>

          {/* Language switcher */}
          <div className="navbar__lang">
            <button className={language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button>
            <span className="navbar__lang-sep">|</span>
            <button className={language === 'ka' ? 'active' : ''} onClick={() => changeLanguage('ka')}>KA</button>
          </div>

          {/* Theme toggle */}
          <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Watchlist pill */}
          <Link to="/watchlist" className="navbar__join-btn" onClick={closeDrawer}>
            {t('nav.watchlist')}
          </Link>

          {/* Hamburger */}
          <button
            className={`navbar__burger${drawerOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={drawerOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${drawerOpen ? ' navbar__drawer--open' : ''}`}>
        {NAV_LINKS.map(({ label, to }) => (
          <NavLink key={to} to={to} end={to === '/'} onClick={closeDrawer}>{label}</NavLink>
        ))}
        <NavLink to="/search" onClick={closeDrawer}>{t('nav.search')}</NavLink>
        <div className="navbar__drawer-controls">
          <div className="navbar__lang">
            <button className={language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button>
            <span className="navbar__lang-sep">|</span>
            <button className={language === 'ka' ? 'active' : ''} onClick={() => changeLanguage('ka')}>KA</button>
          </div>
          <button className="navbar__theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <Link to="/watchlist" className="navbar__join-btn" onClick={closeDrawer}>
          {t('nav.watchlist')}
        </Link>
      </div>
    </>
  );
}

export default Navbar;
