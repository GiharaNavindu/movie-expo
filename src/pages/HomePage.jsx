import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { tmdbApi } from "../api/tmdb";
import { FilterBar } from "../components/FilterBar";
import { MovieGrid } from "../components/MovieGrid";
import { SearchBar } from "../components/SearchBar";
import { useMovies } from "../context/MovieContext";

export const HomePage = () => {
  const { lastSearch, setLastSearch } = useMovies();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState(lastSearch);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Filters (Bonus Features)
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // Fetch Genres List once on mount
  useEffect(() => {
    tmdbApi
      .getGenres()
      .then(setGenres)
      .catch((err) => console.error("Failed to fetch genres:", err));
  }, []);

  // Fetch Movies (Trending, Search, or Discovery)
  const fetchMovies = useCallback(
    async (pageToLoad = 1, append = false) => {
      try {
        if (pageToLoad === 1) setLoading(true);
        else setLoadingMore(true);
        setError(null);

        let data;
        const hasFilters = selectedGenre || selectedYear || selectedRating;

        if (query.trim()) {
          // Mode A: Search by query with optional filter matching
          data = await tmdbApi.searchMovies(query, pageToLoad);
          if (hasFilters && data?.results) {
            data.results = data.results.filter((movie) => {
              const matchGenre =
                !selectedGenre ||
                movie.genre_ids?.includes(Number(selectedGenre));
              const matchYear =
                !selectedYear ||
                movie.release_date?.startsWith(String(selectedYear));
              const matchRating =
                !selectedRating ||
                (movie.vote_average || 0) >= Number(selectedRating);
              return matchGenre && matchYear && matchRating;
            });
          }
        } else if (hasFilters) {
          // Mode B: Discover by filter criteria (Backend TMDb API)
          data = await tmdbApi.discoverMovies({
            genreId: selectedGenre,
            year: selectedYear,
            minRating: selectedRating,
            page: pageToLoad,
          });
        } else {
          // Mode C: Trending movies
          data = await tmdbApi.getTrending(pageToLoad);
        }

        if (append) {
          setMovies((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newItems = (data.results || []).filter(
              (m) => !existingIds.has(m.id),
            );
            return [...prev, ...newItems];
          });
        } else {
          setMovies(data.results || []);
        }

        setPage(data.page || 1);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error("API Error:", err);
        setError(
          "Failed to fetch movies from TMDb. Please verify your internet or API key.",
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [query, selectedGenre, selectedYear, selectedRating],
  );

  // Re-run whenever query or filters change
  useEffect(() => {
    fetchMovies(1, false);
  }, [fetchMovies]);

  // Handle Search Submission
  const handleSearch = (searchKeyword) => {
    setQuery(searchKeyword);
    setLastSearch(searchKeyword);
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
  };

  // Handle Load More Pagination
  const handleLoadMore = () => {
    if (page < totalPages && !loadingMore) {
      fetchMovies(page + 1, true);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Search Section */}
      <Box sx={{ textAlign: "center", mb: 4, pt: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1, letterSpacing: "-0.02em" }}>
          Explore Movies
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Search millions of titles, discover trending releases, and manage your watchlist.
        </Typography>
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </Box>

      {/* Filter Bar (Bonus) */}
      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        onResetFilters={handleResetFilters}
      />

      {/* Section Title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 2.5,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {query.trim()
            ? `Search results for "${query}"`
            : selectedGenre || selectedYear || selectedRating
              ? "Filtered Results"
              : "Trending This Week"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {movies.length} titles
        </Typography>
      </Box>

      {/* Error Alert Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Movie Grid */}
      <MovieGrid
        movies={movies}
        loading={loading}
        skeletonCount={10}
        emptyMessage={
          query.trim()
            ? `No films found for "${query}".`
            : "No films found matching your selected filters."
        }
        suggestions={genres.slice(0, 5)}
        onSelectSuggestion={(genreId) => {
          setSelectedGenre(genreId);
          setQuery("");
        }}
      />

      {/* Load More Button (Bonus Feature) */}
      {page < totalPages && (
        <Box sx={{ textAlign: "center", mt: 6, mb: 4 }}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={loadingMore || loading}
            onClick={handleLoadMore}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 1.5,
              borderColor: "divider",
              color: "text.primary",
              fontWeight: 500,
              fontSize: "0.875rem",
              "&:hover": { borderColor: "text.secondary", bgcolor: "action.hover" },
            }}
          >
            {loadingMore ? (
              <>
                <CircularProgress size={16} color="inherit" sx={{ mr: 1.5 }} />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </Box>
      )}
    </Container>
  );
};
