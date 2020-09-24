using System;
using System.Collections.Generic;
using DemontfordTest.Interfaces;
using DemontfordTest.Entities;
using DemontfordTest.Entities.Ships;
using DemontfordTest.Enums;
using DemontfordTest.Models;

namespace DemontfordTest.Implementations
{
    public class ShipCreator : IShipCreator
    {
        public IList<Ship> CreateShips(IList<NewShipModel> models)
        {
            IList<Ship> ships = new List<Ship>();
            try
            {
                foreach (var ship in models)
                {
                    switch (ship.Type)
                    {
                        case ShipType.Battleship:
                            ships.Add( new Battleship(ship.Name));
                            break;
                        case ShipType.Destroyer:
                            ships.Add( new Destroyer(ship.Name));
                            break;
                        default:
                            ships.Add( new Battleship(ship.Name));
                            break;
                    }
                }
                return ships;
            }
            catch (Exception ex)
            {
                throw new Exception($"Could not create ship : {ex.Message}");
            }
        }
    }
}