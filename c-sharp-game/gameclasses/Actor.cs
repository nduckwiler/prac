using System;

namespace c_sharp_game.gameclasses
{

  public class Actor : ThingHolder
  {
      private Room _currentRoom;
      
      public Actor(string aName, string aDescription, Room aRoom, ThingList aThingList)
      : base(aName, aDescription, aThingList)
      {
          _currentRoom = aRoom;
      }

      public Room CurrentRoom
      {
          get => _currentRoom;
      }

      public override string Describe()
      {
          return Name + "are currently in... " + _currentRoom.Describe() + "\r\nHolding... " + Things.Describe();
      }
  }
}