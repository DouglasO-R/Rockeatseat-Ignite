"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmRentalRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _Rental = require("../Entities/Rental");

class OrmRentalRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_Rental.Rental);
  }

  async findOpenRentalByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByUser;
  }

  async create(data) {
    const rental = this.repository.create({ ...data
    });
    await this.repository.save(rental);
    return rental;
  }

  async findById(id) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async findByUserId(user_id) {
    const rental = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rental;
  }

}

exports.OrmRentalRepository = OrmRentalRepository;