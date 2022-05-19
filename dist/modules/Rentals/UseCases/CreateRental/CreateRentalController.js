"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRentalController {
  static async handle(request, response) {
    const {
      expected_return_date,
      car_id
    } = request.body;
    const {
      id
    } = request.user;

    const createRental = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

    const rental = await createRental.with({
      expected_return_date,
      car_id,
      user_id: id
    });
    return response.status(201).json(rental);
  }

}

exports.CreateRentalController = CreateRentalController;