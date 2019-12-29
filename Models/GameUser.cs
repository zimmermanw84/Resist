using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using Newtonsoft.Json;

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
      public virtual User User { get; set; }
      [JsonIgnore]
      public virtual Game Game { get; set; }
      // public virtual ICollection<Mission> Missions { get; set; }
    }
}