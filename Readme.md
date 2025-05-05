Pasos para compilar y ejecutar la aplicación .NET
🛠️ 1. Compilar el proyecto

dotnet build

✅ Este comando compila todo el código fuente del proyecto. Es necesario para asegurarse de que no haya errores de compilación y que el proyecto esté listo para ejecutarse.

▶️ 2. Ejecutar la aplicación

dotnet run

🌐 Esto iniciará la aplicación web en:
http://localhost:5134

🗃️ 3. Crear la base de datos

dotnet ef database update

🧱 Este comando crea o actualiza la base de datos utilizando los modelos definidos con Entity Framework Core.
Asegura que las tablas y estructuras estén correctamente configuradas.

⛔ 4. Detener la aplicación (para reiniciar)

taskkill /F /IM e3-csharp.exe

🛑 Este comando fuerza el cierre de cualquier instancia en ejecución de la aplicación.
Útil si necesitas reiniciar después de hacer cambios en el código.

📌 Explicación de cada paso
✅ Compilar el proyecto garantiza que el código no tenga errores.

🚀 Ejecutar la aplicación la pone en marcha en el servidor web local.

🗄️ Crear la base de datos se realiza automáticamente con dotnet ef database update.

🔁 Reiniciar la app puede ayudar si encuentras errores o necesitas aplicar cambios recientes.

🌐 Rutas disponibles en la aplicación

📋 Ver materias: http://localhost:5134/Subject

➕ Crear nueva materia: http://localhost:5134/Subject/Create

🔍 Detalles de materia (ej. ID = 1): http://localhost:5134/Subject/Details/1