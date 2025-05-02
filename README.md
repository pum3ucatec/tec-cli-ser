🛠️ Guía para Crear y Ejecutar un Proyecto MVC en C# con .NET

🚀 Crear un nuevo proyecto MVC

dotnet new mvc -n e3-csharp
📁 Navegar a la carpeta del proyecto

cd e3-csharp

▶️ Ejecutar el servidor de desarrollo

dotnet run

🏗️ Compilar el proyecto

dotnet build

💡 Este comando compila el proyecto y verifica que no existan errores en el código fuente.

✅ ¡Listo!
Tu aplicación MVC básica en C# ya está lista para ser editada, extendida o desplegada.

![Image](https://github.com/user-attachments/assets/04f50261-8cb0-420c-bc00-5c2cf1c6190e)
![Image](https://github.com/user-attachments/assets/112a50c9-4176-4eea-a1f0-ce65ff62935f)
![Image](https://github.com/user-attachments/assets/179773fe-21a9-4ea8-a608-0030602238ca)

🔌 Conexiones a Base de Datos e Integración
📦 Agregar paquetes para trabajar con SQL Server y Entity Framework

dotnet add package Microsoft.Data.SqlClient
dotnet add package DotNetEnv
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools

🏗️ Compilar el proyecto nuevamente

dotnet build

▶️ Ejecutar el proyecto

dotnet run

🧱 Migraciones y Base de Datos
🔄 Actualizar la base de datos

dotnet ef database update

🏗️ Crear migración inicial

dotnet ef migrations add InitialCreate

➕ Agregar nueva migración (por ejemplo: AddSubject)

dotnet ef migrations add AddSubject

⚙️ Generador de Código ASP.NET
🧰 Instalar el generador de código

dotnet tool install --global dotnet-aspnet-codegenerator

🛠️ Generar controlador y vistas desde un modelo

dotnet aspnet-codegenerator controller -name SubjectController -m Subject -dc ApplicationDbContext -outDir Controllers -scripts

🧱 Arquitectura Cliente - Servidor
🔌 Paquetes adicionales para API y documentación Swagger

dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
dotnet add package Swashbuckle.AspNetCore

🌐 Abre Swagger en el navegador:
http://localhost:5134/swagger/index.html

⚛️ Proyecto Cliente con React (e6-client-react)
▶️ Iniciar el servidor backend (en carpeta e3-csharp)

dotnet run

▶️ Iniciar el servidor frontend (en carpeta e6-client-react)

npm install
npm run dev

🔄 Restaurar dependencias del backend

dotnet restore
✅ ¡Y listo! Con estos comandos tendrás el proyecto funcionando correctamente, tanto el backend en ASP.NET como el frontend en React.

![Image](https://github.com/user-attachments/assets/d7df216b-84bb-4ac8-9243-d393d9d181bd)
![Image](https://github.com/user-attachments/assets/0c931bfa-f2c3-4ac2-8825-fad060d746e8)
![Image](https://github.com/user-attachments/assets/a80eac4c-37b0-438c-af17-41de5da203a8)
![Image](https://github.com/user-attachments/assets/40b313d1-1f7d-40e7-a258-4b6b4eb81263)
![Image](https://github.com/user-attachments/assets/be1d7863-3966-48f3-8912-b4dc14e86a24)
