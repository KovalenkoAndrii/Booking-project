using MyBooking.Domain.Entities;
using System.Collections.Generic;

namespace MyBooking.Domain.Interfaces
{
    public interface IAdvertRepository
    {
        List<Advert> GetAll();
        Advert GetById(int id);
        Advert GetByAddress(string address);
        List<Advert> GetWithFilters(bool animals = false, int countPeople = 0, int minCost = 0, int maxCost = 0);
        Advert Insert(Advert newAdvert);
    }
}
