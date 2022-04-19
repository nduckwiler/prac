using System;

namespace InterfacesInheritance
{
    interface IAutomobile
    {
      string LicensePlate { get; }
      double Speed { get; }
      int Wheels { get; }

    }
}