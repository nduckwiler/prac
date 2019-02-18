using System;

namespace c_sharp_game.gameclasses
{
    public class ThingHolder : Thing
    {
        private ThingList _things = new ThingList();

        public ThingHolder(string aName, string aDescription, ThingList aList) : base(aName, aDescription)
        {
            _things = aList;
        }
        public ThingHolder(string aName, string aDescription, bool aCanTake, ThingList aList) : base(aName, aDescription, aCanTake)
        {
            _things = aList;
        }

        public ThingList Things
        {
            get => _things;
        }
    }
}