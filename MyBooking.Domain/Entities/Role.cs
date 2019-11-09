using System;
using System.Collections.Generic;

namespace MyBooking.Domain.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? LastModifyDate { get; set; } = null;

        public string Name { get; set; }

        public IEnumerable<User> Users { get; set; }
    }
}
