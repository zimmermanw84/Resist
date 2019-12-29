using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Resist.Models;

namespace Resist.Models
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        private readonly ResistContext _context;

        public GamesController(ResistContext context)
        {
            _context = context;
        }
        static readonly Dictionary<string, GameStatus> GameStatusMapping = new Dictionary<string, GameStatus>
        {
          { "Active", GameStatus.Active },
          { "Complete", GameStatus.Complete },
        };

        [HttpGet("{id}")]
        public IActionResult Show(int id)
        {
            var game = _context.Games
                .Where(g => g.GameId == id)
                .ToList();

            if (game == null)
            {
                return NotFound();
            }

            return Json(game);
        }


        [HttpGet("[action]/{id}")]
        public IActionResult CurrentGame(int id)
        {
            var gameCollection = _context.Games
                .Include(g => g.Missions)
                .Include(g => g.GameUsers)
                    .ThenInclude(gu => gu.User)
                .Where(g => g.GameId == id)
                .ToList();

            if (gameCollection.Count == 0)
            {
                return NotFound();
            }

            Game.GameConfig config = Game.Config(gameCollection.SelectMany(g => g.GameUsers).Count());

            return Json(new { game = gameCollection.First(), gameConfig = config });
        }


        [HttpGet]
        public IActionResult Index([FromQuery] string status)
        {
            // pretty brittle
            bool hasValidQuery = false;
            if (status != null) {
                hasValidQuery  = GameStatusMapping.ContainsKey(status);
            }
            // if status is provided and it's not valid bad request
            List<Game> games;
            if (status != null && !hasValidQuery)
            {
               return StatusCode(500);
            }
            if (hasValidQuery)
            {
                GameStatus Status = GameStatusMapping.GetValueOrDefault(status);
                games = _context.Games.Where(g => g.Status == Status).ToList();
            }
            else
            {
                games = _context.Games.ToList();
            }

            return Json(new { games = games });
        }
    }
}