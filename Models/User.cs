using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Resist.Models;

namespace Resist.Models
{
    public class User
    {
      public int UserId { get; set; }
      public string Username { get; set; }
      public ICollection<GameUser> GameUsers { get; set; }
    }
}