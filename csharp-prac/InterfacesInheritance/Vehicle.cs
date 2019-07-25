using System;

namespace InterfacesInheritance
{
    class Vehicle
    {
      public string LicensePlate
      { get; }

      public double Speed
      { get; private set; }

      public int Wheels
      { get; }

      public Vehicle(double speed)
      {
        Speed = speed;
        LicensePlate = Tools.GenerateLicensePlate();
      }

      public virtual void SpeedUp()
      {
        Speed += 5;
      }

      public virtual void SlowDown()
      {
        Speed -= 5;
      }
      
    }
}

