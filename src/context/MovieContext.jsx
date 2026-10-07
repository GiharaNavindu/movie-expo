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

  useEffect(() => {
    localStorage.setItem("movie_explorer_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("movie_explorer_last_search", lastSearch);
  }, [lastSearch]);

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
    } else {
      addFavorite(movie);
    }
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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
