using Microsoft.EntityFrameworkCore;
using MyBooking.Domain;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyBooking.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        protected readonly MyDbContext Context;
        protected DbSet<Role> Entities;

        public RoleRepository(MyDbContext context)
        {
            Context = context;
            Entities = context.Set<Role>();
        }

        public List<Role> GetAll()
        {
            return Entities
                .ToList();
        }

        public Role GetById(int roleId)
        {
            return Entities
                .FirstOrDefault(f => f.Id == roleId);
        }

        public Role Insert(Role newRole)
        {
            if (newRole == null)
            {
                throw new ArgumentNullException(nameof(newRole));
            }

            Entities.Add(newRole);

            SaveChanges();

            return newRole;
        }

        public Role Update(int roleId, Role role)
        {
            Role dbRole = GetById(roleId);

            if (dbRole == null)
            {
                throw new ArgumentNullException(nameof(role));
            }

            dbRole.Name = role.Name;
            dbRole.LastModifyDate = DateTime.UtcNow;

            SaveChanges();

            return role;
        }

        public bool RemoveById(int roleId)
        {
            Role role = GetById(roleId);

            if (role == null)
            {
                throw new Exception("Role was not found.");
            }

            Entities.Remove(role);

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
