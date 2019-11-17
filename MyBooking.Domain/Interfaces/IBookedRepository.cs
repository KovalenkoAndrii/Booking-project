using MyBooking.Domain.Entities;
using System.Collections.Generic;

namespace MyBooking.Domain.Interfaces
{
    public interface IBookedRepository
    {
        List<Booked> GetAll();
        Booked GetById(int bookedId);
        Booked Insert(Booked newBooked);
        Booked Update(int bookedId, Booked booked);
        bool RemoveById(int bookedId);
        int SaveChanges();
    }
}
