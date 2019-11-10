using System.ComponentModel.DataAnnotations.Schema;

namespace MyBooking.Domain.Entities
{
    public class Cred
    {
        public int Id { get; set; }

        public string UserEmail { get; set; }
        public string UserPassword { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
    }
}
