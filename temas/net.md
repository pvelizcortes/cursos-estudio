# .NET

## ¿Qué es cada capa en una API .NET con la estructura Controllers, Services, Repositories y Entities, y para qué sirve?

**Controller:** es la puerta de entrada de la API; recibe la petición HTTP, valida lo básico, llama al servicio y devuelve la respuesta con el código de estado correcto. No contiene lógica de negocio.

**Service:** es la capa de lógica de negocio; aquí van las reglas y los procesos de la aplicación (cálculos, validaciones de negocio, coordinar varios repositorios).

**Repository:** es la capa de acceso a datos; se encarga de consultar y guardar información en la base de datos (normalmente con Entity Framework), y oculta al resto de la aplicación cómo se almacenan los datos.

**Entity:** es la clase que representa una tabla de la base de datos, con sus propiedades como columnas.

**Flujo:** la petición llega al Controller, pasa al Service, que usa el Repository para acceder a la base de datos mediante las Entities, y la respuesta vuelve por el mismo camino.

**Por qué se separa así:** cada capa tiene una sola responsabilidad, lo que hace el código más ordenado, fácil de probar y de mantener.

## ¿Qué es la concurrencia, qué es el paralelismo y qué diferencia hay entre ambos?

**Concurrencia:** es **manejar varias tareas a la vez**, pero sin que necesariamente se ejecuten al mismo instante; el sistema va alternando entre ellas rápidamente. Es como un solo cocinero que atiende varios platos, cambiando de uno a otro.

**Paralelismo:** es **ejecutar varias tareas realmente al mismo tiempo**, usando varios núcleos o procesadores. Es como tener varios cocineros, cada uno haciendo un plato a la vez.

**Diferencia clave:** la concurrencia trata de organizar o gestionar muchas tareas, y el paralelismo trata de ejecutarlas simultáneamente.

**Se pueden combinar:** un sistema puede ser concurrente sin ser paralelo (un solo núcleo), pero para ser paralelo necesita varios núcleos.

**Ejemplo en Node.js:** es concurrente porque atiende muchas peticiones con un solo hilo, gracias a las operaciones asíncronas, pero no paralelo, salvo que uses worker threads o varios procesos.

**Ejemplo en .NET:** async/await da concurrencia al no bloquear el hilo mientras espera.

## ¿Qué es RabbitMQ, para qué sirve y cuándo usarlo?

**RabbitMQ:** es un message broker, es decir, un intermediario que recibe mensajes de una aplicación y los entrega a otra. Funciona como un buzón de correos: quien envía deja el mensaje y quien lo necesita lo recoge después, sin que ambos tengan que estar disponibles al mismo tiempo.

**Para qué sirve:** permite que las aplicaciones o microservicios se comuniquen de forma asíncrona y desacoplada, y reparte el trabajo pesado entre varios consumidores.

**Productor y consumidor:** el productor envía los mensajes y el consumidor los recibe y los procesa.

**Cola (queue):** es donde se guardan los mensajes hasta que un consumidor los procesa, lo que evita perderlos si el servicio está caído.

**Cuándo usarlo:** en tareas pesadas o lentas que no deben bloquear al usuario (enviar correos, generar reportes), en la comunicación entre microservicios, y para absorber picos de tráfico procesando poco a poco.

**Cuándo no usarlo:** si necesitas la respuesta inmediata (ahí basta una llamada HTTP directa) o en aplicaciones pequeñas donde agrega complejidad innecesaria.

## ¿Cuál es la diferencia entre IQueryable, IEnumerable e ICollection en .NET y cuándo usar cada uno?

**IEnumerable:** representa una secuencia que solo se puede recorrer (foreach). Los filtros se aplican en memoria, es decir, primero se traen los datos y luego se filtran. Úsalo para recorrer o filtrar datos que ya están cargados.

**ICollection:** es un IEnumerable que además permite contar elementos y agregarlos, quitarlos o limpiarlos (Count, Add, Remove). Úsalo cuando necesites modificar la colección o conocer su tamaño, como en las propiedades de navegación de las entidades.

**IQueryable:** representa una consulta que aún no se ejecuta; los filtros se traducen a SQL y se aplican en la base de datos, trayendo solo lo necesario. Úsalo para consultar con Entity Framework antes de traer los datos.

**Diferencia clave:** con IQueryable el filtro se ejecuta en la base de datos; con IEnumerable se ejecuta en memoria, después de traer todo, lo que puede ser mucho más lento.

**Regla práctica:** construir la consulta con IQueryable en el repositorio, ejecutarla con ToList() y devolver IEnumerable o ICollection hacia las capas superiores.

## ¿Qué es el CLR en .NET y para qué sirve?

**CLR (Common Language Runtime):** es el motor que ejecuta las aplicaciones .NET. Toma el código ya compilado (IL, un lenguaje intermedio), lo convierte a código de máquina al momento de ejecutarlo (compilación JIT) y se encarga de que corra de forma segura y administrada.

**Gestión de memoria:** incluye el Garbage Collector, que libera automáticamente la memoria que ya no se usa.

**Seguridad de tipos y excepciones:** verifica que el código sea seguro y maneja los errores de forma uniforme.

## ¿Qué es Entity Framework y para qué sirve, y cuándo conviene o no usar un ORM como EF?

**Entity Framework (EF):** es el ORM oficial de Microsoft para .NET. Conecta tus clases C# (entidades) con las tablas de la base de datos y traduce el código LINQ a consultas SQL automáticamente, para que no tengas que escribirlas a mano.

**Para qué sirve:** consultar y guardar datos usando objetos, mantener el esquema de la base de datos versionado con migraciones y reducir mucho el código repetitivo de acceso a datos.

**Cuándo conviene usar EF:** en aplicaciones de negocio con operaciones CRUD, cuando quieres desarrollar rápido, mantener el código limpio, evitar inyecciones SQL (parametriza las consultas por defecto) y manejar cambios del esquema con migraciones.

**Cuándo no conviene:** en consultas muy complejas o reportes pesados, en procesos masivos de inserción o actualización (miles de registros) y en sistemas donde el rendimiento es crítico, porque el SQL generado puede no ser óptimo.

**Alternativa:** usar Dapper (micro-ORM más rápido y con SQL escrito a mano) o procedimientos almacenados para esos casos puntuales.

**Combinación común:** EF para el CRUD del día a día y Dapper o SQL directo solo en las consultas críticas de rendimiento.
