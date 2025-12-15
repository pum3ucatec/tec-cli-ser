
# 📄 Documentación del Proyecto: FutbolApp
El proyecto **FutbolApp** es una aplicación Full-Stack (Cliente-Servidor) diseñada para la gestión de una plantilla de jugadores de fútbol (CRUD: Crear, Leer, Actualizar, Eliminar).

## 1. Arquitectura y Tecnologías
El proyecto sigue una arquitectura Cliente Servidor de tres capas, utilizando tecnologías modernas de Microsoft y JavaScript para separar la lógica de presentación, la lógica de negocio y la persistencia de datos.

### 1.1 Tecnologías Clave
| Capa | Proyecto | Tecnologías Clave | Versiones Utilizadas |
| --- | --- | --- | --- |
| **Backend (API)** | `FutbolApp.Api` | ASP.NET Core Web API (C#) | .NET 9.0 (SDK), EF Core 8.0.x |
| **Acceso a Datos** | N/A | Entity Framework Core (ORM) | EF Core 8.0.x |
| **Base de Datos** | N/A | SQL Server | (localdb)\MSSQLLocalDB |
| **Frontend (Cliente)** | `FutbolApp.Client` | React, JavaScript, Vite | Últimas versiones de npm |
| **Estilos** | N/A | CSS | Estilos personalizados con temática de fútbol |

### 1.2 Estructura Arquitectónica
El cliente React consume la API, que a su vez interactúa con la base de datos a través de Entity Framework Core.

## 2. Estructura de Directorios
El proyecto se organiza en una carpeta principal (`FutbolApp`) que contiene los dos proyectos separados.

```
FutbolApp/
├── FutbolApp.Api/           # Proyecto Backend (Servidor C#)
│   ├── Controllers/         # Contiene PlayersController.cs (Endpoints REST CRUD)
│   ├── Data/                # Contiene ApplicationDbContext.cs (Contexto de la DB)
│   ├── Models/              # Contiene Player.cs (Definición de la tabla Player)
│   ├── Migrations/          # Historial de cambios de la estructura de la DB
│   ├── appsettings.json     # Configuración de la conexión a la DB y del servidor
│   └── Program.cs           # Archivo de configuración inicial (CORS, Swagger, DB)
│
└── FutbolApp.Client/        # Proyecto Frontend (Cliente React)
    ├── src/
    │   ├── pages/           # Contiene PlayerList.jsx (La vista principal de gestión)
    │   ├── services/        # Contiene playerService.js (Funciones para llamar a la API)
    │   ├── App.jsx          # Componente principal
    │   └── App.css          # Estilos CSS con la temática de fútbol
    ├── node_modules/        # Dependencias de npm
    └── package.json         # Scripts y dependencias de React

```

## 3. Guía de Inicio Rápido (Levantar el Proyecto)
Para ejecutar la aplicación completa, se necesitan **dos terminales separadas** ejecutando comandos de forma concurrente.

### 3.1 Prerrequisitos (Antes de Ejecutar)
1. Asegúrate de tener el **SDK de .NET** y **Node.js/npm** instalados.
2. Asegúrate de que el servicio **SQL Server LocalDB** (`(localdb)\MSSQLLocalDB`) esté activo en tu máquina.
3. **Aplicar Migraciones (Solo la primera vez):** Si es la primera vez que se ejecuta, debes crear la base de datos ejecutando los siguientes comandos en la terminal, **dentro de `FutbolApp/FutbolApp.Api**`:
```bash
dotnet ef database update

```



### 3.2 Terminal 1: Iniciar el Backend (API)
El API debe ejecutarse en el puerto **`5272`** (o similar).

```bash
# 1. Navegar al directorio del API
cd D:\FutbolApp\FutbolApp.Api

# 2. Ejecutar el servidor
dotnet run

```

> **Resultado esperado:** `Now listening on: http://localhost:5272`

### 3.3 Terminal 2: Iniciar el Frontend (Cliente React)
El cliente se ejecutará en el puerto **`5173`** (o similar).

```bash
# 1. Navegar al directorio del Cliente
cd D:\FutbolApp\FutbolApp.Client

# 2. Ejecutar el servidor de desarrollo
npm run dev

```

> **Resultado esperado:** `➜ Local: http://localhost:5173/`

**Accede a la Aplicación:** Abre tu navegador en la URL del cliente (`http://localhost:5173/`).

## 4. Historial de Problemas y Soluciones
Durante el desarrollo, se encontraron y resolvieron varios problemas de configuración comunes en el ecosistema .NET, cruciales para el funcionamiento del proyecto.

| Problema Encontrado | Error Recibido | Causa y Solución |
| --- | --- | --- |
| **Referencias de EF Core** | Errores `CS0234` y `CS0246` (no se encuentra `DbContext`, `DbSet`). | El proyecto no tenía el paquete principal de Entity Framework Core. **Solución:** Se instaló **`Microsoft.EntityFrameworkCore`**. |
| **Conflicto de Versiones (.NET/EF)** | `NU1202: El paquete Microsoft.EntityFrameworkCore 10.0.1 no es compatible con net9.0...` | Versiones incompatibles entre el SDK de .NET y las librerías de EF Core. **Solución:** Se forzó la instalación de los paquetes de EF Core en la versión **8.0.0** (compatible y estable). |
| **Error de Swagger/OpenAPI** | `System.Reflection.ReflectionTypeLoadException: Unable to load one or more of the requested types.` | Conflicto de dependencias en las librerías de OpenAPI/Swagger. **Solución:** Se eliminó el paquete conflictivo y se reinstaló **`Swashbuckle.AspNetCore`** en la versión estable **6.5.0**. |
| **Error de POST/JSON** | `status 400, "$.id": [ "Invalid leading zero before '1'." ]` | La validación del JSON en el API rechazó números con ceros iniciales (`01`) y el campo `Id` que debe ser autogenerado. **Solución:** Se recomienda no enviar el campo `Id` o usar `0` en la solicitud POST. |
| **Advertencias del Modelo** | `warning CS8618: El elemento propiedad "Name" que no acepta valores NULL...` | Propiedades `string` del modelo `Player.cs` no inicializadas. **Solución:** Se inicializaron con **`= string.Empty;`** para cumplir con las reglas de nulabilidad de C#. |
| **Fallo en Scaffolding** | `No se pudo ejecutar porque no se encontró el comando o archivo especificado: dotnet-aspnet-codegenerator` | La herramienta CLI no pudo instalarse correctamente. **Solución:** Se optó por la **creación manual** y copia del código estándar del **`PlayersController.cs`**. |

## 5. Resumen de la Configuración Clave
### A. Configuración de la Base de Datos**
(Archivo: `FutbolApp.Api/appsettings.json`)**

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=FutbolDB;Trusted_Connection=True;TrustServerCertificate=True"
}

```

### B. Configuración de la Conexión Frontend**
(Archivo: `FutbolApp.Client/src/services/playerService.js`)**

```javascript
const API_BASE_URL = 'http://localhost:5272/api/Players'; 
// El cliente utiliza este puerto para conectarse al Backend.

```