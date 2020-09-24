using DemontfordTest.Enums;

namespace DemontfordTest.Entities.Ships
{
    public class Battleship : Ship
    {
        public Battleship(string name)
        {
            Name = name;
            Size = 5;
            Type = ShipType.Battleship;
        }
    }
}