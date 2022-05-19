"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokenRepositoryInMemory = void 0;

var _UsersToken = require("../Infra/typeorm/Entities/UsersToken");

class UsersTokenRepositoryInMemory {
  constructor() {
    this.usersToken = void 0;
    this.usersToken = [];
  }

  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UsersToken.UsersToken();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersToken.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id, token) {
    return this.usersToken.find(userToken => userToken.user_id === user_id && userToken.refresh_token === token);
  }

  async deleteById(id) {
    const userToken = this.usersToken.find(userToken => userToken.id === id);
    this.usersToken.splice(this.usersToken.indexOf(userToken));
  }

  async findByByRefreshToken(refresh_token) {
    return this.usersToken.find(userTokern => userTokern.refresh_token === refresh_token);
  }

}

exports.UsersTokenRepositoryInMemory = UsersTokenRepositoryInMemory;