import {
  Brightness4,
  Brightness7,
  Favorite as FavoriteIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Movie as MovieIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMovies } from "../context/MovieContext";
import { useAppTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useAppTheme();
  const { favorites } = useMovies();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{ backdropFilter: "blur(8px)" }}
    >
      <Toolbar>
        {/* App Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mr: 3,
          }}
          onClick={() => navigate("/")}
        >
          <MovieIcon sx={{ color: "#e50914", fontSize: 32, mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              background: "linear-gradient(45deg, #e50914, #ff5722)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            MovieExplorer
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
          <Button
            color={location.pathname === "/" ? "primary" : "inherit"}
            onClick={() => navigate("/")}
            sx={{ fontWeight: location.pathname === "/" ? 700 : 500 }}
          >
            Home
          </Button>

          <Button
            color={location.pathname === "/favorites" ? "primary" : "inherit"}
            onClick={() => navigate("/favorites")}
            startIcon={
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon
                  sx={{ color: favorites.length ? "#e50914" : "inherit" }}
                />
              </Badge>
            }
          >
            Favorites
          </Button>
        </Box>

        {/* Action Controls: Theme Toggle & User Auth */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={`Switch to ${mode === "light" ? "Dark" : "Light"} Mode`}
          >
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "dark" ? (
                <Brightness7 sx={{ color: "#facc15" }} />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: 1 }}
            >
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Hi, <strong>{user.username}</strong>
              </Typography>
              <Tooltip title="Log Out">
                <IconButton color="inherit" onClick={logout}>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<LoginIcon />}
              onClick={() => navigate("/login")}
              sx={{ ml: 1 }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
