using System;
namespace csharp_prac
{
    public class AutoForest
    {
        private int _age = 0;
        private string _biome;
        private double _trees;

        // Static constructor no longer needed
        // TreeFacts value set in property declaration

        // First constructor
        public AutoForest(string name)
        {
            Name = name;
        }

        // Second constructor
        public AutoForest(string name, string biome)
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

        // Age property: automatic, only get method
        public int Age
        { get; }

        // Name property: automatic
        public string Name
        { get; set; }

        // TreeFacts property: static get method for a static property
        public static string TreeFacts
        {
            get { return "Forests provide a diversity of ecosystem services including: aiding in regulating climate.\\r\\n purifying water.\\r\\n   mitigating natural hazards such as floods.\\r\\n"; }
        }

        // expression-bodied properties are not included here
        // https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/properties#expression-body-definitions

    }
}
