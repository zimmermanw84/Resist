using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Resist.Models;

namespace Resist.Models
{
    [Route("api/[controller]")]
    public class GamesController : Controller
    {
        static readonly Dictionary<string, GameStatus> GameStatusMapping = new Dictionary<string, GameStatus>
        {
          { "Active", GameStatus.Active },
          { "Complete", GameStatus.Complete },
        };

        public async Task<IActionResult> Get([FromQuery] string status)
        {
            // pretty brittle
            bool hasValidQuery = GameStatusMapping.ContainsKey(status);
            // if status is provided and it's not valid bad request
            List<Game> games;
            if (status != null && !hasValidQuery)
            {
               return StatusCode(500);
            }
            using (var dbContext = new ResistContext())
            {
                if (hasValidQuery)
                {
                  GameStatus Status = GameStatusMapping.GetValueOrDefault(status);
                  games = dbContext.Games.Where(g => g.Status == Status).ToList();
                }
                else
                {
                    games = dbContext.Games.ToList();

                }
            }

            return Json(new { games = games });
        }
    }
}