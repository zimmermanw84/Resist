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
          return Json(users);
        }
      }

      [HttpPost]
      public async Task<IActionResult> Create(string username)
      {
          try
          {
            using (var dbContext = new ResistContext())
            {
              User newUser = new User()
              {
                  Username = username
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
