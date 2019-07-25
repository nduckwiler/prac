using System;

namespace InterfacesInheritance
{
    class Sedan : Vehicle, IAutomobile
    {

        public Sedan(double speed) : base(speed)
        {
            Wheels = 4;
        }

        public override string Describe()
        {
            return $"This Sedan is on {Wheels} wheels, going {Speed} km/h.";
        }

    }
}