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
              UserCountMisison1 = 2;
              UserCountMisison2 = 3;
              UserCountMisison3 = 2;
              UserCountMisison4 = 3;
              UserCountMisison5 = 3;
              SpyCount = 2;
              break;
            case 6:
              UserCountMisison1 = 2;
              UserCountMisison2 = 3;
              UserCountMisison3 = 4;
              UserCountMisison4 = 3;
              UserCountMisison5 = 4;
              SpyCount = 2;
              break;
            case 7:
              UserCountMisison1 = 2;
              UserCountMisison2 = 3;
              UserCountMisison3 = 3;
              UserCountMisison4 = 4;
              UserCountMisison5 = 4;
              SpyCount = 3;
              break;
            default:
              throw new InvalidUserCountExeption();
          }
        }

        public int SpyCount { get; set; }
        public int UserCountMisison1 { get; set; }
        public int UserCountMisison2 { get; set; }
        public int UserCountMisison3 { get; set; }
        public int UserCountMisison4 { get; set; }
        public int UserCountMisison5 { get; set; }
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