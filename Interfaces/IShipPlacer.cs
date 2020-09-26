using System.Collections.Generic;
using BattleshipTest.Entities;
using BattleshipTest.Enums;
using BattleshipTest.Models;

namespace BattleshipTest.Interfaces
{
    public interface IShipPlacer
    {
        PlaceShipsModel AddShipsToBoard(PlaceShipsModel placeShipsModel);
    }
}