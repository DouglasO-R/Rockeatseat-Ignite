"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

class CreateCarSpecificationController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const {
      specification_id
    } = request.body;

    const createCarSpecificationUseCase = _tsyringe.container.resolve(_CreateCarSpecificationUseCase.CreateCarSpecificationUseCase);

    const car = await createCarSpecificationUseCase.with({
      car_id: id,
      specification_id
    });
    return response.status(201).json({
      car
    });
  }

}

exports.CreateCarSpecificationController = CreateCarSpecificationController;