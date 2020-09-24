using DemontfordTest.Enums;

namespace DemontfordTest.Entities.Ships
{
    public class Destroyer : Ship
    {
        public Destroyer(string name)
        {
            Name = name;
            Size = 4;
            ShipType = ShipType.Destroyer;
        }
    }
}