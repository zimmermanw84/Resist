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

        private readonly ResistContext _context;

        public ResistController(ResistContext context)
        {
            _context = context;
        }

        static Random random = new Random();

        [HttpPost("[action]")]
        public async Task<IActionResult> StartGame([FromBody] List<int> UserIds)
        {
            Game newGame = new Game()
            {
                Status = GameStatus.Active
            };
            await _context.Games.AddAsync(newGame);
            await _context.SaveChangesAsync();
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

                await _context.GameUsers.AddAsync(player);
                newPlayers.Add(player);
            }

            // Mutates users - picks the spys
            SelectSpys(newPlayers);
            // await _context.GameUsers.AddAsync(newPlayers);
            await _context.SaveChangesAsync();

            return Json(new { GameId = newGame.GameId });
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