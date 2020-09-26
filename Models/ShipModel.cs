using BattleshipTest.Entities;
using BattleshipTest.Enums;

namespace BattleshipTest.Models
{
    public class ShipModel
    {
        public Ship Ship { get; set; }
        public ShipOrientation ShipOrientation { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
    }
}