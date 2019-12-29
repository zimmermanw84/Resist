using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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

    public int MissionNumber { get; set; }
    public int GameId { get; set; }

    [JsonIgnore]
    public virtual Game Game { get; set; }

    [JsonIgnore]
    public virtual ICollection<GameUserMission> GameUserMissions { get; set; }
  }
}