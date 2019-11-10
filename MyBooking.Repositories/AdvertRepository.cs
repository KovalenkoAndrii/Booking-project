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
        protected BookedRepository BookedRepository;

        public AdvertRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<Advert>();
            BookedRepository = new BookedRepository(Context);
        }

        public List<Advert> GetAll()
        {
            return Entities.Include(i => i.User).
                ToList();
        }

        public Advert GetByAddress(string advertAddress)
        {
            return Entities
                .FirstOrDefault(f => string.Equals(f.Address, advertAddress));
        }

        public Advert GetById(int advertId)
        {
            return Entities.Include(i => i.User)
                .FirstOrDefault(f => f.Id == advertId);
        }

        public List<Advert> GetWithFilters(bool animals = false, int countPeople = 0, int minCost = 0, int maxCost = 0)
        {
            return Entities.Where(w => (w.Animals == animals)
                            && (w.CountPeople >= countPeople)
                            && (w.Price > minCost)
                            && (w.Price < maxCost))
                            .Include(i=>i.User)
                            .ToList();
        }

        public Advert Insert(Advert newAdvert)
        {
            if (newAdvert == null)
            {
                throw new ArgumentNullException(nameof(newAdvert));
            }

            Entities.Add(newAdvert);

            SaveChanges();

            return Entities.Include(i=>i.User)
                           .FirstOrDefault(f=>f.Id == newAdvert.Id);
        }

        public bool RemoveById(int advertId)
        {
            Advert advert = GetById(advertId);

            if (advert == null)
                throw new Exception("Advert was not found.");

            if(BookedRepository.GetByAdvertId(advertId)!=null)
                throw new Exception("Booked advert cannot be deleted.");

            Entities.Remove(advert);

            SaveChanges();

            return true;
        }

        public int SaveChanges()
        {
            return Context
                .SaveChanges();
        }
    }
}
