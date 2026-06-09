'use client';

import { X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  genres: string[];
  platforms: string[];
  years: number[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
  selectedYear: number | '';
  onYearChange: (year: number | '') => void;
}

export function FilterPanel({
  isOpen,
  onClose,
  genres,
  platforms,
  years,
  selectedGenre,
  onGenreChange,
  selectedPlatform,
  onPlatformChange,
  selectedYear,
  onYearChange,
}: FilterPanelProps) {
  if (!isOpen) return null;

  const PillButton = ({
    label,
    isSelected,
    onClick,
  }: {
    label: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        isSelected
          ? 'bg-accent-primary text-white'
          : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 sm:relative sm:inset-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm sm:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute bottom-0 left-0 right-0 sm:relative sm:bottom-auto bg-dark-800 sm:bg-transparent rounded-t-2xl sm:rounded-none p-4 sm:p-0 animate-in slide-in-from-bottom-10 sm:animate-none">
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <h3 className="text-lg font-semibold">Filtres</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dark-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Genre filter */}
          {genres.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Genre</h4>
              <div className="flex flex-wrap gap-2">
                <PillButton
                  label="Tous"
                  isSelected={!selectedGenre}
                  onClick={() => onGenreChange('')}
                />
                {genres.map((genre) => (
                  <PillButton
                    key={genre}
                    label={genre}
                    isSelected={selectedGenre === genre}
                    onClick={() => onGenreChange(genre === selectedGenre ? '' : genre)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Platform filter */}
          {platforms.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Plateforme</h4>
              <div className="flex flex-wrap gap-2">
                <PillButton
                  label="Toutes"
                  isSelected={!selectedPlatform}
                  onClick={() => onPlatformChange('')}
                />
                {platforms.map((platform) => (
                  <PillButton
                    key={platform}
                    label={platform}
                    isSelected={selectedPlatform === platform}
                    onClick={() => onPlatformChange(platform === selectedPlatform ? '' : platform)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Year filter */}
          {years.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Année</h4>
              <div className="flex flex-wrap gap-2">
                <PillButton
                  label="Toutes"
                  isSelected={!selectedYear}
                  onClick={() => onYearChange('')}
                />
                {years.slice(0, 10).map((year) => (
                  <PillButton
                    key={year}
                    label={year.toString()}
                    isSelected={selectedYear === year}
                    onClick={() => onYearChange(year === selectedYear ? '' : year)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile apply button */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 rounded-xl bg-accent-primary text-white font-medium sm:hidden"
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}
