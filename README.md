# CineSphere 🎬

A movie & TV streaming-style web app built with React. Browse trending movies, watch trailers, manage a personal watchlist, and search titles — all powered by live data from The Movie Database (TMDB).

## Live Demo

> Add your Netlify URL here after deployment

## Features

- **Home page** — Hero carousel (auto-advances every 6 s) + 4 scrollable rows (Trending, Now Playing, Popular, Top Rated)
- **Detail page** — Full backdrop, synopsis, cast, similar movies, trailer modal
- **Search** — Debounced live search with recent searches stored in `sessionStorage`
- **Watchlist** — Add / remove movies, persisted in `localStorage`
- **Trailer modal** — YouTube embed via Framer Motion animated overlay
- **Theme toggle** — Dark / Light, persisted in `localStorage`
- **Language toggle** — English / Georgian (i18n via react-i18next), persisted in `localStorage`
- **Responsive** — Works from 320 px to 4 K (SCSS breakpoint mixins)
- **Page transitions** — Framer Motion fade + slide between routes

## Tech Stack

| Tool | Purpose |
|---|---|
| Vite + React | Build tool & UI framework |
| React Router v6 | Client-side routing (`/`, `/movie/:id`, `/search`, `/watchlist`) |
| Axios | API client — single configured instance in `src/api/axiosClient.js` |
| TMDB API | Live movie data |
| SCSS | Variables, mixins, BEM naming, light-theme partial |
| Context API | Global state — Theme, Watchlist, Language |
| react-i18next | EN / KA (Georgian) translations |
| Framer Motion | Modal animations, page transitions |
| localStorage | Watchlist, theme preference, language preference |
| sessionStorage | Recent search terms |

## Getting Started

### 1. Get a free TMDB API key

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to **Settings → API** and request a key (choose "Developer")
3. Copy the **API Key (v3 auth)**

### 2. Add the key to `.env`

Create a `.env` file in the project root (it is git-ignored):

```
VITE_TMDB_KEY=your_api_key_here
```

### 3. Install & run

```bash
npm install
npm run dev
# open http://localhost:5173
```

## Project Structure

```
src/
├── api/           # Axios client + all TMDB functions
├── components/    # Navbar, Hero, Row, MovieCard, Modal, TrailerModal, Footer, Layout
├── context/       # ThemeContext, WatchlistContext, LanguageContext
├── hooks/         # useFetch, useLocalStorage
├── locales/       # en.json, ka.json
├── pages/         # Home, Detail, Search, Watchlist, NotFound
├── styles/        # _variables.scss, _mixins.scss, _light-theme.scss, main.scss
└── utils/         # genres.js (TMDB genre ID → name map)
```

## Deployment (Netlify)

The repo includes `netlify.toml` which handles SPA routing automatically.

**Option A — Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Option B — GitHub + Netlify Dashboard**
1. Push this repo to GitHub
2. Log in to [netlify.com](https://www.netlify.com/) → **Add new site → Import from Git**
3. Select the repo — build settings are read from `netlify.toml` automatically
4. Add environment variable `VITE_TMDB_KEY` in **Site settings → Environment variables**
5. Click **Deploy site**

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |

---

© 2024 CineSphere Movies
