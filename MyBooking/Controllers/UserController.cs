using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MyBooking.Models;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;

namespace MyBooking.Controllers
{
    [Route("Api/User")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        private readonly ICredRepository credRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        /// GET Api/User
        [HttpGet]
        public ActionResult<IEnumerable<UserModel>> GetAll()
        {
            List<User> users = userRepository.GetAll();

            return users
                .Select(s => new UserModel(s))
                .ToList();
        }

        /// GET Api/User/{userId}
        [HttpGet("{userId}")]
        public ActionResult<UserModel> GetById(int userId)
        {
            User user = userRepository.GetById(userId);
            return new UserModel(user);
        }

        /// POST Api/User
        [HttpPost]
        public ActionResult<UserModel> Create([FromBody] UserModel userModel)
        {
            User createdUser = userRepository.Insert(new User
            {
                Email = userModel.Email,
                Password = userModel.Password,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName,
                RoleId = userModel.RoleId,
            }, new Cred
            {
                UserEmail = userModel.Email,
                UserPassword = userModel.Password,
            });

            return new UserModel(createdUser);
        }

        /// PUT Api/User/{userId}
        [HttpPut("{userId}")]
        public ActionResult<UserModel> Update(int userId, [FromBody] UserModel updatedUserModel)
        {
            User updatedUser = userRepository.Update(userId, new User
            {
                Email = updatedUserModel.Email,
                Password = updatedUserModel.Password,
                FirstName = updatedUserModel.FirstName,
                LastName = updatedUserModel.LastName,
                RoleId = updatedUserModel.RoleId
            });

            return new UserModel(updatedUser);
        }

        /// DELETE Api/User/{userId}
        [HttpDelete("{userId}")]
        public ActionResult<bool> Delete(int userId)
        {
            return userRepository.RemoveById(userId);
        }
    }
}
