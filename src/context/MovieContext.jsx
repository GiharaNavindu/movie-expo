import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  // Saved Favorites persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movie_explorer_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Last searched movie query persisted in localStorage
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem("movie_explorer_last_search") || "";
  });

  // Recent Search History list (capped at 5)
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem("movie_explorer_recent_searches");
    return saved ? JSON.parse(saved) : [];
  });

  // Snackbar notification with Undo action
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    movie: null,
    action: "add",
  });

  useEffect(() => {
    localStorage.setItem("movie_explorer_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("movie_explorer_last_search", lastSearch);
  }, [lastSearch]);

  useEffect(() => {
    localStorage.setItem(
      "movie_explorer_recent_searches",
      JSON.stringify(recentSearches),
    );
  }, [recentSearches]);

  const addRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    const clean = term.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 5);
    });
    setLastSearch(clean);
  };

  const removeRecentSearch = (term) => {
    setRecentSearches((prev) => prev.filter((item) => item !== term));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (!prev.some((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
      setSnackbar({
        open: true,
        message: `Removed "${movie.title}" from watchlist`,
        movie,
        action: "remove",
      });
    } else {
      addFavorite(movie);
      setSnackbar({
        open: true,
        message: `Added "${movie.title}" to watchlist`,
        movie,
        action: "add",
      });
    }
  };

  const undoSnackbar = () => {
    if (!snackbar.movie) return;
    if (snackbar.action === "add") {
      removeFavorite(snackbar.movie.id);
    } else {
      addFavorite(snackbar.movie);
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        lastSearch,
        setLastSearch,
        recentSearches,
        addRecentSearch,
        removeRecentSearch,
        clearRecentSearches,
        snackbar,
        undoSnackbar,
        closeSnackbar,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
