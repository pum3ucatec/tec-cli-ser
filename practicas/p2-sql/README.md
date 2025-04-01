
# **Proyecto con Docker y MySQL.**

## **Introducción**

Este proyecto configura un servidor MySQL utilizando **Docker**, crea una base de datos llamada `Ucatec_db`, y dentro de ella, una tabla llamada `Alumno`. La tabla almacena información de los estudiantes, como nombre, apellido, correo electrónico, fecha de nacimiento, dirección y teléfono.

---

## **Requisitos Previos**

- **Docker**: Asegúrate de tener **Docker** instalado en tu sistema.
  - [Guía de instalación de Docker](https://docs.docker.com/get-docker/)
  
- **MySQL Workbench** (Opcional): Para gestionar la base de datos de forma gráfica. Si prefieres usar la terminal, puedes conectarte a la base de datos directamente desde el contenedor Docker.

- **Conexión a Internet**: Necesaria para descargar la imagen de MySQL de Docker Hub.

---

## **Pasos para Configurar el Servidor MySQL en Docker**

### 1. **Configurar el contenedor Docker con MySQL**

Primero, necesitamos levantar un contenedor Docker con MySQL. Esto nos permitirá ejecutar MySQL de manera aislada y simplificada.

Ejecuta el siguiente comando para crear un contenedor MySQL con Docker:

```bash
docker run --name sql1 -e MYSQL_ROOT_PASSWORD=4582 -d -p 3306:3306 mysql:5.7
```

#### Explicación de los parámetros:

- **--name sql1**: Le asigna el nombre `sql1` al contenedor.
- **-e MYSQL_ROOT_PASSWORD=4582**: Configura la contraseña del usuario `root` de MySQL como `4582`.
- **-d**: Ejecuta el contenedor en segundo plano.
- **-p 3306:3306**: Mapea el puerto local `3306` al puerto del contenedor, permitiendo acceso a MySQL desde el host.
- **mysql:5.7**: Usa la imagen oficial de MySQL versión `5.7`.

### 2. **Acceder al contenedor Docker y conectarse a MySQL**

Para interactuar con la base de datos, usamos el siguiente comando para acceder al contenedor y conectarnos a MySQL:

```bash
docker exec -it sql1 mysql -u root -p
```

Esto abrirá una sesión interactiva de MySQL, donde podrás ingresar la contraseña (`4582`) y empezar a trabajar con la base de datos.

---

## **Creación de la Base de Datos y la Tabla**

### 3. **Crear la base de datos `Ucatec_db`**

Una vez que te hayas conectado a MySQL, el siguiente paso es crear una base de datos llamada `Ucatec_db`. Usa el siguiente comando:

```sql
CREATE DATABASE Ucatec_db;
```

### 4. **Seleccionar la base de datos**

Para trabajar con la base de datos recién creada, seleccionamos `Ucatec_db`:

```sql
USE Ucatec_db;
```

### 5. **Crear la tabla `Alumno`**

A continuación, creamos una tabla llamada `Alumno` para almacenar información sobre los estudiantes. Esta tabla tendrá las siguientes columnas:

- `id`: Identificador único (clave primaria, autoincremental).
- `nombre`: Nombre del alumno.
- `apellido`: Apellido del alumno.
- `email`: Correo electrónico del alumno (único).
- `fecha_nacimiento`: Fecha de nacimiento del alumno.
- `direccion`: Dirección de contacto del alumno.
- `telefono`: Teléfono de contacto.
- `fecha_registro`: Fecha de registro, con valor por defecto de la fecha y hora actuales.

El comando para crear la tabla es:

```sql
CREATE TABLE Alumno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento DATE,
    direccion VARCHAR(200),
    telefono VARCHAR(15),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## **Insertar Datos en la Tabla `Alumno`**

### 6. **Insertar un único registro**

Ahora, insertamos un alumno con los siguientes datos:

- **Nombre:** Carlos
- **Apellido:** Díaz
- **Correo electrónico:** carlos.diaz@example.com
- **Fecha de nacimiento:** 1998-02-20
- **Dirección:** Calle de la Luna 789, Ciudad
- **Teléfono:** 555-9876

Usamos el siguiente comando SQL:

```sql
INSERT INTO Alumno (nombre, apellido, email, fecha_nacimiento, direccion, telefono)
VALUES ('Carlos', 'Díaz', 'carlos.diaz@example.com', '1998-02-20', 'Calle de la Luna 789, Ciudad', '555-9876');
```

### 7. **Insertar múltiples registros**

A continuación, insertamos varios alumnos de una sola vez:

```sql
INSERT INTO Alumno (nombre, apellido, email, fecha_nacimiento, direccion, telefono)
VALUES 
    ('Ana', 'Torres', 'ana.torres@example.com', '2001-08-30', 'Avenida Libertad 123, Ciudad', '555-2468'),
    ('Luis', 'Martínez', 'luis.martinez@example.com', '2000-04-15', 'Calle Sol 456, Ciudad', '555-3692'),
    ('Sofía', 'Fernández', 'sofia.fernandez@example.com', '1997-11-22', 'Calle del Río 789, Ciudad', '555-1357');
```

### 8. **Verificar los registros**

Para verificar que los datos se han insertado correctamente, podemos hacer una consulta para ver todos los registros de la tabla `Alumno`:

```sql
SELECT * FROM Alumno;
```

---

## **Conexión a la Base de Datos desde MySQL Workbench**

Si prefieres usar **MySQL Workbench** en lugar de la línea de comandos, sigue estos pasos para crear una conexión:

### 1. **Abrir MySQL Workbench**

- Abre **MySQL Workbench** en tu computadora.

### 2. **Crear una nueva conexión**

- Haz clic en el botón `+` para crear una nueva conexión.
  
### 3. **Configurar los parámetros de la conexión**

- **Connection Name**: `AmericoL` (Este es el nombre de la conexión que aparecerá en Workbench).
- **Connection Method**: `Standard (TCP/IP)`
- **Hostname**: `127.0.0.1` (ya que MySQL está corriendo en tu máquina local).
- **Port**: `3306` (el puerto estándar de MySQL).
- **Username**: `root` (el usuario de MySQL que configuramos en Docker).
- **Password**: `4582` (la contraseña que configuramos para el usuario `root` en Docker).

### 4. **Probar la conexión**

- Haz clic en **Test Connection** para verificar que la conexión se establezca correctamente.

### 5. **Guardar la conexión**

- Haz clic en **OK** para guardar la conexión y empezar a trabajar con la base de datos desde MySQL Workbench.

---

## **Acceder a la Base de Datos desde la Terminal de Docker**

Después de haber creado la base de datos y la tabla en **MySQL Workbench**, podemos acceder a nuestra base de datos y realizar consultas directamente desde la terminal de Docker, utilizando el siguiente comando:

```bash
docker exec -it sql1 mysql -u root -p
```

Este comando nos conecta al contenedor Docker con MySQL. Una vez que estemos dentro de la terminal de MySQL, podemos seleccionar la base de datos `Ucatec_db` y hacer un `SELECT` sobre la tabla `Alumno`:

### **Seleccionar la base de datos**

```sql
USE Ucatec_db;
```

### **Consultar los datos en la tabla `Alumno`**

```sql
SELECT * FROM Alumno;
```

Este comando te mostrará todos los registros que hemos insertado en la tabla `Alumno`.

---

## **Conclusión**

En este proyecto, configuramos un contenedor Docker con **MySQL**, creamos una base de datos llamada `Ucatec_db` y una tabla `Alumno` para almacenar información de estudiantes. Posteriormente, insertamos datos y verificamos que la tabla estuviera correctamente poblada.

Este enfoque te permite trabajar con bases de datos de manera eficiente y aislada, aprovechando las ventajas de **Docker** para crear entornos de desarrollo rápidamente.

---

## **Referencias**

- [Documentación oficial de MySQL](https://dev.mysql.com/doc/)
- [Docker - Get Started](https://docs.docker.com/get-started/)
