import {
  Clear as ClearIcon,
  History as HistoryIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useMovies } from "../context/MovieContext";
import { useDebounce } from "../hooks/useDebounce";

export const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const debouncedTerm = useDebounce(searchTerm, 400);
  const isFirstRender = useRef(true);

  const { recentSearches, addRecentSearch, removeRecentSearch } = useMovies();

  // Keep local search term synchronized if parent changes it
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Debounced live type-ahead search
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only trigger live search if term changed
    onSearch(debouncedTerm);
    if (debouncedTerm.trim().length >= 2) {
      addRecentSearch(debouncedTerm.trim());
    }
  }, [debouncedTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = searchTerm.trim();
    onSearch(clean);
    if (clean) {
      addRecentSearch(clean);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleSelectRecent = (term) => {
    setSearchTerm(term);
    onSearch(term);
    addRecentSearch(term);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 580, mx: "auto" }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: "6px 14px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 1.5,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          transition: "border-color 0.15s ease",
          "&:focus-within": {
            borderColor: "text.secondary",
          },
        }}
      >
        <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
        <InputBase
          sx={{
            flex: 1,
            fontSize: "0.95rem",
            color: "text.primary",
          }}
          placeholder="Search films by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          inputProps={{ "aria-label": "search movies" }}
        />
        {searchTerm && (
          <IconButton
            size="small"
            onClick={handleClear}
            aria-label="clear"
            sx={{ color: "text.secondary" }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton
          type="submit"
          size="small"
          sx={{
            ml: 0.5,
            color: "text.primary",
            bgcolor: "action.hover",
            borderRadius: 1,
            p: 0.75,
          }}
          aria-label="submit search"
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Paper>

      {/* Recent Searches Chips */}
      {recentSearches && recentSearches.length > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mt: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <HistoryIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Recent:
            </Typography>
          </Box>
          {recentSearches.map((term) => (
            <Chip
              key={term}
              label={term}
              size="small"
              variant="outlined"
              onClick={() => handleSelectRecent(term)}
              onDelete={() => removeRecentSearch(term)}
              sx={{
                fontSize: "0.75rem",
                borderColor: "divider",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "text.secondary",
                  bgcolor: "action.hover",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
