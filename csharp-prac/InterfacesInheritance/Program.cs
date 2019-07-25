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

            Truck t = new Truck(60, 750);
            Console.WriteLine($"Sedan's license plate: {t.LicensePlate}");
            Console.WriteLine($"Sedan's speed: {t.Speed}");
            Console.WriteLine($"Sedan's wheels: {t.Wheels}");
            Console.WriteLine($"Sedan's weight: {t.Weight}");
            t.SpeedUp();
            Console.WriteLine($"Sedan's faster speed: {t.Speed}");
           
            Bicycle b = new Bicycle(5);
            Console.WriteLine($"Sedan's license plate: {b.LicensePlate}");
            Console.WriteLine($"Sedan's speed: {b.Speed}");
            Console.WriteLine($"Sedan's wheels: {b.Wheels}");
            b.SpeedUp();
            Console.WriteLine($"Sedan's faster speed: {b.Speed}");


        }
    }
}
