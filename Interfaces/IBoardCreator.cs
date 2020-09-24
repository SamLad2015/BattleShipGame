using DemontfordTest.Entities;

namespace DemontfordTest.Interfaces
{
    public interface IBoardCreator
    {
         Board CreateBoard(int rows, int columns);
    }
}