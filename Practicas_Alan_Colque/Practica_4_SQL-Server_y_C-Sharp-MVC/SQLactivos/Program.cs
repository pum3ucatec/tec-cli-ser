using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using SQLactivos.Data;

var builder = WebApplication.CreateBuilder(args);

// Cargar variables .env
Env.Load();

// Configurar conexión
string dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "DESKTOP-9E2G9DG";
string dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "";
string dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "ActivosDB";

string connectionString;


if (string.IsNullOrEmpty(dbPort))
{
    connectionString = 
        $"Server={dbHost};" +
        $"Database={dbName};" +
        "Trusted_Connection=true;" +
        "TrustServerCertificate=True;";
}
else
{
    connectionString = 
        $"Server={dbHost},{dbPort};" +
        $"Database={dbName};" +
        "Trusted_Connection=true;" +
        "TrustServerCertificate=True;";
}

Console.WriteLine($"Conectando a: {connectionString}");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();