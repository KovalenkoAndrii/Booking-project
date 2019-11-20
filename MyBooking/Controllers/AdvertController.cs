using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MyBooking.Models;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;

namespace MyBooking.Controllers
{
    [Route("Api/Advert")]
    public class AdvertController : ControllerBase
    {
        private readonly IAdvertRepository advertRepository;

        public AdvertController(IAdvertRepository advertRepository)
        {
            this.advertRepository = advertRepository;
        }

        /// GET Api/Advert
        [HttpGet]
        public ActionResult<IEnumerable<AdvertModel>> GetAll()
        {
            List<Advert> adverts = advertRepository.GetAll();

            return adverts
                .Select(s => new AdvertModel(s))
                .ToList();
        }

        /// GET Api/Advert/ById/{advertId}
        [HttpGet("ById/{advertId}")]
        public ActionResult<AdvertModel> GetById(int advertId)
        {
            Advert advert = advertRepository.GetById(advertId);
            return new AdvertModel(advert);
        }

        /// GET Api/Advert/ByAddress/{advertAddress}
        [HttpGet("ByAddress/{advertAddress}")]
        public ActionResult<AdvertModel> GetByAddress(string advertAddress)
        {
            Advert advert = advertRepository.GetByAddress(advertAddress);
            return new AdvertModel(advert);
        }

        /// GET Api/Advert/ByFilters
        [HttpGet("ByFilters")]
        public ActionResult<IEnumerable<AdvertModel>> GetByFilters([FromBody] FiltersModel filtersModel)
        {
            List<Advert> adverts = advertRepository.GetWithFilters(filtersModel.Animal, filtersModel.CountPeople, filtersModel.MinCost, filtersModel.MaxCost);

            return adverts
                .Select(s => new AdvertModel(s))
                .ToList();
        }

        /// POST Api/Advert
        [HttpPost]
        public ActionResult<AdvertModel> Create([FromBody] AdvertModel Model)
        {
            Advert createdAdvert = advertRepository.Insert(new Advert
            {
                Info = Model.Info,
                CountPeople = Model.CountPeople,
                Address = Model.Address,
                Animals = Model.Animals,
                Price = Model.Price,
                UserId = Model.UserId
            });

            return new AdvertModel(createdAdvert);
        }
    }
}
