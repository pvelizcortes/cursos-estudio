# AWS

## ¿Qué es AWS Lambda, qué es API Gateway y cómo se relacionan?

**Lambda:** es un servicio que ejecuta tu código sin que administres servidores. El código corre solo cuando algo lo activa y pagas únicamente por el tiempo que se ejecuta.

**API Gateway:** es la puerta de entrada pública de tu API. Recibe las peticiones HTTP de los clientes, les da una URL y puede manejar seguridad, límites de peticiones y rutas.

**Cómo se relacionan:** API Gateway recibe la petición del cliente y se la pasa a Lambda para que la procese; luego Lambda devuelve la respuesta y API Gateway se la entrega al cliente. Lambda es el cerebro que ejecuta la lógica y API Gateway es la puerta que la expone a internet.

## ¿Qué es IAM en AWS y para qué sirve?

**IAM (Identity and Access Management):** es el servicio de AWS que controla quién puede acceder a qué. Sirve para dar permisos precisos a personas y servicios, aplicando el mínimo privilegio, es decir, solo lo necesario para hacer su trabajo.

**Usuarios:** representan a las personas que entran a AWS, cada una con sus credenciales.

**Grupos:** conjuntos de usuarios que comparten los mismos permisos (por ejemplo, desarrolladores).

**Roles:** identidades que asumen los servicios (como Lambda o ECS) para acceder a otros recursos, sin usar contraseñas ni claves fijas.

**Políticas:** documentos que definen qué acciones están permitidas o denegadas sobre qué recursos, y se asignan a usuarios, grupos o roles.

## ¿Has llevado una API REST en .NET a AWS Lambda? Cuéntame tu experiencia.

**Contexto:** sí, tenía una API REST en .NET y la llevé a Lambda haciendo lo justo y necesario para poder consumirla. No me considero experto en AWS.

**Adaptación:** usé el SDK de Lambda para .NET, para que la misma API corriera sin reescribirla.

**Despliegue y acceso:** la desplegué y la conecté a API Gateway con un proxy para tener una URL pública y poder consumirla.

