// Script to fetch movie posters from TMDB API
// Usage: node scripts/fetch-posters.js

const fs = require('fs');
const path = require('path');

const MOVIES_PATH = path.join(__dirname, '..', 'app', 'data', 'movies.json');
const API_KEY = process.env.TMDB_API_KEY || 'd56dc1152250a09a6b424c7b1d63c1fa';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

// Titles that are category headers (not real movies)
const CATEGORY_TITLES = [
  "Action / Aventures", "Action", "Comédie", "Animation", "Fantastique",
  "Science fiction", "Historique", "Drame", "Romance", "Western",
  "Thriller/Policier", "Documentaire"
];

async function searchMovie(title) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}&language=fr-FR`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const movie = data.results[0];
    return {
      posterPath: movie.poster_path,
      year: movie.release_date ? parseInt(movie.release_date.substring(0, 4)) : null,
      rating: movie.vote_average ? Math.round(movie.vote_average * 10) / 10 : null,
      synopsis: movie.overview || null,
    };
  }
  return null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const movies = JSON.parse(fs.readFileSync(MOVIES_PATH, 'utf-8'));
  let updated = 0;
  let notFound = [];

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    // Skip category headers
    if (CATEGORY_TITLES.includes(movie.title)) continue;

    console.log(`[${i + 1}/${movies.length}] Searching: ${movie.title}`);

    const result = await searchMovie(movie.title);
    if (result && result.posterPath) {
      movie.posterUrl = `${IMG_BASE}${result.posterPath}`;
      if (!movie.year && result.year) movie.year = result.year;
      if (!movie.rating && result.rating) movie.rating = result.rating;
      if (!movie.synopsis && result.synopsis) movie.synopsis = result.synopsis;
      updated++;
    } else {
      notFound.push(movie.title);
    }

    // Rate limiting: TMDB allows ~40 req/10s
    await sleep(260);
  }

  fs.writeFileSync(MOVIES_PATH, JSON.stringify(movies, null, 2));
  console.log(`\nUpdated ${updated} movies with poster URLs`);
  if (notFound.length > 0) {
    console.log(`Could not find posters for ${notFound.length} movies:`);
    notFound.forEach(t => console.log(`  - ${t}`));
  }
}

main().catch(console.error);
