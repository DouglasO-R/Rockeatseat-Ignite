"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmCarsRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _Car = require("../Entities/Car");

class OrmCarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_Car.Car);
  }

  async create(data) {
    const car = this.repository.create({ ...data
    });
    return await this.repository.save(car);
  }

  async findByLicensePlate(license_plate) {
    return await this.repository.findOne({
      where: {
        license_plate
      }
    });
  }

  async findAllAvailable(brand, category_id, name) {
    const carsQuery = this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    const cars = await carsQuery.getMany();
    console.log(cars);
    return cars;
  }

  async findById(id) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id =:id").setParameters({
      id
    }).execute();
  }

}

exports.OrmCarsRepository = OrmCarsRepository;