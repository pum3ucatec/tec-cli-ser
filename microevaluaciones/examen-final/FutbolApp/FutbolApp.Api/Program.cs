// FutbolApp.Api/Program.cs
using Microsoft.EntityFrameworkCore;
using FutbolApp.Api.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Configuración de la Cadena de Conexión con EF Core
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                       ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Añadir servicios al contenedor.
builder.Services.AddControllers();
// 2. Swagger/OpenAPI (Documentación API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. Configuración CORS para que React (Frontend) pueda comunicarse
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin() // En producción, se debería especificar el dominio de React
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Usar la política CORS
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();