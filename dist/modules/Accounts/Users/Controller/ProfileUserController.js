"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserController = void 0;

var _tsyringe = require("tsyringe");

var _ProfileUserUseCase = require("../UseCases/ProfileUserUseCase");

class ProfileUserController {
  static async handle(request, response) {
    const {
      id
    } = request.user;

    const profileUser = _tsyringe.container.resolve(_ProfileUserUseCase.ProfileUserUseCase);

    const userProfile = await profileUser.by(id);
    return response.status(200).json(userProfile);
  }

}

exports.ProfileUserController = ProfileUserController;