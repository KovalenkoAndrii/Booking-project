using Microsoft.AspNetCore.Mvc;
using MyBooking.Domain.Entities;
using MyBooking.Domain.Interfaces;
using MyBooking.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBooking.Controllers
{
    [Route("Api/Booked")]
    public class BookedController
    {
        private readonly IBookedRepository bookedRepository;

        public BookedController(IBookedRepository bookedRepository)
        {
            this.bookedRepository = bookedRepository;
        }

        /// GET Api/Booked
        [HttpGet]
        public ActionResult<IEnumerable<BookedModel>> GetAll()
        {
            List<Booked> bookeds = bookedRepository.GetAll();

            return bookeds
                .Select(s => new BookedModel(s))
                .ToList();
        }

        /// GET Api/Booked/{bookedId}
        [HttpGet("{bookedId}")]
        public ActionResult<BookedModel> GetById(int bookedId)
        {
            Booked booked = bookedRepository.GetById(bookedId);
            return new BookedModel(booked);
        }

        /// POST Api/Booked
        [HttpPost]
        public ActionResult<BookedModel> Create([FromBody] BookedModel bookedModel)
        {
            Booked createdBooked = bookedRepository.Insert(new Booked
            {
                DateStart = bookedModel.DateStart,
                DateEnd = bookedModel.DateEnd,
                AdvertId = bookedModel.AdvertId,
                UserId = bookedModel.UserId,
            });

            return new BookedModel(createdBooked);
        }

        /// PUT Api/Booked/{bookedId}
        [HttpPut("{bookedId}")]
        public ActionResult<BookedModel> Update(int bookedId, [FromBody] BookedModel updatedBookedModel)
        {
            Booked updatedBooked = bookedRepository.Update(bookedId, new Booked
            {
                DateStart = updatedBookedModel.DateStart,
                DateEnd = updatedBookedModel.DateEnd,
                AdvertId = updatedBookedModel.AdvertId,
                UserId = updatedBookedModel.UserId,
            });

            return new BookedModel(updatedBooked);
        }
    }
}
