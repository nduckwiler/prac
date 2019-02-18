using System;
using System.Collections.Generic;

namespace c_sharp_game.gameclasses 
{
    public class ThingList : List<Thing>
    {
        public string Describe() 
        {
            string s = "";
            if (this.Count == 0)
            {
                s = "nothing.";
            }
            else
            {
                foreach (Thing t in this)
                {
                    s = s + t.Describe() + "; ";
                }

            }
            

            return s;
        }

    }
}