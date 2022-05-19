"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmCarsImageRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _CarImage = require("../Entities/CarImage");

class OrmCarsImageRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_CarImage.CarImage);
  }

  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    return await this.repository.save(carImage);
  }

}

exports.OrmCarsImageRepository = OrmCarsImageRepository;