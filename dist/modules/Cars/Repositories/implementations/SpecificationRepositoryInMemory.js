"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Specification = require("@modules/Cars/Infra/typeorm/Entities/Specification");

class SpecificationRepositoryInMemory {
  constructor() {
    this.specifications = void 0;
    this.specifications = [];
  }

  static getInstance() {
    if (!SpecificationRepositoryInMemory.INSTANCE) {
      SpecificationRepositoryInMemory.INSTANCE = new SpecificationRepositoryInMemory();
    }

    return SpecificationRepositoryInMemory.INSTANCE;
  }

  async create({
    description,
    name
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    const spec = this.specifications.find(item => item.name === name);
    return spec;
  }

  async list() {
    return this.specifications;
  }

  async findByIds(ids) {
    return this.specifications.filter(spec => ids.includes(spec.id));
  }

}

exports.default = SpecificationRepositoryInMemory;
SpecificationRepositoryInMemory.INSTANCE = void 0;