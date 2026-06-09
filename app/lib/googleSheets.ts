import { Movie } from '../types/movie';
import localMovies from '../data/movies.json';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '';
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '';

export async function fetchMoviesFromSheet(): Promise<Movie[]> {
  // Utiliser les données du fichier Excel importé
  if (localMovies && localMovies.length > 0) {
    return localMovies as unknown as Movie[];
  }

  // Fallback sur Google Sheets si configuré
  if (SHEET_ID && API_KEY) {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Films?key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch from Google Sheets');
      }

      const data = await response.json();
      return parseSheetData(data.values);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  return [];
}

function parseSheetData(values: any[][]): Movie[] {
  if (!values || values.length < 2) return [];
  
  const headers = values[0];
  const rows = values.slice(1);
  
  return rows.map((row, index) => ({
    id: index.toString(),
    title: row[0] || 'Titre inconnu',
    director: row[1] || undefined,
    year: row[2] ? parseInt(row[2]) : undefined,
    genre: row[3] || undefined,
    duration: row[4] || undefined,
    rating: row[5] ? parseFloat(row[5]) : undefined,
    posterUrl: row[6] || undefined,
    synopsis: row[7] || undefined,
    platform: row[8] || undefined,
    viewed: row[9] === 'Oui' || row[9] === 'true',
    dateAdded: row[10] || undefined,
  }));
}

export function getGenres(movies: Movie[]): string[] {
  const genres = new Set<string>();
  movies.forEach(m => m.genre && genres.add(m.genre));
  return Array.from(genres).sort();
}

export function getPlatforms(movies: Movie[]): string[] {
  const platforms = new Set<string>();
  movies.forEach(m => m.platform && platforms.add(m.platform));
  return Array.from(platforms).sort();
}

export function getYears(movies: Movie[]): number[] {
  const years = new Set<number>();
  movies.forEach(m => m.year && years.add(m.year));
  return Array.from(years).sort((a, b) => b - a);
}
