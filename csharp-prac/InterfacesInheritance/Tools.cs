using System;

namespace InterfacesInheritance
{
    static class Tools
    {
      private static string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      
      public static string GenerateLicensePlate()
      {
        Random rand = new Random();
        string licensePlate = "";
        for (int i = 0; i < 8; i++)
        {
          licensePlate += chars[rand.Next(chars.Length)];
        }
        return licensePlate;
      }
    }
}