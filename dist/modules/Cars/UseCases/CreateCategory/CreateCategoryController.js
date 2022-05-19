"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

class CreateCategoryController {
  static async handle(request, response) {
    const createCategory = _tsyringe.container.resolve(_CreateCategoryUseCase.CreateCategoryUseCase);

    await createCategory.with(request.body);
    return response.status(201).location("/").send();
  }

}

exports.CreateCategoryController = CreateCategoryController;