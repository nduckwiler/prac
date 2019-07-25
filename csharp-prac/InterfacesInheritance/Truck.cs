using System;

namespace InterfacesInheritance
{
    class Truck : IAutomobile
    {
        public string LicensePlate
        { get; }

        public double Speed
        { get; private set; }

        public int Wheels
        { get; }

        public double Weight
        { get; }

        public Truck(double speed, double weight)
        {
            Speed = speed;
            LicensePlate = Tools.GenerateLicensePlate();
            Weight = weight;
            
            if (weight > 400)
            {
                Wheels = 8;
            }
            else
            {
                Wheels = 12;
            }
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