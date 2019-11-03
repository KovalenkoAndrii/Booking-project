using MyBooking.Domain.Entities;
using System.Collections.Generic;

namespace MyBooking.Domain.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetById(int userId);
        User GetByEmailAndPassword(string userEmail, string userPassword);
        User Insert(User newUser);
        User Update(int userId, User user);
        bool RemoveById(int userId);
        int SaveChanges();
    }
}
