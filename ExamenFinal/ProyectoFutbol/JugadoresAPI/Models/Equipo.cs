public class Equipo
{
    public int Id { get; set; }

    public string Nombre { get; set; }
    public string Ciudad { get; set; }

    public Equipo(string nombre, string ciudad)
    {
        Nombre = nombre;
        Ciudad = ciudad;
    }
}
