'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Movie } from '../types/movie';

interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (movie: Omit<Movie, 'id'>) => void;
}

export function AddMovieModal({ isOpen, onClose, onAdd }: AddMovieModalProps) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      director: director.trim() || undefined,
      year: year ? parseInt(year) : undefined,
      genre: genre.trim() || undefined,
      platform: platform.trim() || undefined,
      viewed: false,
      dateAdded: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setDirector('');
    setYear('');
    setGenre('');
    setPlatform('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-dark-800 rounded-2xl p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Ajouter un film</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-dark-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Titre *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Inception"
              className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-600 focus:border-accent-primary focus:outline-none text-white placeholder-gray-500"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Réalisateur
            </label>
            <input
              type="text"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              placeholder="Ex: Christopher Nolan"
              className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-600 focus:border-accent-primary focus:outline-none text-white placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Année
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                min="1900"
                max="2100"
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-600 focus:border-accent-primary focus:outline-none text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Genre
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Ex: Sci-Fi"
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-600 focus:border-accent-primary focus:outline-none text-white placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Plateforme
            </label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="Ex: Netflix, Canal+, Cinéma..."
              className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-600 focus:border-accent-primary focus:outline-none text-white placeholder-gray-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!title.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            Ajouter à ma liste
          </button>
        </form>
      </div>
    </div>
  );
}
