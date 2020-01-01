using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Resist.Models
{
    public enum GameStatus
    {
      Active = 1,
      Complete = 2,
    }
    public class Game
    {
      public int GameId { get; set; }

      public GameStatus Status { get; set; }

      public virtual ICollection<GameUser> GameUsers { get; set; }
      public virtual ICollection<Mission> Missions { get; set; }

      public static GameConfig Config(int playerCount)
      {
        return new GameConfig(playerCount);
      }

      public sealed class GameConfig
      {

        public GameConfig(int playerCount)
        {
          // we're only handling 5-7 player count case
          // super janky but w/e
          switch(playerCount)
          {
            case 5:
              UserCountMission1 = 2;
              UserCountMission2 = 3;
              UserCountMission3 = 2;
              UserCountMission4 = 3;
              UserCountMission5 = 3;
              SpyCount = 2;
              break;
            case 6:
              UserCountMission1 = 2;
              UserCountMission2 = 3;
              UserCountMission3 = 4;
              UserCountMission4 = 3;
              UserCountMission5 = 4;
              SpyCount = 2;
              break;
            case 7:
              UserCountMission1 = 2;
              UserCountMission2 = 3;
              UserCountMission3 = 3;
              UserCountMission4 = 4;
              UserCountMission5 = 4;
              SpyCount = 3;
              break;
            default:
              throw new InvalidUserCountExeption();
          }
        }

        public int SpyCount { get; set; }
        public int UserCountMission1 { get; set; }
        public int UserCountMission2 { get; set; }
        public int UserCountMission3 { get; set; }
        public int UserCountMission4 { get; set; }
        public int UserCountMission5 { get; set; }
      }
    }

    [Serializable]
    class InvalidUserCountExeption : Exception
    {
        public InvalidUserCountExeption()
            : base("Invalid Player Count: Only 5-7 players are supported")
        {
        }
      
    }
}