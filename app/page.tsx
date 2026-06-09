'use client';

import { useState, useEffect } from 'react';
import { useMovies } from './hooks/useMovies';
import { Movie, SortOption } from './types/movie';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { MovieCard } from './components/MovieCard';
import { MovieDetail } from './components/MovieDetail';
import { RandomPicker } from './components/RandomPicker';
import { AddMovieModal } from './components/AddMovieModal';
import { EmptyState } from './components/EmptyState';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const {
    movies,
    loading,
    error,
    refresh,
    addMovie,
    removeMovie,
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
    genres,
    platforms,
    years,
    clearFilters,
    hasActiveFilters,
  } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRandomPickerOpen, setIsRandomPickerOpen] = useState(false);
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailOpen(true);
  };

  const handleRandomPick = () => {
    setIsRandomPickerOpen(true);
  };

  const handleSelectFromPicker = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <Header onRandomPick={handleRandomPick} onAddMovie={() => setIsAddMovieOpen(true)} />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search and filters */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showOnlyUnviewed={showOnlyUnviewed}
          onToggleUnviewed={() => setShowOnlyUnviewed(!showOnlyUnviewed)}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        {/* Desktop filter panel */}
        <div className="hidden lg:block mb-6">
          <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            genres={genres}
            platforms={platforms}
            years={years}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </div>

        {/* Mobile filter panel modal */}
        <div className="lg:hidden">
          <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            genres={genres}
            platforms={platforms}
            years={years}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-400">
            {movies.length} film{movies.length > 1 ? 's' : ''} trouvé{movies.length > 1 ? 's' : ''}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-dark-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-dark-700 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-accent-primary animate-spin mb-4" />
            <p className="text-gray-400">Chargement des films...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={refresh}
              className="px-4 py-2 rounded-xl bg-accent-primary text-white hover:bg-accent-secondary transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && movies.length === 0 && (
          <EmptyState 
            hasFilters={hasActiveFilters} 
            onClearFilters={clearFilters} 
          />
        )}

        {/* Movie grid */}
        {!loading && !error && movies.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie)}
                variant="grid"
              />
            ))}
          </div>
        )}

        {/* Movie list */}
        {!loading && !error && movies.length > 0 && viewMode === 'list' && (
          <div className="space-y-3">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie)}
                variant="horizontal"
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <MovieDetail
        movie={selectedMovie}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      <RandomPicker
        movies={movies}
        isOpen={isRandomPickerOpen}
        onClose={() => setIsRandomPickerOpen(false)}
        onSelect={handleSelectFromPicker}
        onConfirm={(movie) => removeMovie(movie.id)}
      />

      <AddMovieModal
        isOpen={isAddMovieOpen}
        onClose={() => setIsAddMovieOpen(false)}
        onAdd={addMovie}
      />
    </div>
  );
}
