using System;

namespace csharp_prac
{
    class Program
    {
        static void Main(string[] args)
        {
            Forest f = new Forest("Amazon");
            Console.WriteLine("First forest-");
            Console.WriteLine($"Name: {f.Name}");
            Console.WriteLine($"Age: {f.Age}");

            Forest g = new Forest("Congo", "tropical");
            Console.WriteLine("Second forest-");
            Console.WriteLine($"Name: {g.Name}");
            Console.WriteLine($"Biome: {g.Biome}");
            Console.WriteLine($"Age: {g.Age}");

        }
    }
}
