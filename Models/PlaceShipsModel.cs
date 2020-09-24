using System.Collections.Generic;
using DemontfordTest.Entities;

namespace DemontfordTest.Models
{
    public class PlaceShipsModel
    {
        public Board Board { get; set; }
        public IList<ShipModel> ShipModels { get; set; }
    }
}