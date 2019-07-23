using System;

namespace InterfacesInheritance
{
    class Sedan : Vehicle
    {
        /*
        If you delete this constructor, you'll find an error:
        There is no argument given that corresponds to the required formal parameter 'speed' of 'Vehicle.Vehicle(double)' (CS7036) [InterfacesInheritance]
        
        In other words, the Sedan type constructor MUST call a Vehicle constructor.
        Normally, if we didn't explicitly call the Vehicle constructor,
        the compiler would implicitly call Vehicle's default parameterless constructor.
        But that doesn't exist because we defined a one-parameter constructor.
         */ 

        public Sedan(double speed) : base(speed)
        {

        }

        public override void SpeedUp()
        {
            this.speed += 5;

        }

    }
}