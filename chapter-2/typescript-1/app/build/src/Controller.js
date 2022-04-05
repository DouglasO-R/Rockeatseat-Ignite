"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const CreateCourseUseCase_1 = require("./CreateCourseUseCase");
class Controller {
    static create(request, response) {
        // const { name, duration, educator } = request.body;
        // new CreateCourseUseCase().execute(name, duration, educator);
        const course = new CreateCourseUseCase_1.CreateCourseUseCase().execute(request.body);
        return response.status(200).json(course);
    }
}
exports.Controller = Controller;
