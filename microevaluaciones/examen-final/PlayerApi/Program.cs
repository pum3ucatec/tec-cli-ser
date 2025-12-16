using Data;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

// 🔹 Cargar variables del archivo .env
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// 🔹 Leer la variable de entorno
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException("La variable de entorno DB_CONNECTION no está definida.");
}

// 🔹 Configurar DbContext con la cadena desde .env
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString)
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 CORS para React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDeveloperExceptionPage();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowReact");

app.UseAuthorization();
app.MapControllers();

app.Run();
