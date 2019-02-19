using System;

namespace c_sharp_game.gameclasses
{
    public class Room : ThingHolder
    {
        private string _north, _east, _south, _west;
        
        public Room(string aName, string aDescription,
            string north, string east, string south, string west,
            ThingList aList) : base(aName, aDescription, aList)
        {
            _north = north;
            _east = east;
            _south = south;
            _west = west;
        }

        public string North
        {
            get => _north;
        }
        public string East
        {
            get => _east;
        }
        public string South
        {
            get => _south;
        }
        public string West
        {
            get => _west;
        }

        public override string Describe()
        {
            return this.Name + ": " + this.Description + "\r\nIn this room we find... " + this.Things.Describe();
        }
    }
}