"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImageUseCase = require("./UploadCarImageUseCase");

class UploadCarImagesController {
  static async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files;

    const uploadCarImage = _tsyringe.container.resolve(_UploadCarImageUseCase.UploadCarImagesUseCase);

    const images_name = images.map(file => file.filename);
    await uploadCarImage.with({
      car_id: id,
      images_name
    });
    return response.status(201).send();
  }

}

exports.UploadCarImagesController = UploadCarImagesController;