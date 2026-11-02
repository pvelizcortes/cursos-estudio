# React

## ¿Qué es un Hook en React, para qué sirve y cuáles son los más usados?

**Hook:** **es una función especial de React** que permite manejar estado y ciclos de vida de React

**Para qué sirve:** darle memoria y comportamiento a los componentes (guardar datos, reaccionar a cambios, acceder al DOM) y reutilizar lógica entre ellos con hooks personalizados.

**useState:** Maneja estados, guarda un valor en el componente y, cuando cambia, vuelve a renderizar la pantalla.

**useEffect:** Maneja ciclo de vida de un componente.

**useContext:** Compartir información con otros componentes sin necesidad de pasar props.

**useRef:** Controlar múltiples elementos del DOM, cambiar valores sin renderizar toda la pagina.

**Reglas:** solo se llaman en el nivel superior del componente (no dentro de condiciones ni bucles

## ¿Qué tipos de renderizado existen en React y qué son CSR y SSR?

**CSR (Client-Side Rendering):** el servidor envía un HTML casi vacío con JavaScript, y el navegador construye la página. Es el modo por defecto de React. Ventaja: navegación fluida tras la carga inicial; desventaja: carga inicial más lenta y peor SEO.

**SSR (Server-Side Rendering):** el servidor genera el HTML completo en cada petición y lo envía listo al navegador, donde React lo “activa” (hydration). Ventaja: carga inicial rápida y mejor SEO; desventaja: más carga para el servidor.

**SSG (Static Site Generation):** las páginas se generan una sola vez al compilar y se sirven como archivos estáticos. Ventaja: es muy rápido y barato; desventaja: no sirve para contenido que cambia constantemente.

**ISR (Incremental Static Regeneration):** es como el SSG, pero las páginas estáticas se regeneran cada cierto tiempo o bajo demanda, para mantener contenido actualizado sin recompilar todo.

**Cuándo usar cada uno:** CSR para dashboards o apps internas donde el SEO no importa, SSR para contenido dinámico que necesita SEO, y SSG o ISR para blogs, catálogos o landing pages.

**Nota:** SSR, SSG e ISR requieren un framework como Next.js; React solo no los trae.

## ¿Qué es Redux y para qué sirve? ¿Qué es Zustand y para qué sirve?

**Redux:** es una librería para manejar el estado global de una aplicación en un solo lugar llamado store, al que cualquier componente puede acceder. Sirve para compartir datos entre muchos componentes (usuario, carrito, permisos) de forma predecible y ordenada.

**Cómo funciona Redux:** los componentes envían acciones que describen qué pasó, los reducers las reciben y calculan el nuevo estado, y el store lo actualiza. Hoy se usa con Redux Toolkit, que reduce mucho el código repetitivo.

**Zustand:** es una librería ligera para manejar estado global, con una sintaxis mucho más simple y sin tanta estructura. Defines un store con tu estado y funciones, y los componentes lo usan con un hook, sin acciones ni reducers.

**Diferencia clave:** Redux es más estructurado y trae más configuración, ideal para apps grandes con equipos numerosos; Zustand es más simple y rápido de adoptar, ideal para apps pequeñas o medianas.

**Cuándo usar cada uno:** Redux cuando necesitas reglas estrictas, herramientas de depuración avanzadas y consistencia en un equipo grande; Zustand cuando quieres estado global sin complicarte.

**Cuándo no usar ninguno:** si el estado es local o se comparte entre pocos componentes, basta con useState o useContext.
