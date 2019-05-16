using System;
namespace csharp_prac
{
    public class Forest
    {
        private int _age = 0;
        private string _biome;
        private double _trees;
        static string _treeFacts;

        // Static constructor
        // Run at most once before any instances are initialized
        static Forest()
        {
          _treeFacts = "Forests provide a diversity of ecosystem services including:\r\n" +
"converting carbon dioxide into oxygen and biomass.\r\n" +
"acting as a carbon sink.\r\n" +
"aiding in regulating climate.\r\n" +
"purifying water.\r\n" +
"mitigating natural hazards such as floods.\r\n" +
"serving as a genetic reserve.\r\n" +
"serving as a source of lumber and as recreational are\r\n";
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
            _biome = biome;
        }

        // Biome property: traditional get and set methods
        public string Biome
        {
            get { return _biome; }
            set 
            { 
              if (value == "tropical" || value == "temperate")
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

        // Name property: automatic, so a hidden Name field is backing this property
        public string Name
        { get; set; }

        // TreeFacts property: static get method for a static property
        public static string TreeFacts
        {
            get { return _treeFacts; }
        }

        // expression-bodied properties are not included here
        // https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties#expression-body-definitions

    }
}
