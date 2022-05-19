"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _ICarsRepository = require("@modules/Cars/Repositories/ICarsRepository");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrmCarsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCarUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async with({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }) {
    const carAlreadyExist = await this.repository.findByLicensePlate(license_plate);

    if (carAlreadyExist) {
      throw new _AppError.AppError("Car already exist");
    }

    const car = await this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });
    return car;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCarUseCase = CreateCarUseCase;