# Documentación de Comandos Docker para Servidor Apache

## 1️⃣ Descargar la imagen de Apache
Para obtener la imagen oficial de Apache (httpd), ejecuta:

```sh
docker pull httpd
```

Esto descargará la última versión de **Apache HTTP Server** desde Docker Hub.

---

## 2️⃣ Ejecutar un contenedor Apache
Para ejecutar un contenedor con Apache en segundo plano, usa:

```sh
docker run -d --name mi-apache -p 8080:80 httpd
```

### 🔹 Explicación:
- `-d` → Ejecuta el contenedor en segundo plano.
- `--name mi-apache` → Asigna el nombre **mi-apache** al contenedor.
- `-p 8080:80` → Mapea el puerto **8080** del host al puerto **80** del contenedor.
- `httpd` → Usa la imagen oficial de Apache.

---

## 3️⃣ Acceder al contenedor
Para abrir una terminal dentro del contenedor, usa:

```sh
docker exec -it mi-apache1 bash
```

### 🔹 Explicación:
- `exec` → Ejecuta un comando en un contenedor en ejecución.
- `-it` → Permite interacción con la terminal del contenedor.
- `mi-apache1` → Nombre del contenedor al que acceder.
- `bash` → Inicia una sesión de Bash dentro del contenedor.

---

## 4️⃣ Copiar archivos del host al contenedor
Para copiar una carpeta completa desde el host al contenedor en la ruta de Apache, usa:

```sh
docker cp microevaluaciones/Microevaluacion1/marzo-23/. mi-apache1:/usr/local/apache2/htdocs/marzo-23
```

### 🔹 Explicación:
- `docker cp` → Copia archivos o directorios entre el host y un contenedor.
- `microevaluaciones/Microevaluacion1/marzo-23/.` → Ruta de la carpeta en el host.
- `mi-apache1:/usr/local/apache2/htdocs/marzo-23` → Destino en el contenedor.
- El uso de `.` al final copia solo el **contenido** de la carpeta, no la carpeta en sí.

---

## ✅ Verificación
Para verificar que los archivos fueron copiados correctamente, accede al contenedor y revisa:

```sh
docker exec mi-apache1 ls -l /usr/local/apache2/htdocs/marzo-23
```

Si todo está bien, ahora puedes acceder desde tu navegador en:

```
http://localhost:8080/marzo-23/
```

🚀 **¡Listo! Tu servidor Apache en Docker está configurado y funcionando.**


