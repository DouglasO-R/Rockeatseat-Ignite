"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordController = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordUseCase = require("../UseCases/ResetPasswordUseCase");

class ResetPasswordController {
  static async handle(request, response) {
    const {
      token
    } = request.query;
    const {
      password
    } = request.body;

    const resetPassword = _tsyringe.container.resolve(_ResetPasswordUseCase.ResetPasswordUseCase);

    await resetPassword.by({
      token: String(token),
      password
    });
    return response.status(201).json();
  }

}

exports.ResetPasswordController = ResetPasswordController;