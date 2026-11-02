# APIS

**Qué es una API REST:** Una API REST es un puente de comunicación que permite que diferentes se comuniquen entre sí. REST: todo es un “recurso” (usuarios, productos) identificado por una URL, que se maneja con los verbos HTTP (GET, POST, PUT, DELETE) y envía datos en formato JSON. Cada petición es independiente: el servidor no recuerda las anteriores (stateless).

## ¿De qué forma expone una API REST sus recursos al cliente?

**Endpoints (URLs):** cada recurso (usuarios, productos) se expone con una URL propia, por ejemplo /users para la colección y /users/5 para un elemento.

**Verbos HTTP:** el cliente indica qué quiere hacer con el recurso: GET para leer, POST para crear, PUT o PATCH para actualizar y DELETE para borrar.

**Formato de datos:** el recurso viaja normalmente en JSON, tanto en la petición como en la respuesta.

**Códigos de estado:** la API responde con códigos HTTP que indican el resultado (200 éxito, 201 creado, 400 error del cliente, 404 no encontrado, 500 error del servidor).

**DTOs:** se expone una versión controlada del recurso, no la entidad interna de la base de datos, para no revelar datos sensibles.

## Que tipo de seguridad ud implementaría para una API REST?

**HTTPS**: cifra toda la comunicación para que nadie pueda interceptar los datos.

**Autenticación** (JWT u OAuth2): verifica quién es el usuario mediante un token que se envía en cada petición.

**Autorización** (roles y permisos): controla qué puede hacer cada usuario una vez identificado.

**Validación de datos**: nunca confiar en lo que llega del cliente; validar y sanear las entradas para evitar inyecciones (SQL, XSS).

**Rate limiting y CORS**: limita la cantidad de peticiones por usuario para frenar abusos y restringe qué dominios pueden consumir la API.

## ¿Cómo estructurarías y construirías una API REST en .NET, paso a paso y con qué medidas de seguridad?

Lo haría en este orden:

**Proyecto y arquitectura:** creo una Web API con ASP.NET Core separada en capas (Controllers, Services, Repositories, Models), porque separa responsabilidades y hace el código más mantenible y fácil de probar.

**Base de datos y acceso a datos:** uso Entity Framework Core con migraciones, porque evita escribir SQL a mano, parametriza las consultas y versiona los cambios del esquema.

**Endpoints REST:** defino recursos con URLs claras y verbos HTTP correctos (GET, POST, PUT, DELETE) con códigos de estado adecuados, porque es el estándar y facilita el consumo de la API.

**DTOs y validación:** expongo DTOs en vez de las entidades y valido con Data Annotations o FluentValidation, porque no expongo datos internos y no confío en lo que envía el cliente.

**Inyección de dependencias:** registro los servicios en el contenedor de ASP.NET Core, porque reduce el acoplamiento y permite hacer pruebas con mocks.

**Seguridad:** HTTPS, autenticación con JWT, autorización por roles, CORS restringido, contraseñas con hash y secretos fuera del código, porque protege los datos y controla quién accede a qué.

**Manejo de errores y logs:** un middleware global de excepciones y logging con Serilog, porque devuelve errores genéricos al cliente y deja el detalle técnico para investigar.

**Documentación y versionado:** Swagger/OpenAPI y versionado de la API, porque facilita que otros equipos la usen y permite evolucionarla sin romper clientes.

**Pruebas:** pruebas unitarias con xUnit y de integración, porque detectan errores antes de llegar a producción.

**CI/CD y despliegue:** pipeline que compila, prueba y despliega (idealmente con Docker), porque automatiza las entregas y las hace repetibles y seguras.

## ¿Cuáles son los códigos de estado HTTP más usados en las APIs y para qué sirve cada uno?

**Qué son:** números que el servidor devuelve para indicar el resultado de una petición, agrupados por familias: 2xx éxito, 3xx redirección, 4xx error del cliente y 5xx error del servidor.

**200 OK:** la petición fue exitosa y se devuelve el resultado (típico en GET, PUT).

**201 Created:** se creó un recurso correctamente (típico en POST).

**204 No Content:** la operación fue exitosa pero no hay contenido que devolver (típico en DELETE).

**400 Bad Request:** la petición es inválida, por datos mal formados o validaciones que fallan.

**401 Unauthorized:** el usuario no está autenticado o el token es inválido o expiró.

**403 Forbidden:** el usuario está autenticado pero no tiene permiso para ese recurso.

**404 Not Found:** el recurso solicitado no existe.

**409 Conflict:** la petición choca con el estado actual (por ejemplo, un registro duplicado).

**500 Internal Server Error:** error inesperado en el servidor.

**503 Service Unavailable:** el servicio no está disponible temporalmente (sobrecarga o mantenimiento).
