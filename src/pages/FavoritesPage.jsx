import React, { useState, useMemo, useEffect } from "react";
import { Movie as MovieIcon, Sort as SortIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MovieGrid } from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites } = useMovies();
  const [sortBy, setSortBy] = useState("recent");

  // Dynamic document title with counter
  useEffect(() => {
    const originalTitle = document.title;
    document.title = favorites.length
      ? `Watchlist (${favorites.length}) | Movie Explorer`
      : "Watchlist | Movie Explorer";

    return () => {
      document.title = originalTitle || "Movie Explorer – Discover Your Favorite Films";
    };
  }, [favorites.length]);

  // Client-side sorting
  const sortedFavorites = useMemo(() => {
    const list = [...favorites];
    switch (sortBy) {
      case "rating":
        return list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case "year":
        return list.sort((a, b) => {
          const yearA = a.release_date ? parseInt(a.release_date.substring(0, 4), 10) : 0;
          const yearB = b.release_date ? parseInt(b.release_date.substring(0, 4), 10) : 0;
          return yearB - yearA;
        });
      case "title":
        return list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      case "recent":
      default:
        return list;
    }
  }, [favorites, sortBy]);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            My Watchlist
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favorites.length} {favorites.length === 1 ? "title" : "titles"} saved to your library
          </Typography>
        </Box>

        {favorites.length > 0 && (
          <FormControl size="small" sx={{ minWidth: 190 }}>
            <InputLabel id="watchlist-sort-label">Sort By</InputLabel>
            <Select
              labelId="watchlist-sort-label"
              id="watchlist-sort-select"
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
              startAdornment={
                <SortIcon sx={{ fontSize: 18, mr: 1, color: "text.secondary" }} />
              }
              sx={{ borderRadius: 1.5 }}
            >
              <MenuItem value="recent">Recently Added</MenuItem>
              <MenuItem value="rating">Highest Rated</MenuItem>
              <MenuItem value="year">Release Year (Newest)</MenuItem>
              <MenuItem value="title">Alphabetical (A–Z)</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 12,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <MovieIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Your watchlist is empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Explore films and bookmark your favorites to watch them later.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ px: 3, textTransform: "none", fontWeight: 600 }}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <MovieGrid movies={sortedFavorites} />
      )}
    </Container>
  );
};
