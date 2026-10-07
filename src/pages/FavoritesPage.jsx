import { Movie as MovieIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MovieGrid } from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favorites } = useMovies();

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <div>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: "-0.02em" }}>
            My Watchlist
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favorites.length} {favorites.length === 1 ? "title" : "titles"} saved to local storage
          </Typography>
        </div>
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
            Explore films and click the bookmark button to save them here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ px: 3 }}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Container>
  );
};
