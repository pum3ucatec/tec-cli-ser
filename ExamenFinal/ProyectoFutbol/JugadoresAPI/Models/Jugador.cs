using System;
using System.ComponentModel.DataAnnotations;

namespace JugadoresAPI.Models
{
    public class Jugador
    {
        public int Id { get; set; }

        [Required]  
        public string Nombre { get; set; }

        public int Edad { get; set; }

        [Required]
        public string Posicion { get; set; }

        [Required]
        public string Equipo { get; set; }

        public DateTime FechaNacimiento { get; set; }

        public string Habilidades { get; set; }

        public Jugador(string nombre, int edad, string posicion, string equipo, DateTime fechaNacimiento, string habilidades)
        {
            Nombre = nombre;
            Edad = edad;
            Posicion = posicion;
            Equipo = equipo;
            FechaNacimiento = fechaNacimiento;
            Habilidades = habilidades;
        }
    }
}
