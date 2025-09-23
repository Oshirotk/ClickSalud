Clonar el repositorio: La primera vez, deben descargar el proyecto completo a su computadora.
git clone [URL_del_repositorio]

Moverse a la carpeta del proyecto:
cd nombre-del-proyecto

Paso 2: Antes de empezar una nueva tarea
Actualizar el proyecto: Antes de empezar, deben asegurarse de tener los cambios más recientes que otros hayan subido.
git pull origin main

Crear una nueva rama para la tarea: Es crucial que trabajen en una rama separada para evitar conflictos con los demás.
git checkout -b nombre-de-mi-tarea
Ejemplo: git checkout -b feature-formulario-contacto

Paso 3: Durante el desarrollo de la tarea
Añadir los archivos modificados: Una vez que hagan cambios, deben añadir los archivos al área de preparación.
git add .

Confirmar los cambios: Deben guardar una "instantánea" de su trabajo con un mensaje claro.
git commit -m "Mensaje descriptivo del cambio"

Enviar la rama al repositorio de GitHub: Suben su trabajo a su rama en el repositorio remoto.
git push origin nombre-de-mi-tarea
