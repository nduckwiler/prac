using System;
using System.Collections.Generic;

namespace c_sharp_game.gameclasses
{
    public class RoomList : List<Room>
    {
        
        public RoomList()
        {

        }

        public Room FindRoom(string aRoomName)
        {
            Room desiredRoom = null;
            bool HasName(Room aRoom, string aName) => aRoom.Name == aName;
            
            foreach (Room r in this)
            {
                if (HasName(r, aRoomName))
                {
                    desiredRoom = r;
                }
            }

            return desiredRoom;
        }

        public string Describe()
        {
            string s = "";
            if (this.Count == 0)
            {
                s = "No rooms here.";
            }
            else
            {
                foreach (Room r in this)
                {
                    s = s + r.Describe() + "; \r\n";
                }
            }
            
            return s;
        }

    }
}