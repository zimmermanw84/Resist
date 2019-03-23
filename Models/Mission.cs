using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Resist.Models;

namespace Resist.Models
{
  public enum MissionStatus
  {
    Pending,
    Success,
    Failure,
  }
  public class Mission
  {
    public int MissionId { get; set; }

    public MissionStatus Status { get; set; }

    public int GameId { get; set; }

    public virtual ICollection<GameUser> GameUsers { get; set; }
  }
}