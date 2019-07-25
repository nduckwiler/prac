using System;

namespace InterfacesInheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            Sedan s = new Sedan(60);
            Console.WriteLine($"Sedan's license plate: {s.LicensePlate}");
            Console.WriteLine(s.Describe());
            s.SpeedUp();
            Console.WriteLine($"Sedan's faster speed: {s.Speed}");

            Truck t = new Truck(60, 750);
            Console.WriteLine($"Truck's license plate: {t.LicensePlate}");
            Console.WriteLine(t.Describe());
            Console.WriteLine($"Truck's weight: {t.Weight}");
            t.SpeedUp();
            Console.WriteLine($"Truck's faster speed: {t.Speed}");
           
            Bicycle b = new Bicycle(5);
            Console.WriteLine($"Bicyle's license plate: {b.LicensePlate}");
            Console.WriteLine(b.Describe());
            b.SpeedUp();
            Console.WriteLine($"Bicycle's faster speed: {b.Speed}");


        }
    }
}
