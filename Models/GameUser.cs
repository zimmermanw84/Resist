using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Resist.Models
{
    public enum RoleType
    {
      Resistance,
      Spy
    }
    public class GameUser
    {
      public int GameUserId { get; set; }
      public RoleType Role { get; set; }
      public int UserId { get; set; }
      public int GameId { get; set; }
      public User User { get; set; }
      public Game Game { get; set; }
      // public virtual ICollection<Mission> Missions { get; set; }
    }
}