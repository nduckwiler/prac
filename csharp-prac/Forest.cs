using System;
namespace csharp_prac
{
    public class Forest
    {
        // FIELDS

        private int _age = 0;
        private string _biome;
        static string _treeFacts;

        // CONSTRUCTORS

        // Static constructor
        // Run at most once before any instances are initialized
        static Forest()
        {
            _treeFacts = "Forests provide a diversity of ecosystem services including: aiding in regulating climate.\\r\\n purifying water.\\r\\n   mitigating natural hazards such as floods.\\r\\n";
        }

        // First constructor
        public Forest(string name)
        {
            Name = name;
        }

        // Second constructor
        public Forest(string name, string biome)
        {
            Name = name;
            Biome = biome;
        }

        // PROPERTIES

        // Biome property: get and set methods
        public string Biome
        {
            get { return _biome; }
            set 
            { 
              if (value == "Tropical" || value == "Temperate" || value == "Boreal")
              {
                  _biome = value;
              } 
              else
              {
                  _biome = "Unknown";
              }
            }
        }

        // Age property: get method and private set method
        public int Age
        {
            get { return _age; }
            private set { _age = value; }
        }

        // Name property: automatic property
        public string Name { get; set; }

        // Trees property: automatic property
        public int Trees { get; set; }

        // TreeFacts property: static get method for a static property
        public static string TreeFacts
        {
            get { return _treeFacts; }
        }

        // expression-bodied properties are not included here
        // https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties#expression-body-definitions

    }
}
