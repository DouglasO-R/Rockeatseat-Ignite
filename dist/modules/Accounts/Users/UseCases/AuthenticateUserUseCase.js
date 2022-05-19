"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _IUserRepository = require("@modules/Accounts/Users/Repository/IUserRepository");

var _AppError = require("@shared/errors/AppError");

var _IUsersTokenRepository = require("../Repository/IUsersTokenRepository");

var _auth = _interopRequireDefault(require("@config/auth"));

var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrmUserRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("OrmUsersTokenRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUsersTokenRepository.IUsersTokenRepository === "undefined" ? Object : _IUsersTokenRepository.IUsersTokenRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class AuthenticateUserUseCase {
  constructor(userRepository, usersTokenRepository, dateProvider) {
    this.userRepository = userRepository;
    this.usersTokenRepository = usersTokenRepository;
    this.dateProvider = dateProvider;
  }

  async auth({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError("Email or Password incorrect !", 400);
    }

    const passworMatch = await (0, _bcrypt.compare)(password, user.password);

    if (!passworMatch) {
      throw new _AppError.AppError("Email or Password incorrect !", 400);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const refresh_token_expires_date = this.dateProvider.addDays(_auth.default.expires_in_refresh_token_days);
    await this.usersTokenRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id
    });
    const tokenReturn = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
    return tokenReturn;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;