using System;
using System.Collections.Generic;
using DemontfordTest.Enums;
using Microsoft.AspNetCore.Mvc;
using DemontfordTest.Interfaces;
using DemontfordTest.Models;


namespace DemontfordTest.Controllers.v1
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    //[Route("api/[controller]")]
    public class ShipController : ControllerBase
    {
        private readonly IShipCreator _shipCreator;
        private readonly IShipPlacer _shipPlacer;
        
        public ShipController(
            IAttacker attacker,
            IBoardCreator boardCreator,
            IShipCreator shipCreator,
            IShipPlacer shipPlacer)
        {
            _shipCreator = shipCreator;
            _shipPlacer = shipPlacer;
        }
        
        
        [HttpPost(Name = nameof(AddShips))]
        public ActionResult AddShips(ApiVersion version, [FromBody] IList<NewShipModel> models)
        {
            try
            {
                var ships = _shipCreator.CreateShips(models);
                return Ok(ships);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        [HttpPut(Name = nameof(PlaceShips))]
        public ActionResult PlaceShips(ApiVersion version, [FromBody] PlaceShipsModel placeShipsModel)
        {
            try
            {
                var updatedBoard = _shipPlacer.AddShipsToBoard(placeShipsModel);
                return Ok(updatedBoard);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}