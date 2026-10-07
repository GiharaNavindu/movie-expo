import React, { useState } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';

export const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: '6px 14px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 580,
        mx: 'auto',
        borderRadius: 1.5,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'border-color 0.15s ease',
        '&:focus-within': {
          borderColor: 'text.secondary',
        },
      }}
    >
      <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 20 }} />
      <InputBase
        sx={{
          flex: 1,
          fontSize: '0.95rem',
          color: 'text.primary',
        }}
        placeholder="Search films by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        inputProps={{ 'aria-label': 'search movies' }}
      />
      {searchTerm && (
        <IconButton size="small" onClick={handleClear} aria-label="clear" sx={{ color: 'text.secondary' }}>
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton
        type="submit"
        size="small"
        sx={{
          ml: 0.5,
          color: 'text.primary',
          bgcolor: 'action.hover',
          borderRadius: 1,
          p: 0.75,
        }}
        aria-label="submit search"
      >
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};
