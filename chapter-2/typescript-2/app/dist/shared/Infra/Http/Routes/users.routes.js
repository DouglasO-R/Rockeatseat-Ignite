"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAuthenticated = require("../middleware/ensureAuthenticated");

var _AuthUserController = require("../../../../modules/Accounts/Users/Controller/AuthUserController");

var _CreateUserController = require("../../../../modules/Accounts/Users/Controller/CreateUserController");

var _UpdateUserAvatarController = require("../../../../modules/Accounts/Users/Controller/UpdateUserAvatarController");

var _RefreshTokenController = require("@modules/Accounts/Users/Controller/RefreshTokenController");

var _SendForgotPasswordMailController = require("@modules/Accounts/Users/Controller/SendForgotPasswordMailController");

var _ResetPasswordController = require("@modules/Accounts/Users/Controller/ResetPasswordController");

var _ProfileUserController = require("@modules/Accounts/Users/Controller/ProfileUserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
const uploadAvatar = (0, _multer.default)(_upload.default);
routes.get("/profile", _ensureAuthenticated.ensureAuthenticated, _ProfileUserController.ProfileUserController.handle);
routes.post("/", _CreateUserController.CreateUserController.handle);
routes.post("/forgot", _SendForgotPasswordMailController.SendForgotPasswordMailController.handle);
routes.post("/reset", _ResetPasswordController.ResetPasswordController.handle);
routes.post("/auth", _AuthUserController.AuthUserController.handle);
routes.post("/refresh-token", _RefreshTokenController.RefreshTokenController.handle);
routes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("file"), _UpdateUserAvatarController.UpdateUserAvatarController.handle);
var _default = routes;
exports.default = _default;