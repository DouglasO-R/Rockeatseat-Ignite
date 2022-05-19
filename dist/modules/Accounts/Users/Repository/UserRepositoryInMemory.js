"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepositoryInMemory = void 0;

var _User = require("../Infra/typeorm/Entities/User");

class UserRepositoryInMemory {
  constructor() {
    this.users = void 0;
    this.users = [];
  }

  static getInstance() {
    if (!UserRepositoryInMemory.INSTANCE) {
      UserRepositoryInMemory.INSTANCE = new UserRepositoryInMemory();
    }

    return UserRepositoryInMemory.INSTANCE;
  }

  async create(data) {
    const user = new _User.User();
    Object.assign(user, { ...data
    });
    await this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

}

exports.UserRepositoryInMemory = UserRepositoryInMemory;
UserRepositoryInMemory.INSTANCE = void 0;