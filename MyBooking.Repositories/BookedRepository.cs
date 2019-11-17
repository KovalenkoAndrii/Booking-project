using Microsoft.EntityFrameworkCore;
using MyBooking.Domain;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MyBooking.Repositories
{
    public class BookedRepository : IBookedRepository
    {
        protected readonly MyDbContext Context;
        protected DbSet<Booked> Entities;

        public BookedRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<Booked>();
        }

        public List<Booked> GetAll()
        {
            return Entities.Include(i => i.User)
                           .Include(i => i.Advert)
                           .ToList();
        }

        public Booked GetById(int bookedId)
        {
            return Entities.Include(i => i.User)
                           .Include(i => i.Advert)
                           .FirstOrDefault(f => f.Id == bookedId);
        }

        public Booked GetByAdvertId(int advertId)
        {
            return Entities.FirstOrDefault(f => f.AdvertId == advertId);
        }

        public Booked GetByUserId(int userId)
        {
            return Entities.FirstOrDefault(f => f.AdvertId == userId);
        }

        public Booked Insert(Booked newBooked)
        {
            if (newBooked == null)
                throw new ArgumentNullException(nameof(newBooked));

            Entities.Add(newBooked);

            SaveChanges();

            return Entities.Include(i => i.User)
                           .Include(i => i.Advert)
                           .FirstOrDefault(f => f.Id == newBooked.Id);
        }

        public Booked Update(int bookedId, Booked booked)
        {
            Booked dbBooked = GetById(bookedId);

            if (dbBooked == null)
                throw new ArgumentNullException(nameof(booked));

            dbBooked.DateStart = booked.DateStart;
            dbBooked.DateEnd = booked.DateEnd;

            dbBooked.AdvertId = booked.AdvertId;
            dbBooked.UserId = booked.UserId;

            booked.Id = dbBooked.Id;

            SaveChanges();

            return Entities.Include(i => i.User)
                           .Include(i => i.Advert)
                           .FirstOrDefault(f => f.Id == booked.Id);
        }

        public bool RemoveById(int bookedId)
        {
            Booked booked = GetById(bookedId);

            if (booked == null)
                throw new ArgumentNullException(nameof(booked));

            Entities.Remove(booked);

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
