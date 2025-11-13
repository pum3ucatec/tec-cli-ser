# 🏗️ Práctica: Crear un contenedor Docker con Nginx

## 📌 Objetivo
En esta práctica, desplegarás un **contenedor Docker** con el servidor web **Nginx**, configurándolo para servir contenido estático.

## 🔹 Requisitos previos
- Tener **Docker** instalado en tu sistema.
- Conocimientos básicos de **Docker** y **línea de comandos**.

## 📝 Instrucciones

### 1️⃣ **Descargar la imagen de Nginx**
Ejecuta el siguiente comando para obtener la imagen oficial de Nginx:

```sh
docker pull nginx
```

### 2️⃣ **Crear una pagina html con images y copiarlo al conetendor (incluyendo las imagenes)**

## **Nota: Documentar todos los comandos utilzados en el CLI**

## Especificaciones
Crear una rama con su nombre

```
QuelaliGaston/Practica1
```

Modificar el README.md para colocar las evidencias de la practica.


## Para limpiar

 74  docker ps
   75  # Ejecutar contenedor con volumen mapeado
   76  docker run -d   --name mi-nginx   -p 8080:80   -v $(pwd)/html:/usr/share/nginx/html   nginx
   77  docker ps
   78  docker delete mi-nginx
   79  docker remove mi-nginx
   80  docker ps -a
   81  docker rm mi-nginx
   82  docker ps -a
   83  docker run -d   --name mi-nginx   -p 8080:80   -v $(pwd)/html:/usr/share/nginx/html   nginx
   84  docker ps
   85  docker volumes
   86  ls -la
   87  cd ejemplos/
   88  cd ..
   89  cd html
   90  ls -la
   91  docker exec mi-nginx ls -la /usr/share/nginx/html
   92  docker exec mi-nginx ls -la
   93  pwd
   94  cd ..
   95  docker stop mi-ginx
   96  docker stop mi-nginx
   97  docker rm mi-nginx
   98  cd practicas/p1-nginx/
   99  ls -la
  100  cd html
  101  pwd
  102  docker run -d   --name mi-nginx   -p 8080:80   -v /c/Users/GASTON/ucatec/tec-cli-ser/practicas/p1-nginx/html:/usr/share/nginx/html   nginx
  103  docker volumes
  104  docker volume ls
  105  pwd
  106  ls -la
  107  ls -la
  108  docker cp cbba.html mi-nginx:/usr/share/nginx/html
  109  pwd
  110  docker cp /c/Users/GASTON/ucatec/tec-cli-ser/practicas/p1-nginx/html/cbba.html mi-nginx:/usr/share/nginx/html/
  111  pwd
  112  ls -la
  113  docker exec mi-nginx ls -la /usr/share/nginx/html/
  114  docker ps
  115  docker exec mi-nginx ls -la /usr/share/nginx/html/
  116  docker stop mi-nginx
  117  docker rm mi-nginx
  118  docker ps
  119  ls -la
  120  historty
  121  history