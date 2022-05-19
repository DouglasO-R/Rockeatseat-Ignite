"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmUserRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _User = require("../Entities/User");

class OrmUserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_User.User);
  }

  async create(data) {
    const user = this.repository.create({ ...data
    });
    await this.repository.save(user);
  }

  async findByEmail(email) {
    return await this.repository.findOne({
      where: {
        email
      }
    });
  }

  async findById(id) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

}

exports.OrmUserRepository = OrmUserRepository;