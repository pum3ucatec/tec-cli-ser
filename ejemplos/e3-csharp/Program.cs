using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using e3_csharp.Data;

internal class Program
{
    private static void Main(string[] args)
    {
        // Cargar variables desde .env
        Env.Load();

        var builder = WebApplication.CreateBuilder(args);

        // 🔧 Agregar soporte a controladores con vistas y APIs
        builder.Services.AddControllersWithViews();
        builder.Services.AddControllers()
            .AddNewtonsoftJson();

        // 🌐 Configurar Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Person API",
                Version = "v1",
                Description = "API para manejo de personas"
            });
        });

        // 🔓 Configurar CORS para permitir conexión desde React (localhost:5173)
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReact", policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                      .AllowAnyMethod()
                      .AllowAnyHeader();
            });
        });

        // 🗄️ Configuración de la base de datos
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(Environment.GetEnvironmentVariable("DEFAULT_CONNECTION")));

        var app = builder.Build();

        // 🛠️ Middleware
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

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        app.UseRouting();

        // ✅ Aplicar la política de CORS
        app.UseCors("AllowReact");

        app.UseAuthorization();

        // 🌐 Rutas MVC tradicionales (razor)
        app.MapControllerRoute(
            name: "default",
            pattern: "{controller=Home}/{action=Index}/{id?}");

        // 🌐 Rutas API
        app.MapControllers();

        app.Run();
    }
}
