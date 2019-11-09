using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MyBooking.Domain;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;

namespace MyBooking.Repositories
{
    public class AdvertRepository : IAdvertRepository
    {
        protected readonly MyDbContext Context;
        protected DbSet<Advert> Entities;

        public AdvertRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<Advert>();
        }

        public List<Advert> GetAll()
        {
            return Entities.
                ToList();
        }

        public Advert GetByAddress(string advertAddress)
        {
            return Entities
                .FirstOrDefault(f => string.Equals(f.Address, advertAddress));
        }

        public Advert GetById(int advertId)
        {
            return Entities
                .FirstOrDefault(f => f.Id == advertId);
        }

        public List<Advert> GetWithFilters(bool animals = false, int countPeople = 0, int minCost = 0, int maxCost = 0)
        {
            return Entities.
                ToList();
        }

        public Advert Insert(Advert newAdvert)
        {
            if (newAdvert == null)
            {
                throw new ArgumentNullException(nameof(newAdvert));
            }

            Entities.Add(newAdvert);

            SaveChanges();

            return newAdvert;
        }

        public int SaveChanges()
        {
            return Context
                .SaveChanges();
        }
    }
}
