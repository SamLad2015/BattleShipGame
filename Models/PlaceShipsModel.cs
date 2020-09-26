using System.Collections.Generic;
using BattleshipTest.Entities;

namespace BattleshipTest.Models
{
    public class PlaceShipsModel
    {
        public Board Board { get; set; }
        public IList<ShipModel> ShipModels { get; set; }
    }
}