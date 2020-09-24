using DemontfordTest.Entities;
using DemontfordTest.Interfaces;
using DemontfordTest.Enums;
using System;
using System.Collections.Generic;
using DemontfordTest.Models;

namespace DemontfordTest.Implementations
{
    public class ShipPlacer : IShipPlacer
    {
        public PlaceShipsModel AddShipsToBoard(PlaceShipsModel placeShipsModel)
        {
            foreach (var model in placeShipsModel.ShipModels)
            {
                placeShipsModel.Board = AddShipModel(model, placeShipsModel.Board);
            }

            return placeShipsModel;
        }

        private Board AddShipModel(ShipModel model, Board board)
        {
            Validate(model.Ship, model.ShipOrientation, board, model.Row, model.Column);

            for (int i = 0; i < model.Ship.Size; i++)
            {
                if (model.ShipOrientation == ShipOrientation.Horizontal)
                {
                    board.BoardCellStatuses[model.Row, model.Column + i] = BoardCellStatus.Occupied;
                }
                else
                {
                    board.BoardCellStatuses[model.Row + i, model.Column] = BoardCellStatus.Occupied;
                }

                board.OccupationCount++;
            }

            return board;
        }

        private void Validate(Ship ship, ShipOrientation orientation, Board board, int row, int column)
        {
            var errorMessage = "Ship's placement position is out of bounds";
            
            if (row > board.Rows)
            {
                throw new IndexOutOfRangeException(errorMessage);
            }

            if (column > board.Columns)
            {
                throw new IndexOutOfRangeException(errorMessage);
            }

            if (orientation == ShipOrientation.Horizontal)
            {
                if (column + ship.Size > board.Columns)
                {
                    throw new IndexOutOfRangeException(errorMessage);
                }
            }
            else
            {
                if (row + ship.Size > board.Rows)
                {
                    throw new IndexOutOfRangeException(errorMessage);
                }
            }
        }
    }
}
