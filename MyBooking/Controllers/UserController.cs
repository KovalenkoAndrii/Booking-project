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
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// GET Api/User
        [HttpGet]
        public ActionResult<IEnumerable<UserModel>> GetAll()
        {
            List<User> users = _userRepository.GetAll();

            return users
                .Select(s => new UserModel(s))
                .ToList();
        }

        /// GET Api/User/{userId}
        [HttpGet("{userId}")]
        public ActionResult<UserModel> GetById(int userId)
        {
            User user = _userRepository.GetById(userId);
            return new UserModel(user);
        }

        /// POST Api/User
        [HttpPost]
        public ActionResult<UserModel> Create([FromBody] UserModel Model)
        {
            User createdUser = _userRepository.Insert(new User
            {
                Email = Model.Email,
                Password = Model.Password,
                FirstName = Model.FirstName,
                LastName = Model.LastName,
                RoleId = Model.RoleId
            });

            return new UserModel(createdUser);
        }

        /// PUT Api/User/{userId}
        [HttpPut("{userId}")]
        public ActionResult<UserModel> Update(int userId, [FromBody] UserModel updatedUserModel)
        {
            User updatedUser = _userRepository.Update(userId, new User
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
            return _userRepository.RemoveById(userId);
        }
    }
}
