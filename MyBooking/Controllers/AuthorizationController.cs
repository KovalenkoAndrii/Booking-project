using Microsoft.AspNetCore.Mvc;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;
using MyBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBooking.Controllers
{
    [Route("Api/Auth")]
    public class AuthorizationController : ControllerBase
    {
        private readonly ICredRepository credRepository;

        public AuthorizationController(ICredRepository credRepository)
        {
            this.credRepository = credRepository;
        }

        /// POST Api/Auth
        [HttpPost]
        public ActionResult<UserModel> SignIn([FromBody]CredModel credModel)
        {
            User user = credRepository.GetByEmailAndPassword(credModel.UserEmail, credModel.UserPassword);

            if (user == null)
                return Unauthorized();

            return new UserModel(user);
        }
    }
}
