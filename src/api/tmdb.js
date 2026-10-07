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
  timeout: 12000,
  params: {
    api_key: API_KEY,
  },
});

export const tmdbApi = {
  // Fetch weekly trending movies
  getTrending: async (page = 1) => {
    const response = await apiClient.get('/trending/movie/week', {
      params: { page },
    });
    return response.data;
  },

  // Search movies by keyword
  searchMovies: async (query, page = 1) => {
    const response = await apiClient.get('/search/movie', {
      params: { query, page, include_adult: false },
    });
    return response.data;
  },

  // Fetching movie details with credits & videos
  getMovieDetails: async (movieId) => {
    try {
      const response = await apiClient.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos',
        },
      });
      return response.data;
    } catch (err) {
      console.warn('Full movie details query failed, falling back to base movie details:', err);
      // Fallback: If append_to_response failed due to payload size/timeout, fetch standard movie details
      const fallbackResponse = await apiClient.get(`/movie/${movieId}`);
      return fallbackResponse.data;
    }
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
    if (minRating) {
      params['vote_average.gte'] = minRating;
      params['vote_count.gte'] = 50; // Filter out obscure titles with only 1-2 votes
    }

    const response = await apiClient.get('/discover/movie', { params });
    return response.data;
  },

  // Fetching similar movies
  getSimilarMovies: async (movieId) => {
    try {
      const response = await apiClient.get(`/movie/${movieId}/similar`, {
        params: { page: 1 },
      });
      return response.data?.results?.slice(0, 5) || [];
    } catch (err) {
      console.warn('Failed to fetch similar movies:', err);
      return [];
    }
  },
};