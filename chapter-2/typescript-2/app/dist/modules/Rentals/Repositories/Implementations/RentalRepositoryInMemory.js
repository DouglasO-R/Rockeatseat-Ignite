"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalRepositoryInMemory = void 0;

var _Rental = require("@modules/Rentals/Infra/typeorm/Entities/Rental");

class RentalRepositoryInMemory {
  constructor() {
    this.rentals = void 0;
    this.rentals = [];
  }

  static getInstance() {
    if (!RentalRepositoryInMemory.INSTANCE) {
      RentalRepositoryInMemory.INSTANCE = new RentalRepositoryInMemory();
    }

    return RentalRepositoryInMemory.INSTANCE;
  }

  async findOpenRentalByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async create(data) {
    const rental = new _Rental.Rental();
    Object.assign(rental, { ...data,
      start_date: new Date()
    });
    this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUserId(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

}

exports.RentalRepositoryInMemory = RentalRepositoryInMemory;
RentalRepositoryInMemory.INSTANCE = void 0;