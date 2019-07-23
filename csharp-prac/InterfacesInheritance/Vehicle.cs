using System;

namespace InterfacesInheritance
{
    class Vehicle
    {
      protected double speed;
      private Guid guid;

      public double Speed {
        get {
          return this.speed;
        }
      }

      public Vehicle(double speed)
      {
        this.speed = speed;
        this.guid = Guid.NewGuid();
      }

      public virtual void SpeedUp()
      {
        this.speed += 5;
      }

      public virtual void SlowDown()
      {
        this.speed -= 5;
      }
      
    }
}
