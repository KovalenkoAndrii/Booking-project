using MyBooking.Domain.Entities;

namespace MyBooking.Models
{
    public class RoleModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public RoleModel()
        {

        }

        public RoleModel(Role roleEntity)
        {
            Id = roleEntity.Id;

            Name = roleEntity.Name;
        }
    }
}
