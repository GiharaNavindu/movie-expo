import { Box, Skeleton, Typography } from "@mui/material";
import { MovieCard } from "./MovieCard";

export const MovieGrid = ({
  movies,
  loading = false,
  skeletonCount = 10,
  emptyMessage = "No films found matching your search or filters.",
  suggestions = [],
  onSelectSuggestion,
}) => {
  if (loading && (!movies || movies.length === 0)) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
        }}
      >
        {Array.from(new Array(skeletonCount)).map((_, idx) => (
          <Box key={idx} sx={{ width: "100%" }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: "100%",
                aspectRatio: "2/3",
                borderRadius: 1.5,
              }}
            />
            <Skeleton variant="text" sx={{ mt: 1, fontSize: "0.9rem" }} />
            <Skeleton variant="text" width="50%" sx={{ fontSize: "0.8rem" }} />
          </Box>
        ))}
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: suggestions.length ? 2 : 0 }}>
          {emptyMessage}
        </Typography>
        {suggestions.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, flexWrap: "wrap", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Try exploring:
            </Typography>
            {suggestions.map((s) => (
              <Box
                key={s.id || s.name}
                component="span"
                onClick={() => onSelectSuggestion && onSelectSuggestion(s.id)}
                sx={{
                  display: "inline-block",
                  px: 1.2,
                  py: 0.4,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.primary",
                  bgcolor: "background.paper",
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                  "&:hover": { borderColor: "text.secondary", bgcolor: "action.hover" },
                }}
              >
                {s.name}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        },
        gap: 3,
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
};
