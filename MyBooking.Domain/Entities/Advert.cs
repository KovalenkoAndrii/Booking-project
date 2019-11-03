using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBooking.Domain.Entities
{
    public class Advert
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? LastModifyDate { get; set; } = null;

        public string Info { get; set; }
        public string Address { get; set; }

        public int CountPeople { get; set; }
        public bool Animals { get; set; }
        public int Price { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