**Configuración y revisión:** configuré lo básico (permisos y variables de entorno

**Lo que no he profundizado:** optimización de rendimiento, infraestructura como código y redes avanzadas.

**Cierre:** entiendo el flujo general y me siento cómodo aprendiendo el resto si el proyecto lo requiere.

## ¿Has desplegado una API REST en Node.js en AWS Lambda? Cuéntame tu experiencia.

**Contexto**: sí, tenía una API REST en Node.js y la llevé a Lambda haciendo lo justo y necesario para poder consumirla. No me considero experto en AWS.

**Adaptación**: usé un adaptador que permite que la misma API corra en Lambda sin reescribirla.

Despliegue y acceso: la desplegué y la conecté a API Gateway con un proxy para tener una URL pública y poder consumirla.

**Configuración y revisión**: configuré lo básico (permisos y variables de entorno)

**Lo que no he profundizado**: optimización de rendimiento, infraestructura como código y redes avanzadas.

**Cierre**: entiendo el flujo general y me siento cómodo aprendiendo el resto si el proyecto lo requiere.

## ¿Qué son los servicios de AWS IAM, S3, RDS, Lambda, API Gateway, ECS, ECR y Fargate, y para qué sirve cada uno?

**IAM:** controla quién puede acceder a qué en AWS, mediante usuarios, roles y políticas con el mínimo privilegio necesario.

**S3:** almacenamiento de archivos en la nube (imágenes, documentos, respaldos, sitios estáticos), muy duradero y de bajo costo.

**RDS:** base de datos relacional administrada (SQL Server, PostgreSQL, MySQL), donde AWS se encarga de respaldos, actualizaciones y disponibilidad.

**Lambda:** ejecuta código sin administrar servidores; corre solo cuando algo lo activa y pagas únicamente por el tiempo de ejecución.

**API Gateway:** puerta de entrada pública de una API; recibe las peticiones HTTP, las enruta (por ejemplo, a Lambda) y puede manejar seguridad y límites de peticiones.

**ECS:** servicio que orquesta y administra contenedores Docker, decidiendo dónde y cuántos se ejecutan.

**ECR:** registro donde se almacenan las imágenes Docker, desde donde ECS las toma para ejecutarlas.

**Fargate:** forma de ejecutar contenedores en ECS sin administrar servidores; tú defines CPU y memoria y AWS se encarga de la infraestructura.

## ¿Cómo desplegarías en AWS una API REST en Node.js o .NET, y qué servicios utilizarías?

**Opción principal, contenedores:** dockerizo la API (funciona igual para Node.js y .NET), porque el entorno queda idéntico en desarrollo y producción.

**ECR:** guarda la imagen Docker de la API.

**ECS con Fargate:** toma la imagen de ECR y la ejecuta sin administrar servidores, escalando según la demanda.

**Application Load Balancer:** recibe el tráfico, lo reparte entre los contenedores y termina el HTTPS con un certificado de ACM.

**RDS:** base de datos administrada, en subredes privadas para que no quede expuesta a internet.

**Secrets Manager:** guarda las cadenas de conexión y claves, para no dejarlas en el código.

**IAM:** roles con el mínimo privilegio para que la API acceda solo a lo que necesita.

**VPC y Security Groups:** aíslan la red y controlan qué tráfico puede entrar y salir.

**CloudWatch:** logs y alarmas para monitorear la API.

**CI/CD:** un pipeline (por ejemplo, GitHub Actions) que construye la imagen, la sube a ECR y actualiza el servicio en ECS.

**Alternativa serverless:** si la API es pequeña y con poco tráfico, uso Lambda con API Gateway (con ruta proxy), porque pago solo por uso y no administro contenedores.

## ¿Cómo desplegarías una API REST en AWS (ECR y ECS con Fargate) usando GitHub Actions?

**Archivo del workflow:** creo un archivo YAML en .github/workflows que define el pipeline y se dispara con un push a main (o al aprobar un PR), para que el despliegue sea automático.

**Etapa de CI:** el pipeline hace checkout del código, instala dependencias, ejecuta linters y pruebas, y compila la API, para que no llegue código roto a producción.

**Credenciales seguras:** AWS se autentica con un rol de IAM mediante OIDC (o con claves guardadas en GitHub Secrets), nunca con credenciales en el repositorio.

**Construir la imagen:** el pipeline construye la imagen Docker de la API y la etiqueta con el identificador del commit, para saber siempre qué versión está desplegada.

**Subir a ECR:** inicia sesión en ECR y publica la imagen, para que ECS pueda tomarla.

**Desplegar en ECS:** actualiza la definición de la tarea con la nueva imagen y la aplica al servicio de ECS (Fargate), que reemplaza los contenedores sin interrumpir el servicio.

**Ambientes y aprobación:** uso environments de GitHub para separar desarrollo y producción, con aprobación manual antes de desplegar a producción.

**Verificación:** el pipeline espera a que el servicio quede estable y, si falla, se revierte a la versión anterior o se notifica al equipo.

## ¿Qué servicios de AWS usarías para desplegar una API REST pequeña de una aplicación nueva, y cuáles para una API grande empresarial con alta concurrencia?

**API pequeña, opción principal:** Lambda con API Gateway (con ruta proxy), porque pagas solo por uso, no administras servidores y con poco tráfico el costo es casi cero.

**API pequeña, alternativas simples:** App Runner o Elastic Beanstalk, si prefieres subir el código o un contenedor y que AWS gestione el resto sin configurar redes ni clústeres.

**API pequeña, base de datos:** RDS en su tamaño mínimo (o DynamoDB si el modelo lo permite), porque es administrada y evita montar una base de datos propia.

**Por qué empezar simple:** reduce costo y complejidad mientras el producto valida su idea, y se puede migrar después sin reescribir la API.

**API grande, contenedores:** ECS con Fargate (o EKS si la empresa usa Kubernetes), con la imagen en ECR, porque da latencia estable y escala de forma controlada con tráfico constante y alto.

**API grande, entrada de tráfico:** Application Load Balancer con Auto Scaling, que reparte la carga y agrega o quita contenedores según la demanda, con el servicio distribuido en varias zonas de disponibilidad para alta disponibilidad.

**API grande, rendimiento:** CloudFront como CDN y ElastiCache (Redis) como caché, para reducir la carga sobre la API y la base de datos.

**API grande, base de datos:** RDS Multi-AZ o Aurora con réplicas de lectura, porque soporta más carga y se recupera automáticamente ante fallos.

**API grande, desacoplamiento:** SQS, SNS o EventBridge para procesar tareas pesadas de forma asíncrona y absorber picos de tráfico.

**API grande, seguridad y observabilidad:** WAF contra ataques, Secrets Manager, VPC con subredes privadas, IAM con mínimo privilegio y CloudWatch con alarmas para monitorear.

**Regla práctica:** empezar con Lambda y API Gateway por simplicidad y costo, y migrar a ECS con Fargate cuando el tráfico sea constante o alto.

## ¿Dónde se guardan los secretos en AWS y cómo se obtienen desde la aplicación?:
**Secrets Manager:** es el servicio para guardar secretos como contraseñas de bases de datos, claves de API y tokens. Los cifra con KMS, permite rotarlos automáticamente y controla el acceso con IAM.
**Parameter Store (Systems Manager):** es una alternativa más simple y económica para guardar configuración y secretos, pero sin rotación automática integrada.
**Cómo se obtienen:** la aplicación consulta el secreto en tiempo de ejecución usando el SDK de AWS, con el nombre del secreto, y recibe el valor ya descifrado.
**Permisos con IAM:** el rol asignado a la aplicación (Lambda, tarea de ECS) tiene permiso solo sobre los secretos que necesita, así no hay credenciales fijas en el código.
**Inyección en contenedores y Lambda:** ECS permite inyectar el secreto como variable de entorno al iniciar el contenedor, y en Lambda se lee con el SDK (idealmente guardándolo en caché para no consultarlo en cada llamada).
**Qué evitar:** dejar secretos en el código, en el repositorio o en archivos de configuración sin cifrar.
