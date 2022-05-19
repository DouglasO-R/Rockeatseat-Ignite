"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmSpecificationRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _typeorm2 = require("typeorm");

var _Specification = require("../Entities/Specification");

class OrmSpecificationRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_Specification.Specification);
  }

  async create({
    name,
    description
  }) {
    const especification = this.repository.create({
      name,
      description
    });
    return await this.repository.save(especification);
  }

  async list() {
    const especification = await this.repository.find();
    return especification;
  }

  async findByName(name) {
    const especification = await this.repository.findOne({
      where: {
        name
      }
    });
    return especification;
  }

  async findByIds(ids) {
    return await this.repository.findBy({
      id: (0, _typeorm2.In)(ids)
    }); // .findBy({ id: In([1, 2, 3]) })
  }

}

exports.OrmSpecificationRepository = OrmSpecificationRepository;