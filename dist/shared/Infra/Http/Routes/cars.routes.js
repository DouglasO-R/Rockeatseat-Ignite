"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCarController = require("@modules/Cars/UseCases/CreateCar/CreateCarController");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

var _ensureIsAdmin = require("../middleware/ensureIsAdmin");

var _ListAvailableCarsController = require("@modules/Cars/UseCases/ListAvailableCars/ListAvailableCarsController");

var _CreateCarSpecificationController = require("@modules/Cars/UseCases/CreateCarSpecification/CreateCarSpecificationController");

var _UploadCarImageController = require("@modules/Cars/UseCases/UploadCarImages/UploadCarImageController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const routes = (0, _express.Router)();
const uploadCarImages = (0, _multer.default)(_upload.default);
routes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureIsAdmin.ensureIsAdmin, _CreateCarController.CreateCarController.handle);
routes.get("/available", _ListAvailableCarsController.ListAvailableCarsController.handle);
routes.post("/specifications/:id", _ensureAuthenticated.ensureAuthenticated, _ensureIsAdmin.ensureIsAdmin, createCarSpecificationController.handle);
routes.post("/images/:id", _ensureAuthenticated.ensureAuthenticated, _ensureIsAdmin.ensureIsAdmin, uploadCarImages.array("images"), _UploadCarImageController.UploadCarImagesController.handle);
var _default = routes;
exports.default = _default;