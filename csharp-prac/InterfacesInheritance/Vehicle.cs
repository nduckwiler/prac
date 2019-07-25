using System;

namespace InterfacesInheritance
{
    abstract class Vehicle
    {
      public string LicensePlate
      { get; protected set; }

      public double Speed
      { get; protected set; }

      public int Wheels
      { get; protected set; }

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

      public abstract string Describe();
      
    }
}

