"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _IRentalRepository = require("../../Repositories/IRentalRepository");

var _ICarsRepository = require("@modules/Cars/Repositories/ICarsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrmRentalRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("OrmCarsRepository")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRentalRepository.IRentalRepository === "undefined" ? Object : _IRentalRepository.IRentalRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateRentalUseCase {
  constructor(rentalRepository, dateProvider, carsRepository) {
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async with({
    car_id,
    expected_return_date,
    user_id
  }) {
    const minimumHoursToCompare = 24;
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new Error("Car is Unavailable");
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new Error("There s a rental in progress for user!");
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compare < minimumHoursToCompare) {
      throw new Error(" Invalid return time");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      expected_return_date,
      user_id
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;