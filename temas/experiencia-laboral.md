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
