"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("../UseCases/AuthenticateUserUseCase");

class AuthUserController {
  static async handle(request, response) {
    try {
      const authenticate = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

      const token = await authenticate.auth(request.body);
      return response.status(201).json(token);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.AuthUserController = AuthUserController;