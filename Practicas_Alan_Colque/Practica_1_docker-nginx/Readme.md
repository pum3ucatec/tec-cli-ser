## Manual de Despliegue – Nginx + Docker 

## Pasos Ejecutados

### 1. Preparación del Entorno
```Terminal
mkdir practica-docker-nginx    |    Crea una carpeta (directorio) con el nombre practica-docker-nginx
cd practica-docker-nginx       |    Entra dentro de la carpeta que acabas de crear.
mkdir html                     |    Crea una carpeta llamada html
mkdir html/images              |    Crea una subcarpeta dentro de html llamada images (imagenes)
```

---

### 2. Descarga de la Imagen Oficial de Nginx
```Terminal
docker pull nginx
```
![alt text](/practica-docker-nginx/html/images/Captura%20de%20pantalla%202025-11-16%20145029.png)
---

### 3. Preparación de Archivos Estáticos

#### Estructura del Proyecto
```
practica-docker-nginx/
├── html/
│   ├── index.html
│   └── images/
```
---

### 4. Creación del Archivo HTML Principal
```
Dentro de la carpeta html se debe crear el index.html el cual usted personalizara su contenido
```
![alt text](/practica-docker-nginx/html/images/html%20Alan.png)
---

### 5. Ejecución del Contenedor Docker
```Terminal
docker run -d -p 8080:80 --name nginx-container -v "${PWD}\html:/usr/share/nginx/html" nginx  Y verificamos con docker ps
```
![alt text](/practica-docker-nginx/html/images/correrngix.png)
---

---

## Comandos
```Terminal
docker stop nginx-container  Se detiene el contenedor con el nombre correspondiente
docker start nginx-container Se Inicia el contenedor
docker restart nginx-container Se reinicia el contenedor
docker rm -f nginx-container Este comando elimina el contenedor
docker inspect nginx-container Este comando muestra TODA la información interna del contenedor en formato JSON.
```
