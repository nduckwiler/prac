using System;
namespace csharp_prac
{
    public class Forest
    {
        private int _age;
        private string _name;
        private string _biome;
        private double _trees;

        // Constructor
        public Forest(string name)
        {
            _name = name;
        }

        // Second overload for constructor
        public Forest(string name, string biome)
        {
            _name = name;
            _biome = biome;
        }

        // expression-bodied get and set methods for name property
        public string Name
        {
            get => _name;
            set => _name = value;
        }

        // traditional get and set methods for biome property
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

        // shorthand get and set methods for age property
        public int Age
        { get; set; }
    }
}
