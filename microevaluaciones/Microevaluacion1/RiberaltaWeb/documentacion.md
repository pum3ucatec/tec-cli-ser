Mauricio Roa
# Documentación: Levantar página web en Docker

Este documento describe los pasos seguidos para levantar una página web utilizando un contenedor Docker con Apache, con archivos estáticos (HTML, CSS, imágenes) en el contenedor.

## Requisitos previos

- **Docker Desktop** instalado.
- **Git** instalado.
- **VS Code** o cualquier editor de texto.
- Una carpeta con los archivos de la página web (HTML, CSS, imágenes).

## 1. Crear un contenedor Docker con Apache

Primero, descargamos la imagen de Apache desde Docker Hub y la ejecutamos:

1. **Descargar la imagen de Apache (httpd):**

   ```bash
   docker pull httpd
   ```

2. **Crear un contenedor con la imagen de Apache**: Esto mapea la carpeta local de tu proyecto a la carpeta de Apache en el contenedor.

   ```bash
   docker run -d -p 8080:80 --name apache-container -v "C:/ruta/a/tu/carpeta/BoliviaTurismo:/usr/local/apache2/htdocs/" httpd:latest
   ```

   - `-d`: Ejecuta el contenedor en segundo plano.
   - `-p 8080:80`: Expone el puerto 80 del contenedor al puerto 8080 en tu máquina local.
   - `-v "C:/ruta/a/tu/carpeta/BoliviaTurismo:/usr/local/apache2/htdocs/"`: Mapea la carpeta local donde están los archivos del sitio web al contenedor.

## 2. Acceder al sitio web

Una vez que el contenedor está corriendo, abre un navegador web y ve a:

```
http://localhost:8080
```

Aquí deberías ver tu página web cargada, utilizando los archivos HTML, CSS e imágenes.

## 3. Hacer cambios en los archivos

Puedes realizar cambios directamente en los archivos dentro de la carpeta `BoliviaTurismo` en tu máquina local. Los cambios se reflejarán automáticamente en el contenedor, ya que la carpeta está montada como un volumen.

## 4. Subir los cambios a GitHub

Para documentar y subir los cambios a GitHub, sigue estos pasos:

1. **Verifica el estado del repositorio**:

   ```bash
   git status
   ```

2. **Agrega los cambios**:

   ```bash
   git add .
   ```

3. **Haz commit de los cambios**:

   ```bash
   git commit -m "Actualizar sitio web con contenedor Docker Apache"
   ```

4. **Sube los cambios a GitHub**:

   ```bash
   git push origin tu-rama
   ```

## 5. Detener el contenedor (si es necesario)

Si deseas detener el contenedor, utiliza el siguiente comando:

```bash
docker stop apache-container
```

Si también deseas eliminar el contenedor:

```bash
docker rm apache-container
```

## Problemas comunes

- **Error de propiedad en Git**: Si al intentar hacer `git status` te muestra un error de propiedad, utiliza el siguiente comando para agregar la carpeta como un directorio seguro:

   ```bash
   git config --global --add safe.directory "C:/ruta/a/tu/repositorio"
   ```

- **Error con submódulos**: Si al agregar la carpeta de tu proyecto aparece como un submódulo, sigue las instrucciones para eliminarlo del índice de Git o agregarlo correctamente como un submódulo.

![Captura](captura1.png)
