1️⃣ Verificar que el contenedor kevin1 está en ejecución
Primero, asegurémonos de que el contenedor kevin1 esté funcionando. En PowerShell, ejecuta:

docker ps
Este comando listará los contenedores activos. Busca en la columna NAMES el contenedor llamado kevin1. Debería verse algo similar a esto:

CONTAINER ID   IMAGE     COMMAND                  CREATED        STATUS       PORTS                  NAMES
abc12345xyz    nginx     "/docker-entrypoint.…"   2 minutes ago  Up 2 minutes  0.0.0.0:8080->80/tcp   kevin1
Si el contenedor está en ejecución, entonces ya tienes un servidor Nginx corriendo, y solo necesitas mapear los archivos correctos al contenedor.

2️⃣ Preparar los archivos HTML e imágenes
Como mencionaste que ya tienes tu página HTML e imágenes listas, asegúrate de que tus archivos están organizados de la siguiente manera (por ejemplo):

C:\Users\TuUsuario\Documents\nginx-project
│
├── index.html
└── images
    └── mi-imagen.jpg
Aquí:

index.html es tu archivo HTML.

La carpeta images contiene las imágenes que quieres que se sirvan.

3️⃣ Montar los archivos en el contenedor kevin1
Ahora, lo que vamos a hacer es montar la carpeta nginx-project con tus archivos al contenedor kevin1 para que Nginx pueda servirlos.

3.1 Detener el contenedor kevin1
Si el contenedor kevin1 ya está en ejecución, necesitarás detenerlo antes de poder cambiar el mapeo de volúmenes. Usa el siguiente comando en PowerShell:

docker stop kevin1
3.2 Eliminar el contenedor kevin1 (si necesario)
Si deseas cambiar el mapeo de volúmenes (la carpeta que Nginx está usando para servir contenido), puedes eliminar el contenedor después de detenerlo. El contenedor se eliminará, pero no perderás los archivos de imagen o HTML. Para hacerlo, ejecuta:

docker rm kevin1
3.3 Ejecutar nuevamente el contenedor con los archivos montados
Ahora, vamos a ejecutar el contenedor kevin1 nuevamente, pero esta vez montando la carpeta nginx-project que contiene tu index.html y la carpeta images.

docker run --name kevin1 -v C:\Users\TuUsuario\Documents\nginx-project:/usr/share/nginx/html:ro -p 8080:80 -d nginx
Explicación del comando:
--name kevin1: Le asigna el nombre kevin1 al contenedor.

-v C:\Users\TuUsuario\Documents\nginx-project:/usr/share/nginx/html:ro: Mapea tu carpeta nginx-project en tu máquina local al directorio /usr/share/nginx/html dentro del contenedor, que es donde Nginx sirve los archivos estáticos. La opción :ro indica que el contenedor solo tiene acceso de lectura.

-p 8080:80: Expone el puerto 80 del contenedor al puerto 8080 de tu máquina local, por lo que podrás acceder a la página desde http://localhost:8080.

-d: Ejecuta el contenedor en segundo plano (modo "detached").

nginx: Usa la imagen oficial de Nginx para ejecutar el contenedor.

4️⃣ Verificar que la página se sirve correctamente
Abre tu navegador y ve a:

http://localhost:8080
Deberías ver tu página HTML con las imágenes cargadas correctamente. Si todo está bien configurado, Nginx debería estar sirviendo los archivos estáticos desde la carpeta que montaste.

5️⃣ Verificar el contenedor
Si necesitas verificar que el contenedor kevin1 sigue en ejecución, puedes usar el siguiente comando:

docker ps
Esto te dará una lista de contenedores activos. Asegúrate de que el contenedor kevin1 está listado.

