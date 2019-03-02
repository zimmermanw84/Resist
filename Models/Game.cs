using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Resist.Models
{
    public enum GameStatus
    {
      Active,
      Complete,
    }
    public class Game
    {
      public int GameId { get; set; }

      public GameStatus Status { get; set; }

      public List<GameUser> GameUsers { get; set; }
    }
}