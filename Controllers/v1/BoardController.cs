using System;
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
    public class BoardController : ControllerBase
    {
        private readonly IAttacker _attacker;
        private readonly IBoardCreator _boardCreator;

        public BoardController(
            IAttacker attacker,
            IBoardCreator boardCreator)
        {
            _attacker = attacker;
            _boardCreator = boardCreator;
        }

        [HttpGet(Name = nameof(CreateBoard))]
        public ActionResult CreateBoard(ApiVersion version)
        {
            try
            {
                return Ok(_boardCreator.CreateBoard(10, 10));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        [HttpPost(Name = nameof(AttemptAttack))]
        public ActionResult AttemptAttack(ApiVersion version, [FromBody] AttackModel model)
        {
            try
            {
                var status = _attacker.Attack(model.Board, model.Row, model.Column);
                return Ok(status);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
