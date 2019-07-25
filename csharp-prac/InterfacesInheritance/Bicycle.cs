using System;

namespace InterfacesInheritance
{
  class Bicycle : Vehicle
  {

    public Bicycle(double speed) : base(speed)
    {
      Wheels = 2;
    }

    public void SpeedUp()
    {
      Speed += 5;
      
      if (Speed > 15)
      {
        Speed = 15;
      }

    }

    public void SlowDown()
    {
      Speed -= 5;

      if (Speed < 0)
      {
        Speed = 0;
      }
    }

  }
}