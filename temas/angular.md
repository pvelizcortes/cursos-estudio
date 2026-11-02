# Angular

## ¿Cuáles son los decoradores más usados en Angular y para qué sirve cada uno?

**Decoradores:** son anotaciones con @ que le dan a una clase o propiedad un significado especial dentro de Angular.

**@Component:** define un componente, es decir, un bloque de la interfaz con su plantilla HTML, estilos y lógica.

**@Injectable:** marca una clase (normalmente un servicio) para que pueda inyectarse en otras mediante inyección de dependencias.

**@NgModule:** agrupa componentes, directivas y servicios en un módulo (en versiones recientes se usa menos gracias a los componentes standalone).

**@Input:** permite que un componente reciba datos desde su componente padre.

**@Output:** permite que un componente envíe eventos a su componente padre (junto con EventEmitter).

**@Directive:** crea directivas personalizadas que modifican el comportamiento o la apariencia de elementos del DOM.

**@Pipe:** crea pipes personalizados para transformar datos en la plantilla (por ejemplo, formatear fechas o textos).

**@ViewChild:** permite acceder desde la clase a un elemento o componente hijo de la plantilla.

**@HostListener:** escucha eventos del elemento anfitrión (como un clic o una tecla) dentro de un componente o directiva.

## ¿Qué es un interceptor en Angular y para qué se usa?

**Interceptor:** es una pieza de código que se ubica en medio de las peticiones HTTP del front y las respuestas del servidor, y permite revisarlas o modificarlas antes de que lleguen a su destino, sin repetir lógica en cada llamada.

**Agregar el token JWT:** añade automáticamente el header Authorization a cada petición saliente, para no hacerlo manualmente en cada servicio.

**Manejo global de errores:** captura respuestas con error (como 401 o 500) en un solo lugar, para redirigir al login o mostrar un mensaje al usuario.

**Renovar el token:** si la API responde 401, intenta renovar la sesión con el refresh token y repite la petición.

**Indicador de carga y logs:** muestra o esconde un loading durante las peticiones y registra información de las llamadas.

## ¿Cómo manejas los errores HTTP en Angular?

**Interceptor global:** captura los errores de todas las peticiones en un solo lugar

**Operador catchError (RxJS):** se usa en el servicio o en el interceptor para atrapar el error de la petición y decidir qué hacer con él (mostrar un mensaje, reintentar o devolver un valor por defecto).

**Según el código de estado:** 401 redirige al login o renueva el token, 403 muestra falta de permisos, 404 recurso no encontrado y 500 un mensaje genérico de error del servidor.

**Mensajes al usuario:** mostrar avisos claros y amigables (toast o alerta) sin exponer detalles técnicos del error.

**Reintentos:** con el operador retry se pueden repetir peticiones fallidas por problemas temporales de red.

**Registro de errores:** enviar el detalle técnico a un servicio de logs para poder investigarlo después.

## ¿Qué es RxJS y cuándo utilizarlo?

**RxJS:** es una librería de JavaScript para manejar datos asíncronos (peticiones HTTP, eventos, temporizadores) como flujos que llamamos Observables. Funciona como una suscripción: te suscribes a un flujo y vas recibiendo los datos a medida que llegan.

**Observable:** representa un flujo de datos en el tiempo al que te suscribes con subscribe, y que puede emitir varios valores, un error o terminar.

**Operadores:** son funciones para transformar y combinar esos flujos (map, filter, switchMap, catchError, debounceTime).

**Cuándo usarlo:** en peticiones HTTP (Angular las devuelve como Observables), formularios reactivos, eventos del usuario (como un buscador con debounceTime) y cuando necesitas combinar o cancelar varias operaciones asíncronas.

**Cuándo no usarlo:** para una operación asíncrona simple y única, donde async/await con Promesas es más directo.

**Importante:** hay que desuscribirse de los Observables que no terminan (con unsubscribe o el pipe async) para evitar fugas de memoria.

## ¿Qué diferencia hay entre callbacks, promesas y Observables de RxJS en AngularJS, y cuándo conviene cada uno?

**Aclaración:** en AngularJS (1.x) lo nativo son los callbacks y las promesas ($q y $http). Los Observables de RxJS son del Angular moderno; en AngularJS solo se usarían agregando una librería extra, algo poco común.

**Callback:** es una función que se pasa como argumento para que se ejecute cuando termine una operación. Funciona para casos simples, pero al encadenar varias operaciones se anidan y se vuelve difícil de leer (callback hell).

**Promesa:** representa un resultado que llegará en el futuro, y se maneja con .then() para el éxito y .catch() para el error. Se pueden encadenar y combinar con $q.all, lo que da código más limpio que los callbacks. Emite un solo valor y no se puede cancelar.

**Observable (RxJS):** es un flujo de datos en el tiempo al que te suscribes. Puede emitir varios valores, cancelarse y transformarse con operadores como map o debounceTime.

**Cuándo usar callbacks:** en eventos simples o librerías antiguas que ya los exigen.

**Cuándo usar promesas:** en AngularJS, para casi todo lo asíncrono, como llamadas a la API con $http, porque es lo nativo y lo más claro.

**Cuándo usar Observables:** en Angular moderno, o cuando necesitas varios valores en el tiempo, cancelación o transformar flujos, como un buscador en vivo.
