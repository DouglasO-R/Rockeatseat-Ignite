"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("../UseCases/CreateUserUseCase");

class CreateUserController {
  static async handle(request, response) {
    try {
      // const {driver_license,email,name,password,username} = request.body;
      const createUser = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

      await createUser.with(request.body);
      return response.status(201).location("/").send();
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateUserController = CreateUserController;