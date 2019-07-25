using System;

namespace InterfacesInheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            Sedan s = new Sedan(60);
            Console.WriteLine($"Sedan's license plate: {s.LicensePlate}");
            Console.WriteLine($"Sedan's speed: {s.Speed}");
            Console.WriteLine($"Sedan's wheels: {s.Wheels}");
            s.SpeedUp();
            Console.WriteLine($"Sedan's faster speed: {s.Speed}");


        }
    }
}
