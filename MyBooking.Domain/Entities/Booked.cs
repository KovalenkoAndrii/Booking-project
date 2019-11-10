using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBooking.Domain.Entities
{
    public class Booked
    {
        public int Id { get; set; }

        public string DateStart { get; set; } = null;
        public string DateEnd { get; set; } = null;

        [ForeignKey("Advert")]
        public int AdvertId { get; set; }
        public Advert Advert { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
