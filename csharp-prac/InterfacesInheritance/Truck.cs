using System;

namespace InterfacesInheritance
{
    class Truck : IAutomobile
    {
        public string LicensePlate
        { get; }

        public double Speed
        { get; }

        public int Wheels
        { get; }


    }
}