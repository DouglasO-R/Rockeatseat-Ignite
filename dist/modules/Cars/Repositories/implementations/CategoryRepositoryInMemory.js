"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryRepositoryInMemory = void 0;

var _Category = require("@modules/Cars/Infra/typeorm/Entities/Category");

class CategoryRepositoryInMemory {
  constructor() {
    this.categories = void 0;
    this.categories = [];
  }

  static getInstance() {
    if (!CategoryRepositoryInMemory.INSTANCE) {
      CategoryRepositoryInMemory.INSTANCE = new CategoryRepositoryInMemory();
    }

    return CategoryRepositoryInMemory.INSTANCE;
  }

  async create({
    name,
    description
  }) {
    const category = new _Category.Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });
    this.categories.push(category);
  }

  async index() {
    return this.categories;
  }

  async findByName(name) {
    const category = this.categories.find(item => item.name === name);
    return category;
  }

}

exports.CategoryRepositoryInMemory = CategoryRepositoryInMemory;
CategoryRepositoryInMemory.INSTANCE = void 0;