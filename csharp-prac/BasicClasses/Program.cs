using System;

namespace BasicClasses
{
    class Program
    {
        static void Main(string[] args)
        {
            // Check static properties and methods
            Console.WriteLine($"Forests created: {Forest.ForestsCreated}");
            Forest.PrintTreeFacts();

            // Use first constructor
            Forest f = new Forest("Amazon");
            Console.WriteLine("\n- First forest -");
            Console.WriteLine($"Name: {f.Name}");
            Console.WriteLine($"Biome: {f.Biome}");
            Console.WriteLine($"Age: {f.Age}");

            // Use second constructor
            Forest g = new Forest("Congo", "Tropical");
            Console.WriteLine("\n- Second forest -");
            Console.WriteLine($"Name: {g.Name}");
            Console.WriteLine($"Biome: {g.Biome}");
            Console.WriteLine($"Age: {g.Age}");

            Console.WriteLine();

            // Check static property is updated in constructors
            Console.WriteLine($"Forests created: {Forest.ForestsCreated}\n");
            
            // Show that Age cannot be set outside of enclosing class.
            // This throws an error:
            // g.Age++;

            // Use methods
            Console.WriteLine($"At first, {g.Name} has {g.Trees} trees and {g.Age} years of age.");
            Console.WriteLine($"After growing, {g.Name} has {g.Grow()} trees and {g.Age} years of age.");
            Console.WriteLine($"After burning, {g.Name} has {g.Burn()} trees and {g.Age} years of age.");

        }
    }
}
