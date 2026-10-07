import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;
export const IMAGE_BASE = process.env.REACT_APP_TMDB_IMAGE_BASE || 'https://image.tmdb.org/t/p';

export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : 'https://placehold.co/500x750?text=No+Poster';

export const getBackdropUrl = (path, size = 'original') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbApi = {
  //  Fetch weekly trending movies
  getTrending: async (page = 1) => {
    const response = await apiClient.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  },

  //  Search movies by keyword
  searchMovies: async (query, page = 1) => {
    const response = await apiClient.get('/search/movie', {
      params: { query, page, include_adult: false },
    });
    return response.data;
  },

  // Fetching movie details
  getMovieDetails: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,recommendations',
      },
    });
    return response.data;
  },

  // Fetching all movie genres
  getGenres: async () => {
    const response = await apiClient.get('/genre/movie/list');
    return response.data.genres;
  },

  // Discovering movies by filters
  discoverMovies: async ({ genreId, year, minRating, page = 1 }) => {
    const params = {
      page,
      sort_by: 'popularity.desc',
      include_adult: false,
    };
    if (genreId) params.with_genres = genreId;
    if (year) params.primary_release_year = year;
    if (minRating) params['vote_average.gte'] = minRating;

    const response = await apiClient.get('/discover/movie', { params });
    return response.data;
  },
};