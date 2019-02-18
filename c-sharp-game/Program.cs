using System;
using c_sharp_game.gameclasses;

namespace c_sharp_game
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to a text-based adventure game.");

            Thing toy = new Thing("Toy", "A child's plaything", true);
            Console.WriteLine(toy.Describe());

            ThingList nurseryList = new ThingList();
            Console.WriteLine(nurseryList.Describe());
            nurseryList.Add(toy);
            nurseryList.Add(new Thing("Binky", "Put it in a child's mouth to silence it"));
            Console.WriteLine(nurseryList.Describe());

            Room nursery = new Room("Nursery", "A room for young humans", "No exit", "No exit", "No exit", "No exit", nurseryList);
            Console.WriteLine(nursery.Describe());
        }
    }
}
