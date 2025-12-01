#  Práctica: Crear un contenedor Docker con Nginx

##  Objetivo
Desplegar un **servidor web Nginx dentro de un contenedor Docker**, configurado para **servir contenido estático** (HTML, CSS e imágenes), utilizando bind mounts y documentando cada comando CLI.

---

##  Requisitos previos
- Tener **Docker instalado y funcionando**
- Conocimientos básicos sobre:
  - Servidor web **Nginx**
  - **Contenedores** e **imágenes Docker**
  - Estructura básica de archivos web (HTML/CSS)

---

##  Estructura del proyecto

p1-nginx/
└── html/
├── cbba.html
├── style.css
└── img/
├── fondo.jpg
└── cristo.jpg

 La carpeta **html/** contiene la página y los recursos que se mostrarán en el navegador.

---

## 🛠️ Comandos CLI utilizados
###
### 1 Descargar la imagen oficial de Nginx desde Docker Hub
powershell
docker pull nginx

---

### 2 Verificar que Docker está funcionando

docker --version
docker ps

---


### 3 Ejecutar el contenedor Docker mapeando la carpeta local

docker stop contenedor-nginx
docker rm contenedor-nginx

docker run --name contenedor-nginx `
 -v C:\Users\Administrator\Downloads\git\tec-cli-ser-1\practicas\p1-nginx\html:/usr/share/nginx/html:ro `
 -p 8080:80 `
 -d nginx

---


### 4 Verificar que el contenedor está activo

docker ps

---

### 5 Acceder desde el navegador

Abrir en cualquier navegador:

http://localhost:8080/cbba.html

Contenedor corriendo correctamente

CONTAINER ID   IMAGE    STATUS          PORTS                  NAMES
abc12345xyz    nginx    Up 5 minutes    0.0.0.0:8080->80/tcp   contenedor-nginx

---

