"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUseCase = void 0;

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _AppError = require("@shared/errors/AppError");

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _IUserRepository = require("../Repository/IUserRepository");

var _IUsersTokenRepository = require("../Repository/IUsersTokenRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrmUserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("OrmUsersTokenRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUsersTokenRepository.IUsersTokenRepository === "undefined" ? Object : _IUsersTokenRepository.IUsersTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPasswordUseCase {
  constructor(userRepository, usersTokenRepository, dateProvider) {
    this.userRepository = userRepository;
    this.usersTokenRepository = usersTokenRepository;
    this.dateProvider = dateProvider;
  }

  async by({
    token,
    password
  }) {
    const userToken = await this.usersTokenRepository.findByByRefreshToken(token);

    if (!userToken) {
      throw new _AppError.AppError("Token Invalid");
    }

    const compareTokenExpireDate = this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow());

    if (compareTokenExpireDate) {
      throw new _AppError.AppError("Token expired!");
    }

    const user = await this.userRepository.findById(userToken.user_id);
    user.password = await (0, _bcrypt.hash)(password, 8);
    await this.userRepository.create(user);
    await this.usersTokenRepository.deleteById(userToken.id);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;