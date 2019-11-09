using MyBooking.Domain.Entities;

namespace MyBooking.Models
{
    public class UserModel
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int RoleId { get; set; }
        public RoleModel Role { get; set; }

        public UserModel()
        {
        }

        public UserModel(User userEntity)
        {
            Id = userEntity.Id;

            FirstName = userEntity.FirstName;
            LastName = userEntity.LastName;

            Password = userEntity.Password;
            Email = userEntity.Email;

            RoleId = userEntity.RoleId;

            if (userEntity.Role != null)
            {
                Role = new RoleModel(userEntity.Role);
            }
        }
    }
}
