# Security

**Inyección SQL:** Es un ataque donde el usuario escribe código SQL malicioso en un campo (ej. un login) y la base de datos lo ejecuta como si fuera parte de la consulta, pudiendo leer, modificar o borrar datos.

**XSS (Cross-Site Scripting):** Es un ataque donde se inyecta código JavaScript malicioso en una página, y se ejecuta en el navegador de otros usuarios, pudiendo robar sesiones o datos.

**Cómo evitarlas en una API REST:**

Consultas parametrizadas: nunca concatenar texto del usuario en el SQL; pasar los valores como parámetros.

Usar un ORM: como Entity Framework, que parametriza las consultas por defecto.

Validar entradas: verificar tipo, longitud y formato de cada dato que llega.

Escapar/sanear salidas: convertir caracteres como < y > en texto seguro antes de mostrarlos (contra XSS).

Mínimos privilegios: el usuario de la base de datos solo debe tener los permisos que necesita.

## Que otros tipos de metodos de seguridad ud implementería en una API para evitar ataques deseados o errores sin querer por parte de usuarios?

**Manejo de errores seguro**: devolver mensajes genéricos al cliente (ej. “Error interno”) y guardar el detalle técnico solo en los logs, para no revelar información del sistema.

**Logs y monitoreo**: registrar accesos e intentos fallidos para detectar comportamientos sospechosos y poder investigar incidentes.

**Límites en las peticiones**: restringir el tamaño del cuerpo y paginar los resultados, para evitar abusos y consultas accidentales demasiado pesadas.

**Hash de contraseñas y secretos protegidos**: guardar contraseñas con bcrypt (nunca en texto plano) y las claves en variables de entorno o un gestor de secretos.

**WAF / API Gateway**: una capa frente a la API que filtra tráfico malicioso, centraliza la autenticación y aplica límites.

## Como implementa JWT en el backend de una API y como lo maneja desde el front?

Un JWT es un token firmado que el servidor entrega al hacer login y que el cliente envía en cada petición para demostrar quién es.

En el **backend**:

Login: valida usuario y contraseña, y si son correctos genera un JWT firmado con una clave secreta, con datos del usuario (id, rol) y fecha de expiración.

Middleware de autenticación: en cada petición lee el token del header Authorization: Bearer <token>, verifica la firma y la expiración, y rechaza con 401 si es inválido.

Autorización: usa los datos del token (ej. el rol) para permitir o negar acceso a cada endpoint (403 si no tiene permiso).

Expiración corta + refresh token: el token de acceso dura poco (ej. 15 min) y un refresh token permite renovarlo sin volver a iniciar sesión.

En el **front**:

Guardar el token: lo recibe al hacer login y lo almacena. Lo más seguro es una cookie HttpOnly; localStorage es más simple pero vulnerable a XSS.

Enviarlo en cada petición: normalmente con un interceptor (ej. Axios en React, HttpInterceptor en Angular) que agrega el header Authorization.

Manejar la expiración: si la API responde 401, intenta renovar con el refresh token; si falla, cierra sesión y redirige al login.

Proteger rutas: usa guards o rutas privadas para impedir el acceso a pantallas si no hay sesión (esto mejora la UX, la seguridad real siempre está en el backend).

## Como es la estructura de un JWT y que tiempos sugiere para autenticacion y para el refresh token, además como manejaría un refresh token?

Estructura de un JWT: Son tres partes separadas por puntos: header.payload.signature.

**Header**: el algoritmo de firma.

**Payload**: los datos (claims): id de usuario, rol, fecha de expiración (exp). **Va codificado, no cifrado, así que nunca guardar contraseñas ni datos sensibles.**

**Signature**: la firma con la clave secreta; garantiza que el token no fue modificado.

Tiempos sugeridos:

Access token: corto, entre 5 y 15 minutos, para limitar el daño si es robado.

Refresh token: largo, entre 7 y 30 días, según qué tan sensible sea la aplicación.

Cómo manejar un refresh token:

Guardarlo en el servidor: en base de datos (idealmente hasheado), asociado al usuario y al dispositivo, para poder revocarlo.

Enviarlo al cliente en cookie HttpOnly: así el JavaScript del front no puede leerlo.

Endpoint de renovación: el cliente lo envía, el servidor lo valida y devuelve un nuevo access token.

Rotación: en cada uso se entrega un refresh token nuevo y el anterior se invalida; si alguien reutiliza uno viejo, se revocan todos los de ese usuario.

Revocación en logout: al cerrar sesión se elimina de la base de datos.

## ¿Qué es XSS y cómo lo evitarías en una API o en un front?

**XSS (Cross-Site Scripting):** es un ataque donde alguien inyecta código JavaScript malicioso en una página, y ese código se ejecuta en el navegador de otros usuarios, pudiendo robar sesiones, tokens o datos.

**Escapar la salida:** convertir caracteres como < y > en texto seguro antes de mostrarlos, para que el navegador los trate como texto y no como código.

**Aprovechar el framework:** Angular y React escapan el contenido por defecto, así que hay que evitar saltarse esa protección con innerHTML, dangerouslySetInnerHTML o bypassSecurityTrust.

**Validar y sanear en la API:** nunca confiar en lo que envía el cliente; validar formato y limpiar el HTML si se permite contenido enriquecido (con librerías como DOMPurify).

**Content Security Policy (CSP):** un header que limita desde dónde se pueden cargar y ejecutar scripts, para frenar los que no sean de confianza.

**Cookies HttpOnly:** guardar la sesión o el refresh token en cookies que JavaScript no puede leer, para que un XSS no pueda robarlos.

**Headers de seguridad:** usar Helmet (en Node) o equivalentes en .NET para activar protecciones adicionales del navegador.
