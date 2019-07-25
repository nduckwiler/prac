using System;

namespace InterfacesInheritance
{
    class Sedan : Vehicle, IAutomobile
    {

        public Sedan(double speed) : base(speed)
        {
            Wheels = 4;
        }

    }
}