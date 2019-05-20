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

      public ICollection<GameUser> GameUsers { get; set; }
    }
}