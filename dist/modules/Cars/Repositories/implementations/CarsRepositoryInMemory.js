"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Car = require("@modules/Cars/Infra/typeorm/Entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = void 0;
    this.cars = [];
  }

  static getInstance() {
    if (!CarsRepositoryInMemory.INSTANCE) {
      CarsRepositoryInMemory.INSTANCE = new CarsRepositoryInMemory();
    }

    return CarsRepositoryInMemory.INSTANCE;
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }) {
    const car = new _Car.Car();

    if (!id) {
      Object.assign(car, {
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications
      });
      this.cars.push(car);
      return car;
    }

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findAllAvailable(brand, category_id, name) {
    const all = await this.cars.filter(car => car.available == true);

    if (!brand && !category_id && !name) {
      return all;
    }

    const filterAll = all.filter(car => {
      if (brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }

      return null;
    });
    return filterAll;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }

}

exports.default = CarsRepositoryInMemory;
CarsRepositoryInMemory.INSTANCE = void 0;