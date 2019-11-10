using MyBooking.Domain.Entities;
using System;

namespace MyBooking.Models
{
    public class BookedModel
    {
        public int Id { get; set; }

        public string DateStart { get; set; } = null;
        public string DateEnd { get; set; } = null;

        public int UserId { get; set; }
        public UserModel User { get; set; }

        public int AdvertId { get; set; }
        public AdvertModel Advert { get; set; }

        public BookedModel()
        {
        }

        public BookedModel(Booked bookedEntity)
        {
            Id = bookedEntity.Id;

            DateStart = bookedEntity.DateStart;
            DateEnd = bookedEntity.DateEnd;

            UserId = bookedEntity.UserId;
            AdvertId = bookedEntity.AdvertId;

            if (bookedEntity.User != null)
                User = new UserModel(bookedEntity.User);

            if (bookedEntity.Advert != null)
                Advert = new AdvertModel(bookedEntity.Advert);
        }
    }
}