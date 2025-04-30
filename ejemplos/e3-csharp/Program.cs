using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using e3_csharp.Data;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // ✅ Leer la cadena de conexión desde appsettings.json
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

        // 🧪 Depuración (opcional)
        Console.WriteLine("🧪 Conexión cargada desde appsettings.json:");
        Console.WriteLine(string.IsNullOrEmpty(connectionString)
            ? "❌ No se encontró DefaultConnection"
            : connectionString);

        // 💾 Configuración del DbContext
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));

        // 📦 Configuración de controladores y JSON
        builder.Services.AddControllersWithViews();
        builder.Services.AddControllers()
            .AddNewtonsoftJson();

        // 📘 Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Person API",
                Version = "v1",
                Description = "API para manejo de personas, aulas y materias"
            });
        });

        // 🌐 CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin", policy =>
                policy.WithOrigins("http://localhost:3000")
                      .AllowAnyMethod()
                      .AllowAnyHeader()
                      .AllowCredentials());
        });

        var app = builder.Build();

        // 🔐 Middleware de errores
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }
        else
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Person API V1");
            });
        }

        // 🌍 Middleware base
        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        app.UseCors("AllowSpecificOrigin");
        app.UseAuthorization();

        // 🔁 Rutas
        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        app.MapControllers();

        app.Run();
    }
}
