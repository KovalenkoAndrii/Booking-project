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

        public UserRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<User>();
        }

        public List<User> GetAll()
        {
            return Entities
                .ToList();
        }

        public User GetById(int userId)
        {
            return Entities
                .FirstOrDefault(f => f.Id == userId);
        }

        public User GetByEmailAndPassword(string userEmail, string userPassword)
        {
            return Entities
                .Include(i => i.Role)
                .FirstOrDefault(f => (f.Email == userEmail) && (f.Password == userPassword));
        }

        public User Insert(User newUser)
        {
            if (newUser == null)
            {
                throw new ArgumentNullException(nameof(newUser));
            }

            Entities.Add(newUser);

            SaveChanges();

            return newUser;
        }

        public User Update(int userId, User user)
        {
            User dbUser = GetById(userId);

            if (dbUser == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            dbUser.Email = user.Email;
            dbUser.Password = user.Email;
            dbUser.FirstName = user.FirstName;
            dbUser.LastName = user.LastName;
            dbUser.RoleId = user.RoleId;
            dbUser.LastModifyDate = DateTime.UtcNow;

            user.Id = dbUser.Id;

            SaveChanges();

            return user;
        }

        public bool RemoveById(int userId)
        {
            User user = GetById(userId);

            if (user == null)
            {
                throw new Exception("User was not found.");
            }

            Entities.Remove(user);

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
