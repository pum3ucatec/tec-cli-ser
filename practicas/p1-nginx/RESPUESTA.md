# 🏗️ Práctica: Crear un contenedor Docker con Nginx

## 📌 Objetivo
En esta práctica, desplegarás un **contenedor Docker** con el servidor web **Nginx**, configurándolo para servir contenido estático.

## 🔹 Requisitos previos
- Tener **Docker** instalado en tu sistema.
- Conocimientos básicos de **Docker** y **línea de comandos**.

:warning: Esta guia esta enfocada en un entorno con Windows 10/11

## 📝 Instrucciones
---

## 1) Verificar instalación de Docker

En PowerShell o CMD ejecuta:

```powershell
docker --version
docker info
```

Si Docker Desktop está corriendo verás la versión y `docker info` mostrará info sobre el daemon.

---

## 2) Descargar (pull) la imagen de nginx

```powershell
docker pull nginx
```

---

## 3) Crear la carpeta `nginx-site` (por comando)

En PowerShell:

```powershell
# desde tu carpeta de usuario, por ejemplo C:\Users\TuUsuario
cd $HOME
mkdir nginx-site
cd nginx-site
```

En CMD:

```cmd
cd %USERPROFILE%
mkdir nginx-site
cd nginx-site
```

---

## 4) Crear el `index.html` y añadir imágenes

### 4.1 Crear `index.html`

Puedes crear un archivo simple con el Bloc de notas o desde PowerShell:

Contenido de ejemplo (`index.html`):

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Emperor Meme</title>
</head>
<body>
  <h1>El verdadero emperador de la humanidad</h1>


  <img src="El-Emperador.jpg" alt="Emperor of Mankind meme" />


</body>
</html>

```

Guarda ese contenido en `C:\Users\TuUsuario\nginx-site\index.html` (sustituye `TuUsuario` por tu usuario real).

### 4.2 Añadir imágenes (ejemplo: bajar imágenes de prueba)

Desde PowerShell puedes bajar imágenes de ejemplo con `Invoke-WebRequest`:

```powershell
# En la carpeta nginx-site
Invoke-WebRequest -Uri "https://picsum.photos/800/400?random=1" -OutFile .\imagen1.jpg
Invoke-WebRequest -Uri "https://picsum.photos/800/400?random=2" -OutFile .\imagen2.jpg
```

(O usa tu propio `.jpg`/.png copiándolos a la carpeta `nginx-site`.)

> Ahora la estructura debe ser algo así:
>
> ```
> C:\Users\TuUsuario\nginx-site\
> ├─ index.html
> ├─ imagen1.jpg
> └─ imagen2.jpg
> ```

---

## 5) Ejecutar el contenedor (`docker run`) — cuidado con `${pwd}` en Windows

Muchos tutoriales usan el atajo `-v ${pwd}:/usr/share/nginx/html`, pero **en Windows PowerShell** `${pwd}` (o `${PWD}`) no se comporta como en Linux/Unix y suele dar errores de montaje. Por eso **no funciona** el ejemplo:

### Ejemplo incorrecto (genera error en Windows):

```powershell
docker run --name mi-nginx -d -p 8080:80 -v ${pwd}:/usr/share/nginx/html nginx
```

**Problema**: `${pwd}` no se expande a una ruta válida que Docker entiende en Windows, o puede expandir a un objeto en PowerShell. Resultado: error de montaje o contenedor falla al arrancar.

### Soluciones correctas

**Opción A — Usar la ruta absoluta de Windows** (más simple y fiable):

```powershell
# Sustituye TuUsuario por tu usuario real
docker run --name mi-nginx -d -p 8080:80 -v C:\Users\TuUsuario\nginx-site:/usr/share/nginx/html:ro nginx
```

Notas:

* `:ro` (opcional) hace que el volumen sea de solo lectura dentro del contenedor.
* Usa **backslashes** en la ruta de Windows (`C:\...`). Docker Desktop en Windows entiende rutas Windows en `-v`.

**Opción B — Desde Git Bash (si tienes) puedes usar `$(pwd)`**:

```bash
docker run --name mi-nginx -d -p 8080:80 -v "$(pwd)":/usr/share/nginx/html:ro nginx
```

Esto *sí* funciona en entornos de tipo Unix (Git Bash, WSL), pero **no en PowerShell puro**.

**Opción C — PowerShell con `$(Get-Location).Path`** (más "PowerShell-native"):

```powershell
$pwdPath = (Get-Location).Path
docker run --name mi-nginx -d -p 8080:80 -v "${pwdPath}:/usr/share/nginx/html:ro" nginx
```

(Aunque la Opción A — escribir la ruta absoluta — es la más directa.)

---

## 6) Verificar que el contenedor está corriendo

Lista contenedores en ejecución:

```powershell
docker ps
```

Salida esperada (ejemplo): verás `mi-nginx` en la lista y el puerto `0.0.0.0:8080->80/tcp`.

Abrir en el navegador:

* Visita `http://localhost:8080` — deberías ver el `index.html` con las imágenes.

Si no ves nada:

* Revisa `docker logs mi-nginx` para ver errores.
* Revisa que los archivos `index.html` e imágenes estén en la ruta montada y con permisos de lectura.

---

## 7) Parar y (opcionalmente) eliminar el contenedor

Parar:

```powershell
docker stop mi-nginx
```

Eliminar (si ya no lo necesitas):

```powershell
docker rm mi-nginx
```

Si quieres reiniciarlo después de cambios en `index.html`, puedes:

```powershell
docker stop mi-nginx
docker rm mi-nginx
# volver a iniciar (con la ruta absoluta)
docker run --name mi-nginx -d -p 8080:80 -v C:\Users\TuUsuario\nginx-site:/usr/share/nginx/html:ro nginx
```

---

## 8) Consejos y resolución de problemas comunes

* **Error de montaje en Windows:** normalmente pasa por usar sintaxis tipo `${pwd}` o por no dar permisos a Docker Desktop para acceder a las unidades. Revisa en Docker Desktop → Settings → Resources → File Sharing (o "Resources > File Access") que `C:\Users` esté compartido.
* **Permisos / SELinux (no aplicable en Windows)**: en Linux puede necesitar opciones extra.
* **Si `docker run` falla inmediatamente**: revisa `docker logs <container-id>` y `docker ps -a` para ver el estado.
* **Usa puertos distintos** si `8080` está ocupado, p.ej. `-p 9090:80`.


