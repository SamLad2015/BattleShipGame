using System;
using System.Collections.Generic;
using BattleshipTest.Entities;
using BattleshipTest.Entities.Ships;
using BattleshipTest.Enums;
using BattleshipTest.Interfaces;
using BattleshipTest.Models;

namespace BattleshipTest.Implementations
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
                        default:
                            ships.Add( new Battleship(ship.Name));
                            break;
                        case ShipType.Destroyer:
                            ships.Add( new Destroyer(ship.Name));
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