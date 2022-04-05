"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller_1 = require("./Controller");
const routes = (0, express_1.Router)();
routes.get("/", (request, response) => {
    return response.status(200).json({ message: "ola mundo" });
});
routes.post("/course", Controller_1.Controller.create);
exports.default = routes;
