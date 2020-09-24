using System.Collections.Generic;
using DemontfordTest.Entities;
using DemontfordTest.Enums;
using DemontfordTest.Models;

namespace DemontfordTest.Interfaces
{
    public interface IShipCreator
    {
        IList<Ship> CreateShips(IList<NewShipModel> models);
    }
}