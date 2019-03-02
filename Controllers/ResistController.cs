using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Resist.Models;

/**
  This is from the first iteration - Probably wont use this setup in favor of a restful route setup
 */
namespace Resist.Controllers
{
    [Route("api/[controller]")]
    public class ResistController : Controller
    {
        public IActionResult Index()
        {
            using (var dbContext = new ResistContext())
            {

                List<User> users = dbContext.Users.ToList();
                ViewData["Users"] = users;

                return View();
            }
        }

        public IActionResult NewGame()
        {
            return View();
        }

        public IActionResult NewUser()
        {
            using (var dbContext = new ResistContext())
            {
                var Users = dbContext.Users.ToList();
                ViewData["Users"] = Users;

                return View();
            }
        }

        public IActionResult CreateUser(string username)
        {
            try
            {
                using (var dbContext = new ResistContext())
                {
                    User newUser = new User()
                    {
                        Username = username
                    };

                    dbContext.Users.Add(newUser);
                    dbContext.SaveChanges();

                    return View("NewUser");
                }
            }
            catch
            {
                return View("Error");
            }
        }
    }
}