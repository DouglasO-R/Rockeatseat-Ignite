"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrmCategoryRepository = void 0;

var _typeorm = require("@shared/Infra/typeorm");

var _Category = require("../Entities/Category");

class OrmCategoryRepository {
  constructor() {
    this.repository = void 0;
    this.repository = _typeorm.appDatasource.getRepository(_Category.Category);
  }

  async create({
    name,
    description
  }) {
    const category = this.repository.create({
      name,
      description
    });
    await this.repository.save(category);
  }

  async index() {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name) {
    const category = await this.repository.findOne({
      where: {
        name
      }
    });
    return category;
  }

}

exports.OrmCategoryRepository = OrmCategoryRepository;