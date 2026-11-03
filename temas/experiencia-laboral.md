# Experiencia Laboral

**.NET Framework :**

3.0: ADO.NET 2.0. Utiliza el CLR

3.5: Una de las versiones más importantes y usadas de la historia. Introdujo **LINQ**

4.5: Gran enfoque en la web y la asincronía con las palabras clave async y await en C#

4.8:

**Thinxsys**

Legacy, AngularJS, Jquery, Ajax, ASPX

**Izytech**

**.NET 5 y 6 , APIS REST, Entity Framework, Linq, Migrations, JWT**

**Emerios**

**.NET 4.5 , Hibernate, Dapper, JWT, APIS REST**

## ¿De qué forma se consume una API REST de .NET desde AngularJS (1.x)?

**$http:** es el servicio nativo de AngularJS para hacer peticiones HTTP ($http.get, $http.post, $http.put, $http.delete). Devuelve una promesa, a la que se le asigna .then() para recibir la respuesta y .catch() para el error.

**Servicio o factory:** creo un service o factory que concentra las llamadas a la API, y los controladores lo inyectan, para no repetir lógica ni mezclarla con la vista.

**URL base en una constante:** guardo la dirección de la API con .constant(), para cambiarla fácilmente entre desarrollo y producción.

**Interceptor $httpProvider.interceptors:** agrega el token JWT a cada petición y maneja errores globales como 401 o 500.

**CORS:** la API .NET debe permitir el dominio del front en su configuración de CORS, o el navegador bloqueará las peticiones.

**Mostrar los datos:** el resultado se asigna al $scope (o a controllerAs) y se muestra en la vista con directivas como ng-repeat

## ¿Qué experiencia tenés con APIs REST en .NET?
Mi experiencia más completa y directa con APIs REST fue en Izytech, desarrollando en .NET y consumiendo esas APIs desde un front en Angular.

**Hosting:** las APIs estaban alojadas en una instancia EC2 de AWS, sobre una máquina virtual con Windows e IIS como servidor web.

**Consumo:** el front en Angular hacía las llamadas HTTP a los endpoints de la API.

**Gestión de documentos:** para el manejo de archivos usé el SDK de AWS para S3 desde la API.

## ¿Qué experiencia tenés con APIs REST en NodeJS?
Creé una API REST con NodeJS y la desplegué en AWS Lambda, expuesta a través de API Gateway.

**Ventaja de Lambda:** no hay servidores que administrar; la función se ejecuta solo cuando llega una petición.

**Rol de API Gateway:** recibe las peticiones HTTP y las dirige a la función correspondiente.

## ¿Qué experiencia tenés en Emerios?
En Emerios la API REST corría sobre servicios de EC2 detrás de un Application Load Balancer (ALB), que reparte el tráfico entre las instancias.

**Servicios dockerizados:** además de la API, teníamos servicios en contenedores. Por ejemplo, RabbitMQ corría en ECS, y las imágenes de los contenedores se guardaban en ECR.

**ECS y ECR:** ECS es el servicio que ejecuta y orquesta los contenedores; ECR es el registro donde se almacenan esas imágenes de Docker.
