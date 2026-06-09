export interface Movie {
  id: string;
  title: string;
  director?: string;
  year?: number;
  genre?: string;
  duration?: string;
  rating?: number;
  posterUrl?: string;
  synopsis?: string;
  platform?: string;
  viewed?: boolean;
  dateAdded?: string;
  isCategory?: boolean;
}

export interface FilterOptions {
  genre?: string;
  year?: number;
  platform?: string;
  viewed?: boolean;
  duration?: 'short' | 'medium' | 'long';
}

export type SortOption = 'dateAdded' | 'year' | 'rating' | 'title' | 'random';
