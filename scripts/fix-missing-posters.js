const fs = require('fs');
const path = require('path');

const MOVIES_PATH = path.join(__dirname, '..', 'app', 'data', 'movies.json');
const API_KEY = 'd56dc1152250a09a6b424c7b1d63c1fa';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

// Map of wrong titles -> corrected search queries
const FIXES = {
  "Mission Imossible fallout": "Mission Impossible Fallout",
  "Quatre mariage et un enterrement": "Quatre mariages et un enterrement",
  "La colline au coquelicots": "La colline aux coquelicots",
  "Kirikou": "Kirikou et la sorcière",
  "Edward au main d'argent": "Edward aux mains d'argent",
  "La lisye de Schindler": "La liste de Schindler",
  "Inglourius Basterds": "Inglourious Basterds",
  "120 battements par minutes": "120 battements par minute",
  "Extrêmement fort et incroyablement loin": "Extremely Loud & Incredibly Close",
  "La loi de Théhéran": "La loi de Téhéran",
  "Le tempq des forets": "Le temps des forêts",
  "5 caméras brisés": "5 caméras brisées",
  "Il était une fis Michel Legrand": "Il était une fois Michel Legrand",
  "Drole de grenouiles": "Drôle de petites bêtes",
};

async function searchMovie(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=fr-FR`;
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

  for (const movie of movies) {
    const corrected = FIXES[movie.title];
    if (!corrected) continue;

    console.log(`Searching: "${corrected}" (was: "${movie.title}")`);
    const result = await searchMovie(corrected);

    if (result && result.posterPath) {
      movie.posterUrl = `${IMG_BASE}${result.posterPath}`;
      if (!movie.year && result.year) movie.year = result.year;
      if (!movie.rating && result.rating) movie.rating = result.rating;
      if (!movie.synopsis && result.synopsis) movie.synopsis = result.synopsis;
      updated++;
      console.log(`  ✓ Found!`);
    } else {
      notFound.push(movie.title);
      console.log(`  ✗ Not found`);
    }

    await sleep(260);
  }

  fs.writeFileSync(MOVIES_PATH, JSON.stringify(movies, null, 2));
  console.log(`\nFixed ${updated} movies`);
  if (notFound.length > 0) {
    console.log(`Still missing:`);
    notFound.forEach(t => console.log(`  - ${t}`));
  }
}

main().catch(console.error);
