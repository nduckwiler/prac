using System;
using c_sharp_game.gameclasses;

namespace c_sharp_game
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to a text-based adventure game.");

            Thing toy = new Thing("Toy", "A child's plaything.", true);
            Console.WriteLine(toy.Describe());
        }
    }
}
