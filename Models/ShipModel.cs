using DemontfordTest.Entities;
using DemontfordTest.Enums;

namespace DemontfordTest.Models
{
    public class ShipModel
    {
        public Ship Ship { get; set; }
        public ShipOrientation ShipOrientation { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
    }
}