"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenController = void 0;

var _tsyringe = require("tsyringe");

var _RefreshTokenUseCase = require("../UseCases/RefreshTokenUseCase");

class RefreshTokenController {
  static async handle(request, response) {
    const token = request.body.token || request.headers["x-access-token"] || request.query.token;

    const refreshToken = _tsyringe.container.resolve(_RefreshTokenUseCase.RefreshTokenUseCase);

    const refresh_token = await refreshToken.by(token);
    return response.status(201).json({
      refresh_token
    });
  }

}

exports.RefreshTokenController = RefreshTokenController;