'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Movie, FilterOptions, SortOption } from '../types/movie';
import { fetchMoviesFromSheet, getGenres, getPlatforms, getYears } from '../lib/googleSheets';

const ADDED_KEY = 'cinema-liste-added';
const REMOVED_KEY = 'cinema-liste-removed';
const VIEWED_KEY = 'cinema-liste-viewed';

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<SortOption>('dateAdded');
  const [showOnlyUnviewed, setShowOnlyUnviewed] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchMoviesFromSheet();
      const removedIds: string[] = loadFromStorage(REMOVED_KEY, []);
      const viewedIds: string[] = loadFromStorage(VIEWED_KEY, []);
      const added: Movie[] = loadFromStorage(ADDED_KEY, []);

      // Clean up old removed list (no longer used)
      if (removedIds.length > 0) {
        localStorage.removeItem(REMOVED_KEY);
      }

      const all = [...data, ...added].map(m => ({
        ...m,
        viewed: viewedIds.includes(m.id) ? true : m.viewed,
      }));
      setMovies(all);
    } catch (err) {
      setError('Erreur lors du chargement des films');
    } finally {
      setLoading(false);
    }
  };

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newMovie: Movie = { ...movie, id: `custom-${Date.now()}` };
    const added: Movie[] = loadFromStorage(ADDED_KEY, []);
    added.push(newMovie);
    localStorage.setItem(ADDED_KEY, JSON.stringify(added));
    setMovies(prev => [...prev, newMovie]);
  };

  const markAsViewed = (movieId: string) => {
    const viewedIds: string[] = loadFromStorage(VIEWED_KEY, []);
    if (!viewedIds.includes(movieId)) {
      viewedIds.push(movieId);
      localStorage.setItem(VIEWED_KEY, JSON.stringify(viewedIds));
    }
    setMovies(prev => prev.map(m => m.id === movieId ? { ...m, viewed: true } : m));
  };

  const removeMovie = (movieId: string) => {
    if (movieId.startsWith('custom-')) {
      const added: Movie[] = loadFromStorage(ADDED_KEY, []);
      localStorage.setItem(ADDED_KEY, JSON.stringify(added.filter(m => m.id !== movieId)));
    } else {
      const removedIds: string[] = loadFromStorage(REMOVED_KEY, []);
      removedIds.push(movieId);
      localStorage.setItem(REMOVED_KEY, JSON.stringify(removedIds));
    }
    setMovies(prev => prev.filter(m => m.id !== movieId));
  };

  // Viewed movies
  const viewedMovies = useMemo(() => {
    return movies.filter(m => !m.isCategory && m.viewed);
  }, [movies]);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let result = movies.filter(m => !m.isCategory && !m.viewed);

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        m =>
          m.title.toLowerCase().includes(query) ||
          m.director?.toLowerCase().includes(query) ||
          m.synopsis?.toLowerCase().includes(query)
      );
    }

    // Genre filter
    if (selectedGenre) {
      result = result.filter(m => m.genre === selectedGenre);
    }

    // Platform filter
    if (selectedPlatform) {
      result = result.filter(m => m.platform === selectedPlatform);
    }

    // Year filter
    if (selectedYear) {
      result = result.filter(m => m.year === selectedYear);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'dateAdded':
          return new Date(b.dateAdded || 0).getTime() - new Date(a.dateAdded || 0).getTime();
        case 'random':
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

    return result;
  }, [movies, searchQuery, selectedGenre, selectedPlatform, selectedYear, sortBy]);

  // Get random movie
  const getRandomMovie = useCallback(() => {
    if (filteredMovies.length === 0) return null;
    return filteredMovies[Math.floor(Math.random() * filteredMovies.length)];
  }, [filteredMovies]);

  // Available filter options
  const genres = useMemo(() => getGenres(movies), [movies]);
  const platforms = useMemo(() => getPlatforms(movies), [movies]);
  const years = useMemo(() => getYears(movies), [movies]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedPlatform('');
    setSelectedYear('');
    setShowOnlyUnviewed(true);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedGenre ||
    selectedPlatform ||
    selectedYear ||
    !showOnlyUnviewed
  );

  return {
    movies: filteredMovies,
    allMovies: movies,
    loading,
    error,
    refresh: loadMovies,
    
    // Filters
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    selectedPlatform,
    setSelectedPlatform,
    selectedYear,
    setSelectedYear,
    sortBy,
    setSortBy,
    showOnlyUnviewed,
    setShowOnlyUnviewed,
    
    // Filter options
    genres,
    platforms,
    years,
    
    // Utils
    clearFilters,
    hasActiveFilters,
    getRandomMovie,
    addMovie,
    removeMovie,
    markAsViewed,
    viewedMovies,
  };
}
