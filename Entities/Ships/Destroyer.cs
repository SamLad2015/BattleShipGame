using BattleshipTest.Enums;

namespace BattleshipTest.Entities.Ships
{
    public class Destroyer : Ship
    {
        public Destroyer(string name)
        {
            Name = name;
            Size = 4;
            Type = ShipType.Destroyer;
        }
    }
}