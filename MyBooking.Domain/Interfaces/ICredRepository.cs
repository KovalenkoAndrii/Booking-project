using MyBooking.Domain.Entities;

namespace MyBooking.Domain.Interfaces
{
    public interface ICredRepository
    {
        User GetByEmailAndPassword(string mail, string password);
    }
}
