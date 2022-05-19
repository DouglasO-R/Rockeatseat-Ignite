"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarUseCase = require("./CreateCarUseCase");

class CreateCarController {
  static async handle(request, response) {
    const createCar = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);

    const car = await createCar.with(request.body);
    return response.status(201).json({
      car
    });
  }

}

exports.CreateCarController = CreateCarController;