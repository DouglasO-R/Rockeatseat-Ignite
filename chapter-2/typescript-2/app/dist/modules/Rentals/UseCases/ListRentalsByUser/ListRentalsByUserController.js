"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsByUserController {
  static async handle(request, response) {
    const {
      id
    } = request.user;

    const listRentalsByUser = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);

    const rentals = await listRentalsByUser.by(id);
    return response.status(201).json(rentals);
  }

}

exports.ListRentalsByUserController = ListRentalsByUserController;