using System;
using c_sharp_game.gameclasses;

namespace c_sharp_game
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Welcome to a text-based adventure game.\n");
            Console.WriteLine("Move rooms by entering `north`, `south`, `east`, or `west`.\n");

            Thing toy = new Thing("Toy", "A child's plaything", true);
            // Console.WriteLine(toy.Describe());

            ThingList nurseryList = new ThingList();
            // Console.WriteLine(nurseryList.Describe());
            nurseryList.Add(toy);
            nurseryList.Add(new Thing("Binky", "Put it in a child's mouth to silence it"));
            // Console.WriteLine(nurseryList.Describe());

            ThingList gardenList = new ThingList();
            gardenList.Add(new Thing("Sickle", "Used to cut, lop, or reap"));

            Room nursery = new Room("Nursery", "A room for young humans", "Garden", "No exit", "No exit", "No exit", nurseryList);
            Room garden = new Room("Garden", "A room for flora", "No exit", "No exit", "Nursery", "No exit", gardenList);
            // Console.WriteLine(nursery.Describe());

            Actor player = new Actor("You", "The player", nursery, new ThingList());
            // Console.WriteLine(player.Describe());

            RoomList map = new RoomList();
            map.Add(nursery);
            map.Add(garden);
            // Console.WriteLine(map.Describe());

            string input = Console.ReadLine();
            string exit;
            Room r = player.CurrentRoom;

            switch (input)
            {
                case "north":
                    exit = r.North;
                    break;
                case "east":
                    exit = r.East;
                    break;
                case "south":
                    exit = r.South;
                    break;
                case "west":
                    exit = r.West;
                    break;
                default:
                    exit = "No exit";
                    break;
            }

            Console.WriteLine("Moving to... " + map.FindRoom(exit).Describe());


            
        }
    }
}
