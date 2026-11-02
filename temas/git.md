# GIT

## ¿En un entorno de trabajo con muchas personas tocando codigo y pusheando a GIT que haría ud o como lo haría para evitar problemas de merge conflict, como debería abordar el problema y que solución propone?

**Ramas cortas y commits pequeños:** cada tarea en su propia rama (feature/...) que dure pocos días, para que haya menos código divergente que mezclar.

**Integrar seguido**: traer los cambios de main a tu rama con git pull --rebase o merge varias veces al día, así los conflictos son pequeños y se resuelven cuando aún tienes el contexto fresco.

**Pull Requests con revisión**: nadie hace push directo a main; todo entra por PR con revisión y rama protegida.

**CI automático**: cada PR ejecuta compilación y pruebas antes de poder mezclarse, para detectar problemas de integración temprano.

**Comunicación y división del trabajo**: evitar que dos personas modifiquen los mismos archivos a la vez, con tareas bien repartidas y una estructura de código modular.

**Formato y reglas comunes**: usar linters y formateadores automáticos (Prettier, .editorconfig) para evitar conflictos por espacios o estilo.

## ¿Qué es un rebase en Git, para qué sirve y qué diferencia tiene con un stash?

**Rebase:** comando que mueve los commits de tu rama para colocarlos encima de los últimos cambios de otra (normalmente main), como si hubieras empezado tu trabajo desde ahí. Sirve para mantener tu rama actualizada y dejar un historial lineal y limpio, sin commits de merge extra.

**Stash:** comando que guarda temporalmente tus cambios sin commitear en un cajón aparte y deja tu carpeta de trabajo limpia. Sirve para cambiar de rama o hacer un pull sin perder lo que estabas haciendo, y luego recuperarlo con git stash pop.
