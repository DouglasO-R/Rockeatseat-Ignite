"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _bcrypt = require("bcrypt");

var _IUserRepository = require("@modules/Accounts/Users/Repository/IUserRepository");

var _AppError = require("@shared/errors/AppError");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrmUserRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async with(data) {
    const {
      password,
      driver_license,
      email,
      name
    } = data;
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new _AppError.AppError("User Already Exist");
    }

    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    await this.userRepository.create({
      password: passwordHash,
      driver_license,
      email,
      name
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;