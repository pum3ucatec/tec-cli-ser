using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddDbContext<FutbolDb>(opt =>
    opt.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=FutbolDB;Trusted_Connection=true;TrustServerCertificate=true"));
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API de Jugadores de Fútbol",
        Version = "v1",
        Description = "API REST para gestionar jugadores de fútbol con operaciones CRUD completas"
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Jugadores v1");
    c.RoutePrefix = string.Empty;
});

app.UseCors("AllowAll");

app.MapGet("/api/jugadores", async (FutbolDb db) =>
    await db.Jugadores.ToListAsync())
    .WithName("ObtenerTodosLosJugadores")
    .WithTags("Jugadores");

app.MapGet("/api/jugadores/{id}", async (int id, FutbolDb db) =>
    await db.Jugadores.FindAsync(id) is Jugador j 
        ? Results.Ok(j) 
        : Results.NotFound())
    .WithName("ObtenerJugadorPorId")
    .WithTags("Jugadores");

app.MapPost("/api/jugadores", async (Jugador jugador, FutbolDb db) =>
{
    db.Jugadores.Add(jugador);
    await db.SaveChangesAsync();
    return Results.Created($"/api/jugadores/{jugador.Id}", jugador);
})
    .WithName("CrearJugador")
    .WithTags("Jugadores");

app.MapPut("/api/jugadores/{id}", async (int id, Jugador input, FutbolDb db) =>
{
    var jugador = await db.Jugadores.FindAsync(id);
    if (jugador is null) return Results.NotFound();
    
    jugador.Nombre = input.Nombre;
    jugador.Posicion = input.Posicion;
    jugador.Edad = input.Edad;
    jugador.Equipo = input.Equipo;
    jugador.Numero = input.Numero;
    
    await db.SaveChangesAsync();
    return Results.Ok(jugador);
})
    .WithName("ActualizarJugador")
    .WithTags("Jugadores");

app.MapDelete("/api/jugadores/{id}", async (int id, FutbolDb db) =>
{
    if (await db.Jugadores.FindAsync(id) is Jugador j)
    {
        db.Jugadores.Remove(j);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
    return Results.NotFound();
})
    .WithName("EliminarJugador")
    .WithTags("Jugadores");

Console.WriteLine("🚀 API iniciada en http://localhost:5000");
app.Run();