using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Resist.Models;

namespace Resist.Models
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
      [HttpGet]
      public IActionResult Index()
      {
        using (var dbContext = new ResistContext())
        {
          List<User> users = dbContext.Users.ToList();
          if (users == null) {
            users = new List<User>();
          }
          return Json(users);
        }
      }

      [HttpPost]
      public async Task<IActionResult> Create([FromBody] User user)
      {
          if (user == null) {
            return StatusCode(403);
          }
          try
          {
            using (var dbContext = new ResistContext())
            {
              User newUser = new User()
              {
                  Username = user.Username
              };

              await dbContext.Users.AddAsync(newUser);
              dbContext.SaveChanges();

              return Json(newUser);
            }
          }
          catch
          {

            return StatusCode(500);
          }
      }
    }
}
