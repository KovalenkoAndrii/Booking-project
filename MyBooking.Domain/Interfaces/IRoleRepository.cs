using MyBooking.Domain.Entities;
using System.Collections.Generic;

namespace MyBooking.Domain.Interfaces
{
    public interface IRoleRepository
    {
        List<Role> GetAll();
        Role GetById(int roleId);
        Role Insert(Role newRole);
        Role Update(int roleId, Role role);
        bool RemoveById(int roleId);
        int SaveChanges();
    }
}
