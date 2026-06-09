'use client';

import { Film, Sparkles, Plus } from 'lucide-react';

interface HeaderProps {
  onRandomPick: () => void;
  onAddMovie: () => void;
}

export function Header({ onRandomPick, onAddMovie }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text leading-tight">
                Cinéma Liste
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Trouve le film parfait
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAddMovie}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors text-white font-medium text-sm border border-dark-600"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
            <button
              onClick={onRandomPick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-secondary transition-colors text-white font-medium text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Loterie</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
