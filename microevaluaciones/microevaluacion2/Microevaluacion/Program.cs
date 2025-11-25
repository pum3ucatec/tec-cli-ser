using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using MiProyectoActivos.Data; // namespace que usaremos para el DbContext

var builder = WebApplication.CreateBuilder(args);

// Cargar .env (asegúrate de instalar DotNetEnv)
Env.Load(); // lee .env en la raiz del proyecto

var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");
if (string.IsNullOrEmpty(connectionString))
{
    throw new Exception("DB_CONNECTION no está definida en .env");
}

// Registrar DbContext con SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
