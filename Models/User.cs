using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

using Resist.Models;

namespace Resist.Models
{
    public class User
    {
      public int UserId { get; set; }
      public string Username { get; set; }
      [JsonIgnore]
      public virtual ICollection<GameUser> GameUsers { get; set; }
    }
}