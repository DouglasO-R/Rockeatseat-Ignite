"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureIsAdmin = ensureIsAdmin;

var _OrmUserRepository = require("@modules/Accounts/Users/Infra/typeorm/Repositories/OrmUserRepository");

var _AppError = require("@shared/errors/AppError");

async function ensureIsAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const userRepository = new _OrmUserRepository.OrmUserRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) {
    throw new _AppError.AppError("User isn't admin", 401);
  }

  return next();
}