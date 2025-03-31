# 🏗️ Práctica: Crear un contenedor Docker con Nginx
---
## 📌 Objetivo
En esta práctica, desplegarás un **contenedor Docker** con el servidor web **Nginx**, configurándolo para servir contenido estático.

## 🔹 Requisitos previos
- Tener **Docker** instalado en tu sistema.
- Conocimientos básicos de **Docker** y **línea de comandos**.
---

## 📝 Instrucciones

### 1️⃣ **Descargar la imagen de Nginx**
Ejecuta el siguiente comando para obtener la imagen oficial de Nginx:

```sh
docker pull nginx
```

### 2️⃣ **Crear una pagina html con images y copiarlo al conetendor (incluyendo las imagenes)**
Primero, crea un directorio en tu máquina local para contener el contenido estático. Por ejemplo:

```bash
mkdir nginx-site
cd nginx-site
```
Dentro de este directorio, crea un archivo **index.html** con el siguiente contenido:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Página informativa sobre Cochabamba, Bolivia. Conoce su historia, cultura, gastronomía y puntos turísticos.">
    <title>Cochabamba - Una Joya del Valle</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#historia">Historia</a></li>
                <li><a href="#cultura">Cultura</a></li>
                <li><a href="#gastronomia">Gastronomía</a></li>
                <li><a href="#turismo">Turismo</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="historia">
            <h1>Historia de Cochabamba</h1>
            <p>
                Cochabamba, conocida como "La Ciudad Jardín", es una de las principales ciudades de Bolivia, ubicada en el centro del país. Fue fundada el 2 de agosto de 1571 por el conquistador español Pedro de Anzúrez. Durante la época colonial, fue un importante centro comercial y agrícola, lo que permitió su crecimiento rápido.
            </p>
            <p>
                Cochabamba fue crucial durante las luchas por la independencia de Bolivia en el siglo XIX. Fue escenario de varios enfrentamientos entre los patriotas y realistas. Hoy en día, la ciudad se destaca por su clima templado y su gente amable.
            </p>
        </section>

        <section id="cultura">
            <h1>Cultura Cochabambina</h1>
            <p>
                Cochabamba es famosa por su rica tradición cultural, con una mezcla de influencias indígenas y españolas. La música tradicional, como el <em>tinku</em> y la danza de la <em>diablada</em>, son ejemplos representativos de su herencia.
            </p>
            <p>
                Además, la ciudad alberga importantes festivales, como el famoso <strong>Gran Poder</strong> y la Fiesta de la Virgen de Urkupiña, que atraen a miles de visitantes cada año. Los danzantes y músicos llenan las calles con alegría y color, demostrando el espíritu festivo de Cochabamba.
            </p>
        </section>

        <section id="gastronomia">
            <h1>Gastronomía Cochabambina</h1>
            <p>
                La comida en Cochabamba es famosa por su sabor y variedad. Uno de los platos más representativos es el <strong>pique macho</strong>, un delicioso platillo que mezcla carne de res, papas, verduras y salsa picante.
            </p>
            <p>
                Otros platos típicos incluyen la <em>llajwa</em>, una salsa picante a base de tomate y ají, acompañada de empanadas o carnes a la parrilla. Además, la ciudad es conocida por sus jugos naturales, preparados con frutas frescas que abundan en la región.
            </p>
        </section>

        <section id="turismo">
            <h1>Puntos Turísticos de Cochabamba</h1>
            <p>
                Cochabamba ofrece una gran variedad de atracciones turísticas. Uno de los destinos más visitados es el <strong>Cristo de la Concordia</strong>, una estatua gigante que se encuentra en la cima del cerro de San Pedro. Desde allí, los visitantes pueden disfrutar de una vista panorámica impresionante de la ciudad y el valle circundante.
            </p>
            <p>
                Además, el <strong>Parque Nacional Tunari</strong> es un excelente lugar para los amantes del senderismo y la naturaleza, mientras que el <strong>Mercado La Cancha</strong> es ideal para conocer la cultura local y comprar productos típicos.
            </p>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 Cochabamba - Todos los derechos reservados</p>
    </footer>
</body>
</html>

```
Luego, coloca las imágenes que quieras servir en el mismo directorio

### 3️⃣ **Crear y ejecutar el contenedor Docker con NginxS**
Ahora, crea y ejecuta un contenedor Docker con Nginx, montando el directorio donde se encuentran el index.html y las imágenes como un volumen dentro del contenedor.

Ejecuta el siguiente comando:

```bash
docker run --name nginx-container -v $(pwd):/usr/share/nginx/html:ro -p 8080:80 -d nginx
```
**Explicación de los parámetros:**

- **--name nginx-container:** Le da un nombre al contenedor (en este caso, nginx-container).

- **-v $(pwd):/usr/share/nginx/html:ro:** Monta el directorio actual (donde tienes el contenido) dentro del contenedor, en la carpeta donde Nginx busca los archivos estáticos. El sufijo :ro asegura que el directorio sea solo de lectura dentro del contenedor.

- **-p 8080:80:** Mapea el puerto 80 del contenedor al puerto 8080 de tu máquina local.

- **-d nginx:** Ejecuta el contenedor en segundo plano usando la imagen oficial de Nginx.

### 4️⃣ **Verificar que Nginx está sirviendo correctamente**
Abre tu navegador web y ve a la siguiente URL:

```arduino
http://localhost:8080
```
Deberías ver la página que creaste, mostrando el título y la imagen. Si todo está correcto, habrás creado exitosamente un contenedor Docker con Nginx sirviendo contenido estático.

### 5️⃣ **Detener y eliminar el contenedor**
Si deseas detener y eliminar el contenedor, ejecuta los siguientes comandos:

```bash
docker stop nginx-container
docker rm nginx-container
```
---

### 🔚 **Conclusión**
En esta práctica, has aprendido a configurar un contenedor Docker con Nginx para servir contenido estático. Este es un ejemplo básico, pero puedes extenderlo fácilmente para servir sitios web más complejos o configurar Nginx para manejar aplicaciones dinámicas.

## **Nota: Documentar todos los comandos utilzados en el CLI**