"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _ListCategoryUseCase = require("./ListCategoryUseCase");

class ListCategoryController {
  static async handle(request, response) {
    try {
      const list = _tsyringe.container.resolve(_ListCategoryUseCase.ListCategoryUseCase);

      const categories = await list.categories();
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ListCategoryController = ListCategoryController;