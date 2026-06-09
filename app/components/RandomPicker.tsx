'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, Check } from 'lucide-react';
import { Movie } from '../types/movie';

interface RandomPickerProps {
  movies: Movie[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (movie: Movie) => void;
  onConfirm?: (movie: Movie) => void;
}

export function RandomPicker({ movies, isOpen, onClose, onSelect, onConfirm }: RandomPickerProps) {
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  useEffect(() => {
    if (isOpen && movies.length > 0 && !currentMovie) {
      startSpin();
    }
  }, [isOpen, movies.length]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentMovie(null);
      setHasResult(false);
      setIsSpinning(false);
    }
  }, [isOpen]);

  const startSpin = () => {
    setIsSpinning(true);
    setHasResult(false);
    
    let count = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setCurrentMovie(movies[randomIndex]);
      count++;
      
      if (count >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        setHasResult(true);
      }
    }, 100);
  };

  if (!isOpen) return null;

  const placeholderImage = currentMovie 
    ? `https://placehold.co/300x450/262626/666?text=${encodeURIComponent(currentMovie.title)}`
    : '';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-md mx-auto px-4 text-center">
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/20 text-accent-primary mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Sélection aléatoire</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isSpinning ? 'Recherche...' : hasResult ? 'Et le film est...' : 'Prêt ?'}
          </h2>
        </div>

        {/* Movie card */}
        {currentMovie && (
          <div className={`transition-all duration-300 ${isSpinning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
            <div 
              className="relative mx-auto w-48 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden bg-dark-700 shadow-2xl"
              style={{
                boxShadow: hasResult ? '0 25px 50px -12px rgba(0, 175, 127, 0.4)' : undefined
              }}
            >
              <img
                src={currentMovie.posterUrl || placeholderImage}
                alt={currentMovie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Movie title on poster */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-lg leading-tight">
                  {currentMovie.title}
                </p>
                {currentMovie.year && (
                  <p className="text-gray-300 text-sm mt-1">{currentMovie.year}</p>
                )}
              </div>
            </div>

            {/* Movie info below */}
            <div className="mt-6 space-y-2">
              <p className="text-gray-400">
                {currentMovie.director && `de ${currentMovie.director}`}
              </p>
              {currentMovie.genre && (
                <span className="inline-block px-3 py-1 rounded-full bg-dark-700 text-sm text-gray-300">
                  {currentMovie.genre}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-3 justify-center">
          {hasResult ? (
            <>
              <button
                onClick={startSpin}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-700 text-white font-medium hover:bg-dark-600 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Recommencer
              </button>
              <button
                onClick={() => {
                  if (onConfirm && currentMovie) {
                    onConfirm(currentMovie);
                  }
                  onClose();
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
              >
                <Check className="w-5 h-5" />
                Confirmer & Supprimer
              </button>
            </>
          ) : isSpinning ? (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
              Recherche du film parfait...
            </div>
          ) : (
            <button
              onClick={startSpin}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-primary text-white font-semibold hover:bg-accent-secondary transition-all transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Lancer la roue
            </button>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-0 right-4 p-2 rounded-full bg-dark-700/50 text-white hover:bg-dark-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
