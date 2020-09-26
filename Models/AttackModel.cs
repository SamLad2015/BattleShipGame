using BattleshipTest.Entities;

namespace BattleshipTest.Models
{
    public class AttackModel
    {
        public Board Board { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
    }
}