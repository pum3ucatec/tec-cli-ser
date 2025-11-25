using Microsoft.EntityFrameworkCore;
using CompanyAssets.Data;
using CompanyAssets.Models;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllersWithViews();


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("Server=DESKTOP-9E2G9DG;Database=CompanyAssetsDB;Trusted_Connection=true;TrustServerCertificate=true;"));

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        
  
        var canConnect = context.Database.CanConnect();
        Console.WriteLine($"✅ Conexión a SQL Server exitosa: {canConnect}");
        

        if (!context.Assets.Any())
        {
            Console.WriteLine("ℹ️ La tabla Assets está vacía");
        }
        else
        {
            Console.WriteLine("✅ La base de datos ya contiene datos");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Error de conexión: {ex.Message}");
    }
}


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