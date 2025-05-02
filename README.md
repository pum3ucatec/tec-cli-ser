# TECNOLOGIAS CLIENTE SERVIDOR

## Requisitos Previos
- .NET 8.0 SDK
- Node.js 18+ y npm
- SQL Server Express
- Visual Studio 2022 o Visual Studio Code

## Configuración Inicial

### Backend (ASP.NET Core MVC)

1. Instalar herramientas de Entity Framework
```bash
dotnet tool install --global dotnet-ef
```

2. Restaurar paquetes del proyecto
```bash
cd ejemplos/e3-csharp
dotnet restore
```

3. Agregar paquetes necesarios
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### Frontend (React)

1. Instalar dependencias
```bash
cd ejemplos/e6-client-react
npm install
```

2. Instalar paquetes adicionales
```bash
npm install react-router-dom @types/react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Backend (ASP.NET Core MVC)

### Estructura del Proyecto
```
ejemplos/e3-csharp/
├── Controllers/
│   ├── TeamApiController.cs    # API endpoints para Teams
│   └── TeamController.cs       # Controlador MVC para Teams
├── Models/
│   └── Team.cs                 # Modelo de Team
├── Data/
│   └── ApplicationDbContext.cs # Contexto de base de datos
└── Migrations/                 # Migraciones de Entity Framework
```

### Pasos para crear la tabla Team

1. Crear el modelo Team
```csharp
public class Team
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string Location { get; set; }
    public bool IsActive { get; set; }
}
```

[Captura del modelo Team]

2. Agregar el DbSet en ApplicationDbContext
```csharp
public DbSet<Team> Teams { get; set; }
```

[Captura del DbContext]

3. Crear la migración
```bash
dotnet ef migrations add CreateTeamTable
```

[Captura de la migración]

4. Aplicar la migración a la base de datos
```bash
dotnet ef database update
```

[Captura de la actualización de la base de datos]

### API Endpoints

#### TeamApiController
- GET /api/TeamApi - Obtener todos los equipos
- GET /api/TeamApi/{id} - Obtener un equipo por ID
- POST /api/TeamApi - Crear un nuevo equipo
- PUT /api/TeamApi/{id} - Actualizar un equipo existente
- DELETE /api/TeamApi/{id} - Eliminar un equipo

[Captura de los endpoints en Swagger/Postman]

## Frontend (React)

### Estructura del Proyecto
```
ejemplos/e6-client-react/
├── src/
│   ├── components/
│   │   ├── TeamForm.tsx        # Formulario para crear/editar equipos
│   │   └── Navigation.tsx      # Barra de navegación
│   ├── pages/
│   │   ├── ListTeamsPage.tsx   # Lista de equipos
│   │   ├── CreateTeamPage.tsx  # Crear equipo
│   │   └── EditTeamPage.tsx    # Editar equipo
│   ├── services/
│   │   └── teamService.ts      # Servicios para llamadas API
│   ├── types/
│   │   └── Team.ts             # Definiciones de tipos
│   └── router/
│       └── index.tsx           # Configuración de rutas
```

### Pasos para implementar el CRUD

1. Definir tipos
```typescript
export interface Team {
    id: number;
    name: string;
    location: string;
    isActive: boolean;
}
```

[Captura de los tipos]

2. Crear servicio para llamadas API
```typescript
const API_URL = 'http://localhost:5134/api/TeamApi';
```

[Captura del servicio]

3. Implementar componentes React
- Formulario para crear/editar
- Lista de equipos
- Páginas de creación y edición

[Captura de los componentes]

4. Configurar rutas
```typescript
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <ListTeamsPage />,
            },
            {
                path: 'teams/create',
                element: <CreateTeamPage />,
            },
            {
                path: 'teams/edit/:id',
                element: <EditTeamPage />,
            },
        ],
    },
]);
```

[Captura de las rutas]

## Ejecutar el Proyecto

### Backend
1. Navegar al directorio del backend
```bash
cd ejemplos/e3-csharp
```

2. Ejecutar el proyecto
```bash
dotnet run
```

El backend estará disponible en: http://localhost:5134

### Frontend
1. Navegar al directorio del frontend
```bash
cd ejemplos/e6-client-react
```

2. Ejecutar el proyecto
```bash
npm run dev
```

El frontend estará disponible en: http://localhost:5173

## Solución de Problemas

### Backend
1. Si hay problemas con las migraciones:
```bash
dotnet ef database update --force
```

2. Si hay problemas con los paquetes:
```bash
dotnet clean
dotnet restore
```

### Frontend
1. Si hay problemas con las dependencias:
```bash
rm -rf node_modules
npm install
```

2. Si hay problemas con el caché:
```bash
npm cache clean --force
```

[Captura de la aplicación funcionando]
