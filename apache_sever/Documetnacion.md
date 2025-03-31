# Proyecto: Despliegue de una Página de Gastronomía de Cochabamba en Apache con Docker

Este proyecto consiste en crear un servidor web con **Apache (httpd)** utilizando **Docker** y servir una página HTML estática que muestra información sobre la **gastronomía de Cochabamba**. La página está acompañada de imágenes y estilos CSS personalizados.

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu sistema:

- **Docker**: Herramienta que permite ejecutar aplicaciones en contenedores.
- **Git**: Para clonar el repositorio.
- **Conocimientos básicos de línea de comandos**.

## 1. Clonar el Repositorio

Para empezar, clona el repositorio del proyecto desde GitHub a tu máquina local.

```bash
git clone https://github.com/pum3ucatec/tec-cli-ser.git
cd tec-cli-ser
```

## 2. Estructura de Carpetas

El proyecto está estructurado de la siguiente manera:

```
/apache_sever
  /html
    - index.html
  /css
    - styles.css
  /images
    - cochabamba_intro.jpg
    - pique_macho.jpg
    - chicharron.jpg
    - silpancho.jpg
    - api.jpg
    - chicha.jpg
```

- **html**: Contiene el archivo `index.html` con el contenido sobre gastronomía de Cochabamba.
- **css**: Contiene el archivo `styles.css` con los estilos del diseño.
- **images**: Contiene las imágenes que se utilizan en la página.

## 3. Crear las Carpetas Necesarias

Asegúrate de crear las carpetas necesarias para organizar los archivos estáticos del servidor Apache:

```bash
mkdir -p apache_sever/{html,css,images}
```

Coloca tu archivo `index.html` en la carpeta `html`, los estilos CSS en la carpeta `css`, y las imágenes en la carpeta `images`.

## 4. Crear el Contenedor Docker con Apache

Para desplegar la página en un servidor Apache dentro de un contenedor Docker, utilizamos la imagen oficial de **Apache (httpd)**.

### Construcción y Ejecución del Contenedor Docker

1. Abre una terminal y navega hasta la raíz de tu proyecto.
2. Ejecuta el siguiente comando para iniciar un contenedor Docker con Apache, montando las carpetas locales en el contenedor:

```bash
docker run -d -p 8080:80 \
  -v "$(pwd)/apache_sever/html:/usr/local/apache2/htdocs/" \
  -v "$(pwd)/apache_sever/css:/usr/local/apache2/htdocs/css" \
  -v "$(pwd)/apache_sever/images:/usr/local/apache2/htdocs/images" \
  httpd
```

- `-d`: Ejecuta el contenedor en segundo plano.
- `-p 8080:80`: Mapea el puerto 80 del contenedor al puerto 8080 en tu máquina local.
- `-v "$(pwd)/apache_sever/html:/usr/local/apache2/htdocs/"`: Mapea la carpeta `html` de tu máquina local a la carpeta de documentos de Apache dentro del contenedor.
- Repite lo mismo para las carpetas `css` e `images`.

Este comando descarga la imagen oficial de **Apache (httpd)** si no está presente en tu máquina y luego ejecuta el contenedor con los archivos del proyecto.

## 5. Acceder a la Página

Una vez que el contenedor Docker esté en funcionamiento, abre tu navegador web y accede a la página en:

```
http://localhost:8080
```

Deberías ver la página con el contenido sobre la gastronomía de Cochabamba, diseñada con tonos azules claros y las imágenes que hayas colocado en la carpeta `images`.

## 6. Detener el Contenedor

Si deseas detener el contenedor, puedes hacerlo con el siguiente comando:

```bash
docker stop $(docker ps -q --filter ancestor=httpd)
```

Este comando detiene cualquier contenedor basado en la imagen `httpd`.

## 7. Personalización

Puedes personalizar la página:

1. **Editar el archivo `index.html`** para cambiar el contenido de la página.
2. **Modificar el archivo `styles.css`** para ajustar los estilos, como colores, tamaños de texto, etc.
3. **Reemplazar o añadir nuevas imágenes** en la carpeta `images`.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama (`git checkout -b nueva-rama`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Descripción de los cambios'`).
4. Sube tus cambios (`git push origin nueva-rama`).
5. Abre un **pull request** para que tus cambios sean revisados e integrados.

## Licencia

Este proyecto está bajo la Licencia MIT.

---