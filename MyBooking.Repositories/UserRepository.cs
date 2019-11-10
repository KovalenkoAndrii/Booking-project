using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MyBooking.Domain;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;

namespace MyBooking.Repositories
{
    public class UserRepository : IUserRepository
    {
        protected readonly MyDbContext Context;
        protected DbSet<User> Entities;
        protected CredRepository CredRepository;
        protected BookedRepository BookedRepository;

        public UserRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<User>();
            CredRepository = new CredRepository(Context);
            BookedRepository = new BookedRepository(Context);
        }

        public List<User> GetAll()
        {
            return Entities.Include(i => i.Role)
                .ToList();
        }

        public User GetById(int userId)
        {
            return Entities.Include(i => i.Role)
                .FirstOrDefault(f => f.Id == userId);
        }

        public User Insert(User newUser, Cred newCred)
        {
            if (newUser == null)
                throw new ArgumentNullException(nameof(newUser));

            if (string.IsNullOrEmpty(newCred.UserPassword) || string.IsNullOrEmpty(newCred.UserEmail))
                throw new ArgumentNullException(nameof(newCred));

            Entities.Add(newUser);

            SaveChanges();

            newCred.UserId = newUser.Id;

            if (CredRepository.Create(newCred) == null)
                throw new ArgumentNullException(nameof(newCred));

            return Entities.Include(i=>i.Role).FirstOrDefault(f=>f.Id == newUser.Id);
        }

        public User Update(int userId, User user)
        {
            User dbUser = GetById(userId);

            if (dbUser == null)
                throw new ArgumentNullException(nameof(user));

            dbUser.Email = user.Email;
            dbUser.Password = user.Email;

            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.RoleId = user.RoleId;
            dbUser.LastModifyDate = DateTime.UtcNow;

            CredRepository.UpdateUserCred(userId, user);

            user.Id = dbUser.Id;

            SaveChanges();

            return Entities.Include(i => i.Role).FirstOrDefault(f => f.Id == user.Id);
        }

        public bool RemoveById(int userId)
        {
            User user = GetById(userId);

            if (user == null)
                throw new Exception("User was not found.");

            if (BookedRepository.GetByUserId(userId) != null)
                throw new Exception("Landlord of the booked advert cannot be removed.");

            Entities.Remove(user);
            CredRepository.RemoveByUserId(userId);

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
