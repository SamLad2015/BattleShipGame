using BattleshipTest.Entities;
using BattleshipTest.Enums;

namespace BattleshipTest.Interfaces
{
    public interface IAttacker
    {
         AttackStatus Attack(Board board, int row, int column);
    }
}