const xlsx = require('xlsx');
const fs = require('fs');

const wb = xlsx.readFile('/Users/ninatonnaire/Downloads/Liste de film à voir.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

const categories = [
  'Action', 'Comédie', 'Animation', 'Fantastique', 
  'Sci-Fi', 'Guerre/Historique', 'Drame', 'Romance', 
  null, 'Western', 'Thriller', 'Documentaire'
];

const movies = [];
let id = 0;

for (let col = 0; col < categories.length; col++) {
  const genre = categories[col];
  if (!genre) continue;
  
  for (let row = 0; row < data.length; row++) {
    const title = data[row][col];
    if (title && typeof title === 'string' && title.trim()) {
      movies.push({
        id: String(id++),
        title: title.trim(),
        genre: genre,
        director: null,
        year: null,
        duration: null,
        rating: null,
        posterUrl: null,
        synopsis: null,
        platform: null,
        viewed: false,
        dateAdded: '2024-01-01'
      });
    }
  }
}

console.log(`Total: ${movies.length} movies`);

fs.mkdirSync('./app/data', { recursive: true });
fs.writeFileSync('./app/data/movies.json', JSON.stringify(movies, null, 2));

console.log('\nPar genre:');
const byGenre = {};
movies.forEach(m => {
  byGenre[m.genre] = (byGenre[m.genre] || 0) + 1;
});
Object.entries(byGenre).forEach(([g, c]) => console.log(`  ${g}: ${c}`));
