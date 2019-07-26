using System;

namespace Generics
{
    class Animal
    {
      public string Name
      { get; set; }
      
      public int Legs
      { get; set; }

      public Animal()
      {
        Name = "Fido";
        Legs = 4;
      }

      public Animal(string name, int legs)
      {
        Name = name;
        Legs = legs;
      }

      public override string ToString()
      {
        return $"This Animal is named {Name} with {Legs} legs.";
      }

      public string MakeSound()
      {
        return "rawr";
      }
    }
}