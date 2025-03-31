
# 🏗️ Práctica: Crear un contenedor Docker con Nginx

## 📌 Objetivo
Desplegar un **contenedor Docker** con el servidor web **Nginx**, configurado para servir contenido estático, incluyendo una página HTML con imágenes.

---

## 🔹 Requisitos previos

- Mac con macOS actualizado
- Editor de texto para crear archivos HTML
- Conexión a internet para instalar Docker y descargar la imagen

---

## 🐳 Instalación de Docker (macOS)

### 🔸 Opción 1: Usando Docker Desktop

1. Ve a la página oficial:  
   👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

2. Descarga la versión para Mac (Intel o Apple Silicon según tu chip).

3. Instala Docker arrastrando la app a la carpeta de Aplicaciones.

4. Abre Docker Desktop y espera a que se inicie.

5. Verifica la instalación en terminal:

```bash
docker --version
docker compose version
```

---

## 📝 Instrucciones para ejecutar Nginx en un contenedor Docker

---

### 1️⃣ Descargar la imagen oficial de Nginx

```bash
docker pull nginx
```

---

### 2️⃣ Crear la estructura del sitio web

```bash
mkdir sitioweb
cd sitioweb
```

Crea un archivo `index.html`:

```html
<!-- mi_sitio/index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>El Obelisco de Buenos Aires</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; text-align: center; padding: 40px;">
  <h1>🇦🇷 El Obelisco de Buenos Aires</h1>
  <p>
    El Obelisco es uno de los monumentos más emblemáticos de Argentina, ubicado en la intersección de la Av. 9 de Julio y Av. Corrientes.
    Fue inaugurado en 1936 para conmemorar el cuarto centenario de la fundación de la ciudad.
  </p>

  <img src="obelisco1.jpg" alt="Vista frontal del Obelisco" width="400" style="margin: 20px;">
  <img src="obelisco2.jpg" alt="Obelisco de noche iluminado" width="400" style="margin: 20px;">

  <h2>📍 Ubicación</h2>
  <p>Avenida 9 de Julio, Buenos Aires, Argentina</p>

  <h2>ℹ️ Datos curiosos</h2>
  <ul style="display: inline-block; text-align: left;">
    <li>Mide 67,5 metros de altura.</li>
    <li>Fue diseñado por el arquitecto Alberto Prebisch.</li>
    <li>Es un símbolo nacional y punto de encuentro popular.</li>
  </ul>
</body>
</html>

```

Agrega una imagen al mismo directorio (por ejemplo, una imagen llamada `imagen.jpg`):

```bash
cp /ruta/a/tu/imagen.jpg imagen.jpg
```

---

### 3️⃣ Ejecutar el contenedor Nginx sirviendo archivos locales

```bash
docker run -d \
  --name santy1 \
  -p 8080:88 \
  -v $(pwd):/usr/share/nginx/html \
  nginx
```

📌 Explicación:

- `-d`: Ejecuta en segundo plano.
- `--name santy1`: Nombre del contenedor.
- `-p 8080:88`: Puerto local 8080 mapeado al 88 del contenedor.
- `-v $(pwd):/usr/share/nginx/html`: Monta el sitio local en la raíz de Nginx.

---

### 4️⃣ Verificar funcionamiento

Abre un navegador y entra a:

```
http://localhost:8080
```

---

### 5️⃣ Detener y eliminar el contenedor

```bash
docker stop santy1
docker rm santy1
```

---

## ✅ Resultado esperado

- Nginx sirviendo contenido HTML con imágenes desde un contenedor Docker.
- Página accesible desde `http://localhost:8080`.

---
