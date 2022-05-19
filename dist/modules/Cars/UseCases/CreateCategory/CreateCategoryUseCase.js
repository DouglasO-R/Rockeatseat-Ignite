"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _ICategoryRepository = require("@modules/Cars/Repositories/ICategoryRepository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("OrmCategoryRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICategoryRepository.ICategoryRepository === "undefined" ? Object : _ICategoryRepository.ICategoryRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCategoryUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async with({
    name,
    description
  }) {
    const categoryAlreadyExist = await this.repository.findByName(name);

    if (categoryAlreadyExist) {
      throw new _AppError.AppError("Category Already Exist");
    }

    await this.repository.create({
      name,
      description
    });
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCategoryUseCase = CreateCategoryUseCase;