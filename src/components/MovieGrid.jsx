import { Box, Skeleton, Typography } from "@mui/material";
import { MovieCard } from "./MovieCard";

export const MovieGrid = ({ movies, loading = false, skeletonCount = 10 }) => {
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
        <Typography variant="body1" color="text.secondary">
          No films found matching your search or filters.
        </Typography>
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
