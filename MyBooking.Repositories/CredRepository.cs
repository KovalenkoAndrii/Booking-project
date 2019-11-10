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
    public class CredRepository : ICredRepository
    {
        protected readonly MyDbContext Context;
        protected DbSet<Cred> Entities;

        public CredRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<Cred>();
        }

        public User GetByEmailAndPassword(string userEmail, string userPassword)
        {
            Cred cred = Entities.
                        FirstOrDefault(f => (f.UserEmail == userEmail) && (f.UserPassword == userPassword));

            User user = null;

            if (cred != null)
                user = Context.Users.Include(i=>i.Role).FirstOrDefault(f => f.Id == cred.UserId);

            return user;
        }

        public Cred GetByUserId(int userId)
        {
            return Entities.FirstOrDefault(f => f.UserId == userId);
        }

        public bool RemoveByUserId(int userId)
        {
            Cred cred = GetByUserId(userId);

            if (cred == null)
            {
                throw new Exception("Cred was not found.");
            }

            Entities.Remove(cred);

            SaveChanges();

            return true;
        }

        public Cred Create(Cred cred)
        {
            Entities.Add(cred);
            SaveChanges();
            return cred;
        }

        public bool UpdateUserCred(int userId, User user)
        {
            Cred dbCred = GetByUserId(userId);

            if (dbCred == null)
                throw new ArgumentException(nameof(dbCred));

            dbCred.UserEmail = user.Email;
            dbCred.UserPassword = user.Password;

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
