using MyBooking.Domain.Entities;
using System;

namespace MyBooking.Models
{
    public class AdvertModel
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? LastModifyDate { get; set; } = null;

        public string Info { get; set; }
        public string Address { get; set; }

        public int CountPeople { get; set; }
        public bool Animals { get; set; }
        public int Price { get; set; }

        public int UserId { get; set; }
        public UserModel User { get; set; }

        public AdvertModel()
        {
        }

        public AdvertModel(Advert advertEntity)
        {
            Id = advertEntity.Id;

            Info = advertEntity.Info;
            Address = advertEntity.Address;

            CountPeople = advertEntity.CountPeople;
            Animals = advertEntity.Animals;
            Price = advertEntity.Price;

            UserId = advertEntity.UserId;

            if (advertEntity.User != null)
            {
                User = new UserModel(advertEntity.User);
            }
        }
    }
}
