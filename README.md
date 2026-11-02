# Mis apuntes

Biblioteca de apuntes en Markdown, pensada para leer en el navegador (PC o celular). Sin backend: es una página estática.

## Estructura

```
temas/                      un archivo .md por tema
scripts/generar-contenido.mjs   junta los .md en contenido.js
index.html, estilos.css, app.js  la página
```

## Agregar o editar contenido

1. Editá o creá un archivo en `temas/` (por ejemplo `docker.md`).
2. Primera línea: el título del tema, `# Docker`.
3. Cada pregunta es un `## ¿Pregunta?` seguido de su respuesta en párrafos.
4. Las negritas se escriben con `**texto**`.

```markdown
# Docker

## ¿Qué es una imagen?
Es una plantilla de solo lectura con todo lo necesario para correr una aplicación.
```

## Ver en local

```bash
npm run build          # genera contenido.js
```

Después abrí `index.html` en el navegador. Tenés que volver a correr `npm run build` cada vez que cambies un .md.

## Publicar en Vercel

1. Subí el repo a GitHub.
2. En Vercel: *Add New Project* → importá el repo.
3. No hace falta configurar nada: `vercel.json` ya indica el comando de build (`npm run build`) y la carpeta de salida.
4. Cada push a `main` vuelve a publicar.
