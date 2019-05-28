using System;

namespace csharp_prac
{
    class Program
    {
        static void Main(string[] args)
        {
            // Use first constructor
            Forest f = new Forest("Amazon");
            Console.WriteLine("First forest-");
            Console.WriteLine($"Name: {f.Name}");
            Console.WriteLine($"Biome: {f.Biome}");
            Console.WriteLine($"Age: {f.Age}");

            // Use second constructor
            Forest g = new Forest("Congo", "tropical");
            Console.WriteLine("Second forest-");
            Console.WriteLine($"Name: {g.Name}");
            Console.WriteLine($"Biome: {g.Biome}");
            Console.WriteLine($"Age: {g.Age}");

            // Use static property
            Console.WriteLine(Forest.TreeFacts);

            // Show that Age cannot be set outside of enclosing class.
            // This throws an error:
            // g.Age++;

        }
    }
}
