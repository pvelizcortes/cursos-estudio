# NodeJS

## ¿Cómo estructurarías y construirías una API REST en Node.js con NestJS, paso a paso y con qué medidas de seguridad?

Lo haría en este orden:

**Proyecto y arquitectura:** creo el proyecto con NestJS CLI y lo organizo en módulos (Controllers, Services, Repositories), porque su arquitectura modular separa responsabilidades y mantiene el código ordenado y escalable.

**Base de datos y acceso a datos:** uso TypeORM o Prisma con migraciones, porque evitan escribir SQL a mano, parametrizan las consultas y versionan los cambios del esquema.

**Endpoints REST:** defino recursos con decoradores (@Controller, @Get, @Post) y los códigos de estado correctos, porque es el estándar y deja las rutas claras y fáciles de consumir.

**DTOs y validación:** uso DTOs con class-validator y ValidationPipe global, porque no confío en lo que envía el cliente y evito exponer datos internos.

**Inyección de dependencias:** uso el sistema nativo de NestJS con @Injectable, porque reduce el acoplamiento y facilita las pruebas con mocks.

**Seguridad:** HTTPS, autenticación con JWT (@nestjs/jwt y Passport), autorización con Guards y roles, CORS restringido, Helmet, rate limiting (@nestjs/throttler), contraseñas con bcrypt y secretos en variables de entorno, porque protege los datos y controla quién accede a qué.

**Manejo de errores y logs:** Exception Filters globales y un logger como Winston o Pino, porque devuelven errores genéricos al cliente y dejan el detalle técnico para investigar.

**Documentación y versionado:** Swagger con @nestjs/swagger y versionado de la API, porque facilita que otros equipos la usen y permite evolucionarla sin romper clientes.

**Pruebas:** pruebas unitarias y e2e con Jest y Supertest (ya vienen integrados), porque detectan errores antes de llegar a producción.

**CI/CD y despliegue:** pipeline que instala, prueba, compila y despliega (idealmente con Docker), porque automatiza las entregas y las hace repetibles y seguras.

## ¿Cuál es la diferencia entre un Guard y un Middleware en NodeJS, para qué sirve cada uno y en qué casos conviene usar cada uno?

Aclaración: el Middleware existe en Node con Express, pero el Guard es un concepto de NestJS

**Middleware**: función que se ejecuta en medio de la petición, antes del controlador. Lee o modifica la petición y la respuesta, y decide si continúa con next(). Sirve para tareas generales como logs, parseo de JSON, CORS y manejo de errores.

**Guard**: clase que decide una sola cosa: si la petición puede continuar o no (true o false). Sirve para autorización: verificar roles, permisos o que el usuario esté autenticado (AuthGuard, RolesGuard).

**Diferencia en propósito**: el middleware hace tareas generales sobre la petición; el guard solo permite o bloquea el acceso.

**Diferencia en orden**: en NestJS primero se ejecutan los middlewares y después los guards.

**Usar Middleware cuando**: la tarea aplica a todas o muchas rutas, cuando necesitas modificar la petición o respuesta

**Usar Guard** cuando: necesitas proteger solo ciertos endpoints, validar roles y permisos con decoradores, o verificar el JWT en NestJS.

## ¿Qué es cada pieza en NestJS (módulos, controladores, servicios, entidades, pipes, guards y middleware) y para qué sirve?

**Aclaración sobre “component”:** en NestJS no existe el componente (eso es de Angular y React). El equivalente es el Controller, que es el que recibe las peticiones.

**Module:** es una caja que agrupa piezas relacionadas (controlador, servicio, entidad) de una misma funcionalidad, como el módulo de usuarios. Sirve para organizar la aplicación en partes independientes.

**Controller:** recibe la petición HTTP, llama al servicio y devuelve la respuesta. Sirve para definir las rutas (@Get, @Post) sin meter lógica de negocio.

**Service:** contiene la lógica de negocio. Sirve para que los controladores queden simples y para reutilizar la lógica; se inyecta con @Injectable.

**Entity:** es la clase que representa una tabla de la base de datos. Sirve para que el ORM (TypeORM o Prisma) sepa cómo guardar y leer los datos.

**Pipe:** transforma o valida los datos que llegan antes de entrar al controlador. Sirve, por ejemplo, para convertir un texto en número o rechazar datos inválidos (ValidationPipe).

**Guard:** decide si la petición puede continuar o no. Sirve para proteger rutas verificando autenticación y roles (AuthGuard, RolesGuard).

**Middleware:** función que se ejecuta antes de llegar al controlador y puede modificar la petición o respuesta. Sirve para tareas generales como logs, CORS o parseo del body.

## ¿Cuáles son los decoradores más usados en NestJS y para qué sirve cada uno?

**@Module:** define un módulo y agrupa sus controladores, servicios e imports.

**@Controller:** marca una clase como controlador y define la ruta base (por ejemplo, @Controller('users')).

**@Get, @Post, @Put, @Delete:** definen qué método HTTP atiende cada función del controlador.

**@Injectable:** marca una clase (normalmente un servicio) para que pueda inyectarse en otras mediante inyección de dependencias.

**@Body, @Param, @Query:** extraen datos de la petición: el cuerpo, los parámetros de la URL (/users/5) y los parámetros de consulta (?page=2).

**@UseGuards:** aplica uno o varios guards a una ruta o controlador, para proteger el acceso.

**@UsePipes:** aplica pipes para validar o transformar datos de entrada.

**@Entity y @Column:** definen la tabla y sus columnas en el ORM (TypeORM).

**@Inject:** inyecta una dependencia específica por su token, cuando la inyección automática por tipo no basta.

**@HttpCode:** define el código de estado que devuelve una ruta (por ejemplo, 201).
