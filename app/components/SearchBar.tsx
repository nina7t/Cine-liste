'use client';

import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { SortOption } from '../types/movie';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  showOnlyUnviewed: boolean;
  onToggleUnviewed: () => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'dateAdded', label: 'Ajout récent' },
  { value: 'year', label: 'Année' },
  { value: 'rating', label: 'Note' },
  { value: 'title', label: 'Titre' },
  { value: 'random', label: 'Aléatoire' },
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  showFilters,
  onToggleFilters,
  showOnlyUnviewed,
  onToggleUnviewed,
  hasActiveFilters,
  onClearFilters,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="sticky top-16 z-40 bg-dark-900/95 backdrop-blur-sm py-4 space-y-3">
      {/* Search and actions row */}
      <div className="flex gap-2">
        {/* Search input */}
        <div
          className={`flex-1 relative transition-all duration-200 ${
            isFocused ? 'scale-[1.02]' : ''
          }`}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Rechercher un film..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-dark-800 border border-dark-600 focus:border-accent-primary focus:outline-none transition-colors text-white placeholder-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-dark-700 transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Filter toggle button */}
        <button
          onClick={onToggleFilters}
          className={`px-3 rounded-xl border transition-all ${
            showFilters || hasActiveFilters
              ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
              : 'bg-dark-800 border-dark-600 text-gray-400 hover:text-white'
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-200">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-3 py-2 rounded-lg bg-dark-800 border border-dark-600 text-sm text-white focus:border-accent-primary focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Unviewed toggle */}
          <button
            onClick={onToggleUnviewed}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              showOnlyUnviewed
                ? 'bg-accent-primary/20 border-accent-primary text-accent-primary'
                : 'bg-dark-800 border-dark-600 text-gray-400'
            }`}
          >
            Non vus
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-3 py-2 rounded-lg bg-dark-700 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}
    </div>
  );
}
