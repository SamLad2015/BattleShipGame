using DemontfordTest.Entities;
using DemontfordTest.Enums;

namespace DemontfordTest.Interfaces
{
    public interface IAttacker
    {
         AttackStatus Attack(Board board, int row, int column);
    }
}