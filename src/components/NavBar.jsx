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
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
        {/* App Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            mr: 4,
          }}
          onClick={() => navigate("/")}
        >
          <MovieIcon sx={{ color: "primary.main", fontSize: 26, mr: 1 }} />
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              color: "text.primary",
            }}
          >
            Movie Explorer
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
          <Button
            onClick={() => navigate("/")}
            sx={{
              fontWeight: location.pathname === "/" ? 600 : 500,
              color:
                location.pathname === "/" ? "text.primary" : "text.secondary",
              bgcolor:
                location.pathname === "/" ? "action.hover" : "transparent",
              px: 1.5,
              py: 0.75,
              fontSize: "0.875rem",
            }}
          >
            Discover
          </Button>

          <Button
            onClick={() => navigate("/favorites")}
            startIcon={
              <Badge
                badgeContent={favorites.length}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.7rem",
                    height: 16,
                    minWidth: 16,
                  },
                }}
              >
                <FavoriteIcon
                  fontSize="small"
                  sx={{
                    color: favorites.length ? "primary.main" : "text.secondary",
                  }}
                />
              </Badge>
            }
            sx={{
              fontWeight: location.pathname === "/favorites" ? 600 : 500,
              color:
                location.pathname === "/favorites"
                  ? "text.primary"
                  : "text.secondary",
              bgcolor:
                location.pathname === "/favorites"
                  ? "action.hover"
                  : "transparent",
              px: 1.5,
              py: 0.75,
              fontSize: "0.875rem",
            }}
          >
            Watchlist
          </Button>
        </Box>

        {/* Action Controls: Theme Toggle & User Auth */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={`Switch to ${mode === "light" ? "Dark" : "Light"} mode`}
          >
            <IconButton onClick={toggleTheme} size="small" color="inherit">
              {mode === "dark" ? (
                <Brightness7 fontSize="small" />
              ) : (
                <Brightness4 fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {isAuthenticated ? (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: 1 }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {user.username}
              </Typography>
              <Tooltip title="Log out">
                <IconButton color="inherit" size="small" onClick={logout}>
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<LoginIcon fontSize="small" />}
              onClick={() => navigate("/login")}
              sx={{
                ml: 1,
                borderColor: "divider",
                color: "text.primary",
                "&:hover": { borderColor: "text.secondary" },
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
