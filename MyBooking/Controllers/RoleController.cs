using Microsoft.AspNetCore.Mvc;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;
using MyBooking.Models;

namespace MyBooking.Controllers
{
    [Route("Api/Role")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        /// POST Api/Role
        [HttpPost]
        public ActionResult<RoleModel> Create([FromBody] RoleModel Model)
        {
            Role createdRole = roleRepository.Insert(new Role
            {
                Name = Model.Name
            });

            return new RoleModel(createdRole);
        }
    }
}
