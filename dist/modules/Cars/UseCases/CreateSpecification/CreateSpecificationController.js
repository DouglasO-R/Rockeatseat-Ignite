"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateSpecificationUseCase = require("./CreateSpecificationUseCase");

class CreateSpecificationController {
  // private useCase: CreateSpecificationUseCase;
  // constructor(useCase:CreateSpecificationUseCase) {
  //     this.useCase = useCase;
  // }
  static async handle(request, response) {
    try {
      const CreateSpecification = _tsyringe.container.resolve(_CreateSpecificationUseCase.CreateSpecificationUseCase);

      await CreateSpecification.execute(request.body);
      return response.status(201).location("/").send();
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.CreateSpecificationController = CreateSpecificationController;