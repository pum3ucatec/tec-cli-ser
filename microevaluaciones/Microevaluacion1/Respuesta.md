
# 🏗️ Práctica Docker - Servir contenido con Apache

## 📌 Objetivo
Configurar un contenedor Docker con **Apache (httpd)** para servir contenido estático, utilizando una página HTML personalizada desde el sistema local.

---

## 🔹 Requisitos

- Docker instalado (versión usada: `28.0.1`)
- Conocimientos básicos de línea de comandos
- Archivo HTML (por ejemplo, `index.html`)

---

## 📝 Paso a paso

### 1️⃣ Descargar la imagen oficial de Apache

```bash
docker pull httpd
```

---

### 2️⃣ Crear y acceder al proyecto

```bash
cd ~/Desktop/mi_apache
code .
```

---

### 3️⃣ Crear y ejecutar el contenedor Apache

```bash
docker run -d --name mi-apache1 -p 8080:80 httpd
```

---

### 4️⃣ Acceder al contenedor

```bash
docker exec -it mi-apache1 bash
```

---

### 5️⃣ Verificar el contenido inicial

```bash
cat /usr/local/apache2/htdocs/index.html
```

---

### 6️⃣ Salir del contenedor

```bash
exit
```

---

### 7️⃣ Copiar archivo HTML personalizado al contenedor

```bash
docker cp ~/Desktop/mi_apache/index.html mi-apache1:/usr/local/apache2/htdocs/index.html
```

---

### 8️⃣ Verificar archivos dentro del contenedor

```bash
docker exec -it mi-apache1 bash
ls -la /usr/local/apache2/htdocs
```

---

## ✅ Resultado

- Apache sirve el contenido del nuevo `index.html` en `http://localhost:8080`
- El contenedor `mi-apache1` queda corriendo y funcional

---

## 🚀 Alternativa con volumen (sin copiar archivos manualmente)

```bash
docker run -d \
  --name mi-apache2 \
  -p 8081:80 \
  -v ~/Desktop/mi_apache:/usr/local/apache2/htdocs \
  httpd
```

Esta opción refleja automáticamente cualquier cambio hecho en tu carpeta local.

---
