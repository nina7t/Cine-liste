'use client';

import { Play, Clock, Star, Calendar, ExternalLink } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  variant?: 'grid' | 'horizontal';
}

export function MovieCard({ movie, onClick, variant = 'grid' }: MovieCardProps) {
  const placeholderImage = `https://placehold.co/300x450/262626/666?text=${encodeURIComponent(movie.title)}`;

  if (variant === 'horizontal') {
    return (
      <div
        onClick={onClick}
        className="movie-card flex gap-3 p-3 rounded-xl bg-dark-800 hover:bg-dark-700 cursor-pointer group"
      >
        {/* Poster */}
        <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={movie.posterUrl || placeholderImage}
            alt={movie.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-1">
          <h3 className="font-semibold text-white truncate pr-2">{movie.title}</h3>
          
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
            {movie.year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {movie.year}
              </span>
            )}
            {movie.duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {movie.duration}
              </span>
            )}
          </div>

          {movie.director && (
            <p className="mt-1 text-sm text-gray-400 truncate">{movie.director}</p>
          )}

          {movie.genre && (
            <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-dark-700 text-xs text-gray-300">
              {movie.genre}
            </span>
          )}

          {/* Rating & Platform */}
          <div className="mt-2 flex items-center gap-3">
            {movie.rating && (
              <div className="flex items-center gap-1 text-rating-gold">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-sm font-medium">{movie.rating}</span>
              </div>
            )}
            {movie.platform && (
              <span className="text-xs text-accent-primary font-medium">
                {movie.platform}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div
      onClick={onClick}
      className="movie-card group cursor-pointer"
    >
      {/* Poster container */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-dark-700">
        <img
          src={movie.posterUrl || placeholderImage}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
        
        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-accent-primary/90 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 text-white ml-0.5" />
          </div>
        </div>

        {/* Platform badge */}
        {movie.platform && (
          <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-xs font-medium text-white">
            {movie.platform}
          </div>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {movie.rating && (
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-3 h-3 text-rating-gold fill-current" />
              <span className="text-sm font-bold text-white">{movie.rating}</span>
            </div>
          )}
          
          {movie.duration && (
            <div className="flex items-center gap-1 text-xs text-gray-300">
              <Clock className="w-3 h-3" />
              {movie.duration}
            </div>
          )}
        </div>
      </div>

      {/* Title and meta below poster */}
      <div className="mt-2">
        <h3 className="font-medium text-white text-sm line-clamp-2 leading-tight">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
          {movie.year && <span>{movie.year}</span>}
          {movie.year && movie.director && <span>•</span>}
          {movie.director && (
            <span className="truncate">{movie.director}</span>
          )}
        </div>
      </div>
    </div>
  );
}
