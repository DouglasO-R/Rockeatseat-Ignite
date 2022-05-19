"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CreateRentalController = require("@modules/Rentals/UseCases/CreateRental/CreateRentalController");

var _DevolutionRentalController = require("@modules/Rentals/UseCases/DevolutionRental/DevolutionRentalController");

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

var _ListRentalsByUserController = require("@modules/Rentals/UseCases/ListRentalsByUser/ListRentalsByUserController");

const routes = (0, _express.Router)();
routes.post("/", _ensureAuthenticated.ensureAuthenticated, _CreateRentalController.CreateRentalController.handle);
routes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, _DevolutionRentalController.DevolutionRentalController.handle);
routes.get("/user", _ensureAuthenticated.ensureAuthenticated, _ListRentalsByUserController.ListRentalsByUserController.handle);
var _default = routes;
exports.default = _default;