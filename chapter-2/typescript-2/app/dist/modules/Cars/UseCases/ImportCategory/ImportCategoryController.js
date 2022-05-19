"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoryController = void 0;

var _tsyringe = require("tsyringe");

var _ImportCategoryUseCase = require("./ImportCategoryUseCase");

class ImportCategoryController {
  static async handle(request, response) {
    try {
      const {
        file
      } = request;

      const importFile = _tsyringe.container.resolve(_ImportCategoryUseCase.ImportCategoryUseCase);

      await importFile.execute(file);
      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ImportCategoryController = ImportCategoryController;