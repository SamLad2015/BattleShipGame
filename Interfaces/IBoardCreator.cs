using BattleshipTest.Entities;

namespace BattleshipTest.Interfaces
{
    public interface IBoardCreator
    {
         Board CreateBoard(int rows, int columns);
    }
}