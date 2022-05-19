"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordMailUseCase = require("../UseCases/SendForgotPasswordMailUseCase");

class SendForgotPasswordMailController {
  static async handle(request, response) {
    const {
      email
    } = request.body;

    const senForgotenPasswordMail = _tsyringe.container.resolve(_SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase);

    await senForgotenPasswordMail.by(email);
    return response.status(201).json("fim");
  }

}

exports.SendForgotPasswordMailController = SendForgotPasswordMailController;