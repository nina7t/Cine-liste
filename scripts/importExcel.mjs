import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

const excelPath = '/Users/ninatonnaire/Downloads/Liste de film à voir.xlsx';

// Read Excel file
const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

// Skip header row and map to movie format
const movies = data.slice(1).map((row, index) => ({
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
  viewed: row[9] === 'Oui' || row[9] === true || row[9] === 'TRUE',
  dateAdded: row[10] || new Date().toISOString().split('T')[0],
})).filter(m => m.title && m.title !== 'Titre inconnu');

console.log(`Imported ${movies.length} movies`);
console.log(JSON.stringify(movies.slice(0, 3), null, 2));

// Write to a JSON file that will be used by the app
const outputPath = path.join(process.cwd(), 'app', 'data', 'movies.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(movies, null, 2));

console.log(`Data saved to ${outputPath}`);
