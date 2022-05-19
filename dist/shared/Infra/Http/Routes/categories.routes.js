"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("@modules/Cars/UseCases/CreateCategory/CreateCategoryController");

var _ImportCategoryController = require("@modules/Cars/UseCases/ImportCategory/ImportCategoryController");

var _ListCategoryController = require("@modules/Cars/UseCases/ListCategory/ListCategoryController");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

var _ensureIsAdmin = require("../middleware/ensureIsAdmin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const upload = (0, _multer.default)({
  dest: "./tmp"
});
routes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureIsAdmin.ensureIsAdmin, _CreateCategoryController.CreateCategoryController.handle);
routes.get("/", _ListCategoryController.ListCategoryController.handle);
routes.post("/import", _ensureAuthenticated.ensureAuthenticated, _ensureIsAdmin.ensureIsAdmin, upload.single('file'), _ImportCategoryController.ImportCategoryController.handle);
var _default = routes;
exports.default = _default;