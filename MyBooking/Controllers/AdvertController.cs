﻿using System.Collections.Generic;
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

        /// GET Api/Advert/{advertId}
        [HttpGet("{advertId}")]
        public ActionResult<AdvertModel> GetById(int advertId)
        {
            Advert advert = advertRepository.GetById(advertId);
            return new AdvertModel(advert);
        }

        /// GET Api/Advert/{advertAddress}
        [HttpGet("{advertAddress}")]
        public ActionResult<AdvertModel> GetByAddress(string advertAddress)
        {
            Advert advert = advertRepository.GetByAddress(advertAddress);
            return new AdvertModel(advert);
        }

        /// GET Api/Advert/{animals,countPeople,minPrice,maxPrice}
        [HttpGet("{animals,countPeople,minPrice,maxPrice}")]
        public ActionResult<IEnumerable<AdvertModel>> GetByFilters1(bool animals = false, int countPeople = 0, int minPrice = 0, int maxPrice = 0)
        {
            List<Advert> adverts = advertRepository.GetWithFilters(animals, countPeople, minPrice, maxPrice);

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