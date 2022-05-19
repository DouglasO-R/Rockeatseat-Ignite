"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmUsersTokenRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _UsersToken = require("../Entities/UsersToken");

class OrmUsersTokenRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_UsersToken.UsersToken);
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(user_id, token) {
    const usersToken = await this.repository.findOne({
      where: {
        user_id,
        refresh_token: token
      }
    });
    return usersToken;
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id
    });
    await this.repository.save(userToken);
    return userToken;
  }

  async findByByRefreshToken(refresh_token) {
    return await this.repository.findOneBy({
      refresh_token
    });
  }

}

exports.OrmUsersTokenRepository = OrmUsersTokenRepository;