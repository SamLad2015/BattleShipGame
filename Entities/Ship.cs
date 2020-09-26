using BattleshipTest.Enums;

namespace BattleshipTest.Entities
{
    public class Ship
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public ShipType Type { get; set; }
    }
}