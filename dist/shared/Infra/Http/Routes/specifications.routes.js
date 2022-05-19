"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateSpecificationController = require("@modules/Cars/UseCases/CreateSpecification/CreateSpecificationController");

var _ListSpecificationController = require("@modules/Cars/UseCases/ListSpecification/ListSpecificationController");

var _ensureAuthenticated = require("@shared/Infra/Http/middleware/ensureAuthenticated");

var _ensureIsAdmin = require("@shared/Infra/Http/middleware/ensureIsAdmin");

const routes = (0, _express.Router)();
routes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureIsAdmin.ensureIsAdmin, _CreateSpecificationController.CreateSpecificationController.handle);
routes.get("/", _ListSpecificationController.ListSpecificationController.handle);
var _default = routes;
exports.default = _default;