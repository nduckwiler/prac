using System;

namespace InterfacesInheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Constructing Vehicle type");
            Vehicle v = new Vehicle(60);
            Console.WriteLine($"Vehicle' speed: {v.Speed}");
            v.SpeedUp();
            v.SpeedUp();
            Console.WriteLine($"Vehicle's new speed: {v.Speed}");

            Console.WriteLine("Constructing Sedan type");
            Sedan s = new Sedan(50);
            Console.WriteLine($"Sedan's speed: {s.Speed}");
            s.SpeedUp();
            s.SpeedUp();
            Console.WriteLine($"Sedan's new speed: {s.Speed}");


        }
    }
}
