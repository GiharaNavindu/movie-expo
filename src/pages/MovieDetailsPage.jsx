import {
  ArrowBack as BackIcon,
  Favorite,
  FavoriteBorder,
  PlayArrow as PlayIcon,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBackdropUrl, getPosterUrl, tmdbApi } from "../api/tmdb";
import { TrailerModal } from "../components/TrailerModal";
import { useMovies } from "../context/MovieContext";

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tmdbApi.getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      console.error("Error fetching details:", err);
      const msg =
        err?.message?.includes("Network Error") || !navigator.onLine
          ? "Network connection issue reaching TMDb API. Please check your internet/DNS and try again."
          : "Failed to load movie details. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
  }, [fetchDetails]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 15 }}>
        <CircularProgress size={50} color="primary" />
      </Box>
    );
  }

  if (error || !movie) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || "Movie not found"}
        </Alert>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={fetchDetails}>
            Retry
          </Button>
          <Button
            variant="outlined"
            startIcon={<BackIcon />}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  const favoriteActive = isFavorite(movie.id);
  const backdrop = getBackdropUrl(movie.backdrop_path);

  // Extract YouTube trailer from videos payload
  const trailer = movie.videos?.results?.find(
    (vid) =>
      vid.site === "YouTube" &&
      (vid.type === "Trailer" || vid.type === "Teaser"),
  );

  const cast = movie.credits?.cast?.slice(0, 8) || [];

  return (
    <Box>
      {/* Backdrop Hero Banner (Rendered only when backdrop is available) */}
      {backdrop && (
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 200, sm: 260, md: 340 },
            backgroundImage: (theme) =>
              theme.palette.mode === "dark"
                ? `linear-gradient(to bottom, rgba(12, 13, 18, 0.15) 0%, rgba(12, 13, 18, 0.6) 45%, #0c0d12 100%), url(${backdrop})`
                : `linear-gradient(to bottom, rgba(241, 245, 249, 0.1) 0%, rgba(241, 245, 249, 0.65) 45%, #f1f5f9 100%), url(${backdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            display: "flex",
            alignItems: "flex-end",
            p: { xs: 2, md: 4 },
          }}
        >
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "text.primary",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            Back
          </Button>
        </Box>
      )}

      {/* Main Content Details */}
      <Container
        maxWidth="xl"
        sx={{
          mt: backdrop ? { xs: -6, md: -10 } : 0,
          pt: backdrop ? 0 : 4,
          position: "relative",
          zIndex: 2,
          pb: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 5 },
            alignItems: "flex-start",
          }}
        >
          {/* Poster Column (Left) */}
          <Box
            sx={{
              width: { xs: "100%", sm: 260, md: 280, lg: 300 },
              maxWidth: { xs: 300, md: "none" },
              mx: { xs: "auto", md: 0 },
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={getPosterUrl(movie.poster_path)}
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://placehold.co/500x750?text=No+Poster";
              }}
              sx={{
                width: "100%",
                aspectRatio: "2/3",
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: 2,
                display: "block",
              }}
            />
          </Box>

          {/* Details Column (Right - Expands to fill full remaining width) */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              pt: backdrop ? { xs: 0, md: 2 } : 0,
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 1, flexWrap: "wrap" }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "text.primary",
                }}
              >
                {movie.title}
              </Typography>
              {movie.release_date && (
                <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 400 }}>
                  ({movie.release_date.split("-")[0]})
                </Typography>
              )}
            </Box>

            {/* Tagline */}
            {movie.tagline && (
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontStyle: "italic", mb: 2, fontSize: "0.95rem" }}
              >
                "{movie.tagline}"
              </Typography>
            )}

            {/* Rating & Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                mb: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {movie.vote_average.toFixed(1)} / 10
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({movie.vote_count.toLocaleString()} votes)
                </Typography>
              </Box>

              <Divider orientation="vertical" flexItem />

              <Typography variant="body2" color="text.secondary">
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </Typography>

              <Divider orientation="vertical" flexItem />

              {/* Action Buttons */}
              <Button
                variant={favoriteActive ? "contained" : "outlined"}
                color={favoriteActive ? "primary" : "inherit"}
                size="small"
                startIcon={favoriteActive ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
                onClick={() => toggleFavorite(movie)}
                sx={{
                  borderColor: "divider",
                  "&:hover": { borderColor: "text.secondary" },
                }}
              >
                {favoriteActive ? "In Watchlist" : "Add to Watchlist"}
              </Button>

              {trailer && (
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<PlayIcon fontSize="small" />}
                  onClick={() => setTrailerOpen(true)}
                >
                  Watch Trailer
                </Button>
              )}
            </Box>

            {/* Genres Chips */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    borderColor: "divider",
                    color: "text.secondary",
                  }}
                />
              ))}
            </Box>

            {/* Overview Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Overview
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ lineHeight: 1.7, mb: 4, maxWidth: "80ch" }}
            >
              {movie.overview || "No description available for this film."}
            </Typography>

            {/* Top Cast Section */}
            {cast.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Top Billed Cast
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      sm: "repeat(3, 1fr)",
                      md: "repeat(4, 1fr)",
                    },
                    gap: 2,
                  }}
                >
                  {cast.map((person) => (
                    <Box
                      key={person.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        minWidth: 0,
                      }}
                    >
                      <Avatar
                        src={getPosterUrl(person.profile_path, "w185")}
                        alt={person.name}
                        sx={{ width: 40, height: 40, borderRadius: 1 }}
                      />
                      <Box sx={{ overflow: "hidden", minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontSize: "0.85rem",
                          }}
                        >
                          {person.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                          }}
                        >
                          {person.character}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Container>

      {/* Trailer Modal (Bonus) */}
      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        videoKey={trailer?.key}
        title={movie.title}
      />
    </Box>
  );
};
