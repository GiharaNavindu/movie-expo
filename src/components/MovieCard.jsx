import { Favorite, FavoriteBorder, Star } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPosterUrl } from "../api/tmdb";
import { useMovies } from "../context/MovieContext";

export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovies();

  const favoriteActive = isFavorite(movie.id);
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";
  const ratingOutOfFive = (movie.vote_average || 0) / 2;

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Card
      onClick={handleCardClick}
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        bgcolor: "background.paper",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        transition: "border-color 0.15s ease, transform 0.15s ease",
        "&:hover": {
          borderColor: "text.secondary",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Favorite Floating Button */}
      <IconButton
        onClick={handleFavoriteClick}
        size="small"
        aria-label="add to favorites"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: favoriteActive ? "primary.main" : "#ffffff",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.8)",
          },
          zIndex: 2,
        }}
      >
        {favoriteActive ? (
          <Favorite fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </IconButton>

      {/* Poster Image with strict 2:3 cinema aspect ratio */}
      <CardMedia
        component="img"
        image={getPosterUrl(movie.poster_path)}
        alt={movie.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://placehold.co/500x750?text=No+Poster";
        }}
        sx={{
          width: "100%",
          aspectRatio: "2/3",
          objectFit: "cover",
          display: "block",
          bgcolor: "action.hover",
        }}
      />

      {/* Details Body */}
      <CardContent sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.75,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500, fontSize: "0.8rem" }}
          >
            {releaseYear}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Star sx={{ fontSize: 15, color: "#f59e0b" }} />
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, fontSize: "0.8rem", color: "text.primary" }}
            >
              {movie.vote_average?.toFixed(1) || "0.0"}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="subtitle2"
          component="h3"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.3,
            minHeight: "2.6em",
            color: "text.primary",
          }}
        >
          {movie.title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: "auto", pt: 1 }}>
          <Rating
            value={ratingOutOfFive}
            precision={0.5}
            size="small"
            readOnly
            sx={{ fontSize: "0.95rem" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
