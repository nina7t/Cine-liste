'use client';

import { X, Star, Clock, Calendar, User, Play, Heart, Share2, Check } from 'lucide-react';
import { Movie } from '../types/movie';
import { useState, useEffect } from 'react';

interface MovieDetailProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieDetail({ movie, isOpen, onClose }: MovieDetailProps) {
  const [isViewed, setIsViewed] = useState(movie?.viewed || false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsViewed(movie?.viewed || false);
  }, [movie]);

  if (!isOpen || !movie) return null;

  const placeholderImage = `https://placehold.co/400x600/262626/666?text=${encodeURIComponent(movie.title)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg sm:max-w-2xl mx-auto animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
        <div className="bg-dark-800 sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero section */}
          <div className="relative">
            {/* Backdrop image */}
            <div className="aspect-[16/9] relative overflow-hidden">
              <img
                src={movie.posterUrl || placeholderImage}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/50 to-transparent" />
            </div>

            {/* Movie info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {movie.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
                {movie.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {movie.year}
                  </span>
                )}
                {movie.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {movie.duration}
                  </span>
                )}
                {movie.rating && (
                  <span className="flex items-center gap-1 text-rating-gold">
                    <Star className="w-4 h-4 fill-current" />
                    {movie.rating}/10
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                  isLiked
                    ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary'
                    : 'bg-dark-700 text-white hover:bg-dark-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Aimé' : 'J\'aime'}
              </button>
              <button
                onClick={() => setIsViewed(!isViewed)}
                className={`flex-1 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                  isViewed
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-dark-700 text-white hover:bg-dark-600'
                }`}
              >
                <Check className={`w-5 h-5 ${isViewed ? 'opacity-100' : 'opacity-50'}`} />
                {isViewed ? 'Vu' : 'Marquer vu'}
              </button>
              <button className="px-4 py-3 rounded-xl bg-dark-700 text-white hover:bg-dark-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {movie.director && (
                <div className="p-3 rounded-xl bg-dark-700/50">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <User className="w-4 h-4" />
                    <span>Réalisateur</span>
                  </div>
                  <p className="text-white font-medium">{movie.director}</p>
                </div>
              )}
              {movie.genre && (
                <div className="p-3 rounded-xl bg-dark-700/50">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Play className="w-4 h-4" />
                    <span>Genre</span>
                  </div>
                  <p className="text-white font-medium">{movie.genre}</p>
                </div>
              )}
              {movie.platform && (
                <div className="p-3 rounded-xl bg-dark-700/50 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Play className="w-4 h-4" />
                    <span>Disponible sur</span>
                  </div>
                  <p className="text-accent-primary font-medium">{movie.platform}</p>
                </div>
              )}
            </div>

            {/* Synopsis */}
            {movie.synopsis && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {movie.synopsis}
                </p>
              </div>
            )}

            {/* Watch button */}
            <button className="w-full py-4 rounded-xl bg-accent-primary hover:bg-accent-secondary transition-colors text-white font-semibold flex items-center justify-center gap-2">
              <Play className="w-5 h-5" />
              Regarder maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
