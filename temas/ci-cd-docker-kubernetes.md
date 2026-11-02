# CI / CD – DOCKER – KUBERNETES

**Qué es CI/CD:** Es una forma de automatizar el camino del código desde que lo escribes hasta que llega a producción, para que subir cambios sea rápido, seguro y sin hacerlo a mano.

**CI (Integración Continua):** cada vez que un desarrollador sube código, se compila y se ejecutan las pruebas automáticamente. Sirve para detectar errores temprano y evitar que código roto se mezcle con el del equipo.

**CD (Entrega / Despliegue Continuo):** una vez que el código pasa las pruebas, se prepara y se despliega automáticamente al entorno (pruebas o producción). Sirve para publicar cambios con frecuencia y con menos riesgo.

**Diferencia clave en CD:** en Entrega Continua el código queda listo y alguien aprueba el despliegue manualmente; en Despliegue Continuo llega a producción solo, sin intervención.

## ¿Qué experiencia tienes con CI/CD y has creado pipelines o archivos YAML?

**Experiencia general:** sí, he creado pipelines de CI/CD con GitHub Actions escribiendo los archivos YAML en workflows, para automatizar la validación del código en cada cambio.

**Disparadores:** los configuro con on: push y on: pull_request sobre ramas como main y develop, para que cada PR se valide antes de mezclarse.

**Jobs y steps:** defino jobs con pasos de checkout, instalación de dependencias y ejecución de comandos, usando actions como actions/checkout y actions/setup-node.

**Linters y formato:** ejecuto ESLint y Prettier (o el analizador equivalente en .NET) para mantener un estilo de código consistente en todo el equipo.

**Pruebas y compilación:** corro pruebas unitarias y de integración (Jest, xUnit) y la compilación del proyecto, para detectar errores antes de llegar a producción. **Seguridad:** guardo credenciales y tokens en GitHub Secrets, nunca en el repositorio.

**Despliegue:** en el CD construyo la imagen Docker, la publico en un registro y despliego al entorno, con aprobación manual para producción.

**Protección de ramas:** configuro la rama principal para exigir que el pipeline pase en verde antes de aprobar un PR.

## ¿Qué es SonarQube y para qué sirve?

**SonarQube:** es una herramienta que analiza automáticamente el código fuente para medir su calidad y seguridad. Sirve para detectar errores (bugs), vulnerabilidades, código duplicado y malas prácticas (code smells), y para medir la cobertura de pruebas.

**Quality Gate:** es un conjunto de condiciones mínimas de calidad (por ejemplo, cobertura mínima o cero vulnerabilidades críticas); si el código no las cumple, el análisis falla.

**Uso en CI/CD:** se ejecuta en el pipeline en cada PR o push, para bloquear código de baja calidad antes de que llegue a producción.
