using System.Collections.Generic;
using BattleshipTest.Enums;
using BattleshipTest.Entities;
using BattleshipTest.Models;

namespace BattleshipTest.Interfaces
{
    public interface IShipCreator
    {
        IList<Ship> CreateShips(IList<NewShipModel> models);
    }
}