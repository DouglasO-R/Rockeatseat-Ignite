"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseUseCase = void 0;
class CreateCourseUseCase {
    execute({ name, duration = 8, educator }) {
        console.log(name, duration, educator);
    }
}
exports.CreateCourseUseCase = CreateCourseUseCase;
