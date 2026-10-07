import { FilterAltOff as ClearFiltersIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

export const FilterBar = ({
  genres = [],
  selectedGenre,
  onGenreChange,
  selectedYear,
  onYearChange,
  selectedRating,
  onRatingChange,
  onResetFilters,
}) => {
  const isFiltered = selectedGenre || selectedYear || selectedRating;

  return (
    <Box
      sx={{
        p: 2,
        mb: 4,
        bgcolor: "background.paper",
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        {/* Genre Selector */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            label="Genre"
            onChange={(e) => onGenreChange(e.target.value)}
          >
            <MenuItem value="">All Genres</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g.id} value={g.id}>
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Release Year Selector */}
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => onYearChange(e.target.value)}
          >
            <MenuItem value="">All Years</MenuItem>
            {YEARS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Minimum Rating Selector */}
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={selectedRating}
            label="Rating"
            onChange={(e) => onRatingChange(e.target.value)}
          >
            <MenuItem value="">Any Rating</MenuItem>
            <MenuItem value="8">8.0+ Stars</MenuItem>
            <MenuItem value="7">7.0+ Stars</MenuItem>
            <MenuItem value="6">6.0+ Stars</MenuItem>
            <MenuItem value="5">5.0+ Stars</MenuItem>
          </Select>
        </FormControl>

        {/* Reset Filter Button */}
        {isFiltered && (
          <Button
            variant="text"
            size="small"
            color="inherit"
            startIcon={<ClearFiltersIcon fontSize="small" />}
            onClick={onResetFilters}
            sx={{
              color: "text.secondary",
              fontSize: "0.85rem",
              alignSelf: { xs: "flex-start", sm: "center" },
              "&:hover": { color: "text.primary" },
            }}
          >
            Reset Filters
          </Button>
        )}
      </Stack>
    </Box>
  );
};
