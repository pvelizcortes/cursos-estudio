# OTROS

## ¿Qué es una aplicación monolítica, qué diferencia tiene con los microservicios y cuándo conviene cada una?

**Monolito:** es una aplicación construida como una sola unidad, donde todo el código (usuarios, pagos, inventario) vive junto, se despliega junto y comparte una misma base de datos.

**Microservicios:** es una aplicación dividida en servicios pequeños e independientes, cada uno con una función específica, su propio despliegue y normalmente su propia base de datos, que se comunican entre sí por la red (APIs o mensajería).

**Diferencia en despliegue:** el monolito se despliega completo cada vez; en microservicios cada servicio se despliega por separado sin afectar a los demás.

**Diferencia en escalado:** el monolito se escala completo; los microservicios permiten escalar solo la parte que lo necesita.

**Diferencia en complejidad:** el monolito es más simple de desarrollar, probar y desplegar; los microservicios agregan complejidad (red, monitoreo, consistencia de datos).

**Cuándo usar monolito:** en proyectos pequeños o medianos, equipos pequeños, startups que validan una idea o cuando se busca salir rápido al mercado.

**Cuándo usar microservicios:** en sistemas grandes con varios equipos, partes con necesidades de escalado distintas o cuando se requiere desplegar y evolucionar módulos de forma independiente.

**Regla práctica:** empezar con un monolito bien organizado y migrar a microservicios solo cuando el tamaño o la necesidad lo justifique.

## ¿Qué es SOLID en general y cuándo conviene usarlo?

**SOLID:** es un conjunto de 5 principios de diseño orientado a objetos que ayudan a escribir código más ordenado, fácil de mantener, de probar y de ampliar sin romper lo existente.

**S, Responsabilidad Única:** cada clase debe tener una sola razón para cambiar, es decir, hacer una sola cosa.

**O, Abierto/Cerrado:** el código debe estar abierto a extenderse, pero cerrado a modificarse; se agregan funciones nuevas sin tocar lo que ya funciona.

**L, Sustitución de Liskov:** una clase hija debe poder usarse en lugar de su clase padre sin romper el comportamiento.

**I, Segregación de Interfaces:** es mejor tener varias interfaces pequeñas y específicas que una grande que obligue a implementar métodos innecesarios.

**D, Inversión de Dependencias:** las clases deben depender de abstracciones (interfaces), no de implementaciones concretas, lo que se logra con inyección de dependencias.

**Cuándo conviene usarlo:** en proyectos medianos o grandes, con varios desarrolladores, código que va a crecer y cambiar, o cuando se necesitan pruebas unitarias fáciles.

**Cuándo no forzarlo:** en scripts o proyectos muy pequeños, porque aplicarlo en exceso complica el código sin aportar valor.

## ¿Qué es Clean Code y cuándo conviene usarlo?

**Clean Code:** es un conjunto de buenas prácticas para escribir código fácil de leer, entender y mantener, de modo que otro desarrollador (o tú mismo meses después) pueda trabajar con él sin esfuerzo.

**Nombres claros:** variables, funciones y clases con nombres que expliquen su propósito, para no depender de comentarios.

**Funciones pequeñas:** cada función hace una sola cosa, lo que facilita entenderla y probarla.

**Sin duplicación (DRY):** no repetir lógica; se extrae a un solo lugar para que un cambio se haga una sola vez.

**Simplicidad:** evitar código innecesario o demasiado complejo (KISS), y dejar comentarios solo cuando aportan contexto que el código no puede dar.

**Cuándo conviene usarlo:** siempre como hábito, y con más razón en proyectos que viven mucho tiempo, equipos con varios desarrolladores o código que se revisa y modifica con frecuencia.

**Cuándo no exagerar:** en prototipos o scripts desechables, donde lo importante es la rapidez y no vale la pena refinar tanto.

## ¿Cómo conviertes un requerimiento en una funcionalidad terminada?

**Entender el requerimiento:** converso con quien lo pide (negocio, producto) para aclarar el objetivo, el alcance y los criterios de aceptación, porque construir algo mal entendido es el error más caro.

**Desglosar en tareas:** divido la funcionalidad en tareas pequeñas (front, back, base de datos, pruebas), porque es más fácil estimar, repartir y avanzar de forma incremental.

**Desarrollar en una rama:** programo en una rama propia con commits pequeños, siguiendo las buenas prácticas del proyecto (Clean Code, SOLID), porque mantiene el código ordenado y fácil de revisar.

**Probar:** escribo pruebas unitarias y verifico manualmente que cumple los criterios de aceptación, porque asegura que funciona antes de que otros lo revisen.

**Pull Request y revisión:** abro un PR para que el equipo revise el código y el CI ejecute linters y pruebas, porque mejora la calidad y reduce errores.

**Despliegue y validación:** se despliega primero en un entorno de pruebas para que el solicitante lo valide y luego pasa a producción, porque confirma que resuelve lo que se pidió.

**Seguimiento:** reviso logs y feedback tras la entrega y corrijo lo necesario, porque la funcionalidad no termina hasta que funciona bien en producción.

## ¿Cómo estructuras tu flujo de trabajo y el de tu equipo en Jira, y cómo sería un ejemplo simple de un requerimiento desde el issue hasta producción?

**Estructura del trabajo:** usamos sprints con un tablero Scrum con columnas como To Do, In Progress, Code Review, QA y Done. Los requerimientos grandes se crean como Épicas y se dividen en historias y tareas pequeñas

**Backlog y planificación:** el equipo estima las historias y elige cuáles entran al sprint, para saber quién hace qué y en qué orden.

**Ejemplo, el requerimiento:** “Como usuario quiero recuperar mi contraseña por correo”. Se crea la historia (por ejemplo, PROJ-123) con sus criterios de aceptación y se asigna a un desarrollador.

**Inicio del trabajo:** muevo el issue a In Progress y creo una rama con el código del issue (feature/PROJ-123-recuperar-password), para que Jira enlace automáticamente la rama, los commits y el PR.

**Desarrollo:** programo, hago commits pequeños que mencionan el issue.

**Pull Request y revisión:** abro el PR, el CI ejecuta linters y pruebas, un compañero revisa el código y el issue pasa a Code Review.

**QA:** tras aprobar el PR y mezclar a la rama de desarrollo, se despliega a un entorno de pruebas, el issue pasa a QA y se valida contra los criterios de aceptación. Si falla, vuelve a In Progress con un comentario.

**Despliegue a producción:** al aprobarse, el pipeline de CI/CD despliega a producción (con aprobación manual si el equipo lo exige) y se verifica que todo funcione.

**Cierre:** el issue pasa a Done.
