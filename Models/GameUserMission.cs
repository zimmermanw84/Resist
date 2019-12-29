using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Resist.Models;

namespace Resist.Models
{
  public class GameUserMission
  {
    public int GameUserMissionId { get; set; }

    public int GameUserId { get; set; }
    public int MissionId { get; set; }
    public virtual Mission Mission { get; set; }
    public virtual GameUser GameUser { get; set; }
  }
}