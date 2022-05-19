"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("../UseCases/UpdateUserAvatarUseCase");

class UpdateUserAvatarController {
  static async handle(request, response) {
    try {
      const {
        id
      } = request.user;
      const avatar_file = request.file.filename;

      const updateUserAvatar = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

      await updateUserAvatar.with({
        user_id: id,
        avatar_file
      });
      return response.status(200).send();
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;