using System;

namespace InterfacesInheritance
{
    class Sedan : IAutomobile
    {
        public string LicensePlate
        { get; }

        public double Speed
        { get; }

        public int Wheels
        { get; }

    }
}