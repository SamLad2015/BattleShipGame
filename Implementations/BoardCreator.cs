using System;
using BattleshipTest.Entities;
using BattleshipTest.Enums;
using BattleshipTest.Interfaces;

namespace BattleshipTest.Implementations
{
    public class BoardCreator : IBoardCreator
    {
        public Board CreateBoard(int rows, int columns) 
        {
            try
            {
                BoardCellStatus[,] statusArray = new BoardCellStatus[rows, columns];
                for (int row = 0; row < rows; row++)
                {
                    for (int column = 0; column < columns; column++)
                    {
                        statusArray[row, column] = BoardCellStatus.Unoccupied;
                    }
                }
                
                return new Board
                {
                    BoardCellStatuses = statusArray,
                    Rows = rows,
                    Columns = columns
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"Error while creating board : {ex.Message}");
            }
        }
    }
}