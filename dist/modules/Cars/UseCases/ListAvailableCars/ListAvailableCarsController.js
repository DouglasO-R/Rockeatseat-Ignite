"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

class ListAvailableCarsController {
  static async handle(request, response) {
    const {
      brand,
      name,
      category_id
    } = request.query;

    const listAvailableCars = _tsyringe.container.resolve(_ListAvailableCarsUseCase.ListAvailableCarsUseCase);

    const cars = await listAvailableCars.by({
      brand: brand,
      name: name,
      category_id: category_id
    });
    return response.status(200).json(cars);
  }

}

exports.ListAvailableCarsController = ListAvailableCarsController;