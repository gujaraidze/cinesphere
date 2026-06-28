# CineSphere — Project Plan & Handoff

> This file is the single source of truth for the project. If you are Claude Code
> reading this for the first time, read it fully, then continue from the
> **Build Roadmap** section. Ask the user which step to start on.

## What we're building

A movie/TV streaming-style web app ("CineSphere") for a React final project,
based on a chosen Figma design (the purple "CineSphere" OTT design). It pulls
live data from **TMDB (The Movie Database)** and layers a personal **watchlist**
on top so it behaves like a real tool, not just an API viewer.

## Course requirements (must-have)

- React with **functional components only** (Hooks throughout)
- Minimum **3 pages**
- **React Router** for navigation
- **API integration** (Axios) — using TMDB
- **Storage** interaction — both localStorage AND sessionStorage
- **Responsive** down to every device in Chrome devtools
- **Animations / modals**
- Clean **project structure**: folder layout, file names, variable names

## Bonuses we're targeting

- **SCSS** (CSS preprocessor)
- Extra React functionality (custom hooks, Context)
- **Dark / Light theme**
- **Multilingual** (Georgian + English via react-i18next)
- Good **README** (tools used, run instructions, screenshots)
- TypeScript — OPTIONAL, only if time allows (ship in JS first)

## Tech stack and why

| Tool | Purpose |
|------|---------|
| Vite + React | Fast scaffold + dev server |
| React Router | Required navigation, dynamic routes (`/movie/:id`) |
| Axios | Required API client; centralized in one configured instance |
| SCSS | Bonus preprocessor; variables + mixins for breakpoints |
| Context API | Theme, watchlist, and language global state (no Redux needed) |
| react-i18next | Georgian / English toggle (bonus) |
| Framer Motion | Animations + modal requirement |
| localStorage | Watchlist, theme, language (persist across sessions) |
| sessionStorage | Recent searches (clears with tab) |

## Folder structure

```
cinesphere/
├── public/
├── src/
│   ├── api/
│   │   ├── axiosClient.js     # one configured axios (base URL + key)
│   │   └── tmdb.js            # getTrending(), getMovie(id), search()...
│   ├── assets/
│   ├── components/            # reusable, prop-driven UI (no routing/data)
│   │   ├── Navbar/
│   │   ├── Hero/
│   │   ├── Row/
│   │   ├── MovieCard/
│   │   └── Modal/
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── WatchlistContext.jsx
│   │   └── LanguageContext.jsx
│   ├── hooks/
│   │   ├── useFetch.js
│   │   └── useLocalStorage.js
│   ├── locales/
│   │   ├── en.json
│   │   └── ka.json
│   ├── pages/                # route-level screens, fetch data + compose components
│   │   ├── Home/
│   │   ├── Detail/
│   │   ├── Watchlist/
│   │   ├── Search/
│   │   └── NotFound/
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── main.scss
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env                      # VITE_TMDB_KEY=...  (never commit)
├── .gitignore
├── README.md
└── package.json
```

**Key principle:** `components/` = reusable dumb UI (takes props); `pages/` =
route-level, fetches data and composes components. `api/` isolates all TMDB
knowledge in one place.

## TMDB data mapping

- Home rows → `trending`, `popular`, `top_rated`, `now_playing`
- Detail page → `movie/{id}` + `movie/{id}/credits` + `movie/{id}/similar`
- Search → `search/movie`
- Trailer (in modal) → `movie/{id}/videos`
- Images → prefix path with `https://image.tmdb.org/t/p/w500`

Needs a free TMDB API key (themoviedb.org → Settings → API).
Store as `VITE_TMDB_KEY` in `.env`. Access in code via `import.meta.env.VITE_TMDB_KEY`.

## Build Roadmap (do in this order)

1. **Scaffold & setup** — `npm create vite@latest`, install deps, TMDB key, `.env`, folder skeleton.
2. **API layer** — axios client + TMDB functions; verify with a console log.
3. **Routing & layout** — React Router, Navbar, empty page shells.
4. **Core components** — MovieCard, Row, Hero.
5. **Home page** — wire rows to TMDB.
6. **Detail page** — dynamic `/movie/:id`: details, cast, similar.
7. **Watchlist** — WatchlistContext + localStorage (the "it's a tool" feature).
8. **Search** — recent searches in sessionStorage.
9. **Modal & animations** — Framer Motion (quick-view modal, transitions).
10. **Theme toggle** — Dark / Light via ThemeContext.
11. **i18n** — Georgian / English.
12. **Responsive pass** — breakpoint mixins for all devtools sizes.
13. **Polish, README, deploy** — screenshots, push to GitHub, host on Netlify.

## Submission (required to be graded)

Two links:
1. GitHub repo with source code (+ good README for bonus)
2. Live hosted site (Netlify / GitHub Pages / etc.)

## Dependencies to install

```bash
npm install react-router-dom axios framer-motion i18next react-i18next
npm install -D sass
```

## Current status

Planning complete. Next action: **Step 1 — scaffold & setup.**
User needs a free TMDB API key before Step 2.
