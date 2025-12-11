using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MiProyectoMVC.Data;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configuración para APIs
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
    });

// Swagger configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "School Management API", 
        Version = "v1",
        Description = "API para gestión escolar",
        Contact = new OpenApiContact
        {
            Name = "Support",
            Email = "support@school.com"
        }
    });
});

// CORS configuration - MÁS PERMISIVO para desarrollo
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Database configuration
var connectionString = Environment.GetEnvironmentVariable("DEFAULT_CONNECTION");
if (string.IsNullOrEmpty(connectionString))
{
    // Fallback para desarrollo
    connectionString = "Server=DESKTOP-9E2G9DG;Database=MiProyectoMVC;Trusted_Connection=true;TrustServerCertificate=true;";
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();    
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "School API V1");
        c.RoutePrefix = "swagger"; // Acceder en /swagger
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// CORS - DEBE estar después de UseRouting y antes de UseAuthorization
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // Para APIs

app.Run();