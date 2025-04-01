# Pasos ejecutados en Windows PowerShell con Docker

## 1. Verificación del estado de los contenedores en ejecución
Se ejecutó el comando:
```powershell
PS C:\WINDOWS\system32> docker ps
```
Inicialmente, se encontró un error indicando que el sistema no podía encontrar el archivo especificado, lo que sugiere que el servicio Docker no estaba corriendo o configurado correctamente.

## 2. Visualización de las imágenes disponibles en Docker
Se utilizó el siguiente comando para listar las imágenes locales:
```powershell
PS C:\WINDOWS\system32> docker images
```
Se encontraron dos imágenes disponibles:
- `nginx:latest` con un tamaño de 192MB
- `httpd:latest` con un tamaño de 148MB

## 3. Descarga de la imagen de Nginx desde el repositorio oficial
Se ejecutó:
```powershell
PS C:\WINDOWS\system32> docker pull nginx
```
El sistema verificó y confirmó que la imagen `nginx:latest` estaba actualizada.

## 4. Detención y eliminación de un contenedor existente
Para detener el contenedor `kevin1`, se ejecutó:
```powershell
PS C:\WINDOWS\system32> docker stop kevin1
```
Luego, se intentó eliminar el contenedor con:
```powershell
PS C:\WINDOWS\system32> docker rm kevin1
```

## 5. Intento de ejecutar un nuevo contenedor con Nginx
Se utilizó:
```powershell
PS C:\WINDOWS\system32> docker run -d --name kevin1 -p 8080:80 nginx
```
Pero se encontró un error indicando que el nombre ya estaba en uso, por lo que se eliminó el contenedor anterior antes de ejecutar nuevamente el comando.

## 6. Listado de contenedores existentes
Para ver todos los contenedores, incluyendo los detenidos, se ejecutó:
```powershell
PS C:\WINDOWS\system32> docker ps -a
```
Aquí se identificaron los contenedores existentes, incluidos aquellos que ya estaban detenidos.

## 7. Eliminación de contenedores innecesarios
Se detuvieron y eliminaron los contenedores `kevin1` y `mi-apache1` con los comandos:
```powershell
PS C:\WINDOWS\system32> docker stop mi-apache1
PS C:\WINDOWS\system32> docker rm mi-apache1
```

## 8. Descarga nuevamente de la imagen de Nginx
Para asegurarse de que se tiene la última versión de Nginx, se ejecutó:
```powershell
PS C:\WINDOWS\system32> docker pull nginx
```

## 9. Creación y ejecución del contenedor `kevin1`
Después de eliminar los contenedores anteriores, se creó y ejecutó un nuevo contenedor con Nginx:
```powershell
PS C:\WINDOWS\system32> docker run -d --name kevin1 -p 8080:80 nginx
```
Este comando permitió la ejecución correcta del contenedor en el puerto 8080.

## 10. Ingreso al contenedor y verificación del sistema operativo
Se accedió al contenedor en modo interactivo con:
```powershell
PS C:\WINDOWS\system32> docker exec -it kevin1 bash
```
Dentro del contenedor, se verificó la versión del sistema operativo con:
```bash
root@425b6b053196:/# cat /etc/os-release
```
El resultado mostró que el sistema operativo dentro del contenedor es `Debian GNU/Linux 12 (bookworm)`.

## 11. Listado del sistema de archivos dentro del contenedor
Finalmente, se listaron los archivos en la raíz del contenedor con:
```bash
root@425b6b053196:/# ls -la
```
Esto permitió ver la estructura de archivos del contenedor Nginx.

---

Este documento detalla paso a paso la sesión de PowerShell ejecutando y administrando contenedores Docker, asegurando que se comprendan los comandos utilizados y sus efectos en el sistema.

