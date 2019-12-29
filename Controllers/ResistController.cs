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
        private readonly ResistContext _context;

        public ResistController(ResistContext context)
        {
            _context = context;
        }

        static Random random = new Random();

        ///
        /// This action scaffolds the entire game and all it's relationships
        /// will need to clean this up
        ///
        [HttpPost("[action]")]
        public async Task<IActionResult> StartGame([FromBody] List<int> UserIds)
        {
            Game newGame = new Game()
            {
                Status = GameStatus.Active
            };
            await _context.Games.AddAsync(newGame);
            await _context.SaveChangesAsync();
            // create players
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
            var GameConfig = Game.Config(UserIds.Count());

            List<GameUser> updateUsersWithRoles = SelectSpys(newPlayers, GameConfig.SpyCount);
            await _context.GameUsers.AddRangeAsync(updateUsersWithRoles);
            await _context.SaveChangesAsync();

            List<Mission> newMissions = new List<Mission>();
            // create missions (we always create 5 missions with no users associated)
            foreach(int missionNum in new List<int>() { 1, 2, 3, 4, 5 })
            {
                Mission mission = new Mission()
                {
                    MissionNumber = missionNum,
                    GameId = newGame.GameId,
                    Status = MissionStatus.Pending,
                };

                newMissions.Add(mission);
            }
            await _context.Missions.AddRangeAsync(newMissions);
            await _context.SaveChangesAsync();

            return Json(new { GameId = newGame.GameId });
        }

        protected List<GameUser> SelectSpys(List<GameUser> players, int spyCount)
        {
            while (spyCount != 0)
            {
                GameUser spy = players[random.Next(players.Count)];
                if (spy.Role == RoleType.Resistance)
                {
                    spy.Role = RoleType.Spy;
                    spyCount--;
                }
            }
            // should make a new collection probably
            return players;
        }
    }
}