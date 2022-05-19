"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _express = require("express");

var _cars = _interopRequireDefault(require("./cars.routes"));

var _categories = _interopRequireDefault(require("./categories.routes"));

var _specifications = _interopRequireDefault(require("./specifications.routes"));

var _users = _interopRequireDefault(require("./users.routes"));

var _rental = _interopRequireDefault(require("./rental.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use("/cars", _cars.default);
routes.use("/categories", _categories.default);
routes.use("/specifications", _specifications.default);
routes.use("/users", _users.default);
routes.use("/rental", _rental.default);