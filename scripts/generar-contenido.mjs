// Lee todos los .md de temas/ y genera contenido.js con los datos para la página.
// Se ejecuta con "npm run build" (Vercel lo corre solo en cada deploy).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const carpeta = join(raiz, 'temas');

const temas = readdirSync(carpeta)
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((archivo) => {
    const md = readFileSync(join(carpeta, archivo), 'utf8');
    const titulo = md.match(/^#\s+(.+)$/m)?.[1].trim() ?? basename(archivo, '.md');
    if (!md.match(/^#\s+/m)) console.warn(`Aviso: ${archivo} no tiene título "# ..."`);
    return { id: basename(archivo, '.md'), titulo, md };
  });

writeFileSync(join(raiz, 'contenido.js'), `window.TEMAS = ${JSON.stringify(temas, null, 2)};\n`);
console.log(`contenido.js generado con ${temas.length} temas`);
