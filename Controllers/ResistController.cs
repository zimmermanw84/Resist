using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Resist.Models;

namespace Resist.Controllers
{
    [Route("api/[controller]")]
    public class ResistController : Controller
    {
        // Later we'll make this dynamic
        // for now we're hardcoding players
        static readonly int SpyCount = 2;

        static Random random = new Random();

        [HttpPost("[action]")]
        public async Task<IActionResult> StartGame([FromBody] List<int> UserIds)
        {
            using (var dbContext = new ResistContext())
            {
                Game newGame = new Game()
                {
                    Status = GameStatus.Active
                };
                await dbContext.Games.AddAsync(newGame);
                await dbContext.SaveChangesAsync();
                List<GameUser> newPlayers = new List<GameUser>();

                foreach(int userId in UserIds) {
                    // We're starting by creating all the necessary instances
                    // setting their role to resistance then will randomly select 2 to be spys
                    GameUser player = new GameUser()
                    {
                        UserId = userId,
                        GameId = newGame.GameId,
                        Role = RoleType.Resistance
                    };

                    newPlayers.Add(player);
                }

                // Mutates users - picks the spys
                SelectSpys(newPlayers);
                await dbContext.GameUsers.AddRangeAsync(newPlayers);
                await dbContext.SaveChangesAsync();

                return Json(new { GameId = newGame.GameId });
            }
        }

        protected void SelectSpys(List<GameUser> players)
        {
            int spyCount = SpyCount;
            while (spyCount != 0)
            {
                GameUser spy = players[random.Next(players.Count)];
                if (spy.Role == RoleType.Resistance)
                {
                    spy.Role = RoleType.Spy;
                    spyCount--;
                }
            }
        }
    }
}