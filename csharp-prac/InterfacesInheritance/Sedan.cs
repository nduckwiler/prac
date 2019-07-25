using System;

namespace InterfacesInheritance
{
    class Sedan : IAutomobile
    {
        public string LicensePlate
        { get; }

        public double Speed
        { get; private set; }

        public int Wheels
        { get; }

        public Sedan(double speed)
        {
            Speed = speed;
            LicensePlate = Tools.GenerateLicensePlate();
            Wheels = 4;
        }
        public void SpeedUp()
        {
            this.Speed += 5;
        }

        public void SlowDown()
        {
            this.Speed -= 5;
        }

    }
}