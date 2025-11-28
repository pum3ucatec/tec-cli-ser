### Practica  XAMP

1. Crear un docker compose para simular la arquitectura de XAMP
    a. PHP
    B. Mysql
    c. Nginx
    d. Phpmyadmin

2. Documentar en el README.md con evidencias

3. Prabas que los servicios o contenedores se integren
    a. Crear una base de datos en phpmyadmin
    b. Crear una pagina html en nginx
    c. Crear una archivo php en servicio web o app

---

###  XAMP con Docker - Alan Colque

Implementación completa de una arquitectura XAMP (Nginx, PHP-FPM, MySQL, phpMyAdmin) utilizando Docker Compose.

---

### Estructura del Proyecto
```Terminal
Practica_3_xamp/
├── 📄 docker-compose.yml
├── 📁 nginx/
│   ├── 📄 nginx.conf
│   └── 📁 sites/
│       └── 📄 default.conf
├── 📁 php/
│   └── 📁 www/
│       ├── 📄 index.html
│       ├── 📄 info.php
│       └── 📄 test-db.php
├── 📁 mysql/
│   └── 📁 init/
│       └── 📄 01-init.sql
└── 📄 README.md
```
---
### Pasos Realizados

#### 1. Configuración Inicial

Creación de estructura de carpetas

Configuración de ```docker-compose.yml```

Definición de servicios y redes.

#### 2. Configuración de Nginx
  # Servicio de Nginx

```
  nginx:
    image: nginx:alpine
    container_name: xamp-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./php/www:/var/www/html
      - ./nginx/Site:/etc/nginx/conf.d
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - php
    networks:
      - xamp-network
```
#### 3. Configuración de PHP-FPM
Imagen base: php:8.2-fpm

```
php:
    image: php:8.2-fpm
    container_name: xamp-php
    restart: unless-stopped
    volumes:
      - ./php/www:/var/www/html
    networks:
      - xamp-network
```

Instalación manual de extensiones (añadir estos una vez se inicien los servicios, Explicado en la resolucion  de errores):
```
pdo_mysql

mysqli

mysqlnd
```



#### 4. Configuración de MySQL

Imagen: ```mysql:8.0```

Script de inicialización automática

Base de datos manual
```
mysql:
    image: mysql:8.0
    container_name: xamp-mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: app_db
      MYSQL_USER: app_user
      MYSQL_PASSWORD: userpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./mysql/init:/docker-entrypoint-initdb.d
    networks:
      - xamp-network
```

#### 5 Configuracion phpMyadmin
```
phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: xamp-phpmyadmin
    restart: unless-stopped
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
      MYSQL_ROOT_PASSWORD: rootpassword
    ports:
      - "8080:80"
    depends_on:
      - mysql
    networks:
      - xamp-network
```


#### 6. Resolución de Problemas
Problema: Extensiones PHP faltantes
Síntoma: Error "could not find driver" en test de base de datos

Solución:
```
# Instalación manual en contenedor
docker exec -it xamp-php bash
apt update
apt install -y libpng-dev libonig-dev libxml2-dev
docker-php-ext-install pdo pdo_mysql mysqli
exit
```

![alt text](/Practicas_Alan_Colque/Practica_3_xamp/images/Captura%20de%20pantalla%202025-11-20%20101012.png)

---

#### 7.  Comandos de ejecucion

Iniciar servicios:

```
docker-compose up -d
```
Ver estado:
```
docker-compose ps
```
Detener servicios:
```
docker-compose down
```
### Pruebas de integracion

Verificación de Servicios
Estado de contenedores:
```
docker-compose ps

# Resultado esperado:
# xamp-mysql      running
# xamp-php        running  
# xamp-nginx      running
# xamp-phpmyadmin running
```
![alt text](/Practicas_Alan_Colque/Practica_3_xamp/images/image5.png)
#### Prueba 1: Servicio Web (Nginx + PHP)

URL: http://localhost

Archivo: index.html

Código usado para la prueba:
```
# Probar con curl en la terminal
curl.exe http://localhost

# O abrir en navegador
Start-Process "http://localhost"
```
![alt text](/Practicas_Alan_Colque/Practica_3_xamp/images/image1.png)

#### Prueba 2: Procesamiento PHP

URL: http://localhost/info.php

Archivo: info.php

Código:
``` 
# Ya añadido en el  archivo info.php
<?php
phpinfo();
?>
```
![alt text](/Practicas_Alan_Colque/Practica_3_xamp/images/image2.png)

#### Prueba 3: Base de Datos MySQL - Conexión PHP
URL: http://localhost/test-db.php

Archivo: test-db.php

![alt text](/Practicas_Alan_Colque/Practica_3_xamp/images/image3.png)

#### Prueba 4: phpMyAdmin
URL: http://localhost:8080

Credenciales: root / rootpassword

![alt text](/Practicas_Alan_Colque/Practica_3_xamp/images/image4.png)