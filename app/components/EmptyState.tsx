'use client';

import { Film, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center mb-4">
        <Film className="w-10 h-10 text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Aucun film trouvé
      </h3>
      <p className="text-gray-400 text-center max-w-sm mb-6">
        {hasFilters 
          ? "Essayez de modifier vos filtres pour voir plus de films."
          : "Votre liste de films est vide. Ajoutez-en depuis Google Sheets."}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-700 text-white hover:bg-dark-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}
