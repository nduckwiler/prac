using System;
using System.Collections.Generic;

namespace Generics
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Using generic methods:\n");
            Animal a = new Animal();
            Describe<Animal>(a);

            bool shouldBeEqual = CheckEquality<int>(1, 1);
            bool shouldBeEqual2 = CheckEquality<string>("hi", "hi");
            bool shouldNotBeEqual = CheckEquality<int>(1, 2);

            Console.WriteLine(shouldBeEqual);
            Console.WriteLine(shouldBeEqual2);
            Console.WriteLine(shouldNotBeEqual);

            Animal[] animals = new Animal[]
            {
                new Animal(),
                new Animal(),
                new Animal(),
            };
            MakeEverySound(animals);

            Console.WriteLine("\nUsing generic collections:\n");

            List<Animal> animalList = new List<Animal>();
            animalList.Add(new Animal("Doe", 4));
            animalList.Add(new Animal("Birdy", 2));
            animalList.Add(new Animal("Sssss", 0));

            foreach(Animal animal in animalList)
            {
                Console.WriteLine(animal);
            }

            Dictionary<string,Animal> animalDictionary = new Dictionary<string, Animal>();
            animalDictionary.Add("horse", new Animal("Whippy", 4));
            animalDictionary.Add("shark", new Animal("Bitey", 0));

            foreach (KeyValuePair<string, Animal> kvp in animalDictionary)
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}");
            }

        }

        // This works because Object implements:
        // the GetType() method, which is used by typeof()
        // and ToString() method, which is used by Console.WriteLine()
        static void Describe<T>(T t)
        {
            Type specificType = typeof(T);
            Console.WriteLine($"You asked me to describe a thing of type {specificType}");
            Console.WriteLine(t);
        }

        // This works because Object implements Equals() method
        static bool CheckEquality<T>(T first, T second)
        {
            return first.Equals(second);
        }

        // This works because T must extend the Animal class, which
        // has a MakeSound() method
        static void MakeEverySound<T>(T[] arr) where T : Animal
        {
            foreach (T element in arr)
            {
                Console.WriteLine(element.MakeSound());
            }
        }
    }
}
