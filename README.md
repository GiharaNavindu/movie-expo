# Movie Explorer – Discover Your Favorite Films

A modern, responsive web application for discovering, exploring, and bookmarking movies. Built with **React 18**, **Material-UI (MUI)**, and powered in real-time by **The Movie Database (TMDb) API**.

Developed as part of the Frontend Engineering Assessment for **Loons Lab**, Colombo, Sri Lanka.

---

## Features

### 1. User Interface & Experience

- **Responsive Layout:** Mobile-first responsive grid adapting seamlessly from mobile phones (2 columns) to ultra-wide displays (5 columns).
- **Light & Dark Theme:** Full system/user switchable theme using MUI palette tokens with high-contrast text and clean borders.
- **Accessible & Clean Design:** Built with pure UI components, zero emojis, zero intrusive gradients, and clean SVG icons.

### 2. Search & Discovery

- **Debounced Live Search:** Real-time type-ahead search with 400ms debounce to optimize TMDb API rate limits.
- **Recent Search History:** Remembers the last 5 search queries in `localStorage` with quick-filter chips.
- **Genre & Category Filtering:** Quick toggle between Trending Weekly, Now Playing, Top Rated, and specific movie genres.
- **Infinite Scrolling:** Automatically loads subsequent pages of search results and trending films as the user scrolls.
- **Smart Empty States:** Friendly fallbacks with clickable category suggestions when no results match.

### 3. Movie Details View

- Comprehensive information: Original title, tagline, release year, runtime, and MPAA rating.
- Dynamic dual-tone backdrop banner with fallback image handling.
- Director credit extraction from TMDB crew data.
- Top-billed cast avatar cards with character names.
- Contextual official YouTube trailer launch button (with tooltip fallback if unavailable).
- Direct IMDb quick-link.
- "More Like This" similar movie recommendations shelf.

### 4. Watchlist (Local Storage)

- Add/remove films with one click.
- **Optimistic UI with Undo:** Reversible deletion via interactive MUI Snackbar.
- **Client-Side Sorting:** Sort watchlist by Recently Added, Highest Rated, Release Year, or Alphabetical (A–Z).
- Dynamic browser tab counter (`Watchlist (N) | Movie Explorer`).

### 5. Architectural Reliability

- **React Error Boundary:** Catches and isolates unexpected runtime render issues gracefully.
- **Network Offline Indicator:** Real-time listener warning the user if internet connectivity drops.
- **API Error Handling:** Axios interceptors and clear alert banners for rate limits or missing credentials.

---

## Tech Stack

- **Framework:** React 18
- **UI Components & Icons:** Material-UI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **Routing:** React Router v6
- **State Management:** React Context API (`MovieContext`, `ThemeContext`, `AuthContext`)
- **HTTP Client:** Axios
- **Data Source:** [The Movie Database (TMDb) API v3](https://developers.themoviedb.org/3)

---

## Getting Started Locally

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd movie-explorer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

### 4. Run the development server

```bash
npm start
```

The application will open at `http://localhost:3000`.

---
