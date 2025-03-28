````markdown
# 📄 Lista de Comandos y Explicación

## 🔹 Comandos del Sistema

### 1️⃣ Ver información del sistema operativo
```sh
lsb_release -a
````

📌 **Descripción:** Muestra detalles sobre la distribución de Linux, como el nombre, versión y código de la distribución.

### 2️⃣ Navegar al directorio padre

```sh
cd ..
```

📌 **Descripción:** Mueve al directorio superior en la estructura de directorios.

---

## 🔹 Comandos de Docker

### 3️⃣ Ver la versión de Docker instalada

```sh
docker --version
```

📌 **Descripción:** Muestra la versión actual de Docker instalada en el sistema.

### 4️⃣ Listar contenedores en ejecución

```sh
docker ps
```

📌 **Descripción:** Muestra una lista de los contenedores en ejecución, incluyendo su ID, nombre y puertos asignados.

### 5️⃣ Listar todos los contenedores (incluidos los detenidos)

```sh
docker ps -a
```

📌 **Descripción:** Muestra todos los contenedores creados, independientemente de su estado (ejecutando, detenido, etc.).

### 6️⃣ Descargar una imagen de Docker Hub

```sh
docker pull <nombre_de_la_imagen>
```

📌 **Descripción:** Descarga una imagen específica desde el repositorio de Docker Hub. Ejemplo:

```sh
docker pull nginx
```

### 7️⃣ Ver las imágenes disponibles en el sistema

```sh
docker images
```

📌 **Descripción:** Muestra una lista de las imágenes descargadas en el sistema, con detalles como el tamaño y la fecha de creación.

### 8️⃣ Crear y ejecutar un contenedor con Nginx

```sh
docker run -d --name nginx1 -p 8080:80 nginx
```

📌 **Descripción:**

- `-d` → Ejecuta el contenedor en segundo plano.
- `--name nginx1` → Asigna el nombre **nginx1** al contenedor.
- `-p 8080:80` → Mapea el puerto **8080** del host al puerto **80** del contenedor.
- `nginx` → Usa la imagen de Nginx descargada previamente.

---

## ✅ **Conclusión**

Esta lista proporciona los comandos esenciales para trabajar con Docker, desde la verificación del sistema hasta la gestión de contenedores y la descarga de imágenes. Con esta guía, puedes empezar a gestionar tus contenedores de forma eficiente. 🚀

```
```
