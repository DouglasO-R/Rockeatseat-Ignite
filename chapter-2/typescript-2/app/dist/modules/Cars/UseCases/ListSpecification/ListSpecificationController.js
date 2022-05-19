"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _ListSpecificationUseCase = require("./ListSpecificationUseCase");

class ListSpecificationController {
  // private useCase: ListSpecificationUseCase;
  // constructor(useCase: ListSpecificationUseCase) {
  //     this.useCase = useCase;
  // }
  static async handle(request, response) {
    try {
      const listSpecificationUseCase = _tsyringe.container.resolve(_ListSpecificationUseCase.ListSpecificationUseCase);

      const specifications = await listSpecificationUseCase.execute();
      return response.status(200).json({
        specifications
      });
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.ListSpecificationController = ListSpecificationController;