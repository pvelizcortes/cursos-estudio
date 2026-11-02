# SQL

**Table Scan**: Recorrer todos los registros de la tabla

## ¿Qué es un indice en base de datos, para que sirve y en que casos lo aplicaría?

**Qué es:** Un índice es una estructura auxiliar que la base de datos mantiene ordenada sobre una o más columnas. Funciona como el índice de un libro: en vez de leer todas las páginas, vas directo a la que buscas.

**Para qué sirve:** Acelera las búsquedas (SELECT), evitando recorrer toda la tabla fila por fila. A cambio, ocupa espacio y hace más lentos los INSERT, UPDATE y DELETE.

**Cuándo aplicarlo:**

**Columnas en WHERE:** las que filtras con frecuencia (ej. email, estado).

**Columnas en JOIN:** sobre todo las claves foráneas.

**Columnas en ORDER BY / GROUP BY:** para evitar ordenar en memoria.

**Tablas grandes con muchas lecturas:** donde el escaneo completo es costoso.

**Cuándo evitarlo:** tablas pequeñas, columnas con pocos valores distintos (ej. sexo, booleanos) o tablas con muchas escrituras y pocas lecturas.

## ¿Conviene indexar la columna PK id de una tabla con muchos miles de registros?

**No hace falta hacerlo manualmente:** la clave primaria (PK) ya crea automáticamente un índice único sobre esa columna, así que id ya está indexado.

**Qué hacer en cambio:** indexar las otras columnas que se usan seguido en WHERE, JOIN y ORDER BY (como claves foráneas).

**Cuidado:** crear un índice extra sobre la PK solo duplica el trabajo, ocupa espacio y ralentiza las escrituras sin dar ningún beneficio.

**La otra cara de la moneda (El costo de los índices)**

Aunque son vitales para el rendimiento, no hay que ponerle un índice a cada columna, ya que tienen un costo:

**Escrituras más lentas (INSERT, UPDATE, DELETE):** Cada vez que agregas, modificas o borras un registro, la base de datos no solo debe actualizar la tabla, sino también actualizar el índice para mantenerlo al día.

**Espacio en disco**: Los índices ocupan almacenamiento adicional en el servidor.

## Si una consulta SQL está lenta, ¿dónde mirarías y qué buscarías para mejorarla?

Primero mido y luego optimizo:

**Plan de ejecución:** reviso el EXPLAIN (o el plan de ejecución en SQL Server) para ver dónde se va el tiempo, buscando escaneos completos de tabla (table scan) en lugar de usar índices.

**Índices:** verifico que existan en las columnas usadas en WHERE, JOIN y ORDER BY, y que realmente se estén usando.

**Columnas y filas:** evito SELECT *, traigo solo lo necesario y filtro lo antes posible para reducir filas.

**Joins y subconsultas:** reviso que los JOIN sean necesarios y que las subconsultas no se ejecuten una y otra vez; a veces conviene reescribirlas.

**Funciones en el WHERE:** evito aplicar funciones sobre columnas indexadas (como WHERE YEAR(fecha) = 2026), porque impiden usar el índice.

**Estadísticas y volumen de datos:** confirmo que las estadísticas estén actualizadas y evalúo paginación, particionado o archivado si la tabla es enorme.

## ¿Qué es el plan de ejecución (EXPLAIN) en SQL y para qué sirve?

**Plan de ejecución:** es el “mapa” que la base de datos arma para decidir cómo va a ejecutar una consulta: qué índices usa, en qué orden une las tablas y cuántas filas estima revisar. Con EXPLAIN lo puedes ver sin adivinar, y así detectar dónde está el cuello de botella, como un escaneo completo de tabla o un índice que no se usa.
