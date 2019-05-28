using System;
namespace csharp_prac
{
    public class Forest
    {
        // FIELDS

        private int _age = 0;
        private string _name;
        private string _biome;
        private int _trees;
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
            _name = name;
        }

        // Second constructor
        public Forest(string name, string biome)
        {
            _name = name;
            _biome = biome;
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

        // Age property: only get method
        public int Age
        {
            get { return _age; }
        }

        // Name property: get and set method
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        // Trees property: get and set method
        public int Trees
        {
            get { return _trees; }
            set { _trees = value; }
        }

        // TreeFacts property: static get method for a static property
        public static string TreeFacts
        {
            get { return _treeFacts; }
        }

        // expression-bodied properties are not included here
        // https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties#expression-body-definitions

    }
}
