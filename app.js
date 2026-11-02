(function () {
  const $ = (sel) => document.querySelector(sel);
  const navEl = $('#temas');
  const mainEl = $('#contenido');
  const buscarEl = $('#buscar');
  const menuEl = $('#menu');
  const fondoEl = $('#fondo');

  const TEMAS = (window.TEMAS || []).map(modelo);
  let temaActivo = null;

  /* ---------- Utilidades ---------- */

  function escapar(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Negritas **así** -> <strong>, todo lo demás escapado
  function formato(s) {
    return escapar(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  function textoPlano(s) {
    return s.replace(/\*\*/g, '');
  }

  // Para buscar sin importar mayúsculas ni acentos
  function normalizar(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  /* ---------- Markdown (subconjunto: # título, ## pregunta, párrafos, **negritas**) ---------- */

  function parsear(md) {
    return md
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter(Boolean)
      .map((b) => {
        if (b.startsWith('## ')) return { tipo: 'pregunta', texto: b.slice(3).trim() };
        if (b.startsWith('# ')) return { tipo: 'titulo', texto: b.slice(2).trim() };
        return { tipo: 'parrafo', texto: b };
      });
  }

  function modelo(tema) {
    const t = { id: tema.id, titulo: tema.titulo, intro: [], preguntas: [] };
    let actual = null;
    for (const b of parsear(tema.md)) {
      if (b.tipo === 'titulo') continue; // el título ya viene de contenido.js
      if (b.tipo === 'pregunta') {
        actual = { texto: b.texto, parrafos: [] };
        t.preguntas.push(actual);
      } else {
        (actual ? actual.parrafos : t.intro).push(b.texto);
      }
    }
    return t;
  }

  /* ---------- Render ---------- */

  function renderMenu() {
    navEl.innerHTML = TEMAS.map((t) => {
      const activo = t === temaActivo;
      const preguntas = activo
        ? `<ul class="preguntas">${t.preguntas
            .map((p, i) => `<li><button data-tema="${t.id}" data-i="${i}">${escapar(p.texto)}</button></li>`)
            .join('')}</ul>`
        : '';
      return `<div class="tema${activo ? ' activo' : ''}">
        <a data-tema="${t.id}">${escapar(t.titulo)}</a>${preguntas}
      </div>`;
    }).join('');
  }

  function renderTema(t) {
    mainEl.innerHTML = `
      <div>
        <h1>${escapar(t.titulo)}</h1>
        ${t.intro.map((p) => `<p>${formato(p)}</p>`).join('')}
        ${t.preguntas
          .map(
            (p, i) => `<section class="pregunta" id="${t.id}-${i}">
              <h2>${escapar(p.texto)}</h2>
              ${p.parrafos.map((x) => `<p>${formato(x)}</p>`).join('')}
            </section>`
          )
          .join('')}
      </div>`;
  }

  function renderSinTemas() {
    mainEl.innerHTML = `<div><h1>Sin temas</h1>
      <p>Todavía no hay archivos en la carpeta <code>temas/</code>. Agregá un .md y corré <code>npm run build</code>.</p></div>`;
  }

  function renderResultados(q, resultados) {
    const items = resultados
      .map(
        (r) => `<li><a data-tema="${r.tema.id}" data-i="${r.i}">
          <span class="tema-res">${escapar(r.tema.titulo)}</span>
          <strong>${escapar(r.pregunta.texto)}</strong>
          <span>${escapar(r.fragmento)}</span>
        </a></li>`
      )
      .join('');
    mainEl.innerHTML = `<div>
      <h1>Resultados para “${escapar(q)}”</h1>
      ${resultados.length ? `<ul class="resultados">${items}</ul>` : '<p>No se encontró nada.</p>'}
    </div>`;
  }

  /* ---------- Navegación ---------- */

  // Muestra un tema (y opcionalmente baja a una pregunta)
  function irA(id, i) {
    const t = TEMAS.find((x) => x.id === id);
    if (!t) return;
    buscarEl.value = '';
    temaActivo = t;
    history.replaceState(null, '', `#${id}`);
    renderMenu();
    renderTema(t);
    if (i != null) {
      document.getElementById(`${id}-${i}`)?.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
    cerrarMenu();
  }

  function buscar(q) {
    const n = normalizar(q.trim());
    if (n.length < 2) {
      if (temaActivo) renderTema(temaActivo);
      return;
    }
    const resultados = [];
    TEMAS.forEach((t) =>
      t.preguntas.forEach((p, i) => {
        const plano = textoPlano(`${p.texto} ${p.parrafos.join(' ')}`);
        const pos = normalizar(plano).indexOf(n);
        if (pos < 0) return;
        const ini = Math.max(0, pos - 60);
        const fin = Math.min(plano.length, pos + 120);
        const fragmento = (ini > 0 ? '…' : '') + plano.slice(ini, fin).trim() + (fin < plano.length ? '…' : '');
        resultados.push({ tema: t, i, pregunta: p, fragmento });
      })
    );
    renderResultados(q.trim(), resultados);
    window.scrollTo(0, 0);
  }

  function ruta() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!TEMAS.length) return renderSinTemas();
    irA(TEMAS.some((t) => t.id === id) ? id : TEMAS[0].id);
  }

  function abrirMenu() {
    menuEl.classList.add('abierto');
    fondoEl.classList.add('visible');
  }

  function cerrarMenu() {
    menuEl.classList.remove('abierto');
    fondoEl.classList.remove('visible');
  }

  /* ---------- Eventos ---------- */

  // Clicks en temas y preguntas (menú y resultados de búsqueda)
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-tema]');
    if (!el) return;
    e.preventDefault();
    irA(el.dataset.tema, el.dataset.i != null ? Number(el.dataset.i) : null);
  });

  buscarEl.addEventListener('input', () => {
    if (!TEMAS.length) return;
    buscar(buscarEl.value);
  });

  $('#abrir-menu').addEventListener('click', () => {
    menuEl.classList.contains('abierto') ? cerrarMenu() : abrirMenu();
  });
  fondoEl.addEventListener('click', cerrarMenu);

  window.addEventListener('hashchange', ruta);
  ruta();
})();
