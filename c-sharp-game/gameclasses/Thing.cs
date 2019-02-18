using System;

namespace c_sharp_game.gameclasses
{
  // Thing class
  // Base class that define the Things in this game

  public class Thing
  {
    private string _name;
    private string _description;
    private bool _canTake;

    // Standard constructor
    public Thing(string aName, string aDescription)
    {
      _name = aName;
      _description = aDescription;
      _canTake = true;
    }

    // Alternate constructor
    public Thing(string aName, string aDescription, bool aCanTake)
    {
      _name = aName;
      _description = aDescription;
      _canTake = aCanTake;
    }

    // Name property
    public string Name 
    {
      get => _name;
    }

    // Description property
    public string Description 
    {
      get => _description;
    }

    // A virtual method
    public virtual string Describe()
    {
      return Name + ": " + Description;
    }

  }

}
